
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