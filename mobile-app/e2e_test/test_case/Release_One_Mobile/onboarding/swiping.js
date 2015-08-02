 describe('Can it slide well ?',function()
 {
	var onboarding_one = element(by.id('E2E-onboarding-1'));
	var onboarding_two = element(by.id('E2E-onboarding-2'));
     it('slide right side?', function () 
     {

		 browser.actions()
		.mouseDown(onboarding_one)
		.mouseMove(onboarding_two)
		.mouseUp()
		.perform();
		// expect(onboarding_one.isDisplayed()).not.toBeTruthy();
    });
 });