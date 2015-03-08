angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsEditUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$cordovaProgress',
  '$timeout',
  '$ionicHistory',
  '$ionicModal',
  '$cordovaKeyboard',
  function($scope, $state, $cordovaProgress, $timeout, $ionicHistory,
  	$ionicModal, $cordovaKeyboard) {
    $scope.editMode = false;
	$scope.progress_active = false;


	$scope.saveUniversity = function() {
		$scope.rootUser.updateLocal($scope.user);
		$scope.showSuccess('Saved!');
	}

	$ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addUniversityModal = modal;
	});

	$scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
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

