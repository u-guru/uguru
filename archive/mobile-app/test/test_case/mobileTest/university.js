var model = "input.search_text"
describe('University test', function () {


 	describe("University page have Default List and albe to do infinity scroll",function()
	{
		it("Popular List is enable",function()
			{
		 		//browser.pause();
				element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length).not.toBe(0,"<#school-list li> Has No results");
		    	});
			});
		it('Check Data is repeating ',function()
		{
			doc.checkLists("school-list","university.name")
		});

		describe("Infinity Sroll Test",function()
		{
			for( i = 8; i < 40; i+=8)
			{
				(function(index) {
		      		it ('Scroll Down to Index : ' + index,function()
			 		{
			 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
				    		browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
				    	});
					});
					it('Check more items loaded',function()
					{
						element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
				    		expect(items.length > 10+index).toBe(true,"No data is loading inside #school-list");
				    	});

					});
					it ('Scroll Back To Top',function()
			 		{
			 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
				    		browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
				    	});
					});
		        })(i);
			}
		})
		
		
	});
	describe('Test Back Button [ng-click="goToAccess()"]',function()
	{
		var accessInput = element(by.id("access-code-bar"));
		var startButton = element(by.id("access-start"));
		var load= element(by.id('E2E-spinner'))
		var back = element(by.css('[ng-click="goToAccess()"]'))
		it("Type in O",function()
			{
				doc.setInput("O",0,model);
			});
		it("Back to Access Page [ng-click='goToAccess()']",function()
		{
			back.click();
		});
		it("Check Input at Access Page is clear",function()
		{
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("");
			});	
		});
		it("Enter Access Code : cool ",function()
		{
			browser.wait(EC.visibilityOf(accessInput),3000)
			accessInput.sendKeys('cool');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("cool");

			});
		});

		it("Check Message is shown : Access Granted",function()
		{
			startButton.click();
			doc.checkMsg("Access Granted");
	
		});	
		it("Check University Search Input is clear",function()
		{
		    element.all(by.tagName("input")).then(function(inputs)
		    {
		    	inputs[1].getAttribute('value').then(function(result)
				{
					expect(result).toBe("","Search Input Is not empty");
				});	
  			  	inputs[1].clear();
		    });


			
		});
	});

	describe("Is University Page Dragalbe",function()
   	{
		var accessInput = element(by.id("access-code-bar"));
		var startButton = element(by.id("access-start"));
		var load= element(by.id('E2E-spinner'));

   		it("Drag to left",function()
   		{
				element(by.id('school')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"Location X of University Page is moved before Darg");

   				});
   			doc.slideView(1,"left")
   		});
   		it('Check element',function()
   		{
   			element(by.id('school')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X of University Page is moved");
   				});
   			 // browser.sleep(10000);
   		});
		it("Drag to right",function()
   		{
				element(by.id('school')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X of University Page is moved before Darg");

   				});
   			doc.slideView(1,"right")
   		});

   		it('Check element',function()
   		{
   			element(by.id('school')).getLocation().then(function(result)
   				{
		   			expect(result.x).toBe(0,"location X of University Page is moved");
   				});
   		});
   		describe("[Skip Bug]",function()
   		{
	   		it('Refresh Page',function()
	   		{
	   			browser.refresh();
	   		})
	   		it("Enter Access Code : cool ",function()
			{
				browser.wait(EC.visibilityOf(accessInput),3000)
				accessInput.sendKeys('cool');
				accessInput.getAttribute('value').then(function(result)
				{
					expect(result).toBe("cool");

				});
			});

			it("Check Message is shown :Access Granted",function()
			{
				startButton.click();
				doc.checkMsg("Access Granted");
		
			});	
   		})
   		

   	});
	describe("Feature : GPS Button ",function()
	{
		var gps = element(by.css('[ng-click="toggleLocationIconAppearance()"]'));
		var name = ["Enable GPS","Disable GPS"]
		var show = ["Appear", "Disappear"]
		for(var i =0 ; i < 2 ; ++i)
		{
			(function(index,title,isShown)
			{
				describe(title,function()
				{
							it("Click GPS Button",function()
							{
								browser.getCapabilities().then(function (caps) {
						            var platformName = caps.caps_.platformName.toUpperCase();
						          	if(platformName != 'ANDROID')
						          	{
						          		browser.wait(EC.visibilityOf(gps),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
						          		gps.click();
						          	}		
						        });
								
							});

							it ('[Incompelted] Check Color GPS icon is Changed ',function()
							{
								element(by.css('.icon.ion-navigate')).getAttribute('style').then(function(results)
								{
									if(index === 1)
										expect(results).toBe("color: white;","Color(icon ion-navigate) doesn't changed to default[White]")
									else 
										expect(results).toContain("(70, 255, 0)","Color(icon ion-navigate) doesn't changed to default[Green]")
								})
							});

							it('Check School Miles '+isShown,function()
							{
								if(index === 0)
								{
									browser.wait(EC.visibilityOf(element.all(by.binding('university.miles | number')).first()),3000,"TEST").then(
										function()
										{
											element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
									    		for(var i = 0 ; i < items.length; i++)
													expect(items[i].element(by.binding('university.miles | number')).isDisplayed()).toBe(true,"No Miles Is Showing");
								    	});
								    }, function(){
								        //code to want to execute on failure.
								        // console.log("failure");
								 		doc.checkMsg("Unable to Find the Location, did you enable share Location");

								    });
								}
								else
								{
									browser.wait(EC.invisibilityOf(element(by.binding('university.miles | number'))),3000,"Miles Should Be Hidden");
								}
							});

							if(index === 1)
							{
								it('Check School-list is back to Default',function()
						 		{
				 					element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
				 			    		expect(items[0].getText()).toContain('Princeton University',"The 1st Default School Should list Princeton University");
				 			    		expect(items[1].getText()).toContain('Columbia University',"The 2st Default School Should list Columbia University");
				 			    		expect(items[2].getText()).toContain('Stanford University',"The 3st Default School Should list Stanford University");

				 			    	});
			 			    	});
							}
							// it('Check Data is repeating ',function()
					 	// 	{	
					 	// 		doc.checkLists("school-list","university.name")
					 	// 	});
					 		describe("Infinity Sroll Test",function()
					 		{
					 			for(var j = 8; j < 40; j+=8)
					 			{
					 				(function(ind) {
					 		      		it ('Scroll Down to Index : ' + ind,function()
					 			 		{
					 			 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
					 				    		browser.executeScript('arguments[0].scrollIntoView()', items[ind].getWebElement());
					 				    	});
					 					});
					 					it('Check more items loaded',function()
					 					{
					 						element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
					 				    		expect(items.length > 10+ind).toBe(true,"No data is loading inside #school-list");
					 				    	});

					 					});
					 					
					 					it('Check University has miles loaded',function()
					 					{
					 						// if(index===0)
					 						// 	browser.wait(EC.visibilityOf(element.all(by.binding('university.miles | number')).first()),3000,"Miles is not Shown");
					 						// else
						 					// 	browser.wait(EC.invisibilityOf(element(by.binding('university.miles | number'))),3000,"Miles is not Be Hidden");

						 					element.all(by.binding('university.miles | number')).then(function(items)
						 					{
						 						browser.wait(EC.visibilityOf(items[ind]),3000,"Miles is not Shown");
						 					});
					 					});
					 					it ('Scroll Back To Top',function()
					 			 		{
					 			 			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
					 				    		browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
					 				    	});
					 					});
					 		        })(j);
					 			}
					 		});
				});
			})(i,name[i],show[i]);
		}
	});
	describe("[Not Sure How Result Should show] Type in O in the search input, there should be exactly 3 results - Ohio, Oklahoma, Oregon",function()
	{
		it("Type in O",function()
			{
				doc.setInput("O",0,model);
			});
		it("Check list is right",function()
		{
			element.all(by.css('#school-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).toBe(3,"School-Search Result Should Only Have 3 Items");
	    	});
		});
		it('Check Data is right ',function()
		{
			doc.checkLists("school-list","university.name",'Ohio',0)
			doc.checkLists("school-list","university.name",'Oregon',1)
			doc.checkLists("school-list","university.name",'Oklahoma',2)

		});
	});


		describe("Check Imagine have the same url",function()
		{
			it("has different icon",function()
			{	
				doc.checkList('school-list',by.tagName('img'),'src');
			});

		});

		describe("Select a University and lead to home page",function()
		{
			it("Select a university",function()
			{
				doc.newPickList('school-list')

			});
			it("check the current position",function()
			{
				expect(browser.getCurrentUrl()).toBe("http://"+localhost+":8100/#/home");
			});
		});

});