
describe('workpane Test', function () {

	describe('#2 Caoursel crashes when navigating to the Work pane from the side menu', function () {
	    // var UguruHomepage = new AngularHomepage();
	    // var SchoolInput = dv.findElement(by.id('search-bar'));

		it("Loading Page",function()
		{
			isAngularSite(false);
			web.get('http://uguru.me/faq');
			browser.sleep(8000);
		});
		it("Click Side Menu & Go Work Pane",function()
		{
			// dv.wait(EC.visibilityOf(element(by.id(".pure-u-1"))),10000);
			web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
			dv.wait(EC.visibilityOf(element(by.id("link-work"))),10000);
			web.getElement(by.id('link-work')).click();
			expect(browser.getCurrentUrl()).toEqual("http://www.uguru.me/#work-pane");

		});

		it("Check Page element",function()
		{
			dv.wait(EC.visibilityOf(element(by.id("work-slider"))),10000);
		});
		it("Check Menu element",function()
		{
			dv.wait(EC.visibilityOf(element(by.css(".top-link-menu.btn-round.btn-ghost"))),10000);
		});
	});

	describe("#6 Carousel slide 3 descriptions don't always fade out.", function () {
	    // var UguruHomepage = new AngularHomepage();
	    // var SchoolInput = dv.findElement(by.id('search-bar'));

		it("Load Page",function()
		{
			isAngularSite(false);
			web.get('http://www.uguru.me/');
			browser.sleep(8000);
			web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
			dv.wait(EC.visibilityOf(element(by.id("link-work"))),800);
			web.getElement(by.id('link-work')).click();
		});
		it("Check element exist",function()
		{
			dv.wait(EC.visibilityOf(element(by.id("work-slider"))),10000);
			web.getElement(by.css('.top-link-close')).click();

		});
		it("repeating click element",function()
		{
			// web.getElement(by.css('.work-icon-link')).click();
			browser.sleep(800);

			web.findElements(by.id("work-slider"),by.tagName('li')).then(function(elements)
			{
				elements[1].click();
				elements[0].click();
				elements[1].click();
			 	expect(web.getElement(by.id('work-wage-content')).isDisplayed()).toBe(false);
	 			// browser.sleep(10000);

			});
			// web.getElement(by.id('work-wage')).click();
			// web.getElement(by.id('popular-wage')).click();
		});
	});


});