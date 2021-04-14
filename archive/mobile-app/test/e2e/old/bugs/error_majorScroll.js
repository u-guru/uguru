// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');
// var Major = require('../becomeGuru/majorPageObject.js');
// var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Major Scroll',function()
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

	describe("Infinity scroll test for major-list",function()
	{
		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});
		it('Check majors list has data',function()
		{
			major.CheckMoreMajorIsLoad();
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
