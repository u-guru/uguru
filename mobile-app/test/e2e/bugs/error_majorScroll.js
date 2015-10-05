var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');
var Major = require('../becomeGuru/majorPageObject.js');
var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Major Scroll',function()
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
			it('Close welcome logo',function()
			{
				home.CloseThePopUp();
			});	
		});

	});

	describe("Infinity scroll test for major-list",function()
	{
		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});

		for( i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Scroll down to #' + index+' Major',function()
		 		{
		 			major.ScrollMajorListTo(index);
				});
				it('Check more majors are load',function()
				{
					major.CheckMoreMajorIsLoad(index);
				});
				it ('Scroll back to top',function()
		 		{
		 			major.ScrollMajorListTo(0);
				});
	        })(i);
		}
	});
});
