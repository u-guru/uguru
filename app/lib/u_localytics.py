import requests, json, urllib
API_TOKEN = '59adef668e495fa0217dfbf-adb6bf7e-66bf-11e5-beb4-0013a62af900'


API_URL = 'https://api.localytics.com/v1/'
API_KEY = 'd88c6235e74ab08cf52d91e-21462be2-6787-11e5-bed1-0013a62af900'
API_SECRET = 'b9b5f374e7ed1fe6f9a2e25-21463abc-6787-11e5-bed1-0013a62af900'
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




def queryUserEvents(options=None, past_days=30, limit=50000):
    if not options:
        options = {'dimensions':'event_name', 'metrics': 'users'}

    urls = API_URL + 'query'
    params = {
        'api_key': API_KEY,
        'api_secret': API_SECRET,
        'app_id': APP_ID,
    }

    params = dict(params.items() + options.items())

    headers = {'Content-type': 'application/json'}
    response = requests.get(url=urls, params=params, headers=headers)
    return response

def convertResponseTo(response, _type):
    if _type == 'json':
        return response.json()
    if _type == 'csv':
        return convertResponseToCsv(response)
    return response.text

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