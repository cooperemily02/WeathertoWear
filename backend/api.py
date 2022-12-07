#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from models import db
import weather
from w2w_logic.outfit_generator import Item, pick_outfit
import helpers


app = Flask(__name__, static_folder="./build", static_url_path="/")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dummy.db"

db.init_app(app)  # Now we can use the database in our endpoints!
import models


@app.route("/")
def index():
    # We don't want to use 'send_static' for development.
    # The index page in that case will be from the react server (port 3000 usually)
    if __name__ == "__main__":
        return "You are running in dev mode! (This is good, if you are a dev)"
    # This is used for deployments and/or one-step tester, not development
    return app.send_static_file("index.html")


@app.route("/dummy/Closet", methods=["POST"])
def Return_Closet():
    user_id = request.get_json().get("user")
    user = models.User.query.get(user_id)

    # return items from all closets of the user
    # TODO: re-design to return specific closet's items (later)
    closets = user.closets
    clothing_items = []
    for closet in closets:
        for item in closet.items:
            clothing_items.append(item.serialize)
    return clothing_items


@app.route("/dummy/Laundry", methods=["GET"])
def Return_Laundry():
    if request.method == "GET":
        data = [
            {"name": "blue rain coat", "tags": ["outerwear"]},
            {"name": "gray t-shirt", "tags": ["top"]},
            {"name": "white long sleeve", "tags": ["top"]},
            {"name": "brown jeans", "tags": ["bottom"]},
            {"name": "pink shorts", "tags": ["bottom"]},
        ]
        return jsonify(data)


@app.route("/dummy/userSignUp", methods=["GET"])
def Return_New_User():
    if request.method == "GET":
        newUser = models.User()
        db.session.add(newUser)
        db.session.commit()
        return {"userId": newUser.id}


@app.route("/dummy/getForecast/<zipcode>", methods=["GET"])
def Return_Forecast(zipcode: str):
    if request.method == "GET":
        return weather.get_forecast(zipcode)


@app.route("/dummy/clothingItem", methods=["POST"])
def Return_New_Clothing_Item():
    # get_json is needed instead of 'form'
    item_dict = request.get_json().get("item")
    user_id = request.get_json().get("user")

    # created the clothing item in the DB based on the user input
    clothing_item = models.ClothingItem()
    clothing_item.name = item_dict["name"]

    # Construct Tag objects from the request (called attributes there),
    # And add them to the clothing_item
    tag_objects = [
        models.Tag.get_or_create(tag_name) for tag_name in item_dict['attributes']
    ]
    clothing_item.tags = tag_objects

    # finds the user in the database, based on the inputted user ID
    user = models.User.query.get(user_id)

    # TODO: This endpoint takes in an item and a user. BUT, our model has multiple
    # closets for each user. So find/create a default Closet for the user, and
    # add the item there.
    is_user_has_closet = len(user.closets) > 0
    # if the user has a closet/default closet then add it there
    if is_user_has_closet:
        # we haven't talked about a default closet, use input from front end later?
        closet = (user.closets)[0]
        clothing_item.closet_id = closet.id
        closet.items.append(clothing_item)
    else:
        closet = models.Closet()
        closet.user = user
        closet.user_id = user.id
        clothing_item.closet_id = closet.id
        closet.items = [clothing_item]
    db.session.add(clothing_item)
    db.session.commit()

    return clothing_item.serialize


@app.route("/gen-outfit", methods=["POST"])
def generate_outfit():
    data = request.get_json()
    zipcode, user_id = data["zipcode"], data["user"]

    user: models.User = models.User.query.get(user_id)
    closet = user.default_closet()
    items = user.get_all_items()
    weather_str = weather.get_forecast(zipcode)["weather0"]
    #TODO: refactoring. (right now this helper method uses defaults/hardcode to work under flexible conditons)
    outfit_template_id = helpers.get_default_template_id_from_weather_str(weather_str)
    outfit_template = models.OutfitTemplate.query.get(outfit_template_id)

    items, item_to_its_template = closet.find_matching_outfit(outfit_template)
    # Adding the template id's for future use:
    return [
        item.serialize_with_template_id(item_to_its_template[item]) for item in items
    ]



@app.route("/outfit-template", methods=["POST"])
def outfit_template():
    breakpoint()
    data = request.get_json()
    #TODO: get user_id instead of hardcoding '1'
    outfit_template = models.OutfitTemplate(
        name=data['name'],
        user_id=1,
        item_templates=[
            models.ItemTemplate(name=template['name'], required_tags=[
                models.Tag.get_or_create(name=tag_name) for tag_name in template['tags']
            ])
            for template in data['item-templates']
        ]
    )
    db.session.add(outfit_template)
    db.session.commit()
    return {}

"""
Gets the outfit_templates of the user
"""
@app.route("/outfit-templates", methods=["POST"])
def outfit_templates():
    data = request.get_json()
    user = models.User.query.get(data['user'])
    return [template.serialize for template in user.outfit_templates]

"""
Gets a clean item matching 'item_template' id from the user's closet(s)
"""
@app.route("/item-from-template", methods=["POST"])
def get_item_from_template():
    data = request.get_json()
    user: models.User = models.User.query.get(data['user'])
    item_template = models.ItemTemplate.query.get(data['item_template'])
    excluded_items = set()
    if 'excluded_item' in data:
        excluded_items.add(models.ClothingItem.query.get(data['excluded_item']))
    match: models.ClothingItem = user.default_closet().find_matching_item(item_template=item_template, excluded_items=excluded_items) 
    # Add the template_id, this lets the frontend know what template the item matched (for regeneration)
    item_dict = match.serialize.copy()
    item_dict['item_template'] = data['item_template']
    return item_dict

if __name__ == "__main__":
    app.run(debug=True)
