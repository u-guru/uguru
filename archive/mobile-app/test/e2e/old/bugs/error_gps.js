// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : GPS Disable',function()
{
	// var university = new University();
 //    var access  = new Access();

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

	describe("When GPS button is disable, no popular university is shown",function()
	{
		it("Toggle GPS button",function()
		{
        university.GPSButton.click();

		});
		it('Check school-list is back to default list',function()
 		{
				university.isDefaultSchools()
		});
	
	});
});
