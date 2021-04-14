var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));
describe('Ranking Unit Test : Toggle Button', function () {
	var toggleButton = element(by.css(".toggle.toggle-calm.disable-user-behavior ng-pristine.ng-untouched.ng-valid"));

	it ("switch toggle button",function(){
		toggleButton.click();
		browser.wait(EC.presenceOf(msg),3000);
		msg.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Saved!");
		});		
		rankButton.getAttribute('value').then(function(value)
		{
			expect(value).toBe("off");
		});		
	});

});