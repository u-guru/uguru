import requests, json
from bs4 import BeautifulSoup

names_arr = ['Ben']
huge_arr = []
for names in names_arr:
	params = {'pageID':'1','mode':'search','SESS':'','firstname':'Michael','lastname':'','emailaddress':'','dept':''}

	soup = BeautifulSoup(requests.post('http://www.southeastern.edu/search/people/index.php',params).text)
	main_wrapper = soup.find('table', attrs = {'class':'table table-striped paginated'})
	trs = main_wrapper.findAll('tr')
	for store_result in trs:
		name = store_result.find('td').next_element.strip()
		email = store_result.find('a').string
		dictionary = {}
		dictionary['name'] = name
		dictionary['email'] = email
		huge_arr.append(dictionary)
	with open('southeaster_college_data.json') as outfile:
		json.dump(huge_arr,outfile,indent=4)
	
		# for name_text,email_text in zip(name,email):
		# 	dictionary = {}
		# 	dictionary['name'] = name_text
		# 	dictionary['email'] = email_text.string
		# 	print dictionary