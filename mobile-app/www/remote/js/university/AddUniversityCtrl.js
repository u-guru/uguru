angular.module('uguru.util.controllers', ['sharedServices'])
.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'University',
  '$ionicViewSwitcher',
  'Geolocation',
  'Utilities',
  'UniversityMatcher',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  'uTracker',
  '$q',
  'AnimationService',
  'PerformanceService',
  '$templateCache',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, University, $ionicViewSwitcher,
  Geolocation, Utilities, UniversityMatcher, $ionicSlideBoxDelegate,
  DeviceService, uTracker, $q, AnimationService, PerformanceService, $templateCache) {
  console.log("preloading slide transitions");
  AnimationService.initSlide();
  console.log("DeviceService.isMobile(): " + DeviceService.isMobile());

  uTracker.setUser(tracker, 'localyticsTest');
  uTracker.sendDevice(tracker);

  $scope.universitiesSorted = University.getSorted().slice();
  $scope.universities = $scope.universitiesSorted;
  $scope.isLocationActive = false;
  $scope.isLocationGiven = null; // null if getGPS not called, false if not given, true if lat/lon

  $scope.universityInput = {
    value: ''
  };

  // $timeout(function(), {
  //   $templateCache.get(BASE + 'templates/home.html');
  //   $templateCache.get(BASE + 'templates/become.guru.html');
  //   $templateCache.get(BASE + 'templates/majors.html');
  //   $templateCache.get(BASE + 'templates/become.guru.courses.html');
  //   $templateCache.get(BASE + 'templates/become.guru.skills.html');
  //   $templateCache.get(BASE + 'templates/become.guru.photo.html');
  // }, 500);
  

  // Measure app load times
  var appLoadTime;
  var appStartTime;
  $scope.getLoadTime = function() {
        appStartTime = Date.now();
        //console.log("appStartTime: " + appStartTime);
        var time_ms = appStartTime - start_dom_time;
        appLoadTime = (time_ms / 1000.0).toPrecision(3)
        console.log("appLoadTime: " + appLoadTime);
        var performance = 'pass';
        if (appLoadTime > 5) performance = 'fail';
        uTracker.track(tracker, "App Launch", {
          "$App_Load_Time": appLoadTime,
          "$Performance": performance
        });
  };


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
      //console.log("FPS: " + stats.getFPS());
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
        console.log("meanFPS: " + meanFPS);
        //console.log("fpsArray: " + fpsArray);
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
    //$timeout(function() {stopLoop = true}, 300);
    //console.log("called afterEnter");
  };



  $scope.limit = 10;
  $scope.increaseLimit = function() {
    if($scope.limit < $scope.universities.length) {
      $scope.limit += 10;
      //console.log('limit increased is being called', $scope.limit, $scope.universities.length);
    }
  }

  //back button
  $scope.goToAccess = function() {
    $scope.universityInput.value = '';
    $ionicSlideBoxDelegate.previous();
  }

  $scope.resetUniversities = function() {
    $scope.universityInput.value = '';
    if ($scope.isLocationActive) {
      var userLat = $scope.user.last_position.latitude;
      var userLong = $scope.user.last_position.longitude;
      console.log("lat and long: " + userLat + ", " + userLong);
      $scope.universities = Geolocation.sortByLocation(userLat, userLong, University.getTargetted());
    } else {
      $scope.universities = University.getSorted();
    }
  };



  // $timeout(function() {
  //     AnimationService.initSlide();
  // }, 500);
  $scope.universitySelected = function(university) {

      PerformanceService.sendListResponseTime('University_List');

      //if user is switching universities
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        if (confirm('Are you sure? Your current courses will be deactivated')) {
          uTracker.track(tracker, "University Changed", {
              "$University": university.name,
              "$University_Input": $scope.universityInput.value
          });
        } else return;
      } else {
        uTracker.track(tracker, "University Selected", {
            "$University": university.name,
            "$University_Input": $scope.universityInput.value
        });
      }

      uTracker.set(tracker, {
          "$University": university.name,
      });

     // $scope.loader.show();
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.universityInput.value = '';

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      var payload = {
        'university_id': $scope.user.university_id
      };

      //save university
      var postUniversitySelectedCallback = function() {
        //AnimationService.initSlide();
        UniversityMatcher.clearCache();
        //$timeout(function() {
          // $scope.loader.hide();
          //$ionicViewSwitcher.nextDirection('forward');
          
          // var start = null;
           $state.go('^.home');
           //AnimationService.slide('left', 'Student Home');
          // function step(timestamp) {
          //   stats.begin();
          //   if (!start) start = timestamp;
          //   var progress = timestamp - start;
          //   AnimationService.slide('left');
          //   //fpsArray.push(stats.getFPS());
          //   console.log("FPS: " + stats.getFPS());
          //   if(progress < 300) {
          //     requestAnimationFrame(step);
          //   }
          //   stats.end();
          // }
          // requestAnimationFrame(step);
            
        
        //}, 0);
      }

      $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);

  };

  $scope.toggleLocationIconAppearance = function() {
    // get GPS if we haven't attempted it
    if ($scope.isLocationGiven === null) {
      getGPS();
    }
    else if ($scope.locationGiven === false) {
      alert('Please enable GPS permissions from your settings.')
      //reset to null & see if they will do it again
      $scope.isLocationGiven = null;
    }
    else if ($scope.isLocationGiven) {
      $scope.isLocationActive = !$scope.isLocationActive;
    }
    else {
      $scope.locationGiven = false;
      $scope.locationActive = false;
    }
  }


  function getGPS() {
    $scope.isLocationActive = true;
    Geolocation.getLocation($scope);
  };


  $scope.$on('$ionicView.loaded', function() {
    // android doesn't have a special prompt
    if (DeviceService.getPlatform() === 'android') {
      getGPS();
    }
  });

}

