angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsNotificationsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicViewSwitcher',
  function($scope, $state, $ionicViewSwitcher) {

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
  		$scope.user.updateAttr('text_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
  	}

  	$scope.emailNotifiationChange = function() {
  		$scope.user.updateAttr('email_notifications', $scope.user, $scope.user.email_notifications, null, $scope);
  	}

  	$scope.emailNotifiationChange = function() {
  		$scope.user.updateAttr('push_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
  	}

  }

]);

