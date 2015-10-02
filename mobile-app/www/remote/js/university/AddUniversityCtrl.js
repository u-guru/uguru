angular.module('uguru.util.controllers', ['sharedServices'])
.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'University',
  '$ionicViewSwitcher',
  'Geolocation',
  'Settings',
  'Utilities',
  'deviceInfo',
  'UniversityMatcher',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  'uTracker',
  '$q',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, University, $ionicViewSwitcher,
  Geolocation, Settings, Utilities, deviceInfo, UniversityMatcher, $ionicSlideBoxDelegate,
  DeviceService, uTracker, $q) {

  console.log("DeviceService.isMobile(): " + DeviceService.isMobile());

  uTracker.setUser(tracker, 'localyticsTest');
  uTracker.sendDevice(tracker);


  document.addEventListener("pause", lastSearch, false);
  document.addEventListener("backbutton", lastSearch, false);
  function lastSearch() {

    uTracker.track(tracker, "Paused/Back", {
      "$University_Input": $scope.universityInput.value
    });
  }

  $scope.universities = University.getSorted();
  $scope.isLocationActive = false;
  $scope.isLocationGiven = null; // null if getGPS not called, false if not given, true if lat/lon

  $scope.universityInput = {
    value: ''
  }




  var appLoadTime;
  var appStartTime;

  $scope.getLoadTime = function() {

        appStartTime = Date.now();
        console.log("appStartTime: " + appStartTime);
        var time_ms = appStartTime - start_dom_time;
        var time_s = (time_ms / 1000.0).toPrecision(3)
        var loadTime = time_s;
        appLoadTime = loadTime;
        console.log("appLoadTime: " + appLoadTime);

        uTracker.track(tracker, "App Launch", {
          "$App_Load_Time": appLoadTime
        });
  }



  var stopLoop = false;
  var stats = new Stats();

  $scope.beforeEnter = function() {
    stopLoop = false;
    var fpsArray = [];

    function update() {
      stats.begin();
      stats.end();
      fpsArray.push(stats.getFPS());
      console.log("FPS: " + stats.getFPS());
      if (!stopLoop) {
        Utilities.rAF(update);
      } else {
        var total = 0;
        for (var i = 0; i < fpsArray.length; i++) {
          total += fpsArray[i];
        }
        //we are disregarding the first value since it's most likely 0 due to initial transition
        fpsArray.shift();
        var meanFPS = Math.round(total / (fpsArray.length));
        console.log("meanFPS: " + meanFPS);
        console.log("fpsArray: " + fpsArray);
        //var fpsValue = "meanFPS: " + meanFPS + "/ fpsArray: " + fpsArray.toString();
        //console.log("fpsValue: " + fpsValue);

        uTracker.track(tracker, "Entered Access Code", {
          "$Mean_FPS": meanFPS,
          "$FPS_Array": fpsArray.toString()
        });

      }

    }
    Utilities.rAF(update);
  };


  $scope.afterEnter = function() {
    stopLoop = true;
    //$timeout(function() {stopLoop = true}, 300);
    //console.log("called afterEnter");
  };

    var listResponseTime = 0;
    var active = true;
    var listEndTime = 0;
    $scope.$on('uniListFinished', function() {

      if(active) {
        if($scope.universityInput.value.length > 0) {
          listResponseTime = Date.now();
          console.log("setting listResponseTime: " + listResponseTime);
          active = false;
        }
        else if($scope.universityInput.value.length === 0) {
          listEndTime = Date.now();
          console.log("listEndTime: " + listEndTime);
        }
      }
    });

    var measureFPS = true;
    var inputStartTime = 0;
    $scope.query = function() {
      if(measureFPS) {
        measureFPS = false;
        inputStartTime = Date.now();
        $scope.universities = UniversityMatcher.cachedMatch($scope.universityInput.value);
      }
      else if(!measureFPS) {
        if($scope.universityInput.value.length===0){
          $timeout(function(){$scope.universities = UniversityMatcher.cachedMatch($scope.universityInput.value)}, 500);
        }
        else {
          $timeout(function(){$scope.universities = UniversityMatcher.cachedMatch($scope.universityInput.value)}, 16);
        }
      }
    }

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


  $scope.universitySelected = function(university) {

      var searchResponseTime = listResponseTime - inputStartTime;
      console.log("searchResponseTime: " + searchResponseTime);

      var listRenderTime = listEndTime - appStartTime;
      console.log("listRenderTime: " + listRenderTime);


      uTracker.track(tracker, "University Selected", {
          "$University": university.name,
          "$University_Input": $scope.universityInput.value
      });
      uTracker.set(tracker, {

          "$University": university.name,
          "$Search_Response_Time": searchResponseTime,
          "$List_Render_Time": listRenderTime
      });

      //if user is switching universities
      if ($scope.user.university_id
          && university.id !== $scope.user.university_id
          && !confirm('Are you sure? Your current courses will be deactivated'))
      {
          return;
      }

      uTracker.track(tracker, "University Changed", {
          "$University": university.name,
          "$University_Input": $scope.universityInput.value
      });
      uTracker.set(tracker, {
          "$University": university.name,
      });
      $scope.loader.show();
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.universityInput.value = '';

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      var payload = {
        'university_id': $scope.user.university_id
      };

    $scope.loader.show();
    $scope.user.university_id = university.id;
    $scope.user.university = university;
    $scope.universityInput.value = '';

    //start fetching majors right now
    $scope.getMajorsForUniversityId(university.id);
    $scope.getCoursesForUniversityId(university.id);

    //update user to locat storage
    $scope.rootUser.updateLocal($scope.user);

    var payload = {
      'university_id': $scope.user.university_id
    };

    //save university
    var postUniversitySelectedCallback = function() {

      $timeout(function() {

        $scope.loader.hide();

          $ionicViewSwitcher.nextDirection('forward');
          UniversityMatcher.clearCache();
          $state.go('^.home')
      }, 1000);

    }

    $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);

  };


  var isTimeout = false;
  $scope.toggleLocation = function() {
    // set isLocationActive to true while calculating so user gets feedback that its been receivede

    if (!isTimeout) {
      isTimeout = true;
      getGPS();
      $timeout(function() {
        isTimeout = false;
      }, 4000);
    } else {
      console.log("still waiting for $timeout to clear, please try again shortly");
    }
  }


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