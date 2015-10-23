
var Sidebar= require('../side/sidebarPageObject.js');
var Account= require('../side/accountPageObject.js');

describe('@Workflow : Sign page', function () {

	var sidebar = new Sidebar();
	var account = new Account();
	it('Find "Sign Up" button ',function()
	{
		sidebar.FindSideButton("SIGN UP");
	});	
	it('Open page',function()
	{
		sidebar.OpenSignUpModal();
	});	

	describe("Sign up with Email",function()
	{
		
		it('Enter Name : ',function()
		{
			account.enterName('jason');
		});

		it('Enter Email : ',function()
		{
			account.enterEmail();
		});

		it('Enter Password : ',function()
		{
			account.enterPassword('test');
		});

		it('Create account',function()
		{
		    account.CreateAccount();
		});
		it('check Sign up successful',function()
		{
			account.CheckAccountMessage("Account Successfully Created");
		})
		it('Check After the cookies',function()
		{
			browser.sleep(10000);
			browser.manage().getCookies().then(function(value)
			{
				console.log("value : ", value);
				console.log('JSON : ', JSON.stringify(value));
			});
		});
	});	
});