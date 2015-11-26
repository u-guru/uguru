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

# def decode_string(string):
#     return string.decode('unicode_escape')

def update_us_news():
    import json
    uni_rank_arr = json.load(open('app/static/data/us_news_2015.json'))
    for uni in uni_rank_arr:
        try:
            university = get_best_matching_universty(uni['name'])
            university.us_news_ranking = uni['rank']
            university.population = uni['population']
            university.is_targetted = True
            db_session.commit()
            print university.id, university.name, university.us_news_ranking, university.population, 'saved'
        except:
            print 'ERROR: could not find', uni['name']

def ios_push(message, device_token):

    send_ios_notification(message, device_token)

# honcho run python manage.py ios_push yo 4d709d41a178d17c9256a509213282f600fb3cebb54830c9aa7a9f74cfc36542
if arg == 'ios_push':
    from app.lib.push_notif import *
    if len(sys.argv) > 3:
        message = sys.argv[2]
        device_token = sys.argv[3]
        send_ios_notification(message, device_token)
    else:
        print "Please pass in message && device token"

if arg == 'windows_push':
    from app.lib.push_notif import *
    if len(sys.argv) > 3:
        message = sys.argv[2]
        device_token = sys.argv[3]
        send_windows_notification(message, device_token)
    else:
        print "Please pass in message && device token"


# honcho run python manage.py android_push yo {{token}}
if arg == 'android_push':
    from app.lib.push_notif import *
    if len(sys.argv) > 3:
        message = sys.argv[2]
        device_token = sys.argv[3]
        send_android_notification(message, device_token)
    else:
        print "Please pass in message && device token"


def update_universities_forbes():
    from app.static.data.universities import universities_dict
    from app.database import db_session
    from app.models import University
    uni_names = universities_dict.keys()
    index = 0
    for uni in uni_names:
        uni_dict = universities_dict[uni]
        if uni_dict.get('forbes_rank') and uni_dict.get('logo_url'):
            forbes_rank = uni_dict.get('forbes_rank')
            logo_url = uni_dict.get('logo_url')
            population = int(uni_dict.get('population').replace(',',''))
            uni_obj = get_best_matching_universty(uni)
            if uni_obj:
                uni_obj.us_news_ranking = int(forbes_rank)
                uni_obj.logo_url = logo_url
                uni_obj.population = population
                index += 1
                db_session.commit()
                print index, 'updated', uni
    print index, 'universities updated with forbes & logo'

def get_best_matching_universty(school):
    from app.models import University
    from fuzzywuzzy import fuzz, process
    previous_university_titles = [university.name for university in University.query.all()]
    matches = []
    for title in previous_university_titles:
        if fuzz.partial_ratio(school.lower(), title.replace('-', ' ').lower()) >= 80:
            matches.append((title, school))
    highest_index = 0
    highest_score = 0
    index = 0
    for match in matches:
        current_match_score = fuzz.ratio(match[0], match[1])
        if current_match_score > highest_score:
            highest_score = current_match_score
            highest_index = index
        index += 1
    if matches or highest_index:
        return University.query.filter_by(name=matches[highest_index][0]).first()
    return None

def init_mailgun_lists():
    from app.lib.mailgun import *
    for u in University.query.all():
        if u.is_targetted and u.population:
            print create_mailing_list(u)



def init_university_dates(name):
    req = urllib2.Request("https://drive.google.com/uc?export=download&id=0By5VIgFdqFHddHdBT1U4YWZ2VkE", None)
    opener = urllib2.build_opener()
    f = opener.open(req)
    universities = simplejson.load(f)
    errors = []
    for info in universities:
        try:
            name = info[info.keys()[2]]
            start_date = info[info.keys()[3]].replace('2015','15').replace('2014', '14').replace('2016', '16')
            end_date = info[info.keys()[4]].replace('2015','15').replace('2014', '14').replace('2016', '16')
            uni_obj = get_best_matching_universty(name)
            start_date_obj = datetime.datetime.strptime(start_date, '%m/%d/%y')
            end_date_obj = datetime.datetime.strptime(end_date, '%m/%d/%y')
            uni_obj.fa15_start = start_date_obj
            uni_obj.fa15_end = end_date_obj
            db_session.commit()
            print uni_obj.id, uni_obj.name, uni_obj.fa15_start, uni_obj.fa15_end
        except:
            errors.append(uni_obj)
            continue



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

def generate_categories_json():
    import json
    pass

def delete_categories():
    import json
    from app.models import Category, Subcategory
    for c in Category.query.all():
        db_session.delete(c)
    for s in Subcategory.query.all():
        db_session.delete(s)
    db_session.commit()

def print_categories():
    import json
    from app.models import Category
    categories = Category.query.all()
    print len(categories), 'found!\n'
    for category in categories:
        print category.name +',', len(category.subcategories), 'skills'
        for subcategory in category.subcategories:
            print '    >>', subcategory.name
        print


