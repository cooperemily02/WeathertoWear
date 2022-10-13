from flask import Flask,jsonify,request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
  
@app.route('/Dailyoutfits', methods = ['GET'])
def Return_Outfits():


    if(request.method == 'GET'):
        data = {
            "Outfit I" : ("Black rain coat", "White t-shirt", "black jeans", "rainboots"), 
            "Outfit II" : ("Black rain coat", "black long sleeve", "black jeans", "rainboots"), 
            "Outfit III" : ("Black rain coat", "White t-shirt" , "high waisted blue jeans", "rainboots"), 
            "Outfit IV" : ("Black rain coat", "black long sleeve" , "high waisted blue jeans", "rainboots")
        }

        return jsonify(data)
    

@app.route('/Closet', methods = ['GET'])
def Return_Closet():
    if(request.method == 'GET'):
        data = {
            "outerwear": ("Black rain coat"),
            "tops" : ("White t-shirt", "black long sleeve"), 
            "bottoms": ("black jeans", "high waisted blue jeans"), 
            "shoes": ("rainboots")
        }
  
        return jsonify(data)

@app.route('/Laundry', methods = ['GET'])
def Return_Laundry():
    if(request.method == 'GET'):
        data = {
            "outerwear": ("blue rain coat"), 
            "tops" : ("gray t-shirt", "white long sleeve"), 
            "bottoms": ("brown jeans", "pink shorts")
        }
  
        return jsonify(data)


if __name__ == '__main__':
    app.run()
