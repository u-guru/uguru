angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$cordovaProgress',
  '$timeout',
  '$ionicHistory',
  function($scope, $state, $cordovaProgress, $timeout, $ionicHistory) {
    
	$scope.progress_active = false;
	$scope.saveProfile = function() {
		console.log($scope.user.email);
		$scope.rootUser.updateLocal($scope.user);
		$scope.showSuccess('Saved!');
	}

	$scope.showSuccess = function(msg) {
      if (!$scope.progress_active)  {
      		$scope.progress_active = true;
      		$cordovaProgress.showSuccess(true, msg)
	      	$timeout(function() {
	        	$cordovaProgress.hide();
	        	$scope.progress_active = false;
	        	$ionicHistory.goBack();
	      	}, 1000);
      } else {

      	console.log('Show success cannot be shown because progress bar is already active');
      }
    }

  }

]);

