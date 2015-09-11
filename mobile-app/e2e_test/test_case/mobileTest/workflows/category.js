describe('Workflow : category page', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	it('Next page',function()
	{
		nextStep.then(function(items)
			{
				items[2].click();
			});
	});

});