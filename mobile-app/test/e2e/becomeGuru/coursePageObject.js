'use strict';
var Course = function()
{
	this.CourseTitle = element(by.css('#course .third'));
	this.CourseList = element.all(by.css('#courses-list li:not(.ng-hide)'));
	this.SelectCourse = element.all(by.repeater('course in user.guru_courses'));
	this.InputModel = 'course_search_text';
	this.nextStep = element.all(by.css('[ng-click="nextSlide()"]'));


	this.CheckIsAtCoursePage = function()
	{
		expect(this.CourseTitle.getText()).toContain("ADD COURSES");
	};
	this.CheckRepeatingData = function()
	{
		doc.checkLists('courses-list','course.name');
	};

	this.CheckCourseListNotEmpty =function()
	{
		expect(this.CourseList.first().isPresent()).toBe(true,"[#course-list] should not be empty");

		// this.CourseList.then(function (items) {
		// 	expect(items.length).not.toBe(0,"Empty [#course-list]");
		// });

	};
	this.CheckCourseListEmpty = function()
	{	
		expect(this.CourseList.first().isPresent()).toBe(false,"[#course-list] should be empty");

		// this.CourseList.then(function (items) {
  //   		expect(items.length).toBe(0,"Choosen Result is still in the list");
  //   	});		

	};

	this.ScrollCourseListTo =function(index)
	{
		this.CourseList.then(function (items) {
			browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
		});
	};

	this.CheckMoreCourseIsLoad = function(CompareIndex)
	{
		this.CourseList.then(function (items) {
			expect(items.length >CompareIndex).toBe(true,"no data is loading in #course-list");
		});
	};

	this.CheckListCourseContain = function(contain)
	{
		this.CourseList.then(function (items) {
			expect(items.length != 0).toBe(true,"No List is shown , List Length : " + items.length );
			for(var i = 1 ; i < items.length ; ++i)
				expect(items[i].getText()).toContain(contain);
		});
	};

	this.SelectCourseHasRightName = function(total,index,name)
	{
		expect(this.SelectCourse.isPresent()).toBe(true);
		element.all(by.repeater('course in user.guru_courses')).then(function (items) {
	        expect(items.length).toBe(total);
			expect(items[index].getText()).toBe(name);			     	
	    });		

	};
	 this.SelectCourse = function(index)
	 {
	 	doc.newPickList('courses-list',index);
	 };


     this.SearchCourseName = function(name)
     {
     	doc.setInput(name,0,this.InputModel);
     };
     this.IsCourseSearchBarEmpty = function()
     {
     	doc.setInput("",0,this.InputModel);
     };
     this.ClearSearchBar = function()
     {
     	doc.setInput("",0,this.InputModel,true);
     };
     this.GoToNextPage =function()
     {
     	this.nextStep.then(function(items)
 		{
 			expect(items[1].getText()).toBe('PHOTO')
 			items[1].click();
 		});
     };
  

}
module.exports = Course