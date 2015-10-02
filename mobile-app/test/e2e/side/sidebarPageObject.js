'use strict';
var Sidebar = function() {
	this.sideMenuButton= element(by.css('.bg-charcoal'));
	this.sideMenuList = element(by.css('.side-menu-list.with-icon'))
	this.UguruPopup = element(by.id('home-uguru-popup'))
	this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first()

	 this.CheckPopUpIsShown = function()
	 {
		browser.wait(EC.visibilityOf(this.UguruPopup),3000);
	 };
	 this.CloseThePopUp = function ()
	 {
	 	this.CloseButtonOfPopUp.click();
	 };


	 
}
module.exports = Sidebar;