from app.models import *
from app.database import init_db, db_session
import sys, os, json

AVAILABLE_UNIVERSITIES = ["ucla"]

if len(sys.argv) > 1:
    arg = sys.argv[1]
else:
    arg = ''

def init():
    init_db()
    

def seed_db_local():
    init_db()
    v = Version()
    v.ios = 1.0
    v.android = 1.0
    db_session.add(v)
    db_session.commit()
    from app.static.data.universities_efficient import universities_arr
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
        if university.get("short_name"):
            u.short_name = "ucla"

    db_session.commit()

    # Create campaigns

    from datetime import datetime

    for index in range(0, 10):
        c = Campaign()
        c.time_scheduled = datetime.now()
        time_scheduled = Column(DateTime)
        c.name = "UCLA "  + str(index)
        c.important = True
        c.track_opens = True
        c.track_clicks = True
        c.subject = "UCLA Subject" + str(index)
        c.sender_email = "jasmine@uguru.me"
        c.sender_name = "jasmine@uguru.me"
        c.university = University.query.get(2752)
        c.university_id = 2752


def seed_db():
    init_db()

    v = Version()
    v.ios = 1.0
    v.android = 1.0
    db_session.add(v)
    db_session.commit()
    from app.static.data.universities_efficient import universities_arr
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
        if university.get("short_name"):
            u.short_name = "ucla"

    db_session.commit()

    for university in AVAILABLE_UNIVERSITIES:
        path = "app/static/data/school/" + university + "/"
        path_majors = path+ "majors.json"
        path_courses = path +"courses.json"
        path_majors_id = path+ "majors_id.json"
        path_courses_id = path +"courses_id.json"
        new_courses_arr = []
        new_majors_arr = []
        new_course_file = []
        new_major_file = []
        file = open(path_majors)
        file_2 = open(path_courses)
        
        uni_major_arr = json.load(file)
        uni_course_arr = json.load(file_2)

        
        u = University.query.get(2752)

        for major in uni_major_arr:
            m = Major.admin_create(major)
            new_majors_arr.append(m)
            db_session.add(m)
            u.majors.append(m)

        for course in uni_course_arr:
            
        #     def admin_create(name, _id=None, department_short=None, 
        # department_long=None, course_number=None, full_name=None,\
            c = Course.admin_create(
                    department_short = course["dept_short"],
                    department_long = course["dept_long"],
                    short_name = (course["dept_short"] + " " + course["code"]),
                    course_number = course["code"],
                    full_name = course["title"]
                )
            new_courses_arr.append(c)
            db_session.add(c)
            u.courses.append(c)

        db_session.commit()

        for major in new_majors_arr:
            new_major_file.append({
                    "name": major.name,
                    "id": major.id,
                    "university": "UCLA"
                })

        for course in new_courses_arr:
            new_course_file.append({
                "id": course.id,
                "title": course.full_name,
                "short_name": course.department_short + " " +  course.course_number,
                "long_name": (course.department_long + " " +  course.course_number),
                "university": "UCLA"
            })

        with open(path_majors_id, 'wb') as fp:
            json.dump(new_major_file, fp, sort_keys = True, indent = 4)

        print len(new_major_file), "majors added to " + university

        with open(path_courses_id, 'wb') as fp:
            json.dump(new_course_file, fp, sort_keys = True, indent = 4)

        print len(new_course_file), "courses added to " + university


        #if major has departments
        # if university.get('departments'):
        #     uni_majors = []
        #     for dept in university.get('departments'):
        #         m = Major.admin_create(dept["name"], dept["id"])
        #         uni_majors.append(m)
        #         major_count += 1

        #         if major_count % 10000 == 0:
        #             print major_count, 'majors processed'
        #             print

        #     db_session.add_all(uni_majors)
            # print len(uni_majors), 'majors added to ', university['title']
            # print major_count, 'processed out of', total_majors

    # db_session.commit()

    # print major_count, "major objects created..."
    # for university in universities_arr:
    #     if university.get('courses'):
    #         uni_courses = []
    #         for course in university.get('courses'):
    #             if course.get('dept_short'):
    #                 c = Course.admin_create(str(course["dept_short"] + " " + course["code"]), course["id"])
    #                 course_count += 1
    #                 uni_courses.append(c)

    #                 if course_count % 10000 == 0:
    #                     print course_count, 'courses processed'
    #                     print

    #         db_session.add_all(uni_courses)
            # print len(uni_courses), 'courses added to ', university['title']
            # print course_count, 'processed out of', total_courses
            # print

    # print course_count, "course objects created..."

    # db_session.commit()

    # #save these majors
    # db_session.add_all(session_majors)


    # print len(University.query.all()),'universities added'

    # print len(Major.query.all()),'majors added'

    # print len(Course.query.all()),'courses added'

if arg == 'initialize':
    init()

if arg =="seed":
    seed_db()

if arg == "json_to_batch":
    import json
    relative_file_location = sys.argv[2]
    file = open(relative_file_location)
    batch_arr = json.load(file)
    recipients = []
    count = 0
    batch_1 = Batch()
    batch_2 = Batch()
    batch_1.name = "UCLA Batch 1 [250 Students]"
    batch_2.name = "UCLA Batch 2 [233 Students]"
    db_session.add_all([batch_1, batch_2])
    db_session.commit()
    for student in batch_arr:
        processed_name = student["name"].replace(",","").split(" ")[0]
        if student.get("email"):
            count += 1
            r = Recipient()
            r.first_name = processed_name[1]
            r.last_name = processed_name[0]
            r.email = student["email"]
            r.fb_id = student["fb_id"]
            recipients.append(r)            
            if count > 250:
                r.batch_id = batch_2.id
            else:
                r.batch_id = batch_1.id
    db_session.add_all(recipients)
    db_session.commit()
    print len(recipients), "recipients added"




if arg == 'delete_all_users':
    from app.models import *
    for u in User.query.all():
        db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == u.id))
        db_session.commit()
        db_session.execute(user_major_table.delete(user_major_table.c.user_id == u.id))
        db_session.commit()
        for support in Support.query.all():
            if support.user_id == u.id:
                db_session.delete(support)
                db_session.commit()
        db_session.delete(u)
        db_session.commit()
        print 'all users deleted'

if arg == 'delete_admin_users':
    from app.models import *
    from app.database import db_session
    ADMIN_NAMES = ["Samir Makhani", "Jasmine Mir", "Shun Kurosaki", "Robert Neivert", "Matias Baglieri"]
    for name in ADMIN_NAMES:
        u = User.query.filter_by(name = name).first()
        if not u: 
            continue
        db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == u.id))
        db_session.commit()
        db_session.execute(user_major_table.delete(user_major_table.c.user_id == u.id))
        db_session.commit()
        for support in Support.query.all():
            if support.user_id == u.id:
                db_session.delete(support)
                db_session.commit()
        print u.name, u.email, "deleted"
        db_session.delete(u)
        db_session.commit()