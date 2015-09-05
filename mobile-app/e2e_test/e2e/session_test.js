var settingButton = element(by.id('settings-button'));
var connectFB =	 element(by.css('[ng-click="signupFacebook()"]'));
var logoff = element(by.css('[ng-click="logoutUser()"]'));
var request = element(by.id('request-button'));
var sessionButton =  element(by.css('[ng-click="launchRequestModal(0)"]'));
var locationButton = element(by.css('[ng-click="launchLocationModal()"]'));
var logoff = element(by.css('[ng-click="logoutUser()"]'));
var emailSignButton = element(by.id('E2E_Email'));
var switchLoginMode = element(by.id('E2E_SwitchLog'));
var doneButton = element(by.id('done-button'));
var email = element(by.id('email-input'));
var password = element(by.id('password-input'));
var SubmitButton = element(by.id('done-button'));
var SignUp = function ()
{
    var firstName = element(by.id('first-name-input'));
    var lastName = element(by.id('last-name-input'));
    firstName.sendKeys('John');
    lastName.sendKeys('hair');
    email.sendKeys('hair_lvrxrsl_one@tfbnw.net');
    password.sendKeys('makhani1');
    SubmitButton.click();
};

var LogIn = function()
{
    email.sendKeys('hair_lvrxrsl_one@tfbnw.net');
    password.sendKeys('makhani1');
    SubmitButton.click();
}



describe('Session Workflow with facebook login', function () {
	beforeEach(function () {
		            browser.driver.ignoreSynchronization = true;
		browser.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/remote');

        settingButton.click();
        
        //expect(connectFB.isEnabled()).toBe(true);
        connectFB.click();
            //Switch Screen
            browser.getAllWindowHandles().then(function (handles) {
              // switch to the popup
              browser.switchTo().window(handles[1]);

              // do stuff with the popup
                browser.driver.findElement(by.id('email')).sendKeys('hair_lvrxrsl_one@tfbnw.net');
                browser.driver.findElement(by.id('pass')).sendKeys('makhani1');
                browser.driver.findElement(by.id('u_0_2')).click();
              // go back to the main window
              browser.switchTo().window(handles[0]);
            });

            return browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                     console.log(/remote/.test(url));
                  return url;
                });
            }, 10000);
	});
	it ('Workflow start',function()
	{
		browser.sleep(500);
		request.click();
		sessionButton.click();
		browser.sleep(500);
		element(by.name("course-input")).sendKeys("CS");
		browser.sleep(1000);
		//var list = element.all('[ng-click="addSelectedCourse(course, course_search_text)"]');
		element.all(by.repeater('course in root.vars.matchingCourses')).then(function(items)
		{
			//expect(items.length).toBe(1);
			//expect(items[0].getText()).toBe('Hum CS M10A');
			items[0].click();
		});
		browser.sleep(500);
		
		locationButton.click();
		browser.sleep(500);
		element(by.id("location-input")).sendKeys("s");
		browser.sleep(2000);
	
		element.all(by.repeater('location in root.vars.nearby_locations')).then(function(items)
		{
			//expect(items.length).toBe(1);
			//expect(items[0].getText()).toBe('Hum CS M10A');
			items[0].click();
		});
			
		browser.sleep(3000);
		var doneButton = element(by.css('[ng-click="submitRequest()"]'));

		doneButton.click();
		browser.sleep(3000);
		element.all(by.repeater('request in user.active_requests')).then(function(courses)
		{
			//expect(items.length).toBe(1);
			//expect(items[0].getText()).toBe('Hum CS M10A');
			//courses[0].click();
			browser.actions().mouseDown(courses[0]).perform();
			browser.sleep(1000);
			//browser.actions().mouseUp(courses[0]).perform();
			var alertDialog = browser.switchTo().alert();
			alertDialog.accept();  // Use to accept (simulate clicking ok)

		});
           browser.sleep(500);
           settingButton.click().then(function(){
           browser.sleep(500);
	
           logoff.click();    
           });
           browser.sleep(5000);
	});
});

describe('Session Workflow without facebook login', function () {
	beforeEach(function () {
		browser.driver.ignoreSynchronization = true;
		browser.driver.manage().window().setSize(414, 736);
       browser.driver.get('http://localhost:8100/');

        settingButton.click();
        browser.sleep(500);

   	});

	it ('Sign Up Account',function()
	{
		//switchLoginMode.click();
	   // browser.driver.sleep(1000);
	    emailSignButton.click();
	    browser.sleep(500);
	    switchLoginMode.click();
		//browser.driver.findElement(By.xpath("//a[contains(.,' or with email ')]")).click();
		//browser.driver.findElement(By.linkText(" or with email ")).click();
	    // Enter Information
	    browser.sleep(500);
	    SignUp();

		//emailSignButton.click();
		browser.sleep(8000);


	});
});