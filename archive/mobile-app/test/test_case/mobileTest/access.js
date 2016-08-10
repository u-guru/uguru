
describe('Access Page Test', function () {
	// var accessInput = element(by.id("access-code-bar"));
	var accessInput = element(by.tagName("input"));
	var startButton = element(by.id("access-start"));
	var load= element(by.id('E2E-spinner'))
	var back = element(by.css('[ng-click="goToAccess()"]'))
	var listOfCase =  doc.generateRandomString(["","1"],5,"cool")

   	describe("Check Page is Not Dragalbe",function()
   	{
   		it("drag left",function()
   		{
				element(by.id('access')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X of Access Page is moved");

   				});
   			doc.slideView(0,"left")
   		});
   		it('Check element',function()
   		{
   			element(by.id('access')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X of Access Page is moved");
   				});
   		});
   		it('Go Bakc Access',function()
   		{
   			  browser.refresh();
   		})

   	});
	describe('When access code is typed in, press the enter key, & it should transition',function()
    {
   		it('Fresh page and Go Back Access',function()
   		{
   			browser.refresh();
   		})
   		it('send key',function()
   		{
	       		// doc.setInput("cool",0,false);
            doc.setInput('cool',0,'access.codeInput');


   		});
   		it('Press Enter Key',function()
   		{
   			element(by.id('access-code-bar')).sendKeys(protractor.Key.ENTER);
   			browser.sleep(1000);	
   		});
   		it('Check page Change,Check Message is shown :Access Granted',function()
   		{
			doc.checkMsg("Access Granted");
   		});
		it('Go Bakc Access',function()
   		{
   			browser.refresh();
   		})
    });
	for( i = 0; i < listOfCase.length; ++ i)
	{
        (function(testSpec) {
        	describe('Test Random Access Code #'+i,function()
			{
				// it("check",function()
				// {
				//     expect(browser.params.screenSize.w).toBe('1234');

				// });
       it("Enter Access Code : "+ testSpec,function()
				{
					//doc.setInput(testSpec,0,false);
              doc.setInput(testSpec,0,'access.codeInput',false);

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


});