var Category = require('../becomeGuru/categoryPageObject.js');

describe('@Workflow : category page', function () {
	var category = new Category();
	it('Next page',function()
	{
		category.GoToPhotoPage();
	});
});