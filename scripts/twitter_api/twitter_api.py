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

search_term_college = ['#college']
query_array = ['#college' , '#university']
two_query_searches = ['#college','#university']
california_location = ['-122.75,36.8,-121.75,37.8']
two_location_query_searches = ['#college','#university']
sort_by_date = ['#college']
output = 'two_searches.json'
tweet = "TWEETTTT"
def get_last_tweets(search_term_college): #ONE #1

		tweets = api.request('search/tweets', {'q': search_term_college, 'result_type':'recent'})
		text = tweets.text
		json_dump = json.loads(text)
		with open("query_college.json",'wb') as outfile:
			json.dump(json_dump,outfile,indent=4)

def get_last_tweets(query_array): # EITHER #2
	from random import randrange
	random_index = randrange(0,len(query_array))
	tweets = api.request('search/tweets',{'q':query_array[random_index],'result_type':'recent'})
	text = tweets.text
	json_dump = json.loads(text)
	with open("query_random_query.json",'wb') as outfile:
		json.dump(json_dump,outfile,indent=4)

def get_last_tweets(two_query_searches): # AND #3
	for both_searches in two_query_searches:
		tweets = api.request('search/tweets',{'q':both_searches,'result_type':'recent'})
		text = tweets.text
		json_dump = json.loads(text)
		with open("two_searches.json",'wb') as outfile:
			json.dump(json_dump,outfile,indent=4)


def get_last_tweets(location): #LOCATION EITHER #4
	from random import randrange
	random_index = randrange(0,len(query_array))
	tweets = api.request('search/tweets',{'q':query_array[random_index],'result_type':'recent','geocode':california_location})
	text = tweets.text
	json_dump = json.loads(text)
	with open("california_location_data.json",'wb') as outfile:
		json.dump(json_dump,outfile,indent=4)

def get_last_tweets(two_locaton_query_searches): #LOCATION AND #5
	for two_query in two_query_searches:
		tweets = api.request('search/tweets',{'q':two_query,'result_type':'recent','geocode':california_location})
		text = tweets.text
		json_dump = json.loads(text)
		with open("california_location_data_for_two_query.json",'wb') as outfile:
			json.dump(json_dump,outfile,indent=4)

def get_most_popular_tweets(sort_by_date):
	tweets = api.request('search/tweets', {'q':sort_by_date, 'result_type':'recent','count':10})
	text = tweets.text
	json_dump = json.loads(text)
	with open("recent_tweets_max_value_10.json",'wb') as outfile:
		json.dump(json_dump,outfile,indent=4)
	with open("recent_tweets_max_value_10") as datafile:
			data_info = json.load(data_file)['statuses']
			for info in data_info:
				retweet_count =  info['retweet_count']
				if retweet_count >= 1:
					print"Tweet:%s" % info['text']
					print"UserID:%s" % info['id']
					print"Retweeted count %s" % info['retweet_count']
					print"Was Retweeted? %s" % info['retweeted']


def get_most_frequent_users(output):
	with open(output) as data_file:
		data_info = json.load(data_file)['statuses']
		for info in data_info:
			retweet_count = info['retweet_count']
			print "UserID:%s" % info['id']
			print "Retweeted Count:%s" % info['retweet_count']

def post_a_tweet(tweet):
	r = api.request('statuses/update', {'status': TWEET_TEXT})
	print r

if __name__ == "__main__":
###Call FUNCTIONS HERE.
