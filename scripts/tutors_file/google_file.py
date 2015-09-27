import json
import requests
from bs4 import BeautifulSoup


huge_huge_array = []
array = []
format_json_file = {}
with open('uc_name.json') as data_file:
	load_file = json.load(data_file)
	for school_name in load_file:
		query = school_name['name']
		url = 'https://www.google.com/search?site=&source=hp&q='+query+'+Tutor'

		soup = BeautifulSoup(requests.get(url).text)
		main_wrapper = soup.findAll('div',attrs = {'id':'search'})
	

		for wrapper in main_wrapper:
			empty_dict = {}
			empty_dict['href'] = wrapper.findAll('a')[5]['href']
			empty_dict['decrption'] = wrapper.findAll('div', attrs = {'class':'s'})[5].text
			array.append(empty_dict)
		with open('google_query.json','wb') as outfile:
			json.dump(array,outfile,indent=4)

