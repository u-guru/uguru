angular.module('uguru.util.controllers')

.controller('DemosController', [
  '$scope',
  '$state',
  '$timeout',
  'SVGService',
  'LoadingService',
  '$interval',
  function($scope, $state, $timeout, SVGService, LoadingService, $interval) {

    $scope.timer = 5;
    $scope.renderContent = false;
    $scope.show = false;
    $scope._class = false;
    $scope.status = 'Starting..'
    $interval(function() {
      if ($scope.timer === 4) {
        $scope.renderContent = true;
        $scope.status = 'rendering'
        $timeout(function() {
          $scope.$apply();
        })
      }
      if ($scope.timer === 3) {
        $scope.show = true;
        $scope.status = 'painting'
        $timeout(function() {
          $scope.$apply();
        })
      }
      if ($scope.timer === 2) {
        $scope._class = true;
        $timeout(function() {
          $scope.$apply();
        })
      }
      if (!$scope.timer) {
        var elem = document.querySelector('#animate-class')
        elem.classList.add('activate');
      }
      $scope.timer --;
    }, 1000)

    // $timeout(function() {
    //     var fillBgDemo = document.querySelector('#fill-bg-demo');
    //     fillBgDemo.classList.add('activate');
    // }, 2500);
  }

])