from typing import List, Set, Tuple
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
            self.img = file # In this case 'file' is the path of the file
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
        
    
    def serialize_with_template_id(self, template: 'ItemTemplate'):
        out = self.serialize.copy()
        out['item_template'] = template.id
        return out
    
    
    def is_match_for_template(self, item_template: 'ItemTemplate'):
        return all(
            required_tag in self.tags for required_tag in item_template.required_tags
        )


class Tag(db.Model):
    name = db.Column(db.String(50), nullable=False, primary_key=True)

    """
    If the name is not an existing tag, creates & writes a new one.
    Returns the tag object with the given name
    """
    def get_or_create(name):
        if not db.session.query(Tag).get(name):
            tag_object = Tag(name=name)
            db.session.add(tag_object)
            db.session.commit()
        return Tag.query.get(name)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    outfit_templates = db.relationship('OutfitTemplate')
    closets = db.relationship("Closet", back_populates="user")


    def get_all_items(self):
        return [item for closet in self.closets for item in closet.items]
    
    def default_closet(self) -> 'Closet':
        if not self.closets:
            self.closets.append(Closet())
        return self.closets[0]
    
    def get_laundry_items(self):
        return [item.times_worn < item.max_wears for closet in self.closets for item in closet.items]


class Closet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates='closets')
    items = db.relationship("ClothingItem", backref="closet")

    def find_matching_outfit(self, outfit_template: 'OutfitTemplate') -> Tuple[List[ClothingItem], dict[ClothingItem, 'ItemTemplate']]:
        #TODO: Update this to only consider 'clean' items once laundry is implemented.
        available_items = set(self.items)
        item_to_template_it_matches: dict[ClothingItem, 'ItemTemplate'] = {}
        included_items = set()
        for item_template in outfit_template.item_templates:
            # Exclude item if it is already included, as we don't want to generate duplicates
            matching_item = self.find_matching_item(item_template, excluded_items=included_items)
            included_items.add(matching_item)
            item_to_template_it_matches[matching_item] = item_template
        # Tuple so we remember which item matches which item_template
        return (included_items, item_to_template_it_matches)
    

    def find_matching_item(self, item_template: 'ItemTemplate', excluded_items: Set[ClothingItem] = set()):
        available_items = set(self.items) - excluded_items
        req_tags = item_template.required_tags
        match = None
        try:
            match = next(item for item in available_items if all(req_tag in item.tags for req_tag in req_tags))
        except StopIteration:
            raise Exception("Unable to find item with required tags {item_template.required_tags}") 
        return match

"""
Represents a template/blueprint that an outfit matches by satisfying all the 
required 'item_templates'.
"""
class OutfitTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(50), nullable=False)
    item_templates = db.relationship("ItemTemplate")

    # A *single* user should not have multiple templates with the same name.
    # (but name is not unique, as different users could easily pick the same name)
    __table_args__ = (db.UniqueConstraint('name', 'user_id'), )

    @property
    def serialize(self):
        return {'name': self.name, 'id': self.id}


template_tags = db.Table(
    "template_tags",
    db.Column("tag_name", db.String(50), db.ForeignKey('tag.name'), nullable=False, primary_key=True),
    db.Column(
        "item_template_id", db.Integer, db.ForeignKey("item_template.id"), primary_key=True
    ),
)


"""
Represents a template/blueprint that a clothingItem satisfies by containing all the 
required_tags.
"""
class ItemTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    required_tags = db.relationship("Tag", secondary=template_tags)
    outfit_template_id = db.Column(db.Integer, db.ForeignKey("outfit_template.id"))
