import json, requests
from bs4 import BeautifulSoup

output = ''
array = []
names_array = ['ben']
for names in names_array:
	url = 'http://directory.syr.edu/directory/dir.cfm?search_last=&lastwc=b&search_first=Ben&firstwc=b&BUTTON=Search+by+NAME&referer='
	soup = BeautifulSoup(requests.post(url).text)
	print soup