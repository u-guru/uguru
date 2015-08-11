describe('Account Unit Test : Edit Picture', function () {
	var editPhoto = element(by.id('E2E-editProfile-editPhoto'));
	var fileToUpload = '../test_case/Release_One_Mobile/guru_profile/sheep.png';
	var largeFileUpload = '../test_case/Release_One_Mobile/guru_profile/download.png';
	var msg = element(by.id('E2E-msg'));
	var originPath;
	beforeEach(function()
		{
			browser.sleep(3000);
			element(by.id("E2E-editProfile-imgUrl")).getAttribute('ng-src').then(function(src){
			originPath = src;
			console.log("Original Path :"+originPath);

			});	
		});

	it ("edit Photo",function()
	{
		
		var path = require('path');
		// var fileToUpload = '../e2e/kururu.jpg';
		var absolutePath = path.resolve(__dirname, fileToUpload);
		// console.log(absolutePath);		
		$('input[type="file"]').sendKeys(absolutePath);
		 editPhoto.click();
		 element(by.id("E2E-editProfile-imgUrl")).getAttribute('ng-src').then(function(src){
			console.log("New Path :"+src);
			expect(src).not.toBe(originPath);
 		});	
		
	},50000);

	it ("edit Large Photo",function()
	{
		
		var path = require('path');
		// var fileToUpload = '../e2e/kururu.jpg';
		var absolutePath = path.resolve(__dirname, largeFileUpload);
		// console.log(absolutePath);		
		$('input[type="file"]').sendKeys(absolutePath);
		 editPhoto.click();
		 element(by.id("E2E-editProfile-imgUrl")).getAttribute('ng-src').then(function(src){
			console.log("New Path :"+src);
			expect(src).not.toBe(originPath);
 		});	
		
	},50000);
});