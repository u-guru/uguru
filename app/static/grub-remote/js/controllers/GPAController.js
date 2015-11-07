angular.module('gpa.controllers')
.controller('GPAController', [
	'$scope',
	'ModalService',
	'GPAService',
	'$localstorage',
	'$timeout',
	GPAController]);


function GPAController($scope, ModalService, GPAService, $localstorage,
	$timeout) {

	// $timeout(function() {
	// 	console.log('USER GRADES',$scope.user.grades[0]);
	// 	console.log(GPAService.getAllCourses())
	// }, 500)


	//initialize stuff
	// if ($scope.user.grades && $scope.user.grades.length > 0) {
	// 	courses = GPAService.syncCoursesFromCache($scope.user.grades);
	// 	GPAService.overall
	// }

	console.log($scope.user.grades);
	GPAService.init($scope.user.grades);
	// $scope.data = {
	// 	grades: GPAService.getGradesBySemester(),
	// 	averageGPA: GPAService.getCumulativeGPA()
	// };


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

		if ($scope.search_text.course !== '' &&
			selectedGrade !== '' &&
			$scope.course.units !== '' &&
			$scope.course.year !== '' &&
			$scope.course.semester !== '') {

			$scope.course.grade = selectedGrade;
			$scope.course.name = $scope.search_text;


			GPAService.addCourse($scope.course);

			//save to local storage

			$scope.user.grades.push($scope.course);
			$localstorage.setObject('user', $scope.user);

			selectedGrade = '';
			$scope.search_text.course = '';
			$scope.closeModal('course');
		}
		 else {
		 	$scope.loader.showMsg('Please make sure all fields are valid.')
			// alert("");
		}

	};

	$scope.setGrade = function(grade) {
		selectedGrade = grade;
		console.log("Setting grade to: " + selectedGrade);
	};

// ===================================================================
// $scope.$on('$ionicView.enter', function() {
//
//     ModalService.open('course', $scope);
//
// });


}






