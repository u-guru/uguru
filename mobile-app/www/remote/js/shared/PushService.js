
angular
.module('sharedServices')
.factory("PushService", [
  'uTracker',
  PushService
	]);

function PushService(uTracker) {

var push = null;

  return {
    init: init,
    enable: enable,
    disable: disable
  }


  function init() {

      console.log("initalizing Push Service");

      var androidSettings = {
        'senderID': '413826461390'
      }

      var IOSSettings = {
        'alert': 'true',
        "badge": "true",
        "sound": "true"
      }

      var windowsSettings = {
        
      }

      push = PushNotification.init({ 
          "android": androidSettings,
          "ios": IOSSettings, 
          "windows": windowSettings 
      });


      push.on('registration', function(data) {
              // data.registrationId
              console.log("registrationId: " + data.registrationId);
              uTracker.track(tracker, "Push Registration", {
                "$Registration_ID": data.registrationId
              });
      });

      push.on('notification', function(data) {
         
        console.log("message: " + data.message);
        console.log("title: " + data.title);
          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
      });

      push.on('error', function(e) {
        console.log("error: " + e.message);
          // e.message
      });

      console.log("finished initializing pushService");

  }

  function enable() {

    init();
  }

  function disable() {

    push.unregister(success, error);

    function success() {
      console.log("Successfully unregistered push notifications.");
    }

    function error() {
      console.log("ERROR: Unable to unregister push notifications.")
    }

  }

}