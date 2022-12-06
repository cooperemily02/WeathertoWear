#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from models import db
import weather
from w2w_logic.outfit_generator import Item, pick_outfit


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
    user_id = request.get_json().get("user")
    user = models.User.query.get(user_id)

    closets = user.closets
    clothing_items = []
    for closet in closets:
        for item in closet.items:
            if item.times_worn >= item.max_wears:
                clothing_items.append(item.serialize)
    return clothing_items


@app.route("/dummy/itemSelected", methods=["PUT"])
def Item_Selected():
    # function to update an item's wears given that the user has selected it from their daily outfits 
    user_id = request.get_json().get("user")
    item_dict = request.get_json().get("item")
    user = models.User.query.get(user_id)

    items = user.get_all_items()
    selected_item = items[0]
    for item in items:
        if item.name == item_dict["name"]:
            selected_item = item
            break
    selected_item.times_worn += 1

    db.session.commit()
    return selected_item.times_worn

@app.route("/dummy/itemWashed", methods=["PUT"])
def Item_Washed():
    # if a user washes an item in laundry
    user_id = request.get_json().get("user")
    item_dict = request.get_json().get("item")
    user = models.User.query.get(user_id)

    # this section of code re-used multiple times, fix later 
    items = user.get_all_items()
    selected_item = items[0]
    for item in items:
        if item.name == item_dict["name"]:
            selected_item = item
            break

    selected_item.times_worn = 0
    db.session.commit()
    
    return selected_item.times_worn

@app.route("/dummy/washLaundry", methods=["PUT"])
def Wash_Laundry():
    # washed all items in laundry 
    user_id = request.get_json().get("user")
    user = models.User.query.get(user_id)

    items = user.get_all_items()
    for item in items:
        if item.times_worn >= item.max_wears:
            item.times_worn = 0

    db.session.commit()
    # this just returns all clothing, modify?
    return user.get_all_items()

@app.route("/dummy/sendToLaundry", methods=["PUT"])
def Send_Laundry():
    user_id = request.get_json().get("user")
    item_dict = request.get_json().get("item")
    user = models.User.query.get(user_id)

    items = user.get_all_items()
    selected_item = items[0]
    for item in items:
        if item.name == item_dict["name"]:
            selected_item = item
            break

    selected_item.times_worn = weather.sys.maxsize
    db.session.commit()

    return selected_item.serialize

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
    clothing_item.tags = [
        models.Tag(name=tag_name) for tag_name in item_dict["attributes"]
    ]

    # finds the user in the database, based on the inputted user ID
    user = models.User.query.get(user_id)

    #Find/create a default Closet for the user
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

    user = models.User.query.get(user_id)
    items = user.get_all_items()
    weather_str = weather.get_forecast(zipcode)["weather0"]

    # This is used to map/re-map the logic function's input/output type
    # from/to the ORM models
    logic_item_to_orm = {
        Item(
            name=model_item.name, attributes=[attr.name for attr in model_item.tags]
        ): model_item
        for model_item in items
    }
    logic_outfit = pick_outfit(
        items=set(logic_item_to_orm.keys()), weather_str=weather_str
    )
    orm_outfit = [logic_item_to_orm[logic_item] for logic_item in logic_outfit]

    return [orm_item.serialize for orm_item in orm_outfit]


if __name__ == "__main__":
    app.run(debug=True)
