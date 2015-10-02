var Sidebar= require('../side/sidebarPageObject.js');

describe('@Workflow : EditUniversity page', function () {
	var sidebar = new Sidebar();

	it('Find "Edit University" button ',function()
	{
		sidebar.FindSideButton("ADD UNIVERSITY");
	});	
	it('Open page',function()
	{
		sidebar.OpenUniversityModal();
	});	
	it('Check Page Titie',function()
	{
		sidebar.CheckModalTitle('University');
	});	
	it('Close page & And Back Home',function()
	{
		sidebar.CloseModal();
		sidebar.ToggleSideM1enu('off');
		browser.sleep(10000);
	});	
});