// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');
// var Major = require('../becomeGuru/majorPageObject.js');
// var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Major Search + Major Icon Clear Test',function()
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

	describe("Search Major Test",function()
	{
		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});

		it('Send a key : C',function()
		{
	    	major.SearchMajorName('c');
		});
		
		it('Check the Search result is not empty',function()
		{
	    	major.CheckMajorListNotEmpty();
		});

		it('Test "Major Clear Icon" button work',function()
		{
			major.MajorInputClearIconClick();
		});
	
		it('Check the key is cleared',function()
		{
	    	// doc.setInput('',0,model);
	    	major.IsMajorSearchBarEmpty();
		});

		it('Send a key : cd',function()
		{
	    	major.SearchMajorName('cd');
		});

		it('clear the key',function()
		{
	    	// doc.setInput('',0,model);
			major.ClearSearchBar();
		});
		
		it('Check the Search result is not empty',function()
		{
	    	major.CheckMajorListNotEmpty();
		});

	});
});
