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
## window_size(Optional) = ['small', 'medium', 'large', 'xl'] --> only for browser, not for anything on apps
## test_passed = True, False based on your result
def updateFromTravisClient(client, client_type, scene_ref, state_ref, substate_ref=None, window_size=None, test_passed=False):
    import requests
    test_client="travis"
    admin_token = "9c1185a5c5e9fc54612808977ee8f548b2258d34"
    full_url = "http://localhost:5000/api/v1/admin/" + admin_token + '/dashboard'
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    try:
        import json
        json_dump = json.dumps({
            'client': client,
            'client_type': client_type,
            'window_size': str(window_size),
            'test_results': test_passed,
            'type': 'testing',
            'action': 'update',
            'scene': scene_ref,
            'state': state_ref,
            'substate': substate_ref,
            'test_client': 'travis',
            'test_status': test_passed
            })
        try:
            response = requests.put(url=full_url, data=json_dump, headers=headers).text
            return True
        except:
            return False
        # pprint(response.__dict__)
        ## update went through to the server

    ## update went through to the server
    except:
        print "ERROR: Something went wrong with Uguru Dashboard update from Travis test -- please let Samir know \n\n%s\n%s\n%s" % (str(client), str(client_type), str(window_size))
        raise
        return False

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
    updateFromTravisClient('android', 'app', 'splash-mad-lib', 'mad-lib-testing-1', 'mad-lib-testing-1-substate-3', 'None', True)