def generate_categories_json():
    from app.models import Category
    result_dict = {}
    filename = 'categories.json'
    for category in Category.query.all():
        subcategories = category.subcategories
        category_dict = {
            'id': category.id,
            'num_subcategories':len(subcategories),
            'num_gurus': len(category.gurus.all()),
            'subcategories': [],
            'background_url': category.background_url,
            'icon_url': category.icon_url,
            'is_approved': category.is_approved,
            'is_active': category.is_active,
            'description': category.description,
            'hex_color': category.hex_color
        }
        result_dict[category.name] = category_dict
        for subcategory in subcategories:
            subcategory_info = {
                'id': subcategory.id,
                'num_gurus': len(subcategory.gurus.all()),
                'name': subcategory.name,
                'is_approved': subcategory.is_approved,
                'is_active': subcategory.is_active,
                'icon_url': subcategory.icon_url,
                'description': category.description
            }

            result_dict[category.name]['subcategories'].append(subcategory_info)
    with open('app/static/data/categories.json', 'wb') as fp:
        json.dump(result_dict, fp, sort_keys = True, indent = 4)

def update_categories():
    from app.models import Category, Subcategory
    from app.database import db_session
    categories_dict = json.load(open('app/static/data/categories.json'))
    for key in categories_dict.keys():
        category_id = categories_dict[key]['id']
        category = Category.query.get(category_id)
        category.hex_color = categories_dict[key]['hex_color']
        category.num_subcategories = len(categories_dict[key]['subcategories'])
        category.background_url = categories_dict[key]['background_url']
        category.icon_url = categories_dict[key]['icon_url']
        category.is_approved = True
        # category.is_approved = categories_dict[key]['is_approved']
        # category.is_active = categories_dict[key]['is_active']
        category.is_active = True
        category.num_gurus = len(category.gurus.all())
        category.description = categories_dict[key]['description']

        print category.id, category.name
        for subcategory in categories_dict[key]['subcategories']:
            subcategory_id = subcategory['id']
            subcategory = Subcategory.query.get(subcategory_id)
            print '   >>', subcategory.id, subcategory.name
        print
    db_session.commit()
    generate_categories_json()
    print 'categories successfully updated && json is generated'



def generate_init_categories():
    from app.models import Category, Subcategory
    categories_dict = json.load(open('app/static/data/categories.json'))
    result_dict = {}
    for key in categories_dict.keys():
        result_dict[key] = []
        for subcategory in categories_dict[key]['subcategories']:
            result_dict[key].append(subcategory['name'])
            print subcategory['name']

    with open('app/static/data/categories_init.json', 'wb') as fp:
        json.dump(result_dict, fp, sort_keys = True, indent = 4)
    print 'categories init file generated'


def init_categories():
    import json
    from app.models import Category, Subcategory
    categories_dict = json.load(open('app/static/data/categories_init.json'))
    categories = categories_dict.keys()
    for category_name in categories:
        print 'creating', category_name
        category = Category.create(category_name)

        for subcategory_name in categories_dict[category_name]:
            print '  >> creating', subcategory_name
            Subcategory.create(subcategory_name, category.id)
        print
    print



if arg in ['generate_init_categories', '-gic']:
    generate_init_categories()

if arg == 'initialize':
    init()

if arg in ['init_categories', '-ic']:
    init_categories()

if arg in ['print_categories', '-pc']:
    print_categories()

if arg in ['delete_categories', '-dc']:
    delete_categories()

if arg in ['update_categories', '-uc']:
    update_categories()

if arg in ['generate_categories_json', '-gc']:
    generate_categories_json()

if arg =='update_us_news':
    update_us_news()

if arg =='update_forbes':
    update_universities_forbes()

if arg =='init_mailgun':
    init_mailgun_lists()

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


if arg == 'guru_alg':
    from app.tests.test_guru_algorithm import run_algo
    run_algo()

if arg == 'delete_all_users':
    from app.models import *

    for m in Major.query.all():
        if m.contributed_user_id:
            m.contributed_user_id = None

    for m in Message.query.all():
        m.receiver_id = None
        m.sender_id = None

    for u in User.query.all():

        db_session.execute(guru_courses_table.delete(guru_courses_table.c.user_id == u.id))
        db_session.commit()
        db_session.execute(user_major_table.delete(user_major_table.c.user_id == u.id))
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

if arg == 'init_stats':
    s = Stats()
    from datetime import datetime
    s.last_updated = datetime.now()
    s.total_courses = 0
    s.total_universities = 0
    s.total_users = 0
    s.total_gurus = 0
    s.total_depts = 0
    s.total_popular_courses = 0
    s.gurus_24h = 0
    s.users_24h = 0
    s.visitors_24 = 0
    db_session.add(s)
    db_session.commit()
    print 'stats initialized'


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

if arg == 'count':
    import json
    f = open('temp.json')
    d = json.load(f)
    results = {}
    for school in d.keys():
        if d[school].get('popular_courses') and d[school].get('logo') and d[school].get('school_color_one')\
        and d[school].get('school_color_two'):
            d[school]['local_name'] = school
            results[school] = d[school]
    print len(results.keys()), 'schools ready'
    with open('app/lib/university_data.json', 'wb') as fp:
        json.dump(results, fp, sort_keys = True, indent = 4)

