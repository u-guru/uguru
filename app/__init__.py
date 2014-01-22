from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

import database
db = database.db_session

from app import views, models