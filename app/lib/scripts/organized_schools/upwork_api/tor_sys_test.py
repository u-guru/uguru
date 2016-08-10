
import tor_client
from bs4 import BeautifulSoup
import subprocess

def run_script():
	try:

		FileName = "TorBrowser.app"
		subprocess.call(['open',FileName])
	except:
		"Error!"
		pass

def check_if_it_works():
	url = 'http://www.chegg.com/courses/'
	request_url = BeautifulSoup(tor_client.get(url).text)
	print request_url


run_script()
check_if_it_works()	