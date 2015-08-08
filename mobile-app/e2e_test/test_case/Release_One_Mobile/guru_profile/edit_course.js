describe('Account Unit Test : Edit Course', function () {
	var editCourse = element(by.id('E2E-editProfile-editCourse'));
	var msg = element(by.id('E2E-msg'));

	it ("edit Course",function(){
		
		editCourse.click();
		element(by.id('guru-course-input')).sendKeys('a');
		element.all(by.repeater('course in matchingCourses')).count().then(function (count) {
          expect(count).not.toBe(0);
      	});
		protractor.get.doneButton.click();
	});

});