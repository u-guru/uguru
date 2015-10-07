describe('#Error Test Flow : Check BecomeGuru Button',function()
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


	})
	// describe("@Workflow : Log in", function()
	// {
	// 	it('Open Login button',function()
	// 	{
	// 		sidebar.OpenLoginModal();
	// 	});

	// 	it('Enter Email : ',function()
	// 	{
	// 		account.enterEmail('jason@sjsu.edu');
	// 	});

	// 	it('Enter Password : ',function()
	// 	{
	// 		account.enterPassword('test');
	// 	});

	// 	it('Login account',function()
	// 	{
	// 	    account.LoginAccount();
	// 	});
	// });
	describe("Check ", function()
	{
	
		it('Close side menu',function()
		{
			var ele = element(by.css('.view-container'));
			ele.getLocation().then(function(value)
			{
				console.log('Location : ',value);
			});
		});
		it('Check ',function()
		{
			var ele = element(by.css('.view-container'));
			//for(var x = 0 , var y = 0 ; ;)
			var x = 0; 
			var y =0;
			var stop = false;
			do
			{
				doc.clickCanvas(ele,x,y);
				ele.getLocation().then(function(value)
				{
					if(value.x == 0)
					{
						console.log('X : ',x ,'Y : ', y);
					}
				});
				++x;
				++y;
			} while (stop == false||x != 1000);

		});
	});
});
