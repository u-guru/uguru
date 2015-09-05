
describe('Workflow Test : One', function () {
	// var accessInput = element(by.id("access-code-bar"));
	var accessInput = element(by.tagName("input"));
	var startButton = element(by.id("access-start"));
	var load= element(by.id('E2E-spinner'))
	var back = element(by.css('[ng-click="goToAccess()"]'))
	var listOfCase =  doc.generateRandomString(["","1"],5,"cool")
	
	
	for( i = 0; i < listOfCase.length; ++ i)
	{
        (function(testSpec) {
        	describe('Test Access Code #'+i,function()
			{
	           it("Enter Access Code : "+ testSpec,function()
				{
					doc.setInput(testSpec);
				});
	 

           		it("Check Fail or Successed",function()
				{
					startButton.click();
					if(testSpec == 'cool')
					{
						doc.checkMsg("Access Granted");
					}
					else
					{
						browser.wait(EC.presenceOf(startButton.element(by.tagName("p"))),3000);
						startButton.element(by.tagName("p")).getText().then(function(value)
						{
							expect(value).toBe("Incorrect access code");
						});	
					}
				
				});
			});
        })(listOfCase[i]);
    }	
	describe('Check back Access Code is Empty',function()
	{
		it("Go back button",function()
		{
			back.click();
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
			accessInput.sendKeys('cool');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("cool");

			});
		});

		it("Check Successed",function()
		{
			startButton.click();
			doc.checkMsg("Access Granted");
	
		});
	});

	describe("university page should have universities list",function()
	{
		it("Popular List is enable",function()
			{
				doc.isListShow("university in matchingUniversities");
			});
	});

	// describe("Check keyboard pop up",function()
	// {
	// 	it("Keyboard Pop",function()
	// 		{
				
	// 		});

	// });

	describe("Type in one letter",function()
	{
		it("Key in a letter",function()
			{
				doc.setInput("a");
			});
		it("check List pop",function()
		{
			doc.isListShow("university in matchingUniversities");
		});

	});

	describe("Check Icon are the same",function()
	{
		it("has different icon",function()
		{	
			doc.checkList('university in matchingUniversities',by.tagName('img'),'src');
		});

	});
	describe("Select a university lead to home page",function()
	{
		it("choose a university",function()
		{
			doc.pickList('university in matchingUniversities')
		});
		it("check the current position",function()
		{
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home");
		});
	});

});