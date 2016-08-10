'use strict';
var Photo = function()
{
	this.SamplePic = element(by.css('#photo-list li'));
	this.SampleMsg = element(by.css('#photo-list div'));
	this.ProfileIcon = element(by.id('profile-icon'));
	this.ActionSheetButtons = element.all(by.repeater('b in buttons'));
	this.FinishStep = element(by.css('[ng-click="goToGuruMode()"]'));

	this.UploadPhoto = function (size)
	{
	   doc.uploadPhoto('file-input-web',size);
	   doc.checkMsg("Awesome! You're all set");
	};

	this.NextPage =function()
	{
		browser.wait(EC.visibilityOf(this.FinishStep),4000);
		this.FinishStep.click();
		// browser.wait(EC.invisibilityOf(this.FinishStep),5000,"Doesn't go to next page")
	};
	this.CheckSamplePhotoExist =function()
	{
		expect(this.SamplePic.isPresent()).toBe(true);	
	};

	this.CheckSampleMessageExist =function()
	{
		expect(this.SampleMsg.isPresent()).toBe(true);
	};

	this.OpenActionSheet =function()
	{
		this.ProfileIcon.click();
	};
	this.TakePicture = function()
	{
		this.ActionSheetButtons.then(function(items)
		{
			items[0].click();
		});
	};
	this.WaitPhotoLoadSuccessful = function()
	{
		var msg = "Awesome! You're all set."
		// browser.wait(EC.visibilityOf(element(by.id('user-instant-photo'))),1000000)
		var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
		browser.wait(EC.presenceOf(newMsg),10000, "Can't Find Message : "+msg);
		newMsg.getAttribute('value').then(function(value)
		{
		  expect(value).toContain(msg);
		}); 
	};

}
module.exports = new Photo();