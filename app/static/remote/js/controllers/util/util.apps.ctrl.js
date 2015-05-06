angular.module('uguru.util.controllers')

.controller('AppsController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage, $ionicViewSwitcher) {

    $scope.goToFiles = function() {
      console.log('this works');
    }

  }

])