var Account = function()
{
	//Model
	this.nameModel = $('[ng-model="signupForm.full_name"]');
	this.emailModel = $('[ng-model="signupForm.email"]');
	this.passwordModel = $('[ng-model="signupForm.password"]');
	this.clearButtons = $$('.relative.full-x a');
	//Social 
	this.socialButtons = $$('#social-login button')


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
		// doc.setInput(str,0,	this.nameModel,true);
		lib.setInput(lthis.nameMode,str);

	};

	this.enterEmail = function(str)
	{
		if(str != null)
			// doc.setInput(str,0, this.emailModel,true);
			lib.setInput(this.emailModel,str);
		else
			// doc.setInput(doc.generateRandomEmail(),0, this.emailModel,true);
			lib.setInput(this.emailModel,lib.generateRandomEmail());
	};

	this.enterPassword = function(str)
	{
		//doc.setInput(str,0,	this.passwordModel,true);
		lib.setInput(this.passwordModel,str);
	};
	this.clearIcontActive = function(index)
	{
		expect(this.clearButtons.get(index).isDisplayed()).toBe(true);
		this.clearButtons.get(index).click();
	}
	this.clearName = function()
	{
		this.nameModel.clear()
	};

	this.clearEmail = function()
	{
		this.emailModel.clear()
	};

	this.clearPassword = function()
	{
		this.passwordModel.clear()
	};
	this.socialButton = function(str)
	{
     	this.socialButtons.filter(function(elem, index) {
		  return elem.getText().then(function(text) {
		    return text.toUpperCase() === name.toUpperCase();
		  });
		}).then(function(filteredElements) {
		  expect( filteredElements[0].getText()).toContain(value);
		});
	}

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
