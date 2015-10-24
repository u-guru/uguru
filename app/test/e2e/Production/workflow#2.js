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
    it('Forcus search-bar',function()
    {
		home.SearchSchool('berkeley');

    });
	

});`