import requests ,json
from bs4 import BeautifulSoup

names_arr = ['Ben']
for names in names_arr:
	url  = 'https://directory.caltech.edu/personnel/search?searchtext='+names
	print url