describe('Workflow : Course page', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	it('Pick a Course',function()
	{
		browser.wait(EC.visibilityOf(element(by.id('courses-list'))),20000);
	    doc.newPickList('courses-list');
	});
	it('Next page',function()
	{
		nextStep.then(function(items)
			{
				items[1].click();
			});
	});

});