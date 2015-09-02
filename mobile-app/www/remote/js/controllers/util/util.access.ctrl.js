angular.module('uguru.util.controllers')

.controller('AccessController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaStatusbar',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
    $ionicModal, $cordovaStatusbar, $ionicPlatform) {


    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });


    $ionicModal.fromTemplateUrl(BASE + 'templates/how-it-works.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.howItWorksModal = modal;
    });

    $scope.launchHowItWorksModal = function() {
      $scope.howItWorksModal.show();
    }

  }

])