// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');
// var Major = require('../becomeGuru/majorPageObject.js');
// var Course = require('../becomeGuru/coursePageObject.js');

// var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Edit mode is activated + No data from BecomeGuru is applied to the profile page',function()
{
	// var university = new University();
 //    var access  = new Access();
	// var major = new Major();
	// var home = new Home();

	beforeAll(function()
	{
        // browser.get("http://localhost:8100/#/");
browser.manage().deleteAllCookies();
         browser.refresh();
        // if(startButton.isPresent() === false)
            // browser.get("http://"+localhost+":8100/#/home");
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

			it('select a major',function()
			{
				major.SelectMajor(0);
			});

			it('Close welcome logo',function()
			{
				home.CloseThePopUp();
			});	
		});

	});

	describe('@Workflow : Open sidemenu and login',function()
	{
		var sideMenuButton= element(by.css('.bg-charcoal'));
		var names = ['FAQ','TERMS','SUPPORT','SIGN UP','LOGIN'];

		it("Check the side menu",function()
		{
	  		browser.wait(EC.elementToBeClickable(sideMenuButton),3000);
			sideMenuButton.click();
	        browser.wait(EC.visibilityOf(sideMenuList),3000);
	        expect(sideMenuList.isDisplayed()).toBe(true);
		});
	});
		describe("Check All buttons is clickalbe",function()
			{
				var close = element.all(by.css('.modal-backdrop.active .icon.ion-chevron-down')).last();
				// var names = ['FAQ','TERMS','SUPPORT','SIgn Up','LOGIN'];
				for (var i = 0 ;i < 5 ;++ i)
				{
			       (function(index,name) {
				       	describe(name,function(){})
				       	{
			    			it("Open "+ name+ " Section",function()
							{
			    				doc.checkItemDisplay(name,true,'click');
							});
			    			if (i < 2 )
				    			it('[Not Working] Cehc Page Can Scroll down',function()
				    			{
				    				doc.drag(element(by.css('.modal-backdrop.active ion-content')),0,200);
				    			})
							it('Check it popup with Right Page',function()
							{
								if(name ==="SIGN UP"||name ==="LOGIN")
									expect(element(by.css('.modal-backdrop.active')).getText()).toContain("JUST A FEW MORE DETAILS.");
								else
									expect(element(by.css('.modal-backdrop.active')).getText()).toContain(name);
							});
							it('Close '+name + ' Page',function()
							{
								if(name ==="SIGN UP"||name ==="LOGIN")
									element.all(by.css('.modal-backdrop.active .header-nav')).click();
								else
									close.click();
							});
				       	}
		    			
		    	    })(i,names[i]);
				}
			});
});
