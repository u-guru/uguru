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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory) {

    $scope.requestObj = JSON.parse($stateParams.requestObj);

    $scope.request = $scope.requestObj;
    $scope.course = $scope.requestObj.course;
    $scope.progress_active = false;

    console.log('request status', $scope.requestObj);
    $scope.goBack = function() {
      // $state.go
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru)});
    }

    $scope.convertTimeEstimate = function(time_int) {
      var time_options = ['30 minutes', '1 Hour', '1.5 hours', '2+ hours'];
      return time_options[time_int];
    }

    $scope.acceptGuru = function() {
      if ($scope.user.cards.length === 0) {
        $state.go('^.add-payment');
        return;
      }

      var acceptGuruCallback = function() {

        $scope.request.guru_id = $scope.request.guru.id;
        $scope.request.status = 1;

        var callbackSuccess = function() {
            $ionicHistory.goBack();
        }

        $scope.user.createObj($scope.user, 'sessions', $scope.request, $scope, callbackSuccess);

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
    //   } else {

    //     console.log('Show success cannot be shown because progress bar is already active');
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
      alert(cancelMsg)
      // $scope.showSuccess(cancelMsg);
      $timeout(function() {
        $state.go('^.student-home');
      }, 1000);
    }

  }


])