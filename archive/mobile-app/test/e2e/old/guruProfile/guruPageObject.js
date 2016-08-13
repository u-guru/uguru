'use strict';
var Guru = function() {

	this.LaunchProfileButon = element(by.id('btn-edit-profile'));

	this.LaunchProfile = function()
	{
		expect(this.LaunchProfileButon().isDisplayed()).toBe(true);
		this.LaunchProfileButon.click();
	};
	
	this.CheckLaunchProfileButton = function(isPresent)
	{
		expect(this.LaunchProfileButon().isPresent()).toBe(isPresent);
	};

	this.CheckPageCorrect = function()
	{
		expect(browser.getCurrentUrl()).toContain("/#/guru");
	};


	this.switchBar = function(name)
	{
		if(name =='profile')
			this.OpenProfile();
		else if (name == 'credibility')
			this.OpenCredibility();
	};

	this.OpenHomePage = function()
	{
		doc.tabBar('guru-tab-bar',0);
	};

	this.OpenProfile = function()
	{
		doc.tabBar('guru-tab-bar-1',1);
	};

	this.OpenCredibility = function()
	{
		doc.tabBar('guru-tab-bar-2',2);
	};
	
	this.OpenSideMenu =  function()
	{
		doc.tabBar('guru-tab-bar',3);
	};


}
module.exports = new Guru();
