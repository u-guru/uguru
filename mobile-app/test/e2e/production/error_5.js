describe('#5 Error Test Flow : University GPS List',function()
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

	describe("Enable GPS milliage test",function()
	{
  		it ('Enable GPS',function()
 		{
 			university.toggleGPS();
		});
		it('Check mileage of school is shown',function()
			{
				university.checkMileage(0);
			});
		it('Check School sort by distance',function()
		{
			university.checkMileageInOrder();
		});
	});
		
});
