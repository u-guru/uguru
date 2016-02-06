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
}).
directive("animEnterDown", ["AnimationService", "$timeout", function (AnimationService, $timeout) {
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
            if (!scope.page.waypoints[attr.animEnterUp]) {
                scope.page.waypoints[attr.animEnterUp] = {};
              }
            $timeout(function() {
              scope.$watch('page.waypoints.' + attr.animEnterUp + '.activated', function(isActive) {
                var hasFirstTimeEnter = scope.page.waypoints[attr.animEnterUp].hasFirstTimeEnter;
                var firstTimeActivated = scope.page.waypoints[attr.animEnterUp].firstTimeEnterActivated;
                if (isActive && scope.page.waypoints[attr.animEnterUp].direction === 'down' && (!hasFirstTimeEnter || firstTimeActivated)) {
                  AnimationService.applyAnimateInDirective(element[0], 'enter-down');
                }
              })
            }, 100);
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
                if ((isActive &&  direction === 'down' && (!firstTimeActivated || element[0].attributes))) {
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