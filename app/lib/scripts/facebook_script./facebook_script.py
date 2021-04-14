import dryscrape,time,json
from bs4 import BeautifulSoup
from dryscrape.mixins import HtmlParsingMixin


USERNAME = "raisethehell_biplov@yahoo.com"
output_path = "output.json"
GROUP_ID = "calhacks2attendees"
huge_arr = []
session = dryscrape.Session(base_url = 'https://www.facebook.com')
session.visit('/login.php?next=https://www.facebook.com/groups/' + GROUP_ID)
username_field = session.at_css("#email")
password_field = session.at_css("#pass")
username_field.set(USERNAME)
password_field.set(PASSWORD)
username_field.form().submit()
time.sleep(3)
session.render('check_login.png')

#all_pages_viewed = False
scroll_down = session.eval_script('var _0x746c=["\x62\x6F\x64\x79","\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74","\x73\x63\x72\x6F\x6C\x6C\x48\x65\x69\x67\x68\x74","\x6F\x66\x66\x73\x65\x74\x48\x65\x69\x67\x68\x74","\x63\x6C\x69\x65\x6E\x74\x48\x65\x69\x67\x68\x74","\x6D\x61\x78","\x73\x63\x72\x6F\x6C\x6C\x54\x6F"];var getPageHeight=function(){var _0xd4ecx2=document[_0x746c[0]],_0xd4ecx3=document[_0x746c[1]];return Math[_0x746c[5]](_0xd4ecx2[_0x746c[2]],_0xd4ecx2[_0x746c[3]],_0xd4ecx3[_0x746c[4]],_0xd4ecx3[_0x746c[2]],_0xd4ecx3[_0x746c[3]]);};var scrollToBottom=function(_0xd4ecx5){if(_0xd4ecx5===0){return };_0xd4ecx5=_0xd4ecx5||20;var _0xd4ecx6=getPageHeight();window[_0x746c[6]](0,_0xd4ecx6);setTimeout(function(){scrollToBottom(_0xd4ecx5-1)},_0xd4ecx5-1);};scrollToBottom(1500);')
time.sleep(10)
session.render('facebook_scroll.png')
html = session.body()
soup = BeautifulSoup(html)
main_wrapper = soup.findAll('div', attrs = {'class':'_5pcb'})
for wrapper in main_wrapper:
	status = wrapper.findAll('div', attrs = {'class':'_5pbx userContent'})
	for status_text in status:
		status_dict = {}
		status_dict['new_post'] =  status_text.text
		huge_arr.append(status_dict)
	with open('facebook_post.json','wb') as outfile:
		json.dump(huge_arr,outfile,indent=4)

		
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