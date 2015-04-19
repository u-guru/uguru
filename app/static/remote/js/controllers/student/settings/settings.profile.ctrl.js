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

     $scope.changePasswordForm = {
      new_password:'',
      old_password:''
     }

	   $scope.saveProfile = function() {

        if (!$scope.user.email || !$scope.user.first_name || !$scope.user.last_name) {
          alert('please fill in all fields');
          return;
        }

        var successCallback = function(err) {
          if (err && err.status && err.status === 401) {
            alert('Incorrect username & password');
          } else {
            alert('Profile successfully saved!');
          }
        }

        payload = {
          email: $scope.user.email,
          first_name: $scope.user.first_name,
          last_name: $scope.user.last_name
        }

        $scope.user.updateAttr('profile_info', $scope.user, payload, successCallback, $scope);


    }
    $scope.changePassword = function() {

      if (!$scope.changePasswordForm.old_password || !$scope.changePasswordForm.new_password) {

        alert('please fill in all fields');
        return;

      }

      var successCallback = function(err) {
          if (err && err.status && err.status === 401) {
            alert('Incorrect old password. Try again?');
            $scope.changePasswordForm.old_password = '';
            $scope.changePasswordForm.new_password = '';
          } else {
            alert('Password successfully saved!');
          }
      }

      payload = {
        email: $scope.user.email,
        old_password: $scope.changePasswordForm.old_password,
        new_password: $scope.changePasswordForm.new_password
      }

      $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope);

    };

  }
]);

