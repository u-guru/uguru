import json

def loadJsonArrayFromFile(filename):
    arr = json.load(open(filename))
    return arr

def loadJsonDictFromFile(filename):
    _dict = json.dict(open(filename))
    return _dict

def updateMasterWithMailgunEmails(fileA, fileB):
    focused_universities = loadJsonArrayFromFile(fileA)
    mailgun_universities = loadJsonArrayFromFile(fileB)
    mailgun_count = len(mailgun_universities)
    print mailgun_count, 'mailgun universities'
    count = 0
    for uni_focused in focused_universities:
        for uni_mailgun in mailgun_universities:
            if uni_focused['name'] == uni_mailgun['name']:
                uni_focused['num_emails'] = uni_mailgun['count']

    saveObjToJson(focused_universities, 'fa15_all2')

def sortArrayObjByKey(array, keyString, reverse=True):
    return sorted(array, key=lambda k:k[keyString], reverse=reverse)

def saveObjToJson(obj, filename):
    with open(filename + '.json', 'wb') as fp:
        json.dump(obj, fp, indent = 4)


def updateUniversityAllCourseDepts():
    from app.models import *
    from app.database import *
    for u in University.query.all():
        u.num_courses = len(u.courses)
        u.num_depts = len(u.departments)
        db_session.commit()
        print u.name, 'updated', u.num_courses

def updateUniversityTargettedCourseDepts():
    from app.models import *
    from app.database import *
    for u_info in arr:
        u = University.query.get(u_info['id'])
        u.num_courses = len(u.courses)
        u.num_depts = len(u.departments)
        db_session.commit()
        print u.name, 'updated', u.num_courses

# Where we're at ...
def expectCoursesTopUniversities():
    return (1047488, 30417)
    # def loadRemoteJson(url):
    #     import urllib2
    #     import json
    #     response = urllib2.urlopen(url)
    #     data = json.load(response)
    #     return data
    # def gDriveShareLinkToDirect(linkUrl, id_only=False):
    #     if id_only:
    #         return 'https://drive.google.com/uc?export=download&id=' + id_only
    #     lastUrlSegment = linkUrl.split('/')[-1]
    #     return linkUrl.replace('file/d', 'uc?export=download&id=').replace('/'+ lastUrlSegment, '')
    # from app.models import *
    # from app.database import db_session
    # urls = ['0By5VIgFdqFHdcVdzaEgxemw2VjQ', '0By5VIgFdqFHdYjFJTG5UT1BrNkE',
    # '0By5VIgFdqFHdU2kwU1dzcXB6UVE', '0By5VIgFdqFHdZ1loeTdnaENTSzQ', \
    # '0By5VIgFdqFHdSERWN3ZkQjRROWM', '0By5VIgFdqFHdZnBLMjVoeU82d3M']
    # urls = [gDriveShareLinkToDirect('',url) for url in urls]
    # result_dict = {}
    # error_universities = []
    # index = 0
    # num_courses = 0
    # num_depts = 0
    # for url in urls:
    #     index += 1
    #     print 'Fetching batch %s...' % index
    #     data_dict = loadRemoteJson(url)
    #     for _id in data_dict.keys():
    #         num_courses += data_dict[_id]['all_stats']['num_courses']
    #         num_depts += data_dict[_id]['all_stats']['num_departments']
    # print '# courses:%s, # depts:%s' % (num_courses, num_depts)

## Link for now
##
## Make sure Fa15all_json is up to date
## Admin view
##

def generateMostUpdatedScript():
    pass

def benchmarkCurrentUniversities():
    import json
    from app.models import *
    uni_arr = json.load(open('app/static/data/fa15_all.json'))
    totalCount = len(uni_arr)
    withCourses = []
    moreSigCourses = []
    missingDepts = []
    missingCourses = []
    missingBoth = []
    for uni in uni_arr:
        u = University.query.get(uni['id'])
        if u.num_courses > 200 and u.num_depts:
            withCourses.append(u)
        elif u.num_courses < 200 and u.num_depts:
            moreSigCourses.append(u)
        elif not u.num_courses and u.num_depts:
            missingCourses.append(u)
        elif not u.num_depts and u.num_courses:
            missingDepts.append(u)
        elif not u.num_courses and not u.num_depts:
            missingBoth.append(u)
    print '#All Set: %i out of %i' % (len(withCourses) , totalCount)
    print '#Partial Set: %i out of %i' % (len(moreSigCourses) , totalCount)
    print '#Missing Courses ONLY: %i out of %i' % (len(moreSigCourses) , totalCount)
    print '#Missing Dept ONLY: %i out of %i' % (len(missingDepts) , totalCount)
    print '#Missing Both ONLY: %i out of %i' % (len(missingBoth) , totalCount)

def cleanDepartments():
    from app.models import *
    import json
    uni_arr = json.load(open('app/static/data/fa15_all.json'))
    results = {
        'code': 0,
        'abbr': 0,
        'name': 0,
        'short_name': 0,
        'variations': 0,
        'title': 0,
        'code && !abbr': 0,
        'abbr && !code': 0,
    }
    for uni_info in uni_arr:
        u = University.query.get(uni_info['id'])
        for dept in u.departments:
            if dept.code: results['code'] += 1
            if dept.name: results['name'] += 1
            if dept.abbr: results['abbr'] += 1
            if dept.short_name: results['short_name'] += 1
            if dept.variations: results['variations'] += 1
            if dept.title: results['title'] += 1
            if dept.code and not dept.abbr: results['code && !abbr'] += 1
            if dept.abbr and not dept.code: results['abbr && !code'] += 1
    from pprint import pprint
    print results

def cleanDepartmentsCode():
    from app.models import *
    import json
    uni_arr = json.load(open('app/static/data/fa15_all.json'))
    for uni_info in uni_arr:
        u = University.query.get(uni_info['id'])
        for dept in u.departments:
            if not dept.abbr and dept.code:
                dept.abbr = dept.code
            dept.code = ''
    count = 0
    for uni_info in uni_arr:
        u = University.query.get(uni_info['id'])
        for dept in u.departments:
            if dept.code:
                count += 1
    print 'num codes', count

# progress so far
def benchmarkCoursesForAllUniversities(email_only=False):
    pass

# Based on # number of emails
def benchmarckCoursesForAllUniversities():
    pass


