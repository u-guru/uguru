describe('Workflow : Major page', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	it ('Open The Request',function()
	{
		guruButton.click();
	});
	it('Pick a Major',function()
	{
		doc.newPickList('major-list');
	});
	it('Next page',function()
	{
			nextStep.then(function(items)
			{
				items[0].click();
			});
	});
});