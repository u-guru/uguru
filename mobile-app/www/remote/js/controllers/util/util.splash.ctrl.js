angular.module('uguru.util.controllers')

.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  'Category',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, Category) {
    $scope.selectedCategory = ($scope.categories && $scope.categories[0]) || {name: 'Academic', hex_color: 'academic'};
    // $scope.request = RequestService.initStudentForm();
    $timeout(function() {
      var saveCategoriesToRootScope = function(categories) {
            $scope.categories = categories;
            $scope.categories = $scope.categories.filter(function(category, index) {
              return category.is_active;
            })
            $scope.selectedCategory = $scope.categories[0];
        }
      $scope.getCategories(saveCategoriesToRootScope);
    })

    $scope.setCategory = function(category) {
      $timeout(function(){
        $scope.$apply(function(){
          $scope.selectedCategory = category;
        });
      })
    }


  }
])


