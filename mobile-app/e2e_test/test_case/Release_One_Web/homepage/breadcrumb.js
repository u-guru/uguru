// var UguruHomepage = require('./homepage.po.js');

describe('Breadcrumbs Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));

	it("Go Homepage",function()
		{
			web.get('http://staging.uguru.me');
		});
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    // var list = 		dv.findElement(by.css('.tt-suggestions'));
	it("Check Page : search ",function()
	{
		// web.findElements(by.id('slide-breadcrumbs'),by.tagName('a')).then(function(results)
		// {
		// 	results[0].click();
		// 	expect(web.getCurrent()).toEqual("http://staging.uguru.me/#search");
		// });
      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),0);
      expect(web.getCurrent()).toEqual("http://staging.uguru.me/#search");

   	});

	// it("Check Page : values ",function()
	// {
 //      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),1);
 //      expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#values");
 //   	});
	it("Check Page : earn ",function()
	{
      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),1);
	  expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#earn");
   	});
	// it("Check Page : adapt ",function()
	// {
 //      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),3);
	//   expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#adapt");
 //   	});
	it("Check Page : work ",function()
	{
      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),2);
	  expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#work");
   	});
	it("Check Page : why ",function()
	{
      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),3);
      expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#why");
   	});
	it("Check Page : info ",function()
	{
      web.clickSameElement(by.id('slide-breadcrumbs'),by.tagName('a'),4);
	  expect(dv.getCurrentUrl()).toEqual("http://staging.uguru.me/#info");

   	});

});