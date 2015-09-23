describe("CSS Bug test case", function () {
	
	describe('#2 Uguru loading dots not centered', function () {

		it("Loading Homepage 1000 x 1000",function()
		{
			isAngularSite(false);
			dv.manage().window().setSize(1000,1000);
			web.get('http://uguru.me/');
		});
		it("Check SplashScreen dots",function()
		{
//			wait(web.getElement(by.css('.body-loading-div')))
			browser.executeScript('document.body.appendChild(bodyLoadingDiv);');
			dv.wait(EC.visibilityOf(element(by.css(".body-loading-div"))),5000);
			web.findElements(by.css('.body-loading-div'),by.tagName("div")).then(function(result){
		
				result[1].getLocation().then(function(loc)
					{
				     	dv.manage().window().getSize().then(function(screenSize){
				     		result[1].getSize().then(function(size)
							{
								console.log(screenSize.width,size.width,loc.x)
								expect(loc.x).toBe( (screenSize.width-size.width-loc.x));
							});

				     	});
					});
			});
		});
	});
	
	
});
