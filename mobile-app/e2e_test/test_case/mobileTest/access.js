
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
					doc.setInput(testSpec,0,false);
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
						browser.wait(EC.invisibilityOf(startButton.element(by.tagName("p"))),10000);
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
});