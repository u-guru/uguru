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

    if ($scope.user.current_device.push_notif_enabled) {
      $scope.root.vars.request.contact.push = true;
    }

    $scope.saveAndGoToRequest = function() {
      if ($scope.user.phone_number && $scope.user.phone_number.length > 0)  {
        $scope.user.updateAttr('phone_number', $scope.user, $scope.user.phone_number, null, $scope);
        $scope.root.vars.request.contact.phone = true;
      }

      if ($scope.user.email && $scope.user.email.length > 0) {
        $scope.user.updateAttr('email', $scope.user, $scope.user.email, null, $scope);
        $scope.root.vars.request.contact.email = true;
      }

      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
      $state.go('^.student-request');

    }


    $scope.requestPushNotifications = function() {

      var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
      }

      $cordovaPush.register(iosConfig).then(function(deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log("deviceToken: " + deviceToken)

        console.log("Register success " + deviceToken);


        if ($scope.platform.ios) {
          console.log('updating the server...');
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        }

      }, function(err) {
        console.log(err);
      });

    };
  }

]);
