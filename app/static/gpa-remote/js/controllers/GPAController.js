angular.module('uguru.guru.controllers')
.controller('GPAController', [
	'$scope',
	'ModalService',
	'GPAService',
	GPAController]);


function GPAController($scope, ModalService, GPAService) {


	$scope.overall = GPAService.overall;
	// $scope.overall.averageGPA = 5;

	$scope.slogan = function() {

		if ($scope.overall.averageGPA >= 4) {
			return "Wow you're smart!";
		}
		else if ($scope.overall.averageGPA >= 3) {
			return "Good job!";
		}
		else if ($scope.overall.averageGPA >= 2) {
			return "You can do better!";
		}
		else if ($scope.overall.averageGPA >= 0) {
			return "Perhaps it's time to meet with a tutor.";
		}

	};


	$scope.launchWelcomeStudentPopup = function() {
	    PopupService.init('welcomeStudent', 'home-uguru-popup');
	    PopupService.open('welcomeStudent');
	}

	// $scope.slogan = "Great Start!";


// ================= THIS SECTION IS FOR THE ADD COURSE MODAL ==================

	ModalService.init('course', $scope);

	$scope.search_text = {
		course: ''
	};

	$scope.course = {
		name: '',
		grade: '',
		units: '',
		year: '',
		semester: ''
	};

	var selectedGrade = '';

	$scope.clearSearchInput = function() {
		$scope.search_text.course = '';
	};

	$scope.openModal = function(modalName) {
		// console.log("opening modal: " + modalName);
		ModalService.open(modalName, $scope);

	};

	$scope.closeModal = function(modalName) {
		// console.log("closing modal: " + modalName);
		ModalService.close(modalName);

	};

	$scope.submitCourse = function() {
		console.log("clicked on submitCourse()");

		if ($scope.search_text.course !== '' &&
			selectedGrade !== '' &&
			$scope.course.units !== '' &&
			$scope.course.year !== '' &&
			$scope.course.semester !== '') {

			$scope.course.grade = selectedGrade;
			$scope.course.name = $scope.search_text;

			console.log("GPAService.addCourse($scope.course):");
			console.log($scope.course);
			GPAService.addCourse($scope.course);

			selectedGrade = '';
			$scope.search_text.course = '';
			$scope.closeModal('course');
		}
		 else {
			alert("Please make sure all fields are valid.");
		}

	};

	$scope.setGrade = function(grade) {

		selectedGrade = grade;
		console.log("Setting grade to: " + selectedGrade);
	};

// ===================================================================



}






