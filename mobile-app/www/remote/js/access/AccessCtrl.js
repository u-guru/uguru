angular.module('uguru.util.controllers')
.controller('AccessController', [
  '$scope',
  '$timeout',
  '$state',
  '$ionicViewSwitcher',
  'DeviceService',
  'LoadingService',
  'AccessService',
  'AnimationService',
  '$templateCache',
  '$ionicSideMenuDelegate',
  'DownloadService',
  'UniversityMatcher',
  '$ionicSlideBoxDelegate',
  'ThrottleService',
  'Utilities',
  '$ionicScrollDelegate',
  'CordovaPushWrapper',
  '$ionicModal',
  AccessController
  ]);

function AccessController($scope, $timeout, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService,
  $templateCache, $ionicSideMenuDelegate, DownloadService, UniversityMatcher,
  $ionicSlideBoxDelegate, ThrottleService, Utilities, $ionicScrollDelegate,
  CordovaPushWrapper, $ionicModal) {

  //this prevents side bar from coming
  $ionicSideMenuDelegate.canDragContent(false);
  $ionicSlideBoxDelegate.enableSlide(false);

  $scope.access = {
    codeInput: '',
    consoleMsg: 'Got an access code?',
  };


  $scope.platform.android = DeviceService.isAndroid();
  $scope.root.vars.guru_mode =false;


  $scope.goToLoginFromAccess = function() {
    // $scope.root.vars.page_cache.login_mode = true;
    $scope.root.vars.loginMode = true
    if ($scope.desktopMode) {
      AnimationService.flip('^.desktop-login')
    } else {
      $scope.signupModal.show();
    }
  }

  $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
  }).then(function(modal) {
        $scope.signupModal = modal;
  });

  $scope.checkAccessCode = function(code) {

    if ($scope.keyboardExists && !$scope.redeemRecentlyPressed) {
      $scope.redeemRecentlyPressed = true;
      $timeout(function() {
        $scope.redeemRecentlyPressed = false;
      }, 500);
    }


    LoadingService.showAmbig('Verifying', 10000);
    $scope.access.codeInput = '';
      //accessInput.removeEventListener('keyup', submitListener);
    $scope.redeemRecentlyPressed = false;
    //clsoe the keyboard
    if (DeviceService.doesCordovaExist()) {
        cordova.plugins.Keyboard.close();
    }


    var successCallback = function(data) {
      $scope.root.vars.tempUser = data;
      $timeout(function() {
          LoadingService.hide();
          $timeout(function() {
              LoadingService.showSuccess('Access Granted', 2000);
            }, 250);

          $scope.user.access_code = true;

        $timeout(function() {
            $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').next();
        }, 1500);

      }, 500);
    }

    var failureCallback = function() {

        LoadingService.hide();
          // var errorTextElem = document.getElementById('input-error-text');
          // errorTextElem.style.opacity = 1;
          // errorTextElem.innerHTML = 'Incorrect access code!';
          // $scope.access.codeInput = '';

          //fadeout after 500 seconds
          // var postShakeCallback = function() {
          //       setTimeout(function() {
          //         LoadingService.hide();
          //         AnimationService.fadeOutElem(errorTextElem, 1000);
          //       }, 1500);
        $timeout(function() {
          $scope.loader.showMsg('Invalid access code, please try again.', 0, 3500);
        })
      };


        // AnimationService.shakeElem(errorTextElem, 500, postShakeCallback);



    AccessService.validate(code, successCallback, failureCallback);


  };

 ////
  $scope.accessInputOnFocus = function() {
    $scope.inputFocused = true;
    // this is a device
    if (Utilities.cordovaExists && Utilities.keyboardExistsAndVisible) {

      if (DeviceService.isIOSDevice()) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.scrollTo(0, window.innerHeight);

      }

    } else {

      if (DeviceService.isIOSDevice()) {
        window.scrollTo(0, window.innerHeight - 224 - 20);
      } else {
      // this is the case for ios mobile safari or android softkeyboard
        window.scrollTo(0, window.innerHeight);
      }
    }

  };



  $scope.$on('$ionicView.loaded', function() {

    AnimationService.accessInput = document.querySelector("access-code-bar");
    CordovaPushWrapper.registerDevice($scope);

  });

  $scope.accessInputOnBlur = function(e) {
    $scope.inputFocused = false;
    if ($scope.keyboardExists && $scope.redeemRecentlyPressed) {
      return;
    }


  };

}
