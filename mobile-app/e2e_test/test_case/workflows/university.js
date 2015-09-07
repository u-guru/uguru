describe('Workflow Test : One', function () {
 	browser.driver.get("http://localhost:8100/#/university");
 
 	describe("university page should have famous school list",function()
	{
		it("Popular List is enable",function()
			{
		 		browser.pause();
				doc.isListShow("university in initialUniversities");
			});
	});

	describe("Type in one letter",function()
	{
		it("Key in a letter",function()
			{
				doc.setInput("a");
			});
		it("check matchingUniversities is show &  Initial Universities is hidde",function()
		{
			doc.isListShow("university in matchingUniversities","university in initialUniversities");
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