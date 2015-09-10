// var UguruHomepage = require('./homepage.po.js');

describe('Search Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    afterEach(function()
    	{
		    dv.findElement(by.id('search-bar')).clear();

    	});
	it("Go Homepage",function()
		{
			dv.get('http://staging.uguru.me');

		});
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    // var list = 		dv.findElement(by.css('.tt-suggestions'));
	it("Enter School : San Jose State ",function()
	{
	    dv.findElement(by.id('search-bar')).sendKeys('San Jose State');
        expect(dv.findElement(by.css('.tt-suggestions')).getText()).toContain('San Jose State University');
   	});

	it("Enter School : SJSU",function()
	{
		dv.findElement(by.id('search-bar')).sendKeys('SJSU');
        expect(dv.findElement(by.css('.tt-suggestions')).getText()).toContain('San Jose State University');
   	});
	it("Enter School : dddddd",function()
	{

		dv.findElement(by.id('search-bar')).sendKeys('dddddd');
        expect(dv.findElement(by.css('.tt-dataset-0')).getText()).toContain('No results found');
   	});
	it("Enter School : davis",function()
		{

			dv.findElement(by.id('search-bar')).sendKeys('davis');
	        expect(dv.findElement(by.css('.tt-suggestions')).getText()).toContain('davis');
	   	});

});