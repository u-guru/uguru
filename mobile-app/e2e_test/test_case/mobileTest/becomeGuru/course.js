describe('Course Test', function () {
	
	// afterEach(function()
	// {
	// 	doc.checkLists("courses-list","course.short_name")
	// });
	// describe("check data",function()
	// {
	// 	it("check repeating data",function()
	// 	{
	// 	 	doc.checkLists("courses-list","course.short_name")
	// 	});
	// })
	describe('Check Chosen Course is showing',function()
	{
		it('choose an element',function()
		{	
		    doc.newPickList('courses-list');

		});
		it('check Choosen is displayed',function()
		{		
			expect(element(by.repeater('course in user.guru_courses')).isDisplayed()).toBe(true);

		})
	})

	describe('delete a major and see it back to list',function()
	{
		var elements =  element.all(by.css('#courses-list li:not(.ng-hide)'))
		it('Pick a couse',function()
		{
	    	doc.setInput('b',3.0);
			 element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[3].clear();
	      	});
		    doc.newPickList('courses-list');
		    elements.then(function(items)
		    	{
		    		console.log(items.length);
		    	});
		});
		it('delete a major',function()
		{
			doc.newPickList('courses-list',0);
			doc.switchAlert();
		});
		it('check delete',function()
		{
			var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
			browser.wait(EC.presenceOf(newMsg),5000);
			newMsg.getAttribute('value').then(function(value)
			{
			  expect(value).toContain('successfully removed');
			}); 
		});
		it('check list increase',function()
		{
		    element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
	    	    expect(items.length).toBe(40);
		    });
		});
	});



});