var Major = require('./e2e/becomeGuru/majorPageObject.js');

describe('@Workflow : Major page', function () {
	var major = new Major();

	describe('Welcome uguru logo pop',function()
	{
		it('Check welcome logo pop up ',function()
		{
			major.CheckPopUpIsShown()
		});
		it('Close welcome logo',function()
		{
			major.CloseThePopUp();
		});	
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