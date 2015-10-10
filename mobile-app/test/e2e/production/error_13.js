describe('[Incompleted]#13 Error Test Flow :Become Guru data is applied to new account after sign up',function()
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

	describe('@Workflow : category page', function () {
		// var category = new Category();
		it('Next page',function()
		{
			category.GoToPhotoPage();
		});

	});


	describe('@Workflow : photo test', function () {
		// var photo = new Photo();

		it('Waiting to received the message',function()
		{
			// photo.UploadPhoto('small');
			photo.NextPage();
		});
		// it('Upload Photo',function()
		// {
		// 	photo.UploadPhoto('small');
		// });
	});

	describe('@Workflow : Sign Up',function()
	{
		// var account = new Account();
		// var sidebar = new Sidebar();

		it('Launch Profile',function()
		{
			browser.wait(EC.elementToBeClickable(element(by.id('btn-edit-profile'))),4000);
	 		element(by.id('btn-edit-profile')).click();	
		});

		describe("Sign up with Email",function()
		{
			
			it('Enter Name : ',function()
			{
				account.enterName('jason');
			});

			it('Enter Email : ',function()
			{
				account.enterEmail();
			});

			it('Enter Password : ',function()
			{
				account.enterPassword('test');
			});

			it('Create account',function()
			{
			    account.CreateAccount();
			});
			it('check Sign up successful',function()
			{
				account.CheckAccountMessage("Account Successfully Created");
			})

			it('Check Side Menu is not present',function()
			{
				sidebar.ToggleSideMenu('off');
			});
			
		});	
	});

	describe('Data form becomeGuru has applied to New Account',function()
	{
		it('Click profile tab',function()
		{
			doc.tabBar('guru-tab-bar',1);
		});		
		it('Check Edit is disabled',function()
		{
			expect(element(by.id('btn-edit-profile')).isPresent()).toBe(true,"Edit Button Support to be present");
			expect(element(by.id('btn-save-profile')).isPresent()).toBe(false,"Save Button Support to not present");
		});

		it('Check Major has something',function()
		{
			var objList = element.all(by.css('#profile-major li'));
			objList.then(function(items)
			{
				expect(items.length>1).toBe(true,"Nothing is Add to profile");
			});
		});
		it('Check Course has been updated',function()
		{

		});
		it('Check Photo has been updated',function()
		{
			guruprofile.checkImgIsUpdated();

		});
	});
	

});
