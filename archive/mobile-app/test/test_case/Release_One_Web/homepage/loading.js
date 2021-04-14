
describe('Loading Test', function () {
    // var UguruHomepage = new AngularHomepage();
    // var SchoolInput = dv.findElement(by.id('search-bar'));

	it("Loading Homepage",function()
	{
		web.get('http://staging.uguru.me');
		// dv.wait(function () {
		//   return dv.isElementPresent(by.id('banner'));
		// }, 10000);
	},10000);

});