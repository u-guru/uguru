angular.module('uguru.util.controllers', [])

.controller('AddUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$q',
  'University',
  '$cordovaKeyboard',
  '$ionicLoading',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $q, University,
  $cordovaKeyboard, $ionicLoading, $cordovaStatusbar,
  $ionicViewSwitcher) {

    $scope.search_text = '';
    $scope.keyboard_force_off = false;
    $scope.view = 1;

    $scope.getUniversitiesFromServer = function(promise) {
        $scope.loader.show();
        University.get().then(
          function(universities) {
              $scope.loader.hide();
              $scope.keyboard_force_off = false;

              $timeout(function() {
                $scope.setFocus();
              }, 1000);

              universities = JSON.parse(universities);
              if (promise) {
                promise.resolve(universities);
              }
              $scope.universities = universities;

              $localstorage.setObject('universities', $scope.universities);
              console.log($scope.universities.length + ' universities successfully loaded');
          },
          function() {
              console.log('Universities NOT successfully loaded');
          }
      );
    }

    $scope.toggleView = function(index) {
      $scope.view = index;
      if (index === 2) {
        if ($scope.platform.mobile && !$cordovaKeyboard.isVisible()) {
          $timeout(function() {
            var element = document.getElementById("university-input")
            if (element) {
              element.focus();
            }
          }, 500);
        }
      } else {
        if ($scope.platform.mobile && $cordovaKeyboard.isVisible()) {
          $cordovaKeyboard.close();
        }
      }
    }

    $scope.setFocus = function(target) {
      if ($scope.search_text.length === 0 && !$scope.keyboard_force_off) {
        var element = document.getElementById("university-input")
        if (element) {
          element.focus();
        } else {
          console.log('University input could not be found');
        }
      }
    };

    var GetUniversityList = function() {

      var universitiesLoaded = $q.defer();

      // $scope.$on('modal.shown', function() {

        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        if ($localstorage.getObject('universities').length === 0) {
            $scope.getUniversitiesFromServer(universitiesLoaded);
          }

        if ($localstorage.getObject('universities').length > 0) {
            $scope.keyboard_force_off = false;
            $timeout(function() {
                $scope.setFocus();
            }, 500);
        }

      // });

      if ($localstorage.getObject('universities').length > 0) {

          return $localstorage.getObject('universities');

      } else {

        return universitiesLoaded.promise;

      }


    }

    $scope.$on('modal.hidden', function() {
      if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $scope.universities = GetUniversityList();



    $scope.clearSearchInput = function() {
        $scope.search_text = '';
    };

    $scope.universitySelected = function(university, $event) {

      if ($scope.onboarding === true) {

        $scope.nearestUniversitySelected($event, university);
        return;
      }

      var successCallback = function() {
        console.log('callback executed');
        console.log('cleared previous universities courses from the cache')

          $scope.user.guru_courses = [];
          $scope.user.student_courses = [];
          $localstorage.removeObject('courses');

      };

      //if they have already selected one
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        var dialog = {
          msg: 'Are you sure you want to change universities? This will deactive your current courses.',
          title: 'Warning',
          button_arr: ['No Thanks', "I'm sure"],
        }

        if ($scope.platform.mobile) {
            dialog.arr_callback = [null, successCallback];
            $scope.root.dialog.confirm(dialog.msg, dialog.title, dialog.button_arr, dialog.arr_callback);
        }  else {
          if (confirm(dialog.msg)) {
            successCallback();
          }
        }

      }

      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.user.university.latitude = university.location.latitude;
      $scope.user.university.longitude = university.location.longitude;
      $scope.search_text = '';
      $scope.keyboard_force_off = true;
      $scope.rootUser.updateLocal($scope.user);

      $scope.user.updateAttr('university_id', $scope.user, $scope.user.university_id);
      $scope.success.show(0, 2000, 'Saved!');
      $timeout(function() {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.home')
      }, 1000);

    }



    $scope.hideUniversityModal = function() {
      if (window.StatusBar) {
          StatusBar.styleDefault();
      }

      if ($scope.platform.mobile && $cordovaKeyboard.isVisible()) {
        $scope.keyboard_force_off = true;
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addUniversityModal.hide();
        }, 300)
      } else {
        $scope.addUniversityModal.hide();
      }
    }
    //case 1: if universities do not exist in local storage ... go get them
    //case 2: if user has ios && user has not been prompted... , prompt the display to get access
    //case 3: if coordinates are available && nearest_universities are not displayed..., calculate the nearest gps

  }


])