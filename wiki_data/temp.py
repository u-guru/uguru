import json
uni_arr = json.load(open('../app/static/data/fa15_targetted.json'))
wiki_arr = json.load(open('wikipedia_most_recent.json'))

index = 0
names_found = []
for uni in uni_arr:
    for wiki in wiki_arr:
        if uni.get('id') == wiki.get('id'):

            uni['website'] = wiki.get('website')
            uni['nickname'] = wiki.get('nickname')
            if uni.get('nickname'):
                uni['nickname'] = uni['nickname'].lower()
            uni['web_title'] = wiki.get('wiki_title')
            uni['mascot'] = wiki.get('mascot')
            if wiki.get('images') and wiki['images'].get('seal'):
                uni['seal_url'] = wiki['images'].get('seal').get('url').replace('//upload','https://upload').replace('200px', '64px')
            if wiki.get('images') and wiki['images'].get('logo'):
                uni['forbes_url'] = uni['logo_url']
                uni['logo_url'] = wiki['images'].get('logo').get('url').replace('//upload','https://upload').replace('200px', '64px')

            index += 1
            names_found.append(uni['name'])
    if not uni.get('forbes_url'):
        uni['forbes_url'] = uni['logo_url']
    if uni['name'] not in names_found:
        print uni['name'] + ' not found'
with open('fa15_targetted_updated.json', 'wb') as fp:
        json.dump(uni_arr, fp, indent = 4)
print index, 'schools found'