import requests, json, time

zipcode = {'zipcode':'94530'}


parsed_json = json.loads(requests.get("https://munchery.com/menus.json?page=1",params = zipcode).text)['menu']
print parsed_json
#CHECK_URL = "https://api.spoonrocket.com/userapi/menu.json?lat=37.77340877788322&lng=-122.42621837183833"

#content = json.loads(requests.get("https://munchery.com/menus.json?page=1", params = zipcode))['menu']

#print content


