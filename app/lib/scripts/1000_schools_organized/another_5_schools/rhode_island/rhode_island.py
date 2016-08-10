import requests,json,time
from bs4 import BeautifulSoup

names_arr = ['Ben']
huge_arr = []
for names in names_arr:
	params = {'op':'searchresult','searchfor':'yes','my_base_dn':'dc=URI,dc=EDU','URIEduStatus':'student','searchfor_sn':'','searchfor_cn':'Ben','searchfor_title':'','searchfor_dept':'','Search':'Search'}
	soup = BeautifulSoup(requests.post('http://directory.uri.edu/directory.php?SearchType=people',params).text)
	main_wrapper = soup.findAll('div', attrs = {'class':'shadowbox'})
	for wrapper in main_wrapper:
		each_table = wrapper.findAll('table', attrs = {'align':'center'})
		for each_table_info in each_table:
			name = each_table_info.findAll('tr')[0:1]
			email = each_table_info.findAll('a')
			for name_text,email_text in zip(name,email):
				dictionary = {}
				dictionary['name'] = name_text.text.replace('\n','')
				dictionary['email'] = email_text.text
				huge_arr.append(dictionary)
			with open('rhode_island_data.json','wb') as outfile:
				json.dump(huge_arr,outfile,indent=4)