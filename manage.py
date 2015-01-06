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
    major_count = 0
    course_count = 0
    session_majors = []
    majors_dict = []
    total_majors = 200000
    total_courses = 73000
    for university in universities_arr:
        u = University.admin_create(university, university['id'])

        #if major has departments
        if university.get('departments'):
            uni_majors = []
            for dept in university.get('departments'):
                m = Major.admin_create(dept["name"], dept["id"])
                uni_majors.append(m)
                major_count += 1

                if major_count % 10000 == 0:
                    print major_count, 'majors processed'
                    print

            db_session.add_all(uni_majors)
            # print len(uni_majors), 'majors added to ', university['title']
            # print major_count, 'processed out of', total_majors

        if university.get('courses'):
            uni_courses = []
            for course in university.get('courses'):
                if course.get('dept_short'):
                    c = Course.admin_create(course["dept_short"] + " " + course["code"], course["id"])
                    course_count += 1
                    uni_courses.append(c)

                    if course_count % 10000 == 0:
                        print course_count, 'courses processed'
                        print

            db_session.add_all(uni_courses)
            # print len(uni_courses), 'courses added to ', university['title']
            # print course_count, 'processed out of', total_courses
            # print

    
    print major_count, "major objects created..."
    print course_count, "course objects created..."

    db_session.commit()

    # #save these majors
    # db_session.add_all(session_majors)


    print len(University.query.all()),'universities added'

    print len(Major.query.all()),'majors added'

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
    



