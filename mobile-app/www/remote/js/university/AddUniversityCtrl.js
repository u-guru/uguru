angular.module('uguru.util.controllers', ['sharedServices'])
	.controller('AddUniversityCtrl', [

		//All imported packages go here
		'$rootScope',
		'$scope',
		'$state',
		'$timeout',
		'University',
		'$ionicViewSwitcher',
		'Geolocation',
		'Utilities',
		'$ionicSlideBoxDelegate',
		'DeviceService',
		'uTracker',
		'$q',
		'AnimationService',
		'PerformanceService',
		'$templateCache',
		'AccessService',
		'$ionicModal',
		'ModalService',
		'$controller',
		'MapService',
		'$ionicSideMenuDelegate',
		'LoadingService',
		'$localstorage',
		AddUniversityCtrl
	]);

function AddUniversityCtrl($rootScope, $scope, $state, $timeout, University, $ionicViewSwitcher,
  Geolocation, Utilities, $ionicSlideBoxDelegate, DeviceService, uTracker, $q,
  AnimationService, PerformanceService, $templateCache, AccessService, $ionicModal, ModalService,
  $controller, MapService, $ionicSideMenuDelegate, LoadingService, $localstorage) {

  $scope.storedAccess = !AccessService.validate();

  $scope.LOCAL = LOCAL;

  uTracker.setUser(tracker, 'localyticsTest');
  if(DeviceService.isMobile()) {
    var deviceObject = DeviceService.getDevice();
    uTracker.sendDevice(tracker, deviceObject);
  }


  $scope.universitiesSorted = University.getTargetted().slice();
  $scope.universities = University.getTargetted().slice();;

  $scope.search_text = {
    university: '',
    matching: []
  };

  if ($state.current.name.indexOf('hs') > -1) {
    $scope.root.vars.hs_mode = true;
  }

  //only shows back button local
  $scope.showBackButton = false || LOCAL;
  // Measure app load times
  var appLoadTime;
  var appStartTime;
  $scope.getLoadTime = function() {
        appStartTime = Date.now();
        var time_ms = appStartTime - start_dom_time;
        appLoadTime = (time_ms / 1000.0).toPrecision(3);
        var performance = 'pass';
        if (appLoadTime > 5) performance = 'fail';
        uTracker.track(tracker, "App Launch", {
          "$App_Load_Time": appLoadTime,
          "$Performance": performance
        });
  };

  $scope.backToAccess = function() {
    if (mixpanel && mixpanel.track) {
      mixpanel.track("Back to access selected");
    }

    if ($scope.root.vars.hs_mode) {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.essay-home')
    } else {
      $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').previous();
    }
  }


  // Measure FPS of access page -> university list transition
  var stopLoop = false;
  //var stats = new Stats();

  $scope.beforeEnter = function() {
    stopLoop = false;
    var fpsArray = [];

    function update() {
      stats.begin();
      stats.end();
      fpsArray.push(stats.getFPS());
      if (!stopLoop) {
        requestAnimationFrame(update);
      } else {
        var total = 0;
        for (var i = 0; i < fpsArray.length; i++) {
          total += fpsArray[i];
        }
        //we are disregarding the first value since it's most likely 0 due to initial transition
        fpsArray.shift();
        var meanFPS = Math.round(total / (fpsArray.length));
        var performance = 'pass';
        if(meanFPS < 10) performance = 'fail';
        uTracker.track(tracker, "Entered Access Code", {
          "$Mean_FPS": meanFPS,
          "$FPS_Array": fpsArray.toString(),
          "$Performance": performance
        });
      }
    }
    requestAnimationFrame(update);
  };

  $scope.afterEnter = function() {
    stopLoop = true;
  };


  $scope.limit = 10;
  var totalSchools = $scope.universitiesSorted.length;
  $scope.increaseLimit = function() {
    if($scope.limit < totalSchools) {
      $scope.limit += 10;
    }
  };

  //back button
  $scope.goToAccessAdmin = function() {
    $scope.search_text.university = '';

    LoadingService.showAmbig('[ADMIN] Restarting', 1500);
    $timeout(function() {
      $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').previous();
    },0);
  };

  $scope.resetUniversities = function() {
    $scope.search_text.university = '';
  };

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  };


  $scope.universitySelected = function(university) {

      //if user is switching universities
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        if ($state.current.name !== 'root.university' && $scope.user.guru_courses && $scope.user.guru_courses.length && confirm('Are you sure? Your current courses will be deactivated')) {
          $scope.user.university = university;
        } else {
          return;
        }
      }


      if (mixpanel && mixpanel.track) {
        mixpanel.track(
            "University selected",
            {name: university.name,
              id:university.id
            }
        );
      }

      $scope.user.university = university;
      University.clearSelected();
      $timeout(function() {
        University.getMajors(university.id);
        University.getPopularCourses(university.id);
      }, 100);


      University.selected = university;

      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.search_text.university = '';

      $timeout(function() {
        $localstorage.setObject('university', university);
        $localstorage.setObject('user', $scope.user);
      }, 0);

      var payload = {
        'university_id': university.id
      }

      var flipCallback;
      var university_msg = 'Loading an awesome experience..';


      if ($state.current.name === 'root.university') {

        LoadingService.showAmbig(university_msg, 1500);
        $timeout(function() {

          if ($scope.desktopMode) {
            AnimationService.flip('^.desktop-become-guru');
          } else {
            AnimationService.flip('^.become-guru');
          }

        }, 1250);
      } else {
        LoadingService.showAmbig(university_msg, 3000, function() {
          $scope.closeModal('university');
        });
      }

      $timeout(function() {
        if ($scope.user.id) {
          $scope.user.updateAttr('university_id', $scope.user, payload, null, $scope);
        }
      }, 0);

  };

  // interesting... in a good way
  $scope.location = Geolocation;

  $scope.refresh = {
    universities: ''
  };

  $scope.toggleLocationIconAppearance = function() {
    if (mixpanel && mixpanel.track) {
      mixpanel.track("Get GPS Location attempted");
    }
    if (Geolocation.settings.isAllowed === null || Geolocation.settings.isAllowed === false) {
      $scope.refresh.universities = 'update';
      LoadingService.showAmbig();
    }
    else if (Geolocation.settings.isAllowed) {
      LoadingService.hide()
      Geolocation.settings.isActive = !Geolocation.settings.isActive;
    }
    else {

      if (mixpanel && mixpanel.track) {
        mixpanel.track("Location access denied")
      }

      Geolocation.settings.isActive = false;
      Geolocation.settings.isAllowed = false;
    }
  };

  if(DeviceService.isAndroid()) {
    $scope.refresh.universities = 'update';
  }



}