if arg == 'update':
    v = Version.query.get(1)

    latest_version = v.latest_ios

    if not latest_version:
        v.latest_ios = "1"
        db_session.commit()


    else:

        current_version = float(latest_version)

        current_version += 1

        v.latest_ios = str(current_version)
        # latest_version = v.latest_ios
        db_session.commit()


    if os.environ.get('PRODUCTION'):
        env = 'production'
    else:
        env = 'local'
    print v.latest_ios, 'updated to', env

if arg == 'init_admin':
    from hashlib import md5
    from app.models import User
    admin_accounts = [('jason@uguru.me', 'Jason Huang'), ('gabrielle@uguru.me','Gabrielle Wee'), ('samir@uguru.me', 'Samir Makhani'), ('jeselle@uguru.me', 'Jeselle Obina')]
    u = University.query.get(2307)

    len_universities = len(University.query.all())

    for admin_account_tuple in admin_accounts:
        account_email = admin_account_tuple[0]
        account_name = admin_account_tuple[1]
        user = User.query.filter_by(email=account_email.lower()).first()
        print 'processing %s' % account_email
        if user:
            user.university_id = u.id
            user.is_admin = True
            user.name = account_name
            user.password = md5('launchuguru123').hexdigest()
            db_session.commit()
            print "Account for %s successfully updated" % user.email
        else:
            user = User(name=account_name, email=account_email, password=md5('launchuguru123').hexdigest())
            user.university_id = u.id
            user.is_admin = True
            db_session.commit()
            print "Account for %s successfully created" % user.email

if arg == 'parse_uni':
    from app.lib.wikipedia import *

    university_names = [university.name for university in University.query.all()]
    results = scrape_all_universities(university_names)

if arg == 'parse_uni_updated':
    import json
    wikipedia_data = open('wikipedia_university_data_updated.json')
    wiki_json = json.load(wikipedia_data)
    rmp_schools = []
    result_schools = []
    from app.models import *
    from app.lib.all_schools_updated import school_dict
    for school in wiki_json:


    #import the id
        if school.get('images') and len(school['images']['all']) > 0:
            db_university = University.query.get(int(school["id"]))
            result_schools.append({
                    "id": school['id'],
                    "logo": school['images']['all'][0],
                    "title": school["title"],
                    "city": db_university.city,
                    "state": db_university.state,
                    "variations": school["variations"]
                })
        else:
            print "no images found for", school['title']


    with open('web_university4.json', 'wb') as fp:
        json.dump(result_schools, fp, indent = 4)

if arg =='init_test_devices':
    from app.models import *
    from app.database import *
    for u in User.query.all():
        if u.devices and u.is_admin:
            for device in u.devices:
                device.is_test_device = True
                db_session.commit()
    print 'test devices initiated'

if arg == 'print_skills':
    categories_dict = {}
    for skill in Skill.query.all():
        if skill.category in categories_dict:
            categories_dict[skill.category] += [skill.name]
        else:
            categories_dict[skill.category] = [skill.name]

    for key in categories_dict:
        print "#############"
        print key
        print "#############"


if arg == 'remove_skill':
    from app.models import guru_skill_table
    for skill in Skill.query.all():
        for u in User.query.all():
            if skill in u.guru_skills:
                db_session.execute(guru_skill_table.delete(guru_skill_table.c.user_id == u.id and guru_courses_table.c.skill_id == c.id))

    for skill in Skill.query.all():
        db_session.delete(skill)
        db_session.commit()


if arg =='init_skills':

    {
        'Photography':['Professional', 'Outdoor', 'Headshot'],
        'Freelancing':['Resume Editing','Interview Prep', 'Build a Website'],
        'Bakery': ['Brownies', 'Flan', 'Pie'],
        'Household': ['Laundry', 'Build Furniture (Ikea)', 'I have a Vacuum'],
        'Tech / IT': ['']
    }

    for skill_string, category_string in skills:
        skill = Skill()
        skill.is_popular = True
        skill.name = skill_string
        skill.admin_approved = True
        skill.category = category_string
        db_session.add(skill)
        db_session.commit()


    print len(Skill.query.all()),  'all skills successfully added'

if arg == 'init_professions':
    from app.models import *
    from app.database  import *
    from datetime import datetime

    professions = ['Software Engineer', 'Doctor', 'Human Resources', 'Neurosurgeon', 'Mechnical Engineer', 'Mathematician',
    'I dont know', 'Chemist', 'Physicist', 'Academic Researcher'];

    for profession in professions:
        tag = Tag()
        tag.is_profession = True
        tag.time_created = datetime.now()
        tag.name = profession
        tag.admin_approved = True
        db_session.add(tag)
        db_session.commit()

    print len(professions),  'all skills successfully added'

if arg == 'init_languages':
    from datetime import datetime
    languages_arr = json.load(open('scripts/languages/languages.json'))
    for lang_str in languages_arr:
        language = Language()
        language.name = lang_str
        language.time_created = datetime.now()
        language.time_updated = datetime.now()
        db_session.add(language)
        db_session.commit()

    print len(Language.query.all()), 'created'

