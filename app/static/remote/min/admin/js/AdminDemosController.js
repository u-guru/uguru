angular.module('uguru.admin')

.controller('AdminDemosController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  '$window',
  'AnimationService',
  function($scope, $state, $timeout, $interval, $localstorage, $window, AnimationService) {
    var demos = this;


    var timeDict = {};

    $timeout(function() {
      var svgParent = document.querySelector('#svg-parent');
      svgParent.addEventListener( 'webkitAnimationStart', animStartCallback)
      function animStartCallback(e) {
        e.target.addEventListener('animationiteration', animIterationCallback);
      }
    })

    function animIterationCallback(e) {
      console.log(e);
    }

    demos.removeAnimation = function($event, animation_str) {
      // var p = $interval(function() {
      //     console.log(window.getComputedStyle($event.target).animation);
      // }, 100)
      // $timeout(function() {
      //   $event.target.classList.remove(animation_str);
      //   $interval.cancel(p);
      // }, 3200)
    }

  }

])