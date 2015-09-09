describe('Sign-up test', function () {
	var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	it("go to the new-home page",function()
	{
         browser.get("http://localhost:8100/#/new-home");
 		expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/new-home");
	});
	it("open the side menu",function()
	{
		sideMenuButton.click();
        browser.wait(EC.visibilityOf(sideMenuList),3000);
        expect(sideMenuList.isDisplayed()).toBe(true);
	});
	it("Active Sign-up",function()
	{
		doc.pickSideMenu(4,"Signup");
		expect(element(by.id('account')).isDisplayed()).toBe(true);
	});
	describe("Check Facebook is disabled", function()
	{
		var str =['Name','Email','Password']

		for( i = 0; i < 3; ++ i)
		{
	        (function(index) {
	        	describe("Input: "+ str[index],function()
				{
	        		it('Enter A key on : ' + str[index],function()
					{
						doc.setInput('d',index);
					});

					it('Check Facebook is hidden',function()
					{
						expect(element(by.css('[ng-click="connectWithFacebook()"]')).isDisplayed()).toBe(false);
					});
					it('Clear Word',function()
					{
						doc.emptyInput(index);
					});
					it('Check Facebook is back and showed',function()
					{
						expect(element(by.css('[ng-click="connectWithFacebook()"]')).isDisplayed()).toBe(true);
					});
				});
	        })(i);
	    }
	});
	describe("Log in with Email",function()
	{
		it("Switch to Login mode",function()
		{
			// doc.socialButton(4,"Or Create an Account");
			var Switch = element(by.css('[ng-click="loginMode()"]'));
			expect(Switch.isDisplayed()).toBe(true,"Can't find the button");
			Switch.click();
		});
		it("Enter Email & Password",function()
		{
			doc.setInput('jason@berkeley.edu',1);
			doc.setInput('test',2);
		});
		it("Log in",function()
		{
			// doc.socialButton(0,"Login");
			var login = element(by.css('[ng-click="loginUser()"]'));
			expect(login.isDisplayed()).toBe(true,"Can't find the button")
			login.click();
		});

	});
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
	// 		doc.pickSideMenu(5,"Logout");
	// 		 var alertDialog = browser.switchTo().alert();
	// 		 alertDialog.accept();  // Use to accept (simulate clicking ok)
	// 	});
	// 	it ("Log out Successful",function(){
	// 		doc.checkMsg("You have been successfully logged out!");
	// 		sideMenuButton.click();
	//         browser.wait(EC.visibilityOf(sideMenuList),3000);
	//         expect(sideMenuList.isDisplayed()).toBe(true);
	// 	});
	// });		
	// describe("SIgn up with Email",function()
	// {
	// 	it("Active Sign-up",function()
	// 	{
	// 		doc.pickSideMenu(4,"Signup");
	// 		expect(element(by.id('account')).isDisplayed()).toBe(true);
	// 	});

	// 	it('Enter Name : ' + str[index],function()
	// 	{
	// 		doc.setInput('jason',0);
	// 	});
	// 	it('Enter Email : ' + str[index],function()
	// 	{
	// 		doc.setInput(doc.generateRandomEmail(),1);
	// 	});
	// 	it('Enter Password : ' + str[index],function()
	// 	{
	// 		doc.setInput('test',2);
	// 	});
	// 	it('Create account',function()
	// 	{
	// 		element(by.css('[ng-click="completeSignup()"]'));
	// 	});
	// 	it('check Sign up successful',function()
	// 	{
	// 		doc.checkMsg("Account Successfully Created");
	// 	})
	// });

	
});