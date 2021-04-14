import requests, json,time
from bs4 import BeautifulSoup
from mailgun import *
import os.path



	
url = 'https://www.ndsu.edu/directory/?q=Ben'
soup = BeautifulSoup(requests.get(url).text)
wrapper = soup.findAll('ol', attrs = {'class':'phonebook-search-result'})
dictionary = {}
for names in names_arr:
	dictionary['name'] = wrapper.findAll('strong')[0].next_sibling.string
	print dictionary
# for wrapper_info in wrapper:
# 	try:
# 		dictionary = {}
# 		dictionary['name'] = wrapper_info.findAll('strong')[0].next_sibling.string
# 		name = wrapper_info.findAll('strong')[0].next_sibling.string.split(' ')
# 		dictionary['first_name'] = name[1]
# 		dictionary['last_name'] = name[-1]
# 		dictionary['email'] = wrapper_info.findAll('strong')[0].next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.string
# 		##department = wrapper_info.findAll('strong')[0].next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.next_sibling.string
# 		huge_arr.append(dictionary)
# 		print dictionary
# 	except:
# 		continue