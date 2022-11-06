#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from models import db
import weather


app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dummy.db'

db.init_app(app) # Now we can use the database in our endpoints!
import models


@app.route('/')
def index():
    # We don't want to use 'send_static' for development. 
    # The index page in that case will be from the react server (port 3000 usually)
    if __name__ == "__main__":
        return "You are running in dev mode! (This is good, if you are a dev)"
    # This is used for deployments and/or one-step tester, not development
    return app.send_static_file('index.html')


@app.route('/dummy/Dailyoutfits', methods=['GET'])
def Return_Outfits():
    if request.method == 'GET':
        data = {'outfits': [
            [
                {'name': 'black jeans', 'tags': ['bottom']},
                {'name': 'black rain coat', 'tags': ['outerwear']},
                {'name': 'shoes', 'tags': ['rain boots']},
                {'name': 'white t-shirt', 'tags': ['top']}
            ],
            [
                {'name': 'black jeans', 'tags': ['bottom']},
                {'name': 'black rain coat', 'tags': ['outerwear']},
                {'name': 'shoes', 'tags': ['rain boots']},
                {'name': 'black long sleeve', 'tags': ['top']}
            ],
            [
                {'name': 'high waisted blue jeans', 'tags': ['bottom']},
                {'name': 'black rain coat', 'tags': ['outerwear']},
                {'name': 'shoes', 'tags': ['rain boots']},
                {'name': 'white t-shirt', 'tags': ['top']}
            ],
            [
                {'name': 'high waisted blue jeans', 'tags': ['bottom']},
                {'name': 'black rain coat', 'tags': ['outerwear']},
                {'name': 'shoes', 'tags': ['rain boots']},
                {'name': 'black long sleeve', 'tags': ['top']}
            ]
        ]}

        return jsonify(data)


@app.route('/dummy/Closet', methods=['GET'])
def Return_Closet():
    user_id = request.get_json().get('user')
    user = models.User.query.get(user_id)

    # return items from all closets of the user
    # TODO: re-design to return specific closet's items (later)
    closets = user.closets
    clothing_items = []
    for closet in closets: 
      for item in closet.items:
          clothing_items.append(item.serialize)
    return clothing_items 


@app.route('/dummy/Laundry', methods=['GET'])
def Return_Laundry():
    if request.method == 'GET':
        data = [
            {'name': 'blue rain coat', 'tags': ['outerwear']},
            {'name': 'gray t-shirt', 'tags': ['top']},
            {'name': 'white long sleeve', 'tags': ['top']},
            {'name': 'brown jeans', 'tags': ['bottom']},
            {'name': 'pink shorts', 'tags': ['bottom']}
        ]
        return jsonify(data)

@app.route('/dummy/userSignUp', methods=['GET'])
def Return_New_User():
    if request.method == 'GET':
        newUser = models.User()
        db.session.add(newUser)
        db.session.commit()
        return {'userId': newUser.id}

@app.route('/dummy/getForecast/<zipcode>', methods=['GET'])
def Return_Forecast(zipcode: str):
    if request.method == 'GET':
        return weather.get_forecast(zipcode)

@app.route('/dummy/clothingItem', methods=['POST'])
def Return_New_Clothing_Item():
    # get_json is needed instead of 'form'
    item_dict = request.get_json().get('item')
    user_id = request.get_json().get('user')

    # created the clothing item in the DB based on the user input
    clothing_item = models.ClothingItem()
    clothing_item.name = item_dict["name"]
    
    # Construct Tag objects from the request (called attributes there), 
    # And add them to the clothing_item
    clothing_item.tags = [models.Tag(name=tag_name) for tag_name in item_dict['attributes']]

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

if __name__ == '__main__':
    app.run(debug=True)
