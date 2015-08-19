
describe('Team Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    var height ;
	it("Go Homepage",function()
		{
			dv.get('http://staging.uguru.me/team/');
			dv.findElement(by.css('.center.no-margin.no-padding')).getLocation().then(function(location)
				{
					height = location.y;
				});

		}); 
	it("Check Location: 912*1036 (default test)",function()
	{
		  dv.manage().window().getSize().then(function(windowObj)
		  {
  			console.log("Window "+windowObj.width,windowObj.height);

		  })
		// 		         
		dv.findElements(by.css('.center.no-margin.no-padding')).then(function(elements)
			{
				var length = elements.length;
				var person = 0;
				var temp =0;
				for (var i = 0; i< length; ++i)
				{
					var person = i;
					
					temp = elements[i].getLocation().then(function(location)
					{
						return location.y;
					});
					expect(temp).toBe(height, 'on Person '+ person);
				}
			});
	}); 
	
	// it("Check Location: 912*1036 (default test)",function()
	// {
	// 	  dv.manage().window().getSize().then(function(windowObj)
	// 	  {
 //  			console.log("Window "+windowObj.width,windowObj.height);

	// 	  })
	// 	// 		         
	// 	dv.findElements(by.css('.center.no-margin.no-padding')).then(function(elements)
	// 		{
	// 			var length = elements.length;
	// 			var person = 0;
	// 			var temp =0;
	// 			for (var i = 0; i< length; ++i)
	// 			{
	// 				var person = i;
					
	// 				temp = elements[i].getLocation().then(function(location)
	// 				{
	// 					return location.y;
	// 				});
	// 				expect(temp).toBe(height, 'on Person '+ person);
	// 			}
	// 		});
	// }); 


});