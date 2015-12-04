describe('Email Login test', function () {

	describe("Log in with Email",function()
	{
		// it("Switch to Login mode",function()
		// {
		//     doc.socialButton(3,"Or Login");
		// });

		it("Enter Email & Password",function()
		{
			// doc.setInput('jason@sjsu.edu',1);
			// doc.setInput('test',2);
			doc.setInput('jason@sjsu.edu',0,"signupForm.email",true);
			doc.setInput('test',0,"signupForm.password",true);

		});
		it("Log in",function()
		{
			 doc.socialButton(0,"Login");
			 doc.checkMsg("Login Successful!");
		});

		it("open the side menu",function()
		{
	        browser.wait(EC.visibilityOf(sideMenuButton),3000);
			sideMenuButton.click();
	        browser.wait(EC.visibilityOf(sideMenuList),3000);
	        expect(sideMenuList.isDisplayed()).toBe(true);
		});

		it("Log off",function () {
		 	// doc.pickSideMenu(4,"Logout");
			doc.checkItemDisplay("LOGOUT",true,'click');
		 	browser.sleep(100);
		 	var alertDialog = browser.switchTo().alert();
			alertDialog.accept();  // Use to accept (simulate clicking ok)
		});
		it ("Log out Successful",function(){
			doc.checkMsg("You have been successfully logged out!");
		});

		
		it("Active Sign-up",function()
		{
			// doc.pickSideMenu(4,"Signup");
			doc.checkItemDisplay("Signup",true,'click');

			expect(element(by.id('account')).isDisplayed()).toBe(true);
		});

	});
});