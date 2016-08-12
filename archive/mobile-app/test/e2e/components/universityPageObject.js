'use strict';
var University = function() {
  
  // this.InputModel = "search_text.university";
  this.InputModel = $('[ng-model="search_text.university"]')
	this.BackPrevious = $('.header-nav-back');
	this.Title = $$('#school .third.flex-center h1').get(0);
	this.ClearIcon = $('[ng-click="resetUniversities()"]')
	this.SchoolList = $$('#school-list li')
  this.GPSButton = $('[ng-click="toggleLocationIconAppearance()"]');
  this.OutputOfMillage = $$(by.css('.school-distance.txt-lake.ng-binding'));

  //GPS
  this.toggleGPS = function()
  {
       browser.wait(EC.visibilityOf(this.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
       this.GPSButton.click();
  };
  this.checkGPSColor = function(toggle)
  {
      this.GPSIcon.getAttribute('style').then(function(results)
      {
        if(toggle === "off")
          expect(results).toBe("color: white;","Color(icon ion-navigate) doesn't changed to default[White]")
        else if (toggle === "on")
          expect(results).toContain("(70, 255, 0)","Color(icon ion-navigate) doesn't changed to [Green]")
      })
  };
  this.checkCurrentMileage = function(toggle,index)
  {
      if(index===0)
        this.OutputOfMillage.then(function(items)
        {
            expect(items[index].isDisplayed()).toBe(true,"Miles is not Shown");
        });
      else
        expect(this.OutputOfMillage.isPresent()).toBe(false,"Miles is not Hidden");

  };
  this.checkPage = function()
  {
    browser.wait(EC.visibilityOf(this.Title),3000,"Can't find the page");
  }

	this.ReturnPrevious = function()
	{
		browser.sleep(500);
		this.BackPrevious.click();

	}
	this.clearButton = function()
	{
		this.ClearIcon.click();
	}

	this.checkTitle = function()
	{
    browser.sleep(500);
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

  this.didListViewReturnToDefaultView = function() 
  {
    it('Check school list is not empty and has default university list',function()
    {
        university.ChekSchoolListIsPresent();
        university.isDefaultSchools();
    });
  }

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