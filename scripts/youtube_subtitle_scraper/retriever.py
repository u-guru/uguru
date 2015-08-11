import requests, json, youtube_dl

# The application API key
YOUTUBE_API_KEY = "AIzaSyBaQmipq396vQVJMMjI9bXBUTO9JXkvBdE"

# Queries to search through
QUERIES = ["Spring 2015 UC Berkeley Lecture"]

# Process each query into a string that can be entered into
# the API request
def process_queries():
	# Iterate through every query
	for index, value in enumerate(QUERIES):
		# Replace every space with a plus sign
		QUERIES[index] = value.replace(' ', '+')
		
# Construct the URL for a given query
# param query: The query to put into the URL
def construct_query_url(query):
	# Place the query text and the API key into the URL, before returning it
	url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&type=video&videoCaption=closedcaption&key=" + YOUTUBE_API_KEY
	return url
	
# Construct the URL for a given video ID
# param video_id: The ID of the video to use
def construct_video_url(video_id):
	# Place the video ID into the URL, before returning it
	url = "https://www.youtube.com/watch?v=" + video_id
	return url
	
# Get a list of items for a given query
# param query: The query to search for
def get_items_for_query(query):
	# Get the URL for the given query
	url = construct_query_url(query)
	
	# Submit a GET request at the given URL
	request_text = requests.get(url).text
	
	# Place the items into a dictionary before returning it
	items = json.loads(request_text)['items']
	return items
	
# Get a video id from an item element
# param item: The item to get the id from
def get_id_for_item(item):
	# Get the ID from the item and return it
	return item['id']['videoId']
	
# Get a video URL for an items
# param item: The item to get the URL for
def get_url_for_item(item):
	# Get the video ID, then construct the URL and return it
	return construct_video_url(get_id_for_item(item))
		
if __name__ == "__main__":
	# Process all the queries
	process_queries()
	
	# An array to store all the items
	items = []
	
	# Get the items for each query and add them to the array
	for query in QUERIES:
		# Get the items for the query
		query_items = get_items_for_query(query)
		
		# Iterate through every item in the query's results
		for query_item in query_items:
			# Add the item to the array
			items.append(query_item)
	
	# Setup the YDL options
	ydl_opts = {
		'skip_download': True,
		'writesubtitles': True
	}
	
	# Iterate through every item in the array
	for item in items:
		# Get the URL of the item
		url = get_url_for_item(item)
		
		# Download the subtitles for the video
		with youtube_dl.YoutubeDL(ydl_opts) as ydl:
			ydl.download([url])