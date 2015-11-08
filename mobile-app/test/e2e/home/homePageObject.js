'use strict';
var Home = function()
{

	this.homePopup= element(by.id('home-uguru-popup'));
	// this.guruButton = element(by.css('[ng-click="goToBecomeGuru()"]'));
	this.guruButton = element(by.css('.home-button.bg-campus-80p'))
	// this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first();
	this.CloseButtonOfPopUp = element.all(by.css('.bg-cerise.white-text.semibold')).first();



	 this.CheckPopUpIsShown = function()
	 {
		browser.wait(EC.visibilityOf(this.homePopup),3000);
	 };
	 this.CloseThePopUp = function ()
	 {
	 	this.CloseButtonOfPopUp.click();
	 };
	 this.BeginBecomeGuru = function ()
	 {
	 	this.guruButton.click();
	 };
	 this.CheckBecomeGuruIsNotPresent = function()
	 {
	 	expect(this.guruButton.isPresent()).toBe(false,"BecomeGuru Button is still present")
	 };
}
module.exports = new Home();
