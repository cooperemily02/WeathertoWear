#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from models import db


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
    return [item.serialize for item in models.ClothingItem.query.all()]
    if request.method == 'GET':
        data = [
            {'name': 'Black rain coat', 'tags': ['outerwear']},
            {'name': 'White t-shirt', 'tags': ['top']},
            {'name': 'black long sleeve', 'tags': ['top']},
            {'name': 'black jeans', 'tags': ['bottom']},
            {'name': 'high waisted blue jeans', 'tags': ['bottom']},
            {'name': 'rainboots', 'tags': ['shoe']},
        ]
        return jsonify(data)


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
        

if __name__ == '__main__':
    app.run(debug=True)
