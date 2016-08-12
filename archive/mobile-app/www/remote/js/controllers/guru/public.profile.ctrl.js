angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('PublicProfileController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'User',
  '$ionicSideMenuDelegate',
  'Currency',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, Currency){

      $ionicSideMenuDelegate.canDragContent(false);
      $scope.highlighted_item;
      $scope.activeTabIndex = 0;

      $scope.all_currencies = Currency.updateMasterList($scope.user);

      $scope.profile = {public_mode: true};

      var user_id = $stateParams.profileId;


      var selectHighlightedPortfolioItem = function(guru_courses) {
        $scope.highlighted_item = {'name': guru_courses[0]}
        if (!$scope.highlighted_item.description) {
          $scope.highlighted_item.description = "Live and breathe this stuff.<br> Have been immersed since '92"
        }
      }

      var getPublicProfileInformation = function() {

        var success = function(user) {
          var processed_user = User.process_results(user.plain());
          User.assign_properties_to_root_scope($scope, processed_user);
          User.delegate_actions_from_processed_user($scope);
          selectHighlightedPortfolioItem($scope.user.guru_courses);
        }

        var failure = function(err) {
          console.error(err);
        }

        Restangular.one('user', user_id).customGET().then(success, failure)

      }

      getPublicProfileInformation();




    }

]);