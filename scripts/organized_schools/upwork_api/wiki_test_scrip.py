import json, requests
from bs4 import BeautifulSoup

url ='https://en.wikipedia.org/wiki/University_of_California,_Berkeley'

soup = BeautifulSoup(requests.get(url).text)
table = soup.find('table', class_ = "infobox")
rows = table.findAll('tr')
for info in rows:
	image_url = info.findAll('img')
	for image_src in image_url:
		image_url_info = image_src['src']
		print image_url_info