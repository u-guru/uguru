from mixpanel import Mixpanel
import requests

mp = Mixpanel('28635453906d5f7d1a0383e6da3292df', 'd557efd7196433033a7a136fa016ef59', '3e9825a431a4944b5037c7bf6d909690')

import sys
args = sys.argv

def saveDictToElementsJson():
    _dict = getMostUpdatedMPElements()
    saveElementsJson(_dict)
    print "saved to elements.json"

def formatMPResponse(resp):
    import json
    arr = json.loads(resp)
    return arr

def saveElementsJson(_dict):
    import json
    with open('./app/lib/elements.json', 'wb') as fp:
        json.dump(_dict, fp, sort_keys = True, indent = 4)

### Initialize elements component
def syncLocalElementsToMP():
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    elements = loadMostUpdatedElementsJson()
    mp.people_set('4', {
        'elements': elements
    })
    print "local elements successfully synced"

def loadMostUpdatedElementsJson():
    import json
    _dict = json.load(open('./app/lib/elements.json'))
    return _dict


# "tests": [
#                         {
#                             "screen_size": "small",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "xl",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "small",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "chrome",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "small",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "xl",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "small",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "firefox",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "small",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "xl",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "mobile"
#                         },
#                         {
#                             "screen_size": "small",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "medium",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": "large",
#                             "platform": "safari",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "desktop"
#                         },
#                         {
#                             "screen_size": null,
#                             "platform": "ios",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "app"
#                         },
#                         {
#                             "screen_size": null,
#                             "platform": "ios",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "safari"
#                         },
#                         {
#                             "screen_size": null,
#                             "platform": "android",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "app"
#                         },
#                         {
#                             "screen_size": null,
#                             "platform": "android",
#                             "test_client": "manual",
#                             "passed": false,
#                             "test_status": "unsure",
#                             "type": "chrome"
#                         }

## client = ['chrome', 'safari', 'firefox', 'ios', 'android']
## client_type= ['desktop', 'mobile', 'app', 'device-safari', 'device-chrome']
## window_size(Optional) = ['small', 'medium', 'large', 'xl'] --> only for browser, not for anything on apps
## test_passed = True, False based on your result
def getTestIndexFromClientAndType(client, client_type, window_size):
    if (client == 'chrome'):
        if (client_type == 'mobile') and window_size == 'small':
            return 0
        if (client_type == 'mobile') and window_size == 'medium':
            return 1
        if (client_type == 'mobile') and window_size == 'large':
            return 2
        if (client_type == 'mobile') and window_size == 'xl':
            return 3
        if (client_type == 'desktop') and window_size == 'small':
            return 4
        if (client_type == 'desktop') and window_size == 'medium':
            return 5
        if (client_type == 'desktop') and window_size == 'large':
            return 6
    if (client == 'firefox'):
        if (client_type == 'mobile' and window_size =='small'):
            return 7
        if (client_type == 'mobile' and window_size =='medium'):
            return 8
        if (client_type == 'mobile' and window_size =='large'):
            return 9
        if (client_type == 'mobile' and window_size =='xl'):
            return 10
        if (client_type == 'desktop' and window_size =='small'):
            return 11
        if (client_type == 'desktop' and window_size =='medium'):
            return 12
        if (client_type == 'desktop' and window_size =='large'):
            return 13
    if (client == 'safari'):
        if (client_type == 'mobile' and window_size =='small'):
            return 14
        if (client_type == 'mobile' and window_size =='medium'):
            return 15
        if (client_type == 'mobile' and window_size =='large'):
            return 16
        if (client_type == 'mobile' and window_size =='xl'):
            return 17
        if (client_type == 'desktop' and window_size =='small'):
            return 18
        if (client_type == 'desktop' and window_size =='medium'):
            return 19
        if (client_type == 'desktop' and window_size =='large'):
            return 20
    if (client == 'ios'):
        if (client_type == 'app'):
            return 21
        if (client_type == 'safari'):
            return 22
    if (client == 'android'):
        if (client_type == 'app'):
            return 23
        if (client_type == 'chrome'):
            return 24


def updateFromTravisClient(client, client_type, window_size, filename, scene_index, test_passed=False):
    import requests
    test_client="travis"
    admin_token = "9c1185a5c5e9fc54612808977ee8f548b2258d34"
    full_url = "http://192.168.42.70:5000/api/v1/admin/" + admin_token + '/dashboard'
    test_index = getTestIndexFromClientAndType(client, client_type, window_size)
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    # try:
    import json
    json_dump = json.dumps({
        'scene': {'index': scene_index},
        'test_index': test_index,
        'test_update': True,
        'filename': filename,
        'test_passed': test_passed,
        'filename':filename,
        'test_client': 'travis'
        })

    response = requests.put(url=full_url, data=json_dump, headers=headers)
    print type(response.status_code)
    return response.status_code
        # raise
        # return True

        # pprint(response.__dict__)
        ## update went through to the server

    ## update went through to the server
    # except:
    #     print "ERROR: Something went wrong with Uguru Dashboard update from Travis test -- please let Samir know \n\n%s\n%s\n%s" % (str(client), str(client_type), str(window_size))
    #     raise
    #     return False

