angular.module('uguru.util.controllers')

.controller('CalendarController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicSlideBoxDelegate',
  'CalendarService',
  'University',
  'KeyboardService',
  function($scope, $state, $timeout, $localstorage, $ionicSlideBoxDelegate, CalendarService, University, KeyboardService) {

    $scope.$on('$ionicView.enter', function() {
      $scope.calendar = CalendarService.getNextSevenDaysArr()
      KeyboardService.initOptionPressedAndReleasedFunction(toggleDev, null, 68, 'd', true, null);
      KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 83, 's', true, null);
      KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 27, 'esc', true, null);
      initDevOptions();
    })


    function toggleDev() {
      $scope.dev.toggleDev = !$scope.dev.toggleDev;
      console.log('setting dev to', $scope.dev.toggleDev);
    }
    function toggleSpec() {
      $scope.dev.toggleSpec = !$scope.dev.toggleSpec;
    }


    function initDevOptions() {
      $scope.dev = {
        viewsDropdown: {},
        screenSizesDropdown: {label: "screen sizes", size: "small", options: ["desktop", "mobile"], selectedIndex:0, onOptionClick: switchScreenSize},
      }


      function switchScreenSize() {

      }
    }
  }

])