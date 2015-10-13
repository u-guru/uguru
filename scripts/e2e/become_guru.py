import dryscrape

# dryscrape.start_xvfb()

search_term = 'dryscrape'

sess = dryscrape.Session(base_url = 'http://localhost:8100')

sess.set_attribute('auto_load_images', False)

sess.visit('/')

response = sess.source()
print response


### To detect when the state changes --> returns name
def waitUntilStateChanges():
    pass

### Checks if element has existed
def detectsMovementsInTheDom():
    pass

### For all get/post/put requests
def remoteRequestSuccessful():
    pass

### Injects javascript timer && returns back when an expression occurs
def remoteRequestSuccessful():
    pass


## Home page tests
## Test Success
## 1. Send keys cool && trigger enter
## 2. Does the loader popup
## 3. Does the success show immediately

## Home page tests
## Test Success
## 1. Send keys cool && trigger enter
## 2. Does the loader popup
## 3. Does the success show immediately

# q = sess.at_xpath('//*[@name="q"]')
# q.set(search_term)
# q.form().submit()


# # extract all links
# for link in sess.xpath('//a[@href]'):
#   print(link['href'])

# # save a screenshot of the web page
# sess.render('google.png')
# print("Screenshot written to 'google.png'")