if arg == 'update_targetted':
    from app.models import University
    from app.database import db_session
    recent_month = datetime(year=2015, month=7, day =24)
    for u in University.query.filter_by(is_targetted=True).all():
        if u.fa15_start and u.fa15_start >= recent_month and u.us_news_ranking > 0 and u.population > 1999:
            u.is_targetted = True
        else:
            u.is_targetted = False
        print u.id, u.name, 'saved'
        db_session.commit()
    print len(University.query.filter_by(is_targetted=True).all())

def getLongestAcronym(arr):
    sorted_arr = sorted(arr, key=lambda k:len(k), reverse=True)
    return sorted_arr[0]
def findBestMatch(uni_name, wiki_names):
    uni_name_formatted = uni_name.replace('-', ' ').replace(',', ' ').replace('  ', ' ').lower()
    current_best_ratio = 0
    current_best_value = ''
    for name in wiki_names:
        wiki_name_formatted = name.replace(',', ' ').replace('-', ' ').replace('  ', ' ').lower()
        ratio = fuzz.ratio(uni_name_formatted, wiki_name_formatted)
        if ratio > current_best_ratio:
            current_best_ratio = ratio
            current_best_value = name
    return current_best_value, current_best_ratio

if arg == 'short_name':
    import json
    from fuzzywuzzy import fuzz, process
    previous_university_titles = [university.name for university in University.query.all()]
    college_dict = json.load(open('app/static/data/college_short_names.json'))
    wiki_names = college_dict.keys()
    from app.models import University
    universities = University.query.all()
    from app.database import db_session
    universities = [uni for uni in universities if uni.us_news_ranking and uni.us_news_ranking < 220]
    count = 0
    matches = 0
    reprocess = []
    for uni in universities:
        # if len(uni.name) > 22:
        count += 1
        uni_name_formatted = uni.name.replace('-', ' ').replace(',', ' ').lower()
        current_best, ratio_num =  findBestMatch(uni.name, wiki_names)
        if ratio_num >= 90 and abs(len(uni_name_formatted) - len(current_best)) < 4:
            matches += 1
            new_short_name = getLongestAcronym(college_dict[current_best])
            # print new_short_name
            print "VALUE:", ratio_num
            print uni.name, '---', new_short_name
            uni.short_name = new_short_name
            if new_short_name.lower() not in uni.variations:
                uni.variations = uni.variations +' ' + new_short_name.lower()
            db_session.commit()
            # else:
            #     print "VALUE:", ratio_num
            #     print uni.name, '---', current_best
            #     print
            #     reprocess.append(uni.name)

    print count, matches
    print len(reprocess), 'left to go'


if arg == 'save_languages':
    languages_arr = []
    for language in Language.query.all():
        languages_arr.append({'name': language.name, 'id': language.id})

    with open('scripts/languages/languages_id.json', 'wb') as fp:
        json.dump(languages_arr, fp)
    print len(languages_arr), 'saved'

