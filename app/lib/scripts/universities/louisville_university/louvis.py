import json, requests
from bs4 import BeautifulSoup

output = 'louisville_output_data.json'
array = []
names_array = ['ben']
for names in names_array:
	url = 'http://louisville.edu/directory/index.php?query='+names
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('div',attrs = {'id':'content'})
	for wrapper in main_wrapper:
		wrapper_info = wrapper.findAll('div', attrs = {'id':'resultData'})
		for wrapper_second_info in wrapper_info:
			email = wrapper_second_info.findAll('a')
			for email_depth in email:
				email_information = email_depth['href']
				second_soup = BeautifulSoup(requests.get(email_information).text)
				second_main_wrapper = second_soup.findAll('div',attrs = {'id':'resultData'})
				for second_email in second_main_wrapper:
					email = second_email.findAll('div',attrs = {'class':'set'})
					for labels in email:
						labels_info = labels.findAll('label')
						for labels_cool_info in labels_info:

							if labels_cool_info.text == "Email:":
								email_dict  = {}
								email_dict['email_wrapper'] = labels.find('span').text
								array.append(email_dict)
							else:
								break
						with open(output, 'wb') as outfile:
							json.dump(array,outfile,indent = 4)