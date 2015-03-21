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

APPROVED_ADMIN_TOKENS = ['9c1185a5c5e9fc54612808977ee8f548b2258d31']

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

class VersionView(restful.Resource):
    def get(self):
        version_dict = {
            'version':Version.most_recent_by_version(1, True),
            'ios_msg': Version.query.get(1).ios_msg
        }
        return json.dumps(version_dict), 200

class MajorListView(restful.Resource):
    def get(self):
        from static.data.majors_general import majors

        return json.dumps({"majors":majors}), 200

class RankingsView(restful.Resource):
    def get(self):
        from static.data.ranking.guru import ranking_table

        return json.dumps({"rankings":ranking_table}), 200


class SupportView(restful.Resource):

    @marshal_with(UserSerializer)
    def post(self, user_id):

        user = get_user(user_id)

        if not user:
            abort(404)

        msg = request.json.get('message')

        support = Support(user, msg, request.json)

        return user, 200

class CourseListView(restful.Resource):
    def get(self):
        from static.data.berkeley_courses import courses

        return json.dumps({"courses":courses}), 200

class UniversityMajorsView(restful.Resource):
    @marshal_with(MajorSerializer)
    def get(self, id):
        majors = Major.query.all()

        return majors, 200

class UniversityCoursesView(restful.Resource):
    @marshal_with(CourseSerializer)
    def get(self, id):
        # from static.data.universities_courses_efficient import uni_courses_dict


        # courses = uni_courses_dict[str(id)].get("courses")s
        u = University.query.get(id)
        if not u.courses:
            return u.departments, 200
        else:
            return u.courses, 200


        # from static.data.berkeley_courses import courses

