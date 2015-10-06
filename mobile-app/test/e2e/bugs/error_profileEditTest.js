var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');
var Major = require('../becomeGuru/majorPageObject.js');
var Course = require('../becomeGuru/coursePageObject.js');

var Home= require('../home/homePageObject.js');

describe('#Error Test Flow : Edit mode is activated + No data from BecomeGuru is applied to the profile page',function()
{
	var university = new University();
    var access  = new Access();
	var major = new Major();
	var home = new Home();

	describe('@Workflow : access page', function () {
		// var accessInput = element(by.id("access-code-bar"));
		var accessInput = element(by.tagName("input"));
		var startButton = element(by.id("redeem-button"));
			beforeAll(function()
			{
	            // browser.get("http://localhost:8100/#/");
	            // browser.refresh();
	            browser.get("http://"+localhost+":8100/#/university");
			});
			it("Enter Access Code : cool ",function()
			{
				doc.setInput('cool',0,'access.codeInput');
			});

			it("Check Successed",function()
			{
				//browser.wait(EC.elementToBeClickable(startButton),5000);
				startButton.click();
				doc.checkMsg("Access Granted");
			});
	});

	describe('@Workflow : University page', function () {
	 	//browser.driver.get("http://localhost:8100/#/university");
		it("choose a university",function()
		{
		//	doc.pickList('university in initialUniversities');
			doc.newPickList('school-list')

		});
		it("check the current position",function()
		{
			expect(browser.getCurrentUrl()).toContain("/#/home");
		});
		
	});

	describe('@Workflow : Home page', function () {

		describe('Welcome uguru logo pop',function()
		{
			it('Check welcome logo pop up ',function()
			{
				home.CheckPopUpIsShown()
			});

			it('select a major',function()
			{
				major.SelectMajor(0);
			});

			it('Close welcome logo',function()
			{
				home.CloseThePopUp();
			});	
		});

	});

	describe('@Workflow : Major page', function () {
		var major = new Major();

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
		var course = new Course();

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
	var Category = require('../becomeGuru/categoryPageObject.js');

	describe('@Workflow : category page', function () {
		var category = new Category();
		it('Next page',function()
		{
			category.GoToPhotoPage();
		});
	});

	var Photo = require('../becomeGuru/photoPageObject.js');

	describe('@Workflow : photo test', function () {
		var photo = new Photo();

		it('Waiting to received the message',function()
		{
			photo.NextPage();
		});
	});

	var Account= require('../side/accountPageObject.js');
	var Sidebar= require('../side/sidebarPageObject.js');

	describe('@Workflow : Sign Up',function()
	{
		var account = new Account();
		var sidebar = new Sidebar();

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
				var side = element(by.css('.menu.menu-right'));
				side.isDisplayed().then(function(value)
				{
					if(value == true)
					{
						expect(value).toBe(false,"Side Menus shouldn't display");
						sidebar.FindSideButton("STUDENT MODE");
						element(by.css('.ion-side-menus-content.menu-content.pane.menu-animated')).click();
						element(by.css('.view-container')).click();
					}	
				});
			});
			
		});	
	});

	describe('Edit Mode is not Enable',function()
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
	});

});
