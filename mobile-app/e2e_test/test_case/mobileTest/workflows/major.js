describe('Workflow : Major page', function () {
	var nextStep = element(by.css('[ng-click="nextSlide()"]'));
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
		nextStep.click();
		
			// nextStep.then(function(items)
			// {
			// 	console.log(items.length());
			// 	items[0].click();
			// });
	});
});