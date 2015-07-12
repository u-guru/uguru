
import requests
import requesocks
# add all necessary tor components here
### do whatever you need here to get the HTML page using tor connection


# Takes a URL as INPUT and OUTPUTS the **HTML TEXT/STRING** of the url we are retrieving
def get(url):
    tor_obj = initiate_tor_connection()
    tor_client = requesocks.session()
    tor_client.proxies = {
    'http': 'socks5://127.0.0.1:9150',
    'https': 'socks5://127.0.0.1:9150'
    }
    
    ## ^^ am not sure of the tor syntax but fill in whatever is necessary
    return tor_client.get(url)

# Worry about this later, just implement get first()
def post():
    pass


## initiates tor connection, returns tor connection object
def initiate_tor_connection():
    pass