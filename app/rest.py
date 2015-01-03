from flask import g, request, jsonify
from flask.ext import restful
from flask.ext.restful import marshal_with
from app import api, flask_bcrypt, auth
from app.database import db_session
from models import *
from forms import UserCreateForm, SessionCreateForm
from serializers import UserSerializer
from datetime import datetime
import logging, json, urllib2

 
@auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return False
    g.user = user
    return flask_bcrypt.check_password_hash(user.password, password)
 
class UniversityListView(restful.Resource):
    def get(self):

        from static.data.universities_efficient import universities_arr
        
        return json.dumps(universities_arr), 200

class MajorListView(restful.Resource):
    def get(self):
        from static.data.majors_general import majors
        
        return json.dumps({"majors":majors}), 200


class CourseListView(restful.Resource):
    def get(self):
        from static.data.courses_efficient import courses
        
        return json.dumps({"courses":courses}), 200

class UniversityMajorsView(restful.Resource):
    def get(self, id):
        from static.data.universities_majors_efficient import uni_majors_dict
        departments = uni_majors_dict[str(id)].get("departments")
        return json.dumps(departments), 200



class UserView(restful.Resource):
    
    @marshal_with(UserSerializer)
    def post(self):

        logging.info(request.json)
        

        user_from_fb_id = User.query.filter_by(fb_id=request.json.get("id")).first()
        user_from_email = User.query.filter_by(email=request.json.get("email")).first()
        
        # Log previous user in 
        if user_from_fb_id:
            
            user_from_email.fb_id = request.json.get("id")
            user_from_email.gender = request.json.get("gender")
            user_from_email.profile_url = request.json.get("profile_url")
            db_session.commit()

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
                profile_url=request.json.get("profile_url"),
                fb_id=request.json.get("id"),
                gender=request.json.get("gender")
            )

            return new_user, 200

        return jsonify({'errors':'Oops..Something went wrong.'}), 400


    @marshal_with(UserSerializer)
    def put(self):
        
        
        print request.json

        user = User.query.get(int(request.json.get('id')))

        user.name = request.json.get('name')
        # user.password = user.create_password(request.json.get('password'))
        user.email = request.json.get('email')
        user.fb_id = request.json.get('fb_id')
        user.gender = request.json.get('gender')
        user.profile_url = request.json.get('profile_url')
        user.guru_introduction = request.json.get('guru_introduction')
        user.recent_latitude = request.json.get('recent_latitude')
        user.recent_longitude = request.json.get('recent_longitude')
        user.location_services_enabled = request.json.get('location_services_enabled')

        if request.json.get('tos_signed'):
            user.tos_signed_date = datetime.now()
            user.tos_version = 1

        #If university was uploaded by the student
        if request.json.get('university_id'): user.university_id = request.json.get('university_id')

        #if the student uploaded a major
        if request.json.get('majors'): 
            major = Major.query.get(request.json.get('majors')[0].get('id'))
            user.majors.append(major)

        if request.json.get('add_course_id'): 
            course = Course.query.get(request.json.get('add_course_id'))
            user.guru_courses.append(course)

        db_session.commit()

        return user, 200




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
api.add_resource(UniversityListView, '/api/v1/universities')
api.add_resource(UniversityMajorsView, '/api/v1/universities/<int:id>/majors')
api.add_resource(MajorListView, '/api/v1/majors')
api.add_resource(CourseListView, '/api/v1/courses')

