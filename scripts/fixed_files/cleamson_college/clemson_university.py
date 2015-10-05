import requests, json
from bs4 import BeautifulSoup


names_arr = ['ben']
for names in names_arr:
	url = 'https://my.clemson.edu/#/directory/search/'+names
	soup = BeautifulSoup(requests.post(url).text)
	print soup