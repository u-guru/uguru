var firstime = true;
describe('Account Unit Test Facebook', function ()
{
	beforeEach(function()
    {
        browser.driver.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/#/new-home');
		browser.waitForAngular()
				protractor.get.settingButton.click();
				if (firstime == true)
		        protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
		        firstime =false; 
		
	
    });
     describe("Edit Profile",function()
	{
		beforeEach(function(){
			browser.sleep(1000);
			browser.waitForAngular();
			protractor.get.doneButton.click();
			element.all(by.repeater('b in buttons')).then(function (items) {
             items[3].click();
        	 });
		});

		describe("edit name",function(){
			it("change name",function(){
				element.all(by.repeater('b in buttons')).then(function (items) {
	             items[0].click();
	        	 });

				browser.sleep(800);
				element(by.id("E2E-editName")).clear().then(function()
				{

					element(by.id("E2E-editName")).sendKeys("Test test");
	            });
				element.all(by.repeater('button in buttons')).then(function (items) {
	             items[1].click();
	        	 });
			});
			it("check name is changed",function(){
				//check 
				// element.all(by.repeater('b in buttons')).then(function (items) {
	   //           items[3].click();
	   //      	 });
				element.all(by.repeater('b in buttons')).then(function (items) {
	             items[0].click();
	        	 });
				browser.sleep(800);
		
				element(by.id("E2E-editName")).getAttribute('value').then(function(value){
					expect(value).toBe("Test test");

				});
			});
			// it("check name is changed after relog",function()
			// {
			//     protractor.run.logoff();
			// 	protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
			// 	element.all(by.repeater('b in buttons')).then(function (items) {
	  //            items[0].click();
	  //       	 });
			// 	browser.sleep(800);
		
			// 	element(by.id("E2E-editName")).getAttribute('value').then(function(value){
			// 		expect(value).toBe("Test test");

			// 	});
			// }
		
			

		});	

		describe("edit Email",function(){
			it("Chang email",function()
			{
				element.all(by.repeater('b in buttons')).then(function (items) {
	             items[1].click();
	        	 });

				browser.sleep(800);
				element(by.id("E2E-editEmail")).clear().then(function()
				{

					element(by.id("E2E-editEmail")).sendKeys("jason@jason-test.edu");
	            });
				element.all(by.repeater('button in buttons')).then(function (items) {
	             items[1].click();
	        	 });
			});
			it("check email is changed",function()
				{
					//check 
					// protractor.get.doneButton.click();
					// element.all(by.repeater('b in buttons')).then(function (items) {
		   //           items[3].click();
		   //      	 });
					element.all(by.repeater('b in buttons')).then(function (items) {
		             items[1].click();
		        	 });
					browser.sleep(1000);
			
					element(by.id("E2E-editEmail")).getAttribute('value').then(function(value){
						expect(value).toBe("jason@jason-test.edu");

					});	
				});
			
		});	
	});
	describe("Edit Profile Photo",function()
		{
			
			var originPath;
			var path = require('path');

			it('should upload picuture', function() {

			  //var fileToUpload = '../e2e/sheep.png';
			  var fileToUpload = '../e2e/kururu.jpg';
			  var absolutePath = path.resolve(__dirname, fileToUpload);
				browser.sleep(1000);
				element(by.id("sidebar-student-profile-photo")).getAttribute('value').then(function(src){
		 		//s	console.log("Path :"+src);
		 			originPath = src;
		 		});	
				browser.sleep(500);
		
				protractor.get.doneButton.click();

				  $('input[type="file"]').sendKeys(absolutePath);
					element.all(by.repeater('b in buttons')).then(function (items) {
		             items[0].click();
		        	 });

			},50000);
			it ('check picuture is upload successfully',function(){
				element(by.id("sidebar-student-profile-photo")).getAttribute('value').then(function(src){
	 			//console.log("New Path :"+src);
				expect(src).not.toBe(originPath);
		 		});	

			});
		});

});