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
  $ionicSlideBoxDelegate.enableSlide(false)

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
  };

  $scope.checkAccessCode = function(code) {

    if ($scope.keyboardExists && !$scope.redeemRecentlyPressed) {
      $scope.redeemRecentlyPressed = true;
      $timeout(function() {
        $scope.redeemRecentlyPressed = false;
      }, 500)
    }
    $scope.loader.showAmbig();
    if(AccessService.validate(code)){

      $scope.access.codeInput = '';
      //accessInput.removeEventListener('keyup', submitListener);
      $scope.redeemRecentlyPressed = false;
      if ($scope.platform.mobile) {
        cordova.plugins.Keyboard.close();
      }

      $timeout(function() {
        $scope.loader.hide();
        $scope.loader.showSuccess('Access Granted', 1500);
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').next();
        }, 1000);
      }, 1500)

    } else {
      Velocity(document.getElementById('input-error-text'), {opacity:1});
      $scope.access.errorInputMsg = 'Incorrect access code';
      Velocity(accessInput, "callout.shake", function() {
        accessInput.value = '';
        setTimeout(function() {
          Velocity(document.getElementById('input-error-text'), "fadeOut", {duration:1000});
        }, 500)
      });
      //

    }
  };

  $scope.accessInputOnFocus = function() {

    if (DeviceService.isMobile() && !$scope.redeemRecentlyPressed) {
      // cordova.plugins.Keyboard.disableScroll(false);
      Velocity(
        document.querySelector('#access-logo svg'),
        {
          scale:0.5,
          translateY:"-55%"
        },
        {duration:400},
        "easeInSine"
      );

      Velocity(
        document.querySelector('#access-code'),
        {translateY:"-170px"},
        {duration:250},
        "ease-in-out"
      );
    }
  };

  window.addEventListener('native.keyboardshow', keyboardShowHandler);

  // cordova.plugins.Keyboard.disableScroll(true);
  // window.addEventListener('native.keyboardhide', keyboardHideHandler);

  var accessInput = document.getElementById('access-code-bar');

  accessInput.addEventListener('keyup', submitKeyupListener);
  accessInput.addEventListener('keydown', submitKeydownListener);

  function submitKeyupListener(e) {

    if($scope.access.codeInput.length > 0) {
      $scope.access.errorInputMsg = '';
    }

    var key = e.keyCode || e.key || e.which;
    //if enter is pressed;
    if (key === 13) {
      $scope.checkAccessCode($scope.access.codeInput);
      // e.preventDefault();
    }



  }

  function submitKeydownListener(e) {


    var key = e.keyCode || e.key || e.which;
    //if enter is pressed;

    if ((e.keyCode == 65 || e.keyCode == 88) && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.target.select();
    }



  }



  // function keyboardHideHandler(e) {
  //   if ($scope.keyboardExists && $scope.redeemRecentlyPressed) {
  //     console.log('keyboardHideHandler prevented');
  //     $timeout(function () {
  //       accessInput.focus();
  //     });
  //     return;
  //   }
  //   accessInput.blur();
  //   redeemButton.style.visibility = 'visible';
  //   $scope.accessInputOnBlur();
  // }



  function keyboardShowHandler(e){
      if (DeviceService.isMobile() && !$scope.redeemRecentlyPressed) {
        $scope.keyboardExists = true;
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

  $scope.accessInputOnBlur = function(e) {
    if ($scope.keyboardExists && $scope.redeemRecentlyPressed) {
      console.log('access Input on Blur prevented');
      return;
    }

    if (DeviceService.isMobile()) {
      Velocity(
            document.querySelector('#access-logo svg'),
            {scale:1, translateY:"0px"},
            {duration:500},
            "easeInSine"
          );

      Velocity(
        document.querySelector('#access-code'),
        {translateY:"0"},
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
