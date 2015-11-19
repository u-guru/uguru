describe('#5 Error Test Flow : University GPS List',function()
{
	afterAll(function()
	{
   		doc.ResetAll();
	});

    describe('@Workflow : access page', function () {
    	 // it('Json test',function()
    	 // 	{
	    	//  		   browser.getCapabilities().then(function (caps) {
	     //          var platformName = caps.caps_.platformName;
	     //          expect(platformName).toBe('android');
	     //          if(platformName != 'android')
	     //          {
	     //            browser.wait(EC.visibilityOf(this.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
	     //            this.GPSButton.click();
	     //          }   
	     //      });
    	 // 	});
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


          it('Test')
    });

	describe("Enable GPS milliage test",function()
	{
  // 		it ('Enable GPS',function()
 	// 	{
 	// 		university.toggleGPS();
		// });
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
