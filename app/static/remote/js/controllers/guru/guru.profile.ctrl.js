angular.module('uguru.guru.controllers')

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
  '$ionicSideMenuDelegate',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicSideMenuDelegate) {

    $ionicSideMenuDelegate.canDragContent(false);

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

        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('profile_url', $scope.user.id);
        formData.append('profile_url', $scope.user.id);
        $scope.loader.show();
        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };

     document.addEventListener("resume", function() {


          if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

                    $ionicViewSwitcher.nextDirection('enter');
                    $state.go('^.guru');
          }

          if ($scope.user && $scope.user.active_guru_sessions && ($scope.user.active_guru_sessions.length > 0) || $scope.user.pending_student_ratings.length > 0) {

                  $ionicViewSwitcher.nextDirection('enter');
                  $state.go('^.guru');
          }


    }, false);


  }

]);
