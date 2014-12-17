from flask.ext.restful import fields

UserSerializer = {
    'name':   fields.String,
    'email': fields.String,
    'time_created': fields.DateTime,
}
