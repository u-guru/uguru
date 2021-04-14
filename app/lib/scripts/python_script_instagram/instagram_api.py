from instagram.client import InstagramAPI
import json,time
import requests

#STEP 1 - USING A PYTHON INSTAGRAM API
#STEP 2 - PYTHON API HAS EVERYTHING THAT I NEED TO FINISH THIS TASK.
#STEP 3 - Following best practises for INSTAGRAM API.

SEARCH_QUERY = 'brownie'
access_token = "1306759548.7d39735.d2314437da04454fb26851f86f25a3e8"
client_secret = "ceac5c8f9d8d4717a91246dfcf482f29"
client_id = "7d397355257f45f1b62ca927aebdd481"
api = InstagramAPI(client_id=client_id, client_secret=client_secret)
media_search = api.media_search('brownies', count, lat, lng, min_timestamp, max_timestamp)
output = 'media_parsed_data.json'
amount_of_likes = 'likes_amount_json_file.json'


def get_media_id(output):
	array = []
	for info in media_search:
		dictionary = {}
		parsed_media =  str(info).replace('Media:','')
		dictionary['media_id'] = parsed_media
		array.append(dictionary)
	with open(output,'wb') as data_file:
		json.dump(array,data_file,indent=4)


def get_users_who_liked_the_media(output):
	array_s = []
	with open(output) as data_id_file:
		load_data = json.load(data_id_file)
		for info in load_data:
			media_stripped_info = info['media_id'].strip()
		 	most_likes_media = api.media_likes(media_stripped_info)
		 	media_id_dict = {}
			media_id_dict['media_id'] = media_stripped_info
			url = 'https://api.instagram.com/v1/media/'+media_id_dict['media_id']+'?'+'access_token='+access_token
			request_info = requests.get(url).text
			media_id_dict['popular_picture_like_amount'] = json.loads(request_info)['data']['likes']['count']
			array_s.append(media_id_dict)
			with open(amount_of_likes,'wb') as outfile:
				json.dump(array_s,outfile,indent=4)


def get_the_max_value_of_likes(amount_of_likes):
	with open(amount_of_likes) as max_likes:
		json_load_data = json.load(max_likes)
		print max(json_load_data)



if __name__ == "__main__":
	get_media_id(output)
	get_users_who_liked_the_media(output)
	get_the_max_value_of_likes(amount_of_likes)
#(u'1306759548.7d39735.d2314437da04454fb26851f86f25a3e8', {u'username': u'biplov_dahal', u'bio': u'"If I ever wanted to kill myself I\'d have to climb up to the level of your ego and then jump down to your IQ level"', u'website': u'', u'profile_picture': u'https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-19/10995242_1608696342677076_1436008426_a.jpg', u'full_name': u'Biplov Dahal', u'id': u'1306759548'})
