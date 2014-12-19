from flask import g, request
from flask.ext import restful
from flask.ext.restful import marshal_with
from app import api, flask_bcrypt, auth
from app.database import db_session
from models import User
from forms import UserCreateForm, SessionCreateForm
from serializers import UserSerializer
import logging

 
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
        
        logging.info(request.json)

        # form = UserCreateForm()
        
        # TODO, validate properly
        # if not form.validate_on_submit():
        #     return form.errors, 422
 
        
        user = User('sample@gmail.com', 'wassup')
        # db_session.add(user)
        # db_session.commit()
        return user
 


# @app.route('/api/v1/fb_connect', methods=['POST'])
# def api_fb_connect():

#     logging.info(request.json)

#     user_from_fb_id = User.query.filter_by(fb_id=request.json.get("id")).first()

#     # If we can find them by their fb_id, log them in!
#     if user_from_fb_id:
#         user_from_fb_id.authenticate();
#         return json_response(http_code=200)
    
#     # If we can find them by email, but they don't have their fb_id set, we set in and log them in
#     user_from_email = User.query.filter_by(email=request.json.get("email")).first()
#     if user_from_email: 
#         # Update the user with new information from facebook.
#         user_from_email.fb_id = request.json.get("id")
#         user_from_email.gender = request.json.get("gender")
#         user_from_email.profile_url = request.json.get("profile_url")
#         user_from_email.fb_account = True;
#         db_session.commit()
#         user_from_email.authenticate();
#         return json_response(http_code=200)

#     # If we can't find them, create a new user
#     new_user = User.create_user(
#         name=request.json.get("name"), 
#         email=request.json.get("email"),
#         password=None,
#         profile_url=request.json.get("profle_url"),
#         fb_id=request.json.get("id"),
#         gender=request.json.get("gender"))

#     if not new_user:
#         return json_response(http_code=400, errors=["Couldn't create new user."]) # TODO : Use correct http status code?
#     else:
#         return json_response(http_code=200)




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