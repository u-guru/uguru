import requests,json
from bs4 import BeautifulSoup

names_arr = ['Michael']
huge_arr = []

for names in names_arr:
	params = {'name':'Ben','department':'','location':'','position':'','email':'','phone':''}
	soup = BeautifulSoup(requests.post('http://www.olemiss.edu/people/',params).text)
	main_wrapper = soup.find('section',attrs = {'id':'content'})
	person = main_wrapper.findAll('div', attrs = {'class':'person'})
	for wrapper in person:
		dictionary = {}
		dictionary['name'] = wrapper.find('div', attrs = {'class':'name'}).string.title()
		dictionary['email'] = wrapper.find('a').string
		huge_arr.append(dictionary)
	with open('university_of_missipi_data.json','wb') as outfile:
		json.dump(huge_arr,outfile,indent=4)