describe('Unit Test : User logs in with email address', function ()
{
	var msg = element(by.id('E2E-msg'));
 	beforeEach(function () {
 		browser.driver.get('http://localhost:8100/#/new-home');
 		browser.sleep(2000);
        protractor.get.switchLoginMode.click();

    });
}