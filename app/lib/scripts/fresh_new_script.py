import requests
from bs4 import BeautifulSoup
from yelpapi import YelpAPI
import json



consumer_key = 'J6G3zEBCox3lUfKCcJBLDA'
consumer_secret = 'oXcvu0rV8NFvSMoRgf_FGZf-72Y'
token = 'So3cdsVQ-4zB0AAD8MF9VnuDF7XFsihw'
token_secret = 'PAi0q1eI-lFMI9Az0ZWQ_qEFQ_k'
yelp_api = YelpAPI(consumer_key, consumer_secret, token, token_secret)


def search_the_query():
	city_info_array = []
	with open('fa15_final.json') as data_file:
		load_data_info = json.load(data_file)
		for school_json_file in load_data_info[0:10]:
			longitude = school_json_file['longitude']
			latitude = school_json_file['latitude']
			city = school_json_file['city']
			state = school_json_file['state']
			combined_city_state = city+ ', ' + state
			search_results = yelp_api.search_query(term='ice cream',location = combined_city_state)
			city_info_array.append(search_results)
			with open('yelp_new_data.json','wb') as outfile:
				json.dump(city_info_array,outfile,indent=4)

search_the_query()



first_page_array = []
time_line_array  = []
menu_item_array = []
with open('yelp_new_data.json') as data_file:
	load_data_file = json.load(data_file)
	for yelp_data in load_data_file:
		yelp_wrapper = yelp_data['businesses']
		for yelp_wrapper_url in yelp_wrapper:


			review_content = {}
			url =  yelp_wrapper_url['url']
			soup = BeautifulSoup(requests.get(url).text)
			business_name = soup.findAll('h1', attrs = {'class':'biz-page-title embossed-text-white'}) ##### -> REVIEWS
			reviews = soup.findAll('div', attrs = {'class':'review review--with-sidebar'})
			for reviews_info,business_name_info in zip(reviews,business_name):
				business_name = business_name_info.string.replace('\n','').strip()
				user_name = reviews_info.findAll('li', attrs = {'class':'user-name'})
				description = reviews_info.findAll('p',attrs = {'itemprop':'description'})
				for user_name_text, description_text in zip(user_name,description):
					review_content['username'] = user_name_text.text.replace('\n','').strip()
					review_content['description'] = description_text.text.strip()
					first_page_array.append(review_content)	

			second_dict = {}		
			current_hour = soup.findAll('span', attrs = {'class':'hour-range'}) ##### - >>>>> HOURS ETC!
			hour_tables = soup.findAll('table', attrs = {'class':'table table-simple hours-table'})
			for current_hour_text,hour_tables_text in zip(current_hour,hour_tables):
				
				second_dict['today_time'] = current_hour_text.text.strip()
				second_dict['week_time_line'] = hour_tables_text.text.replace('\n','').strip()
				second_dict['reviews'] = first_page_array
				time_line_array.append(second_dict)
			
			menu_dict = {}
			menu_url = soup.findAll('div', attrs = {'class':'iconed-list-story'}) #### ----->>>>> MENU ITEMS
			for hyper_link in menu_url:
				hyper_link_info = hyper_link.findAll('a', attrs =  {'class':'menu-explore'})
				for href_info in hyper_link_info:
					store_data_together_array = []
					href_text = href_info['href']
					menu_url_obj = "http://www.yelp.com" + href_text
					second_soupify_request = BeautifulSoup(requests.get(menu_url_obj).text)
					second_page_main_wrapper = second_soupify_request.findAll('div', attrs = {'class':'menu-section'})
					for second_page_wrapper in second_page_main_wrapper:
						try:
							item_name = second_page_wrapper.find('div', attrs = {'class':'menu-item-details'}).findAll('h3')
							item_description = second_page_wrapper.findAll('p', attrs = {'class':'menu-item-details-description'})
							item_price = second_page_wrapper.findAll('div', attrs = {'class':'menu-item-prices'})
							for item_name_text, item_description_text,item_price_text in zip(item_name,item_description,item_price):
								
								menu_dict['item_name'] = item_name_text.text.replace('\n','').strip()
								menu_dict['item_description'] = item_description_text.text.replace('\n','').strip()
								menu_dict['item_price'] = item_price_text.text.replace('\n','').strip()
								menu_item_array.append(menu_dict)

								
						except AttributeError:
							continue

		# empty_array[combined_city_state] = 							
		# print combined_city_state
		