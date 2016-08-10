describe('@Workflow : category page', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var skillPage = element (by.id('skill'));

	it('Next page',function()
	{
		browser.wait(EC.visibilityOf(skillPage),20000);
		nextStep.then(function(items)
			{
				items[2].click();
			});
	});
});