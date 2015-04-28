angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  'Camera',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera) {

    $scope.takePhoto = function() {
    if ($scope.platform.mobile) {
      Camera.takePicture($scope);
    } else {
      var element = document.getElementById('guru-file-input-web')
      element.click();
    }
  }

  $scope.file_changed = function(element) {
        var photofile = element.files[0];
        var reader = new FileReader();
        var image = document.getElementsByClassName('guru-profile-container')[0];

        reader.onload = function(e) {
            $scope.user.profile_url = e.target.result;
        };

        reader.readAsDataURL(photofile);
        // $scope.root.vars.request.files.push(true);

        var formData = new FormData();

        formData.append('file', photofile);
        // var file_name = new Date().getTime().toString();
        formData.append('profile_url', $scope.user.id);

        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };


  }

]);
