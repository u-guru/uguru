// todo now
// - animName: in, out, set, before, after, send, setTemp
// - anim
// - tween
// - verify trigger

// todo later
// - trigger args
// - replace trigger scope.watch for 'on' states with a class that initiates the watcher (to prevent future watchers)

angular.module('uguru.shared.directives')
.directive('initWith', ['DirectiveService', 'UtilitiesService', function(DirectiveService, UtilitiesService) {
  return {
    restrict: 'A',
      link: {
        pre: function(scope, element, attr) {
          var switchDict;
          var switchName = attr.switch && attr.switch.split(':')[0];
          var switchId = 'switch-id' in attr && attr['switch-id'] && parseInt(attr['switch-id'])
          if (attr.initLater) {
            scope.$watch(function() {
              return element.attr('class');
            }, function(new_classes, old_classes) {
              if (new_classes.indexOf('init-with') > -1) {
                element[0].classList.remove('init-with');
                execInitWith();
              }
            })
          } else {
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
          }

          function execInitWith(scope, has_switch_default) {
            var elemArgs = DirectiveService.parseArgs(attr.initWith);
            var listenerArgs = DirectiveService.detectExternalStates(attr);
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
.directive('initLater', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    priority: 10000,
    terminal: true,
      link: {
        pre: function(scope, element, attr) {
          attr.$set('ngHide', true);
          attr.$set('initLater', null);
          $compile(element[0])(scope);


          scope.$watch(function() {
            return element.attr('class');
          }, function(new_classes, old_classes) {
            new_classes = new_classes || '';
            if (new_classes.indexOf('init-later') > -1) {
              element[0].classList.remove('init-later');
              for (key in elemArgs) {
                if (supportedCommands.indexOf(key) > -1) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
                }
              }
            }
          })
      }
    }
  }
}])
.directive('desktop', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    priority: 10000,
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
    priority: 10000,
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
          var elemArgs = DirectiveService.parseArgs(attr.onInit);
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
    link: function(scope, element, attr, controller) {
          var listenerArgs = DirectiveService.detectExternalStates(attr);
          if ('switch' in attr) {
            console.log('initializing', attr.switch)
          }
          for (key in listenerArgs) {
            var type = listenerArgs[key].type
            var _attr = listenerArgs[key].attr;
            DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
          }
    }
  }
}])
.directive('onEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {

        var elemArgs = DirectiveService.parseArgs(attr.onEnter);
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
            func(scope);
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
        var elemArgs = DirectiveService.parseArgs(attr.onExit);
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

.directive('onHover', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        var elemArgs = DirectiveService.parseArgs(attr.onHover);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var hoverDelay = parseInt(attr.onHoverDelay || DirectiveService.defaults.activate.hover);
        element.on('mouseover', function () {
          inTimeout = true;
          $timeout(function () {
            if (inTimeout) {
              for (key in elemArgs) {
                if (supportedCommands.indexOf(key) > -1) {
                  console.log(scope.root.public.customStates.when.whenCategoryDropdownHover);
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
                }
              }
              scope.$apply();
            }
          }, 250 + hoverDelay);
        });
         element.on('mouseleave', function () {
          inTimeout = false;
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
        var elemArgs = DirectiveService.parseArgs(attr.onClick);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('click', function () {
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
.directive('onMouseEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        var elemArgs = DirectiveService.parseArgs(attr.onMouseEnter);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('mouseover', function () {
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
.directive('draw', ['$timeout', 'SVGService', '$compile', function ($timeout, SVGService, $compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clonedElem = element[0].cloneNode(true);
      var currentFrame = parseInt(attr.initFrame) || 0;
      var delay = attr.drawDelay || 0;
      var totalFrames = SVGService.computeDrawDuration(attr.drawDuration) || 60;
      var svgPaths = element[0].querySelectorAll('path:not([draw]):not([draw-ignore]), line:not([draw]):not([draw-ignore]), circle:not([draw]):not([draw-ignore]), rect:not([draw]):not([draw-ignore]), polygon:not([draw]):not([draw-ignore])');
      // var pathLengths = new Array();
      // var drawShapesDelay = parseInt(attr.drawShapesDelay) || 0;
      // for (var i = 0; i < svgPaths.length; i++) {
      //   var indexPathElem = svgPaths[i];

      //   var pathLength = SVGService.getTotalPathLength(indexPathElem);

      //   // var pathLength = indexPathElem.getTotalLength();
      //   pathLengths[i] = pathLength;
      //   indexPathElem.style.strokeDasharray = '';
      //   indexPathElem.style.strokeDashoffset = pathLength;
      // }
      $timeout(function() {
        element[0].classList.add('activate');
      }, 1000)
      scope.$watch(function() {
        return element.attr('class');
      }, function(new_value) {
        if (new_value && new_value.indexOf('activate') > -1) {
            if (element[0].nodeName !== 'path') {
              var path = SVGService.svgShapeToPath(element[0])[0];
              var elem = path
              var pathAttr = path.getAttribute('d');
              element[0].parentNode.appendChild(elem);
              elem.classList.add('absolute', 'full-xy')
              elem.parentNode.classList.add('relative');
              elem.setAttribute('d', pathAttr);
            }
            // path = document.createElement('path');
            // var pathStr = 'M 18 2 H 266 A16,16,0,0,1,282,18 V 70 A 16,16,0,0,1,266,86 H 18 A16,16,0,0,1,2,70 V 18 A 16,16,0,0,1,18,2 Z';
            // path.setAttribute('d', pathStr.split(',').join(' '))
            // // element[0].appendChild(path);
            // // path.setAttribute('d', 'M18,2 H266 A16,16,0,0,1,282,18 V70 A16,16,0,0,1,266,86 H18 A16,16,0,0,1,2,70 V18 A16,16,0,0,1,18,2 Z');
            // $timeout(function() {
            //   scope.$apply()
            //   console.log(pathStr.split(',').join(' '))
            // }, 0)


            // var pathNew = document.createElement('path');
            // pathNew.setAttribute('d', path.getAttribute('d'));








          // pathLength = SVGService.getTotalPathLength(path[0]);
          // SVGService.drawOneShape(path, 0, path.getTotalLength(), path.getTotalLength())
          // element[0].style.strokeWidth = '5';
          // element[0].style.fill = 'none';
          // element[0].style.strokeDashoffset = pathLength;
          // element[0].style.strokeDasharray = pathLength;
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
.directive('onMouseLeave', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        var elemArgs = DirectiveService.parseArgs(attr.onMouseLeave);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('mouseleave', function () {
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
.directive("switches", ['$timeout', 'RootService', 'DirectiveService', 'UtilitiesService',
        function($timeout, RootService, DirectiveService, UtilitiesService) {
            return {
              restrict: 'A',
              priority:1,
              link: {
                pre: function(scope, element, attr) {
                  scope.switchDict = {};
                  var switches = DirectiveService.parseSwitchesAttr(scope, element, attr);
                  for (var i = 0; i < switches.length; i++) {
                    var indexSwitch = switches[i];
                    var switchesName = indexSwitch.name
                    delete indexSwitch['name']
                    scope.switchDict[switchesName] = indexSwitch
                  }
                },
                post: function(scope, element, attr) {
                  for (key in scope.switchDict) {
                    // console.log('detected', scope.switchDict[key].switches.length, 'switches for', key);
                  }

                  scope.checkIfSiblingExiting = function(switch_obj) {
                      var switchesObj = scope.switchDict[switch_obj.name];
                      if (switchesObj.activeSwitches.length < switchesObj.activeLimit) {
                        switchesObj.activeSwitches.push(switch_obj.id);
                        return false;
                      }
                      if (switchesObj.activeSwitches.length === switchesObj.activeLimit) {
                        //if its already part of it
                        if (switchesObj.activeSwitches.indexOf(switch_obj.id) > -1) {
                          var switchIndex = switchesObj.activeSwitches.indexOf(switch_obj.id);
                          switchesObj.activeSwitches.splice(switchesObj[switchIndex] - 1, 1);
                          return false;
                        } else {
                          var switchIdToRemove = switchesObj.activeSwitches.splice(0, 1)[0] - 1;

                          switchesObj.activeSwitches.splice(switchIdToRemove, 1);
                          // switchesObj.activeSwitches.push(switch_obj.id);
                          var formattedAttr = 'on-switch-' + UtilitiesService.camelToDash(switch_obj.name).toLowerCase() + '-change';
                          // var elemToInactive = scope.switchDict[switch_obj.name].switches[switchIdToRemove];
                          var childQuery = '[switch-id="' + (parseInt(switchIdToRemove) + 1) + '"][switch="' + switch_obj.name +'"]';
                          var childElem = element[0].querySelector(childQuery);
                          childElem.classList.add(formattedAttr);
                          return true;
                        }

                      }
                  }

                }
              }

            }
        }
])
.directive("switch", ['$timeout', 'RootService', 'DirectiveService', 'UtilitiesService', 'SwitchService',
        function($timeout, RootService, DirectiveService, UtilitiesService, SwitchService) {
            return {
              restrict: 'A',
              scope: {},
              require:'^?switches',
              priority: 1,
              link: {
                pre: function(scope, element, attr) {

                  scope.switch = SwitchService.parseElemAttrs(scope, element, attr);
                  var switchEvents = ['active', 'inactive', 'change'];
                  if (scope.$parent.switchDict) {

                    for (switchName in scope.$parent.switchDict) {
                      if (switchName === scope.switch.name) {
                        attr.$set('switch-id', scope.$parent.switchDict[switchName].switches.length + 1)
                        var switchesParent = scope.$parent.switchDict[scope.switch.name]
                        var parentHasDelay = 'changeDelay' in scope.$parent.switchDict[switchName];
                        scope.switch.dashedName = UtilitiesService.camelToDash(scope.switch.name).toLowerCase();
                        if (parentHasDelay) {
                          scope.switch.parentDelay = scope.$parent.switchDict[switchName]['changeDelay'];
                        }
                        scope.switch.states = {};
                        scope.switch.classes = [];
                        scope.switch.id = scope.$parent.switchDict[scope.switch.name].switches.length + 1
                        for (var i = 0; i < switchEvents.length; i++) {
                          var indexEventDashed = 'on-switch-' + scope.switch.dashedName + '-' + switchEvents[i];
                          var indexEventCamel = UtilitiesService.camelCase(indexEventDashed);
                          if (indexEventCamel in attr) {
                            scope.switch.states[switchEvents[i]] = {args: DirectiveService.parseArgs(attr[indexEventCamel]), className: indexEventDashed};
                            scope.switch.classes.push(indexEventDashed)
                          }
                        }
                        switchesParent.switches.push(scope.switch);
                      }
                    }
                  }

                  scope.$watch(function() {
                    return element.attr('class');
                  }, function(new_classes, old_classes) {
                    for (var i = 0; i < switchEvents.length; i++) {
                      var indexClass = 'on-switch-' + scope.switch.dashedName+ '-' + switchEvents[i];
                      if (new_classes && new_classes.indexOf(indexClass) > -1) {
                        element[0].classList.remove(indexClass);
                        var stateName = indexClass.split('-').reverse()[0];
                        if (stateName === 'change') {
                          scope.switch.active = !scope.switch.active;
                          if (scope.switch.active && 'active' in scope.switch.states) {
                            var activeArgs = scope.switch.states['active']['args'];
                            for (key in activeArgs) {
                              var shouldSwitchDelayBeforeActive = scope.$parent.checkIfSiblingExiting(scope.switch);
                              if (shouldSwitchDelayBeforeActive) {


                                var callback = function() {
                                  scope.$parent.switchDict[scope.switch.name].activeSwitches.push(attr['switch-id']);
                                }
                                DirectiveService.activateArgDelay(key, activeArgs[key], scope, element, scope.switch.parentDelay, callback);

                              } else {
                                DirectiveService.activateArg(key, activeArgs[key], scope, element);
                              }

                            }
                            // DirectiveService.activateArg
                          } else {
                            var inactiveArgs = scope.switch.states['inactive']['args'];
                            var activeSwitches = scope.$parent.switchDict[scope.switch.name].activeSwitches;
                            var indexSwitchActive = activeSwitches.indexOf(attr['switch-id']);
                            activeSwitches.splice(indexSwitchActive, 1);

                            for (key in inactiveArgs) {
                              DirectiveService.activateArg(key, inactiveArgs[key], scope, element);
                            }
                          }
                        }
                      }
                    }
                  });
                  // for (var i = 0; i < switches.length; i++) {
                  //   var indexSwitch = switches[i];
                  //   var switchesName = indexSwitch.name
                  //   delete indexSwitch['name']
                  //   scope.switchDict[switchesName] = indexSwitch
                  // }
                }
              }

            }
        }
])
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
