import requests,json
from bs4 import BeautifulSoup


names_arr = ['Ben']
for names in names_arr:
	url = 'http://www.pdx.edu/directory/search/'+names
	soup = BeautifulSoup(requests.get(url).text)
	print soup