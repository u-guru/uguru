import flickr_api
FLICKR_API_SECRET = '04496362f492984a'
FLICKR_API_KEY = '4ff14db4ee92b73b552d46bb559e6834'
flickr_api.set_keys(api_key = FLICKR_API_KEY, api_secret = FLICKR_API_SECRET)


a = flickr_api.auth.AuthHandler()
perms = "read"
url = a.get_authorization_url(perms)
print url
