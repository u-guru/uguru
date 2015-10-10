describe('#7 Error Test Flow : Search Course error',function()
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

    	it("Search : Berkeley",function()
    	{
    		university.SchoolSearchName('berkeley');
    	});
    	it("choose a university",function()
    	{
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
		// var major = new Major();

		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});

		it('Search : chem',function()
		{
			major.SearchMajorName('chinese');
		});

		it('Check Maojr list is filtered first item should show "CHINESE"',function()
		{
			major.CheckMajorContainNameByOrder('CHINESE',0);
		});

	});

});
