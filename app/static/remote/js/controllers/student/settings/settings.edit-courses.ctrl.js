angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsEditCoursesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$ionicHistory',
  '$ionicModal',
  '$cordovaKeyboard',
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $ionicHistory,
  	$ionicModal, $cordovaKeyboard, $ionicViewSwitcher) {
    $scope.editMode = false;
	$scope.progress_active = false;


	$scope.saveCourses = function() {
		$scope.rootUser.updateLocal($scope.user);
		$scope.success.show(0, 1500);
	}

    $scope.goBack = function() {
        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
        $ionicHistory.goBack();
        // $(state).go('^.student-home');
    }

	$scope.toggleEditMode = function() {
		$scope.editMode = !$scope.editMode;
		if ($scope.editMode) {
			$scope.shouldShowDelete = true;
		}
		//save clicked
		else {
			$scope.shouldShowDelete = false;
			$scope.rootUser.updateLocal($scope.user);
            $scope.success.show(0, 1500);
		}
	}

    //TODO: EDIT COURSES for GURUS / STUDENTS + SERVER PERSISTENCE

	$ionicModal.fromTemplateUrl(BASE + 'templates/add-course.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addCourseModal = modal;
	});

	$ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addUniversityModal = modal;
	});

	$scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
    }

    $scope.studentCourseDeleteUpdate = function(index) {
        var student_course = $scope.user.student_courses[index];
        $scope.user.student_courses.splice(index, 1);
        $scope.user.updateAttr('remove_student_course', $scope.user, student_course, null, $scope);
        $scope.success.show(0, 1500);
    }

    $scope.guruCourseDeleteUpdate = function(index) {
        var guru_course = $scope.user.guru_courses[index];
        $scope.user.guru_courses.splice(index, 1);
        $scope.user.updateAttr('remove_guru_course', $scope.user, guru_course, null, $scope);
        $scope.success.show(0, 1500);
    }

	// $scope.showSuccess = function(msg) {
 //      if (!$scope.progress_active)  {
 //      		$scope.progress_active = true;
 //      		$cordovaProgress.showSuccess(true, msg)
	//       	$timeout(function() {
	//         	$cordovaProgress.hide();
	//         	$scope.progress_active = false;
	//         	$ionicHistory.goBack();
	//       	}, 1000);
 //      } else {

 //      	console.log('Show success cannot be shown because progress bar is already active');
 //      }
 //    }

  }

]);

