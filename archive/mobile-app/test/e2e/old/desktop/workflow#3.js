describe('User Workflow Test : Check Term, FAQ , Support, Popups is able to open',function()
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

          describe('Welcome uguru logo pop,IF FAILED PLEASE USE THE SAME MEHTOD AS OTHER POPUP SERVICE',function()
			{
				it('Check welcome logo pop up ',function()
				{
					side.waitPopUpIsShown();

				});

				it('Close welcome logo',function()
				{
					side.closePopup();
				});	
			});
    });	
    describe('Sidebar',function()
    {
    	it('Open Sidebar',function()
    	{
    		side.ToggleSideMenu('on');
    	});
            describe('TERM',function()
            {                   
                    it('Open TERM',function()
                    {
                        // sidebar.OpenFAQModal();
                        side.OpenSibarItem('TERM');
                    });
                   it('check element is visialbe',function()
                    {
                        side.isModalActive(); 
                    })
                    it('Close TERM',function()
                    {
                        side.CloseTheModal();
                    });
            });
    		describe('FAQ',function()
    		{    		    	
    		    	it('Open FAQ',function()
    		    	{
    		    		// sidebar.OpenFAQModal();
                        side.OpenSibarItem('FAQ');
    		    	});
		           it('check element is visialbe',function()
                    {
                        side.isModalActive(); 
                    })
    	    		it('Close FAQ',function()
    	    		{
    	    			side.CloseTheModal();
    	    		});
    		});
    		describe('SUPPORT',function()
    		{    		  
    	    	  	it('Open SUPPORT',function()
    		    	{
    		    		// sidebar.OpenSupportModal();
                        side.OpenSibarItem('support');

    		    	});
    		    	it('check element is visialbe',function()
    		    	{
    		                        side.isModalActive(); 
    		    	})
    	    		it('Close SUPPORT',function()
    	    		{
    	    			side.CloseTheModal();
    	    		});
    		});
            describe('Signup',function()
            {             
                    it('Open Signup',function()
                    {
                        // sidebar.OpenSupportModal();
                        side.OpenSibarItem('signup');

                    });
                    it('check element is visialbe',function()
                    {
                        side.isModalActive();

                    })
                    it('Close signup, if does not pass, THAT MEAN YOU GUYS DIDN"T USE CORRECT CSS[.header-down]',function()
                    {
                        side.CloseTheModal();
                    });
            });

            describe('Open Login and Login account',function()
            {             
                it('Open Login',function()
                {
                    // sidebar.OpenSupportModal();
                    side.OpenSibarItem('login');

                });
                it('check element is visialbe',function()
                {
                   side.isModalActive();
                })

                it('Enter Email  ',function()
                {
                    account.enterEmail('jason@sjsu.edu');
                });

                it('Enter Password : ',function()
                {
                    account.enterPassword('test');
                });

                it('Login',function()
                {
                    account.LoginAccount();
                });
                it('Toggle side on',function()
                {
                    side.ToggleSideMenu('on');

                });
            });


            describe('Setting check Pop Up',function()
            {
                 
                  describe("Check popup : name",function()
                  {
                        it('Open setting',function()
                        {
                            // sidebar.OpenSupportModal();
                            side.OpenSibarItem('settings');
                        });
                        it('Open Account infor',function()
                        {
                            // sidebar.OpenSupportModal();
                            side.OpenActionSheet('Account Information');
                        });                
                        it('Open popup',function()
                        {
                            side.OpenActionSheet('edit name');
                        })
                        it('Edit email',function()
                        {
                            side.setPopValue('name',"HEHHE HHEHEH");
                        });
                        it('close popup',function()
                        {
                            side.closePopup();
                        });
                });

                describe("Check popup : email",function()
                {
                      it('Open setting',function()
                      {
                          // sidebar.OpenSupportModal();
                          side.OpenSibarItem('settings');
                      });
                      it('Open Account infor',function()
                      {
                          // sidebar.OpenSupportModal();
                          side.OpenActionSheet('Account Information');
                      });                
                      it('Open popup',function()
                      {
                          side.OpenActionSheet('edit email');
                      })
                      it('Edit email',function()
                      {
                          side.setPopValue('email',"jason@uguru.me");
                      });
                      it('close popup',function()
                      {
                          side.closePopup();
                      });
                });

                describe("Check popup : password",function()
                {
                      it('Open setting',function()
                      {
                          // sidebar.OpenSupportModal();
                          side.OpenSibarItem('settings');
                      });
                      it('Open Account infor',function()
                      {
                          // sidebar.OpenSupportModal();
                          side.OpenActionSheet('Account Information');
                      });                
                      it('Open popup',function()
                      {
                          side.OpenActionSheet('edit password');
                      })
                      it('Edit Old',function()
                      {
                          side.setPopValue('old',"test");
                      });
                      it('Edit New',function()
                      {
                          side.setPopValue('new',"test");
                      });
                      it('close popup',function()
                      {
                          side.closePopup();
                      });
                });
        });
    });
	   
});
