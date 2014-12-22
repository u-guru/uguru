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