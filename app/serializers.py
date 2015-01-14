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
course_fields['name'] = fields.String(attribute='short_name')



UserSerializer = {
    'id': fields.Integer,
    'name':   fields.String,
    'email': fields.String,
    'time_created': fields.DateTime,
    'profile_url': fields.String,
    'gender': fields.String, 
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
    'guru_courses': fields.List(fields.Nested(course_fields))
}



