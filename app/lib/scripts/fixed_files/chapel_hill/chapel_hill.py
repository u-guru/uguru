import requests, json
from bs4 import BeautifulSoup


output = 'chapel_hill.json'
names_arr = ['Ben']

for names in names_arr:
	params = {'searchString':'Ben'}
	soup = requests.post('https://itsapps.unc.edu/dir/dirSearch/search',params).text
	print soup.keys