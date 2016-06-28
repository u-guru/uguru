angular.module('uguru.admin')

.controller('AdminDemosController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  '$window',
  'AnimationService',
  'SpecService',
  function($scope, $state, $timeout, $interval, $localstorage, $window, AnimationService, SpecService) {
    var demos = this;
    demos.waveOptions = {delay: 0, total_time: 0, elemDict: {}};
    $timeout(function() {
      demos.svg_arr = new Array(4);
    })


    var timeDict = {};
    var startTime;
    var startElems = 0;
    var endTime;

    function animStartCallback(e) {
        if (!startTime) {
          startTime = new Date().getTime();
        }
        if (e.target.id && !(e.target.id in demos.waveOptions.elemDict)) {
          demos.waveOptions.elemDict[e.target.id] = {start_time: new Date().getTime() - startTime, end_time:null};
          startElems += 1;
        }
    }

    function animEndCallback(e) {
      if (e.target.id in demos.waveOptions.elemDict) {
        demos.waveOptions.elemDict[e.target.id].end_time = new Date().getTime() - startTime;
        demos.animDuration =
        startElems -= 1;
      }
      if (!startElems) {
        var totalTime = new Date().getTime() - startTime;
        demos.waveOptions.total_time = totalTime;
        console.log(totalTime, demos.waveOptions.elemDict);
        $timeout(function() {
          $scope.$apply();
        })

      }
    }

    // $timeout(function() {
    //   var svgParent = document.querySelector('#demos-view');
    //   svgParent.addEventListener( 'webkitAnimationStart', animStartCallback)
    //   svgParent.addEventListener( 'webkitAnimationEnd', animEndCallback)
    // })

    // $timeout(function() {
    //   SpecService.initSpec(demos, $scope, '#demos-view', 'demos', 'admin/templates/demos.html', 'admin/js/AdminDemosController.js', {}, '');
    // })

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