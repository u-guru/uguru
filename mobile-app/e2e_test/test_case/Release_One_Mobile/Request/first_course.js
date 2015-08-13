var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('First time add Course', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));
	var title = element(by.css(".title.dont-modify-bounds.ng-binding"));
	it ("go to course page",function()
		{
		 	protractor.get.closeBar.click();  
    		browser.wait(EC.visibilityOf(element(by.id("home-page"))),1000);

    		element(by.id('questions-button')).click();
        	expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/courses");

		});
	it ("add a Course",function(){
		 
		element(by.id('E2E-request-course')).click();

		protractor.get.sessionButton.click();
		expect(title.getText()).toBe('Request a Session');

		element(by.name("course-input")).sendKeys("CS");
 		element.all(by.repeater('course in root.vars.matchingCourses')).then(function(items)
		{
			items[0].click();
		});
 		element(by.css('[ng-click="closeRequestModal()"]')).click();
	});
	it("check course is added",function()
		{
			element.all(by.repeater('course in user.student_courses'))
			.first()
			.getAttribute('value')
			.then(function(value)
				{
					expect(value).toBe("Hum CS M10A");
				});
		});

});