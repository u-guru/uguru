describe('university Test', function () {
 	//browser.driver.get("http://localhost:8100/#/university");
	
	// });
 	describe("university page should have famous school list",function()
	{
		it("Popular List is enable",function()
			{
		 		//browser.pause();
				element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length).not.toBe(0,"no result found");
		    	});
			});
		it('Check Data is repeating ',function()
		{
			doc.checkLists("school-list","university.name")
		});
	});
	// describe('Check back Access Code is Empty',function()
	// {
	// 	it("Go back button",function()
	// 	{
	// 		back.click();
	// 	});
	// 	it("Check Empty",function()
	// 	{
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("");
	// 		});	
	// 	});
	// 	it("Enter Access Code : cool ",function()
	// 	{
	// 		accessInput.sendKeys('cool');
	// 		accessInput.getAttribute('value').then(function(result)
	// 		{
	// 			expect(result).toBe("cool");

	// 		});
	// 	});

	// 	it("Check Message is shown :Access Granted",function()
	// 	{
	// 		startButton.click();
	// 		doc.checkMsg("Access Granted");
	
	// 	});	
	// });
	describe("Check GPS Button",function()
	{
		var gps = element(by.css('[ng-click="getGPSCoords()"]'));
		it('click GPS',function()
		{
			gps.click();
		});
		it('chheck miles shows',function()
		{
			browser.wait(EC.visibilityOf(element(by.binding('university.miles | number'))),3000,"TEST").then(function(){
				expect(element(by.binding('university.miles | number')).isDisplayed()).toBe(true);
		    }, function(){
		        //code to want to execute on failure.
		        // console.log("failure");
		 		doc.checkMsg("Unable to Find the Location, did you enable share Location");

		    });
		});
		it('Check Data is repeating ',function()
 		{
 			doc.checkLists("school-list","university.name")
 		});
 		it ('scroll down ',function()
 		{
			var filter = element(by.id('school-list'));
			var scrollIntoView = function () {
			  arguments[0].scrollIntoView();
			};
			browser.executeScript(scrollIntoView, filter.getWebElement()	);
			browser.sleep(10000);

 		});
	});
	// describe("Type in one letter",function()
	// {
	// 	it("Key in a letter",function()
	// 		{
	// 			doc.setInput("a",1);
	// 		});
	// 	it("Check list is show",function()
	// 	{
	// 		element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	//     		expect(items.length).not.toBe(0,"no result found");
	//     	});
	// 	});
	// 	it('Check Data is repeating ',function()
	// 	{
	// 		doc.checkLists("school-list","university.name")
	// 	});
	// });

	// describe("Check Icon are the same",function()
	// {
	// 	it("has different icon",function()
	// 	{	
	// 		doc.checkList('school-list',by.tagName('img'),'src');
	// 	});

	// });

	// describe("Select a university lead to home page",function()
	// {
	// 	it("choose a university",function()
	// 	{
	// 		doc.newPickList('school-list')

	// 	});
	// 	it("check the current position",function()
	// 	{
	// 		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/home");
	// 	});
	// });

});