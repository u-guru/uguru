from yelpapi import YelpAPI
import json
consumer_key = 'J6G3zEBCox3lUfKCcJBLDA'
consumer_secret = 'oXcvu0rV8NFvSMoRgf_FGZf-72Y'
token = 'So3cdsVQ-4zB0AAD8MF9VnuDF7XFsihw'
token_secret = 'PAi0q1eI-lFMI9Az0ZWQ_qEFQ_k'
location = 'UC BERKELEY'
yelp_api = YelpAPI(consumer_key, consumer_secret, token, token_secret)
search_results = yelp_api.search_query(location = location)
with open('yelp_business.json','wb') as outfile:
	json.dump(search_results,outfile,indent=4)
print search_results
# business_results = yelp_api.business_query(id=business_id, other_args)
# phone_search_results = yelp_api.phone_search_query(phone=phone_number, other_args)