var Account = function()
{
	//Model
	this.nameModel = "signupForm.full_name";
	this.emailModel = "signupForm.email";
	this.passwordModel = "signupForm.password";

	//Element
	this.sideMenuButton= element(by.css('[ng-click="toggleRightSideMenu()"]'));
	this.sideMenuList = element(by.css('.side-menu-list.disable-user-behavior'))
	this.close = element.all(by.css('.header-nav-back')).first();
	this.closeButton = element.all(by.css('.modal-backdrop.active .header-down')).last();
	this.SignUpButtonGuru = element(by.id('btn-edit-profile'));
	this.SignUpPage = element(by.id('account'));
	this.TermButton = element(by.id('tos'));
	this.FacebookButton = element(by.css('[ng-click="connectWithFacebook()"]'));
	
	this.LaunchSignUpAtGuru = function()
	{
		browser.wait(EC.elementToBeClickable(this.SignUpButtonGuru),4000);
		this.SignUpButtonGuru.click();
	};

	this.CheckSignUpPageDisplayed = function()
	{
		expect(this.SignUpPage.isDisplayed()).toBe(true);
	};

	this.OpenTermPage = function()
	{
		this.TermButton.click();
	};

	this.checkFacebookIsDisplayed = function(bool)
	{
		expect(this.FacebookButton.isDisplayed()).toBe(bool);
	}

	this.enterName = function(str)
	{
		doc.setInput(str,0,	this.nameModel,true);
	};

	this.enterEmail = function(str)
	{
		if(str != null)
			doc.setInput(str,0, this.emailModel,true);
		else
			doc.setInput(doc.generateRandomEmail(),0, this.emailModel,true);
	};

	this.enterPassword = function(str)
	{
		doc.setInput(str,0,	this.passwordModel,true);
	};

	this.clearName = function()
	{
		doc.setInput('',0,this.nameModel,true);
	};

	this.clearEmail = function()
	{
		doc.setInput('',0, this.emailModel,true);
	};

	this.clearPassword = function()
	{
		doc.setInput('',0,	this.passwordModel,true);
	};


	this.CreateAccount = function()
	{
		doc.socialButton(1,"Create an Account");
	};

	this.LoginAccount = function()
	{
		doc.socialButton(0,"Login"); 	
	};

	this.SwitchLoginMode = function()
	{
		doc.socialButton(3,"Or Login"); 	
	};

	this.CheckAccountMessage = function(str)
	{
		doc.checkMsg(str);
	};

};
module.exports = new Account();
