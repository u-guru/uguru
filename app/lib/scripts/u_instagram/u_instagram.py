from instagram.client import InstagramAPI
import json,time
import requests


## Make sure each photo has all image size urls (small, medium, large)
## Searchs ONE taeg
## Returns an array of dictionaries, where each dictionary has details of one
## instagram image. These are the details I want about each post/photos
##  - Different size urls of photos --> link DIRECTLY to image, not instagram page w/ image
##  - # of hearts
##  - time posted
##  - # of comments
##  - user_instagram account who posted
##  - # of followers of the user who posted
## Time will take # of hours in the past.


empty_array = {}

SEARCH_QUERY = 'brownie'
access_token = "1306759548.7d39735.d2314437da04454fb26851f86f25a3e8"
client_secret = "ceac5c8f9d8d4717a91246dfcf482f29"
client_id = "7d397355257f45f1b62ca927aebdd481"
api = InstagramAPI(client_id=client_id, client_secret=client_secret)
output = 'liked_pic.json'

def mostPopularPhotosWithTag(hours=24, tag_string="cookies"):
	first_api_call = 'https://api.instagram.com/v1/tags/'+tag_string+'/media/recent?access_token='+access_token
	response = requests.get(first_api_call).text
	load_json_obj = json.loads(response)['data']
	for data_id in load_json_obj:
		media_stripped_info = data_id['id']
	 	most_likes_media = api.media_likes(media_stripped_info)
	 	media_id_dict = {}
		second_url = 'https://api.instagram.com/v1/media/'+media_stripped_info+'?'+'access_token='+access_token
		request_info = requests.get(second_url).text
		main_key = media_stripped_info
		media_id_dict['amount_of_likes']= json.loads(request_info)['data']['likes']['count']
		empty_array[main_key]=media_id_dict
		with open(output,'wb') as outfile:
			json.dump(empty_array,outfile,indent=4)

	with open(output) as max_likes:
		json_load_data = json.load(max_likes)
		key,value = max(json_load_data.iteritems(),key=lambda x:x[1])
		return key,value


### Searches MANY tags && and returns photos that
### have at least ONE of the tags
### Time will take # of hours in the past.
def mostPopularPhotosWithTagsOR(hours=24, tag_arr=[]):
	for query_items in tag_arr[0]:
	#specifiy a index number you want to run from an array:
		first_api_call = 'https://api.instagram.com/v1/tags/'+query_items+'/media/recent?access_token='+access_token
		response = requests.get(first_api_call).text
		load_json_obj = json.loads(response)['data']
		for data_id in load_json_obj:
			media_stripped_info = data_id['id']
		 	most_likes_media = api.media_likes(media_stripped_info)
		 	media_id_dict = {}
			second_url = 'https://api.instagram.com/v1/media/'+media_stripped_info+'?'+'access_token='+access_token
			request_info = requests.get(second_url).text
			main_key = media_stripped_info
			media_id_dict['amount_of_likes']= json.loads(request_info)['data']['likes']['count']
			empty_array[main_key]=media_id_dict
			with open(output,'wb') as outfile:
				json.dump(empty_array,outfile,indent=4)

	with open(output) as max_likes:
		json_load_data = json.load(max_likes)
		key,value = max(json_load_data.iteritems(),key=lambda x:x[1])
	return key,value


### Searches MANY tags && and returns photos that
### have ALL tags. If it is missing one of them, don't return it.
### Time will take # of hours in the past.
def mostPopularPhotosWithTagsAND(hours=24, tag_arr=[]):
	for query_items in tag_arr:
		first_api_call = 'https://api.instagram.com/v1/tags/'+query_items+'/media/recent?access_token='+access_token
		response = requests.get(first_api_call).text
		load_json_obj = json.loads(response)['data']
		for data_id in load_json_obj:
			media_stripped_info = data_id['id']
		 	most_likes_media = api.media_likes(media_stripped_info)
		 	media_id_dict = {}
			second_url = 'https://api.instagram.com/v1/media/'+media_stripped_info+'?'+'access_token='+access_token
			request_info = requests.get(second_url).text
			main_key = media_stripped_info
			media_id_dict['amount_of_likes']= json.loads(request_info)['data']['likes']['count']
			empty_array[main_key]=media_id_dict
			with open(output,'wb') as outfile:
				json.dump(empty_array,outfile,indent=4)

	with open(output) as max_likes:
		json_load_data = json.load(max_likes)
		key,value = max(json_load_data.iteritems(),key=lambda x:x[1])
	return key,value


### Takes an instagram username, and returns the photos
### uploaded in the past 24 hours
def getRecentPhotosFromUser(insta_username, hours=24):
	user_name = 'https://api.instagram.com/v1/users/'+insta_username+'/media/recent/?access_token='+access_token
	response = requests.get(user_name).text
	load_json_obj = json.loads(response)
	return load_json_obj

### Regardless of time, it returns the last 20 photos taken
### for an instauser account
def getPhotosFromUser(insta_username, count=20):
	user_photos = 'https://api.instagram.com/v1/users/'+insta_username+'/media/recent/?access_token='+access_token+'?'+count
	response = requests.get(user_photos).text
	load_json_obj = json.loads(response)
	return load_json_obj

### [SAVE FOR LAST] Searches profile of user, returns the time
### they were last active.
### Return format must be python datetime
def lastActiveTime(insta_username):
	import time
	last_active = 'https://api.instagram.com/v1/users/'+insta_username+'/media/recent/?access_token='+access_token
	response = requests.get(last_active).text
	load_json_obj = json.loads(response)['data']
	for time_info in load_json_obj:
		python_date_time = time.strftime("%D %H:%M", time.localtime(int(time_info['created_time'])))
		return python_date_time

### [SAVE FOR LAST] Save this one for last: CHALLENGING
### Get me an array of all the instagram followrs for one post
def getUserFollowers(insta_username, count=20):
	user_followers = 'https://api.instagram.com/v1/users/'+insta_username+'/followed-by?access_token='+access_token+'&'+count
	response = requests.get(user_followers).text
	load_json_obj = json.loads(response)['data']
	return load_json_obj

mostPopularPhotosWithTag(24, "cs10")
