
var University = require('./universityPageObject.js');
var Access = require('../access/accessPageObject.js');
describe('University test', function () {

    var university = new University();
    var access  = new Access();

 	describe("University page show a default List",function()
	{
		it("The List is preload and show",function()
		{
			university.ChekSchoolListIsPresent();
		});
		it('Check school list has repeating school name',function()
		{
			// doc.checkLists("school-list","university.name");
			university.checkRepeatingData();
		});
	});

	describe("Infinity scroll test for school-list",function()
	{
		for(var i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Scroll down to #' + index+' school',function()
		 		{
		 			university.ScrollSchoolList(index);
				});
				it('Check school list is increased',function()
				{
					university.ChekSchoolListIsIncrease(index);
				});
				it ('Scroll back to top',function()
		 		{
		 			university.ScrollSchoolList(0);
				});
	        })(i);
		}
	});
		
		
	
	describe('Test back button can return back to access page',function()
	{
		var accessInput = element(by.id("access-code-bar"));
		var startButton = element(by.id("access-start"));
		var back = element(by.css('[ng-click="goToAccess()"]'))

		it("Search : O",function()
			{
				university.SchoolSearchName("0");

			});

		it("School return to access",function()
		{
			university.SchoolReturnAccess();
		});

		it("Check input at access page is clear",function()
		{
			// need access pageobject
			// doc.setInput("",0,"access.codeInput");
			access.chekAccessIsEmpty();
		});

		it("Enter access code : cool ",function()
		{
			// need access pageobject
			access.EnterAccessCode('cool');

		});

		it("Check message is shown : Access Granted",function()
		{
			access.RedeemClick()
		   	access.CheckMessage('cool');
		});	

		it("Check university list is preload and show",function()
		{
			university.ChekSchoolListIsPresent();
		});

		it("Check university search bar is clear",function()
		{
			university.SchoolSearchIsEmpty();
		});

	});

	// Skip This Test becuase the Drag and drop issue
	// describe("Is University Page Dragalbe",function()
 //   	{
	// 	var accessInput = element(by.id("access-code-bar"));
	// 	var startButton = element(by.id("access-start"));
	// 	var load= element(by.id('E2E-spinner'));

 //   		it("Drag to left",function()
 //   		{
	// 			element(by.id('school')).getLocation().then(function(result)
 //   				{
	// 	   			expect(result.x).toBe(0,"Location X of University Page is moved before Darg");

 //   				});
 //   			doc.slideView(1,"left")
 //   		});
 //   		it('Check element',function()
 //   		{
 //   			element(by.id('school')).getLocation().then(function(result)
 //   				{
	// 	   			expect(result.x).toBe(0,"location X of University Page is moved");
 //   				});
 //   			 // browser.sleep(10000);
 //   		});
	// 	it("Drag to right",function()
 //   		{
	// 			element(by.id('school')).getLocation().then(function(result)
 //   				{
	// 	   			expect(result.x).toBe(0,"location X of University Page is moved before Darg");

 //   				});
 //   			doc.slideView(1,"right")
 //   		});

 //   		it('Check element',function()
 //   		{
 //   			element(by.id('school')).getLocation().then(function(result)
 //   				{
	// 	   			expect(result.x).toBe(0,"location X of University Page is moved");
 //   				});
 //   		});
 //   		describe("[Skip Bug]",function()
 //   		{
	//    		it('Refresh Page',function()
	//    		{
	//    			browser.refresh();
	//    		})
	//    		it("Enter Access Code : cool ",function()
	// 		{
	// 			browser.wait(EC.visibilityOf(accessInput),3000)
	// 			accessInput.sendKeys('cool');
	// 			accessInput.getAttribute('value').then(function(result)
	// 			{
	// 				expect(result).toBe("cool");

	// 			});
	// 		});

	// 		it("Check Message is shown :Access Granted",function()
	// 		{
	// 			startButton.click();
	// 			doc.checkMsg("Access Granted");
		
	// 		});	
 //   		})
   		

 //   	});
	describe("Feature : GPS button",function()
	{
		var name = ["Enable GPS","Disable GPS"]
		var show = ["appear", "disappear"]

		for(var i =0 ; i < 2 ; ++i)
		{
			(function(index,title,isShown)
			{
				describe(title,function()
				{
							it("Toggle GPS button",function()
							{
								//university.toggleGPS();	
								  browser.getCapabilities().then(function (caps) {
						              var platformName = 'ANDROID';

						            //  expect(caps.caps_.platformName).toBe('ANDROID')
						              if(platformName != 'ANDROID' && index != 0)
						              {
						                browser.wait(EC.visibilityOf(university.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
						                university.GPSButton.click();
						              }   
						          });				
							});

							it ('[Need To Fix]Check color of GPS icon is Changed ',function()
							{
								university.checkGPSColor('on');
							});

							it('Check mileage of school is '+isShown,function()
							{
								university.checkMileage(index)
							});

							if(index === 1)
							{
								it('Check school-list is back to default list',function()
						 		{
				 					university.isDefaultSchools()
			 			    	});
							}
							// it('Check Data is repeating ',function()
					 	// 	{	
					 	// 		doc.checkLists("school-list","university.name")
					 	// 	});
					 		describe("School list able to do infinity scroll and all the school has mileage",function()
					 		{
					 			for(var j = 8; j < 40; j+=8)
					 			{
					 				(function(ind) {

		 					      		it ('Scroll down to #' + index+' school',function()
		 						 		{
		 						 			university.ScrollSchoolList(index);
		 								});
		 								it('Check school list is increased',function()
		 								{
		 									university.ChekSchoolListIsIncrease(index);
		 								});
					 					it('Check university mileage is '+isShown,function()
					 					{	
					 						if(index ==0)
					 							university.checkCurrentMileage('on',ind)
					 						else
					 							university.checkCurrentMileage('off',ind)
					 					});
		 								it ('Scroll Back To Top',function()
		 						 		{
		 						 			university.ScrollSchoolList(0);
		 								});
					 		        })(j);
					 			}
					 		});
				});
			})(i,name[i],show[i]);
		}
	});
	describe("[Not sure how result should show] Type in O in the search input, there should be exactly 3 results - Ohio, Oklahoma, Oregon",function()
	{
		it("Type in O",function()
			{
				university.SchoolSearchName("O");
			});
		it("Check list is right ",function()
		{
			university.ChekSchoolListLength(3);

		});
		it('Check data is right ',function()
		{
			university.CheckSchoolContainNameByOrder('Ohio',0);
			university.CheckSchoolContainNameByOrder('Oregon',1);
			university.CheckSchoolContainNameByOrder('Oklahoma',2);
		});
	});

		describe("Select a university and lead to home page",function()
		{
			it("Select a university",function()
			{
				university.SelectSchool();
			});
			it("check the current position",function()
			{
				expect(browser.getCurrentUrl()).toContain("/#/home");
			});
		});

});