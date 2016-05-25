angular.module('uguru.shared.directives')
.directive('onInit', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.ready(function(){
        var kvSplit = attr.onInit && attr.onInit.length && attr.onInit.split(':');
        if (kvSplit && kvSplit.length > 1) {
          onInitProperty = kvSplit[0];
          onInitPropertyValue = kvSplit[1];
          if (onInitProperty in element[0].style) {
            element[0].style[onInitProperty] = onInitPropertyValue;
            $timeout(function() {
              scope.$apply();
            })
          }
        }
      })
    }
  }
}])
.directive('draw', ['$timeout', 'SVGService', function ($timeout, SVGService) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var nodeName = element[0].nodeName;

      if (SVGService.supportedShapes.indexOf(nodeName) > -1) {
        var drawElement = element[0]
        var drawDelay = attr.drawDelay || 0;
        var drawStartFrame = parseInt(attr.drawStartFrame) || 0;
        var drawDuration = SVGService.computeDrawDuration(attr.drawDuration);

        var drawPathLength = SVGService.getTotalPathLength(drawElement);
        drawElement.style.strokeDasharray = drawPathLength;
        drawElement.style.strokeDashoffset = drawPathLength;
        scope.$watch(function() {
          return element.attr('class');
        }, function() {

          if (element[0].classList.contains('activate') || (attr.drawOnClass && element[0].classList.contains(attr.drawOnClass))) {
            $timeout(function() {
              SVGService.drawOneShape(drawElement, drawStartFrame, drawDuration, drawPathLength);
            }, drawDelay);
          }
        })
      }
    }
  }
}])
.directive('parallaxParent', ['$state', '$timeout', function ($state, $timeout) {
    // TODO --> provide support bool | integer
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
          var parallaxArgs = ["clipRelativeInput", "relativeInput", "calibrationThreshold", "calibrationDelay", "supportDelay", "calibrateX", "calibrateY","invertX", "invertY","limitX","limitY","scalarX","scalarY","frictionX","frictionY","originX","originY"];
          var parallaxArgsType = ["bool", "bool", "int", "int", "int", "bool", "bool", "bool", "bool", "bool", "bool", "float", "float", "float", "float", "float", "float"];
          var elemParallaxArgs = [];
          $timeout(function() {
            if (attr.parallaxParent && attr.parallaxParent.length) {
              var elemParallax = new Parallax(element[0]);
              for (var i = 0; i < parallaxArgs.length; i++) {
                 var parsedIndexArg = "parallax" + parallaxArgs[i][0].toUpperCase() + parallaxArgs[i].slice(1);
                 if (!parsedIndexArg || !parsedIndexArg.length) continue;
                 var indexArg = parallaxArgs[i];
                 elemParallaxArgs.push(parsedIndexArg);
                 elemParallax[indexArg] = parseArg(attr[parsedIndexArg], parallaxArgsType[i]) || elemParallax[indexArg]
              }
              $timeout(function() {
                elemParallax.enable();
                elemParallax.updateLayers();
                scope.root.parallax[attr.parallaxParent] = elemParallax
              })

              scope.root.parallax[attr.parallaxParent] = elemParallax
            }
          })
          function parseArg(arg, _type) {
            if (_type === "float") {
              return parseFloat(arg)
            }
            if (_type === "bool") {
              return arg === "true"
            }
            if (_type === "int") {
              return parseInt(arg)
            }
          }
      }
    }
}])
.directive('parallaxChild', ['$state', '$timeout', function ($state, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if (attr.parallaxChild && attr.parallaxChild.length) {
          var floatValue =  parseFloat(attr.parallaxChild);

          element[0].setAttribute('data-depth', floatValue)
          element[0].classList.add('layer');
          $timeout(function() {
            if (attr.parallaxParentRef && attr.parallaxParentRef.length && scope.root.parallax[attr.parallaxParentRef]) {
              scope.root.parallax[attr.parallaxParentRef] && scope.root.parallax[attr.parallaxParentRef].updateLayers();
            }
          }, 1000)
        }
      }
    }
}])