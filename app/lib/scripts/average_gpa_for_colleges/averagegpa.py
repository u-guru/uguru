#!/usr/bin/env python
import requests
import requesocks
from bs4 import BeautifulSoup

session = requesocks.session()

session.proxies = {
    'http': 'socks5://127.0.0.1:9150',
    'https': 'socks5://127.0.0.1:9150'
}

GPA_ARRAY =['2.0','2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9','3.0','3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8','3.9','4.0']

for all_the_gpa in GPA_ARRAY:
	url = "http://www.collegesimply.com/guides/"+all_the_gpa+"-gpa-colleges/"
	soup_object = session.get(url).text
	print soup_object

