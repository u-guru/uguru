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
major_fields['abbr'] = fields.String(attribute='abbr')
major_fields['code'] = fields.String(attribute='code')

subcategory_fields = {}
subcategory_fields['id'] = fields.Integer(attribute='id')
subcategory_fields['name'] = fields.String(attribute='name')
subcategory_fields['icon_url'] = fields.String(attribute='icon_url')
subcategory_fields['is_active'] = fields.String(attribute='is_active')
subcategory_fields['is_approved'] = fields.String(attribute='is_approved')
subcategory_fields['description'] = fields.String(attribute='description')


category_fields = {}
category_fields['id'] = fields.Integer(attribute='id')
category_fields['name'] = fields.String(attribute='name')
category_fields['hex_color'] = fields.String(attribute='hex_color')

user_subcategory_fields = {}
user_subcategory_fields['id'] = fields.Integer(attribute='id')
user_subcategory_fields['name'] = fields.String(attribute='name')
user_subcategory_fields['category'] = fields.Nested(category_fields)

tag_fields = {}
tag_fields['id'] = fields.Integer(attribute='id')
tag_fields['name'] = fields.String(attribute='name')


course_fields = {}
course_fields['id'] = fields.Integer(attribute='id')
course_fields['name'] = fields.String(attribute='short_name')
course_fields['title'] = fields.String(attribute='full_name')

department_fields = {}
department_fields['id'] = fields.Integer(attribute='id')
department_fields['abbr'] = fields.String(attribute='abbr')
department_fields['title'] = fields.String(attribute='title')
department_fields['name'] = fields.String(attribute='name')
department_fields['code'] = fields.String(attribute='code')

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

skill_fields = {}
skill_fields['id'] = fields.Integer(attribute='id')
skill_fields['category'] = fields.String(attribute='category')
skill_fields['name'] = fields.String(attribute='name')
skill_fields['time_created'] = fields.String(attribute='time_created')


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
guru_fields['current_hourly'] = fields.Float(attribute='current_hourly')
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
device_fields['body_load_time'] = fields.Float(attribute='body_load_time')
device_fields['update_load_time'] = fields.Float(attribute='update_load_time')
device_fields['is_test_device'] = fields.Boolean(attribute='is_test_device')
device_fields['device_load_time'] = fields.Float(attribute='device_load_time')
device_fields['network_speed'] = fields.String(attribute='network_speed')
device_fields['typical_network_speed'] = fields.String(attribute='typical_network_speed')

request_fields = {}
request_fields['time_created'] = fields.DateTime(attribute='time_created')
request_fields['description'] = fields.String(attribute='description')
request_fields['online'] = fields.Boolean(attribute='online')
request_fields['in_person'] = fields.Boolean(attribute='in_person')
request_fields['time_estimate'] = fields.Integer(attribute='time_estimate')
request_fields['address'] = fields.String(attribute='address')
request_fields['category'] = fields.String(attribute='category')
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
request_fields['tags'] = fields.List(fields.Nested(tag_fields))
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
proposal_fields['guru'] = fields.List(fields.Nested(guru_fields))
proposal_fields['question_response'] = fields.String(attribute='question_response')

selected_proposal_fields = {}
selected_proposal_fields['time_created'] = fields.DateTime(attribute='time_created')
selected_proposal_fields['files'] = fields.Nested(file_fields)
selected_proposal_fields['status'] = fields.Integer(attribute='status')
selected_proposal_fields['id'] = fields.Integer(attribute='id')
selected_proposal_fields['student_price'] = fields.Float(attribute='student_price')
selected_proposal_fields['guru_price'] = fields.Float(attribute='guru_price')
selected_proposal_fields['guru'] = fields.List(fields.Nested(guru_fields))
selected_proposal_fields['question_response'] = fields.String(attribute='question_response')

request_fields['selected_proposal'] = fields.Nested(selected_proposal_fields)

card_fields = {}
card_fields['time_created'] = fields.DateTime(attribute='time_created')
card_fields['card_last4'] = fields.String(attribute='card_last4')
card_fields['bank_last4'] = fields.String(attribute='bank_last4')
card_fields['card_type'] = fields.String(attribute='card_type')
card_fields['is_default_payment'] = fields.Boolean(attribute='is_default_payment')
card_fields['is_default_transfer'] = fields.Boolean(attribute='is_default_transfer')
card_fields['is_bank_card'] = fields.Boolean(attribute='is_bank_card')
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
# transaction_fields['session'] = fields.Nested(session_fields_transaction)
transaction_fields['request'] = fields.Nested(request_fields)
transaction_fields['student'] = fields.Nested(student_fields)
transaction_fields['card'] = fields.Nested(card_fields)
transaction_fields['id'] = fields.Integer(attribute='id')
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

