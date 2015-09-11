describe('Category Test', function () {
	
	for (var i = 0 ; i< 8 ; ++i)
	{
        (function(index) {
	        describe('Click the Category #'+index,function()
	        {
	        	var count = 0;
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
        		// it('check select',function()
        		// {
        		// 	element(by.binding('category.active_skills_count')).getAttribute('value').then(function(text)
        		// 	{
	        	// 		expect(count).toBe(text);
        		// 	});
        		// });
			});
        })(i);
	}


});