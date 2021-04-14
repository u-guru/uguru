'use strict';
var Side = function() {
  this.setting = $('#settings-button');
  // this.sibeBar = $('[ng-click="toggleRightSideMenu()"]');
  this.sibeBar = $('#toggle-nick-menu');
  this.saveButton = $('#save-button')
  this.sidbarList = $$('nick-side-menu li div');
  this.sideMenu == $('.nick-active');
  this.UniversityTitle = $('.list .text-center.ng-binding');
  this.locationToggle = $('#location-toggle');
  //Action Sheet
  this.ActionSheet = $('.action-sheet-backdrop.active');
  this.ActionList = $$('.action-sheet button');
  //Pop Element 
  this.PopupElement= element(by.id('home-uguru-popup'));
  this.CloseButtonOfPopUp = $('.uguru-popup.high-z-index.sidebar-popup.show .close-popup-link');
  this.SubmitPopup =$('.uguru-popup.high-z-index.sidebar-popup.show .semibold.bg-cerise.white-text.submit');
  this.PopUp = $('.uguru-popup.high-z-index.sidebar-popup.show')
  this.popinputName = $('[ng-model="popupInput.editName"]'); 
  this.popinputEmail = $('[ng-model="popupInput.editEmail"]'); 
  this.popinputPassOld = $('[ng-model="popupInput.editPasswordOld"]'); 
  this.popinputPassNew = $('[ng-model="popupInput.editPasswordNew"]'); 
  this.popinput = $$('.uguru-popup.high-z-index.sidebar-popup.show input')
  //Modal Element
  // this.CloseModal = $('.modal-backdrop.active .header-down');
  this.CloseModal = $('.modal-backdrop.active .header-nav a');

  this.Modal = $('.modal-backdrop.active')
  //Pop
  this.setPopValue = function(name,value)
  {
    browser.wait(EC.visibilityOf(this.PopUp),5000);
    switch(name)
    {
      case 'name':
        this.popinputName.clear();
        this.popinputName.sendKeys(value);
        break;
      case 'email':
        this.popinputEmail.clear();
        this.popinputEmail.sendKeys(value);
        break;
      case 'new':
        this.popinputPassNew.sendKeys(value);
        break;
      case 'old':
        this.popinputPassOld.sendKeys(value);
        break;
    }
  };

   this.waitPopUpIsShown = function()
   {
      browser.wait(EC.visibilityOf(this.PopUp),5000);
   };
  this.SubmitPopup = function()
  {
    this.SubmitPop().click();
  };

  this.CheckPopUpIsShown = function()
  {
   browser.wait(EC.visibilityOf(this.PopupElement),3000);
  };

   this.ConfirmThePopUp = function ()
   {
    this.CloseButtonOfPopUp.click();
   };

   this.closePopup = function()
   {

     this.CloseButtonOfPopUp.click();
   };
   this.checkWelcomePopup = function()
   {
    describe('Check a Pop up is shown ',function()
    {
        it('Wait popup open',function()
        {
            this.waitPopUpIsShown();
        });

        it('Close Popup',function()
        {
            this.closePopup();
        }); 
       
    });
   };

  //Modal
   this.CloseTheModal = function()
   {
    this.CloseModal.click();
    browser.wait(EC.invisibilityOf(this.CloseModal),4000);
   };
   this.isModalActive = function()
   {
      browser.wait(EC.visibilityOf(this.Modal),4000);
   };

  
   //Side Open Closed
    this.sideMenuIsOff = function()
    {
      browser.wait(EC.stalenessOf(this.sideMenu),3000);
      expect(this.sideMenu.isPresent()).toBe(false);
    };
    this.ToggleSideMenu = function(check)
    {
      if(check === 'on')
        this.sibeBar  .click();
      else
        this.sibeBar.click();
    };

     this.CheckUniversityTitle = function(name)
     {
      expect(this.UniversityTitle.getText()).not.toContain(name.toUpperCase());
     };

     //check value
     this.CheckItemValue = function(name,value)
     {
        this.sidbarList.filter(function(elem, index) {
          return elem.getText().then(function(text) {
            return text === name;
          });
        }).then(function(filteredElements) {
          expect( filteredElements[0].getText()).toContain(value);
        });
     };

     this.OpenActionSheet = function(name)
     {
        browser.wait(EC.presenceOf(this.ActionSheet),5000);
        this.ActionList.filter(function(elem, index) {
          return elem.getText().then(function(text) {
            return text.toUpperCase() === name.toUpperCase();
          });
        }).then(function(filteredElements) {
          browser.wait(EC.elementToBeClickable(filteredElements[0]),4000);
          filteredElements[0].click();
        });
     }

     this.OpenSibarItem =function(name)
     {
        this.sidbarList.filter(function(elem, index) {
          return elem.getText().then(function(text) {
            return text.toUpperCase()=== name.toUpperCase();
          });
        }).then(function(filteredElements) {
          browser.wait(EC.elementToBeClickable(filteredElements[0]),4000);
          filteredElements[0].click();
        });
     };
};
module.exports = new Side();
