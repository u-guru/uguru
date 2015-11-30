describe('Payment Spec',function () 
{
	describe('Payment Test',function()
	{
		it('Active payment page',function()
		{
			$('[ng-click="balanceModal.show()"]').click();
			browser.wait(EC.visibilityOf($('.modal-backdrop.active')),4000);
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
				$$('#balance-stats h1').get(0).getText().then(function(value)
				{
					if(value == '$0')
						expect($('[ng-click="cashoutUser()"]').isPresent()).toBe(false,"Button Cashout should be hidden")
				});
			})
		});
	})
	it('Close Payment modal',function()
	{
		$('.modal-backdrop.active a').click()
		browser.wait(EC.stalenessOf($('.modal-backdrop.active')),4000);

	});

	describe("Add Cards",function()
	{
		it('Toggle sidemenu',function()
		{
			$$('[ng-click="toggleRightSideMenu()"]').get(0).click();
		})
		it("Activate Card ")
		{

		});
	})
})