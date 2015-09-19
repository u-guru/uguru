describe('#14 Carousel slide 3 components overlap in smaller windows.', function () {

		it("Loading Page 1000*400",function()
		{
			isAngularSite(false);

			web.get('http://uguru.me/');

		});
		it("Click Side Menu & Go Work Pane",function()
		{

			// dv.wait(EC.visibilityOf(element(by.id(".pure-u-1"))),10000);
			dv.wait(EC.visibilityOf(element(by.css(".top-link-menu.btn-round.btn-ghost"))),10000);
			web.getElement(by.css('.top-link-menu.btn-round.btn-ghost')).click();
			dv.wait(EC.visibilityOf(element(by.id("link-work"))),10000);
			web.getElement(by.id('link-work')).click();
			dv.wait(EC.visibilityOf(element(by.id("work-slider"))),10000);
			web.getElement(by.css('.top-link-close')).click();
		});
		it("Match the position",function()
		{
			var textBanner = {x:0,y:0,ex:0,ey:0};
			var iconPosition = {x:0,y:0,ex:0,ey:0};
			dv.manage().window().setSize(1000,500);

			web.getElement(by.css(".inside-text")).getLocation().then(function(result)
				{
					textBanner = {x:result.x,y:result.y}
					//console.log(textBanner);
				});
			web.getElement(by.id("work-text")).getLocation().then(function(result)
				{
					//console.log(result);
					iconPosition = {x:result.x,y:result.y}
				});
			web.getElement(by.css(".inside-text")).getSize().then(function(size)
				{
					//console.log(iconPosition);
					//console.log(textBanner);
					// console.log(textBanner.x <iconPosition.x < (textBanner.x+size.width));
					// console.log(textBanner.y <iconPosition.y < (textBanner.y+size.height));
					expect( (textBanner.x <iconPosition.x < (textBanner.x+size.width) && (textBanner.y <iconPosition.y < (textBanner.y+size.height) ))).toBe(false);

				});
		});


});