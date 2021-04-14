
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
    disable: disable,
    setIOSBadge: setIOSBadge
  }


  function init() {

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
          "windows": windowsSettings 
      });


      push.on('registration', function(data) {
              // data.registrationId
              uTracker.track(tracker, "Push Registration", {
                "$Registration_ID": data.registrationId
              });
      });

      push.on('notification', function(data) {

          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
      });

      push.on('error', function(e) {
          return
          // e.message
      });

  }

  function enable() {

    init();
  }

  function disable() {

    push.unregister(success, error);

    function success() {
      return
    }

    function error() {
      return
    }

  }


  function setIOSBadge(number) {

    push.setApplicationIconBadgeNumber(successCallback, errorCallback, number);
    function successCallback() {
      return
    }
    function errorCallback(err) {
      return
    }


  }

}








