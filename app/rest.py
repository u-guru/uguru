from flask import g, request, jsonify
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
        
        # form = UserCreateForm()

        logging.info(request.json)
        

        user_from_fb_id = User.query.filter_by(fb_id=request.json.get("id")).first()
        user_from_email = User.query.filter_by(email=request.json.get("email")).first()
        
        # Log previous user in 
        if user_from_fb_id:
            logging.info('Incoming user (id %s) already has an account' % user_from_fb_id.id)
            return user_from_fb_id, 200

        elif user_from_email: 
            # Update the user with new information from facebook.
            logging.info('Incoming user (id %s) now has a fb account' % user_from_email.id)
            user_from_email.fb_id = request.json.get("id")
            user_from_email.gender = request.json.get("gender")
            user_from_email.profile_url = request.json.get("profile_url")
            user_from_email.fb_account = True;
            db_session.commit()

            return user_from_email, 200
            

        else:
            logging.info('Incoming user (fb_id %s) now has a Uguru account' % request.json.get("id"))
            #create new user
            new_user = User(
                name=request.json.get("name"), 
                email=request.json.get("email"),
                password=None,
                profile_url=request.json.get("profle_url"),
                fb_id=request.json.get("id"),
                gender=request.json.get("gender")
            )

            return new_user, 200

        return jsonify({'errors':'Oops..Something went wrong.'}), 400


    @marshal_with(UserSerializer)
    def put(self):
        

        logging.info(request.json)
        
        print request.json
        

        return jsonify({'errors':'Oops..Something went wrong.'}), 400



        
        
        
 


# @app.route('/api/v1/fb_connect', methods=['POST'])
# def api_fb_connect():

#     logging.info(request.json)






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

