var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : University Scroll',function()
{
	var university = new University();
    var access  = new Access();

	describe('@Workflow : access page', function () {
		// var accessInput = element(by.id("access-code-bar"));
		var accessInput = element(by.tagName("input"));
		var startButton = element(by.id("redeem-button"));
			beforeAll(function()
			{
	            // browser.get("http://localhost:8100/#/");
	            	browser.getCurrentUrl().then(function(url)
	            	{
            			browser.get("http://"+localhost+":8100/#/university");
	            	})		
    		});
			it("Enter Access Code : cool ",function()
			{
				doc.setInput('cool',0,'access.codeInput');
			});

			it("Check Successed",function()
			{
				//browser.wait(EC.elementToBeClickable(startButton),5000);
				startButton.click();
				doc.checkMsg("Access Granted");
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
				it ('Scroll back to top',function()
		 		{
		 			university.ScrollSchoolList(0);
				});
				it('Check mileage of school is shown',function()
				{
					university.checkMileage(0,index);
				});
	        })(i);
		}
	});
		
});
