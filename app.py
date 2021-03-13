from flask import Flask, request, jsonify, redirect, url_for
from flask.templating import render_template
from flask_pymongo import PyMongo
from flask_cors import CORS
from marshmallow import Schema, fields
from bson.json_util import dumps
from json import loads
from keys import keys

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://admin:"+keys["pw"]+"@cluster0.41j7h.mongodb.net/"+keys["nm"]+"?retryWrites=true&w=majority"
mongo = PyMongo(app)

db_operations = mongo.db.tanks

class TankSchema(Schema):
  location = fields.String(required=True)
  lat = fields.Float(required=True)
  long = fields.Float(required=True)
  percentage_full = fields.Integer(required=True)

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

# DATA Routes:
@app.route("/data", methods=["GET", "POST"])
def data():
    if request.method == "POST":
        # /POST
        newTank = TankSchema().load(request.json)

        db_operations.insert_one(newTank)
        return loads(dumps(newTank))

    else:
        # /GET

        tanks = db_operations.find()
        return  jsonify(loads(dumps(tanks)))


@app.route("/data/<ObjectId:id>", methods=["DELETE"])
def update(id):

    filt = {"_id" : id}

    if request.method == "DELETE":
        # /DELETE

        tmp = db_operations.delete_one(filt)
        
        result = {"sucess" : True} if tmp.deleted_count == 1 else {"sucess" : False}
        return result

    else:
        # /GET

        tanks = db_operations.find()
        return  jsonify(loads(dumps(tanks)))

# Main
if __name__ == '__main__':
   app.run(
       debug = True,
       port = 5000)