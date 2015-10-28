// var UguruHomepage = require('./homepage.po.js');

describe('FAQ/Manifest', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));
	// it("Go Homepage",function()
	// 	{
	// 		dv.get('http://uguru.me');

	// 	});
    // var SchoolInput = dv.findElement(by.id('search-bar'));
    // var list = 		dv.findElement(by.css('.tt-suggestions'));
    beforeEach(function() {
      isAngularSite(false);

    });
    it('Go to FAQ',function()
    {
		// home.SearchSchool('berkeley');
        dv.get('http://www.uguru.me/faq/');

    });
	
	it ('Check element is not display',function()
	{
		expect($('#side-menu-links').isPresent()).toBe(false);
	});
	afterEach(function()
	{
		   browser.manage().logs().get('browser').then(function(browserLogs) {
			  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
		   });
	});
});