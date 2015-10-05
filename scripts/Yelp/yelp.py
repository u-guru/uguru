from yelpapi import YelpAPI
import json
import requests
from bs4 import BeautifulSoup




consumer_key = 'J6G3zEBCox3lUfKCcJBLDA'
consumer_secret = 'oXcvu0rV8NFvSMoRgf_FGZf-72Y'
token = 'So3cdsVQ-4zB0AAD8MF9VnuDF7XFsihw'
token_secret = 'PAi0q1eI-lFMI9Az0ZWQ_qEFQ_k'
yelp_api = YelpAPI(consumer_key, consumer_secret, token, token_secret)
output = 'yelp_school_data.json'

city_info = []
with open('fa15_final.json') as data_file:
	data_info = json.load(data_file)
	for city in data_info:
		cities = city['city']
		city_info.append(cities)


def get_school_data_information(city_info):
	city_array = []
	for loop_cities in city_info[0:2]:
		dictionary = {}
		search_results = yelp_api.search_query(location = loop_cities, limit = 1000)
		dictionary['business_information:'] = search_results
		city_array.append(dictionary)
		with open(output,'wb') as outfile:
			json.dump(city_array,outfile,indent=4)
biggest_array = []
with open(output) as second_step_data:
	load_data_info = json.load(second_step_data)
	empty_array = {}
	for info in load_data_info:
		main_wrapper_json = info['business_information:']['businesses']
		for info in main_wrapper_json:
			url =  info['mobile_url']
			soup = BeautifulSoup(requests.get(url).text)
			try:
			
				business_name = soup.find('h1', attrs = {'class':'biz-page-title embossed-text-white'}).text.replace('\n','').replace('\u2019','').strip()
			
			except AttributeError:
				continue
			

			today_information = soup.findAll('ul', attrs = {'class':'iconed-list'})#BUSINESS TODAY INFO.
			for hour_range in today_information:
				hour_info = hour_range.findAll('span', attrs = {'class':'hour-range'})
				price_info = hour_range.findAll('dd', attrs = {'class':'nowrap price-description'})
				menu_hyper_link = hour_range.findAll('div', attrs = {'class':'iconed-list-story'})
				for hour_text,price_text in zip(hour_info,price_info):
					first_dict = {}
					first_dict['today_hour'] = hour_text.text.replace('\n','').strip()
					first_dict['price_range'] = price_text.text.replace('\n','').strip()
					biggest_array.append(first_dict)
				for a_href in menu_hyper_link: #BELOW FROM THIS IS MENU SCRAPING
					a_link = a_href.findAll('a')
					for href in a_link:
						href = href['href']
						if "/menu" in href:
							menu_url = "http://www.yelp.com" + href
							second_request = BeautifulSoup(requests.get(menu_url).text)
							main_wrapper = second_request.find('div', attrs = {'class':'menu-section'}).findAll('div',attrs = {'class':'menu-item-details'})
							for name in main_wrapper:
								try:
									second_dict = {}
									second_dict['item_name'] = name.find('h3').text.replace('\n','').stirp()
									second_dict['item_description'] = name.find('p', attrs = {'class':'menu-item-details-description'}).text.replace('\n','').strip()
									biggest_array.append(second_dict)
								except AttributeError:
									pass
									continue

						else:
							pass
						
			biz_website = soup.findAll('div',attrs = {'class':'biz-website'})
			for a_biz in biz_website:
				get_me_all_link = a_biz.findAll('a')
				for text in get_me_all_link:
					third_dict = {}
					third_dict['business_url'] = text.text.replace('\n','').strip()
					biggest_array.append(third_dict)
			fourth_dict = {}		
			fourth_dict['total_rating_for_this_business'] = soup.find('span', attrs = {'class':'review-count rating-qualifier'}).text.replace('\n','').strip()
			biggest_array.append(fourth_dict)
			opening_information = soup.findAll('div', attrs = {'class':'ywidget biz-hours'})#OPENING HOURS IN TOTAL	
			for opening_info in opening_information:
				fifth_dict = {}
			 	fifth_dict['Hours'] = opening_info.text.replace('Edit business info', ' ').replace('\n','').strip()
			 	biggest_array.append(fifth_dict)
			total_ratings = soup.findAll('div', attrs = {'class':'rating-very-large'})
			for ratings in total_ratings:
				sixth_dict = {}
			 	sixth_dict['average_rating'] = ratings.find('i')['title']
			 	#biggest_array.append(sixth_dict)
				empty_array[business_name] = biggest_array	
			
			with open('parsed_data.json','wb') as outfile:
				json.dump(empty_array,outfile,indent=4)	 	
#if __name__ == "__main__":
	