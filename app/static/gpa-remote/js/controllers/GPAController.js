angular.module('gpa.controllers')
.controller('GPAController', [
	'$scope',
	'ModalService',
<<<<<<< HEAD
	GPAController]);


function GPAController($scope, ModalService) {


=======
	'GPAService',
	'$localstorage',
	'$timeout',
	'StorageService',
	'PopupService',
	'TransitionService',
	'University',
	GPAController]);


function GPAController($scope, ModalService, GPAService, $localstorage,
	$timeout, StorageService, PopupService, TransitionService,
	University) {


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



// ================= THIS SECTION IS FOR THE ADD COURSE MODAL ==================

	ModalService.init('course', $scope);

>>>>>>> aa6d90973137f8b3f1552fa4efcfeb6150d9b925
	$scope.search_text = {
		course: '',
		selected_course: null
	};

	$scope.clearSearchInput = function() {
		$scope.search_text.course = '';
	};

	$scope.averageGPA = "4.0";

	$scope.slogan = "Great Start!";

	ModalService.init('course', $scope);


	$scope.openModal = function(modalName) {
<<<<<<< HEAD
		console.log("opening modal: " + modalName);
=======
		// console.log("opening modal: " + modalName);
		if (modalName == 'course' && (!$scope.user.university || !$scope.user.university.name)) {
			ModalService.open('university', $scope);
			return
		}


>>>>>>> aa6d90973137f8b3f1552fa4efcfeb6150d9b925
		ModalService.open(modalName, $scope);

	};

	$scope.closeModal = function(modalName) {
		console.log("closing modal: " + modalName);
		ModalService.close(modalName);

	};



	$scope.submitCourse = function() {

<<<<<<< HEAD

	};

=======
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

	$scope.selectCourse = function(course) {
		$scope.selectedCourse = course;
		$scope.search_text.course = '';
		$scope.search_text.selected_course = course;
	}

	$scope.setGrade = function(grade) {
		selectedGrade = grade;
		console.log("Setting grade to: " + selectedGrade);
	};

	$scope.$on('$ionicView.enter', function() {

		initEnterActions();

	})



	$scope.$on('$ionicView.beforeEnter', function() {

		initBeforeEnterActions();

	})

	// ********************#
	// * Helper Functions  #
	// ********************#


	// all possible things that need to be initialized on enter should go here.
	var initEnterActions = function() {
		hasWelcomePopupBeenShown();
	}

	var initBeforeEnterActions = function() {
		GPAService.init($scope.user.grades);
		initSidebarGPAHomeTransition();
	}


	var initSidebarGPAHomeTransition = function() {

		function bodyClassName() {
    		var sideMenuOverlay = document.querySelector('#side-menu-left-overlay');
    		if (document.body.className.indexOf('menu-open') >= 0) {
    			console.log('Sidebar menu has opened');
    			sideMenuOverlay.style.display="block";
    			sideMenuOverlay.style.opacity = 1;

        	} else {
        		console.log('Sidebar menu has closed');
        		sideMenuOverlay.style.display="none";
        		sideMenuOverlay.style.opacity = 0;
        	}
        }

        TransitionService.appendFuncToListener(sideMenuElem, bodyClassName);

	}



	//Checks if welcome popup has been shown or not
	var hasWelcomePopupBeenShown = function() {
		if (StorageService.isFirstTimeUsingApp()) {
			launchWelcomePopup();
			StorageService.setBooleanValue('welcomeUserGPA', true);
		}
	}

	//Show Popup
	var launchWelcomePopup = function() {
	    PopupService.init('welcomeUser', 'gpa-home-popup');
	    PopupService.open('welcomeUser');
	}



}





>>>>>>> aa6d90973137f8b3f1552fa4efcfeb6150d9b925

}