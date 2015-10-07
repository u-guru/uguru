describe('#Error Test Flow : Check Facebook button at Sidebar',function()
{

	beforeAll(function()
	{
        // browser.get("http://localhost:8100/#/");
            browser.refresh();
        // if(startButton.isPresent() === false)
            browser.get("http://"+localhost+":8100/#/home");
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
