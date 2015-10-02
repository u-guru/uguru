'use strict';
var Home = function()
{

	this.homePopup= element(by.id('home-uguru-popup'));
	this.guruButton = element(by.css('[ng-click="goToBecomeGuru()"]'));
	this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first();


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
}
module.exports = Home;
