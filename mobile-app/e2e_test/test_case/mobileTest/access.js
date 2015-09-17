
describe('Access Page Test', function () {
	// var accessInput = element(by.id("access-code-bar"));
	var accessInput = element(by.tagName("input"));
	var startButton = element(by.id("access-start"));
	var load= element(by.id('E2E-spinner'))
	var back = element(by.css('[ng-click="goToAccess()"]'))
	var listOfCase =  doc.generateRandomString(["","1"],5,"cool")
   	
   	describe("Is Page Dragalbe",function()
   	{
   		it("drag left",function()
   		{
				element(by.id('access')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X is moved");

   				});
   			doc.slideView(0,"left")
   		});
   		it('Check element',function()
   		{
   			element(by.id('access')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0);
   				});
   			browser.sleep(10000);
   		});
   		it('Go Bakc Access',function()
   		{
   			browser.refresh();
   		})

   	});
	
	for( i = 0; i < listOfCase.length; ++ i)
	{
        (function(testSpec) {
        	describe('Test Access Code #'+i,function()
			{
				// it("check",function()
				// {
				//     expect(browser.params.screenSize.w).toBe('1234');

				// });
	           it("Enter Access Code : "+ testSpec,function()
				{
					doc.setInput(testSpec,0,false);
				});
	 

           		it("Check Message is shown Correct",function()
				{
					startButton.click();
					if(testSpec == 'cool')
					{
						doc.checkMsg("Access Granted");
					}
					else
					{
						browser.wait(EC.visibilityOf(startButton.element(by.tagName("p"))),800);
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

		it("Check Message is shown :Access Granted",function()
		{
			startButton.click();
			doc.checkMsg("Access Granted");
	
		});
	});
});