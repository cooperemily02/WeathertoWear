#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, send_from_directory
from models import db
import weather
from w2w_logic.outfit_generator import Item, pick_outfit
import os
import json

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

image_dir = "images"
@app.route('/images/<path:filename>')  
def send_file(filename):  
    return send_from_directory(image_dir, filename)

@app.route("/dummy/clothingItem", methods=["POST"])
def Return_New_Clothing_Item():
    # form instead of json for image support
    item_dict = json.loads(request.form.get("item"))
    user_id = request.form.get("user")

    # created the clothing item in the DB based on the user input
    clothing_item = models.ClothingItem()
    clothing_item.name = item_dict["name"]
    
    # Proof of concept of accessing and saving files
    
    #print(file.filename)
    # TODO put sotorage of file in clothing_item.img setter
    #upload_dir = "images"
    #if not os.path.isdir(upload_dir):
    #    os.mkdir(upload_dir)
    #print((str(user_id) + file.filename))
    #print(os.path.join(upload_dir, (str(user_id) + file.filename)))
    #file.save(os.path.join(upload_dir, (str(user_id) + file.filename)))
    #clothing_item.img = (str(user_id) + file.filename)
    
    
    # Construct Tag objects from the request (called attributes there),
    # And add them to the clothing_item
    clothing_item.tags = [
        models.Tag(name=tag_name) for tag_name in item_dict["attributes"]
    ]

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
    file = request.files['file'] 
    clothing_item.setimg(file)
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
