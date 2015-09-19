describe('Side Menu test', function () {
	var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	var closed = element.all(by.css('.header-nav-back')).last();
	// beforeAll(function()
	// {
	//     browser.get("http://localhost:8100/#/home");
	// });
	describe("Welcome Pop Up",function()
	{
		it('Check Pop up ',function()
		{
			browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
			// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});
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
	describe("Buttons should not be shown",function()
	{
		it("Logout",function()
			{
				// doc.pickSideMenu(4,"Signup");
				doc.checkItemDisplay("Logout",false);
				// expect(element(by.id('account')).isDisplayed()).toBe(true);
			});
	});
	
	describe("Add University",function()
	{
		it ("Click Add University",function()
		{
			doc.checkItemDisplay("Add University",true,'click');
		});
		it("Check The Page",function()
		{
			expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/university");
		});
		it("check Side bar close",function()
		{
			expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false);
		});
		it('back to home page',function(){
			doc.newPickList('school-list')
			doc.switchAlert();
		});
		it('Open Side Menu',function()
		{
			sideMenuButton.click();
		    browser.wait(EC.visibilityOf(sideMenuList),3000);
		    expect(sideMenuList.isDisplayed()).toBe(true);
		});
	});
	describe("FAQ",function()
	{
		it("Open FAQ",function()
			{
				doc.checkItemDisplay("FAQ",true,'click');
			    doc.checkTitle("uguru faq");
			});
		it("close FAQ",function()
		    {
				// body...
				browser.wait(EC.elementToBeClickable(closed),2000);
				closed.click();
			});
	});
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
		describe("modal backdrop keep adding up when you open support and close",function()
		{
			for (var i =0; i <8; ++i)
			{
				it("Open Support #"+i,function()
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
			}
			it ('check modal shoudn not be more than 4 (max)',function()
				{
					element.all(by.css('.modal-backdrop')).then(function(items)
						{
							expect(items.length< 5).toBe(true);
						});
				});
		});
	});




});