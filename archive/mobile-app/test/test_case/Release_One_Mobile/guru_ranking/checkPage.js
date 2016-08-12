var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Ranking Unit Test : Check Guru profile & Credibility & Payment ', function () 
	{
		it('click guru profile',function()
			{
				element(by.id('E2E-rank-profile')).click();
		   		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-profile");
   		        browser.driver.get('http://localhost:8100/#/guru-ranking');
			});
		it('click guru Credibility',function()
			{
				element(by.id('E2E-rank-credibilty')).click();
		   		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-credibility");
   		        browser.driver.get('http://localhost:8100/#/guru-ranking');
			});

		it('click payment',function()
		{
			element(by.css('[ng-click="goToPayments()"]')).click();
	   		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/payments");
		        browser.driver.get('http://localhost:8100/#/guru-ranking');
		});
	
	});
