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
  '$ionicPlatform',
  '$cordovaStatusbar',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicPlatform, $cordovaStatusbar) {

    $scope.uberFriendlyChange = function() {
      $scope.user.updateAttr('uber_friendly', $scope.user, $scope.user.uber_friendly, null, $scope);
    }

    $scope.getNumber = function(num) {
        return new Array(num)
    }

    $scope.outsideSchoolChange = function() {
      $scope.user.updateAttr('outside_university', $scope.user, $scope.user.outside_university, null, $scope);
    }

    $scope.summer15Change = function() {
      $scope.user.updateAttr('summer_15', $scope.user, $scope.user.summer_15, null, $scope);
    }

    $scope.saveProfile = function() {
      var callback = function() {
        $state.go('^.root.guru-profile');
      }
      $scope.user.updateAttr('add_guru_intro', $scope.user, $scope.user.guru_introduction, callback, $scope);
      $scope.success.show(0, 1500, 'Saved! Great job.');
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
        $scope.loader.show();
        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };

  }

]);
