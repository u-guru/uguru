describe('Workflow : University page', function () {
 	//browser.driver.get("http://localhost:8100/#/university");
	it("choose a university",function()
	{
		doc.pickList('university in initialUniversities')
	});
	it("check the current position",function()
	{
		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/home");
	});

});