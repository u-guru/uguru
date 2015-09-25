angular.module('uguru.util.controllers')

.controller('ExperiencesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',

  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate) {

    $scope.saveGuruExperience = function() {
      if (!$scope.experience.name.length ||!$scope.experience.years || !$scope.experience.description.length) {
        $scope.success.show(0, 1500,'Please enter in all fields');
        return;
      }

      var successCallback = function() {
        $scope.loader.hide();
        $scope.success.show(0, 1500, 'Saved!');
        if ($scope.guruExperiencesModal && $scope.guruExperiencesModal.isShown()){
          $scope.guruExperiencesModal.remove();
        }
      }

      $scope.loader.show();

      if (!$scope.experience.id) {
        $scope.user.updateAttr('add_guru_experience', $scope.user, $scope.experience, successCallback, $scope);
      } else {
        $scope.user.updateAttr('update_guru_experience', $scope.user, $scope.experience, successCallback, $scope);
      }

    }



    $scope.$on('modal.shown', function() {
      if ($scope.guruExperiencesModal.isShown() && !$scope.experience.name.length) {
        $timeout(function() {
          var experienceNameInput = document.getElementById('experience-name-input');
          experienceNameInput.focus();
        }, 500)
      }
    });


  }


])