var firstime = true;
describe('Account Unit Test', function ()
{
	beforeEach(function()
    {
        browser.driver.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/#/new-home');
		browser.sleep(1000);
		browser.waitForAngular();
		protractor.get.settingButton.click();
		if (firstime == true)
		{
          protractor.get.viaEmail.click();
          protractor.get.switchLoginMode.click();
          protractor.run.LogIn('jason@berkeley.edu','test',false);
		}
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

		describe("edit Password",function(){
				it("Change Password",function()
				{
					element.all(by.repeater('b in buttons')).then(function (items) {
		             items[2].click();
		        	 });

					browser.sleep(800);
					element(by.id("E2E-oldPassword")).sendKeys("test");
					element(by.id("E2E-newPassword")).sendKeys("test1");

					element.all(by.repeater('button in buttons')).then(function (items) {
		             items[1].click();
		        	 });
      			    browser.sleep(2000);
					 var alertDialog = browser.switchTo().alert();
         			 var log = alertDialog.getText();
         			 alertDialog.accept();  // Use to accept (simulate clicking ok)
					expect(alertDialog.getText()).not.toEqual("Please fill in all fields"); 
				});
				
			});	

	});

});