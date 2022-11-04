from api import db, app
import models

with app.app_context(): # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()

    user1 = models.User()
    user2 = models.User()

    #creating a closet for each user
    closet1 = models.Closet(user_id = user1.id)
    closet2 = models.Closet(user_id = user2.id)

    # General way to manipulate the database:
    item1 = models.ClothingItem(name="t-shirt")
    item2 = models.ClothingItem(name="jeans")
    item3 = models.ClothingItem(name="boots")

    tag1 = models.Tag(name='cotton')
    tag2 = models.Tag(name='dark wash')
    tag3 = models.Tag(name='rain-proof')

    item1.tags.append(tag1)
    item2.tags.append(tag2)
    item3.tags.append(tag3)

    db.session.add_all([item1, item2, item3]) # won't be written until the 'commit' line
    db.session.add_all([tag1, tag2, tag3])
    db.session.add_all([user1, user2])
    db.session.add_all([closet1, closet2])
    db.session.commit() # This writes the items to the database

    # Accessing the data:
    items = models.ClothingItem.query.all()
    for item in items:
        print(item.serialize)

    users = models.User.query.all()
    # print(users)
