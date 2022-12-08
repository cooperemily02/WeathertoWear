#!/usr/bin/python
# -*- coding: utf-8 -*-
import json

from flask import Flask, flash, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

import models
import weather
from models import db
from w2w_logic.outfit_generator import Item, pick_outfit

app = Flask(__name__, static_folder="./build", static_url_path="/")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dummy.db"

db.init_app(app)  # Now we can use the database in our endpoints!


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
            if item.times_worn < item.max_wears:
                clothing_items.append(item.serialize)
    return clothing_items


@app.route("/dummy/Laundry", methods=["POST"])
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
    item_dict = request.get_json().get("item")
    selected_item = models.ClothingItem.query.get(item_dict['id'])

    selected_item.times_worn += 1

    db.session.commit()
    return selected_item.times_worn

@app.route("/dummy/itemWashed", methods=["PUT"])
def Item_Washed():
    # if a user washes an item in laundry
    item_dict = request.get_json().get("item")
    selected_item = models.ClothingItem.query.get(item_dict['id'])

    selected_item.times_worn = 0
    db.session.commit()
    
    return ({"timesWorn": selected_item.times_worn})

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
    # # this just returns all clothing, modify?
    # return user.get_all_items()
    return {}

@app.route("/dummy/sendToLaundry", methods=["PUT"])
def Send_Laundry():
    item_dict = request.get_json().get("item")
    selected_item = models.ClothingItem.query.get(item_dict['id'])
    
    selected_item.times_worn = weather.sys.maxsize
    db.session.commit()

    return selected_item.serialize

# @app.route("/dummy/userSignUp", methods=["GET"])
# def Return_New_User():
#     if request.method == "GET":
#         newUser = models.User()
#         db.session.add(newUser)
#         db.session.commit()
#         return {"userId": newUser.id}

@app.route("/dummy/userSignUp", methods=["POST"])
def Return_New_User():
    if request.method == "POST":
        # userExists = False
        user = None
        print("JSON" + json.dumps(request.get_json()))
        name = request.get_json().get("name")
        password = request.get_json().get("password")
        email = request.get_json().get("email")
        # id = request.get_json().get("id")
        # in line below filter by the id
        user = models.User.query.filter_by(
            email=email).first()  # looks in databse and tries to get the first occurence of this name in it
        if user is None:  # if the user is not in the database
            hashed_pw = generate_password_hash(password)  # needed for login
            print("hashed password")
            print(hashed_pw)
            # newUser = models.User(name=name, password_hash=password, email=email)  # add the id portion here
            newUser = models.User(name=name, password_hash=hashed_pw, email=email)  # add the id portion here
            db.session.add(newUser)
            db.session.commit()
            return {"exists": "false", "userName": newUser.name, "userId": newUser.id}
        else:
            return {"exists": "true"}


@app.route("/dummy/userLogin", methods=["POST"])
def Login():
    if request.method == "POST":
        user = None
        password_correct = 'False'
        user_exists = 'False'
        print("JSON" + json.dumps(request.get_json()))
        password = request.get_json().get("password")
        email = request.get_json().get("email")
        # in line below filter by the email
        user = models.User.query.filter_by(
            email=email).first()  # looks in databse and tries to get the first occurence of this email in it
        if user:  # if the user is  in the database
            user_exists = 'True'
            print("hashed password, login")
            print(user.password_hash)
            # check if the password user submits, matches the one in the database:
            # if password == user.password_hash:  # returns true if password of user in database is the same as the one they entered in the form
            if check_password_hash(user.password_hash, password):
                password_correct = 'True'
                return {'password_correct': password_correct, 'user_exist': user_exists, "userName": user.name, "userId": user.id}
            else:
                return {'password_correct': password_correct, 'user_exist': user_exists, "userName": user.name, "userId": user.id}
        else:
            # print('Error: that user doesnt exist, try again')
            print("user exists variable")
            print(user_exists)
            return {'password_correct': password_correct, 'user_exist': user_exists}


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
        models.Tag.query.get(tag_name) if models.Tag.query.get(tag_name) else
        models.Tag(name=tag_name) for tag_name in item_dict['attributes']
    ]
    clothing_item.tags = tag_objects

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
