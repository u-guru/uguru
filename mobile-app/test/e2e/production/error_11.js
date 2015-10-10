describe('#11 Error Test Flow :  Category is not empty ',function()
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
	describe('@Workflow : Course page', function () {
		// var course = new Course();

		describe('Check Data & Go Next Section',function()
		{
			it('select a course',function()
			{
		 		course.SelectCourse(0);
			});

			it('Next page',function()
			{
				course.GoToNextPage();
			});
		});

	});

	describe('Category page check data not empty', function () {
		// var category = new Category();
		it('Check Skill Exist',function()
		{
			category.SkillIsExist();
		})
	});



});
