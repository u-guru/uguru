import requests
import requesocks
# add all necessary tor components here




# Takes a URL as INPUT and OUTPUTS the **HTML TEXT/STRING** of the url we are retrieving
def get(url):
    tor_obj = initiate_tor_connection()
    ### do whatever you need here to get the HTML page using tor connection
    ## i.e. tor_obj.request_page
    tor_client = requesocks.session()
    tor_client.proxies = {
       'http': 'socks5://127.0.0.1:9150',
        'https': 'socks5://127.0.0.1:9150'
     }
    ## ^^ am not sure of the tor syntax but fill in whatever is necessary
    pass

# Worry about this later, just implement get first()
def post():
    pass


## initiates tor connection, returns tor connection object
def initiate_tor_connection():

    pass
