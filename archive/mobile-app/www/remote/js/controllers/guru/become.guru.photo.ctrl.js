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
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  'CameraService',
  'uTracker',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, CameraService, uTracker, LoadingService) {

    $scope.root.vars.becomeGuruRecentlyCompleted = true;
   function takePhotoSuccess() {

      uTracker.track(tracker, 'Guru Mode', {
        '$Photo_Method': 'Camera'
      });
      photoSuccessUpload()
      // LoadingService.showSuccess("Awesome! You're all set.", 2000);
      // $ionicViewSwitcher.nextDirection('forward');
      // $timeout(function() {
      //   $scope.root.vars.guru_mode = true;
      //   $state.go('^.guru');
      // }, 700);
    }


    function uploadPhotoSuccess() {

      uTracker.track(tracker, 'Guru Mode', {
        '$Photo_Method': 'Library'
      });
      photoSuccessUpload()

    }
    function photoSuccessUpload()
    {
      LoadingService.showSuccess("Awesome! You're all set.", 2000, function() {

        $scope.root.vars.showFinishBecomeGuruButton = true;
      });

    }

    $scope.goToGuru = function() {
      $ionicViewSwitcher.nextDirection('forward') ;
      $state.go('^.guru');
    }

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'})
      } else {

        //no need to show action bar on desktop
        if ($scope.desktopMode) {
          takePhoto(0);
          return;
        }
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
        CameraService.takePicture(successCallback, index);

        function successCallback(imageData) {


          var image = document.getElementById('user-instant-photo');
          image.src = 'data:image/jpeg;base64,' + imageData;
          //image.src = imageURI;


          $scope.photoUploaded = true;

          //package up imageData to save to server
          var formData = new FormData();
          formData.append('file', imageData);
          var file_name = new Date().getTime().toString();
          formData.append('filename', file_name);

          //if user is uploading a transcript
          if ($scope.root.vars.profile_url_changed) {
            formData.append('transcript_url', is_transcript);
          }
          //if user is logged in
          if ($scope.root.vars.profile_url_changed && $scope.user.id) {
            formData.append('profile_url', $scope.user.id);
          }

          LoadingService.showSuccess('Saving...', 2000);

          // var callback_success = function() {
          //   LoadingService.showSuccess("Photo Successfully Saved");
          // }

          var callback_failure = function() {
            LoadingService.showSuccess("Something went wrong... Please contact support");
          }

          $timeout(function() {

            $scope.user.createObj($scope.user, 'files', formData, $scope, takePhotoSuccess, callback_failure);
          }, 500)

        }


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

        LoadingService.showSuccess('Saving...', 1500);
        $timeout(function() {
          $scope.user.createObj($scope.user, 'files', formData, $scope, uploadPhotoSuccess);
        }, 500);
    };

  }


])