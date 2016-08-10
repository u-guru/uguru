import tor_client,json
from bs4 import BeautifulSoup
dictionary = {}
output_path = 'studypool.json'
big_array = []
for url in range(0,128):
	url = 'https://www.studypool.com/find-tutors-online?cid=-1&RankOrder_page='+str(url)
	soup = BeautifulSoup(tor_client.get(url).text)
	main_wrapper = soup.findAll('div', attrs = {'style':'font-size:12px;margin-left:105px; position:relative;'})

def parse_html():

	for profile_info in main_wrapper:
		dictionary['college_they_went_to'] = profile_info.find('div', attrs = {'style':'margin-top:4px; margin-bottom:-2px; font-size:14px; font-weight:300;'}).text.replace('\n','')
		dictionary['user_name'] = profile_info.find('b', attrs = {'style':'font-size:14px; float:left; margin-right:10px; font-size:18px;'}).text.replace('\n','')
		profile_url = profile_info.findAll('a')
		for href in profile_url:
			dictionary['profile_url'] = href['href']
			big_array.append(dictionary)
			return parse_html()

def save_output(output_path):
	with open(output_path, 'w') as f:
		json.dump(big_array,f, indent = 4)
		print "File successfully saved in studypool.json"
		
if __name__ == "__main__":
	parse_html()
	save_output(output_path)
		