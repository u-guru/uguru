// todo now
// - animName: in, out, set, before, after, send, setTemp
// - anim
// - tween
// - verify trigger

// todo later
// - trigger args
// - replace trigger scope.watch for 'on' states with a class that initiates the watcher (to prevent future watchers)

angular.module('uguru.shared.directives')
.directive('syncWith', ['UtilitiesService', '$timeout', function(UtilitiesService, $timeout) {
  return {
    restrict: 'A',
    scope: false,
    link: {
      post: function(scope, element, attr) {
          scope.$watch('scroll.y', function(new_val, old_val) {
            element[0].style['transitionDuration'] = 100/Math.abs(old_val - new_val)
            element[0].style['opacity'] = (new_val/100)
          })
      }
    }
  }
}])
.directive('staggerChildren', ['UtilitiesService', 'DirectiveService', '$timeout', '$compile', function(UtilitiesService, DirectiveService, $timeout, $compile) {
  return {
    restrict: 'AE',
    replace:true,
    transclude:true,
    priority: 100,
      compile: function(element, attr, transclude) {
        // element[0].style.display = 'none';
          var elems = element[0].querySelectorAll('*')
          var attrDelay = attr.delay
          var attrInterval = attr.interval;
          var attrApply = attr.apply;
          var attrLength = element[0].attributes.length;
          var staggerDict = {};
          var postponedElem = [];
          //

          var stagDict = DirectiveService.processStaggerArgs(attr)
          // console.log('its compiling', attr.onEnter)
          console.log(stagDict)

          return {
            pre: function preLink(lScope, lElem, lAttr) {
              var parent = lElem.parent();


              parent[0].removeChild(lElem[0])
                  transclude(lScope, function(clone, innerScope) {

                    var clonedChildrenWithAttr = [];

                    // for (var i = 0; i < clone.length; i++) {
                    //   // console.log(angular.element(clone[i]).parent())
                    //   if (clone[i] && clone[i].attributes) {

                    //     clonedChildrenWithAttr.push(clone[i])
                    //   }
                    // }
                    // console.log(clonedChildrenWithAttr.length)
                    //go through each element
                    for (key in stagDict) {

                      var hasKey = key in stagDict && stagDict[key];
                      var stateTime = hasKey && 'time' in stagDict[key] && stagDict[key].time;
                      if (hasKey && stateTime && (!stateTime.values || !stateTime.values.length)) {
                        if (stateTime.valueFunc) {
                          stateTime.valueFunc(clone, stateTime);
                          // if ()
                        }
                      }
                    }
                    for (var i = 0; i < clone.length; i++) {
                      var iChild = clone[i];
                      for (key in stagDict) {
                          keyDashed = UtilitiesService.camelToDash(key).toLowerCase();

                          var hasAttribute = iChild.getAttribute && iChild.getAttribute(keyDashed);
                          if (hasAttribute && hasAttribute.length && stagDict[key].time) {



                            var keyAttr = hasAttribute
                            var selectorPrefs = stagDict[key].selector;

                            var matchesWithConstraints = DirectiveService.verifyStaggerChildSelector(selectorPrefs[0], iChild)
                            if (key.indexOf('when') > -1) {
                              console.log(stagDict[key], stagDict[key].time.values)
                            }
                            if (matchesWithConstraints && stagDict[key].time.values && stagDict[key].time.values.length) {
                              var delayVal = stagDict[key].time.values.shift();
                              // console.log(delayVal)
                              var extensionValue = '';
                              if (keyAttr.indexOf('^') > -1 && delayVal > 0) {
                                keyAttr = UtilitiesService.replaceAll(keyAttr, '^', 0);
                              }
                              if (delayVal > 0) {
                                extensionValue = ':' + 'delay-' + delayVal
                              }

                              // iChild.removeAttribute(keyDashed);
                              iChild.setAttribute(keyDashed, keyAttr + extensionValue);

                            }

                          }
                        }
                        iChild.removeAttribute && iChild.removeAttribute('style')
                        $compile(iChild)(innerScope)
                        clonedChildrenWithAttr.push(iChild);
                      }

                      clonedChildrenWithAttr.forEach(function(elem, i) {


                        // elem.setAttribute && setAttribute('style', '');
                        parent.append(elem)
                        // $compile(elem)(lScope)
                      })
                      $compile(parent)(lScope)

                  });

                },
          }
      }
  }
}])
.directive('scrollable', ['UtilitiesService', '$timeout', function(UtilitiesService, $timeout) {
  return {
    restrict: 'A',
    scope:false,
    link: {
      pre: function(scope, element, attr) {
        var scrollCmds = getScrollParams(attr.scrollable);
        var scrollName = scrollCmds.name;
        scope.scroll = {x: 0, y:0};


        var sListener = element[0].addEventListener('wheel', function(e) {
          getImptWheelAttr(e, scrollCmds);
          var offset = UtilitiesService.calcScrollOffset(element[0]);
          scope.scroll.x = offset.x;
          scope.scroll.y = offset.y;
          $timeout(function() {
            scope.$apply()
          })
        });

        function getImptWheelAttr(e, elem_cmds) {
          console.log(elem_cmds)
          var overrideX = elem_cmds.override && elem_cmds.override.indexOf('x') > -1;
          var overrideY = elem_cmds.override && elem_cmds.override.indexOf('y') > -1;
          var sendEvents = 'send' in elem_cmds
          etargetRect = e.target.getBoundingClientRect();
          var deltaX = e.deltaX;
          var deltaY = e.deltaY;
          if (overrideX && Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();

          }
          if (overrideY && Math.abs(deltaY) > Math.abs(deltaX)) {
            e.preventDefault();
          }

          if (sendEvents) {
            applySendEvents(e, elem_cmds);
          }

          return e;
        }

        function applySendEvents(e, elem_cmds) {
          console.log(elem_cmds)
          cmds = parseSendCommands(elem_cmds['send']);
          var offset = UtilitiesService.calcScrollOffset(e.target);
          for (var i = 0; i < cmds.length; i++) {
            var dim = cmds[i].dim;
            var oper = cmds[i].operand
            var val = cmds[i].value;
            var msgName = UtilitiesService.camelCase('when-' + cmds[i].eventName);

            if (oper === '+' && !val) {
              if (e['delta' + dim.toUpperCase()] > 0) {
                scope.$parent.root.public.customStates['when'][msgName] = {yOffset: offset.y/100}
              }
            }
            if (oper === '=' && val) {
              val = parseFloat(val.replace('%', ''))
              if (val === offset[dim]) {
                console.log(offset, msgName, offset.y/100)
                scope.$parent.root.public.customStates['when'][msgName] = true
              }

            }
            if (oper === '-' && !val) {
              if (e['delta' + dim.toUpperCase()] < 0) {
                scope.$parent.root.public.customStates['when'][msgName] = {yOffset: offset.y/100}
              }
            }

          }
        }

        function parseSendCommands(str) {
          str = UtilitiesService.removeAllOccurrancesArr(str, ['(', ')']);
          str = UtilitiesService.replaceAll(str, ' | ', '|');
          triggers = str.split('|');
          var commandArr = [];
          for (var i = 0; i < triggers.length; i++) {
            var triggerDict = {};
            var iTrigSplit = triggers[i].split('@')
            var iEvent = iTrigSplit[0];
            var iConstraint = iTrigSplit[1];
            triggerDict.eventName = iEvent;
            triggerDict.dim = iConstraint[0];
            triggerDict.operand = iConstraint[1];
            triggerDict.value = iConstraint.length > 1 && iConstraint.substring(2, iConstraint.length)
            commandArr.push(triggerDict);
          }
          return commandArr;
        }

        function getScrollParams(str) {
          var _dict = {};
          str=UtilitiesService.removeAllOccurrancesArr(str, ['[',']']);
          str=UtilitiesService.replaceAll(str, ', ', ',');
          var strSplit = str.split(':');
          if (!strSplit.length > 1) return _dict;
          strSplit = str.split(',')
          console.log(strSplit);
          for (var i = 0; i < strSplit.length; i++) {
            var itemSplit = strSplit[i].split(':')
            if (!itemSplit || !itemSplit.length) continue;
            itemKey = itemSplit[0];
            itemValue = itemSplit[1];
            _dict[itemKey] = itemValue;
          }
          return _dict;
        }
      }
    }
  }
}])
.directive('dynamicData', ['$timeout', 'RootService', function($timeout, RootService) {
  return {
    restrict: 'A',
    scope: false,
    link: {
      pre: function(scope, element, attr) {
          var queuedVal = null;
          var endListener = null;
          var browserName = RootService.getBrowserPrefix();
          if (browserName && browserName.length) {
            var animEndEventName = browserName + 'AnimationEnd';
          } else {
            var animEndEventName = animEndEventName;
          }

          attr.$observe('dynamicData', function(val, old_val) {

            console.log(val, old_val)

          })

          $timeout(function() {
            element[0].classList.add('on-exit');
          }, 5000)
      }
    }
  }
}])
.directive('initWith', ['DirectiveService', 'UtilitiesService', function(DirectiveService, UtilitiesService) {
  return {
    restrict: 'A',
      link: {
        pre: function(scope, element, attr) {

          scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);

          var switchDict;
          var elemArgs = DirectiveService.parseArgs(attr.initWith, 'init-with', element);
          var listenerArgs = DirectiveService.detectExternalStates(attr);
          for (key in listenerArgs) {
            var type = listenerArgs[key].type
            var _attr = listenerArgs[key].attr;

            DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
          }
          var switchName = attr.switch && attr.switch.split(':')[0];
          var switchId = 'switch-id' in attr && attr['switch-id'] && parseInt(attr['switch-id'])
          if ('initLater' in attr) {

            scope.$watch(function() {
              return element.attr('class');
            }, function(new_classes, old_classes) {
              if (new_classes && new_classes.indexOf('init-with') > -1) {
                console.log('initializing');
                element[0].classList.remove('init-with');
                execInitWith(scope);
              }
            })




            return
          }

          if ('switch' in attr && 'switch-id' in attr) {
              switchId = parseInt(attr['switch-id'])
              var scopeSwitches = scope.switchDict[switchName].switches;
              var switchRef = scopeSwitches[switchId - 1];
              if ('default' in switchRef) {
                var defaultArgAttrName = 'on-switch-' + UtilitiesService.camelToDash(switchName).toLowerCase() + '-' + switchRef['default'];
                var defaultStateArgs = UtilitiesService.camelCase(defaultArgAttrName)
                switchDict = DirectiveService.parseArgs(attr[defaultStateArgs]);
              }
          }

          execInitWith(scope, switchDict);

          function execInitWith(scope, has_switch_default) {

            var supportedCommands = DirectiveService.supportedCommands;
            for (key in elemArgs) {
              var switch_interference = has_switch_default && (key in has_switch_default)
              if (supportedCommands.indexOf(key) > -1 && !switch_interference) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
              } else if (switch_interference) {
                DirectiveService.activateArg(key, has_switch_default[key], scope, element)
                var switchObjRef = scope.switchDict[switchName].switches[switchId - 1]
                if (switchId && switchObjRef && switchObjRef.active && switchObjRef.default === 'active') {
                  scope.switchDict[switchName]['activeSwitches'].push(switchId)
                }
              }
            }


          }
        }
      }
    }
}])
.directive("uClass", ["$compile", "ElementService", function($compile, ElementService) {
      return {
          restrict: 'E',
          replace: true,
          priority:1,
          compile: function(element, attr, transclude) {
            attr.prefix && attr.prefix.length && ElementService.addShortcuts(attr.prefix, element[0].childNodes, attr);
            // return {
            //       pre:
            //         function (scope, lElem, lAttr) {
            //           attr.prefix && attr.prefix.length && ElementService.addShortcuts(attr.prefix, lElem[0].childNodes, attr);
            //         }
            // }
          }
        }
}])
.directive("u", ["$compile", "ElementService", "$timeout", function($compile, ElementService, $timeout) {
      return {
          restrict: 'A',
          replace: true,
          transclude: true,
          priority:100,
          compile: function(element, attr, transclude) {
              this.states = ElementService.renderElementStates(element, attr);
              var states = this.states;
              if (this.states.init) {
                console.log(this.states.init)
                this.states.init.forEach(function(state, i) {
                  state.exec(element);
                })
              }


              return {
                  pre: function (scope, lElem, lAttr) {

                      if (states.on) {
                        states.on.forEach(function(state, i) {
                          if (state.actions.debug) {
                            ElementService.launchExternalWindow(state.actions.debug, element);
                          }
                          state.exec(lElem, scope);

                        })
                      }
                      if (states.when) {
                        states.when.forEach(function(state, i) {

                          if (state.name.indexOf('debug') > -1) {

                            ElementService.launchExternalWindow(state.actions.anim, element);
                          }
                          console.log('registering', state.name)
                          state.exec(lElem, scope);
                        })
                      }
                      transclude(scope, function(clone, innerScope) {
                              $compile(clone)(scope);
                              lElem.append(clone);
                      });

                  },
                  post: angular.noop
              }
          }
      }
}])
.directive("initLater", ["CompService", "$compile", function(CompService, $compile) {
      return {
          restrict: 'A',
          replace: true,
          transclude: true,
          priority:1,
          compile: function(element, attr, transclude) {

              return {
                  pre:
                  function (scope, lElem, lAttr) {


                      scope.$watch(function() {
                        return element.attr('class');
                      }, function(new_classes) {

                        if (new_classes && new_classes.indexOf('init') > -1) {

                          transclude(scope, function(clone, innerScope) {
                              $compile(clone)(innerScope)
                              lElem.append(clone)
                          })

                        }
                      })

                  },
                  post: angular.noop
              }
          }
      }
}])

