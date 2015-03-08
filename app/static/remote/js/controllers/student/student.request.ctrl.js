angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  '$ionicNavBarDelegate',
  'Geolocation',
  '$ionicPosition',
  '$cordovaDialogs',
  '$cordovaGeolocation',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams,
  $ionicNavBarDelegate, Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation, $ionicHistory) {

    $ionicModal.fromTemplateUrl(BASE + 'templates/add-note.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addRequestNoteModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/student-request-map.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.requestMapModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/contact-guru.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.contactingGuruModal = modal;
    });

    // var checkbox0 = [document.getElementById('iconRecord0')];
    //   var checkbox0_position = $ionicPosition.offset(checkbox0).left
    //   var checkbox1 = [document.getElementById('iconRecord1')];
    //   var checkbox1_position = $ionicPosition.offset(checkbox1).left
    //   var half_box_size = (checkbox1_position - checkbox0_position) / 2 - 10
    //   var from_position = checkbox0_position + half_box_size
    //   var to_position = 0;

    $scope.checkboxClicked = function(index) {

      $scope.time_checkbox = index;

      // var iconRecord = "iconRecord" + index;
      // var checkbox_num = [document.getElementById(iconRecord)];
      // var checkbox_position = $ionicPosition.offset(checkbox_num).left;
      // var to = half_box_size + checkbox_position
      // to_position = to;

      // animateMe();

      // function animateRight(obj, from, to){
      //   if(from >= to){
      //     obj.style.visibility = 'display';
      //     return;
      //   }
      //   else {
      //     var box = obj;
      //     box.style.left = from + "px";
      //     setTimeout(function(){
      //         animateRight(obj, from + 2, to);
      //     }, 1)
      //   }
      // }

      // function animateLeft(obj, from, to){
      //   if(from <= to){
      //     obj.style.visibility = 'display';
      //     return;
      //   }
      //   else {
      //     var box = obj;
      //     box.style.left = from + "px";
      //     setTimeout(function(){
      //         animateLeft(obj, from - 2, to);
      //     }, 1)
      //   }
      // }

      // function animateMe() {

      //   if(to_position > from_position) {
      //     animateRight(document.getElementById('iconChecked'), from_position, to_position);
      //   }
      //   else {
      //     animateLeft(document.getElementById('iconChecked'), from_position, to_position);
      //   }
      // }
      // from_position = to_position;
    }

    $scope.toggleVirtualGuru = function() {
      $scope.virtual_guru_checkbox = !$scope.virtual_guru_checkbox;
    }

    $scope.togglePersonGuru = function() {
      $scope.person_guru_checkbox = !$scope.person_guru_checkbox;
      if ($scope.person_guru_checkbox) {
        // $scope.user.position = null;

        $scope.checkLocationStatus();

        if (!$scope.requestPosition) {
          //get location & fire the modal
          Geolocation.getUserPosition($scope, $scope.showRequestMapModal);
        }
        //user already has provided access to their location
        else {
          $scope.requestMapModal.show();
        }
      }
    }

    $scope.checkLocationStatus = function() {

      console.log('current location status is..', $scope.location_error);
      if ($scope.location_error === 'turned-off') {
        console.log('skipping status check upon user request...');
        return;
      } else {

      }
      var posOptions = {
          timeout: 10000,
          enableHighAccuracy: false, //may cause high errors if true
      };

      console.log('checking status of user location services...')

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.location_error = null;
          console.log('user has it turned on');

        }, function(err) {
          if (err.code === 1) {
            $scope.location_error = 'denied';
            console.log('user has denied...');
          }
          if (err.code === 2) {
            $scope.location_error = 'unavailable';
            console.log('it is unavailable...');
          }
          if (err.code === 3) {
            console.log('it is unavailable...');
            $scope.location_error = 'timeout';
          }
      });
    }


    $scope.showComingSoonProgress = function(position, callback) {
      $cordovaProgress.showText(false, "Coming Soon! Stay Tuned", position);
        $timeout(function() {
          $cordovaProgress.hide();
          if (callback) {
            callback();
          }
        }, 1000)
    }

    $scope.showRequestMapModal = function() {
      $scope.requestMapModal.show();
    }

    $scope.goBackFromRequestsToHome = function() {
      $ionicHistory.goBack();
    };

    $scope.initRequestObj = function() {
      var date = new Date();
      date = date.getTime();
      return {
        position: null,
        photo:null,
        status: 0,
        proposals: null,
        time_estimate: 0,
        note: null,
        time_created: date,
        location:null,
        course: $scope.course,
        online: true,
        in_person: false
      };
    }

    $scope.saveRequestToUser = function() {
      $scope.request.status = 0;
      $scope.request._file = null;
      $scope.request.online = $scope.virtual_guru_checkbox;
      $scope.request.in_person = $scope.person_guru_checkbox;
      $scope.request.time_estimate = $scope.time_checkbox;
      $scope.request.address = $scope.request.location;
      if ($scope.requestPosition) {
        $scope.request.position = $scope.user.position.coords;
      }

      $scope.user.createObj($scope.user, 'requests', $scope.request, $scope);

      // var user_course = $scope.root.util.objectFindByKey($scope.user.student_courses, 'short_name', $scope.course.short_name);
      // if (!user_course.requests) {
      //   user_course.requests = [];
      // }
      // var user_course_request = $scope.root.util.objectFindByKey(user_course.requests, 'time_created', $scope.request.time_created);
      // if (!user_course_request) {
      //   console.log('new request!')
      //   user_course.requests.push($scope.request);
      //   user_course.active_request = $scope.request;
      // } else {
      //   user_course_request = $scope.request;
      //   console.log($scope.user.student_courses);
      // }

    }

    var validateRequestForm = function() {
      return true;
    }

    $scope.requestHelp = function() {


      if (!$scope.user.id) {
        $scope.signupModal.show();
        return;
      }

      if (!validateRequestForm()) {
        console.log('form has errors');
      }

      $scope.saveRequestToUser();
      $scope.contactingGuruModal.show();
      $timeout(function() {

        $state.go('^.home');
        $timeout(function() {
          $scope.contactingGuruModal.hide();
        }, 5000);

      }, 250);

      //are push notifications enabled?

      //validate the form?
    }

    $scope.showDialog = function(msg, title, button_name, callback) {
      $cordovaDialogs.alert(msg, title, button_name).then(function() {
        if (callback) {
          callback();
        }
      });
    }
    $scope.toggleLocationService = function() {
      if (!$scope.location_error) {
        $scope.location_error = 'turned-off';
      } else {
        var location_error =  $scope.location_error;
        if (location_error == 'denied') {
          var callbackSuccess = function() {
            $scope.requestMapModal.hide()
          }
          $scope.showDialog('Please go to privacy settings, turn on location services for Uguru, and try again', 'Location Error', 'OK', callbackSuccess);
        } else if (location_error == 'unavailable') {
          $scope.showDialog('Sorry, GPS is currently unavailable for your phone at the moment. Please try again later', 'Location Error', 'OK');
        } else if (location_error == 'timeout') {
          $scope.showDialog('Sorry, GPS is currently unavailable for your phone at the moment. Please try again later', 'Location Error', 'OK');
        } else {
          Geolocation.getUserPosition($scope, $scope.showRequestMapModal);
          $scope.location_error = null;
        }
      }
    }

    $scope.time_checkbox = 0;
    $scope.location_error = null;
    $scope.virtual_guru_checkbox = true;
    $scope.person_guru_checkbox = false;
    $scope.requestPosition = null;
    $scope.course = JSON.parse($stateParams.courseObj);
    $scope.request = $scope.initRequestObj();

    //modal stuff
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
    $scope.options = {scrollwheel: false};

    $scope.searchbox =  {
        template: BASE + 'templates/searchbox.tpl.html',
        options: {
          autocomplete:true,
          types: ['(cities)'],
          componentRestrictions: {country: 'us'}
        },
        events: {
        place_changed: function (autocomplete){
            place = autocomplete.getPlace()
          }
        }
    }

  }
]);

