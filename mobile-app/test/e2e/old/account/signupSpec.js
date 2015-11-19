describe('Sign-up test', function () {
	var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	var closed = element.all(by.css('.header-nav-back')).first();
	var closeButton = element.all(by.css('.modal-backdrop.active .header-down')).last();

	// beforeAll(function()
	// {
	// 	if(browser.getCurrentUrl() === "http://"+localhost+":8100/#/guru");
	// 	{
	// 		// browser.get("http://"+localhost+":8100/#/guru");
	// 		element(by.id('btn-edit-profile')).click();
	// 	}
	// });
	beforeAll(function()
	{
		browser.get("http://"+localhost+":8100/#/guru");
		browser.sleep(2000)
	});
	it('Launch Profile',function()
	{
		// browser.wait(EC.elementToBeClickable(element(by.id('btn-edit-profile'))),4000);
 		// element(by.id('btn-edit-profile')).click();	
 		account.LaunchSignUpAtGuru();
	});

	// it("go to the new-home page",function()
	// {
 //        browser.wait(EC.elementToBeClickable(sideMenuList),3000);
	// 	expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/home");
	// });

	// it("open the side menu",function()
	// {
 //        browser.wait(EC.visibilityOf(sideMenuList),3000);

	// 	sideMenuButton.click();
 //        browser.wait(EC.visibilityOf(sideMenuList),3000);
 //        expect(sideMenuList.isDisplayed()).toBe(true);
	// });
	it("Active Sign-up",function()
	{
		account.CheckSignUpPageDisplayed();
	});

	//Need to fix closing
	//Add later 
	// describe("check term & condition paging",function()
	// {
	// 	it('check term & condition is working',function()
	// 	{
	// 		//element(by.id('tos')).click();
	// 		account.OpenTermPage.click();
	// 	});
	// 	it('check Term Page is shown', function()
	// 	{
	// 		expect(element(by.css('.modal-backdrop.active')).getText()).toContain("TERMS & CONDITIONS");
	// 	});
	// 	it('Closed Term Page',function()
	// 	{
	//  		browser.wait(EC.visibilityOf(closeButton),3000);
	// 		closeButton.click();
	// 	});
	// });

	describe("Check Facebook is disabled", function()
	{
		var str =['name','email','password']

		for( i = 0; i < 3; ++ i)
		{
	        (function(index) {
	        	describe("Input: "+ str[index],function()
				{
	        		it('Enter A key on : ' + str[index],function()
					{
						if(index=== 0)
							account.enterName('jason');
						else if (index === 1)
							account.enterEmail('d');
						else if (index === 2)
							account.enterPassword('test');
					});

					it('Check Facebook is hidden',function()
					{
						account.checkFacebookIsDisplayed(false);
					});

					it('Clear word',function()
					{
						if(index=== 0)
							account.clearName();
						else if (index === 1)
							account.clearEmail();
						else if (index === 2)
							account.clearPassword();
					});

					it('Check Facebook is back and showed',function()
					{
						account.checkFacebookIsDisplayed(true);
					});
				});
	        })(i);
	    }
	});

	
	// Facebook Doesn't work on MObile
	// describe("Log in Facebook",function()
	// {
	// 	it("Connect to Facebook",function()
	// 	{
	// 		doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");

	// 	});
	// 	it("Loading Status",function()
	// 	{
	// 		doc.checkMsg("Login Successful!");
	// 	});
	// 	it("Log in Status & and Log Out",function()
	// 	{
	// 		// doc.pickSideMenu(5,"Logout");
	// 		doc.checkItemDisplay("Logout",true,'click');

	// 		browser.wait(EC.alertIsPresent(), 8000);
	// 		 var alertDialog = browser.switchTo().alert();
	// 		 alertDialog.accept();  // Use to accept (simulate clicking ok)
	// 	});
	// 	it ("Log out Successful",function(){
	// 		doc.checkMsg("You have been successfully logged out!");
	// 	});
	// 	it("open the side menu",function()
	// 	{
	//         browser.wait(EC.visibilityOf(sideMenuButton),8000);
	// 		sideMenuButton.click();
	//         browser.wait(EC.visibilityOf(sideMenuList),8000);
	//         expect(sideMenuList.isDisplayed()).toBe(true);
	// 	});
	// 	it("Active Sign-up",function()
	// 	{
	// 		doc.checkItemDisplay("Signup",true,'click');
	// 		expect(element(by.id('account')).isDisplayed()).toBe(true);
	// 	});
		
	// });		

	// describe("Log in with Email",function()
	// {
	// 	it("Switch to Login mode",function()
	// 	{
	// 	    doc.socialButton(3,"Or Login");
	// 	});
	// 	it("Enter Email & Password",function()
	// 	{
	// 		// doc.setInput('jason@sjsu.edu',1);
	// 		// doc.setInput('test',2);
	// 		doc.setInput('jason@sjsu.edu',0,"signupForm.email",true);
	// 		doc.setInput('test',0,"signupForm.password",true);

	// 	});
	// 	it("Log in",function()
	// 	{
	// 		 doc.socialButton(0,"Login");
	// 		 doc.checkMsg("Login Successful!");
	// 	});

	// 	it("open the side menu",function()
	// 	{
	//         browser.wait(EC.visibilityOf(sideMenuButton),3000);
	// 		sideMenuButton.click();
	//         browser.wait(EC.visibilityOf(sideMenuList),3000);
	//         expect(sideMenuList.isDisplayed()).toBe(true);
	// 	});

	// 	it("Log off",function () {
	// 	 	// doc.pickSideMenu(4,"Logout");
	// 		doc.checkItemDisplay("LOGOUT",true,'click');
	// 	 	browser.sleep(100);
	// 	 	var alertDialog = browser.switchTo().alert();
	// 		alertDialog.accept();  // Use to accept (simulate clicking ok)
	// 	});
	// 	it ("Log out Successful",function(){
	// 		doc.checkMsg("You have been successfully logged out!");
	// 	});

		
	// 	it("Active Sign-up",function()
	// 	{
	// 		// doc.pickSideMenu(4,"Signup");
	// 		doc.checkItemDisplay("Signup",true,'click');

	// 		expect(element(by.id('account')).isDisplayed()).toBe(true);
	// 	});

	// });
	describe("SIgn up with Email",function()
	{
		it('Enter Name : ',function()
		{
			account.enterName('jason');
		});

		it('Enter Email : ',function()
		{
			account.enterEmail();
		});

		it('Enter Password : ',function()
		{
			account.enterPassword('test');
		});

		it('Create account',function()
		{
		    account.CreateAccount();
		});
		it('check Sign up successful',function()
		{
			account.CheckAccountMessage("Account Successfully Created");
		})

	});
	
	describe('close tab 1 ',function()
	{
		it('SideBar closed',function()
		{
			var settingsLink = element.all(by.css('ion-view'));
			settingsLink.then(function(items)
			{
				browser.wait(EC.elementToBeClickable(items[1]), 5000); //wait for the element to become clickable
				items[1].click();
			})
			
		});
		browser.sleep(100000)
	});
	
	

	
});