if arg =='import':
    from app.models import *
    from app.database import db_session
    import json, operator
    from datetime import datetime
    from collections import Counter
    from dateutil import parser
    user_arr = json.load(open('uguru_old_db3.json'))

    university = University.query.get(2307)

    user_with_skills = [user for user in user_arr if user.get('skills')]


    courses = university.courses + university.popular_courses

    course_names = [course.name for course in courses if course.name]
    course_names_mapped = [course for course in courses if course.name]

    course_short_names = [course.short_name for course in courses if course.short_name]
    course_short_names_mapped = [course for course in courses if course.short_name]


    course_full_names = [course.full_name for course in courses if course.full_name]
    course_full_names_mapped = [course for course in courses if course.full_name]

    print 'processing %s gurus' % len(user_with_skills)
    error_users = []
    index = 0
    for user in user_with_skills:
        db_user = User.query.filter_by(email=user.get('email')).first()
        if not db_user:
            error_users.append(user)
            continue
        if not db_user.guru_courses:
            user_skills = [skill for skill in user.get('skills') if skill.get('name')]
            for skill in user_skills:
                skill_map = skill['name'].replace('.', ' ').upper()
                if skill_map in course_names:

                    skill_index = course_names.index(skill_map)
                    course = course_names_mapped[skill_index]
                    course.is_popular = True
                    db_user.guru_courses.append(course)

                elif skill_map in course_short_names:

                    skill_index = course_short_names.index(skill_map)
                    course = course_short_names_mapped[skill_index]
                    course.is_popular = True
                    db_user.guru_courses.append(course)

                elif skill_map in course_full_names:

                    skill_index = course_full_names.index(skill_map)
                    course = course_full_names_mapped[skill_index]
                    course.is_popular = True
                    db_user.guru_courses.append(course)

        db_user.phone_number = user.get('phone_number')
        db_user.text_notifications = user.get('text_notifications')
        db_user.email_notifications = user.get('email_notifications')
        db_user.guru_introduction = user.get('guru_introduction')
        db_user.year = user.get('year')
        db_user.major = user.get('major')

        # if user has conversations and is a guru
        if user.get('conversations') and user.get('skills'):
            all_conversations = user.get('conversations')
            for convo in all_conversations:
                convo_guru_id = convo.get('guru_id')
                message_convos = convo.get('messages')
                if message_convos and user.get('id') == convo_guru_id:
                    first_message = message_convos[0]
                    if not first_message.get('sender_email') or not first_message.get('receiver_email'):
                        continue
                    if first_message.get('sender_email') == user.get('email'):
                        student_email = first_message.get('receiver_email')
                    else:
                        student_email = first_message.get('sender_email')

                    student = User.query.filter_by(email=student_email).first()
                    if not student:
                        continue

                    if db_user.guru_relationships:
                        student_ids_relationships = [r.student.id for r in db_user.guru_relationships]
                        # already relationship exists
                        if student.id in student_ids_relationships:
                            continue


                    r = Relationship()
                    r.student_id = student.id
                    r.guru_id = db_user.id
                    db_session.add(r)
                    db_session.commit()

                    ## add messages
                    for message in message_convos:
                        if message.get('sender_email') == user.get('email'):
                            message_sender_id = db_user.id
                            message_receiver_id = student.id
                        else:
                            message_sender_id = student.id
                            message_receiver_id = db_user.id

                        message_contents = message.get('contents')
                        message_type = 0
                        message_time_created = parser.parse(message.get('write_time'))

                        m = Message()
                        m.sender_id = message_sender_id
                        m.receiver_id = message_receiver_id
                        m.contents = message_contents
                        m._type = message_type
                        m.time_created = message_time_created
                        m.relationship_id = r.id
                        db_session.add(m)
                        db_session.commit()



        if user.get('experiences') and not db_user.guru_experiences:
            for exp_key in user.get('experiences').keys():

                if user['experiences'][exp_key]:

                    experience = Experience()
                    experience.university_id = 2307
                    experience.description = ''
                    if exp_key == 'slc_tutor':
                        experience.name = 'SLC Tutor'
                    elif exp_key == 'res_tutor':
                        experience.name = 'Res Hall Tutor'
                    elif exp_key == 'ta_tutor':
                        experience.name = 'Teaching Assistant'
                    elif exp_key == 'hkn_tutor':
                        experience.name = 'HKN Tutor'
                    elif exp_key == 'hkn_tutor':
                        experience.name = 'Lab Assistant'
                    else:
                        continue
                    experience.years = 1
                    experience.last_updated = datetime.now()
                    experience.time_created = datetime.now()
                    db_session.add(experience)
                    db_session.commit()
                    db_user.guru_experiences.append(experience)
                    db_session.commit()



        if db_user.student_ratings and user.get('guru_ratings'):
            if db_user.guru_courses:
                for db_rating in db_user.student_ratings + db_user.guru_ratings:
                    for rating in user.get('guru_ratings'):
                        if rating.get('tutor_rating_description') == db_rating.guru_rating_description:
                            db_user.is_a_guru = True
                            db_rating.guru_id = db_user.id
                            db_rating.student_id = None
                            db_rating.guru_rating = rating.get('tutor_rating')
                            db_rating.guru_rating_description = rating.get('tutor_rating_description')
                            db_rating.student_rating = rating.get('student_rating')
                            db_rating.student_rating_description = rating.get('student_rating_description')

                            student = User.query.filter_by(email=rating.get('student_email')).first()
                            if student:
                                db_rating.student_id = student.id
                            db_session.commit()

        index += 1
        if (index > 0 and index % 50 == 0):
            print 'PROGRESS: %s/%s' % (index, len(user_with_skills))

    with open('error_users.json', 'wb') as fp:
        json.dump(error_users, fp, indent = 4)
    print len(error_users), 'error users'

def getStripeStudentCharges():
    import stripe
    stripe.api_key = "sk_live_j7GdOxeWhZS1pVXCvBqeoBXI"
    charges = stripe.Charge.all(limit=100)
    return charges

def getStripeCustomers():
    import stripe
    stripe.api_key = "sk_live_j7GdOxeWhZS1pVXCvBqeoBXI"
    customers = stripe.Customer.all()
    return customers

def updateRecipientCardDetails(recipient_id):
    import stripe
    from datetime import datetime
    stripe.api_key = "sk_live_j7GdOxeWhZS1pVXCvBqeoBXI"
    recipient = stripe.Recipient.retrieve(recipient_id)
    from pprint import pprint
    email = recipient.email
    result_cards = []
    if recipient.cards["data"]:
        for _card in recipient.cards["data"]:
            card_type = _card['type']
            # card_country = _card['country']
            card_exp_month = _card['exp_month']
            card_exp_year = _card['exp_year']
            card_id = _card['id']
            card_last4  = _card['last4']
            card_is_credit = _card['funding']
            card_created = datetime.fromtimestamp(int(recipient.created))
            print "student's  (email:%s) %s %s card: %s expires %s/%s" \
            % (email, card_type, card_is_credit, card_id, card_exp_month, card_exp_year)
            result_cards.append({
                'type': card_type,
                'last4': card_last4,
                'is_credit': card_is_credit,
                'id': card_id,
                'card_exp_year': card_exp_year,
                'card_exp_month': card_exp_month,
                # 'card_country': card_country,
                'recipient_email': email,
                'time_created': card_created,
                'stripe_recipient_id':recipient_id
                })
            return result_cards
    if recipient.active_account and not recipient.cards['data']:
        return {
            'bank_name':recipient.active_account['bank_name'],
            'country':recipient.active_account['country'],
            'currency':recipient.active_account['currency'],
            'active': not recipient.active_account['disabled'],
            'stripe_bank_id': recipient.active_account['id'],
            'last4': recipient.active_account['last4'],
            'bank_routing_number': recipient.active_account['routing_number'],
            'bank_created': datetime.fromtimestamp(int(recipient.created)),
            'recipient_email': recipient.email,
            'stripe_recipient_id': recipient.id
        }

