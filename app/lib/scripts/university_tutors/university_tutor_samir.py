import requests,json
from pprint import pprint
from time import sleep
​base_url = 'http://www.universitytutor.com/application/auto_complete_for_region_name?location='
alphabet = 'abcdefghijklmnopqrstuvwxyz'
​
all_cities = []
for letter in alphabet:
    base_url = 'http://www.universitytutor.com/application/auto_complete_for_region_name?location=a&location=b&location=' + letter
    print base_url
    matching_city_objs = json.loads(requests.get(base_url).text)
    all_cities += [city_obj['region']['subdomain'] for city_obj in matching_city_objs]
    sleep(1)
    print "%s + %i cities scraped, %i letters remaining" % (city_obj['region']['subdomain'], len(matching_city_objs), len(alphabet) - alphabet.index(letter))
​
pprint(all_cities)
print (len(all_cities)), 'found'