describe('@Workflow : Major page', function () {
	var nextStep = element(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));


	it ('Open The Request',function()
	{
		guruButton.isPresent().then(function(result)
		{
			console.log("test"+result);
			if(result)
				guruButton.click();

		})
	});
	it('check Data repeating',function()
	{
		doc.checkLists('major-list','major.name');
	});
	describe('Check Search Results',function()
	{
		it('send a key',function()
		{
	    	doc.setInput('b',0);

		});
		it('Check the Search result is not empty',function()
		{
			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).not.toBe(0,"no Search result found");
	    	});
		});
		it('clear a key',function()
		{	
			 element(by.tagName("input")).clear();
		});

	});
	describe('Check Data & Go Next Section',function()
	{
		it('check the course',function()
		{
			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
				expect(items.length).not.toBe(0,"no Search result found");
			});
		});
		it('Pick a Course',function()
		{
			browser.wait(EC.visibilityOf(element(by.id('major-list'))),20000);
		    doc.newPickList('major-list',5);
		});
		it('Next page',function()
		{
			nextStep.click();
			// nextStep.then(function(items)
			// 	{
			// 		items[1].click();
			// 	});
		});
	});







	// it('Pick a Major',function()
	// {
	// 	doc.newPickList('major-list');
	// });
	// it('Next page',function()
	// {
	// 	nextStep.click();
		
	// 		// nextStep.then(function(items)
	// 		// {
	// 		// 	console.log(items.length());
	// 		// 	items[0].click();
	// 		// });
	// });
});