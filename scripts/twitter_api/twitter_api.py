from TwitterAPI import TwitterAPI
import json


SEARCH_TERM_ARRAY = ['#college','#university']


CONSUMER_KEY = 'phJEM5Yv6ho6uwIIcnNOaFPSR'
CONSUMER_SECRET = 'Qe3dXE45iLtth3tp9Tx7rW4GB7INL19hS6WPSheP4BsnrnGHfP'
ACCESS_TOKEN_KEY = '3300745353-mDb01NcEVC4LackYCf991Au21FHIrRnUc5jfkry'
ACCESS_TOKEN_SECRET = 'Iq8nIPJHdRCISYWJsO04ppoVJm6XmLr4WgyUTp5ZNU7xL'


api = TwitterAPI(CONSUMER_KEY,
                 CONSUMER_SECRET,
                 ACCESS_TOKEN_KEY,
                 ACCESS_TOKEN_SECRET)


for search_term in SEARCH_TERM_ARRAY:
	tweets = api.request('search/tweets', {'q': search_term,'count': 10})
	text = tweets.text
	json_dump = json.loads(text)
	with open("tweets.json",'wb') as outfile:
		json.dump(json_dump,outfile,indent=4)
	with open("tweets.json") as data_file:
		data_info = json.load(data_file)['statuses']
		for info in data_info:
			retweet_count =  info['retweet_count']
			if retweet_count >= 1:
				print"Tweet:%s" % info['text']
				print"UserID:%s" % info['id']
				print"Retweeted count %s" % info['retweet_count']
				print"Was Retweeted? %s" % info['retweeted']
				