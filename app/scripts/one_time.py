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
    if int(u['population'].replace(',','')) > 20000 and int(u['forbes_rank']) < 100:
        print u['name'], u['forbes_rank'], u['population']






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
        no_gps_uni.append(uni)

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





        
        
