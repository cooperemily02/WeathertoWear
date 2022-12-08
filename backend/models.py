from flask_sqlalchemy import SQLAlchemy
import os
import sys
db = SQLAlchemy()


# This table relates items & tags to each other (many-to-many relationship)
# Also notice how SQLAlchemy maps the 'ClothingItem' class to 'clothing_item'
item_tags = db.Table(
    "item_tags",
    db.Column("tag_name", db.String(50), db.ForeignKey('tag.name'), nullable=False, primary_key=True),
    db.Column(
        "item_id", db.Integer, db.ForeignKey("clothing_item.id"), primary_key=True
    ),
)

import random
class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    img = db.Column(db.String(50), nullable=True)
    # Notice how 'tags' is NOT a column. However, this defines the relationship &
    # lets us access item.tags (Which happens through a query in the background).
    # the 'backref' lets us do the opposite: tag.items
    tags = db.relationship("Tag", secondary=item_tags, backref="items")
    closet_id = db.Column(db.Integer, db.ForeignKey("closet.id"))
        
    def setimg(self, file):
        if isinstance(file, str):
            self.img
        else:
            upload_dir = "images"
            if not os.path.isdir(upload_dir):
                os.mkdir(upload_dir)
            #random So I can keep uploading the same image for testing
            r = str(random.randint(0, 100000000))
            file.save(os.path.join(upload_dir, (r + file.filename)))
            self.img = (r + file.filename)
    
    # TODO: In 'serialize' return a dictionary matching how the frontend displays items

    # the values become default only once committed to the database (not upon instantiation)
    times_worn = db.Column(db.Integer, default=0) 
    max_wears = db.Column(db.Integer, default=1)

    @property
    def serialize(self):
        list_tags = []
        for tag in self.tags:
            list_tags.append(tag.name)
        out = {"name": self.name, "tags": list_tags, "closet_id": self.closet_id, "id": self.id}
        if self.img:
            out["img"] = self.img
        return out

class Tag(db.Model):
    name = db.Column(db.String(50), nullable=False, primary_key=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def get_all_items(self):
        return [item for closet in self.closets for item in closet.items]
    
    def get_laundry_items(self):
        return [item.times_worn < item.max_wears for closet in self.closets for item in closet.items]


class Closet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref="closets")
    items = db.relationship("ClothingItem", backref="closet")
