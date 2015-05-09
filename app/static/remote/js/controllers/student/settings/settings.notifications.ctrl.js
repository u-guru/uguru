angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsNotificationsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicViewSwitcher',
  '$timeout',
  '$cordovaPush',
  function($scope, $state, $ionicViewSwitcher, $timeout, $cordovaPush) {

    $scope.goBack = function() {
      $ionicViewSwitcher.nextDirection('back');
      $scope.root.vars.select_bottom_three = true;
      if ($scope.user.guru_mode) {
        $state.go('^.guru-home');
      } else {
        $state.go('^.student-home');
      }

    }

  	$scope.textNotificationChange = function() {
  		$scope.success.show(0, 1000, 'Coming Soon!');
      $timeout(function() {
        $scope.user.text_notifications = false;
      }, 1500)
  	}

  	$scope.emailNotifiationChange = function() {
  		$scope.user.updateAttr('email_notifications', $scope.user, $scope.user.email_notifications, null, $scope);
  	}

  	$scope.pushNotificationChange = function() {
      $timeout(function() {

      if (!$scope.user.push_notifications) {
        console.log('push notifications are false');
        $scope.user.updateAttr('push_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
        return;
      }
      var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
      }
      $cordovaPush.register(iosConfig).then(function(deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log('push notifications are true');
        console.log("deviceToken: " + deviceToken)

        console.log("Register success " + deviceToken);


        if ($scope.platform.ios) {
          console.log('updating the server...');
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
            $scope.user.updateAttr('push_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
        }

      }, function(err) {
        console.log(err);
        $scope.user.updateAttr('devices', $scope.user.current_device, $scope.user.current_device, null, $scope);
      });


      }, 500)
  	}

  }

]);

