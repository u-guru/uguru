angular.module('uguru.util.controllers')

.controller('DemosController', [
  '$scope',
  '$state',
  '$timeout',
  'SVGService',
  'LoadingService',
  '$interval',
  '$compile',
  'AnimationService',
  function($scope, $state, $timeout, SVGService, LoadingService, $interval, $compile, AnimationService) {
    $scope.full_animation_string = 'Loading...';
    $scope.buttonText = 'Loading...'
    $scope.$on('$ionicView.loaded', function() {
      var polygon = document.querySelector('polygon');

      //converts polygon into a path
      var path = SVGService.convertPolyToPath(polygon);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#FFFFFF');
      path.setAttribute('stroke-width', '5px');
      polygon.parentNode.replaceChild(path,polygon);

      //redraws
      $timeout(function() {
        $compile(path.parentNode)($scope)
      })

      //prints properties we have access to
      for (property in path) {
        if (property.toLowerCase().split('path').length > 1 || property.toLowerCase().split('length').length > 1) {
          console.log(property);
        }
      }


      //prints all the path
      var totalPathLength = path.getTotalLength()
      console.log(totalPathLength);
      for (var i = 0; i < parseInt(totalPathLength); i++) {
        var point = path.getPointAtLength(i);
        // uncomment when you get here, prints hella shit;
        // console.log(i, point.x, point.y);
      }

      //initialize empty animation object

      $timeout(function() {
        var cxr = 2*circle.r.animVal.value;
        var cssAnimObj = AnimationService.initCSSAnimation('draw-star');
        cssAnimObj.appendRule('0% {transform: translate(' + (startPoint.x - cxr) + 'px, ' + (startPoint.y-cxr) +'px);}', i);
        for (var i = 1; i < 100; i++) {
           var indexPoint = path.getPointAtLength(i/100 *totalPathLength);
           var indexPreviousPoint = path.getPointAtLength(i - 1);
           var translateX = indexPoint.x - cxr;
           var translateY = indexPoint.y - cxr;
           $scope.buttonText = 'Loading ... %' + i;
           $timeout(function() {
            $scope.$apply();
           })
           cssAnimObj.appendRule(i + '% {transform: translate(' + translateX + 'px, ' + translateY +'px);}', i);
        }
        cssAnimObj.appendRule('100% {transform: translate(' + (startPoint.x - cxr) + 'px, ' + (startPoint.y-cxr) +'px);}', i);

        $scope.buttonText = 'Play';
        $scope.full_animation_string = cssAnimObj.name + " 2s linear 0s 1 normal forwards";
        $scope.$apply();
      }, 100);





      //get path details
      var pathCoordInfo = path.getBoundingClientRect();
      console.log('path info:', pathCoordInfo);

      //get the circle & inject into the path svg
      var circle = document.querySelector('svg circle');
      path.parentNode.appendChild(circle);
      //position the circle to be at the start point
      var startPoint = path.getPointAtLength(0);
      //offset from the top left of the svg
      // circle.style.cx = startPoint.x;
      // circle.style.cy = startPoint.y;

      //apply animation


    })

    $scope.playAnimation = function(animation_text) {
      var circle = document.querySelector('svg circle');
      circle.style.animation = animation_text
      circle.style.webkitAnimation = animation_text;
      circle.addEventListener( 'webkitAnimationEnd', animEndCallback)

      function animEndCallback() {
        circle.offsetWidth = circle.offsetWidth;
        circle.style.animation = null;
        circle.style.webkitAnimation = null;
        circle.removeEventListener('webkitAnimationEnd', animEndCallback);
      }
    }

  }

])