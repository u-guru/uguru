describe('@Photo test', function () {
	var nextStep = element(by.css('[ng-click="goToGuruMode()"]'));
	var photoButton = element(by.id("photo-container"));
	var photoIcon = element(by.id('profile-icon')).element(by.tagName('img'));

	it ("Edit Photo",function()
		{	
			var path = require('path');
		    var fileToUpload = '../small.jpg';
			var absolutePath = path.resolve(__dirname, fileToUpload);
		    element(by.id('file-input-web')).sendKeys(absolutePath);
		});
	it('Next page',function()
	{
		expect(nextStep.getText()).toBe("FINISH");
		nextStep.click();
	});
		
});