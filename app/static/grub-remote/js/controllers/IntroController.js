angular.module('gpa.controllers', [])
.controller('IntroController', [
	'$scope',
	'$ionicSlideBoxDelegate',
	'uTracker',
	IntroController]);


function IntroController($scope, $ionicSlideBoxDelegate, uTracker) {


	$scope.setDemo = function(demo) {

		console.log("Selected demographic: " + demo);
		uTracker.track(tracker, {
			"$Demographic": demo
		});

		$ionicSlideBoxDelegate.next();

	};



}