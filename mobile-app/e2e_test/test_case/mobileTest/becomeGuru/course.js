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

	// describe('check select results',function(){
	// 	it('check match number of selected ',function()
	// 	{
	// 		element(by.binding('user.guru_courses.length')).getText().then(function(text){
	// 			expect(text).toContain(count);
	// 		});
	// 	});
	// })
	
	
	describe('Check Search Results',function()
	{
		it('send a key',function()
		{
	    	doc.setInput('b',3.0);

		});
		it('Check the Search result is not empty',function()
		{
			element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).not.toBe(0,"no Search result found");
	    	});
		});
		it('clear a key',function()
		{
			 element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[3].clear();
	      	});
		});

	});
	describe('Check Chosen Course is showing',function()
	{
		it('choose an element',function()
		{	
			browser.wait(EC.visibilityOf(element(by.id('courses-list'))),20000);

		    doc.newPickList('courses-list');

		});
		it('check Choosen is displayed',function()
		{		
			expect(element(by.repeater('course in user.guru_courses')).isDisplayed()).toBe(true);

		})
	})

	describe('delete a courses and see it back to list',function()
	{
		var elements =  element.all(by.css('#courses-list li:not(.ng-hide)'))
		it('Pick a couse',function()
		{

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