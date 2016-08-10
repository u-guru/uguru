import requests,json
from bs4 import BeautifulSoup


names_arr = ['Ben']
huge_arr = []
for names in names_arr:
	url = 'http://search.wsu.edu/default.aspx?cx=004677039204386950923:xvo7gapmrrg&cof=FORID%3A11&q='+names+'&sa=Search'
	soup = BeautifulSoup(requests.get(url).text)
	student = soup.find('span', attrs = {'id':'TabContainer1_TabPanel3_lblStudentPhoneResults'})
	main_wrapper = student.findAll('div', attrs = {'width':'100%'})
	for wrapper in main_wrapper:
		phone_results = wrapper.findAll('table', attrs = {'class':'phoneresults'})
		for phoneresults in phone_results:
			mail =  phoneresults.findAll('a')
			name = phoneresults.findAll('td', attrs = {'class':'name'})
			for mail_text,name_text in zip (mail,name):
				mail_text = mail_text.text
				if "@wsu.edu" in mail_text:
					dictionary = {}
					dictionary['email'] = mail_text
					dictionary['name'] = name_text.text
					huge_arr.append(dictionary)
				else:
					pass
			with open('washington_state_university.json','wb') as outfile:
				json.dump(huge_arr,outfile,indent=4)