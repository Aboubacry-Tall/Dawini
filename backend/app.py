from flask import Flask

from flask_restful import Api
from resources.home import Home

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'

api = Api(app)

api.add_resource(Home, '/')