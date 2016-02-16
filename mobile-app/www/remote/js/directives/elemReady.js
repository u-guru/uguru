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
.directive('classOnActivate', ['$timeout', 'AnimationService', function ($timeout, AnimationService) {
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
                  console.log(otherClassElems);
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
                    console.log(elemToInjectSelector, classToInject, elemsToInject.length, 'elements');
                    for (var k = 0; k < elemsToInject.length; k++) {
                      elemsToInject[k].classList.add(classToInject);
                    }
                  }
                }
              }
          }, delay);
          function classArgsHasInject(args) {
            if (!args || !args.length) {
              return;
            }
            var injectArg = null;
            args.filter(function(word, index) {
              if (word.indexOf("inject") > -1) {
                injectArg = args[index];
                return true
              };
            })
            return injectArg && injectArg.replace("inject", "");
          }
        }
      })
    }
  }
}])
.directive('skrollr', function () {
      var obj = {
        link: function () {
          /* jshint ignore:start */
          // skrollr.init({skrollrBody:'skrollr-home'}).refresh();

          /* jshint ignore:end */
        }
      };
      return obj;
})
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
          var classTriggers
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
.directive('translateOnClick', function () {
    // add 'translate-to-click' to element to "declare" directive. "translate-active" is added to element if element does not have transform properties && transforms
    // add 'translate-to-elem'="#sample-selector" to element to link destination element
    // add 'translate-to-x'="200" to add 200px X offset (origin = bottom left);
    // add 'translate-to-y'="200" to add 200px Y offset (origin = bottom left);
    // add 'translate-back-class'="untransform-class-name1, untransform-class-name-2" adds the argument/class(es) when the transform is set to null (when element with attribute transforms)
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var elementBounding = element[0].getBoundingClientRect();
            var elemCoords = {height: elementBounding.height, width: elementBounding.width, top: elementBounding.top, left: elementBounding.left};

            var translateElem = attr.translateToElem;
            var translateElemBounding = document.querySelector(translateElem).getBoundingClientRect();
            var translateElemCoords = {height: translateElemBounding.height, width: translateElemBounding.width, top: translateElemBounding.top, left: translateElemBounding.left};
            element.on('click', function() {
              var injectOnTranslateClass = attr.translateOnClick || 'translate-active';
              if (!element[0].style.webkitTransform && !element[0].style.MozTransform && !element[0].style.msTransform && !element[0].style.OTransform && !element[0].style.transform) {
                var translateY = translateElemCoords.top - elemCoords.top + elemCoords.height - translateElemCoords.height + ((attr.translateYOffset && parseInt(attr.translateYOffset)) || 0);
                var translateX = translateElemCoords.left - elemCoords.left + ((attr.translateXOffset && parseInt(attr.translateXOffset)) || 0);
                var transFormString = "translate(" + translateX + "px, " + translateY + "px)"
                element[0].style.webkitTransform = transFormString;
                element[0].style.MozTransform = transFormString;
                element[0].style.msTransform = transFormString;
                element[0].style.OTransform = transFormString;
                element[0].style.transform = transFormString;
                element[0].classList.add(injectOnTranslateClass);
                console.log(translateElemCoords, elemCoords, transFormString, element[0], 'with Xoffset', attr.translateXOffset, 'and y offset', attr.translateYOffset);

                //deactivate other directives with transforms towards the same element "translate-to-elem";
                var allTranslateOnClickElems = element[0].querySelectorAll("[translate-on-click]");
                for (var i = 0; i < allTranslateOnClickElems.length; i++) {
                  var indexTranslateElem  = allTranslateOnClickElems[i];
                  indexTranslateElem.classList.remove(injectOnTranslateClass);
                  if (indexTranslateElem !== element[0]) {
                    var hasTranslateBackAttr = indexTranslateElem.getAttribute('translate-back-class');
                    if (hasTranslateBackAttr && hasTranslateBackAttr.length) {
                      var indexTranslateElemClasses = hasTranslateBackAttr.split(', ');
                      for (var j = 0; j < indexTranslateElemClasses.length; j++) {
                        var indexClassToAdd = indexTranslateElemClasses[j];
                        indexTranslateElem.classList.add(indexClassToAdd);
                        element[0].style.webkitTransform = null;
                        element[0].style.MozTransform = null;
                        element[0].style.msTransform = null;
                        element[0].style.OTransform = null;
                        element[0].style.transform = null;
                      }
                      setTimeout(function() {
                        for (var k = 0; k < indexTranslateElemClasses.length; k++) {
                          var indexClassToAdd = indexTranslateElemClasses[k];
                          indexTranslateElem.classList.remove(indexClassToAdd);
                        }
                      }, 2000);
                    }
                  }
                }
              }
            });
      }
    };
}).
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
                          element[0].classList.add(indexClass);
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
                        console.log(otherClassElems);
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
                          var elemToInject = document.querySelector(elemToInjectSelector);
                          elemToInject.classList.add(classToInject);
                        }
                        // var otherClassElems = document.querySelectorAll('.' + indexClass);
                        // console.log(otherClassElems);
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
                  if (!args || !args.length) {
                    return;
                  }
                  var injectArg = null;
                  args.filter(function(word, index) {
                    if (word.indexOf("inject") > -1) {
                      injectArg = args[index];
                      return true
                    };
                  })

                  return injectArg && injectArg.replace("inject", "");
                }
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
            console.log('anim exit down value has changed');
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
            console.log(element[0].attributes);
            $timeout(function() {
              if (!scope.page.waypoints[attr.animFirstEnterDown]) {
                scope.page.waypoints[attr.animFirstEnterDown] = {};
              }
              scope.page.waypoints[attr.animFirstEnterDown].hasFirstTimeEnter = true;
              scope.$watch('page.waypoints.' + attr.animFirstEnterDown + '.direction', function(isActive) {
                console.log(element[0], 'activated for first time enter down');
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
              console.log('wp parent declared', scope.page.waypoints.parent);
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
                  console.log('animOnShow triggered', newValue, element.hasClass(attr.animOnShow));
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

                console.log('binding wp', attr.bindWp, attr.bindWpClass, 'page.waypoints.' + attr.bindWp + '.activated');
                if (!attr.bindWpClass || !attr.bindWpClass.length) return;

                var classNames = attr.bindWpClass.split(', ')
                if (attr.bindWpDirection) {
                  var directionNames = attr.bindWpDirection.split(', ')
                } else {
                  var directionNames = ["down", "down", "down"]
                }

                scope.$watch('page.waypoints.' + attr.bindWp + '.activated', function(isActive) {
                  if (!scope.page.waypoints[attr.bindWp]) {
                    scope.page.waypoints[attr.bindWp] = {};
                  }
                  var direction = scope.page.waypoints[attr.bindWp].direction;
                  for (var i = 0; i < classNames.length; i++) {
                    var indexClassName = classNames[i];
                    var directionName = directionNames[i];
                    if (isActive && direction === 'down' && directionName === direction) {
                      element[0].classList.add(indexClassName);
                    } else if(isActive && direction === 'up'){
                      element[0].classList.remove(indexClassName);
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
                    console.log('ERROR: waypoint declaration for element', element[0].id || element[0].class, 'has more/less offsets declared than wp vars');
                    return;
                  }
                  console.log('initializing', elemHasManyWp.length, 'wp at once')
                  for (var i = 0; i < elemHasManyWp.length; i++) {
                    var indexWpName = elemHasManyWp[i];
                    var indexWpOffset = elemHasManyOffset[i];
                    console.log('initialized', indexWpName);
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