import requests,json
from bs4 import BeautifulSoup
import tor_client


output_path = "tutors.json"
big_array = []
url = 'http://www.tutor.com/tutor-search?o=available'
soup = BeautifulSoup(tor_client.get(url).text)
main_wrapper = soup.findAll('div', attrs = {'class':'col-md-9 col-sm-8'})

def parse_html():
	for step_1 in main_wrapper:
		dictionary = {}
		profile_url = step_1.find('div', attrs = {'class':'col-md-3 col-sm-3 col-xs-4'})
		profile_url_step_1 = profile_url.findAll('a')
		subject_info = step_1.find('div', attrs = {'class':'col-md-9 col-sm-9 tutor-search-details'})
		outer_layer = step_1.find('div', attrs = {'class':'col-md-3 col-sm-4'})
		for dictionary_profile in profile_url_step_1:
			dictionary['profile_url'] = 'http://www.tutor.com/'+dictionary_profile['href'].rstrip()
			dictionary['subjects'] = subject_info.text.rstrip()
			dictionary['tutor_name'] = subject_info.find('div',attrs = {'class':'col-md-4'}).text.rstrip()
			big_array.append(dictionary)
			return parse_html

def save_output(output_path):
	with open(output_path, 'w') as f:
		json.dump(big_array,f, indent = 4)
		print "File successfully saved in tutors.json"
		return save_output(output_path)

if __name__ == "__main__":
	parse_html()
	save_output(output_path)