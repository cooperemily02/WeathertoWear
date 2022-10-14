from flask import Flask,jsonify,request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/dummy/Dailyoutfits', methods = ['GET'])
def Return_Outfits():
    if(request.method == 'GET'):
        #"Outfit III" : ("Black rain coat", "White t-shirt" , "high waisted blue jeans", "rainboots"),
        data = {"outfits":
        [[{'name': 'black jeans', 'tag':'bottom'},{'name': 'black rain coat', 'tag':'outerwear'},{'name': 'shoes', 'tag':'rain boots'},{'name': 'white t-shirt', 'tags':'top'}],
        [{'name': 'black jeans', 'tag':'bottom'},{'name': 'black rain coat', 'tag':'outerwear'},{'name': 'shoes', 'tag':'rain boots'},{'name': 'black long sleeve', 'tags':'top'}],
        [{'name': 'high waisted blue jeans', 'tag':'bottom'},{'name': 'black rain coat', 'tag':'outerwear'},{'name': 'shoes', 'tag':'rain boots'},{'name': 'black long sl', 'tags':'top'}]]
        ]
        }
        return jsonify(data)
    

@app.route('/dummy/Closet', methods = ['GET'])
def Return_Closet():
    if(request.method == 'GET'):
        data = [

            {'name': "Black rain coat", 'tag': "outerwear"}, 
            {'name': "White t-shirt", 'tag': "top"}, 
            {'name': "black long sleeve", 'tag': "top"}, 
            {'name': "black jeans", 'tag': "bottom"}, 
            {'name': "high waisted blue jeans", 'tag': "bottom"}, 
            {'name': "rainboots", 'tag': "shoe"}
        ]
  
        return jsonify(data)

@app.route('/dummy/Laundry', methods = ['GET'])
def Return_Laundry():
    if(request.method == 'GET'):
        data = [
            {'name': "blue rain coat", 'tag': "outerwear"}, 
            {'name': "gray t-shirt", 'tag': "top"}, 
            {'name': "white long sleeve", 'tag': "top"}, 
            {'name': "brown jeans", 'tag': "bottom"}, 
            {'name': "pink shorts", 'tag': "bottom"}
        ]
  
        return jsonify(data)


if __name__ == '__main__':
    app.run()
