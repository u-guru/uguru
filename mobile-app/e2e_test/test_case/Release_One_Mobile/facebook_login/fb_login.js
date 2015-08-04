describe('Unit Test : User logs in with Facebook', function ()
{
	var msg = element(by.id('E2E-msg'));
	var signup = element(by.css('[ng-click="signupFacebook()"]'));

	it("Log in Facebook",function()
		{
			browser.driver.get('http://localhost:8100/#/new-home');
			browser.sleep(2000);
			protractor.get.settingButton.click().then(function()
            {
                protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
                browser.sleep(8000);
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Login Successful!");
				});
                protractor.run.logoff();
            });
			
		} );
	it("log in Facebook in Signup page",function()
		{
			browser.driver.get('http://localhost:8100/#/new-home');
			browser.driver.get('http://localhost:8100/#/signup');
 			browser.sleep(2000);
 			signup.click().then(function()
 				{
 					protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
	                browser.sleep(8000);
	                msg.getAttribute('value').then(function(value )
					{
						expect(value).toBe("Login Successful!");
					});
	                protractor.run.logoff();
 				});
		});
});