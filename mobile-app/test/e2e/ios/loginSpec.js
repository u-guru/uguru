describe('Log in an account',function()
	{
		it('Active Accout',function()
		{
			$('[ng-click="goToLoginFromAccess()"]').click();
		});

		it('Enter email : jason@sjsu.edu',function()
		{
    	    account.enterEmail('jason@sjsu.edu');
		});

		it('Enter password : test',function()
		{
	        account.enterPassword('test');
		});

		it('Log in ',function()
		{
			$('[ng-click="loginUser()"]').click();
			doc.checkMsg('Login Successful!');
		});
	});