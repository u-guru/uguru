'use strict';
var University = function() {
  
  // this.InputModel = "search_text.university";
  this.InputModel = $('[ng-model="search_text.university"]')
	this.BackDemo = $('.header-nav-back');
	this.Title = $('.third.flex-center h1');
	this.ClearIcon = $('[ng-click="resetUniversities()"]')
	this.SchoolList = $$('#school-list li')

	this.ReturnPrevious = function()
	{
		browser.sleep(500);
		this.BackDemo.click();

	}
	this.clearButton = function()
	{
		this.ClearIcon.click();
	}

	this.checkTitle = function()
	{
		expect(this.Title.getText()).toBe('FIND YOUR COMMUNITY')
	}
  this.SchoolSearchName = function(schoolName)
  {
      lib.setInput(this.InputModel,schoolName);
  };
 this.ChekSchoolListIsPresent = function() {
        this.SchoolList.then(function (items) {
            expect(items.length).not.toBe(0,"<#school-list li> Has No results");
        });
    };

    this.ChekSchoolListIsIncrease = function(CompareIndex) {
        this.SchoolList.then(function (items) {
            expect(items.length > CompareIndex).toBe(true,"No data is loading inside #school-list");
        });
    };

    this.ChekSchoolListLength = function(length) {
       this.SchoolList.then(function (items) {
          expect(items.length).toBe(length,"School-search result should only have "+length +" items");
        });
    };
  this.ScrollSchoolList = function(index) {
     this.SchoolList.then(function (items) {
        browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
    });
  };


  this.isDefaultSchools = function()
  {
      this.SchoolList.then(function (items) {
          expect(items[0].getText()).toContain('Princeton University',"The 1st Default School Should list Princeton University");
          expect(items[1].getText()).toContain('Columbia University',"The 2st Default School Should list Columbia University");
          expect(items[2].getText()).toContain('Stanford University',"The 3st Default School Should list Stanford University");
        });
  };
}
module.exports = new University();