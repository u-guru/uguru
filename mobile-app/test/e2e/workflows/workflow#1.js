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

	describe('BecomeGuru process',function()
	{
		it('Open BecomeGuru Button',function()
		{
			home.BeginBecomeGuru();
		})

		describe('Major', function () {
			it('Pick A major',function()
			{
				major.SelectMajor(11);
			});

		
			it('Next slide',function()
			{
				major.GoToCoursePage();
			});
		});
		describe('-> Course', function () {
			it('Select course',function()
			{
				doc.waitLoading();
				course.SelectCourse(11);
			});
			it('Next slide',function()
			{
				course.GoToNextPage();
			});
		});	
		describe('Category color at section :  Services + count select skills',function()
		{
			var count ;

			it('Check category title back To DeFault Name',function()
			{
				category.CheckTitleIsMatch("SELECT CATEGORY")
			});

    		it('Open Subcategory#5',function()
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
		     	category.CountSelectSKill(count,5);
    		});

    		it('Next page',function()
    		{
    			category.GoToPhotoPage();
    		});
		});
	
		describe('Camera auto quit after taking picture at @sam1rm dev , in @f230536 the app restarted', function () {	    	
			it('Waiting to received the message',function()
			{
				 photo.UploadPhoto('small');
				//photo.NextPage();
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
			it('check Sign up successful -- INCONSISTANT',function()
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
 		it('Check major/course/skill are added',function()
		{

			expect(guruprofile.countMajor()).toBeGreaterThan(0,"No major list is updated to new account");
			expect(guruprofile.countCourse()).toBeGreaterThan(0,"No course list is updated to new account");
			expect(guruprofile.countSkill()).toBeGreaterThan(0,"No skill list is updated to new account");
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
