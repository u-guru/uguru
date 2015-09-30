import requests, json, urllib
API_TOKEN = '59adef668e495fa0217dfbf-adb6bf7e-66bf-11e5-beb4-0013a62af900'


API_URL = 'https://api.localytics.com/v1/'
API_KEY = '59adef668e495fa0217dfbf-adb6bf7e-66bf-11e5-beb4-0013a62af900'
API_SECRET = '32aeecef7c6af8e30c01d10-adb6c3b0-66bf-11e5-beb4-0013a62af900'
APP_ID = 'e5f4bf9fa4b0cfa312def57-c65b66fe-66bf-11e5-0c2c-00deb82fd81f'


# import urllib2, base64

# request = urllib2.Request(API_URL + 'query')
# # You need the replace to handle encodestring adding a trailing newline
# # (https://docs.python.org/2/library/base64.html#base64.encodestring)
# values = {'app_id': APP_ID, 'metrics':'users'}

# data = urllib.urlencode(values)
# base64string = base64.encodestring('%s:%s' % (API_KEY, API_SECRET)).replace('\n', '')
# request.add_header("Authorization", "Basic %s" % base64string)
# request.add_header("Content-type", "application/vnd.localytics.v1+hal+json;type=ResultSet")

# try:
#     result = urllib2.urlopen(request, data=data)
# except Exception as e:
#     print e

urls = API_URL + 'profiles'
params = {
    'api_key': API_KEY,
    'api_secret': API_SECRET,
    'app_id': APP_ID,
    'metrics': 'profiles',
    'dimensions':'profile_attribute_key'
}
headers = {'Content-type': 'application/json'}
print requests.get(url=urls, params=params, headers=headers)

# print result.text

## User

## update one


##


## query_all


## Campaigns

# from requests_oauthlib import OAuth1
##


# auth = OAuth1(API_KEY, API_SECRET)
# params = {'api_key': API_KEY, 'api_secret': API_SECRET}
# print requests.get(API_URL + 'query', auth=auth, headers=headers).text
# print requests.get(API_URL + 'query', auth=auth, headers=headers).text

# query_url = API_URL + 'query'
# from requests_oauthlib import OAuth1

# def query(app_id):

#     params = json.dumps({
#         'dimensions': 'event_name',
#         'user': app_id,
#         'api_key': API_KEY,
#         'api_secret': API_SECRET
#     })
#     return request_localytics_api(params, 'query')

# def request_localytics_api(params={}, endpoint=''):
#     headers = {'content-type', 'application/json'}
#     headers = {"ACCEPT":'application/vnd.localytics.v1+hal+json'}
#     url = API_URL + target
#     response = requests.get(url=url, params=params, headers=headers)

#     return json.loads(response.text)

# from pprint import pprint
# response = requests.get(API_URL + 'query',  headers={'Authorization': API_KEY + ':' + API_SECRET}).text
# print response
# results = query(APP_ID)
# pprint (results)