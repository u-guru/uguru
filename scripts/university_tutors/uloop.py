import tor_client,json,requests
from bs4 import BeautifulSoup
import dryscrape


school_names = json.load(open('fa15_final.json'))
for school_name_text in school_names:
	sess = dryscrape.Session(base_url = 'https://www.uloop.com')
	sess.visit('https://www.uloop.com/tutors')
	location = school_name_text['name']
	q = sess.at_xpath('//*[@name="location"]')
	q.set(location)
	q.form().submit()
	sess.render('uloop.png')
	html = sess.body()
	soup = BeautifulSoup(html)
	for soup_text in soup:
		url_parse = "http://" + soup_text.text.strip().replace('//','') + '/tutors'
		sess.visit(url_parse)
		html_1 = sess.body()
		soup = BeautifulSoup(html_1)
		soup_div = soup.findAll('div')
		print soup_div