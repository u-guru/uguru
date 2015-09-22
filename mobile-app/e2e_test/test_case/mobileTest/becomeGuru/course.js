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
	// it("check the page",function()
	// {
	// 	//
	// });
	it('Current Page Title: Course',function()
	{
		expect(element(by.css('#course .third')).getText()).toContain("ADD COURSES")
	});

	it('check Data repeating',function()
	{
		doc.checkLists('course-list','course.name');
	});
	// 	describe("Infinite Scroll",function()
	// {
	// 	for( i = 8; i < 40; i+=8)
	// 	{
	// 		(function(index) {
	//       		it ('Check scrollable ',function()
	// 	 		{
	// 	 			element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
	// 		    		browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
	// 		    	});
	// 			});

	// 			it('Check more items loaded',function()
	// 			{
	// 				element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
	// 		    		expect(items.length > 10).toBe(true,"no data is loading");
	// 		    	});

	// 			});
	// 			// // Take out if take too much time
	// 			// it('check Data repeating',function()
	// 			// {
	// 			// 	doc.checkLists('major-list','major.name');
	// 			// });

	// 			it ('scroll up ',function()
	// 	 		{
	// 	 			element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
	// 		    		browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
	// 		    	});
	// 			});
	//         })(i);
	// 	}
	// });
	describe('Search Testing',function()
	{
		it('send a key : s',function()
		{
	    	doc.setInput('s',3);
		});
		it('Search result is not empty',function()
		{
			element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).not.toBe(0,"no Search result found");
	    	});
		});
		// Take out if take too much time
		// it('check Data repeating',function()
		// {
		// 	doc.checkLists('major-list','major.name');
		// });
		it('clear a key',function()
		{	
			element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[3].clear();
	      	});

		});

		describe("Send A Key : Computer, and see result is right",function()
		{
			it('send a key : art',function()
			{
		    	doc.setInput('art',3);
			});

			it("Check list is right",function()
			{
				element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
					for(var i = 0 ; i < items.length ; ++i)
		    		expect(items[i].getText()).toContain("ART");
		    	});
			});
			// it('Check Data only as  Computer Science, Computer Science and Engineering ,Linguistics and Computer Science',function()
			// {
			// 	doc.checkLists("course-list","major.name",'Computer Science',0)
			// 	doc.checkLists("course-list","major.name",'Computer Science and Engineering',1)
			// 	doc.checkLists("major-list","major.name",'Linguistics and Computer Science',2)
			// });
		});

		describe('Choose a result and see the searchbar is clear and the chosen one has checkmark.',function()
		{
			it('Choose The result',function()
			{
				browser.wait(EC.visibilityOf(element(by.id('courses-list'))),2000);
		 	    doc.newPickList('course-list',0);
			});
			it ("Search Bar is clear",function()
			{
				browser.sleep(100000)
		    	doc.setInput('',3,true);
			});
			it('Search result is clear-out and list is back',function()
			{
				element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
					for(var i = 1 ; i < items.length ; ++i)
		    		expect(items[i].getText()).toContain("ECON");
		    	});
			});
			it ('Course : "ART HIS C117D" Has been Added',function()
			{
				element.all(by.repeater('course in user.guru_courses')).then(function (items) {
			        expect(items.length).toBe(1);
					expect(items[0].getText()).toBe("ART HIS C117D");			     	
			    });				
			});
			it('clear a key [SKIP BUG]',function()
			{	
				element.all(by.tagName("input")).then(function(inputs)
		      	{
		      		inputs[3].clear();
		      	});

			});
			it ('Re type "ART HIS C117D",and see it has taken off from the list.',function()
			{

		    	doc.setInput('ART HIS C117D',3);
    			element.all(by.css('#course-list li:not(.ng-hide)')).then(function (items) {
    	    		expect(items.length).toBe(0,"Choosen Result is still in the list");
    	    	});
    	    	browser.sleep(100000)
			});
		});


	});
	// describe('Check Chosen Course is showing',function()
	// {
	// 	it('choose an element',function()
	// 	{	
	// 		browser.wait(EC.visibilityOf(element(by.id('courses-list'))),20000);

	// 	    doc.newPickList('courses-list');

	// 	});
	// 	it('check Choosen is displayed',function()
	// 	{		
	// 		expect(element(by.repeater('course in user.guru_courses')).isDisplayed()).toBe(true);

	// 	})
	// })

	// describe('delete a courses and see it back to list',function()
	// {
	// 	var elements =  element.all(by.css('#courses-list li:not(.ng-hide)'))
	// 	it('Pick a couse',function()
	// 	{
	// 	    doc.newPickList('courses-list');
	// 	    elements.then(function(items)
	// 	    	{
	// 	    		console.log(items.length);
	// 	    	});
	// 	});
	// 	it('delete a major',function()
	// 	{
	// 		doc.newPickList('courses-list',0);
	// 	});
	// 	it('Confirm Deleted',function()
	// 	{
	// 		doc.switchAlert();
	// 	});
	// 	it('check delete',function()
	// 	{
	// 		var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
	// 		browser.wait(EC.presenceOf(newMsg),5000);
	// 		newMsg.getAttribute('value').then(function(value)
	// 		{
	// 		  expect(value).toContain('successfully removed');
	// 		}); 
	// 	});
	// 	it('check list increase',function()
	// 	{
	// 	    element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
	//     	    expect(items.length).toBe(40);
	// 	    });
	// 	});
	// });

	// it('Slide to Next Page',function()
	// {
	// 	doc.slideView(3,'left');
	// });
	// it('Check Page title : Category',function()
	// {
	// 	expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	// });

});