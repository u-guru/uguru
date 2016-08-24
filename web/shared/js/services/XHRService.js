angular.module('uguru.shared.services')
.factory("XHRService", [
    '$timeout',
    XHRService
        ]);

function XHRService($timeout) {
  var XHRQueue = [];
  var XHR_THRESHOLD = 5;

  return {
    getJSONFile: getJSONFile
  }

  function getJSONFile(request_type, url, callback, params) {


    var xhr = new XMLHttpRequest();
    XHRQueue.push({xhrObj: xhr, type: request_type, url:url, func: callback, params: params});
    var frontQueue = XHRQueue.splice(0, 1)[0];
    if (XHRQueue.length < XHR_THRESHOLD + 1) {

      frontQueue.xhrObj.open(frontQueue.type, frontQueue.url, true);
      xhr.onload = function () {

          var responseDict = JSON.parse(frontQueue.xhrObj.responseText);
          console.log(frontQueue.xhrObj.responseText)
          callback && callback(responseDict);
      };
      xhr.send();

    } else {
      if (XHRQueue.length && XHRQueue.length >= XHR_THRESHOLD) {
        $timeout(function() {
          getJSONFile(request_type, url, callback, params)
        }, 1000);
      }
    }
  }


}
