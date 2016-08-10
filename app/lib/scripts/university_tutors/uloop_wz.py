import requests,json,dryscrape
from bs4 import BeautifulSoup
tutors =[]
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
		try:
			try:
				url_parse = "http://" + soup_text.text.strip().replace('//','') + '/tutors'
				response = requests.get(url_parse).text
				soup = BeautifulSoup(response)
				main_wrapper = soup.findAll('div', attrs = {'class':'tutors_list'})
				for wrapper in main_wrapper:
					profile_url = wrapper.findAll('div', attrs = {'class':'profile_link'})
					for hyper_link in profile_url:
						hyper_link_text = hyper_link.findAll('a')
						for href_text in hyper_link_text:
							profile_info = {}
							second_url = "http://" + soup_text.text.strip().replace('//','')
							profile_info['profile_url'] = second_url + href_text['href']
							second_url = second_url + href_text['href']
							url_response = requests.get(second_url).text
							second_soup = BeautifulSoup(url_response)
							tutor_profile_wrapper = second_soup.findAll('div', attrs = {'class':'tutor_detail_left'})

							for tutor_wrapper in tutor_profile_wrapper:
								description = tutor_wrapper.findAll('h3', text = "Personal Statement")
								for next_sibling in description:
									profile_info['personal_statement'] = next_sibling.nextSibling.strip().replace('\r','').replace('\n','').replace('\t','')

								name = tutor_wrapper.findAll('h1', attrs = {'class':'listing_title'})
								more_tutor_info = tutor_wrapper.findAll('div', attrs = {'class':'tutor_more'})
								for tutor_detailed_info in more_tutor_info:
									profile_info['hour_rate'] = tutor_detailed_info.findAll('div', attrs = {'class':'h3'})[0].text.replace('Hourly Fee:','').strip()
									profile_info['location'] = tutor_detailed_info.findAll('div', attrs = {'class':'h3'})[1].text.replace('Location:','').strip()
							
								for name_text in name:
									profile_info['name'] = name_text.text.replace('Tutor','').strip()
									profile_info['resource'] = 'https://www.uloop.com/tutors'
									profile_info['university'] = location
									profile_info['major'] = None
						tutors.append(profile_info)	
						with open('uloop_tutors.json','wb') as outfile:
							json.dump(tutors,outfile,indent=4)
			except AttributeError:
				continue							
		except requests.exceptions.InvalidURL:
			continue
