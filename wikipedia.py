def generate_university_url(school_name):
    url_format = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions|info|images&titles=" + school_name +  \
    "&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&format=json&iiprop=url&rvparse"
    return url_format

def scrape_all_universities(university_names, iteration_num):
    university_results = []
    index = 0
    errors = 0
    error_arr = []
    length = len(university_names)
    for university_name in university_names:
        try:
            print "processessing", university_name
            university_query_results = scrape_one_university(university_name)

            if university_query_results:
                university_query_results['db_name'] = university_name
                university_results.append(university_query_results)
            else:
                print 'no results for', university_name
                errors += 1
            print index, '/' , length, 'processed.', errors, 'errors.'

            save_results(university_results, 'wikipedia_university_data_%s.json' % iteration_num)

        except:
            save_results(university_results, 'wikipedia_university_data_%s.json' % iteration_num)
            error_arr.append(university_name)
            save_results(error_arr, 'wikipedia_errors_%s.json' %iteration_num)
            print "error for", university_name
            errors += 1
        index += 1

    return university_results

def get_normalized_title(arg):
    pass

def get_row_names_from_infobox(soup):
    import re
    row_headers = soup.select('.infobox th')
    row_names = [header.text.replace('\n', '') for header in row_headers]
    return row_names

def get_row_from_infobox(soup):
    import re
    row_headers = soup.select('.infobox th')
    return row_headers

def get_num_students(soup):
    import re
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Students' in infobox_row_names:
        row_index = infobox_row_names.index('Students')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        student_population = parent_row.find('td').text.split(' ')[0].replace(',','')
        try:
            return float(re.sub('[^A-Za-z0-9]+', '', student_population))
        except:
            return None



def get_num_ugrads(soup):
    import re
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Undergraduates' in infobox_row_names:
        row_index = infobox_row_names.index('Undergraduates')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        student_population = parent_row.find('td').text.split(' ')[0].replace(',','')
        try:
            return float(re.sub('[^A-Za-z0-9]+', '', student_population))
        except:
            return None

def get_num_pgrads(soup):
    import re
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Postgraduates' in infobox_row_names:
        row_index = infobox_row_names.index('Postgraduates')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        student_population = parent_row.find('td').text.split(' ')[0].replace(',','')
        try:
            return float(re.sub('[^A-Za-z0-9]+', '', student_population))
        except:
            return None

def get_campus_size(soup):
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Campus' in infobox_row_names:
        row_index = infobox_row_names.index('Campus')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        campus_text = parent_row.find('td').text
        return campus_text

def get_school_nickname(soup):
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Nickname' in infobox_row_names:
        row_index = infobox_row_names.index('Nickname')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        nickname = parent_row.find('td').text.replace('\n','')
        return nickname

def get_mascot_name(soup):
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Mascot' in infobox_row_names:
        row_index = infobox_row_names.index('Mascot')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        nickname = parent_row.find('td').text.replace('\n','')
        return nickname

def get_school_colors(soup):
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Colors' in infobox_row_names:
        row_index = infobox_row_names.index('Colors')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        colors_spans = parent_row.find_all('span')
        color_hex_arr = []
        for span in colors_spans:
            if span.get('style'):
                color_hex_arr.append(span['style'].split(';')[0].split(':')[1])
        # color_one_hex = colors_spans[0]['style'].split(';')[0].split(':')[1]
        # color_two_hex = colors_spans[1]['style'].split(';')[0].split(':')[1]
        return color_hex_arr

def get_school_website(soup):
    infobox_row_names = get_row_names_from_infobox(soup)
    from pprint import pprint
    if 'Website' in infobox_row_names:
        row_index = infobox_row_names.index('Website')
        row_headers = get_row_from_infobox(soup)
        row_obj = row_headers[row_index]
        parent_row = row_obj.parent
        school_site = parent_row.find('td').text.replace('\n','')
        return school_site.lower()

def get_all_logos(soup):
    all_infobox_img = soup.select('.infobox img')

    result_imgs = []
    for img in all_infobox_img:
        result_imgs.append({
            'url': img['src'],
            'height': img['data-file-height'],
            'width': img['data-file-width']
            })
    return result_imgs

def get_logo_from_logos(logo_arr):
    for img_url in logo_arr:
        if 'logo' in img_url['url'].lower():
            return img_url

def get_seal_from_logos(logo_arr):
    for img_url in logo_arr:
        if 'seal' in img_url['url'].lower():
            return img_url


