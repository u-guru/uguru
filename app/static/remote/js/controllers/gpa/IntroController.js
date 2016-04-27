angular.module('uguru.apps.controllers')
.controller('IntroController', [
	'$scope',
	'$ionicSlideBoxDelegate',
	'uTracker',
	'$ionicSideMenuDelegate',
	IntroController]);


function IntroController($scope, $ionicSlideBoxDelegate, uTracker,$ionicSideMenuDelegate) {

	//Init
	$ionicSideMenuDelegate.canDragContent(false);



	$scope.setDemo = function(demo) {

		console.log("Selected demographic: " + demo);
		uTracker.track(tracker, {
			"$Demographic": demo
		});

		$ionicSlideBoxDelegate.next();

	};



}