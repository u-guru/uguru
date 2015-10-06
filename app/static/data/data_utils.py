import json

ADMIN_API_TOKEN = 'be55666b-b3c0-4e3b-a9ab-afef4ab5d2e3'

def loadJsonArrayFromFile(filename):
    arr = json.load(open(filename))
    return arr

def loadJsonDictFromFile(filename):
    _dict = json.loads(open(filename))
    return _dict

def countTargetted():
    targettedArr = loadJsonArrayFromFile('fa15_targetted.json')
    allArr = loadJsonArrayFromFile('fa15_all.json')
    print "# of Complete Universities:", str(len(targettedArr)) +'/' + str(len(allArr))


def updateMasterWithMailgunEmails(fileA='fa15_targetted.json', fileB='mailgun.json'):
    focused_universities = loadJsonArrayFromFile(fileA)
    mailgun_universities = loadJsonArrayFromFile(fileB)
    count = 0
    
    mailgunJsonNames = [m_info['name'] for m_info in mailgun_universities]
    focused_universities = [f_info for f_info in focused_universities if f_info['name'] in mailgunJsonNames]
    
    newFileName = fileA.split('.')[0] + '-NEEDS-APPROVAL'
    saveObjToJson(focused_universities, newFileName)
    print
    print newFileName, 'created with', len(focused_universities), 'universities'
    print

def updateMailgunJsonWithFreshData(num=1000):
    from mailgun import get_all_university_progress
    
    results = get_all_university_progress()

    filtered_results = [result for result in results if result['count'] >= num]
    numWithEmails = len(filtered_results)

    saveObjToJson(results, 'mailgun')
    print 'Most recent results saved to mailgun.json\n'
    print 'Number of universities with emails %s' % numWithEmails
    return filtered_results

def sortArrayObjByKey(array, keyString, reverse=True):
    return sorted(array, key=lambda k:k[keyString], reverse=reverse)

def saveObjToJson(obj, filename):
    with open(filename + '.json', 'wb') as fp:
        json.dump(obj, fp, indent = 4)


def updateUniversityAllCourseDepts():
    from app.models import University
    from app.database import db_session
    for u in University.query.all():
        u.num_courses = len(u.courses)
        u.num_depts = len(u.departments)
        db_session.commit()
        print u.name, 'updated', u.num_courses

def updateUniversityTargettedCourseDepts():
    from app.models import University
    from app.database import db_session
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
    from app.models import University
    from app.database import db_session
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
    from app.models import University
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
    from app.models import University
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
    from app.models import University
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

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

# Based on # number of emails
def benchmarckCoursesForAllUniversities():
    pass

def getRequiredKeys():
    universities = loadJsonArrayFromFile('fa15_all.json')
    return universities[0].keys() + ['emails_only', 'departments', 'courses']

def getAllUsNewsUniversityNames():
    import json
    universities = loadJsonArrayFromFile('fa15_targetted.json')
    universityNames = [university['name'] for university in universities]
    return universityNames

def getTodayDayMonth():
    from datetime import datetime
    today = datetime.now().day
    month = datetime.now().month 
    return month, today

def requestUguruAdminServer(admin_token, args):
    base_url = 'https://www.uguru.me/api/v1/%s/'

def isDepartmentsReady(uni_id, uni_name):
    import requests, json
    BASE_URL = 'https://www.uguru.me/api/v1/universities/%s' % uni_id
    departments_url = BASE_URL + '/departments'
    
    departments_arr = json.loads(requests.get(departments_url).text)
    
    empty_count = 0
    for dept in departments_arr:
        if not dept.get('code') and not dept.get('abbr') and not dept.get('name') \
        and not dept.get('short_name') and not dept.get('variations') and not dept.get('title'):
            empty_count += 1

    if empty_count > len(departments_arr) * 0.25:
        print str(int(empty_count / float(len(departments_arr)) * 100)) + '%', uni_name, 'departments', 'are empty'
        return False

    return True


