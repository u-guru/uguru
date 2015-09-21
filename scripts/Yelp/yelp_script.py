from yelpapi import YelpAPI
import json
import requests
from bs4 import BeautifulSoup


store_data_together_array = []
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
		school_name = city['name']
		city_info.append(cities)


# def get_school_data_information(city_info):
city_array = []
for loop_cities in city_info[0:2]:
	dictionary = {}
	search_results = yelp_api.search_query(location = loop_cities)
	dictionary['business_information:'] = search_results
	city_array.append(dictionary)
	with open(output,'wb') as outfile:
		json.dump(city_array,outfile,indent=4)		
			
with open(output) as data_file:
	load_data_file = json.load(data_file)

	for info in load_data_file:
		main_wrapper_json = info['business_information:']['businesses']
		for yelp_url in main_wrapper_json:
			url_http = yelp_url['mobile_url']
			key_value_dict = {}
			location = yelp_url['location']['city']
			soupify_obj = BeautifulSoup(requests.get(url_http).text)
			reviews_array = []
			reviwes_dict = {}
			reviwes_dict['reviews:'] = yelp_url['snippet_text']
			reviews_array.append(reviwes_dict)
			try:
				business_external_url_array = []
				business_information_dict = {}
				business_name = soupify_obj.find('h1', attrs = {'class':'biz-page-title embossed-text-white'}).text.replace('\n','').replace('\u2019s','').strip()
				business_information_dict['business_name'] = soupify_obj.find('h1', attrs = {'class':'biz-page-title embossed-text-white'}).text.replace('\n','').replace('\u2019s','').strip()
				business_information_dict['exteral_url'] = soupify_obj.find('div', attrs = {'class':'biz-website'}).text.replace('Business website',' ').replace('\n','').strip()
				menu_url = soupify_obj.findAll('div', attrs = {'class':'iconed-list-story'})
				business_city_location = soupify_obj.find('span',attrs = {'itemprop':'addressLocality'}).string
				business_information_dict['city'] = soupify_obj.find('span',attrs = {'itemprop':'addressLocality'}).string
				business_external_url_array.append(business_information_dict)
				#store_data_together_array.append(business_information_dict)

			except AttributeError:
				continue
			
			for hyper_link in menu_url:
				hyper_link_info = hyper_link.findAll('a', attrs =  {'class':'menu-explore'})

				for href_info in hyper_link_info:
					href_text = href_info['href']
					fresh_dict = {}
					menu_url_obj = "http://www.yelp.com" + href_text
					print menu_url_obj
					second_soupify_request = BeautifulSoup(requests.get(menu_url_obj).text)
					second_page_main_wrapper = second_soupify_request.findAll('div', attrs = {'class':'menu-section'})
					business_name = second_soupify_request.find('div', attrs  = {'class':'column column-alpha '}).findAll('h1')
					for business_name_info in business_name:
						main_value_business = business_name_info.string.replace("Menu for", "").replace('\n','').strip()
					for menu_detailed_info  in second_page_main_wrapper:
						try:

		
							item_price = menu_detailed_info.findAll('li', attrs = {'class':'menu-item-price-amount'})
							item_name = menu_detailed_info.find('div', attrs = {'class':'menu-item-details'}).findAll('h3')
							item_description = menu_detailed_info.findAll('p', attrs = {'class':'menu-item-details-description'})
						#	business_name_info = menu_detailed_info.find('div', attrs = {'class':'column column-alpha'}).string
							for item_name_text, item_price_text,item_description_text in zip(item_price,item_name,item_description):
								item_name_text_info = item_name_text.string
								if item_name_text_info:

									menu_dict = {}
									menu_dict['additonal_information'] = business_external_url_array
									menu_dict['item_price'] = item_name_text_info.replace('\n','').strip()

									menu_dict['item_name'] = item_price_text.text.replace('\n','').strip()
									menu_dict['food_descrption'] = item_description_text.text.replace('\n','').strip()
									menu_dict['reviews'] = reviews_array
									store_data_together_array.append(menu_dict)
								#	sorted_info = sorted(store_data_together_array(menu_dict['item_price'], key = lambda x:float(x)))			

								

						except AttributeError:
							continue				

		key_value_dict[location]= store_data_together_array
		store_data_together_array = []

		with open('yelp/' + location + '.json','wb' ) as outfile:
				json.dump(key_value_dict,outfile,indent=4)			
				
						



# if __name__ == "__main__":
# 	get_school_data_information(city_info)