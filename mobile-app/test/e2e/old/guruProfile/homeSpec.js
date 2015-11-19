describe('Guru Home Test', function () {





	var ele = element.all(by.tagName("ion-slide"));


	it("check Curret Page",function()
	{
		//expect(browser.getCurrentUrl()).toContain("/#/guru");
		guru.CheckPageCorrect();
	});
	it("Check launch my profile button is not present",function()
	{
		guru.CheckLaunchProfileButton(false);
	});

	// describe("Check Tab Bar",function()
	// {
	// 	var str = ['profile','credibility']
	// 	for(var i = 0 ; i < 2; ++i)
	// 		(function(index,title)
	// 			{
	// 				describe("Check Tab bar "+title,function()
	// 				{
	// 					it('Click ' + title+ ' Button',function()
	// 					{
	// 						//doc.tabBar('guru-tab-bar',index+1)
	// 						guru.switchBar(title);
	// 					});
	// 					it('Check Url',function()
	// 					{	
	// 						// expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-profile");
	// 						// Need to polish
	// 						expect(browser.getCurrentUrl()).toContain("/#/guru-"+title);

	// 					});
	// 					it("Check Side Meuns Hide",function()
	// 					{
	// 						// Need to polish
	// 						expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false, "SideBar is showed");
	// 					});
	// 				})
					
	// 			})(i,str[i]);
		
	// });


	
	// element(by.id('btn-edit-profile')).isDisplayed().then(function(value)
	// {
	// 	if( value == true)
	// 		it("log in active",function()
	// 		{
	// 				element(by.id('btn-edit-profile')).click();
	// 		});
	// });
	// describe("Welcome Pop Up",function()
	// {
	// 	it('Check Pop up ',function()
	// 	{
	// 		expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
	// 	});
	// 	it('Close Welcome',function()
	// 	{
	// 		//element(by.id('home-uguru-popup')).click();
	// 		element(by.css('[ng-click="closeWelcomePopup()"]')).click();
	// 	});
	// });
	// describe("Profile page",function()
	// {
	// 	var rankValue = element(by.css('#percentile-ranking'));
	// 	var CredValue = element(by.binding('user.current_profile_percent'))
	// 	var guruStats = element.all(by.css('#guru-stats h2'));

	// 	it('Check Rank Level',function()
	// 	{
	// 		expect(rankValue.getText()).toEqual('0',"No Data is added yet");
	// 	});
	// 	it('Check Cred Level',function()
	// 	{
	// 		expect(CredValue.getText()).toContain('0',"No Data is added yet");

	// 	});		
	// 	it('Check Profile Level',function()
	// 	{
	// 		guruStats.then(function(items)
	// 		{
	// 			expect(items[1].getText()).toContain('0',"No Data is added yet");

	// 		});
	// 	});	
	// 	it('Check Pay Level',function()
	// 	{
	// 		guruStats.then(function(items)
	// 		{
	// 			expect(items[2].getText()).toContain('0',"No Data is added yet");

	// 		});
	// 	});	
	// });
	
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


// describe("[Need to update test Library ]Welcome Pop Up",function()
	// {
	// 	it('Check Pop up ',function()
	// 	{
	// 		expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
	// 	});
	// 	it('Close Welcome',function()
	// 	{
	// 		//element(by.id('home-uguru-popup')).click();
	// 		element(by.css('[ng-click="closeWelcomePopup()"]')).click();
	// 	});
	// });
	// describe("Check Tab Bar",function()
	// {
	// 	it('click Cred Button',function()
	// 	{
	// 		doc.tabBar('guru-tab-bar',2)
	// 		browser.sleep(10000)
	// 	});
	// 	it('Check Url',function()
	// 	{	
	// 		// expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-profile");
	// 		expect(browser.getCurrentUrl()).toContain("/#/guru-profile");

	// 	});
	// 	it("Check Side Meuns Hide",function()
	// 	{
	// 		expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false, "SideBar is showed");
	// 	});
	// });