import requests, json
from bs4 import BeautifulSoup

names_array = ['ben']
array = []
output = 'notre_dame_data.json'

for names_info in names_array:
	url = 'https://apps.nd.edu/webdirectory/directory.cfm?specificity=contains&cn='+names_info+'&Submit=Submit'
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('table')
	for wrapper in main_wrapper:
		a_link_wrapper = wrapper.findAll('td', attrs = {'class':'arialc'})
		for href in a_link_wrapper:
			a_link = href.findAll('a')
			for a_link_href in a_link:
				email = "https://apps.nd.edu/webdirectory/"+a_link_href['href']
				second_soup = BeautifulSoup(requests.get(email).text)
				second_main_wrapper = second_soup.findAll('td', attrs = {'class':'arialc'})
				for url_a in second_main_wrapper:
					email = url_a.findAll('a')
					for edu in email:
						href_email = edu['href']
						email_dict = {}
						if "@nd.edu" not in href_email:
							pass
						else:
							email_dict['Email:'] =	href_email.replace('mailto:', ' ')
							array.append(email_dict)
					with open(output,'wb') as outfile:
						json.dump(array,outfile,indent = 4)
