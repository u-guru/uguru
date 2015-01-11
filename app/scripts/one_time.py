#### Scripts that you had to write ONE time, stored here for future reference
#### These are meant to be called from the root directory

def add_location_to_university_json():
    from app.static.data.universities import universities_dict
    from geopy.geocoders import GoogleV3
    from pprint import pprint
    university_names = universities_dict.keys()
    from time import sleep
    not_found = []
    count = 1
    num_universities = len(university_names)
    for name in university_names:
        googlev3 = GoogleV3()
        results = googlev3.geocode(name)
        if not results: 
            not_found.append(name)
            continue
        results_dict = {}
        results_dict['latitude'] = results.latitude
        results_dict['longitude'] = results.longitude
        results_dict['full_address'] = results.address
        for component in results.raw['address_components']:
            component_types = component.get('types')
            if component_types:
                if 'postal_code' in component_types:
                    results_dict['zip_code'] =  component['short_name']
                elif "administrative_area_level_1" in component_types:
                    results_dict['state_short'] = component['short_name']
                    results_dict['state'] = component['long_name']
                elif ('locality' in component_types or 'neighborhood' in component_types)\
                and 'country' not in component_types:
                    results_dict['city_short'] =  component['short_name']
                    results_dict['city'] =  component['long_name']
        universities_dict[name]['location'] = results_dict
        pprint(universities_dict[name])
        print 
        print count, '/', num_universities, 'processed'
        count += 1
        sleep(1)
    
    print not_found

    with open('universities.json', 'wb') as fp:
        json.dump(universities_dict, fp)

def add_location_to_university_json2():



from universities_efficient import universities_arr as uni_arr
from geopy.geocoders import GoogleV3
from pprint import pprint
from time import sleep
import json
import geopy
not_found = []
count = 1
new_uni_arr = []
for uni in uni_arr:
    if not (uni.get('location') and uni['location']['latitude'] != 0):
        new_uni_arr.append(uni)

num_universities = len(new_uni_arr)
for university in new_uni_arr:
    try:
        googlev3 = GoogleV3()
        results = googlev3.geocode(university['title'] + ", " + university["city"]+ ", " + university["state"])
        if not results: 
            not_found.append(university)
            print "could not find " + university["title"]
            continue
        results_dict = {}
        results_dict['latitude'] = results.latitude
        results_dict['longitude'] = results.longitude
        results_dict['full_address'] = results.address
        for component in results.raw['address_components']:
            component_types = component.get('types')
            if component_types:
                if 'postal_code' in component_types:
                    results_dict['zip_code'] =  component['short_name']
                elif "administrative_area_level_1" in component_types:
                    results_dict['state_short'] = component['short_name']
                    results_dict['state'] = component['long_name']
                elif ('locality' in component_types or 'neighborhood' in component_types)\
                and 'country' not in component_types:
                    results_dict['city_short'] =  component['short_name']
                    results_dict['city'] =  component['long_name']
        university['location'] = results_dict
        print 
        print count, '/', num_universities, 'processed'
        count += 1
        with open('universities2.json', 'wb') as fp:
            json.dump(new_uni_arr, fp)
    except geopy.exc.GeocoderQuotaExceeded:
        raise
    except:
        raise
        print "some else went wrong", university
        continue
    
print not_found

with open('universities.json', 'wb') as fp:
    json.dump(universities_dict, fp)




from app.models import University
u_dict = {}
for u in University.query.all():
    u_dict[u.name] = {
        'latitude': u.latitude,
        'longitude': u.longitude,
        'city': u.city,
        'state': u.state,
        'id': u.id,
        'population': u.population
    }

with open('universities-efficient.json', 'wb') as fp:
    json.dump(u_dict, fp)


#CD into app/static/data
import json
file = open('universities-scrape.json')
u_dict = json.load(file)
count = 0
scrapeable_u = []
for key in u_dict:
    if 'scraping_info' in u_dict[key]\
    and 'provided_fields' in u_dict[key]['scraping_info']\
    and len(u_dict[key]['scraping_info']['provided_fields']) > 0:
        u_dict[key]['name'] = key
        scrapeable_u.append(u_dict[key])
        print u_dict[key]
        count += 1

