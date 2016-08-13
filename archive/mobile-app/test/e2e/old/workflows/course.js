var Course = require('../becomeGuru/coursePageObject.js');

describe('@Workflow : Course page', function () {
	var course = new Course();

	describe('Check Data & Go Next Section',function()
	{
		it('Next page',function()
		{
			course.GoToNextPage();
		});
	});
	

});