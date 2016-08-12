import requests,json
from bs4 import BeautifulSoup


tutors = []
for page_numbers in range(5094):
	url = 'http://www.uloop.com/tutors/?page='+str(page_numbers)
	response = requests.get(url).text
	soup = BeautifulSoup(response)
	main_wrapper = soup.findAll('div', attrs = {'class':'tutors_list'})
	for wrapper in main_wrapper:
		profile_url = wrapper.findAll('div', attrs = {'class':'profile_link'})
		for hyper_link in profile_url:
			a_url = hyper_link.findAll('a')
			for href_text in a_url:
				profile_info = {}
				second_url = 'http://www.uloop.com' + href_text['href']
				url_response = requests.get(second_url).text
				profile_info['profile_url'] = second_url
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
						profile_info['major'] = None
			tutors.append(profile_info)	
			with open('uloop_tutors_info.json','wb') as outfile:
				json.dump(tutors,outfile,indent=4)