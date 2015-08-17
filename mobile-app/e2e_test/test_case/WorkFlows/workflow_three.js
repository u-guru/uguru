var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));
describe('Workflow Test III: Sumbit a request', function ()
 {
	var title = element(by.css(".title.dont-modify-bounds.ng-binding"))

 	it('Go Session page',function()
 		{
       		browser.wait(EC.visibilityOf(protractor.get.closeBar),3000).then(function()
       			{
	              protractor.get.closeBar.click();  

       			});
            browser.sleep(500); 
 			protractor.get.request.click();
    		protractor.get.sessionButton.click();
    		expect(title.getText()).toBe('Request a Session');
 		});
 	it('Enter Course',function()
 	{
 		var courseInput = element(by.name("course-input"));
 		courseInput.sendKeys("CS");
 		element.all(by.repeater('course in root.vars.matchingCourses')).then(function(items)
		{
			//expect(items.length).toBe(1);
			//expect(items[0].getText()).toBe('Hum CS M10A');
			items[0].click();
		});
		courseInput.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Hum CS M10A");
		});	
 	});
	it('Load Location',function()
	{
		protractor.get.locationButton.click();
		element(by.css('[ng-click="attemptToGetLocation()"]')).click();
		browser.wait(EC.invisibilityOf(load),3000);
		expect(element(by.css('[ng-click="clearLocationButton()"]')).getText()).not.toBe("");
	});
	it("Edit description",function()
		{
			element(by.css('[ng-click="launchDescriptionModal()"]')).click();
	 		var descInput = element(by.id("description-input"));
	 		descInput.sendKeys("Test Test Test Test Test TestTest Test Test Test Test Test Test Test ");

		});

	// it ("Edit Photo",function()
	// {
		
	// 	var path = require('path');
	// 	 var fileToUpload = '../test_case/Release_One_Mobile/guru_profile/sheep.png';
	// 	var absolutePath = path.resolve(__dirname, fileToUpload);
	// 	// console.log(absolutePath);		


	// 	element(by.id("E2E-open-action")).click();
	// 	 element.all(by.repeater('b in buttons')).then(function(items)
	// 	 {
	// 	 	items[0].click();
	// 		element.all($('input[type="file"]')).last().sendKeys(absolutePath);
	// 	 });


	// 	browser.wait(EC.invisibilityOf(load),20000);
	// 	browser.manage().logs().get('browser').then(function(browserLog) {
 //        	console.log('\n log: ' + require('util').inspect(browserLog));
	// 	});
		
		


	// 	 // element(by.id("E2E-editProfile-imgUrl")).getAttribute('ng-src').then(function(src){
	// 		// console.log("New Path :"+src);
	// 		// expect(src).not.toBe(originPath);
 // 		// });	
	// });
	
	it("Edit Tag",function()
		{
    		element.all(by.css('[ng-click="launchTagsModal()"]')).last().click();
	        element(by.id("tags-input")).sendKeys("HUEHUE");
	        element(by.css('[ng-click="saveTag()"]')).click();
		});
	it("save Desc",function()
		{	    
		    element(by.css('[ng-click="saveDescriptionAndCloseModal()"]')).click();
		});
	it("Submit",function()
	{	    
		element.all(by.id('done-button')).last().click();
		browser.wait(EC.invisibilityOf(element(by.id('E2E-submit'))),3000);
	});
 });	