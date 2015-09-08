angular.module('uguru.util.controllers')
.controller('AccessController', [
  '$scope',
  '$state',
  '$ionicViewSwitcher',
  'DeviceService',
  'LoadingService',
  'AccessService',
  'AnimationService',
  AccessController
  ]);

function AccessController($scope, $state, $ionicViewSwitcher, 
  DeviceService, LoadingService, AccessService, AnimationService) {

  DeviceService.readyDevice();

  $scope.access = {
    codeInput: '',
    errorInputMsg: null,
    keyboardShown:false,
  };

  $scope.checkAccessCode = function(code) {

    if(AccessService.validate(code)){
      LoadingService.show(0, 1000, 'Access Granted');
      $scope.access.codeInput = '';
      $ionicViewSwitcher.nextDirection('forward');
      AnimationService.flip();
      $state.go('^.university');
    } else {
      $scope.access.errorInputMsg = 'Incorrect access code';
    }
  };

  $scope.accessInputOnFocus = function() {
    if (DeviceService.isMobile()) {
      $scope.access.keyboardShown = true;
    }
  };

  $scope.accessInputOnBlur = function() {
    if (DeviceService.isMobile()) {
      $scope.access.keyboardShown = false;
    }
  };

}
