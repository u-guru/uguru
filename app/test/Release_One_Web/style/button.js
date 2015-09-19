describe('#8 Live Chat button and icon overlap each other in narrow browser window.', function () {

		it("Loading Homepage",function()
		{
			isAngularSite(false);
			dv.manage().window().setSize(510,940);

			web.get('http://uguru.me/');
			web.get('http://uguru.me/');

			// dv.wait(EC.visibilityOf(element(by.css(".intercom-launcher-button"))),8000);


		});
		it("Check Both element dots at 510 x 940",function()
		{
			browser.sleep(8000);
			expect(web.getElement(by.css('.intercom-launcher-button')).isDisplayed()).toBe(false,"Bubble FAQ");
			expect(web.getElement(by.id('mobile-start-link')).isDisplayed()).toBe(true,"LIVE FAQ");
		});
});