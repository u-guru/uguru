def generate_university_url(school_name):
    url_format = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions|info|images&titles=" + school_name +  \
    "&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&format=json&iiprop=url&rvparse"
    return url_format

def scrape_all_universities(university_names):
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

            save_results(university_results, 'wikipedia_university_data_2.json')

        except:
            save_results(university_results, 'wikipedia_university_data_2.json')
            error_arr.append(university_name)
            save_results(error_arr, 'wikipedia_errors_2.json')
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


if __name__ == '__main__':
    import sys, json
    from app.models import *
    args = sys.argv

    # start = int(args[1])
    # end = int(args[2])
    # # Iterates through chegg
    # index = start
    # SCHOOLS = sorted(University.query.all(), key=lambda k:k.id)
    # SCHOOLS = [school.name for school in SCHOOLS]
    # scrape_all_universities(SCHOOLS)
    uni_arr = json.load(open('wiki_unprocessed.json'))

    # reparse all the names
    for uni in uni_arr:
        uni['name'] = uni['name'].replace('Of', 'of').replace('At', 'at').replace(' & ', 'and').replace('The', 'the').replace('And', 'and').replace('-', ' ').replace('/', ' ').replace("'","")
    uni_names = [uni['name'] for uni in uni_arr]
    from pprint import pprint
    scrape_all_universities(uni_names)



    # with open('wikipedia_university_data_2.json', 'wr') as fp:
    #     json.dump(arr, fp, indent = 4)