
describe('Workflow : access page', function () {
	// var accessInput = element(by.id("access-code-bar"));
	var accessInput = element(by.tagName("input"));
	var startButton = element(by.id("access-start"));

		it("Enter Access Code : cool ",function()
		{
			accessInput.sendKeys('cool');
			accessInput.getAttribute('value').then(function(result)
			{
				expect(result).toBe("cool");
			});
		});

		it("Check Successed",function()
		{
			startButton.click();
			doc.checkMsg("Access Granted");
		});
});