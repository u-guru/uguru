describe('Guru Home Test', function () {
	var ele = element.all(by.tagName("ion-slide"));
	beforeAll(function()
	{
		browser.get("http://localhost:8100/#/guru");
		browser.sleep(2000)
	});
	describe("Welcome Pop Up",function()
	{
		it('Check Pop up ',function()
		{
			expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});
	});
	describe("Profile page",function()
	{
		var rankValue = element(by.css('#guru-ranking-progress-bar'));
		var CredValue = element(by.id('credibility-percent'));
		var ProfileValue = element(by.id('profile-percent'));
		var PayValue =  element(by.id('hourly-rate'));


		it('Check Rank Level',function()
		{
			expect(rankValue.getText()).toEqual('75');
		});
		it('Check Cred Level',function()
		{
			expect(CredValue.getText()).toEqual('20');

		});		
		it('Check Profile Level',function()
		{
			expect(ProfileValue.getText()).toEqual('65');

		});	
		it('Check Pay Level',function()
		{
			expect(PayValue.getText()).toEqual('39');
		});	
	});
	
	describe('Check Yellow Page',function()
	{

		it('Drag page "Tip of the Day"',function()
		{
			ele.then(function(items)
			{
				browser.actions().
				dragAndDrop(items[0], {x: -200, y: 0}).
				perform();
			});

	
		});

		it('Check Yellow',function()
		{
			ele.then(function(items)
			{

				expect(items[1].isDisplayed()).toBe(true);				
				expect(items[1].getText()).toEqual('YELLOW');
			});	
			browser.sleep(5000);
		});

	});

	describe('Check Pink Page',function()
	{

		it('Drag page "YELLOW"',function()
		{
			ele.then(function(items)
			{
				browser.actions().
				dragAndDrop(items[1], {x: -200, y: 0}).
				perform();
			});

	
		});
		it('Check Pink Page',function()
		{
			ele.then(function(items)
			{

				expect(items[2].isDisplayed()).toBe(true);				
				expect(items[2].getText()).toEqual('PINK');
			});	
		});

	});

	
});