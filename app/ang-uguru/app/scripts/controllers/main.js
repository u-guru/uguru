'use strict';

function MainCtrl($scope) {

	$scope.test = "angular works!";

}

angular.module('app')
  .controller('MainCtrl', ["$scope", MainCtrl]);



