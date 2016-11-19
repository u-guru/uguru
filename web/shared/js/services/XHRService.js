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
    getFileWithProgress: getFileWithProgress,
    updateJSONFile: updateJSONFile
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
          var i,j,subArray,chunk = 5000;
          for (i=0,j=arr.length; i<j; i+=chunk) {

             subArray = arr.subarray(i,i+chunk);
             raw += String.fromCharCode.apply(null, subArray);
          }

          // This works!!!
          var b64=btoa(raw);
          var dataURL="data:image/jpeg;base64,"+b64;
          // $timeout(function() {
            callback(dataURL);
          // }, 1000)

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


  function updateJSONFile(test_url, data, post_success_callback) {
      function callback(resp ) {
        if (resp.status === 200 && resp.readyState === 4 && resp.statusText === "OK") {
          getJSONFile('GET', test_url, post_success_callback)
        }
      }
      getJSONFile('PUT', test_url, callback, JSON.stringify(data), true)
  }
  function getJSONFile(request_type, url, callback, params, skip_parse) {
    skip_parse = skip_parse || false;

    var xhr = new XMLHttpRequest();
    XHRQueue.push({xhrObj: xhr, type: request_type, url:url, func: callback, params: params});
    var frontQueue = XHRQueue.splice(0, 1)[0];
    if (XHRQueue.length < XHR_THRESHOLD + 1) {

      frontQueue.xhrObj.open(frontQueue.type, frontQueue.url, true);
      xhr.onload = function () {

          if (!skip_parse) {
            var responseDict = JSON.parse(frontQueue.xhrObj.responseText);
            callback && callback(responseDict);
          } else {
            callback && callback(frontQueue.xhrObj);
          }
      };
      ['POST', 'PUT'].indexOf(request_type) > -1 && xhr.setRequestHeader("Content-type", "application/json");
      // console.log('sending', frontQueue.type, frontQueue.url, request_type)
      xhr.send(params);

    } else {
      if (XHRQueue.length && XHRQueue.length >= XHR_THRESHOLD) {
        $timeout(function() {
          getJSONFile(request_type, url, callback, params)
        }, 1000);
      }
    }
  }


}
