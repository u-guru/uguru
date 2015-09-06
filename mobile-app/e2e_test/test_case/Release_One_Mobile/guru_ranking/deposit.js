var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Ranking Unit Test : Deposit ', function () 
	{

		var DepositButton = element(by.css('[ng-click="confirmCommitment()"]'));
		it("Deposit money",function()
			{
				DepositButton.click();
				 var alertDialog = browser.switchTo().alert();

				expect(alertDialog.getText()).toContain("I give Uguru permission to"); 

				 alertDialog.accept();  // Use to accept (simulate clicking ok)

			    browser.wait(EC.presenceOf(msg),3000);
				msg.getAttribute('value').then(function(value)
				{
					expect(value).toBe("Your payment is successful!!");
				});		
			});
		
		 
	});