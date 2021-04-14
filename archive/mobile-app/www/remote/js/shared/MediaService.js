
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
    var filePath = directory + fileName;
    var mediaRec = new Media(filePath,
        // success callback
        function() {
          return
        },

        // error callback
        function(err) {
            return
        });

    // Record audio
    mediaRec.startRecord();
    var count = 0;
    var recording = $interval(function() {
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
    var filePath = directory + testName;
    // window.resolveLocalFileSystemURL(filePath, fileSuccess, fileError);
    // function fileSuccess(fileEntry) {

      var url = "http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3";
      var media = new Media(url,
        function() {
          return
        },
        function(err) {
          return
        }
      );

      media.play();


  }


}