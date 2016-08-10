import requests, json,re
from bs4 import BeautifulSoup
huge_arr = []
names_arr = ['Ben']
for names in names_arr:
	url = 'http://info.iastate.edu/individuals/search/'+names+'?individual_type=students'
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.find('ul', attrs = {'class':'dir-Listing'})
	url_second = main_wrapper.findAll('a')
	for second_soup in url_second:
		second_url = "http://info.iastate.edu/"+second_soup['href']
		second_soup = BeautifulSoup(requests.get(second_url).text)
		wrapper_info = second_soup.findAll('div', attrs = {'class':'wd-l-Content-inner'})
		for store_result in wrapper_info:
			dictionary = {}
			name = store_result.find('h1')
			email = store_result.findAll('script')
			format_email = str(email).split('+')
			# second_format = str(format_email).split(']')
			email =  format_email[1]#.replace(".join('@')",'').replace(',','')
			email_info  = str(email).split('.')[0].replace('[','').replace(',','').replace('(','').replace("'",'').replace('iastate','@iastate.edu')
			dictionary['name'] = name.string
			dictionary['email'] = email_info
			huge_arr.append(dictionary)
		with open('iowa_state_univeristy.json','wb') as outfile:
			json.dump(huge_arr,outfile,indent =4)