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
      $timeout(function() {
        $state.go('^.guru');
      }, 1000)
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
        if ($scope.user.id) {
          $scope.root.vars.profile_url_changed = true;
        }
        Camera.takePicture($scope, index, 'user-instant-photo', $scope.takePhotoCallbackSuccess);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    $scope.closeAttachActionSheet = function() {
      $scope.closeAttachActionSheet();
    }

    $scope.userPhotoList = [];
    $scope.samplePhotoList = [{src: '/img/onboarding/profile1.jpg'},
      {src: '/img/onboarding/profile2.jpg'},
      {src: '/img/onboarding/profile3.jpg'},
      {src: '/img/onboarding/profile4.jpg'},
    ]


    //on web interface
    $scope.file_changed = function(element) {

        var photofile = element.files[0];

        var reader = new FileReader();



        var image = document.getElementById('user-instant-photo');

        reader.onload = function(e) {
            if (image) {
              image.src = e.target.result;
              $scope.user.profile_url = image.src;
            }
        };

        reader.readAsDataURL(photofile);
        $scope.photoUploaded = true;

        var formData = new FormData();

        formData.append('file', photofile);
        if ($scope.user.id) {
          formData.append('profile_url', $scope.user.id);
          $scope.root.vars.profile_url_changed = true;
        }

        name = new Date().getTime().toString();
        formData.append('filename', name);


        $scope.success.show(0, 1500, 'Saving...');
        $timeout(function() {
          $scope.user.createObj($scope.user, 'files', formData, $scope, $scope.takePhotoCallbackSuccess);
        }, 500);
    };

  }


])