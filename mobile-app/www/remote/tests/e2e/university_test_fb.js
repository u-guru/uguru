var  deferred = protractor.promise.defer();
describe('Account Unit Test Facebook', function ()
{
	var firstime = true;
	var old_schoolName; ''
	beforeEach(function()
    {
    	browser.ignoreSynchronization = false;
       	browser.driver.get('http://localhost:8100/#/new-home');
		browser.waitForAngular()
		protractor.get.settingButton.click();
		if (firstime == true)
		{
			protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
	        firstime =false; 
			browser.sleep(800);
			element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
			old_schoolName = value;
			});	
		}
		firstime =false; 
	 });
 //   describe("University",function(){
 //   		describe("test The same University",function()
 //   			{
 //   				it("Enter University",function()
	// 			{
	// 				protractor.get.doneButton.click();
	// 				element.all(by.repeater('b in buttons')).then(function (items) {
	// 	             items[1].click();
	// 	        	 });
	// 				element(by.id('university-input')).clear().then(function(){
	// 					element(by.id('university-input')).sendKeys("San Francisco")			
	// 				});

	// 				element.all(by.repeater('university in matchingUniversities')).then(function (items) {
	// 	              items[0].click();
	// 	          	});
	// 				browser.sleep(2000);
	// 				browser.switchTo().alert().thenCatch(function (e) {
	// 				    // 27 maps to bot.ErrorCode.NO_MODAL_DIALOG_OPEN: http://selenium.googlecode.com/git/docs/api/javascript/source/lib/atoms/error.js.src.html#l31
	// 				   if (e.code == 27) {
	// 				     	throw e;
	// 				   }
	// 				}).then(function (alert) {
	// 				    if (alert){
	// 				     	return alert.accept();
	// 				      }
	// 				});
	// 			});
	// 			it("check University is the same",function()
	// 			{

	// 				element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
	// 				// console.log(old_schoolName );
	// 				// console.log("NEW"+value);
	// 				expect(value).not.toBe(old_schoolName);
	// 				});	
	// 			});
 //   			});

	// 	describe("test custom University",function()
 //   			{
 //   				var d = new Date();
 //   				var NewName;
 //   				it("Enter University",function()
	// 			{
	// 				browser.sleep(800);	
	// 				protractor.get.doneButton.click();
	// 				element.all(by.repeater('b in buttons')).then(function (items) {
	// 	             items[1].click();
	// 	        	 });
	// 				NewName = "Uguru University-"+d.getUTCSeconds();
	// 				element(by.id('university-input')).clear().then(function(){
	// 					element(by.id('university-input')).sendKeys();
	// 				});
	// 				protractor.get.doneButton.click();
	// 				browser.sleep(5000);	

	// 			});
	// 			it("check University is the same",function()
	// 			{
	// 				browser.sleep(1000);	
	// 				browser.waitForAngular();	
	// 				element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
	// 					expect(value).toBe(NewName);
	// 				});	
	// 			});
 //   			});
	// });	
		describe("Major",function()
		{
			var totalValue;
			var listCount;
			it("Add Major",function()
			{

				protractor.get.doneButton.click();
				element.all(by.repeater('b in buttons')).then(function (items) {
		         items[2].click();
		    	 });
				element(by.id("major-input")).sendKeys("a");
				element.all(by.repeater('major in matchingMajors')).then(function (items) {
		         	items[0].click();
		    	 });
			 	element(by.id("major-input")).sendKeys("a");		
			
				browser.sleep(1000);	
			});
			// it("Check Majors",function()
			// {
			// 	browser.sleep(800);	

			// 	protractor.get.doneButton.click();
			// 	element.all(by.repeater('b in buttons')).then(function (items) {
		 //         items[2].click();
		 //    	 });
			// 	element.all(by.repeater('user_major in user.majors')).count().then(function(count) {
			// 		expect(value).toBe(totalValue).then(function()
			// 			{
			// 				console.error("The Majors is not upadated correctly");
			// 			});
			// 	});
			// });
		});

});