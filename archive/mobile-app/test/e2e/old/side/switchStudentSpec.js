var Sidebar= require('../side/sidebarPageObject.js');
var Guru= require('../guruProfile/guruPageObject.js');
var Major = require('../becomeGuru/majorPageObject.js');

describe('@Workflow : SwitchSutdent page', function () {
	var sidebar = new Sidebar();
	var major = new Major();
	var guru = new Guru();

	it('Open sidebar ',function()
	{
		guru.OpenSideMenu();
	});	

	it('Find "STUDENT MODE" button ',function()
	{
		sidebar.FindSideButton("STUDENT MODE");
	});	
	
	it('Switch to Student page',function()
	{
		sidebar.OpenSignUpModal();
	});	

	it('Check Become Guru Gone',function()
	{
		major.CheckBecomeGuruNoDisplayed();
	});
});