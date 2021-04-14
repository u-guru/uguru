describe('User Workflow Test : University Scroll + Check there is duplicated #school-list',function()
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

     describe('@Workflow : Pass Access Page', function () {
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
		});
       describe("Infinity scroll test for school-list",function()
		{

			for(var i = 8; i < 36; i+=8)
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
      	 it("Sekect a first university",function()
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
