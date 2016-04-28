<<<<<<< HEAD
angular.module('uguru.apps.controllers')
=======
angular.module('uguru.gpa.controllers')
>>>>>>> 45a6f6545d58b0de922a34095d519bd7ea360a2d
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