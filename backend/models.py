from typing import List
from flask_sqlalchemy import SQLAlchemy

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
    closets = db.relationship("closets")

    def get_all_items(self):
        return [item for closet in self.closets for item in closet.items]


class Closet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column("user_id", db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    items = db.relationship("ClothingItem", backref="closet")

    #TODO: Update this to only consider 'clean' items once laundry is implemented.
    def find_matching_outfit(self, outfit_template: 'OutfitTemplate') -> List[ClothingItem]:
        available_items = set(self.items)
        out = []
        for item_template in outfit_template.item_templates:
            required_tags = item_template.required_tags
            matching_item = None
            try:
                matching_item = next(item for item in available_items if all(req_tag in item.tags for req_tag in required_tags))
            except StopIteration:
                raise ValueError(f"No item matches {item_template} in closet{self.id}")
            out.append(matching_item)
            available_items.remove(matching_item)
        return out


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
        return {'name': self.name}


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
    name = db.Column(db.String(50), nullable=False)
    required_tags = db.relationship("Tag", secondary=template_tags)
    outfit_template_id = db.Column(db.Integer, db.ForeignKey("outfit_template.id"))
