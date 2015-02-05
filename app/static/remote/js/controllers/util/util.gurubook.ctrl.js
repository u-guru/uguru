angular.module('uguru.util.controllers')

.controller('GuruBookController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  function($scope, $state, $timeout, $localstorage) {
    
    $scope.goToGuruProfile = function(guru) {
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru), showContactGuru:true});
    }
    
  }

]);
