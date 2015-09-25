describe('@Workflow : Course page', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));
	

	// describe('Check Search Results',function()
	// {
	// 	it('send a key',function()
	// 	{
	//     	doc.setInput('c',1);
	// 	});
	// 	it('Check the Search result is not empty',function()
	// 	{
	// 		element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
	//     		expect(items.length).not.toBe(0,"no Search result found");
	//     	});
	// 	});
	// 	it('clear a key',function()
	// 	{	
	// 		 element.all(by.tagName("input")).then(function(items)
	// 		 	{
	// 		 		items[1].clear();
	// 		 	});
	// 	});

	// });
	describe('Check Data & Go Next Section',function()
	{
		// it('check the course',function()
		// {
		// 	element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
		// 		expect(items.length).not.toBe(0,"no Search result found");
		// 	});
		// });
		// it('Pick a Course',function()
		// {
		// 	browser.wait(EC.visibilityOf(element(by.id('courses-list'))),20000);
		//     doc.newPickList('courses-list',3);
		//     doc.newPickList('courses-list',4);
		//     doc.newPickList('courses-list',5);

		// });
		it('Next page',function()
		{
			nextStep.then(function(items)
				{
					items[1].click();
				});
		});
	});
	

});