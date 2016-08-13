
var Sidebar= require('../side/sidebarPageObject.js');

describe('@Workflow : Login page', function () {

	var sidebar = new Sidebar();

	beforeAll(function()
	{
		browser.get("http://"+localhost+":8100/#/guru");
		browser.sleep(2000)
	});
	it('Launch Profile',function()
	{
		// browser.wait(EC.elementToBeClickable(element(by.id('btn-edit-profile'))),4000);
 		// element(by.id('btn-edit-profile')).click();	
 		account.LaunchSignUpAtGuru();
	});
	//need to add switch login mode
	

	describe("Sign up with Email",function()
	{

		it('Enter Email : ',function()
		{
			account.enterEmail('jason@sjsu.edu');
		});

		it('Enter Password : ',function()
		{
			account.enterPassword('test');
		});

		it('Login account',function()
		{
		    account.LoginAccount();
		});
		it('check Sign up successful',function()
		{
			account.CheckAccountMessage("Account Successfully Created");
		})

		// it('Close side menus',function()
		// {
		// 	sidebar.ToggleSideMenu('off');
		// });
	});	
});