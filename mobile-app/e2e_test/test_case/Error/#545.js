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
var EC = protractor.ExpectedConditions;

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
			browser.wait(EC.presenceOf	(msg),5000);
			msg.getAttribute('value').then(function(value)
			{
				expect(value).toBe("Your card has been successfully added");
			});		
		});
	it(" Student adds a card",function()
		{
			editcard.click();
		 	addCreditCard.click().then(function()
		 		{
	 			    expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/payments");
	 			    browser.sleep(5000);
					element(by.id('card-input')).sendKeys("4242424242424242");
					element(by.id('expiry-input')).sendKeys("0915");
		 		});
	      
			// protractor.get.doneButton.click().then(function()
			element.all(by.id('done-button')).first().click();
			browser.wait(EC.presenceOf	(msg),5000);
			browser.sleep(15000)

			msg.getAttribute('value').then(function(value)
			{
				expect(value).toBe("Your card has been successfully added");
			});		
		});

});