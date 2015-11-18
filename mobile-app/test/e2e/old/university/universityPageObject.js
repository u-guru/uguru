'use strict';
var University = function() {

    //Elements
    this.InputModel = "search_text.university";
    this.SchoolList = element.all(by.css('#school-list li:not(.ng-hide)'));
    this.AccessInput = element(by.id("access-code-bar"));
    this.RedeemButton = element(by.id("access-start"));
    this.BackButton = element(by.css('[ng-click="goToAccess()"]'));
    this.GPSButton = element(by.css('[ng-click="toggleLocationIconAppearance()"]'));
    this.GPSIcon = element(by.css('.icon.ion-navigate'));
    this.OutputOfMillage = element.all(by.css('.school-distance.txt-lake'));


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

    this.CheckSchoolContainNameByOrder = function(name,index) {
       doc.checkLists("school-list","university.name",name,index)
    };

    this.SelectSchool =function(specificIndex)
    {
      
      if (specificIndex == null)
        doc.newPickList('#school-list')
      else
        doc.newPickList('#school-list',specificIndex)

    };
    this.checkRepeatingData = function()
    {
      doc.checkLists("school-list","university.name");
    };
    this.ScrollSchoolList = function(index) {
       this.SchoolList.then(function (items) {
          browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
      });
    };
    this.SchoolSearchName = function(schoolName)
    {
        doc.setInput(schoolName,0,this.InputModel);
    };

    this.SchoolSearchIsEmpty = function()
    {
        doc.setInput('',0,this.InputModel);
    };

    this.SchoolReturnAccess = function()
    {
        this.BackButton.click();
    };

    this.toggleGPS = function()
    {
         browser.wait(EC.visibilityOf(this.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
         // browser.getCapabilities().then(function (caps) {
         //      var platformName = caps.caps_.platformName;
         //      expect(platformName).toBe('android');
         //      if(platformName != 'android')
         //      {
         //        browser.wait(EC.visibilityOf(this.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
         //        this.GPSButton.click();
         //      }   
         //  });
         this.GPSButton.click();
         doc.waitLoading();

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
    this.checkMileage = function(toggle,start)
    {
      if(toggle === 0)
      {
        // browser.wait(EC.visibilityOf(this.OutputOfMillage.first()),3000).then(
        //   function()
        //   {
        //     element.all(by.css('#school-list li:not(.ng-hide)')).then(function(items){
        //         if (start === null)
        //           for(var i = 0 ; i < items.length; i++)
        //             expect(items[i].element(by.css('.school-distance.txt-lake')).isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
        //         else
        //           for(var i = 0 ; i < start; i++)
        //             expect(items[i].element(by.css('.school-distance.txt-lake')).isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
                
        //     });
        //   }, function(){
        //       //code to want to execute on failure.
        //       // console.log("failure");
        //         doc.checkMsg("Unable to Find the Location at #"+start +", did you enable share Location");
        //   });
          // element.all(by.css('#school-list li:not(.ng-hide)')).then(function(items){
          //       if (start === null)
          //         for(var i = 0 ; i < items.length; i++)
          //           expect(items[i].element(by.css('.school-distance.txt-lake')).isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
          //       else
          //         for(var i = 0 ; i < start; i++)
          //           expect(items[i].element(by.css('.school-distance.txt-lake')).isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
                
          //   });
          browser.wait(EC.visibilityOf(this.OutputOfMillage.last()),3000);
          this.OutputOfMillage.then(function(items)
          {
              if (start === null)
                for(var i = 0 ; i < items.length; i++)
                  expect(items[i].isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
              else
                for(var i = 0 ; i < start; i++)
                  expect(items[i].isPresent()).toBe(true,"No Miles Is Showing at index : " + i);
          })
        
      }
        else
        {
          browser.wait(EC.invisibilityOf(this.OutputOfMillage.first()),3000,"Miles Should Be Hidden");
        }
    };

    this.checkMileageInOrder = function()
    {
      var universityMile = element.all(by.binding('university.miles'));

          // expect(this.OutputOfMillage.get(i).getText()).toBe("Hi");
        //   var ele1Text = universityMile.get(i).getText() ;
          // var ele2Text = this.OutputOfMillage.get(i+1).getText();
          expect(universityMile.count() > 1).toBe(true,"Miles doesn't sort by order ,Counts university Mile: ", universityMile.count());

          // expect(ele1Text > ele2Text ).toBe(true);
    };
    this.checkCurrentMileage = function(toggle,index)
    {
        if(index===0)
          this.OutputOfMillage.then(function(items)
          {
              // browser.wait(EC.visibilityOf(element.all(by.binding('university.miles | number')).first()),3000,"Miles is not Shown");
              expect(items[index].isDisplayed()).toBe(true,"Miles is not Shown");
          });
        else
              expect(this.OutputOfMillage.isPresent()).toBe(False,"Miles is not Hidden");

    };
    this.isDefaultSchools = function()
    {
        this.SchoolList.then(function (items) {
            expect(items[0].getText()).toContain('Princeton University',"The 1st Default School Should list Princeton University");
            expect(items[1].getText()).toContain('Columbia University',"The 2st Default School Should list Columbia University");
            expect(items[2].getText()).toContain('Stanford University',"The 3st Default School Should list Stanford University");
          });
    };
};
module.exports = new University();