scrapeable_u = sorted(scrapeable_u, key=lambda k:int(k['forbes_rank']))
for u in scrapeable_u:
    print u['name'].replace(",", ""), ',', u['forbes_rank'], ',', u['population'].replace(",",""), ',', (" ".join(u["scraping_info"]['provided_fields'])).replace("majordepartment", "major department")
    # if int(u['population'].replace(',','')) > 20000 and int(u['forbes_rank']) < 100:
    #     print u['name'], u['forbes_rank'], u['population']






import json
count = 0
f = open('universities-efficient.json')
d = json.load(f)
for uni in d:
    if uni.get('location') and uni['location']['latitude'] != 0:
        count += 1

from universities_efficient import universities_arr as uni_arr
count = 0
no_gps_uni = []
for uni in uni_arr:
    if uni.get('location') and uni['location']['latitude'] != 0:
        count += 1
    else:
        uni_arr.remove(uni)

from geopy.geocoders import GoogleV3
from pprint import pprint
from time import sleep
import json, geopy
not_found = []
num_universities = len(no_gps_uni)
count = 0
for university in no_gps_uni:
    try:
        googlev3 = GoogleV3()
        results = googlev3.geocode(university['title'] + ", " + university["city"]+ ", " + university["state"])
        if not results: 
            not_found.append(university)
            print "could not find " + university["title"]
            continue
        results_dict = {}
        results_dict['latitude'] = results.latitude
        results_dict['longitude'] = results.longitude
        results_dict['full_address'] = results.address
        for component in results.raw['address_components']:
            component_types = component.get('types')
            if component_types:
                if 'postal_code' in component_types:
                    results_dict['zip_code'] =  component['short_name']
                elif "administrative_area_level_1" in component_types:
                    results_dict['state_short'] = component['short_name']
                    results_dict['state'] = component['long_name']
                elif ('locality' in component_types or 'neighborhood' in component_types)\
                and 'country' not in component_types:
                    results_dict['city_short'] =  component['short_name']
                    results_dict['city'] =  component['long_name']
        university['location'] = results_dict
        print 
        print count, '/', num_universities, 'processed'
        count += 1
        with open('universities2.json', 'wb') as fp:
            json.dump(no_gps_uni, fp)
    except geopy.exc.GeocoderQuotaExceeded:
        raise
    except:
        raise
        print "some else went wrong", university
        continue


import json
f = open('universities2.json')
d = json.load(f)
count = 0
for uni in d:
    for old_uni in uni_arr:
        if uni['title'] == old_uni['title']:
            uni_arr.remove(old_uni)
            uni_arr.append(uni)
            count += 1
            break

with open('universities-efficient.json', 'wb') as fp:
    json.dump(no_gps_uni, fp, sort_keys = True, indent = 4)



import urllib2, json
from bs4 import BeautifulSoup
from app.static.data.universities_efficient import universities_arr as uni_arr
base_url = "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=schoolName&query="
base_url_dept = "http://www.ratemyprofessors.com/teacher/getDepartmentListFromSchool?sid="
count = 0
results_found = 0
for uni in uni_arr:
    count += 1
    title = uni['title']
    title = title.replace(",", "").replace("&", "").replace("-", " ").replace(" ", "+")
    full_url = base_url + str(title)
    html_string = urllib2.urlopen(full_url).read()
    soup = BeautifulSoup(html_string)
    results = soup.select('.listings .listing a')
    if results:
        school_id = results[0]['href'].split('=')[-1]
        if school_id:
            full_url = base_url_dept + str(school_id)
            dept_dict = json.load(urllib2.urlopen(full_url))
            all_departments = [dept['name'] for dept in dept_dict['departments']]
            uni['departments'] = all_departments
            results_found += 1
            print results_found, "/", count, "found"
            with open('universities-master.json', 'wb') as fp:
                json.dump(uni_arr, fp, sort_keys = True, indent = 4)

        
from universities_master import universities_arr as uni_arr
new_dict = {}
for uni in uni_arr:
    new_dict[str(uni["id"])] = uni
    new_dict[str(uni["id"])].pop("id")

with open('universities_majors_efficient.json', 'wb') as fp:
    json.dump(new_dict, fp, sort_keys = True, indent = 4)



