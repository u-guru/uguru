import requests,json
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

file1 = open('tutors.json') 
file2 = open('uc_southern_cali.json')
data_1 = json.load(file1)['data']
data_2 = json.load(file2)
exact_matches = []
partial_matches = []
first_name_matches_only = [] 


output = 'directory_tutors.json'
for data_1_info, data_2_info in zip(data_1,data_2):
	parsed_1 = data_1_info['name'].lower()
	last_name = data_2_info['name'].split(',')[0].lower()
	first_name = data_2_info['name'].split(',')[-1].lower().strip()
	parsed_2 = first_name.replace('\n','') +' ' + last_name.replace('\n','').lower()
	if parsed_1 == parsed_2:
		exact_matches.append(data_2_info)
	first_name_1 = parsed_1.split(' ')[0]
	last_name_1 = parsed_1.split(' ')[0]
	if parsed_1 == parsed_2: ## FULL_NAME
		exact_matches.append(data_2_info)
	if first_name_1 == first_name: ## FIRST_NAME
		first_name_matches_only.append(data_2_info)		
	try:
		last_name_initial_1 = last_name_1[0] #LAST_NAME_INITIAL
		last_name_initial_2 = last_name.strip()[0]
		par_match = {}
		if last_name_initial_1 == last_name_initial_2:
			par_match['data'] = data_2_info
			partial_matches.append(data_2_info)
		lenght_info = {}
		lenght_info['total_count'] = len(partial_matches)

	except IndexError:
		continue
	empty_dict = {}
	empty_dict['exact_matches'] = exact_matches
	empty_dict['partial_matches'] = partial_matches,lenght_info
	empty_dict['first_name_matches_only'] = first_name_matches_only
	empty_dict['school_id'] = '2318'
	empty_dict['description'] = 'Tutors for UC Southern California comparing 2 json files(tutors,school_directory)'	
	with open('school_directory_matches.json','wb') as outfile:
		json.dump(empty_dict,outfile,indent=4)	



