import requests, json
from bs4 import BeautifulSoup


OUTPUT_PATH = 'quartersystem.json'


url = 'http://blog.cappex.com/blog/college-lists/colleges-on-the-quarter-system/'
soup = BeautifulSoup(requests.get(url).text)
main_class = soup.find('div', attrs = {'class':'entry'})
is_quarter = []
is_college_quarter = main_class.findAll('a')
for get_me_title in is_college_quarter:
	try:
		college_name = {}
		college_name['is_quarter'] = get_me_title['title']
		is_quarter.append(college_name)
	 	print len(is_quarter)
	except:
		pass
with open(OUTPUT_PATH, 'w') as outfile:
	json.dump(is_quarter, outfile)
