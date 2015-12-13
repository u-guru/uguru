angular.module('uguru.util.controllers')

.controller('OneUniversityController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'User',
  '$ionicSideMenuDelegate',
  'LoadingService',
  '$timeout',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout){

      $ionicSideMenuDelegate.canDragContent(false);
      $scope.highlighted_item;
      $scope.activeTabIndex = 0;
      $scope.university = {}

      var university_id = $stateParams.universityId;
      $scope.university = {};
      LoadingService.showAmbig('Retrieving university data...', 10000);
      var getPublicUniversityInformation = function() {

        var success = function(universityObj) {
          $scope.university = universityObj;

          $timeout(function() {
            LoadingService.showSuccess(universityObj.popular_courses.length + ' popular courses found', 2500)
          }, 1500)
          console.log('universityObj', universityObj)
        }

        var failure = function(err) {
          console.log(err);
        }

        Restangular.one('universities', university_id).customGET().then(success, failure)

      }

      getPublicUniversityInformation();

    }


])