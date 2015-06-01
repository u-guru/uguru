from flask.ext.restful import fields
from app.models import University, Session, Transaction
from app.lib.guru_rank import GRADE_CUTOFFS, GURU_SCORE_OPPORTUNITIES, remove_functions_from_opportunities

university_fields = {}
university_fields['id'] = fields.Integer(attribute='id')
university_fields['title'] = fields.String(attribute='name')
university_fields['state'] = fields.String(attribute='state')
university_fields['city'] = fields.String(attribute='city')
university_fields['num_gurus'] = fields.Integer(attribute='num_gurus')
university_fields['latitude'] = fields.Float(attribute='latitude')
university_fields['longitude'] = fields.Float(attribute='longitude')

major_fields = {}
major_fields['id'] = fields.Integer(attribute='id')
major_fields['name'] = fields.String(attribute='name')


course_fields = {}
course_fields['id'] = fields.Integer(attribute='id')
course_fields['short_name'] = fields.String(attribute='short_name')
course_fields['title'] = fields.String(attribute='full_name')

position_fields = {}
position_fields['id'] = fields.Integer(attribute='id')
position_fields['latitude'] = fields.Float(attribute='latitude')
position_fields['longitude'] = fields.Float(attribute='longitude')

guru_rating_fields = {}
guru_rating_fields['id'] = fields.Integer(attribute='id')
guru_rating_fields['guru_rating'] = fields.Integer(attribute='guru_rating')

student_rating_fields = {}
student_rating_fields['id'] = fields.Integer(attribute='id')
student_rating_fields['student_rating'] = fields.Integer(attribute='student_rating')

event_fields = {}
event_fields['id'] = fields.Integer(attribute='id')
event_fields['status'] = fields.Integer(attribute='status')
event_fields['user_id'] = fields.Integer(attribute='user_id')
event_fields['session_id'] = fields.Integer(attribute='session_id')
event_fields['impacted_user_id'] = fields.Integer(attribute='impacted_user_id')
event_fields['impacted_user_notified'] = fields.Boolean(attribute='impacted_user_notified')

file_fields = {}
file_fields['id'] = fields.Integer(attribute='id')
file_fields['url'] = fields.String(attribute='url')
file_fields['request_id'] = fields.Integer(attribute='request_id')
file_fields['description'] = fields.String(attribute='description')
file_fields['size'] = fields.String(attribute='size')
file_fields['name'] = fields.String(attribute='name')

guru_fields = {}
guru_fields['name'] = fields.String(attribute='name')
guru_fields['id'] = fields.Integer(attribute='id')
guru_fields['guru_courses'] = fields.List(fields.Nested(course_fields))
guru_fields['majors'] = fields.List(fields.Nested(major_fields))
guru_fields['guru_introduction'] = fields.String(attribute='guru_introduction')
guru_fields['guru_ratings'] = fields.List(fields.Nested(guru_rating_fields))
guru_fields['profile_url'] = fields.String(attribute='profile_url')
guru_fields['university'] = fields.Nested(university_fields)
# guru_fields['guru_sessions'] = fields.List(fields.Nested(session_fields))

student_fields = {}
student_fields['name'] = fields.String(attribute='name')
student_fields['id'] = fields.Integer(attribute='id')
student_fields['profile_url'] = fields.String(attribute='profile_url')
student_fields['student_ratings'] = fields.List(fields.Nested(student_rating_fields))
student_fields['university'] = fields.Nested(university_fields)
student_fields['majors'] = fields.List(fields.Nested(major_fields))

calendar_event_fields = {}
calendar_event_fields['id'] = fields.Integer(attribute='id')
calendar_event_fields['start_time'] = fields.DateTime(attribute='start_time')
calendar_event_fields['end_time'] = fields.DateTime(attribute='end_time')

calendar_fields = {}
calendar_fields['id'] = fields.Integer(attribute='id')
calendar_fields['calendar_events'] = fields.List(fields.Nested(calendar_event_fields))

message_user_fields = {}
message_user_fields['name'] = fields.String(attribute='name')
message_user_fields['id'] = fields.Integer(attribute='id')
message_user_fields['profile_url'] = fields.String(attribute='profile_url')



device_fields = {}
device_fields['id'] = fields.Integer(attribute='id')
device_fields['model'] = fields.String(attribute='model')
device_fields['platform'] = fields.String(attribute='platform')
device_fields['uuid'] = fields.String(attribute='uuid')
device_fields['version'] = fields.String(attribute='version')
device_fields['name'] = fields.String(attribute='name')
device_fields['time_created'] = fields.DateTime(attribute='time_created')
device_fields['last_accessed'] = fields.DateTime(attribute='last_accessed')
device_fields['push_notif'] = fields.String(attribute='push_notif')
device_fields['push_notif_enabled'] = fields.Boolean(attribute='push_notif_enabled')
device_fields['background_location_enabled'] = fields.Boolean(attribute='background_location_enabled')
device_fields['location_enabled'] = fields.Boolean(attribute='location_enabled')
device_fields['camera_enabled'] = fields.Boolean(attribute='camera_enabled')

