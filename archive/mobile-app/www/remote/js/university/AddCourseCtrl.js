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
	'RootService',
	function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
		$cordovaKeyboard, $ionicModal, $ionicTabsDelegate,
		$ionicSideMenuDelegate, University, Utilities, uTracker, Course, LoadingService, RootService) {

		$scope.searchInputFocus;

		if ($state.current.name !== 'root.universities' && $scope.user && $scope.user.university && $scope.user.university.id) {
			$scope.courses = University.source.courses || [];
			if (!$scope.courses || !$scope.courses.length) {
				University.getPopularCoursesPromise($scope.user.university.id).then(function(courses) {
					courses = courses.plain();
					$scope.courses = courses;
					$scope.courses = $scope.courses.filter( function( el ) {
					  return objectFindByIndexByKey($scope.user.student_courses, 'short_name', el.short_name) < 0;
					});
					$timeout(function() {
						$scope.$apply();
					})
				}, function() {
					return
				})
			} else {
				$scope.courses = $scope.courses.filter( function( el ) {
					return objectFindByIndexByKey($scope.user.student_courses, 'short_name', el.short_name) < 0;
				});
			}
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

		function objectFindByIndexByKey (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        return i;
                    }
            }
            return -1;
        }

		$scope.addUniversityStudentCourse = function(course, $index) {
			var course;
			if ($scope.university && $scope.university.popular_courses && $scope.university.popular_courses.length) {
				var course = $scope.university.popular_courses.splice($index, 1)[0];
			} else if ($scope.selectedUniversity && $scope.selectedUniversity.courses && $scope.selectedUniversity.courses.length) {
				var course = $scope.selectedUniversity.courses.splice($index, 1)[0];
			}

			if (course) {
				$scope.user.student_courses.push(course);
		      	$timeout(function(){
		      		$scope.$apply();
		      	})
			}
	    }

	    $scope.removeUniversityStudentCourse = function(course, $index) {
	      var course = $scope.user.student_courses.splice($index, 1)[0];
	      $scope.courses.unshift(course);
	    }

	    $scope.addSelectedStudentCourse = function(course, input_text, $index) {
			var course = $scope.courses.splice($index, 1)[0]
			$scope.user.student_courses.push(course);

			$localstorage.setObject('user', $scope.user);

			if ($scope.user.id) {
				$scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
				$scope.search_text.course = '';
			}
		};

		$scope.removeSelectedStudentCourse = function(course, input_text, $index) {
			var course = $scope.user.student_courses.splice($index, 1)[0];
			$scope.courses.unshift(course);
			LoadingService.showSuccess('Removed ' + course.short_name || course.name, 1000);

			$localstorage.setObject('user', $scope.user);

			if ($scope.user.id) {
				$scope.user.updateAttr('remove_student_course', $scope.user, course, null, $scope);
			}
		};


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
			return
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



		$scope.addSelectedGuruCourse = function(course) {


			for (var i = 0; i < $scope.courses.length; i++) {
				if ($scope.courses[i].id === course.id) {
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