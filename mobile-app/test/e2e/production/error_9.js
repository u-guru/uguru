describe('#9 Error Test Flow : Search Course error',function()
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

		it('select a major',function()
		{
			major.SelectMajor(0);
		});

		it('Next slide',function()
		{
			major.GoToCoursePage();
		});

	});
	describe('Course Search test', function () {
		// var course = new Course();

		describe('Check Data & Go Next Section',function()
		{
			it('check courses list is not empty',function()
			{
				course.CheckCourseListNotEmpty();
			});
			it('Search : CS',function()
			{
				course.SearchCourseName('CS');
			});

			it('Check Course list is filtered first item should show "CS"',function()
			{
				course.CheckListCourseContain('CS');
			});
		});

	});

});
