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
  'ModalService',
  AddUniversityCtrl]);

function AddUniversityCtrl($rootScope, $scope, $state, $timeout, University, $ionicViewSwitcher,
  Geolocation, Utilities, $ionicSlideBoxDelegate, DeviceService, uTracker, $q,
  AnimationService, PerformanceService, $templateCache, AccessService, $ionicModal, ModalService,
  $controller, ModalService) {

  $scope.storedAccess = !AccessService.validate();

  $scope.LOCAL = LOCAL;

  uTracker.setUser(tracker, 'localyticsTest');
  uTracker.sendDevice(tracker);

  $scope.universitiesSorted = University.getSorted().slice();
  $scope.universities = $scope.universitiesSorted;

  $scope.search_text = {
    university: ''
  };

  //only shows back button local
  $scope.showBackButton = false || LOCAL;
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
  };


  $scope.limit = 10;
  var totalSchools = $scope.universitiesSorted.length
  $scope.increaseLimit = function() {
    if($scope.limit < totalSchools) {
      $scope.limit += 10;
    }
  }

  //back button
  $scope.goToAccessAdmin = function() {
    $scope.search_text.university = '';

    $scope.loader.showAmbig('[ADMIN] Restarting', 1500);
    $timeout(function() {
      $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').previous();
    },0);
  }

  $scope.resetUniversities = function() {
    $scope.search_text.university = '';
    if ($scope.isLocationActive) {
      var userLat = $scope.user.last_position.latitude;
      var userLong = $scope.user.last_position.longitude;
      console.log("lat and long: " + userLat + ", " + userLong);
      $scope.universities = Geolocation.sortByLocation(userLat, userLong, University.getTargetted());
    } else {
      $scope.universities = University.getSorted();
    }
  };

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  }


  $scope.universitySelected = function(university) {

      PerformanceService.sendListResponseTime('University_List');

      //if user is switching universities
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        if (confirm('Are you sure? Your current courses will be deactivated')) {

          $timeout(function() {
            console.log("broadcasting schoolChange!");
            $rootScope.$emit('schoolChange');
          }, 0);

          uTracker.track(tracker, "University Changed", {
              "$University": university.name,
              "$University_Input": $scope.search_text.university
          });
        } else return;
      } else {
        uTracker.track(tracker, "University Selected", {
            "$University": university.name,
            "$University_Input": $scope.search_text.university
        });
      }

      uTracker.set(tracker, {
          "$University": university.name,
      });


      //$scope.loader.showSuccess('Success', 750);

      //timeout to have it be a background thread
      $timeout(function() {

        $scope.getCoursesForUniversityId(university.id);
        $scope.getMajorsForUniversityId(university.id);

      }, 100);

      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.search_text.university = '';

      //fetch the universities

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      var payload = {
        'university_id': $scope.user.university_id
      };

      //save university
      var postUniversitySelectedCallback = function() {

        var modal = document.querySelectorAll('ion-modal-view.university-view')[0];
        if(modal !== undefined) {
          var stringList = modal.classList.toString();
          if(stringList.indexOf('ng-enter-active')) {
            modal.classList.add('ng-leave');
            modal.classList.remove('ng-enter', 'active', 'ng-enter-active');
            $ionicSlideBoxDelegate.update();

            // $timeout(function() {
            //   console.log("broadcasting schoolChange!");
            //   $rootScope.$emit('schoolChange');
            // }, 0);
        }

        } else {
          AnimationService.flip('^.home');
          $ionicViewSwitcher.nextDirection('forward');
          $timeout(function() {
            console.log("cleaning up access/university slidebox");
            var accessUni = document.querySelectorAll('#access-uni-slide')[0]
            if(accessUni) accessUni.remove();
            $scope.$destroy;
          }, 1000);

        }
      }
      $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
  };

  // interesting... in a good way
  $scope.location = Geolocation;

  $scope.toggleLocationIconAppearance = function() {
    //console.log("location.settings.isActive: " + $scope.location.settings.isActive);
    //console.log("Geolocation.settings.isActive: " + Geolocation.settings.isActive);
    
    if (Geolocation.settings.isAllowed === null || Geolocation.settings.isAllowed === false) {
      console.log("calling getGPS");
      getGPS();
    }
    else if (Geolocation.settings.isAllowed) {
      console.log("toggling location.isActive");
      Geolocation.settings.isActive = !Geolocation.settings.isActive;
    }
    else {
      Geolocation.settings.isActive = false;;
      Geolocation.settings.isAllowed = false;
    }
  }

  function getGPS() {
    Geolocation.settings.isActive = true;
    $scope.location.getLocation($scope, $scope.universitiesSorted);
  }

  $scope.$watch(
    'location.coordinates.lat',
    function(newValue, oldValue) {
      if(newValue) {    
          $scope.universities = $scope.location.sortByLocation($scope.location.coordinates.lat, $scope.location.coordinates.lon, $scope.universitiesSorted);
          refreshUniversities();
      }
    }
  );

  $scope.$watch(
    'location.settings.isActive',
    function(newValue, oldValue) {
      if(newValue) {    
          $scope.universities = $scope.location.sortByLocation($scope.location.coordinates.lat, $scope.location.coordinates.lon, $scope.universitiesSorted);
          console.log("calling refresh from location toggling");
          refreshUniversities();
      }
    }
  );

  function refreshUniversities() {

    $scope.search_text.university += ' ';
    $timeout(function() {
      $scope.search_text.university = '';
    }, 1);

    // if (!$scope.$$phase) { // check if digest already in progress
    //   $scope.$apply(); // launch digest;
    // }


  }


}

angular.module('uguru.directives')
.directive('bindList', function($timeout, University, Utilities) {

  function link($scope, element, attributes) {
    var queryPromise = null;
    $timeout(function() {

      $scope.$parent.$watch(
        'search_text.university',
        function(newValue, oldValue) {

          if(newValue.length < oldValue.length) {
            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {

              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 90);
          }

          else if(newValue.length === 1) {

            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 75);
          }

          else if(newValue.length === 0) {

            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 50);
          }

          else {
            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;

            }, 50);
          }
        }

      );
    }, 250);

  }

  return {
    scope: {
      listScope: '=bindList',
      source: '=source'
    },
    link: link,
    restrict: 'A'
  }


});
