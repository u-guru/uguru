import requests,json,time
from bs4 import BeautifulSoup

names_arr = ['Michael','Ben']
for names in names_arr:

	url = 'https://www.umass.edu/peoplefinder/#name=Ben&affil=student'
	soup = BeautifulSoup(requests.get(url).text)
	print soup