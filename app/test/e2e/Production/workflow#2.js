// var UguruHomepage = require('./homepage.po.js');

describe('Chat Support', function () {
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
    it('open Chat',function()
    {
		// home.SearchSchool('berkeley');
		support.OpenSupport();
    });
	
	it ('Send message',function()
	{
		support.sendMessage('HIIIII E2E')
	});
	afterEach(function()
	{
		   browser.manage().logs().get('browser').then(function(browserLogs) {
			  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
		   });
	});
});