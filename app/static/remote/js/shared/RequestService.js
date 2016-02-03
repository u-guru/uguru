angular
	.module('sharedServices')
	.factory("RequestService", [
		'Category',
    RequestService
	]);

function RequestService(Category) {
  var _types = {DEFAULT:0, QUICK_QA:1}
  var MAX_REQUEST_HOURS = 10;

  return {
    initStudentForm:initStudentForm,
    getMaxNumHourArr: getMaxNumHourArr
  }


  function getMaxNumHourArr() {
    var result = [];
    for (var i = 0; i < MAX_REQUEST_HOURS; i++) {
      result.push(i)
    }
    return result;
  }



  function initStudentForm() {
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
      form: {
        index: 0,
      }
    }
  }

}