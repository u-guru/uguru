import requests,json,time
from bs4 import BeautifulSoup

names_arr = ['Ben']

for names in names_arr:
	url = 'http://find.pitt.edu/?__LASTFOCUS=&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTg2OTE2NTg2Nw9kFgJmD2QWAgICD2QWAgIBD2QWAgIBDw8WAh4HVmlzaWJsZWhkZGQsTNWhHJ7OI7nqUarzDyKNPbw8SA%3D%3D&__VIEWSTATEGENERATOR=CA0B0334&__SCROLLPOSITIONX=0&__SCROLLPOSITIONY=0&__EVENTVALIDATION=%2FwEdAAPI6XXeaXfNPt%2FRm8KUdIiyRYsaCrWKi95W0b8nCAvSLeqfMkHRUw0gVeOjjP9Wnqg2hZxvc%2BGH%2BJEVPbThX7EDgGtMJQ%3D%3D&ctl00%24ContentPlaceHolder1%24txtSearchAll=Ben&ctl00%24ContentPlaceHolder1%24btnSearchAll=Search'
	soup = BeautifulSoup(requests.get(url).text)
	print soup