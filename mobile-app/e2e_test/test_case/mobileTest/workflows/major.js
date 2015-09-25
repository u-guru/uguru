describe('@Workflow : Major page', function () {
	var nextStep = element(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	describe('Welcome uguru Pop',function()
	{
		it('Check Pop up ',function()
		{
			browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
			// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});	
		it ('Start Become Guru Process',function()
		{
			guruButton.click();

		});
	});

	describe('Check Data & Go Next Section',function()
	{
		// it('Pick a Major',function()
		// {
		// 	browser.wait(EC.visibilityOf(element(by.id('major-list'))),20000);
		//     doc.newPickList('major-list',5);
		// });
		it('Next slide',function()
		{
			nextStep.click();
		});
	});
});