class OneDeviceView(restful.Resource):
    @marshal_with(DeviceSerializer)
    def post(self):


        uuid = request.json.get('uuid')
        print request.json

        new_device = Device.query.filter_by(uuid = uuid).first()

        if new_device:
            print 'device already exists', new_device.id
            if new_device.user_id:

                print 'and has a user', new_device.user.name
                new_device.user.current_device = new_device

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
        device.push_notif_enabled = request.json.get('push_notif_enabled')
        device.push_notif = request.json.get('push_notif')
        device.location_enabled = request.json.get('location_enabled')
        device.camera_enabled = request.json.get('camera_enabled')
        device.background_location_enabled = request.json.get('background_location_enabled')

        db_session.commit()


        return device, 200



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
        [db_session.refresh(_request) for _request in user.requests]
        [db_session.refresh(_session) for _session in user.guru_sessions]
        [db_session.refresh(_session) for _session in user.student_sessions]
        [db_session.refresh(proposal) for proposal in user.proposals]
        db_session.refresh(user)

        # if not request.json.get('auth_token'):
        #     abort(400)
        if not user:
            abort(400)
        else:
            return user, 200

    @marshal_with(UserSerializer)
    def put(self, _id):
        # if not request.json.get('auth_token'):
        #     abort(400)

        user = User.query.get(_id)
        if not user:
            abort(400)

        # if request.json.get('auth_token') != user.auth_token:
        #     abort(400)

        if request.json.get('university_id'):
            user.university_id = request.json.get('university_id')

        if request.json.get('email'):
            user.email = request.json.get('email')

        if 'is_a_guru' in request.json:
            user.is_a_guru = request.json.get('is_a_guru')

        if 'guru_mode' in request.json:
            user.guru_mode = request.json.get('guru_mode')

        if request.json.get('change_password'):
            pass

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

        if request.json.get('add_guru_intro'):
            user.guru_introduction = request.json.get('introduction')
            print user.guru_introduction

        if request.json.get('add_user_major'):
            major = request.json.get('major')
            major_id = major.get('id')
            if not major_id:
                abort(404)
            else:
                major_obj = Major.query.get(int(major_id))
                user.majors.append(major_obj)
                db_session.commit()
                # create major case


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
            db_session.commit()

        if request.json.get('current_device_id'):
            user.current_device_id = request.json.get('current_device_id')


        if request.json.get('remove_guru_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            c = Course.query.get(int(course_id))
            if c in user.guru_courses:
                user.guru_courses.remove(c)
            db_session.commit()

        if request.json.get('remove_major'):
            major = request.json.get('major')
            major_id = major.get('id')
            m = Major.query.get(int(major_id))
            if m in user.majors:
                user.majors.remove(m)
            db_session.commit()

        #TODO PROMO CODES ARE WORKING

        if request.json.get('student_promo_code'):
            promo_code = request.json.get('student_promo_code')
            promo_user_exists = User.query.filter_by(referral_code = promo_code).all()

            if promo_user_exists:
                if not user.credits:
                    user.credits = 5
                else:
                    user.credits += 5
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
        if not request.json.get('auth_token'):
            abort(400)

        user = User.query.get(_id)
        if not user:
            abort(400)

        if request.json.get('auth_token') != user.auth_token:
            abort(400)

        if request.json.get('university_id'):
            user.university_id = None

        if request.json.get('remove_student_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            c = Course.query.get(int(course_id))
            if c in user.student_courses:
                user.student_courses.remove(c)
            db_session.commit()

        if request.json.get('remove_guru_course'):
            course = request.json.get('course')
            course_id = course.get('id')
            c = Course.query.get(int(course_id))
            if c in user.guru_courses:
                user.guru_courses.remove(c)
            db_session.commit()

        if request.json.get('remove_major'):
            major = request.json.get('major')
            major_id = major.get('id')
            m = Major.query.get(int(major_id))
            if m in user.majors:
                user.majors.remove(m)
            db_session.commit()

        db_session.commit()
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

        course = request.json.get('course')

        #check if request is already active
        if user.request_active(course.get('id')):
            abort(409)

        position = request.json.get('position')

        if position:
            position = Position.initFromJson(position, user.id)

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

        calendar = Calendar.initFromRequest(_request, 2)
        calendar_events_json = request.json.get('calendar_events')

        if calendar_events_json:
            for day_arr in calendar_events_json:
                for hour_json in day_arr:
                    calendar_event = Calendar_Event.initFromJson(hour_json, calendar, calendar_events_json.index(day_arr))


        if request.json.get('files'):
            files_json = request.json.get('files')

            for file_json in request.json.get('files'):
                file_obj = File.query.get(file_json.get('id'))
                file_obj.request_id = _request.id

            db_session.commit()

        available_gurus = _request.course.gurus.all()
        for guru in available_gurus:
            proposal = Proposal.initProposal(_request.id, guru.id, calendar.id)
            event_dict = {'status': Proposal.GURU_SENT, 'proposal_id':proposal.id}
            event = Event.initFromDict(event_dict)

        return user, 200

    @marshal_with(UserSerializer)
    def put(self, user_id):

        user = get_user(user_id)
        print user
        if not user:
            abort(404)

        if request.json.get('proposal'):
            proposal_json = request.json
            print request.json
            proposal = Proposal.query.get(proposal_json.get('id'))
            proposal.status = request.json.get('status')
            db_session.commit()
            if proposal.status ==Proposal.GURU_REJECTED:
                proposal.send_to_next_guru()
                event_dict = {'status': Proposal.GURU_REJECTED, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)

            if proposal.status == Proposal.GURU_ACCEPTED:
                proposal.request.status = Request.STUDENT_RECEIVED_GURU
                proposal.request.guru_id = user_id
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
                # TODO: SEND TO NEXT GURU
            elif status == Request.STUDENT_ACCEPTED_GURU:
                event_dict = {'status': Request.STUDENT_ACCEPTED_GURU, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
            elif status == Request.STUDENT_CANCELED:
                event_dict = {'status': Request.STUDENT_CANCELED, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
                for proposal in _request.proposals:
                    if proposal.status == proposal.GURU_ACCEPTED:
                        event_dict = {'status': Proposal.GURU_ACCEPT_STUDENT_CANCELED, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)
                    if proposal.status == proposal.GURU_SENT:
                        event_dict = {'status': Proposal.GURU_SENT_STUDENT_CANCELED, 'proposal_id':proposal.id}
                        event = Event.initFromDict(event_dict)

            elif status == Request.GURU_CANCELED_SEARCHING_AGAIN:
                event_dict = {'status': Request.GURU_CANCELED_SEARCHING_AGAIN, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)
            elif status == Request.NO_GURUS_AVAILABLE:
                event_dict = {'status': Request.NO_GURUS_AVAILABLE, 'request_id':_request.id}
                event = Event.initFromDict(event_dict)

            db_session.commit()

            return user, 200

class UserTransactionsView(restful.Resource):

    #create new transaction (transfer or charge)
    @marshal_with(UserSerializer)
    def post(self, _id):
        user = get_user(_id)
        if not user:
            abort(404)

        if request.json.get('transaction'):
            print request.json

            transaction_json = request.json
            selected_card = Card.query.get(transaction_json.get('card_id'))

            Transaction.initTransferTransaction(user, selected_card);

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


        file = request.files.get('file')
        print request.headers
        file_string= request.values.get('file')
        filename = 'jpeg'

        if file_string:

            from app.lib.api_utils import upload_file_to_amazon
            from app import app
            import imghdr, base64

            s3_key = app.config['S3_KEY']
            s3_secret = app.config['S3_SECRET']
            s3_bucket = app.config['S3_BUCKET']

            file_obj = File.initEmptyFile()
            file_string_base64 = base64.b64decode(file_string)
            file_extension = imghdr.what(None,file_string_base64)
            file_name = 'request_file_id_' + str(file_obj.id) + '.' + file_extension

            upload_file_to_amazon(file_name, file_string_base64, s3_key, s3_secret, s3_bucket)

            # extension = filename.split('.')[1]
            # destination_filename = md5(str(user_id)).hexdigest() + "." + extension

            #save this to the db
            if os.environ.get('PRODUCTION'):
                amazon_url = "https://s3.amazonaws.com/uguruprof/"+file_name
            else:
                amazon_url = "https://s3.amazonaws.com/uguruproftest/"+file_name

            file_obj.url = amazon_url
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
                message = Message.initFromJson(message_json)

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


        session_json = request.json
        _request = Request.query.get(request.json.get('id'))
        _request.guru = User.query.get(request.json.get('guru_id'))
        _request.status = Request.STUDENT_ACCEPTED_GURU
        session_json['student_id'] = _request.student_id
        session_json['guru_id'] = _request.guru.id
        #create an event for it
        event_dict = {'status': Request.STUDENT_ACCEPTED_GURU, 'request_id':_request.id}
        event = Event.initFromDict(event_dict)

        #create a session
        session = Session.initFromJson(session_json, True)
        #update the proposal from the request
        for proposal in _request.proposals:
            if proposal.guru_id == _request.guru_id:
                proposal.status = Proposal.GURU_CHOSEN
                event_dict = {'status': Proposal.GURU_CHOSEN, 'proposal_id':proposal.id}
                event = Event.initFromDict(event_dict)
                break
        db_session.commit()

        # Create relationship as well
        if not session.relationship_id:
            session._relationship = Relationship.initFromSession(session)
            db_session.commit()

        #Contact the guru
        else:
            doNothing = True

        return user, 200



    #update a session
    @marshal_with(SessionSerializer)
    def put(self, _id):
        #append student, guru_position updated

        user = get_user(_id)

        if not user:
            abort(404)

        session_json = request.json.get('session')
        _session = Session.query.get(session_json.get('id'))
        if request.json.get('session'):
            print session_json

        if request.json.get('recurring_session_guru_accept'):
            proposal_id = request.json.get('proposal_id')
            proposal = Proposal.query.get(proposal_id)
            _session.status = Session.GURU_ACCEPT_RECURRING_SESSION
            _proposal.status = Proposal.GURU_ACCEPTED_RECURRING
            event_dict = {'status': Session.GURU_ACCEPT_RECURRING_SESSION, 'session_id':_session.id}
            event = Event.initFromDict(event_dict)
            db_session.commit()
            return _session, 200

        if request.json.get('recurring_session_guru_reject'):
            proposal_id = request.json.get('proposal_id')
            proposal = Proposal.query.get(proposal_id)
            _session.status = Session.GURU_REJECT_RECURRING_SESSION
            _proposal.status = Proposal.GURU_REJECTED_RECURRING

            event_dict = {'session_id': session_id, 'status': _session.status, 'impacted_user_id': _session.student_id}
            event = Event.initFromDict(event_dict)
            db_session.commit()
            return _session, 200

        #add updated position from student
        if request.json.get('session_position_student'):
            position_json = request.json.get('position')
            position_json['session_id'] = session_json.get('id')
            position = Position.initFromJson(position_json, user.id)

            _session = Session.query.get(session_json.get('id'))
            _session.student_positions.append(position)
            db_session.commit()
            return _session, 200

        #add updated position from student
        if request.json.get('session_position_guru'):
            position_json = request.json.get('position')
            position_json['session_id'] = session_json.get('id')
            position = Position.initFromJson(position_json, user.id)

            _session.guru_positions.append(position)
            db_session.commit()
            return _session, 200

        if request.json.get('session_update_time'):
            _session.seconds = request.json.get('seconds')
            _session.hours = request.json.get('hours')
            _session.minutes = request.json.get('minutes')
            db_session.commit()

            return _session, 200

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
            return _session, 200

        abort(404)


    @marshal_with(UserSerializer)
    def delete(self, _id):
        pass

#TODO Testing
#TODO Create proposals proposals to gurus, Redis, guru ranking, re-initialize request if guru cancels
#TODO Bank shit: Cashing_out, transactions from the bank, refunds, Stripe
#TODO Later Queuing system + task actions for db_commits
#TODO Later: Images & Files --> S3 Bucket

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
            message = Message.initFromJson(message_json)

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


class UserCardView(restful.Resource):
    @marshal_with(UserSerializer)
    def post(self, user_id):

        user = get_user(user_id)

        if not user:
            abort(404)

        card = request.json.get('card')
        debit_card = request.json.get('debit_card')

        # user is adding a card
        if debit_card:
            if not user.get_transfer_cards():
                request.json['is_default_transfer'] = True
            card = Card.initFromJson(request.json, user)
            return user, 200

        if card:
            if not user.get_payment_cards():
                request.json['is_default_payment'] = True
            debit_card = Card.initFromJson(request.json, user)
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

    @marshal_with(UserSerializer)
    def post(self):

        fb_user = email_user = None

        if request.json.get('email'):
            email_user = User.query.filter_by(email=request.json.get('email')).first()

        if request.json.get('fb_id'):
            fb_user = User.query.filter_by(fb_id=request.json.get('fb_id')).first()


        if email_user and not fb_user:
            abort(409);
            # return json_response(400, errors=["Account already exists"])

        #we can go ahead and log them in.. for now..(TODO: MAKE MORE SECURE)
        import uuid

        device = None
        if request.json.get('current_device'):
            current_device_id = request.json.get('current_device').get('id')
            device = Device.query.get(current_device_id)

        if fb_user:
            fb_user.name = request.json.get('name')
            fb_user.email = request.json.get('email')
            fb_user.referral_code = User.generate_referral_code(fb_user.name)
            fb_user.auth_token = uuid.uuid4().hex
            fb_user.profile_url = request.json.get('profile_url')
            if device:
                fb_user.current_device = device
                device.user_id = fb_user.id
            db_session.commit()
            return fb_user, 200


        user = User(email=request.json.get('email'))
        user.time_created = datetime.now()
        user.name = request.json.get('name')
        user.referral_code = User.generate_referral_code(user.name)
        user.auth_token = uuid.uuid4().hex

        if request.json.get('fb_id'):
            user.profile_url = request.json.get('profile_url')
            user.fb_id = request.json.get('fb_id')

        else:
            from hashlib import md5
            password = md5(request.json.get('password')).hexdigest()

        db_session.add(user)
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

        if request.json.get('university_id'):

            user.university_id = request.json.get('university_id')
            db_session.commit()


        return user, 200

    #login
    @marshal_with(UserSerializer)
    def put(self):

        if request.json.get('email'):
            print request.json
            from hashlib import md5
            email_user = User.query.filter_by(
                email=request.json.get('email'),
                password=md5(request.json.get('password')).hexdigest()
                ).first()

            if email_user:
                import uuid
                email_user.auth_token = uuid.uuid4().hex

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

class AdminViewUniversitiesList(restful.Resource):

    @marshal_with(UniversitySerializer)
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

        from app.lib.github_client import init_github, create_issue
        g_repo = init_github()
        issue = create_issue(g_repo, labels, title, body)

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



class AdminUniversityCoursesView(restful.Resource):
    def post(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        return jsonify(success=[True])

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
                email_user.signed_up = True
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


class AdminUniversityDepartmentsView(restful.Resource):
    def post(self, auth_token, uni_id):
        if not auth_token in APPROVED_ADMIN_TOKENS:
            return "UNAUTHORIZED", 401

        new_db_objs = []

        department = request.json.get('department')
        d = Department()
        d.code = department['code'].upper()
        d.title = department['title']
        d.university_id = uni_id
        new_db_objs.append(d)

        courses = department.get('courses')
        if courses:
            for course in courses:
                c = Course()
                c.department_short = d.code
                c.department_long = d.title
                c.short_name = course['code'].upper()
                c.course_number = course["code"].upper().split(" ")[::-1][0]
                c.full_name = course["title"]
                c.university_id = uni_id
                new_db_objs.append(c)

        db_session.add_all(new_db_objs)
        db_session.commit()
        results = {'message': str(len(new_db_objs)) + ' objects processed'}

        return jsonify(success=results)

api.add_resource(UserView, '/api/v1/users')
api.add_resource(UserNewView, '/api/v1/user')
api.add_resource(UserOneView, '/api/v1/user/<int:_id>')
api.add_resource(FileView, '/api/v1/files')
api.add_resource(UserRequestView, '/api/v1/user/<int:user_id>/requests')
api.add_resource(UserCardView, '/api/v1/user/<int:user_id>/cards')
api.add_resource(UserSessionView, '/api/v1/user/<int:_id>/sessions')
api.add_resource(UserTransactionsView, '/api/v1/user/<int:_id>/transactions')
api.add_resource(UserRatingView, '/api/v1/user/<int:_id>/ratings')
api.add_resource(UserSessionMessageView, '/api/v1/user/<int:_id>/sessions/<int:_session>/messages')
api.add_resource(OneDeviceView, '/api/v1/device')
api.add_resource(DeviceView, '/api/v1/devices/<int:device_id>')
api.add_resource(VersionView, '/api/v1/version')
api.add_resource(UserPhoneView, '/api/v1/phone')
api.add_resource(SupportView, '/api/v1/support')
api.add_resource(SessionView, '/api/v1/sessions')
api.add_resource(RankingsView, '/api/v1/rankings')
api.add_resource(UniversityListView, '/api/v1/universities')
api.add_resource(UniversityMajorsView, '/api/v1/universities/<int:id>/majors')
api.add_resource(UniversityCoursesView, '/api/v1/universities/<int:id>/courses')
api.add_resource(MajorListView, '/api/v1/majors')
api.add_resource(CourseListView, '/api/v1/courses')
api.add_resource(UserEmailView, '/api/v1/user_emails')

# Admin views
api.add_resource(AdminSessionView, '/api/admin')
api.add_resource(AdminUserView, '/api/admin/users/')
api.add_resource(AdminUniversityCoursesView, '/api/admin/<string:auth_token>/university/<int:uni_id>/courses')
api.add_resource(AdminUniversityDepartmentsView, '/api/admin/<string:auth_token>/university/<int:uni_id>/departments')
api.add_resource(AdminUniversityAddRecipientsView, '/api/admin/<string:auth_token>/university/<int:uni_id>/recipients')
api.add_resource(AdminSendView, '/api/admin/<string:auth_token>/send_test')
api.add_resource(AdminAppUpdateView, '/api/admin/app/update')
api.add_resource(AdminMandrillTemplatesView, '/api/admin/<string:auth_token>/mandrill/templates')
api.add_resource(AdminMandrillCampaignsView, '/api/admin/<string:auth_token>/mandrill/campaigns')
api.add_resource(AdminMandrillCampaignDetailedView, '/api/admin/<string:auth_token>/mandrill/campaigns/<string:tag>')
api.add_resource(AdminViewEmailsList, '/api/admin/<string:auth_token>/emails')
api.add_resource(AdminViewUsersList, '/api/admin/<string:auth_token>/users')
api.add_resource(AdminViewUniversitiesList, '/api/admin/<string:auth_token>/universities')
api.add_resource(AdminViewUserList, '/api/admin/<string:auth_token>/user/<int:_id>')

# Admin views github

api.add_resource(AdminViewGithubIssues, '/api/admin/<string:auth_token>/github/issues')
api.add_resource(AdminViewGithubLabels, '/api/admin/<string:auth_token>/github/labels')


