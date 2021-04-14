### REF: https://developers.google.com/android-publisher/api-ref/
### REF: https://developers.google.com/android-publisher/authorization
### keytool -exportcert -alias uguru -keystore uguru.keystore -list -v

import requests, json

CLIENT_ID = "400866151017-bkqhf4rr1r69umvp64p0una0hhm3oro9.apps.googleusercontent.com"
BASE_AUTH = "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/androidpublisher&response_type=code&access_type=offline&redirect_uri=...&%s=..."

def openJson(filename):
  return json.loads(filename)

def getAccessToken():
  json_dict = openJson('web_client.json')
  print json_dict
  # return BASE_AUTH % CLIENT_ID

getAccessToken()

