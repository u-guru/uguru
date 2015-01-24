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
    "campaign_name": "UCLA Batch 4",
    "template_name": "Hey *|FNAME|*",
    "subject": "Hey *|FNAME|*",
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
import json
recipients = []
for recipient in batch_2:
    recipient = json.loads(recipient[0])
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
                course["top_search"] = short_name
                searchable.append(short_name)
            if course.get("code") and course.get("dept_long"):
                course_code = course.get("code")
                dept_long = course.get("dept_long")
                long_name = str(dept_long) + " " + str(course_code)
                course["second_search"] = long_name
                searchable.append(long_name)
            course["searchable"] = searchable
        cache.append(d[key])

with open('universities_courses_efficient.json', 'wb') as fp:
    json.dump(d, fp, sort_keys = True, indent = 4)

with open('ucla_majors.json', 'wb') as fp:
    json.dump(d, fp, sort_keys = True, indent = 4)

#shun to samir format
import json
file = open("ucla.json")
d = json.load(file)
get_school_departments = d[d.keys()[0]]['departments']
school_arr = []
for dept in get_school_departments:
    dept_long_name = get_school_departments[dept]['long_name']
    dept_short_name = get_school_departments[dept]['short_name']
    for course in get_school_departments[dept]["courses"]:
        course_info = get_school_departments[dept]['courses'][course]
        course_code = course_info['code']
        course_title = course_info['title']
        variations_arr = []
        if dept_long_name:
            variations_arr.append(str(dept_long_name) + ' ' + str(course_code))
        if dept_short_name:
            variations_arr.append(str(dept_short_name) + ' ' + str(course_code))
        school_arr.append({
                'title': course_title,
                'code': course_code,
                'dept_short':dept_short_name,
                'dept_long': dept_long_name,
                'variations': variations_arr
        })

with open('courses.json', 'wb') as fp:
    json.dump(school_arr, fp, sort_keys = True, indent = 4)



from pprint import pprint
pprint(d)

