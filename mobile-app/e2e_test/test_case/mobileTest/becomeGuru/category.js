var CategoryName = ['Academic Courses','Freelancing','Baking','Photography','Household','Technology & IT','Sports & Muscle','On-demand Delivery']
var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));

describe('Category Test', function () {
	// beforeAll(function()
	// {
	// 	if(browser.getCurrentUrl() != "http://"+localhost+":8100/#/home")
	// 	{

	// 		browser.get("http://"+localhost+":8100/#/become-guru");
	// 	}
	// });
	// it("skip to Category",function()
	// {
	// 	nextStep.then(function(items)
	// 	{
	// 		console.log("LEngth : " + items.length)
	// 		items[0].click();
	// 	});
	// });
	// it("skip to Category",function()
	// {
	// 	nextStep.then(function(items)
	// 	{
	// 		items[1].click();
	// 	});
	// });
	//don't wanna delete course
	for (var i = 1 ; i< 8 ; ++i)
	{
        (function(index,title) {
	        describe('Click the Category #'+index,function()
	        {
	        	var count = 0;
	        	it('Check a Category Title Back To DeFault',function()
	        	{
	        		browser.wait(EC.visibilityOf(element(by.binding('category.name'))),1000);
	        		expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	        	});
        		it('Open a Category',function()
				{
					doc.newPickList('skills-list',index);
				});
        		it('Check Category Title : '+title ,function()
        		{
        			expect(element(by.binding('category.name')).getText()).toBe(title.toUpperCase());

        		})

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
								if(index != 0)
									{
					        			items[i].click();
					        			if (index===0)
					        			{
		        							doc.switchAlert();	
					        			}
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
        })(i,CategoryName[i]);
	}

	it('Slide to Next Page',function()
	{
		//doc.slideView(2,'left');
		nextStep.then(function(items)
		{
			expect(items[2].getText()).toBe("PHOTO");
			items[2].click();
		});
	});

});