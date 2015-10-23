
angular
.module('sharedServices')
.factory("MediaService", [
  'DeviceService',
  '$interval',
  MediaService
	]);

function MediaService(DeviceService, $interval) {

  var testName = '';

  return {

    recordAudio: recordAudio,
    playAudio: playAudio
  }


  function recordAudio() {

    var format = ".mp3";
    if(DeviceService.isAndroid()) {
      format = ".amr";
    }
    if(DeviceService.isIOS()) {
      format = ".wav";
    }
    
    var fileName = "myRecording" + format;
    testName = fileName;
    var directory = cordova.file.dataDirectory;
    var filePath = dircetory + fileName;

    var mediaRec = new Media(filePath,
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        });

    // Record audio
    mediaRec.startRecord();
    var count = 0;
    var recording = $interval(function() {
      console.log("recording audio....");
      count++;
      if(count===5) {
        $interval.cancel(recording);
        mediaRec.stopRecord();
      }
    }, 1000);

  }

  function playAudio(fileName) {

    var directory = cordova.file.dataDirectory;
    //var filePath = directory + fileName;

    //TODO: SHOULD REMOVE THESE AND UNCOMMENT THE LINE ABOVE ONCE TESTING IS COMPLETED
    console.log("testName: " + testName);
    var filePath = directory + testName;

    window.resolveLocalFileSystemURL(filePath, fileSuccess, fileError);
    function fileSuccess(fileEntry) {

      var media = new Media(filePath,
        function() {
          console.log("playAudio() success!");
        },
        function(err) {
          console.log("playAudio() error: " + err);
        }
      );

      media.play();

    }

    function fileError() {
      console.log("Could not find " + fileName);
    }

  }


}