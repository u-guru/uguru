import tor_client,json
import dryscrape
from bs4 import BeautifulSoup
sess = dryscrape.Session(base_url = 'http://www.universitytutor.com/')
sess.visit('/')

huge_arr = []
school_data = json.load(open('fa15_final.json'))
for data in school_data:
	location = data['city']
	state = data['state']
	location = location + ',' + state
	q = sess.at_xpath('//*[@name="location"]')
	q.set(location)
	q.form().submit()
	html = sess.body()
	soup = BeautifulSoup(html)
	profile_url = soup.findAll('div', attrs = {'class':'name details pull-left'})
	for every_profile in profile_url:
		hyper_link = every_profile.findAll('a')
		for href in hyper_link:
			result_dict = {}
			url = href['href']
			print url
			result_dict['resource'] = 'http://www.universitytutor.com/'
			result_dict['profile_url'] = url
			soup = BeautifulSoup(tor_client.get(url).text)
			profile_wrapper = soup.findAll('div', attrs = {'id':'profile_wrapper'})
			for tutor_info in profile_wrapper:
				name = tutor_info.findAll('div', attrs = {'class':'name'})
				result_dict['university'] = tutor_info.findAll('div', attrs = {'class':'profile_section'})[1].text.split('-')[0].replace('Education','').replace('\n','').strip().encode('ascii','ignore')
				result_dict['major'] = tutor_info.findAll('div', attrs = {'class':'profile_section'})[1].text.split('-')[-1].replace('\n','').strip().encode('ascii','ignore').replace('Education','')
				for name_string in name:
					result_dict['name'] = name_string.string.strip()
					huge_arr.append(result_dict)	
	with open('university_tutors_data.json','wb') as outfile:
	 	json.dump(huge_arr,outfile,indent=4)

