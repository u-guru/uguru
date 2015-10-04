import upwork, httplib2, requests, urlparse
httplib2.Http(disable_ssl_certificate_validation=True).request('https://www.odesk.com:443')
from rauth import OAuth1Service
import json


# client = upwork.Client(key,secret)
# authorize_url = client.auth.get_authorize_url()
# response = requests.get(authorize_url)
try:
    read_input = raw_input
except NameError:
    read_input = input

consumer_keys = '8945fabd1900de9746d74e5782d9b623'
consumer_secrets	 = '918aeab388eeb19d'
upWork = upwork.Client(consumer_keys,consumer_secrets)
# # upWork = OAuth1Service(
#     #name='upwork',
#     consumer_key='8945fabd1900de9746d74e5782d9b623',
#     consumer_secret='918aeab388eeb19d',
#     request_token_url='https://www.upwork.com/api/auth/v1/oauth/token/request',
#     access_token_url='https://www.upwork.com/api/auth/v1/oauth/token/access',
#     authorize_url='https://www.upwork.com/services/api/auth',
#     base_url='https://www.upwork.com/api')
access_token, access_token_secret = upWork.auth.get_request_token()
print access_token,access_token_secret
authorize_url = upWork.auth.get_authorize_url()
print authorize_url
#authorize_urls = requests.get(authorize_url)
#print authorize_urls.text
#authorize_url = upWork.get_authorize_url()

#print('Visit this URL in your browser: {url}'.format(url=authorize_url))
#pin = read_input('Enter PIN from browser: ')

