from app.models import *
from app.database import init_db, db_session
import sys


if len(sys.argv) > 1:
    arg = sys.argv[1]
else:
    arg = ''

def initialize():
    init_db()
    print 'db initialized'
    from app.static.data.universities import universities_dict
    from app.static.data.majors_general import majors
    from app.models import University

    for name in universities_dict:
        universities_dict[name]['name'] = name
        University.admin_create(universities_dict[name])

    
    print len(University.query.all()),'universities added'

    for major in majors:
        Major.admin_create(major["name"])

    print len(Major.query.all()),'majors added'

if arg == 'initialize':
    initialize()