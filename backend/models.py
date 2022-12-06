from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# This table relates items & tags to each other (many-to-many relationship)
# Also notice how SQLAlchemy maps the 'ClothingItem' class to 'clothing_item'
item_tags = db.Table(
    "item_tags",
    db.Column(db.String(50), nullable=False, primary_key=True),
    db.Column(
        "item_id", db.Integer, db.ForeignKey("clothing_item.id"), primary_key=True
    ),
)


class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    # Notice how 'tags' is NOT a column. However, this defines the relationship &
    # lets us access item.tags (Which happens through a query in the background).
    # the 'backref' lets us do the opposite: tag.items
    tags = db.relationship("Tag", secondary=item_tags, backref="items")
    closet_id = db.Column(db.Integer, db.ForeignKey("closet.id"))

    # TODO: In 'serialize' return a dictionary matching how the frontend displays items
    @property
    def serialize(self):
        list_tags = []
        for tag in self.tags:
            list_tags.append(tag.name)

        return {"name": self.name, "tags": list_tags, "closet_id": self.closet_id}


class Tag(db.Model):
    name = db.Column(db.String(50), nullable=False, primary_key=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def get_all_items(self):
        return [item for closet in self.closets for item in closet.items]


class Closet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref="closets")
    items = db.relationship("ClothingItem", backref="closet")
