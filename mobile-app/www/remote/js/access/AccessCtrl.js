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
  'DeviceService',
  'DownloadService',
  'UniversityMatcher',
  '$ionicSlideBoxDelegate',
  'ThrottleService',
  'Utilities',
  '$ionicScrollDelegate',
  AccessController
  ]);

function AccessController($scope, $timeout, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService,
  $templateCache, $ionicSideMenuDelegate, DeviceService, DownloadService, UniversityMatcher,
  $ionicSlideBoxDelegate, ThrottleService, Utilities, $ionicScrollDelegate) {

  //this prevents side bar from coming
  $ionicSideMenuDelegate.canDragContent(false);
  $ionicSlideBoxDelegate.enableSlide(false)

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
  };


  $scope.platform.android = DeviceService.isAndroid();


  $scope.checkAccessCode = function(code) {

    if ($scope.keyboardExists && !$scope.redeemRecentlyPressed) {
      $scope.redeemRecentlyPressed = true;
      $timeout(function() {
        $scope.redeemRecentlyPressed = false;
      }, 500)
    }

    if(AccessService.validate(code)){
      $scope.loader.showAmbig();
      $scope.access.codeInput = '';
      //accessInput.removeEventListener('keyup', submitListener);
      $scope.redeemRecentlyPressed = false;
      if ($scope.platform.mobile) {
        cordova.plugins.Keyboard.close();
      }


      $timeout(function() {
        $scope.loader.hide();
        $timeout(function() {
          $scope.loader.showSuccess('Access Granted', 2500);
        }, 250)
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').next();
        }, 1500);
      }, 700)

    } else {
      $scope.loader.hide();
      var errorTextElem = document.getElementById('input-error-text')
      errorTextElem.style.opacity = 1;
      errorTextElem.innerHTML = 'Incorrect access code';
      $scope.access.codeInput = '';

      //fadeout after 500 seconds
      var postShakeCallback = function() {
            setTimeout(function() {
              $scope.loader.hide();
              AnimationService.fadeOutElem(errorTextElem, 1000);
            }, 1500);
      }


      AnimationService.shakeElem(errorTextElem, 500, postShakeCallback);

    }

  };

  $scope.accessInputOnFocus = function() {
    $scope.inputFocused = true;
    if (Utilities.cordovaExists && Utilities.keyboardExistsAndVisible) {

      if (DeviceService.isIOS()) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

    } else {

      //ios w/ keyboard
      if (DeviceService.isIOS()) {
        window.scrollTo(0, window.innerHeight - 224 - 20);
      } else {
        window.scrollTo(0, window.innerHeight);
      }

    }

  }

    window.addEventListener('native.keyboardshow', keyboardShowHandler);

    function keyboardShowHandler(e){
        alert('Keyboard height is: ' + e.keyboardHeight);
    }


  $scope.$on('$ionicView.loaded', function() {

    AnimationService.accessInput = document.querySelector("access-code-bar");

  })

  $scope.accessInputOnBlur = function(e) {
    $scope.inputFocused = false;
    if ($scope.keyboardExists && $scope.redeemRecentlyPressed) {
      console.log('access Input on Blur prevented');
      return;
    }


  };

}
