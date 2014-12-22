from flask.ext.restful import fields
from app.models import University





university_fields = {}
university_fields['id'] = fields.Integer(attribute='id')
university_fields['name'] = fields.String(attribute='name')
university_fields['state'] = fields.String(attribute='state')
university_fields['city'] = fields.String(attribute='city')

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
    'university_id': fields.Integer,
    'university': fields.Nested(university_fields),
    'recent_latitude': fields.Float,
    'recent_longitude': fields.Float,
    'location_services_enabled': fields.Boolean,

}



