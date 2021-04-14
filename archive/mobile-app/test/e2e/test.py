from selenium import webdriver

driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768) 
driver.get('https://uguru.me/static/remote/index.html#/university')
driver.save_screenshot('screen.png')
sbtn = driver.find_element_by_css_selector('[name="btnI"]')

sbtn.click()
