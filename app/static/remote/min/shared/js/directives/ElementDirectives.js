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
.directive('tracePath', ['$timeout', 'SVGService', '$compile', '$rootScope', function ($timeout, SVGService, $compile, $rootScope) {
  return {
    restrict: 'A',
    scope: {
        kf: '=kf',
    },
    link: function(scope, element, attr) {

      var elementToTraceSelector = attr.tracePath;
      var options = {
        duration: attr.traceDuration || '5s',
        time_function: attr.traceTimeFunc || 'linear',
        delay: attr.traceDelay || '0s',
        iter_count: attr.traceIterCount || '1',
        direction: attr.traceDirection || 'normal',
        fill_mode: attr.traceFillMode || 'forwards',
        anim_name: attr.traceAnimName || (element[0].id + '-' + element[0].nodeName)
      }

      var pathElem = document.querySelector(elementToTraceSelector);
      console.log('path elem', pathElem);
      if (!pathElem) {
        $timeout(function() {
          console.log('trying again 1 sec later');
          $compile(element[0])(scope);
        }, 1000)
        return;
      }
      console.log('begin render');
      var animName = options.anim_name;
      var elemOffset = SVGService.getShapeWidthHeight(element[0]).width;
      var cssAnimObj = SVGService.generateCSSObjFromPath(animName, pathElem, elemOffset);
      var cssAnimObjString = [animName, options.duration, options.time_function, options.delay, options.iter_count, options.direction, options.fill_mode].join(' ');
      $rootScope.cssText = cssAnimObj.cssText;
      pathElem.parentNode.appendChild(element[0]);
      $timeout(function() {
        pathElem.parentNode.classList.add('activate');
        scope.$apply()
        element[0].style.animation = cssAnimObjString;
        element[0].style.webkitAnimation = cssAnimObjString;
        element[0].addEventListener( 'webkitAnimationEnd', animEndCallback)
        function animEndCallback() {
          element[0].offsetWidth = element[0].offsetWidth;
          element[0].style.animation = null;
          element[0].style.webkitAnimation = null;
          element[0].removeEventListener('webkitAnimationEnd', animEndCallback);
        }
      });
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
.directive('drawShapes', ['$timeout', 'SVGService', function ($timeout, SVGService) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clonedElem = element[0].cloneNode(true);
      var currentFrame = parseInt(attr.initFrame) || 0;
      var delay = attr.drawDelay || 0;
      var totalFrames = SVGService.computeDrawDuration(attr.drawDuration) || 60;
      var svgPaths = element[0].querySelectorAll('path:not([draw]):not([draw-ignore]), line:not([draw]):not([draw-ignore]), circle:not([draw]):not([draw-ignore]), rect:not([draw]):not([draw-ignore]), polygon:not([draw]):not([draw-ignore])');
      var pathLengths = new Array();
      var drawShapesDelay = parseInt(attr.drawShapesDelay) || 0;
      for (var i = 0; i < svgPaths.length; i++) {
        var indexPathElem = svgPaths[i];

        var pathLength = SVGService.getTotalPathLength(indexPathElem);

        // var pathLength = indexPathElem.getTotalLength();
        pathLengths[i] = pathLength;
        indexPathElem.style.strokeDasharray = pathLength + ' ' + pathLength;
        indexPathElem.style.strokeDashoffset = pathLength;
      }
      scope.$watch(function() {
        return element.attr('class');
      }, function() {

        if (element[0].classList.contains('activate') || (attr.drawOnClass && element[0].classList.contains(attr.drawOnClass))) {
            $timeout(function() {
              //concurrent case
              var startTime = new Date().getTime();
              var requestFrameHandle = 0;
              function draw() {
                var progress = currentFrame/totalFrames;
                if (progress > 1) {
                  var endTime = new Date().getTime();
                   window.cancelAnimationFrame(requestFrameHandle);
                } else {
                  currentFrame++;
                  for(var j=0; j<svgPaths.length;j++){
                    svgPaths[j].style.strokeDashoffset = Math.floor(pathLengths[j] * (1 - progress))
                    // console.log(svgPaths[j].style.strokeDashoffset);
                  }
                  requestFrameHandle = window.requestAnimationFrame(draw);
                }
              }
              draw()
            }, delay);
          }
        })
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