// var University = require('../university/universityPageObject.js');
// var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : University Scroll',function()
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

	describe("Infinity scroll test for school-list",function()
	{
		for(var i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Scroll down to #' + index+' school',function()
		 		{
		 			university.ScrollSchoolList(index);
				});
				it('Check school list is increased',function()
				{
					university.ChekSchoolListIsIncrease(index);
				});
			
				it('Check mileage of school is shown',function()
				{
					university.checkMileage(0,index);
				});

				it ('Scroll back to top',function()
		 		{
		 			university.ScrollSchoolList(0);
				});
	        })(i);
		}
	});
		
});
