angular.module('uguru.apps.controllers')
.controller('SoundController', [
				'$scope',
				'SoundPlayListService',
				SoundController]
			);
function SoundController($scope, SoundPlayListService) {
	$scope.$on('$ionicView.beforeEnter', function() {
		console.log("before enter")
		// SoundPlayListService.init()
		SoundPlayListService.init()

	})

	$scope.$on('$ionicView.loaded', function() {
		console.log("loaded")

	})

	$scope.searchList = function(input){
		console.log("Enter",input)

		$scope.results = SoundPlayListService.search(input)

		console.log("Result",$scope.results)
		// for(var i in results.items) {
		//     var item = results.items[i];
		//     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
		//   }
	}
	// $scope.$on('$ionicView.loaded', function() {
	// 	console.log("loaded")
	// })
	// setTimeout(function() {
	// 	var results = SoundPlayListService.search("motivation")
	// 	// console.log("Result",results)
	// 	// for(var i in results.items) {
	// 	//     var item = results.items[i];
	// 	//     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
	// 	//   }
	// }, 2000);

};