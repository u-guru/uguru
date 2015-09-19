from yelpapi import YelpAPI
import json





consumer_key = 'J6G3zEBCox3lUfKCcJBLDA'
consumer_secret = 'oXcvu0rV8NFvSMoRgf_FGZf-72Y'
token = 'So3cdsVQ-4zB0AAD8MF9VnuDF7XFsihw'
token_secret = 'PAi0q1eI-lFMI9Az0ZWQ_qEFQ_k'
yelp_api = YelpAPI(consumer_key, consumer_secret, token, token_secret)


city_info = []
with open('fa15_final.json') as data_file:
	data_info = json.load(data_file)
	for city in data_info:
		cities = city['city']
		city_info.append(cities)


def get_school_data_information(city_info):
	city_array = []
	for loop_cities in city_info[0:5]:
		dictionary = {}
		search_results = yelp_api.search_query(location = loop_cities)
		dictionary['business_information:'] = search_results
		city_array.append(dictionary)
		with open('yelp_school_data','wb') as outfile:
			json.dump(city_array,outfile,indent=4)


if __name__ == "__main__":
	get_school_data_information(city_info)