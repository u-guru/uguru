var Credibility = function()
{
	this.CredibilityTitle  = element.all(by.css('#credibility-content-wrapper h1'))
	this.CredibilityButtons = element.all(by.css('#credibility-content-wrapper button'));
	this.PopIcon = element(by.css('.uguru-popup.high-z-index.sidebar-popup.show'));
	this.PopCloseIcon = element(by.css('.uguru-popup.high-z-index.sidebar-popup.show .close-popup-link'));
	this.PopInput =   element(by.css('.uguru-popup.high-z-index.sidebar-popup.show input'));
	this.PopButton =  element(by.css('.uguru-popup.high-z-index.sidebar-popup.show button'));

	//Wrapper
	this.closePopUp = function()
	{
		this.PopCloseIcon.click();
	};

	this.checkPopNotPresent = function()
	{
		expect(this.PopIcon.isPresent()).toBe(false,"Pop is not closed");
	};

	this.CheckCredibilityUrl = function()
	{
		expect(browser.getCurrentUrl()).toContain("/#/guru-profile");
	}

	this.OpenCredibilityOptions = function(index)
	{
		// doc.newPickList('#credit-slider',index);
		lib.selectItem($$('#credit-slider li a'),index);

	};

	this.enterInfo = function(str)
	{
		// doc.openWrapper(str);
		this.PopInput.sendKeys(str);
	};
	this.confirm = function(str)
	{
		// doc.openWrapper(str);
		this.PopInput.sendKeys(str);
	};


	this.CheckCredibilityOptionTitle = function(title)
	{
		  this.CredibilityTitles.then(function (items) {
	   		  	expect(items[index].getText()).toContain(title);
   		  });
				   		  
	};

	this.CheckCredibilityOptiotButtonTitle = function(buttonName)
	{
	 	this.CredibilityButtons.then(function (items) {
   		  	expect(items[index].getText()).toContain(buttonName);
		 });

	};

	this.OpenOptionsButton = function(index)
	{
		this.CredibilityButtons.then(function (items) {
			// expect(items[index].getText()).toContain(buttonName);
			if (index != 0 )
				items[index].click();
		});
	}
};

module.exports = new Credibility();
