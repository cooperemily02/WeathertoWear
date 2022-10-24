from api import db, app
import models

with app.app_context(): # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()

    # General way to manipulate the database:
    item = models.ClothingItem(name="t-shirt")
    tag = models.Tag(name='cotton')
    item.tags.append(tag)
    db.session.add(tag) # won't be written until the 'commit' line
    db.session.add(item) # won't be written until the 'commit' line
    db.session.commit() # This writes the item to the database

    # Accessing the data:
    items = models.ClothingItem.query.all()
    for item in items:
        print(item)