from google import *
from collections import Counter

first_array = []
search_results = Google.search("UC Berkeley Tutors")
for search_info in search_results:
	dictionary = {}
	dictionary['title'] = search_info.name
	dictionary['link'] = search_info.link
	dictionary['description'] = search_info.description
	dictionary['root_domain'] = search_info.description.split('/')[0]
	dictionary['index#'] = search_info.index
	first_array.append(dictionary)
with open('google_search_results.json','wb') as outfile:
	json.dump(first_array,outfile,indent=4)

small_array_count  = []	
c_second_array = [] 


with open('google_search_results.json') as data_file:
	load_data = json.load(data_file)
	c_first_array = []
	new_array = []
	for compare_data in load_data:
		new_data = {}
		counter = compare_data['root_domain']
		c_first_array.append(counter)
		new_dict['counter'] = Counter(c_first_array)
		new_array.append(counter)
		new_data['all_data'] = compare_data
		new_data['counter_info'] = new_array
		c_second_array.append(new_data)
	#c_second_array = []
	with open('non_parsed.json','wb') as outfile:
		json.dump(c_second_array,outfile,indent=4)

# with open('non_parsed.json') as data_file:
# 	load_json_file = json.load(data_file)
# 	for counter in load_json_file:
# 		counter = counter['counter']
# 		for key,value in counter.items():
# 			print key,value
	
