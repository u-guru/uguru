import dryscrape
import time




def dryscrape_odesk_authentication():

	sess = dryscrape.Session(base_url = 'https://www.upwork.com/')
	sess.visit('https://www.upwork.com/login')
	username_field = sess.at_xpath('//*[@id="username"]')
	password_field = sess.at_xpath('//*[@name="password"]')
	username = 'jaceonmpgh@hotmail.com'
	password = '123123123vb'
	username_field.set(username)
	password_field.set(password)
	login_button = sess.at_xpath('//*[@value = "Log in"]')
	login_button.click()


# click_post_job = sess.at_xpath('//*[@class = "oBtn oBtnJumbo oBtnPrimary oDualBtns jsLogPostJobBtn"]')
# click_post_job.click()

# #first step
# category = 'Web, Mobile & Software Dev'
# choose_category = sess.at_xpath('//*[@name = "category"]')
# choose_category.set(category)
# #second step
# sub_category = 'Ecommerce Development'
# choose_sub_category = sess.at_xpath('//*[@id = "subcategory"]')
# choose_sub_category.set(sub_category)
# time.sleep(2)
# sess.render('secondcat.png')
# job_title = 'Testing 1234'
# choose_job_title 


