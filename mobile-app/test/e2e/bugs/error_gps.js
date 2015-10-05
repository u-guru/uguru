var University = require('../university/universityPageObject.js');
var Access = require('../access/accessPageObject.js');

describe('#Error Test Flow : GPS Disable',function()
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
	           browser.refresh();
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
	describe("When GPS button is disable, no popular university is shown",function()
	{
		it("Toggle GPS button",function()
		{

            browser.wait(EC.visibilityOf(university.GPSButton),3000,"Unable To Find GPS ([ng-click='getGPSCoords()']) Button");
            university.GPSButton.click();

		});
		it('Check school-list is back to default list',function()
 		{
				university.isDefaultSchools()
		});
	
	});
});
