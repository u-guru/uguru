import json
import requests
from bs4 import BeautifulSoup


huge_huge_array = []
format_json_file = {}
with open('uc_name.json') as data_file:
	load_file = json.load(data_file)
	for school_name in load_file:
		array = []
		query = school_name['name']
		url = 'https://www.google.com/search?site=&source=hp&q='+query+'Tutors'

		soup = BeautifulSoup(requests.get(url).text)
		main_wrapper = soup.findAll('div',attrs = {'id':'search'})
		for h3_wrapper in main_wrapper:
			title_first_five_h3 = h3_wrapper.findAll('h3')[:5]
			description_first_five_div = h3_wrapper.findAll('div', attrs = {'class':'s'})[:5]
			for title_text, description_first_five_div_text in zip(title_first_five_h3,description_first_five_div):
				empty_dict  = {}
				empty_dict['title'] = title_text.text.replace('\u2013','').strip()
				empty_dict['description'] = description_first_five_div_text.text.replace('\u2013','').replace('\n','').replace('\u','').encode('ascii', 'ignore').strip()
				array.append(empty_dict)
		format_dict = {}		
		format_dict[query]=array
		huge_huge_array.append(format_dict)		
		another_dict = {}
		another_dict['schools'] = huge_huge_array	
		with open('school_names.json','wb') as outfile:
			json.dump(another_dict,outfile,indent=4)
	