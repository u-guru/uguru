angular.module('uguru.util.controllers')
.controller('AccessController', [
  '$scope',
  '$state',
  '$ionicViewSwitcher',
  'DeviceService',
  'LoadingService',
  'AccessService',
  'AnimationService',
  '$templateCache',
  '$ionicSideMenuDelegate',
  'DeviceService',
  AccessController
  ]);

function AccessController($scope, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService,
  $templateCache, $ionicSideMenuDelegate, DeviceService) {

  DeviceService.readyDevice();

  //this prevents side bar from coming
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
  };


  $scope.checkAccessCode = function(code) {
    if(AccessService.validate(code)){
      console.log("AccessService.validate(code)" + AccessService.validate(code));
      //LoadingService.show(0, 5000, 'Access Granted');
      $scope.access.codeInput = '';
      accessInput.removeEventListener('keyup', submitListener);
      $ionicViewSwitcher.nextDirection('forward');
      //AnimationService.flip();
      $state.go('^.university');
    } else {
      $scope.access.errorInputMsg = 'Incorrect access code';
    }
  };

  // $scope.accessInputOnFocus = function() {
  //   if (DeviceService.isMobile()) {
  //     cordova.plugins.Keyboard.disableScroll(false);
  //     Velocity(
  //       document.querySelector('#access-logo svg'),
  //       {
  //         scale:0.66,
  //         translateY:"-140px"
  //       },
  //       {duration:500},
  //       "easeInSine"
  //     );

  //     Velocity(
  //       document.querySelector('#access-code-bar'),
  //       {translateY:"-120px"},
  //       {duration:500},
  //       "ease-in-out"
  //     );
  //   }
  // };

  window.addEventListener('native.keyboardshow', keyboardShowHandler);

  window.addEventListener('native.keyboardhide', keyboardHideHandler);

  var accessInput = document.getElementById('access-code-bar');
  accessInput.addEventListener('keyup', submitListener);

  function submitListener(e) {
    //console.log('input field: ' + $scope.access.codeInput);
    var key = e.keyCode || e.key || e.which;
    if (key === 13) {
      $scope.checkAccessCode($scope.access.codeInput);
    }
    e.preventDefault();
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
    //$scope.accessInputOnBlur();
  }



  // function keyboardShowHandler(e){
  //     if (DeviceService.isMobile()) {
  //       $scope.keyboardHeight = e.keyboardHeight;
  //       Velocity(
  //         document.querySelector('#redeem-button'),
  //         {
  //           translateY:"-" + $scope.keyboardHeight + 'px',
  //           height: "*=0.75"

  //         },
  //         {duration:500},
  //         "ease-in-out"
  //       );
  //     }
  // }

  // $scope.accessInputOnBlur = function() {
  //   if (DeviceService.isMobile()) {
  //     Velocity(
  //           document.querySelector('#access-logo svg'),
  //           {scale:1, translateY:"0px"},
  //           {duration:500},
  //           "easeInSine"
  //         );

  //     Velocity(
  //       document.querySelector('#access-code-bar'),
  //       {translateY:"25px"},
  //       {duration:500},
  //       "easeInSine"
  //     );

  //     Velocity(
  //       document.querySelector('#redeem-button'),
  //       {translateY:"0px", height: "/=0.75"},
  //       {duration:200},
  //       "easeInSine"
  //     );
  //   }
  // };

}
