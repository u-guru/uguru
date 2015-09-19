from yelp import ReviewSearchApi
results = ReviewSearchApi(client_key=<my_key>, output="json").by_location("Mission, San Francisco CA")