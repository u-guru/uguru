'use strict';
var Home = function() {
	this.AddCourse = $('.home-button.bg-azure-80p');
	this.AddCourseFromTop = $('.add-icon.center-y');
	this.homePopup= element(by.id('home-uguru-popup'));
	this.CloseButtonOfPopUp = element.all(by.css('.bg-cerise.white-text.semibold')).first();
	this.avgGPA = $('.text-center.txt-azure.weight-700.overall-gpa.ng-binding');
	this.setting = $('#settings-button');
	this.sibeBar = $('[ng-click="toggleRightSideMenu()"]');
	this.sidbarList = $$('.list ion-item');
	this.CloseModal = $('.modal-backdrop.active .header-down');
	this.UniversityTitle = $('.list .text-center.ng-binding');
	this.DefaultUnit = $('#units');
	this.DefaultSection = $('#Section');
	this.closeWrapper ;
	this.SubmitPop ; 
	this.SemesterList ;


	this.checkListSemester = function(count)
	{
		expect(this.SemesterList.count()).toBe(count,"List is not updated");
	};
	this.closePopup = function()
	{
		this.closeWrapper.click();
	};
	this.SubmitPopup = function()
	{
		this.SubmitPop().click();
	};
	this.EnterPopValue = function(value)
	{

	};
	this.toogleSetting = function(check)
	{
		if(check === 'on')
			this.setting.click();
		else
			this.sibeBar.click();
	};
	this.ActiveGPA = function()
	{
		this.AddCourse.click();
	};
	this.ActiveNewGPA = function()
	{
		this.AddCourseFromTop.click();
	};
	this.CheckAVG = function(value)
	{
		expect(this.avgGPA.getText()).toBe(value,"Incorrect GPA");
	};
	 this.CheckPopUpIsShown = function()
	 {
		browser.wait(EC.visibilityOf(this.homePopup),3000);
	 };
	 this.CloseThePopUp = function ()
	 {
	 	this.CloseButtonOfPopUp.click();
	 };
	 this.CloseTheModal = function()
	 {
	 	this.CloseModal.click();
	 };
	 this.BeginBecomeGuru = function ()
	 {
	 	this.guruButton.click();
	 };
	 this.CheckBecomeGuruIsNotPresent = function()
	 {
	 	expect(this.guruButton.isPresent()).toBe(false,"BecomeGuru Button is still present");
	 };
	 this.CheckTitle = function()
	 {
	 	expect(this.UniversityTitle.getText()).not.toContain("STANFORD");
	 };
	 this.OpenSibarItem =function(name)
	 {
	 	this.sidbarList.filter(function(elem, index) {
	 	  return elem.getText().then(function(text) {
	 	    return text === name;
	 	  });
	 	}).then(function(filteredElements) {
	 	  filteredElements[0].click();
	 	});
	 };
};
module.exports = new Home();