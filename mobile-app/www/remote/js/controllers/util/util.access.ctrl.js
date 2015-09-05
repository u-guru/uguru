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
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage,
    $ionicModal, $cordovaStatusbar, $ionicPlatform,
    $ionicViewSwitcher) {


    $scope.access = {
      codeInput: '',
      errorInputMsg: null,
      data: {
        genericAccessCode: 'cool'
      }
    }

    $scope.launchSignupModal = function() {
      $scope.signupModal.show();
    }

    $scope.checkAccessCode = function(code) {

      if (code === $scope.access.data.genericAccessCode) {
        $scope.success.show(0, 1000,'Access Granted');
        $scope.access.codeInput ='';
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.university');
      } else {
        $scope.access.errorInputMsg = 'Incorrect access code';
      }
    }

    // 1. on enter
    // 2. show error

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

    $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $scope.launchHowItWorksModal = function() {
      $scope.howItWorksModal.show();
    }

  }

])