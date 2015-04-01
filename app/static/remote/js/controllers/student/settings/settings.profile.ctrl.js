angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$ionicHistory',
  function($scope, $state, $timeout, $ionicHistory) {

	   $scope.progress_active = false;
	   $scope.saveProfile = function() {

             $scope.rootUser.updateLocal($scope.user);
		// $scope.showSuccess('Saved!');
        }
    }
]);

