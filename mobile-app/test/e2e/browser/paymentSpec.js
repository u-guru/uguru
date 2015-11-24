describe('Referral Spec',function () 
{
	// describe('Log in an account',function()
	// {
	// 	it('Active Accout',function()
	// 	{
	// 		$('[ng-click="goToLoginFromAccess()"]').click();
	// 	});

	// 	it('Enter email : jason@sjsu.edu',function()
	// 	{
 //    	    account.enterEmail('jason@sjsu.edu');
	// 	});

	// 	it('Enter password : test',function()
	// 	{
	//         account.enterPassword('test');
	// 	});

	// 	it('Log in ',function()
	// 	{
	// 		$('[ng-click="loginUser()"]').click();
	// 		doc.checkMsg('Login Successful!');
	// 	});
	// });

	describe('Payment Test',function()
	{
		it('Active payment page',function()
		{
			$('#cta-box-balance a').click();
			browser.wait(EC.visibilityOf($('#desktop-balance')),4000);
		});
		describe('Payment hisotry',function()
		{
			it('There is a message, when payment hisotry',function()
			{
				$$("[ng-repeat='transaction in user.guru_transactions]").count().then(function(counts)
				{
					if(counts == 0)
					{
						expect(true).toBe(false,"Need the ele #id to show a message");
					}
				})
			})
		});
		describe('Cash out',function()
		{
			it('Check Cashout is not displayed when 0 balance',function()
			{
				$('#balance-total span').getText().then(function(value)
				{
					if(value == '$0')
						expect($('.bg-moola').isPresent()).toBe(false,"Button Cashout should be hidden")
				});
			})
		});
	})
	it('Close Referral',function()
	{
		$('#desktop-balance .cta-modal-close.close-button.desktop-header-next').click()
		browser.wait(EC.invisibilityOf($('#desktop-balance')),4000);

	});
})