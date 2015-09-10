describe('Workflow : Major page', function () {
	var nextStep = element.all (by.css('[ng-click="nextSlide()"]')).last();
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	it ('Open The Request',function()
	{
		guruButton.click();
	});
	it('Pick a Major',function()
	{
		doc.newPickList('major in user.majors');
	});
	it('Next page',function()
	{
		nextStep.click();
	});
});