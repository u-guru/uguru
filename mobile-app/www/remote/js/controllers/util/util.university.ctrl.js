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
  '$cordovaGeolocation',
  '$ionicSideMenuDelegate',
  '$ionicSlideBoxDelegate',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $q, University,
  $cordovaKeyboard, $ionicLoading, $cordovaStatusbar,
  $ionicViewSwitcher, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
    $scope.data = {};
    $scope.search_text = '';
    $scope.keyboard_force_off = false;
    $scope.view = 1;

    $scope.goToAccess = function() {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.access');
    }

    $scope.backToStudentEditProfile = function(is_saved) {


      if (is_saved) {
        $scope.success.show(0, 1500);
      } else {
        $scope.loader.show();
      }

      if ($scope.root.vars.guru_mode) {

        $state.go('^.guru-profile');

      } else {


        //toggle the side menu to the right
        $timeout(function() {
          $ionicSideMenuDelegate.toggleRight();
        }, 500);

      }

      //close the loader
      $timeout(function() {
        $scope.loader.hide();
      }, 1000);

    }

    $scope.saveUniversityFromStudentProfileSideBar = function(university) {

      var successCallback = function() {

        $scope.user.student_courses = [];
        $localstorage.removeObject('courses');

        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;

        $scope.search_text = '';
        $scope.keyboard_force_off = true;

        payload = {'university_id': $scope.user.university_id};

        $scope.backToStudentEditProfile(true);

        $scope.user.updateAttr('university_id', $scope.user, payload, null, $scope);
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
    }

    $scope.unFocusSelect = function() {
      var selectElement = document.getElementById('role-select');
      console.log('found element', JSON.stringify(selectElement));
      selectElement.blur();
    }

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
        $scope.root.slider.hide();

        if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
          $cordovaKeyboard.hideAccessoryBar(true);
        }

        $timeout(function() {

          var element = document.getElementById("university-input")
          if (element) {
            element.focus();
          }

          if ($scope.platform.android && window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.show();
          }

        }, 300);
      } else {
        if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
            $cordovaKeyboard.hideAccessoryBar(false);
        }
        $scope.root.slider.show();
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

        if ($scope.platform.android && window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.show();
        }

      }
    };

    var GetUniversityList = function() {

      var universitiesLoaded = $q.defer();



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

      $scope.loader.show();
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

        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;
        $scope.rootUser.updateLocal($scope.user);

        payload = {'university_id': $scope.user.university_id};

        var postUniversitySelectedCallback = function() {
          $timeout(function() {
            $scope.loader.hide();
            $ionicViewSwitcher.nextDirection('forward');
            if ($state.current.name === 'root.university-container') {
              $scope.backToStudentEditProfile(true);
            } else {
              $state.go('^.home')
            }
          }, 1000);
        }

        $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
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

        return;

      }


        //else proceed normally
        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;
        $scope.rootUser.updateLocal($scope.user);

        payload = {'university_id': $scope.user.university_id};



        $scope.user.updateAttr('university_id', $scope.user, payload, null, $scope)

        // $scope.success.show(0, 2000, 'Saved!');
          $timeout(function() {
            $scope.loader.hide();
            $ionicViewSwitcher.nextDirection('forward');
            if ($state.current.name === 'root.university-container') {
              $scope.backToStudentEditProfile(true);
            } else {
              $state.go('^.home')
            }
        }, 1000);


    }

    $scope.getLocation = function() {

            var posOptions = {
              timeout: 10000,
              enableHighAccuracy: false, //may cause high errors if true
            }


            $scope.loader.show();
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

                console.log('location found!', position.coords.latitude, position.coords.longitude);


                //case 1 --> user is getting location
                if ($scope.request && $scope.request.position) {

                  $scope.request.position = position.coords;

                  $scope.user.recent_position = position;

                  $scope.user.location_services_enabled = true;


                  payload = {
                    'location_services_enabled': true,
                    'recent_latitude': position.coords.latitude,
                    'recent_longitude': position.coords.longitude
                  }
                  $scope.user.updateAttr('recent_position', $scope.user, payload, null, $scope);

                  if ($scope.locationModal && $scope.locationModal.isShown()) {
                    $scope.auto_choose_first_location = true;

                    console.log('getting address from gps coordinates');

                    $scope.getAddressfromGeolocation(position.coords.latitude, position.coords.longitude);

                    $timeout(function() {
                      $scope.$apply();
                    }, 1000);
                  }

                }

                if ($state.current.name === 'root.onboarding') {
                  $scope.loader.show();

                  var showUniversityListViewNearest = function($scope, $state) {
                    $scope.loader.hide();
                    $scope.view = 2;
                    // $scope.static.universities = $scope.static.nearest_universities;
                  }

                  var nearestUniversityCallback = function() {

                    getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.static.universities, 10, $localstorage, $scope, showUniversityListViewNearest, $state);
                  }


                  // if universities already loaded
                  if ($scope.static && $scope.static.universities && $scope.static.universities.length > 0) {
                    console.log('universities already loaded, grabbing universities');
                    getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.static.universities, 10, $localstorage, $scope, showUniversityListViewNearest, $state);
                  }
                  // if universities not already loaded
                  else {
                    console.log('universities NOT NOT NOT already loaded first university view, grabbing universities');
                    on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation);
                  }

              }

          }, function(error) {
              //show & let them know we couldn't find it
              $scope.loader.hide()
              $scope.user.recent_position = null;
              alert('Sorry! Please check your privacy settings check your GPS signal.');

              var text = document.getElementById('location-input');

                if (text && !text.value && text.value.length === 0) {
                  $timeout(function() {
                    text.focus();
                  }, 1000)
                }
          });

        };


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

    $scope.$on('$ionicView.enter', function() {

      if ($state.current.name === 'root.university-container' && (!$scope.static.nearest_universities || !$scope.static.nearest_universities.length)) {
        $timeout(function() {
          $scope.setFocus();
        }, 1250)
      }

      if ($scope.user.university && $scope.user.university_id) {
        $scope.search_text = $scope.user.university.title;
      }

    });

        //add event listener

    //case 1: if universities do not exist in local storage ... go get them
    //case 2: if user has ios && user has not been prompted... , prompt the display to get access
    //case 3: if coordinates are available && nearest_universities are not displayed..., calculate the nearest gps

  }


])