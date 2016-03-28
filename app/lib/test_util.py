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

## client = ['chrome', 'safari', 'firefox', 'ios', 'android']
## client_type= ['desktop', 'mobile', 'app', 'device-safari', 'device-chrome']
## window_size = []
## test_client = either("travis", "manual") -- if you toggle checkbox on dashboard, it will say manual, if the test is updated from
## test_passed = True, False based on your result
def updateFromTravisClient(client, client_type, test_client="travis", window_size=None, test_passed=False):
    pass

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