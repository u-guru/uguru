angular.module('uguru.guru.controllers')

.controller('GuruRemoteController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$q',
  '$cordovaKeyboard',
  'University',
  '$ionicSideMenuDelegate',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, University, $ionicSideMenuDelegate, LoadingService) {

    $scope.hangoutsFriendlyChanged = function() {
      $scope.user.updateAttr('hangouts_friendly', $scope.user, $scope.user.hangouts_friendly, null, $scope);
    }

    $scope.skypeFriendlyChanged = function() {
      $scope.user.updateAttr('skype_friendly', $scope.user, $scope.user.skype_friendly, null, $scope);
    }

    $scope.facetimeFriendlyChanged = function() {
      $scope.user.updateAttr('facetime_friendly', $scope.user, $scope.user.facetime_friendly, null, $scope);
    }

    $scope.messengerFriendlyChanged = function() {
      $scope.user.updateAttr('messenger_friendly', $scope.user, $scope.user.messenger_friendly, null, $scope);
    }

    $scope.phoneFriendlyChanged = function() {
      $scope.user.updateAttr('phone_friendly', $scope.user, $scope.user.phone_friendly, null, $scope);
    }

    $scope.textFriendlyChanged = function() {
      $scope.user.updateAttr('text_friendly', $scope.user, $scope.user.text_friendly, null, $scope);
    }

    $scope.emailFriendlyChanged = function() {
      $scope.user.updateAttr('email_friendly', $scope.user, $scope.user.email_friendly, null, $scope);
    }

    $scope.backToGuruRemoteProfile = function(is_saved) {
        if (is_saved) {
          $scope.success.show(0, 1500);
        } else {
          LoadingService.show();
        }

        $timeout(function() {
          LoadingService.hide();
        }, 500);

        $state.go('^.guru-profile');
    }

  }


])

