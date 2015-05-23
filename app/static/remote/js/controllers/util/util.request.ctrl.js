angular.module('uguru.util.controllers')

.controller('RequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicGesture',
  '$cordovaGeolocation',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation) {

    $scope.course_search_text = '';
    $scope.show_student_courses = false;
    $scope.availability_scroll_init = false;


     $scope.request = {
      location: null,
      course: null,
      attached_files: [],
      description: '',
      time_estimate: {hours: 2, minutes:0},
      urgency: false,
      tags:[],
      availability_edit: false,
      calendar: {
        start_time: {hours: 0, minutes:0},
        end_time: {hours: 0, minutes:0},
        date: {
          day: 1,
          month: 1,
          year: 15
        }
      },
      availability: {hours: 2, minutes:"00"},
    }


    $scope.launchLocationModal = function() {
      !$scope.request.availability_edit || $scope.toggleAvailability();
      $scope.locationModal.show();
    }

    $scope.$on('modal.shown', function() {

      if ($scope.requestModal && $scope.requestModal.isShown()) {
        $timeout(function() {

          var course_input = document.getElementById('course-input')
          course_input.focus();

        }, 500);
      }

    })

    $scope.toggleYourCourses = function() {

      $scope.show_student_courses = !$scope.show_student_courses;
    }

    $scope.launchDescriptionModal = function() {
      !$scope.request.availability_edit || $scope.toggleAvailability();
      $scope.descriptionModal.show();
    }

    $scope.closeDescriptionModal = function() {
      $scope.descriptionModal.hide();
    }

    $scope.toggleAvailability = function() {
      $scope.request.availability_edit = !$scope.request.availability_edit;
      $timeout(function() {
        $scope.initAvailabilityScroll();
      },100);
    }

    $scope.closeLocationModal = function() {
      $scope.locationModal.hide();
    }

    $scope.toggleChanged = function() {
      console.log()
    }

    $scope.clearLocationButton = function() {
      $scope.request.location = null;
      $scope.launchLocationModal();
    }

    $scope.launchAvailabilityModal = function() {
      !$scope.request.availability_edit || $scope.toggleAvailability();
      $scope.availabilityModal.show();
    }

    $scope.launchTagsModal = function() {
      if ($scope.descriptionModal.isShown()) {
        $timeout(function() {
          $scope.closeDescriptionModal();
        }, 1000);
      }
      $scope.tagsModal.show();
    }

    $scope.closeTagsModal = function() {
      $scope.tagsModal.hide();
    }

    $scope.closeAvailabilityModal = function() {
      $scope.availabilityModal.hide();
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/location.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.locationModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/tags.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.tagsModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/availability.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.availabilityModal = modal;
    });

      $ionicModal.fromTemplateUrl(BASE + 'templates/description.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.descriptionModal = modal;
      });

    $scope.resetLocation = function() {
      $scope.request.address = null;
    }

    $scope.new_courses = [
      {'short_name': 'ARC 101', 'title': 'Foundations of Architecture'},
      {'short_name': 'ARC 110', 'title': 'Basics of Architectural Materi..'},
      {'short_name': 'ARC 120', 'title': 'Ancient Architecture..'},
    ];
    $scope.closeRequestModal = function() {
      $scope.requestModal.hide();
    }

    $scope.addSelectedStudentCourse = function(course) {
      document.getElementById('course-input').value = course.short_name;
      $scope.progress = false;
      $scope.request.course = course;
      $scope.show_student_courses = false;
    };

    $scope.addSelectedCourse = function(course, input_text) {
      $scope.course_search_text = course.short_name.toUpperCase();


      //set the local request.course object to this course
      $scope.request.course = course;

      //clear the search input
      input_text = '';

      //set the course text to what it should be
      document.getElementById('course-input').value = course.short_name;
      $scope.course_search_text = course.short_name
      //make progress false so we can hide all other elements
      $scope.progress = false;

      //TODO JASON ADD TEST CASE: check if course is already in their courses


      //add to user local
      $scope.user.student_courses.push(course);

      //JASON ADD TEST CASE: Check if length of student courses is now longer than one

      //if user is already logged in
      console.log('user object snapshot', $scope.user);
      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update user
        $scope.root.vars.remote_cache.push({'add_student_course': course});
      }

    }

    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

    $scope.updateProgress = function(input_text) {
      $scope.progress = input_text.length > 0;
      // var courseInput = document.getElementById('course-input');
      // if (courseInput === document.activeElement) {
      //   $scope.progress = true;
      // } else {
      //   $scope.progress = false;
      // }
    }

    $scope.focusCourseInput = function () {
      var input = document.getElementById('course-input');
      if (input) {
        input.focus();
      }
    }


    $scope.setCourseFocus = function(target) {
        console.log($scope.matchingCourses)
        var courseInput = document.getElementById('course-input');
        if (courseInput !== document.activeElement && !$scope.keyboard_force_off) {
          $scope.progress = false;
          return;
        }

        if ($scope.course_search_text.length === 0 && !$scope.keyboard_force_off) {
          document.getElementsByName("course-input")[0].focus();
        }


        if ($scope.platform && $scope.platform.android) {
          $timeout(function() {
            if (!$cordovaKeyboard.isVisible) {
              $cordovaKeyboard.show();
            }
          }, 500);
        }
      };


        $scope.initAvailabilityScroll = function () {

             function done() {
                var results = SpinningWheel.getSelectedValues();
                alert('values:' + results.values.join(', ') + ' - keys: ' + results.keys.join(', '));
            }

              function cancel() {
                alert('cancelled!');
              }
            $timeout(function() {
              var element = angular.element(document.getElementById("test"));
              $ionicGesture.on('touchend',
                function(){

                  var current_values = $scope.spinning_wheel.getSelectedValues();
                  $scope.request.time_estimate = {hours: current_values.values[0], minutes: current_values.values[2]};
                  console.log($scope.request.time_estimate.hours);
                },
                element, {});
            }, 500);


            if (!$scope.availability_scroll_init) {

                var hours = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4};
                var minutes = { 0: '00', 1: 15, 2: 30, 3: 45};
                  SpinningWheel.addSlot(hours, 'right', "2");
                  SpinningWheel.addSlot({ separator: ':' }, 'readonly shrink');
                  SpinningWheel.addSlot(minutes, 'left');


                  SpinningWheel.setCancelAction(cancel);
                  SpinningWheel.setDoneAction(done);

                  SpinningWheel.open('test');
                  $scope.spinning_wheel = SpinningWheel;

                  $scope.availability_scroll_init = true;

            }

        }
        $scope.nearby_locations = {matches:[]};
        $scope.attemptToGetLocation = function() {
          $scope.getLocation()
        }

        $scope.getLocation = function() {

          var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false, //may cause high errors if true
          }

          $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

              console.log('location found!', position.coords.latitude, position.coords.longitude);

              $scope.user.recent_position = position;
              if ($scope.locationModal.isShown()) {
                $scope.auto_choose_first_location = true;

                var text = document.getElementById('location-input');
                if (text.value && text.value.length > 0) {
                  $scope.queryAutocomplete(text.value);
                } else {
                  $scope.queryAutocomplete('a');
                }


                $timeout(function() {
                  $scope.$apply();
                }, 1000);
              }

          }, function(error) {
              //show & let them know we couldn't find it
              $scope.loader.hide()
              $scope.user.recent_position = null;
              alert('Sorry! Please check your privacy settings check your GPS signal.');
          });

        };

        $scope.service = new google.maps.places.AutocompleteService();

      $scope.queryAutocomplete = function(search_input) {

        var text = search_input;
        if (!search_input || search_input.length === 0) {
            var text = document.getElementById('location-input').value;
            console.log('empty arg passed g-query places');
        }

        if (!text && !search_input) {
          search_input = 'a';
        }

          if (search_input.length > 0) {

            var user_location = $scope.user.recent_position;
            if (!user_location) {
              //set to san francisco
              var user_location = new google.maps.LatLng(37.76999,-122.44696);
            } else {
              console.log('using user gps position');
              var user_location = new google.maps.LatLng(user_location.coords.latitude, user_location.coords.longitude);
            }
            $scope.service.getPlacePredictions({ input: text, location: user_location, radius:5000 }, $scope.autocompleteQuerycallback);
          }
    }

    $scope.autocompleteQuerycallback = function(predictions, status) {
        console.log(status, predictions[0].terms[0].value);
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }

        // var results = document.getElementById('results');
        $scope.nearby_locations.matches = [];
        $scope.root.vars.nearby_locations = [];
        for (var i = 0, prediction; prediction = predictions[i]; i++) {
          //clear the list from before
          // console.log(predictions);
          var payload = {
            'local_name': prediction.terms[0].value,
            'description': prediction.description,
            'terms': prediction.terms
          }

          all_but_first = prediction.terms.splice(1);

          result_str = '';
          for (var j = 0; j < all_but_first.length; j ++) {
            result_str += ' ' + all_but_first[j].value;
          }

          payload.city_info = result_str;
          payload.place_id = prediction.place_id;

          $scope.nearby_locations.matches.push(payload);
          $scope.root.vars.nearby_locations.push(payload);

        }

        if ($scope.auto_choose_first_location) {
          $scope.auto_choose_first_location = false;
          var location = $scope.root.vars.nearby_locations[0];

          $scope.request.address = location.local_name;
          $scope.request.city_info = location.city_info;
          $scope.request.place_id = location.place_id;
          $scope.closeLocationModal();
        }

        $scope.$apply();
      }

      $scope.validateForm = function() {

        if (!$scope.request.course || !$scope.request.course.short_name) {
          $scope.success.show(0, 1250, 'Please enter a course');
          return false;
        }

        if (!$scope.request.address) {
          $scope.success.show(0, 1250, 'Please enter a location');
          return false;
        }

        //if request is urgent and availability is not filled out./
        if (!$scope.request.urgency && !$scope.request.calendar.start_time.hours
          && !$scope.request.calendar.start_time.minutes) {
          $scope.success.show(0, 1250, 'Please fill out your availability');

          return false;
        }

        return true;

      }

      $scope.submitRequest = function() {

        if (!$scope.validateForm()) {
          console.log('Form is not complete')
          return;
        }

        $scope.root.vars.request = $scope.request;
        !$scope.request.availability_edit || $scope.toggleAvailability();
        $scope.launchContactingModal();

        $timeout(function() {
          $scope.closeRequestModal();
          $scope.verbModal.hide();
        }, 2000);

        $timeout(function() {
          $scope.closeContactingModal();
        }, 5000);

      }


  }
])