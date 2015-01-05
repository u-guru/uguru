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
    from app.static.data.universities_master import universities_arr
    from app.static.data.majors_general import majors
    from app.static.data.courses_efficient import courses
    from app.models import University
    count = 0
    session_majors = []
    majors_dict = []
    for university in universities_arr:
        u = University.admin_create(university, university['id'])

        #if major has departments
        if university.get('departments'):
            uni_majors = []
            for dept in university.get('departments'):
                m = Major.admin_create(dept["name"], dept["id"])
                session_majors.append(m)
                count += 1

                if count % 10000 == 0:
                    print count, 'majors processed'
    
    print count, "major objects created..."

    #save these majors
    db_session.add_all(session_majors)

    db_session.commit()

    print len(University.query.all()),'universities added'


    print len(Major.query.all()),'majors added'

    for course in courses:
        Course.admin_create(course["name"])

    print len(Course.query.all()),'courses added'

if arg == 'initialize':
    initialize()

if arg == 'delete_users':
    for u in User.query.all():
        db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == u.id))
        db_session.commit()
        db_session.execute(user_major_table.delete(user_major_table.c.user_id == u.id))
        db_session.commit()
        db_session.delete(u)
        db_session.commit()
    print 'all users deleted'