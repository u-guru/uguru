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
  AccessController
  ]);

function AccessController($scope, $state, $ionicViewSwitcher,
  DeviceService, LoadingService, AccessService, AnimationService, $templateCache) {

  DeviceService.readyDevice();

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
    keyboardShown:false,
  };


  $scope.checkAccessCode = function(code) {
    var code = 'cool';
    if(AccessService.validate(code)){
      //LoadingService.show(0, 5000, 'Access Granted');
      $scope.access.codeInput = '';
      $ionicViewSwitcher.nextDirection('forward');
      //AnimationService.flip();
      $state.go('^.university');
    } else {
      $scope.access.errorInputMsg = 'Incorrect access code';
    }
  };

  $scope.accessInputOnFocus = function() {
    if (DeviceService.isMobile()) {
      $scope.access.keyboardShown = true;
      cordova.plugins.Keyboard.disableScroll(true)
      Velocity(
        document.querySelector('#access-logo svg'),
        {
          scale:0.66,
          translateY:"-140px"
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

  function keyboardShowHandler(e){
      if ($scope.platform.mobile) {
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
      $scope.access.keyboardShown = false;
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

      Velocity(
        document.querySelector('#redeem-button'),
        {translateY:"0px", height: "/=0.75"},
        {duration:200},
        "easeInSine"
      );
    }
  };

}
