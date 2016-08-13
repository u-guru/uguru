import json, requests
from bs4 import BeautifulSoup

output = 'stanford_university_data.json'
array = []
names_array = ['michael']
for names in names_array:

	url = 'https://stanfordwho.stanford.edu/SWApp/Search.do?search='+names+'&filters=closed&affilfilter=everyone&btnG=Search'
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('div', attrs = {'id':'PublicResults'})
	for wrapper in main_wrapper:
		link = wrapper.findAll('dt')
		for depth_link in link:
			depth_links = depth_link.findAll('a')
			for href in depth_links:
				hrefs = 'https://stanfordwho.stanford.edu'+ href['href']
				second_soup = BeautifulSoup(requests.post(hrefs).text)
				second_wrapper = second_soup.findAll('dd')
				for email_wrapper in second_wrapper:
					emails = email_wrapper.findAll('a')
					for email_info in emails:
						dictionary_stanford = {}
						dictionary_stanford['email'] = email_info['href'].replace('mailto:', ' ')
						array.append(dictionary_stanford)
					with open(output,'wb') as outfile:
						json.dump(array,outfile,indent = 4)