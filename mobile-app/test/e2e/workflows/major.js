var Major = require('../becomeGuru/majorPageObject.js');

describe('@Workflow : Major page', function () {
	var major = new Major();

	describe('BecomeGuru',function()
	{
		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});
	});
	describe('Check Data & Go Next Section',function()
	{
		it('Next slide',function()
		{
			major.GoToCoursePage();
		});
	});
});