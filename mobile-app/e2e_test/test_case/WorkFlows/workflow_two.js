describe('Workflow Test : Two', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));
	var msg = element(by.id('E2E-msg'));
	var load= element(by.id('E2E-spinner'))
	var profile = element(by.css('[ng-click="setSettingsToIndex(1)"]'));
	var editcard = element(by.css('[ng-click="setSettingsToIndex(3)"]'));
	var addCreditCard = element(by.css('[ng-click="goToPaymentsFromSideBar()"]'));
	var id = "4242424242424242";
	var date = "0915";
	var cardcount = 0; 

	it(" Student adds a card",function()
	{
		editcard.click();
	 	addCreditCard.click().then(function()
	 		{
 			    expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/payments");
				element(by.id('card-input')).sendKeys("4242424242424242");
				element(by.id('expiry-input')).sendKeys("0915");
	 		});
      
		// protractor.get.doneButton.click().then(function()
		element.all(by.id('done-button')).first().click();
		browser.sleep(2000);
		msg.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Your card has been successfully added");
		});		
	});

	it("Student goes to home",function()
	{
		element(by.id("E2E-closeBar")).click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home");
	});

	it("Verify that the card has been added",function()
	{
		var count = 0; 
		protractor.get.settingButton.click();
		element.all(by.repeater('payment_card in user.payment_cards')).count().then(function (count) {
			cardcount = count;
          expect(count).not.toBe(0);
      	});
	});
	it("Verify that the card has been set to default (the green check is showing)",function()
	{
		var rows = element.all(by.repeater('payment_card in user.payment_cards'));

			expect(rows.first().element(by.css('ng-show="payment_card.is_default_payment"')).isDisplayed()).toBeTruthy();
		
	});
	it("Click the item & try to edit",function()
	{
		element.all(by.repeater('payment_card in user.payment_cards')).then(function (cards)
		{
			cards[0].click();
      	});
	});
	it(" Check the top says 'Edit Payment'",function()
	{
		expect(element(by.id("E2E-payment-addPayment")).isDisplayed()).toBeTruthy();
	});
	it("  Make sure 'set to default' isn't an option (since there is one card)",function()
	{
		element(by.css('[ng-click="paymentCardActionSheetOptions()"]')).click().then(function()
			{
					element.all(by.repeater('b in buttons')).count().then(function (count)
					{
						expect(count).toBe(1);
			      	});
			});

	});
	it(" Student adds a card",function()
	{
		browser.refresh().then(function()
		{
			brower.refresh();
			sleep(800);
			browser.protractor.settingButton();
			editcard.click();
			addCreditCard.click().then(function()
			{
				expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/payments");
				element(by.id('card-input')).sendKeys("4242424242424242");
				element(by.id('expiry-input')).sendKeys("0915");
			});

			// protractor.get.doneButton.click().then(function()
			element.all(by.id('done-button')).first().click();
			browser.sleep(2000);
			msg.getAttribute('value').then(function(value)
			{
				expect(value).toBe("Your card has been successfully added");
			});		
		});

	});

});