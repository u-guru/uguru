import dryscrape
from bs4 import BeautifulSoup
from time import sleep
import requests


arr = []
sess = dryscrape.Session(base_url = 'http://google.com')
sess.set_attribute('auto_load_images', False)
sess.visit('/')
mascot_name = 'University of Michigan - Dearborn' + ' ' + "site:/en.wikipedia.org"
q = sess.at_xpath('//*[@name="q"]')
sleep(1)
q.set(mascot_name)
q.form().submit()
sleep(1)
sess.render('google_search.png')
user_agent = sess.set_header('user-agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
html_page = sess.body()
soup = BeautifulSoup(html_page)
main_wrapper = soup.find('h3', attrs = {'class':'r'})
a_link = main_wrapper.findAll('a')
school = {}
arr_info = []
for href in a_link:
    
        first_split = href['href'].split('q=')
        arr.append(first_split)

school = {}
#%25E2%2580%2593
for items in arr:

    url_info = items[-1].split('&sa')[0]
    if "%25E2%2580%2593" in url_info:
        replace_url_info = url_info.replace('%25E2%2580%2593','-')
        response = requests.get(replace_url_info).text
        soup = BeautifulSoup(response)
        table = soup.find('table', attrs = {'class':'infobox'})
        try:
            rows = table.findAll('tr')
            for row in rows:
                if row.th is not None:
                    if row.th.text == "Colors":
                        colors = []    
                        text = row.td.text.encode('ascii','ignore').replace('\n','')
                        colors.append(text)
                        spans = row.td.findAll('span')
                       
                        # Iterate through all the spans
                        for span in spans:
                                # Try to get the span style but catch the KeyError if the span has no style
                                try:
                                        # Get the substring of the background colour
                                        style = span['style'][18:24]
                                       
                                        # Add the colour to the array
                                        colors.append(style)
                                except KeyError:
                                        pass
                       
                        # Set the array into the dictionary
                        school['colors'] = colors
                        arr_info.append(school)
        except requests.exceptions.MissingSchema:
            continue
    else:
        response = requests.get(url_info).text
        soup = BeautifulSoup(response)
        table = soup.find('table', attrs = {'class':'infobox'})
        try:
            rows = table.findAll('tr')
            for row in rows:
                if row.th is not None:
                    if row.th.text == "Colors":
                        colors = []    
                        text = row.td.text.encode('ascii','ignore').replace('\n','')
                        colors.append(text)
                        spans = row.td.findAll('span')
                       
                        # Iterate through all the spans
                        for span in spans:
                                # Try to get the span style but catch the KeyError if the span has no style
                                try:
                                        # Get the substring of the background colour
                                        style = span['style'][18:24]
                                       
                                        # Add the colour to the array
                                        colors.append(style)
                                except KeyError:
                                        pass
                       
                        # Set the array into the dictionary
                        school['colors'] = colors
                        arr_info.append(school)
        except requests.exceptions.MissingSchema:
            continue
    
print arr_info

# def get_mascot_name_for_university(name):
#     import dryscrape
#     from bs4 import BeautifulSoup
#     from time import sleep
#     arr = []
#     sess = dryscrape.Session(base_url = 'http://google.com')
#     sess.set_attribute('auto_load_images', False)
#     sess.visit('/')
#     mascot_name = name + ' ' + "mascot"
#     q = sess.at_xpath('//*[@name="q"]')
#     sleep(1)
#     q.set(mascot_name)
#     q.form().submit()
#     sleep(1)
#     sess.render('google_search.png')
#     user_agent = sess.set_header('user-agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')

#     html_page = sess.body()
#     soup = BeautifulSoup(html_page)
#     first_main_wrapper = soup.findAll("span", attrs ={'class':'_m3b'})
    
#     if first_main_wrapper:
#         for main_wrapper_text in first_main_wrapper:
#             mascot  = {}
#             mascot['Mascot'] = main_wrapper_text.text.replace(',','').encode('ascii','ignore') 
#             arr.append(mascot)
            
            
#     elif:
#         second_main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
#         for second_wrapper_text in second_main_wrapper:
#             exception_dict = {}
#             exception_dict['except_mascot'] = second_wrapper_text.text.replace(',','').encode('ascii','ignore')
#             arr.append(exception_dict)
            
#     else:
#         third_main_wrapper = soup.findAll('')        

#     if arr:
#         print arr
#         return arr
#     else:
#         return None


# arr = []
# sess = dryscrape.Session(base_url = 'http://google.com')
# sess.set_attribute('auto_load_images', False)
# sess.visit('https://www.google.com/')
# mascot_name = "Community College of Denver-Auraria" +' ' + "wiki" 
# q = sess.at_xpath('//*[@name="q"]')
# sleep(1)
# q.set(mascot_name)
# q.form().submit()
# sleep(1)
# sess.render('google_image.png')
# dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
# html_page = sess.body()
# soup = BeautifulSoup(html_page)
# print soup


# import requests, ast
# from bs4 import BeautifulSoup
# arr = []
# # Change this URL
# url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions%7Cinfo%7Cimages&titles=UCLA&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&iiprop=url&rvparse"
# url = url + "&format=json" 
# dictionary = ast.literal_eval(requests.get(url).text)['query']['pages']
# for page in dictionary:
#     school = {}
#     page_url = dictionary[page]['fullurl']
#     soup = BeautifulSoup(requests.get(page_url).text)
#     table = soup.find('table', class_ = "infobox")
#     rows = table.findAll('tr')
#     for row in rows:
#             if row.th is not None:
#                 if row.th.text == "Colors":
#                         colors = []    
#                         text = row.td.text.encode('ascii','ignore').replace('\n','')
#                         colors.append(text)
#                         spans = row.td.findAll('span')
                       
#                         # Iterate through all the spans
#                         for span in spans:
#                                 # Try to get the span style but catch the KeyError if the span has no style
#                                 try:
#                                         # Get the substring of the background colour
#                                         style = span['style'][18:24]
                                       
#                                         # Add the colour to the array
#                                         colors.append(style)
#                                 except KeyError:
#                                         pass
                       
#                         # Set the array into the dictionary
#                         school['colors'] = colors
#                         arr.append(school)

# print arr










# name = "Washington State University"
# arr = []
# search = wikipedia.page(str(name))
# url = search.url
# response = requests.get(url).text
# soup = BeautifulSoup(response)
# colors = soup.findAll('th',text="Colors")
# for items in colors:
#     color_dict = {}
#     color_dict['colors'] = items.nextSibling.nextSibling.text.encode('ascii','ignore')
#     second_color =  items.nextSibling.nextSibling
#     arr.append(color_dict)
#     use_second_color = second_color.findAll('span')
#     for span in use_second_color:
#         try:
#             hex_color_dict = {}
#             hex_color_dict['hex_colors'] = span['style'][18:24]
#             arr.append(hex_color_dict)
#         except KeyError:
#             continue
# print arr
    # color_dict['school_first_color'] = first_color
    # color_dict['school_second_color'] = second_color
    # arr.append(color_dict)





    # 0.46
    # import wikipedia,requests 
    # from bs4 import BeautifulSoup
    # import dryscrape
    # from time import sleep
    # arr = []
    # sess = dryscrape.Session(base_url = 'http://google.com')
    # sess.set_attribute('auto_load_images', False)
    # sess.visit('https://www.google.com/')
    # mascot_name = str(name) +' ' + "color" 
    # q = sess.at_xpath('//*[@name="q"]')
    # sleep(1)
    # q.set(mascot_name)
    # q.form().submit()
    # sleep(1)
    # sess.render('google_image.png')
    # dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
    # html_page = sess.body()
    # soup = BeautifulSoup(html_page)
    # main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
    # for items in main_wrapper:
    #     school_colors = {}
    #     school_colors['colors'] = items.text.replace(',','')
     
    #     arr.append(school_colors)

    # if arr:
    #     print arr,name
    #     return arr
    # else:
    #     return None

    

# arr = []
# sess = dryscrape.Session(base_url = 'http://google.com')
# sess.set_attribute('auto_load_images', False)
# sess.visit('https://www.google.com/')
# mascot_name = "Samford University" +' ' + "color" 
# q = sess.at_xpath('//*[@name="q"]')
# sleep(2)
# q.set(mascot_name)
# q.form().submit()
# sleep(2)
# sess.render('google_image.png')
# dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
# html_page = sess.body()
# soup = BeautifulSoup(html_page)
# main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
# for items in main_wrapper:
#     school_colors = {}
#     school_colors['colors'] = items.text.replace(',','')
#     arr.append(school_colors)
# print arr



# school_names = ['Bennett College','Yeshiva University']
# for name in school_names:    
#     arr = []
#     search = wikipedia.page(str(name))
#     url = search.url
#     response = requests.get(url).text
#     soup = BeautifulSoup(response)
#     mascot = soup.findAll('th',text="Website")
#     for items in mascot:
#         mascot = {}
#         website = items.nextSibling.nextSibling.text
#         if "." in website:
#             mascot['website'] = website

#             arr.append(mascot)
#     print arr 
# school_names = ['Bennett College','Yeshiva University','UCLA']
# for name in school_names:
#     arr = []
#     sess = dryscrape.Session(base_url = 'http://google.com')
#     sess.set_attribute('auto_load_images', False)
#     sess.visit('https://www.google.com/')
#     mascot_name = name
#     q = sess.at_xpath('//*[@name="q"]')
#     sleep(2)
#     q.set(mascot_name)
#     q.form().submit()
#     sleep(2)
#     sess.render('google_image.png')
#     dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
#     html_page = sess.body()
#     soup = BeautifulSoup(html_page)
#     main_wrapper = soup.findAll('h3', attrs = {'class':'r'})
#     for items in main_wrapper:
#         a_ref = items.findAll('a')
#         for items in a_ref:
#             parse_href = items['href']
#             if "/url?q=" in parse_href:
#                 arr.append(parse_href)
#     parse_final_url = arr[0].split('/')
#     for items in parse_final_url:
#         if "." in items:
#             print items

#     more_results_from = soup.findAll('a', attrs = {'class':'fl'})
#     for items in more_results_from:
#         all_href = items['href']
#         if "site:" in all_href:
#             get_url = all_href.split('+')
#             for items in get_url:
#                 if ".edu" in items:
#                     arr.append(items)
#     print arr
# #main_wrapper = soup.findAll('title')

# full_mascot_name = soup.findAll('b',text="Mascot")[1].nextSibling.nextSibling.nextSibling.string
# print str(full_mascot_name) + str(mascot)


# # for items in mascot:
#     print items

# def get_logo_url_for_university(name):
#     import dryscrape,json
#     from bs4 import BeautifulSoup
#     small_arr = []
#     output_dict = {}
#     sess = dryscrape.Session(base_url = 'http://google.com')
#     sess.set_attribute('auto_load_images', False)
#     sess.visit('/')
#     with_mascot = name + ' ' + "mascot"
#     q = sess.at_xpath('//*[@name="q"]')
#     q.set(with_mascot)
#     q.form().submit()
#     sess.render('google_search.png')
#     html_page = sess.body()
#     soup = BeautifulSoup(html_page)
#     main_wrapper = soup.findAll('img')
#     arr_info = []
#     for items_info in main_wrapper:
#         final_output_arr = {}
#         img_url  = items_info['src']
#         arr_info.append(img_url)
#         final_output_arr['logo_url'] = arr_info
#         output_dict[name] = final_output_arr
            
#     print output_dict
#     ## If you do not find a mascot, return none
#     return
# get_logo_url_for_university('Riverside')


#       def get_mascot_name_for_university(name):
#    # arr = []
#     import dryscrape
#     from bs4 import BeautifulSoup
#     from time import sleep
#     arr = []
#     sess = dryscrape.Session(base_url = 'http://google.com')
#     sess.set_attribute('auto_load_images', False)
#     sess.visit('/')
#     with_mascot = name + ' ' + "mascot"
#     q = sess.at_xpath('//*[@name="q"]')
#     sleep(2)
#     q.set(with_mascot)
#     q.form().submit()
#     sess.render('google_search.png')
#     html_page = sess.body()
#     soup = BeautifulSoup(html_page)
#     main_wrapper = soup.findAll("span", attrs ={'class':'_m3b'})

#     for main_wrapper_text in main_wrapper:
#         mascot  = {}
#         mascot['Mascot'] = main_wrapper_text.text.replace(',','').encode('ascii','ignore') 
#         arr.append(mascot)
    

    
#     if arr:
#         print arr
#         return arr
#     else:
#         return None

# if __name__ == "__main__":  
#     sample_universities = ['Riverside','UC Berkeley','uc santa barbara']      
#     total_success = 0
#     total_count = 3
#     for items in sample_universities:

#         mascot_name = get_mascot_name_for_university(str(items))
#         if mascot_name:
#             total_success += 1
#         else:
#             print "hi"
#     print "percentage: %s percent" % (float(total_success) / total_count)      
def get_mascot_name_for_university(name):
# arr = []
    import dryscrape
    from bs4 import BeautifulSoup
    from time import sleep
    arr = []
    sess = dryscrape.Session(base_url = 'http://google.com')
    sess.set_attribute('auto_load_images', False)
    sess.visit('/')

  
    mascot_name = name + ' ' + "mascot"
    
    q = sess.at_xpath('//*[@name="q"]')
    sleep(2)
    q.set(mascot_name)
    q.form().submit()
    sess.render('google_search.png')
    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    print

    first_main_wrapper = soup.findAll("span", attrs ={'class':'_m3b'})
    
    if first_main_wrapper:
        for main_wrapper_text in first_main_wrapper:
            mascot  = {}
            mascot['Mascot'] = main_wrapper_text.text.replace(',','').encode('ascii','ignore') 
            arr.append(mascot)
            print arr
            
    else:
        second_main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
        for second_wrapper_text in second_main_wrapper:
            exception_dict = {}
            exception_dict['except_mascot'] = second_wrapper_text.text.replace(',','')
            arr.append(exception_dict)
            print arr
    if arr:
        return arr
    else:
        return None

   
#get_mascot_name_for_university('Riverside')