describe('Category Test', function () {
	
	for (var i = 0 ; i< 8 ; ++i)
	{
        (function(index) {
	        describe('Click the Category #'+index,function()
	        {
	        	var count = 0;
	        	it('Check a Category Title',function()
	        	{
	        		expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	        	});
        		it('Open a Category',function()
				{
					doc.newPickList('skills-list',index);
				});
				it('Check element exist',function()
				{
					expect(element.all(by.repeater('skill in active_category.skills')).first().isDisplayed()).toBe(true);

				});
				it('click element ',function()
				{
			        	element.all(by.repeater('skill in active_category.skills')).then(function (items)
			        	{
			        		for (var i = 0 ; i<items.length ; ++i)
			        		{
			        			items[i].click();
			        			if (index===0)
			        			{
        							doc.switchAlert();	
			        			}
			        			++ count
			        		}
			        	});	

				});

        		it('close a Category',function()
        		{
        			var ele = element(by.css(".modal-backdrop.active"));
        			var clickCanvas = function (toRight, toBottom) { 
					    browser.actions()
					      .mouseMove(ele, {x: toRight, y: toBottom})
					      .click()
					      .perform();
					};
					clickCanvas (100,50)
        		})
        		// check which index
        		it('check select',function()
        		{
			     // element.all(by.css(str)).then(function (items) {

        			element.all(by.binding('category.active_skills_count')).then(function(items)
        			{
	        			expect(items[index*2].getText()).toContain(count);

        			});
        		});
			});
        })(i);
	}


});