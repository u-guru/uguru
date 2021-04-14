describe('#Error Test Flow : Edit Profile Button Check',function()
{

beforeAll(function()
	{
        // browser.get("http://localhost:8100/#/");
browser.manage().deleteAllCookies();
         browser.refresh();

        // // if(startButton.isPresent() === false)
        //     browser.get("http://"+localhost+":8100/#/home");
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
				expect(true).toBe(false,'Incompleted yet');
				// var side = element(by.css('.menu.menu-right'));
				// // side.isDisplayed().then(function(value)
				// // {
				// // 	if(value == true)
				// // 	{
				// // 		expect(value).toBe(false,"Side Menus shouldn't display");
				// // 		sidebar.FindSideButton("STUDENT MODE");
				// // 		element(by.css('.ion-side-menus-content.menu-content.pane.menu-animated')).click();
				// // 		element(by.css('.view-container')).click();
				// // 	}	
				// // });
				// var settingsLink = element.all(by.css('ion-view'));
				// browser.sleep(5000);
				// settingsLink.then(function(items)
				// {
				// 	expect(items.length).toBe(0);
				// 	// browser.wait(EC.elementToBeClickable(items[2]), 5000); //wait for the element to become clickable
				// 	browser.wait(EC.visibilityOf(items[3]), 5000); //wait for the element to become clickable
				// 	items[3].click();
				// });
				// browser.sleep(10000);
			});
			
		});	
	});

	describe('Edit Mode is not Enable',function()
	{
		it('Open the profile',function()
		{
			guru.OpenProfile();
		});
		it('Check Edit is disabled',function()
		{
			// expect(element(by.id('btn-edit-profile')).isPresent()).toBe(true,"Edit Button Support to be present");
			// expect(element(by.id('btn-save-profile')).isPresent()).toBe(false,"Save Button Support to not present");
			guruprofile.CheckEditModeNotActived();
		});
	});
});
