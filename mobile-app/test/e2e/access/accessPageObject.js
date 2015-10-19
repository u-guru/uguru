'use strict';
var Access = function()
{
	 this.InputModel = "access.codeInput";
	 this.accessInput = element(by.tagName("input"));
	 this.RedeemButton = element(by.id("access-start"));
	 this.load= element(by.id('E2E-spinner'))
	 this.back = element(by.css('[ng-click="goToAccess()"]'))
	 this.listOfCase =  doc.generateRandomString(["","1"],5,"cool")
	 this.chekAccessIsEmpty = function()
	 {
	 	doc.setInput("",0,this.InputModel);
	 };
	 this.EnterAccessCode = function(code)
	 {
	 	doc.setInput(code,0,this.InputModel,false);
	 };

	 this.KeyBoardEnter = function()
	 {
	 	element(by.model(this.InputModel)).sendKeys(protractor.Key.ENTER);
	 };

	 this.RedeemClick = function()
	 {
		this.RedeemButton.click();	
	 };

	 this.CheckMessage = function(isPass)
	 {
	 	// doc.waitLoading();
	 	if(isPass == 'cool')
	 	{
	 		doc.checkMsg("Access Granted");
	 	}
	 	else
	 	{	
	 		browser.wait(EC.visibilityOf(startButton.element(by.tagName("p"))),800);
	 		startButton.element(by.tagName("p")).getText().then(function(value)
	 		{
	 			expect(value).toBe("Incorrect access code");
	 		});	
	 	}
	 	
	 };


}
module.exports = new Access();