import json

domain_arr = json.load(open('uni.json'))['data']


result_dict = {}
for domain_info in domain_arr:
    root_domain = domain_info['root_domain']
    if result_dict.get(root_domain):
        result_dict[root_domain]['count'] += 1
        result_dict[root_domain]['schools'].append(domain_info['school_name'])
    else:
        result_dict[root_domain] = {'count': 1, 'info': domain_info, 'schools':[domain_info['school_name']]}

from pprint import pprint
result_arr = [(key, len(result_dict[key]['schools']), result_dict[key]['count']) for key in result_dict.keys() if result_dict[key]['count'] > 5]
result_arr = sorted(result_arr, key=lambda k:k[2], reverse=True)
for result in result_arr:
    print result[0], '| Num Schools:'+ str(result[1]),  '| total URL count:' + str(result[2])

# from pprint import pprint
# result_arr = []
# result_arr = sorted(result_arr, key=lambda k:k[1], reverse=True)
# pprint (result_arr)
    # if result_dict.get('')
