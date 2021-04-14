// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : University list',function()
{
	// var university = new University();
 //    var access  = new Access();
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
