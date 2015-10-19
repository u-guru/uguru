describe('#Error Test Flow : Check SwitchStudent Button with New Account',function()
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
			account.enterEmail('testtest@jason-test.edu');
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
	describe("Check switch mode enable",function()
	{
		it('Check Switch Mode Enable',function()
		{
			sidebar.FindSideButton("STUDENT MODE");
		});
	});
	// describe("Check ", function()
	// {
	
	// 	it('Close side menu',function()
	// 	{
	// 		var ele = element(by.css('.view-container'));
	// 		ele.getLocation().then(function(value)
	// 		{
	// 			console.log('Location : ',value);
	// 		});
	// 	});
	// 	it('Check ',function()
	// 	{
	// 		var ele = element(by.css('.view-container'));
	// 		//for(var x = 0 , var y = 0 ; ;)
	// 		var x = 0; 
	// 		var y =0;
	// 		var stop = false;
	// 		do
	// 		{
	// 			doc.clickCanvas(ele,x,y);
	// 			ele.getLocation().then(function(value)
	// 			{
	// 				if(value.x == 0)
	// 				{
	// 					console.log('X : ',x ,'Y : ', y);
	// 				}
	// 			});
	// 			++x;
	// 			++y;
	// 		} while (stop == false||x != 1000);

	// 	});
	// });
});