// .directive('initLater', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
//   return {
//     restrict: 'A',
//     priority: 999,
//     terminal: true,
//       link: {
//         pre: function(scope, element, attr) {



//           attr.$set('ngHide', true);
//           attr.$set('initLater', null);
//           $compile(element[0])(scope);


//           scope.$watch(function() {
//             return element.attr('class');
//           }, function(new_classes, old_classes) {
//             attr.$set('ngHide', false);
//             new_classes = new_classes || '';
//             if (new_classes.indexOf('init-later') > -1) {
//               var elemArgs = DirectiveService.parseArgs(attr.initLater, 'init-later', element);
//               var listenerArgs = DirectiveService.detectExternalStates(attr);

//               var supportedCommands = DirectiveService.supportedCommands;
//               for (key in elemArgs) {
//                 if (supportedCommands.indexOf(key) > -1) {
//                     DirectiveService.activateArg(key, elemArgs[key], scope, element);
//                 }
//               }

//               for (key in listenerArgs) {
//                 var type = listenerArgs[key].type
//                 var _attr = listenerArgs[key].attr;
//                 DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
//               }
//             }
//           })
//       }
//     }
//   }
// }])
// .directive('counter', ['$timeout', '$interval', function ($timeout, $interval) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attr) {
//       var counterMax = attr.counterMax;
//       var counterMin = attr.counterMin || 0;
//       var counterSuffix = attr.counterSuffix || '';
//       var counterPrefix = attr.counterPrefix || '';
//       var counterDuration = attr.counterDuration || '';
//       if (attr.initOnClass && attr.initOnClass.indexOf('counter:') > -1 && counterMax) {
//         var initOnClassArgs = attr.initOnClass.split(', ');
//         var initCounterClassIndex = getClassArgIndex('counter', initOnClassArgs)
//         var initCounterClassArr = initOnClassArgs[initCounterClassIndex].split(':')
//         if (initCounterClassArr.length === 2) {
//           initCounterClass = initCounterClassArr[1];
//         }
//         if (initCounterClass) {
//           scope.$watch(function() {
//             counterMax = attr.counterMax;
//             var counterDuration = attr.counterDuration || '';
//             return (element.attr('class') && element.attr('class').indexOf(initCounterClass) > -1) || "";
//
//           },function(elem_has_init_counter_class) {
//             if (elem_has_init_counter_class) {
//               $timeout(function() {
//                 scope.$apply(function() {
//                   element[0].classList.remove(elem_has_init_counter_class);
//                 })
//               });
//               if (!element[0].id) {
//                 var numCounterElems = document.querySelectorAll('[counter]').length + 1
//                 element[0].id = 'counter-' + numCounterElems;
//               }
//               var counterArgs = {
//                   useEasing : false,
//                   useGrouping : false,
//                   separator : ',',
//                   decimal : '.',
//                   prefix : counterPrefix ,
//                   suffix : counterSuffix
//               }
//               var counterDelay = attr.counterDelay;
//               var counterInfinite = attr.counterInfinite;
//               var counterDuration = attr.counterDuration;
//               if ('counterInfinite' in attr) {
//                 var counterTimeBetween = attr.counterInfiniteInBtwn || 0;
//                 if (counterDelay) {
//                   $timeout(function() {
//                     $interval(function() {
//                       var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
//                       countUpInstance.start();
//                     }, parseInt(counterDuration) * 1000 + parseInt(counterTimeBetween) * 1000 + 1000)
//                   }, parseInt(counterDelay))
//                 } else {
//                   $interval(function() {
//                     var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
//                     countUpInstance.start();
//                   }, parseInt(counterDuration) * 1000 + parseInt(counterTimeBetween) * 1000);
//                 }
//
//               } else {
//                 if (counterDelay) {
//                   $timeout(function() {
//                     var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
//                     countUpInstance.start();
//                   }, parseInt(counterDelay))
//                 } else {
//                     var countUpInstance = new CountUp(element[0].id, parseInt(counterMin), parseInt(counterMax), 0, parseInt(counterDuration), counterArgs);
//                     countUpInstance.start();
//                 }
//               }
//             }
//           })
//         }
//       }
//
//       function getClassArgIndex(arg_name, class_arr) {
//         for (var i = 0; i < class_arr.length; i++) {
//           var indexClass = class_arr[i];
//           if (indexClass.indexOf(arg_name + ':') > -1) {
//             return i;
//           }
//         }
//       }
//
//     }
//   }
// }])
.directive('desktop', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    priority: 1,
    require: '^?RootController',
      link: {
        pre: function(scope, element, attr) {
          if (!scope.root.window.desktop) {
            attr.$set('ngIf', scope.root.window.desktop);
            $compile(element[0])(scope);
          } else {
            attr.$set('desktop', null);
          }
      }
    }
  }
}])
.directive('mobile', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    require: '^?RootController',
    priority: 1,
      link: {
        pre: function(scope, element, attr) {
          if (!scope.root.window.mobile) {
            attr.$set('ngIf', scope.root.window.mobile);
            $compile(element[0])(scope);
          } else {
            attr.$set('mobile', null);
          }
      }
    }
  }
}])
.directive('onInit', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        element.ready(function() {
          onInitReadyFunc();
        })


        scope.$watch(function() {
              return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-init') > -1) {
            element[0].classList.remove('on-init');
            onInitReadyFunc();
          }
        })

        function onInitReadyFunc() {

          var elemArgs = DirectiveService.parseArgs(attr.onInit, 'on-init', element);
          var listenerArgs = DirectiveService.detectExternalStates(attr);

          var supportedCommands = DirectiveService.supportedCommands;
          for (key in elemArgs) {
            if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
            }
          }

          for (key in listenerArgs) {
            var type = listenerArgs[key].type
            var _attr = listenerArgs[key].attr;
            DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
          }
        }

      }
    }
  }
}])
.directive('initDefault', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attr, controller) {
          var listenerArgs = DirectiveService.detectExternalStates(attr);
          for (key in listenerArgs) {
            var type = listenerArgs[key].type
            var _attr = listenerArgs[key].attr;
            DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
          }
    }
  }
}])
// .directive('u', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attr, controller) {
//           var listenerArgs = DirectiveService.detectExternalStates(attr);
//           if ('switch' in attr) {
//             console.log('initializing', attr.switch)
//           }
//           for (key in listenerArgs) {
//             var type = listenerArgs[key].type
//             var _attr = listenerArgs[key].attr;
//             DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
//           }
//     }
//   }
// }])

