var homePage = require('./homepage.po.js');
var EC = protractor.ExpectedConditions;

describe('Seding linked Test', function () {
	beforeAll(function()
	{
		homePage.get();
	});
	it ("open the registration forum",function()
	{
		//homePage.clickElement(by.css('.top-link-start btn-round btn-ghost'));
		//browser.sleep(2000);
		homePage.clickElement(by.id('desktop-start-link'));
		expect(homePage.getElement(by.id('start-modal')).isDisplayed()).toBe(true);
	});
	describe("Phone Test",function()
			{
				beforeEach(function()
				{
					homePage.getElement(by.id('home-modal-phone-input')).clear();

				});

				it("Enter Phone : 4151234567",function()
				{
					homePage.getElement(by.id('home-modal-phone-input')).sendKeys("4151234567");
					homePage.clickElement(by.id('home-modal-send-text'));
					homePage.getElement(by.css('.pure-u-1.white-text')).getAttribute('value').then(function(value){
				 		//	console.log("Path :"+src);
							expect(value).toBe("You're all set!");
				 		});	
				});
			});
	describe("Email Test",function()
	{
		beforeEach(function()
		{
			homePage.getElement(by.id('home-modal-email-input')).clear();

		});
		
		it("Enter Email : web@test.edu",function()
		{
			homePage.getElement(by.id('home-modal-email-input')).sendKeys("web@test.edu");
			homePage.clickElement(by.id('home-modal-send-email'));
			homePage.getElement(by.css('.pure-u-1.white-text')).getAttribute('value').then(function(value){
		 		//	console.log("Path :"+src);
					expect(value).toBe("You're all set!");
		 		});	
		});
	});
});