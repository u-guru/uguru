import requests


headers = {'content-type':'application/x-www-form-urlencoded'}
valdidation = requests.post('https://post.craigslist.org/bulk-rss/validate',headers=headers)
print valdidation.text
#submission = requests.post('https://post.craigslist.org/bulk-rss/post',headers=headers)
