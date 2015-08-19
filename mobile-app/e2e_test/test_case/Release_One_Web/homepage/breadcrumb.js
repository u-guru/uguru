// var UguruHomepage = require('./homepage.po.js');

describe('Breadcrumbs Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));

	it("Go Homepage",function()
		{
			dv.get('http://staging.uguru.me');

		});
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    // var list = 		dv.findElement(by.css('.tt-suggestions'));
	it("Check Page : search ",function()
	{
	   //  dv.findElement(by.id('slide-breadcrumbs')).click().then(function()
    // 	{
    // 		dv.findElements(by.tagName('a')).then(function(results){ 
		  //     	results[0].click();
				// expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#search");
		  //   });

    // 	});
     		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{ 
		      	results[0].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#search");
		    });
   	});

	it("Check Page : values ",function()
	{
     		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{ 
		      	results[1].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#values");
		    });
   	});
	it("Check Page : earn ",function()
	{
     		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{
		      	results[2].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#earn");
		    });
   	});
	it("Check Page : adapt ",function()
	{
		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{
		      	results[3].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#adapt");
    	});
   	});
	it("Check Page : rewards ",function()
	{
		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{
		      	results[4].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#rewards");
    	});
   	});
	it("Check Page : info ",function()
	{
		dv.findElement(by.id('slide-breadcrumbs')).findElements(by.tagName('a')).then(function(results)
     		{
		      	results[5].click();
				expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#info");
    	});
   	});

});