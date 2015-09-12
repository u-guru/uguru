describe('Workflow Test : One', function () {
 	//browser.driver.get("http://localhost:8100/#/university");
	
	afterEach(function()
	{
		doc.checkLists("school-list","university.name")
	});
 	describe("university page should have famous school list",function()
	{
		it("Popular List is enable",function()
			{
		 		//browser.pause();
				element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length).not.toBe(0,"no result found");
		    	});
			});
	});
 	
	describe("Check GPS",function()
	{
		var gps = element(by.css('[ng-click="getGPSCoords()"]'));
		it('click GPS',function()
		{
			gps.click();
		});
		it('chheck miles shows',function()
		{
			expect(element(by.binding('university.miles | number')).isDisplayed()).toBe(true);	
		});
	});
	describe("Type in one letter",function()
	{
		it("Key in a letter",function()
			{
				doc.setInput("a",0);
			});
		it("Check list is show",function()
		{
			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).not.toBe(0,"no result found");
	    	});
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