'use strict';
var Account = function()
{
	this.nameModel = "signupForm.full_name";
	this.emailModel = "signupForm.email";
	this.passwordModel = "signupForm.password";

	this.enterName = function(str)
	{
		doc.setInput(str,0,	this.nameModel,true);
	};

	this.enterEmail = function(str)
	{
		if(str != null)
			doc.setInput(str,0, this.emailModel,true);
		else
			doc.setInput(doc.generateRandomEmail(),0, this.emailModel,true);
	};

	this.enterPassword = function(str)
	{
		doc.setInput(str,0,	this.passwordModel,true);
	};

	this.CreateAccount = function()
	{
		doc.socialButton(1,"Create an Account");
	};

	this.LoginAccount = function()
	{
		doc.socialButton(0,"Login"); 	
	};
	this.CheckAccountMessage = function(str)
	{
		doc.checkMsg(str);
	};

}
module.exports = Account;