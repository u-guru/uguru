var homePage = require('./homepage.po.js');
var EC = protractor.ExpectedConditions;

describe('Seding linked Test', function () {
	beforeAll(function()
	{
		web.get('http://staging.uguru.me/');
		
	});
	it ("open the registration forum",function()
	{
		//homePage.clickElement(by.css('.top-link-start btn-round btn-ghost'));
		//browser.sleep(2000);
		web.clickElement(by.id('desktop-start-link'));
		expect(web.getElement(by.id('start-modal')).isDisplayed()).toBe(true);
	});
	describe("Phone Test",function()
			{
				beforeEach(function()
				{
					web.getElement(by.id('home-modal-phone-input')).clear();

				});

				it("Enter Phone : 4151234567",function()
				{
					web.getElement(by.id('home-modal-phone-input')).sendKeys("4151234567");
					web.clickElement(by.id('home-modal-send-text'));
					web.getElement(by.css('.pure-u-1.white-text')).getAttribute('value').then(function(value){
				 		//	console.log("Path :"+src);
							expect(value).toBe("You're all set!");
				 		});	
				});
			});
	describe("Email Test",function()
	{
		beforeEach(function()
		{
			web.getElement(by.id('home-modal-email-input')).clear();

		});
		
		it("Enter Email : web@test.edu",function()
		{
			web.getElement(by.id('home-modal-email-input')).sendKeys("web@test.edu");
			web.clickElement(by.id('home-modal-send-email'));
			web.getElement(by.css('.pure-u-1.white-text')).getAttribute('value').then(function(value){
		 		//	console.log("Path :"+src);
					expect(value).toBe("You're all set!");
		 		});	
		});
	});
});