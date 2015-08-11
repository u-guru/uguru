describe('Unit Test : User sign up with email address', function ()
{
	var signup = element(by.css('[ng-click="completeSignup()"]'));
	var firstName = element(by.id("first-name-input"));
	// var msg = protractor.get.msg;
	var msg =  element(by.id('E2E-msg'));
	beforeEach(function () {
 		browser.driver.get('http://localhost:8100/#/signup');
 		browser.sleep(2000);

    });
    it("Empty Sign up #1 : Everything empty",function()
    	{
    		signup.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Please fill in all fields!");
				});
			});
    	});
    it("Empty Sign up #2 : First Name not Empty",function()
	{
		firstName.sendKeys("Test");
		signup.click().then(function()
		{
			msg.getAttribute('value').then(function(value )
			{
				expect(value).toBe("Please fill in all fields!");
			});
		});
	});
	it("Email Sign Up ",function()
		{
			protractor.run.SignUp(true);
			protractor.run.logoff();

		});

});