import requests,json
from bs4 import BeautifulSoup

output_path = 'chegg_tutors.json'
big_array  = []
for url in range(0,67):
	url = 'https://www.chegg.com/tutors/online-tutors/?p='+str(url)+'&filter-is_online=1&filter-gender='
	soup = BeautifulSoup(requests.get(url).text)
	main_wrapper = soup.findAll('div', attrs = {'class':'expert-list-content'})

def parse_html():
	for info in main_wrapper:
		a_link = info.find('div', attrs = {'class':'expert-info'}).findAll('a')
		expert_description = info.find('div', attrs = {'class':'expert-description'})
		#print expert_description
		for link in a_link:
			dictionary = {}
			dictionary['profile_url'] = 'https://www.chegg.com'+link['href']
			dictionary['Name'] = link.text.replace('\n','')
			dictionary['description'] = expert_description.text.replace('\n','')
			dictionary['school_they_went_to'] = info.find('div', attrs = {'class':'expert-list-school'}).text.replace('\n','')
			big_array.append(dictionary)
			return parse_html


def save_output(output_path):
	with open(output_path, 'w') as f:
		json.dump(big_array,f, indent = 4)
		print "File successfully saved in chegg_tutors.json"
		return save_output(output_path)

if __name__ == "__main__":
	parse_html()
	save_output(output_path)