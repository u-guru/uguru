'use strict';
var Sidebar = function() {

	//
	this.sideMenuButton= element(by.css('#settings-button'));
	this.sideMenuList = element(by.css('.side-menu-list.with-icon'))
	this.UguruPopup = element(by.id('home-uguru-popup'))
	this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first()
	this.CloseSideMenu = element.all(by.css('[ng-click="toggleRightSideMenu()"]')).last();
	this.ActionSheetOptions = element.all(by.repeater('b in buttons'));
	this.textarea = element(by.tagName('textarea'));
	this.emoIcon = element(by.css(".intercom-composer-emoji-button"));
	this.emoList = element(by.css('.intercom-emoji-selector-panel-small'));
	this.SupportMsg = element(by.css('.intercom-comment-body.intercom-embed-body'));
	//Wrapper
	this.EditPasswordWrapper =  element(by.id('edit-password-uguru-popup'));
	//Modal
	this.Modal = element(by.css('.modal-backdrop.active'));
	// this.CloseModalButton = element.all(by.css('.modal-backdrop.active .header-nav'));
	// this.CloseModalButton = element.all(by.css('[ng-click="toggleRightSideMenu()"]')).last();
	this.CloseModalButton = element(by.css('.modal-backdrop.active .header-down'));
	this.FAQitem = element.all(by.css('#faq dl'))
	//Support
	this.SubmitButton  = element(by.css('#intercom-composer'));
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

	 this.OpenLogoutModal = function()
	 {
	 	doc.checkItemDisplay("LOGOUT",true,'click');
	 };
	 
	 this.OpenSettingAction = function()
	 {
	 	doc.checkItemDisplay("SETTINGS",true,'click');
	 };

	 this.OpenAccountInformation = function()
	 {
	 	this.ActionSheetOptions.then(function(items)
	 	{
	 		// browser.wait(EC.elementToBeClickable(items[2]),5000);
	 		items[2].click();
	 	});
	 };

	 this.OpenEditPassword = function()
	 {
	 	// doc.waitLoading();
	 	this.ActionSheetOptions.then(function(items)
	 	{
	 		// browser.wait(EC.elementToBeClickable(items[2]),5000)
	 		items[2].click();
	 	});
	 };
	 
	 this.checkEditPasswordPop = function()
	 {
	 	browser.wait(EC.visibilityOf(this.EditPasswordWrapper),3000,"Password Wrapper no showing up");
	 	expect(this.EditPasswordWrapper.isDisplayed()).toBe(true);
	 };

	 this.OpenFAQModal = function()
	 {
	 	doc.checkItemDisplay("FAQ",true,'click');

	 };

	 this.OpenTermModal = function()
	 {

	 };

	 this.OpenSupportModal = function()
	 {
	 	doc.checkItemDisplay("SUPPORT",true,'click');
	 };	

	 this.keyinTextArea = function(inputs)
	 {
	 	this.textarea.sendKeys(inputs);
	 };
	 this.OpenEmoIcon = function()
	 {
	 	this.emoIcon.click();
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

 	this.ScrollFAQListTo =function(index)
     	{
     		expect(this.FAQitem.count()).toBe(10);
     		this.FAQitem.then(function (items) {
    			browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
     		});
     	};
	
}
module.exports = new Sidebar();