describe('university Test', function () {
 	//browser.driver.get("http://localhost:8100/#/university");
	
	// });
 	describe("university page should have school list and is scroll able",function()
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


		for( i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Check scrollable ',function()
		 		{
		 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
			    		browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
			    	});
				});
				it('Check more items loaded',function()
				{
					element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
			    		expect(items.length > 10).toBe(true,"no data is loading");
			    	});

				});
				it ('scroll up ',function()
		 		{
		 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
			    		browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
			    	});
				});
	        })(i);
		}
		
	});
	describe('Check back Button is worked Code is Empty',function()
	{
		var accessInput = element(by.id("access-code-bar"));
		var startButton = element(by.id("access-start"));
		var load= element(by.id('E2E-spinner'))
		var back = element(by.css('[ng-click="goToAccess()"]'))

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
			browser.wait(EC.visibilityOf(accessInput),3000)
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
	describe("Check GPS Button",function()
	{
		var gps = element(by.css('[ng-click="getGPSCoords()"]'));
		it('click GPS',function()
		{
			browser.wait(EC.visibilityOf(gps),3000);
			gps.click();
		});
		it('chheck miles shows',function()
		{
			browser.wait(EC.visibilityOf(element(by.binding('university.miles | number'))),3000,"TEST").then(function(){
				element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length).toBe(3,"Search Engine not performing correct!");
		    		for(var i = 0 ; i < items.length; i++)
						expect(items[i].element(by.binding('university.miles | number')).isDisplayed()).toBe(true);
		    	});
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
 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	    		browser.executeScript('arguments[0].scrollIntoView()', items[8].getWebElement());
	    	});
		});
		it('Check more items loaded',function()
		{
			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length > 10).toBe(true,"no data is loading");
	    	});

		});
		it('Check Miles is loaded',function()
		{
			browser.wait(EC.visibilityOf(element(by.binding('university.miles | number'))),3000,"Miles is not Loading");
		});
	});
	describe("Type in O in the search input, there should be exactly 3 results - Ohio, Oklahoma, Oregon",function()
	{
		it("Type in O",function()
			{
				doc.setInput("O",1);
			});
		it("Check list is right",function()
		{
			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).toBe(3,"Search Engine not performing correct!");
	    	});
		});
		it('Check Data is right ',function()
		{
			doc.checkLists("school-list","university.name",'Ohio',0)
			doc.checkLists("school-list","university.name",'Oregon',1)
			doc.checkLists("school-list","university.name",'Oklahoma',2)

		});
	});


	describe("Check Icon are the same",function()
	{
		it("has different icon",function()
		{	
			doc.checkList('school-list',by.tagName('img'),'src');
		});

	});

	describe("Select a university lead to home page",function()
	{
		it("choose a university",function()
		{
			doc.newPickList('school-list')

		});
		it("check the current position",function()
		{
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/home");
		});
	});

});