from universities_master import universities_arr
count = 1
for uni in universities_arr:
    if uni.get('departments') and len(uni.get('departments')) > 0:
        new_departments = []
        for dept in uni.get('departments'):
            new_departments.append(
                {
                    'id': count,
                    'name': dept
                })
            count += 1
        uni['departments'] = new_departments

with open('universities_master.json', 'wb') as fp:
    json.dump(universities_arr, fp, sort_keys = True, indent = 4)






#Sort each universities course by dictionary
final_dict = {}
count = 0
for key in d:
    school_courses = []
    depts_dict = d[key]["departments"]
    for dept in depts_dict.keys():
        short_name = depts_dict[dept]["short_name"]
        long_name = depts_dict[dept]["long_name"]
        for course in depts_dict[dept]["courses"]:
            course_info = depts_dict[dept]["courses"][course]
            result = {
                'dept_long': long_name, 
                'dept_short': short_name, 
                'code': course_info['code'],
                'title': course_info['title'],
                'id': count
                }
            school_courses.append(result)
            count += 1
    final_dict[key] = school_courses
    print key, len(school_courses)

print count

#Sort each universities course by dictionary
for key in final_dict:
    courses = final_dict[key]
    final_dict[key] = sorted(courses, key=lambda k:k['dept_short'])
#Save
with open('universities_courses.json', 'wb') as fp:
    json.dump(final_dict, fp, sort_keys = True, indent = 4)

#convert to the majors json file from before, but add courses
import json
f = open('universities_majors_efficient.json')
f2 = open('universities_courses.json')
u_majors_dict = json.load(f)
u_courses_dict = json.load(f2)
courses_count = 0
for uni in u_courses_dict:
    for uni_id in u_majors_dict:
        if u_majors_dict[uni_id]["title"] == uni:
            print uni, 'found in majors dict'
            u_majors_dict[uni_id]["courses"] = u_courses_dict[uni]
            courses_count += len(u_courses_dict[uni])


from app.database import init_db
init_db()

from app.emails import send_campaign_email
from app.models import *
recipient = Recipient()
recipient.first_name = "Samir"
recipient.last_name = "Makhani"
recipient.email = "makhani.samir@gmail.com"
options = {
    "campaign_name": "Test campaign",
    "template_name": "Hey *|FNAME|*, I've got a question for you",
    "subject": "Hey *|FNAME|*, I've got a question for you",
    "sender_email": "jasmine@uguru.me",
    "reply_to_email": "jasmine@uguru.me",
    "sender_title": "Jasmine",
    "track_opens_flag": True,
    "track_clicks_flag": False,
    "important_flag": True,
}
send_campaign_email(options, [recipient])


from app.emails import send_campaign_email
from app.models import *
import json
options = {
    "campaign_name": "UCLA ",
    "template_name": "Quick Question",
    "subject": "Quick Question",
    "sender_email": "jasmine@uguru.me",
    "reply_to_email": "jasmine@uguru.me",
    "sender_title": "Jasmine",
    "track_opens_flag": True,
    "track_clicks_flag": False,
    "important_flag": True,
}
send_campaign_email(options, [r])



f = open("app/static/data/school/ucla/batch_1_500.json")
recipient_arr = json.load(f)
recipients = []
for recipient in recipient_arr:
    if recipient.get("email"):
        first_name = recipient["name"].replace(",","").split(" ")[1].title()
        last_name = recipient["name"].replace(",","").split(" ")[0].title()
        email = recipient["email"].lower()
        print first_name, last_name, email
        r = Recipient()
        r.first_name = first_name
        r.last_name = last_name
        r.email = email
        recipients.append(r)

send_campaign_email(options, recipients)

import json
f = open('universities_courses_efficient.json')
d = json.load(f)
cache = []
for key in d.keys():
    if d[key].get("courses"):
        courses = d[key]["courses"]
        for course in courses:
            searchable = []
            if course.get("code") and course.get("dept_short"):
                course_code = course.get("code")
                dept_short = course.get("dept_short")
                short_name = str(dept_short) + " " + str(course_code)
                searchable.append(short_name)
            if course.get("code") and course.get("dept_long"):
                course_code = course.get("code")
                dept_long = course.get("dept_long")
                long_name = str(dept_long) + " " + str(course_code)
                searchable.append(long_name)
            course["searchable"] = searchable
        cache.append(d[key])


