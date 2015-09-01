import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs

httplib2.Http(disable_ssl_certificate_validation=True)#.request('https://www.odesk.com:443')

key = '8945fabd1900de9746d74e5782d9b623'
secret = '918aeab388eeb19d'
client = upwork.Client(key,secret)
authorize_url =  client.auth.get_authorize_url()
soup = requests.get(authorize_url)

print soup.url
#verifier = raw_input('Enter oauth_verifier: ')
#oauth_access_token, oauth_access_token_secret = client.auth.get_access_token(verifier)
#client = upwork.Client(key, secret,
 #                     oauth_access_token=oauth_access_token,
 #                     oauth_access_token_secret=oauth_access_token_secret)


def post_a_job():

	owner = '1850815'
	title = 'Testing 1234'
	rate = 'hourly'
	descrption = 'Testing purposes'
	private_or_not = 'private'
	category = 'Web Development'
	sub_category = 'Web Programming'
	budget = '10'
	duration = '10'
	client.hr.post_job(owner,title,rate,descrption,private_or_not,category,sub_category,budget,duration)


#post_a_job()