# -*- coding: utf-8 -*-
from flask import g, request, jsonify, session, abort
from flask.ext import restful
from flask.ext.restful import marshal_with
from app import api, flask_bcrypt, auth
from app.database import db_session
from models import *
from serializers import *
from forms import UserCreateForm, SessionCreateForm
from datetime import datetime
import logging, json, urllib2, importlib
from lib.api_utils import json_response
from pprint import pprint


APPROVED_ADMIN_TOKENS = ['9c1185a5c5e9fc54612808977ee8f548b2258d34', 'be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4', 'fe78e1c1cddfe4b132c7963136243aa51ac5609fb17839bf65a446d6']

@auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return False
    g.user = user
    return flask_bcrypt.check_password_hash(user.password, password)


class VersionView(restful.Resource):
    def get(self):
        version_dict = {
            'version':Version.query.get(1).latest_ios,
            'ios_msg': Version.query.get(1).latest_ios
        }
        return json.dumps(version_dict), 200

class MajorListView(restful.Resource):
    def get(self):
        from app.static.data.majors_general import majors

        return json.dumps({"majors":majors}), 200

class RankingsView(restful.Resource):
    def get(self):
        from static.data.ranking.guru import ranking_table

        return json.dumps({"rankings":ranking_table}), 200


class SupportView(restful.Resource):

    @marshal_with(UserSerializer)
    def post(self):

        user = get_user(request.json.get('user_id'))

        if not user:
            abort(404)

        msg = request.json.get('message')

        support = Support.init(user, msg, request.json)

        return user, 200

class CourseListView(restful.Resource):
    def get(self):
        from static.data.berkeley_courses import courses

        return json.dumps({"courses":courses}), 200



class SkillListView(restful.Resource):
    @marshal_with(SkillSerializer)
    def get(self):

        skills = Skill.query.filter_by(is_popular=True).all()

        return skills, 200

class ProfessionListView(restful.Resource):
    @marshal_with(TagSerializer)
    def get(self):

        professions = Tag.query.filter_by(is_profession=True).all()

        return professions, 200

class CategoryListView(restful.Resource):
    @marshal_with(CategorySerializer)
    def get(self):

        return Category.query.all(), 200


class UniversityListView(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self):
        from app.static.data.popular_data import getPreparedUniversitiesObj
        prepared_universities = getPreparedUniversitiesObj(University.query.all())
        return prepared_universities, 200

class UniversityDetailedListView(restful.Resource):
    @marshal_with(AdminUniversityDetailedSerializer)
    def get(self, _id):
        university = University.query.get(_id)
        return university, 200

class UniversityMajorsView(restful.Resource):
    @marshal_with(DepartmentSerializer)
    def get(self, _id):
        u = University.query.get(_id)
        departments = u.departments
        return departments, 200

class UniversityPopularCoursesView(restful.Resource):
    @marshal_with(AdminUniversityDeptCourseSerializer)
    def get(self, _id):
        u = University.query.get(_id)
        if not u:
            abort(404)
        else:
            courses = u.popular_courses
            courses = sorted(u.popular_courses, key=lambda k:k.num_gurus,reverse=True)
            if not courses:
                course = u.courses
                courses = sorted(u.courses, key=lambda k:k.num_gurus,reverse=True)
            return courses, 200

class UniversityCoursesView(restful.Resource):
    @marshal_with(CourseSerializer)
    def get(self, _id):
        # from static.data.universities_courses_efficient import uni_courses_dict


        # courses = uni_courses_dict[str(id)].get("courses")s
        u = University.query.get(_id)
        university_courses = u.courses
        if not university_courses:
            #just grab ucla courses
            u = University.query.get(2752)
            return u.courses, 200
        else:
            return university_courses, 200
        # from static.data.berkeley_courses import courses

class OneDeviceView(restful.Resource):
    @marshal_with(DeviceSerializer)
    def post(self):

        print request.json
        uuid = request.json.get('uuid')
        print request.json

        new_device = Device.query.filter_by(uuid = uuid).first()

        if new_device:
            print 'device already exists', new_device.id
            if new_device.user_id:

                print 'and has a user', new_device.user.name
                new_device.user.current_device = new_device
                db_session.commit()

            if request.json.get('user_id') and not new_device.user_id:
                print 'adding device for this user'
                user = User.query.get(int(request.json.get('user_id')))
                if user and not new_device in user.devices:
                    print user
                    new_device.user_id = user.id
                    db_session.commit()


            return new_device, 200



        d = Device()
        d.model = request.json.get('model')
        d.cordova = request.json.get('cordova')
        d.platform = request.json.get('platform')
        d.uuid = request.json.get('uuid')
        d.version = request.json.get('version')
        d.name = request.json.get('name')
        d.time_created = datetime.now()
        d.last_accessed = datetime.now()

        # if request.json.get('auth_token'):
        #     # later
        #     pass

        db_session.add(d)
        db_session.commit()

        return d, 200


class DeviceView(restful.Resource):

    @marshal_with(DeviceSerializer)
    def put(self, device_id):

        device = Device.query.get(device_id)

        if not device:
            abort(404)

        print request.json
        previous_push_notif_value = device.push_notif

        if 'push_notif_enabled' in request.json:
            device.push_notif_enabled = request.json.get('push_notif_enabled')
            if device.user:
                device.user.push_notifications = True
                if 'push_notif' in request.json:
                    device.user.push_notifications_enabled = True

        if 'network_speed' in request.json:
            device.network_speed = request.json.get('network_speed')
        if 'body_load_time' in request.json:
            device.body_load_time = request.json.get('body_load_time')
        if 'device_load_time' in request.json:
            device.device_load_time = request.json.get('device_load_time')
        if 'push_notif' in request.json:
            device.push_notif = request.json.get('push_notif')
        if 'typical_network_speed' in request.json:
            device.typical_network_speed = request.json.get('typical_network_speed')
        if 'is_test_device' in request.json:
            device.is_test_device = request.json.get('is_test_device')

        if 'location_enabled' in request.json:
            device.location_enabled = request.json.get('location_enabled')
        if 'camera_enabled' in request.json:
            device.camera_enabled = request.json.get('camera_enabled')
        if 'background_location_enabled':
            device.background_location_enabled = request.json.get('background_location_enabled')

        # there is a token that was recently added, enable user push notifications
        # if device.push_notif and len(device.push_notif) > 5 and device.user and not previous_push_notif_value:


        print 'push notifications', device.push_notif_enabled, device.push_notif

        db_session.commit()


        return device, 200


class HomeSubscribeView(restful.Resource):

    def post(self):
        if request.json.get('phone_number'):
            phone_number = request.json.get('phone_number')
            from texts import send_text_message
            message = '[Uguru] Download the Uguru App here: http://uguru.me/app/'
            result = send_text_message(phone_number, message)
            if not (result):
                return 422
            return 200

        if request.json.get('email'):
            email = request.json.get('email')
            print request.json.get('email')
            from emails import send_web_reminder_email
            subject = 're: following up - got a min?'
            message = """
            <br><br>
            Just wanted to take a sec & personally invite you to the platform!
            <br> <br>
            Plz let me know if you ...
            <br><br>
            &nbsp;&nbsp;&nbsp;1. Have any questions<br>
            &nbsp;&nbsp;&nbsp;2. This email was entered by mistake<br>
            &nbsp;&nbsp;&nbsp;3. Want an access code for our app
            <br><br><br>
            Have a good one!<br><br>
            --<br>
            Samir<br>
            Founding Guru<br>
            <br><br><br>
            sent w/ iPhone, if iTypos... iApologhiz
            """

            result = send_web_reminder_email(email, subject, message)
            if not (result):
                return 422
            return 200


        abort(400)

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