already_sent = ["tiffanylyw@ucla.edu",
"soumyadeep96@ucla.edu",
"skphu@ucla.edu",
"onionheadbozo@ucla.edu",
"j.hwang1013@gmail.com",
"yenyeelim@gmail.com",
"shelbymorgan76@gmail.com",
"ingschan@ucla.edu",
"sfreda@ucla.edu",
"ddgamboa@mednet.ucla.edu",
"amandaracquel@sbcglobal.net",
"felixhc7@ucla.edu",
"wihumail@gmail.com",
"albertshu@ucla.edu",
"almarales.lianne@gmail.com",
"justinmuegge@gmail.com",
"lindaa.t0410@gmail.com",
"djsong@mednet.ucla.edu",
"ibasu@ucla.edu",
"christinahearn@cox.net",
"sewcheer@gmail.com",
"agnesjaba@yahoo.com",
"jennyhkimm@gmail.com",
"memcdermott@ucla.edu",
"noah.m.horvath@gmail.com",
"ryanevansa@gmail.com",
"bailey55@ucla.edu",
"ryancosgrove18@gmail.com",
"benjchiang@ucla.edu",
"josec1995@ucla.edu",
"ricardoayala94@ucla.edu",
"lindsaykoby@hotmail.com",
"carlosenriquezc@yahoo.com",
"haleighmburnett@gmail.com",
"chelseatuohy@yahoo.com",
"robertneivert@gmail.com",
"mortonmakayla@yahoo.com",
"linsey.morales25@gmail.com",
"ljk951225@163.com",
"whiteca@ucla.edu",
"spietkiewicz@idre.ucla.edu",
"samanthaarmstrong1@yahoo.com",
"ccracraft@ucla.edu",
"lalatorres25@gmail.com",
"yuqima@ucla.edu",
"camdenkutnick@gmail.com",
"kshoda@ucla.edu",
"grantrosson@gmail.com",
"gauri_ratra@yahoo.com",
"aashalp96@gmail.com",
"mjtorresb@ucla.edu",
"damianag3@gmail.com",
"mkumar818@ucla.edu",
"strewman@me.com",
"xashleyly@gmail.com",
"mlberman@ucla.edu",
"jonathan.widjaja2@gmail.com",
"luceroromero7@gmail.com",
"vinanguyenl@yahoo.com",
"melissaacheng@ucla.edu",
"jasonro@ucla.edu",
"cieracornelisz@ucla.edu",
"dcooke13@ucla.edu",
"jasmine.mir@berkeley.edu",
"pennypacker96@yahoo.com",
"natasha.cerrato@aol.com",
"merlene.alo29@gmail.com",
"mikekim1992@gmail.com",
"manakawatanabe@g.ucla.edu",
"elena.vazquez14@gmail.com",
"natalienatalie1122@yahoo.com",
"ku.justine@gmail.com",
"kmiekotok@ucla.edu",
"emilyrliu93@gmail.com",
"mehrsingh96@gmail.com",
"benjamin.vnkn@gmail.com",
"emmajcarley@verizon.net",
"athenakonicki@gmail.com",
"hsuh15@gmail.com",
"arivera92@ucla.edu",
"clcaffrey@ucla.edu",
"jfreshman@ucla.edu",
"avankaag@gmail.com",
"lsolouki@ucla.edu",
"audreyyoon@ucla.edu",
"loganannreynolds@yahoo.com",
"patel.h.akash@gmail.com",
"chelliah.shankar@gmail.com",
"biwang@ucla.edu",
"jchodosh@mednet.ucla.edu",
"ericamark1@gmail.com",
"jillybean4000@gmail.com",
"camazmanian@gmail.com",
"kcaruso@ucla.edu",
"jhong08@gmail.com",
"mpgermano@g.ucla.edu",
"andradesgaby@sbcglobal.net",
"becky.bk.la@gmail.com",
"ericjaimes@ucla.edu",
"louisakirksey@gmail.com",
"meenahalam@gmail.com",
"hbandi@ucla.edu",
"tuonganh08@g.ucla.edu",
"jhimmelstern@gmail.com",
"josephwanj@gmail.com",
"chriskim@mednet.ucla.edu",
"chris.kenjiro@gmail.com",
"esuchard@ucla.edu",
"karal1013@yahoo.com",
"amberbryant@ucla.edu",
"victoria.zaks@gmail.com",
"natalieamberg@yahoo.com",
"tangowited@ucla.edu",
"carolynkkim@gmail.com",
"nchun15@gmail.com",
"jeremygiampaoli@ucla.edu",
"taymarquez4ucla@ucla.edu",
"ericchuu@ucla.edu",
"akassels@ucla.edu",
"shunkurosakisk@gmail.com",
"cbaramayo@gmail.com",
"jlynn324@ucla.edu",
"jchichyan@yahoo.com",
"jhutton9@g.ucla.edu",
"kimanim9616@ucla.edu",
"sethweiland@g.ucla.edu",
"jpokorny10@yahoo.com",
"joelson.jay@gmail.com",
"grace.countryman@yahoo.com",
"morganschneer@gmail.com",
"vtran54@gmail.com",
"ashleychang96@gmail.com",
"erika100996@yahoo.com",
"mbeckenholdt@hotmail.com",
"ajkropp@frontiernet.net",
"lecarrigan@gmail.com",
"ekleerup@mednet.ucla.edu",
"jennatmaja@g.ucla.edu",
"elyfan@ucla.edu",
"melissaortega12@gmail.com",
"freddyjftw@gmail.com",
"mckennagalvin@ucla.edu",
"scottninokawa@yahoo.com",
"alexgibbonss@g.ucla.edu",
"jocelynmedal@gmail.com",
"kyle.rodgers@outlook.com",
"apparker15@gmail.com",
"delaniem@ucla.edu",
"mmonforte@ucla.edu",
"briancc23@yahoo.com",
"jkshoema@ucla.edu",
"mgrove96@ucla.edu",
"motosinoni@gmail.com",
"evelyn6678@g.ucla.edu",
"thomasburkhead@ymail.com",
"josulebele@yahoo.com",
"laml14@g.ucla.edu",
"klam1995@ucla.edu",
"utkarshpandey@ucla.edu",
"oliverylchan@yahoo.com",
"mnero123@ucla.edu",
"kampem@ucla.edu",
"katieeunjilew@gmail.com",
"kareennn@ucla.edu",
"djnguyen@psych.ucla.edu",
"tinajavan@gmail.com",
"daniel.h.thomlinson@gmail.com",
"carolinedillon@g.ucla.edu",
"jackieang@ucla.edu",
"gnomimi.3@gmail.com",
"maximumrisch@gmail.com",
"nina@romans-barsamian.com",
"kyamashita@ucla.edu",
"garchbold@ucla.edu",
"utkarshgupta77@gmail.com",
"warren.siu1@gmail.com",
"lilianav513@ucla.edu",
"cbleecher@ucla.edu",
"ninafukuma@ucla.edu",
"ksarahh95@gmail.com",
"jvcollado@ucla.edu",
"mkturner14@ucla.edu",
"arianacynthia@gmail.com",
"cloudyxxiaoyun@gmail.com",
"matthewc.cummins@yahoo.com",
"zohairnz@gmail.com",
"caseydylla@gmail.com",
"adamaris_medina@yahoo.com",
"alexis.neubauer@hotmail.com",
"sytl@yahoo.com",
"lucassanthon@g.ucla.edu",
"jorgeisraelian@yahoo.com",
"marleymaron@ucla.edu",
"meganhnguyen@ucla.edu",
"aditya17varma@gmail.com",
"wdiaz@mednet.ucla.edu",
"adithya.shekhar96@gmail.com",
"jsmith@unex.ucla.edu",
"erodri43@ucla.edu",
"siri_ervik@hotmail.com",
"terrishih@ucla.edu",
"rnoldrox@gmail.com",
"doan.nicole@gmail.com",
"guzman15@ucla.edu",
"kellypolich@gmail.com",
"amccomb@orl.ucla.edu",
"nikkinak91367@aim.com",
"chenat@ucla.edu",
"hanan109@ucla.edu",
"kchan52@ucla.edu",
"sethpickford96@gmail.com",
"oliviagolston@gmail.com",
"daltontran@gmail.com",
"danielleb824@ucla.edu",
"sophiaarriola@gmail.com",
"hensonkwok@ucla.edu",
"chevan03@gmail.com",
"veronica.tutaj@att.net",
"fatimaperez121@yahoo.com",
"rsaltman18@yahoo.com",
"kennethzhou93@hotmail.com",
"rayquy@yahoo.com",
"archibald.lai@gmail.com",
"jobrien720@gmail.com",
"jones.andre95@gmail.com",
"chencrystal6@gmail.com",
"tyler.oldham@aol.com",
"jhalcovage88@yahoo.com",
"cheng.mindy3@gmail.com",
"albertyliu@ucla.edu",
"caroline.fung@yahoo.com",
"gnauk.ydna@hotmail.com",
"ricky.j.thomas89@gmail.com",
"lalatorres25@gmail.com",
"samir@uguru.me",
"florianstumpf@ucla.edu",
"emilykchuang@gmail.com",
"tyramonette@gmail.com",
"kerrietonking@gmail.com",
"mfreed10@gmail.com",
"lindac55@ucla.edu",
"tiffanyju@mednet.ucla.edu",
"sunnyshah@ucla.edu",
"erica.larusson@gmail.com",
"mrfabius@comcast.net",
"alaplaca@ucla.edu",
"moritzpoll@ucla.edu",
"jasonhua@mednet.ucla.edu",
"bdaniels1215@ucla.edu",
"hppablo@ucla.edu",
"sergiorizaga@gmail.com",
"oroscogold@gmail.com",
"brittanynguyen95@gmail.com",
"shreyamaskara@ucla.edu",
"tblakey@ucla.edu",
"jasminmiller24@yahoo.com",
"ckorourke@g.ucla.edu",
"ksdabirian@yahoo.com",
"quinnceline@ucla.edu",
"maxlim@ucla.edu",
"angelinemoreno16@gmail.com",
"181ryus@gmail.com",
"cocoochenn@gmail.com",
"jhuang@mednet.ucla.edu",
"rhea.karan1@gmail.com",
"alunafelix2214@ucla.edu",
"smccainarnold@gmail.com",
"ryanisola@yahoo.com",
"rstark3@ucla.edu",
"samanthadurazo@aol.com",
"savannahtan96@yahoo.com",
"vpha1834@ucla.edu",
"marianao@ucla.edu",
"mip2828@gmail.com",
"kyalou96@gmail.com",
"issadn@ucla.edu",
"tess.d.chen@gmail.com",
"gesmailian@ucla.edu",
"sergio.berlang@gmail.com",
"jamieccho@gmail.com",
"krista.frakes@gmail.com",
"tinaguo99@gmail.com",
"gregaryzab@hotmail.com",
"ergoldenb@gmail.com",
"amohankumar@ucla.edu",
"josegeovasquez@ucla.edu",
"nltpe101@ucla.edu",
"mckselig@ucla.edu",
"aksugai28@gmail.com",
"stacey90275@aol.com",
"kalexand@saonet.ucla.edu",
"monicacorbin@ucla.edu",
"burlianuk@gmail.com",
"navasa4@gmail.com",
"hjgorczycki@yahoo.com",
"jejonsson@aol.com",
"kaymaliafoos@yahoo.com",
"briandiep@ucla.edu",
"lbarreyro@ucla.edu",
"vayunjai6796@ucla.edu",
"anniechan2012@gmail.com",
"cdenova@ucla.edu",
"cchan2016@ucla.edu",
"tang.fiona@ucla.edu",
"miguelinamanriquez@gmail.com",
"j.mireshghi@gmail.com",
"sabrina1374@yahoo.com",
"sdgilles@ucla.edu",
"mgolovkine@yahoo.com",
"theoranguchang@ucla.edu",
"mitch.garland@ucla.edu",
"genesiscarrillo96@gmail.com",
"yyuenyang@gmail.com",
"ravija_raj@yahoo.co.in",
"fbainou@ucla.edu",
"chanjun@bok.or.kr",
"lucasrob@ucla.edu",
"ldy95@ucla.edu",
"chiamaka1@g.ucla.edu",
"marisa.chib@gmail.com",
"maxbron00@gmail.com",
"andywizard1@ucla.edu",
"eaviles01@ucla.edu",
"andrewendo@ucla.edu",
"sarahhbrown@ucla.edu",
"tea.king@yahoo.com",
"slemma@support.ucla.edu",
"malamina@mednet.ucla.edu",
"kvkim@mednet.ucla.edu",
"danielaruano96@gmail.com",
"rrdutt@ucla.edu",
"kearab1015@msn.com",
"dingshien1996@gmail.com",
"cwzhu@ucla.edu",
"andrewis.unstoppable@gmail.com",
"jav_vega95@yahoo.com",
"ckades@ucla.edu",
"jenn0412@ucla.edu",
"stevenking@ucla.edu",
"andeerskin@ucla.edu",
"lily.lequang.97@gmail.com",
"hyhuang@ucla.edu",
"alexandraroseart@yahoo.com",
"ayastrauss@gmail.com",
"isaacyeoenjie@hotmail.com",
"wpantelakos@yahoo.com",
"martinalcalax7@yahoo.com",
"rlico@ucla.edu",
"ldjs@dslextreme.com",
"jdang11@ucla.edu",
"karizabal@mednet.ucla.edu",
"shitijgupta@ucla.edu",
"morganwhelchel@gmail.com",
"calvinchanwong@ucla.edu",
"jbalakumar@mednet.ucla.edu",
"christinabtran@gmail.com",
"jennifer.kt.truong@ucla.edu",
"mweyant1@ucla.edu",
"jasmine.mir@berkeley.edu",
"davidtellez50@yahoo.com",
"abu.bfab@gmail.com",
"colehugelmeyer@comcast.net",
"md031796@gmail.com",
"natasha.mangham@gmail.com",
"joshxtran@ucla.edu",
"sgchinshaw@gmail.com",
"delaney.warren@gmail.com",
"lilymay@snet.net",
"johannsong@ucla.edu",
"rodts.chris@gmail.com",
"pialouisesalcedo@gmail.com",
"ericvdu@ucla.edu",
"seskildsen@ucla.edu",
"steventaka@yahoo.com",
"dandre5@ucla.edu",
"janekwong@ucla.edu",
"sarah.amador@aol.com",
"syoung1313@ucla.edu",
"maxreynolds55@gmail.com",
"ehdgh0201@ucla.edu",
"norris.austinc@gmail.com",
"liasepanek@yahoo.com",
"samir@uguru.me",
"kgarcia96@ucla.edu",
"j.mireshghi@gmail.com",
"syee@support.ucla.edu",
"sfernandez@mednet.ucla.edu",
"bpang3@hotmail.com",
"shunkurosakisk@gmail.com",
"denise_capuno@yahoo.com",
"rcvasquez@mednet.ucla.edu",
"mindytran96@gmail.com",
"sduranfdz@ucla.edu",
"tincan24@gmail.com",
"michellemusso@ucla.edu",
"calebkhw@gmail.com",
"maudi95@ucla.edu",
"shartoonian@ucla.edu",
"shivanshug14@ucla.edu",
"hello_dalena123@yahoo.com",
"ilmaradiaga@ucla.edu",
"rachaelgarcia7@ucla.edu",
"josephzhu3@gmail.com",
"kgrozen@att.net",
"darwin31@ucla.edu",
"lipsey.matt@yahoo.com",
"neel1027@ucla.edu",
"evangelista.ashley@gmail.com",
"chavez.frank11@yahoo.com",
"willemvdb7@ucla.edu",
"meralarik@yahoo.com",
"charisseyeh@ucla.edu",
"al.navarro14@gmail.com",
"jinganghe@ucla.edu",
"gomez_viviana10@yahoo.com",
"amandakhoskinson@gmail.com",
"eeshaxo01@gmail.com",
"ortizgabriel3@gmail.com",
"samir@uguru.me",
"jf2014@hotmail.com",
"vhuey@ucla.edu",
"monicanable@ucla.edu",
"samir@uguru.me",
"gabriela.forter7@gmail.com",
"allenwbw@ucla.edu",
"sahirrsethhi@gmail.com",
"robertjprataii@g.ucla.edu",
"emilyfchin@gmail.com",
"shelbtal@ucla.edu",
"jjbuck95@ucla.edu",
"jmiller1294@hotmail.com",
"vivisainz@ucla.edu",
"anegrete@ucla.edu",
"bjudoprasetijo@ucla.edu",
"dbk95@g.ucla.edu",
"jenniferl@mednet.ucla.edu",
"alejandro5704@sbcglobal.net",
"jaahnavee96@ucla.edu",
"dkanzler@ucla.edu",
"afaucher@ucla.edu",
"ccollet@ucla.edu",
"ibock96@gmail.com",
"scutrow@gmail.com",
"rahul.malavalli@gmail.com",
"richardcho1982@gmail.com",
"msong@mednet.ucla.edu",
"jquach123@g.ucla.edu",
"yuanjonathan@gmail.com",
"justinkahng@gmail.com",
"anjuislam@yahoo.com",
"krispark29@gmail.com",
"performerssw@ucla.edu",
"gia.alas07@gmail.com",
"jacksonlong96@gmail.com",
"mattbruin@g.ucla.edu",
"pdasari09@gmail.com",
"udamann010@ucla.edu",
"josephkoh24@gmail.com",
"dnguyen@finance.ucla.edu",
"slmedina@mednet.ucla.edu",
"evelyntao@ucla.edu",
"ym.komuro@gmail.com",
"melissa_jo28@outlook.com",
"ishitatyagi14@gmail.com",
"beckyzhen1996@yahoo.com",
"ydeleon@mednet.ucla.edu",
"aapatel@ucla.edu",
"abeker217@ucla.edu",
"lingchang94@ucla.edu",
"kris10pojunis@ucla.edu",
"autumnlov13@gmail.com",
"lhurtadojr@gmail.com",
"diem_can@yahoo.com",
"denessestoopsp.0@gmail.com",
"kelvinchengbob3@yahoo.com",
"brenda.gutierrez96@hotmail.com",
"abrampaul@ucla.edu",
"broth61@ucla.edu",
"shunkurosakisk@gmail.com",
"marfriaz@gmail.com",
"dongwei@ucla.edu",
"omarzaki@ucla.edu",
"gharvey1@ucla.edu",
"glianalano@gmail.com",
"j.mireshghi@gmail.com",
"juliana.logan95@gmail.com",
"jessica0918ng@aol.com",
"hoyoul0212@hotmail.com",
"amy.thein@hotmail.com",
"paavni9@yahoo.com",
"duke930@comcast.net",
"marisol.mara.martinez@gmail.com",
"danielwcoles@gmail.com",
"hanto@ucla.edu",
"rgadilov@hotmail.com",
"mattjpak@gmail.com",
"agapakieva@gmail.com",
"elym53@yahoo.com",
"gage.lemunyan@gmail.com",
"kliu92@ucla.edu",
"sichuan.04@gmail.com",
"ccapistran92@gmail.com",
"peterbclee@gmail.com",
"brittanybrogan13@gmail.com",
"brandon4corrales@gmail.com",
"matthewpham@ucla.edu",
"jncb07@ucla.edu",
"hilaryphan@att.net",
"amacfarlane@ucla.edu",
"kliu92@ucla.edu",
"torres.alisia@gmail.com",
"taylor.rafii@gmail.com",
"madisondowning2@gmail.com",
"dahliaalamy123@gmail.com",
"j.mireshghi@gmail.com",
"lydiakwon@ucla.edu",
"jessew932@gmail.com",
"rohniewi@live.com",
"rodriguezvictor.2013@yahoo.com",
"snsedaghat@gmail.com",
"kimyabut1@yahoo.com",
"aliraziz1995@ucla.edu",
"anika.yoo@gmail.com",
"veronica1120@ucla.edu",
"zhangzx0523@gmail.com",
"lzhang@dentistry.ucla.edu",
"lydiazenaye@g.ucla.edu",
"swennberg@ucla.edu",
"jhodson@ucla.edu",
"dgchong@mednet.ucla.edu",
"joshalcantara@ucla.edu",
"matthewdragotto@gmail.com",
"gao.leland@gmail.com",
"hguilas@ucla.edu",
"mflores529@ucla.edu",
"thannan@ucla.edu",
"jasmine.mir@berkeley.edu",
"shyamsuram@ucla.edu",
"sanyam.grewal@gmail.com",
"nickhsieh@ucla.edu",
"tiffanysabbah@ucla.edu",
"heathert116@gmail.com",
"jasmine.mir@berkeley.edu",
"rstephanie2014@g.ucla.edu",
"malpert@ucla.edu",
"drew.lee@ucla.edu",
"erinkhayes@ucla.edu",
"stewart_jessica14@yahoo.com",
"katknight33@yahoo.com",
"vtommynguyen@gmail.com",
"amandaqphan23@gmail.com",
"saritrathbone@gmail.com",
"meghanmichelle2@gmail.com",
"chkellenberger@ucla.edu",
"susanbean@ucla.edu",
"robertneivert@gmail.com",
"hanakimberly@hotmail.com",
"jenl144@aol.com",
"sofiaa42896@gmail.com",
"juliamiller96@ucla.edu",
"shunkurosakisk@gmail.com",
"vanvooren.allison@gmail.com",
"cameron.white49@gmail.com",
"kathybui1@ucla.edu",
"amartinez96@ucla.edu",
"tuonganh08@g.ucla.edu",
"aceetienne@gmail.com",
"mhopkins2106@ucla.edu",
"xenialevitski@gmail.com",
"nikkiesingh@ucla.edu",
"rubinm5@aol.com",
"kennethtanzhuang@yahoo.com",
"ayannamcknight336@gmail.com",
"j.mireshghi@gmail.com",
"aawu@ucla.edu",
"hbadalyan@ucla.edu",
"sajsanghvi@gmail.com",
"jeffrey1994usa@yahoo.com",
"mbanducci@mednet.ucla.edu",
"nquijada@ucla.edu",
"zacharyjayson@gmail.com",
"akeshan@ucla.edu",
"roni.yamane@gmail.com",
"amberlygm@yahoo.com",
"thekevinlinwu@ucla.edu",
"lindsaycamerik@ucla.edu",
"danguyen@mednet.ucla.edu",
"sriya_gukal@hotmail.com",
"jnliu5@gmail.com",
"snijhar96@ucla.edu",
"alexduong@ucla.edu",
"vpha1834@ucla.edu",
"sophieclee@ucla.edu",
"hector.rosete@ymail.com",
"dheikali96@ucla.edu",
"allen@jsei.ucla.edu",
"krsr17@gmail.com",
"sandranguyen040@gmail.com",
"tchun814@ucla.edu",
"veronica@mitrachefamily.us",
"rachel.paul220@gmail.com",
"blipdh@ucla.edu",
"ronnievince96@aol.com",
"jorgebarrio96@gmail.com",
"jc.heavens@gmail.com",
"anthonytrinh20@gmail.com",
"lgallagher18@ucla.edu",
"brianclui@ucla.edu",
"mrgcollege@outlook.com",
"kalexand@saonet.ucla.edu",
"chelseatuohy@yahoo.com",
"arsha.zakir@gmail.com",
"paulina.y.lei@gmail.com",
"gaurav.lalsinghani@gmail.com",
"darryltan@ucla.edu",
"jessejuarez95@gmail.com",
"valeriesommer@ucla.edu",
"alanadeblase@hotmail.com",
"clairenhenderson@gmail.com",
"spattison@college.ucla.edu",
"johnson.destiny@hotmail.com",
"temporarylove16@gmail.com",
"devinamber@ucla.edu",
"guranshksingh@gmail.com",
"jamika.martin@live.com",
"jporiola@ucla.edu",
"ngomez96@ucla.edu",
"genesis.herrera2212@gmail.com",
"ymin@mednet.ucla.edu",
"mariuspeter.blendux@gmail.com",
"vmoskal@ucla.edu",
"amanolakis@ucla.edu",
"daniel.rios299@gmail.com",
"allison.kimbell@gmail.com",
"dalarm@g.ucla.edu",
"yankfan4213@gmail.com",
"rishabhaggarwal2@gmail.com",
"ruslijason@ucla.edu",
"kevindeng@ucla.edu",
"dereklau33@yahoo.com",
"sabrezhang@gmail.com",
"jonsilva12@g.ucla.edu",
"uyenbui0501@yahoo.com",
"raunakrupani@ucla.edu",
"angelagriffithis@gmail.com",
"shawnlo.me@gmail.com",
"samir@uguru.me",
"kylaj27@gmail.com",
"kbatugo@ucla.edu",
"juanh8990@yahoo.com",
"swkamal@ucla.edu",
"karenchou@ucla.edu",
"mdm10cb@gmail.com",
"jiyoungbak@g.ucla.edu",
"aabramoff@ucla.edu",
"btkim@mednet.ucla.edu",
"smchiang@g.ucla.edu",
"estherk62@gmail.com",
"dantelunamusic@gmail.com",
"mvarzan96@gmail.com",
"dyemane@ucla.edu",
"astridpao@ucla.edu",
"anderson.laurajane@gmail.com",
"olafteitell@gmail.com",
"calvinnguyenv@gmail.com",
"syedvaqarvsyed@gmail.com",
"melanieblume@outlook.com",
"oanderson@ucla.edu",
"matthewc.cummins@yahoo.com",
"jstelmar@ucla.edu",
"j.mireshghi@gmail.com",
"wolfe.sophia@gmail.com",
"decamp.kyle@gmail.com",
"justinkahng@gmail.com",
"jameshackettlittle@gmail.com",
"khriscor2008@gmail.com",
"astemoi@ucla.edu",
"elliotcherkas@gmail.com",
"ethancl1995@ucla.edu",
"corona.omar94@gmail.com",
"csayani116@ucla.edu",
"alexyessayantz@g.ucla.edu",
"wagnergreta@yahoo.com",
"dimitrama@sbcglobal.net",
"lucy.allard@anderson.ucla.edu",
"j.mireshghi@gmail.com",
"hchen@mednet.ucla.edu",
"mgong312@ucla.edu",
"camposbriana135@yahoo.com",
"jasmine.mir@berkeley.edu",
"alexxxf123@gmail.com",
"ishig@ucla.edu",
"rbzeih865@gmail.com",
"vjuaner@research.ucla.edu",
"alizalevin28@gmail.com",
"kiana.n26@gmail.com",
"pjsn1996@gmail.com",
"carlinstou@gmail.com",
"karashin@ucla.edu",
"forino.sophia@gmail.com",
"kristenyp@hotmail.com",
"khoinguyen1518@ucla.edu",
"cindymiao@ucla.edu",
"sanjana-sp@hotmail.com",
"kzhang719@ucla.edu",
"rnpatil@ucla.edu",
"oleidi.gaitan@gmail.com",
"agerdts95@yahoo.com",
"xmhe@ucla.edu",
"mackenzie.lindsey.lighterink@gmail.com",
"ljk951225@163.com",
"matt.kercheval@gmail.com",
"jasmine.mir@berkeley.edu",
"brianavigil@ucla.edu",
"ocheung9@ucla.edu",
"trevor_takemoto@yahoo.com",
"maxhimmelrich@gmail.com",
"vsrhee@hotmail.com",
"cassidycarroll@ucla.edu",
"jamesalexander1954@yahoo.com",
"shreedhamija@gmail.com",
"zbeauchamp@ucla.edu",
"alexandrasb@ucla.edu",
"armourkate@ucla.edu",
"larcauwels@ymail.com",
"khanmuryam@yahoo.com",
"sewcheer@gmail.com",
"alexgentry8@gmail.com",
"vbailey@math.ucla.edu",
"anniejoo@gmail.com",
"lyndsea@ucla.edu",
"henrydegroot95@gmail.com",
"tannerwalters@ucla.edu",
"skphu@ucla.edu",
"victorwang143@ucla.edu",
"dmiranda18@ucla.edu",
"bush2016@lawnet.ucla.edu",
"melodie.butz@gmail.com",
"komock@sbcglobal.net",
"japhan@ucla.edu",
"sonul_g@yahoo.com",
"nicolettesham@yahoo.com",
"cgianvecchio@ucla.edu",
"jnaptl1@gmail.com",
"mnazareno13@yahoo.com",
"mohiniv96@ucla.edu",
"alessandrozulli9@gmail.com",
"tylerleung135@gmail.com",
"diazliliana2014@yahoo.com",
"raymond.huang@anderson.ucla.edu",
"adarsh111@hotmail.com",
"lindsayallen@ucla.edu",
"sleegolden@ucla.edu",
"ciarajg@yahoo.com",
"athatcher@ucla.edu",
"maandrews815@g.ucla.edu",
"cmwmoises@yahoo.com",
"sarafranks@ucla.edu",
"ryanallen@ucla.edu",
"rohanneilkapoor@gmail.com",
"geena.zhou@gmail.com",
"arianataghaddos@gmail.com",
"clcaffrey@ucla.edu",
"j.mireshghi@gmail.com",
"idrees.bernard@yahoo.com",
"scatfisch@gmail.com",
"tryannabelle@gmail.com",
"kevindong4@gmail.com",
"fbainou@ucla.edu",
"jnaptl1@gmail.com",
"xiaoyaobaike@gmail.com",
"kzhang719@ucla.edu",
"davidcox@ucla.edu",
"emilykchuang@gmail.com",
"kohkj8895@gmail.com",
"summerwang95@gmail.com",
"rulasamad@gmail.com",
"kimberlytran548@gmail.com",
"kamayani.gaur5@gmail.com",
"mjosephiine25@yahoo.com",
"rgbrown@mednet.ucla.edu",
"j.mireshghi@gmail.com",
"hollyfletcher11@gmail.com",
"jaredneutel@yahoo.com",
"lindsay.farewell@yahoo.com",
"isabel.whelan@gmail.com",
"joannaylchen@ucla.edu",
"blairbryant.nichols@gmail.com",
"fungbryan@ucla.edu",
"bennetladyman@gmail.com",
"ivo@ucla.edu",
"yeherick@gmail.com",
"bruinshane94@gmail.com",
"luke@lukefindlay.com",
"antoniox39@gmail.com",
"avtruong14@gmail.com",
"jasmine.mir@berkeley.edu",
"euniceshin16@gmail.com",
"schenxd@gmail.com",
"jcushingmurray@ucla.edu",
"liatbainvoll@gmail.com",
"colinchwang@gmail.com",
"dermotn@ucla.edu",
"pamelalim@ucla.edu",
"kimsvatos@ucla.edu",
"eddieviolinkang@ucla.edu",
"j.mireshghi@gmail.com",
"nguyen_michelle13@yahoo.com",
"gabedurkin@gmail.com",
"jasmine.mir@berkeley.edu",
"joon3142@hotmail.com",
"jzhang1996@ucla.edu",
"broot@ucla.edu",
"george.brogmus@libertymutual.com",
"melodychengg@gmail.com",
"noorielb@live.com",
"limaalex95@gmail.com",
"saba.786@hotmail.com",
"dhickman1996@gmail.com",
"ryan.bahadursingh@yahoo.com",
"mjeon121@ucla.edu",
"cvartany@hotmail.com",
"elchicojesusito@g.ucla.edu",
"anthonyphansj@gmail.com",
"ryanjlouie@ucla.edu",
"ajboddu@yahoo.com",
"cphillips506@gmail.com",
"gezer_d@yahoo.com",
"erickim555@gmail.com",
"sarahjmacpherson2014@gmail.com",
"kokka28345@ucla.edu",
"katmaglunob@yahoo.com",
"chiang626@gmail.com",
"sochimaezechukwu@yahoo.com",
"alyssawarth@yahoo.com",
"christinabtran@gmail.com",
"andrew33323@ucla.edu",
"swamy18@ucla.edu",
"austinjchase@ucla.edu",
"deannalam@ucla.edu",
"tyleronodera@gmail.com",
"kalyce.rogers57@gmail.com",
"nancygbecerra@yahoo.com",
"mjlockhart21@gmail.com",
"jkovsky@ucla.edu",
"crownpumping1@gmail.com",
"samir@uguru.me",
"kristenmelia@comcast.net",
"grodd55@ucla.edu",
"armanafghani@gmail.com",
"karinapatel@sbcglobal.net",
"kimberlygoodwin60@gmail.com",
"yvchen@ucla.edu",
"dannyw747@yahoo.com",
"zacbianchi@gmail.com",
"chamikad@sbcglobal.net",
"chandini.soni96@gmail.com",
"loganwalker07@yahoo.com",
"yaelbreziner@gmail.com",
"arimer@ucla.edu",
"cindygfdz@gmail.com",
"dinguyen@ashe.ucla.edu",
"meisanly@yahoo.com",
"jasmine.mir@berkeley.edu",
"chiangv@g.ucla.edu",
"dan_begazo@yahoo.com",
"jordanabatti@yahoo.com",
"mardehalli@ucla.edu",
"sublex@live.com",
"samgarcia@ucla.edu",
"gabriel.flores.721@gmail.com",
"ashleepenn@g.ucla.edu",
"jkmsmith33@ucla.edu",
"clee1688@ucla.edu",
"dam.cody@gmail.com",
"tallmendoza@gmail.com",
"wenchy1996@gmail.com",
"nataliadflevy@gmail.com",
"zhao.julia@gmail.com",
"scottyjarvis@ucla.edu",
"albertmartinez@ucla.edu",
"yxp0507@ucla.edu",
"lmuzzio@ucla.edu",
"lguillen7@ucla.edu",
"snidugondi@ucla.edu",
"kevinyip96@gmail.com",
"ryanrogero@gmail.com",
"nbrinck@ucla.edu",
"aredmond@ucla.edu",
"jason2013066@gmail.com",
"srkersse@yahoo.com",
"vannicaashley@g.ucla.edu",
"emmaspellman@ucla.edu",
"garcia.kenia99@gmail.com",
"shanemikestrauss@gmail.com",
"lbarreyro@ucla.edu",
"yushihe@g.ucla.edu",
"shumingwang26@hotmail.com",
"vivalareeva@aol.com",
"joyvanhasselt@ucla.edu",
"jasmine.mir@berkeley.edu",
"taylorhobbs13@gmail.com",
"katrinashaan@ucla.edu",
"eabrennan@ucla.edu",
"markreplogle883@ucla.edu",
"pratik.malshe@gmail.com",
"jpepegc@ucla.edu",
"michellemolouk@ucla.edu",
"rsysiong@ucla.edu",
"damini.kusum@gmail.com",
"ccrinion@ucla.edu",
"jasonmlurie@gmail.com",
"asancheznunez@ucla.edu",
"alannguyen1013@gmail.com",
"echung95@ucla.edu",
"jewu19930330@gmail.com",
"madison.paigee@gmail.com",
"emilymchan@ucla.edu",
"dominicpardini@gmail.com",
"egarcia@ece.ucla.edu",
"marcelcalder@gmail.com",
"irishdancer96@gmail.com",
"marihana71@ucla.edu",
"mfchang@ee.ucla.edu",
"jafisher95@gmail.com",
"sisi2721@hotmail.com",
"jessicaskapik1996@yahoo.com",
"araceli30hdz@gmail.com",
"renephan17@gmail.com",
"sudiksha.dhoot@gmail.com",
"hayleyannhaag@gmail.com",
"mvaughn815@ucla.edu",
"ruttamchandani@g.ucla.edu",
"danpatel21@gmail.com",
"hasurmei@ucla.edu",
"salamha@ucla.edu",
"bentleys226@ucla.edu",
"rosalindjchang@gmail.com",
"andreashhs@ucla.edu",
"sulagna@ucla.edu",
"dishas@ucla.edu",
"joanhanawi@ucla.edu",
"amberywon@yahoo.com",
"amberlybark@gmail.com",
"zahraa@ucla.edu",
"sastewart@mednet.ucla.edu",
"vhuey@ucla.edu",
"djungg0630@gmail.com",
"amydbkim@ucla.edu",
"angelinawei@ucla.edu",
"vaibhav.bhatia8@hotmail.com",
"samir@uguru.me",
"alevine@chem.ucla.edu",
"jwang8261@gmail.com",
"msaq.saad@gmail.com",
"dwijesh.nambiar@gmail.com",
"slkisner1995@ucla.edu",
"peterbclee@gmail.com",
"maxrnath@ucla.edu",
"cydneyamartinez@gmail.com",
"kskcprod@gmail.com",
"jasonleehirose@gmail.com",
"cyrus.seyedan@yahoo.com",
"toledocindy9@gmail.com",
"gilbertk7@yahoo.com",
"ditacordelia@gmail.com",
"lisasitu@ucla.edu",
"dhami.tailor23@gmail.com",
"baileymgreene@ucla.edu",
"adrianaselena14@gmail.com",
"tnaqvi23@gmail.com",
"arpan322@yahoo.com",
"isaackim1122@yahoo.com",
"cchirata@ucla.edu",
"ryylo1996@gmail.com",
"pkdwane@gmail.com",
"csasmor96@gmail.com",
"alexa2.rivera23@yahoo.com",
"ronnelaziz@ucla.edu",
"kdalexander@mednet.ucla.edu",
"jillian.frankel@gmail.com",
"trentonjolly@gmail.com",
"vishal.tummala@gmail.com",
"jimmycwu@ucla.edu",
"ceciliachoi95@yahoo.com",
"andretsivis@yahoo.com",
"norman.m.spivak@ucla.edu",
"nicolenicholsonn@aol.com",
"melissa.chen@ucla.edu",
"rebecca.cannara@gmail.com",
"jasmine.mir@berkeley.edu",
"chenat@ucla.edu",
"chunter3654@gmail.com",
"sabinali@ucla.edu",
"jaliu@mednet.ucla.edu",
"nadiasiddiqah@yahoo.com",
"jabrilmuhammad2@gmail.com",
"ashleigh.jeannicole@yahoo.com",
"powelson.chris@yahoo.com",
"shammirkhan@yahoo.com",
"jiangyntz@gmail.com",
"markgrace95@g.ucla.edu",
"carloscon10@ucla.edu",
"deyaa.adam@gmail.com",
"becca.m.huang@gmail.com",
"j.mireshghi@gmail.com",
"nicoleguffy13@ucla.edu",
"ling.lawrence@gmail.com",
"hdscholar@gmail.com",
"nicolescotten@hotmail.com",
"bowerman.brandon@gmail.com",
"minkyupark0604@gmail.com",
"gonzalez.gonzalez.steph@gmail.com",
"puja1bhakta@yahoo.com",
"marktai@ucla.edu",
"christinazakarian@gmail.com"]


