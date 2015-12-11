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
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, LoadingService) {

    $scope.removeGuruExperience = function(experience, index) {
      var removedExperience = $scope.user.guru_experiences.splice(index, 1);
      var successCallback = function() {
        // LoadingService.hide();
        LoadingService.showSuccess('Experience removed!', 1500);
        if ($scope.guruExperiencesModal && $scope.guruExperiencesModal.isShown()){
          $scope.guruExperiencesModal.remove();
        }
        if ($scope.desktopMode) {
          $timeout(function() {
            var modalElem = document.querySelector('#cta-modal-profile-experiences');
            modalElem.classList.remove('show');
          }, 1000)
        }
      }

      LoadingService.show();

      $scope.user.updateAttr('remove_guru_experience', $scope.user, $scope.experience, successCallback, $scope);

    }



    $scope.saveGuruExperience = function() {
      if (!$scope.experience.name.length ||!$scope.experience.years || !$scope.experience.description.length) {
        $scope.success.show(0, 1500,'Please enter in all fields');
        return;
      }

      var successCallback = function() {


        LoadingService.showSuccess('Saved!', 1500);


        if ($scope.desktopMode) {

          $timeout(function() {
            var modalElem = document.querySelector('#cta-modal-profile-experiences');
            modalElem.classList.remove('show');
          }, 1000)

        } else {

          if ($scope.guruExperiencesModal && $scope.guruExperiencesModal.isShown()){
              $scope.guruExperiencesModal.remove();
          }

        }

      }

      LoadingService.show();

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