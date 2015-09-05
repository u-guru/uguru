var EC = protractor.ExpectedConditions;

describe('Workflow Test : One', function () {
	var accessInput = element(by.id("access-code-bar"));
	var msg = element(by.id('E2E-msg'));
	var startButton = element(by.id("access-start"));
	var load= element(by.id('E2E-spinner'))
	var back = element(by.css('[ng-click="goToAccess()"]'))
	describe('Test Access Code #1',function()
	{
		it("Enter Access Code : 1 ",function()
		{
			accessInput.sendKeys('1');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("1");

			});
		});
		it("Check Fail",function()
		{
			startButton.click();
			browser.wait(EC.presenceOf(msg),3000);
			msg.getText().then(function(value)
			{
				expect(value).toBe("Incorrect access code");
			});	
		});
	});
	describe('Test Access Code #2',function()
	{
		it("Enter Access Code : djdiwpdmek11235 ",function()
		{
			accessInput.clear();
			accessInput.sendKeys('djdiwpdmek11235');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("djdiwpdmek11235");

			});
		});
		it("Check Fail",function()
		{
			startButton.click();
			browser.wait(EC.presenceOf(msg),3000);
			msg.getText().then(function(value)
			{
				expect(value).toBe("Incorrect access code");
			});	
		});
	});
	describe('Test Access Code #3',function()
	{
		it("Enter Access Code : cool ",function()
		{
			accessInput.clear();
			accessInput.sendKeys('cool');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("cool");

			});
		});
		it("Check Successed",function()
		{
			startButton.click();
			var newMsg = element.all(by.id("E2E-msg")).last();
			browser.wait(EC.presenceOf(newMsg),3000);
			newMsg.getAttribute('value').then(function(value)
			{
				expect(value).toBe("Access Granted");
			});	
			// browser.sleep(10000)
		});
	});
	describe('Check back Access Code',function()
	{
		it("Go back button",function()
		{
			back.click();
			accessInput.clear();
		});
		it("Check Empty",function()
		{
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("");
			});	
		});
		it("Enter Access Code : cool ",function()
		{
			accessInput.clear();
			accessInput.sendKeys('cool');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("cool");

			});
		});
		it("Check Successed",function()
		{
			startButton.click();
			var newMsg = element.all(by.id("E2E-msg")).last();
			browser.wait(EC.presenceOf(newMsg),3000);
			newMsg.getAttribute('value').then(function(value)
			{
				expect(value).toBe("Access Granted");
			});	
		});
	});
	describe("university page should have universities list",function()
	{
		it("Popular List is enable",function()
			{
				var schoolList = element(by.repeater("university in matchingUniversities"))
				browser.wait(EC.visibilityOf(schoolList),3000);
				expect(schoolList.isDisplayed()).toBe(true);
			});
	});

	describe("Check keyboard pop up",function()
	{
		it("Keyboard Pop",function()
			{
				
			});

	});

	describe("Type in one letter",function()
	{
		it("Key in a letter",function()
			{
				var listInput = element(by.model('search_text'));
				listInput.sendKeys("a");
			});
		it("check List pop",function()
		{
				var schoolList = element.all(by.repeater("university in matchingUniversities"))
				browser.wait(EC.visibilityOf(schoolList),3000);
				expect(schoolList.isDisplayed()).toBe(true);
		});

	});

	describe("Check Icon are the same",function()
	{
		it("has different icon",function()
		{
			element.all(by.repeater('university in matchingUniversities')).then(function (items) {
            	expect(items.length).toBe(5);
        		var temp;
        		items[0].element(by.tagName('img')).getAttribute('src').then(function(value)
				{

					temp = value;
					for (var i = 0 ; i <5 ; i++)
	            	{
	        			items[i].element(by.tagName('img')).getAttribute('src').then(function(value)
						{

							expect(value).not.toBe(temp,"should have different address");
						});	
	            	}
				});			      
		    });
		});

	});
	describe("Select a university lead to home page",function()
	{
		it("choose a university",function()
		{
			element.all(by.repeater('university in matchingUniversities')).then(function (items) {
            	expect(items.length).toBe(5);
        		var temp = Math.floor((Math.random() * (items.length-1)));
        		items[0].click();
		    });
		});
		it("check the current position",function()
		{
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home");
		});
	});

});