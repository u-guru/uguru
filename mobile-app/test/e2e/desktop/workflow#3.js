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
    		side.ToggleSideMenu('on');
    	});
      //       describe('TERM',function()
      //       {                   
      //               it('Open TERM',function()
      //               {
      //                   // sidebar.OpenFAQModal();
      //                   side.OpenSibarItem('TERM');
      //               });
      //              it('check element is visialbe',function()
      //               {
      //                   side.isModalActive(); 
      //               })
      //               it('Close TERM',function()
      //               {
      //                   side.CloseTheModal();
      //               });
      //       });
    		// describe('FAQ',function()
    		// {    		    	
    		//     	it('Open FAQ',function()
    		//     	{
    		//     		// sidebar.OpenFAQModal();
      //                   side.OpenSibarItem('FAQ');
    		//     	});
		    //        it('check element is visialbe',function()
      //               {
      //                   side.isModalActive(); 
      //               })
    	 //    		it('Close FAQ',function()
    	 //    		{
    	 //    			side.CloseTheModal();
    	 //    		});
    		// });
    		// describe('SUPPORT',function()
    		// {    		  
    	 //    	  	it('Open SUPPORT',function()
    		//     	{
    		//     		// sidebar.OpenSupportModal();
      //                   side.OpenSibarItem('support');

    		//     	});
    		//     	it('check element is visialbe',function()
    		//     	{
    		//                         side.isModalActive(); 
    		//     	})
    	 //    		it('Close SUPPORT',function()
    	 //    		{
    	 //    			side.CloseTheModal();
    	 //    		});
    		// });
      //       describe('Signup',function()
      //       {             
      //               it('Open Signup',function()
      //               {
      //                   // sidebar.OpenSupportModal();
      //                   side.OpenSibarItem('signup');

      //               });
      //               it('check element is visialbe',function()
      //               {
      //                   side.isModalActive();

      //               })
      //               it('Close signup',function()
      //               {
      //                   side.CloseTheModal();
      //               });
      //       });

            describe('Login',function()
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
                  it('Open setting',function()
                  {
                      // sidebar.OpenSupportModal();
                      side.OpenSibarItem('settings');
                  });
                  describe("Check popup in account information",function()
                  {
                        it('Open Account infor',function()
                        {
                            // sidebar.OpenSupportModal();
                            side.OpenActionSheet('Account Information');
                        });                
                        it('Open popup',function()
                        {
                            side.OpenActionSheet('edit name');
                        })
                        it('Edit Name',function()
                        {
                            side.setPopValue('name',"HEHHE HHEHEH");
                        });
                        it('close popup',function()
                        {
                            side.closePopup();
                        });
                    });
            });
    });
	   
});
