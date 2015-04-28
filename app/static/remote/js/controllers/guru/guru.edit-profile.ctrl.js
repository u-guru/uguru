angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruEditProfileController', [

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

    $scope.saveProfile = function() {
      $scope.user.updateAttr('add_guru_intro', $scope.user, $scope.user.guru_introduction, null, $scope);
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/add-major.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addMajorModal = modal;
    });

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
            image.src = e.target.result;
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
