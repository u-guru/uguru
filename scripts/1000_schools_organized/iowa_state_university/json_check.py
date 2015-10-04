import requests,json
from bs4 import BeautifulSoup



with open('iowa_state_univeristy.json') as data_file:
	data_load = json.load(data_file)
	for email in data_load:
		dictionary = {}
		dictionary['first_name'] = email['first_name']
		dictionary['last_name'] = email['last_name']
		dictionary['email'] = email['email'].replace(' ','')
		print dictionary
