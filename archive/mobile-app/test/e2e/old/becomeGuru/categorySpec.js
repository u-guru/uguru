var CategoryName = ['Academic Courses','Freelancing','Baking','Photography','Household','Technology & IT','Sports & Muscle','On-demand Delivery']
var Category = require('./categoryPageObject.js');

describe('Category Test', function () {
	var category = new Category();
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
	        describe('Click the category #'+index,function()
	        {
	        	var count = 0;
	        	it('Check category title back To DeFault Name',function()
	        	{
	        		category.CheckTitleIsMatch("SELECT CATEGORY")
	        	});
        		it('Open a Category',function()
				{
					category.SelectSkill(index);
				});
        		it('Check Category Title : '+title ,function()
        		{
        			category.CheckTitleIsMatch(title.toUpperCase());
        		})

				it('Check element exist',function()
				{
					category.SkillIsExist();
				});
				it('click all the skills ',function()
				{
			        category.EnableAllSKills(index);
			        ++count;
				});

        		it('close a Category',function()
        		{
					category.clickCanvas (100,50)
        		})
        		// check which index
        		it('check select',function()
        		{
			     // element.all(by.css(str)).then(function (items) {
			     	category.CountSelectSKill(count,index);
        		});
			});
        })(i,CategoryName[i]);
	}

	it('Slide to Next Page',function()
	{
		category.GoToPhotoPage();
	});

});