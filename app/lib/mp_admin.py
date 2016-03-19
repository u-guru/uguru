from mixpanel import Mixpanel
import requests

mp = Mixpanel('28635453906d5f7d1a0383e6da3292df', 'd557efd7196433033a7a136fa016ef59', '3e9825a431a4944b5037c7bf6d909690')

def createAdminProfiles():
    teamNames = ['Samir', 'Jeselle', 'Gabrielle', 'Jason']
    teamLastNames = ['Makhani', 'Obina', 'Wee', 'Huang']
    index = 0
    for person in teamNames:
        mp.people_set(str(index), {
            '$distinct_id': str(index) + '',
            '$first_name': teamNames[index],
            '$last_name': teamLastNames[index],
            '$email': teamNames[index] + '@uguru.me'
            })
        index += 1

def getAdminProfiles():
    import urllib, urllib2, time #for sending requests
    params = {}
    params['api_key']= '28635453906d5f7d1a0383e6da3292df'
    # params['api_secret'] = 'd557efd7196433033a7a136fa016ef59'
    params['expire'] = int(time.time())+600 # 600 is ten minutes from now
    if 'sig' in params: del params['sig']
    params['sig'] = hash_args(mp, params)

    request_url = 'https://mixpanel.com/api/2.0/engage/?' + unicode_urlencode(params)

    request = requests.get(request_url).text

    #print request_url

    return request

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

data = getAdminProfiles()
from pprint import pprint
pprint(data)