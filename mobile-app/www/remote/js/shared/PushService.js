
angular
.module('sharedServices')
.factory("PushService", [
  PushService
	]);

function PushService() {

var push = null;

  return {
    init: init
  }


  function init() {

      console.log("initalizing Push Service");

      push = PushNotification.init({ "android": {"senderID": "413826461390"},
           "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );



      push.on('registration', function(data) {
              // data.registrationId
              console.log("registrationId: " + data.registrationId);
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

}