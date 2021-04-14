var Sidebar= require('../side/sidebarPageObject.js');

describe('@Workflow : Sidebar page', function () {
	var sidebar = new Sidebar();

	it('Open sidebar ',function()
	{
		sidebar.ToggleSideMenu('on');
	});	

});