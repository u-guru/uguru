describe('Referral Spec',function () 
{
	describe('Referral Test',function()
	{
      	var setting = $('#top-settings');

		describe('Activated Referral',function()
		{
			it('Active Referral',function(){
				$('[ng-click="referralsModal.show()"]').click();

			});	
			it('Check Referral page is opened',function()
			{
					browser.wait(EC.visibilityOf($('.modal-backdrop.active')),4000);
			});
		});

		describe('Referral People',function()
		{
			it('Check Example message',function()
			{
				expect($('[ng-if="!user.referred_users || !user.referred_users.length"] strong').getText()).toContain('EXAMPLE');
			});
			it('Does Referral code exist',function()
			{
				var code = $$('.modal-backdrop.active h1').get(0);
				expect(code.isPresent()).toBe(true,"Code is not present");
				expect(code.isDisplayed()).toBe(true,"Code is not displayed");
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
			$('.modal-backdrop.active a').click()
			browser.wait(EC.stalenessOf($('.modal-backdrop.active')),4000);

		});
	});
})