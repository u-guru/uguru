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

	it('Check University flag inside the banner',function() {
		// body...
		browser.sleep(5000);
		// home.checkImgSize($('#top-school-logo'),50,50);
		home.checkImgSize($('#top-school-logo'),$$('#top-school-banner path').get(2),0.9);
		// expect(document.querySelector('#top-school-logo').getBoundingClientRect().width).toBe(1000);

		// expect(browser.executeScript("document.querySelector('#top-school-logo').getBoundingClientRect().width")).toBe(1000);
		// console.log(browser.executeScript("document.querySelector('#top-school-logo').getBoundingClientRect().width"));

	});

	it('Check #become-guru-cta-button is in the middle',function() {
		// body...
		home.checkLocationX($('#become-guru-cta-button'),$('#top-school-logo'));
	});

	it('Check #search-guru-number is in right postion',function() {
		// body...
		home.checkLocationX($('#search-guru-number'),$('.search-results-gurus'));

	});
	it ('Check h2[style*="backface-visibility: hidden;"] span[style*="backface-visibility: hidden;"] is in the right position ',function()
	{
		home.checkLocationX($('h2[style*="backface-visibility: hidden;"] span[style*="backface-visibility: hidden;"]'),$('.search-results-gurus'));
	});
	it ('Check #search-results-close-link and #home-modal-close-link are in the same position',function()
	{
		// home.checkLocationX($('#search-results-close-link'),$('#home-modal-close-link'));
		home.checkLocationY($('#search-results-close-link'),$('#home-modal-close-link'));

	});
	afterEach(function()
	{
		   browser.manage().logs().get('browser').then(function(browserLogs) {
			  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
		   });
	});
});