.directive('onEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        console.log(element[0])
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onEnter, 'on-enter', element);
        var supportedCommands = DirectiveService.supportedCommands;
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-enter') > -1) {
            element[0].classList.remove('on-enter');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        });
      }
    }
  }
}])


.directive('onChange', ['$timeout', 'DirectiveService', '$parse', '$compile', function ($timeout, DirectiveService, $parse, $compile) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {


        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onChange);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-change') > -1) {
            console.log('onChange elem args', attr.onChange, elemArgs)
            element[0].classList.remove('on-change');
            // element[0].style.opacity = 0;
            var formattedAttrOnChange = (attr.onChange + "").replace('[', '').replace(']', '');
            var func = $parse(elemArgs.eval.functions[0].custom);
            // element[0].style.opacity = 0;
            var temp = element[0].style.display + '';
            element[0].style.display = 'none';
            func(scope.$parent);
            // $compile(element)(scope);
            element[0].style.display = temp;
            $timeout(function() {
              // element[0].style.opacity = 1;
            // $compile(element)(scope);
              element[0].classList.add('on-enter');
              // element[0].style.opacity= 1;
            });

            // $timeout(function() {

            //   // scope.$apply();

            // })
            // $timeout(function() {
            //   element[0].style.opacity = 1;
            // }, 100)
            // $timeout(function() {
            //   // scope.$apply();
            //   element[0].style.opacity = 1;
            // })
            // for (key in elemArgs) {
            //   if (supportedCommands.indexOf(key) > -1) {
            //     DirectiveService.activateArg(key, elemArgs[key], scope, element);
            //   }
            // }
          }
        });

        // var elemArgs = DirectiveService.parseArgs(attr.onChange);
        // var supportedCommands = DirectiveService.supportedCommands;
        // scope.$watch(function() {
        //   return element.attr('class');
        // }, function(new_classes, old_classes) {
        //   if (new_classes && new_classes.indexOf('on-enter') > -1) {
        //     element[0].classList.remove('on-enter');
        //     for (key in elemArgs) {
        //       if (supportedCommands.indexOf(key) > -1) {
        //         DirectiveService.activateArg(key, elemArgs[key], scope, element);
        //       }
        //     }
        //   }
        // });
      }
    }
  }
}])
.directive('onExit', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onExit, 'on-exit', element);
        var supportedCommands = DirectiveService.supportedCommands;
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-exit') > -1) {
            element[0].classList.remove('on-exit');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        });
      }
    }
  }
}])
.directive('onClick', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onClick, 'on-click', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('click', function () {
          console.log('click activated');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onBlur', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onBlur, 'on-blur', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('blur', function () {
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onFocus', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onFocus, 'on-focus', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('focus', function () {
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onValid', ['$timeout', 'DirectiveService', function($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        if (!attr.onValid || !attr.onValid.length) return;
        var stringValidArgsSplit = attr.onValid.split(':]')
        var parseArgStr = stringValidArgsSplit[0] + ':]';
        var evalFuncStr = stringValidArgsSplit[1];
        var elemArgs = DirectiveService.parseArgs(parseArgStr, 'on-valid', element);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {


            if (new_classes && new_classes.indexOf('on-valid') > -1) {
              var func = $parse(evalFuncStr);
              if (func(scope) || func === 'true') {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
              }
            }
        });
      }
    }
  }
}])
.directive('onInvalid', ['$timeout', 'DirectiveService', function($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        if (!attr.onInvalid || !attr.onInvalid.length) return;
        var stringInValidArgsSplit = attr.onInvalid.split(':]')
        var parseArgStr = stringInValidArgsSplit[0] + ':]';
        var evalFuncStr = stringInValidArgsSplit[1];
        var elemArgs = DirectiveService.parseArgs(parseArgStr, 'on-invalid', element);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
            if (new_classes && new_classes.indexOf('on-invalid') > -1) {
              var func = $parse(evalFuncStr);
              if (!func(scope) || func === 'false') {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
              }
            }
        });
      }
    }
  }
}])
.directive('onMouseEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseEnter, 'MouseEnter', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var mouseEnterDelay = parseInt(attr.onMouseEnterDelay) || 250;
        element.on('mouseenter', function () {
            var inTimeout = true;
            $timeout(function () {
              if (inTimeout) {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
                scope.$apply();
              }
            }, mouseEnterDelay);
        });

        element.on('mouseleave', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('onMouseOver', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseOver, 'MouseOver', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var hoverDelay = parseInt(attr.onMouseOverDelay || DirectiveService.defaults.activate.hover) || 500;
        element.on('mouseover', function () {
          inTimeout = true;
          $timeout(function () {
            if (inTimeout) {
              for (key in elemArgs) {
                if (supportedCommands.indexOf(key) > -1) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
                }
              }
              scope.$apply();
            }
          }, hoverDelay);
        });
         element.on('mouseleave', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('onMouseLeave', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseLeave, 'MouseLeave', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var mouseLeaveDelay = parseInt(attr.onMouseLeaveDelay) || 250;


        element.on('mouseleave', function () {
            var inTimeout = true;
            $timeout(function () {
              if (inTimeout) {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
                scope.$apply();
              }
            }, mouseLeaveDelay);
        });

        element.on('mouseenter', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('draw', ['$timeout', 'SVGService', '$compile', function ($timeout, SVGService, $compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clonedElem = element[0].cloneNode(true);
      var currentFrame = parseInt(attr.initFrame) || 0;
      var delay = attr.drawDelay || 0;
      var totalFrames = SVGService.computeDrawDuration(attr.drawDuration) || 60;
      var svgPaths = element[0].querySelectorAll('path:not([draw]):not([draw-ignore]), line:not([draw]):not([draw-ignore]), circle:not([draw]):not([draw-ignore]), rect:not([draw]):not([draw-ignore]), polygon:not([draw]):not([draw-ignore])');

      $timeout(function() {
        element[0].classList.add('activate');
      }, 2000)
      scope.$watch(function() {
        return element.attr('class');
      }, function(new_value) {
        if (new_value && new_value.indexOf('activate') > -1) {
            if (element[0].nodeName !== 'path') {
              var path = SVGService.svgShapeToPath(element[0])[0];
              element[0].parentNode.replaceChild(path, element[0]);
            } else {
              var path = element[0];
            }

            var pathLength = path.getTotalLength()
            var _default = path.style.fill;
            path.style.fill = 'none';
            path.style.strokeDashoffset = pathLength;
            path.style.strokeDasharray = pathLength;
            path.style.webkitTransition = 'all 3000ms ease-out';
            $timeout(function() {
              path.style.strokeDashoffset = 0;
              path.style.strokeDasharray = 0;
              path.style.fill = _default;
              // path.style.strokeWidth = '5';
              // path.style.fill = defaultPath;
            }, 1000)
            // SVGService.drawOneShape(path, 50, pathLength, pathLength)



          // pathLength = SVGService.getTotalPathLength(path[0]);

          // var transitionStr = ['stroke-dashoffset', attr.drawDuration || '250ms', 'ease'].join(' ');
          // element.css('-webkit-transition', transitionStr);
          // element[0].style.strokeDashoffset = 0;
        }

        // element[0].style.stroke = 'blue';
        // if (element[0].classList.contains('activate') || (attr.drawOnClass && element[0].classList.contains(attr.drawOnClass))) {
        //     console.log(attr.drawDuration, pathLength/2, totalFrames)
        //     $timeout(function() {
        //       //concurrent case
        //       var startTime = new Date().getTime();
        //       var requestFrameHandle = 0;
        //       function draw() {
        //         var progress = currentFrame/totalFrames;
        //         if (progress > 1) {
        //           var endTime = new Date().getTime();
        //            window.cancelAnimationFrame(requestFrameHandle);
        //         } else {
        //           currentFrame++;
        //           for(var j=0; j<svgPaths.length;j++){
        //             svgPaths[j].style.strokeDasharray += ' ' + pathLength;
        //           }
        //           requestFrameHandle = window.requestAnimationFrame(draw);
        //         }
        //       }
        //       draw()
        //     }, drawShapesDelay);
        //   }

        })
      }
    }
}])

.directive('customShortcuts', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : {
      pre: function(scope, element, attr) {
        attr.$set('ngHide', true);
        scope.root.public.customShortcuts = {state: {}, args: {}, cssProps:{}, cssPropValues:{}, cmds:{}};
        DirectiveService.setShortcutDict(scope.root.public.customShortcuts);
      }
    }
  }
}])
.directive('argShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.args)) {
            scope.root.public.customShortcuts.args[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('animPropShortcut', ['$timeout', 'AnimationFrameService', function ($timeout, AnimationFrameService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
      var defaultArr = ['stream', 'default', 'custom', 'name', 'start', 'end', 'duration', 'easingFunc', 'delay', 'iter', 'direction'];
        if (!scope.root.public.customShortcuts.animProps) {
          scope.root.public.customShortcuts.animProps = {};
          defaultArr.forEach(function(name, i) {
            scope.root.public.customShortcuts.animProps[name] = {};
          })
        }
        //if not Arg
        if (!attr.arg || ('arg' in attr && defaultArr.indexOf(attr.arg.toLowerCase()) === -1)) return;
        if ('replace' in attr && 'with' in attr) {
          scope.root.public.customShortcuts.animProps[attr.arg][attr.replace] = attr.with;
        }
        if ('for' in attr && 'setDefault' in attr) {
          scope.root.public.customShortcuts.animProps[attr.arg][attr.for] = attr.setDefault;
        }
    }
  }
}])
.directive('propShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cssProps)) {
            scope.root.public.customShortcuts.cssProps[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('propValueShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cssPropValues)) {
            scope.root.public.customShortcuts.cssPropValues[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('cmdShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cmds)) {
            scope.root.public.customShortcuts.cmds[attr.with] = attr.replace;
          }
        }
    }
  }
}])

