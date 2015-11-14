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
  AccessController
  ]);

function AccessController($scope, $timeout, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService,
  $templateCache, $ionicSideMenuDelegate, DownloadService, UniversityMatcher,
  $ionicSlideBoxDelegate, ThrottleService, Utilities, $ionicScrollDelegate,
  CordovaPushWrapper) {

  //this prevents side bar from coming
  $ionicSideMenuDelegate.canDragContent(false);
  $ionicSlideBoxDelegate.enableSlide(false);

  $scope.access = {
    codeInput: '',
    consoleMsg: 'Got an access code?',
  };


  $scope.platform.android = DeviceService.isAndroid();
  $scope.root.vars.guru_mode =false;


  // var e1 = document.querySelector('.top');
  // var e2 = document.querySelector('.bottom');

  // e1.addEventListener('click', function() {
  //   console.log("clicked"); 
  //   cta(e1, e2, 'ion-view', {
  //      relativeToWindow: true
  //   }, function() {
  //     // e2.style.visibility = 'visible';
  //   });

  // });


  // $scope.testCTA = function() {
  //   console.log("clicked testCTA()");

  //   var e1 = document.querySelector('#redeem-button');
  //   var e2 = document.querySelector('#access-logo');

  //   cta(e1, e2, {
  //     relativeToWindow: true
  //   });

  // };

  $scope.testAlert = function() {
    confirm("Can you click on me?");
  };


  $scope.checkAccessCode = function(code) {

    if ($scope.keyboardExists && !$scope.redeemRecentlyPressed) {
      $scope.redeemRecentlyPressed = true;
      $timeout(function() {
        $scope.redeemRecentlyPressed = false;
      }, 500);
    }

    if(AccessService.validate(code)){
      LoadingService.showAmbig();
      $scope.access.codeInput = '';
      //accessInput.removeEventListener('keyup', submitListener);
      $scope.redeemRecentlyPressed = false;
      if (DeviceService.doesCordovaExist()) {
        cordova.plugins.Keyboard.close();
      }


      $timeout(function() {
        LoadingService.hide();
        $timeout(function() {
          LoadingService.showSuccess('Access Granted', 2000);
        }, 250);
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').next();
        }, 1500);
      }, 500);

    } else {
      LoadingService.hide();
      var errorTextElem = document.getElementById('input-error-text');
      errorTextElem.style.opacity = 1;
      // errorTextElem.innerHTML = 'Incorrect access code!';

      $scope.access.codeInput = '';
      $scope.access.consoleMsg ='Incorrect access code!';

      //fadeout after 500 seconds
      var postShakeCallback = function() {
            setTimeout(function() {
              LoadingService.hide();
              // AnimationService.fadeOutElem(errorTextElem, 1000);
              $scope.access.consoleMsg ='Got an access code?';

            }, 1500);
      };


      AnimationService.shakeElem(errorTextElem, 500, postShakeCallback);

    }

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
      console.log('access Input on Blur prevented');
      return;
    }


  };

}
