from time import sleep


#### Tasks for 10/23
##
## 9am - 10am: Progress on this script
    ## 1. Setup your work area
    ## 2. Do all the functions in order by number
## 10am -- 11am:
    ## 1. Check ben@uguru.me gmail in front of everyone
    ## 2. There is email with subject "Morning tech prompt"


### gets arr of most updated university data
def get_all_universities_metadata():
    import requests, json
    arr = json.loads(requests.get('http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities').text)
    return arr

def choose_random_100_universities(uni_arr):
    random_ints = []
    from random import randint


    max_int = len(uni_arr)
    for _ in range(0, max_int-1):

        if len(random_ints) == 100:
            return [uni_arr[_int] for _int in random_ints]


        _int = randint(0, max_int-1)
        if _int not in random_ints:
            random_ints.append(_int)
        # else continue
    print len(random_ints), 'unique integers found between 1 and', len(uni_arr)


    return [uni_arr[_int] for _int in random_ints]
### 1. wtf is this doing?
### Comment what it does in 1 sentence --> "this function will return me ... "
### Jeselle should understand what it does
### redefine the function so it doesn't include anything unnecessary
def random_func():
    from pprint import pprint
    print
    result = "".join([key+'\n' for key in get_all_universities_metadata()[0].keys()])
    title, _wat, body = random_func_2(result)
    print "\n".join([_ for _ in random_func() if _])
    return body[::-1]


def random_func_2(elem):
    a,b,c = "University fields available\n", str(id and dict), sorted(elem.split("\n"), reverse=True)
    return a, b + 'd', c


### 2.

## DO NOT CHANGE THE NAME OF THIS FUNCTION
def get_mascot_name_for_university(name):
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
    sleep(5)
    sess.render('google_search.png')
    user_agent = sess.set_header('user-agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')

    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    first_main_wrapper = soup.findAll("span", attrs ={'class':'_m3b'})
    
    if first_main_wrapper:
        for main_wrapper_text in first_main_wrapper:
            mascot  = {}
            mascot['Mascot'] = main_wrapper_text.text.replace(',','').encode('ascii','ignore') 
            arr.append(mascot)
            
            
    else:
        second_main_wrapper = soup.findAll('span', attrs = {'class':'_G0d'})
        for second_wrapper_text in second_main_wrapper:
            exception_dict = {}
            exception_dict['except_mascot'] = second_wrapper_text.text.replace(',','').encode('ascii','ignore')
            arr.append(exception_dict)
            

    if arr:
        print arr
        return arr
    else:
        return None

     

## 3
def get_logo_url_for_university(name):
    arr = []
    sess = dryscrape.Session(base_url = 'http://google.com')
    sess.set_attribute('auto_load_images', False)
    sess.visit('https://www.google.com/imghp')
    mascot_name = str(names) + ' ' + "Logo"
    q = sess.at_xpath('//*[@name="q"]')
    sleep(2)
    q.set(mascot_name)
    q.form().submit()
    sleep(2)
    sess.render('google_image.png')
    dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    logo_url = {}
    first_fifty = soup.findAll('img')[:50]
    sleep(5)
    for images in first_fifty:
        first_fifty_images = images['src']
        arr.append(first_fifty_images)
    to_save_results_in_json[str(names)] = arr
    with open('logo_image_url.json','wb') as outfile:
        json.dump(to_save_results_in_json,outfile,indent=4) 
    if arr:
        print arr[0]
        return arr[0]
    else:
        return None

def get_url_of_college(name):
    import wikipedia,requests
    from bs4 import BeautifulSoup
    import dryscrape
    from time import sleep
    arr = []
    final_arr = []
    sess = dryscrape.Session(base_url = 'http://google.com')
    sess.set_attribute('auto_load_images', False)
    sess.visit('https://www.google.com/')
    mascot_name = name
    q = sess.at_xpath('//*[@name="q"]')
    sleep(2)
    q.set(mascot_name)
    q.form().submit()
    sleep(2)
    #sess.render('google_image.png')
    dynamic_headers = sess.set_header('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')
    html_page = sess.body()
    soup = BeautifulSoup(html_page)
    main_wrapper = soup.findAll('h3', attrs = {'class':'r'})
    for items in main_wrapper:
        a_ref = items.findAll('a')
        for items in a_ref:
            parse_href = items['href']
            if "/url?q=" in parse_href:
                arr.append(parse_href)
    parse_final_url = arr[0].split('/')
    for items in parse_final_url:
        if "." in items:
            output_format = {}
            output_format['website'] = items
            output_format['school_name'] = name
            final_arr.append(output_format)
    if final_arr:
        print final_arr
        return final_arr
    else:
        return None




def get_color_of_college(name):
    import dryscrape
    from bs4 import BeautifulSoup
    from time import sleep
    import requests
    school = {}
    arr = []
    sess = dryscrape.Session(base_url = 'http://google.com')
    #sess.set_attribute('auto_load_images', False)
    sess.visit('https://www.google.com/?gws_rd=ssl')
    mascot_name = str(name) + ' ' + "site:wikipedia.org"
    sleep(3)
    q = sess.at_xpath('//*[@name="q"]')
    q.set(mascot_name)
    q.form().submit()
    arr_info = []
    colors = []
    sess.render('google_search_response.png')
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
                print url_info
                if "%25E2%2580%2593" in url_info:
                    replace_url_info_to = url_info.replace('%25E2%2580%2593','-')
                    response = requests.get(replace_url_info_to).text
                    soup = BeautifulSoup(response)
                    table = soup.find('table', attrs = {'class':'infobox'})
                    try:
                        rows = table.findAll('tr')
                       
                      
                        for row in rows:
                            if row.th is not None:
                                if row.th.text == "Colors" or row.th.text == "Colours":
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
                                if row.th.text == "Colors" or row.th.text == "Colours":
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
        return arr_info
    else:
        return None

            
def all_600_school():
    import json
    school_name_arr = []
    open_file = open('uni-priorities.json')
    convert_to_json = json.load(open_file)
    for items in convert_to_json:
        name = items['name']
        school_name_arr.append(name)
    return school_name_arr

def check_efficiency(problem_number):
    import wikipedia
    import dryscrape
    import requests
    from webkit_server import InvalidResponseError
    print "started..."
    uni_arr = get_all_universities_metadata()
    sample_universities = choose_random_100_universities(uni_arr)
    #print len(sample_universities), 'universities sampled'
    universities_arr = all_600_school() 
    total_count = 100
    total_success = 0
    for uni in universities_arr[:100]:
        university_name = str(uni)
        sleep(1)
        if problem_number == 2:
            mascot_name = get_mascot_name_for_university(university_name)
            #print mascot_name
            if mascot_name:
                total_success += 1
            else:
                print university_name
  
            # else continue since we didnt find it

        if problem_number == 3:
            logo_url = get_logo_url_for_university(university_name)
            if logo_url:
                total_success += 1
            else:
                print university_name

        if problem_number == 4:
                website = get_url_of_college(university_name)
                if website:
                    total_success += 1
                else:
                    print university_name

        if problem_number == 5:
            try:
                try:
                    try:
                        sleep(2)
                        colors = get_color_of_college(university_name)
                        if colors:
                            print colors
                            total_success += 1
                        else:
                            print university_name 
                    except requests.exceptions.ConnectionError:
                       continue
                except InvalidResponseError as e:
                    print e
                    continue

                
            except AttributeError:
                continue            
            
    print "#%s percentage: %s percent" % (problem_number, float(total_success) / total_count)


check_efficiency(5)