def scrape_one_university(university_name):
    import requests, json
    from pprint import pprint
    from bs4 import BeautifulSoup
    wiki_api_query_url = generate_university_url(university_name)
    response = requests.get(wiki_api_query_url)
    if valid_school_page_found(response):

        pages = get_first_revision_page(response)

        if not pages.get('revisions'):
            return

        html_content_soup = BeautifulSoup(pages['revisions'][0]["*"])

        all_logos = get_all_logos(html_content_soup)
        seal_url = get_seal_from_logos(all_logos)
        logo_url = get_logo_from_logos(all_logos)


        school_dict = {
            'wiki_title': pages['title'],
            'wiki_url': pages['fullurl'],
            'population': {
                'students': get_num_students(html_content_soup),
                'u-grad': get_num_ugrads(html_content_soup),
                'p-grad': get_num_pgrads(html_content_soup),
            },
            'campus': {'size': get_campus_size(html_content_soup)},
            'colors': get_school_colors(html_content_soup), #ordered by prioritiy
            'nickname': get_school_nickname(html_content_soup),
            'mascot': get_mascot_name(html_content_soup),
            # 'affiliations': get_all_affiliations(pages), # come back for this later
            'website': get_school_website(html_content_soup),
            'images': {
                'seal': seal_url,
                'logo': logo_url,
                'all': all_logos
            }
        }
        return school_dict

def get_first_revision_page(response):
    import json
    parsed_json_arr = json.loads(response.text)
    revision_num = parsed_json_arr["query"]["pages"].keys()[0]
    page_revision = parsed_json_arr["query"]["pages"][revision_num]
    return page_revision

def valid_school_page_found(response):
    import json
    try:
        pages = json.loads(response.text)["query"]["pages"]
        return pages
    except:
        return False

def save_results(structure, filename):
    import json
    with open(filename, 'wb') as fp:
        json.dump(structure, fp, indent = 4)

def count_unprocessed():
    file = open('wikipedia_university_data_processed.json')
    arr = json.load(file)
    processed_ids = [uni['id'] for uni in arr]
    print len(arr), 'already processed'

    count = 0
    unprocessed_universities = []
    for u in University.query.all():
        if u.id not in processed_ids:
            count += 1
            unprocessed_universities.append({
                'name': u.name,
                'id':u.id
                })
    print len(unprocessed_universities), 'universities not processed'
    save_results(unprocessed_universities, 'wiki_unprocessed.json')
    return

def uni_obj_to_arr(uni):
    result_dict = {
        'id':uni.id,
        'city':uni.city,
        'state':uni.state,
        'name': uni.name.replace('Of', 'of').replace('At', 'at').replace(' & ', 'and').replace('The', 'the').replace('And', 'and').replace('-', ' ').replace('/', ' ').replace("'",""),
        'latitude': uni.latitude,
        'longitude': uni.longitude,
        'rank': uni.us_news_ranking,
        # 'popular_courses': [],
        'logo_url': uni.logo_url,
        'population': uni.population,
        'school_color_one': uni.school_color_one,
        'school_color_two': uni.school_color_two,
        'banner_url':uni.banner_url
    }
    if uni.fa15_start:
        result_dict['fa15_start'] = True
    return result_dict

def update_outdated_universities():
    from app.lib.all_schools_updated import school_dict
    ranked_unis = []
    ranked_unis = json.load(open('wiki_og_rank.json'))

    count = 0
    for uni in ranked_unis:
        uni_id = uni['id']

        u = University.query.get(int(uni_id))
        uni_info = school_dict.get(str(u.id))
        if not uni_info:
            continue
        if uni_info.get('popular_courses'):
            popular_courses = []
            for popular_course in uni_info['popular_courses']:
                if len(popular_course) >= 5 and len(popular_course) <= 9 and not all(char.isdigit() for char in popular_course):
                    popular_courses.append(popular_course)
            if popular_courses:
                uni['popular_courses'] = popular_courses

    with open('wiki_og_rank.json', 'wr') as fp:
        json.dump(ranked_unis, fp, indent = 4)


    print count

def update_flicker():
    from app.lib.flickr_wrapper import *
    uni_arr = json.load(open('wiki_og_rank.json'))
    count = 0
    for uni_json in uni_arr:
        u = University.query.get(int(uni_json['id']))
        flickr_response = str(search_university_response_api(u))
        photos_arr = parse_flickr_response(flickr_response)
        processed_arr = process_returned_photos(photos_arr)
        processed_arr = sorted(processed_arr, key=lambda k:k['views'], reverse=True)[:20]
        if processed_arr:
            count += 1
            u.banner_url = str(processed_arr[0]['url'])
            print u.id, u.name, u.banner_url
    from app.database import *
    db_session.commit()
    print count


def recent_to_update_rank():
    import manage
    wiki_recent_arr = json.load(open('wikipedia_most_recent2.json'))
    count = 0
    count2 = 0
    for uni in wiki_recent_arr:
        if not uni.get('id'):
            continue
        u = University.query.get(int(uni['id']))
        if u and u.us_news_ranking > 0:

            all_images = uni['images']['all']
            logo_images = uni['images']['logo']
            seal_images = uni['images']['seal']
            hex_color = uni['colors']
            if (all_images or logo_images or seal_images) and hex_color:
                if hex_color:
                    if len(hex_color) == 2:
                        u.school_color_one = hex_color[0].lower()
                        u.school_color_two = hex_color[1].lower()
                        # print u.id, u.name, u.school_color_one
                        count += 1
                    if len(hex_color) == 1:
                        u.school_color_one = hex_color[0].lower()
                        # print u.id, u.name, u.school_color_one
                        count += 1
            # if uni.get('population') and uni.get('population').get('students'):
            #     uni.population = int(uni.get('population').get('students'))

                # count += 1
                # # print u.us_news_ranking, len(images),'images', len(hex_color), 'colors'

    from app.database import db_session
    db_session.commit()
    print count

