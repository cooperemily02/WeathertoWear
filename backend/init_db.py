from api import db, app
import models
import os

with app.app_context():  # context is needed so sqlalchemy knows where to create the database
    db.drop_all()
    db.create_all()

    user1 = models.User()

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
    sneakers = models.ClothingItem(name="sneakers", tags=[shoes])
    sneakers.setimg('sneakers.jpeg')

    # rainy/snowy outfit
    blue_rain_coat = models.ClothingItem(name="blue coat", tags=[outerwear, rainy, snowy])
    blue_rain_coat.setimg('BlueCoat.jpeg')
    red_coat = models.ClothingItem(name="red coat", tags=[outerwear, rainy, snowy])
    red_coat.setimg('RedCoat.jpeg')
    boots = models.ClothingItem(name="rain boots", tags=[shoes, rainy, snowy])
    boots.setimg('Boots.jpeg')
    green_sweats = models.ClothingItem(name="Green Sweats", tags=[bottom, rainy, snowy])
    green_sweats.setimg('GreenSweats.jpeg')
    jeans = models.ClothingItem(name="jeans", tags=[bottom, rainy, snowy])
    jeans.setimg('BlueJeans.jpeg')
    long_sleeve = models.ClothingItem(
        name="long-sleeve shirt", tags=[top, rainy, snowy]
    )
    long_sleeve.setimg('longSleeve.jpg')

    # sample gym outfit:
    gym_top = models.ClothingItem(name="Blue T-Shirt", tags=[top, gym_tag])
    gym_top.setimg('BlueTshirt.jpeg')
    gym_bottom = models.ClothingItem(name="shorts", tags=[bottom, gym_tag])
    gym_bottom.setimg('KhakiShorts.jpeg')

    # add all to user1's closet
    closet = user1.default_closet()
    closet.items = [jeans, sneakers, blue_rain_coat, boots, green_sweats, long_sleeve, gym_top, gym_bottom, red_coat]

    # Define an outfit template, template 1:
    gym_outfit_template = models.OutfitTemplate(name='Gym Outfit')
    gym_outfit_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, gym_tag]),
        models.ItemTemplate(required_tags=[bottom, gym_tag])
    ])
    user1.outfit_templates.append(gym_outfit_template)

    # Basic template, template 2:
    basic_template = models.OutfitTemplate(name='Basic Outfit')
    basic_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top]),
        models.ItemTemplate(required_tags=[bottom]),
        models.ItemTemplate(required_tags=[shoes])
    ])
    user1.outfit_templates.append(basic_template)

    # Rain template, template 3:
    rain_template = models.OutfitTemplate(name='Rain Outfit')
    rain_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, rainy]),
        models.ItemTemplate(required_tags=[bottom, rainy]),
        models.ItemTemplate(required_tags=[shoes, rainy]),
        models.ItemTemplate(required_tags=[outerwear, rainy])
    ])
    user1.outfit_templates.append(rain_template)

    # snow template, template 4:
    snow_template = models.OutfitTemplate(name='Snow Outfit')
    snow_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, snowy]),
        models.ItemTemplate(required_tags=[bottom, snowy]),
        models.ItemTemplate(required_tags=[shoes, snowy]),
        models.ItemTemplate(required_tags=[outerwear, snowy])
    ])
    user1.outfit_templates.append(snow_template)

     # hot template, template 5:
    hot_template = models.OutfitTemplate(name='Hot Outfit')
    hot_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, hot]),
        models.ItemTemplate(required_tags=[bottom, hot]),
        models.ItemTemplate(required_tags=[shoes, hot]),
    ])
    user1.outfit_templates.append(hot_template)

     #cold template, template 6:
    cold_template = models.OutfitTemplate(name='Cold Outfit')
    cold_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, cold]),
        models.ItemTemplate(required_tags=[bottom, cold]),
        models.ItemTemplate(required_tags=[shoes, cold]),
    ])
    user1.outfit_templates.append(cold_template)

    #average template, template 7, not sure whether to use this:
    avg_template = models.OutfitTemplate(name='Average Outfit')
    avg_template.item_templates.extend([
        models.ItemTemplate(required_tags=[top, average]),
        models.ItemTemplate(required_tags=[bottom, average]),
        models.ItemTemplate(required_tags=[shoes, average]),
    ])
    user1.outfit_templates.append(avg_template)

    # write to db
    db.session.add_all([closet, user1])
    db.session.commit()  # This writes the items to the database

    # Accessing the data:
    print("user1's items")
    for item in user1.get_all_items():
        print(item.serialize)
    
    print("user1's outfit templates:")
    print(user1.outfit_templates)
    
    print(f"Searching for a gym outfit in closet (id={closet.id}):")
    print(closet.find_matching_outfit(gym_outfit_template))
