describe('@Workflow : onboarding', function () {
	for (var i = 0 ; i< 4 ; ++i)
	{
        (function(index) {
	        describe('Slide Page#'+index,function()
	        {
	        	var count = 0;
	        
	        	it('Check a onboarding Title',function()
	        	{
	        		expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	        	});
    			it('Slide to the Next Page',function()
    			{
    				doc.slideView(i,'left');
    			});

    		});
        })(i);
	}
});