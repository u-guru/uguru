angular.module('uguru.guru.controllers')

.controller('BecomeGuruPhotoController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  'Camera',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, Camera) {


    $scope.takePhotoCallbackSuccess = function($scope) {

      $scope.success.show(0, 2000, "Awesome! You're all set.");
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru');

    }


    $scope.uploadPhotoAndFinish = function() {
      $scope.success.show(0, 2000, "Awesome! You're all set.");
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru');
    }

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'})
      }

     // Show the action sheet
     $scope.closeAttachActionSheet = $ionicActionSheet.show({
       buttons: options,
       cancelText: 'Cancel',
       cancel: function() {
            $scope.closeAttachActionSheet();
        },
       buttonClicked: function(index) {
          $scope.takePhoto(index);

          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });
    }



    $scope.takePhoto = function(index) {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, $scope.takePhotoCallbackSuccess);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }


    $scope.closeAttachActionSheet = function() {
      $scope.closeAttachActionSheet();
    }



    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();


        var image = document.getElementById('sidebar-student-profile-photo');

        reader.onload = function(e) {
            $scope.user.profile_url = e.target.result;
        };

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('profile_url', $scope.user.id);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.user.createObj($scope.user, 'files', formData, $scope, $scope.takePhotoCallbackSuccess);
    };

  }


])