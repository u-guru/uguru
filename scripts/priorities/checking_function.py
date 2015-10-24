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
    sess.visit('https://www.google.com/imghp')

  
    mascot_name = name + ' ' + "Logo"
    
    q = sess.at_xpath('//*[@name="q"]')
    sleep(2)
    q.set(mascot_name)
    q.form().submit()
    sleep(2)
    sess.render('google_image.png')
    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    main_wrapper = soup.findAll('img')[0]['src']
    print main_wrapper
    # for items in main_wrapper:
    #     print items


    # first_main_wrapper = soup.findAll("span", attrs ={'class':'_m3b'})
    
    # if first_main_wrapper:
    #     for main_wrapper_text in first_main_wrapper:
    #         mascot  = {}
    #         mascot['Mascot'] = main_wrapper_text.text.replace(',','').encode('ascii','ignore') 
    #         arr.append(mascot)
    #         print arr
            
    # else:
    #     second_main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
    #     for second_wrapper_text in second_main_wrapper:
    #         exception_dict = {}
    #         exception_dict['except_mascot'] = second_wrapper_text.text.replace(',','')
    #         arr.append(exception_dict)
    #         print arr
    # if arr:
    #     return arr
    # else:
    #     return None

   
get_mascot_name_for_university('UC Riverside')