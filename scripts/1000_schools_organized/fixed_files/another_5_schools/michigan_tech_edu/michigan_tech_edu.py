import requests,json,time
from bs4 import BeautifulSoup
from mailgun import*
names_arr = ['Ben']
huge_arr = []
for names in names_arr:
	url = 'https://www.mtu.edu/mtuldapweb/ldaprest-api/search.cgi?function=uiapi&p=,name,contains,'+names
	requests = requests.get(url).text
	json_load = json.loads(requests)
	for store_info in json_load:
		dictionary = {}
		dictionary['name'] = store_info['Name']
		dictionary['email'] = store_info['Email Address']
		huge_arr.append(dictionary)
	with open('michigan_tech_edu.json','wb') as outfile:
		json.dump(huge_arr,outfile,indent=4)
	add_students_to_mailing_list('Michigan Technological University',huge_arr)
	get_all_university_progress()