from flask.ext.restful import fields
from app.models import University

university_fields = {}
university_fields['id'] = fields.Integer(attribute='id')
university_fields['title'] = fields.String(attribute='name')
university_fields['state'] = fields.String(attribute='state')
university_fields['city'] = fields.String(attribute='city')

major_fields = {}
major_fields['id'] = fields.Integer(attribute='id')
major_fields['name'] = fields.String(attribute='name')

course_fields = {}
course_fields['id'] = fields.Integer(attribute='id')
course_fields['short_name'] = fields.String(attribute='short_name')
course_fields['title'] = fields.String(attribute='full_name')

position_fields = {}
position_fields['latitude'] = fields.Float(attribute='latitude')
position_fields['longitude'] = fields.Float(attribute='latitude')

guru_rating_fields = {}
guru_rating_fields['id'] = fields.Integer(attribute='id')
guru_rating_fields['guru_rating'] = fields.Integer(attribute='guru_rating')

event_fields = {}
event_fields['id'] = fields.Integer(attribute='id')

guru_fields = {}
guru_fields['name'] = fields.String(attribute='name')
guru_fields['id'] = fields.Integer(attribute='id')
guru_fields['guru_courses'] = fields.List(fields.Nested(course_fields))
guru_fields['majors'] = fields.List(fields.Nested(major_fields))
guru_fields['guru_introduction'] = fields.String(attribute='guru_introduction')
guru_fields['guru_ratings'] = fields.List(fields.Nested(guru_rating_fields))
# guru_fields['guru_sessions'] = fields.List(fields.Nested(session_fields))

student_fields = {}
student_fields['name'] = fields.String(attribute='name')
student_fields['id'] = fields.Integer(attribute='id')

request_fields = {}
request_fields['latitude'] = fields.DateTime(attribute='time_created')
request_fields['description'] = fields.String(attribute='description')
request_fields['online'] = fields.Boolean(attribute='online')
request_fields['in_person'] = fields.Boolean(attribute='in_person')
request_fields['time_estimate'] = fields.Integer(attribute='time_estimate')
request_fields['address'] = fields.String(attribute='address')
request_fields['id'] = fields.Integer(attribute='id')
request_fields['guru'] = fields.Nested(guru_fields)
request_fields['guru_id'] = fields.Integer(attribute='guru_id')
request_fields['student'] = fields.Nested(student_fields)
request_fields['position'] = fields.Nested(position_fields)
request_fields['course'] = fields.Nested(course_fields)
request_fields['status'] = fields.Integer(attribute='status')
# request_fields['events'] = fields.List(fields.Nested(event_fields))

proposal_fields = {}
proposal_fields['time_created'] = fields.DateTime(attribute='time_created')
proposal_fields['request'] = fields.Nested(request_fields)
proposal_fields['status'] = fields.Integer(attribute='status')
proposal_fields['id'] = fields.Integer(attribute='id')

card_fields = {}
card_fields['time_created'] = fields.DateTime(attribute='time_created')
card_fields['card_last4'] = fields.String(attribute='card_last4')
card_fields['card_type'] = fields.String(attribute='card_type')
card_fields['id'] = fields.Integer(attribute='id')
card_fields['is_payment_card'] = fields.Boolean(attribute='is_payment_card')
card_fields['is_cashout_card'] = fields.Boolean(attribute='is_cashout_card')

session_fields = {}
session_fields['time_created'] = fields.DateTime(attribute='time_created')
session_fields['time_updated'] = fields.DateTime(attribute='time_updated')
session_fields['guru'] = fields.Nested(guru_fields)
session_fields['student_positions'] = fields.Nested(position_fields)
session_fields['guru_positions'] = fields.Nested(position_fields)
session_fields['course'] = fields.Nested(course_fields)
session_fields['status'] = fields.Integer(attribute='status')
session_fields['seconds'] = fields.Integer(attribute='seconds')
session_fields['minutes'] = fields.Integer(attribute='minutes')
session_fields['address'] = fields.String(attribute='address')
session_fields['in_person'] = fields.Boolean(attribute='in_person')
session_fields['online'] = fields.Boolean(attribute='online')
session_fields['request'] = fields.Nested(request_fields)
session_fields['time_estimate'] = fields.Integer(attribute='time_estimate')


UserSerializer = {
    'id': fields.Integer,
    'name':   fields.String,
    'email': fields.String,
    'profile_url': fields.String,
    'is_a_guru': fields.Boolean,
    'guru_mode': fields.Boolean,
    'gender': fields.String,
    'auth_token': fields.String,
    'fb_id': fields.String,
    'password': fields.String,
    'guru_introduction': fields.String,
    'tos_version': fields.Integer,
    'university_id': fields.Integer,
    'university': fields.Nested(university_fields),
    'recent_latitude': fields.Float,
    'recent_longitude': fields.Float,
    'location_services_enabled': fields.Boolean,
    'majors': fields.List(fields.Nested(major_fields)),
    'guru_courses': fields.List(fields.Nested(course_fields)),
    'student_courses': fields.List(fields.Nested(course_fields)),
    'student_sessions': fields.List(fields.Nested(session_fields)),
    'guru_sessions': fields.List(fields.Nested(session_fields)),
    'push_notifications': fields.Boolean,
    'push_notifications_enabled': fields.Boolean,
    'guru_score': fields.Float,
    'last_position': fields.Nested(position_fields),
    'requests': fields.List(fields.Nested(request_fields)),
    'sessions': fields.List(fields.Nested(session_fields)),
    'proposals': fields.List(fields.Nested(proposal_fields)),
    'cards': fields.List(fields.Nested(card_fields))
}

DeviceSerializer = {
    'id': fields.Integer,
    'model': fields.String,
    'platform': fields.String,
    'uuid': fields.String,
    'version': fields.String,
    'name': fields.String,
    'time_created': fields.DateTime,
    'last_accessed': fields.DateTime
}

CourseSerializer = {
    'short_name': fields.String,
    'title': fields.String(attribute='full_name'),
    'code': fields.String(attribute='code'),
    'name': fields.String(attribute='name'),
    'id': fields.Integer
}

MajorSerializer = {
    'name': fields.String,
    'id': fields.Integer
}

UniversitySerializer = {
    'name': fields.String,
    'id': fields.Integer,
    'num_students': fields.Integer,
    'num_gurus': fields.Integer,
    'num_courses': fields.Integer,
    'num_majors': fields.Integer,
    'num_emails': fields.Integer
}

RequestSerializer = {
    'id': fields.Integer,
    'description': fields.String,
    'status': fields.Integer,
    'position': fields.Nested(position_fields),
    'address':fields.String,
    'in_person': fields.Boolean,
    'online': fields.Boolean,
    'time_estimate': fields.Integer,
    'course': fields.Nested(course_fields),
    'guru': fields.Nested(guru_fields),
    'student': fields.Nested(student_fields),
    'student_id': fields.Integer,
    'guru_id': fields.Integer
}