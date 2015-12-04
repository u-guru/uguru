'use strict';
var GPA = function() {
	this.InputModel = 'search_text.course'
	this.CloseModalButton = element(by.css('.modal-backdrop.active .header-down'));
	this.Modal = $('.modal-backdrop.active');
	this.Course = $('[ng-model="search_text.course"]');
	this.Credit = $('[ng-model="course.units"]');
	this.Year = $('[ng-model="course.year"]');
	this.Semester = $('[ng-model="course.semester"]');
	this.SubmitButton = $('#social-login button');
	this.ClearIcon = $('.major-input-close.side-icon');
	this.GradeButtons = $$('#grade-options button');
	 this.EnterCourse = function(name)
	 {
	 	doc.setInput(name,0,this.InputModel);
	 };

	 this.selectGrade = function(grade)
	 {
	 	this.GradeButtons.filter(function(elem, index) {
	 	  return elem.getText().then(function(text) {
	 	    return text === grade;
	 	  });
	 	}).then(function(filteredElements) {
	 	  filteredElements[0].click();
	 	});
	 };

	 this.clearCourse = function () 
	 {
	 	// body...
	 	this.ClearIcon.click();
	 };
	 this.checkModalClosed = function()
	 {
	 	expect(this.Modal.isPresent()).toBe(false);
	 };
	 this.CloseModal = function()
	 {
	 	// expect(this.CloseModalButton.isPresent()).toBe(true,"No Close Can Found");
		this.CloseModalButton.click();
	 };
	 this.SubmitForm =function()
	 {
	 	this.SubmitButton.click();
	 };

	 this.CheckModalTitle = function(name)
	 {
	 	expect(this.Modal.isPresent()).toBe(true,"No Modal Is Active");
	 	expect(element(by.css('.modal-backdrop.active')).getText()).toContain(name);
	 };
	 this.setInput = function(element,str)
	 {
	 	expect(element.getAttribute('value')).toBe("","default empty inputs");
	 	element.clear();
	 	element.sendKeys(str);
	 	expect(element.getAttribute('value')).toBe(str);
	 };
};
module.exports = new GPA();