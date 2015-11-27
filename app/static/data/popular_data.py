from ben import getAllUsNewsUniversities, getPopularCourses

from pprint import pprint
results = {}



def generateTargettedJsonFile():
    from data_utils import *
    prepared, unprepared_dict = getPreparedUniversities(getAllUsNewsUniversities())

    print 'generating a targetted json file for %s universities' % len(prepared)
    result_arr = prepared

    from time import sleep
    from pprint import pprint
    for uni in result_arr:
        popular_courses = sorted(getPopularCourses(uni['id']), key= lambda k:k['times_mentioned'], reverse=True)

        diversified_depts = []
        diversified_courses = []
        for course in popular_courses:
            if len(diversified_courses) == 20:
                break
            dept = course['short_name'].split(' ')[0]
            if not dept in diversified_depts:
                diversified_depts.append(dept)
                diversified_courses.append(course)
        uni['popular_courses'] = [course['short_name'] for course in diversified_courses if course.get('short_name')]
        uni['rank'] = int(uni['us_news_ranking'])
        uni.pop('us_news_ranking')
        if len(popular_courses) != len(uni['popular_courses']):
            print 'ERROR, look further into %s' % uni['name']
        print "%s diverse courses retrieved for %s" % (len(uni['popular_courses']), uni['name'])
        sleep(0.5)
    saveObjToJson(result_arr, 'fa15_targetted_new')

def getPreparedUniversities(arr):
    image_fields = ['logo_url', 'seal_url', 'forbes_url']
    unprepared = []
    unprepared_dict = {}
    prepared = []
    prepared_fields = ['name', 'num_popular_courses', 'latitude', 'longitude'\
    ,'city', 'state', 'banner_url', 'num_depts']

    for uni in arr:
        # check if image exists
        broken_trust = False
        if not uni['logo_url'] and not uni['seal_url'] and not uni['forbes_url']:
            unprepared.append(uni)
            continue
        # check if field is missing
        missing_fields = []
        for field in prepared_fields:
            if not uni[field]:
                missing_fields.append(field)
        if len(missing_fields):
            unprepared_dict[str(uni['id'])] = uni
            unprepared_dict[str(uni['id'])]['missing_fields'] = missing_fields
            continue
        prepared.append(uni)

    return prepared, unprepared_dict

def getPreparedUniversitiesObj(university_obj_arr):
    popular_universities = []
    for u in university_obj_arr:
        if u.logo_url and u.num_popular_courses and u.latitude and u.longitude \
        and u.city and u.city and u.state and u.banner_url and u.num_depts and \
        u.school_color_one and u.us_news_ranking and u.us_news_ranking < 220:
            popular_universities.append(u)
    return popular_universities

def getPopularStats():
    universities = getAllUsNewsUniversities()
    prepared, unprepared_dict = getPreparedUniversities(universities)
    print "%s prepared, %s unprepared" % (len(prepared), len(unprepared_dict.keys()))

    unprepared_keys = unprepared_dict.keys()
    unprepared_universities = sorted([unprepared_dict[key] for key in unprepared_keys], key=lambda k:len(k['missing_fields']))
    for unprepared_uni in unprepared_universities:
        print unprepared_uni['name'], unprepared_uni['missing_fields']


# getPopularStats()
# generateTargettedJsonFile()