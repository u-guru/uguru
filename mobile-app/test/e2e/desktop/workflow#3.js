describe('User Workflow Test : Check Term, FAQ , Support',function()
{
	var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")
   afterEach(function()
		    {
		    	   browser.manage().logs().get('browser').then(function(browserLogs) {
		    		  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
		    	   });
		    });
    afterAll(function()
    		{
    			doc.ResetAll();
    		});

    describe('@Workflow : Pre-Student Page + Close Welcome Pop', function () {

	      	describe('Enter access code ',function()
	  			 {
					it("Enter  access code : ",function()
						{
							   access.EnterAccessCode("cool")
						});

					it('Redeem Click',function()
					{
						access.RedeemClick();
					});
					
					it("Check page changed & check message show correct",function()
					{
					   	access.CheckMessage('cool');
					});
	  			});
          it("Sekect a university",function()
          {
          	university.SelectSchool(11);
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
    describe('Sidebar',function()
    {
    	it('Open Sidebar',function()
    	{
    		sidebar.ToggleSideMenu('on');
    	});
    		describe('FAQ',function()
    		{    		    	
    		    	it('Open FAQ',function()
    		    	{
    		    		sidebar.OpenFAQModal();
    		    	});
    		  
    	    		it('Close FAQ',function()
    	    		{
    	    			sidebar.CloseModal();
    	    		});
    		});
    		describe('SUPPORT',function()
    		{    		  
    	    	  	it('Open SUPPORT',function()
    		    	{
    		    		sidebar.OpenSupportModal();
    		    	});
    		    	it('check element is visialbe',function()
    		    	{
    		    		browser.wait(EC.visibilityOf(sidebar.SubmitButton),5000);
    		    		expect(sidebar.SubmitButton.isDisplayed()).toBe(true);
    		    	})
    	    		it('Close SUPPORT',function()
    	    		{
    	    			sidebar.CloseModal();
    	    		});
    		});
    });
	
});
