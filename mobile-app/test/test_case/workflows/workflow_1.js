var EC = protractor.ExpectedConditions;

describe('Workflow Test : One', function () {

	browser.wait(EC.presenceOf(element(by.id("access-code-bar"))),10000);
	var startButton = element(by.id("access-start"));
	startButton.click();

	var ptor = protractor.getInstance();
	var alertDialog = ptor.switchTo().alert();
	alertDialog.accept();

	browser.sleep(5000);

	// // how to jump pages
	// // 
	// // Goal  --> Test Redeem Clicked on Empty
	// // 1. [Event] OnPageEnter --> Start Script
	// // 2. [Event] OnButtonClick --> CheckIfLoaderExists
	// // 3. [Event] Wait seconds --> IsLoaderStillShowing?


	// browser.wait(EC.presenceOf(element(by.id("access-code-bar"))),10000);
	// var accessInput = element(by.id("access-code-bar"));
	// var msg = element(by.id('E2E-msg'));
	// var startButton = element(by.id("access-start"));
	// var load= element(by.id('E2E-spinner'))
	// var back = element(by.css('[ng-click="goToAccess()"]'))
	// describe('Test Access Code #1',function()
	// {
	// 	it("Enter Access Code : 1 ",function()
	// 	{
	// 		accessInput.sendKeys('1');
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("1");

	// 		});
	// 	});
	// 	it("Check Fail",function()
	// 	{
	// 		startButton.click();
	// 		browser.wait(EC.presenceOf(msg),3000);
	// 		msg.getText().then(function(value)
	// 		{
	// 			expect(value).toBe("Incorrect access code");
	// 		});	
	// 	});
	// });
	// describe('Test Access Code #2',function()
	// {
	// 	it("Enter Access Code : djdiwpdmek11235 ",function()
	// 	{
	// 		accessInput.clear();
	// 		accessInput.sendKeys('djdiwpdmek11235');
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("djdiwpdmek11235");

	// 		});
	// 	});
	// 	it("Check Fail",function()
	// 	{
	// 		startButton.click();
	// 		browser.wait(EC.presenceOf(msg),3000);
	// 		msg.getText().then(function(value)
	// 		{
	// 			expect(value).toBe("Incorrect access code");
	// 		});	
	// 	});
	// });
	// describe('Test Access Code #3',function()
	// {
	// 	it("Enter Access Code : cool ",function()
	// 	{
	// 		accessInput.clear();
	// 		accessInput.sendKeys('cool');
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("cool");

	// 		});
	// 	});
	// 	it("Check Fail",function()
	// 	{
	// 		startButton.click();
	// 		var newMsg = element.all(by.id("E2E-msg")).last();
	// 		browser.wait(EC.presenceOf(newMsg),3000);
	// 		newMsg.getAttribute('value').then(function(value)
	// 		{
	// 			expect(value).toBe("Access Granted");
	// 		});	
	// 		// browser.sleep(10000)
	// 	});
	// });
	// describe('Check back',function()
	// {
	// 	it("Go back button",function()
	// 	{
	// 		back.click();
	// 		accessInput.clear();
	// 	});
	// 	it("Check Empty",function()
	// 	{
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("");
	// 		});	
	// 	});
	// });
	// describe('Test Access Code #3',function()
	// {
	// 	it("Enter Access Code : cool ",function()
	// 	{
	// 		accessInput.clear();
	// 		accessInput.sendKeys('cool');
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("cool");

	// 		});
	// 	});
	// 	it("Check Fail",function()
	// 	{
	// 		startButton.click();
	// 		var newMsg = element.all(by.id("E2E-msg")).last();
	// 		browser.wait(EC.presenceOf(newMsg),3000);
	// 		newMsg.getAttribute('value').then(function(value)
	// 		{
	// 			expect(value).toBe("Access Granted");
	// 		});	
	// 		// browser.sleep(10000)
	// 	});
	// });
});


