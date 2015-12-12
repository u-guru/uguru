angular.module('uguru.util.controllers')

.controller('OneUniversityController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'User',
  '$ionicSideMenuDelegate',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate){

      $ionicSideMenuDelegate.canDragContent(false);
      $scope.highlighted_item;
      $scope.activeTabIndex = 0;

      var university_id = $stateParams.universityId;
      $scope.university = {};

      var getPublicProfileInformation = function() {

        var success = function(universityObj) {
          $scope.university;
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