def updateCustomerCardDetails(customer_id):
    import stripe
    from datetime import datetime
    stripe.api_key = "sk_live_j7GdOxeWhZS1pVXCvBqeoBXI"
    customer = stripe.Customer.retrieve(customer_id)
    if not customer or not customer.email:
        return
    email = customer.email
    result_cards = []
    for _card in customer.cards["data"]:
        card_type = _card['type']
        card_country = _card['country']
        card_exp_month = _card['exp_month']
        card_exp_year = _card['exp_year']
        card_id = _card['id']
        card_last4  = _card['last4']
        card_is_credit = _card['funding']
        card_created = datetime.fromtimestamp(int(customer.created))
        print "student's  (email:%s) %s %s card: %s expires %s/%s" \
        % (email, card_type, card_is_credit, card_id, card_exp_month, card_exp_year)
        result_cards.append({
            'type': card_type,
            'last4': card_last4,
            'is_credit': card_is_credit,
            'id': card_id,
            'card_exp_year': card_exp_year,
            'card_exp_month': card_exp_month,
            'card_country': card_country,
            'customer_email': email,
            'time_created': card_created,
            'customer_id':customer_id
            })
        return result_cards

def getCustomerCharges(customer_id):
    pass

if arg =='link_transactions':
    import stripe
    from datetime import datetime
    stripe.api_key = "sk_live_j7GdOxeWhZS1pVXCvBqeoBXI"
    from app.database import db_session
    for card in Card.query.all()[0:100]:
        try:
            if card.stripe_customer_id and card.user and card.user_id:
                charges = stripe.Charge.all(customer=card.stripe_customer_id, limit=100)
                for charge in charges.data:
                    amount = charge.amount
                    _id = charge.id
                    description = charge.description
                    status = charge.status
                    card_id = charge.source.id
                    refunded = charge.refunded
                    was_paid = charge.paid
                    customer_id = charge.customer
                    time_charged = datetime.fromtimestamp(int(charge.created))
                    print "%s was charged $%s" % (card.user.name.split(' ')[0], amount/100.0)

                    for _card in card.user.cards:
                        if _card.stripe_card_id == card_id:
                            user_card_id = _card.id
                            break

                    def createChargeTransaction(card_id, time_created, student_amount, status \
                        ,charge_id, user_id, description, refunded):
                        transaction = Transaction()
                        transaction.is_session = True
                        transaction.card_id = card_id
                        transaction.time_created = time_created
                        transaction.student_amount = student_amount
                        transaction.stripe_amount = student_amount
                        transaction.charge_status = status
                        transaction.refunded = refunded
                        transaction.charge_id = charge_id
                        transaction.student_id = user_id
                        transaction.description = description
                        transaction._type = 0
                        return transaction

                    transaction = createChargeTransaction(user_card_id, time_charged, amount, \
                        status, _id, card.user.id, description, refunded)
                    db_session.add(transaction)
                    db_session.commit()

            if card.stripe_recipient_id and card.user and card.user_id:
                transfers = stripe.Transfer.all(recipient=card.stripe_recipient_id, limit=100)
                for transfer in transfers.data:
                    from pprint import pprint
                    pprint(transfer)
                    print "%s was transferred $%s" % (card.user.name.split(' ')[0], transfer.amount / 100.0)

                    amount = transfer.amount
                    _id = transfer.id
                    description = transfer.description
                    status = transfer.status
                    if transfer.type == "card":
                        card_id = transfer.card.id
                    if transfer.type == "bank_account":
                        card_id = transfer.bank_account.id
                    if not card_id:
                        raise
                    recipient_id = transfer.recipient
                    time_charged = datetime.fromtimestamp(int(transfer.created))
                    print "%s was charged $%s" % (card.user.name.split(' ')[0], amount/100.0)

                    for _card in card.user.cards:
                        if _card.stripe_card_id == card_id:
                            user_card_id = _card.id
                            break

                    def createTransferTransaction(card_id, time_created, amount, status \
                        ,recipient_id, user, description):
                        transaction = Transaction()
                        transaction.card_id = card_id
                        transaction.time_created = time_created
                        transaction.guru_amount = amount
                        transaction.stripe_amount = amount
                        transaction.transfer_status = status
                        transaction.transfer_id = recipient_id
                        transaction.guru_id = user.id
                        transaction.balance_before = user.balance
                        transaction.balance_after = user.balance + amount
                        transaction.description = description
                        transaction._type = 4
                        return transaction

                    transaction = createTransferTransaction(user_card_id, time_charged, amount,\
                        status, recipient_id, card.user, description)
                    db_session.add(transaction)
                    db_session.commit()

        except stripe.error.InvalidRequestError, e:
            card.user_id = None
            db_session.delete(card)
            db_session.commit()

