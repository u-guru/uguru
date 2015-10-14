import requests,json
from bs4 import BeautifulSoup
from collections import OrderedDict
import dryscrape
output_dict = {}

session = requests.Session()
def queryMonoprice(query):
	url = 'http://www.monoprice.com/search/index?keyword='+query+'&sort=salepriceasc&category_2=Accessories%20for%20Apple/iPhone&PageSize=500'
	response = requests.get(url).text
	soup = BeautifulSoup(response)
	main_wrapper = soup.findAll('div', attrs = {'id':'hawkitemlist'})
	lst_array = []
	for wrapper in main_wrapper:
		ratings = wrapper.findAll('div', attrs = {'class':'hawk-itemRating'})
		title = wrapper.findAll('font', attrs = {'style':'font-size:14px;'})
		price = wrapper.findAll('p', attrs = {'class':'hawk-itemPrice'})
		product_id = wrapper.findAll('div', attrs = {'class':'hawk-row'})
		item_dictionary = {}
		arr  = []
		for items in product_id:
			a_link = items.findAll('a')
			for href_text in a_link:
				product_id = href_text['href'].split('=')[-1]
				item_dictionary['product_id'] = product_id
				arr.append(item_dictionary)
		for ratings_text,title_text,price_text in zip(ratings,title,price):
			item_dictionary['title'] = title_text.text.strip().encode("ascii","ignore")
			item_dictionary['price'] = price_text.text.strip().replace('\n','').replace('\r','\n')
			ratings = ratings_text.text.replace('(','').replace(')','').replace('\n','').strip()
			output_dict[ratings] = item_dictionary
			arr.append(output_dict)
	return arr
	with open('mono_price.json','wb') as outfile:
		json.dump(arr,outfile,indent=4, sort_keys=True)


def AddItemToCart(quantity,product_id):
	payload = {'qty':quantity,'p_id':product_id}
	add_items_to_cart = session.post('http://www.monoprice.com/Cart',params=payload)
	return requests.utils.dict_from_cookiejar(session.cookies)

def getCartItems():
	get_items = {}
	arr = []
	add_item_api_url = 'http://www.monoprice.com/MiniCart/RemoveItem'
	response = requests.get(add_item_api_url, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
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
	return get_items



def loginToMonoPrice(email_address,password):
	payload = {'email_address':email_address,'password':password,'proc':'reg','return_page':'/checkout/checkoutstep1'}
	login_url = requests.post('https://www.monoprice.com/myaccount/logincheck',data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	return login_url







