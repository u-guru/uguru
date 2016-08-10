angular.module('uguru.student.controllers')

.controller('RequestStatusController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  '$ionicViewSwitcher',
  '$cordovaStatusbar',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, $ionicViewSwitcher, $cordovaStatusbar, LoadingService) {




      $scope.requestObj = JSON.parse($stateParams.requestObj);

      $scope.request = $scope.requestObj;

      if ($scope.request.files && $scope.request.files.length > 0) {
        $ionicModal.fromTemplateUrl(BASE + 'templates/view-files.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.viewFilesModal = modal;
        });
      }

      $scope.course = $scope.requestObj.course;
      $scope.progress_active = false;

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var date = new Date($scope.request.time_created);
      $scope.formatted_time_created = days[date.getDay()] + ", " + months[date.getMonth()] + ' ' + date.getDate();
      $scope.formatted_time_estimated_hours = Math.round(($scope.request.time_estimate / 60), 2);

      if ($scope.request.online && $scope.request.in_person) {
        $scope.formatted_request_type = 'In-person and online';
      } else if ($scope.request.online) {
        $scope.formatted_request_type = 'Online only';
      } else if ($scope.request.in_person) {
        $scope.formatted_request_type = 'In-person only';
      }

      if ($scope.root.vars.request_status_callback) {
        $timeout(function() {
          $scope.success.show(0, 5000, 'You already have a request for this class. Please cancel before you make a new one.');
        }, 2000)
        // $scope.root.vars.request_status_callback();
      }

    $scope.$on('modal.shown', function() {

        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
    });

    $scope.$on('modal.hidden', function() {

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });


    $scope.goBack = function() {
      $ionicViewSwitcher.nextDirection('back');
      $scope.root.vars.select_bottom_one = true;
        //mixpanel track
      mixpanel.track("Student.home");
      $state.go('^.student-home');
    }

    $scope.openAttachment = function(file_url) {
      var result = window.open(file_url, '_system', 'location=yes');
      return false;
    }

    $scope.goToGuruProfile = function (guru) {
        //mixpanel track
        mixpanel.track("Student.guru.profile");
      $state.go('^.student-guru-profile', {guruObj:JSON.stringify(guru)});
    }

    $scope.goToStudentCalendar = function () {
        $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
        //mixpanel track
        mixpanel.track("Request.calendar");
      $state.go('^.request-calendar', {proposalObj:JSON.stringify($scope.request)});
    }

    $scope.createGoogleLatLng = function(latCoord, longCoord) {
      return new google.maps.LatLng(latCoord, longCoord);
    }

    $scope.convertTimeEstimate = function(time_int) {
      var time_options = ['30 minutes', '1 Hour', '1.5 hours', '2+ hours'];
      return time_options[time_int];
    }

    // $scope.parseJSTime = function(time_str) {
    //   if (!$scope.formatted_time_created) {
    //     date = new Date(time_str);
    //     $scope.formatted_time_created =
    //   }
    //   return
    // }

    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.acceptGuru = function() {
        if ($scope.user.cards.length === 0) {
            //mixpanel track
            mixpanel.track("Add.payment");
            $scope.root.vars.request_payment = true;
        $state.go('^.add-payment');
        return;
      }


      var acceptGuruCallback = function() {

        $scope.request.guru_id = $scope.request.guru.id;
        $scope.request.status = 1;
        LoadingService.show();
        $scope.user.createObj($scope.user, 'sessions', $scope.request, $scope, null);


        $scope.request.guru_id = $scope.request.guru.id;
        $scope.request.status = 2;
        LoadingService.show();
        $scope.root.vars.select_bottom_one = true;
        $state.go('^.student-home');

      }

      //remove request from array
      dialog_title = "Accept this Guru";
      dialog_message = "You will not be billed until the end of the session & 100% satisfaction guaranteed";
      button_arr = ['Not ready', 'Yes'];

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog_message)) {
            acceptGuruCallback();
        }

      } else {
            $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, acceptGuruCallback])
      }

      $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.request.id);
    }

    $scope.guruRejectConfirmDialog = function() {
        var rejectGuruCallback = function() {
          requestObj = $scope.request;
          requestObj.status = 3;

          //remove request from array
          $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.request.id);

          $scope.root.util.updateObjectByKey($scope.user.requests, 'id', $scope.request.id, 'status', 0);

          $scope.user.updateObj($scope.user, 'requests', requestObj, $scope);
          $scope.show.success(0, 2000, 'Guru successfully rejected');
        }


          dialog_title = "Are you sure?";
          dialog_message = "You may not hear from this Guru again for this request";
          button_arr = ['Cancel', 'Sure'];
          if ($scope.platform.web) {
            if (confirm('Are you sure? \n' + dialog_message)) {
              rejectGuruCallback();
            }
          } else {
            $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, rejectGuruCallback])
          }

    }

    $scope.rejectGuru = function() {

      $scope.guruRejectConfirmDialog();
       //update back to processing gurus
      // $state.go('^.home');
    }

    // $scope.showSuccess = function(msg) {
    //   if (!$scope.progress_active)  {
    //       $scope.progress_active = true;
    //       $cordovaProgress.showSuccess(true, msg)
    //       $timeout(function() {
    //         $cordovaProgress.hide();
    //         $scope.progress_active = false;
    //       }, 2000);
    //   }
    // }
    $scope.removeRequestFromActive = function(request) {
      var active_requests = $scope.user.active_requests;
      for (var i = 0; i < active_requests.length ; i++) {
        var index_request = active_requests[i];
        if (index_request.id === request.id) {
          $scope.user.active_requests.splice(i, i+1);
        }
      }
    }

    $scope.updateUserRequest = function(request) {
      var user_requests = $scope.user.requests;
      for (var i = 0; i < user_requests.length ; i++) {
        var index_request = user_requests[i];
        if (index_request.id === request.id) {
          $scope.user.requests[i].status = 3;
        }
      }
    }

    $scope.cancelRequest = function() {

      // var student_course = $scope.root.util.objectFindByKey($scope.user.student_courses, 'short_name', $scope.course.short_name);
      // var student_request = $scope.root.util.objectFindByKey($scope.user.requests, 'time_created', $scope.course.active_request.time_created);

      $scope.requestObj.status = 4;
      $scope.user.updateObj($scope.user, 'requests', $scope.requestObj, $scope);

      var cancelMsg = $scope.course.short_name + ' request canceled';
      $scope.success.show(0, 2000, cancelMsg);
      // $scope.showSuccess(cancelMsg);
      $scope.root.util.removeObjectByKey($scope.user.active_requests, 'id', $scope.request.id);
      $timeout(function () {
          //mixpanel track
          mixpanel.track("Student.home");
        $state.go('^.student-home');
      }, 1000);
    }



    $scope.showGoogleMap = function() {

      if (!$scope.request.position || !$scope.request.position.latitude || !$scope.request.position.longitude) {
        return;
      }

      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
      $scope.options = {scrollwheel: false};

      var mapContainer = document.getElementById("map_canvas");
      var initMapCoords;


      initMapCoords = $scope.createGoogleLatLng(parseFloat($scope.request.position.latitude),parseFloat($scope.request.position.longitude))
      var mapOptions = {
        center: initMapCoords,
        zoom: 17,
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        // zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
      }
      actual_map = new google.maps.Map(
              mapContainer,
              mapOptions
      )

      $scope.marker = new google.maps.Marker({
            position: initMapCoords,
            map: actual_map
      });

      $scope.actual_map = actual_map
    }

    $scope.map_loaded = false;


    // $scope.$on('$ionicView.beforeEnter', function() {
    //   LoadingService.show();
    // });

    // $scope.$on('$ionicView.enter', function() {


    $scope.$on('$ionicView.enter', function(){
      LoadingService.show();
      $timeout(function() {
        $scope.showGoogleMap();
        LoadingService.hide();
      }, 1000);
    });


    // });

    // $scope.$on('$ionicView.afterEnter', function() {
    //   $scope.showGoogleMap();
    //   if (!$scope.loadMapDelayedCalled) {
    //     $scope.loadMapDelayed();
    //     $scope.loadMapDelayedCalled = true;
    //   }
    // });

    // $scope.$on('$ionicView.loaded', function() {


    //   $scope.requestObj = JSON.parse($stateParams.requestObj);

    //   $scope.request = $scope.requestObj;


    //   $scope.course = $scope.requestObj.course;

    //   $scope.showGoogleMap();
    //   if (!$scope.loadMapDelayedCalled) {
    //     $scope.loadMapDelayed();
    //     $scope.loadMapDelayedCalled = true;
    //   }
    // });

    $scope.loadMapDelayed = function () {

      $timeout(function() {

            if (document.getElementsByClassName('gm-style').length === 0) {
              $scope.showGoogleMap();
              LoadingService.hide();
            }
          }, 500);

        $timeout(function() {
            if (document.getElementsByClassName('gm-style').length === 0) {
              $scope.showGoogleMap();
              LoadingService.hide();
            }
          }, 1000);


          $timeout(function() {
            if (document.getElementsByClassName('gm-style').length === 0) {
              $scope.showGoogleMap();
              LoadingService.hide();
            }
          }, 1500);
    }

  }



])