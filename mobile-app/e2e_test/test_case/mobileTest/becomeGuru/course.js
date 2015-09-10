describe('Course Test', function () {
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));
	
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
	it('Pick a Major',function()
	{
		
	});
});