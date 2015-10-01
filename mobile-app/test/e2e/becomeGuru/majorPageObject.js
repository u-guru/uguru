'use strict';
var Major = function()
{
	 this.InputModel= "search_text";
	 this.guruButton = element(by.css('[ng-click="goToBecomeGuru()"]'));
	 this.homePopUp = element(by.id('home-uguru-popup'));
	 this.CloseButtonOfPopUp = element.all(by.css('[ng-click="closeWelcomePopup()"]')).first();
	 this.MajorTitle = element(by.css('#major .third.flex-center-wrap'));
	 this.MajorList  = element.all(by.css('#major-list li:not(.ng-hide)'));
	 this.CheckMarkMajor = element.all(by.repeater('major in user.majors'));
	 this.backStep = element(by.css('[ng-click="goBackToStudentHome()"]'));


	 var nextStep = element(by.css('[ng-click="nextSlide()"]'));
	 //var backStep = element(by.css('[ng-click="goBackToStudentHome()"]'));
	 var ele = element.all(by.tagName("ion-slide"));

	 this.CheckPopUpIsShown = function()
	 {
		browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
	 };
	 this.CloseThePopUp = function ()
	 {
	 	this.CloseButtonOfPopUp.click();
	 };
	 this.BeginBecomeGuru = function ()
	 {
	 	this.guruButton.click();
	 };

	 this.CheckTitleIsCorrect = function()
	 {
	 	expect(this.MajorTitle.getText()).toContain("SELECT YOUR MAJOR")
	 };

     this.CheckRepeatingData = function()
     {
     	doc.checkLists('major-list','major.name');
     };

     this.ScrollMajorListTo = function(index)
     {
		this.MajorList.then(function (items) {
    		browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
    	});
     };

     this.CheckMoreMajorIsLoad =function(CompareIndex)
     {
		this.MajorList.then(function (items) {
			expect(items.length >CompareIndex).toBe(true,"no data is loading in #major-list");
		});
     };

     this.CheckMajorListBackToDefault = function()
     {
		this.MajorList.then(function (items) {
			expect(items.length >= 10).toBe(true,"Major-List is not showing correct, Total items in the Major-list : ",items.length);
		});
     };
     	  	
	this.CheckMajorListNotEmpty =function()
	{
		this.MajorList.then(function (items) {
			expect(items.length).not.toBe(0,"Empty [#major-list]");
		});
	};
	 this.CheckMajorListLength =function(length)
	 {
		this.MajorList.then(function (items) {
	    		expect(items.length).toBe(length,"Total List should show only "+length+" results");
	    	});
	 };

	 this.SelectMajorHasRightName = function(total,index,name)
	 {
 		this.CheckMarkMajor.then(function (items) {
 	        expect(items.length).toBe(total);
 			expect(items[index].getText()).toContain(name);
 			expect(items[index].element(by.css('.icon.ion-checkmark-round')).isDisplayed()).toBe(true);			     	
 	    });	
	 };

 	 this.SelectMajorIsNotPresent = function(total,index)
 	 {
  	    expect(this.CheckMarkMajor.first().isPresent()).toBe(false,"Selected-List[ {{user.majors}} ] doesn't clear out")
 	 };



	 this.CancelBecomeGuruProcess = function()
	 {
		backStep.click();
	 };

	 this.GoToCoursePage = function()
	 {
	 	nextStep.click();
	 };
	 this.CheckMajorContainNameByOrder = function(name,index) {
	    doc.checkLists("major-list","major.name",name,index)
	 };


	 this.SelectMajor = function(index)
	 {
	 	doc.newPickList('major-list',index);
	 }


     this.SearchMajorName = function(name)
     {
     	doc.setInput(name,0,this.InputModel);
     };
     this.IsMajorSearchBarEmpty = function()
     {
     	doc.setInput("",0,this.InputModel);
     };
     this.ClearSearchBar = function()
     {
     	doc.setInput("",0,this.InputModel,true);
     };



}
module.exports = Major;