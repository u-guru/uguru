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
  'uTracker',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, Camera, uTracker) {


    function takePhotoCallbackSuccess($scope) {

      uTracker.track(tracker, 'Guru Mode', {
        '$Photo_Method': 'Camera'
      });
      $scope.loader.showSuccess("Awesome! You're all set.", 2000);
      $ionicViewSwitcher.nextDirection('forward');
      $timeout(function() {
        $state.go('^.guru');
      }, 1000)
    }


    $scope.uploadPhotoAndFinish = function() {

      uTracker.track(tracker, 'Guru Mode', {
        '$Photo_Method': 'Library'
      });
      $scope.loader.showSuccess("Awesome! You're all set", 3000);
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
        },
       buttonClicked: function(index) {
          takePhoto(index);
          $timeout(function() {
            $scope.closeAttachActionSheet();
            return true;
          }, 500);
       }
     });
    }


    function takePhoto(index) {
      if ($scope.platform.mobile) {
        if ($scope.user.id) {
          $scope.root.vars.profile_url_changed = true;
        }
        Camera.takePicture($scope, index, 'user-instant-photo', takePhotoCallbackSuccess);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    $scope.$on('$ionicView.enter', function() {
      $scope.user.is_a_guru = true;
      $localstorage.setObject('user', $scope.user);
      $scope.user.updateAttr('is_a_guru', $scope.user, true, null, $scope);

    })

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


        $scope.loader.showSuccess('Saving...', 1500);
        $timeout(function() {
          $scope.user.createObj($scope.user, 'files', formData, $scope, takePhotoCallbackSuccess);
        }, 500);
    };

  }


])