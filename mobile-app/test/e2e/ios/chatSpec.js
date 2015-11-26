
describe('Message Spec',function () 
{
	describe('Message Test',function()
	{
		it('Active Message page',function()
		{
			$('[ng-click="messagesModal.show()"]').click();
			browser.wait(EC.visibilityOf($('.modal-backdrop.active')),4000);
		});
		describe('Chat hisotry',function()
		{
			it('There is a message tell usr 0 message, when every thing is empty',function()
			{
				$$("[ng-repeat='relationship in user.student_relationships]").count().then(function(counts)
				{
					if(counts == 0)
					{
						expect(true).toBe(false,"Need the ele #id to show a message");
					}
				})
			})
		});
		describe('messenger content',function()
		{
			it('There is a message tell usr 0 message, when every thing is empty',function()
			{
				$$("[ng-repeat='relationship in user.student_relationships]").count().then(function(counts)
				{
					if(counts == 0)
					{
						expect($('.message-single-status').getText()).toBe("Please began msg ","Button Cashout should be hidden")
					}
				});	
			})
		});
	})
	it('Close Referral',function()
	{
		$('[ng-click="messagesModal.hide()"]').click()
		browser.wait(EC.stalenessOf($('.modal-backdrop.active')),4000);

	});
});
