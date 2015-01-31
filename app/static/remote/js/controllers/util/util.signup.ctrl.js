angular.module('uguru.util.controllers')

.controller('SignupController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $cordovaProgress) {
    
    $scope.closeSignupModal = function() {

      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.signupModal.hide();
        }, 300)
      } else {
        $scope.signupModal.hide();
      }

    }

    $scope.$on('modal.shown', function() {

      if ($scope.signupModal.isShown()) {
        console.log('modal is shown');
        $scope.root.keyboard.show('signup-first-name', 500);
      }

    });

    $scope.signupFacebook = function() {
      $scope.showComingSoon();
    }

    $scope.signupAccount = function() {
      $scope.closeSignupModal();
      $scope.user.id = 1;
    }

    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
    }

  }


])