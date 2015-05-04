angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsNotificationsController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {


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

