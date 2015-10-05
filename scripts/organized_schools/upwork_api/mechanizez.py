import mechanize,cookielib
# Browser
br = mechanize.Browser()

# Cookie Jar
cj = cookielib.LWPCookieJar()
br.set_cookiejar(cj)

# Browser options
br.set_handle_equiv(True)
br.set_handle_gzip(True)
br.set_handle_redirect(True)
br.set_handle_referer(True)
br.set_handle_robots(False)

# Follows refresh 0 but not hangs on refresh > 0
br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)

# Want debugging messages?
#br.set_debug_http(True)
#br.set_debug_redirects(True)
#br.set_debug_responses(True)

# User-Agent (this is cheating, ok?)
br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]

# Open odesk site
r = br.open('https://www.odesk.com/login.php')
form = br.forms().next()  # the login form is unnamed...
print form.action
form['username'] = 'jaceonmpgh@hotmail.com'
form['password'] = '123123123vb'
br.form = form
br.submit()

print br.geturl()
#your form data goes here
r = br.open(br.geturl() + 'new/')
print br.geturl()
br.select_form(name="jobsPost")  # the form is unnamed...
br.find_control(name="category").value = ['Web, Mobile & Software Dev']
br.find_control(name="subcategory").value
br.form['title'] = 'Filling up a profile'
br.form['description'] = 'Require assistance in filing up our profile'
br.find_control(name="job_type").value = ['Fixed']
br.form['job_budget'] = '10'
br.form['job_finish_date'] = '10-14-2012'
br.find_control(name="visibility").value = ['private']
br.submit()

print br.geturl()