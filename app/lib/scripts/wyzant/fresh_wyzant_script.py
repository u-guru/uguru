import dryscrape,json,time
from bs4 import BeautifulSoup
import requests


subject = '*'
session = dryscrape.Session(base_url = 'https://www.wyzant.com/')
zip_code = '94530'
session.visit('https://www.wyzant.com/')
subject_field = session.at_xpath('//*[@id="txtBannerSubjectSearch"]')
subject_field.set(subject)
zip_code_field = session.at_xpath('//*[@id="txtBannerZipSearch"]')
zip_code_field.set(zip_code)
submit_button = session.at_xpath('//*[@type="submit"]')
submit_button.click()
#STEP 1
time.sleep(2)
# subject_course = session.at_xpath('//*[@name="match-answer-2"]')
# subject_course.set(subject)
# time.sleep(2)
# session.render('first_page.png')
# #next_button
# next_button_1 = session.at_xpath('//*[@class="btn btn-wide-mobile btn-spc-e spc-sm-s"]')
# next_button_1.click()
#grade_selection
student_grade = session.at_xpath('//*[@class="tap-selector"]')
student_grade.click()
time.sleep(2)
next_button_1 = session.at_xpath('//*[@class="btn btn-wide-mobile btn-spc-e spc-sm-s"]')
next_button_1.click()
time.sleep(2)
session.render('current_page.png')
