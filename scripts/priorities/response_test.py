# import dryscrape
# from bs4 import BeautifulSoup
# from time import sleep
# arr = []
# sess = dryscrape.Session(base_url = 'http://google.com')
# sess.set_attribute('auto_load_images', False)
# sess.visit('/')
# with_mascot = 'glen oaks community college' + ' ' + "mascot"
# q = sess.at_xpath('//*[@name="q"]')
# sleep(2)
# q.set(with_mascot)
# q.form().submit()
# sess.render('google_search.png')
# html_page = sess.body()
# soup = BeautifulSoup(html_page)
# print soup
# search_school = ['UC Berkeley','UCLA','UC San Diego']
# import wikipedia
# import requests,json
# from bs4 import BeautifulSoup

# sort_in_arr = []
# for items in search_school:
#     arr = json.loads(requests.get('http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities').text)
#     for items in arr:
#         school_name = items['name']
#         sort_in_arr.append(school_name)

# for items_school_name in sort_in_arr[0:4]:

#     try:

#         search = wikipedia.page(str(items_school_name))
#         url = search.url
#         print url
#         response = requests.get(url).text
#         soup = BeautifulSoup(response)
#         mascot = soup.findAll('th',text="Mascot")


#         for items in mascot:
#             print items.nextSibling.nextSibling.text
#         nickname = soup.findAll('th',text="Nickname")
#         for nickname_items in nickname:
#             print nickname_items.nextSibling.nextSibling.text     

#     except wikipedia.exceptions.PageError:
#         continue


def get_mascot_name_for_university(name):
    import wikipedia,requests
    from bs4 import BeautifulSoup
    
    arr = []
    search = wikipedia.page(str(name))
    url = search.url
    response = requests.get(url).text
    soup = BeautifulSoup(response)
    mascot = soup.findAll('th',text="Mascot")
    for items in mascot:
        mascot = {}
        mascot['mascot_name'] = items.nextSibling.nextSibling.text
        arr.append(mascot)

    
    if arr:
        print arr
        return arr
    else:
        return None
get_mascot_name_for_university('UCLA')