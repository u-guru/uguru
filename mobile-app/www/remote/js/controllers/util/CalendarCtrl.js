angular.module('uguru.util.controllers')

.controller('CalendarController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicSlideBoxDelegate',
  'RequestService',
  'University',
  function($scope, $state, $timeout, $localstorage, $ionicSlideBoxDelegate, RequestService, University) {

    $scope.$on('$ionicView.enter', function() {

      $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'), $scope, $scope.user.university.latitude, $scope.user.university.longitude, $scope.user.university.school_color_dark);
    })


  }

])