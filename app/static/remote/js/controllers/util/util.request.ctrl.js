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
  '$ionicSideMenuDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate) {


      $scope.selectedPriceTable = [0, 1, 2, 5];
      // $scope.selected_price_option = 1;

      $scope.setPriceOption = function(index) {
        // if ($scope.root.vars.request) {
          $scope.request.selected_price_option = index;
          $scope.request.student_price = $scope.selectedPriceTable[index];
          // $scope.root.vars.request.selected_price_option = index;
        // }
      }

    $scope.course_search_text = '';
    $scope.show_student_courses = false;
    $scope.availability_scroll_init = false;

    if (!$scope.root.vars.detailed_verbs_index_clicked) {
      $scope.root.vars.detailed_verbs_index_clicked = 0;
    }




     $scope.request = {
      location: null,
      course: null,
      title: null,
      tags: [],
      description: '',
      time_estimate: {hours: 2, minutes:0},
      urgency: true,
      tags:[],
      files:[],
      position:{latitude:null, longitude:null},
      availability_edit: false,
      calendar_edit:false,
      selected_price_option: null,
      current_price_options: $scope.selectedPriceTable,
      type: {
        session: $scope.root.vars.last_verb_index_clicked === 0,
        question: $scope.root.vars.last_verb_index_clicked === 1,
        task: $scope.root.vars.last_verb_index_clicked === 2,
        value: $scope.root.vars.last_verb_index_clicked
      },
      calendar: {
        weekday: "Today",
        start_time: {hours: 0, minutes:0},
        end_time: {hours: 0, minutes:0},
        formatted_start_time: null,
        formatted_end_time: null,
        date: {
          day: 1,
          month: 1,
          year: 15
        }
      },
      availability: {hours: 2, minutes:"00"},
    }

    var detailed_verbs = ['chores.svg', 'items.svg', 'food.svg', 'skilled_task.svg', 'specific.svg'];
    var detailed_verb_placeholders = ['My laundry + dishes', 'Get bread from safeway', 'I want ice cream', 'Please fix my iPhone', 'Wait this line for me'];

    var verb_arr = [
      //verb 1 --> session
      {
        img: 'session.svg',
        course_placeholder: 'Enter course',
        description_placeholder: "Describe your problem (optional)",
        show_location: true,
        show_urgency: true,
        show_estimate: true,
        show_availability: true,
        show_divider_one: true,
        show_divider_two: true,
        show_tags: true,
        background_class:'standard-bg',
        title: 'Request a Session',
        initial_status: "finding a guru"
      },
      //verb 2 --> question
      {
        img: 'question.svg',
        course_placeholder: 'Enter course',
        description_placeholder: "What's your question? Try to be specific as possible so we can help you find the best answer",
        show_location: false,
        show_urgency: false,
        show_estimate: false,
        show_availability: false,
        show_divider_one: false,
        show_divider_two: false,
        show_description: true,
        show_tags: true,
        background_class:'dark-bg',
        title: 'Ask a Question',
        initial_status: "finding an answer"
      },
      //verb 3 --> general
      {
        img: detailed_verbs[$scope.root.vars.detailed_verbs_index_clicked],
        course_placeholder: detailed_verb_placeholders[$scope.root.vars.detailed_verbs_index_clicked],
        description_placeholder: "Describe your task in more detail",
        show_location: true,
        show_urgency: true,
        show_estimate: true,
        show_availability: true,
        show_divider_one: true,
        show_divider_two: true,
        show_description: true,
        show_tags: true,
        title: 'Request a Task',
        initial_status: "getting help"
      }
    ];

    $scope.request_fields = verb_arr[$scope.root.vars.last_verb_index_clicked];
    $scope.request.fields  = $scope.request_fields;


    $scope.launchLocationModal = function() {
      !$scope.request.availability_edit || $scope.toggleAvailability();
      $scope.locationModal.show();
    }


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



        $timeout(function(){


            $scope.tagsModal.show();

        },250);
      if ($scope.descriptionModal.isShown()) {
        $timeout(function() {
          // document.getElementById("description-input").blur();
          $scope.closeDescriptionModal();
        }, 1000);
      }
    }

    $scope.closeTagsModal = function() {
      $scope.tagsModal.hide();
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/price.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.choosePriceModal = modal;
    });

    $scope.launchChoosePriceModal = function() {
      $scope.choosePriceModal.show();
    }

    $scope.closeChoosePriceModal = function() {
      $scope.choosePriceModal.hide();
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
          animation: 'fade'
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
      $scope.requestModal.remove();
    }

    // $scope.getLocation = function() {

    //         var posOptions = {
    //           timeout: 10000,
    //           enableHighAccuracy: false, //may cause high errors if true
    //         }


    //         $scope.loader.show();
    //         $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

    //             console.log('location found!', position.coords.latitude, position.coords.longitude);

    //             console.log('request', $scope.request.position);
    //             //case 1 --> user is getting location
    //             if ($scope.request && $scope.request.position) {

    //               $scope.request.position = position.coords;

    //               $scope.user.recent_position = position;

    //               $scope.user.location_services_enabled = true;


    //               payload = {
    //                 'location_services_enabled': true,
    //                 'recent_latitude': position.coords.latitude,
    //                 'recent_longitude': position.coords.longitude
    //               }
    //               $scope.user.updateAttr('recent_position', $scope.user, payload, null, $scope);

    //               if ($scope.locationModal && $scope.locationModal.isShown()) {
    //                 $scope.auto_choose_first_location = true;

    //                 console.log('getting address from gps coordinates');

    //                 $scope.getAddressfromGeolocation(position.coords.latitude, position.coords.longitude);

    //                 $timeout(function() {
    //                   $scope.$apply();
    //                 }, 1000);
    //               } else {
    //                 $scope.getAddressfromGeolocation(position.coords.latitude, position.coords.longitude);
    //               }

    //             }

    //             if ($state.current.name === 'root.university') {
    //               $scope.loader.show();

    //               var showUniversityListViewNearest = function($scope, $state) {
    //                 $scope.loader.hide();
    //                 $scope.view = 2;
    //                 $scope.$apply();
    //               }

    //               var nearestUniversityCallback = function() {

    //                 getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.static.universities, 10, $localstorage, $scope, showUniversityListViewNearest, $state);
    //               }


    //               // if universities already loaded
    //               if ($scope.static && $scope.static.universities && $scope.static.universities.length > 0) {
    //                 console.log('universities already loaded, grabbing universities');
    //                 getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.static.universities, 10, $localstorage, $scope, showUniversityListViewNearest, $state);
    //               }
    //               // if universities not already loaded
    //               else {
    //                 console.log('universities NOT NOT NOT already loaded first university view, grabbing universities');
    //                 on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation);
    //               }

    //           }

    //       }, function(error) {
    //           //show & let them know we couldn't find it
    //           $scope.loader.hide()
    //           $scope.user.recent_position = null;
    //           alert('Sorry! Please check your privacy settings check your GPS signal.');

    //           var text = document.getElementById('location-input');
    //             if (!text.value && text.value.length === 0) {
    //               $timeout(function() {
    //                 text.focus();
    //               }, 1000)
    //             }
    //       });

    //     };

    $scope.addSelectedStudentCourse = function(course) {
      document.getElementById('course-input').value = course.short_name;
      $scope.progress = false;
      $scope.request.course = course;
      $scope.show_student_courses = false;
    };

    $scope.addSelectedCourse = function(course, input_text) {

      console.log(course, input_text);
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
      $scope.progress = (input_text.length > 0) && ($scope.root.vars.last_verb_index_clicked === 0 || $scope.root.vars.last_verb_index_clicked === 1);
    }

    $scope.focusCourseInput = function () {
      var input = document.getElementById('course-input');
      if (input) {
        input.focus();
      }
    }

    $scope.tagsInputFocus = function() {

      var input = document.getElementById('tags-input');
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

        $scope.getAddressfromGeolocation = function(lat, lng) {
          geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(lat, lng);
          geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                var formatted_address = results[1].formatted_address;
                $scope.request.position = {longitude: lng, latitude: lat};
                $scope.request.address = formatted_address.split(',').splice(0, 1).join(", ").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
                $scope.request.city_info = formatted_address.split(',').splice(1, formatted_address.split(',').length).join(", ").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
                $scope.request.place_id = results.place_id;
                if ($scope.locationModal.isShown()) {
                  $scope.closeLocationModal();
                }

                $timeout(function() {
                  $scope.loader.hide();
                }, 1000);
              }
            }
          });
        }

        $scope.getLocation = function() {

          var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false, //may cause high errors if true
          }


          if (!$scope.requestModalOnlyShown()) {
            $scope.loader.show();
          }


          $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

              console.log('location found!', position.coords.latitude, position.coords.longitude);

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
              } else {
                $scope.getAddressfromGeolocation(position.coords.latitude, position.coords.longitude);
              }

          }, function(error) {
              //show & let them know we couldn't find it
              $scope.loader.hide()
              $scope.user.recent_position = null;
              alert('Sorry! Please check your privacy settings check your GPS signal.');

              var text = document.getElementById('location-input');
                if (!text.value && text.value.length === 0) {
                  $timeout(function() {
                    text.focus();
                  }, 1000)
                }
          });

        };

        $scope.service = new google.maps.places.AutocompleteService();



      $timeout(function() {

        $scope.validateFormVanilla = function() {
          if ($scope.root.vars.last_verb_index_clicked === 1) {
            result =  ($scope.request.course && $scope.request.course.short_name) && ($scope.request.description.length > 0);
            return result;
          } else {
            course_input_value = document.getElementById('course-input').value;
            result = (($scope.request.course && $scope.request.course.short_name) || (course_input_value.length > 0)) && ($scope.request.address && $scope.request.address.length > 0);
            return result;
          }
          return false;
        }

      }, 500)

      $scope.validateForm = function() {
        course_input_value = document.getElementById('course-input').value;
        result = (($scope.request.course && $scope.request.course.short_name) || (course_input_value.length > 0));
        if (!result && $scope.root.vars.last_verb_index_clicked !== 1) {
          //if is a task
          if ($scope.root.vars.last_verb_index_clicked === 2) {
            $scope.success.show(0, 1250, 'Please enter a task title');
          } else {
            $scope.success.show(0, 1250, 'Please enter a course');
          }

          return false;
        }

        if  ($scope.root.vars.last_verb_index_clicked !== 1 && (!$scope.request.address || $scope.request.address.length === 0)) {
            $scope.success.show(0, 1250, 'Please enter a location');
            return false;
        }

        //is a question
        if ($scope.root.vars.last_verb_index_clicked === 1) {

          if (!$scope.request.description) {
            $scope.success.show(0, 1250, 'Please enter a question');
              return false;
          }

        }

        //is a session or a task
        else {

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

        }

        return true;

      }


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
              $scope.request.position = {longitude: -122.44696, latitude: 37.76999};
            } else {
              console.log('using user gps position');
              $scope.request.position = {longitude: user_location.coords.longitude, latitude: user_location.coords.latitude};
              var user_location = new google.maps.LatLng(user_location.coords.latitude, user_location.coords.longitude);
            }
            $scope.service.getPlacePredictions({ input: text, location: user_location, radius:5000 }, $scope.autocompleteQuerycallback);
          }
    }

    $scope.showSidebar = function() {

      $ionicSideMenuDelegate.toggleRight();

    }


    //each time key is pressed for the input, this function is called
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

      $scope.submitRequest = function() {

        if (!$scope.validateForm()) {
          console.log('Form is not complete')
          return;
        }

        console.log('location', $scope.request.position.latitude);
        if ((!$scope.request.selected_price_option && $scope.request.selected_price_option !== 0) && $scope.root.vars.last_verb_index_clicked > 0) {
          console.log('launching choose price modal');
          $scope.root.vars.price_modal_shown = true;
          $scope.root.vars.show_price_fields = false;
          $scope.launchChoosePriceModal();
          return;
        }

        if ($scope.request.type.task) {
          var course_input = document.getElementById('course-input');
          $scope.request.task_title = course_input.value;
        }

        $scope.root.vars.request = $scope.request;


        if (!$scope.user.id) {
          $scope.root.vars.pending_request = true;
          $scope.loader.show();
          // $scope.success.show(0, 1500, 'Please create an account first');
          $state.go('^.signup')

          $timeout(function() {
            $scope.loader.hide();
          }, 600)


          $timeout(function() {
              $scope.closeRequestModal();
              $scope.closeChoosePriceModal();
              $scope.verbModal.hide();
              $scope.root.vars.show_account_fields = true;
          }, 1000);
          return;
        }
         else {
          !$scope.request.availability_edit || $scope.toggleAvailability();

          console.log('submitting request');
            $scope.launchContactingModal();

            var callbackSuccess = function($scope, $state) {

              $timeout(function() {
              $scope.closeRequestModal();
              $scope.verbModal.hide();

              if ($scope.choosePriceModal) {;
                  $scope.closeChoosePriceModal()
                }
              }, 500);

              $timeout(function() {
                $scope.closeContactingModal();
                console.log('saved request', $scope.root.vars.request)
              }, 4000);

            };

            $timeout(function() {

                if ($scope.contactingModal.isShown()) {



                  $scope.closeContactingModal();
                  $scope.success.show(0, 5000, 'Oops... Sorry something went wrong, please try again, or contact support!');


                }

              }, 10000);

            $scope.user.createObj($scope.user, 'requests', $scope.request, $scope, callbackSuccess);

         }


      }

      $scope.requestModalOnlyShown = function() {
        return (($scope.locationModal && !$scope.locationModal.isShown()) && !$scope.tagsModal.isShown() && !$scope.availabilityModal.isShown()
          && !$scope.descriptionModal.isShown())
      }


      $scope.$on('modal.shown', function() {
        //if request modal and no other modal is shown..
         $timeout(function() {

          if ($scope.requestModal && $scope.requestModal.isShown() && $scope.requestModalOnlyShown()) {
            if ($scope.user.location_services_enabled) {
              $scope.getLocation();
            }

          }

         })

        //put focus on course input & show keyboard if empty
        $timeout(function() {

          var course_input = document.getElementById('course-input');


            $timeout(function() {

              if ($scope.requestModal && $scope.requestModal.isShown()
                  && !course_input.value && course_input.value.length === 0 && !$scope.locationModal.isShown()
                  && !$scope.tagsModal.isShown() && !$scope.availabilityModal.isShown()
                  && !$scope.descriptionModal.isShown()) {
                    course_input.focus();

                  }

            }, 1000);

        }, 500)

      })


  }
])