def get_color_of_college(name):
    import dryscrape
    from bs4 import BeautifulSoup
    from time import sleep
    import requests
    school = {}
    arr = []
    sess = dryscrape.Session(base_url = 'http://google.com')
    sess.set_attribute('auto_load_images', False)
    sess.visit('/')
    mascot_name = name + ' ' + "site:wikipedia.org"
    q = sess.at_xpath('//*[@name="q"]')
    sleep(1)
    q.set(mascot_name)
    q.form().submit()
    sleep(1)
    arr_info = []
    colors = []
    sess.render('google_search.png')
    user_agent = sess.set_header('user-agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    main_wrapper = soup.find('h3', attrs = {'class':'r'})
    a_link = main_wrapper.findAll('a')
    for href in a_link:
        first_split = href['href'].split('q=')
        arr.append(first_split)


    for items in arr:
        for another_items in items:
            wiki_url = another_items
            if "wiki" in wiki_url:
                
                url_info = wiki_url.split('&sa')[0]
                if "%25E2%2580%2593" in url_info:
                    replace_url_info_to = url_info.replace('%25E2%2580%2593','-')
                    response = requests.get(replace_url_info_to).text
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
                                   
                    #                 # Iterate through all the spans
                                    for span in spans:
                                            # Try to get the span style but catch the KeyError if the span has no style
                                            try:
                                                    # Get the substring of the background colour
                                                    style = span['style'][18:24]
                                                    
                                                    # Add the colour to the array
                                                    colors.append(style)
                                         
                                            except KeyError:
                                                    pass
                                   
                    #                 # Set the array into the dictionary
                                    school['colors'] = colors
                                    arr_info.append(school)
                    except AttributeError:
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
                                   
                    #                 # Iterate through all the spans
                                    for span in spans:
                                            # Try to get the span style but catch the KeyError if the span has no style
                                            try:
                                                    # Get the substring of the background colour
                                                    style = span['style'][18:24]
                                                    
                                                    # Add the colour to the array
                                                    colors.append(style)
                                         
                                            except KeyError:
                                                    pass
                                   
                    #                 # Set the array into the dictionary
                                    school['colors'] = colors
                                    arr_info.append(school)
                    except AttributeError:
                        continue

    if arr_info:
        print arr_info
        return None
    else:
        return None
get_color_of_college('University of Michigan - Dearborn')