class UserOneView(restful.Resource):
    # /user/1
    @marshal_with(UserSerializer)
    def get(self, _id):
        user = User.query.get(_id)

        if not user:
            abort(400)

        v = Version.query.get(1)
        db_session.refresh(v)
        [db_session.refresh(_request) for _request in user.requests]
        [db_session.refresh(_session) for _session in user.guru_sessions]
        [db_session.refresh(_session) for _session in user.student_sessions]
        [db_session.refresh(proposal) for proposal in user.guru_proposals]
        db_session.refresh(user)

        # if not request.json.get('auth_token'):
        #     abort(400)


        print user.university.school_color_dark
        if not user.profile_url:
            user.profile_url = "https://graph.facebook.com/10152573868267292/picture?width=100&height=100"
            db_session.commit()

        return user, 200


    @marshal_with(UserSerializer)
    def put(self, _id):
        # if not request.json.get('auth_token'):
        #     abort(400)

        user = User.query.get(_id)
        if not user and request.json.get('email') and request.json.get('forgot_password'):
            email_user = User.query.filter_by(email=request.json.get('email')).first()
            if email_user:
                from hashlib import md5
                import uuid
                raw_password = uuid.uuid4().hex[0:5]
                email_user.password = md5(raw_password).hexdigest()
                db_session.commit()
                from app.emails import send_reset_password_email
                send_reset_password_email(email_user, raw_password)
                return 201
            else:
                abort(404)
        if not user:
            abort(400)

        from datetime import datetime
        user.last_active = datetime.now()
        db_session.commit()

        # if request.json.get('auth_token') != user.auth_token:
        #     abort(400)

        if request.json.get('university_id'):
            user.university_id = request.json.get('university_id')

        # if request.json.get('email'):

        #     if not user.email:
        #         user.email = request.json.get('email_address')

        if request.json.get('add_hs_university'):
            university_id = int(request.json.get('add_hs_university'))
            if university_id:
                university = University.query.get(university_id)
                user.universities.append(university)
            else:
                abort(404)

        if request.json.get('remove_hs_university'):
            university_id = int(request.json.get('remove_hs_university'))
            if university_id:
                university = University.query.get(university_id)
                user.universities.remove(university)
            else:
                abort(404)

        if request.json.get('confirm_school_email'):
            from emails import send_transactional_email
            from hashlib import md5
            import random
            user.school_email = request.json.get('confirm_school_email')

            user.school_email_token = md5(str(random.randrange(1000, 10000))).hexdigest()

            base_url = "uguru.me"
            if not os.environ.get('PRODUCTION'):
                base_url = "0.0.0.0:5000"

            link = 'http://' + base_url + '/auth/school_email/' + user.school_email_token
            db_session.commit()


            msg_args = (user.name.split(' ')[0], link)
            msg = """Hi %s,<br><br>Please click this <a href="%s">link</a> to confirm your email <br><br>Best,<br> The Uguru Team""" % msg_args
            print send_transactional_email("[Uguru] Please Authenticate Your School Email", msg, user, "school-email-auth", user.school_email)



        if request.json.get('check_school_email_code'):
            school_code = request.json.get('check_school_email_code')
            user.school_email_confirmed = (school_code == user.school_email_token)
            db_session.commit()

        if not user.phone_number:
            if request.json.get('phone_number'):
                user.phone_number = request.json.get('phone_number')


        if request.json.get('phone_number_generate'):
            phone_number = request.json.get('phone_number_generate')
            from texts import send_text_message
            import random
            user.phone_number_token = str(random.randrange(1000,10000))
            user.phone_number = phone_number
            message = '[Uguru] Hi %s, your phone number confirmation code is %s' % (user.name.split(' ')[0].title(), user.phone_number_token)
            send_text_message(phone_number, message)
            print message
            db_session.commit()

        if request.json.get('phone_number_check_token'):
            print 'this works'
            phone_number_token = request.json.get('phone_number_check_token')
            user.phone_number_confirmed = (user.phone_number_token == phone_number_token)
            print user.phone_number_token
            db_session.commit()

        if request.json.get('profile_info'):
            profile_info_dict = request.json.get('profile_info')
            email = profile_info_dict.get('email')
            name = profile_info_dict.get('first_name').title() + ' ' + profile_info_dict.get('last_name').title()
            user.email = email
            user.name = name
            db_session.commit()

        if request.json.get('remove_guru_experience'):
            guru_experience_json = request.json.get('remove_guru_experience')
            experience_id = guru_experience_json.get('id')
            experience = Experience.query.get(experience_id)
            if experience and experience in user.guru_experiences:
                user.guru_experiences.remove(experience)
                db_session.commit()

        if request.json.get('add_guru_experience'):
            print 'guru_experience_received'
            guru_experience_json = request.json.get('add_guru_experience')
            experience_name = guru_experience_json.get('name')
            experience_years = guru_experience_json.get('years')
            experience_description = guru_experience_json.get('description')

            guru_experience_names = []
            if user.guru_experiences:
                guru_experience_names = [experience.name for experience in user.guru_experiences]

            if experience_name not in guru_experience_names:
                experience = Experience()
                experience.contributed_user_id = user.id
                experience.university_id = user.university_id
                experience.time_created = datetime.now()
                experience.description = experience_description
                experience.name = experience_name
                experience.years = experience_years
                experience.last_updated = datetime.now()
                experience.time_created = datetime.now()

                db_session.add(experience)
                db_session.commit()

        if request.json.get('update_guru_experience') and request.json.get('update_guru_experience').get('id'):
            guru_experience_json = request.json.get('update_guru_experience')
            guru_experience_id = guru_experience_json.get('id')

            experience = Experience.query.get(guru_experience_id)
            experience.name = guru_experience_json.get('name')
            experience.years = guru_experience_json.get('years')
            experience.description = guru_experience_json.get('description')
            experience.last_updated = datetime.now()

            db_session.commit()

        if request.json.get('change_password'):
            print request.json.get('change_password')
            change_password_dict = request.json.get('change_password')

            email = change_password_dict.get('email')
            old_password = change_password_dict.get('old_password')
            new_password = change_password_dict.get('new_password')


            from hashlib import md5

            user_exists = User.query.filter_by(
                email=change_password_dict.get('email'),
                password=md5(change_password_dict.get('old_password')).hexdigest()
                ).first()

            fb_create_account = (user_exists and user.fb_id and not user.password)
            if not user_exists and not fb_create_account:
                abort(401)

            user.password = md5(change_password_dict.get('new_password')).hexdigest()
            db_session.commit()


        if 'is_a_guru' in request.json:
            user.is_a_guru = request.json.get('is_a_guru')

        if 'current_hourly' in request.json:
            print 'woohoo current hourly'
            user.current_hourly = int(request.json.get('current_hourly'))
        print request.json
        if 'max_hourly' in request.json:

            user.max_hourly = request.json.get('max_hourly')
            db_session.commit()

        if 'uber_friendly' in request.json:
            user.uber_friendly = request.json.get('uber_friendly')

        if 'tutoring_platforms_description' in request.json:
            user.tutoring_platforms_description = request.json.get('tutoring_platforms_description')

        if 'outside_university' in request.json:
            user.outside_university = request.json.get('outside_university')

        if 'email' in request.json:
            user.email = request.json.get('email')

        if 'change_email' in request.json:
            email = request.json.get('change_email')

            ## check if email already exists
            user_already_exists = User.query.filter_by(email=email).first()
            if user_already_exists and user.id != user_already_exists.id:
                abort(401)
            else:
                user.email = email
                db_session.commit()


        if 'name' in request.json:
            user.name = request.json.get('name')

        if 'summer_15' in request.json:
            user.summer_15 = request.json.get('summer_15')

        if 'guru_deposit' in request.json:
            transfer_card = None
            deposit_amount = request.json.get('guru_deposit')

            all_transfer_cards = user.get_transfer_cards()

            if not all_transfer_cards:
                abort(401)

            for card in all_transfer_cards:
                if card.is_default_transfer:
                    transfer_card = card
                    break

            if not transfer_card:
                abort(401)

            from app.lib.stripe_client import charge_customer
            stripe_charge = charge_customer(user, int(deposit_amount))
            if type(stripe_charge) is str:
                abort(404)

            transaction = Transaction.chargeGuruDeposit(deposit_amount, transfer_card, user, stripe_charge)
            if transaction.guru_amount > 0:
                user.guru_deposit = True
                db_session.commit()


            ## Make sure they have one
            ## make sure their card is valid
            ## charge $10
            ## set guru deposit to true



        if 'recent_position' in request.json:
            recent_position_json = request.json.get('recent_position')
            user.location_services_enabled = recent_position_json.get('location_services_enabled')
            user.recent_latitude = recent_position_json.get('recent_latitude')
            user.recent_longitude = recent_position_json.get('recent_longitude')

        if 'push_notifications' in request.json:
            user.push_notifications = request.json.get('push_notifications').get('push_notifications')

        if 'text_notifications' in request.json:
            user.text_notifications = request.json.get('text_notifications')
            print 'coming soon!'

        if 'email_notifications' in request.json:
            user.email_notifications = request.json.get('email_notifications')
            print 'coming soon!'

        if 'guru_latest_time' in request.json:
            user.guru_latest_time = request.json.get('guru_latest_time')

        if 'email_friendly' in request.json:
            user.email_friendly = request.json.get('email_friendly')

        if 'hangouts_friendly' in request.json:
            user.hangouts_friendly = request.json.get('hangouts_friendly')

        if 'phone_friendly' in request.json:
            user.phone_friendly = request.json.get('phone_friendly')

        if 'facetime_friendly' in request.json:
            user.facetime_friendly = request.json.get('facetime_friendly')

        if 'update_external_profile_resource' in request.json:

            request_json = request.json.get('payload')
            print request_json
            resource_type = request_json.get('site')
            url = request_json.get('url')

            if resource_type and resource_type in Resource.RECOGNIZED and url:
                print "Were trying"
                user.updateExternalResource(resource_type, url)
            else:
                user.addNewExternalResource(resource_type)

        if 'discoverability' in request.json:
            user.guru_discoverability = request.json.get('discoverability')

        if 'messenger_friendly' in request.json:
            user.messenger_friendly = request.json.get('messenger_friendly')

        if 'referral_code' in request.json:
            user.referral_code = request.json.get('referral_code')

        if 'profile_code' in request.json:
            profile_code = request.json.get('profile_code').lower()
            profile_codes_already = User.query.filter_by(profile_code=profile_code).all()
            print profile_code
            print profile_codes_already
            num_already = len(profile_codes_already)
            if num_already  and not (num_already == 1 and profile_codes_already[0].id == user.id):
                return "TAKEN", 401
            user.profile_code = request.json.get('profile_code')

        if 'person_friendly' in request.json:
            user.person_friendly = request.json.get('person_friendly')

        if 'update_guru_major' in request.json:
            user.major = request.json.get('update_guru_major')

        if 'is_alumni' in request.json:
            user.is_alumni = request.json.get('is_alumni')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

        if 'major' in request.json:
            user.major = request.json.get('major')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

        if 'year' in request.json:
            user.year = request.json.get('year')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

        if 'update_guru_demographic' in request.json:
            user.year = request.json.get('update_guru_demographic')

        if 'update_guru_currency' in request.json:

            currency_json = request.json.get('update_guru_currency')
            currency_id = int(currency_json.get('id'))
            add_currency = currency_json.get('active')

            if add_currency:
                user.addGuruCurrencyItem(currency_id)
            else:
                user.removeGuruCurrencyItem(currency_id)

        if 'update_guru_shop_description' in request.json:

            shop_json = request.json.get('update_guru_shop_description')
            shop_json_id = int(shop_json.get('id'))
            shop_description = shop_json.get('description')
            if shop_json_id and shop_description:
                shop = Shop.query.get(shop_json_id)
                shop.description = shop_description
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise

        if 'update_guru_shop_title' in request.json:
            shop_json = request.json.get('update_guru_shop_title')
            shop_json_id = int(shop_json.get('id'))
            shop_title = shop_json.get('title')
            if shop_json_id and shop_title:
                shop = Shop.query.get(shop_json_id)
                shop.title = shop_title
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise

        if 'text_friendly' in request.json:
            user.text_friendly = request.json.get('text_friendly')

        if 'skype_friendly' in request.json:
            user.skype_friendly = request.json.get('skype_friendly')

        if 'profile_url' in request.json:
            user.profile_url = request.json.get('profile_url')

        if 'update_portfolio_item' in request.json:
            pi_json = request.json.get('update_portfolio_item')
            pi_id = request.json.get('id')
            if not pi_id and user.guru_courses and not user.portfolio_items:
                Portfolio_Item.initAllCourses(user)

            course_id = int(pi_json.get('course_id'))
            pi = Portfolio_Item.getPortfolioItemByCourseId(course_id)
            if not pi:
                abort(404)

        if 'fb_id' in request.json:
            if not user.fb_id:
                fb_id = request.json.get('fb_id')
                previous_user = User.query.filter_by(fb_id=fb_id).all()
                if previous_user and user not in previous_user:
                    user.fb_id = request.json.get('fb_id')
                    db_session.commit()
                else:
                    print "previous user exists"
                    return user, 401


        if 'email_notifications' in request.json:
            user.email_notifications = request.json.get('email_notifications')

        if 'guru_mode' in request.json:
            user.guru_mode = request.json.get('guru_mode')


        if 'add_guru_calendar_event' in request.json:
            calendar_event_json = request.json.get('add_calendar_event')
            if not user.guru_calendar:
                Calendar.initGuruCalendar(user)
            Calendar.createGuruOfficeHours(calendar_event_json, user.guru_calendar)

        if 'remove_guru_calendar_event' in request.json:
            calendar_event_json = request.json.get('remove_guru_calendar_event')
            calendar_event_id = int(calendar_event_json.get('id'))
            calendar_event = Calendar_Event.query.get(calendar_event_id)
            calendar_event.archived = True
            db_session.commit()

        if request.json.get('add_student_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            if not course_id:
                c = Course()
                c.short_name = course.get('department') + ' ' + course.get('code')
                c.department_short = course.get('department')
                c.course_number = course.get('code')
                c.admin_approved = False
                user.student_courses.append(c)
                db_session.add(c)
                db_session.commit()
            else:
                c = Course.query.get(int(course_id))
                user.student_courses.append(c)
                db_session.commit()

        if request.json.get('guru_introduction'):
            user.guru_introduction = request.json.get('guru_introduction')


        if request.json.get('add_guru_intro'):
            user.guru_introduction = request.json.get('introduction')
            print user.guru_introduction

        if request.json.get('add_guru_language'):
            language_json = request.json.get('add_guru_language')
            language_id = language_json.get('id')
            if not language_id:
                abort(404)
            else:
                language_obj = Language.query.get(int(language_id))
                if language_obj:
                    user.guru_languages.append(language_obj)
                    db_session.commit()

        ## Quick department fix

        if request.json.get('add_user_major'):
            major = request.json.get('major')
            major_id = major.get('id')
            print major, major_id
            if not major_id:
                abort(404)
            else:
                major_obj = Department.query.get(int(major_id))
                user.departments.append(major_obj)
                db_session.commit()
                # create major case

        if request.json.get('add_guru_skill'):
            print 'guru skill submitted!'
            print request.json.get('add_guru_skill')
            skill_json = request.json.get('skill')
            skill_id = skill_json.get('id')

            if skill_id:
                skill = Skill.query.get(int(skill_id))
                if skill:
                    print skill, skill.category
                    user.guru_skills.append(skill)
                    db_session.commit()
                    print 'length of user skills', len(user.guru_skills)

        if request.json.get('add_guru_subcategory'):
            print request.json
            subcategory_json = request.json.get('subcategory')
            subcategory_id = subcategory_json.get('id')
            subcategory = Subcategory.query.get(subcategory_id)
            if subcategory:
                user.guru_subcategories.append(subcategory)

                if subcategory.category not in user.guru_categories:
                    user.guru_categories.append(subcategory.category)

                db_session.commit()

        if request.json.get('remove_guru_subcategory'):
            subcategory_json = request.json.get('subcategory')
            subcategory_id = subcategory_json.get('id')
            subcategory = Subcategory.query.get(subcategory_id)

            if subcategory:

                # Remove from their list
                if subcategory in user.guru_subcategories:
                    user.guru_subcategories.remove(subcategory)

                # IF they no longer have any with that category, remove from their categories
                if subcategory.category not in [subcategory.category for subcategory in user.guru_subcategories]:
                    user.guru_categories.remove(subcategory.category)

                db_session.commit()

        if request.json.get('add_guru_portfolio_item'):
            pi_json = request.json.get('portfolio_item')
            shop_id = pi_json.get('shop_id')

            user_shop_ids = [shop.id for shop in user.guru_shops if shop and shop.id]

            shop = user.getAcademicShop()
            course_id = pi_json.get('course').get('id')
            course = Course.query.get(int(course_id))
            if not course:
                abort(404)
            if not shop and not user_shop_ids:
                user.guru_courses.append(course)
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise
                Shop.initAcademicShop(user)
                shop = user.getAcademicShop()
            if course and shop:
                Portfolio_Item.initAcademicPortfolioItemFromGuruProfile(user, shop, course, pi_json)

        if request.json.get('edit_guru_portfolio_item'):
            pi_json = request.json.get('portfolio_item')
            pi = Portfolio_Item.query.get(int(pi_json.get('id')))

            from pprint import pprint
            pprint(pi_json)
            ## all done in the model
            pi.updatePortfolioItem(user, pi_json)

        if request.json.get('remove_guru_portfolio_item'):
            pi_json = request.json.get('portfolio_item')
            pi_id = int(pi_json.get('id'))
            pi = Portfolio_Item.query.get(pi_id)
            print len(user.portfolio_items), 'before'
            if pi:
                pi.remove()
            print pi.archived
            print len(user.portfolio_items), 'after'



        if request.json.get('add_guru_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            if not course_id:
                c = Course()
                c.short_name = course.get('department') + ' ' + course.get('code')
                c.department_short = course.get('department')
                c.course_number = course.get('code')
                c.admin_approved = False
                c.contributed_user_id = user.id
                db_session.add(c)
                user.guru_courses.append(c)
                db_session.commit()
            else:
                c = Course.query.get(int(course_id))
                user.guru_courses.append(c)
                db_session.commit()

        if request.json.get('remove_student_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            c = Course.query.get(int(course_id))
            if c in user.student_courses:
                user.student_courses.remove(c)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                try:
                    d = db_session.query(student_courses_table).filter(student_courses_table.c.user_id == user.id, student_courses_table.c.course_id == course_id).delete(synchronize_session=False)
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise

        if request.json.get('current_device_id'):
            user.current_device_id = request.json.get('current_device_id')


        if request.json.get('remove_guru_language'):
            language_json = request.json.get('remove_guru_language')
            language_id = int(language_json.get('id'))
            language = Language.query.get(language_id)
            if language in user.guru_languages:
                user.guru_languages.remove(language)
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    try:
                        d = db_session.query(guru_languages_table).filter(guru_languages_table.c.user_id == user.id, guru_languages_table.c.language_id == language_id).delete(synchronize_session=False)
                        db_session.commit()
                    except:
                        db_session.rollback()
                        raise

        if request.json.get('remove_guru_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            course = Course.query.get(int(course_id))
            user.guru_courses.remove(course)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                try:
                    d = db_session.query(guru_courses_table).filter(guru_courses_table.c.user_id == user.id, guru_courses_table.c.course_id == course_id).delete(synchronize_session=False)
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise
            # if user in c.gurus:
            #     # c.gurus.remove(user)
            #     from app.models import guru_courses_table
            #     db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == user.id and guru_courses_table.c.course_id == c.id))
            #     # user.guru_courses.remove(c)
            # # for user_course in user.guru_courses:
            # #     if user_course.id == c.id:
            # #         user_course.student_id = None
            # #         db_session.commit()
            # #         print c.short_name, 'removed'
            # db_session.commit()

        if request.json.get('remove_major'):
            major = request.json.get('major')
            print major
            major_id = major.get('id')
            m = Department.query.get(int(major_id))
            if m in user.departments:
                user.departments.remove(m)
            db_session.commit()

        if request.json.get('remove_language'):
            language_json = request.json.get('remove_language')
            language_id = language_json.get('id')
            language = Language.query.get(int(language_id))

            if language and language in user.guru_languages:
                user.guru_languages.remove(language)
                db_session.commit()

        #
        if request.json.get('submit_referral_code'):
            promo_code = request.json.get('student_promo_code')
            promo_user_exists = User.query.filter_by(referral_code = promo_code).all()

            if promo_user_exists:

                if not user.credits:
                    user.credits = 5
                else:
                    user.credits += 5

                user.referred_by_id = promo_user_exists.id

                db_session.commit()
            else:
                abort(409)



        if request.json.get('impact_event'):
            print len(user.impact_events)
            event = Event.query.get(request.json.get('event_id'))
            event.impacted_user_id = None
            db_session.commit()
            print len(user.impact_events)



        if request.json.get('add_major'):
            major = request.json.get('major')
            major_id = major.get('id')
            if not major_id:
                m = Major()
                m.name = major.get('name')
                m.admin_approved = False
                m.contributed_user_id = user.id
                db_session.add(m)
                user.majors.append(m)
                db_session.commit()
            else:
                m = Major.query.get(int(major_id))
                user.majors.append(m)
                db_session.commit()

        db_session.commit()
        return user, 200

    @marshal_with(UserSerializer)
    def delete(self, _id):
        # # print request.json.get('requests');
        # if not request.json.get('auth_token'):
        #     abort(400)

        user = User.query.get(_id)
        if not user:
            abort(400)

        print user
        from hashlib import md5

        # if request.json.get('auth_token') != user.auth_token:
        #     abort(400)

        # if request.json.get('university_id'):
        #     user.university_id = None

        user.requests = []
        user.student_sessions = []
        user.guru_sessions = []
        user.guru_proposals = []
        user.guru_experiences = []
        # user.guru_courses = []
        user.majors = []
        user.departments = []
        user.student_ratings = []

        user.guru_ratings = []
        user.cards = []
        user.is_a_guru = True
        user.is_admin = True
        user.password = md5('launchuguru123').hexdigest()
        user.profile_code = user.name.split(' ')[0].lower()
        user.referral_code = user.name.split(' ')[0].lower()

        user.current_hourly = None
        user.university_id = None
        user.guru_categories = []
        user.guru_languages = []
        user.phone_number = None
        user.phone_number_token = None
        user.school_email_token = None
        user.school_email_confirmed = None
        user.phone_number_confirmed = None
        user.school_email = None
        user.fb_id = None
        user.transcript_file = None

        if user.guru_proposals:
            user.guru_proposals = []

        for proposal in Proposal.query.all():
            if proposal.guru_id == user.id:
                proposal.guru_id = None
                if proposal in user.guru_proposals:
                    user.guru_proposals.remove(proposal)
        db_session.commit()



        user.university_id = None

        for course in user.student_courses + user.guru_courses:
            c = course
            from app.models import guru_courses_table, student_courses_table
            if course in user.guru_courses:
                db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == user.id and guru_courses_table.c.course_id == c.id))
                db_session.execute(student_courses_table.delete(student_courses_table.c.user_id == user.id and student_courses_table.c.course_id == c.id))
            if course in user.student_courses:
                db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == user.id and guru_courses_table.c.course_id == c.id))
                db_session.execute(student_courses_table.delete(student_courses_table.c.user_id == user.id and student_courses_table.c.course_id == c.id))

        # if request.json.get('remove_student_course'):
        #     course = request.json.get('course')
        #     course_id = course.get('id')
        #     c = Course.query.get(int(course_id))
        #     if c in user.student_courses:
        #         user.student_courses.remove(c)
        #     db_session.commit()

        # if request.json.get('remove_guru_course'):
        #     course = request.json.get('course')
        #     course_id = course.get('id')
        #     c = Course.query.get(int(course_id))
        #     if c in user.guru_courses:
        #         user.guru_courses.remove(c)
        #     db_session.commit()

        # if request.json.get('remove_major'):
        #     major = request.json.get('major')
        #     major_id = major.get('id')
        #     m = Major.query.get(int(major_id))
        #     if m in user.majors:
        #         user.majors.remove(m)
        #     db_session.commit()

        try:
            db_session.commit()
        except:
            print "ERROR WITH COMMIT"
            db_session.rollback()
            raise
        return user, 200

