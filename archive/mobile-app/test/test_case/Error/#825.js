describe('Error Test #825', function () {
	var msg = element(by.id('E2E-msg'));
	var load= element(by.id('E2E-spinner'))
	var EC = protractor.ExpectedConditions;
	var main = element(by.id('home-page'));
	var side = element(by.id('side_menu'));
	it("Shoudln't swipe the main home page",function()
		{
          //  protractor.get.closeBar.click();  
	        browser.actions().
			dragAndDrop(-412,0).
        	perform().then(function()
        		{
        			console.log("pass");

        		});

			// browser
			// .actions()
			// .mouseDown(side)
			// .mouseMove(main)
			// .mouseUp()
			// .perform();
        	browser.sleep(5000);

		});
});