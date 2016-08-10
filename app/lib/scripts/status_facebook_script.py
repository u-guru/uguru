import dryscrape,time,json
from bs4 import BeautifulSoup
from dryscrape.mixins import HtmlParsingMixin


USERNAME = "raisethehell_biplov@yahoo.com"
PASSWORD = ""
output_path = "output.json"
GROUP_ID = "calhacks2attendees"

session = dryscrape.Session(base_url = 'https://www.facebook.com')
session.visit('/login.php?next=https://www.facebook.com/groups/' + GROUP_ID)
username_field = session.at_css("#email")
password_field = session.at_css("#pass")
username_field.set(USERNAME)
password_field.set(PASSWORD)
username_field.form().submit()
time.sleep(3)
session.render('check_login.png')

all_pages_viewed = False
while all_pages_viewed == False:
	html = session.body()
	soup = BeautifulSoup(html)

	try:
		main_wrapper = soup.findAll('div', attrs = {'class':'_5pcb'})
		for wrapper in main_wrapper:
			status = wrapper.findAll('div', attrs = {'class':'_5pbx userContent'})
			for status_text in status:
				status =  status_text.text
				print status
		time.sleep(2)
	except Exception as e:
		all_pages_viewed = True

	# main_wrapper = soup.findAll('div', attrs = {'class':'_5pcb'})

	# for wrapper in main_wrapper:
	# 	status = wrapper.findAll('div', attrs = {'class':'_5pbx userContent'})
	# 	for status_text in status:
	# 		status =  status_text.text
	# 		print status
	# 	# with open('info.json','wb') as outfile:
	# 	# 	json.dump(status,outfile,indent=4)
	# 	try:
	# 		status.hover()
	# 		time.sleep(2)
	# 	except Exception as e:
	# 		all_pages_viewed = True