describe('Referral Spec',function () 
{
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

	describe('Referral Test',function()
	{
      	var setting = $('#top-settings');

		describe('Activated Referral',function()
		{
			it('Active setting',function(){
				setting.click()
			});

			it('Active Referral',function(){
				var name = 'Referrals'
				$$('#top-menu-links li a').filter(function(elem, index) {
				  return elem.getText().then(function(text) {
				    return text.toUpperCase() === name.toUpperCase();
				  });
				}).then(function(filteredElements) {
		  		    expect( filteredElements.length).toBe(1);
		  			filteredElements[0].click()
				});
			});	
			it('Check Referral page is opened',function()
			{
				browser.wait(EC.visibilityOf($('#desktop-referrals')),4000)
			});
		});

		describe('Referral People',function()
		{
			it('Check Example message',function()
			{
				expect($('[ng-if="!user.referred_users || !user.referred_users.length"] strong').getText()).toContain('EXAMPLE');
			});

		});
		describe('Email',function()
		{
			it('Check Referral message',function()
			{
				expect(true).toBe(false);
			});
		})
		describe('Phone',function()
		{
			it('Check Referral message',function()
			{
				expect(true).toBe(false);
			});
		})
		describe('Facebook',function()
		{
			it('Check Referral message',function()
			{
				expect(true).toBe(false);
			});
		})
		describe('Twitter',function()
		{
			it('Check Referral message',function()
			{
				expect(true).toBe(false);
			});
		});
		it('Close Referral',function()
		{
			$('#cta-modal-referrals .cta-modal-close.close-button.desktop-header-next').click()
		});
	});
})