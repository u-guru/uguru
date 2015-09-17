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
  AccessController
  ]);

function AccessController($scope, $timeout, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService,
  $templateCache, $ionicSideMenuDelegate, DeviceService, DownloadService, UniversityMatcher,
  $ionicSlideBoxDelegate) {

  DeviceService.readyDevice();

  // var list = UniversityMatcher.list;
  // for (var i=0; i<10; i++) {
  //   var preCache = list[i].seal_url || list[i].forbes_url;
  //   console.log("preCache: " + preCache);
  //   DownloadService.downloadFile(preCache);
  // }

  //this prevents side bar from coming
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
  };

// $ionicSlideBoxDelegate.update();
  $scope.checkAccessCode = function(code) {
    if(AccessService.validate(code)){

      //LoadingService.show(0, 5000, 'Access Granted');
      $scope.access.codeInput = '';
      //accessInput.removeEventListener('keyup', submitListener);

      if ($scope.platform.mobile) {
        cordova.plugins.Keyboard.close();
      }

      $timeout(function() {
        $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').next();
      }, 250);


    } else {
      $scope.access.errorInputMsg = 'Incorrect access code';
    }
  };

  $scope.accessInputOnFocus = function() {
    if (DeviceService.isMobile()) {
      // cordova.plugins.Keyboard.disableScroll(false);
      Velocity(
        document.querySelector('#access-logo svg'),
        {
          scale:0.66,
          translateY:"-33%"
        },
        {duration:500},
        "easeInSine"
      );

      Velocity(
        document.querySelector('#access-code-bar'),
        {translateY:"-120px"},
        {duration:500},
        "ease-in-out"
      );
    }
  };

  window.addEventListener('native.keyboardshow', keyboardShowHandler);
// cordova.plugins.Keyboard.disableScroll(true);
  window.addEventListener('native.keyboardhide', keyboardHideHandler);

  var accessInput = document.getElementById('access-code-bar');
  accessInput.addEventListener('keyup', submitListener);

  function submitListener(e) {
    //console.log('input field: ' + $scope.access.codeInput);
    var key = e.keyCode || e.key || e.which;
    if (key === 13) {
      // cordova.plugins.Keyboard.close();
      $timeout(function() {$scope.checkAccessCode($scope.access.codeInput)}, 400);
      e.preventDefault();
    }

  }


  var redeemButton = document.getElementById('redeem-button')
  function keyboardShowHandler(height) {
    if(DeviceService.getPlatform() === 'android') {
      redeemButton.style.visibility = 'hidden';
    }
  }

  function keyboardHideHandler(e) {
    accessInput.blur();
    redeemButton.style.visibility = 'visible';
    $scope.accessInputOnBlur();
  }



  function keyboardShowHandler(e){
      if (DeviceService.isMobile()) {
        $scope.keyboardHeight = e.keyboardHeight;
        Velocity(
          document.querySelector('#redeem-button'),
          {
            translateY:"-" + $scope.keyboardHeight + 'px',
            height: "*=0.75"

          },
          {duration:500},
          "ease-in-out"
        );
      }
  }

  $scope.accessInputOnBlur = function() {
    if (DeviceService.isMobile()) {
      Velocity(
            document.querySelector('#access-logo svg'),
            {scale:1, translateY:"0px"},
            {duration:500},
            "easeInSine"
          );

      Velocity(
        document.querySelector('#access-code-bar'),
        {translateY:"25px"},
        {duration:500},
        "easeInSine"
      );

      if (cordova.plugins.Keyboard && cordova.plugins.Keyboard.isVisible) {

          Velocity(
            document.querySelector('#redeem-button'),
            {translateY:"0px", height: "/= 0.75"},
            {duration:200},
            "easeInSine"
          );

      }

    }
  };

}
