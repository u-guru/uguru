describe('#Error Test Flow : Edit Password Wrapper Checking',function()
{

	beforeAll(function()
	{
        // browser.get("http://localhost:8100/#/");
            browser.refresh();
        // if(startButton.isPresent() === false)
            browser.get("http://"+localhost+":8100/#/home");
	});

	describe('@Workflow : Sidebar page', function () {

		it('Open sidebar ',function()
		{
			sidebar.ToggleSideMenu('on');
		});	


	})
	describe("@Workflow : Log in", function()
	{
		it('Open Login button',function()
		{
			sidebar.OpenLoginModal();
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
	});
	describe("Setting : edit password", function()
	{
	
		it('Open setting',function()
		{
			sidebar.OpenSettingAction();
		});

		it('Open account information',function()
		{
			browser.sleep(2000); // need to sleep to get Action
			sidebar.OpenAccountInformation();
		});

		it('Open edit password',function()
		{
			browser.sleep(2000); // need to sleep to get Action
			sidebar.OpenEditPassword();
		});

		it('Show Change Password',function()
		{
			sidebar.checkEditPasswordPop();
		});
	});

});
