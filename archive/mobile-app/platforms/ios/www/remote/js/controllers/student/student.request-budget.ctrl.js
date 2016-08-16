angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestBudgetController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicHistory) {

    $scope.hourly_price = 20;



  }
]);

