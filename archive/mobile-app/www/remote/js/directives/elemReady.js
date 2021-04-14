angular.module('uguru.directives')
.directive( 'elemReady', function( $parse, $timeout ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {
          elem.ready(function(){
            $timeout(function() {
              $scope.$apply(function(){
                var func = $parse(attrs.elemReady);
                func($scope);
              })
            })
          })
       }
    }
})
.directive('bgImage', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            attr.$observe('bgImage', function() {
              if (!attr.bgImage) {
                 // No attribute specified, so use default
                 element.css("background-image","url("+scope.defaultImage+")");
              } else {
                 var image = new Image();
                 image.src = attr.bgImage;
                 image.onload = function() {
                    element.css("background-image","url("+attr.bgImage+")");
                    scope.$apply(attr.bgImageHasLoaded);
                 };
                 image.onerror = function() {
                    //Image failed to load- use default
                    element.css("background-image","url("+scope.defaultImage+")");
                 };
             }
         });
      }
    };
})
.directive('page-transition', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {

      var loader = new SVGLoader( element[0], { speedIn : attr.pageTransitionDelay || 300, easingIn : mina.easeinout } );
      loader.show();

      element[0].className += ' pageload-overlay';
      element[0].setAttribute('data-opening', 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z');

      var div = document.createElement('div');
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="transition" style="position:fixed;background-color:transparent; visibility:hidden;" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="xMidYMid slice"><path d="M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z"/></svg>'
      element[0].appendChild(div);


      scope.$watch(function() {
          return element.attr('class');
        }, function(new_class) {
          if (element[0].className.indexOf('activate')) {
            element[0].classList.remove('activate');
            element[0].querySelector('svg.transition').style.visibility = "visible";
          }
      })
    }
  }
})
.directive('preBg', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            attr.$observe('bgImage', function() {
              if (!attr.bgImage) {
                 // No attribute specified, so use default
                 element.css("background-image","url("+scope.defaultImage+")");
              } else {
                 var image = new Image();
                 image.src = attr.bgImage;
                 image.onload = function() {
                    element.css("background-image","url("+attr.bgImage+")");
                    scope.$apply(attr.bgImageHasLoaded);
                 };
                 image.onerror = function() {
                    //Image failed to load- use default
                    element.css("background-image","url("+scope.defaultImage+")");
                 };
             }
         });
      }
    };
})
.directive('postBg', function () {
     return {
      restrict: 'A',
      link: function(scope, element, attr) {
          scope.$watch(function() {
            return element.attr('class');
          }, function() {

            if (element[0].classList.contains('activate') || ('activatePostBgOnClass' in attr && element[0].classList.contains(attr.activatePostBgOnClass) > -1)) {
              var elementOpacity = parseFloat(attr.postBgOpacity) || 1;
              var elementNodeName = element[0].nodeName;
              element[0].style.transition = 'all 150ms ease-in-out';
              if (attr.postBg.indexOf('#') > -1) {
                // if svg
                if (['circle', 'rect', 'polygon', 'path', 'line'].indexOf(elementNodeName.toLowerCase()) > -1) {
                  element[0].style.fill = attr.postBg;
                } else {
                  element[0].style.backgroundColor = attr.postBg;
                }
                element[0].style.opacity = elementOpacity;
              } else {
                var elemFill = 'rgba("' + (attr.postBg || '#FFFFFF')  + ',' + elementOpacity + '")'
                 if (['circle', 'rect', 'polygon', 'path', 'line'].indexOf(elementNodeName.toLowerCase())) {
                    element[0].style.fill = elemFill;
                  }
              }
            }
          })
        }
      }
})
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
.directive('timer', ['$timeout', '$interval', function ($timeout, $interval) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.count = 0;
      scope.index = 0;
      scope.globalInterval;
      scope.timerInterval = parseTimerInterval(attr.timerAuto);
      scope.isWithinViewPort = isElementInViewport(element[0]);
      if (!scope.timerInterval) return;
      // scope.mod parseInt()
      function initInterval(scope) {
        scope.children = timerChildren = element[0].querySelectorAll('[timer-child]');
        scope.maxIndex = scope.children.length;
          $interval(function() {
            scope.index = (scope.index + 1) % scope.maxIndex;

            var devTool = document.querySelector('[dev-tool]');
            devTool.innerHTML = scope.index;

            for (var i = 0; i < scope.children.length; i++) {
              var indexChild = scope.children[i];
              var indexChildClass = indexChild.getAttribute('timer-class');
              indexChild.classList.remove(indexChildClass);
            }
            var indexChild = scope.children[scope.index];
            console.log(indexChild);
            var indexChildClass = indexChild.getAttribute('timer-class');
            if (indexChildClass && indexChildClass.length) {
              indexChild.classList.add(indexChildClass);
            }

          }, scope.timerInterval);
      }

      scope.$watch(function() {
          scope.isWithinViewPort = isElementInViewport(element[0])
          return scope.isWithinViewPort
        }, function(in_viewport) {
          if (in_viewport) {
            initInterval(scope)
          } else {
            console.log('canceling..', in_viewport);

          }
          // alert('viewport changed to' + in_viewport);
        }
      )
    }
  }

  function processTimerChildren(elems) {
    resultDict = {};
    for (var i = 0; i < elems.length; i++) {

    }
    return resultDict;
  }

  function parseTimerInterval(time_str) {
    //seconds
    if (time_str.split('ms').length > 1) {
      return parseInt(time_str.replace('ms', ''));
    } else if (time_str.split('s').length > 1) {
      return (parseInt(time_str.replace('s', '')) * 1000);
    }
  }

}])
.directive('onInit', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      elem.ready(function(){
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

      // if (pathElem) {
      //   scope.$watch(function() {
      //     return pathElem.style.strokeDashoffset;
      //   }, function(value) {

      //     if (scope.activated) {
      //       return;
      //     };
      //     console.log('should be tracing...', cssAnimObjString);

      //     scope.activated = true;

      //     $timeout(function() {


          // }, 100)
      //   })
      // }



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
.directive('classOnClear', ['$timeout', 'AnimationService', function ($timeout, AnimationService) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watch(function() {
        return element.attr('class');
      },function() {
        if (element[0].classList.contains('clear')) {
          element[0].classList.remove('clear')
          var delay = attr.classOnClearDelay || 0;
          var classes = attr.classOnClear.split(", ");
          $timeout(function() {
              for (var i = 0; i < classes.length; i++) {
                var indexClass = classes[i].split(":")[0];
                var classArgs = classes[i].split(":").slice(1);
                if (classArgs.indexOf("anim") > -1) {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateIn(element[0], indexClass);
                } else
                if (classArgs.indexOf("animOut") > -1) {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateOut(element[0], indexClass);
                }
                else {
                  element[0].classList.add(indexClass);
                }
                if (classArgs.indexOf("unique") > -1) {
                  var otherClassElems = document.querySelectorAll('.' + indexClass);
                  for (var j = 0; j < otherClassElems.length; j++) {
                    var otherElemIndex = otherClassElems[j];
                    if (otherElemIndex !== element[0]) {
                      otherElemIndex.classList.remove(indexClass);
                    }
                  }
                }
                if (classes[i].indexOf('inject') > -1 && classArgsHasInject(classArgs)) {
                  var injectArgClassSplit = classArgsHasInject(classArgs).split("|")
                  if (injectArgClassSplit.length > 1) {
                    var classToInject = injectArgClassSplit[1];
                    var elemToInjectSelector = injectArgClassSplit[0];
                    var elemsToInject = document.querySelectorAll(elemToInjectSelector);
                    for (var k = 0; k < elemsToInject.length; k++) {
                      elemsToInject[k].classList.add(classToInject);
                    }
                  }
                }
              }
          }, delay);
          function classArgsHasInject(args) {
            var injectArg = null;
            args.filter(function(word, index) {
              if (word.indexOf("inject") > -1) {
                injectArg = args[index];
                return true
              };
            })
            return (injectArg && injectArg.replace("inject", ""));
          }
        }
      })
    }
  }
}])
.directive('classOnActivate', ['$timeout', '$parse', 'AnimationService',
  function ($timeout, $parse, AnimationService) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watch(function() {
        return element.attr('class');
      },function() {
        if (element[0].classList.contains('activate')) {

          element[0].classList.remove('activate')

          var delay = attr.classOnActivateDelay || 0;
          var classes = attr.classOnActivate.split(", ");
          $timeout(function() {
              for (var i = 0; i < classes.length; i++) {
                var indexClass = classes[i].split(":")[0];
                var classArgs = classes[i].split(":").slice(1);
                if (classArgs.indexOf("anim") > -1 && indexClass !== "null") {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateIn(element[0], indexClass);
                } else
                if (classArgs.indexOf("animOut") > -1 && indexClass !== "null") {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateOut(element[0], indexClass);
                }
                else if (indexClass !== "null") {
                  element[0].classList.add(indexClass);
                }
                if (classArgs.indexOf("unique") > -1) {
                  var otherClassElems = document.querySelectorAll('.' + indexClass);
                  for (var j = 0; j < otherClassElems.length; j++) {
                    var otherElemIndex = otherClassElems[j];
                    if (otherElemIndex !== element[0]) {
                      otherElemIndex.classList.remove(indexClass);
                    }
                  }
                }
                if (classes[i].indexOf('inject') > -1 && classArgsHasInject(classArgs)) {
                  var injectArgClassSplit = classArgsHasInject(classArgs).split("|")
                  if (injectArgClassSplit.length > 1) {
                    var classToInject = injectArgClassSplit[1];
                    var elemToInjectSelector = injectArgClassSplit[0];
                    var elemsToInject = document.querySelectorAll(elemToInjectSelector);
                    for (var k = 0; k < elemsToInject.length; k++) {
                      elemsToInject[k].classList.add(classToInject);
                    }
                  }
                }
              }
          }, delay);

          if (attr.evalOnActivate) {
            $timeout(function() {
              scope.$apply(function(){
                var parsedExpr = $parse(attr.evalOnActivate)(scope);
                console.log(parsedExpr);

              })
            })
          }

          function classArgsHasInject(args) {
            var injectArg = null;
            args.filter(function(word, index) {
              if (word.indexOf("inject") > -1) {
                injectArg = args[index];
                return true
              };
            })
            return (injectArg && injectArg.replace("inject", ""));
          }
        }
      })
    }
  }
}])
.directive('counter', ['$timeout', '$interval', function ($timeout, $interval) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var counterMax = attr.counterMax;
      var counterMin = attr.counterMin || 0;
      var counterSuffix = attr.counterSuffix || '';
      var counterPrefix = attr.counterPrefix || '';
      var counterDuration = attr.counterDuration || '';
      if (attr.initOnClass && attr.initOnClass.indexOf('counter:') > -1 && counterMax) {
        var initOnClassArgs = attr.initOnClass.split(', ');
        var initCounterClassIndex = getClassArgIndex('counter', initOnClassArgs)
        var initCounterClassArr = initOnClassArgs[initCounterClassIndex].split(':')
        if (initCounterClassArr.length === 2) {
          initCounterClass = initCounterClassArr[1];
        }
        if (initCounterClass) {
          scope.$watch(function() {
            counterMax = attr.counterMax;
            var counterDuration = attr.counterDuration || '';
            return (element.attr('class') && element.attr('class').indexOf(initCounterClass) > -1) || "";

          },function(elem_has_init_counter_class) {
            if (elem_has_init_counter_class) {
              $timeout(function() {
                scope.$apply(function() {
                  element[0].classList.remove(elem_has_init_counter_class);
                })
              });
              if (!element[0].id) {
                var numCounterElems = document.querySelectorAll('[counter]').length + 1
                element[0].id = 'counter-' + numCounterElems;
              }
              var counterArgs = {
                  useEasing : false,
                  useGrouping : false,
                  separator : ',',
                  decimal : '.',
                  prefix : counterPrefix ,
                  suffix : counterSuffix
              }
              var counterDelay = attr.counterDelay;
              var counterInfinite = attr.counterInfinite;
              var counterDuration = attr.counterDuration;
              if ('counterInfinite' in attr) {
                var counterTimeBetween = attr.counterInfiniteInBtwn || 0;
                if (counterDelay) {
                  $timeout(function() {
                    $interval(function() {
                      var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
                      countUpInstance.start();
                    }, parseInt(counterDuration) * 1000 + parseInt(counterTimeBetween) * 1000 + 1000)
                  }, parseInt(counterDelay))
                } else {
                  $interval(function() {
                    var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
                    countUpInstance.start();
                  }, parseInt(counterDuration) * 1000 + parseInt(counterTimeBetween) * 1000);
                }

              } else {
                if (counterDelay) {
                  $timeout(function() {
                    var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
                    countUpInstance.start();
                  }, parseInt(counterDelay))
                } else {
                    var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
                    countUpInstance.start();
                }
              }
            }
          })
        }
      }

      function getClassArgIndex(arg_name, class_arr) {
        for (var i = 0; i < class_arr.length; i++) {
          var indexClass = class_arr[i];
          if (indexClass.indexOf(arg_name + ':') > -1) {
            return i;
          }
        }
      }

    }
  }
}])
.directive('activateOnClass', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watch(function() {
        return element.attr('class');
      },function() {
        var classTriggers = attr.activateOnClass.split(', ');
        var classTriggerDict = {};
        for (var i = 0; i < classTriggers.length; i++) {
          var indexClassTrigger = classTriggers[i];
          if (element[0].classList.contains(indexClassTrigger)) {
            classTriggerDict[indexClassTrigger] = true;
          }
        }
        if (Object.keys(classTriggerDict).length > 0 &&  Object.keys(classTriggerDict).length === classTriggers.length) {
          var delay = attr.activateOnClassDelay || 0;
          $timeout(function() {
            element[0].classList.add('activate');
            for (var i = 0; i < classTriggers.length; i++) {
              element[0].classList.remove(classTriggers[i]);
            }
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        }
      });
    }
  }
}])
.directive('translateOnClass', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      $timeout(function() {
        scope.$watch(function() {
          return element.attr('class');
        },function(value) {
            if (!element.attr('class')) {
              console.log('ERROR TRANSLATE-ON-CLASS', 'needs at least one class to provide translate-on-class-functionality');
              return
            }
            var classNames = element.attr('class').split(' ');

              if (((classNames.indexOf('activate') > -1 && !('translateOnClass' in attr)) || classNames.indexOf(attr.translateOnClass) > -1) && attr.translateToElem) {
                element[0].classList.remove(attr.translateToElem);
                var elementBounding = element[0].getBoundingClientRect();
                var elemCoords = {height: elementBounding.height, width: elementBounding.width, top: elementBounding.top, left: elementBounding.left};
                var translateElem = attr.translateToElem;
                var translateElemBounding = document.querySelector(translateElem) && document.querySelector(translateElem).getBoundingClientRect();
                var translateElemCoords = {height: translateElemBounding.height, width: translateElemBounding.width, top: translateElemBounding.top, left: translateElemBounding.left};
                var injectOnTranslateClass = 'translate-active';
                if (!element[0].style.webkitTransform && !element[0].style.MozTransform && !element[0].style.msTransform && !element[0].style.OTransform && !element[0].style.transform) {
                  var translateY = parseInt(translateElemCoords.top - elemCoords.top) + ((attr.translateYOffset && parseInt(attr.translateYOffset)) || 0);
                  var translateX = parseInt(translateElemCoords.left - elemCoords.left) + ((attr.translateXOffset && parseInt(attr.translateXOffset)) || 0);
                  var transFormString = "translate(" + translateX + "px, " + translateY + "px)"
                  var delay = attr.translateOnClassDelay || 0;
                  if (delay) {
                    $timeout(function() {
                      element[0].style.webkitTransform = transFormString;
                      element[0].style.MozTransform = transFormString;
                      element[0].style.msTransform = transFormString;
                      element[0].style.OTransform = transFormString;
                      element[0].style.transform = transFormString;
                      element[0].classList.add(injectOnTranslateClass, 'active');
                    }, delay);
                  } else {
                    element[0].style.webkitTransform = transFormString;
                    element[0].style.MozTransform = transFormString;
                    element[0].style.msTransform = transFormString;
                    element[0].style.OTransform = transFormString;
                    element[0].style.transform = transFormString;
                    element[0].classList.add(injectOnTranslateClass, 'active');
                  }

                }
              }
        });
      })
    }
  }
}])
.directive('translateOnClick', ['$timeout', function ($timeout) {
    // add 'translate-to-click' to element to "declare" directive. "translate-active" is added to element if element does not have transform properties && transforms
    // add 'translate-to-elem'="#sample-selector" to element to link destination element
    // add 'translate-x-offset'="200" to add 200px X offset (origin = bottom left);
    // add 'translate-y-offset'="200" to add 200px Y offset (origin = bottom left);
    // add 'scale-x-on-click'="1.3" scales x by 1.3
    // add 'translate-on-click-duration'="2.0" scales x by 1.3
    // add 'translate-on-click-delay'="1000" sets transition duration to 1000ms
    // add 'scale-y-on-click'="0.7" scales y by 0.7
    // add [NOT SUPPORTED YET] 'translate-back-class'="untransform-class-name1, untransform-class-name-2" adds the argument/class(es) when the transform is set to null (when element with attribute transforms)
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.on('click', function() {
              var elementBounding = element[0].getBoundingClientRect();
              var elemCoords = {height: elementBounding.height, width: elementBounding.width, top: elementBounding.top, left: elementBounding.left};

              var translateElem = attr.translateToElem;
              var translateElemBounding = document.querySelector(translateElem).getBoundingClientRect();
              var translateElemCoords = {height: translateElemBounding.height, width: translateElemBounding.width, top: translateElemBounding.top, left: translateElemBounding.left};
              var injectOnTranslateClass = attr.translateOnClick || 'translate-active';
              var scaleString = "";
              if (!element[0].style.webkitTransform && !element[0].style.MozTransform && !element[0].style.msTransform && !element[0].style.OTransform && !element[0].style.transform) {
                var translateY = parseInt(translateElemCoords.top - elemCoords.top) + ((attr.translateYOffset && parseInt(attr.translateYOffset)) || 0);
                var translateX = parseInt(translateElemCoords.left - elemCoords.left) + ((attr.translateXOffset && parseInt(attr.translateXOffset)) || 0);
                var scaleX = (attr.scaleXOnClick && parseFloat(attr.scaleXOnClick)) || 1.0;
                var scaleY = (attr.scaleXOnClick && parseFloat(attr.scaleYOnClick)) || 1.0;
                var transFormString = "translate(" + translateX + "px, " + translateY + "px)"
                var scaleString = " scale(" + scaleX + ',' + scaleY + ')'
                element[0].style.webkitTransform = transFormString + scaleString;
                element[0].style.MozTransform = transFormString + scaleString;
                element[0].style.msTransform = transFormString + scaleString;
                element[0].style.OTransform = transFormString + scaleString;
                element[0].style.transform = transFormString + scaleString;
                if (attr.translateOnClickDelay && attr.translateOnClickDelay.length) {
                  var translateDelay = parseInt(attr.translateOnClickDelay);
                  element[0].style.webkitTransitionDelay = translateDelay + "ms";
                  element[0].style.MozTransitionDelay = translateDelay + "ms";
                  element[0].style.msTransitionDelay = translateDelay + "ms";
                  element[0].style.OTransitionDelay = translateDelay + "ms";
                  element[0].style.transitionDelay = translateDelay + "ms";
                }
                if (attr.translateOnClickDuration && attr.translateOnClickDuration.length) {
                  var translateDuration = parseInt(attr.translateOnClickDuration);
                  element[0].style.webkitTransitionDuration = translateDuration + "ms";
                  element[0].style.MozTransitionDuration = translateDuration + "ms";
                  element[0].style.msTransitionDuration = translateDuration + "ms";
                  element[0].style.OTransitionDuration = translateDuration + "ms";
                  element[0].style.transitionDuration = translateDuration + "ms";
                }
                //deactivate other directives with transforms towards the same element "translate-to-elem";
                var allTranslateOnClickElems = document.querySelectorAll('.' + injectOnTranslateClass + ".active");
                element[0].classList.add(injectOnTranslateClass, 'active', 'recently-active');
                for (var i = 0; i < allTranslateOnClickElems.length; i++) {
                  var indexTranslateElem  = allTranslateOnClickElems[i];
                  if (indexTranslateElem !== element[0]) {
                        indexTranslateElem.classList.remove(injectOnTranslateClass, 'active');
                        indexTranslateElem.style.webkitTransform = null;
                        indexTranslateElem.style.MozTransform = null;
                        indexTranslateElem.style.msTransform = null;
                        indexTranslateElem.style.OTransform = null;
                        indexTranslateElem.style.transform = null;
                      }
                    }
                }
                $timeout(function() {
                  element[0].classList.remove('recently-active');
                }, 500);
            });
      }
    };
}]).
directive("classOnLoad", ["$timeout", 'AnimationService', function ($timeout, AnimationService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {
                scope.$watch('root.loader.body.hide', function(value) {
                  if (value) {
                    var delay = attr.classOnLoadDelay || 0;
                    var classes = attr.classOnLoad.split(", ");
                    $timeout(function() {
                      for (var i = 0; i < classes.length; i++) {
                        var indexClass = classes[i].split(":")[0];
                        var classArgs = classes[i].split(":").slice(1);
                        if (classArgs.indexOf("anim") > -1) {
                          if (classArgs.indexOf("keep") > -1) {
                            indexClass = indexClass +':keep';
                          }
                          AnimationService.animateIn(element[0], indexClass);
                        } else {
                          indexClass && element[0].classList.add(indexClass);
                        }
                      }
                      scope.$apply();
                    }, delay)
                  }
                });
              })
          }
      };
}]).
directive("evalOnLoad", ["$timeout", 'AnimationService', '$parse', function($timeout, AnimationService, $parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {
                scope.$watch('root.loader.body.hide', function(value) {
                    if (value) {
                      $timeout(function() {
                        scope.$apply(function(){
                          var func = $parse(attr.evalOnLoad);
                          func(scope);
                        })
                      })
                    }
                })
              })
          }
      }
}]).
directive("classOnClick", ["$timeout", 'AnimationService', function ($timeout, AnimationService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              element.on("click", function() {
                console.log(element[0], 'clicked');
                var delay = attr.classOnClickDelay || 0;
                var classes = attr.classOnClick.split(", ");
                $timeout(function() {
                    for (var i = 0; i < classes.length; i++) {
                      var indexClass = classes[i].split(":")[0];
                      var classArgs = classes[i].split(":").slice(1);
                      if (classArgs.indexOf("anim") > -1) {
                        if (classArgs.indexOf("keep") > -1) {
                          indexClass = indexClass +':keep';
                        }
                        AnimationService.animateIn(element[0], indexClass);
                      } else
                      if (classArgs.indexOf("animOut") > -1) {
                        if (classArgs.indexOf("keep") > -1) {
                          indexClass = indexClass +':keep';
                        }
                        AnimationService.animateOut(element[0], indexClass);
                      }else {
                        element[0].classList.add(indexClass);
                      }
                      if (classArgs.indexOf("unique") > -1) {
                        var otherClassElems = document.querySelectorAll('.' + indexClass);
                        for (var j = 0; j < otherClassElems.length; j++) {
                          var otherElemIndex = otherClassElems[j];
                          if (otherElemIndex !== element[0]) {
                            otherElemIndex.classList.remove(indexClass);
                          }
                        }
                      }
                      if (classArgsHasInject(classArgs)) {
                        var injectArgClassSplit = classArgsHasInject(classArgs).split("|")
                        if (injectArgClassSplit.length > 1) {
                          var classToInject = injectArgClassSplit[1];
                          var elemToInjectSelector = injectArgClassSplit[0];
                          var elemsToInject = document.querySelectorAll(elemToInjectSelector);
                          for (var k = 0; k < elemsToInject.length; k++) {
                            elemsToInject[k].classList.add(classToInject);
                          }
                        }
                        // var otherClassElems = document.querySelectorAll('.' + indexClass);
                        // for (var j = 0; j < otherClassElems.length; j++) {
                        //   var otherElemIndex = otherClassElems[j];
                        //   if (otherElemIndex !== element[0]) {
                        //     otherElemIndex.classList.remove(indexClass);
                        //   }
                        // }
                      }
                    }
                }, delay);
          function classArgsHasInject(args) {
            var injectArg = null;
            args.filter(function(word, index) {
              console.log(word);
              if (word.indexOf("inject") > -1) {
                injectArg = args[index];
                return true
              };
            })
            return injectArg && injectArg.replace("inject", "");
          }
                // function classArgsHasInject(args) {
                //   console.log('inject args', args);
                //   if (!args || args.length) return false;
                //   var injectArg = null;
                //   args.filter(function(word, index) {
                //     if (word.indexOf("inject") > -1) {
                //       injectArg = args[index];
                //       return true
                //     };
                //   })
                //   return (args && injectArg && injectArg.replace("inject", ""));
                // }
              });
            }
          }
}])
.directive("animEnterDown", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            if (!scope.page.waypoints[attr.animEnterDown]) {
                scope.page.waypoints[attr.animEnterDown] = {};
            }
            $timeout(function() {
              scope.$watch('page.waypoints.' + attr.animEnterDown + '.activated', function(isActive) {
                var hasFirstTimeEnter = scope.page.waypoints[attr.animEnterDown].hasFirstTimeEnter;
                var firstTimeActivated = scope.page.waypoints[attr.animEnterDown].firstTimeEnterActivated;
                if (isActive && scope.page.waypoints[attr.animEnterDown].direction === 'down' && (!hasFirstTimeEnter || firstTimeActivated)) {
                  AnimationService.applyAnimateInDirective(element[0], 'enter-down');
                }
              })
            }, 100);
          }
      };
}]).
directive("animEnterUp", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var wpTriggerArgs = attr.animEnterUp.split(', ');
            for (var i = 0; i < wpTriggerArgs.length; i++) {
              indexAttrAnimEnterUp = wpTriggerArgs[i];
              if (!scope.page.waypoints[attr.animEnterUp]) {
                scope.page.waypoints[indexAttrAnimEnterUp] = {};
              }
              $timeout(function() {
                scope.$watch('page.waypoints.' + indexAttrAnimEnterUp + '.activated', function(isActive) {
                  var hasFirstTimeEnter = scope.page.waypoints[indexAttrAnimEnterUp].hasFirstTimeEnter;
                  var firstTimeActivated = scope.page.waypoints[indexAttrAnimEnterUp].firstTimeEnterActivated;
                  if (isActive && scope.page.waypoints[indexAttrAnimEnterUp].direction === 'down' && (!hasFirstTimeEnter || firstTimeActivated)) {
                    AnimationService.applyAnimateInDirective(element[0], 'enter-up');
                  }
                })
              }, 100);
            }
          }
      };
}]).
directive("animFirstEnterDown", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            $timeout(function() {
              if (!scope.page.waypoints[attr.animFirstEnterDown]) {
                scope.page.waypoints[attr.animFirstEnterDown] = {};
              }
              scope.page.waypoints[attr.animFirstEnterDown].hasFirstTimeEnter = true;
              scope.$watch('page.waypoints.' + attr.animFirstEnterDown + '.direction', function(isActive) {
                var direction = scope.page.waypoints[attr.animFirstEnterDown].direction;
                var firstTimeActivated = scope.page.waypoints[attr.animFirstEnterDown].firstTimeEnterActivated;
                if ((isActive &&  direction === 'down' && !firstTimeActivated)) {
                  scope.page.waypoints[attr.animFirstEnterDown].firstTimeEnterActivated = true;
                  AnimationService.applyAnimateInDirective(element[0], 'first-enter-down');
                }
              })
            }, 100);
          }
      };
}]).
directive("animExitUp", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            if (!scope.page.waypoints[attr.animExitUp]) {
              scope.page.waypoints[attr.animExitUp] = {};
            }
            $timeout(function() {
              scope.$watch('page.waypoints.' + attr.animExitUp + '.direction', function(isActive) {

                var hasFirstTimeEnter = scope.page.waypoints[attr.animExitUp].hasFirstTimeEnter;
                var firstTimeActivated = scope.page.waypoints[attr.animExitUp].firstTimeEnterActivated;
                if (isActive && scope.page.waypoints[attr.animExitUp].direction === 'up' && (!hasFirstTimeEnter || firstTimeActivated)) {
                  AnimationService.applyAnimateOutDirective(element[0], 'exit-up');
                }
              })
            }, 100);
          }
      };
}]).
directive("animExitDown", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            $timeout(function() {
              scope.$watch('page.waypoints.' + attr.animExitDown + '.direction', function(isActive) {
                var hasFirstTimeEnter = scope.page.waypoints[attr.animExitDown].hasFirstTimeEnter;
                var firstTimeActivated = scope.page.waypoints[attr.animExitDown].firstTimeEnterActivated;
                if (isActive && scope.page.waypoints[attr.animExitDown].direction === 'down' && (!hasFirstTimeEnter || firstTimeActivated)) {
                  AnimationService.applyAnimateOutDirective(element[0], 'exit-down');
                }
              })
            }, 100);
          }
      };
}]).
directive("initWpParent", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              scope.page.waypoints.parent = '#' + element[0].id || '.' + element[0].class
          }
      }
}).
directive("animOnHide", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {
                scope.$watch(function() {return element.attr('class'); }, function(newValue){
                    if (element.hasClass('show') || (attr.animOnHide && attr.animOnHide.length && element.hasClass(attr.animOnHide))) {
                      AnimationService.applyAnimateOutDirective(element[0], 'on-hide');
                    }
                    // else if (attr.animOnShow && attr.animOnShow.length && attr.animOnHide && attr.animOnHide.length === 0) {
                    //   AnimationService.applyAnimateOutDirective(element[0], 'on-hide');
                    // }
                });
              })
          }
      }
}]).
directive("animOnShow", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {
                scope.$watch(function() {return element.attr('class'); }, function(newValue){
                  if (element.hasClass('show') || (attr.animOnShow && attr.animOnShow.length
                    && element.hasClass(attr.animOnShow) && (attr.animOnShow === attr.animOnHide || !element.hasClass(attr.animOnHide)))) {
                    AnimationService.applyAnimateInDirective(element[0], 'on-show');
                  }
                });
              })
          }
      }
}]).
directive("bindWp", ['$timeout', function ($timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {

                if (!attr.bindWpClass || !attr.bindWpClass.length) return;

                var classNames = attr.bindWpClass.split(', ')
                if (attr.bindWpDirection) {
                  var directionNames = attr.bindWpDirection.split(', ')
                } else {
                  var directionNames = ["down", "down", "down", "down", "down", "down"]
                }

                scope.$watch('page.waypoints.' + attr.bindWp + '.activated', function(isActive) {
                  if (!scope.page.waypoints[attr.bindWp]) {
                    scope.page.waypoints[attr.bindWp] = {};
                  }
                  var direction = scope.page.waypoints[attr.bindWp].direction;
                  for (var i = 0; i < classNames.length; i++) {
                    var indexClassName = classNames[i];
                    var directionName = directionNames[i];
                    var directionArgs = directionName.split(':');
                    var directionName = directionArgs[0];
                    if (isActive && direction === 'down' && directionName === direction) {
                      if (directionArgs.length === 1) {
                        element[0].classList.add(classNames[i]);
                      } else if (directionArgs.length === 2 && directionArgs[1] === 'remove') {
                        element[0].classList.remove(classNames[i]);
                      } else if (directionArgs.length === 3 && directionArgs[1] === 'remove' && directionArgs[2].length) {
                        element[0].classList.remove(directionArgs[2]);
                        element[0].classList.add(classNames[i]);
                      }

                    } else if(isActive && direction === 'up' && directionName === direction){
                      if (directionArgs.length === 1) {
                        element[0].classList.add(classNames[i]);
                      } else if (directionArgs.length === 2 && directionArgs[1] === 'remove') {
                        element[0].classList.remove(classNames[i]);
                      } else if (directionArgs.length === 3 && directionArgs[1] === 'remove' && directionArgs[2].length) {
                        element[0].classList.remove(directionArgs[2]);
                        element[0].classList.add(classNames[i]);
                      }
                    }
                  }
                })
            }, 200);
          }
      }
}]).
directive("initWp", ['$timeout', 'ScrollService', '$state', function ($timeout, ScrollService, $state) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              $timeout(function() {
                //check empty or no parent declaration
                if (!attr.initWp || !attr.initWp.length || !scope.page.waypoints.parent) return;

                //check for multiple args

                var elemHasManyWp = attr.initWp.split(', ');
                var elemHasManyOffset = attr.wpOffset.split(', ');
                var parentRef = scope.page.waypoints.parent;
                var scopeRef = scope;
                var stateName = $state.current.name;
                var elemRef = '#' + element[0].id || '.' + element[0].class

                if (elemHasManyWp.length > 1) {
                  if (elemHasManyOffset.length !== elemHasManyWp.length) {
                    console.error('ERROR: waypoint declaration for element', element[0].id || element[0].class, 'has more/less offsets declared than wp vars');
                    return;
                  }
                  for (var i = 0; i < elemHasManyWp.length; i++) {
                    var indexWpName = elemHasManyWp[i];
                    var indexWpOffset = elemHasManyOffset[i];
                    scope.page.waypoints[indexWpName] = {offset: indexWpOffset || 0, activated:false, direction: null};
                    ScrollService.initScopedWaypoint(elemRef, parentRef, scopeRef, indexWpOffset, stateName, indexWpName);
                  }
                }
                else if (scope.page.waypoints.parent && elemHasManyWp.length === 1) {

                  scope.page.waypoints[attr.initWp] = {offset: attr.wpOffset || 0, activated:false, direction: null};
                  ScrollService.initScopedWaypoint(elemRef, parentRef, scopeRef, attr.wpOffset, stateName, attr.initWp);
                }
              })
          }
      }
}]);


function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}