guru_language_fields = {}
guru_language_fields['id'] = fields.Integer(attribute='id')
guru_language_fields['name'] = fields.String(attribute='name')

guru_experience_fields = {}
guru_experience_fields['id'] = fields.Integer(attribute='id')
guru_experience_fields['name'] = fields.String(attribute='name')
guru_experience_fields['description'] = fields.String(attribute='description')
guru_experience_fields['years'] = fields.Integer(attribute='years')
guru_experience_fields['admin_approved'] = fields.Boolean(attribute='admin_approved')



rating_fields = {}
rating_fields['guru_id'] = fields.Integer(attribute='guru_id')
rating_fields['student_id'] = fields.Integer(attribute='student_id')
rating_fields['id'] = fields.Integer(attribute='id')
rating_fields['student_rating'] = fields.Integer(attribute='student_rating')
rating_fields['guru_rating'] = fields.Integer(attribute='guru_rating')
rating_fields['session'] = fields.Nested(session_fields)
rating_fields['transaction'] = fields.Nested(transaction_fields)

relationship_fields = {}
relationship_fields['student'] = fields.Nested(student_fields)
relationship_fields['guru'] = fields.Nested(guru_fields)
relationship_fields['sessions'] = fields.Nested(session_fields)
relationship_fields['messages'] = fields.Nested(message_fields)


class FilteredList(fields.Raw):
    def format(self, value):
        return value[0:5]


