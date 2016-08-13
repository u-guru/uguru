import requests, json
from bs4 import BeautifulSoup


names_arr = ['Ben']
for names in names_arr:
	params = {'ScriptManager2':'UpdatePanel1|Button1','__EVENTTARGET':'','__EVENTARGUMENT':'','__VIEWSTATE':'/wEPDwUKMTIzNTcyMDI2NWRkvx7QoX8eUEmgrVM58KAnbsfOF6tvWAuVyF1LsZdpOtE=','__VIEWSTATEGENERATOR':'A2B3537A','TextBox2':'','TextBox1':'Ben','__ASYNCPOST':'true','Button1':''}
	post_requests = BeautifulSoup(requests.post('http://clarion.edu/directory/student-dir/index.aspx',params).text)
	print post_requests