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
	describe("Check Button",function()
	{
		it('click Cred Button',function()
		{
			doc.tabBar('guru-tab-bar',2)
		});
		it('Check Url',function()
		{	
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-ranking");
		});

		// it('click Cred Button',function()
		// {
		// 	doc.tabBar('guru-tab-bar',2)
		// });
		it("Check Side Meuns Hide",function()
		{
			expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false, "SideBar is showed");
		});
		it('Fresh Home Button',function()
		{
			browser.get("http://localhost:8100/#/guru");
		});
	});
	describe("Welcome Pop Up[Set Back To Default]",function()
	{
		it('Check Pop up ',function()
		{
			expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			//element(by.css('[ng-click="closeWelcomePopup()"]')).click();
			browser.get("http://localhost:8100/#/guru-credibility");
		});
	});
	describe("Check all Creditability Page",function()
	{	
		var groupName  = ['TRANSCRIPT','FACEBOOK','PHONE','EMAIL','EXPERIENCE']
		var groupButton = ['transcript','Facebook','number','Email','Item']
		for(var i = 0 ; i < 5 ; ++ i)
		{
			(function(index,title,buttonName)
			{
				describe('Test Feattures : '+title , function()
				{
					it('Click : '+ title,function()
					{
						doc.newPickList('credit-slider',index);

					});
					
					it('Check Title : '+title,function()
					{
						
					});
					it('Check button Name : '+buttonName,function()
					{

					});
					it('Check Feattures functional : Add '+ buttonName,function()
					{

					});

					it('Check Creditability inscreasing : '+(index+1)*20+' %',function()
					{

					});
				});
				
	        })(i,groupName[i],groupButton[i]);
		}
		
	});
});