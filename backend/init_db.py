from api import db, app
import models

with app.app_context():  # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()

    #TODO Implement the new_user method & make sure it works here.
    user1 = models.User.new_user(
        name='Default User',
        password='123',
        email='test@test.test'
    )

    # tags i.e attributes
    snowy = models.Tag(name="snowy")
    rainy = models.Tag(name="rainy")
    hot = models.Tag(name = "hot")
    cold = models.Tag(name = "cold")
    average = models.Tag(name = "average_temp")
    cotton = models.Tag(name="cotton")
    shoes = models.Tag(name="shoes")
    top = models.Tag(name="top")
    bottom = models.Tag(name="bottom")
    outerwear = models.Tag(name="outerwear")
    gym_tag = models.Tag(name="Gym")

    # summer outfit
    tshirt = models.ClothingItem(name="t-shirt", tags=[top, cotton], img = "https://i.imgur.com/lx9198r.jpeg")
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
    closet = user1.default_closet()
    closet.items = [tshirt, shorts, sneakers, rain_coat, boots, leggings, long_sleeve, gym_top, gym_bottom]

    # Define an outfit template, template 1:
    gym_outfit_template = models.OutfitTemplate(name='Gym Outfit')
    gym_outfit_template.item_templates.extend([
        models.ItemTemplate(name="Gym Top", required_tags=[top, gym_tag]),
        models.ItemTemplate(name="Gym Bottom", required_tags=[bottom, gym_tag])
    ])

    # Basic template, template 2:
    basic_template = models.OutfitTemplate(name='Basic Outfit')
    basic_template.item_templates.extend([
        models.ItemTemplate(name="Basic Top", required_tags=[top]),
        models.ItemTemplate(name="Basic Bottom", required_tags=[bottom]),
        models.ItemTemplate(name="Basic Bottom", required_tags=[shoes])
    ])

    # Rain template, template 3:
    rain_template = models.OutfitTemplate(name='Rain Outfit')
    rain_template.item_templates.extend([
        models.ItemTemplate(name="Rain Top", required_tags=[top, rainy]),
        models.ItemTemplate(name="Rain Bottom", required_tags=[bottom, rainy]),
        models.ItemTemplate(name="Rain Bottom", required_tags=[shoes, rainy])
    ])

    # snow template, template 4:
    snow_template = models.OutfitTemplate(name='Snow Outfit')
    snow_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, snowy]),
        models.ItemTemplate(required_tags=[bottom, snowy]),
        models.ItemTemplate(required_tags=[shoes, snowy]),
        models.ItemTemplate(required_tags=[outerwear, snowy])
    ])

     # hot template, template 5:
    hot_template = models.OutfitTemplate(name='Hot Outfit')
    hot_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, hot]),
        models.ItemTemplate(required_tags=[bottom, hot]),
        models.ItemTemplate(required_tags=[shoes, hot]),
    ])

     #cold template, template 6:
    cold_template = models.OutfitTemplate(name='Cold Outfit')
    cold_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, cold]),
        models.ItemTemplate(required_tags=[bottom, cold]),
        models.ItemTemplate(required_tags=[shoes, cold]),
    ])

    #average template, template 7, not sure whether to use this:
    avg_template = models.OutfitTemplate(name='Average Outfit')
    avg_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, average]),
        models.ItemTemplate(required_tags=[bottom, average]),
        models.ItemTemplate(required_tags=[shoes, average]),
    ])

    # write to db
    db.session.add_all([gym_outfit_template, basic_template, rain_template, snow_template, hot_template, cold_template, avg_template])
    db.session.add_all([closet, user1])
    db.session.commit()  # This writes the items to the database

    # Accessing the data:
    print("user1's items")
    for item in user1.get_all_items():
        print(item.serialize)
    
    print("user1's outfit templates:")
    print(user1.outfit_templates)

    print("models")
    for template in models.OutfitTemplate.query.all():
        print(template.serialize)
    
    print(f"Searching for a gym outfit in closet (id={closet.id}):")
    print(closet.find_matching_outfit(gym_outfit_template))
