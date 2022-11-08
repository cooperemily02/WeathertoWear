from api import db, app
import models

with app.app_context(): # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()
    
    user1 = models.User()
    user2 = models.User()


    # General way to manipulate the database:
    item1 = models.ClothingItem(name="t-shirt")
    item2 = models.ClothingItem(name="jeans")
    item3 = models.ClothingItem(name="boots")
    item4 = models.ClothingItem(name= "jacket")


    tag1 = models.Tag(name='cotton')
    tag2 = models.Tag(name='dark wash')
    tag3 = models.Tag(name='rain-proof')

    tag4 = models.Tag(name='top')
    tag5 = models.Tag(name='bottom')
    tag6 = models.Tag(name='shoes')
    tag7 = models.Tag(name='outerwear')




    item1.tags.append(tag1)
    item1.tags.append(tag4)
    item2.tags.append(tag2)
    item2.tags.append(tag5)
    item3.tags.append(tag3)
    item3.tags.append(tag6)
    item4.tags.append(tag7)


    #creating a closet for each user
    closet1 = models.Closet(user=user1, items=[item1, item2, item3])
    closet2 = models.Closet(user=user2)

    db.session.add_all([item1, item2, item3]) # won't be written until the 'commit' line
    db.session.add_all([tag1, tag2, tag3])
    db.session.add_all([user1, user2])
    db.session.add_all([closet1, closet2])
    db.session.commit() # This writes the items to the database

    # Accessing the data:
    print("user1's items")
    for item in user1.get_all_items():
        print(item.serialize)