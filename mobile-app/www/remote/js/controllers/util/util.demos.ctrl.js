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
      path.setAttribute('id', 'demo-trace');
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

      // $timeout(function() {
      //   var shapeOffset = SVGService.getShapeWidthHeight(rect).width/2;

      //   var cssAnimObj = SVGService.generateCSSObjFromPath('draw-point', path, shapeOffset)


      //   $scope.buttonText = 'Play';
      //   $scope.full_animation_string =
      //   $scope.$apply();
      // }, 100);





      //get path details
      // var pathCoordInfo = path.getBoundingClientRect();
      // console.log('path info:', pathCoordInfo);

      // //get the rect & inject into the path svg
      // var rect = document.querySelector('svg rect');
      // path.parentNode.appendChild(rect);
      // //position the rect to be at the start point
      // var startPoint = path.getPointAtLength(0);
      //offset from the top left of the svg
      // rect.style.cx = startPoint.x;
      // rect.style.cy = startPoint.y;

      //apply animation


    })

    $scope.playAnimation = function(animation_text) {
      var rect = document.querySelector('svg rect');
      rect.style.animation = animation_text
      rect.style.webkitAnimation = animation_text;
      rect.addEventListener( 'webkitAnimationEnd', animEndCallback)

      function animEndCallback() {
        rect.offsetWidth = rect.offsetWidth;
        rect.style.animation = null;
        rect.style.webkitAnimation = null;
        rect.removeEventListener('webkitAnimationEnd', animEndCallback);
      }
    }

  }

])