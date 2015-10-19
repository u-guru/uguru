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

def AddItemToCart(quantity,product_id):
	payload = {'qty':quantity,'p_id':product_id}
	add_items_to_cart = session.post('http://www.monoprice.com/Cart',params=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies))
	AddItemToCart(quantity,str(product_id))

AddItemToCart(1,'1302')


def removeFromCart(product_id):
	pass


def getCartItems(cookies):
	get_items = {}
	arr = []
	add_item_api_url = 'http://www.monoprice.com/MiniCart/RemoveItem'
	response = session.get(add_item_api_url, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	convert_to_json = json.loads(response)
	get_items['item_count'] = convert_to_json['itemCount']
	get_items['sub_total'] = convert_to_json['subTotal']
	mini_cart = convert_to_json['miniCart']
	soup = BeautifulSoup(mini_cart)
	item_names_in_list =  soup.findAll('a')
	for items_text in item_names_in_list:
		get_items['item_name'] =  items_text.text.strip()
		arr.append(get_items)
	print get_items
