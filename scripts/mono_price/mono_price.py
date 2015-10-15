import requests,json
from bs4 import BeautifulSoup
from collections import OrderedDict
import dryscrape

session = requests.Session()
def queryMonoprice(query):
	url = 'http://www.monoprice.com/search/index?keyword='+query+'&sort=salepriceasc&PageSize=10000'
	response = requests.get(url).text
	soup = BeautifulSoup(response)
	main_wrapper = soup.findAll('div', attrs = {'id':'hawkitemlist'})
	product_id_arr = []
	for wrapper in main_wrapper:
		output_dict = {}
		ratings = wrapper.findAll('div', attrs = {'class':'hawk-itemRating'})
		product_id = wrapper.findAll('div', attrs = {'class':'hawk-row'})
		for ratings_text,info in zip(ratings,product_id):
			item_dictionary = {}
			ratings = ratings_text.text.replace('(','').replace(')','').replace('\n','').strip()
			a_link = info.findAll('a')
			title = info.findAll('font')

			for items,title_text in zip(a_link,title):
				review_info = items['href']
				item_dictionary['item_url'] = items['href']
				getItemPrice = requests.get(item_dictionary['item_url']).text
				getItemPrice_soup = BeautifulSoup(getItemPrice)
				price_wrapper = getItemPrice_soup.find('span', attrs = {'itemprop':'price'}).text
				item_dictionary['price'] = price_wrapper.replace('\r','').replace('\n','').strip()
				item_dictionary['product_id'] = review_info.split('p_id=')[-1]



				output_dict[ratings] = item_dictionary
	with open('mono_price.json','wb') as outfile:
		json.dump(output_dict,outfile,indent=4, sort_keys=True)

queryMonoprice('power extension plug ')

def AddItemToCart(quantity,product_id):
	payload = {'qty':quantity,'p_id':product_id}
	add_items_to_cart = session.post('http://www.monoprice.com/Cart',params=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies))
	#return requests.utils.dict_from_cookiejar(session.cookies)
AddItemToCart('1','13823')

def removeFromCart(product_id):
	pass


def getCartItems():
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
	return get_items

getCartItems()


def loginToMonoPrice(email_address,password):
	payload = {'email_address':email_address,'password':password,'proc':'reg','return_page':'/checkout/checkoutstep1'}
	login_url = session.post('https://www.monoprice.com/myaccount/logincheck',data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(login_url)
	main_wrapper = soup.findAll('div', attrs = {'style':'font-weight: bold;font-size: larger;'})
	cart_id = soup.findAll('div', attrs = {'class':'span-5-of-8'})
	print cart_id
	print "Successfully Logged in"

loginToMonoPrice('bendrumm095@gmail.com','123123123vb')





def start_checkout():
	payload = {'cardid':'C20745524','LiftGetSelected':'','shippingmethod':'0','hdnUpsAccNo':'','hdnAggreementForUpsAccount':''}
	start_checkout_url = session.post('https://www.monoprice.com/checkout/startcheckout', data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text 
	soup = BeautifulSoup(start_checkout_url)
	shipping_address = soup.findAll('div', attrs = {'class':'row ClickTaleSensitive'})
	print shipping_address
start_checkout()


#check_out_first_step()

def update_step_1():
	payload = {'step':'step1'}
	update_last_step = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	return update_last_step
update_step_1()
# def fill_in_last_form():
# 	payload = {'step':'step2'}
# 	update_last_step = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
# 	return update_last_step

# fill_in_last_form()

def store_default_information():
	payload = {'QASChangedAddress':'none','IsUpsUser':'no','ShippingMethod':'2','cartPageModel.checkoutData.Shipping.IsUPSAggrementSelected':'false','est_disclaimer':'Y','x_ship_to_zip':'94105'}
	requests_info = session.post('https://www.monoprice.com/checkout/checkoutstep3', data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(requests_info)
	print soup
	# main_wrapper = soup.findAll('div', attrs = {'class':'span-3-of-8'})
	# for items in main_wrapper:
	# 	title = items.findAll('a', attrs = {'target':'_blank'})
	# 	product_id = items.findAll('div', attrs  = {'style':'margin: 10px 0 5px 0;'})
	# 	ship_time = items.findAll('div', attrs = {'style':'margin: 5px 0;'})
	# 	for items,product_id_text,ship_time_text in zip(title,product_id,ship_time):
	# 		item_dict = {}
	# 		item_dict['title'] = items.text.strip()
	# 		item_dict['ship_time'] = ship_time_text.text.replace('Ships by:','').strip()
	# 		print item_dict
	# 		return item_dict

store_default_information()



def second_last_page():
	payload = {'QASChangedAddress':'none','IsUpsUser':'0','ShippingMethod':'1','cartPageModel.checkoutData.Shipping.IsUPSAggrementSelected':'false','est_disclaimer':'Y','x_ship_to_zip':'94520'}
	credit_card_info = session.post('https://www.monoprice.com/checkout/checkoutstep3',data=payload,cookies=requests.utils.dict_from_cookiejar(session.cookies)).text
	return credit_card_info
#second_last_page()

def pay_with_credit_card_info(credit_card_number,expire_month,expire_year,card_holder_name,card_security_four_digit_pin,phone_number):
	payload = {'cmd':'','PaymentAmount':'16.64','dpv':'','ati':'','o_ship_to_address_str':'','old_ua_loc_credit_apply':'0','new_ua_loc_credit_apply':'0','loc_change_state':'0','loc_checked_pg':'0','loc_text_pg':'','loc_alt':'','payment_method':'Credit Card','x_card_num':credit_card_number,'Exp_Month':expire_month,'Exp_Year':expire_year,'x_card_name':card_holder_name,'x_card_code':card_security_four_digit_pin,'cs_phone_number':phone_number,'save_creditcard_num':'true','GiftCardNum':'','default_paymentmethod':'y'}
	finalization = session.post('https://www.monoprice.com/checkout/checkoutstep3b',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	response = BeautifulSoup(finalization)
	print response
	print "Credit Card Info Inserted!"
	return finalization
#pay_with_credit_card_info('4815820084436326','09','2019','Samir Makhani','393','5107344513')


def final_step():
	payload = {'step':'finalize'}
	finalize_step = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies))
	return finalize_step

def update_last_step_3b():
	payload = {'step':'step 3b'}
	update_last_step_3b = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload,cookies =requests.utils.dict_from_cookiejar(session.cookies) )
	return update_last_step_3b
#update_last_step_3b()



def last_check_out():
	payload = {'cmd':'modify','use_profile_address':'1493978'}
	checkout_step_4 = session.post('https://www.monoprice.com/checkout/checkoutstep4', data=payload).text
	soup = BeautifulSoup(checkout_step_4)
	print soup
#last_check_out()
	

def final_step():
	payload = {'step':'finalize'}
	finalize_step = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies))
	return finalize_step
#final_step()
