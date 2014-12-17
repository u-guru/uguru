from flask import g
from flask.ext import restful
from flask.ext.restful import marshal_with
from app import api, flask_bcrypt, auth
from app.database import db_session
from models import User
from forms import UserCreateForm, SessionCreateForm
from serializers import UserSerializer

 
@auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return False
    g.user = user
    return flask_bcrypt.check_password_hash(user.password, password)
 
#Creating a user
class UserView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self):
        form = UserCreateForm()
        
        # TODO, validate properly
        # if not form.validate_on_submit():
        #     return form.errors, 422
 
        user = User(form.email.data, form.password.data)
        db_session.add(user)
        db_session.commit()
        return user
 
#Logging in a user
class SessionView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self):
        form = SessionCreateForm()
        if not form.validate_on_submit():
            return form.errors, 422
 
        user = User.query.filter_by(email=form.email.data).first()
        if user and flask_bcrypt.check_password_hash(user.password, form.password.data):
            return user, 201
        return '', 401
 
 
api.add_resource(UserView, '/api/v1/users')
api.add_resource(SessionView, '/api/v1/sessions')