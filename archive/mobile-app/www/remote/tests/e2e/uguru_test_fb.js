describe("Become Uguru",function()
{
  	beforeAll(function()
	{
		browser.driver.get('http://localhost:8100/#/new-home')
		// browser.wait(function()
			// {
				browser.sleep(1000);
				protractor.get.settingButton.click();
				browser.waitForAngular();
				protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
		        firstime =false; 
				browser.sleep(800);
				element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
					old_schoolName = value;
				});
			// },10000,"Time out");
		
				
	});	
	describe("Switch Uguru mode",function()
	{
		describe("Cancel Edit",function()
		{
			it("Switch Uguru mode",function()
			{
				protractor.get.switchUguru.click();
			});
			it("cancel alert",function()
			{
				browser.switchTo().alert().thenCatch(function (e) {
				    // 27 maps to bot.ErrorCode.NO_MODAL_DIALOG_OPEN: http://selenium.googlecode.com/git/docs/api/javascript/source/lib/atoms/error.js.src.html#l31
				   if (e.code == 27) {
				     	throw e;
				   }	
				}).then(function (alert) {
				    if (alert){
				     	return alert.dismiss();
				      }
				});		
			});
			describe("Check tabbuttons",function()
			{
				it ("Check question Button",function()
					{
						protractor.get.questionButton.click();
						expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru-questions");
					});
				it ("Check task Button",function()
					{
						protractor.get.tasksButton.click();
						expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru-tasks");
					});
				it ("Check profile Button",function()
					{
						protractor.get.profileButton.click();
						expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru-profile");

					});

				// it ("Check setting Button",function()
				// {
				// 	protractor.get.homebutton.click();
				// 	expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru");
				// });
			
				

				
				// // protractor.get.profileButton.click();
				// // expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru");
			});
			it("Return to Uguru-home page",function()
			{
				protractor.get.settingButton.click();
				protractor.get.closeBar.click();
				expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/guru");

			});
		});


	})

});