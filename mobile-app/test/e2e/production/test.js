
describe('#Error Test Flow : Sliding',function()
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

	describe("Sliding test for becomeGuru",function()
	{
		it ('Start becomeGuru process',function()
		{
			major.BeginBecomeGuru();
		});

		it('Check Sliding left',function()
		{
			doc.slideView(0,'left')
		});

		it('Check Sliding left',function()
		{
			browser.sleep(10000);
		});

	});
});
