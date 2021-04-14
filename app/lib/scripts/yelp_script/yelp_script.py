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

def call_yelp_api():
	search_terms = ['ice cream']
	city_array = []
	for loop_cities,search_terms_query in zip(city_info[0:5],search_terms):
			dictionary = {}
			search_results = yelp_api.search_query(term = search_terms_query, location = loop_cities)
			dictionary['business_information:'] = search_results
			city_array.append(dictionary)
			with open(output,'wb') as outfile:
				json.dump(city_array,outfile,indent=4)		
				
def scrape_data():		
	location_dict = {}		
	with open(output) as data_file:
		load_data_file = json.load(data_file)

		for info in load_data_file:
			main_wrapper_json = info['business_information:']['businesses']
			for yelp_url in main_wrapper_json:
				key_value_dict = {}
				url_http = yelp_url['mobile_url']
				location = yelp_url['location']['city']
				soupify_obj = BeautifulSoup(requests.get(url_http).text)
				try:
					business_external_url_array = []
					business_information_dict = {}
			
					business_name_information = soupify_obj.find('h1', attrs = {'class':'biz-page-title embossed-text-white'}).text.replace('\n','').replace('\u2019s','').strip()
					business_information_dict['exteral_url'] = soupify_obj.find('div', attrs = {'class':'biz-website'}).text.replace('Business website',' ').replace('\n','').strip()
					menu_url = soupify_obj.findAll('div', attrs = {'class':'iconed-list-story'})
					business_city_location = soupify_obj.find('span',attrs = {'itemprop':'addressLocality'}).string
					business_information_dict['city'] = soupify_obj.find('span',attrs = {'itemprop':'addressLocality'}).string
					
					business_external_url_array.append(business_information_dict)

				except AttributeError:
					continue
				
				for hyper_link in menu_url:
					hyper_link_info = hyper_link.findAll	('a', attrs =  {'class':'menu-explore'})
					for href_info in hyper_link_info:
						store_data_together_array = []
						href_text = href_info['href']
						fresh_dict = {}
						menu_url_obj = "http://www.yelp.com" + href_text
						print menu_url_obj
						second_soupify_request = BeautifulSoup(requests.get(menu_url_obj).text)
						second_page_main_wrapper = second_soupify_request.findAll('div', attrs = {'class':'menu-section'})
						business_name = second_soupify_request.find('div', attrs  = {'class':'column column-alpha '}).findAll('h1')
						for menu_detailed_info,business_name_info  in zip(second_page_main_wrapper,business_name):
							try:

								main_value_business = business_name_info.string.replace("Menu for", "").replace('\n','').strip()
								item_price = menu_detailed_info.findAll('li', attrs = {'class':'menu-item-price-amount'})
								item_name = menu_detailed_info.find('div', attrs = {'class':'menu-item-details'}).findAll('h3')
								item_description = menu_detailed_info.findAll('p', attrs = {'class':'menu-item-details-description'})
								for item_name_text, item_price_text,item_description_text in zip(item_price,item_name,item_description):
									item_name_text_info = item_name_text.string
									if item_name_text_info:
										menu_dict = {}
										menu_dict['additonal_information'] = business_external_url_array
										menu_dict['item_price'] = item_name_text_info.replace('\n','').strip()
										menu_dict['item_name'] = item_price_text.text.replace('\n','').strip()
										menu_dict['food_descrption'] = item_description_text.text.replace('\n','').strip()
										
										store_data_together_array.append(menu_dict)
										location_dict[main_value_business] = store_data_together_array
										

							except AttributeError:
								continue								
			key_value_dict[location] = location_dict 
			location_dict = {}
			with open('yelp/' + location + '.json','wb' ) as outfile:
				json.dump(key_value_dict,outfile,indent=4)			
						
							



if __name__ == "__main__":
	scrape_data()
