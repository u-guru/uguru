## Make sure each photo has all image size urls (small, medium, large)
## Searchs ONE taeg 
## Returns an array of dictionaries, where each dictionary has details of one
## instagram image. These are the details I want about each post/photos
##  - Different size urls of photos --> link DIRECTLY to image, not instagram page w/ image
##  - # of hearts
##  - time posted
##  - # of comments
##  - user_instagram account who posted
##  - # of followers of the user who posted
## Time will take # of hours in the past. 
def mostPopularPhotosWithTag(hours=24, tag_string="cookies"):
	pass

### Searches MANY tags && and returns photos that 
### have at least ONE of the tags
### Time will take # of hours in the past. 
def mostPopularPhotosWithTagsOR(hours=24, tag_arr=[]):
	pass

### Searches MANY tags && and returns photos that 
### have ALL tags. If it is missing one of them, don't return it.
### Time will take # of hours in the past. 
def mostPopularPhotosWithTagsAND(hours=24, tag_arr=[]):
	pass


### Takes an instagram username, and returns the photos 
### uploaded in the past 24 hours 
def getRecentPhotosFromUser(insta_username, hours=24):
	pass

### Regardless of time, it returns the last 20 photos taken
### for an instauser account
def getPhotosFromUser(insta_username, count=20):
	pass

### [SAVE FOR LAST] Searches profile of user, returns the time 
### they were last active. 
### Return format must be python datetime
def lastActiveTime(insta_username):
	pass

### [SAVE FOR LAST] Save this one for last: CHALLENGING
### Get me an array of all the instagram followrs for one post
def getUserFollowers(insta_username, count=20):
	pass

## 
## Add helper functions here
##