if arg =='link_payments':
    import json, sys
    from pprint import pprint
    import stripe
    payment_arr = json.load(open('old_payment_data.json'))
    cashout_ids = []
    payment_ids = []
    session_arr = []
    count = 0

    #1. Create cards
    #2. Create bank cards
    #3. Create a session
    #4. Get transactions && create them
    #
    for card in Card.query.all():
        if card.stripe_customer_id and (card.user or card.user_id):
            student = card.user
            student_card_ids = [__card.card_last4 for __card in student.cards]
            for _card in student.cards:
                if _card.stripe_customer_id:
                    try:
                        result_cards = updateCustomerCardDetails(_card.stripe_customer_id)
                    except:
                        continue
                    for found_card in result_cards:
                        if found_card['last4'] in student_card_ids:
                            index = student_card_ids.index(found_card['last4'])
                            student_card = student.cards[index]
                        else:
                            from app.models import Card
                            student_card = Card()
                            print 'new card being created'
                            student_card.user_id = student.id
                            db_session.add(student_card)

                        student_card.is_payment_card = True
                        student_card.stripe_customer_id = found_card['customer_id']
                        student_card.card_last4 = found_card['last4']
                        student_card.stripe_card_id = found_card['id']
                        student_card.card_type = found_card['type']
                        student_card.active = True
                        student_card.country = found_card['card_country']
                        student_card.time_added = found_card['time_created']
                        student_card.customer_email = found_card['customer_email']
                        student_card.funding = found_card['is_credit']
                        student_card.exp_month = int(found_card['card_exp_month'])
                        student_card.exp_year = int(found_card['card_exp_year'])

                        db_session.commit()
        if card.stripe_recipient_id and (card.user or card.user_id):
            guru = card.user
            guru_card_ids = [__card.card_last4 for __card in guru.cards]
            for _card in guru.cards:
                if _card.stripe_recipient_id:
                    try:
                        result_bank_cards = updateRecipientCardDetails(_card.stripe_recipient_id)




                        if type(result_bank_cards) == list:
                            for found_card in result_bank_cards:
                                if found_card['last4'] in guru_card_ids:
                                    index = guru_card_ids.index(found_card['last4'])
                                    guru_card = guru.cards[index]
                                else:
                                    from app.models import Card
                                    guru_card = Card()
                                    print 'new card being created'
                                    guru_card.user_id = guru.id
                                    db_session.add(guru_card)
                                guru_card.is_transfer_card = True
                                guru_card.stripe_recipient_id = found_card['stripe_recipient_id']
                                guru_card.card_last4 = found_card['last4']
                                guru_card.stripe_card_id = found_card['id']
                                guru_card.card_type = found_card['type']
                                guru_card.active = True
                                guru_card.time_added = found_card['time_created']
                                guru_card.recipient_email = found_card['recipient_email']
                                guru_card.funding = found_card['is_credit']
                                guru_card.exp_month = int(found_card['card_exp_month'])
                                guru_card.exp_year = int(found_card['card_exp_year'])

                        try:
                            if type(result_bank_cards) == dict:
                                found_card = result_bank_cards
                                if found_card['last4'] in guru_card_ids:
                                    index = guru_card_ids.index(found_card['last4'])
                                    guru_card = guru.cards[index]
                                else:
                                    from app.models import Card
                                    guru_card = Card()
                                    print 'new card being created'
                                    guru_card.user_id = guru.id
                                    db_session.add(guru_card)
                                guru_card.is_bank_account = True
                                guru_card.stripe_recipient_id = found_card['stripe_recipient_id']
                                guru_card.card_last4 = found_card['last4']
                                guru_card.stripe_bank_id = found_card['stripe_bank_id']
                                guru_card.bank_currency = found_card['currency']
                                guru_card.active = found_card['active']
                                # guru_card.country = found_card['card_country']
                                guru_card.bank_name = found_card['bank_name']
                                guru_card.brank_routing_number = found_card['bank_routing_number']
                                guru_card.recipient_email = found_card['recipient_email'],
                                guru_card.time_added = found_card['bank_created']

                            db_session.commit()

                        except:
                            raise

                    except stripe.error.InvalidRequestError, e:
                        continue
                    except Exception, e:
                        raise

    # for payment in payment_arr:
    #     student_email = payment.get('student_email')
        # if student_email and student_email not in student_email_set:
        #     student_email_set.append(student_email)
        #     student = User.query.filter_by(email=student_email).first()
        #     if student and student.name and student.cards:
        #         # print '%s has %s cards' % (student.name, len(student.cards))

        #         student_card_ids = [card.card_last4 for card in student.cards]


        # guru_email = payment.get('tutor_email')
        # if guru_email and guru_email not in guru_email_set:
        #         guru_email_set.append(guru_email)
        #         guru = User.query.filter_by(email=guru_email).first()
        #         for card in guru.cards:
        #             if card.stripe_recipient_id:
        #                 result_bank_cards = updateRecipientCardDetails(card.stripe_recipient_id)




