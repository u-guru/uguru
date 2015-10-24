// var UguruHomepage = require('./homepage.po.js');

describe('HomePage', function () {
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
    it('Forcus search-bar',function()
    {
		home.SearchSchool('berkeley');

    });
	it("Pick a school # 1",function()
	{
		home.ChooseDefaultUniversity(0)
   	});
	it('Check University flag',function() {
		// body...
		home.checkImgSize($('#top-school-logo'),50,50);
	});
	it('Check University flag',function() {
		// body...
		browser.sleep(5000);
		home.checkLocation($('#become-guru-cta-button'),100,100);
	});
	it('Check University flag',function() {
		// body...
		home.checkLocation($('#search-guru-number'),100,100);
		home.checkLocation($('h2[style*="backface-visibility: hidden;"] span[style*="backface-visibility: hidden;"]'),100,100);
	});

});