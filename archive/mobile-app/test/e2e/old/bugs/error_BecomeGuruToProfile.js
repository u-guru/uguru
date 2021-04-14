
describe('#Error Test Flow : Data from BecomeGuru is applied to the profile page',function()
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

    	it("Choose a university",function()
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
		// var major = new Major();

		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});

		it('Select a major',function()
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

		describe('Check data & go next section',function()
		{
			it('select a course',function()
			{
		 		course.SelectCourse(0);
			});

			it('next page',function()
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

		it('Launch profile',function()
		{
			browser.wait(EC.elementToBeClickable(element(by.id('btn-edit-profile'))),4000);
	 		element(by.id('btn-edit-profile')).click();	
		});

		describe("Sign up with Email",function()
		{
			
			it('Enter name : ',function()
			{
				account.enterName('jason');
			});

			it('Enter Email : ',function()
			{
				account.enterEmail();
			});

			it('Enter password : ',function()
			{
				account.enterPassword('test');
			});

			it('Create account',function()
			{
			    account.CreateAccount();
			});
			it('Check sign up successful',function()
			{
				account.CheckAccountMessage("Account Successfully Created");
			})

			it('Check side menu is not present',function()
			{
				expect(true).toBe(false,'Incompleted yet');
			});
			
		});	
	});


	describe('Check data from becomeGuru is applied to profile',function()
	{
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
