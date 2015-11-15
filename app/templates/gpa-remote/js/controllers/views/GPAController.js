angular.module('gpa.controllers')
.controller('GPAController', [
	'$scope',
	'ModalService',
	'GPAService',
	'$localstorage',
	'$timeout',
	'StorageService',
	'PopupService',
	'TransitionService',
	'DeviceService',
	GPAController]);


function GPAController($scope, ModalService, GPAService, $localstorage,
	$timeout, StorageService, PopupService, TransitionService, DeviceService) {
	$scope.toggleHeader = function(index) {
		if ($scope.data.headerSelected === index && !$scope.transitioning) {
			console.log ('needs to change');
			$scope.data.headerSelected = null;
			$scope.data.headerActive = 0;
			$scope.transitioning = true;
			$timeout(function() {
				$scope.transitioning = false;
			}, 500)
		} else if (!$scope.transitioning) {
			console.log('toggleHeader 2,', index);
			$scope.data.headerSelected = index;
			$scope.data.headerActive = index;
		}
	}

	$scope.data = {
    	headerSelected: null,
    	headerActive: 0,
  	}

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

	$scope.search_text = {
		course: '',
		selected_course: null,
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

	$scope.selectedCourse = null;

	$scope.selectCourse = function(course) {
		$scope.selectedCourse = course;
		$scope.search_text.course = null;
	}

	$scope.openModal = function(modalName, course) {
		// console.log("opening modal: " + modalName);
		if (modalName == 'course' && (!$scope.user.university || !$scope.user.university.name)) {
			ModalService.open('university', $scope);
			return
		}

		if (course) {
			$scope.course = course;
			$scope.selectedCourse = course;
		}
		ModalService.open(modalName, $scope);

	};

	$scope.resetSelectedCourse = function() {
		$scope.search_text = {course: ''};
		$scope.selectedCourse = null;
	}

	$scope.closeModal = function(modalName) {
		// console.log("closing modal: " + modalName);
		ModalService.close(modalName);

	};

	$scope.submitCourse = function() {

		if ($scope.selectedCourse &&
			selectedGrade !== '' &&
			$scope.course.units !== '' &&
			$scope.course.year !== '' &&
			$scope.course.semester !== '') {

			$scope.course.grade = selectedGrade;
			$scope.course.name = $scope.selectedCourse.name;
			$scope.course.id = $scope.selectedCourse.id;


			$scope.user.grades.push($scope.course);

			$localstorage.setObject('user', $scope.user);

			selectedGrade = '';
			$scope.search_text.course = '';

			$scope.overall = GPAService.init($scope.user.grades);

			$timeout(function() {
				$scope.closeModal('course');
			}, 750);

			LoadingService.loadAndShowSuccess(0, 1500, 'Recalculating...', $scope);
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
		$scope.overall = GPAService.init($scope.user.grades);
		initSidebarGPAHomeTransition();
		setIOSStatusBarToLightText();
	}

	var setIOSStatusBarToLightText = function() {
		if (DeviceService.isIOSDevice()) {
            DeviceService.ios.setStatusBarLightText();
        }
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