if arg =='link_courses':
    import json
    def getPopularCourses(uni_id):
        university = University.query.get(uni_id)
        university_courses = university.courses
        popular_courses = [course for course in university_courses if course.is_popular]
        print '%s popular courses found for %s' % (len(popular_courses), university.name)
        return popular_courses

    # num w/o full name
    def processPopularCourses(courses):
        popular_courses_with_both = [course for course in courses if course.short_name and course.full_name]
        popular_courses_with_short_only = [course for course in courses if course.short_name and not course.full_name]
        return popular_courses_with_short_only

    # links && returns success rate
    # prints success rate
    def getUniversityCourseDuplicates(uni_id):
        from collections import Counter
        course_name_arr = []
        for course in University.query.get(uni_id).courses:
            course_name_arr.append(course.short_name.upper())
        course_dist = Counter(course_name_arr)
        duplicate_names = []
        for key in course_dist:
            if course_dist[key] >= 2:
                duplicate_names.append(key)
        return duplicate_names

    def repair_courses(uni_id):

        popular_courses = getPopularCourses(uni_id)
        popular_short_name_only = processPopularCourses(popular_courses)
        duplicate_course_names = getUniversityCourseDuplicates(uni_id)

        found = 0
        from app.database import db_session
        university_courses = University.query.get(2307).courses
        for course in popular_short_name_only:
            same_courses = [_course for _course in university_courses if _course.short_name.upper() == course.short_name.upper()]
            for same_course in same_courses:
                if same_course.short_name and same_course.full_name and not same_course.is_popular and same_course.id != course.id:
                    found += 1
                    course.full_name = same_course.full_name
                    print course.short_name, 'updated with full name', course.full_name
                    db_session.commit()
        print "%s popular courses repaired" % found


    repair_courses(2307)



    ## the goal is to link the titles with popular courses

if arg =='migrate':

    from app.models import *
    import json
    from datetime import datetime
    user_arr = json.load(open('uguru_old_db.json'))

    for user in user_arr:

        try:

            if not user['email']:
                continue

            if len(user['email']) < 5:
                continue

            if 'removed' in user['email'].lower():
                continue

            u = User.query.filter_by(email=user['email']).first()
            if not u:
                u = User(user['email'])
                db_session.add(u)
                db_session.commit()
            u.password = user['password']
            u.phone_number =  user['phone_number']
            u.time_created = user['time_created']
            u.email_notifications = user['email_notifications']
            u.text_notifications = user['text_notifications']
            u.profile_url = user['profile_url']
            u.guru_introduction = user['guru_introduction']
            u.balance = user['balance']
            u.ta_tutor = user['ta_tutor']
            u.hkn_tutor = user['hkn_tutor']
            u.slc_tutor = user['slc_tutor']
            u.previous_tutor = user['previous_tutor']
            u.major = user['major']
            u.year = user['year']
            u.res_tutor = user['res_tutor']
            u.la_tutor = user['la_tutor']
            u.last_active = user['last_active']
            u.total_earned = user['total_earned']
            u.approved_by_admin = user['approved_by_admin']
            u.high_school_tutor = user['high_school_tutor']
            u.credits = user['credit']
            u.university_id = 2307




            if user.get('customer_id'):

                c = Card()
                c.stripe_customer_id = user['customer_id']
                c.card_last4 = user['customer_last4']
                c.user_id = u.id
                db_session.add(c)
                u.cards.append(c)
                db_session.commit()

            if user.get('recipient_id'):

                c = Card()
                c.stripe_recipient_id = user['recipient_id']
                c.user_id = u.id
                db_session.add(c)
                u.cards.append(c)
                db_session.commit()

            for rating in user['student_ratings']:

                r = Rating()
                r.student_rating = rating['student_rating']
                r.guru_rating = rating['tutor_rating']
                r.student_rating = rating['student_rating']
                r.guru_rating_description = rating['tutor_rating_description']
                r.student_rating_description = rating['student_rating_description']
                u.student_ratings.append(r)
                db_session.add(r)
                db_session.commit()



            for rating in user['guru_ratings']:

                r = Rating()
                r.student_rating = rating['student_rating']
                r.guru_rating = rating['tutor_rating']
                r.student_rating = rating['student_rating']
                r.guru_rating_description = rating['tutor_rating_description']
                r.student_rating_description = rating['student_rating_description']
                u.student_ratings.append(r)
                db_session.add(r)
                db_session.commit()
        except:
            print "error with", user['email']
            db_session.rollback()
            continue

            # 'skills': get_user_skills(user),
            # 'conversations': get_user_conversations(user),
            # 'payments': get_user_payments(user),
