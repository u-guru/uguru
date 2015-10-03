import tor_client,json
from bs4 import BeautifulSoup
tutors = []
url = 'http://www.varsitytutors.com/'
response = tor_client.get(url).text
soup = BeautifulSoup(response)
bottom_part = soup.findAll('div', attrs = {'class':'locations-subjects-links footer-link-group'})
for wrapper in bottom_part:
	hyper_link = wrapper.findAll('a')
	for every_hyper_link in hyper_link:
		url = 'http://www.varsitytutors.com' +  every_hyper_link['href']
		response_1 = tor_client.get(url).text
		soup_1 = BeautifulSoup(response_1)
		tutor_profile = soup_1.findAll('div', attrs = {'id':'tutors_col'})
		for every_profile in tutor_profile:
			name = every_profile.findAll('div', attrs = {'class':'title'})
			education = every_profile.findAll('ul', attrs = {'class':'degrees'})
			profile_url = every_profile.findAll('a', attrs = {'class':'blue_link'})
			for name_text,educatio_text,profile_url_text in zip(name,education,profile_url):
				tutor_profile_dict = {}
				tutor_profile_dict['profile_url'] = 'http://www.varsitytutors.com' + profile_url_text['href']
				tutor_profile_dict['name'] = name_text.text.strip().replace('\n','')
				tutor_profile_dict['university'] = educatio_text.text.split('-')[0].strip().replace('\n','')
				tutor_profile_dict['resource'] = 'http://www.varsitytutors.com/'
				tutor_profile_dict['major'] = educatio_text.text.split('-')[-1].strip().replace('\n','')
				tutors.append(tutor_profile_dict)
				
			with open('varsitytutors.json','wb') as outfile:
				json.dump(tutors,outfile,indent=4)