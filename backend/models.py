from api import app # This is an importing 'trick' to handle that both the api/models files need the other.
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)


item_tags = db.Table('item_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey('clothing_item.id'), primary_key=True)
)


class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    