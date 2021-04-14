
var Sidebar= require('../side/sidebarPageObject.js');
var Account= require('../side/accountPageObject.js');

describe('@Workflow : Login page', function () {

	var sidebar = new Sidebar();
	var account = new Account();
	it('Find "Login" button ',function()
	{
		sidebar.FindSideButton("LOGIN");
	});	
	it('Open page',function()
	{
		sidebar.OpenLoginModal();
	});	

	describe("Sign up with Email",function()
	{
		it('check Before cookies',function()
		{
			browser.manage().getCookies().then(function(value)
			{
				console.log("value : ", value);
				console.log('JSON : ', JSON.stringify(value));
			});
		});
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
		it('Check After the cookies',function()
		{
			browser.manage().getCookies().then(function(value)
			{
				console.log("value : ", value);
				console.log('JSON : ', JSON.stringify(value));
			});
		});

		// it('Close side menus',function()
		// {
		// 	sidebar.ToggleSideMenu('off');
		// });
	});	
});