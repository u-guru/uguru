describe('Payment Spec',function () 
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

		describe("Adding Payment Card - 1",function()
		{
			it("+ Add new card",function()
			{
				$('#cta-box-payments').click();
				browser.wait(EC.visibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			})
			it('Confirm the payment',function()
			{
				$('[ng-click="savePayment()"]').click()

			});
			it("Check Payment has been closed",function()
			{
				browser.wait(EC.invisibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			});
		});

		describe("Adding Payment Card - 2",function()
		{
			it("+ Add new card",function()
			{
				$('#cta-box-payments').click();
				browser.wait(EC.visibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			})
			it('Confirm the payment',function()
			{
				$('[ng-click="savePayment()"]').click()

			});
			it("Check Payment has been closed",function()
			{
				browser.wait(EC.invisibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			});

			it('check 2 cards are in the list',function()
			{
				expect($$('[ng-repeat="card in user.transfer_cards"]').count()).toBe(2);
			});
		});

		describe("Set #2Card to default",function()
		{
			it("Set card",function()
			{
				$$('[ng-click="editPayment(card)"]').get(1).click();
				browser.wait(EC.visibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			})
			it('Confirm the payment card has buttons : Edit Default & Delete',function()
			{
				expect($('[ng-click="setDefaultTransfer()"]').getText()).toContain('SET DEFAULT')
				expect($('[ng-click="removeCard()"]').getText()).toContain('DELETE')
			});
			it('Set Card#2 to default',function()
			{
				$('[ng-click="setDefaultTransfer()"]').click()
			})
			it("Check Card#2  has been closed and set to default",function()
			{
				browser.wait(EC.invisibilityOf($('.desktop-forms-container .relative.full-x')),3000);
				expect($$('[ng-repeat="card in user.transfer_cards"]').count()).toBe(2);
				expect($$('[ng-repeat="card in user.transfer_cards"]').get(1).$('h3').isPresent()).toBe(true);
			});
		});

		describe("Delete #1Card",function()
		{
			it("+ Edit card",function()
			{
				$$('[ng-click="editPayment(card)"]').get(0).click();
				browser.wait(EC.visibilityOf($('.desktop-forms-container .relative.full-x')),3000);
			})
			it('Confirm the payment card has buttons : Edit Default & Delete',function()
			{
				expect($('[ng-click="setDefaultTransfer()"]').getText()).toContain('SET DEFAULT')
				expect($('[ng-click="removeCard()"]').getText()).toContain('DELETE')
			});
			it('Set Card#2 to default',function()
			{
				$('[ng-click="removeCard()"]').click()
			})
			it("Check Card#1  has been removed",function()
			{
				browser.wait(EC.invisibilityOf($('.desktop-forms-container .relative.full-x')),3000);
				expect($$('[ng-repeat="card in user.transfer_cards"]').count()).toBe(1);
				expect($$('[ng-repeat="card in user.transfer_cards"]').get(0).$('h3').isPresent()).toBe(true);
			});
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