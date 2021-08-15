from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

data = [
  [
    "Python", 
    315
  ], 
  [
    "intermediate", 
    167
  ], 
  [
    "python", 
    161
  ], 
  [
    "basics", 
    118
  ], 
  [
    "web-dev", 
    108
  ], 
  [
    "data-science", 
    51
  ], 
  [
    "best-practices", 
    49
  ], 
  [
    "advanced", 
    45
  ], 
  [
    "django", 
    43
  ], 
  [
    "flask", 
    41
  ]
]

@app.route('/users', methods=['GET'])
def getUsers():
    return jsonify(data)
