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
		 element.all(by.tagName("input")).then(function(inputs)
      	{
      		inputs[2].clear();
      	});
	});

	describe('delete a major and see it back to list',function()
	{
		it('Pick a Major',function()
		{
		    doc.newPickList('major-list');
		});
		it('delete a major',function()
		{
			doc.newPickList('major-list',0);
			doc.switchAlert();
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
		    element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
		        expect(items.length).toBe(10);
		    });
		});
	});
	describe('delete 1 major and see other major is gone too',function()
	{
		var count = 5;
		it('Pick 5 Major',function()
		{
		    doc.newPickList('major-list',0);
		    doc.newPickList('major-list',1);
		    doc.newPickList('major-list',2);
	        doc.newPickList('major-list',3);
		    doc.newPickList('major-list',4);
		});
		it('delete a major',function()
		{
			doc.newPickList('major-list',1);
			doc.switchAlert();
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
		it('check reminding list',function()
		{
			element.all(by.repeater('major in user.majors')).then(function (items) {
		        expect(items.length).toBe(4);
		    });
		});
	});

});