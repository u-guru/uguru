from flask import Flask
import os

app = Flask(__name__)
app.config.from_object('config')

import database
db = database.db_session

#Detects production env
if os.environ.get('DATABASE_URL'):
    print True
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']


from app import views, models