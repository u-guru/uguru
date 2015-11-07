angular.module('uguru.util.controllers')

.controller('SidebarController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$cordovaFacebook',
  '$ionicSideMenuDelegate',
  '$ionicHistory',
  '$ionicActionSheet',
  'University',
  '$ionicBackdrop',
  'UniversityMatcher',
  'AnimationService',
  'uTracker',
  'Utilities',
  'PopupService',
  'ModalService',
  '$ionicSlideBoxDelegate',
  'StorageService',
  'LoadingService',
  '$localstorage',
  function($scope, $state, $timeout, $cordovaFacebook,
   $ionicSideMenuDelegate, $ionicHistory, $ionicActionSheet,
  University, $ionicBackdrop, UniversityMatcher,
  AnimationService, uTracker, Utilities, PopupService, ModalService,
  $ionicSlideBoxDelegate, StorageService, LoadingService,
  $localstorage) {

    ModalService.init('university', $scope);

    $scope.openModal = function(modalName) {
      ModalService.open(modalName, $scope);
    };

    $scope.defaultUnitsValChanged = function() {
      $localstorage.setObject('user', $scope.user);
    }



    $scope.clearStorage = function() {
      if (confirm('Are you sure? All progress will be lost')) {

        StorageService.clearStorage();
        LoadingService.loadAndShowSuccess(0, 1500, 'Your data has been cleared', $scope);

      }
    }

  }


]);
