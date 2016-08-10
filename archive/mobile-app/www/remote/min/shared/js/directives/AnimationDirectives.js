angular.module('uguru.shared.directives', []);
angular.module('uguru.shared.directives')
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
.directive('tracePath', ['$timeout', 'SVGService', '$compile', '$rootScope', function ($timeout, SVGService, $compile, $rootScope) {
  return {
    restrict: 'A',
    scope: {
        kf: '=kf',
    },
    link: function(scope, element, attr) {

      var elementToTraceSelector = attr.tracePath;
      var elementToAppendChild = attr.traceParent;
      // console.log('passed in selectors', elementToTraceSelector, elementToAppendChild)
      var options = {
        duration: attr.traceDuration || '5s',
        time_function: attr.traceTimeFunc || 'linear',
        delay: attr.traceDelay || '0s',
        iter_count: attr.traceIterCount || '1',
        direction: attr.traceDirection || 'normal',
        fill_mode: attr.traceFillMode || 'forwards',
        anim_name: attr.traceAnimName || (element[0].id + '-' + element[0].nodeName),
        should_rotate: (attr.traceRotate && attr.traceRotate === 'true') || (!attr.traceRotate && true)
      }
      if (!options.should_rotate) {
        console.log('element has explicitly set should rotate to false', element[0]);
      }

      var pathElem = document.querySelector(elementToTraceSelector);
      var traceParent = document.querySelector(elementToAppendChild);
      var parentDrawShape = pathElem && findParentDrawShape(pathElem);

      scope.$watch(function() {
          return element.attr('class');
      }, function(new_class, old_class) {
        if (!new_class) {
          return;
        }
        if (new_class.indexOf('trace-activate') > -1) {
          element[0].classList.remove('trace-activate');
          if (!pathElem || !traceParent || !parentDrawShape) {
            var pathElem = document.querySelector(elementToTraceSelector);
            var traceParent = document.querySelector(elementToAppendChild);
            var parentDrawShape = findParentDrawShape(pathElem);
            if (!pathElem || !traceParent || !parentDrawShape) {
              console.log('ERROR: could not find elements with selector:', !pathElem && elementToTraceSelector, !traceParent && elementToAppendChild);
              return;
            }
          }
          var animName = options.anim_name;
          var elemOffset = SVGService.getShapeWidthHeight(element[0]).width;
          $timeout(function() {

          })
          var cssAnimObj = SVGService.generateCSSObjFromPath(animName, pathElem, elemOffset, options.should_rotate);
          console.log(cssAnimObj);
          var cssAnimObjString = [animName, options.duration, options.time_function, options.delay, options.iter_count, options.direction, options.fill_mode].join(' ');

          traceParent.appendChild(element[0]);
          $timeout(function() {
            parentDrawShape.classList.add('activate');
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
      })
    }
  }
    function findParentDrawShape(elem) {

        if (elem.nodeName === 'svg' || elem.hasAttribute('draw-shapes')) {
            return elem.hasAttribute('draw-shapes') && elem;
        } else {
          return findParentDrawShape(elem.parentNode);
        }
    }
}])
.directive('kf', ['$timeout', 'SVGService', function ($timeout, SVGService) {
  return {
      restrict: 'A',
      scope: {
            state: '=kfMode',
      },
      link: function(scope, element, attr) {
        scope.$watch('state', function(newValue, oldValue){

          var requestFrameHandle;
          if (!scope.state) {
            scope.state = 'stop';
            window.cancelAnimationFrame(requestFrameHandle);
          } else if (scope.state === 'paused') {
            window.cancelAnimationFrame(requestFrameHandle);
          } else if (scope.state === 'play' || scope.state === 'resume') {
            drawShape();
            if (!requestFrameHandle) {
              requestFrameHandle = 0;
            }

            var parentWidth = element[0].parentNode.getBoundingClientRect.width;
            var total_frames = ((parseInt(attr.kfDuration.replace('ms', ''))/1000).toFixed(2) * 60) || 60;
            var current_frame = total_frames * (parseInt(attr.cx.replace('%', ''))/100.0).toFixed(2) || 0;

            function drawShape() {
              var progress = current_frame/total_frames;
                if (progress >= 1) {
                   scope.state = 'stop';
                   element[0].style.cx = '0%';
                   window.cancelAnimationFrame(requestFrameHandle);
                }
                else if (scope.state === 'paused') {
                    window.cancelAnimationFrame(requestFrameHandle);
                }
                else {
                  current_frame++;
                  element[0].style.cx = (progress * 100) + '%';
                  requestFrameHandle = window.requestAnimationFrame(drawShape);
                }
              }
          }
        })
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
            }, drawShapesDelay);
          }
        })
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
                if (classArgs.indexOf("animIn") > -1) {
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
            args.forEach.call(function(word, index) {
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
.directive('onActivate', ['$timeout', '$parse', 'AnimationService',
  function ($timeout, $parse, AnimationService) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var activateClass = attr.onActivate;
      var animationObj;
      if (activateClass.split(':').length > 1 && activateClass.indexOf(':animIn') === -1 && activateClass.indexOf(':animOut') === -1 && activateClass.indexOf(':anim') > -1) {
        animationClass = activateClass.split(':anim')[0];
        animationObj = AnimationService.getCSSAnimationFromClassName(animationClass);
      }



      scope.$watch(function() {
        return element.attr('class');
      },function() {
        if (element[0].classList.contains('activate')) {

          element[0].classList.remove('activate')
          var delay = attr.onActivate || 0;
          var classes = attr.onActivate.split(", ");
          // $timeout(function() {
              for (var i = 0; i < classes.length; i++) {
                var indexClass = classes[i].split(":")[0];
                var classArgs = classes[i].split(":").slice(1);
                var elemArgDict = parseElemStateAttrValueArgs(classArgs);
                if (elemArgDict.unique) {
                //   $timeout(function() {
                    var elemsThatAlreadyHaveClass = document.querySelectorAll('.' + indexClass) || [];
                    for (var i = 0; i < elemsThatAlreadyHaveClass.length; i++) {
                      elemsThatAlreadyHaveClass[i].classList.remove(indexClass);
                    }
                //   });
                }
                if (classArgs.indexOf("animIn") > -1 && indexClass !== "null") {''
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateIn(element[0], indexClass, elemArgDict.delay);
                } else
                if (classArgs.indexOf("animOut") > -1 && indexClass !== "null") {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass +':keep';
                  }
                  AnimationService.animateOut(element[0], indexClass, elemArgDict.delay);
                } else
                if (classArgs.indexOf("anim") > -1 && indexClass !== "null") {
                  if (classArgs.indexOf("keep") > -1) {
                    indexClass = indexClass + ':keep';
                  }
                  AnimationService.animate(element[0], indexClass, animationObj, elemArgDict.delay);
                }
                else if (indexClass !== "null" && indexClass.length) {
                  element[0].classList.add(indexClass);
                }
                // if (classArgs.indexOf("unique") > -1) {
                //   var otherClassElems = document.querySelectorAll('.' + indexClass);
                //   for (var j = 0; j < otherClassElems.length; j++) {
                //     var otherElemIndex = otherClassElems[j];
                //     if (otherElemIndex !== element[0]) {
                //       otherElemIndex.classList.remove(indexClass);
                //     }
                //   }
                // }

                // if (classes[i].indexOf('inject') > -1 && classArgsHasInject(classArgs)) {
                //   var injectArgClassSplit = classArgsHasInject(classArgs).split("|")
                //   if (injectArgClassSplit.length > 1) {
                //     var classToInject = injectArgClassSplit[1];
                //     var elemToInjectSelector = injectArgClassSplit[0];
                //     var elemsToInject = document.querySelectorAll(elemToInjectSelector);
                //     for (var k = 0; k < elemsToInject.length; k++) {
                //       elemsToInject[k].classList.add(classToInject);
                //     }
                //   }
                // }
                if (elemArgDict.inject_elems && !elemArgDict.delay) {
                  for (var k = 0; k < elemArgDict.inject_elems.length; k++) {
                    elemArgDict.inject_elems[k].classList.add(elemArgDict.inject_class);
                  }
                } else if (elemArgDict.inject_elems && elemArgDict.delay) {
                  console.log('injecting...', elemArgDict.inject_class);
                  $timeout(function() {
                    for (var k = 0; k < elemArgDict.inject_elems.length; k++) {
                      elemArgDict.inject_elems[k].classList.add(elemArgDict.inject_class);
                    }
                  }, parseInt(elemArgDict.delay));
                }
              }
          // }, delay);

          if (attr.evalOnActivate) {
            $timeout(function() {
              scope.$apply(function(){
                var parsedExpr = $parse(attr.evalOnActivate)(scope);
                console.log(parsedExpr);

              })
            })
          }

          // function classArgsHasInject(args) {
          //   var injectArg = null;
          //   args.forEach.call(function(word, index) {
          //     if (word.indexOf("inject") > -1) {
          //       injectArg = args[index];
          //       return true
          //     };
          //   })
          //   return (injectArg && injectArg.replace("inject", ""));
          // }
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
                if (classArgs.indexOf("animIn") > -1 && indexClass !== "null") {
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
                        if (classArgs.indexOf("animIn") > -1) {
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

directive("elemStates", ["$timeout", 'AnimationService', 'UtilitiesService', function ($timeout, AnimationService, UtilitiesService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              //if its not an array then not qualified
              if (attr.elemStates.indexOf(']') === -1 || attr.elemStates.indexOf('[') === -1) return;
              var elemStates = UtilitiesService.removeAllOccurrancesArr(attr.elemStates, ['[', ']', ' ', "'", '"']).split(',')
              var processedElemStates = [];
              var elemClassAnimDict = {};
              for (var i = 0; i < elemStates.length; i++) {
                var onEnterAttr = 'on-' + elemStates[i] + '-enter';
                var onExitAttr = 'on-' + elemStates[i] + '-exit';

                //check if you defined those attr
                if (camelCase(onEnterAttr) in attr) {
                  processedElemStates.push(onEnterAttr);
                }
                if (camelCase(onExitAttr) in attr) {
                  processedElemStates.push(onExitAttr);
                }
              }
              for (j = 0; j < processedElemStates.length; j++)  {
                var attrName = processedElemStates[j];
                var animClass = element[0].getAttribute(attrName);

                if (animClass.indexOf(':animIn') === -1 && animClass.indexOf(':animOut') === -1 && animClass.indexOf(':anim') > -1) {
                  animationClass = animClass.split(':anim')[0];
                  animationObj = AnimationService.getCSSAnimationFromClassName(animationClass);
                  elemClassAnimDict[attrName] = animationObj;
                }
              }
              if (!element.attr('class')) {

                element[0].setAttribute('class', '');
              }

              scope.$watch(function() {

                return element.attr('class');
              }, function(newValue, oldValue) {
                for (var i = 0; i < processedElemStates.length; i++) {

                  if (newValue.split(' ').indexOf(processedElemStates[i]) > -1) {
                    element[0].classList.remove(processedElemStates[i]);
                    var elemStateValue = attr[camelCase(processedElemStates[i])];
                    var elemStateClass = elemStateValue.split(':')[0];
                    var elemArgDict = parseElemStateAttrValueArgs(elemStateValue.split(':').splice(1));

                    if (elemArgDict.unique) {
                    //   $timeout(function() {
                        var elemsThatAlreadyHaveClass = document.querySelectorAll('.' + elemStateClass) || [];
                        for (var i = 0; i < elemsThatAlreadyHaveClass.length; i++) {
                          elemsThatAlreadyHaveClass[i].classList.remove(elemStateClass);
                        }
                    //   });
                    // console.log(element[0], elemArgDict.unique, elemStateClass);
                    }
                    if (elemArgDict.animateIn) {

                      AnimationService.animateIn(element[0], elemStateClass, elemArgDict.delay);
                    } else if (elemArgDict.animateOut) {

                      AnimationService.animateOut(element[0], elemStateClass, elemArgDict.delay);
                    } else if (elemArgDict.animate) {

                      console.log(element[0], elemArgDict, elemStateClass, elemClassAnimDict);
                      AnimationService.animate(element[0], elemStateClass, elemClassAnimDict[processedElemStates[i]], elemArgDict.delay || 0);
                    }
                    else if (elemStateClass && elemStateClass.length && elemStateClass !== 'null') {

                      element[0].classList.add(elemStateClass);
                      if (elemArgDict.remove && elemArgDict.remove.length) {
                        if (elemArgDict.delay) {
                          $timeout(function() {
                            element[0].classList.remove(elemArgDict.remove);
                          }, elemArgDict.delay);
                        } else {
                          element[0].classList.remove(elemArgDict.remove);
                        }
                      }
                    }

                    if (elemArgDict.inject_elems && !elemArgDict.delay) {

                        for (var k = 0; k < elemArgDict.inject_elems.length; k++) {
                          elemArgDict.inject_elems[k].classList.add(elemArgDict.inject_class);
                        }
                    } else if (elemArgDict.inject_elems && elemArgDict.delay) {
                      $timeout(function() {
                        for (var k = 0; k < elemArgDict.inject_elems.length; k++) {
                          elemArgDict.inject_elems[k].classList.add(elemArgDict.inject_class);
                        }
                      }, parseInt(elemArgDict.delay))
                    }

                  }
                }
              });
          }
      }
}]).
directive("classOnClick", ["$timeout", 'AnimationService', function ($timeout, AnimationService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              element.on("click", function() {
                var delay = attr.classOnClickDelay || 0;
                var classes = attr.classOnClick.split(", ");
                $timeout(function() {
                    for (var i = 0; i < classes.length; i++) {
                      var indexClass = classes[i].split(":")[0];
                      var classArgs = classes[i].split(":").slice(1);
                      if (classArgs.indexOf("animIn") > -1) {
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
                      if (indexClass.indexOf('inject') > -1) {

                        var injectArgClassSplit = indexClass.split("|")
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
              });
            }
          }
}])
// .directive('onHover', ['$timeout', 'AnimationService', function ($timeout, AnimationService) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attr) {
//       var inTimeout = false;
//       var hoverAnim = attr.onHover.split(':')[0];
//       var hoverDelay = 250;
//       if (attr.onHover.split(':').length === 2 && attr.onHover.indexOf('delay-') > -1) {
//         hoverDelay = parseInt(attr.onHover.split(':')[1].replace('delay-', ''));
//       }
//       scope.$watch(function() {
//           return element.attr('class');
//         }, function(new_class) {
//           if (!new_class) {
//             element[0].className = ''
//           }
//           if (new_class && new_class.indexOf('activate-hover') > -1) {
//             element[0].classList.remove('activate-hover');
//             AnimationService.animateIn(element[0], hoverAnim, null);
//           }

//         })
//       element.on('mouseover', function () {
//         inTimeout = true;
//         $timeout(function () {
//           if (inTimeout) {
//             AnimationService.animateIn(element[0], hoverAnim, null);
//             scope.$apply();
//           }
//         }, 250 + hoverDelay);
//       });
//        element.on('mouseleave', function () {
//         inTimeout = false;
//       });
//     }
//   }
// }])



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
function removeAllOccurrancesArr(str, remove_arr_str) {
  for (var i = 0; i < remove_arr_str.length; i++) {
    var indexRemoveStr = remove_arr_str[i];
    str = replaceAll(str, indexRemoveStr, '');
  }
  return str;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

  function escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

}
function camelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

function classArgsHasInject(args) {
  console.log(args);
  return (args && args.length && (args.split('inject').length > 1)) || "";
}

function parseElemStateAttrValueArgs(arg_arr) {
    var resultDict = {};
    for (var i = 0; i < arg_arr.length; i++) {
      var indexArg = arg_arr[i];

      if (!indexArg || !indexArg.length) continue;

      if (indexArg === "animIn") {
        resultDict.animateIn = true;
      }
      if (indexArg.indexOf('delay-') > -1) {
        resultDict.delay = parseInt(indexArg.replace('delay-', ''))
      }
      if (indexArg === 'animOut') {
        resultDict.animateOut = true;
      }

      if (indexArg.indexOf('remove|') > -1) {
        resultDict.remove = indexArg.replace('remove|', '');
      }

      if (indexArg === 'anim') {
        resultDict.animate = true;
      }

      if (indexArg.indexOf('unique') > - 1) {
        if (indexArg.split('|').length === 2) {
          var supportedPipeArgs = ['hide', 'show', 'opacity-0'];
          var pipeArg = indexArg.split('|')[1];
          if (supportedPipeArgs.indexOf(pipeArg) > -1) {
            var pipe_index = supportedPipeArgs.indexOf(pipeArg);
            resultDict['unique_' + supportedPipeArgs[pipe_index]] = true;
          }
        }
        resultDict.unique = true;
      }
      // var hasInject = classArgsHasInject(indexArg);

      if (indexArg.indexOf('inject') > -1) {
        indexArg = indexArg.replace("inject", "");
        var injectArgClassSplit = indexArg.split("|");
        if (injectArgClassSplit.length > 1) {
          var classToInject = injectArgClassSplit[1];
          var elemToInjectSelector = injectArgClassSplit[0];
          var elemsToInject = elemToInjectSelector && document.querySelectorAll(elemToInjectSelector + '[' + classToInject + ']');
          if (elemsToInject && elemsToInject.length && elemToInjectSelector.length) {
            resultDict.inject_elems = elemsToInject;
            resultDict.inject_class = classToInject;
          }
        }
      }
    }
    return resultDict;
  }

