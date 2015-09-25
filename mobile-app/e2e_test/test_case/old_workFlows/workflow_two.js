var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));
describe('Workflow Test : Two', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));

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
		browser.wait(EC.presenceOf(msg),3000);
		msg.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Your card has been successfully added");
		});		
	});

	it("Make sure the default card is still the first one",function()
	{
 		var first = element.all(by.repeater('payment_card in user.payment_cards')).first();
 		var check = first.element(by.css('.icon.ion-checkmark'));
 		expect(check.isDisplayed()).toBeTruthy;


	});

	it("Edit the new card, try to set it to default",function()
	{
		var latest = element.all(by.repeater('payment_card in user.payment_cards')).last();
 		latest.click().then(function()
 		{
			expect(element(by.id("E2E-payment-addPayment")).isDisplayed()).toBeTruthy();
			
			element(by.css('[ng-click="paymentCardActionSheetOptions()"]')).click().then(function()
			{
					element.all(by.repeater('b in buttons')).count().then(function (count)
					{
						expect(count).toBe(2);
			      	});
			      	element.all(by.repeater('b in buttons')).then(function (buttons)
					{
						buttons[1].click();
			      	});
			      	 var alertDialog = browser.switchTo().alert();

					expect(alertDialog.getText()).toEqual("Card Default Set!"); 

         			 alertDialog.accept();  // Use to accept (simulate clicking ok)
   			});
 		});


	});

	it("After you go back or save, make sure the first one doesn't have a green check in the view",function()
		{
		    expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home");
		    var latest = element.all(by.repeater('payment_card in user.payment_cards')).last();
 			var check = latest.element(by.css('.icon.ion-checkmark'));
 			expect(check.isDisplayed()).toBeTruthy;
		});
});