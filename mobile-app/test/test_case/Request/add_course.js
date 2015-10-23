var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Add Course', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));
	it ("go to course page",function()
		{
		 	protractor.get.closeBar.click();  
    		//browser.wait(EC.visibilityOf(element(by.id("home-page"))),1000);
            browser.sleep(500); 

    		element(by.id('questions-button')).click();
        	expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/courses");

		});
	it ("add a Course",function(){
		protractor.get.request.click();
		protractor.get.sessionButton.click();
		expect(title.getText()).toBe('Request a Session');

		courseInput.sendKeys("CS");
 		element.all(by.repeater('course in root.vars.matchingCourses')).then(function(items)
		{
			items[0].click();
		});
 		element(by.css('[ng-click="closeRequestModal()"]')).click();
	});
	it("check course is added",function()
		{
			element.all(by.repeater('course in user.student_courses')).then(function(courses)
			{
				//expect(items.length).toBe(1);
				//expect(items[0].getText()).toBe('Hum CS M10A');
				courses.last().getAttribute('value').then(function(value)
				{
					expect(value).toBe("Hum CS M10A");
				});	
			});
		});

});