
angular.module('uguru.onboarding.controllers')
.controller('OnboardingLoadingController', [
    '$scope',
    '$state',
    '$timeout',
    '$localstorage',
    'Geolocation',
    '$ionicPosition',
    '$cordovaDialogs',
    '$cordovaGeolocation',
    '$ionicPlatform',
    '$cordovaSplashscreen',
    '$cordovaStatusbar',
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar, $rootScope) {


    if ($scope.user.university_id && $scope.user.guru_mode) {
    //mixpanel track
    mixpanel.track("Guru.home");
      $state.go('^.guru-home')
      return;
    } else if ($scope.user.university_id && !$scope.user.guru_mode) {
        //mixpanel track
        mixpanel.track("Student.home");
      $state.go('^.student-home');
      return;
    }


    $scope.intervals = 10;
    $scope.time_length = 700;
    $scope.root.vars.onboarding = true;
    $scope.extra_delay = 3500;
    $scope.img_components = [];
    var typewriterStringOne = "<p id='typewriter-1' class='typewriter-text'>College is known to be the <br><b>BEST 4 years of your life</b>.</p>"
    var typewriterStringTwo = "<p id='typewriter-2' class='typewriter-text'>Let Uguru help you stay on top of your academic life.</p>"

    $scope.startIntervals = function(intervals, time_length, targets, $timeout) {
      for (var i = 0; i < intervals; i++) {
        showTargetComponentAtIndex(targets[i], i, time_length * (i + 1), $timeout)
        $scope.typerwriter(typewriterStringOne);
      }
    }

    $timeout(function() {

        var img_targets = getComponents();


        $scope.startIntervals($scope.intervals, $scope.time_length, img_targets, $timeout);

        //automatically
        $timeout(function() {
          if ($scope.user.university_id) {
            //mixpanel track
            mixpanel.track("Student.home");
            $state.go('^.student-home');
        } else {
            //mixpanel track
            mixpanel.track("Onboarding.location");
            $state.go('^.onboarding-location');
          }
        }, ($scope.intervals * $scope.time_length + 1000))

    }, 1000);

    $scope.typerwriter = function(str) {
      var str = str,
          i = 0,
          isTag,
          text;

      (function type() {
          text = str.slice(0, ++i);
          if (text === str)  {
            if (!$scope.runSecondScript) {
              $scope.runSecondScript = true;
              $timeout(function() {
                $scope.typerwriter(typewriterStringTwo);
              }, 1500);
            }
            return;
          }

          document.getElementById('typewriter').innerHTML = text;

          var char = text.slice(-1);
          if( char === '<' ) isTag = true;
          if( char === '>' ) isTag = false;

          if (isTag) return type();
          setTimeout(type, 30);
      }());
    }

}]);

var showTargetComponentAtIndex = function (target, index, delay, $timeout) {
    $timeout(function() {
      target.style.display = 'block';
    }, delay);
}

var getComponents = function() {
  return document.getElementsByClassName('component');
}