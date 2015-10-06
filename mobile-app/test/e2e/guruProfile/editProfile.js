
describe('Guru Edit Profile Test', function () {
	var photo = element(by.id('profile-icon'));
	var course = element(by.css('#profile-courses li'))
	var major = element(by.css('#profile-major li'))
	var skill = element(by.css('#profile-skills li'))
	var language = element(by.css('#profile-languages li'))
	var profileAdd = element.all(by.css('#profile-info .default'));

	var ele = element.all(by.tagName("ion-slide"));
	// beforeAll(function()
	// {
	// 	// browser.get("http://localhost:8100/#/guru-profile");
	// 	browser.get("http://"+localhost+":8100/#/guru-profile");
	// 	browser.getCurrentUrl().then(function(url)
	// 	{
	// 		if( url!= "http://"+localhost+":8100/#/guru-credibility")
	// 			browser.get("http://"+localhost+":8100/#/guru-credibility");
	// 	})
	// 	browser.sleep(2000)
	// });
	it("Check It is right address",function()
	{
		expect(browser.getCurrentUrl()).toContain("/#/guru-profile");
	});

	describe('Check all elements is not clickalbe before Edit Mode',function()
	{
		var photoClick = element(by.css('[ng-click="connectWithFacebook()"]'))
	 	var str = ['Course','Major','Skills','Languages'];

		it('Element : Photo',function()
		{
			//expect(photoClick.getAttribute('ng-if')).toBe("TESTs","Not sure what value of NG-if should be");
			expect(photoClick.isPresent()).toBe(false,"Edit Photo Should be Hideden Before Edit Mode");
		});
		for(var j = 0 ; j <4 ; ++ j)
		{
			(function(index,name)
			{
				it('Element : ' + name,function()
				{
					profileAdd.then(function(items)
					{
						expect(items[index].isDisplayed()).toBe(false,"Add "+name+" Should Be Hiden Before Edit Mode");
					});
				});
			})(j, str[j]);
		}
	});
	
	describe("Edit Mode",function()
	{
		// describe('Only Save Button can save the profile',function()
		// {
		// 	// expect(true).toBe(false,"Not Completed Yet");
		// });
		it('Edit Button',function()
		{
			// element(by.id('btn-edit-profile')).click();
			guruprofile.ActiveEditMode();
		});
		describe("Photo",function()
		{
			
			it("Upload Small photo",function()
			{
			   // doc.uploadPhoto('file-input-guru-edit-profile','small');
			   guruprofile.UploadPhoto('small');
			});

			it("Upload Large photo",function()
			{
			   //doc.uploadPhoto('file-input-guru-edit-profile');
			   //doc.uploadPhoto('file-input-guru-edit-profile','large');
			   guruprofile.UploadPhoto('large');

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
						var profileAdd = element.all(by.css('#profile-info .default'));
						var objList = element.all(by.css('#profile-'+title+ ' li'));
						var pageTitle = element(by.css('#'+title+' h1'));
						var pageSearch= element(by.css('#'+title+'input'));
						var listName    = title+'-list';
						var closeButton = element.all(by.css('.modal-backdrop.active .header-nav-back')).last();
						var chooseList = element.all(by.repeater(title+' in user.'+title+'s'));


						if(title =='course')
						{
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
								//browser.wait(EC.elementToBeClickable(addButton),2000);
							
								// addButton.click();
								profileAdd.then(function(items)
								{
									browser.wait(EC.elementToBeClickable(items[index]),2000);
									expect(items[index].isPresent()).toBe(true);
									if(index >= 2)
									{
										doc.drag(element(by.id('profile')),0,1000);
										// expect(items[index].getLocation()).toBe(0,"The Page is scrolling Down");
										element(by.id('profile')).getLocation().then(function(result)
						   				{
								   			expect(result.y > 0).toBe(true,"The Page is not scrolling Down")
						   					items[index].click();
						   				});
									}
									else
										items[index].click();
								});
							});
							 if(title=='course')
							 {
						    	 pageSearch= element(by.model(title+'_search_text'));
							 }
						     else
						     	pageSearch = element(by.model('search_text'));

							it("check Page :"+ title,function()
							{
								browser.wait(EC.visibilityOf(pageTitle),3000);
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
							    if (index == 2)
							    {
							    	doc.newPickList('skills-list',index);
			    		        	element.all(by.repeater('skill in active_category.skills')).then(function (items)
			    		        	{
			    		        		for (var i = 0 ; i<items.length ; ++i)
			    		        		{
			    							if(index != 0)
			    								{
			    				        			items[i].click();
			    				        			if (index===0)
			    				        			{
			    	        							doc.switchAlert();	
			    				        			}
			    								}			    			        			
			    		        			++ count
			    		        		}
			    		        	});	
							    }
							    else
							    {
							     	 for(var j = 1 ; j < 3; ++j)
								    {
								   		 doc.newPickList(listName,j);
								   		 ++ count
								    }
								}
							})	
						
							
							it('close',function()
							{
								if (index == 2)
									{
					        	          doc.clickCanvas ( element(by.css(".modal-backdrop.active")),100,50)
									}
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
									profileAdd.then(function(items)
									{
										browser.wait(EC.elementToBeClickable(items[index]),2000);
										expect(items[index].isPresent()).toBe(true);
										if(index >= 2)
										{
											doc.drag(element(by.id('profile')),0,1000);
											// expect(items[index].getLocation()).toBe(0,"The Page is scrolling Down");
											element(by.id('profile')).getLocation().then(function(result)
							   				{
									   			expect(result.y > 0).toBe(true,"The Page is not scrolling Down")
							   					items[index].click();
							   				});
										}
										else
											items[index].click();
									});
								});

								it('Delete Select Data',function()
								{
							    
								    if (index == 2)
								    {
								    	doc.newPickList('skills-list',index);
				    		        	element.all(by.repeater('skill in active_category.skills')).then(function (items)
				    		        	{
				    		        		for (var i = 0 ; i<items.length ; ++i)
				    		        		{
				    							if(index != 0)
				    								{
				    				        			items[i].click();
				    				        			if (index===0)
				    				        			{
				    	        							doc.switchAlert();	
				    				        			}
				    								}			    			        			
				    		        		}
				    		        	});	
								    }
								    else
								    {
							    		chooseList.then(function (items) {
							    			expect(items.length/2).toBe(2,"Something Wrong with the Data");
							    			 for(j =items.length/2; j < items.length; ++ j)
							    			 {
							    			 	items[j].click();
							    			 }
							    	    });	
								    }
										
								});
								it("Close",function()
								{
									if (index == 2)
									{
					        	          doc.clickCanvas ( element(by.css(".modal-backdrop.active")),100,50)
									}
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
	it('Click Edit Tab',function()
	{
		doc.tabBar('guru-tab-bar',1)
	});
});