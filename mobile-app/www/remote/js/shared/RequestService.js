angular
	.module('sharedServices')
	.factory("RequestService", [
		'Category',
    RequestService
	]);

function RequestService(Category) {
  var _types = {DEFAULT:0, QUICK_QA:1}
  var MAX_REQUEST_HOURS = 10;


  function getMaxNumHourArr() {
    var result = [];
    for (var i = 0; i < MAX_REQUEST_HOURS; i++) {
      result.push(i)
    }
    return result;
  }



  function initStudentForm(slide_box, scope) {
    console.log('subcategories', Category.getAcademic());
    return {
      course: null,
      urgent: true,
      subcategory: false,
      description: false,
      tags: [],
      subcategory: {selected: null, options: Category.getAcademic()},
      files: [],
      payment_card: null,
      calendar: null,
      time_estimate: {hours: null, minutes:null},
      position: {latitude: null, longitude: null},
      scope: scope,
      nav: {
        index: 1,
        next: function() {slide_box.enableSlide(true); slide_box.next(); slide_box.enableSlide(false); scope.requestForm.nav.index += 1},
        previous: function() {slide_box.enableSlide(true); slide_box.previous(); slide_box.enableSlide(false); scope.requestForm.nav.index -= 1},
        switchTo: function(index) {slide_box.enableSlide(true); slide_box.slide(index, 250); slide_box.enableSlide(false); scope.requestForm.nav.index = index},
      }
    }
  }
  return {
    initStudentForm:initStudentForm,
    getMaxNumHourArr: getMaxNumHourArr
  }

}