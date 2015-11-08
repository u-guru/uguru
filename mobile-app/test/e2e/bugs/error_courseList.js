// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');
// var Major = require('../becomeGuru/majorPageObject.js');
// var Course = require('../becomeGuru/coursePageObject.js');
// var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Course Data',function()
{
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

	describe('@Workflow : Major page', function () {

		describe('BecomeGuru',function()
		{
			it ('Start becomeGuru process',function()
			{
				major.BeginBecomeGuru();
			});
		});

		describe('Check Data & Go Next Section',function()
		{
			it('Next slide',function()
			{
				major.GoToCoursePage();
			});
		});
	});
	describe('No data is shown in course page',function()
	{
		it("Check course list is preload and show",function()
		{
			course.CheckCourseListNotEmpty();
		});
	});
});
