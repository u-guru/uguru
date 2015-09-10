describe('Major Test', function () {
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));
	var nextStep = element(by.css('[ng-click="nextSlide()"]'));

	afterEach(function()
	{
		doc.checkLists("major-list","major.name")
	});
	it ('Open The Request',function()
	{
		guruButton.click();
	});
	it ('Send A key',function()
	{
		doc.setInput('b',2);
	});

	describe('delete a major and see it back to list',function()
	{

		it('Pick a Major',function()
		{
			doc.newPickList('major-list');
		});
		it('delete a major',function()
		{
			doc.newPickList('major-list');
			doc.switchAlert();
		});
		it('check delete',function()
		{

		});
	});

});