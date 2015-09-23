describe('Photo test', function () {
	var nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));
	var photoButton = element(by.id("photo-container"));
	var photoIcon = element(by.id('profile-icon')).element(by.tagName('img'));

	describe("Check Drag Left is disabled",function()
	{
		it('Drag to Left side',function()
		{
			doc.slideView(5,'Left');
			browser.sleep(3000);
		});	
		it('Check Position',function()
		{
			
			element(by.id('major')).getLocation().then(function(result)
				{
	   				expect(result.x).toBe(0,"location X is moved");
				});
		});
	});

	it ("check sample photo",function()
	{
		var samplePic = element(by.css('#photo-list li'));
		expect(samplePic.isPresent()).toBe(true);	
	});
	
	it ("check sample msg",function()
	{
		var sampleMsg = element(by.css('#photo-list div'));
		expect(sampleMsg.isPresent()).toBe(true);

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
