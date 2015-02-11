angular.module('uguru.util.controllers')

.controller('GuruIntroController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$q',
  '$cordovaProgress',
  '$cordovaKeyboard',
  'University',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaKeyboard) {


    $scope.guru_introduction = '';
    $scope.guruBioForm = null;
    $scope.keyboard_force_off = false;

    $scope.submitGuruBio = function() {
        $scope.user.guru_introduction = $scope.user.guru_introduction;
        $scope.rootUser.updateLocal($scope.user);

        //save progress
        $scope.calculateProgress($scope.user);

        $scope.closeKeyboard();
        $scope.showSuccess('Bio Saved!');
        $timeout(function() {
          $scope.addGuruIntroModal.hide();
        }, 1000);
    };


    $scope.setInputFocus = function(target) {
      if ($scope.guru_introduction.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("bio-input")[0].focus();
      }
    };


    $scope.$on('modal.shown', function() {

          if ($scope.addGuruIntroModal.isShown()) {
              $scope.keyboard_force_off = false;

              $timeout(function() {
                $scope.setInputFocus();
              }, 500);

          }
    });

  }

]);