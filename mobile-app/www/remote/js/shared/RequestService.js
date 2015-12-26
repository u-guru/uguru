angular
	.module('sharedServices')
	.factory("RequestService", [
		RequestService
	]);

function RequestService() {
  var _types = {DEFAULT:0, QUICK_QA:1}
  var MAX_REQUEST_HOURS = 10;

  return {

    init:init,
    initSample: initSample,
    validate:validate,
    getMaxNumHourArr:getMaxNumHourArr

  }

  function validate() {
    return;
  }

  function getMaxNumHourArr() {
    var result = [];
    for (var i = 0; i < MAX_REQUEST_HOURS; i++) {
      result.push(i)
    }
    return result;
  }

  function init() {


    return {
      type: _types.DEFAULT,
      info: {
        course: {},
        description: 'This is a sample description already filled in through the scope.request.info.description vars variable. To set the default go to RequestService.js and edit the initEmpty() function and ',
        tags: [],
        attachments: []
      },
      user: {
        is_urgent:true,
        time_estimate: {hours:0, minutes: 30},
        location: {latitude:null, latitude: null},
        availability: [] //{start: UTCJSDate, end UTCJSDate}
      },
      compensation: {
        preferred: [],
        payment_card: null, //{card_token}
      }
    }


  }

  function initSample() {
    var requestObj = init();
    console.log('initialized request obj', requestObj);
    requestObj.info.course = {'id': 21231, short_name: 'CS10', full_name: 'The Beauty and Joy of Computing', department_short: "CS", department_long: "Computer Science", code: "10"}
    requestObj.info.tags = [{name: 'composition of functions'}, {name: 'recursion'}, {name: 'exam prep'}, {name:'for-loops'}, {name:'iterations'}, {name:'im so screwed lol'}];
    requestObj.info.empty_tag = {name:''}
    return requestObj;
  }





}