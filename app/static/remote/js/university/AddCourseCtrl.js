angular.module('uguru.util.controllers')

.controller('CoursesController', [

	//All imported packages go here
	'$rootScope',
	'$scope',
	'$state',
	'$timeout',
	'$localstorage',
	'$ionicPlatform',
	'$cordovaKeyboard',
	'$ionicModal',
	'$ionicTabsDelegate',
	'$ionicSideMenuDelegate',
	'University',
	'Utilities',
	'uTracker',
	'Course',
	'LoadingService',
	function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
		$cordovaKeyboard, $ionicModal, $ionicTabsDelegate,
		$ionicSideMenuDelegate, University, Utilities, uTracker, Course, LoadingService) {

		$scope.searchInputFocus;

		$scope.courses = University.source.courses || [];
		if (!$scope.courses || !$scope.courses.length) {
			var successCallback = function() {
				$scope.courses = University.source.courses;
			}
			University.getPopularCourses($scope.user.university_id, $scope, successCallback)
		}

		if (!$scope.user.guru_courses) {
			$scope.user.guru_courses = [];
		}


		if (!$scope.search_text) {
			$scope.search_text = {
				course: '',
				matching: [],
				input_focused: false
			};
		}



		function updateDOM() {
			if ($scope.courses.length > 0) {
				for (var j = 0; j < $scope.user.guru_courses.length; j++) {
					for (var k = 0; k < $scope.courses.length; k++) {
						if ($scope.courses[k].id === $scope.user.guru_courses[j].id) {
							console.log("Duplicate course found, deleting...");
							$scope.courses.splice(k, 1);
						}
					}
				}
			}

		}



		$scope.alwaysTrue = true;
		$scope.shouldShowDelete = false;
		$scope.listCanSwipe = true;
		$ionicSideMenuDelegate.canDragContent(false);

		if ($scope.root.vars.guru_mode || $state.current.name === 'root.become-guru') {
			$scope.editCourseMode = false;
			//$scope.search_text.course = '';
		}

		$scope.swipeRightGoBack = function() {
			if (confirm('Exit become guru process?')) {
				LoadingService.show();
				$ionicSideMenuDelegate.toggleRight();
				$timeout(function() {
					LoadingService.hide();
				}, 500);
			}
		};

		$scope.clearSearchInput = function() {
			$scope.search_text.course = '';
		};

		$scope.editCourses = function() {
			console.log('show delete should be here');
		};



		$scope.updateProgress = function(input_text) {

			$scope.progress = (input_text.length > 0);
		};


		$scope.removeGuruCourseAndUpdate = function(course, index) {

			var courseName = course.title || course.name;

			if (!confirm('Remove ' + courseName + '?')) {
				return;
			}

			$scope.user.guru_courses.splice(index, 1);

			$scope.courses.push(course);
			$scope.$apply();
			// updateDOM();

			var confirmCallback = function() {

				uTracker.track(tracker, 'Course Guru Removed', {
					'$Course': course.name
				});
				//LoadingService.showSuccess(course.name + ' successfully removed', 1200);
			};

			$localstorage.setObject('user', $scope.user);

			$timeout(function() {
				$scope.user.updateAttr('remove_guru_course', $scope.user, course, confirmCallback, $scope);
			}, 200);

		};


		$scope.cancelStudentAddCourse = function() {
			$scope.showCourseInput = !$scope.showCourseInput;
			$scope.studentCourseInput.value = "";
		};

		$scope.addSelectedStudentCourse = function(course, input_text, $index) {
			for (var i = 0; i < $scope.courses.length; i++) {
				if ($scope.courses[i].id === course.id) {
					$scope.courses.splice(i, 1);
				}
			}
			if (course.short_name && !course.name) {
				course.name = course.short_name;
			}
			$scope.user.student_courses.push(course);
			$scope.search_text.course = '';
			$localstorage.setObject('user', $scope.user);
			//only if user has signed in
			if ($scope.user.id) {
				//adds to database for user
				$scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
			} //

		};

		$scope.addSelectedGuruCourse = function(course) {


			for (var i = 0; i < $scope.courses.length; i++) {
				if ($scope.courses[i].id === course.id) {
					console.log("transferring course from source to user");
					$scope.courses.splice(i, 1);
				}
			}

			if (course.short_name && !course.name) {
				course.name = course.short_name;
			}

			$scope.user.guru_courses.push(course);

			$scope.search_text.course = '';
			// updateDOM();


			uTracker.track(tracker, 'Course Guru Added', {
				'$Course': course.name
			});

			$localstorage.setObject('user', $scope.user);
			//only if user has signed in
			if ($scope.user.id) {
				//adds to database for user
				$scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
			} //

		};


		$scope.blurSearchInput = function() {
			console.log($scope.search_text)
			$timeout(function() {
    			$scope.search_text.input_focused = false;
			}, 250)
		}

		$scope.limit = 10;
		$scope.increaseLimit = function() {
			if ($scope.courses && $scope.limit < $scope.courses.length) {
				$scope.limit += 10;
			}
		};



		if ($scope.desktopMode && $state.current.name === 'root.desktop-become-guru') {


			$timeout(function() {
				document.querySelector('#desktop-courses-save-button').addEventListener('click', function() {

					LoadingService.showSuccess('Saved!', 1500);
					$timeout(function() {
						var elem = document.querySelector('#cta-modal-profile-courses');
						if (elem) {
							elem.classList.remove('show');
						}

					}, 500);

				});
			}, 1500);

		}


	}


]);