import requests,json
from bs4 import BeautifulSoup
from mailgun import*
 
 
huge_arr = []
 
 
 
with open('north_chapel_hill_data.json') as datafile:
        json_data_file = json.load(datafile)
        for email in json_data_file:
                dictionary = {}
                dictionary['email'] =  email['email'].title().split('@')[0] + '@unc.edu'
           

                dictionary['first_name'] = email['first_name'].strip()
                dictionary['last_name'] = email['last_name'].strip()
                huge_arr.append(dictionary)
 
 
        second_array = []
        for x in range(1,len(huge_arr)):
                second_array.append(huge_arr[x])
                if (x % 999 == 0):
                        add_students_to_mailing_list('University of North Carolina Chapel Hill',second_array)
                        response = add_students_to_mailing_list('University of North Carolina Chapel Hill',second_array)
                        print response.text
                        second_array = [] # reinitialize it since you've sent the most recent one_thousand
 
         ## call it one more time, what if you had 1500 student,s your loop would only send on iteration #999
         ## Once the for-loop is done, you will still have a second_array with 500 items, so you must call it once more
        add_students_to_mailing_list('University of North Carolina Chapel Hill',second_array)
