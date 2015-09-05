	describe("#6 Carousel slide 3 descriptions don't always fade out.", function () {
	    // var UguruHomepage = new AngularHomepage();
	    // var SchoolInput = dv.findElement(by.id('search-bar'));

		it("Load Page",function()
		{
			isAngularSite(false);
			web.get('http://www.uguru.me/');
			dv.wait(EC.visibilityOf(element(by.css(".top-link-menu.btn-round.btn-ghost"))),8000);
			web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
			dv.wait(EC.visibilityOf(element(by.id("link-why"))),800);
			web.getElement(by.id('link-why')).click();
		});
		it("Check element exist",function()
		{
			dv.wait(EC.visibilityOf(element(by.id("work-slider"))),10000);
			web.getElement(by.css('.top-link-close')).click();

		});
		it("Scroll down",function()
		{
			// web.getElement(by.css('.work-icon-link')).click();
			browser.executeScript('window.scrollTo(0,100);');
			browser.sleep(10000)
		});
	});