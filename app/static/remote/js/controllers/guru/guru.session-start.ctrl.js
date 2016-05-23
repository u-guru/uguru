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
  '$ionicHistory',
  '$cordovaActionSheet',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $stateParams,
  Geolocation, $ionicHistory, $cordovaActionSheet, LoadingService) {

    $scope.session = JSON.parse($stateParams.sessionObj);
    $scope.set_timer_mode = false;

    $scope.max_hour = new Array(10);
    $scope.max_minutes = new Array(60);

    $scope.timer = {minutes: $scope.session.minutes, seconds: $scope.session.seconds, hours:$scope.session.hours, active:false};

    $scope.goToSessionMessages = function (session) {
        //Mixpanel Track
        mixpanel.track("Student.messages");
      $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goBack = function() {
      $ionicHistory.goBack()
    }

    function elementInViewport2(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
    }

    $scope.goToGuruProfile = function (guru) {
        //Mixpanel Track
        mixpanel.track("Student.guru.profile");
      $state.go('^.^.student.guru-profile', {guruObj:JSON.stringify(session.student)});
    }

    $scope.goToSessionTimer = function (session) {
        //Mixpanel Track
        mixpanel.track("Student.guru.session");
      $state.go('^.guru-session', {sessionObj:JSON.stringify(session)});
    }


    $scope.startTimer = function() {
      $scope.timer.active = true;
      $scope.addOneSecond();

      $scope.session.start_timer = true;
      $scope.user.updateObj($scope.user, 'sessions', $scope.session, $scope);



      // $scope.timer_seconds.animate(0.5);  // Number from 0.0 to 1.0

    }

    $scope.startTimerFromZero = function () {
      setInterval(function() {
          var second = new Date().getSeconds();
          seconds.animate(second / 60, function() {

          });
      }, 1000);
    }

    var options = {
      title: 'What do you want with this image?',
      buttonLabels: ['Share via Facebook', 'Share via Twitter'],
      addCancelButtonWithLabel: 'Cancel',
      androidEnableCancelButton : true,
      winphoneEnableCancelButton : true,
      addDestructiveButtonWithLabel : 'Delete it'
    };


    document.addEventListener("deviceready", function () {

      $scope.showTimerActionSheet = function() {

        options = {
          title: 'Options',
          buttonLabels: ['Reset', 'Set Timer'],
          addCancelButtonWithLabel: 'Cancel',
          androidEnableCancelButton : true,
          winphoneEnableCancelButton : true
        };


          $cordovaActionSheet.show(options)
          .then(function(btnIndex) {
            var index = btnIndex;
            if (index === 1) {
              $scope.resetTimer()
            } else if (index === 2) {
              $scope.setTimer(59,59,59);
            }
          });
        }
    }, false);

    $scope.startTimerFromX = function (second) {
      $scope.timer_seconds.animate(second / 60, {duration:1000});
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
        $scope.pauseTimer();
        $scope.session.reset_timer = true;
        $scope.startTimerFromX(-1);
        $scope.user.updateObj($scope.user, 'sessions', $scope.session, $scope);

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
          $scope.startTimerFromX($scope.timer.seconds);
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

   $scope.$on('$ionicView.beforeEnter', function(){
    if (!$scope.timer_seconds) {
      $scope.initTimer();
    }
   });

   $scope.$on('$ionicView.loaded', function(){
     if (!$scope.timer_seconds) {
        $scope.initTimer();
      }
   });

   $scope.initTimer = function() {

      $scope.timer_seconds = new ProgressBar.Circle('#timer-container', {
        color: '#FFFFFF',
        strokeWidth: 3.1,
        trailColor:'#A1D5CC'
      });

      $timeout(function(){
        $scope.timer_seconds.animate(1, function() {
          $scope.timer_seconds.set(0.001);
        });
      }, 1000);

   }

    $scope.pauseTimer = function() {
      $scope.timer.active = false;
      $scope.timer_seconds.stop();
    }

    $scope.setTimer = function(seconds, minutes, hours) {
        $scope.timer.hours = hours;
        $scope.timer.minutes = minutes;
        $scope.timer.seconds = seconds;

        $scope.session.update_timer = $scope.timer;
        $scope.user.updateObj($scope.user, 'sessions', $scope.session, $scope);
    }

    $scope.submitTimeToServer = function() {
      //guru start session
        $scope.session.status = 3;
        $scope.session.minutes = $scope.timer.minutes;
        $scope.session.seconds = $scope.timer.seconds;
        $scope.session.hours = $scope.timer.hours;


        var sessionPayload = {session: $scope.session}

        var updateObjCallback = function() {
          $scope.root.vars.check_for_ratings_modal = true;
          LoadingService.hide();
            //Mixpanel Track
          mixpanel.track("Giri.home");
          $state.go('^.guru-home');
        }
        LoadingService.show();
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