def get_total_popular_courses():
    import json
    uni_arr = json.load(open('wiki_og_rank.json'))
    return len([uni.get('popular_courses') for uni in uni_arr if uni.get('popular_courses')])

def get_total_targetted():
    import json
    uni_arr = json.load(open('wiki_og_rank.json'))
    targetted = []
    count = 0
    for uni_obj in uni_arr:
        keys = uni_obj.keys()
        keys_with_non_nil_values = [key for key in keys if uni_obj[key]]
        if len(keys) == len(keys_with_non_nil_values):
            count += 1
            targetted.append(uni_obj)

    with open('wiki_og_rank_targetted.json', 'wr') as fp:
        json.dump(targetted, fp, indent = 4)
    return count



def calc_stats_uni_arr(uni_arr):
    total = len(uni_arr)
    total_cities = len([uni.get('city') for uni in uni_arr if uni.get('city')])
    total_states = len([uni.get('states') for uni in uni_arr if uni.get('state')])
    total_ranks = len([uni.get('rank') for uni in uni_arr if uni.get('rank')])
    total_courses = get_total_popular_courses()
    total_logos = len([uni.get('popular_courses') for uni in uni_arr if uni.get('logo_url')])
    total_school_color_ones = len([uni.get('school_color_one') for uni in uni_arr if uni.get('school_color_one')])
    total_populations = len([uni.get('populations') for uni in uni_arr if uni.get('population')])
    start_dates = len([uni.get('fa15_start') for uni in uni_arr if uni.get('fa15_start')])
    banner_urls = len([uni.get('banner_url') for uni in uni_arr if uni.get('banner_url')])
    print 'total:', total
    print 'num cities', "%d/%d" % (total_cities, total)
    print 'num state', "%d/%d" % (total_states, total)
    print 'num ranks', "%d/%d" % (total_ranks, total)
    print 'num populations', "100%"
    print
    print 'num logos', "%d/%d" % (total_logos, total), '-', '%d' % (int((total_logos / (total * 1.0)) *100)) + '%'
    print 'num colors', "%d/%d" % (total_school_color_ones, total), '-', '%d' % (int((total_school_color_ones / (total * 1.0)) *100)) + '%'
    print 'num start_dates', "%d/%d" % (start_dates, total), '-', '%d' % (int((start_dates / (total * 1.0)) *100)) + '%'
    print 'num flickr', "%d/%d" % (banner_urls, total), '-', '%d' % (int((banner_urls / (total * 1.0)) *100)) + '%'
    print 'num popular courses', "%d/%d" % (total_courses, total), '-', '%d' % int((total_courses / (total * 1.0)) *100) + '%'
    print
    print 'num_targetted', "%d/%d" % (total_targetted, total), '-', '%d' % int((total_targetted / (total * 1.0)) *100) + '%'


def generate_universities_dump():
    from app.lib.all_schools_updated import school_dict
    formatted_arr = []
    to_process_later = []
    uni_arr = University.query.all()
    from pprint import pprint
    uni_arr = [uni_obj_to_arr(uni) for uni in University.query.all() if uni.us_news_ranking]
    calc_stats_uni_arr(uni_arr)
    with open('wiki_og_rank.json', 'wr') as fp:
        json.dump(uni_arr, fp, indent = 4)

if __name__ == '__main__':
    import sys, json
    from app.models import *
    args = sys.argv

    # start = int(args[1])
    # end = int(args[2])
    # count = 0

    #for all schools that have

    ## 1. popular courses [-]
    ## 2. name [x]
    ## 3. city [x]
    ## 4. state [x]
    ## 8. us news rating [x]
    ## 5. hex color [-]
    ## 6. some logo [-]
    ## 7. fa start [-]
    ## 7. flickr [-]

    ## afterwards --update admin
    ## 1. targetted universities
    ## 2. most popular
    ## 3. us ranked
    ## 4. manage.py
    ## 5. link staging db with uguru-rest
    ## 6. create new universities.json script that works with the home page
    ## 7. home page

    # import json
    # arr = json.load(open('wiki_og.json'))
    # uni_names = [uni['name'] for uni in arr][start:end]

    # scrape_all_universities(uni_names, 7)
    # us_news_ranking_only()
    # generate_universities_dump()
    # recent_to_update_rank()
    # generate_universities_dump()
    get_total_targetted()
    # update_outdated_universities()
    # recent_to_update_rank()
    # reparse all the names
    # for uni in uni_arr:
    #     uni['name'] = uni['name'].replace('Of', 'of').replace('At', 'at').replace(' & ', 'and').replace('The', 'the').replace('And', 'and').replace('-', ' ').replace('/', ' ').replace("'","")
    # uni_names = [uni['name'] for uni in uni_arr]
    # from pprint import pprint


