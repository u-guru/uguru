angular.module('uguru.preApp')
.controller('SplashStateTransitionController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var device = this;
    $scope.$watch('splash.state.device', function(newVal, oldVal) {
      if (newVal) {
        var parentViewElement = document.querySelector('#splash-madlib');
        var allActivateElements = parentViewElement.querySelectorAll('[on-activate]');
        for (var i = 0; i < allActivateElements.length; i++) {
          allActivateElements[i].classList.add('activate');
        }
      }
      $timeout(function() {
        $scope.$apply();
      })
    })


    SpecService.initSpec(device, $scope, '#splash-madlib', 'madlib', 'preapp/templates/splash.madlib.html', 'preapp/js/SplashMadlibController.js', {});
  }
])


