from api import app # This is an importing 'trick' to handle that both the api/models files need the other.
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)


# This table relates items & tags to each other (many-to-many relationship)
# Also notice how SQLAlchemy maps the 'ClothingItem' class to 'clothing_item'
item_tags = db.Table('item_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey('clothing_item.id'), primary_key=True)
)


class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    # Notice how 'tags' is NOT a column. However, this defines the relationship & 
    # lets us access item.tags (Which happens through a query in the background).
    # the 'backref' lets us do the opposite: tag.items
    tags = db.relationship('Tag', secondary=item_tags, backref='items')

    #TODO: In 'serialize' return a dictionary matching how the frontend displays items
    @property
    def serialize(self):
        pass

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    