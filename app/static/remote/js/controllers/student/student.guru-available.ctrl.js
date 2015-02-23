angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruAvailableController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$stateParams',
  '$cordovaDialogs',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, $stateParams, $cordovaDialogs) {

    $scope.request = JSON.parse($stateParams.requestObj);
    $scope.guru = $scope.request.guru;

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function() {
      $state.go('^.guru-profile', {guruObj:JSON.stringify($scope.guru)});
    }

    $scope.acceptGuru = function() {
      // if ($scope.user.cards.length === 0) {
      //   $state.go('^.add-payment');
      //   return;
      // }

      var acceptGuruCallback = function() {

        $scope.request.guru_id = $scope.guru.id;

        console.log('print request request before submitting');
        console.log($scope.request)

        var callbackSuccess = function($scope, processed_user) {
            $scope.user.active_student_sessions = processed_user.active_student_sessions;
            $scope.user.active_requests = processed_user.active_requests;
            $scope.user.incoming_requests = processed_user.incoming_requests;
            $state.go('^.home')
        }

        $scope.user.createObj($scope.user, 'sessions', $scope.request, $scope, callbackSuccess);


      }


      dialog_title = "Accept this Student";
      dialog_message = "You will not be billed until the end of the session & 100% satisfaction guaranteed";
      button_arr = ['Not ready', 'Yes'];
      $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, acceptGuruCallback])


      // $scope.user.sessions = [];
      // $scope.user.active_sessions = [];
      // $scope.user.sessions.push(session);
      // $scope.user.active_sessions.push(session);
      // $scope.rootUser.updateLocal($scope.user);
      // $state.go('^.home');

    }

    $scope.guruRejectConfirmDialog = function() {
        var rejectGuruCallback = function() {
          requestObj = $scope.request;
          requestObj.status = 3;

          var updateObjRequestGuruCallback = function($scope, processed_user) {
            $scope.user.active_requests = processed_user.active_requests;
            $scope.user.incoming_requests = processed_user.incoming_requests;
            console.log($scope.user);
          }

          $scope.user.updateObj($scope.user, 'requests', requestObj, $scope, updateObjRequestGuruCallback);


        }


          dialog_title = "Are you sure?";
          dialog_message = "You may not hear from this Guru again for this request";
          button_arr = ['Cancel', 'Sure'];
          $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, rejectGuruCallback])
    }

    $scope.rejectGuru = function() {

      $scope.guruRejectConfirmDialog();
       //update back to processing gurus
      // $state.go('^.home');
    }

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

  }

]);
