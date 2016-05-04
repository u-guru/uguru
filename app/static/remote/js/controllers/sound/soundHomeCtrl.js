angular.module('uguru.apps.controllers')
.controller('SoundController', [
				'$scope',
				'SoundPlayListService',
				SoundController]
			);
function SoundController($scope, SoundPlayListService) {

	console.log("Sound load")
};