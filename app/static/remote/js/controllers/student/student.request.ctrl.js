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
  '$stateParams',
  '$ionicNavBarDelegate',
  'Geolocation',
  '$ionicPosition',
  '$cordovaDialogs',
  '$cordovaGeolocation',
  '$ionicHistory',
  'CordovaPushWrapper',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $stateParams,
  $ionicNavBarDelegate, Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
  $ionicHistory, CordovaPushWrapper, $ionicPlatform) {
    $scope.isRequestFormComplete = false;
    //TODO: ADD ACTION BAR W / FILE SUPPORT
    //TODO: IF NOT PUSH NOTIFICATIONS, SHOW IT HERE AS PART OF THE FORM

    // $ionicModal.fromTemplateUrl(BASE + 'templates/add-note.modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //     $scope.addRequestNoteModal = modal;
    // });

    // $ionicModal.fromTemplateUrl(BASE + 'templates/student-request-map.modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //     $scope.requestMapModal = modal;
    // });

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

    // $ionicModal.fromTemplateUrl(BASE + 'templates/calendar.modal.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //     $scope.calendarModal = modal;
    // });


    // var checkbox0 = [document.getElementById('iconRecord0')];
    //   var checkbox0_position = $ionicPosition.offset(checkbox0).left
    //   var checkbox1 = [document.getElementById('iconRecord1')];
    //   var checkbox1_position = $ionicPosition.offset(checkbox1).left
    //   var half_box_size = (checkbox1_position - checkbox0_position) / 2 - 10
    //   var from_position = checkbox0_position + half_box_size
    //   var to_position = 0;

    $scope.checkboxClicked = function(index) {

      $scope.time_checkbox = index;
    }

    $scope.toggleVirtualGuru = function() {
      $scope.virtual_guru_checkbox = !$scope.virtual_guru_checkbox;
    }

    $scope.togglePersonGuru = function() {
      $scope.person_guru_checkbox = !$scope.person_guru_checkbox;
      if ($scope.person_guru_checkbox) {
        // $scope.user.position = null;

        // $scope.checkLocationStatus();
        if (!$scope.requestPosition && !$scope.user.current_device.location_enabled) {
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
        in_person: false,
      };
    }

    $scope.calendar = {
          width: 2,
          height: 24,
          num_selected:0
    }

    $scope.saveRequestToUser = function() {
      $scope.request.status = 0;
      $scope.request._file = null;
      $scope.request.online = $scope.root.vars.request.type.online;
      $scope.request.in_person = $scope.root.vars.request.type.in_person;
      $scope.request.time_estimate = (parseInt($scope.root.vars.request._length.hours) * 60) + parseInt($scope.valueToMinutes[$scope.root.vars.request._length.minutes]);
      $scope.request.address = $scope.root.vars.request.location;
      $scope.request.position = $scope.root.vars.request.position;
      $scope.request.calendar = $scope.root.vars.request.calendar;
      $scope.request.calendar_events = $scope.calendar.data;
      $scope.request.course = $scope.root.vars.request.course;
      $scope.request.note = $scope.root.vars.request.description;
      $scope.request.files = $scope.root.vars.request.files;

      console.log($scope.request);

      // if ($scope.calendar && $scope.calendar.num_selected > 0) {
      //   $scope.request.calendar = $scope.calendar;
      //   $scope.request.calendar_events = $scope.calendar.data;
      // }

      // if ($scope.requestPosition) {
      //   $scope.request.position = $scope.user.position.coords;
      // }

      $scope.failureFunction = function($scope) {
        $scope.contactingGuruModal.hide();
      };

      $scope.user.createObj($scope.user, 'requests', $scope.request, $scope, null, $scope.failureFunction);

    }

    var validateRequestForm = function() {
      if (!($scope.root.vars.request.description && $scope.root.vars.request.location && ($scope.root.vars.request.type.in_person || $scope.root.vars.request.type.online) && $scope.root.vars.request._length.hours && $scope.root.vars.request.calendar_selected)) {
        alert('Please fill in all fields');
        return false;
      }
      // old request later
      // if ($scope.calendar.num_selected === 0) {
      //   alert('Please fill in Calendar');
      //   return false;
      // }

      // if (!($scope.virtual_guru_checkbox || $scope.person_guru_checkbox)) {
      //   alert('Please check guru or virtual');
      //   return false;
      // }

      // if (!$scope.request.note) {
      //   alert('Please add a description');
      //   return false;
      // }

      return true;
    }

    $scope.requestHelp = function() {
      if (!$scope.user.id) {
        $scope.signupModal.show();
        console.log('show form they are not signed in yet')
        return;
      }

      if (!validateRequestForm()) {
        console.log('form is not validated')
        return;
      }

      $scope.saveRequestToUser();
      $scope.contactingGuruModal.show();
      $scope.root.vars.request_form_recently_hidden = true;
      $state.go('^.student-home');
      $timeout(function() {
        $scope.contactingGuruModal.hide();
      }, 12000)


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

    $scope.request = $scope.initRequestObj();

    if (!$scope.root.vars.request) {
      $scope.course = JSON.parse($stateParams.courseObj);
      $scope.root.vars.request = {
        type: {
          in_person: true,
          online: true
        },
        _length: {},
        calendar_selected:false,
        course: $scope.course,
        description:null,
        location: null,
        files: []
        }
      }
      else {
        $scope.course = $scope.root.vars.request.course;
    }

    console.log($scope.root.vars.request.description);

    $scope.valueToMinutes = [null, '15', '30', '45'];

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


    $scope.$on('$ionicView.Enter', function(){

      console.log($state.current.name, 'enter');


    });

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.loader.show();
      console.log($state.current.name, 'before enter');

      // if ($scope.platform.mobile) {
      //   $scope.user.current_device = ionic.Platform.device();
      // }

      // if ($scope.platform.mobile && $scope.platform.ios
      //   && $scope.user.current_device && $scope.user.current_device.location_enabled === false) {

      //   console.log('checking notifications');

      //   CordovaPushWrapper.register($scope);

      // }

    });

    $scope.pushToggle = {checked: false};
    $scope.checkPush = function() {
      if ($scope.platform.mobile) {
        $scope.user.current_device = ionic.Platform.device();
        CordovaPushWrapper.register($scope);
      }
      if (!$scope.user.current_device.push_token) {
        $scope.root.dialog.alert('Go to your settings & enable push notifications', 'Please Enable', 'Got it',
          function() {$scope.pushToggle.checked = false;});
      } else {
        $scope.pushToggle.checked = true;
      }
    }

    $scope.$on('$ionicView.afterEnter', function(){
      console.log($state.current.name, 'after enter')
      console.log('device', JSON.stringify($scope.user.current_device));
      $scope.loader.hide();

    });

    $scope.$on('$ionicView.loaded', function(){

    });

  }
]);

