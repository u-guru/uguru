import requests,json
from bs4 import BeautifulSoup
from mailgun import *


name_arr = ['michael']
huge_array = []
#dictionary = {}
output = 'james_madison_data_output.json'
for names in name_arr:
	base_url = 'https://www.jmu.edu/cgi-bin/peoplestudentcms?pattern='+names
	requests = BeautifulSoup(requests.get(base_url).text)
	main_wrapper = requests.findAll('table', attrs = {'id':'names'})
	
	for wrapper in main_wrapper:
		dictionary = {}
		a_link = wrapper.findAll('a')
		for info in a_link:
			href = info['href']
			if "mailto:" in href:
				dictionary['email'] = info.text
			else:
				dictionary['name'] = info.text.title()
				dictionary['first_name'] = info.text.split(' ')[0].title()
				dictionary['last_name'] = info.text.split(' ')[-1].title()
				huge_array.append(dictionary)
				add_students_to_mailing_list("James Madison University", huge_array)
with open(output, 'wb') as outfile:
	json.dump(huge_array,outfile,indent =4)