def isCoursesReady(uni_id, uni_name):
    import requests, json
    BASE_URL = 'https://www.uguru.me/api/v1/universities/%s' % uni_id
    courses_url = BASE_URL + '/courses'
    
    courses_arr = json.loads(requests.get(courses_url).text)
    
    empty_count = 0
    for course in courses_arr:
        if not course.get('name') and not course.get('short_name') and not course.get('full_name'):
            empty_count += 1

    if empty_count > len(courses_arr) * 0.25:
        print str(int(empty_count / float(len(courses_arr)) * 100)) + '%', uni_name, 'courses', 'are empty'
        return False

    return True

def sanitizeAllCourses(departments):
    pass

def isUniversityReady(uni_data, has_emails=False):
    import requests, json
    from time import sleep
    
    ## Case #1
    if not has_emails:
        return False

    # requiredKeys = getRequiredKeys()
    requiredKeys = ['school_color_one', 'population', 'banner_url', 'rank', 'fa15_start', 'id', 'school_color_two', 'city', 'name', 'longitude', 'state', 'popular_courses', 'latitude', 'logo_url']
    
    # grab uni_id
    uni_id = uni_data['id']

    # Find uni_data
    all_uni_data = loadJsonArrayFromFile('fa15_all.json')
    for uni_info in all_uni_data:
        if int(uni_info['id']) == int(uni_id):
            uni_data = uni_info
            break

    ## Step 1 
    for key in requiredKeys:
        if not uni_data.get(key):
            print uni_data['name'], 'does not have', key
            return False


    # /<admin_token>/universities/<university_id>
    # /<admin_token>/universities/<university_id>/departments
    # /<admin_token>/universities/<university_id>/courses
    ## Step 2
    if isDepartmentsReady(uni_data['id'], uni_data['name']):
        uni_data['departments'] = True
    else:
        return False
    sleep(1)
    
    if isCoursesReady(uni_data['id'], uni_data['name']):
        uni_data['courses'] = True
    else:
        return False
    sleep(1)
    return uni_data


    # for department in departments_arr:

    
    
    ## CHeck if any of the required keys are going to be null
    ## Case #3
    ## Query Uguru Admin API for departments
    ## Loop through all ugu

    ## Case #2
    ## Are departments as
    if not has_emails:
        return False

    return False


if __name__ == '__main__':
    import sys
    args = sys.argv

    if args[1] in ['targetted', '-t']:
        countTargetted()

    # Create a new fa15_targetted-APPROVAL.json file with limited targetted universities
    if args[1] in ['universities-ready', '-ur']:
        
        mailgunUniversities = updateMailgunJsonWithFreshData(1000)
        
        finalUniversities = []
        ## 30/200 --> keys --> courses --> departments
        print '\n\n=====Processing %s Universities\n\n=====' % len(mailgunUniversities)
        approved = 0
        index = 0
        for university_dict in mailgunUniversities:
            if isUniversityReady(university_dict, True):
                finalUniversities.append(university_dict)
                print 'Woohoo! %s', university_dict['name'], 'is approved!'
                approved += 1
            index += 1
            print "UPDATE:", "%s/%s" % (approved, index), 'approved so far\n'
                

        filename = 'fa15_targetted_%s_%s.json' % getTodayDayMonth()
        saveObjToJson(finalUniversities, filename)

        print len(finalUniversities), 'total universities ready'
        print 
        print 'Results saved in', 'fa15_targetted_%s_%s.json' % getTodayDayMonth()

        ## Open fa15_all.json --> starts with 200 
        ## 1. Filter it so it only contains the ones with emails > 1000
        ## 2. Are departments sanitized?
        ## 3. Are courses sanitizated?
        ## 4. Filter it so it only containes the ones with required keys

        # updateMasterWithMailgunEmails()

        ## Emails -->

    # Will print #of universities that have at least X emails
    if args[1] in ['print-mailgun', '-pm']:
        number = 1000
        if len(args) > 2 and is_number(args[2]):
            number = int(args[2])
        updateMailgunJsonWithFreshData(number)
    
    if args[1] in ['university-list','-ul']:
        universityNames = getAllUsNewsUniversityNames()
        for name in universityNames: print name
