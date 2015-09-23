#!/usr/bin/env python
import tor_client
from bs4 import BeautifulSoup
import json
from fuzzywuzzy import fuzz

output = 'chegg_courses_quarter.json'
url = 'http://www.chegg.com/courses'
schools = []
soup = BeautifulSoup(tor_client.get(url).text)
main_header = soup.find('div', attrs = {'class':'schools-list'}).findAll('li')
with open('quartersystem.json') as json_file:
		parse_data = json.load(json_file)
		for key_value in parse_data:
			parsed_data = key_value['is_quarter']
for school in main_header:
	school_obj = {}
	school_obj['College-Name'] = school.find('span', attrs = {'class':'code'}).text.title()
	fuzzy_ratio = fuzz.partial_ratio(parsed_data, school)
	if fuzzy_ratio >= 70:
		school_obj['is_quarter'] = True
		
		
	schools.append(school_obj)


with open(output, 'w') as outfile:
	json.dump(schools, outfile)