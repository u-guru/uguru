describe('Side Menu test', function () {
	// var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuButton= element(by.css('.bg-charcoal'));
	var sideMenuList = element(by.css('.side-menu-list.with-icon'))
	var names = ['FAQ','TERMS','SUPPORT','SIGN UP','LOGIN'];

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
	// it("go to the new-home page",function()
	// {

 //        browser.wait(EC.elementToBeClickable(sideMenuList),3000);
	// 	expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/home");
	// });

	it("Check the side menu",function()
	{
  		browser.wait(EC.elementToBeClickable(sideMenuButton),3000);
		sideMenuButton.click();
        browser.wait(EC.visibilityOf(sideMenuList),3000);
        expect(sideMenuList.isDisplayed()).toBe(true);
	});

	describe("Check Visibile buttons",function()
	{
		// var names = ['FAQ','TERMS','SUPPORT','SIgn Up','LOGIN'];
		for (var i = 0 ;i < 5 ;++ i)
		{
	       (function(name) {
    			it("It has "+ name+ " Section",function()
				{
					// element.all(by.css(".list-item.item")).then(function(items)
					// {
					// 	expect(items.length).toBe(5)
					// });
    				doc.checkItemDisplay(name,true);
				});
    	    })(names[i]);
		}
		//Skip Bugs
		// it("refresh page [Skip Bug]",function()
		// {
		// 	browser.refresh();
		// });
		// it("Enter Access Code : cool ",function()
		// {
		// 	var accessInput  = element(by.tagName("input"));
		// 	accessInput.sendKeys('cool');
		// 	accessInput.getAttribute('value').then(function(result)
		// 	{
		// 		expect(result).toBe("cool");
		// 	});
		// });

		// it("Check Successed",function()
		// {
		// 	//browser.wait(EC.elementToBeClickable(startButton),5000);
		// 	var startButton = element(by.id("redeem-button"));

		// 	browser.sleep(4000);
		// 	startButton.click();
		// 	doc.checkMsg("Access Granted");
		// });
		// it("choose a university",function()
		// {
		// //	doc.pickList('university in initialUniversities');
		// 	doc.newPickList('school-list')
		// });
		// it("check the current position",function()
		// {
		// 	expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/home");
		// });

		// it("Check the side menu",function()
		// {
	 //  		browser.wait(EC.elementToBeClickable(sideMenuButton),3000);
		// 	sideMenuButton.click();
	 //        browser.wait(EC.visibilityOf(sideMenuList),3000);
	 //        expect(sideMenuList.isDisplayed()).toBe(true);
		// });
		// End Skip BUG
	});
	// Need to work on it
	// describe("Drag the Homepage",function()
	// {
	// 	it("drag homepage Right",function()
	// 	{
 //   			doc.slideView(0,"right",'request-content')

	// 	});
	// 	it("Check homepage is back",function()
	// 	{
	// 		element(by.tagName('ion-side-menu-content')).getLocation().then(function(result)
	// 		{
	// 			// browser.wait(EC.invisibilityOf(element(by.css('.menu.menu-right')),3000));
	// 			expect(result.x).toBe(0);
 //   				expect(result.x >= 0).toBe(true,"Homepaage doen't move back");
	// 		});
	// 	});
	// 	it("check side-menu-left-overlay is gone",function()
	// 	{
	// 		expect(element(by.id('side-menu-left-overlay')).isDisplayed()).toBe(false,"Ovelay is still there");
	// 	});
	// 	it("drag home page left",function()
	// 	{
 //   			doc.slideView(0,"left",'ion-side-menu-content')
	// 	});
	// 	it("Check homepage is Gone",function()
	// 	{
	// 		element(by.css('.ion-side-menus-content.menu-content.pane.menu-animated')).getLocation().then(function(result)
	// 		{
 //   				expect(result.x < 0).toBe(true,"Homepaage doesn't move away");
	// 		});
	// 	});
	// 	// it("browser sleep",function()
	// 	// {
	// 	// 	browser.sleep(1000000)
	// 	// })
	// });

	describe("Check All buttons is clickalbe",function()
		{
			var closed = element.all(by.css('.header-nav-back'));

			// var names = ['FAQ','TERMS','SUPPORT','SIgn Up','LOGIN'];
			for (var i = 0 ;i < 5 ;++ i)
			{
		       (function(name) {
	    			it("Open "+ name+ " Section",function()
					{
	    				doc.checkItemDisplay(name,true,'click');
					});
					it('Check it popup and has right page',function()
					{
						expect(element(by.css('.modal-backdrop.active')).getText()).toContain(name);

					});
					it('Close '+name + ' Page',function()
					{
						closed.then(function(items)
							{
								console.log(items.length);
								browser.wait(EC.elementToBeClickable(closed[0]),2000);
								closed[0].click();
							});
			 			
					});
	    	    })(names[i]);
			}
			//Skip Bugs
			// it("refresh page [Skip Bug]",function()
			// {
			// 	browser.refresh();
		 //        browser.wait(EC.visibilityOf(sideMenuList),3000);

			// });
		});
















	// describe("Buttons should not be shown",function()
	// {
	// 	it("Logout",function()
	// 		{
	// 			// doc.pickSideMenu(4,"Signup");
	// 			doc.checkItemDisplay("Logout",false);
	// 			// expect(element(by.id('account')).isDisplayed()).toBe(true);
	// 		});
	// });
	
	// describe("Add University",function()
	// {
	// 	it ("Click Add University",function()
	// 	{
	// 		doc.checkItemDisplay("Add University",true,'click');
	// 	});
	// 	it("Check The Page",function()
	// 	{
	// 		expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/university");
	// 	});
	// 	it("check Side bar close",function()
	// 	{
	// 		expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false);
	// 	});
	// 	it('back to home page',function(){
	// 		doc.newPickList('school-list')
	// 		doc.switchAlert();
	// 	});
	// 	it('Open Side Menu',function()
	// 	{
	// 		sideMenuButton.click();
	// 	    browser.wait(EC.visibilityOf(sideMenuList),3000);
	// 	    expect(sideMenuList.isDisplayed()).toBe(true);
	// 	});
	// });
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
	// describe("Terms",function()
	// {
	// 	it("Open Terms",function()
	// 		{
	// 			doc.checkItemDisplay("Terms",true,'click');
	// 		    doc.checkTitle("terms & policy");
	// 		});
	// 	it("close Terms",function()
	// 	    {
	// 			// body...
	// 			browser.wait(EC.elementToBeClickable(closed),2000);
	// 			closed.click();
	// 		});
	// });
	// describe("Support",function()
	// {
	// 	it("Open Support",function()
	// 		{
	// 			doc.checkItemDisplay("Support",true,'click');
	// 		    doc.checkTitle("uguru support");
	// 		});
	// 	it("close Support",function()
	// 	    {
	// 			// body...
	// 			browser.wait(EC.elementToBeClickable(closed),2000);
	// 			closed.click();
	// 		});
	// 	describe("modal backdrop keep adding up when you open support and close",function()
	// 	{
	// 		for (var i =0; i <8; ++i)
	// 		{
	// 			it("Open Support #"+i,function()
	// 			{
	// 				doc.checkItemDisplay("Support",true,'click');
	// 			    doc.checkTitle("uguru support");
	// 			});
	// 			it("close Support",function()
	// 		    {
	// 				// body...
	// 				browser.wait(EC.elementToBeClickable(closed),2000);
	// 				closed.click();
	// 			});
	// 		}
	// 		it ('check modal shoudn not be more than 4 (max)',function()
	// 			{
	// 				element.all(by.css('.modal-backdrop')).then(function(items)
	// 					{
	// 						expect(items.length< 5).toBe(true);
	// 					});
	// 			});
	// 	});
	// });




});