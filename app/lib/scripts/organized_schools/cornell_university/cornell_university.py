import requests, json
from bs4 import BeautifulSoup

huge_arr = []
names_arr = ['Ben']
for names in names_arr:
	url = 'https://www.cornell.edu/search/people.cfm?q='+names
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('table', attrs = {'class':'results cu-table'})
	for wrapper in main_wrapper:
		name_link = wrapper.findAll('td', attrs = {'class':'name'})
		for name_link_a in name_link:
			a_link = name_link_a.findAll('a')
			for href in a_link:
				second_soup_url =  "https://www.cornell.edu/search/" +  href['href']
				second_soup = BeautifulSoup(requests.get(second_soup_url).text)
				name = second_soup.findAll('div', attrs = {'id':'peoplename'})
				email = second_soup.findAll('table', attrs = {'id':'generalinfo'})
				for name_text, email_text in zip(name,email):
					dictionary = {}
					dictionary['name'] = name_text.text
					dictionary['email']= email_text.find('a').string
					huge_arr.append(dictionary)
				with open('cornell_college_data.json','wb') as outfile:
					json.dump(huge_arr,outfile,indent =4)