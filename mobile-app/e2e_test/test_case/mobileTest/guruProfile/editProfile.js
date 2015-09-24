describe('Guru Home Test', function () {
	var photo = element(by.id('profile-icon'));
	var course = element(by.css('#profile-courses li'))
	var major = element(by.css('#profile-major li'))
	var skill = element(by.css('#profile-skills li'))
	var language = element(by.css('#profile-languages li'))

	var ele = element.all(by.tagName("ion-slide"));
	beforeAll(function()
	{
		browser.get("http://localhost:8100/#/guru");
		browser.sleep(2000)
	});
	describe("[Need to update test Library ]Welcome Pop Up",function()
	{
		it('Check Pop up ',function()
		{
			expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});
	});
	describe("Check Tab Bar",function()
	{
		it('click Cred Button',function()
		{
			doc.tabBar('guru-tab-bar',1)
		});
		it('Check Url',function()
		{	
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-profile");
		});
		it("Check Side Meuns Hide",function()
		{
			expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false, "SideBar is showed");
		});
	});
	describe('Check all elements is not clickalbe before Edit Mode',function()
	{
		

		it('Element : Photo',function()
		{
			expect(true).toBe(false,"Not Completed Yet");

			// browser.wait(EC.elementToBeClickable(photo), 5000); //wait for an element to become clickable

			// expect(photo.isEnabled()).toBe(false,"Element Is not Click Able before Edit Mode Active!")
		});

		it('Element : Course',function()
		{
			expect(true).toBe(false,"Not Completed Yet");

			// expect(course.isEnabled()).toBe(false,"Element Is not Click Able before Edit Mode Active!")
		});

		it('Element : Major',function()
		{
			expect(true).toBe(false,"Not Completed Yet");
			// expect(major.isEnabled()).toBe(false,"Element Is not Click Able before Edit Mode Active!")
		});

		it('Element : Skill',function()
		{
			expect(true).toBe(false,"Not Completed Yet");
			// expect(skill.isEnabled()).toBe(false,"Element Is not Click Able before Edit Mode Active!")
		});

		it('Element : Language',function()
		{
			expect(true).toBe(false,"Not Completed Yet");
			// expect(language.isEnabled()).toBe(false,"Element Is not Click Able before Edit Mode Active!")
		});
	});
	describe("Edit Mode",function()
	{
		describe('Only Save Button can save the profile',function()
		{
			// expect(true).toBe(false,"Not Completed Yet");
		});
		it('Edit Button',function()
		{
			element(by.id('btn-edit-profile')).click();
		});
		describe("Photo",function()
		{
			
			it("Upload Small photo",function()
			{
			   doc.uploadPhoto('file-input-guru-edit-profile');
			});

			it("Upload Small photo",function()
			{
			   //doc.uploadPhoto('file-input-guru-edit-profile');
			   expect(true).toBe(false,"Not Completed Yet");

			});
			
		});	
		var str = ['course','major','skills','languages'];
		for(var i = 0; i < 4; ++i)
		{
			(function(index,title)
				{
					describe(title,function()
					{ 
						var count = 1 ; // 2 cuz deafult values
						var addButton   = element(by.css('#profile-'+title+ ' .default'));
						var objList = element.all(by.css('#profile-'+title+ ' li'));
						var pageTitle = element(by.css('#'+title+' h1'));
						var pageSearch= element(by.css('#'+title+'input'));
						var listName    = title+'-list';
						var closeButton = element.all(by.css('#'+title+' .header-nav-back')).last();
						var chooseList = element.all(by.repeater(title+' in user.'+title+'s'));
					 	// var test = title+' in user.'+title+'s';
						if(title =='course')
						{
							addButton = element(by.css('#profile-'+title+ 's .default'));
							objList = element.all(by.css('#profile-'+title+'s li'));
							listName =  title+'s-list';
 							chooseList = element.all(by.repeater(title+' in user.guru_'+title+'s'));
 							// test = title+' in user.guru_'+title+'s';
						    //chooseList = element.all(by.css("#"+listName+' .'+'user.guru_'+title+'s li'));

						}
						describe("Standard Test",function()
						{
							it("Open Page ",function()
							{
								// element(by.css('#profile-major li'));
								addButton.click();
							});
							it("check Page :"+ title,function()
							{
								// element(by.css('#profile-'+title+ ' .default')).click()
							    expect(pageTitle.getText()).toContain(title.toUpperCase());
							});
							it('[FIX BUGS] check Search Bar',function()
							{
								// expect(element(by.css('#'+title+'input')).isPresent()).toBe(true);
								expect(pageSearch.isPresent()).toBe(true);

							});
							it('Add '+ title,function()
							{
							    // doc.newPickList('courses-list',1);
							    for(var j = 1 ; j < 3; ++j)
							    {
							   		 doc.newPickList(listName,j);
							   		 ++ count
							    }
							})
							it('close',function()
							{
								// element(by.css('#'+title+' .header-nav-back')).click()
								closeButton.click()
							})
							it('Count ' + title + ' list',function()
							{
								//expect(courseList.isPresent()).toBe(true);
								objList.then(function(items)
								{
									expect(items.length).toBe(count);
								});
							});
							describe('Delete Data from Edit Profile',function()
							{
								it('One Course from Edit Profile',function()
								{
									objList.then(function(items)
									{

										// for(var j = 0 ; j < items.length-1; ++j)
										// {
										    browser.wait(EC.elementToBeClickable(items[0]),3000);
											items[0].click();
										// }
										expect(items.length-1).toBe(count-1,"Data Is Not Delted");
									});
								});
							});
							describe('Delete rest of Data from Select Page',function()
							{
								it('Open Page',function()
								{
									addButton.click();
								});

								it('Delete Select Data',function()
								{
										browser.sleep(1000);										      
										chooseList.then(function (items) {
											expect(items.length/2).toBe(2,"Something Wrong with the Data");
											 for(j =items.length/2; j < items.length; ++ j)
											 {
											 	items[j].click();
											 }
									    });	
								});
								it("Close",function()
								{
									closeButton.click()
								})
								it("Confirm",function()
								{
									objList.then(function(items)
									{
										expect(items.length-1).toBe(0,"Data Is Not Delted");
									});

								})
							});
							
						});
						//incompelted
						// describe("Add 15 course",function()
						// {
						// 	it("check Page Title",function()
						// 	{
						// 		browser.wait(EC.elementToBeClickable(course),3000)
						// 		course.click();
						// 		expect(element(by.css('#course h1')).getText()).toContain("ADD COURSES")
						// 	});
						// 	it('check Search Bar',function()
						// 	{
						// 		expect(element(by.css('#course input')).isDisplayed()).toBe(true);
						// 	});
						// 	for(var i = 0; i < 15; ++ i)
						// 	{
						// 		(function(index) 
						// 			{
						// 				it('#'+index+' add course',function()
						// 				{
						// 				    doc.newPickList('courses-list',index);
						// 				    ++ count
						// 				})
						// 			})(i);
						// 	}
							
						// 	it('close',function()
						// 	{
						// 		element(by.css('#course .header-nav-back')).click()
						// 	})
						// 	it('Count Course',function()
						// 	{
						// 		var courseList = element.all(by.css('#profile-courses li'));
						// 		//expect(courseList.isPresent()).toBe(true);
						// 		courseList.then(function(items)
						// 		{
						// 			expect(items.length).toBe(count);
						// 		});
						// 	});
						// });
					});
				})(i,str[i]);
		}
	
		
	});
});