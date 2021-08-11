from flask import Flask, jsonify, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Tests(Resource):
    def get(self):
        return {'methods': 'GET'}

    def post(self):
        some_json = request.get_json()
        return {'methods': 'POST'}, 201

api.add_resource(Tests, "/")

"""
@app.route("/", methods=["GET", "POST"])
def hello():
    if(request.method == "POST"):
        some_json = request.get_json()
        return jsonify({"M": "POST"}), 201
    else:
        return jsonify({"M": "GET"})
"""