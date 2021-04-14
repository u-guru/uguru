// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');
// var Major = require('../becomeGuru/majorPageObject.js');
// var Course = require('../becomeGuru/coursePageObject.js');

// var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Sidemenu test',function()
{
	// var university = new University();
 //    var access  = new Access();
	// var major = new Major();
	// var home = new Home();

	afterAll(function()
	{
   		doc.ResetAll();
	});
    describe('@Workflow : access page', function () {

		 it('Send key : cool',function()
          {
                access.EnterAccessCode('cool');
          });

          it('Press enter',function()
          {
                access.RedeemClick();
          });

          it('Check page changed & check message show : Access Granted',function()
          {
              access.CheckMessage('cool');
          });
    });

    describe('@Workflow : University page', function () {
     	//browser.driver.get("http://localhost:8100/#/university");

    	it("choose a university",function()
    	{
    		// doc.newPickList('school-list');
    		university.SelectSchool(0);
    	});
 
    	
    });

	describe('@Workflow : Home page', function () {

		describe('Welcome uguru logo pop',function()
		{
			it('Check welcome logo pop up ',function()
			{
				home.CheckPopUpIsShown()
			});

			it('Close welcome logo',function()
			{
				home.CloseThePopUp();
			});	
		});

	});

	describe('@Workflow : Open sidemenu and Close',function()
	{

	
		it('Open Side',function()
		{
			sidebar.ToggleSideMenu('on');
		});
		it('wait side',function()
		{
			browser.sleep(4000)
		});	
		it('Close Side',function()
		{
			// sidebar.ToggleSideMenu('on');
			// browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
			browser.executeScript("arguments[0].click();", element(by.css('.view-container')).getWebElement());

		});	
		it('Close Side',function()
		{
			browser.executeScript("arguments[0].click();", element(by.tagName('ion-side-menu-content')).getWebElement());
		});	
		
		it('Close Side',function()
		{
			browser.executeScript("arguments[0].click();", element(by.id('side-menu-left-overlay')).getWebElement());
			element(by.id('side-menu-left-overlay')).click();
		});	
		it('Close Side',function()
		{
			element.all(by.css('[ng-click="toggleRightSideMenu()"]')).last().click();

		});	
		it('wait side',function()
		{
			element(by.css('.view-container')).getLocation().then(function(value)
			{
				console.log(value);
			});
			browser.sleep(4000)
		});	
	});
});
