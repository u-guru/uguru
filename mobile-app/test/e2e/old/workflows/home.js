var Home= require('../home/homePageObject.js');

describe('@Workflow : Home page', function () {
	var home = new Home();

	describe('Welcome uguru logo pop',function()
	{
		it('Check welcome logo pop up ',function()
		{
			home.CheckPopUpIsShown()
		});
		it('Close welcome logo',function()
		{
			home.CloseThePopUp();
		});	
	});

});