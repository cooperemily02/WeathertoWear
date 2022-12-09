#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, send_from_directory
from models import db
import weather
import json
import helpers
import json

from flask import Flask, flash, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

import models
import werkzeug.exceptions

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
        print("JSON" + json.dumps(request.get_json()))
        name = request.get_json().get("name")
        password = request.get_json().get("password")
        email = request.get_json().get("email")


        user = None
        user = models.User.query.filter_by(email=email).first()  # looks in databse and tries to get the first occurence of this name in it
        if user is None:
            hashed_pw = models.User.authenticate_and_get(password)
            newUser = models.User.new_user(name, hashed_pw, email)
            return {"exists": "false", "userName": newUser.name, "userId": newUser.id}
        else:
            return {"exists": "true", "userName": user.name, "userId": user.id}

    #     #TODO: Implement what's below in the models.User class (so it can be accessed without the api)
    #     # (A method for authenticating & one for creating users), then use it here.


@app.route("/dummy/userLogin", methods=["POST"])
def Login():
    #TODO implement & use the models.User authentication method here.
    if request.method == "POST":
        user = None
        password_correct = 'False'
        user_exists = 'False'
        print("JSON" + json.dumps(request.get_json()))
        password = request.get_json().get("password")
        email = request.get_json().get("email")
        # in line below filter by the email
        user = models.User.query.filter_by(email=email).first()  # looks in databse and tries to get the first occurence of this email in it
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
                #TODO: I think it's wrong/unnecessary to return the name/id since the password is wrong here.
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

image_dir = "images"
@app.route('/images/<path:filename>')  
def send_file(filename):  
    return send_from_directory(image_dir, filename)

@app.route("/dummy/clothingItem", methods=["POST"])
def Return_New_Clothing_Item():
    try:
        print("JSON" + json.dumps(request.get_json()))
        item_dict = request.get_json().get('item')
        print("item")
        print(item_dict)
        user_id = request.get_json().get('user')
        delete_item = request.get_json().get('deleteItem')

        if delete_item == "false": #when user wants to add item to the closet
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
            #TODO: This endpoint takes in an item and a user. BUT, our model has multiple
            # closets for each user. So find/create a default Closet for the user, and
            # add the item there.
            is_user_has_closet = len(user.closets) > 0
            # if the user has a closet/default closet then add it there
            if (is_user_has_closet): 
                # we haven't talked about a default closet, use input from front end later?
                closet = (user.closets)[0]
                clothing_item.closet_id = closet.id
                print("added item")
                print(clothing_item)
                closet.items.append(clothing_item)
            else:     
                closet = models.Closet()
                closet.user = user
                closet.user_id = user.id
                clothing_item.closet_id = closet.id
                closet.items = [clothing_item]
            db.session.add(clothing_item)
            db.session.commit() 
            print("added item after adding it to database")
            print(clothing_item)
            exists = models.ClothingItem.query.filter_by(id = clothing_item.id).first()
            if exists:
                print("item exists in database")   
            return clothing_item.serialize 
        
        if delete_item == "true": #when user wants to delete item in closet
            print("item dictionary")
            print(item_dict)
            user = models.User.query.get(user_id)
            closet = (user.closets)[0]
            closet_list = closet.items
            for i in range(len(closet_list)):
                if closet_list[i].closet_id == item_dict["closet_id"] and closet_list[i].name == item_dict["name"]:
                    result = False
                    item_names = []
                    for item in closet_list[i].tags:
                        item_names.append(item.name)
                    
                    for y in range(len(item_names)):
                        for tag in item_dict["tags"]:
                            if y == len(item_names) - 1 and item_names[y] == tag:
                                # print("same")
                                result = True
                            if item_names[y] == tag:
                                continue
                    if result:
                        deleted_item = closet_list[i]
                        del closet_list[i]
                        exists = models.ClothingItem.query.filter_by(id = deleted_item.id).first()
                        db.session.delete(exists)
                        db.session.commit()
                        return {"deleted": "true"}
                    else:
                        print("Tags didn't align")
    except werkzeug.exceptions.BadRequest:
        # form instead of json for image support
        item_dict = json.loads(request.form.get("item"))
        user_id = request.form.get("user")

        # created the clothing item in the DB based on the user input
        clothing_item = models.ClothingItem()
        clothing_item.name = item_dict["name"]
        
        # Construct Tag objects from the request (called attributes there),
        # And add them to the clothing_item
        tag_objects = set([models.Tag.get_or_create(tag_name) for tag_name in item_dict['attributes']])
        tag_objects = list(tag_objects)
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
            
        if 'file' in request.files:
            file = request.files['file'] 
            clothing_item.setimg(file)
        
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
