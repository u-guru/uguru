import dryscrape,json
from bs4 import BeautifulSoup


schools_names_arr = ['Riverside','Harvard University','UC Berkeley']
output_dict_info = {}
# for items in schools_names_arr:
small_arr = []
def scrape_logo_url_from_google(school_name):
	sess = dryscrape.Session(base_url = 'http://google.com')
	sess.set_attribute('auto_load_images', False)
	sess.visit('/')
	with_mascot = school_name + ' ' + "mascot"
	q = sess.at_xpath('//*[@name="q"]')
	q.set(with_mascot)
	q.form().submit()
	sess.render('google_search.png')
	html_page = sess.body()
	soup = BeautifulSoup(html_page)
	main_wrapper = soup.findAll('img')
	for items_info in main_wrapper:
		small_arr_info = []
		different_types_of_img = items_info['src']
		small_arr.append(different_types_of_img)
		output_dict_info[school_name]= small_arr
		with open('college_logo_url.json','wb') as outfile:
			json.dump(output_dict_info,outfile,indent=4)

scrape_logo_url_from_google(school_name = 'Riverside')