describe('Unit Test : User logs in with email address', function ()
{
	var msg = element(by.id('E2E-msg'));
 	beforeEach(function () {
 		browser.driver.get('http://localhost:8100/#/signup');
 		browser.sleep(2000);
        protractor.get.switchLoginMode.click();

    });
    it ('Empty username and Empty Password',function()
    	{
    		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Please fill in all fields!");
				});
			});
    	});
	it ('Empty username and Random Password', function ()
	{
		protractor.get.password.sendKeys("tesasfasg");
		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Please enter your email");
				});
			});
	});
	it ('Not standard Email (sdfsdfsdfsf) and Random Password', function ()
	{
		protractor.get.email.sendKeys("sdfsdfsdfsf");
		protractor.get.password.sendKeys("tesasfasg");
		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Please enter your email");
				});
			});
	});
	it ('Random Email and empty Password', function ()
	{
		protractor.get.email.sendKeys("test@test.edu");

		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Please enter your passowrd");
				});
			});
	});
	it ('Incorrect email and  Passowrd - PW: asdasdas ', function ()
	{
		protractor.get.email.sendKeys("test@test.edu");
		protractor.get.password.sendKeys("asdasdas");
		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Incorrect username or password");
				});
			});
	});
	it ('Incorrect User Name and Passowrd- PW: !#!@#$5ƒ ', function ()
	{
		protractor.get.email.sendKeys("test@test.edu");
		protractor.get.password.sendKeys("@!#!@#$5ƒ");
		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Incorrect username or password");
				});
			});
	});

	it ('Login Successful', function ()
	{
		protractor.get.email.sendKeys("jason@berkeley.edu");
		protractor.get.password.sendKeys("test1234");
		protractor.get.SubmitButton.click().then(function()
			{
				msg.getAttribute('value').then(function(value )
				{
					expect(value).toBe("Login Successful!");
				});
			});
		var logoff = element(by.css('[ng-click="logoutUser()"]'));
		logoff.click();

	});
});