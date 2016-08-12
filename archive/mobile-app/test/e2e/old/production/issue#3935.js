describe('#3935 Bugs Check Test',function()
{

    describe('@Workflow : Pre-Student Page + Close Welcome Pop', function () {

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

          it("choose a university",function()
          {
          	university.SelectSchool(0);
          });

          describe('Welcome uguru logo pop',function()
			{
				it('Check welcome logo pop up ',function()
				{
					browser.waitForAngular();
					home.CheckPopUpIsShown()
				});

				it('Close welcome logo',function()
				{
					home.CloseThePopUp();
				});	
			});


    });	
	describe('FAQ',function()
	{
		describe('First time opening FAQ model', function () {
	    	it('Open Sidebar',function()
	    	{
	    		sidebar.ToggleSideMenu('on');
	    	});
	    	it('Open FAQ',function()
	    	{
	    		sidebar.OpenFAQModal();
	    	});
	    });	
	    describe('Unable to unable to scroll inside the FAQ iframe', function () {
	    	it('Scroll FAQ',function()
    		{
    			// expect(true).toBe(false);
    			sidebar.ScrollFAQListTo(8);
    		});
    		it('Close FAQ',function()
    		{
    			sidebar.CloseModal();
    		});

	    });	
	    it('Close sidebar',function()
	    {
	    	sidebar.ToggleSideMenu('off');
	    })
	});

	describe('BecomeGuru process',function()
	{
		it('Open BecomeGuru Button',function()
		{
			home.BeginBecomeGuru();
		})
		it('check if loading spin show if no major list',function()
		{
			if(!major.MajorList.isDisplayed())
			{
				doc.waitLoading();
			}
		});

	
		it('Next slide',function()
		{
			major.GoToCoursePage();
		});

		describe('Select some courses -> cancel become Guru-> active become guru -> course-> no courses is loading and shown except the courses just selected', function () {
			it('Select course',function()
			{
				doc.waitLoading();
				course.SelectCourse(0);
			});
			it ('Go Back Page',function()
			{
				course.GoPreviousPage();
			})
			it('Cancel BecomeGuru',function()
			{
				major.CancelBecomeGuruProcess();
			});
			it('Open BecomeGuru Button',function()
			{
				home.BeginBecomeGuru();
			})
			it('Next slide',function()
			{
				major.GoToCoursePage();
			});
			it('check if loading spin show if no course list',function()
			{
				doc.waitLoading();
				course.CheckDefaultCourseNotEmpty();
			});

		});	
		describe('Category color at section :  Services + count select skills',function()
		{
			var count ;
			it('Next slide',function()
			{
				course.GoToNextPage();
			});
			it('Check category title back To DeFault Name',function()
			{
				category.CheckTitleIsMatch("SELECT CATEGORY")
			});

    		it('Open a Category',function()
			{
				category.SelectSkill(5);
			});
    		
			it('Check element exist',function()
			{
				category.SkillIsExist();
			});
			it('click all the skills ',function()
			{
		       count =  category.EnableAllSKills(5);
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
		     	category.CountSelectSKill(0,5);
    		});

    		it('Next page',function()
    		{
    			category.GoToPhotoPage();
    		});
		});
	
		describe('Camera auto quit after taking picture at @sam1rm dev , in @f230536 the app restarted', function () {
	    	it('',function()
			{
				expect(true).toBe(false,"Requre manual test");
			});
	    	
			it('Waiting to received the message',function()
			{
				// photo.UploadPhoto('small');
				photo.NextPage();
			});
		});	
		
	});
	describe('@Workflow : Sign Up',function()
	{
		// var account = new Account();
		// var sidebar = new Sidebar();

		it('Launch Profile',function()
		{
			browser.wait(EC.elementToBeClickable(element(by.id('btn-launch-profile'))),4000);
	 		element(by.id('btn-launch-profile')).click();	
		});

		describe("Sign up with Email",function()
		{
			
			it('Enter Name : ',function()
			{
				account.enterName('jason huang');

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
			});
		});	
	});
    describe('Guru Profile',function()
    {
    	it('Open the profile (Able to find 3 elements that has the same ID: #guru-tab-bar)',function()
    	{
    		guru.OpenProfile();
    	});
   		it('active edit mode',function()
   		{
   			guruprofile.ActiveEditMode();
   		});
    	describe('Become Guru - > Finish the process -> sign up with new Email account -> nothing from becomeGuru is applied to new account', function () {
    		it('Check major/course/skill are added',function()
    		{
    			expect(guruprofile.countMajor()-1).not.toBe(0,"No major list is updated to new account");
    			expect(guruprofile.countCourse()-1).not.toBe(0,"No course list is updated to new account");
    			expect(guruprofile.countSkill()-1).not.toBe(0,"No skill list is updated to new account");

    		});
    	});

    	describe('Go to GuruProfile -> Edit mode-> Add course Modal-> completed add course -> remove courses , random show this error', function () {
			it('Open Add course model',function()
			{
				guruprofile.OpenModal('course');
			});
    		it('Open Add course model',function()
			{
				course.SelectCourse(0);
			});
    		it('close Modal',function()
    		{
    			guruprofile.CloseModal();
    		});

    	});	
    	describe('Guru profile -> Add Major/ Course -> Tap to delete the Course/ Major -> nothing happened & no log or anything (hard to detect the tap) -> 2 item is select in that field', function () {
    		it('',function()
			{
				expect(true).toBe(false,"require manual test");
			});

    	});	
    	describe('[Require manual test ]Go to GuruProfile -> Edit mode-> unable to delete the skills', function () {
    		it('',function()
			{
				expect(true).toBe(false,"Alert dialog doesn't work");
			});
			
    	});	
    });
  
	
    describe('Refreshing page -> 2 * Something went wrong... Please contact support! , because getMajorsBecomeGuru & getCoursesBecomeGuru both has alert dialog', function () {
    	it('',function()
		{
			expect(true).toBe(false,"Alert dialog doesn't work");
		});

    });	
    describe('Guru Profile',function()
    {
    	describe('When Update Experience , the update one will move to the end of the list', function () {
    		it('',function(){});
    	});	
    });
    // it("Check Error Console message",function()
    // 	{
	
    // 	});
    afterEach(function()
    {
    	   browser.manage().logs().get('browser').then(function(browserLogs) {
    		  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
    	   });
    });
});
