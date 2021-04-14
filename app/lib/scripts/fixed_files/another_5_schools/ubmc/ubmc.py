import requests,json,time

from bs4 import BeautifulSoup
names_arr = ['Ben']
huge_arr = []
for names in names_arr:
	url = 'http://www.umbc.edu/search/directory/?search='+names
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.find('div', attrs = {'id':'results'})
	each_loop_hole = main_wrapper.findAll('div', attrs = {'class':'person'})
	for store_info in each_loop_hole:
		name = store_info.findAll('div', attrs = {'class':'name'})
		email = store_info.findAll('div', attrs = {'class':'email'})
		for name_text,email_text in zip(name,email):
			dictionary = {}
			dictionary['name'] = name_text.text
			dictionary['email'] = email_text.text
			huge_arr.append(dictionary)
		with open('ubmc_output.json','wb') as outfile:
			json.dump(huge_arr,outfile,indent=4)