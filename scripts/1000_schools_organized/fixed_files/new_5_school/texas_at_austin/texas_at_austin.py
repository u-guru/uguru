import tor_client, json,time
from bs4 import BeautifulSoup



names_arr = ['Ben']


for names in names_arr:
	time.sleep(5)
	url = 'http://www.utexas.edu/directory/index.php?q='+names+'&scope=student&submit=Search'
	soup = BeautifulSoup(tor_client.get(url).text)
	main_wrapper = soup.find('ul', attrs = {'class':'people-search-result'})
	a_link = main_wrapper.findAll('a')
	for href in a_link:
		time.sleep(2)
		second_url = 'http://www.utexas.edu/directory/' + href['href']
		second_main_wrapper = BeautifulSoup(tor_client.get(second_url).text)
		second_whole_wrapper = second_main_wrapper.find('table', attrs = {'class':'dir_info'})
		tr = second_whole_wrapper.findAll('tr')
		for info in tr:
			name = info.find('td')[1]
			print td