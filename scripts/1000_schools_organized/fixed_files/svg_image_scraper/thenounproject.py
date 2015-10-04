import dryscrape,json,time
from bs4 import BeautifulSoup

search_string = 'labels'
huge_arr = []
sess = dryscrape.Session(base_url = 'https://thenounproject.com')
sess.visit('/')
q = sess.at_xpath('//*[@name="q"]')
q.set(search_string)
q.form().submit()

a_link = sess.xpath('//a[@href]')
img_link = sess.xpath('//img[@src]')
for link_text,src_text in zip(a_link,img_link):
	filter_href = link_text['href']
	filter_img_link = src_text['src']
	dictionary = {}
	if "/term" in filter_href:
		dictionary['icon_direct_url'] = "https://thenounproject.com"+filter_href
	if ".png" in filter_img_link:
		dictionary['img_png_url'] = filter_img_link
		huge_arr.append(dictionary)

	with open('thenounproject_data.json','wb') as outfile:
			json.dump(huge_arr,outfile,indent=4)
	
# for png_url,icon_url in  zip(sess.xpath('//img[@src]'),sess.xpath('//a[@href]')):
# 	image_url = icon_url['href']
# 	png_url_info = png_url['src']
# 	if "/term/" in image_url:
# 		dictionary = {}
# 		split_name  = "https://thenounproject.com"+image_url
# 		dictionary['icon_direct_url'] = "https://thenounproject.com"+image_url
# 		dictionary['icon_category_name'] =  split_name.split('/')[4]
# 		dictionary['icon_png_url'] = png_url_info
# 		huge_arr.append(dictionary)
# 	with open('thenounproject_data.json','wb') as outfile:
# 		json.dump(huge_arr,outfile,indent=4)
# for img_url in sess.xpath('//a[@href]'):
# 	image_url = img_url['href']
# 	if "/term/" in image_url:
# 		session = "https://thenounproject.com" + image_url
# 	 	dictionary['icon_image_url'] = session
# 	 	huge_arr.append(dictionary)
# print dictionary
# 	huge_arr.append(dictionary)
# with open('thenounproject_data.json','wb') as outfile:
# 	json.dump(huge_arr,outfile,indent=4)