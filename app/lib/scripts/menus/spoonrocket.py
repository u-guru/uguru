import requests
from bs4 import BeautifulSoup





def construct_url():

	url = 'https://postmates.com/sf/katana-ya-san-francisco#salad'
	soup = BeautifulSoup(requests.get(url).text)
	wrapper = soup.find('ul', attrs = {'class':'categories'})
	if wrapper is not None:
		rows = wrapper.findAll('li')

		for row in rows:
			array = {}
			array['price']= soup.find('div', attrs = {'class':'price'}).text.lower()
			array ['name']= soup.find('div',attrs = {'class':'name'}).text.lower()
			array ['uuid'] = soup.findAll('a')
			print array
	
	
	
construct_url()