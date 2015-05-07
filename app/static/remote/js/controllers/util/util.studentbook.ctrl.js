angular.module('uguru.util.controllers')

.controller('StudentBookController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicTabsDelegate) {

    $scope.ionicTabsStudentBookDelegate = $ionicTabsDelegate.$getByHandle('student-book-tabs-top');

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function (guru) {
        //mixpanel track
        mixpanel.track("Guru.profile");
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru), showContactGuru:true});
    }

  }

]);
