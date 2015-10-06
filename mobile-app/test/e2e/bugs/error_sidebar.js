var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');
var Major = require('../becomeGuru/majorPageObject.js');
var Course = require('../becomeGuru/coursePageObject.js');

var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Edit mode is activated + No data from BecomeGuru is applied to the profile page',function()
{
	var university = new University();
    var access  = new Access();
	var major = new Major();
	var home = new Home();

	describe('@Workflow : access page', function () {
		// var accessInput = element(by.id("access-code-bar"));
		var accessInput = element(by.tagName("input"));
		var startButton = element(by.id("redeem-button"));
			beforeAll(function()
			{
	            // browser.get("http://localhost:8100/#/");
	            // browser.refresh();
	            browser.get("http://"+localhost+":8100/#/university");
			});
			it("Enter Access Code : cool ",function()
			{
				doc.setInput('cool',0,'access.codeInput');
			});

			it("Check Successed",function()
			{
				//browser.wait(EC.elementToBeClickable(startButton),5000);
				startButton.click();
				doc.checkMsg("Access Granted");
			});
	});

	describe('@Workflow : University page', function () {
	 	//browser.driver.get("http://localhost:8100/#/university");
		it("choose a university",function()
		{
		//	doc.pickList('university in initialUniversities');
			doc.newPickList('school-list')

		});
		it("check the current position",function()
		{
			expect(browser.getCurrentUrl()).toContain("/#/home");
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
