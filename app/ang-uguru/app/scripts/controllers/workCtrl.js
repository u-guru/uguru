'use strict';



angular.module('app')
  .controller('workCtrl', ["$scope", workCtrl]);

function workCtrl($scope) {

	$scope.test = "angular works!";
	console.log(":D");
	 $scope.callFromJquery = function (data) {
           console.log("^_^")
            // alert(data);
    };
};

$(function () {
    $("#press").on("click", function () {
        angular.element($("#jquery")).scope().callFromJquery('I Called You ! Angular !');
    });
});