// angular.module('uguru.directives')
// 	.directive('bindList', function($timeout, University, Utilities, Geolocation, DeviceService, LoadingService) {

// 		function link($scope, element, attributes) {
// 			var queryPromise = null;
// 			$timeout(function() {

// 				$scope.$parent.$watch(
// 					'refresh.universities',
// 					function(newValue, oldValue) {
// 						if (newValue === 'update') {


// 							// LoadingService.showAmbig('Calculating distance...', 2000);
// 							Geolocation.getLocation($scope, $scope.source, function(results) {
// 								$timeout(function() {
// 									$scope.listScope = results;
// 								}, 0);
// 							}, DeviceService.isIOSDevice());

// 						}
// 					}
// 				);

// 				$scope.$parent.$watch(
// 					'search_text.university',
// 					function(newValue, oldValue) {

// 						if (newValue.length < oldValue.length) {
// 							if (queryPromise) {
// 								$timeout.cancel(queryPromise);
// 							}
// 							queryPromise = $timeout(function() {
// 								$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
// 								queryPromise = null;
// 							}, 90);
// 						} else if (newValue.length === 1) {

// 							if (queryPromise) {
// 								$timeout.cancel(queryPromise);
// 							}
// 							queryPromise = $timeout(function() {
// 								$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
// 								queryPromise = null;
// 							}, 75);
// 						} else if (newValue.length === 0) {

// 							if (queryPromise) {
// 								$timeout.cancel(queryPromise);
// 							}
// 							queryPromise = $timeout(function() {
// 								$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
// 								queryPromise = null;
// 							}, 50);
// 						} else {
// 							if (queryPromise) {
// 								$timeout.cancel(queryPromise);
// 							}
// 							queryPromise = $timeout(function() {
// 								$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
// 								queryPromise = null;

// 							}, 50);
// 						}
// 					}

// 				);
// 			}, 250);

// 		}

// 		return {
// 			scope: {
// 				listScope: '=bindList',
// 				source: '=source',
// 			},
// 			link: link,
// 			restrict: 'A'
// 		};


// 	});