def get_user(user_id):
    user = User.query.get(user_id)
    return user

class UserRequestView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self, user_id):

        pprint(request.json)
        user = get_user(user_id)

        if not user:
            abort(404)

        ## course related
        course = request.json.get('course')
        print "course received!", course
        #check if request is already active
        if course and course.get('id'):
            course_id = course.get('id')
            if (user.request_active(course_id, request.json.get('type'))):
                abort(409)

        ## location related - resolved
        position_json = request.json.get('location')
        if position_json:
            coords_json = position_json.get('coords')
            coords_json['address'] = position_json.get('address')
            address = position_json.get('address')
            lat, lng = coords_json.get('latitude'), coords_json.get('longitude')
            print "position parsed", lat, lng, address


        ## Category related
        if request.json.get('category'):
            category_json = request.json.get('category')
            category_id = category_json.get('id')
            if category_id:
                category = Category.query.get(int(category_id))
                print category, "category retrieved"


        ## Subcategory related
        if request.json.get('subcategory'):
            subcategory_json = request.json.get('subcategory')
            subcategory_id = subcategory_json.get('id')
            if subcategory_id:
                subcategory = Subcategory.query.get(int(subcategory_id))
                print subcategory, "subcategory retrieved"

        ## description related - resolved
        if request.json.get('description'):
            description = request.json.get('description')
            print "description received", description

        ## Tags
        tags = None
        if request.json.get('tags'):
            tags = request.json.get('tags')
            for tag in tags:
                print tag.get('name'), "Received"

        ## attachment list
        if request.json.get('files'):
            files = request.json.get('files')
            for _file in files:
                print _file.get('id'), _file.get('name'), 'received'

        # price related
        proposed_price_json = None
        if request.json.get('payment_card'):
            payment_json = request.json.get('payment_card')
            proposed_price_json = request.json.get('proposed_price')
            if payment_json.get('id'):
                payment_id = payment_json.get('id')
                payment_card = Card.query.get(int(payment_id))
                print payment_card, 'successfully retrieved with proposed price', proposed_price_json

        # availablility related
        time_estimate_json = None
        if request.json.get('time_estimate'):
            time_estimate_json = request.json.get('time_estimate')
            hours_json = time_estimate_json.get('hours')
            minutes_json = time_estimate_json.get('minutes')
            print hours_json, minutes_json, 'received'

        calendar_json = None
        if request.json.get('calendar'):
            calendar_json = request.json.get('calendar')
            timezone_offset = request.json.get('timezone')
            print "Timezone", timezone_offset
            if len(calendar_json):
                for date_range in calendar_json:
                    print date_range.get('start_time'), 'to', date_range.get('end_time')

        if not category or (not subcategory and not course) or not payment_card \
        or not time_estimate_json or not coords_json or not timezone_offset or not calendar_json:
            abort(404)

        from datetime import datetime
        _request = Request()
        db_session.add(_request)

        db_session.commit()
        _request.student_id = user.id
        _request.position = Position.initFromJson(coords_json, user.id)
        _request.category = category
        _request.description = description
        _request.time_created = datetime.now()
        _request.tz_offset = timezone_offset
        _request.time_estimate = hours_json * 60  + minutes_json
        _request.status = Request.PROCESSING_GURUS
        _request.payment_card = payment_card
        _request.student_calendar = Calendar.initFromRequest(_request, 7)
        _request.student_price = proposed_price_json
        for date_range in calendar_json:
            from datetime import datetime
            ce = Calendar_Event()
            ce.calendar_id = _request.student_calendar.id
            ce.start_time = datetime.fromtimestamp(date_range.get('start_time')/1000.)
            ce.end_time = datetime.fromtimestamp(date_range.get('end_time')/1000.)
            ce.is_student = True
            db_session.add(ce)
            db_session.commit()


        if subcategory:
            _request.subcategory = subcategory
        if course:
            _request.course = course

        _request.student_id = user_id
        _request.university_id = user.university_id
        _request.contact_email = request.json.get('contact_email')
        _request.contact_text = request.json.get('contact_text')
        _request.contact_push = request.json.get('contact_push')


        if request.json.get('tags'):
            json_tags = request.json.get('tags')
            for tag in json_tags:
                _tag = Tag.query.filter_by(name=tag.get('name')).first()
                if _tag:
                    _tag.requests.append(_request)
                    _tag.last_referenced = datetime.now()
                    if _tag.times_referenced or _tag.times_referenced == 0:
                        _tag.times_referenced += 1
                    else:
                        _tag.times_referenced = 1
                else:
                    _tag = Tag()
                    db_session.add(_tag)
                    _tag.creator_id = _request.student.id
                    _tag.time_created = datetime.now()
                    _tag.name = tag.get('name')
                    _tag.times_referenced = 1
                    _tag.last_referenced = datetime.now()
                    _tag.name, 'successfully created'
                    _tag.requests.append(_request)

                db_session.commit()



        if request.json.get('files'):
            print 'there are', len(request.json.get('files')), 'files'
            files_json = request.json.get('files')
            if type(files_json) != bool:
                for file_json in request.json.get('files'):
                    if file_json != bool:
                        file_obj = File.query.get(file_json.get('id'))
                        file_obj.request_id = _request.id
                        file_obj.user_id = _request.student_id


        Request.dispatchRequestToGurus(_request)

        return user

        if _request.course:

            available_gurus = _request.course.gurus.all()
            print "number of gurus available", len(available_gurus)
            for guru in available_gurus:

                print guru.id, guru.name, guru.time_created, 'contacted'

                calendar_id = None
                if calendar:
                    calendar_id = calendar.id

                proposal = Proposal.initProposal(_request.id, guru.id, calendar_id)

                # proposal.student_price = float(request.json.get('price_slider'))

                event_dict = {'status': Proposal.GURU_SENT, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)

                db_session.commit()

                #send push notification is user has permitted device
                if guru.push_notifications:
                    print guru.name, 'has push notifications'

                    from app.lib.push_notif import send_student_request_to_guru
                    send_student_request_to_guru(_request, guru)

                if guru.email_notifications and guru.email:
                    print guru.name, 'has email'
                    from app.emails import send_student_request_to_guru
                    send_student_request_to_guru(_request, guru)


                if guru.text_notifications and guru.phone_number:
                    print guru.name, 'has phone number'
                    from app.texts import send_student_request_to_guru
                    send_student_request_to_guru(_request, guru)
        else:
            print "This is a task, not a session or question"

        pprint('request is finished like a G')
        return user, 200

    @marshal_with(UserSerializer)
    def put(self, user_id):

        user = get_user(user_id)
        print user
        if not user:
            abort(404)

        # print request.json
        if request.json.get('proposal'):
            proposal_json = request.json
            from pprint import pprint
            proposal = Proposal.query.get(proposal_json.get('id'))
            proposal.status = request.json.get('status')
            db_session.commit()
            if proposal.status ==Proposal.GURU_REJECTED:
                proposal.send_to_next_guru()
                event_dict = {'status': Proposal.GURU_REJECTED, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)

            if proposal.status == Proposal.GURU_ACCEPTED:
                pprint(proposal_json)

                proposal.request.status = Request.STUDENT_RECEIVED_GURU
                proposal.request.guru_id = user_id

                proposal.guru_price = proposal_json.get('guru_price')
                if not proposal.guru_price:
                    proposal.guru_price = proposal.request.student_price


                # calendar = Calendar.initFromProposal(proposal, 2)

                # proposal.request.guru_calendar_id = calendar.id
                calendar_events_json = proposal_json.get('guru_calendar')

                print 'response found!', proposal_json.get('response')
                # proposal.question_response = proposal_json.get('response')

                # proposal.request.selected_proposal = proposal

                # proposal.time_answered = datetime.now()

                # if request.json.get('files'):
                #     files_json = request.json.get('files')
                #     print 'woohoo', len(request.json.get('files')), 'uploaded'
                #     for file_json in request.json.get('files'):
                #         file_obj = File.query.get(file_json.get('id'))
                #         file_obj.proposal_id = proposal.id

                if calendar_events_json:
                    day_index = 0
                    for day_arr in calendar_events_json:
                        index = 0
                        for time_json in day_arr:
                            if time_json.get('is_guru') and time_json.get('start_time'):
                                calendar_event = Calendar_Event.initFromJson(time_json, calendar, day_index)
                            index += 1
                        day_index += 1



                student = proposal.request.student

                # if student.push_notifications:

                #     #send push notification to all student devices
                #     from app.lib.push_notif import send_guru_proposal_to_student
                #     send_guru_proposal_to_student(proposal, proposal.request.student)

                # if student.email_notifications and student.email:
                #     from app.emails import send_guru_proposal_to_student
                #     send_guru_proposal_to_student(proposal, proposal.request.student)

                # if student.text_notifications and student.phone_number:
                #     from app.texts import send_guru_proposal_to_student
                #     send_guru_proposal_to_student(proposal, proposal.request.student)

                event_dict = {'status': Proposal.GURU_ACCEPTED, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)
                db_session.commit()

            return user, 200

        _request = Request.query.get(int(request.json.get('id')))


        if not _request:
            abort(404)

        if 'status' in request.json:
            status = request.json.get('status')
            guru_json = request.json.get('guru')

            #Default set the status before
            _request.status = request.json.get('status')

            if status == Request.STUDENT_RECEIVED_GURU:
                event_dict = {'status': Request.STUDENT_RECEIVED_GURU, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
            elif status == Request.QUESTION_ACCEPTED:
                print 'student has accepted guru'

                ## charge student $2 on that card
                _request.guru_id = _request.selected_proposal.guru_id
                rating = Rating.initFromQuestion(_request)

                _request.time_accepted = datetime.now()

                db_session.commit()

                for proposal in _request.proposals:

                    # if another guru was answering this question...
                    if proposal.guru_id != int(guru_json.get('id')):

                        # Question has been replied by another guru
                        proposal.status = 12
                        event_dict = {'status': Proposal.QUESTION_TOO_LATE, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)

                    # this is the guru who was chosen
                    if proposal.guru_id == int(guru_json.get('id')):

                        print 'yeee found it', proposal.guru.name, 'made', proposal.request.student_price
                        proposal.status = 13


                        if float(proposal.request.student_price):
                            transaction = Transaction.initFromQuestion(_request, user, rating)
                            _request.transaction_id = transaction.id


                        event_dict = {'status': Proposal.QUESTION_GURU_CHOSEN, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)
                db_session.commit()

            elif status == Request.STUDENT_REJECTED_GURU:
                event_dict = {'status': Request.STUDENT_REJECTED_GURU, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
                #update guru that was rejected
                for proposal in _request.proposals:
                    if proposal.status == proposal.GURU_ACCEPTED and proposal.guru_id == int(guru_json.get('id')):
                        print "Guru has been rejected"
                        #Switch back
                        proposal.status = 3
                        event_dict = {'status': Proposal.GURU_REJECTED, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)
                _request.status = Request.PROCESSING_GURUS
                _request.guru_id = None
                # TODO: SEND TO NEXT GURU
            elif status == Request.STUDENT_ACCEPTED_GURU:
                event_dict = {'status': Request.STUDENT_ACCEPTED_GURU, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
            elif status == Request.STUDENT_CANCELED:
                event_dict = {'status': Request.STUDENT_CANCELED, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
                for proposal in _request.proposals:
                    proposal.status = 4
                    if proposal.status == proposal.GURU_ACCEPTED:
                        event_dict = {'status': Proposal.GURU_ACCEPT_STUDENT_CANCELED, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)
                    if proposal.status == proposal.GURU_SENT:
                        event_dict = {'status': Proposal.GURU_SENT_STUDENT_CANCELED, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)

            elif status == Request.GURU_CANCELED_SEARCHING_AGAIN:
                _request.selected_proposal.status = 5;
                _request.status = 0
                guru_id = request.json.get('guru_id')
                for proposal in _request.proposals:
                    if proposal.guru_id == guru_id:
                        print proposal.guru_id, guru_id, proposal.id
                        proposal.status = 5
                        db_session.commit()

                print 'yo proposal status', request.json.get('status'), _request.selected_proposal.id

                event_dict = {'status': Request.GURU_CANCELED_SEARCHING_AGAIN, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
            elif status == Request.NO_GURUS_AVAILABLE:
                event_dict = {'status': Request.NO_GURUS_AVAILABLE, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

            db_session.commit()

            return user, 200

### TODO PAYMENTS SERVER SIDE
### -- Get Transfer status
### -- Send Receipt email
class UserTransactionsView(restful.Resource):

    #create new transaction (transfer or charge)
    @marshal_with(UserSerializer)
    def post(self, _id):
        user = get_user(_id)
        if not user:
            abort(404)

        if request.json.get('bank_transfer'):
            card_id = None
            selected_card = None

            transaction_json = request.json

            card_id = transaction_json.get('card_id')

            if not card_id:
                card_id = transaction_json.get('id')
            if card_id:
                selected_card = Card.query.get(card_id)

            if selected_card:
                Transaction.initTransferTransaction(user, selected_card)

            return user, 200

        abort(400)

    #refunds, status of charge
    @marshal_with(UserSerializer)
    def put(self, _id):
        user = get_user(_id)
        if not user:
            abort(404)

        if request.json.get('transaction'):

            transaction_json = request.json.get('transaction')

            if transaction_json.get('refund'):

                from api.lib.stripe_client import refund_charge

                charge_id = transaction_json.get('charge_id')
                refund_amount_cents = transaction_json.get('refund') * 100

                refund_obj = refund_charge(charge_id, refund_amount_cents)

                transaction = Transaction.query.get(transaction_json.get('id'))
                transaction.refund_id = refund_obj.id
                transaction.balance_transaction_id = refund_obj.balance_transaction_id

                db_session.commit()

                return user, 200





class UserRatingView(restful.Resource):

    @marshal_with(UserSerializer)
    def put(self, _id):
        user = get_user(_id)
        if not user:
            abort(404)

        print request.json
        rating_json = request.json
        rating = Rating.query.get(request.json.get('id'))

        if rating_json.get('student_rate_guru'):
            rating.guru_rating = rating_json.get('guru_rating')
            rating.student_time_rated = datetime.now()
        if rating_json.get('guru_rate_student'):
            rating.student_rating = rating_json.get('student_rating')
            rating.guru_time_rated = datetime.now()

        db_session.commit()
        return user, 200

class FileView(restful.Resource):
    # serializer for file
    # request POST, add file url if exists
    # parse file accordingly

    @marshal_with(FileSerializer)

    def post(self):

        # user = get_user(user_id)
        # if not user:
        #     abort(404)
        from pprint import pprint

        print request.headers
        file = request.files.get('file')
        file_string= request.values.get('file')
        file_name = request.values.get('filename')
        file_size = request.values.get('filesize')
        file_type = request.values.get('filetype')
        user_id = request.values.get('user_id')
        if user_id:
            user_id = int(user_id)

        import base64
        if file and not file_string:
            file_string = base64.b64encode(file.read())

        if file_string:
            from app.lib.api_utils import upload_file_to_amazon
            from app import app
            import imghdr, base64

            s3_key = app.config['S3_KEY']
            s3_secret = app.config['S3_SECRET']
            s3_bucket = app.config['S3_BUCKET']

            file_obj = File.initEmptyFile()
            file_obj.name = file_name
            file_obj.size = file_size
            file_obj.type = file_type
            file_obj.user_id = user_id

            file_string_base64 = base64.urlsafe_b64decode(file_string.encode("utf-8"))
            file_extension = imghdr.what(None,file_string_base64)
            file_name = 'request_file_id_' + str(file_obj.id) + '.png'

            upload_file_to_amazon(file_name, file_string_base64, s3_key, s3_secret, s3_bucket)

            # extension = filename.split('.')[1]
            # destination_filename = md5(str(user_id)).hexdigest() + "." + extension

            #save this to the db
            if os.environ.get('PRODUCTION'):
                amazon_url = "https://s3.amazonaws.com/uguruprof/"+file_name
            else:
                amazon_url = "https://s3.amazonaws.com/uguruproftest/"+file_name

            file_obj.url = amazon_url
            print file_obj.url

            db_session.commit()

            if request.values.get('profile_url'):
                print request.values.get('profile_url')
                user = User.query.get(int(request.values.get('profile_url')))

                user.profile_url = file_obj.url
                print user.name,'saved', file_obj.url
                db_session.commit()

            if request.values.get('transcript_url'):
                print request.values.get('transcript_url')
                user = User.query.get(int(request.values.get('transcript_url')))

                user.transcript_file = file_obj
                print user.name,'saved', file_obj.url
                db_session.commit()

            return file_obj, 200


        abort(400)




class UserSessionView(restful.Resource):
    #create a session
    @marshal_with(UserSerializer)
    def post(self, _id):
        user = get_user(_id)

        if not user:
            abort(404)

        #if this is recurring session betwen a guru & a user
        if request.json.get('recurring_session'):
            session_json = request.json

            recurring_session = Session.initRecurringSession(session_json)

            #needs contents, relationship, session_id, sender_id, receiver_id
            if request.json.get('message'):
                message_json = request.json.get('message')

                #update with new session
                message_json['session_id'] = recurring_session.id
                message = Message.initFromJson(message_json, False)

            position = None
            if request.json.get('position'):
                position = Position.initFromJson(request.json.get('position'), user.id)

            #create new proposal_id for the recurring guru
            proposal = Proposal.initRecurringSessionProposal(recurring_session)

            if request.json.get('concurrent_request'):

                course = request.json.get('course')

                _request = Request()
                _request.course_id = course.get('id')
                _request.position = position
                _request.time_created = datetime.now()
                _request.description = request.json.get('note')
                _request.in_person = request.json.get('in_person')
                _request.online = request.json.get('online')
                _request.time_estimate = request.json.get('time_estimate')
                _request.address = request.json.get('address')
                _request.status = Request.PROCESSING_GURUS
                _request.student_id = user_id

                db_session.add(_request)
                user.requests.append(_request)
                db_session.commit()

                if request.json.get('files'):
                    files_json = request.json.get('files')

                    for file_json in request.json.get('files'):
                        file_obj = File.query.get(file_json.get('id'))
                        file_obj.request_id = _request.id


                #contact all available gurus (except the ones that the student is not already connected with)
                available_gurus = _request.course.gurus.all()
                for guru in available_gurus:

                    #student & guru are already connected
                    if guru.id in [relationship.guru_id for relationship in user.guru_relationships]:
                        continue

                    proposal = Proposal.initProposal(_request.id, guru.id)
                    event_dict = {'status': Proposal.GURU_SENT_RECURRING, 'proposal_id':proposal.id}
                    event = Event.initFromDict(event_dict)

            db_session.commit()
            return user, 200

        #non-recurring session
        session_json = request.json

        _request = Request.query.get(request.json.get('id'))
        _request.selected_proposal.status = 5
        _request.guru = User.query.get(request.json.get('guru_id'))
        _request.status = Request.STUDENT_ACCEPTED_GURU
        session_json['student_id'] = _request.student_id
        session_json['guru_id'] = _request.guru.id
        #create an event for it
        event_dict = {'status': Request.STUDENT_ACCEPTED_GURU, 'request_id':_request.id}
        event = Event.initFromDict(event_dict)



        #create a session
        session = Session.initFromJson(session_json, True)

        guru_json = request.json.get('guru')
        guru_id = None
        if guru_json:
            guru_id = guru_json.get('id')

        print 'guru found',

        #update the proposal from the request
        for proposal in _request.proposals:

            if proposal.guru_id == _request.guru_id or proposal.guru_id == guru_id:
                print 'yee guru found', proposal.guru_id
                proposal.status = 5
                event_dict = {'status': Proposal.GURU_CHOSEN, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)
                break
        db_session.commit()
        print session
        print "relationship exists?", session.relationship_id
        # Create relationship as well
        if not session.relationship_id:
            print "relationship is being created.."
            session._relationship = Relationship.initFromSession(session)
            db_session.commit()
        print "relationships", user.guru_relationships, user.student_relationships
        #send notifications to Guru
        # if session.request.guru.push_notifications:
        #     from app.lib.push_notif import send_student_has_accepted_to_guru
        #     send_student_has_accepted_to_guru(session, session.request.guru)

        # if session.request.guru.email_notifications and user.email:
        #     from app.emails import send_student_has_accepted_to_guru
        #     send_student_has_accepted_to_guru(session, session.request.guru)

        # if session.request.guru.text_notifications and user.phone_number:
        #     from app.texts import send_student_has_accepted_to_guru
        #     send_student_has_accepted_to_guru(session, session.request.guru)
        #     print "should send a text here"  #TODO SAMIR

        return user, 200



    #update a session
    @marshal_with(UserSerializer)
    def put(self, _id):
        #append student, guru_position updated

        user = get_user(_id)

        if not user:
            abort(404)

        session_json = request.json.get('session')
        _session = Session.query.get(session_json.get('id'))
        if request.json.get('session'):
            print session_json

        if request.json.get('start_timer'):
            _session.time_updated = datetime.now()
            print 'Guru started timer @', time_updated

        if request.json.get('reset_timer'):
            _session.time_updated = None
            print 'Guru RESET timer update received'

        if request.json.get('update_timer'):
            _session.time_updated = datetime.now()
            print 'Guru timer update received', time_updated

        if request.json.get('pause_timer'):
            _session.time_completed = datetime.now()
            print 'Guru pause timer @', time_completed

        if request.json.get('recurring_session_guru_accept'):
            proposal_id = request.json.get('proposal_id')
            proposal = Proposal.query.get(proposal_id)
            _session.status = Session.GURU_ACCEPT_RECURRING_SESSION
            _proposal.status = Proposal.GURU_ACCEPTED_RECURRING
            event_dict = {'status': Session.GURU_ACCEPT_RECURRING_SESSION, 'session_id':_session.id}
            event = Event.initFromDict(event_dict)
            db_session.commit()
            return user, 200

        if request.json.get('recurring_session_guru_reject'):
            proposal_id = request.json.get('proposal_id')
            proposal = Proposal.query.get(proposal_id)
            _session.status = Session.GURU_REJECT_RECURRING_SESSION
            _proposal.status = Proposal.GURU_REJECTED_RECURRING

            event_dict = {'session_id': session_id, 'status': _session.status, 'impacted_user_id': _session.student_id}
            event = Event.initFromDict(event_dict)
            db_session.commit()
            return user, 200

        #add updated position from student
        if request.json.get('session_position_student'):
            position_json = request.json.get('position')
            position_json['session_id'] = session_json.get('id')
            position = Position.initFromJson(position_json, user.id)

            _session = Session.query.get(session_json.get('id'))
            _session.student_positions.append(position)
            db_session.commit()
            return user, 200

        #add updated position from guru
        if request.json.get('session_position_guru'):
            position_json = request.json.get('position')
            position_json['session_id'] = session_json.get('id')
            position = Position.initFromJson(position_json, user.id)

            _session.guru_positions.append(position)
            db_session.commit()
            return user, 200

        if request.json.get('session_update_time'):
            _session.seconds = request.json.get('seconds')
            _session.hours = request.json.get('hours')
            _session.minutes = request.json.get('minutes')
            db_session.commit()

            return user, 200

        if session_json.get('status'):
            status = session_json.get('status')

            _session.status = session_json.get('status')

            # Should not happen, this is required by default
            # if status == _session.GURU_ON_WAY:
            #     doNothing = True

            ## Guru is starting the session
            if status == Session.GURU_START_SESSION:
                event_dict = {'status': Session.GURU_START_SESSION, 'session_id':_session.id}
                event = Event.initFromDict(event_dict)


            ## Guru is ending the session
            elif status == Session.GURU_END_SESSION:
                event_dict = {'status': Session.GURU_END_SESSION, 'session_id':_session.id}
                event = Event.initFromDict(event_dict)

                rating = Rating.initFromSession(_session)
                _session.seconds = session_json.get('seconds')
                _session.hours = session_json.get('hours')
                _session.minutes = session_json.get('minutes')
                _session.time_completed = datetime.now()

                transaction = Transaction.initFromSession(_session, user)


            elif status == Session.STUDENT_CANCEL_SESSION:
                # Consequences?
                if not _session.guru or not _session.student:
                    _session.guru_id = 118
                    _session.student_id = 118
                    db_session.commit()
                event_dict = {
                                'status': Session.STUDENT_CANCEL_SESSION,
                                'session_id':_session.id,
                                'user_id':user.id,
                                'impacted_user_id': _session.guru_id
                            }
                event = Event.initFromDict(event_dict)

            elif status == Session.GURU_CANCEL_SESSION:
                event_dict = {
                                'status': Session.STUDENT_CANCEL_SESSION,
                                'session_id':_session.id,
                                'user_id':user.id,
                                'impacted_user_id': _session.student_id
                            }
                event = Event.initFromDict(event_dict)

            elif status == Session.STUDENT_RATED:

                event_dict = {'status': Session.STUDENT_RATED, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
                rating_json = request.json.get('rating')

                #check if the session has a rating id
                if not _session.rating_id:

                    rating = Rating.initFromSession(_session)
                    rating.student_rating = rating_json.get('student_rating')
                    rating.student_time_rated = datetime.now()

                #session already has a rating id
                else:
                    _session.rating.student_rating = rating_json.get('student_rating')
                    _session.rating.student_time_rated = datetime.now()

                #update status to both rated
                if _session.rating.guru_rating:
                    _session.status = Session.BOTH_RATED

            elif status == _session.GURU_RATED:

                event_dict = {'status': Request.GURU_RATED, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

                rating_json = request.json.get('rating')

                #check if the session has a rating id
                if not _session.rating_id:

                    rating = Rating.initFromSession(_session)
                    rating.student_rating = rating_json.get('student_rating')
                    rating.student_time_rated = datetime.now()

                #session already has a rating id
                else:
                    _session.rating.student_rating = rating_json.get('student_rating')
                    _session.rating.student_time_rated = datetime.now()

                #update status to both rated
                if _session.rating.student_rating:
                    _session.status = Session.BOTH_RATED

            elif status == Session.STUDENT_REFUND:
                event_dict = {'status': Request.STUDENT_REFUND, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

            elif status == Session.GURU_NO_SHOW:
                event_dict = {'status': Request.GURU_NO_SHOW, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

            elif status == Session.STUDENT_NO_SHOW:

                event_dict = {'status': Request.STUDENT_NO_SHOW, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

            db_session.commit()
            return user, 200

        abort(404)


    @marshal_with(UserSerializer)
    def delete(self, _id):
        pass

#TODO Testing
#TODO Create proposals proposals to gurus, Redis, guru ranking, re-initialize request if guru cancels
#TODO Bank shit: Cashing_out, transactions from the bank, refunds, Stripe
#TODO Later Queuing system + task actions for db_commits
#TODO Later: Images & Files --> S3 Bucket

class UserRelationshipMessageView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self, _id, relationship_id):
        user = get_user(_id)

        _relationship = Relationship.query.get(relationship_id)
        if not user or not _relationship:
            abort(404)


        if request.json.get('message'):
            message_json = request.json.get('message')
            message = Message.initFromJson(message_json, False)

            _relationship = Relationship.query.get(message.relationship_id)

            #guru sent it
            if user.id == message.receiver_id:

                #student is the one 'receiving the message'
                message_receiver = message.sender
                message_sender = message.receiver

            #student sent it
            else:
                #student is the one 'receiving the message'
                message_receiver = message.receiver
                message_sender = message.sender

            print message
            # if message_receiver.push_notifications:
            #     #send push notification to all student devices
            #     from app.lib.push_notif import send_message_to_receiver
            #     send_message_to_receiver(message_sender, message_receiver, message._relationship.sessions[0].request.course)


            # # if user.email_notifications and user.email:
            # #     from app.emails import send_message_to_receiver
            # #     send_message_to_receiver(message.sender, message.receiver, message._relationship.sessions[0].request.course)

            # if message.receiver.text_notifications and user.phone_number:
            #     from app.texts import send_message_to_receiver
            #     send_message_to_receiver(message_sender, message_receiver, message._relationship.sessions[0].request.course)

            return user, 200


class UserSessionMessageView(restful.Resource):

    @marshal_with(SessionSerializer)
    def get(self, _id, _session):
        user = get_user(_id)
        _session = Session.query.get(_session)
        if not user or not _session:
            abort(404)

        [db_session.refresh(message) for message in _session.messages]
        return _session, 200


    #create a message in a session
    @marshal_with(UserSerializer)
    def post(self, _id, _session):
        user = get_user(_id)


        print request.json
        _session = Session.query.get(_session)
        if not user or not _session:
            abort(404)

        #create a new message
        if request.json.get('message'):
            message_json = request.json.get('message')
            message = Message.initFromJson(message_json, False)

            _relationship = Relationship.query.get(message.relationship_id)

            #guru sent it
            if user.id == message.receiver_id:

                #student is the one 'receiving the message'
                message_receiver = message.sender
                message_sender = message.receiver

            #student sent it
            else:
                #student is the one 'receiving the message'
                message_receiver = message.receiver
                message_sender = message.sender

            if message_receiver.push_notifications:
                #send push notification to all student devices
                from app.lib.push_notif import send_message_to_receiver
                send_message_to_receiver(message_sender, message_receiver, message._relationship.sessions[0].request.course)


            # if user.email_notifications and user.email:
            #     from app.emails import send_message_to_receiver
            #     send_message_to_receiver(message.sender, message.receiver, message._relationship.sessions[0].request.course)

            if message.receiver.text_notifications and user.phone_number:
                from app.texts import send_message_to_receiver
                send_message_to_receiver(message_sender, message_receiver, message._relationship.sessions[0].request.course)

        return user, 200

    @marshal_with(UserSerializer)
    def put(self, user_id, session_id):
        user = get_user(_id)
        _session = Session.query.get(_session)
        if not user or not _session:
            abort(404)

        #create a new message
        if request.json.get('message'):
            message_json = request.json.get('message')
            message = Message.query.get(message_json.get('id'))
            message.time_read = datetime.now()
            db_session.commit()

        return user, 200

class UserSupportMessageView(restful.Resource):

    @marshal_with(UserSerializer)
    def post(self, _id, _support):
        user = get_user(_id)

        support = Support.query.get(_support)
        if not user or not support:
            abort(404)

        #create a new message
        if request.json.get('message'):
            message_json = request.json.get('message')
            message = Message.initFromJson(message_json, True)

            if message.receiver.push_notifications:
                #send push notification to all student devices
                from app.lib.push_notif import send_message_to_receiver_support
                send_message_to_receiver_support(message.sender, message.receiver)


            if message.receiver.email_notifications and message.receiver.email:
                from app.emails import send_message_to_receiver_support
                send_message_to_receiver_support(message.sender, message.receiver)

            if message.receiver.text_notifications and message.receiver.phone_number:
                from app.texts import send_message_to_receiver_support
                send_message_to_receiver_support(message.sender, message.receiver)

        return user, 200


class UserCardView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self, user_id):

        user = get_user(user_id)

        if not user:
            abort(404)

        card = request.json.get('card')
        debit_card = request.json.get('debit_card')
        payment_card = request.json.get('payment_card')
        print request.json
        # user is adding a card
        if debit_card:
            if not user.get_transfer_cards():
                request.json['is_default_transfer'] = True
            card = Card.initFromJson(request.json, user)
            return user, 200

        if payment_card:
            if not user.get_payment_cards():
                request.json['is_default_payment'] = True
            debit_card = Card.initFromJson(request.json, user)
            return user, 200

        return user, 200

        abort(404)

    @marshal_with(UserSerializer)
    def put(self, user_id):
        user = get_user(user_id)

        if not user:
            abort(404)

        card_json = request.json.get('card')
        card = Card.query.get(card_json.get('id'))

        if card_json.get('default_payment'):

            card.is_default_payment = True
            for other_card in user.cards:
                if other_card.is_payment_card and other_card.id != card.id:
                    other_card.is_default_payment = False

            db_session.commit()

        if card_json.get('default_transfer'):

            card.is_default_transfer = True
            for other_card in user.cards:
                if other_card.is_transfer_card and other_card.id != card.id:
                    other_card.is_default_transfer = False

            db_session.commit()

        if card_json.get('purchase_credit'):
            offers = [(40, 50), (80, 105), (165, 200)]
            from pprint import pprint
            pprint(card_json)
            offer_index = card_json.get('offer_index')
            card_id = card_json.get('id')
            if card_id and int(card_id) and offer_index <= 2:
                try:
                    credits = offers[offer_index][1]
                    amount = offers[offer_index][0]
                    card = Card.query.get(int(card_id))
                    transaction_response = Transaction.initStudentCreditPurchase(user, card, amount, credits)
                    if type(transaction_response) == tuple:
                        abort(400)
                except:
                    abort(400)

            # card.is_default_transfer = True
            # for other_card in user.cards:
            #     if other_card.is_transfer_card and other_card.id != card.id:
            #         other_card.is_default_transfer = False

            # db_session.commit()

        if card_json.get('remove_card'):

            card_json = request.json.get('card')
            card = Card.query.get(card_json.get('id'))
            user.cards.remove(card)

            if card.is_transfer_card and user.num_transfer_cards() == 1:

                user.get_transfer_cards()[0].is_default_transfer = True

            if card.is_payment_card and user.num_payment_cards() == 1:

                user.get_payment_cards()[0].is_default_payment = True

            db_session.commit()

        return user, 200

    @marshal_with(UserSerializer)
    def delete(self, user_id):
        user = get_user(user_id)

        if not user:
            abort(404)

        card_json = request.json.get('card')
        card = Card.query.get(card_json.get('id'))
        card.deactivated = True
        user.cards.remove(card)
        db_session.commit()

        return user, 200

class UserNewView(restful.Resource):
    #create new user

    # @marshal_with(UserSerializer)
    # def get(self):


    #     abort(404)


    @marshal_with(UserSerializer)
    def post(self):

        fb_user = email_user = None
        guru_courses_json = majors_json = guru_subcategories_json = []


        if request.json.get('email'):
            email_user = User.query.filter_by(email=request.json.get('email')).first()

        if request.json.get('fb_id'):
            fb_user = User.query.filter_by(fb_id=request.json.get('fb_id')).first()

        if email_user and not fb_user and request.json.get('fb_id'):
            email_user.fb_id = request.json.get('fb_id')
            db_session.commit()

        if email_user:
            abort(409)

        ## If they tried signing up w/ no account
        elif email_user and not fb_user and not request.json.get('fb_id'):
            abort(409);
            # return json_response(400, errors=["Account already exists"])

        #we can go ahead and log them in.. for now..(TODO: MAKE MORE SECURE)
        import uuid

        device = None
        if request.json.get('current_device'):
            current_device_id = request.json.get('current_device').get('id')
            device = Device.query.get(current_device_id)

        if fb_user:
            if not fb_user.name:
                fb_user.name = request.json.get('name')

            if request.json.get('email'):
                fb_user.email = request.json.get('email')
            fb_user.referral_code = User.generate_referral_code(fb_user.name)
            fb_user.auth_token = uuid.uuid4().hex
            print fb_user.profile_url
            if not fb_user.profile_url and request.json.get('profile_url'):
                fb_user.profile_url = request.json.get('profile_url')
            if device:
                fb_user.current_device = device
                device.user_id = fb_user.id
            db_session.commit()
            return fb_user, 200


        user_email = request.json.get('email')
        if not user_email and request.json.get('fb_id'):
            user_email = 'fb_id:' + request.json.get('fb_id')

        ### Main user creation script
        user = User.initNewUser(user_email, request.json)
        if request.json.get('university_id'):
            user.university_id = request.json.get('university_id')


        print user.guru_shops
        if request.json.get('access_code_sender_id'):
            sender_id = int(request.json.get('access_code_sender_id'))
            sender = User.query.get(sender_id)
            if sender:
                Referral.initAndApplyReferral(sender, user)

        majors_json = request.json.get('majors')
        if majors_json:
            major_ids = [major.get('id') for major in majors_json]
            user.add_majors(major_ids)
            db_session.commit()
            print user.name, 'has', len(user.departments), 'majors'




        guru_courses_json = request.json.get('guru_courses')
        if  guru_courses_json:
            guru_course_ids = [guru_course.get('id') for guru_course in guru_courses_json]
            user.add_guru_courses(guru_course_ids)
            db_session.commit()
            print user.name, 'has', len(user.guru_courses), 'guru courses'


        if 'high_school' in request.json:
            user.high_school = True
            print "detected that user is a high school student"

        ## if they added high schools
        hs_universities_json = request.json.get('add_hs_universities')
        if hs_universities_json:
            university_ids = [int(uni_json.get('id')) for uni_json in hs_universities_json]
            for university_id in university_ids:
                university = University.query.get(university_id)
                if university:
                    user.universities.append(university)
                else:
                    db_session.rollback()
                    raise

            if len(user.universities):
                try:
                    db_session.commit()
                    print "added %s universities for the user" % len(user.universities)
                except:
                    db_session.rollback()
                    raise

        guru_subcategories_json = request.json.get('guru_subcategories')
        if  guru_subcategories_json:
            guru_subcategories_ids = [guru_subcategory.get('id') for guru_subcategory in guru_subcategories_json]
            user.add_guru_subcategories(guru_subcategories_ids)
            db_session.commit()
            print user.name, 'has', len(user.guru_subcategories), 'subcategories'


        if request.json.get('profile_url'):
            user.set_profile_url(request.json.get('profile_url'))
            db_session.commit()

        if device:
            user.current_device = device
            device.user_id = user.id
            db_session.commit()



        if request.json.get('student_courses'):

            print str(len(user.student_courses)) + ' before'
            for course in request.json.get('student_courses'):
                course_obj = Course.query.get(int(course.get('id')))
                user.student_courses.append(course_obj)
            db_session.commit()
            print str(len(user.student_courses)) + ' after'

        print "checking if user has guru courses"
        if user.guru_courses:
            Shop.initAcademicShop(user)
            print "woohoos"
            print user.guru_shops
            print user.guru_shops[0]

        return user, 200

    #login
    @marshal_with(UserSerializer)
    def put(self):

        if request.json.get('admin_token') and request.json.get('user_id'):
            print request.json
            user_id = int(request.json.get('user_id'))
            user = User.query.get(user_id)
            return user, 200

        if request.json.get('access_code'):
            access_code = request.json.get('access_code')

            does_referral_exist = User.does_referral_exist(access_code)

            if not does_referral_exist and access_code != 'cool':
                abort(401)

            user = does_referral_exist


            result_dict = {'success':True}
            if user and not user.deactivated:
                user.reactivateUser()
                result_dict['profile_url'] = user.profile_url
                result_dict['first_name'] = user.getFirstName()
                result_dict['name'] = user.getFirstName()
                result_dict['email'] = user.email
                print user.name, user.profile_url, user.email
                result_dict['deactivated'] = True



            return json.dumps(result_dict), 200

        if request.json.get('email') and request.json.get('forgot_password'):
            email_user = User.query.filter_by(email=request.json.get('email')).first()

            if email_user:
                from hashlib import md5
                import uuid
                raw_password = uuid.uuid4().hex[0:5]
                email_user.password = md5(raw_password).hexdigest()
                db_session.commit()
                from app.emails import send_reset_password_email
                send_reset_password_email(email_user, raw_password)

                return email_user, 200


            else:
                # no email found
                abort(404)

        if request.json.get('email'):

            print "USER IS ATTEMPTING TO LOGIN"

            from hashlib import md5
            email_user = User.query.filter_by(
                email=request.json.get('email'),
                password=md5(request.json.get('password')).hexdigest()
                ).first()

            if email_user:

                if email_user.deactivated:
                    abort(404)
                    ### TODO MIXPANEL PLZ

                import uuid
                email_user.auth_token = uuid.uuid4().hex
                course_id = None
                user = email_user

                is_high_school_login = request.json.get('hs_student')
                print "is this is a high school login: %s"  %is_high_school_login
                ## if they dont have a high school account
                if  is_high_school_login and not email_user.hs_student:
                    abort(404)

                if request.json.get('current_device'):
                    current_device_id = request.json.get('current_device').get('id')
                    device = Device.query.get(current_device_id)
                    if device:
                        email_user.current_device = device
                        device.user_id = email_user.id

                if request.json.get('add_student_course'):
                    course = request.json.get('course')
                    course_id = course.get('id')
                    if not course_id:
                        c = Course()
                        c.short_name = course.get('department') + ' ' + course.get('code')
                        c.department_short = course.get('department')
                        c.course_number = course.get('code')
                        c.admin_approved = False
                        user.student_courses.append(c)
                        db_session.add(c)
                        db_session.commit()
                    else:
                        c = Course.query.get(int(course_id))
                        user.student_courses.append(c)
                        db_session.commit()

                if request.json.get('current_device_id'):
                    user.current_device_id = request.json.get('current_device_id')

                if request.json.get('university_id'):
                    user.university_id = request.json.get('university_id')


                db_session.commit()
                return email_user, 200
            else:
                abort(401)

        else:
            abort(422)

        abort(400)


class UserView(restful.Resource):

    @marshal_with(UserSerializer)
    def post(self):

        logging.info(request.json)
        print 'ayy'

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
                name=request.json.get("name").title(),
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
        from app.lib.api_utils import request_contains_all_valid_parameters

        required_general_parameters = ['sender_email', 'sender_title', 'template_name',
        'subject', 'reply_to_email', 'track_opens', 'track_clicks', 'important']

        #check if all parameters are here
        if not request_contains_all_valid_parameters(request.json, required_general_parameters):
            print 'parameters failed'
            return 404

        ##Test route
        if request.json.get('test_email'):
            test_email = request.json.get('test_email')
            test_name = request.json.get('test_name')
            print request.json
            result = send_campaign_email_test(
                campaign_name = 'TEST',
                template_name = request.json.get('template_name'),
                subject = request.json.get('subject'),
                sender_email = request.json.get('sender_email'),
                sender_title = request.json.get('sender_title'),
                reply_to_email = request.json.get('reply_to_email'),
                track_opens = request.json.get('track_opens'),
                track_clicks = request.json.get('track_clicks'),
                important = request.json.get('important'),
                test_email = test_email,
                test_name = test_name
            )

            return jsonify(results=result)

        ##send regular campaign
        else:
            pass

        return 400


class AdminUserView(restful.Resource):
    def delete(self, auth_token):
        if auth_token and auth_token not in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401
        count = 0
        for u in User.query.all():
            if "samir-" in u.email.lower():
                from sqlalchemy import create_engine
                if not os.environ.get('PRODUCTION'):
                    SQLALCHEMY_DATABASE_URI = 'postgresql://uguru:uguru@localhost/uguru_db'
                    engine = create_engine(SQLALCHEMY_DATABASE_URI)
                    from sqlalchemy import MetaData
                    m = MetaData()
                    m.reflect(engine)
                    for table in m.tables.values():
                        for column in table.c:
                            if column.name == "user_id":
                                db_session.execute(table.delete(table.c.user_id == u.id))
                    db_session.commit()
                count += 1
                print "deleting user %s %s" % (u.id, u.name)
                db_session.delete(u)
                db_session.commit()
        print "%s users deleted", count
        return 200
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

class AdminMandrillTemplatesView(restful.Resource):

    def get(self, auth_token):

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from emails import mandrill_client
        templates = sorted(mandrill_client.templates.list(),
            key=lambda t:datetime.strptime(t['updated_at'], "%Y-%m-%d %H:%M:%S.%f"), reverse=True)
        template_names = [t['name'] for t in templates]
        template_names = sorted(template_names, key=lambda t:[''])
        return json.dumps(template_names),200


class AdminMandrillCampaignsView(restful.Resource):

    def get(self, auth_token):

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from emails import mandrill_client
        campaigns = mandrill_client.tags.list()

        return jsonify(campaigns=campaigns)

class AdminMandrillCampaignDetailedView(restful.Resource):
    def get(self, tag, auth_token):

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from emails import mandrill_client
        specific_campaign = mandrill_client.tags.info(tag=tag)
        return jsonify(campaign=specific_campaign)

class AdminAppUpdateView(restful.Resource):
    def put(self):
        message = request.json.get('message')
        is_major = request.json.get('is_major')
        is_minor = request.json.get('is_minor')
        _type = request.json.get('type')
        is_android = request.json.get('is_android')
        is_ios = request.json.get('is_ios')

        if is_major:
            Version.new_major_build(1, message)
        elif is_minor:
            Version.new_minor_build(1, message)

        return jsonify(version=True)

class AdminViewEmailsList(restful.Resource):
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        default_goal = 20000
        emails = [
            {'count':15000, 'sent':1000, 'name':'University of Michigan', 'goal':default_goal},
            {'name': 'University of Miami', 'count':1000, 'sent':0, 'goal':default_goal},
            {'name': 'UCLA', 'count':3000, 'sent':0, 'goal':default_goal},
            {'name':'UT Austin', 'count':20000, 'sent':0, 'goal':default_goal},
            {'name':'University of Illinois', 'count':2237, 'sent':1000, 'goal':default_goal},
            {'name': 'UC Berkeley', 'count':40000, 'sent':0, 'goal':default_goal}
        ]
        return jsonify(emails=emails)

class AdminViewUsersList(restful.Resource):

    @marshal_with(UserSerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        users = User.query.all()
        return users, 200

class AdminViewUniversitiesListEmails(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"
        universities = University.query.filter(University.us_news_ranking != None, University.us_news_ranking < 220, University.num_emails > 1000).all()
        return universities, 200

class AdminViewUniversitiesListAll(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"
        universities = University.query.filter(University.us_news_ranking != None, University.us_news_ranking < 220).all()
        return universities, 200

class AdminViewUniversitiesListAllDistribution(restful.Resource):
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"
        universities = University.query.filter(University.us_news_ranking != None, University.us_news_ranking < 220).all()
        keys = ['total','banner_url', 'courses_sanitized', 'departments_sanitized',\
        'logo_url', 'school_color_one', 'population', 'num_emails']
        result_dict = {}
        for key in keys:
            result_dict[key] = 0
        result_dict['total'] = len(universities)
        for uni in universities:
            if uni.departments_sanitized: result_dict['departments_sanitized'] += 1
            if uni.courses_sanitized: result_dict['courses_sanitized'] += 1
            if uni.logo_url: result_dict['logo_url'] += 1
            if uni.population: result_dict['population'] += 1
            if uni.school_color_one: result_dict['school_color_one'] += 1
            if uni.num_emails: result_dict['num_emails'] += 1
            if uni.banner_url: result_dict['banner_url'] += 1

        return json.dumps(result_dict, indent=4, sort_keys=True), 200

class AdminViewUniversitiesListPrepared(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"
        universities = University.query.filter(University.courses_sanitized == True, University.departments_sanitized == True, University.banner_url != None, University.logo_url != None).all()
        print universities
        return universities, 200


class AdminViewUniversitiesList(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"
        if _type == 'us_news':
            universities = University.query.filter(University.courses_sanitized > 0, University.departments_sanitized > 0, University.us_news_ranking != None).all()
        if _type == 'prepared':
            universities = University.query.filter(University.courses_sanitized > 0, University.departments_sanitized > 0, University.num_emails > 0).all()
        return universities, 200

    @marshal_with(AdminUniversitySerializer)
    def post(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED"

        if not request or not request.json or 'school_name' not in request.json:
            abort(401)

        school = request.json.get('school_name')

        # from static.data.universities_efficient import universities_arr
        from fuzzywuzzy import fuzz, process

        previous_university_titles = [university.name for university in University.query.all()]

        matches = []
        for title in previous_university_titles:
            if fuzz.partial_ratio(school.lower(), title.replace('-', ' ').lower()) >= 80:
                matches.append((title, school))

        #part 2
        highest_index = 0
        highest_score = 0
        index = 0
        for match in matches:
            current_match_score = fuzz.ratio(match[0], match[1])
            print current_match_score
            if current_match_score > highest_score:
                highest_score = current_match_score
                highest_index = index
            index += 1

        if 'all' in request.json:
            all_queries = [University.query.filter_by(name=match[0]).first() for match in matches]
            return all_queries
        else:
            query = University.query.filter_by(name=matches[highest_index][0])
            return query.first()

        abort(401)

    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        universities = University.query.all()

        return universities, 200

class AdminViewUserList(restful.Resource):

    @marshal_with(UserSerializer)
    def get(self, auth_token, _id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        user = User.query.get(_id)

        return user, 200

class AdminViewUserAnalytics(restful.Resource):

    def get(self):
        from app.lib.u_localytics import *

        return queryUserEvents().json()['results']


class AdminViewGithubLabels(restful.Resource):

    # get all labels
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        pass

    #create a label BONUS DO NOT DO YET
    def post(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        pass

class UniversityFoodView(restful.Resource):
    def get(self, _id):
        import json
        file = open('app/static/data/food_router.json')

        university_food_dict = json.load(file)
        # university_food_url = university_food_dict.get(str(_id))
        # print university_food_url
        if not university_food_dict:
            return json.dumps({"error": "Food URL does not exist for university id %s" % _id}), 422

        return json.dumps({"data":university_food_dict}), 200


class MusicPlayerPlayListView(restful.Resource):

    #get all issues + labels
    def get(self, auth_token):
        from app.lib.soundcloud_wrapper import uSoundCloudGetPlaylistQuery

        if not request.json:
            abort(404)

        song_name = request.json.get('song_name')
        artist_name = request.json.get('artist_name')

        if not song_name and not artist_name:
            abort(404)

        print 'querying %s by %s' % (song_name, artist_name)
        playlist_arr = uSoundCloudGetPlaylistQuery(song_name, artist_name)
        return json.dumps(playlist_arr, indent=4), 200


class TransitGuruTransitData(restful.Resource):
    def get(self, auth_token):
        from app.lib.transit_wrapper import getRealTimeTransitData

        transit_arr = getRealTimeTransitData()
        if not transit_arr:
            abort(404)
        return json.dumps(transit_arr, indent=4), 200


class AdminViewGithubIssues(restful.Resource):

    #get all issues + labels
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from app.lib.github_client import init_github, get_issues, get_labels, \
        issue_to_json, label_to_json, UGURU_TEAM

        g_repo = init_github()

        issues = get_issues(g_repo, state="all")
        issues_json = [issue_to_json(issue) for issue in issues]

        labels = get_labels(g_repo)
        labels_json = [label_to_json(label) for label in labels]

        return_dict = {
            'labels': labels_json,
            'issues': issues_json,
            'team': UGURU_TEAM
        }

        return jsonify(response=return_dict)

    #create an issue
    def post(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        labels = request.json.get('labels')
        title = request.json.get('title')
        body = request.json.get('body')
        print request.json
        if request.json.get('create_issue'):
            from app.lib.github_client import init_github, create_issue
            g_repo = init_github()
            issue = create_issue(g_repo, labels, title, body)

        if request.json.get('send_email'):
            from app.emails import send_errors_email
            email_address = request.json.get('default_email')
            body = title + '\n\n' + body
            send_errors_email(body, client_only=True, default_email=email_address)

        return jsonify(success=True)

    #Delete an issue
    def delete(self, auth_token):
        print request.json
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        issue_number = int(request.json.get('number'))

        from app.lib.github_client import init_github, get_issue, close_issue
        g_repo = init_github()
        issue = get_issue(g_repo, issue_number)
        close_issue(issue) #todo make this a delayed task
        return jsonify(success=True)


class UserEmailView(restful.Resource):
    def put (self):
        email_user_id = session.get('email_user_id')
        email_address = request.json.get('email_address')
        print request.json
        print email_user_id, email_address

        # if email_user_id:
        #     email_user = Email_User.query.get(email_user_id).first()
        #     email_user.signed_up = True
        #     db_session.commit()
        #     return jsonify(success=[True])

        if email_address:
            email_user = Email_User.query.filter_by(email=email_address).first()

            if email_user:
                # email_user.signed_up = True
                email_user.call_to_action_clicked = True
                db_session.commit()
                return jsonify(success=[True])

            else:
                email_user = Email_User.initEmailUser(email_address)
                email_user.signed_up = True
                db_session.commit()
                return jsonify(success=[True])

        abort(404)

class AdminUniversityAddRecipientsView(restful.Resource):
    def post(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        new_db_objs = []
        students_arr = request.json.get('recipients')
        for student in students_arr:
            check_exists = Recipient.query.filter_by(email=student['email']).first()
            if check_exists:
                continue
            r = Recipient()
            if student.get('first_name'):
                r.first_name = student['first_name'].strip().title()
            if student.get('last_name'):
                r.last_name = student['last_name'].strip().title()
            if student.get('email'):
                r.email = student['email'].strip().title()
            if student.get('major'):
                r.major = student['major'].strip().title()
            if student.get('affiliations'):
                r.affiliations = str(student['affiliations']).strip().title()
            if student.get('title'):
                r.title = str(student['title']).strip().title()

            r.university_id = int(uni_id)
            new_db_objs.append(r)

        print uni_id
        u = University.query.get(uni_id)
        u.num_emails += len(new_db_objs)
        db_session.add_all(new_db_objs)
        db_session.commit()
        print len(new_db_objs), 'added to', u.name
        print u.name, 'now has', len(u.recipients)
        print
        results = {'message': str(len(new_db_objs)) + ' objects processed'}
        return jsonify(success=results)

class GithubIssueView(restful.Resource):
    def post(self):
        print request.json
        issue_title = 'JS PRODUCTION ERROR:'
        if request.json.get('issue_title'):
            issue_title += request.json.get('issue_title')

        issue_body = request.json.get('issue_body')
        device_details = request.json.get('device_info')
        user_details = request.json.get('user_details')
        user_agent = request.json.get('user_agent')

        issue_body += ('\n\n\n**User Info**\n\n%s\n\n**Device Details**\n\n%s\n\n\n**Agent Details**\n\n%s' % (user_details, device_details, user_agent))
        issues_arr = ['PRODUCTION CLIENT ERROR', 'bug']

        if device_details.get('ios'):
            issues_arr.append('Platform : IOS')
        if device_details.get('android'):
            issues_arr.append('Platform : Android')
        if device_details.get('windows'):
            issues_arr.append('Platform: Windows Phone')
        if device_details.get('web'):
            issues_arr.append('Platform: Web')

        from lib.github_client import init_github, create_issue
        from emails import send_errors_email
        gh = init_github('uguru')
        if request.json.get('create_issue'):
            create_issue(gh, issues_arr, issue_title, issue_body)
        if request.json.get('send_email'):
            send_errors_email(issue_body, True, request.json.get('default_email'))
        return jsonify(success=[True])


################################
### START ADMIN API (OFFICIAL) #
################################


class AdminDevicePushTestView(restful.Resource):

    def post(self, auth_token, device_id):
        if not device_id:
            abort(401)
        device = Device.query.get(device_id)
        if not device or not device.push_notif or not device.push_notif_enabled or not device.is_test_device:
            abort(401)

        message = 'TEST'
        token = device.push_notif

        # if device.isWindows():
        #     from lib.push_notif import send_windows_notification
        #     send_windows_notification(message, token)

        if device.isIOS():
            from lib.push_notif import send_ios_notification
            send_ios_notification(message, token)

        if device.isAndroid():
            from lib.push_notif import send_android_notification
            send_android_notification(message, token)

        return jsonify(success=[True])

class AdminUIBuilderView(restful.Resource):
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from lib.s3_tools import getAllAdminFiles
        all_files = getAllAdminFiles()

        return json.dumps(all_files, indent=4), 200


class AdminFileView(restful.Resource):

    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from lib.s3_tools import getAllAdminFiles
        return jsonify(admin_files=getAllAdminFiles())

    def delete(self, auth_token):
        from lib.s3_tools import getAllAdminFiles, delete_key
        file_json = request.json.get('file')
        if file_json and file_json.get('key'):
            key = file_json['key']
            if key:
                response = delete_key('uguru-admin', key)
                if response:
                    return jsonify(admin_files=getAllAdminFiles())
        abort(404)

    def post(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401


        from lib.s3_tools import getAllAdminFiles, create_static_file, create_folder
        from pprint import pprint
        file_json = request.json.get('file')
        # folder_json = request.json.get('folder')
        # if folder_json.get('folder'):
        #     folder_name = folder_json.get('name')
        #     if folder_name:
        #         create_folder('uguru-admin', folder_name)

        if file_json:
            full_url = file_json.get('full_template_url')
            if ".json" in full_url:
                file_headers = "application/json"
                file_name = full_url.split('/')[-1]
                file_path = "/".join(full_url.split('com/')[1:])
                file_path = file_path.replace('/' + file_name, "")
                file_contents = json.dumps(file_json, indent=4)
                # print file_name, file_headers



            if (file_contents and file_headers and file_name and file_path):
                response = create_static_file('uguru-admin', file_path, file_name, file_contents, file_headers)
                if response:
                    return json.dumps(file_json, indent=4), 200

        abort(404)



        return jsonify(admin_components=getAllAdminFiles())

class AdminDashboardView(restful.Resource):
    ## Gets most updated component list
    def get(self, auth_token):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        from lib.mp_admin import getMostUpdatedMPElements
        mixpanel_local_elements = getMostUpdatedMPElements()

        return json.dumps(mixpanel_local_elements, indent=4), 200

    def put(self, auth_token):
        from lib.mp_admin import modifyStateFromScene, getMostUpdatedMPElements, modifySubStateFromScene, saveElementsJson, syncLocalElementsToMP, saveDictToElementsJson, getBasePlatformDict
        from pprint import pprint

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        if not request.json:
            return "MISSING DATA", 422

        if 'test_update' in request.json:
            print "test update received"
            scene = request.json.get('scene')
            scene_index = int(scene.get('index'))
            test_index = int(request.json.get('test_index'))
            test_passed = request.json.get('test_passed')
            import requests, json
            current_splash_json = json.loads(requests.get(url = 'https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json').text)
            scene_states_arr = current_splash_json.get('scene_states')
            index_scene = scene_states_arr[scene_index - 1]
            print "received update to process scene:%s with test index%s" % (index_scene['name'], test_index)
            try:
                # update_test_state = scene['tests'][test_index]['passed']
                current_splash_json.get('scene_states')[scene_index - 1]['tests'][test_index]['passed'] = test_passed

                pprint(current_splash_json.get('scene_states')[scene_index - 1]['tests'][test_index])
                filename = request.json.get('filename')
                print "filename", filename
                from app.lib.s3_tools import create_static_file
                # pprint()
                create_static_file('uguru-admin', 'master', filename, json.dumps(current_splash_json, indent=4))
                # index_test = index_scene[test_index]
                print "scene:",scene_index, "test:", test_index
                return json.dumps(current_splash_json, indent=4), 200
            except:
                raise
                abort(404)

        elements = {}
        obj_type = request.json.get('type')
        obj_action = request.json.get('action')
        obj_scene = request.json.get('scene')
        obj_state = request.json.get('state')
        obj_substate = request.json.get('substate')

        from pprint import pprint

        if not obj_type or obj_type not in ['fluid', 'testing', 'functional', 'hifi'] or not obj_action or not obj_state or not obj_scene:
            return "MISSING DATA", 422

        if obj_action == 'update' and obj_type in ['testing']:
            obj_client_type = request.json.get('test_client')
            obj_client_status = request.json.get('test_status')
            scene_ref = obj_scene
            state_ref = obj_state
            substate_ref = obj_substate
            if obj_client_type in ['travis', 'manual']:
                mixpanel_local_elements = getMostUpdatedMPElements()
                all_scenes = mixpanel_local_elements['scenes']
                filtered_scenes = [scene for scene in all_scenes if scene.get('ref') == scene_ref]
                if filtered_scenes:
                    scene_to_update = filtered_scenes[0]
                    has_states = scene_to_update.get('element_states')
                    if (has_states and has_states.get('testing')):
                        filtered_states = [state for state in has_states.get('testing') if state.get('ref') == state_ref]
                        if filtered_states and len(filtered_states):
                            states_to_update = filtered_states[0]
                            has_substates = states_to_update.get('substates')
                            if has_substates:
                                filtered_substates = [substate for substate in has_substates if substate.get('ref') == substate_ref]
                                if filtered_substates:
                                    substate_to_update = filtered_substates[0]
                                    has_platforms = substate_to_update.get('platforms')
                                    if not has_platforms:
                                        substate_to_update['platforms'] = getBasePlatformDict()
                                        has_platforms = substate_to_update['platforms']
                                    filtered_platforms = [platform for platform in has_platforms if platform.get('platform') == request.json.get('client') and platform.get('type') == request.json.get('client_type') and ((request.json.get('client') in ['ios', 'android']) or platform.get('screen_size') == request.json.get('window_size'))]

                                    if filtered_platforms:
                                        platform_to_update = filtered_platforms[0]
                                        from pprint import pprint
                                        print "\n\nplatform before:\n\n"
                                        pprint(platform_to_update)
                                        platform_to_update['passed'] = obj_client_status
                                        platform_to_update['test_client'] = obj_client_type
                                        if platform_to_update['passed']:
                                            platform_to_update['test_status'] = 'pass'
                                        else:
                                            platform_to_update['test_status'] = 'fail'

                                        saveElementsJson(mixpanel_local_elements)
                                        syncLocalElementsToMP()
                                        from time import sleep
                                        sleep(1)
                                        # print "synced with mixpanel"
                                        saveDictToElementsJson()
                                        return jsonify(admin_components=elements)

                return "MISSING DATA", 422

            else:
                abort(404)


        if obj_action == 'remove' and obj_type in ['fluid', 'functional', 'hifi']:

            if not obj_substate:

                print "removing state", obj_state['name'], 'from scene', obj_scene['name']
                elements = modifyStateFromScene(obj_scene, obj_state, obj_type, "remove")

            else:

                elements = modifySubStateFromScene(obj_scene, obj_substate, obj_state, obj_type, "remove")
                print "removing substate", obj_substate['name'], 'from state/scene', "%s/%s" % (obj_state['name'],obj_scene['name'])

        elif obj_action == 'update' and obj_type in ['fluid', 'functional', 'hifi']:

            if not obj_substate:

                print "updating state", obj_state['name'], 'from scene', obj_scene['name']
                elements = modifyStateFromScene(obj_scene, obj_state, obj_type, "update")

            else:

                print "updating substate", obj_substate['name'], 'from state/scene', "%s/%s" % (obj_state['name'],obj_scene['name'])
                elements = modifySubStateFromScene(obj_scene, obj_substate, obj_state, obj_type, "update")
                print "saved to elements.json dict"

        saveElementsJson(elements)
        syncLocalElementsToMP()
        from time import sleep
        sleep(1)
        # print "synced with mixpanel"
        saveDictToElementsJson()
        return jsonify(admin_components=elements)

        # from lib.mp_admin import applyChangeToElement
        # mixpanel_local_elements = applyChangeToElement(element_section, element_id, change_details)
        # return jsonify(admin_components=mixpanel_local_elements)

    def post(self, auth_token):
        from lib.mp_admin import modifyStateFromScene, modifySubStateFromScene, saveElementsJson, syncLocalElementsToMP, saveDictToElementsJson
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        if not request.json:
            return "MISSING DATA", 422

        obj_type = request.json.get('type')
        obj_state = request.json.get('state')
        obj_substate = request.json.get('substate')
        obj_scene = request.json.get('scene')
        if not obj_type or obj_type not in ['fluid', 'bug', 'functional', 'hifi', 'testing'] or not obj_state or not obj_scene:
            return "MISSING DATA", 422

        ### Create scene case
        if not obj_substate:
            print "should be creating state %s" % (obj_state.get('name'))
            elements = modifyStateFromScene(obj_scene, obj_state, obj_type, "create")
        else:
            print "should be creating subscene %s for scene %s" % (obj_substate.get('name'), obj_state.get('name'))
            elements = modifySubStateFromScene(obj_scene, obj_substate, obj_state, obj_type, "create")

        # # sync
        saveElementsJson(elements)
            ## Sync
        # send to MP
        syncLocalElementsToMP()
        from time import sleep

        sleep(1)
        # print "synced with mixpanel"
        saveDictToElementsJson()
        return jsonify(admin_components=elements)
        return jsonify(admin_components=request.json)
        element_section = request.json.get('section')
        elem_sepc = request.json.get('elem_spec')
        from lib.mp_admin import addNewElement
        addNewElement(element_section, elem_spec)



class AdminUniversityPopularCourseView(restful.Resource):
    @marshal_with(AdminUniversityDeptCourseSerializer)
    def get(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        university = University.query.get(uni_id)
        if university:
            return university.popular_courses
        abort(404)

class AdminUniversityCourseView(restful.Resource):
    def post(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:

            return "UNAUTHORIZED", 401

        return jsonify(success=[True])

    @marshal_with(AdminUniversityDeptCourseSerializer)
    def get(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        university = University.query.get(uni_id)
        if university:
            return university.courses
        abort(404)


    @marshal_with(AdminUniversityDeptCourseSerializer)
    def put(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401
        university = University.query.get(uni_id)

        courses = request.json
        print len(courses)
        if not request.json:
            abort(404)

        ## create local version so don't have to query everytime
        university_courses = university.courses

        def getDbCourse(_id, university_courses):
            for course in university_courses:
                if course.id == _id:
                    return course

        amount_skipped = 0
        for course in courses:
            if course.get('id'):
                course_id = course.get('id')
                db_course = getDbCourse(int(course_id), university_courses)
                if db_course and db_course.id:
                    db_course.is_popular = True
                    if not db_course.short_name:
                        db_course.short_name = course.get('short_name')
                    if not db_course.name:
                        db_course.name = course.get('name')
                    db_course.times_mentioned = course.get('frequency')
                    if course.get('pc_variations'):
                        db_course.variations = " ".join(course.get('pc_variations'))
                    print db_course.short_name, course.get('short_name'), 'is now popular'
                else:
                    amount_skipped += 1

        db_session.commit()
        print "%s courses out of %s processed & popularized"% (len(courses) - amount_skipped, len(courses))

        return university.popular_courses




class AdminOneUniversityView(restful.Resource):

    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        university = University.query.get(uni_id)
        if university:
            return university
        abort(404)


    @marshal_with(AdminUniversitySerializer)
    def put(self, auth_token, uni_id):
        print auth_token, uni_id
        if auth_token and auth_token in APPROVED_ADMIN_TOKENS and uni_id:

            # parse the response
            # request_json = json.loads(request.json)
            u = University.query.get(uni_id)
            print request.json

            if not u:
                abort(401)

            if 'university_banner' in request.json:
                banner_src = request.json.get('university_banner')
                if type(banner_src) != str:
                    abort(401)
                print banner_src
                u.banner_url = banner_src
                u.banner_url_confirmed = True


            if 'latitude' in request.json:
                latitude = request.json.get('latitude')
                if type(latitude) != float:
                    abort(401)
                u.latitude = latitude

            if 'longitude' in request.json:
                longitude = request.json.get('longitude')
                if type(longitude) != float:
                    abort(401)
                u.longitude = longitude

            if 'website' in request.json:
                website = request.json.get('website')
                if type(website) != str:
                    abort(401)
                u.website = website

            if 'population' in request.json:
                population = request.json.get('population')
                if type(population) != int:
                    abort(401)
                u.population = population

            if 'fa15_start' in request.json:
                fa15_start = request.json.get('fa15_start')
                u.fa15_start = fa15_start

            if 'fa15_end' in request.json:
                fa15_end = request.json.get('fa15_start')
                u.fa15_end = fa15_end

            if 'school_mascot_name' in request.json:
                school_mascot_name = request.json.get('school_mascot_name')
                if type(school_mascot_name) != str:
                    abort(401)
                u.school_mascot_name = school_mascot_name

            if 'school_color_dark' in request.json:
                school_color_dark = request.json.get('school_color_dark')
                school_color_one = school_color_dark
                u.school_color_dark = school_color_dark
                u.school_color_one = school_color_dark

            if 'school_color_light' in request.json:
                school_color_light = request.json.get('school_color_light')
                school_color_two = school_color_light
                u.school_color_light = school_color_light
                u.school_color_two = school_color_two

            if 'short_name' in request.json:
                short_name = request.json.get('short_name')
                if type(short_name) != str:
                    abort(401)
                u.short_name = short_name

            if 'name' in request.json:
                name = request.json.get('name')
                if type(name) != str:
                    abort(401)
                u.name = name

            if 'school_casual_name' in request.json:
                school_casual_name = request.json.get('school_casual_name')
                if type(school_casual_name) != str:
                    abort(401)
                u.school_casual_name = school_casual_name

            if 'logo_url' in request.json:
                logo_url = request.json.get('logo_url')
                if type(logo_url) != str:
                    abort(401)
                u.logo_url = logo_url

            if 'svg_url' in request.json:
                svg_url = request.json.get('svg_url')
                print svg_url
                if type(svg_url) != str:
                    abort(401)
                u.svg_url = svg_url


            if 'school_color_one' in request.json:
                school_color_one = request.json.get('school_color_one')
                if type(school_color_one) != str:
                    abort(401)
                u.school_color_one = school_color_one

            if 'school_color_two' in request.json:
                school_color_two = request.json.get('school_color_two')
                if type(school_color_two) != str:
                    abort(401)
                u.school_color_two = school_color_two

            if 'school_tiny_name' in request.json:
                school_tiny_name = request.json.get('school_tiny_name')
                if type(school_tiny_name) != str:
                    abort(401)
                u.school_tiny_name = school_tiny_name

            if 'is_public' in request.json:
                is_public = request.json.get('is_public')
                if type(is_public) != bool:
                    abort(401)
                u.is_public = is_public

            if 'num_emails' in request.json:
                u.num_emails = request.json.get('num_emails')

            if 'num_depts' in request.json:
                u.num_emails = request.json.get('num_depts')

            if 'departments_sanitized' in request.json:
                u.departments_sanitized = University.sanitizeDepartments()

            if 'courses_sanitized' in request.json:
                u.courses_sanitized = University.sanitizeCourses()


            db_session.commit()

            return u, 200

        return "UNAUTHORIZED", 201

class AdminUniversityView(restful.Resource):
    @marshal_with(AdminUniversitySerializer)
    def get(self, auth_token, uni_id):

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        university = University.query.get(uni_id)
        if university:
            return university
        abort(404)

    def put(self, auth_token, uni_id):
        pass

class AdminUniversityDeptCoursesView(restful.Resource):


    @marshal_with(AdminUniversityDeptCourseSerializer)
    def post(self, auth_token, uni_id, dept_id):

        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        if auth_token and auth_token in APPROVED_ADMIN_TOKENS:

            u = University.query.get(uni_id)
            if not u:
                return "MISSING DATA", 202

            d = Department.query.get(dept_id)
            if not d:
                print "MISSING DATA", 202

            # parse the response
            course_list_json = request.json
            course_names = [course.name for course in u.courses]

            already_exists_course = 0
            for course_json in course_list_json:
                if course_json.get('code') in course_names:
                    print 'skipping %s' % course_json['name']
                    already_exists_course += 1
                    continue

                course = Course()
                if d:
                    course.department_id = d.id
                course.university_id = u.id
                # course.variations = "|".join(course_json.get('variations'))
                course.times_mentioned = course_json.get('frequency')
                course.is_popular = course_json.get('is_popular')
                course.source_url = course_json.get('course_url')
                course.short_name = course_json.get('code')
                course.time_added = datetime.now()
                course.name = course_json.get('name')

                db_session.add(course)

            db_session.commit()
            if d:
                d.num_courses = len(d.courses)
            u.num_courses = len(u.courses)
            u.num_popular_courses = len(u.popular_courses)
            db_session.commit()

            if d:
                return d.courses, 200
            else:
                return u.popular_courses

        return "UNAUTHORIZED", 201

# create a department
class AdminUniversityDeptView(restful.Resource):
    @marshal_with(AdminUniversityDeptSerializer)
    def get(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        university = University.query.get(uni_id)
        if university:
            return university.departments
        abort(404)



    @marshal_with(AdminUniversitySerializer)
    def post(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401


        if auth_token and auth_token in APPROVED_ADMIN_TOKENS:

            u = University.query.get(uni_id)
            if not u:
                return "MISSING DATA", 202

            print u.name, u.num_depts, u.num_courses

            dept_list_request_json = request.json
            u_departments = u.departments
            dept_names = [dept.name for dept in u_departments]

            if len(dept_list_request_json) == len(u_departments) and u.departments_sanitized and u.courses_sanitized:
                return "ALREADY COMPLETE", 201

            count = 0
            for dept_info in dept_list_request_json:

                if dept_info['name'] in dept_names:
                    continue

                if dept_info.get('abbr'):
                    abbr = dept_info.get('abbr')
                    name = dept_info.get('name')
                    dept = Department()
                    dept.university_id = u.id
                    dept.name = name
                    dept.abbr = abbr
                    db_session.add(dept)
                    db_session.commit()
                    courses = dept_info.get('courses')
                    if courses:
                        for course_info in courses:
                            course_code = course_info.get('code')
                            course_name = course_info.get('name')
                            course_url = course_info.get('course_url')
                            course = Course()
                            course.name = course_code
                            course.full_name = course_name
                            course.short_name = course_code
                            course.source_url = course_url
                            course.department_id = dept.id
                            course.university_id = u.id
                            db_session.add(course)
                        db_session.commit()

            u.num_depts = len(u.departments)
            u.num_courses = len(u.courses)
            u.sanitizeCourses()
            u.sanitizeDepartments()
            db_session.commit()

            # update num depts, update num universities
            return u, 200

        return "UNAUTHORIZED", 201


####################
### END ADMIN API(OFFICIAL) #
####################

api.add_resource(UserView, '/api/v1/users')
api.add_resource(UserNewView, '/api/v1/user')
api.add_resource(UserOneView, '/api/v1/user/<int:_id>')
api.add_resource(FileView, '/api/v1/files')
api.add_resource(UserRequestView, '/api/v1/user/<int:user_id>/requests')
api.add_resource(UserCardView, '/api/v1/user/<int:user_id>/cards')
api.add_resource(UserSessionView, '/api/v1/user/<int:_id>/sessions')
api.add_resource(UserTransactionsView, '/api/v1/user/<int:_id>/transactions')
api.add_resource(UserRatingView, '/api/v1/user/<int:_id>/ratings')
api.add_resource(UserRelationshipMessageView, '/api/v1/user/<int:_id>/relationships/<int:relationship_id>/messages')
api.add_resource(UserSessionMessageView, '/api/v1/user/<int:_id>/sessions/<int:_session>/messages')
api.add_resource(UserSupportMessageView, '/api/v1/user/<int:_id>/support/<int:_support>/messages')
api.add_resource(OneDeviceView, '/api/v1/device')
api.add_resource(DeviceView, '/api/v1/devices/<int:device_id>')
api.add_resource(VersionView, '/api/v1/version')
api.add_resource(UserPhoneView, '/api/v1/phone')
api.add_resource(SupportView, '/api/v1/support')
api.add_resource(SessionView, '/api/v1/sessions')
api.add_resource(RankingsView, '/api/v1/rankings')
api.add_resource(UniversityDetailedListView, '/api/v1/universities/<int:_id>')
api.add_resource(UniversityListView, '/api/v1/universities')
api.add_resource(CategoryListView, '/api/v1/categories')
api.add_resource(UniversityMajorsView, '/api/v1/universities/<int:_id>/departments')
api.add_resource(UniversityCoursesView, '/api/v1/universities/<int:_id>/courses')
api.add_resource(UniversityPopularCoursesView, '/api/v1/universities/<int:_id>/popular_courses')
api.add_resource(MajorListView, '/api/v1/majors')
api.add_resource(UniversityFoodView, '/api/v1/universities/<int:_id>/food_url')
api.add_resource(CourseListView, '/api/v1/courses')
api.add_resource(SkillListView, '/api/v1/skills')
api.add_resource(ProfessionListView, '/api/v1/professions')
api.add_resource(UserEmailView, '/api/v1/user_emails')
api.add_resource(GithubIssueView, '/api/v1/github')
api.add_resource(HomeSubscribeView, '/api/v1/web/home/subscribe')
api.add_resource(TransitGuruTransitData, '/api/v1/<string:auth_token>/transit')
api.add_resource(MusicPlayerPlayListView, '/api/v1/<string:auth_token>/music')
# Admin views
api.add_resource(AdminSessionView, '/api/admin')
# api.add_resource(MandrillWebhook, '/<string:auth_token>/mandrill-webhook')
api.add_resource(AdminDevicePushTestView, '/api/admin/<string:auth_token>/devices/<int:device_id>/push_test')
api.add_resource(AdminUserView, '/api/admin/<string:auth_token>/users')
# api.add_resource(AdminUniversityView, '/api/admin/<string:auth_token>/universities')
api.add_resource(AdminOneUniversityView, '/api/admin/<string:auth_token>/universities/<int:uni_id>')
api.add_resource(AdminUniversityCourseView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/courses')
api.add_resource(AdminUniversityPopularCourseView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/popular_courses')
api.add_resource(AdminUniversityDeptView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/depts')
api.add_resource(AdminUniversityDeptCoursesView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/depts/<int:dept_id>/courses')
api.add_resource(AdminUniversityAddRecipientsView, '/api/admin/<string:auth_token>/university/<int:uni_id>/recipients')
api.add_resource(AdminDashboardView, '/api/v1/admin/<string:auth_token>/dashboard')
api.add_resource(AdminSendView, '/api/admin/<string:auth_token>/send_test')
api.add_resource(AdminFileView, '/api/v1/admin/<string:auth_token>/files')
api.add_resource(AdminAppUpdateView, '/api/admin/app/update')
api.add_resource(AdminUIBuilderView, '/api/v1/admin/<string:auth_token>/build', subdomain='www')
api.add_resource(AdminMandrillTemplatesView, '/api/admin/<string:auth_token>/mandrill/templates')
api.add_resource(AdminMandrillCampaignsView, '/api/admin/<string:auth_token>/mandrill/campaigns')
api.add_resource(AdminMandrillCampaignDetailedView, '/api/admin/<string:auth_token>/mandrill/campaigns/<string:tag>')
api.add_resource(AdminViewEmailsList, '/api/admin/<string:auth_token>/emails')
api.add_resource(AdminViewUsersList, '/api/admin/<string:auth_token>/users')
api.add_resource(AdminViewUniversitiesList, '/api/admin/<string:auth_token>/universities')
api.add_resource(AdminViewUniversitiesListEmails, '/api/admin/<string:auth_token>/universities/emails')
api.add_resource(AdminViewUniversitiesListPrepared, '/api/admin/<string:auth_token>/universities/prepared')
api.add_resource(AdminViewUniversitiesListAll, '/api/admin/<string:auth_token>/universities/us_news')
api.add_resource(AdminViewUniversitiesListAllDistribution, '/api/admin/<string:auth_token>/universities/distribution')
api.add_resource(AdminViewUserList, '/api/admin/<string:auth_token>/user/<int:_id>')
api.add_resource(AdminViewUserAnalytics, '/api/admin/analytics/user')

# Admin views github

api.add_resource(AdminViewGithubIssues, '/api/admin/<string:auth_token>/github/issues')
api.add_resource(AdminViewGithubLabels, '/api/admin/<string:auth_token>/github/labels')


api.add_resource(UserView, '/api/v1/users', subdomain='www')
api.add_resource(UserNewView, '/api/v1/user', subdomain='www')

api.add_resource(UserOneView, '/api/v1/user/<int:_id>', subdomain='www')
api.add_resource(FileView, '/api/v1/files', subdomain='www')
api.add_resource(UserRequestView, '/api/v1/user/<int:user_id>/requests', subdomain='www')
api.add_resource(UserCardView, '/api/v1/user/<int:user_id>/cards', subdomain='www')
api.add_resource(UserSessionView, '/api/v1/user/<int:_id>/sessions', subdomain='www')
api.add_resource(UserTransactionsView, '/api/v1/user/<int:_id>/transactions', subdomain='www')
api.add_resource(UserRatingView, '/api/v1/user/<int:_id>/ratings', subdomain='www')
api.add_resource(UserRelationshipMessageView, '/api/v1/user/<int:_id>/relationships/<int:relationship_id>/messages', subdomain='www')
api.add_resource(UserSessionMessageView, '/api/v1/user/<int:_id>/sessions/<int:_session>/messages', subdomain='www')
api.add_resource(UserSupportMessageView, '/api/v1/user/<int:_id>/support/<int:_support>/messages', subdomain='www')
api.add_resource(OneDeviceView, '/api/v1/device', subdomain='www')
api.add_resource(DeviceView, '/api/v1/devices/<int:device_id>', subdomain='www')
api.add_resource(VersionView, '/api/v1/version', subdomain='www')
api.add_resource(UserPhoneView, '/api/v1/phone', subdomain='www')
api.add_resource(SupportView, '/api/v1/support', subdomain='www')
api.add_resource(SessionView, '/api/v1/sessions', subdomain='www')
api.add_resource(RankingsView, '/api/v1/rankings', subdomain='www')
api.add_resource(UniversityListView, '/api/v1/universities', subdomain='www')
api.add_resource(CategoryListView, '/api/v1/categories', subdomain='www')
api.add_resource(UniversityMajorsView, '/api/v1/universities/<int:_id>/departments', subdomain='www')
api.add_resource(UniversityCoursesView, '/api/v1/universities/<int:_id>/courses', subdomain='www')
api.add_resource(UniversityPopularCoursesView, '/api/v1/universities/<int:_id>/popular_courses', subdomain='www')
api.add_resource(MajorListView, '/api/v1/majors', subdomain='www')
api.add_resource(UniversityFoodView, '/api/v1/universities/<int:_id>/food_url', subdomain='www')
api.add_resource(CourseListView, '/api/v1/courses', subdomain='www')
api.add_resource(SkillListView, '/api/v1/skills', subdomain='www')
api.add_resource(ProfessionListView, '/api/v1/professions', subdomain='www')
api.add_resource(UserEmailView, '/api/v1/user_emails', subdomain='www')
api.add_resource(GithubIssueView, '/api/v1/github', subdomain='www')
api.add_resource(HomeSubscribeView, '/api/v1/web/home/subscribe', subdomain='www')
api.add_resource(TransitGuruTransitData, '/api/v1/<string:auth_token>/transit', subdomain='www')
api.add_resource(MusicPlayerPlayListView, '/api/v1/<string:auth_token>/music', subdomain='www')
# Admin view, subdomain='www's
api.add_resource(AdminSessionView, '/api/admin', subdomain='www')
# api.add_resource(MandrillWebhook, '/<string:auth_token>/mandrill-webhook', subdomain='www')
api.add_resource(AdminDevicePushTestView, '/api/admin/<string:auth_token>/devices/<int:device_id>/push_test', subdomain='www')
# api.add_resource(AdminUniversityView, '/api/admin/<string:auth_token>/universities', subdomain='www')
api.add_resource(AdminOneUniversityView, '/api/admin/<string:auth_token>/universities/<int:uni_id>', subdomain='www')
api.add_resource(AdminUniversityCourseView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/courses', subdomain='www')
api.add_resource(AdminUniversityPopularCourseView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/popular_courses', subdomain='www')
api.add_resource(AdminUniversityDeptView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/depts', subdomain='www')
api.add_resource(AdminUniversityDeptCoursesView, '/api/admin/<string:auth_token>/universities/<int:uni_id>/depts/<int:dept_id>/courses', subdomain='www')
api.add_resource(AdminUniversityAddRecipientsView, '/api/admin/<string:auth_token>/university/<int:uni_id>/recipients', subdomain='www')
api.add_resource(AdminSendView, '/api/admin/<string:auth_token>/send_test', subdomain='www')
api.add_resource(AdminFileView, '/api/v1/admin/<string:auth_token>/files', subdomain='www')
api.add_resource(AdminDashboardView, '/api/v1/admin/<string:auth_token>/dashboard', subdomain='www')
api.add_resource(AdminUIBuilderView, '/api/v1/admin/<string:auth_token>/build', subdomain='www')
api.add_resource(AdminAppUpdateView, '/api/admin/app/update', subdomain='www')
api.add_resource(AdminMandrillTemplatesView, '/api/admin/<string:auth_token>/mandrill/templates', subdomain='www')
api.add_resource(AdminMandrillCampaignsView, '/api/admin/<string:auth_token>/mandrill/campaigns', subdomain='www')
api.add_resource(AdminMandrillCampaignDetailedView, '/api/admin/<string:auth_token>/mandrill/campaigns/<string:tag>', subdomain='www')
api.add_resource(AdminViewEmailsList, '/api/admin/<string:auth_token>/emails', subdomain='www')
api.add_resource(AdminViewUsersList, '/api/admin/<string:auth_token>/users', subdomain='www')
api.add_resource(AdminViewUniversitiesList, '/api/admin/<string:auth_token>/universities', subdomain='www')
api.add_resource(AdminViewUniversitiesListEmails, '/api/admin/<string:auth_token>/universities/emails', subdomain='www')
api.add_resource(AdminViewUniversitiesListPrepared, '/api/admin/<string:auth_token>/universities/prepared', subdomain='www')
api.add_resource(AdminViewUniversitiesListAll, '/api/admin/<string:auth_token>/universities/us_news', subdomain='www')
api.add_resource(AdminViewUniversitiesListAllDistribution, '/api/admin/<string:auth_token>/universities/distribution', subdomain='www')
api.add_resource(AdminViewUserList, '/api/admin/<string:auth_token>/user/<int:_id>', subdomain='www')
api.add_resource(AdminViewUserAnalytics, '/api/admin/analytics/user', subdomain='www')

# Admin views githu, subdomain='www'b, subdomain='www'

api.add_resource(AdminViewGithubIssues, '/api/admin/<string:auth_token>/github/issues', subdomain='www')
api.add_resource(AdminViewGithubLabels, '/api/admin/<string:auth_token>/github/labels', subdomain='www')


# --> ios, small, 'mad-lib'
def updateSubstateTesting(platform, windowsize, scene):
    data = {
        'success': True
    }
    # url = "https://www.uguru-rest.h"
    #
    return