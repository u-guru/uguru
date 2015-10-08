describe('#Error Test Flow : Check Facebook button at Sidebar',function()
{

		afterAll(function()
	   {
	       doc.ResetAll();
	   });

    describe('@Workflow : access page', function () {

		 it('Send key : cool',function()
          {
                access.EnterAccessCode('cool');
          });

          it('Press enter',function()
          {
                access.RedeemClick();
          });

          it('Check page changed & check message show : Access Granted',function()
          {
              access.CheckMessage('cool');
          });
    });

    describe('@Workflow : University page', function () {
     	//browser.driver.get("http://localhost:8100/#/university");

    	it("choose a university",function()
    	{
    		// doc.newPickList('school-list');
    		university.SelectSchool(0);
    	});
 
    	
    });
    describe('@Workflow : Home page', function () {

    	describe('Welcome uguru logo pop',function()
    	{
    		it('Check welcome logo pop up ',function()
    		{
    			home.CheckPopUpIsShown()
    		});

    		it('Close welcome logo',function()
    		{
    			home.CloseThePopUp();
    		});	
    	});

    });
	describe('@Workflow : Sidebar page', function () {

		it('Open sidebar ',function()
		{
			sidebar.ToggleSideMenu('on');
		});	

		it('Open Signup button',function()
		{
			sidebar.OpenSignUpModal();
		});
	})
	describe("Check Facebook is disabled", function()
	{
		var str =['name','email','password']

		for( i = 0; i < 3; ++ i)
		{
	        (function(index) {
	        	describe("Input: "+ str[index],function()
				{
	        		it('Enter A key on : ' + str[index],function()
					{
						if(index=== 0)
							account.enterName('jason');
						else if (index === 1)
							account.enterEmail('d');
						else if (index === 2)
							account.enterPassword('test');
					});

					it('Check Facebook is hidden',function()
					{
						account.checkFacebookIsDisplayed(false);
					});

					it('Clear word',function()
					{
						if(index=== 0)
							account.clearName();
						else if (index === 1)
							account.clearEmail();
						else if (index === 2)
							account.clearPassword();
					});

					it('Check Facebook is back and showed',function()
					{
						account.checkFacebookIsDisplayed(true);
					});
				});
	        })(i);
	    }
	});
});
