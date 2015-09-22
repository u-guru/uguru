describe('@Lazy Skip', function () {
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	it ('Open The Request',function()
	{
		guruButton.click();

	});
	it('Slide 1',function()
	{
		doc.slideView(2,'left');
	});
	it('Slide 2',function()
	{
		doc.slideView(3,'left');
	});
	it('Slide 3',function()
	{
		doc.slideView(4,'left');
	});
});