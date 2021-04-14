angular.module('uguru.util.controllers')

.controller('TimerAppController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$interval',
  function($scope, $state, $timeout, $localstorage, $interval) {

    var timerOptions = [5, 10, 15, 30, 45, 59];

    $scope.action_items = [ 'Splash Mad-lib', 'All dashboard tools', "Quick n Dirty", 'prep for ben']
    $scope.timer = {hours: 0, minutes:0, seconds:0};
    $scope.timerDropdown = {
      size: 'large',
      label: 'select a time',
      selectedIndex: 0,
      options: generateTimerOptions(timerOptions),
      onOptionClick: startTimer,
      key: 'name'
    }

    function generateTimerOptions(arr_times) {
      var resultArr = []
      for (var i = 0; i < arr_times.length; i++) {
        var indexTimer = arr_times[i];
        resultArr.push({
          minutes: indexTimer,
          hours: 0,
          name: indexTimer + ' minutes'
        })
      }
      return resultArr
    }

    function startTimer(option, index) {

      if (!$scope.timer.paused) {
        initTimer();
      }

      $scope.timer.interval = $interval(function() {

        $scope.timer.seconds--;
        if ($scope.timer.seconds === 0) {
          $scope.timer.minutes--;
          $scope.timer.seconds = 59;
        }
        if (($scope.timer.seconds + '').length == 1) {
          $scope.timer.seconds = '0' + $scope.timer.seconds;
        }
        if (($scope.timer.minutes + '').length == 1) {
          $scope.timer.minutes = '0' + $scope.timer.minutes;
        }
        if (!$scope.timer.seconds && !$scope.timer.minutes && !$scope.timer.hours)  {
          $scope.timer.active = false;
        }
      }, 1000)


      function initTimer() {
        $scope.timer.seconds = 59;
        $scope.timer.active = true;
        $scope.timer.minutes = option.minutes - 1;
        $scope.timer.hours = option.hours;
      }

    }

    function triggerKeyboardListener() {
      var keyTriggers = []
      window.addEventListener('keydown', function(evt) {
        evt = evt || window.event;

          if (evt.keyCode === 32) {
              if (!$scope.timer.paused) {
                $scope.timer.paused = true;
                $interval.cancel($scope.timer.interval);
              }
              else {
                startTimer();
                $timeout(function() {
                  $scope.timer.paused = false;
                }, 100)
              }

          }
      });
    }

    startTimer({minutes: 5});
    triggerKeyboardListener()

  }
])


