describe('#Error Test Flow : QA support test',function()
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
	  describe('Support center test ', function () {

	  	it('Open sidebar ',function()
	  	{
	  		sidebar.ToggleSideMenu('on');
	  	});	

	  	it('Open support button',function()
	  	{
	  		sidebar.OpenSupportModal();
	  	});

	  	it('check emotion list',function()
	  	{
	  		sidebar.OpenEmoIcon();
	  		expect(sidebar.emoList.isDisplay()).toBe(true);
	  	});

	  	it('Send a key : This is E2E test',function()
	  	{
	  		sidebar.keyinTextArea("This is E2E test");
	  	});

	  	it('Enter Key',function()
	  	{
	  		sidebar.keyinTextArea(protractor.Key.ENTER);
	  	});

	  	it('Wait Receiving messge',function()
	  	{
	  		browser.wait(EC.visibilityOf(sidebar.SupportMsg),10000,"No message receive")
	  	});


	  });
	

});
