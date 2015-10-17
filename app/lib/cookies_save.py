import pickle,requests
from bs4 import BeautifulSoup
payload = {'email_address':'bendrumm095@gmail.com','password':'123123123vb','proc':'reg','return_page':'/checkout/checkoutstep1'}
session = requests.Session()
get_requests = session.get('https://www.monoprice.com/myaccount/logincheck',data = payload)
with open('cookies_from_this_file','w') as f:
	 pickle.dump(requests.utils.dict_from_cookiejar(get_requests.cookies), f)


payload_1 = {'cardid':'C20745524','LiftGetSelected':'','shippingmethod':'0','hdnUpsAccNo':'','hdnAggreementForUpsAccount':''}
with open('cookies_from_this_file') as f:
	cookies = requests.utils.cookiejar_from_dict(pickle.load(f))
	print cookies
	second_requests_info = session.post('https://www.monoprice.com/checkout/startcheckout',data=payload_1,cookies=cookies).text
	soup = BeautifulSoup(second_requests_info)
	print soup
