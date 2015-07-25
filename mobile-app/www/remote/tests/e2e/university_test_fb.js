describe('Account Unit Test Facebook', function ()
{
	var firstime = true;
	var old_schoolName;
		
		// browser.driver.get('http://localhost:8100/#/new-home');
		// browser.waitForAngular();
		// protractor.get.settingButton.click();
		// protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
  //       firstime =false; 
		// browser.sleep(800);
		// element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
		// old_schoolName = value;

		// });	

	it("Log in Facebook",function()
		{
			browser.driver.get('http://localhost:8100/#/new-home').then(function()
				{

					browser.waitForAngular();
					browser.sleep(1000);

					protractor.get.settingButton.click();
					protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
			        firstime =false; 
					browser.sleep(800);
					element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
					old_schoolName = value;
					});	
				});
		

		});
	   describe("University",function(){
	   		describe("test The same University",function()
	   			{
	   				it("Enter University",function()
					{
						protractor.get.doneButton.click();
						element.all(by.repeater('b in buttons')).then(function (items) {
			             items[1].click();
			        	 });
						element(by.id('university-input')).clear().then(function(){
							element(by.id('university-input')).sendKeys("San Francisco")			
						});

						element.all(by.repeater('university in matchingUniversities')).then(function (items) {
			              items[0].click();
			          	});
						browser.sleep(2000);
						browser.switchTo().alert().thenCatch(function (e) {
						    // 27 maps to bot.ErrorCode.NO_MODAL_DIALOG_OPEN: http://selenium.googlecode.com/git/docs/api/javascript/source/lib/atoms/error.js.src.html#l31
						   if (e.code == 27) {
						     	throw e;
						   }	
						}).then(function (alert) {
						    if (alert){
						     	return alert.accept();
						      }
						});
					});
					it("check University is the same",function()
					{

						element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
						// console.log(old_schoolName );
						// console.log("NEW"+value);
						expect(value).not.toBe(old_schoolName);
						});	
					});
	   			});

			describe("test custom University",function()
	   			{
	   				var d = new Date();
	   				var NewName;
	   				it("Enter University",function()
					{
						browser.sleep(800);	
						protractor.get.doneButton.click();
						element.all(by.repeater('b in buttons')).then(function (items) {
			             items[1].click();
			        	 });
						NewName = "Uguru University-"+d.getUTCSeconds();
						element(by.id('university-input')).clear().then(function(){
							element(by.id('university-input')).sendKeys();
						});
						protractor.get.doneButton.click();
						browser.sleep(5000);	

					});
					it("check University is the same",function()
					{
						element(by.id("E2E-uniTitle")).getAttribute('value').then(function(value){
							expect(value).toBe(NewName);
						});	
					});
	   			});
		});	

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
			});
			it("Add More Major",function()
			{
				element(by.id("major-input")).sendKeys("a");
				element.all(by.repeater('major in matchingMajors')).then(function (items) {
		         	items[0].click();
		    	 });
			});
			 it("Delete Majors",function()
			{
				 element.all(by.repeater('user_major in user.majors')).then(function (major) {
		                
		                 browser.actions().mouseDown(major[0]).perform();
		                 browser.sleep(2000);             

		         });
			});
			 it("Save buttons",function()
			 {
			 	protractor.get.doneButton.click();


			 });
			  it("back buttons",function()
			 {
				protractor.get.doneButton.click();
				element.all(by.repeater('b in buttons')).then(function (items) {
		         items[2].click();
		    	 });
				protractor.get.doneButton.click();

			 });
		});

		describe("Course",function()
		{
			var counts;
				beforeEach(function()
			    {
			    	browser.ignoreSynchronization = false;
			    	browser.driver.sleep(1000);

				});
			it("delete Course",function()
				{
					protractor.get.editCourses.click().then(function()
					{	
						element.all(by.repeater('course in user.student_courses')).count().then(function(count) {
							 counts = count;
							 console.log("Counts "+ count);
						});
						var yourOffset = { x: -100, y: 45 };

						element.all(by.repeater('course in user.student_courses')).then(function (items) {
					         // browser.actions().mouseMove(items[0], yourOffset).mouseDown().mouseMove({ x: -200, y: 0 }).perform();
					       		//items[0].dragAndDrop(-100, 0);
					       		
						       	var obj = items[1].element(by.binding('course.short_name'));
								obj.getLocation().then(function (navDivLocation) {
								        y = navDivLocation.y;
								        x = navDivLocation.x;
								   		//browser.actions().dragAndDrop(obj, {x: -200, y: navDivLocation.y}).perform();
								   		browser.actions().mouseMove(obj, {x: navDivLocation.x, y: navDivLocation.y}).mouseDown().mouseMove({x: -400, y: navDivLocation.y}).perform();
							  			console.log("Location 1 ("+ x+" , "+y+ ")");

							    });
							   	obj.getLocation().then(function (navDivLocation) {
								        y = navDivLocation.y;
								        x = navDivLocation.x;
								        console.log("Location ("+ x+" , "+y+ ")");
							    });




					       	// browser.actions().mouseMove(items, {x: 100, y: 100}).mouseDown().mouseMove({x: -400, y: 0}) .perform();


					       	// items[0].getLocation().then(function (navDivLocation) {
						       //  var y = navDivLocation.y;
						       //  var x = navDivLocation.x;
						       //  console.log("Location (" +x+" + " +y+ ")");

						    // });

					    });
						browser.sleep(10000);

					});
				});
			
		});
});