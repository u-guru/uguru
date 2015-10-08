
describe('#Error Test Flow : Edit Password Wrapper Checking',function()
{

	afterAll(function()
	   {
	       doc.ResetAll();
	   });
    describe('@Workflow : access page', function () {

		 it('Send key : cool',function()
          {
                access.EnterAccessCode('cool');
          });

          it('Press enter',function()
          {
                access.RedeemClick();
          });

          it('Check page changed & check message show : Access Granted',function()
          {
              access.CheckMessage('cool');
          });
    });

    describe('@Workflow : University page', function () {
     	//browser.driver.get("http://localhost:8100/#/university");

    	it("choose a university",function()
    	{
    		// doc.newPickList('school-list');
    		university.SelectSchool(0);
    	});
 
    	
    });
    describe('@Workflow : Home page', function () {

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
