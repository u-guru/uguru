
var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Add a Course', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));
	var searchBar = element(by.css(".list.pure-u-1"));
	it ("go to course page",function()
		{
		 	protractor.get.closeBar.click();  
    		browser.wait(EC.visibilityOf(element(by.id("home-page"))),1000);
    		element(by.id('questions-button')).click();
        	expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/courses");

		});
	it ("add a Course",function(){
		 
		element(by.id('E2E-request-moreCourse')).click();

		protractor.get.sessionButton.click();
		expect(searchBar.isDisplayed()).toBeTruthy();
		
				//element(by.id("student-course-input")).sendKeys("CS");
		 	// 	element.all(by.repeater('course in matchingCourses')).then(function(items)
				// {
				// 	items[0].getAttribute('value').then(function(value)
				// 		{
				// 			console.log(value);

				// 		});
				// 	//items[0].click();
				// });
		 		// element(by.css('[ng-click="closeRequestModal()"]')).click();
		
		browser.sleep(4000);
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