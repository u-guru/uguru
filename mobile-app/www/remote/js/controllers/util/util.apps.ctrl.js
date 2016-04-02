angular.module('uguru.util.controllers')

.controller('AppsController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage, $ionicViewSwitcher) {

    $scope.goToFiles = function() {
      return
    }

    $scope.goToRequest = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $scope.success.show(0, 1500, 'Coming Soon!')
    }

    $scope.goToSearch = function() {
      $scope.success.show(0, 1500, 'Coming Soon!')
    }

    $scope.goToAskQuestion = function() {
      $scope.success.show(0, 1500, 'Coming Soon!')
    }

    $scope.goToBakery = function() {
      $scope.success.show(0, 1500, 'Coming Soon!')
    }

  }

])