request_fields = {}
request_fields['time_created'] = fields.DateTime(attribute='time_created')
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
request_fields['files'] = fields.List(fields.Nested(file_fields))
request_fields['student_calendar'] = fields.List(fields.Nested(calendar_fields))
request_fields['guru_calendar'] = fields.List(fields.Nested(calendar_fields))
request_fields['_type'] = fields.Integer(attribute='_type')
request_fields['student_price'] = fields.Float(attribute='student_price')
request_fields['task_title'] = fields.String(attribute='task_title')
request_fields['verb_image'] = fields.String(attribute='verb_image')
request_fields['initial_status'] = fields.String(attribute='inital_status')

# request_fields['files'] = fields.List(fields.Nested(file_fields))
# request_fields['events'] = fields.List(fields.Nested(event_fields))

proposal_fields = {}
proposal_fields['time_created'] = fields.DateTime(attribute='time_created')
proposal_fields['request'] = fields.Nested(request_fields)
proposal_fields['files'] = fields.Nested(file_fields)
proposal_fields['status'] = fields.Integer(attribute='status')
proposal_fields['id'] = fields.Integer(attribute='id')
proposal_fields['student_calendar'] = fields.List(fields.Nested(calendar_fields))
proposal_fields['student_price'] = fields.Float(attribute='student_price')
proposal_fields['guru_price'] = fields.Float(attribute='guru_price')

card_fields = {}
card_fields['time_created'] = fields.DateTime(attribute='time_created')
card_fields['card_last4'] = fields.String(attribute='card_last4')
card_fields['card_type'] = fields.String(attribute='card_type')
card_fields['is_default_payment'] = fields.Boolean(attribute='is_default_payment')
card_fields['is_default_transfer'] = fields.Boolean(attribute='is_default_transfer')
card_fields['id'] = fields.Integer(attribute='id')
card_fields['is_payment_card'] = fields.Boolean(attribute='is_payment_card')
card_fields['is_transfer_card'] = fields.Boolean(attribute='is_transfer_card')

message_fields = {}
message_fields['sender'] = fields.Nested(message_user_fields)
message_fields['receiver'] = fields.Nested(message_user_fields)
message_fields['time_created'] = fields.DateTime(attribute='time_created')
message_fields['time_sent'] = fields.DateTime(attribute='time_sent')
message_fields['time_seen'] = fields.DateTime(attribute='time_seen')
message_fields['id'] = fields.Integer(attribute='id')
message_fields['contents'] = fields.String(attribute = 'contents')
message_fields['session_id'] = fields.Integer(attribute='session_id')

support_fields = {}
support_fields['id'] = fields.Integer(attribute='id')
support_fields['time_created'] = fields.DateTime(attribute='time_created')
support_fields['time_updated'] = fields.DateTime(attribute='time_resolved')
support_fields['time_resolved'] = fields.DateTime(attribute='time_resolved')
support_fields['message'] = fields.String(attribute='message')
support_fields['messages'] = fields.List(fields.Nested(message_fields))


session_fields_transaction = {}
session_fields_transaction['request'] = fields.Nested(request_fields)

transaction_fields = {}
transaction_fields['student_amount'] = fields.Float(attribute = 'student_amount')
transaction_fields['guru_amount'] = fields.Float(attribute = 'guru_amount')
transaction_fields['time_created'] = fields.DateTime(attribute='time_created')
transaction_fields['guru'] = fields.Nested(guru_fields)
transaction_fields['session'] = fields.Nested(session_fields_transaction)
transaction_fields['student'] = fields.Nested(student_fields)
transaction_fields['card'] = fields.Nested(card_fields)
transaction_fields['transfer_status'] = fields.String(attribute='transfer_status')

session_fields = {}
session_fields['time_created'] = fields.DateTime(attribute='time_created')
session_fields['time_updated'] = fields.DateTime(attribute='time_updated')
session_fields['time_completed'] = fields.DateTime(attribute='time_completed')
session_fields['guru'] = fields.Nested(guru_fields)
session_fields['student'] = fields.Nested(student_fields)
session_fields['id'] = fields.Integer(attribute='id')
session_fields['relationship_id'] = fields.Integer(attribute='relationship_id')
session_fields['student_positions'] = fields.Nested(position_fields)
session_fields['guru_positions'] = fields.Nested(position_fields)
session_fields['course'] = fields.Nested(course_fields)
session_fields['status'] = fields.Integer(attribute='status')
session_fields['seconds'] = fields.Integer(attribute='seconds')
session_fields['hours'] = fields.Integer(attribute='hours')
session_fields['minutes'] = fields.Integer(attribute='minutes')
session_fields['address'] = fields.String(attribute='address')
session_fields['in_person'] = fields.Boolean(attribute='in_person')
session_fields['online'] = fields.Boolean(attribute='online')
session_fields['request'] = fields.Nested(request_fields)
session_fields['transaction'] = fields.Nested(transaction_fields)
session_fields['messages'] = fields.List(fields.Nested(message_fields))
session_fields['time_estimate'] = fields.Integer(attribute='time_estimate')

