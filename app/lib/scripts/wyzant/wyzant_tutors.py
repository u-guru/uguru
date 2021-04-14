import requests, json
​
BASE_URL = 'https://www.wyzant.com/AutoCompleteHandler.ashx?q=%s&searchType=SubjectSearch'
​
​
def queryWyzantAutocomplete(text):
	response = requests.get(BASE_URL % text).text
	return response
​
print queryWyzantAutocomplete('a')