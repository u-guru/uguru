import requests, json
from bs4 import BeautifulSoup


names_arr = ['ben']
huge_arr = []
output = 'uc_riverside_directory.json'
for name in names_arr:
	url = 'http://www.ucr.edu/find_people.php?term='+name+'&sa=Go&type=student'
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('table', attrs = {'class':'data2'})
	
	for wrapper in main_wrapper:
		
		name_wrapper = wrapper.findAll('span', attrs = {'class':'fn'})
		email = wrapper.findAll('a')
		for first_wrapper,second_wrapper in zip(name_wrapper,email):
			dictionary = {}
			dictionary['name'] = first_wrapper.text
			dictionary['first_name'] = first_wrapper.text.split(' ')[0]
			dictionary['last_name'] = first_wrapper.text.split(' ')[-1]
			dictionary['email'] = second_wrapper['href'].replace('mailto:','')
			huge_arr.append(dictionary)
			with open(output,'wb') as outfile:
				json.dump(huge_arr,outfile,indent =4 )