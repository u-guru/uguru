import json, requests
from bs4 import BeautifulSoup

output = 'smith_college_data.json'
array = []
array_names = ['ben']
for names in array_names:
	url = 'http://www.smith.edu/global_campusdirectory.php?name='+names+'&department=&do_search=Search'
	soup = BeautifulSoup(requests.get(url).text)
 	main_wrapper = soup.findAll('table')
 	for wrapper in main_wrapper:
 		second_wrapper = wrapper.findAll('tr', attrs = {'class':'TemplateBContactInfo'})
 		for a_link in second_wrapper:
 			a_link_info = a_link.findAll('a')
 			for href in a_link_info:
 				email = href['href'].split('?subject=Contacting you via the Smith College online directory')
 				for formatted_email in email:
 					
 					splitted_email = formatted_email.split('mailto:')
 					if splitted_email:

	 					dict_email = {}
	 					dict_email['email'] = splitted_email
	 					array.append(dict_email)

				with open(output,'wb') as outfile:
					json.dump(array,outfile,indent = 4)
