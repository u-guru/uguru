describe("Search Pane Test", function () {

	describe("#10 Live Chat button doesn't appear during first user session.", function () {
		    // var UguruHomepage = new AngularHomepage();
		    // var SchoolInput = dv.findElement(by.id('search-bar'));

			it("Load Page",function()
			{
				isAngularSite(false);
				web.get('http://www.uguru.me/');
				browser.sleep(7000);
			});

			it("Check Live Chat element exist",function()
			{
	//			dv.wait(EC.visibilityOf(element(by.id("work-slider"))),10000);
	//			web.getElement(by.css('.top-link-close')).click();
		 		expect(web.getElement(by.css('.intercom-launcher-button')).isDisplayed()).toBe(true);

				

			});
		});
	describe("#12 Platform modal can't navigate back to school details window.", function () {
		    // var UguruHomepage = new AngularHomepage();
		    // var SchoolInput = dv.findElement(by.id('search-bar'));

			it("Load Page",function()
			{
				isAngularSite(false);
				web.get('http://www.uguru.me/');
			});

			it("Enter School : '' ",function()
			{
    			dv.wait(EC.visibilityOf(element(by.id("search-bar"))),5000);
			    dv.findElement(by.id('search-bar')).sendKeys('');
    			dv.wait(EC.visibilityOf(element(by.id("search-berkeley"))),5000);
				dv.findElement(by.id('search-berkeley')).click()
		   	});

		   	it("Flip to sign board",function()
			{
				browser.sleep(2000);
    			dv.wait(EC.visibilityOf(element(by.css(".search-results.bounceInDown.animated"))),5000);
			dv.findElement(by.css(".front")).getCssValue("transform").then(function(results)
				{
					console.log(results);
				});
				dv.findElement(by.css(".search-results.bounceInDown.animated")).click()

		   	});
		   	it("Enter Email",function()
		   	{
    			dv.wait(EC.elementToBeClickable(element(by.css(".search-results-top.text-center"))),5000);
		   		web.getElement(by.id('school-email-input')).sendKeys("test");
		   	})

	   	 	it("Flip to school board",function()
		   	{
		   		//search-results-header
				dv.findElement(by.css(".search-results.bounceInDown.animated")).click()
				dv.findElement(by.css(".front")).getCssValue("transform").then(function(results)
				{
					console.log(results);
				});

				// dv.findElement(by.css(".front")).getAttribute("style").then(function(results)
				// {
				// 	console.log(results[transform]);
				// });
				expect(web.getElement(by.css('.front')).isDisplayed()).toBe(true);
		   	})
		});
		describe("#14 Search modal sometimes skips the school detail window.", function () {
		    // var UguruHomepage = new AngularHomepage();
		    // var SchoolInput = dv.findElement(by.id('search-bar'));

			it("Close Platform",function()
			{
				dv.findElement(by.id("home-modal-close-link")).click();
			});

			it("Enter School : '' ",function()
			{
			    dv.findElement(by.id('search-bar')).sendKeys('');
    			dv.wait(EC.visibilityOf(element(by.id("search-berkeley"))),5000);
				dv.findElement(by.id('search-berkeley')).click()
		   	});

		   	it("Check School borard",function()
		   	{
				expect(web.getElement(by.id('school-email-input')).isDisplayed()).toBe(false);

		   	})
		});

	describe("#18 Side menu Windows icon leads to iTunes page.", function () {
		    // var UguruHomepage = new AngularHomepage();
		    // var SchoolInput = dv.findElement(by.id('search-bar'));

			it("Open Side Menu",function()
			{
				// dv.wait(EC.visibilityOf(element(by.id(".pure-u-1"))),10000);
				web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
			});
			it("click Windows Store ",function()
			{
				dv.wait(EC.visibilityOf(element(by.id("link-work"))),1000);
				web.findElements(by.css(".pure-g.menu-icons"),by.css(".pure-u-1-3")).then(function(results)
				{
					results[1].findElement(by.tagName("a")).getAttribute("href").then(function(results)
						{
							expect(results).toBe("http://www.uguru.me/windows/app/")
						});
				});
			});;
		});
});
