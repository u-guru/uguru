angular.module('uguru.util.controllers')

.controller('GuruBookController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicTabsDelegate) {

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru), showContactGuru:true});
    }
    console.log($scope.user);

    $scope.topGuruBookTabsDelegate = $ionicTabsDelegate.$getByHandle('student-guru-book-tabs-top');

  }

]);
