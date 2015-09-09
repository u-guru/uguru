describe('Sign-up test', function () {
	var sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	var sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	it("go to the new-home page",function()
	{
        browser.driver.get("http://localhost:8100/remote/#/new-home");
 		expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/remote/#/new-home");
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
	// describe("Check Facebook is disabled", function()
	// {
	// 	var str =['Name','Email','Password']

	// 	for( i = 0; i < 3; ++ i)
	// 	{
	//         (function(index) {
	//         	describe("Input: "+ str[index],function()
	// 			{
	//         		it('Enter A key on : ' + str[index],function()
	// 				{
	// 					doc.setInput('d',index);
	// 				});

	// 				it('Check Facebook is hidden',function()
	// 				{
	// 					expect(element(by.css('[ng-click="connectWithFacebook()"]')).isDisplayed()).toBe(false);
	// 				});
	// 				it('Clear Word',function()
	// 				{
	// 					doc.emptyInput(index);
	// 				});
	// 				it('Check Facebook is back and showed',function()
	// 				{
	// 					expect(element(by.css('[ng-click="connectWithFacebook()"]')).isDisplayed()).toBe(true);
	// 				});
	// 			});
	//         })(i);
	//     }
	// });

	

	describe("Log in Facebook",function()
	{
		it("Connect to Facebook",function()
		{
			doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
		});
		it("Loading Status",function()
		{
			doc.checkMsg("Login Successful!");
		});
		it("Log in Status & and Log Out",function()
		{
			doc.pickSideMenu(5,"Logout");
			browser.wait(EC.alertIsPresent(), 4000);
			 var alertDialog = browser.switchTo().alert();
			 alertDialog.accept();  // Use to accept (simulate clicking ok)
		});
		it ("Log out Successful",function(){
			doc.checkMsg("You have been successfully logged out!");
		});
		it("open the side menu",function()
		{
	        browser.wait(EC.visibilityOf(sideMenuButton),3000);
			sideMenuButton.click();
	        browser.wait(EC.visibilityOf(sideMenuList),3000);
	        expect(sideMenuList.isDisplayed()).toBe(true);
		});
		it("Active Sign-up",function()
		{
			doc.pickSideMenu(4,"Signup");
			expect(element(by.id('account')).isDisplayed()).toBe(true);
			browser.sleep(10000)
		});
		
	});		

	describe("Log in with Email",function()
	{
		it("Switch to Login mode",function()
		{
		    doc.socialButton(3,"Or Login");
		});
		it("Enter Email & Password",function()
		{
			doc.setInput('jason@sjsu.edu',1,true);
			doc.setInput('test',2,true);
		});
		it("Log in",function()
		{
			 doc.socialButton(0,"Login");
			 doc.checkMsg("Login Successful!");
		});
		it("Log off",function () {
		 	doc.pickSideMenu(4,"Logout");
		 	browser.sleep(100);
		 	var alertDialog = browser.switchTo().alert();
			alertDialog.accept();  // Use to accept (simulate clicking ok)
		});
		it ("Log out Successful",function(){
			doc.checkMsg("You have been successfully logged out!");
		});

		it("open the side menu",function()
		{
	        browser.wait(EC.visibilityOf(sideMenuButton),3000);
			sideMenuButton.click();
	        browser.wait(EC.visibilityOf(sideMenuList),3000);
	        expect(sideMenuList.isDisplayed()).toBe(true);
		});
		it("Active Sign-up",function()
		{
			doc.pickSideMenu(4,"Signup");
			expect(element(by.id('account')).isDisplayed()).toBe(true);
			browser.sleep(10000)
		});

	});
	describe("SIgn up with Email",function()
	{
		it("Active Sign-up",function()
		{
			doc.pickSideMenu(4,"Signup");
			expect(element(by.id('account')).isDisplayed()).toBe(true);
		});

		it('Enter Name : ' + str[index],function()
		{
			doc.setInput('jason',0);
		});
		it('Enter Email : ' + str[index],function()
		{
			doc.setInput(doc.generateRandomEmail(),1);
		});
		it('Enter Password : ' + str[index],function()
		{
			doc.setInput('test',2);
		});
		it('Create account',function()
		{
			element(by.css('[ng-click="completeSignup()"]'));
		});
		it('check Sign up successful',function()
		{
			doc.checkMsg("Account Successfully Created");
		})
	});
	
	

	
});