.directive('customStates', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    link: {
      pre: function(scope, element, attr) {
        var customStateDict = DirectiveService.parseCustomStateAttr(attr);
          for (key in customStateDict) {
            if (!(key in scope.root.public.customStates)) {
              scope.root.public.customStates[key] = {};
            }
            //if not arr
            if (!customStateDict[key].length) continue;

            var customKeyStates = customStateDict[key];
            for (var i = 0; i < customKeyStates.length; i++) {
              var camelCaseCustomState = UtilitiesService.camelCase(customKeyStates[i]);
              var watchState = 'root.public.customStates.' + key + '.' + camelCaseCustomState;
              scope.root.public.customStates[key][camelCaseCustomState] = false;
              scope.$watch(watchState, function(new_value) {
                // console.log('watching..', camelCaseCustomState, watchState, new_value);
              });
              // scope.$watch
            }
          }
      }
    }
  }
}])
.
directive("evalOnInit", ["$timeout", 'AnimationService', '$parse', function($timeout, AnimationService, $parse) {
      return {
          restrict: 'A',
          link: {pre: function(scope, element, attr) {
                var func = $parse(attr.evalOnInit);
                func(scope);
                $timeout(function() {
                  scope.$apply();
                })
              }
          }
      }
}])
.
directive("evalOnReady", ["$timeout", '$parse', function($timeout, $parse) {
      return {
          restrict: 'A',
          link: {post: function(scope, element, attr) {
                element.ready(function() {
                  var func = $parse(attr.evalOnReady);
                  func(scope);
                  $timeout(function() {
                    scope.$apply();
                  })
                })
              }
          }
      }
}])
.directive('classOnInit', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.ready(function(){

        if (attr.classOnInit && attr.classOnInit.length) {
          var args = attr.classOnInit.split(':');
          if (args.length > 1 && args[1].split('delay').length > 1) {
            var delay = parseInt(args[1].replace('delay-', ''));
            var className = args[0];
            $timeout(function() { element[0].classList.add(className); }, delay)
          }
          element[0].classList.add(attr.classOnInit)
        }
        return;
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
.directive("inspect", ['$timeout', 'RootService', '$compile', 'AdminInspectService',
  function($timeout, RootService, $compile, AdminInspectService) {
      return {
        restrict: 'C',
        scope: false,
        priority: 10000,
        replace: true,
        link: {
          pre: function(scope, element, attr) {
            'initLater' in attr && element.removeAttr('init-later');


            if (scope.root.inspectCount) {
              scope.root.inspectCount += 1;
            } else {
              scope.root.inspectCount = 1;
            }

            var inspect_index = element[0].classList && element[0].classList.value.indexOf('inspect-');

            if (inspect_index > -1) {

              var stateToTrigger = element[0].classList.value.split('inspect-')[1];
              stateToTrigger = stateToTrigger.split(' ')[0];

              //inspect requirement
              if (stateToTrigger.indexOf('on-') > -1) {
                element[0].classList.add(stateToTrigger);
                element.ready(function() {
                  element.triggerHandler(stateToTrigger.replace('on-', ''));
                })
              }



            } else {
              //inspect main
              scope.root.inspect = true;
              console.log('set to true', scope.root.inspect = true);
              element.ready(function() {
                initInspector();
              })
            }


            // document.body.addEventListener()

            // console.log('initializing inspector')
            function initInspector() {
              scope.state = {play: false, pause: false, complete: false, timer: {start:0, pause:0}};
              scope.$watch(function() {
                return element.attr('style');
              }, function(new_style, old_classes) {
                if (new_style && !scope.play) {
                  scope.originalStyle = new_style;

                  scope.origProp = {duration: getDuration(element), transition: (element[0].style.webkitTransition || element[0].style.webkitTransition)}
                  scope.props = {arr: AdminInspectService.getPropArr(new_style), duration: scope.origProp.duration, transition: scope.origProp.transition, style: new_style};
                  scope.parsedAttr = AdminInspectService.getAttrDict(scope, element, attr, new_style);
                  scope.play = getPlayFunction(element, attr, scope.props, scope.state, scope)
                  scope.pause = getPauseFunction(element, attr, scope.props, scope.state, scope)
                  scope.update = getUpdateFunction(element, attr, scope.props, scope.state, scope);
                  attr.$set('style', null);
                  scope.props.attr = scope.parsedAttr;
                  initPlayer(scope);
                }
              })
            }
            // }
          }
        }
      }

      function getPauseFunction(element, attr, props, state) {
        return function() {
          state.pause = true;
          state.play = false;
          state.timer.pause = state.timer.pause + (new Date().getTime() - state.timer.start);
          computedStyle = window.getComputedStyle(element[0]);
          props.arr = AdminInspectService.getPropArr('transform:' + computedStyle.getPropertyValue('transform') +';' +element[0].getAttribute('style'))
          state.playerPos = state.timer.pause
          element.css('transform', computedStyle.getPropertyValue('transform') || computedStyle.getPropertyValue('webkit-transform'));
          element.css('transition', null);
          element.css('webkit-transition', null);
          console.log(state.pause, state.play, state.timer.pause)
        }
      }

      function getUpdateFunction(element, attr, props, state, scope) {
        return function(value) {
          state.timer.pause = true;
          state.play = false;
          state.timer.pause = value;
          attr.$set('style', null);
          $timeout(function() {
            scope.$apply();
            attr.$set('style', props.style);
            element.css('transition-delay', (state.timer.pause * -1) + 'ms');
            element.css('-webkit-transition-delay', (state.timer.pause * -1) + 'ms');
            computedStyle = window.getComputedStyle(element[0]);
            element.css('transform', computedStyle.getPropertyValue('transform') || computedStyle.getPropertyValue('webkit-transform'));
            $timeout(function() {
              scope.$apply();
              element.css('transition', null);
              element.css('webkit-transition', null);
            })
          })
        }
      }

      function getPlayFunction(element, attr, props, state, scope) {
        return function() {




          if (state.pause && state.timer.pause) {
            var durationOffset = props.duration - state.timer.pause;
            attr.$set('style', props.style);
            element.css('transition-duration', durationOffset + 'ms');
            element.css('webkit-transition-duration', durationOffset + 'ms');
            bindElementWithTransitionEnd();
          } else {
            bindElementWithTransitionEnd();
            attr.$set('style', props.style);
          }
          state.timer.start = new Date().getTime();
          state.play = true;

          function bindElementWithTransitionEnd()  {
            element.bind('webkitTransitionEnd', function() {
              state.play = false;
              state.pause = false;
              state.complete = true;
              state.timer.start = 0;
              state.timer.pause = 0;
              attr.$set('style', null);
              $timeout(function() {
                scope.$apply()
              })
              // attr.$set('style', props.style);

            })
          }

        }
      }

      function initPlayer(scope) {
          var div = document.querySelector('#transition-player');
          scope.name = 'player'
          if (!div) {
            div = document.createElement('div');
            div.classList.add('full-x', 'fixed', 'top-0', 'left-0', 'animated', 'slideInDown');
            div.style.zIndex = 100000;
            div.id = 'transition-player';
            div.innerHTML = '<player play=play root=root pause=pause state=state update=update props=props start-offset=state.timer.pause duration=duration></player>'
            document.querySelector('ui-view').appendChild(div)
          }

          scope.playerPos = 0
          scope.duration = 2000;
          $compile(div)(scope)
          $timeout(function() {
            scope.$apply();
          })
      }

      function getDuration(element) {
        return parseFloat((element[0].style.webkitTransitionDuration || element[0].style.transitionDuration).split('ms')[0]);
      }
}])
.directive('switches', ['$state', '$timeout', 'DirectiveService', 'UtilitiesService', 'SwitchService', function($state, $timeout, DirectiveService, UtilitiesService, SwitchService) {
    return {
      restrict: 'A',
      scope: {},
      link: function preLink(scope, element, attr) {
        if (!attr.switches || !attr.switches.length) {
          return;
        }

        scope.root = scope.$parent.root;
        // var listenerArgs = DirectiveService.detectExternalStates(attr);

        // for (key in listenerArgs) {

        //     var type = listenerArgs[key].type
        //     var _attr = listenerArgs[key].attr;
        //     console.log(type, attr);
        //     DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);

        //   }
        var supportedCommands = DirectiveService.supportedCommands;
        scope.switches = SwitchService.parseSwitches(element, attr);
        var classesToWatch = [];
        if (scope.switches.classes) {




          classesToWatch = scope.switches.classes;
          delete scope.switches.classes['classes']
          scope.$watch(
            function() {
              return element.attr('class');
            },
            function(new_classes, old_classes) {
              if (!new_classes) {
                return;
              }
              var modifiedClasses = [];

              classesToWatch.forEach(
                function(c, i) {
                  if (new_classes.indexOf(c) > -1) {
                    modifiedClasses.push(c);
                    element[0].classList.remove(c);
                  }
              });
              for (var i = 0; i < modifiedClasses.length; i++) {
                var iClass = modifiedClasses[i];
                for (key in scope.switches) {
                  if (scope.switches[key].nameDashed === iClass) {
                    var iSwitchObj = scope.switches[key];
                    break;
                  }
                }
              }
              if (iSwitchObj) {
                iSwitchObj.value = !iSwitchObj.value;
                var stateValue = (iSwitchObj.value && 'on') || 'off';
                if (stateValue in iSwitchObj) {
                  var elemArgs = iSwitchObj[stateValue].args;
                  for (key in elemArgs) {
                    if (supportedCommands.indexOf(key) > -1) {
                      console.log(key, elemArgs[key])
                      DirectiveService.activateArg(key, elemArgs[key], scope, element);
                    }
                  }
                }
              }
            }
          );
        }
        // console.log(scope.switches);

        // scope.switchClasses = [];
        // for (key in attr) {
        //   console.log(key);
        // }
      }
    }
}])
.directive('switch', ['$state', '$timeout', 'DirectiveService', function($state, $timeout, DirectiveService) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attr) {
        //shortcut
        scope.switch = {name: null, value:false};

        if ('switchOn' in attr) {
          scope.switch.on = {args: DirectiveService.parseArgs(attr.switchOn)}
        }

        if ('switchOff' in attr) {
          scope.switch.off = {args: DirectiveService.parseArgs(attr.switchOff)}
        }
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes) {
          if (new_classes && new_classes.indexOf('switch-toggle') > -1) {

            element[0].classList.remove('switch-toggle');
            scope.switch.value = !scope.switch.value;
            var toggleValue = scope.switch.value && 'on' || 'off';

            var elemArgs = scope.switch[toggleValue].args;

            var supportedCommands = DirectiveService.supportedCommands;

            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        })
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
.directive('rootAnimation', [function () {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, element, attr) {
        if (attr.off) {
          scope.root.animStatus.off = true;
        }
      }
    }
}])
.directive('swiper', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        type: '=type',
      },
      template: '<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
      transclude: true,
      replace: true,
      link: {
        pre: function (scope, element, attr, controllerFn, transclude, data) {

          var swiperOptions = {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 100,
            effect: 'coverflow',
            speed: 600,
            coverflow: {
              slideShadows: false
            },
            paginationClickable: true,
            keyboardControl: true,
            parallax: true,
            ref: 'http://idangero.us/swiper/api/#.V57mX9ArLOQ'
          }
          scope.swiper = {instance: null, options: swiperOptions}
          if ('width' in attr && attr.width.length) {
            element[0].style.width = attr.width;
          }
          if ('height' in attr && attr.height.length) {
            element[0].style.height = attr.height;
          }
          // nextButton: '.header-swiper-front .swiper-button-next',
          //   prevButton: '.header-swiper-front .swiper-button-prev',
          // $timeout(function() {

          //   // scope.swiper.instance.update(true);
          //   // scope.swiper.instance.startAutoplay();
          // }, 1000)
        },
        post: function(scope,element, attr) {

          var className = '.' + element[0].classList.value.split(' ').join('.')
          scope.swiper.instance =  new Swiper(className, scope.swiper.options);
          scope.$parent.swiperOptions = scope.swiper.options;

          scope.$parent.swiper = scope.swiper;

        }
      }
    }
}])
.directive('slide', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {data: '=data', index: '=index'},
      transclude: true,
      priority:1,
      replace:true,
      template: '<div class="swiper-slide" ng-transclude></div>',
      link:  {
            pre: function(scope, element, attr) {
              if (!scope.$parent.data) {
                scope.$parent.data = [];
              }
              scope.$parent.data.push(scope.data);
            },
            post: function(scope, element, attr) {
              $timeout(function() {
                if ('width' in attr && attr.width.length) {
                  element.css('width', attr.width)
                }
                if ('height' in attr && attr.height.length) {
                    element.css('height', attr.height)
                  }
              })
            }
          }
    }
}])
.directive('swiperNext', [function () {
    return {
      restrict: 'E',
      scope: false,
      priority:1,
      replace:true,
      transclude: true,
      template: '<div class="swiper-button-next" ng-transclude></div>',
      link: function preLink(scope, element, attr) {
        console.log();
        scope.$parent.swiper.options.nextButton = element[0];
      }
    }
}])
.directive('swiperBack', [function () {
    return {
      restrict: 'E',
      scope: false,
      priority:1,
      replace:true,
      transclude: true,
      template: '<div class="swiper-button-prev" ng-transclude></div>',
      link: function preLink(scope, element, attr) {
        console.log();
        scope.$parent.swiper.options.prevButton = element[0];
      }
    }
}])
.directive('swiperControls', [function () {
    return {
      restrict: 'E',
      priority:10,
      replace:true,
      scope: false,
      link:
        {
          pre: function(scope, element, attr) {
            scope.swiperOptions = scope.$parent.swiper.options;

            }
          // post: function(scope, element, attr) {


          // }
      }
    }
}])
.directive('swipeVar', [function () {
    return {
      restrict: 'E',
      priority:11,
      replace:true,
      scope: {key:'@key', value:'@value'},
      link:
        {
          pre: function(scope, element, attr) {

            if (scope.key && scope.key.length && scope.value && (scope.value + '').length) {
              if (!isNaN(parseFloat(scope.value)) && isFinite(scope.value)) {
                scope.value = parseFloat(scope.value);
              }
              scope.$parent.swiperOptions[scope.key] = scope.value;
              if (!scope.$parent.swiperOptions.modified) {
                scope.$parent.swiperOptions.modified =[];
              }
              scope.$parent.swiperOptions.modified.push(scope.key);
            }
          }
        }
    }
}])

.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',

        compile: function (tElement, tAttrs) {
            tElement.replaceWith(tElement.children());
            return {
                post : angular.noop
            };
        }
    };
});
