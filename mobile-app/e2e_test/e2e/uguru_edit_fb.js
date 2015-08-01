describe("Accept Edit :: ",function()
	{
		var edit = element(by.id('E2E-editProfile'));
		var save = element(by.id('E2E-saveProfile'));
		beforeAll(function()
	    {
	    	browser.driver.get('http://localhost:8100/#/new-home');
	    	browser.sleep(1500);
			browser.waitForAngular();
			protractor.get.settingButton.click();
			protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");

		   	browser.sleep(800);
			protractor.get.closeBar.click();  	
	    	browser.driver.get('http://localhost:8100/#/guru-profile');
	    	element(by.id('E2E-editProfile')).click();
		});
		beforeEach(function()
		{
			browser.sleep(800);
		});
		afterEach(function()
			{
				edit.isDisplayed().then(function(result)
				{
					if(result)
					{
						expect(edit.isDisplayed()).not.toBe(true);
						edit.click();
					}
				});
	
			});

		describe("Student Profile",function(){
			var origName;
			var keyName = element(by.css('[ng-model="data.name"]'));
			var editName = element(by.id('E2E-editProfile-editName'));
			var editSchool = element(by.id('E2E-editProfile-editSchool'));
			var editeditMajor = element(by.id('E2E-editProfile-editMajor'));
			var editPay = element(by.id('max-hourly-select'));
			var editPhoto = element(by.id('E2E-editProfile-editPhoto'));
			var editCourse = element(by.id('E2E-editProfile-editCourse'));

			it("edit Name",function()
			{
				editName.click();
				keyName.clear().then(function()
				{
					keyName.sendKeys("Test test");
	            });				
				element.all(by.repeater('button in buttons')).then(function (items) {
	             items[1].click();
	        	 });
			});

			it ("edit School",function()
			{
				var schoolName ; 
				element(by.id("E2E-schoolName")).getAttribute('value').then(function(value){
				//s	console.log("Path :"+src);
					schoolName = value;
					console.log("Check" + schoolName);

				});	
				editSchool.click();
	
				element(by.id('university-input')).clear().then(function(){
					if(schoolName !="San Jose State University")
						element(by.id('university-input')).sendKeys("San Jose State University");
					else
						element(by.id('university-input')).sendKeys("University of San Francisco");
				});
				browser.sleep(1000);
				element.all(by.repeater('university in matchingUniversities')).then(function (items) {
		              items[0].click();
		          	});
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

				it ("edit major",function(){
					editeditMajor.click();
					element(by.id('major-input')).clear().then(function(){
							element(by.id('major-input')).sendKeys("Computer Science")			
					});
					element.all(by.repeater('major in matchingMajors')).then(function (items) {
			              items[0].click();
			          	});
					browser.sleep(1000);
					// protractor.get.doneButton.click();

					element(by.id("E2E-Back")).click();					
				});
				it ("edit pay",function(){
					editPay.click();
					var rand = Math.floor((Math.random() * 2) + 0);

					// if(rand === 0)
					// 	element(by.cssContainingText('option', 'Free')).click();
					// else
					// 	element(by.cssContainingText('option', (rand+1))).click();

					// browser.sleep(8000);

					browser.findElements(by.tagName('option')).then(function(options) 
					{
						options[rand].click();
					});

				});
				it ("edit Photo",function()
				{
					
					var originPath;
					var path = require('path');
					var fileToUpload = '../e2e/sheep.png';
					// var fileToUpload = '../e2e/kururu.jpg';
					var absolutePath = path.resolve(__dirname, fileToUpload);

					element(by.id("sidebar-student-profile-photo")).getAttribute('value').then(function(src){
					//s	console.log("Path :"+src);
						originPath = src;
					});	
					browser.sleep(500);

					$('input[type="file"]').sendKeys(absolutePath);
					 editPhoto.click();
					 element(by.css(".pure-img")).getAttribute('value').then(function(src){
		 				//console.log("New Path :"+src);
						expect(src).not.toBe(originPath);
			 		});	

				},50000);

				it("Edit Courses",function()
					{
						editCourse.click();
						element(by.id('guru-course-input')).sendKeys('a');
						element.all(by.repeater('course in matchingCourses')).count().then(function (count) {
			              expect(count).not.toBe(0);
			          	});
						element(by.id("E2E-Back")).click();					
					});

		});	
		describe("SKills",function()
			{
				var editTime = element(by.id('E2E-editProfile-editLateNight'));
				var editExp = element(by.id('E2E-editProfile-editExp'));
				var editRemote = element(by.id('E2E-editProfile-editRemote'));
				var editLang = element(by.id('E2E-editProfile-editLanguage'));
				var editExp = element(by.id('E2E-editProfile-editExp'));

				it ("edit Time",function()
					{
						element(by.id('E2E-editProfile-profile'));
						editTime.click();
						var rand = Math.floor((Math.random() * 9) + 0);

						browser.findElements(by.tagName('option')).then(function(options) 
						{
							options[rand].click();
						});
	    			
					});
				it("edit Remote",function()
					{

						editRemote.click();	       
						element(by.id('E2E-remote-skype')).click();
						element(by.id('E2E-remote-face')).click();
						element(by.id('E2E-remote-hangout')).click();
						element(by.id('E2E-remote-instant')).click();
						element(by.id('E2E-remote-phone')).click();
						element(by.id('E2E-remote-text')).click();
						element(by.id('E2E-remote-email')).click();
						protractor.get.doneButton.click();

					});

				it("it Edit Language",function()
					{
						var inputLang = element(by.id('guru-language-input'));

						editLang.click();

						inputLang.sendKeys("Mandarin");
						element.all(by.repeater('language in matchingLanguages')).then(function (items) {
							items[0].click();
						});
						inputLang.sendKeys("English");
						element.all(by.repeater('language in matchingLanguages')).count().then(function (count) {
							expect(count).not.toBe(0);
						});
						element.all(by.repeater('language in matchingLanguages')).then(function (items) {
							items[0].click();
						});
						protractor.get.doneButton.click();
					});
				it("it Edit Teaching Exp",function()
					{
						var testNum = 0;
						var expInput = element(by.id('experience-name-input'));
						var descInput = element(by.id('E2E-inputDescription'));
						var ball = element(by.id('E2E-range'));
						editExp.click();
						element(by.id('E2E-addExperience')).click();
						expInput.sendKeys("Test #"+testNum);
						ball.click();
						descInput.sendKeys("Test Test Test #"+ testNum);
						
						element(by.id('E2E-ExpSave')).click();
						protractor.get.doneButton.click();	
					});


			});
		
	});
