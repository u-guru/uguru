
describe('FAQ Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));
	describe('FAQ Test', function () {

		it("Loading Homepage",function()
		{
			isAngularSite(false);
			web.get('http://uguru.me/faq');
			browser.sleep(8000);
		});
		// it("Click Banner",function()
		// {
		// 	// dv.wait(EC.visibilityOf(element(by.id(".pure-u-1"))),10000);

		// 	//web.getElement(by.tagName("dl"))
		// 	//console.log(dv.findElement(by.tagName("dl")));
		// 	// web.getElement(by.linkText('What kind of question is this?')).click();
		// 	browser.sleep(10000);

		// })
	});
	describe("#16 Side menu doesn't close when browser is scrolled down.", function () {
		it("Open Side Menu & Go Work Pane",function()
		{
			// dv.wait(EC.visibilityOf(element(by.id(".pure-u-1"))),10000);
			web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
		});
		it("scroll down",function()
		{
			dv.wait(EC.visibilityOf(element(by.id("link-work"))),1000);
			browser.executeScript('window.scrollTo(0,100);');
		});
		it("Check Side Menu",function()
		{
	 		expect(web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).isDisplayed()).toBe(false);
	 		browser.sleep(10000);
		});
	});
});