from app.emails import send_campaign_email
from app.models import *
recipient = Recipient()
recipient.first_name = "Samir"
recipient.last_name = "Makhani"
recipient.email = "makhani.samir@gmail.com"
options = {
    "campaign_name": "UCLA Batch 5",
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
def send_test_batch(first_name, email):
    recipient = Recipient()
    recipient.first_name = first_name
    recipient.email = email
    options = {
        "campaign_name": "TEST",
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
def send_test_batch(first_name, email):
    recipient = Recipient()
    recipient.first_name = first_name
    recipient.email = email
    options = {
        "campaign_name": "TEST",
        "template_name": "Hey *|FNAME|*",
        "subject": "Hey *|FNAME|*",
        "sender_email": "jasmine@uguru.me",
        "reply_to_email": "jasmine@uguru.me",
        "sender_title": "Jasmine",
        "track_opens_flag": True,
        "track_clicks_flag": False,
        "important_flag": True,
    }
    send_campaign_email(options, [recipient])


def send_batch_7(recipients_arr):
    recipients = []
    for r in recipients_arr:
        recipient = Recipient()
        recipient.first_name = r['first_name']
        recipient.email = r['email']
        recipients.append(recipient)
    options = {
        "campaign_name": "UCLA Batch 7",
        "template_name": "Hey *|FNAME|*, I've got a question for you",
        "subject": "Hey *|FNAME|*, I've got a question for you",
        "sender_email": "jasmine@uguru.me",
        "reply_to_email": "jasmine@uguru.me",
        "sender_title": "Jasmine",
        "track_opens_flag": True,
        "track_clicks_flag": False,
        "important_flag": True,
    }
    send_campaign_email(options, recipients)

def send_batch_8(recipients_arr):
    recipients = []
    for r in recipients_arr:
        recipient = Recipient()
        recipient.first_name = r['first_name']
        recipient.email = r['email']
        recipients.append(recipient)
    options = {
        "campaign_name": "UCLA Batch 8",
        "template_name": "Hey *|FNAME|*",
        "subject": "Hey *|FNAME|*",
        "sender_email": "jasmine@uguru.me",
        "reply_to_email": "jasmine@uguru.me",
        "sender_title": "Jasmine",
        "track_opens_flag": True,
        "track_clicks_flag": False,
        "important_flag": True,
    }
    send_campaign_email(options, recipients)


f = open('data_ucla.json')
ucla_arr = json.load(f)
process_arr = []
already_sent_count = 0
index = 1
for d in ucla_arr2:
    new_d = {}
    new_d["email"] = d["email"].lower()
    new_d["first_name"] = d["name"].replace(",","").split(" ")[1].title()
    if new_d["email"] in already_sent:
        already_sent_count += 1
    else:
        process_arr.append(new_d)
    index += 1






batch_6_arr = process_arr[500:750]
batch_7_arr = process_arr[750:1000]


import json
from app.models import *
from app.emails import send_campaign_email
f = open('ucla_already_sent.json')
f2 = open('ucla_popular.json')
already_sent = json.load(f)
fb_arr = json.load(f2)
new_students = []
for student in fb_arr:
    if student.get('email') and student['email'].lower() not in already_sent:
        new_students.append(student)

processed_arr = []
for student in new_students[1500:2000]:
    r = Recipient()
    r.first_name = student['name'].split(' ')[1].title()
    r.email = student['email']
    print r.first_name, r.email
    processed_arr.append(r)

r = Recipient
r.first_name = 'Jasmine'
r.email = 'jasmine@uguru.me'
test_recipients = [r]

send_campaign_email('UCLA Batch 13', 'Hey *|FNAME|*',
    'Hey *|FNAME|*', 'jasmine@uguru.me', 'jasmine@uguru.me', 'Jasmine', 
    True, True, True, processed_arr)

send_campaign_email('UCLA Batch 13', 'Hey *|FNAME|*',
    'Hey *|FNAME|*', 'jasmine@uguru.me', 'jasmine@uguru.me', 'Jasmine', 
    True, True, True, test_recipients)
