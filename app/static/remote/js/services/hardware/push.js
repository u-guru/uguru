angular.module('uguru.root.services')
.service('CordovaPushWrapper',
    [
    '$localstorage',
    '$timeout',
    '$cordovaPush',
    '$cordovaMedia',
    '$cordovaDialogs',
    'Popup',
    function($localstorage, $timeout, $cordovaPush, $cordovaMedia, $cordovaDialogs, Popup) {

        var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
        };

        var androidConfig = {
          "senderID": "413826461390",
          'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
        }

        var registerGPSDevice = function($scope, callback) {

            var config;
            if ($scope.platform.ios) {
                config = iosConfig;
            } else {
                config = androidConfig;
            }

            $cordovaPush.register(config).then(function (result) {

                console.log("Register success " + result);
                console.log(JSON.stringify(result));

                if ($scope.platform.ios) {
                    $scope.user.push_notifications = true;
                    $scope.user.current_device.push_notif = result;
                    $scope.user.current_device.push_notif_enabled = true;
                    $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
                    if (callback) {
                        callback();
                    }
                }

            }, function (err) {
                    $scope.user.push_notifications = false;
                    //we do not have their token
                    $scope.user.current_device.push_notif_enabled = false;
                    $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
                    console.log("Register error " + err)
                    if (callback) {
                        callback();
                    }
            });
        }


        function registerDevice($scope, callback) {

          if ($scope.platform.ios &&
              !$scope.user.current_device.push_notif_enabled) {

                $scope.popupScope.push_options = {
                        header: 'Be notified immediately',
                        body: 'Gurus will reply to your request and are also busy. We want to make sure that you never miss any opportunity to connect.',
                        positiveBtnText: 'OK',
                        negativeBtnText: 'Nah',
                        delay: 500,
                        pre_delay:1500,
                        onFailure: function() {
                            $scope.user.current_device.push_notif_enabled = false;
                            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
                            if (callback) {
                                callback()
                            }
                        },
                        onSuccess: function() {
                            registerGPSDevice($scope, callback)
                        },
                }

                Popup.options.show($scope.popupScope, $scope.popupScope.push_options);

           }
           //register for android
           else {

            registerGPSDevice($scope);

           }


        }

        function handleAndroid(notification, $scope) {

            console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
            if (notification.event == "registered") {
                var regId = notification.regid;

                $scope.user.current_device.push_notif = regId;
                $scope.user.current_device.push_notif_enabled = true;
                console.log(regId);
            }
            else if (notification.event == "message") {
                $cordovaDialogs.alert(notification.message, "Push Notification Received");
                // $scope.$apply(function () {
                //     $scope.notifications.push(JSON.stringify(notification.message));
                // })
            }
            else if (notification.event == "error")
                $cordovaDialogs.alert(notification.msg, "Push notification error event");
            else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
        }

        function handleIOS(notification, $scope) {
        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
        // the notification when this code runs (weird).
        if (notification.foreground == "1") {
                // Play custom audio if a sound specified.
                if (notification.sound) {
                    var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                    mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
                }

                if (notification.body && notification.messageFrom) {
                    $cordovaDialogs.alert(notification.body, notification.messageFrom);
                }
                else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

                if (notification.badge) {
                    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                        console.log("Set badge success " + result)
                    }, function (err) {
                        console.log("Set badge error " + err)
                    });
                }
            }
            // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
            // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
            // the data in this situation.
            else {
                if (notification.body && notification.messageFrom) {
                    $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
                }
                else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
            }
        }



        cordovaPushWrapper = {
            register: function($scope, callback) {

              registerDevice($scope, callback);

            },
            received: function($scope, event, notification) {

                if ($scope.platform.ios) {
                  handleiOS(notification, $scope);

                }

                else {
                  handleAndroid(notification, $scope);
                }

            }
        };

        return cordovaPushWrapper;

}]);