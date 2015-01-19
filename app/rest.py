from flask import g, request, jsonify, session
from flask.ext import restful
from flask.ext.restful import marshal_with
from app import api, flask_bcrypt, auth
from app.database import db_session
from models import *
from forms import UserCreateForm, SessionCreateForm
from serializers import UserSerializer
from datetime import datetime
import logging, json, urllib2, importlib

 
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

class RankingsView(restful.Resource):
    def get(self):
        from static.data.ranking.guru import ranking_table
        
        return json.dumps({"rankings":ranking_table}), 200


class SupportView(restful.Resource):
    def post(self):

        user_id = request.json.get('user_id')
        msg = request.json.get('support_message')

        support = Support(user_id, msg)
        db_session.add(support)
        db_session.commit()

        return json.dumps({"success":True}), 200

class CourseListView(restful.Resource):
    def get(self):
        from static.data.berkeley_courses import courses
        
        return json.dumps({"courses":courses}), 200

class UniversityMajorsView(restful.Resource):
    def get(self, id):
        # from static.data.universities_majors_efficient import uni_majors_dict
        # departments = uni_majors_dict[str(id)].get("departments")
        # from pprint import pprint 
        # print pprint(departments)
        u = University.query.get(id)
        # if u.majors:
        majors_module = importlib.import_module("app.static.data.school.%s.majors_id" % "ucla")
            
        return json.dumps(majors_module.majors), 200

class UniversityCoursesView(restful.Resource):
    def get(self, id):
        # from static.data.universities_courses_efficient import uni_courses_dict
        

        # courses = uni_courses_dict[str(id)].get("courses")
        
        u = University.query.get(id)
        # if u.majors:
        courses_module = importlib.import_module("app.static.data.school.%s.courses_id" % "ucla")

        # from static.data.berkeley_courses import courses
        return json.dumps(courses_module.courses), 200

class UserPhoneView(restful.Resource):
    def post(self):


        user = User.query.get(int(request.json.get("id")))
        first_name = user.name.split(" ")[0].title()
        request
        msg = "[Uguru] Hi " + first_name + " please reply back with the " + \
            "four digit code provided in the application!"
    
        from views import TWILIO_DEFAULT_PHONE, twilio_client
        to_phone = request.json.get('phone_number')

        try:        
            message = twilio_client.messages.create(
                body_ = msg,
                to_ = to_phone,
                from_ = TWILIO_DEFAULT_PHONE,
                )

            return json.dumps({'success':True}), 200
        
        except:
            return jsonify({'errors':'Oops..Something went wrong.'}), 400
            



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
        user.push_notifications = request.json.get('push_notifications')
        user.ios_apn_token = request.json.get('ios_apn_token')

        if request.json.get('tos_signed'):
            user.tos_signed_date = datetime.now()
            user.tos_version = 1

        if request.json.get('phone_number'):
            user.phone_number = request.json.get('phone_number')

        #If university was uploaded by the student
        if request.json.get('university_id'): user.university_id = request.json.get('university_id')

        #if the student uploaded a major
        if 'majors' in request.json: 


            print request.json.get('majors')

            all_major_ids = [major.get('id') for major in request.json.get('majors')]
        
            #remove all courses
            if not request.json.get('majors'):
                user.majors = []

            # Add all relevant ones
            for major in request.json.get('majors'):
                
                
                if major.get('id'):
                    major_id = int(major.get('id'))
                    major = Major.query.get(major_id)
                # else:
                #     major = Major.user_create(major.get("name"), user.id)
                #     user.majors.append(major)
                #     all_major_ids.append(major.id)
                #     print "user created customer major", major.get("name")
                
                if not major in user.majors:
                    user.majors.append(major)
                    print major.name, 'added by student'

            # Remove all irrelevant ones
            majors_to_remove = []
            for major in user.majors:
                if major.id not in all_major_ids:
                    majors_to_remove.append(major)

            for major in majors_to_remove:
                user.majors.remove(major)
                print major.name, 'removed by student'


        # if request.json.get('add_course_id'): 
        #     course = Course.query.get(request.json.get('add_course_id'))
        #     user.guru_courses.append(course)

        if 'guru_courses' in request.json: 

            print request.json.get('guru_courses')
            print user.guru_courses

            all_course_id = [int(course.get('id')) for course in request.json.get('guru_courses')]
            print all_course_id
        
            #remove all courses
            if not request.json.get('guru_courses'):
                user.guru_courses = []
                print "all courses removed by student"

            # Add all relevant ones
            for course in request.json.get('guru_courses'):
                
                course_id = int(course.get('id'))
                course = Course.query.get(course_id)
                
                if not course in user.guru_courses:
                    user.guru_courses.append(course)
                    print course.name, 'added by student'

            # Remove all irrelevant ones
            courses_to_remove = []
            for course in user.guru_courses:
                if course.id not in all_course_id:
                    courses_to_remove.append(course)

            for course in courses_to_remove:
                user.guru_courses.remove(course)
                print course.name, 'removed by student'

            print user.guru_courses
            print user.majors

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
 

class AdminSessionView(restful.Resource):
    def post(self):
    
        email = request.json.get('email')
        password = request.json.get('password')

        if email == "admin@uguru.me" and password == "launchuguru":

            session['admin'] = True

            return json.dumps({}),200

        return json.dumps({}),400


    def delete(self):

        if session.get('user_id'):

            session.pop('admin')

            return json.dumps({}),200

        return json.dumps({}),400

class AdminSendView(restful.Resource):
    def post(self):

        from app.emails import send_campaign_email, send_campaign_email_test
        

        if request.json.get('test_id'):
            recipient = Recipient.query.get(int(request.json.get('test_id')))
            result = send_campaign_email_test(request.json, [recipient])
        else:
            print "supposed to send real email"

        return json.dumps({}),200


class AdminUserView(restful.Resource):
    
    def put(self):

        user_id = int(request.json.get('user_id'))
        print user_id

        u = User.query.filter_by(id=user_id).first()
        db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == u.id))
        db_session.commit()
        db_session.execute(user_major_table.delete(user_major_table.c.user_id == u.id))
        db_session.commit()
        for support in Support.query.all():
            if support.user_id == u.id:
                db_session.delete(support)
                db_session.commit()
        user_contributed_majors = Major.query.filter_by(contributed_user_id=u.id)
        for major in user_contributed_majors:
            db_session.delete(major)
        print u.name, u.email, "deleted"
        db_session.delete(u)
        db_session.commit()

        return json.dumps({}),200
 
api.add_resource(UserView, '/api/v1/users')
api.add_resource(UserPhoneView, '/api/v1/phone')
api.add_resource(SupportView, '/api/v1/support')
api.add_resource(SessionView, '/api/v1/sessions')
api.add_resource(RankingsView, '/api/v1/rankings')
api.add_resource(UniversityListView, '/api/v1/universities')
api.add_resource(UniversityMajorsView, '/api/v1/universities/<int:id>/majors')
api.add_resource(UniversityCoursesView, '/api/v1/universities/<int:id>/courses')
api.add_resource(MajorListView, '/api/v1/majors')
api.add_resource(CourseListView, '/api/v1/courses')

# Admin views
api.add_resource(AdminSessionView, '/api/admin')
api.add_resource(AdminUserView, '/api/admin/users/')
api.add_resource(AdminSendView, '/api/admin/send')


