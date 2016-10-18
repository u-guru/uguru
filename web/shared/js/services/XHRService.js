angular.module('uguru.shared.services')
.factory("XHRService", [
    '$timeout',
    XHRService
        ]);

function XHRService($timeout) {
  var XHRQueue = [];
  var XHR_THRESHOLD = 5;

  return {
    getJSONFile: getJSONFile,
    getFileWithProgress: getFileWithProgress
  }

  function getFileWithProgress(url, progress, params, callback) {
    var xhr = new XMLHttpRequest();

    XHRQueue.push({xhrObj: xhr, type: 'GET', url:url, func: callback, params: params});
    if (XHRQueue.length < XHR_THRESHOLD) {

      var frontQueue = XHRQueue.splice(0, 1)[0];

      frontQueue.xhrObj.open(frontQueue.type, frontQueue.url, true);
      frontQueue.xhrObj.responseType = 'arraybuffer';
      xhr.onprogress = function(oEvent) {

          // var responseDict = JSON.parse(frontQueue.xhrObj.responseText);

          progress && progress(oEvent);
      }

      xhr.onload = function (e) {
          var arr = new Uint8Array(this.response);


          // Convert the int array to a binary string
          // We have to use apply() as we are converting an *array*
          // and String.fromCharCode() takes one or more single values, not
          // an array.
          var raw = '';
          var i,j,subArray,chunk = 50;
          for (i=0,j=arr.length; i<j; i+=chunk) {

             subArray = arr.subarray(i,i+chunk);
             console.log(btoa(String.fromCharCode.apply(null, subArray)))
             raw += String.fromCharCode.apply(null, subArray);
          }

          // This works!!!
          var b64=btoa(raw);
          var dataURL="data:image/jpeg;base64,"+b64;
          callback(dataURL)
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



  function getJSONFile(request_type, url, callback, params) {


    var xhr = new XMLHttpRequest();
    XHRQueue.push({xhrObj: xhr, type: request_type, url:url, func: callback, params: params});
    var frontQueue = XHRQueue.splice(0, 1)[0];
    if (XHRQueue.length < XHR_THRESHOLD + 1) {

      frontQueue.xhrObj.open(frontQueue.type, frontQueue.url, true);
      xhr.onload = function () {

          var responseDict = JSON.parse(frontQueue.xhrObj.responseText);
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