rating_fields = {}
rating_fields['guru_id'] = fields.Integer(attribute='guru_id')
rating_fields['student_id'] = fields.Integer(attribute='student_id')
rating_fields['id'] = fields.Integer(attribute='id')
rating_fields['student_rating'] = fields.Integer(attribute='student_rating')
rating_fields['guru_rating'] = fields.Integer(attribute='guru_rating')
rating_fields['session'] = fields.Nested(session_fields)

relationship_fields = {}
relationship_fields['student'] = fields.Nested(student_fields)
relationship_fields['guru'] = fields.Nested(guru_fields)
relationship_fields['sessions'] = fields.Nested(session_fields)

UserSerializer = {
    'id': fields.Integer,
    'name':   fields.String,
    'email': fields.String,
    'profile_url': fields.String,
    'is_a_guru': fields.Boolean,
    'files': fields.List(fields.Nested(file_fields)),
    'is_admin': fields.Boolean,
    'is_support_admin': fields.Boolean,
    'guru_mode': fields.Boolean,
    'gender': fields.String,
    'customer_id': fields.String,
    'recipient_id': fields.String,
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
    'guru_ratings': fields.List(fields.Nested(rating_fields)),
    'student_ratings': fields.List(fields.Nested(rating_fields)),
    'guru_sessions': fields.List(fields.Nested(session_fields)),
    'text_notifications': fields.Boolean,
    'email_notifications': fields.Boolean,
    'push_notifications': fields.Boolean,
    'push_notifications_enabled': fields.Boolean,
    'guru_score': fields.Float,
    'last_position': fields.Nested(position_fields),
    'requests': fields.List(fields.Nested(request_fields)),
    'sessions': fields.List(fields.Nested(session_fields)),
    'proposals': fields.List(fields.Nested(proposal_fields)),
    'cards': fields.List(fields.Nested(card_fields)),
    'phone_number': fields.String,
    'student_transactions': fields.List(fields.Nested(transaction_fields)),
    'guru_transactions': fields.List(fields.Nested(transaction_fields)),
    'transfer_transactions': fields.List(fields.Nested(transaction_fields)),
    'impact_events': fields.List(fields.Nested(event_fields)),
    'guru_relationships': fields.List(fields.Nested(relationship_fields)),
    'student_relationships': fields.List(fields.Nested(relationship_fields)),
    'estimated_guru_score': fields.Integer,
    'estimated_guru_rank': fields.Integer,
    'estimated_guru_rank_last_updated': fields.DateTime,
    'official_guru_rank': fields.Integer,
    'official_guru_score': fields.Integer,
    'official_guru_rank_last_updated': fields.DateTime,
    'grade_dict': fields.Raw(GRADE_CUTOFFS),
    'referred_by_id': fields.Integer,
    'guru_score_opportunities': fields.Raw(remove_functions_from_opportunities(GURU_SCORE_OPPORTUNITIES)),
    'current_device': fields.Nested(device_fields),
    'referral_code': fields.String,
    'support_tickets': fields.List(fields.Nested(support_fields)),
    'uber_friendly': fields.Boolean,
    'summer_15': fields.Boolean,
    'outside_university': fields.Boolean,
    'balance': fields.Float,
    'total_earned': fields.Float

}

DeviceSerializer = {
    'id': fields.Integer,
    'model': fields.String,
    'platform': fields.String,
    'uuid': fields.String,
    'version': fields.String,
    'name': fields.String,
    'time_created': fields.DateTime,
    'last_accessed': fields.DateTime,
    'push_notif': fields.String,
    'push_notif_enabled': fields.Boolean,
    'background_location_enabled': fields.Boolean,
    'location_enabled': fields.Boolean,
    'camera_enabled': fields.Boolean
}

SessionSerializer = {
    'id': fields.Integer,
    'messages': fields.List(fields.Nested(message_fields)),
    'student': fields.Nested(student_fields),
    'minutes': fields.Integer,
    'seconds': fields.Integer,
    'status': fields.Integer,
    'hours': fields.Integer,
    'guru': fields.Nested(guru_fields),
    'guru_positions': fields.List(fields.Nested(position_fields)),
    'student_positions': fields.List(fields.Nested(position_fields))
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

FileSerializer = {
    'id': fields.Integer,
    'url': fields.String
}

