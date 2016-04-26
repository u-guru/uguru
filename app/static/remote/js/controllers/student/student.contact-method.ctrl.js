angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestContactController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicHistory',
  '$cordovaPush',
  '$ionicViewSwitcher',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $cordovaPush, $ionicViewSwitcher) {

    $scope.saveAndGoToRequest = function() {
      if ($scope.user.phone_number && $scope.user.phone_number.length > 0)  {
        $scope.user.updateAttr('phone_number', $scope.user, $scope.user.phone_number, null, $scope);
        $scope.root.vars.request.contact.phone = true;
      }

      if ($scope.user.email && $scope.user.email.length > 0) {
        $scope.user.updateAttr('email_notifications', $scope.user, $scope.user.email_notifications, null, $scope);
        $scope.root.vars.request.contact.email = true;
      }

      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
        //mixpanel track
      mixpanel.track("Student.request");
      $state.go('^.student-request');

    }


    $scope.emailNotificationChange = function() {
      $scope.user.updateAttr('email_notifications', $scope.user, $scope.user.email_notifications, null, $scope);
    }



    $scope.requestPushNotifications = function() {

      if (!$scope.user.push_notifications) {
        $scope.user.updateAttr('push_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
        return;
      }

      var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
      }

      $cordovaPush.register(iosConfig).then(function(deviceToken) {
        if ($scope.platform.ios) {
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);

            payload = {
              'push_notifications': true
            }
            $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
        }

      }, function(err) {
        console.error(err);
      });

    };
  }

]);