angular.module('uguru.directives')
.directive('bindList', function($timeout, University, Utilities) {

  function link($scope, element, attributes) {
    var queryPromise = null;
    $scope.$watch(
      'universityInput.value',
      function(newValue, oldValue) {

        if(newValue.length < oldValue.length) {
          if(queryPromise) {
            $timeout.cancel(queryPromise);
          }
          queryPromise = $timeout(function() {
            //$scope.universities = UniversityMatcher.cachedMatch($scope.universityInput.value);

            $scope.universities = Utilities.nickMatcher($scope.universityInput.value, $scope.universitiesSorted, 'name');
            queryPromise = null;
          }, 90);
        }

        else if(newValue.length === 1) {

          if(queryPromise) {
            $timeout.cancel(queryPromise);
          }
          queryPromise = $timeout(function() {
            $scope.universities = Utilities.nickMatcher($scope.universityInput.value, $scope.universitiesSorted, 'name');
            queryPromise = null;
          }, 75);
        }

        else if(newValue.length === 0) {

          if(queryPromise) {
            $timeout.cancel(queryPromise);
          }
          queryPromise = $timeout(function() {
            $scope.universities = Utilities.nickMatcher($scope.universityInput.value, $scope.universitiesSorted, 'name');
            queryPromise = null;
          }, 50);
        }

        else {
          if(queryPromise) {
            $timeout.cancel(queryPromise);
          }
          queryPromise = $timeout(function() {
            $scope.universities = Utilities.nickMatcher($scope.universityInput.value, $scope.universitiesSorted, 'name');
            queryPromise = null;

          }, 50);
        }
      }

    );

  }

  return {
    link: link,
    restrict: 'A'
  }


});







  // $ionicModal.fromTemplateUrl(BASE + 'templates/how-it-works.modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.howItWorksModal = modal;
  //   $scope.howItWorksModal.show();
  // });

  // $scope.launchHowItWorksModal = function() {
  //   $scope.howItWorksModal.show();
  // }

  // $scope.$on('$ionicView.enter', function() {
  //   $scope.launchHowItWorksModal();
  // });

  // $ionicModal.fromTemplateUrl(BASE + 'templates/availability.modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.availabilityModal = modal;
  //   $scope.availabilityModal.show();
  // });

  // $scope.launchAvailabilityModal = function() {
  //   $scope.availabilityModal.show();
  // }

  // $scope.$on('$ionicView.enter', function() {
  //   $scope.launchAvailabilityModal();
  // });

