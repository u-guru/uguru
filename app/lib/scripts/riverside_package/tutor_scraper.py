import requests, json
from bs4 import BeautifulSoup
huge_arr = []
output = 'riverside_tutors.json'
for i in range(1000):
	dictionary = {}
	#base_url =  "http://riverside.universitytutor.com/riverside_tutoring/"i"?authenticity_token=jwU11ZrF67p2ImrhMXYRNeCU%2BObcTeuyKbyrhcxLFp3kTe88BXUp8UEMJ4ZMADP%2B5zllNmnUtXcIOyX5%2F1ypeg%3D%3D&button=&location=riverside&mode=list&sort=distance&sort_direction=ASC&subject=Enter+a+Subject&utf8=%E2%9C%93"
	url = 'http://riverside.universitytutor.com/riverside_tutoring/'+str(i)+'?authenticity_token=jwU11ZrF67p2ImrhMXYRNeCU%2BObcTeuyKbyrhcxLFp3kTe88BXUp8UEMJ4ZMADP%2B5zllNmnUtXcIOyX5%2F1ypeg%3D%3D&button=&location=riverside&mode=list&sort=distance&sort_direction=ASC&subject=Enter+a+Subject&utf8=%E2%9C%93'
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('div', attrs= {'id':'search-results'})
	for wrapper in main_wrapper:
		
		school_went_to = wrapper.findAll('div', attrs= {'class':'col-xs-12 col-sm-2 col-md-3 list-education'})
		for text_in_school_went_to in school_went_to:
			compare_actual_text = text_in_school_went_to.text
			if "University of California Riverside" in compare_actual_text:
				name_attrs = wrapper.findAll('div', attrs= {'class':'name details pull-left'})
				for name_text in name_attrs:
					dictionary['tutor_name'] = name_text.text.replace('Private  tutor in Riverside, CA', '').replace('\n','')
					dictionary['first_name'] = name_text.text.split(' ')[0].replace('\n','')
				huge_arr.append(dictionary)

			else:
				pass
	print url
	#huge_arr.append(dictionary)
	with open(output,'wb') as outfile:
		json.dump(huge_arr,outfile,indent=4)