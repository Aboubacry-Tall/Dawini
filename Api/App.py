from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:''@localhost/_flask'
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
  ]
]
# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)

user = User(username="Django", email="django@example.com")
db.create_all()
#db.session.add(user)
#db.session.commit()

class UserSchema(ma.Schema):
    class Meta:
        fields = ("username", "email")
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/', methods=['GET', 'POST'])
def home():
  return 'Home Page'

@app.route('/data', methods=['GET'])
def getData():
  return jsonify(data)

@app.route('/users', methods=['GET'])
def getUsers():
  all_users = User.query.all()
  return jsonify(users_schema.dump(all_users))

@app.route("/users/<id>", methods=['GET'])
def user_detail(id):
    user = User.query.get(id)
    return user_schema.dump(user)
