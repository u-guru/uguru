angular
.module('sharedServices')
.factory("RequestService", [
  RequestService
	]);

function RequestService() {
  var _types = {DEFAULT:0, QUICK_QA:1}

  return {

    init:init,
    initSample: initSample,
    validate:validate,

  }

  function validate() {
    return;
  }

  function init() {


    return {
      type: _types.DEFAULT,
      info: {
        course: {},
        description: '',
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