def uguruAPI(arg='', _json=None, _type='get'):
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

    if arg: arg = '/' + arg
    BASE_URL = 'http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities%s' % arg

    if _type == 'get':
        print BASE_URL
        response = requests.get(BASE_URL).text
        return json.loads(response)



    if _type =='put':
        return requests.put(url=BASE_URL, data=json.dumps(_json), headers=headers).text

    if _type =='post':
        return requests.post(url=BASE_URL, data=json.dumps(_json), headers=headers).text

## Uploads a screenshot to amazon and returns URL as property
def uploadedScreenshotToAmazon(state_ref, file_location):
    pass

def unicode_urlencode(params):
    import urllib
    """
        Convert lists to JSON encoded strings, and correctly handle any
        unicode URL parameters.
    """
    if isinstance(params, dict):
        params = params.items()
    for i, param in enumerate(params):
        if isinstance(param[1], list):
            params[i] = (param[0], json.dumps(param[1]),)

    return urllib.urlencode(
        [(k, isinstance(v, unicode) and v.encode('utf-8') or v) for k, v in params]
    )

def hash_args(self, args, secret=None):
    import hashlib
    """
        Hashes arguments by joining key=value pairs, appending a secret, and
        then taking the MD5 hex digest.
    """
    for a in args:
        if isinstance(args[a], list): args[a] = json.dumps(args[a])

    args_joined = ''
    for a in sorted(args.keys()):
        if isinstance(a, unicode):
            args_joined += a.encode('utf-8')
        else:
            args_joined += str(a)

        args_joined += '='

        if isinstance(args[a], unicode):
            args_joined += args[a].encode('utf-8')
        else:
            args_joined += str(args[a])

    hash = hashlib.md5(args_joined)
    hash.update('d557efd7196433033a7a136fa016ef59')
    return hash.hexdigest()

def getQueryDict(url, params={}):
    import urllib, urllib2, time #for sending requests
    base_params = {}
    base_params['api_key']= '28635453906d5f7d1a0383e6da3292df'
    # params['api_secret'] = 'd557efd7196433033a7a136fa016ef59'
    base_params['expire'] = int(time.time())+600 # 600 is ten minutes from now
    base_params.update(params)

    if 'sig' in base_params: del base_params['sig']
    base_params['sig'] = hash_args(mp, base_params)

    request_url = 'https://mixpanel.com/api/2.0/%s/?%s' % (url ,unicode_urlencode(base_params))

    request = requests.get(request_url).text
    return request

def getMostUpdatedMPElements():
    user = formatMPResponse(getQueryDict('engage', {'distinct_id': 4}))
    elements =  user['results'][0]['$properties']['elements']
    return elements

if 'save' in args and len(args) == 2:
    saveDictToElementsJson()

if 'update' in args and len(args) == 2:
    syncLocalElementsToMP()

if 'sync' in args and len(args) == 2:
    print "syncing local --> MP"
    syncLocalElementsToMP()
    from time import sleep
    sleep(1)
    print "syncing MP --> Local"
    saveDictToElementsJson()

if 'test' in args and len(args) == 2:
    # updateFromTravisClient('firefox', 'mobile', 'splash-mad-lib', 'mad-lib-testing-1', 'mad-lib-testing-1-substate-3', 'medium', False)
    ## -arg1 client
    ## -arg2 client_type
    ## -arg3 window-size (None for mobile device)
    ## -arg4 filename
    ## -arg5 scene #1 (i.e. scene = 1 for "on components enter (browser render) ")
    updateFromTravisClient('android', 'app', None, 'layouts/splash.json', 1, True)
    ## returns the integer(python type) 200 type<'int'> if successfull

if 'supported' in args and len(args) == 2:
    supported_files = ['layouts/splash.json']
    for _file in supported_files:
        print _file

if 'status' in args and len(args) == 4:
    import json, requests
    file_name = args[-2]
    scene_index = int(args[-1])

    response = json.loads(requests.get('https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json').text)
    from pprint import pprint
    scene_states = response.get('scene_states')
    index = 1
    for test in scene_states[scene_index - 1]['tests']:
        print "%s. %s %s %s" % (index, test['platform'].upper(), test['type'].upper(), str(test['passed']).upper())
        index += 1




