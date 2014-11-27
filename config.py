CSRF_ENABLED = True
SECRET_KEY = '\xc8]{\x9e\xb7\x93\xc1X\xab#\x8b"K\xe8\xd2\xc5\x17C!I\r$\xca\x7f'

import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

# Detects if on Heroku
if os.environ.get('DATABASE_URL'):
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

S3_LOCATION = os.environ['S3_LOCATION']
S3_KEY = os.environ['S3_KEY']
S3_SECRET = os.environ['S3_SECRET']
S3_UPLOAD_DIRECTORY = '/'

if os.environ.get('PRODUCTION'):
    S3_BUCKET = 'uguruprof'
else:
    S3_BUCKET = 'uguruproftest'
