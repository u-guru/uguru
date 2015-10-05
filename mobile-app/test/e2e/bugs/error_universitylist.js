var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : University list',function()
{
	var university = new University();
    var access  = new Access();

	describe('@Workflow : access page', function () {
		// var accessInput = element(by.id("access-code-bar"));
		var accessInput = element(by.tagName("input"));
		var startButton = element(by.id("redeem-button"));
			beforeAll(function()
			{
	            // browser.get("http://localhost:8100/#/");
	           browser.refresh();
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

	describe('university search bar clear but no university list is not shown right', function () {
	 	//browser.driver.get("http://localhost:8100/#/university");
		
		it("Search : O",function()
			{
				university.SchoolSearchName("0");

			});

		it("School return to access",function()
		{
			university.SchoolReturnAccess();
		});

		it("Check input at access page is clear",function()
		{
			// need access pageobject
			// doc.setInput("",0,"access.codeInput");
			access.chekAccessIsEmpty();
		});

		it("Enter access code : cool ",function()
		{
			// need access pageobject
			access.EnterAccessCode('cool');

		});

		it("Check message is shown : Access Granted",function()
		{
			access.RedeemClick()
		   	access.CheckMessage('cool');
		});	

		it("Check university list is preload and show",function()
		{
			university.ChekSchoolListIsPresent();
		});

		it("Check university search bar is clear",function()
		{
			university.SchoolSearchIsEmpty();
		});
		it('Check mileage of school is shown',function()
		{
			university.checkMileage(0);
		});
	});
});
