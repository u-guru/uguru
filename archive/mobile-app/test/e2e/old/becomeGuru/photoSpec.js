var Photo = require('./photoPageObject.js');

describe('Photo test', function () {
	var photo = new Photo();

	// describe("Check Drag Left is disabled",function()
	// {
	// 	it('Drag to Left side',function()
	// 	{
	// 		doc.slideView(5,'Left');
	// 		browser.sleep(3000);
	// 	});	
	// 	it('Check Position',function()
	// 	{
			
	// 		element(by.id('major')).getLocation().then(function(result)
	// 			{
	//    				expect(result.x).toBe(0,"location X is moved");
	// 			});
	// 	});
	// });

	it ("Check sample photo",function()
	{
		photo.CheckSamplePhotoExist();
	});
	
	it ("Check sample msg",function()
	{
		photo.CheckSampleMessageExist();
	});
	// it ("Edit Photo",function()
	// {	
	// 	var path = require('path');
	//     var fileToUpload = '../small.jpg';
	// 	var absolutePath = path.resolve(__dirname, fileToUpload);
	//     element(by.id('file-input-web')).sendKeys(absolutePath);

	//     // doc.checkMsg("Saving...");
	//     browser.sleep(4000);
	//     doc.checkMsg("Awesome! You're all set.");
	// });

	describe("Edit photo with camera",function()
	{
		it("Open action sheet",function()
		{
			// element(by.id('profile-icon')).click();
			photo.OpenActionSheet();
		});
		it("Open camera",function()
		{
			photo.TakePicture();
		});
		it('Waiting to received the message',function()
		{
			photo.WaitPhotoLoadSuccessful();
		});

	});
});
