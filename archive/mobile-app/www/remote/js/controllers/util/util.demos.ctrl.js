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
    //   var polygon = document.querySelector('polygon');
      var path = document.querySelector('.demo-path');
      var rect = document.querySelector('svg rect');
      rect.style.transform = 'translateX(206px) translateY(80px) rotate(279deg)'
      //converts polygon into a path
    //   var path = SVGService.convertPolyToPath(polygon);
    //   path.setAttribute('fill', 'none');
    //   path.setAttribute('stroke', '#FFFFFF');
    //   path.setAttribute('stroke-width', '5px');
    //   polygon.parentNode.replaceChild(path,polygon);

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
      // var totalPathLength = path.getTotalLength()
      // console.log(totalPathLength);
      // for (var i = 0; i < parseInt(totalPathLength); i++) {
      //   var point = path.getPointAtLength(i);
      //   // uncomment when you get here, prints hella shit;
      //   // console.log(i, point.x, point.y);
      // }

      // //initialize empty animation object

      // $timeout(function() {
      //   var shapeOffset = SVGService.getShapeWidthHeight(rect).width/2;
      //   // var shapeOffset = 7.5;

      //   var cssAnimObj = AnimationService.initCSSAnimation('draw-star');
      //   cssAnimObj.appendRule('0% {transform: translate(' + (startPoint.x - shapeOffset) + 'px, ' + (startPoint.y-shapeOffset) +'px) rotate(' + (translateAng) + 'deg);}', i);
      //   for (var i = 1; i < 100; i++) {
      //      var indexPoint = path.getPointAtLength(i/100 *totalPathLength);
      //      var indexPreviousPoint = path.getPointAtLength(i - 1);
      //      var translateX = indexPoint.x - shapeOffset;
      //      var translateY = indexPoint.y - shapeOffset;
      //      var translateAng = Math.atan2(indexPreviousPoint.y - indexPoint.y, indexPreviousPoint.x - indexPoint.x) * (180/Math.PI);
      //      console.log(i, translateAng);
      //      $scope.buttonText = 'Loading ... %' + i;
      //      $timeout(function() {
      //       $scope.$apply();
      //      })
      //      cssAnimObj.appendRule(i + '% {transform: translate(' + translateX + 'px, ' + translateY +'px) rotate(' + (translateAng + 180) + 'deg);}', i);
      //      console.log('translate(' + translateX + 'px, ' + translateY +'px) rotate(' + (translateAng) + 'deg)');
      //   }
      //   cssAnimObj.appendRule('100% {transform: translate(' + (startPoint.x - shapeOffset) + 'px, ' + (startPoint.y-shapeOffset) +'px) rotate(' + (translateAng) + 'deg);}', i);

      //   $scope.buttonText = 'Play';
      //   $scope.full_animation_string = cssAnimObj.name + " 10s linear 0s 1 normal forwards";
      //   $scope.full_keyframes = cssAnimObj.cssStyle;
      //   $scope.$apply();
      // }, 100);





      // //get path details
      // var pathCoordInfo = path.getBoundingClientRect();
      // console.log('path info:', pathCoordInfo);

      // //get the rect & inject into the path svg
      // var rect = document.querySelector('svg rect');
      // path.parentNode.appendChild(rect);
      // //position the rect to be at the start point
      // var startPoint = path.getPointAtLength(0);
      // //offset from the top left of the svg
      // // rect.style.cx = startPoint.x;
      // // rect.style.cy = startPoint.y;

      //apply animation


    })

    $scope.playAnimation = function(animation_text) {
      var elem = document.querySelector('rect');
      if (elem) {
        var tempAnimation = elem.style.animation || elem.style.webkitAnimation;
        elem.style.animation = null;
        $timeout(function() {
          elem.style.animation = tempAnimation;
          elem.style.webkitAnimation = tempAnimation;
          $scope.$apply();
        }, 100)
      }

      // var rect = document.querySelector('svg rect');
      // rect.style.animation = animation_text
      // rect.style.webkitAnimation = animation_text;
      // rect.addEventListener( 'webkitAnimationEnd', animEndCallback)

      // function animEndCallback() {
      //   rect.offsetWidth = rect.offsetWidth;
      //   rect.style.animation = null;
      //   rect.style.webkitAnimation = null;
      //   rect.removeEventListener('webkitAnimationEnd', animEndCallback);
      // }
    }

  }

])