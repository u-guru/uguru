from flask.ext.restful import fields

UserSerializer = {
    'id': fields.Integer,
    'name':   fields.String,
    'email': fields.String,
    'time_created': fields.DateTime,
    'profile_url': fields.String,
    'gender': fields.String, 
    'fb_id': fields.String
}
