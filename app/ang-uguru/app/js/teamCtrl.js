'use strict';

/**
 * @ngdoc function
 * @name angUguruApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angUguruApp
 */
angular.module('angUguruApp')
 .controller('teamCtrl', ['$scope','$http' ,function($scope,$http) {
 	  	console.log("teamCtrl") 

    $scope.getResults = function() {
      console.log("test");
    };
   	
    $http.get("../static/data/admin.json").then(function(r) {
    	console.log(r);
    }); 


  }

]);
 function readAndParseJSON(file) {
 	console.log(file);
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);

    if (request.status == 200)
        var file = JSON.parse(request.responseText);
    return file;
}