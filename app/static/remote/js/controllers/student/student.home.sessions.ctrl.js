angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentHomeSessionsController', [

  //All imported packages go here
  '$scope',
  '$state',
function($scope, $state) {

  console.log('new controller')
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();

  }

]);
