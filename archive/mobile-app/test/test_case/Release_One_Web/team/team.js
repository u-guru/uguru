var teamPage = require('./team.po.js');

describe('Team Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    var height ;
   // var team = new teamPage();

	// beforeEach(function()
	// 	{
	// 		dv.get('http://staging.uguru.me/team/');
 //      		isAngularSite(true);
	// 	});
	beforeEach(function()
	{
		teamPage.get();
	});

	describe("Check Location: 912 x 1036 (default test)",function()
	{
		beforeAll(function()
		{
   	  	   browser.driver.manage().window().setSize(912, 1036);
		});

		it("Check Position : Profile Image",function()
		{
			// dv.findElement(by.css('.photo-container.center')).getLocation().then(function(location)
			// {
			// 	height = location.y;
			// });
			//height = teamPage.getPhotoHeight();
			height = teamPage.getElementHeight(dv.findElement(by.css('.photo-container.center')));
			var arrPoint = teamPage.getArrayLoc(dv.findElements(by.css('.photo-container.center')));

		         
			dv.findElements(by.css('.photo-container.center')).then(function(elements)
			{
				var length = elements.length;
				var person = 0;
				var temp =0;
				var x = [];
				var y = [];
					
					for (var i = 0; i< length; ++i)
					{
						var person = i;

						elements[i].getLocation().then(function(location)
						{
							// console.log(location.x, location.y);
							//temp = location.x;
							x.push(location.x);
							y.push(location.y);
						});
					}
				browser.sleep(500).then(function()
				{
					// console.log(x);
					for(var i = 0 ; i < length-1; ++i)
						expect(x[i]+100 < x[i+1] ).toBeTruthy( "Profile Image is overlay each other at Person #"+ (i+1) +" point ("+ x[i]+","+y[i]+")" );
				})
			});
		});

		it("Check Position : Name ",function()
		{
			dv.findElement(by.css('.team-member-name.white-text.center')).getLocation().then(function(location)
			{
				height = location.y;
			});
			// dv.manage().window().getSize().then(function(windowObj)
			// {
			// 	console.log("Window "+windowObj.width,windowObj.height);

			// })
			// 		         
			dv.findElements(by.css('.team-member-name.white-text.center')).then(function(elements)
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
		it("Check Position : Read More",function()
		{
			dv.findElement(by.css('.center.no-margin.no-padding')).getLocation().then(function(location)
			{
				height = location.y;
			});
         
			dv.findElements(by.css('.center.no-margin.no-padding')).then(function(elements)
			{
				var length = elements.length;
				var person = 0;
				var temp =0;
				for (var i = 0; i< length; ++i)
				{
					var person = i+1;

				temp = elements[i].getLocation().then(function(location)
				{
					return location.y;
				});
					expect(temp).toBe(height, 'on Person '+ person);
				}
			});

		});

		
	});

	// it("Check Location: 912 x 1036 (default test)",function()
	// {
	// 	dv.findElement(by.css('.center.no-margin.no-padding')).getLocation().then(function(location)
	// 	{
	// 		height = location.y;
	// 	});
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
	
	// it("Check Location: 414 × 736 (iphone 6 Plus)",function()
	// {
 //          browser.driver.manage().window().setSize(414, 736);
	// 	dv.findElement(by.css('.center.no-margin.no-padding')).getLocation().then(function(location)
	// 	{
	// 		height = location.y;
	// 	});		  dv.manage().window().getSize().then(function(windowObj)
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