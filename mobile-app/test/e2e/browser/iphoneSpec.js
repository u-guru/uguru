describe('Best case Test on mobile size',function()
{
	var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")

	afterAll(function()
	    {
	      doc.ResetAll();
	    });

    describe('@Workflow : Pre-Student Page + Close Welcome Pop', function () {

      	for( i = 0; i < ListOfCode.length; ++ i)
      	{
              (function(code) {
              	describe('Test random access code #'+i,function()
          			 {
						it("Enter random access code : "+ code,function()
							{
								   access.EnterAccessCode(code)
							});


						it('Press enter',function()
						{
							access.RedeemClick();
						});
						it("Check page changed & check message show : Access Granted",function()
						{
						   	access.CheckMessage(code);
						});
          			});
              })(ListOfCode[i]);
          }	

          it("Sekect a university",function()
          {
          	// university.SelectSchool();
          	$$('#school-list li a').get(0).click();

          });
    });	
	
	describe('BecomeGuru process',function()
	{
		describe('-> Course', function () {
			it('Select course',function()
			{
				// doc.waitLoading();
				course.SelectCourse(0);
				// $$('#courses-list li a').get(0).click();

			});
			it('Next slide',function()
			{
				// course.GoToNextPage();
				$$('[ng-click="nextSlide()"]').get(0).click();
			});
		});	
	
	var CategoryName = ['Academic','BAKING','DELIVERY','HOUSEHOLD','PHOTOGRAPHY','SERVICES','Sports & Muscle','TECHNOLOGY & IT']
		describe("Category",function () {
			for (var i = 0 ; i< 1 ; ++i)
			{
		        (function(index,title) {
			        describe('Click the category #'+index,function()
			        {
			        	var count;
		        		it('Open a Category',function()
						{
							category.SelectSkill(index);
						});
		        		it('Check Category Title : '+title ,function()
		        		{
		        			category.CheckTitleIsMatch(title.toUpperCase());
		        		})

						it('Check element exist',function()
						{
							category.SkillIsExist();
						});
						it('click all the skills ',function()
						{
					        count = category.EnableAllSKills(index);
						});

		        		it('close a Category',function()
		        		{
							category.clickCanvas (100,50)
		        		})
		        		// check which index
		        		it('check select',function()
		        		{
					     // element.all(by.css(str)).then(function (items) {
					     	category.CountSelectSKill(count,index);
		        		});
					});
		        })(i,CategoryName[i]);
			}

		});
		
		describe('Camera auto quit after taking picture at @sam1rm dev , in @f230536 the app restarted', function () {	    	
			it('Next page',function()
    		{
    			// category.GoToPhotoPage();
    			$$('[ng-click="nextSlide()"]').get(1).click();
    		});
			it('Waiting to received the message',function()
			{
				 // photo.UploadPhoto('small');
				//photo.NextPage();
				browser.sleep(500)
				$('[ng-click="goToGuruMode()"]').click();
			});
		});	
		
	});
	describe('@Workflow : Sign Up',function()
	{

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
				account.enterPassword('test123');
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
    describe('Guru profile',function()
    {
    	it('Open the profile (Able to find 3 elements that has the same ID: #guru-tab-bar) -- INCONSISTANT',function()
    	{
    		guru.OpenProfile();
    	});
 		it('Check major/course/skill are added',function()
		{

			// expect(guruprofile.countMajor()).toBeGreaterThan(0,"No major list is updated to new account");
			expect(guruprofile.countCourse()).toBeGreaterThan(0,"No course list is updated to new account");
			expect(guruprofile.countSkill()).toBeGreaterThan(0,"No skill list is updated to new account");
		});
		it('active edit mode',function()
			{
				guruprofile.ActiveEditMode();
			});
		var str = ['course','language','experience','skill'];
		for(var i = 0 ; i < str.length ;++ i)
		{
			(function (title) {
		    	describe('Open '+title+' Modal', function () {
				
					it('Open Modal',function()
					{
						guruprofile.OpenModal(title);
					});
		    		it('close Modal',function()
		    		{
		    			guruprofile.CloseModal();
		    		});

		    	});	
			})(str[i])
		}
    });
  
	describe("Check all Creditability Page",function()
	{	
		var groupName  = ['TRANSCRIPT','FACEBOOK','PHONE','EMAIL','EXPERIENCE']
		var groupButton = ['transcript','Facebook','number','Email','Item']
		it('Open Creditability',function()
		 {
		 	// browser.get("http://"+localhost+":8100/#/guru-credibility");
    		guru.OpenCredibility();

		 });
		for(var i = 2; i < 5 ; ++ i)
		{
			(function(index,title,buttonName)
			{
				describe('Test FeAattures : '+title , function()
				{
					it('Select section : '+ title,function()
					{
						// doc.newPickList('credit-slider',index);
						credibility.OpenCredibilityOptions(index);
					});
					describe('[ Incompleted ] Check Feattures functional : Add '+ buttonName,function()
					{
							it('click Button',function()
							{
								// element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
								// 	expect(items[index].getText()).toContain(buttonName);
								// 	if (index != 0 )
								// 		items[index].click();
								// });
								credibility.OpenOptionsButton(index);
							});
				   		
			   		  		switch(index) 
			   		  		{
			   		  		    case 0:
			   		  		    	describe('Photo Upload Test',function()
			   		  		    	{
			   		 
			   		  		    		it('upload a small Photo',function()
			   		  		    		{
			   		  		    			// expect(true).toBe(false,"Not Completed Yet");
			   		  		    			doc.uploadPhoto("file-input-guru-add-transcript","small");
			   		  		    			doc.checkMsg("Saved!");

			   		  		    		});

			   		  		    	});
			   		  		        break;
			   		  		    case 1:
				   		  		    describe('[Incompleted]Facebook Test',function()
				   		  		    {
				   		  		    	it('Login Facebook',function()
				   		  		    	{
				   		  		    		doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");                            
								
				   		  		    	});
				   		  		    });
			   		  		        break;
			   		  	        case 2:
	  	           		  		    describe('Phone Number Test',function()
	  	           		  		    {
  	  	
	  	           		  		    	it('Enter Number : 123456789',function()
	  	           		  		    	{
	  	           		  		    		// expect(true).toBe(false,"Not Completed Yet,Alert Message");

											 // doc.openWrapper('123456789')
											 // doc.checkMsg('Saved!');
											 browser.wait(EC.visibilityOf($('.uguru-popup.high-z-index.sidebar-popup.show')),2000);
											 $('[ng-model="popupInput.phoneConfirm"]').sendKeys("1231231234")
											 $('.uguru-popup.high-z-index.sidebar-popup.show button').click();
											 doc.checkMsg('Saved!');
	  	           		  		    	});
	  	           		  		    });
			   		  	       		break;
			   		  		    case 3:
	  		       		  		    describe('Email Test',function()
	  		       		  		    {

  	           		  		    		it('Enter Email : jason@sjsu.edu',function()
	  	           		  		    	{
		       		  	        		// doc.openWrapper('jason@sjsu.edu');
		       		  	        		browser.wait(EC.visibilityOf($('.uguru-popup.high-z-index.sidebar-popup.show')),2000);

		       		  	        		 $('[ng-model="popupInput.emailConfirm"]').sendKeys("jason@sjsu.edu")
		       		  	        		 $('.uguru-popup.high-z-index.sidebar-popup.show button').click();
		       		  	        		  doc.checkMsg('Email sent to jason@sjsu.edu');
	  	           		  		    	});
	  		       		  		    });
			   		  		    	break;
			   		  		    case 4:
	  		       		  		    describe('EXPERIENCE Test',function()
	  		       		  		    {

	  		       		  		    	describe('Valid EXPERIENCE INFO',function()
	  		       		  		    	{
  		    		   		  		    	it('Title info',function()
  		    		   		  		    	{
  		    		   		  		    		// expect(true).toBe(false,"Not Completed Yet");
  		    									// doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
  		    									element(by.css('.modal-backdrop.active input')).sendKeys("Guru Guy");
  		    		   		  		    	});
	  		    	   		  		    	it('[No Working For now] Year of Experience',function()
	  		    	   		  		    	{
	  		    
		    								    browser.actions()
		    								      .mouseMove(element(by.css('.modal-backdrop.active input')), {x: 100, y: 0})
		    								      .click()
		    								      .perform();    
  		    								    // dragAndDrop(element(by.css('.modal-backdrop.active input')), {x: 200, y: 0}).
  		    								    // perform();
	  		    	   		  		    	});
	  		    	   		  		    	it('Role Description',function()
	  		    	   		  		    	{
	  		    	   		  		    		//expect(true).toBe(false,"Not Completed Yet");
	  		    								element.all(by.css('.input-outline')).last().sendKeys("TEST TEST");

	  		    	   		  		    	});
	  		    	   		  		    	it('Save info',function()
	  		    	   		  		    	{
	  		    								element(by.css('.modal-backdrop.active button')).click()
	  		    	   		  		    	});
		  		    	   		  		    it('Check Experience Is Saved',function()
	                                        {
	                                            doc.checkMsg('saved!');
	                                        });
	  		       		  		    	});	  		 
	  		       		  		    });
	  		       		  		    break;		
  		       		  		}
					});

				});
				
	        })(i,groupName[i],groupButton[i]);
		}
		
	});

});
