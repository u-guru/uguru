import requests,json
from bs4 import BeautifulSoup

huge_arr = []
url = 'http://usctutors.com/'
soup = BeautifulSoup(requests.get(url).text)
output = 'tutors.json'
all_a_links = soup.findAll('td', attrs = {'width':'87%'})
for all_a in all_a_links:
	href = all_a.findAll('a')
	for href_text in href:
		url_to_scrape = 'http://usctutors.com/' + href_text['href']
		second_soup = BeautifulSoup(requests.get(url_to_scrape).text)
		main_wrapper = second_soup.findAll('td', attrs  = {'height':'113'})
		for main_wrapper_info in main_wrapper:
			name =  main_wrapper_info.findAll('font', attrs = {'color':'#800000'})
			email_info = main_wrapper_info.findAll('b', text = "eMail:")
			major_info = main_wrapper_info.findAll('b', text = "Major and Degree Sought:")
			tutoring_subjects = main_wrapper_info.findAll('b',text = "Tutoring Subjects:")
			for name_text,email_info_text,major_info_text,tutoring_subjects_text in zip(name,email_info,major_info,tutoring_subjects):
				empty_dict = {}
				empty_dict['name'] = name_text.text.strip()
				empty_dict['email'] = email_info_text.nextSibling.nextSibling.text.strip()
				empty_dict['major'] = major_info_text.nextSibling.nextSibling.text.strip()
				empty_dict['tutoring_subjects'] = tutoring_subjects_text.nextSibling.strip()
				huge_arr.append(empty_dict)
				
	additional_info = {}			
	additional_info['num_tutors'] = len(huge_arr)
	additional_info['school_id'] = '2318'
	additional_info['description'] = 'Tutors for UC Southern California'
	additional_info['data'] = huge_arr

	with open(output,'wb') as outfile:
		json.dump(additional_info,outfile,indent=4)	

