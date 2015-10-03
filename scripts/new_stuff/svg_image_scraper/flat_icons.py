import requests,json
from bs4 import BeautifulSoup

url_info = ['http://www.flaticon.com/search/labels?sort=p','http://www.flaticon.com/search/labels?sort=a']
search_string = ['label']
huge_arr = []
for two_urls in url_info:
	for search in search_string:
		url = two_urls
		soup = BeautifulSoup(requests.get(two_urls).text)
		main_wrapper = soup.find('div', attrs = {'class':'container icons'})
		ahref = main_wrapper.findAll('a', attrs = {'class':'see opt'})
		for href in ahref:
			dictionary = {}
			second_url = href['href']
			second_soup = BeautifulSoup(requests.get(second_url).text)
			second_main_wrapper = second_soup.find('div', attrs = {'id':'divConvertSvg'})
			src_for_svg = second_main_wrapper.findAll('img', attrs  = {'id':'originalSvg'})
			src_for_png = second_soup.findAll('img', attrs = {'type':'image/png'})
			name_of_the_image = second_soup.find('div', attrs = {'class':'fleft clearfix detail-icon-name'}).findAll('h1')

			dictionary['icon_link'] = second_url
			for actual_svg_url,actual_png_url,image_name in zip(src_for_svg,src_for_png,name_of_the_image):
				dictionary['icon_name'] = image_name.text.replace('\n','')
				dictionary['icon_png_link'] = actual_png_url['src']
				dictionary['svg_file_url'] = actual_svg_url['src']
				dictionary['platform'] = "Flaticon"
				if "http://www.flaticon.com/search/labels?sort=a" in two_urls:
					dictionary['is_recent'] = True
				else:
					dictionary['is_recent'] = False
				huge_arr.append(dictionary)
			with open('flat_icon_image_scraper.json','wb') as outfile:
				json.dump(huge_arr,outfile,indent=4)