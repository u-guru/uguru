angular.module('uguru.guru.controllers')
.controller('GPAController', [
	'$scope',
	'ModalService',
	GPAController]);


function GPAController($scope, ModalService) {


	$scope.search_text = {
		course: ''
	};

	$scope.clearSearchInput = function() {
		$scope.search_text.course = '';
	};

	$scope.averageGPA = "4.0";

	$scope.slogan = "Great Start!";

	ModalService.init('course', $scope);


	$scope.openModal = function(modalName) {
		console.log("opening modal: " + modalName);
		ModalService.open(modalName, $scope);

	};

	$scope.closeModal = function(modalName) {
		console.log("closing modal: " + modalName);
		ModalService.close(modalName);

	};

	$scope.submitCourse = function() {
		console.log("clicked on submitCourse()");


	};


}