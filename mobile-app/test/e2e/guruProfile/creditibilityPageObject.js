var Credibility = function()
{
	this.CredibilityTitle  = element.all(by.css('#credibility-content-wrapper h1'))
	this.CredibilityButtons = element.all(by.css('#credibility-content-wrapper button'));

	this.CheckCredibilityUrl = function()
	{
		expect(browser.getCurrentUrl()).toContain("/#/guru-profile");
	}

	this.OpenCredibilityOptions = function(index)
	{
		doc.newPickList('#credit-slider',index);
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

	this.OpenOptionsButton = function()
	{
		this.CredibilityButtons.then(function (items) {
			expect(items[index].getText()).toContain(buttonName);
			if (index != 0 )
				items[index].click();
		});
	}
};

module.exports = new Credibility();
