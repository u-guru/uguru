// todo now
// - animName: in, out, set, before, after, send, setTemp
// - anim
// - tween
// - verify trigger

// todo later
// - trigger args
// - replace trigger scope.watch for 'on' states with a class that initiates the watcher (to prevent future watchers)

angular.module('uguru.shared.directives')
.directive('initWith', ['DirectiveService', function(DirectiveService) {
  return {
    restrict: 'A',
      link: {
        pre: function(scope, element, attr) {
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
            execInitWith(scope);
          }

          function execInitWith(scope) {
            var elemArgs = DirectiveService.parseArgs(attr.initWith);
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
.directive('initLater', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
      link: {
        pre: function(scope, element, attr) {
          element[0].setAttribute('ng-if', false);
          scope.ngInclude = element[0].getAttribute('ng-include');
          scope.includeReplace = 'includeReplace' in attr;
          if (scope.includeReplace) {
            element[0].removeAttribute('include-replace');
          }
          element[0].removeAttribute('ng-include');
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
          if (new_classes.indexOf('on-exit') > -1) {
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
        replace: true,
        compile: function (tElement, tAttrs) {
            tElement.replaceWith(tElement.children());
            return {
                post : angular.noop
            };
        }
    };
});
