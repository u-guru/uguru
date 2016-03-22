import requests
from bs4 import BeautifulSoup as soupify
from time import sleep

COMPONENT_URLS = ['http://codepen.io/teamuguru/pen/8400dd1d970855b0d9c4287962bad562.html']
DEFAULT_SLEEP_INTERVAL = 1

def getAllComponentUrls():
    all_hyperlinks = []
    for url in COMPONENT_URLS:
        html_response = soupify(requests.get(url).text)
        all_hyperlinks += [link['href'].split('?editors')[0] for link in html_response.select('li a[href]') if link.get('href')]
    return all_hyperlinks

def generateSingleComponentCSSFile():
    all_links = ["%s.scss" % link for link in getAllComponentUrls() if 'teamuguru' in link]
    result_str = ''
    print 'Grabbing %s css component files in intervals of %s seconds' % (len(all_links), DEFAULT_SLEEP_INTERVAL)
    for css_link in all_links:
        css_response = requests.get(css_link).text
        result_str += '\n\n' + css_response
        print css_link
        sleep(DEFAULT_SLEEP_INTERVAL)
    saveFile(result_str.encode('utf-8'), 'components', 'scss', '../')

def saveFile(_str, filename, ext, path):
    _file = open(filename + '.' + ext, 'w')
    _file.write(_str)
    print "%s successfully saved in this directory:" % (filename + '.' + ext)


generateSingleComponentCSSFile()
