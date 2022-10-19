#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'


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


if __name__ == '__main__':
    app.run()
