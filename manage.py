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
    from app.static.data.universities_efficient import universities_dict as universities_dict_efficient
    from app.static.data.majors_general import majors
    from app.static.data.courses_efficient import courses
    from app.models import University

    for name in universities_dict:
        universities_dict[name]['name'] = name
        u = University.admin_create(universities_dict[name], universities_dict_efficient[name]['id'])
    
    print len(University.query.all()),'universities added'

    for major in majors:
        Major.admin_create(major["name"])

    print len(Major.query.all()),'majors added'

    for course in courses:
        Course.admin_create(course["name"])

    print len(Course.query.all()),'courses added'

if arg == 'initialize':
    initialize()