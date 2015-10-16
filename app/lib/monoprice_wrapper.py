import requests,json
from bs4 import BeautifulSoup
from collections import OrderedDict
import dryscrape

session = requests.Session()
def queryMonoprice(query, save_json=True):
	url = 'http://www.monoprice.com/search/index?keyword='+query+'&sort=salepriceasc&PageSize=10000'
	response = requests.get(url).text
	soup = BeautifulSoup(response)
	main_wrapper = soup.findAll('div', attrs = {'id':'hawkitemlist'})
	product_id_arr = []
	for wrapper in main_wrapper:
		output_dict = {}
		ratings = wrapper.findAll('div', attrs = {'class':'hawk-itemRating'})
		product_id = wrapper.findAll('div', attrs = {'class':'hawk-row'})
		img_url = wrapper.findAll('img', attrs = {'class':'itemImage hawk-itemImage'})
		avg_rating = wrapper.findAll('div', attrs = {'class':'hawk-listingRating'})
		for avg_text in avg_rating:
			span = avg_text.findAll('span')

		for ratings_text,info,img_url_src,avg_ratings_parse in zip(ratings,product_id,img_url,avg_rating):
			item_dictionary = {}
			ratings = ratings_text.text.replace('(','').replace(')','').replace('\n','').strip()
			a_link = info.findAll('a')
			title = info.findAll('font')
			span = avg_ratings_parse.findAll('span')
			for items,title_text,span_parse in zip(a_link,title,span):
				review_info = items['href']
				if "#Revi" in review_info:
					pass
				else:
					#print review_info
					item_dictionary['item_title'] = title_text.text
					item_dictionary['item_url'] = items['href']
					getItemPrice = requests.get(item_dictionary['item_url']).text
					getItemPrice_soup = BeautifulSoup(getItemPrice)
					price_wrapper = getItemPrice_soup.find('span', attrs = {'itemprop':'price'}).text
					item_dictionary['price'] = price_wrapper.replace('\r','').replace('\n','').strip()
					item_dictionary['product_id'] = review_info.split('p_id=')[-1]
					item_dictionary['image_url'] = 'http://images.monoprice.com/productmediumimages/' + item_dictionary['product_id'] + "1"+ ".jpg"
					item_dictionary['avg_ratings'] = str(span_parse).split('hawk-rated')[-1].replace('\"> </span>','')
					output_dict[ratings] = item_dictionary
		if save_json:
			with open('mono_price.json','wb') as outfile:
				json.dump(output_dict,outfile,indent=4, sort_keys=True)

	return output_dict

queryMonoprice('power extension plug ')


def AddItemToCart(quantity,product_id):
	payload = {'qty':quantity,'p_id':product_id}
	add_items_to_cart = session.post('http://www.monoprice.com/Cart',params=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies))
# AddItemToCart('1','13823')

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

# getCartItems()


def loginToMonoPrice(email_address,password):
	payload = {'email_address':email_address,'password':password,'proc':'reg','return_page':'/checkout/checkoutstep1'}
	login_url = session.post('https://www.monoprice.com/myaccount/logincheck',data=payload, cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(login_url)
	main_wrapper = soup.findAll('div', attrs = {'style':'font-weight: bold;font-size: larger;'})
	cart_id = soup.findAll('div', attrs = {'class':'span-5-of-8'})
	print cart_id
	print "Successfully Logged in"

# loginToMonoPrice('bendrumm095@gmail.com','123123123vb')



def fill_in_last_form_1():
	payload = {'step': 'step 1'}
	update_last_step = session.post('https://www.monoprice.com/checkout/updatelaststep',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
# fill_in_last_form_1()


def start_checkout():
	payload = {'cardid':'C20745524','LiftGetSelected':'','shippingmethod':'0','hdnUpsAccNo':'','hdnAggreementForUpsAccount':''}
	start_checkout_url = session.post('https://www.monoprice.com/checkout/startcheckout', data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text 
	soup = BeautifulSoup(start_checkout_url)
# start_checkout()

def visit_checkout_step_2():
	params = {'skip_qas':'no','use_profile_address':'1493978','cmd':'used'}
	vist_shipping_url = session.post('https://www.monoprice.com/checkout/checkoutstep2',data=params,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
# visit_checkout_step_2()


def visit_checkout_step_3_only():
	payload = {'QASChangedAddress':'none','IsUpsUser':'0','ShippingMethod':'2','cartPageModel.checkoutData.Shipping.IsUPSAggrementSelected':'false','est_disclaimer':'Y','x_ship_to_zip':'94105'}
	request_url_info = session.post('https://www.monoprice.com/checkout/checkoutstep3',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(request_url_info)
# visit_checkout_step_3_only()


def pay_with_credit_card_info(credit_card_number,expire_month,expire_year,card_holder_name,card_security_four_digit_pin,phone_number):
	payload = {'cmd':'','PaymentAmount':'9.50','dpv':'','ati':'','o_ship_to_address_str':'','old_ua_loc_credit_apply':'0','new_ua_loc_credit_apply':'0','loc_change_state':'0','loc_checked_pg':'0','loc_text_pg':'','loc_alt':'','payment_method':'Credit Card','x_card_num':credit_card_number,'Exp_Month':expire_month,'Exp_Year':expire_year,'x_card_name':card_holder_name,'x_card_code':card_security_four_digit_pin,'cs_phone_number':phone_number,'save_creditcard_num':'true','GiftCardNum':'','default_paymentmethod':'y'}
	finalization = session.post('https://www.monoprice.com/checkout/checkoutstep3b',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	response = BeautifulSoup(finalization)
	#print response
	print "Credit Card Info Inserted!"

# pay_with_credit_card_info('4815820084436326','09','2019','Samir Makhani','393','5107344513')


def preview_page():
	payload = {'cmd':'modify','use_profile_address':'1493978'}
	final_step = session.post('https://www.monoprice.com/checkout/checkoutstep4',data=payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(final_step)
	shipping_address = soup.findAll('div', attrs  = {'class':'span-5 ClickTaleSensitive'})
	for items in shipping_address:
		shipping_dict = {}
		shipping_dict['Shipping_information'] = items.text.strip().replace('\r','').replace('\n','')
		print shipping_dict
	billing_infomration = soup.findAll('div', attrs = {'class':'span-6 omega ClickTaleSensitive'})
	for billing_items in billing_infomration:
		billing_dict = {}
		billing_dict['Billing_Information'] = billing_items.text.strip().replace('\n','').replace('\r','')
		print billing_dict
	shipping_method = soup.findAll('div', attrs = {'class':'span-5'})
	for shipping_items in shipping_method:
		shipping_dict = {}
		shipping_dict['Shipping Method'] = shipping_items.text.strip
		print shipping_dict
	money_information = soup.findAll('div', attrs = {'class':'border-container-blue'})	
	for depth_items in money_information:
		money_dict = {}
		money_dict['final_information'] =  depth_items.text.strip()
		print money_dict
# preview_page()

def purchase_item():
	payload = {'sendmail':'yes','x_card_code':'','customer_po_id':'','x_newsletter':'yes','btn_finalize_step2':'Place Order'}
	purchase_item = session.post('https://www.monoprice.com/checkout/checkoutregister',data = payload,cookies = requests.utils.dict_from_cookiejar(session.cookies)).text
	soup = BeautifulSoup(purchase_item)
	print soup
# purchase_item()