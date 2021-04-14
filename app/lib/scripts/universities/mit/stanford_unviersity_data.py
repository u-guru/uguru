import json, requests
from bs4 import BeautifulSoup

output = 'mit_data.json'
output_array = []
name_array = ['michael']
for names in name_array:
	url = 'http://web.mit.edu/bin/cgicso?options=general&query='+names
	soup = BeautifulSoup(requests.get(url).text)
	nested_url = soup.findAll('pre')
	for name in nested_url:
		name_info = name.findAll('a')
		for nested_url_1 in name_info:
			get_me_href = "http://web.mit.edu/"+nested_url_1['href']
			soup_1 = BeautifulSoup(requests.get(get_me_href).text)
			secondary_option = soup_1.findAll('pre')
			for emails in secondary_option:
				email = emails.findAll('a')
				for detailed_email in email:
					stanford_univeristy = {}
					stanford_univeristy['Email'] = detailed_email['href'].replace('mailto:','')
					output_array.append(stanford_univeristy)

				with open(output,'wb') as outfile:
					json.dump(output_array,outfile,indent = 4)

