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

		for (var i = 0 ; i< 8 ; ++i)
		{
	        (function(index) {
		        describe('Click the category #'+index,function()
		        {
		        	it('Check category title back To DeFault Name',function()
		        	{
		        		category.CheckTitleIsMatch("SELECT CATEGORY")
		        	});
	        		it('Open a Category',function()
					{
						category.SelectSkill(index);
					});
	        		
					it('Check element exist',function()
					{
						category.SkillIsExist();
					});
					it('click all the skills ',function()
					{
				       count =  category.EnableAllSKills(index);
				        // ++count;
					});

	        		it('close a Category',function()
	        		{
						category.clickCanvas (100,50)
	        		})
	        		// check which index
	        		it('check select',function()
	        		{
				     // element.all(by.css(str)).then(function (items) {
				     	category.CountSelectSKill(count,index);
	        		});
				});
	        })(i);
		}


});
