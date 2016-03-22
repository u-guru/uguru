from mixpanel import Mixpanel
import requests

mp = Mixpanel('28635453906d5f7d1a0383e6da3292df', 'd557efd7196433033a7a136fa016ef59', '3e9825a431a4944b5037c7bf6d909690')

def createAdminProfiles():
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    teamNames = ['Samir', 'Jeselle', 'Gabrielle', 'Jason', 'Base']
    teamLastNames = ['Makhani', 'Obina', 'Wee', 'Huang', 'Component']
    index = 0
    for person in teamNames:
        mp.people_set(str(index), {
            '$distinct_id': str(index) + '',
            '$first_name': teamNames[index],
            '$last_name': teamLastNames[index],
            '$email': teamNames[index] + '@uguru.me'
            })
        index += 1

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

def formatMPResponse(resp):
    import json
    arr = json.loads(resp)
    return arr

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


def loadMostUpdatedElementsJson():
    import json
    _dict = json.load(open('./app/lib/elements.json'))
    return _dict


### Initialize elements component
def initBaseComponent():
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    elements = loadMostUpdatedElementsJson()
    mp.people_set('4', {
        'elements': elements
        })
    print 'elements.json updated'


## Updates one based on changes final step
def updateElementComponent(_dict):
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    mp.people_set('4', {
        'elements': _dict
    })




## Adds a new element to any of the dashboard section
## todo create cli
def addNewElement(element, _dict):
    from elements import base_elements
    mp_elements_dict = getMostUpdatedMPElements()
    new_id = len(mp_elements_dict[element]) + 1
    _dict['id'] = new_id
    mp_elements_dict[element].append(_dict)
    updateElementComponent(mp_elements_dict)
    return mp_elements_dict

def getMostUpdatedMPElements():
    user = formatMPResponse(getQueryDict('engage', {'distinct_id': 4}))
    elements =  user['results'][0]['$properties']['elements']
    return elements

def applyChangeToElement(section, _id, change_dict):
    elemToChange = None
    mpRecentElements = getMostUpdatedMPElements()
    if getMostUpdatedElements.get(section):
        allSectionElems = mpRecentElements[section]
        for elem in allSectionElems:
            if elem.get('id') == _id:
                elemToChange = elem
                elemToChange['missing_fields'] = []
                break
        if elemToChange:
            changeDictKeys = change_dict.keys()
            elemToChange['previous_elem_spec'] = dict(elemToChange)
            for key in changeDictKeys:
                if key in elemToChange:
                    elemToChange[key] = changeDictKeys[key]
                else:
                    elemToChange['missing_fields'].append({key: changeDictKeys[key]})
    mpRecentElements[section] = allSectionElems
    updateElementComponent(mpRecentElements)
    return mpRecentElements



### resolve previous elem spec
### resolving missing fields
def resolveElements():
    import json
    _dict = json.load(open('./app/lib/elements.json'))
    return _dict

def saveDictToElementsJson():
    import json
    _dict = getMostUpdatedMPElements()
    from pprint import pprint
    with open('./app/lib/elements.json', 'wb') as fp:
        json.dump(_dict, fp, sort_keys = True, indent = 4)
    print "saved to elements.json"

def resolveDictToElementsJson():
    import json
    master_elements_dict = json.load(open('./app/lib/elements.json'))
    mp_elements_dict = getMostUpdatedMPElements()
    return master_elements_dict == mp_elements_dict

import sys
args = sys.argv
if 'save' in args:
    saveDictToElementsJson()
if 'update' in args:
    initBaseComponent()
