'use strict';
var Sidebar = function() {
	this.sideMenuButton= element(by.css('.header-menu'));
	this.sideMenuList = element(by.css('.side-menu-list.with-icon'))
	this.UguruPopup = element(by.id('home-uguru-popup'))
	this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first()
	this.CloseSideMenu = element(by.css('[ng-click="toggleRightSideMenu()"]'));

	//Modal
	this.Modal = element(by.css('.modal-backdrop.active'));
	this.CloseModalButton = element.all(by.css('.modal-backdrop.active .header-nav'));


	 this.CheckPopUpIsShown = function()
	 {
		browser.wait(EC.visibilityOf(this.UguruPopup),3000);
	 };

	 this.CloseThePopUp = function ()
	 {
	 	this.CloseButtonOfPopUp.click();
	 };

	 this.ToggleSideMenu = function(toggle)
	 {
	 	if(toggle === 'on')
	 	{
		 	browser.wait(EC.elementToBeClickable(this.sideMenuButton),3000);
		 	this.sideMenuButton.click();
	 	}
		else if (toggle === 'off')
		{
			browser.wait(EC.elementToBeClickable(this.CloseSideMenu),3000);
			// doc.clickCanvas(this.CloseSideMenu,10,10);
			 this.CloseSideMenu.click();
		}
	 };
 	
 	 this.FindSideButton =function(name)
 	 { 
 	 	doc.checkItemDisplay(name,true);
     }; 
	
	 this.OpenUniversityModal = function()
	 {
	 	doc.checkItemDisplay("ADD UNIVERSITY",true,'click');
	 };
	 this.OpenSignUpModal = function()
	 {
	 	doc.checkItemDisplay("SIGN UP",true,'click');

	 }

	 this.OpenLoginModal = function()
	 {
	 	doc.checkItemDisplay("LOGIN",true,'click');
	 };

	 this.OpenFAQModal = function()
	 {

	 };

	 this.OpenTermModal = function()
	 {

	 };

	 this.OpenSupportModal = function()
	 {

	 };	

	 this.CloseModal = function()
	 {
	 	// expect(this.CloseModalButton.isPresent()).toBe(true,"No Close Can Found");
 		this.CloseModalButton.click();
	 };
	 

	 this.CheckModalTitle = function(name)
	 {
	 	expect(this.Modal.isPresent()).toBe(true,"No Modal Is Active");
	 	expect(element(by.css('.modal-backdrop.active')).getText()).toContain(name);
	 };
	
}
module.exports = Sidebar;