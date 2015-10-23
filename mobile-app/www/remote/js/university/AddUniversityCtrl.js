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
  'MapService',
  '$ionicSideMenuDelegate',
  AddUniversityCtrl]);

function AddUniversityCtrl($rootScope, $scope, $state, $timeout, University, $ionicViewSwitcher,
  Geolocation, Utilities, $ionicSlideBoxDelegate, DeviceService, uTracker, $q,
  AnimationService, PerformanceService, $templateCache, AccessService, $ionicModal, ModalService,
  $controller, ModalService, MapService, $ionicSideMenuDelegate) {

  $scope.storedAccess = !AccessService.validate();

  $scope.LOCAL = LOCAL;

  uTracker.setUser(tracker, 'localyticsTest');
  if(DeviceService.isMobile()) {
    var deviceObject = DeviceService.getDevice();
    uTracker.sendDevice(tracker, deviceObject);  
  }
  

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
  };

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  }


  $scope.universitySelected = function(university) {

      PerformanceService.sendListResponseTime('University_List');

      //if user is switching universities
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        if (confirm('Are you sure? Your current courses will be deactivated')) {


          if ($state.current.name === 'root.home' && $ionicSideMenuDelegate.isOpen()) {
            $scope.user.university = university;
            MapService.initStudentHomeMap($scope.user);
            $scope.loader.showAmbig("Saving...", 1000);
            $timeout(function() {
              $scope.loader.hide();
              $scope.loader.showSuccess('University changed!', 2000);
            }, 1000)

            $timeout(function() {
              $ionicSideMenuDelegate.toggleRight();
            }, 1250)
          }

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

      University.majors = [];
      University.courses = [];
      $timeout(function() {

        $scope.getCoursesForUniversityId(university.id);
        $scope.getMajorsForUniversityId(university.id);

      }, 50);

      University.selectedID = university.id;

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

  $scope.refresh = {
    universities: ''
  }

  $scope.toggleLocationIconAppearance = function() {

    if (Geolocation.settings.isAllowed === null || Geolocation.settings.isAllowed === false) {
      console.log("refreshing universities for location!");
      $scope.refresh.universities = 'update';
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

  if(DeviceService.isAndroid()) {
    $scope.refresh.universities = 'update';
  }


}

angular.module('uguru.directives')
.directive('bindList', function($timeout, University, Utilities, Geolocation, DeviceService) {

  function link($scope, element, attributes) {
    var queryPromise = null;
    $timeout(function() {

      $scope.$parent.$watch(
        'refresh.universities',
        function(newValue, oldValue) {
          console.log("heard something!", newValue, oldValue);
          if(newValue === 'update' ) {

              Geolocation.getLocation($scope, $scope.source, function(results) {
                $timeout(function() {
                  $scope.listScope = results;
                }, 0);
              });

          }
        }
      );

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
