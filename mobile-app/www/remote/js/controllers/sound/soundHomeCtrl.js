angular.module('uguru.apps.controllers')
.controller('SoundController', [
				'$scope',
				'SoundPlayListService',
				SoundController]
			);
function SoundController($scope, SoundPlayListService) {
	$scope.$on('$ionicView.beforeEnter', function() {
		console.log("before enter")
		SoundPlayListService.init()

	})
	// $scope.$on('$ionicView.loaded', function() {
	// 	console.log("loaded")
	// })
	// setTimeout(function() {
	// 	var result = SoundPlayListService.search("motivation")
	// 	console.log("Result",result)

	// }, 2000);

};