#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, abort, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db


app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dummy.db'

db.init_app(app) # Now we can use the database in our endpoints!
import models


@app.route('/')
def hello_world():
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


@app.route('/dummy/create_item', methods=['POST'])
def create_item():
    try:
        name, tag_names = request.json.get('name'), request.json.get('tags')
    except IndexError:
        abort(404)
    
    new_item = models.ClothingItem(name=name)
    tag_model_objects = [models.Tag(name=tag_name) for tag_name in tag_names]
    new_item.tags = tag_model_objects
    db.session.add(new_item)
    db.session.commit()
    return {}


if __name__ == '__main__':
    app.run(debug=True)