UserSerializer = {
    'id': fields.Integer,
    'name':   fields.String,
    'email': fields.String,
    'school_email': fields.String,
    'school_email_confirmed': fields.Boolean,
    'tutoring_platforms_description': fields.String,
    'profile_url': fields.String,
    'is_a_guru': fields.Boolean,
    'files': fields.List(fields.Nested(file_fields)),
    'transcript_file': fields.Nested(file_fields),
    'transcript_verified_by_admin': fields.Boolean,
    'is_admin': fields.Boolean,
    'is_support_admin': fields.Boolean,
    'guru_deposit': fields.Boolean,
    'guru_mode': fields.Boolean,
    'gender': fields.String,
    'customer_id': fields.String,
    'recipient_id': fields.String,
    'auth_token': fields.String,
    'email_friendly': fields.Boolean,
    'hangouts_friendly': fields.Boolean,
    'skype_friendly': fields.Boolean,
    'phone_friendly': fields.Boolean,
    'facetime_friendly':fields.Boolean,
    'messenger_friendly': fields.Boolean,
    'person_friendly': fields.Boolean,
    'text_friendly': fields.Boolean,
    'fb_id': fields.String,
    'password': fields.String,
    'guru_latest_time':fields.Integer,
    'guru_introduction': fields.String,
    'tos_version': fields.Integer,
    'university_id': fields.Integer,
    'university': fields.Nested(university_fields),
    'recent_latitude': fields.Float,
    'recent_longitude': fields.Float,
    'max_hourly': fields.Float,
    'guru_languages': fields.List(fields.Nested(guru_language_fields)),
    'guru_experiences': fields.List(fields.Nested(guru_experience_fields)),
    'location_services_enabled': fields.Boolean,
    'majors': fields.List(fields.Nested(major_fields)),
    'guru_courses': fields.List(fields.Nested(course_fields)),
    'student_courses': fields.List(fields.Nested(course_fields)),
    'student_sessions': fields.List(fields.Nested(session_fields)),
    'guru_ratings': fields.List(fields.Nested(rating_fields)),
    'student_ratings': fields.List(fields.Nested(rating_fields)),
    'guru_sessions': fields.List(fields.Nested(session_fields)),
    'current_hourly': fields.Float,
    'text_notifications': fields.Boolean,
    'email_notifications': fields.Boolean,
    'push_notifications': fields.Boolean,
    'push_notifications_enabled': fields.Boolean,
    'guru_score': fields.Float,
    'last_position': fields.Nested(position_fields),
    # 'requests': fields.List(fields.Nested(request_fields)),
    # 'sessions': fields.List(fields.Nested(session_fields)),
    # 'proposals': fields.List(fields.Nested(proposal_fields)),
    'cards': fields.List(fields.Nested(card_fields)),
    'phone_number': fields.String,
    'phone_number_token': fields.String,
    'phone_number_confirmed': fields.Boolean,
    'phone_number': fields.String,
    'phone_number_token': fields.String,
    'phone_number_confirmed': fields.Boolean,
    # 'student_transactions': fields.List(fields.Nested(transaction_fields)),
    'guru_transactions': fields.List(fields.Nested(transaction_fields)),
    'transfer_transactions': fields.List(fields.Nested(transaction_fields)),
    'impact_events': fields.List(fields.Nested(event_fields)),
    'guru_relationships': fields.List(fields.Nested(relationship_fields)),
    'student_relationships': fields.List(fields.Nested(relationship_fields)),
    'guru_skills': fields.List(fields.Nested(skill_fields)),
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
    'total_earned': fields.Float,
    'departments': fields.List(fields.Nested(department_fields)),
    'guru_categories': fields.List(fields.Nested(category_fields)),
    'guru_subcategories': fields.List(fields.Nested(user_subcategory_fields)),
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

CategorySerializer = {
    'id':fields.Integer,
    'name':fields.String,
    'background_url': fields.String,
    'icon_url': fields.String,
    'description': fields.String,
    'is_active': fields.Boolean,
    'is_approved': fields.Boolean,
    'hex_color': fields.String,
    'subcategories': fields.List(fields.Nested(subcategory_fields))
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
    'title': fields.String(attribute='full_name'),
    'name': fields.String(attribute='short_name'),
    'id': fields.Integer
}

MajorSerializer = {
    'name': fields.String,
    'id': fields.Integer,
    'code': fields.String,
    'title': fields.String,
    'abbr': fields.String
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
    'guru_id': fields.Integer,
    'category': fields.String
}

FileSerializer = {
    'id': fields.Integer,
    'url': fields.String
}

AdminUniversitySerializer = {
    'id': fields.Integer,
    'num_courses': fields.Integer,
    'num_popular_courses': fields.Integer,
    'num_depts': fields.Integer,
    'name': fields.String,
    'logo_url': fields.String,
    'banner_url':fields.String,
    'svg_url': fields.String,
    'city': fields.String,
    'state': fields.String,
    'population': fields.Integer,
    'num_emails': fields.Integer,
    'departments_sanitized': fields.Boolean,
    'courses_sanitized': fields.Boolean,
    'school_color_one': fields.String,
    'website': fields.String,
    'school_mascot_name': fields.String,
    'school_casual_name': fields.String,
    'us_news_ranking': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float,
    'forbes_url': fields.String,
    'seal_url': fields.String,
    'school_color_one': fields.String,
    'school_color_two': fields.String,
    'variations': fields.String
}

AdminUniversityDeptSerializer = {
    'id': fields.Integer,
    'time_created' : fields.DateTime,
    'time_updated' : fields.DateTime,
    'is_popular' : fields.Boolean,
    'source' : fields.String,
    'times_mentioned': fields.Integer,
    'num_courses': fields.Integer,
    'num_popular_courses': fields.Integer,
    'code': fields.String,
    'abbr': fields.String,
    'name': fields.String,
    'short_name': fields.String,
    'variations': fields.String,
    'title' :  fields.String
}

AdminUniversityDeptCourseSerializer = {
    'id': fields.Integer,
    'time_added': fields.DateTime,
    'department_id': fields.Integer,
    'university_id': fields.Integer,
    'name': fields.String,
    'short_name': fields.String,
    'full_name': fields.String,
    'is_popular': fields.Boolean,
    'variations': fields.String,
    'times_mentioned': fields.Integer
}

SkillSerializer = {
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'is_popular': fields.Boolean,
    'contributed_user_id': fields.Integer
}

TagSerializer = {
    'id': fields.Integer,
    'name': fields.String,
    'is_profession': fields.Boolean
}

DepartmentSerializer = {
    'id': fields.Integer,
    'name': fields.String,
    'short_name': fields.String,
    'variations': fields.String,
    'abbr': fields.String,
    'code': fields.String,
    'title': fields.String,
    'is_popular': fields.Boolean
}