angular.module('uguru.util.controllers', ['sharedServices'])
.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$rootScope',
  '$scope',
  '$state',
  '$timeout',
  'University',
  '$ionicViewSwitcher',
  'Utilities',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  'uTracker',
  '$q',
  'AnimationService',
  'PerformanceService',
  '$templateCache',
  '$ionicModal',
  '$controller',
  'ModalService',
  '$ionicSideMenuDelegate',
  'LoadingService',
  'Geolocation',
  '$localstorage',
  AddUniversityCtrl]);

function AddUniversityCtrl($rootScope, $scope, $state, $timeout, University, $ionicViewSwitcher,
  Utilities, $ionicSlideBoxDelegate, DeviceService, uTracker, $q,
  AnimationService, PerformanceService, $templateCache, $ionicModal,
  $controller, ModalService, $ionicSideMenuDelegate, LoadingService, Geolocation,
  $localstorage) {



  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.prevSlide = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.LOCAL = LOCAL;

  $scope.slideHasChanged = function(index) {

    console.log('slide has changed to', index);
    if (index === 3) {
      initFoodUniversityFilter();
    }

  }


  // uTracker.setUser(tracker, 'localyticsTest');
  // uTracker.sendDevice(tracker);

  $scope.universitiesSorted = University.getSorted().slice();
  $scope.universities = $scope.universitiesSorted;

  $scope.search_text = {
    university: ''
  };


  var initFoodUniversityFilter = function() {

    $scope.returnFoodUniversities = function(value, index, array) {

      // console.log(value, index, array);
      var idString = value.id + "";
      if ($scope.universityFoodRouterIds.indexOf(idString) > 0) {
        return value;
      }

      return null;
    }

  }

  $scope.limit = 10;
  var totalSchools = $scope.universitiesSorted.length;
  $scope.increaseLimit = function() {
    if($scope.limit < totalSchools) {
      $scope.limit += 10;
    }
  };

  //back button
  // $scope.goToAccessAdmin = function() {
  //   $scope.search_text.university = '';

  //   LoadingService.showAmbig('[ADMIN] Restarting', 1500);
  //   $timeout(function() {
  //     $ionicSlideBoxDelegate.$getByHandle('access-university-slide-box').previous();
  //   },0);
  // }

  $scope.resetUniversities = function() {
    $scope.search_text.university = '';
  };

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  };


  $scope.universitySelected = function(university) {
      University.selected = university;
      $scope.root.vars.map = { center: { latitude: parseFloat(University.selected.latitude), longitude: parseFloat(University.selected.longitude) }, zoom: 14 };
      PerformanceService.sendListResponseTime('University_List');
      $timeout(function() {
        console.log('retrieving', university.name, 'food data...')
        $scope.parseUniversityFoodMenu(university.id, $scope.universityFoodDict);
      })

      console.log('storing university selected to localstorage');
      $localstorage.setObject('university', university);


      //if user is switching universities
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        if (confirm('Are you sure? Your current courses will be deactivated')) {


          if ($state.current.name === 'root.home' && $ionicSideMenuDelegate.isOpen()) {
            $scope.user.university = university;
            MapService.initStudentHomeMap($scope);
            LoadingService.showAmbig("Saving...", 1000);
            $timeout(function() {
              LoadingService.hide();
              LoadingService.showSuccess('University changed!', 2000);
            }, 1000);

            $timeout(function() {
              $ionicSideMenuDelegate.toggleRight();
            }, 1250);
          }

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





      // University.selectedID = university.id;
      University.selected = university;


      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.search_text.university = '';

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      $state.go('^.grub-home');

      //save university
      // var postUniversitySelectedCallback = function() {

      //   var modal = document.querySelectorAll('ion-modal-view.university-view')[0];
      //   if(modal !== undefined) {
      //     ModalService.close('university');
      //     var stringList = modal.classList.toString();
      //     if(stringList.indexOf('ng-enter-active')) {
      //       // modal.classList.add('ng-leave');
      //       // modal.classList.remove('ng-enter', 'active', 'ng-enter-active');
      //       // modal.style.visibility = 'hidden';
      //       $ionicSlideBoxDelegate.update();

      //   }

      //   } else {
      //     AnimationService.flip('^.grub-home');
      //     $ionicViewSwitcher.nextDirection('forward');
      //     $timeout(function() {
      //       console.log("cleaning up intro slidebox");
      //       var introSlide = document.querySelectorAll('#intro-slide-box')[0];
      //       if(introSlide) introSlide.remove();
      //       $scope.$destroy;
      //     }, 1000);

      //   }
      // }
      // $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
  };

  // interesting... in a good way
  $scope.location = Geolocation;

  $scope.toggleLocationIconAppearance = function() {

    if (Geolocation.settings.isAllowed === null || Geolocation.settings.isAllowed === false) {
      console.log("refreshing universities for location!");
      $scope.refresh.universities = 'update';
      LoadingService.showAmbig();
    }
    else if (Geolocation.settings.isAllowed) {
      console.log("toggling location.isActive");
      LoadingService.hide()
      Geolocation.settings.isActive = !Geolocation.settings.isActive;
    }
    else {
      Geolocation.settings.isActive = false;
      Geolocation.settings.isAllowed = false;
    }
  };

  $scope.refresh = {
    universities: ''
  };



}



angular.module('uguru.directives')
.directive('bindList', function($timeout, University, Utilities, DeviceService, Geolocation) {

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
      source: '=source',
    },
    link: link,
    restrict: 'A'
  };


});
