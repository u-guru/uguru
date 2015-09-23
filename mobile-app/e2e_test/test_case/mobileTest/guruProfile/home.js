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
		var rankValue = element(by.css('#percentile-ranking'));
		var CredValue = element(by.binding('user.current_profile_percent'))
		var guruStats = element.all(by.css('#guru-stats h2'));

		it('Check Rank Level',function()
		{
			expect(rankValue.getText()).toEqual('0',"No Data is added yet");
		});
		it('Check Cred Level',function()
		{
			expect(CredValue.getText()).toContain('0',"No Data is added yet");

		});		
		it('Check Profile Level',function()
		{
			guruStats.then(function(items)
			{
				expect(items[1].getText()).toContain('0',"No Data is added yet");

			});
		});	
		it('Check Pay Level',function()
		{
			guruStats.then(function(items)
			{
				expect(items[2].getText()).toContain('0',"No Data is added yet");

			});
		});	
	});
	
	// describe('Check Yellow Page',function()
	// {

	// 	it('Drag page "Tip of the Day"',function()
	// 	{
	// 		ele.then(function(items)
	// 		{
	// 			browser.actions().
	// 			dragAndDrop(items[0], {x: -200, y: 0}).
	// 			perform();
	// 		});

	
	// 	});

	// 	it('Check Yellow',function()
	// 	{
	// 		ele.then(function(items)
	// 		{

	// 			expect(items[1].isDisplayed()).toBe(true);				
	// 			expect(items[1].getText()).toEqual('YELLOW');
	// 		});	
	// 		browser.sleep(5000);
	// 	});

	// });

	// describe('Check Pink Page',function()
	// {

	// 	it('Drag page "YELLOW"',function()
	// 	{
	// 		ele.then(function(items)
	// 		{
	// 			browser.actions().
	// 			dragAndDrop(items[1], {x: -200, y: 0}).
	// 			perform();
	// 		});

	
	// 	});
	// 	it('Check Pink Page',function()
	// 	{
	// 		ele.then(function(items)
	// 		{

	// 			expect(items[2].isDisplayed()).toBe(true);				
	// 			expect(items[2].getText()).toEqual('PINK');
	// 		});	
	// 	});

	// });

	
});