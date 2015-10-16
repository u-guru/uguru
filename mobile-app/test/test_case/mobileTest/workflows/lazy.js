describe('@Lazy Skip', function () {
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));

	describe('Welcome uguru Pop',function()
	{
		it('Check Pop up ',function()
		{
			browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
			// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});	
		it ('Start Become Guru Process',function()
		{
			guruButton.click();

		});
	});
	it('Slide 1',function()
	{
		doc.slideView(2,'left');
	});
	it('Slide 2',function()
	{
		doc.slideView(3,'left');
	});
	it('Slide 3',function()
	{
		doc.slideView(4,'left');
	});
	it ("Edit Photo",function()
	{	
		var path = require('path');
	    var fileToUpload = '../small.jpg';
		var absolutePath = path.resolve(__dirname, fileToUpload);
	    element(by.id('file-input-web')).sendKeys(absolutePath);
	    doc.checkMsg("Awesome! You're all set.");
	});
});