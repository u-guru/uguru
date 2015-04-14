angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruSessionStartController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$stateParams',
  'Geolocation',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $stateParams,
  Geolocation) {

    $scope.session = JSON.parse($stateParams.sessionObj);

    $scope.timer = {minutes: $scope.session.minutes, seconds: $scope.session.seconds, hours:$scope.session.hours, active:false};

    $scope.goToSessionMessages = function(session) {
      $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.^.student.guru-profile', {guruObj:JSON.stringify(session.student)});
    }

    $scope.goToSessionTimer = function(session) {
      $state.go('^.guru-session', {sessionObj:JSON.stringify(session)});
    }


    $scope.startTimer = function() {
      $scope.timer.active = true;
      $scope.addOneSecond();
    }

    $scope.incrementMinute = function() {
      $scope.timer.minutes += 1;
    }

    $scope.decrementMinute = function() {
      $scope.timer.minutes -= 1;
    }

    $scope.incrementHour = function() {
      $scope.timer.hours += 1;
    }

    $scope.decrementHour = function() {
      $scope.timer.hours -= 1;
    }

    $scope.resetTimer = function() {
      var successCallback = function() {
        $scope.timer.seconds = 0;
        $scope.timer.hours = 0;
        $scope.timer.minutes = 0;
      }

      var arr_callback = [null, successCallback];

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n You will lose track of all progress')) {
          successCallback();
        }
      } else {
        $scope.root.dialog.confirm('You will lose track of all progress', 'Are you sure?', ['Cancel', 'Yes'], arr_callback);
      }
    }

    $scope.addOneSecond = function() {
      $timeout(function() {


        $scope.timer.seconds += 1;
        $scope.updateTimer();

        if ($scope.timer.active) {
          $scope.addOneSecond();
        }

      },1000)
    }

    $scope.updateTimer = function() {
      if ($scope.timer.seconds > 59) {
        $scope.timer.seconds = 0;
        $scope.timer.minutes += 1;
      }
      if ($scope.timer.minutes > 59) {
        $scope.timer.minutes = 0;
        $scope.timer.hours += 1
      }
    }

    $scope.pauseTimer = function() {
      $scope.timer.active = false;
    }

    $scope.setTimer = function(seconds, minutes, hours) {
        $scope.timer.hours = hours;
        $scope.timer.minutes = minutes;
        $scope.timer.seconds = seconds;
    }

    $scope.submitTimeToServer = function() {
      //guru start session
        $scope.session.status = 3;
        $scope.session.minutes = $scope.timer.minutes;
        $scope.session.seconds = $scope.timer.seconds;
        $scope.session.hours = $scope.timer.hours;


        var sessionPayload = {session: $scope.session}

        var updateObjCallback = function() {
          $state.go('^.home');
        }

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope, updateObjCallback);
    }

    $scope.submitTime = function() {

      var successCallback = function() {
        $scope.submitTimeToServer();
      }

      var arr_callback = [null, successCallback];
      if ($scope.platform.web) {
        if (confirm('Are you sure? \n The student will be billed.')) {
          successCallback();
        }
      } else {
        $scope.root.dialog.confirm('The student will be billed', 'Are you sure?', ['Cancel', 'Yes'], arr_callback);
      }
    }

  }

]);

