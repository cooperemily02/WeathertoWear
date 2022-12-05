from api import db, app
import models

with app.app_context():  # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()

    user1 = models.User()

    # tags i.e attributes
    snowy = models.Tag(name="snowy")
    rainy = models.Tag(name="rainy")
    cotton = models.Tag(name="cotton")
    shoes = models.Tag(name="shoes")
    top = models.Tag(name="top")
    bottom = models.Tag(name="bottom")
    outerwear = models.Tag(name="outerwear")
    gym_tag = models.Tag(name="Gym")

    # summer outfit
    tshirt = models.ClothingItem(name="t-shirt", tags=[top, cotton])
    shorts = models.ClothingItem(name="shorts", tags=[bottom])
    sneakers = models.ClothingItem(name="sneakers", tags=[shoes])

    # rainy/snowy outfit
    rain_coat = models.ClothingItem(name="rain coat", tags=[outerwear, rainy, snowy])
    boots = models.ClothingItem(name="rain boots", tags=[shoes, rainy, snowy])
    leggings = models.ClothingItem(name="leggings", tags=[bottom, rainy, snowy])
    long_sleeve = models.ClothingItem(
        name="long-sleeve shirt", tags=[top, rainy, snowy]
    )

    # sample gym outfit:
    gym_top = models.ClothingItem(name="Nike shirt", tags=[top, gym_tag])
    gym_bottom = models.ClothingItem(name="Nike shorts", tags=[bottom, gym_tag])

    # add all to user1's closet
    closet = models.Closet(
        user=user1,
        items=[tshirt, shorts, sneakers, rain_coat, boots, leggings, long_sleeve, gym_top, gym_bottom],
    )

    # Define an outfit template:
    gym_outfit_template = models.OutfitTemplate(name='Gym Outfit')
    gym_outfit_template.item_templates.extend([
        models.ItemTemplate(name="Gym Top", required_tags=[top, gym_tag]),
        models.ItemTemplate(name="Gym Bottom", required_tags=[bottom, gym_tag])
    ])

    # write to db
    db.session.add_all([closet, user1])
    db.session.commit()  # This writes the items to the database

    # Accessing the data:
    print("user1's items")
    for item in user1.get_all_items():
        print(item.serialize)
    
    print(f"Searching for a gym outfit in closet (id={closet.id}):")
    print(closet.find_matching_outfit(gym_outfit_template))
