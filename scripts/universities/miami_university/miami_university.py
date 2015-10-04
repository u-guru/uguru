import requests, json
from bs4 import BeautifulSoup

output = 'georgia_tech_output.json'
array = []
array_names = ['ben']

for name in array_names:
	url = 'https://community.miamioh.edu/phpapps/directory/?query_type=simple&query_operator=&query_filter_type=people&query_string='+name+'&run_query=Search'
	soup = BeautifulSoup(requests.post(url).text)
	main_wrapper = soup.findAll('div', attrs = {'id':'result_list_container'})
	for wrapper in main_wrapper:
		wrapper_first = wrapper.findAll('p')
		for wrapper_email in wrapper_first:
			email_a_link = wrapper_email.findAll('a')
			for email in email_a_link:
				email_info = 'https://community.miamioh.edu/phpapps/directory/'+ email['href']
				second_soup = BeautifulSoup(requests.get(email_info).text)
				second_main_wrapper = second_soup.findAll('div', attrs = {'class':'entry_table'})
				for second_email in second_main_wrapper:
					second_email_info = second_email.findAll('td', attrs = {'class':'attribute_value'})
					for email_info in second_email_info:
						email = email_info.findAll('p')[0]
						print email