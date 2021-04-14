from google import *
from collections import Counter
from urlparse import urlparse


first_array = []
# with open('uc_name.json') as uc_name_file:
# 	names_in_file = json.load(uc_name_file)
# 	for school_name in names_in_file:
# 		query = school_name['name']
# 		search_results = Google.search(query +' ' +  "Tutors")
# 		for search_info in search_results:
# 			try:
# 				dictionary = {}
# 				dictionary['title'] = search_info.name
# 				dictionary['link'] = search_info.link
# 				description = search_info.description.encode('ascii', 'ignore').split('Cac')[0]
# 				end_of_the_url_parse = description.split('.')[-1]
# 				end_of_the_url = end_of_the_url_parse.split('/')[0]
# 				beggining_of_the_url = description.split('.')[1]
# 				dictionary['root_domain'] = beggining_of_the_url + '.' + end_of_the_url
# 				dictionary['index#'] = search_info.index
# 				dictionary['school_name'] = query
# 				first_array.append(dictionary)
# 			except AttributeError:
# 				continue
# 		with open('google_search_results.json','wb') as outfile:
# 			json.dump(first_array,outfile,indent=4)



with open('google_search_results.json') as data_file:
	json_data = json.load(data_file)

	append_to_list = []
	school_names_to_list = []
	for each_items in json_data:
		seen = set()
		unique = []
		items = each_items['root_domain']
		school_name = each_items['school_name']
		school_names_to_list.append(school_name)
		append_to_list.append(items)
	lst  = append_to_list
	temp=set(lst)
	result = {}
	for i in temp:
		result[i]=lst.count(i)
	print result	
	output_dictionary = {}
	output_dictionary['data'] = json_data
	output_dictionary['reptition'] = result
	with open('school_file.json','wb') as outfile:
		json.dump(output_dictionary,outfile,indent=4)


