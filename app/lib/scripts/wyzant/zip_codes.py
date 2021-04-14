import requests,json
from bs4 import BeautifulSoup


huge_arr = []
url = 'http://www.mapsofworld.com/usa/zipcodes/'
response = requests.get(url).text
soup = BeautifulSoup(response)
main_wrapper = soup.findAll('table', attrs = {'class':'link_table'})
for main_wrapper in main_wrapper:
	hyper_link = main_wrapper.findAll('a')
	for href_text in hyper_link:
		second_url = href_text['href']
		second_response = requests.get(second_url).text
		soup = BeautifulSoup(second_response)
		second_main_wrapper = soup.findAll('table', attrs = {'class':'link_table'})
		for wrapper in second_main_wrapper:
			second_hyper_link = wrapper.findAll('a')
			for second_href_text in second_hyper_link:
				last_url = second_href_text['href']
				third_response = requests.get(last_url).text
				third_soup = BeautifulSoup(third_response)
				third_main_wrapper = third_soup.findAll('table', attrs={'class':'tableizer-table'})
				for wrapper in third_main_wrapper:
					zip_code = {}
					zip_code['zip_code'] = wrapper.findAll('td')[-1].text
					huge_arr.append(zip_code)
				with open('zip_code_list.json','wb') as outfile:
					json.dump(huge_arr,outfile,indent=4)