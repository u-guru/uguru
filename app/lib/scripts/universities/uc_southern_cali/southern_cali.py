import requests, json
from bs4 import BeautifulSoup
cafile = 'cacert.pem'
output_name = 'southern_cali_data.json'
array_names = ['michael']
array = []
for names in array_names:
	url = "https://my.usc.edu/wp/faculty/SearchForm.do?p_quickSearch=&action=Search&p_givenName="+names+"&p_sn=&p_mail=&p_departmentNumber=&p_uscEmployeeHomeDivision=&p_telephoneNumber=&p_uscAffiliationStudent=unchecked&p_uscAffiliationStaff=checked&p_uscAffiliationFaculty=checked&p_uscAffiliationAffiliate=checked&PARAMETER_PREFIX=wp_"
	soup = BeautifulSoup(requests.get(url,verify = True).text)
	main_wrapper = soup.findAll('form', attrs = {'name':'ldapSearch'})
	for wrapper in main_wrapper:
		email = wrapper.findAll('tr', attrs = {'class':'results'})
		for second_wrapper in email:
			email_dict = {}
			email_dict['email'] = second_wrapper.findAll('a')[1].text
			array.append(email_dict)

		with open('uc_southern_cali.json','wb') as outfile:
			json.dump(array,outfile,indent = 4)
		