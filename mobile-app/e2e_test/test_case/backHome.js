	var side = element(by.id('side_menu'));
var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'))
describe('Home page', function () {
	it('Go Session page',function()
 		{
       		// browser.wait(EC.presenceOf(protractor.get.closeBar),3000);
       		browser.sleep(1000);
            protractor.get.closeBar.click();  

 		});
});