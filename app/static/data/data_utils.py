import json

def loadJsonArrayFromFile(filename):
    arr = json.load(open(filename))
    return arr

def loadJsonDictFromFile(filename):
    _dict = json.dict(open(filename))
    return _dict

def updateMasterWithMailgunEmails(fileA, fileB):
    focused_universities = loadJsonArrayFromFile(fileA)
    mailgun_universities = loadJsonArrayFromFile(fileB)
    mailgun_count = len(mailgun_universities)
    print mailgun_count, 'mailgun universities'
    count = 0
    for uni_focused in focused_universities:
        for uni_mailgun in mailgun_universities:
            if uni_focused['name'] == uni_mailgun['name']:
                uni_focused['num_emails'] = uni_mailgun['count']

    saveObjToJson(focused_universities, 'fa15_all2')

def sortArrayObjByKey(array, keyString, reverse=True):
    return sorted(array, key=lambda k:k[keyString], reverse=reverse)

def saveObjToJson(obj, filename):
    with open(filename + '.json', 'wb') as fp:
        json.dump(obj, fp, indent = 4)

updateMasterWithMailgunEmails('fa15_all.json', 'mailgun.json')

