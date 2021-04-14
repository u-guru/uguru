angular.module('uguru.apps.controllers',[])
.controller('GPAController', [
	'$scope',
	'ModalService',
	'GPAService',
	'$localstorage',
	'$timeout',
	// 'StorageService',
	'PopupService',
	'TransitionService',
	'DeviceService',
	'Restangular',
	'User',
	GPAController]);


function GPAController($scope, ModalService, GPAService, $localstorage,
	$timeout, PopupService, TransitionService, DeviceService, Restangular, User) {

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
	ModalService.init('university', $scope);
	$scope.search_text = {
		course: '',
		selected_course: null,
	};

	$scope.course = {
		name: '',
		grade: '',
		actualGrade:'',
		units: '',
		year: '',
		semester: ''
	};

	var selectedGrade = '';

	$scope.toggleCutOffGrade = function(){
		$scope.user.isCutOffGrade = !$scope.user.isCutOffGrade;
		$scope.user.grades = GPAService.switchGrade($scope.user.grades,$scope.user.isCutOffGrade)
		$localstorage.setObject('user', $scope.user);
		$scope.overall = GPAService.init(angular.copy($scope.user.grades));
		$scope.root.vars.showDesktopSettings = !$scope.root.vars.showDesktopSettings;

	}

	$scope.SelectAll= function(id)
	{
	    document.getElementById(id).focus();
	    document.getElementById(id).select();
	}
	$scope.verifyInputs= function()
	{
		initDefaultValue()
		$localstorage.setObject('user', $scope.user);
	}
	$scope.update = function()
	{
		$localstorage.setObject('user', $scope.user);
	}
	$scope.countEmptyList = function()
	{
		var totalNumber = 4 - document.querySelectorAll('#semester-slider span.ng-binding').length;
		return totalNumber
	}
	$scope.getSemester= function(index)
	{
		$scope.currentIndex = index
	}

	$scope.preList = function(range){
		$scope.start -= range
		if (($scope.overall.semesterArr.length - $scope.start - range ) > 0 )
			$scope.isMax =false
	}

	$scope.nextList = function(range){
		$scope.start += range
		if (($scope.overall.semesterArr.length - $scope.start - range ) < 0 )
			$scope.isMax =true
		$scope.emptyCounts = 4- $scope.overall.semesterArr.length%4;
	}

	$scope.clearSearchInput = function() {
		$scope.search_text.course = '';
	};

	$scope.resetDefault  =function()
	{
	  if(confirm("Are You Sure ?"))
	  {
	  	$scope.overall = GPAService.defaultValue();
	  	$scope.user.grades = []
	  	// $localstorage.removeObject('user')
	  	initDefaultValue(true)
	  	$scope.overall = GPAService.init(angular.copy($scope.user.grades));
	  	$localstorage.setObject('user', $scope.user);
	  	$scope.root.vars.showDesktopSettings = !$scope.root.vars.showDesktopSettings;
	  }
	}

	$scope.selectedCourse = null;

	$scope.selectCourse = function(course) {
		$scope.selectedCourse = course;
		$scope.search_text.course = null;
	}
	$scope.addCourse = function(course){
		$scope.selectedCourse = {
			'short_name':course
		}
		console.log("ADD COURSE NAME :",$scope.selectedCourse)
		$scope.search_text.course = null;

	}

	$scope.openModal = function(modalName, course) {
		console.log("opening modal: " + modalName);
		initDefaultValue()

		if (modalName == 'course' && (!$scope.user.university || !$scope.user.university.name)) {
			ModalService.open('university', $scope);
			return
		}

		if (course) {
			$scope.course = course;
			$scope.selectedCourse = course;
		}
	};

	$scope.closeModal = function(modalName) {
		console.log("closing modal: " + modalName);
		ModalService.close(modalName);
	};


	$scope.resetSelectedCourse = function() {
		$scope.search_text = {course: ''};
		$scope.selectedCourse = null;
	}
	$scope.resetGPAFourm = function(){
		$scope.resetSelectedCourse()
		var gradesInputs = document.querySelectorAll('#grade-options li input');
		for (var i = 0; i < gradesInputs.length ; ++i )
			gradesInputs[i].checked = false;

		$scope.course.units = ""
		$scope.course.year = ""
		$scope.course.semester =""
	}


	$scope.submitCourse = function() {

		if (!$scope.course.units){
			$scope.course.units = $scope.user.defaultCourseUnits
		}
		if (!$scope.course.year){
			$scope.course.year = $scope.user.defaultYear
		}	
		if (!$scope.course.semester){
			$scope.course.semester = $scope.user.defaultSeason
		}	

		if ($scope.selectedCourse &&
			selectedGrade  &&
			$scope.course.units  &&
			$scope.course.year &&
			$scope.course.semester ) {

			$scope.course.grade = selectedGrade;
			$scope.course.actualGrade = GPAService.getActualGrade(selectedGrade)
			$scope.course.name = $scope.selectedCourse.short_name;
			$scope.course.id = $scope.selectedCourse.id;

			var newCourse = angular.copy($scope.course);
			$scope.user.grades.push(newCourse);
			$localstorage.setObject('user', $scope.user);
			$scope.overall = GPAService.init(angular.copy($scope.user.grades));

			$scope.closeModal('course');
			$scope.resetGPAFourm();
			selectedGrade = '';
			$scope.resetSelectedCourse();
			console.log('USER GRADES', $scope.user.grades);

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
		// console.log("ENTER")

		// initEnterActions();

	})

	$scope.$on('$ionicView.loaded', function() {
		loadCourses(2307);
		console.log("cehck", $scope.user.grades)
		initDefaultValue()
		$scope.overall = GPAService.init($scope.user.grades);
		if (!$scope.user) {
			$scope.user = User.initUser();
			console.log('user initialized 1', $scope.user);
			$scope.user.grades = [];
			return;
		}
		if (!$scope.user.grades) {
			console.log('user initialized 2', $scope.user);
			$scope.user.grades = [];
			return;
		}
		if ($scope.overall.semesterArr.length <= 4)
			$scope.totalNumber = 4- $scope.overall.semesterArr.length;

	})

	$scope.$on('$ionicView.beforeEnter', function() {
		console.log("beforeENTER")
		console.log("User Info",$scope.user)
		// initBeforeEnterActions();
		// init GPA grade
		// $scope.user.grades = GPAService.init]
		$scope.overall = GPAService.init($scope.user.grades);

	})

	// ********************#
	// * Helper Functions  #
	// ********************#

	var initDefaultValue = function(force)
	{
		if (force === undefined)
			force = false
		if (!$scope.user.defaultCourseUnits || force){
			$scope.user.defaultCourseUnits = 4;
			console.log("Set default units to :",$scope.user.defaultCourseUnits)
		}

		if (!$scope.user.defaultTerm|| force){
			$scope.user.defaultTerm = 4;
			console.log("Set default terms to :",$scope.user.defaultTerm)
		}

		if ($scope.user.defaultYear === undefined || !$scope.user.defaultYear || force){
			$scope.user.defaultYear = new Date().getFullYear()
		}
		if ($scope.user.defaultSeason === undefined || !$scope.user.defaultSeason|| force){
			$scope.user.defaultSeason = getCurrentSeason()
		}

		if ($scope.user.isCutOffGrade === undefined|| force){
			$scope.user.isCutOffGrade = false;
			console.log("Set default isCutOffGrade to :",$scope.user.isCutOffGrade)
		}
	}
	var getCurrentSeason = function() {
		var currentMonth = new Date().getMonth()
		var season =''
		if (currentMonth>=3 && currentMonth<=5)
		  season = "Spring";
		else if (currentMonth>=6 && currentMonth<=8)
		  season = "Summer";
		else if (currentMonth>=9 && currentMonth<=11)
		  season = "Fall";
		else
		  season = "Winter";
		return season
	}
	// all possible things that need to be initialized on enter should go here.
	var initEnterActions = function() {
		hasWelcomePopupBeenShown();
	}

	var initBeforeEnterActions = function() {
		$scope.overall = GPAService.init($scope.user.grades);
		initSidebarGPAHomeTransition();
		setIOSStatusBarToLightText();
		console.log($scope.overall.averageGPA);
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

	$scope.courses = [];
	function loadCourses(uni_id) {
		$timeout(function() {
			Restangular.one('universities', uni_id).customGET('popular_courses').then(function(response) {


				$scope.courses = response.plain();

	            console.log($scope.courses.length, 'loaded')

	             }, function(err) {
	                 console.error("Error getting popularCourses: " + err);
	        });
	   	}, 0);
	}

}






