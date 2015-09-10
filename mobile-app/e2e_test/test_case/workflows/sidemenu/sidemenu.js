describe('Sign-up test', function () {
	var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	var closed = element.all(by.css('.header-nav-back')).last();
	beforeAll(function()
	{
	    browser.get("http://localhost:8100/#/home");
	});
	it("go to the new-home page",function()
	{
        browser.wait(EC.elementToBeClickable(sideMenuList),3000);
		expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/home");
	});
	it("open the side menu",function()
	{
		sideMenuButton.click();
        browser.wait(EC.visibilityOf(sideMenuList),3000);
        expect(sideMenuList.isDisplayed()).toBe(true);
	});
	it("Check Logout is not enable",function()
	{
		// doc.pickSideMenu(4,"Signup");
		doc.checkItemDisplay("Logout",false);
		// expect(element(by.id('account')).isDisplayed()).toBe(true);
	});

	// describe("FAQ",function()
	// {
	// 	it("Open FAQ",function()
	// 		{
	// 			doc.checkItemDisplay("FAQ",true,'click');
	// 		    doc.checkTitle("uguru faq");
	// 		});
	// 	it("close FAQ",function()
	// 	    {
	// 			// body...
	// 			browser.wait(EC.elementToBeClickable(closed),2000);
	// 			closed.click();
	// 		});
	// });
	describe("Terms",function()
	{
		it("Open Terms",function()
			{
				doc.checkItemDisplay("Terms",true,'click');
			    doc.checkTitle("terms & policy");
			});
		it("close Terms",function()
		    {
				// body...
				browser.wait(EC.elementToBeClickable(closed),2000);
				closed.click();
			});
	});
	describe("Support",function()
	{
		it("Open Support",function()
			{
				doc.checkItemDisplay("Support",true,'click');
			    doc.checkTitle("uguru support");
			});
		it("close Support",function()
		    {
				// body...
				browser.wait(EC.elementToBeClickable(closed),2000);
				closed.click();
			});
	});
});