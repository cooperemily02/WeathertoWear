from api import db, app
import models

with app.app_context(): # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()


    user1 = models.User()

    # tags i.e attributes
    snowy = models.Tag(name='snowy')
    rainy = models.Tag(name='rainy')
    cotton = models.Tag(name='cotton')
    shoes = models.Tag(name='shoes')
    top = models.Tag(name='top')
    bottom = models.Tag(name='bottom')
    outerwear = models.Tag(name='outerwear')

    # summer outfit
    tshirt = models.ClothingItem(name="t-shirt", tags=[top, cotton])
    shorts = models.ClothingItem(name="shorts", tags=[bottom])
    sneakers = models.ClothingItem(name="sneakers", tags=[shoes])

    # rainy/snowy outfit
    rain_coat = models.ClothingItem(name= "rain coat", tags=[outerwear, rainy, snowy])
    boots = models.ClothingItem(name= "rain boots", tags=[shoes, rainy, snowy])
    leggings = models.ClothingItem(name= "leggings", tags=[bottom, rainy, snowy])
    long_sleeve = models.ClothingItem(name='long-sleeve shirt', tags=[top, rainy, snowy])

    # add all to user1's closet
    closet = models.Closet(
        user=user1,
        items=[tshirt, shorts, sneakers, rain_coat, boots, leggings, long_sleeve]
    )

    # write to db
    db.session.add_all([closet, user1])
    db.session.commit() # This writes the items to the database

    # Accessing the data:
    print("user1's items")
    for item in user1.get_all_items():
        print(item.serialize)