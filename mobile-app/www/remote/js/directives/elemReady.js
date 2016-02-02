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
.directive('onImgLoad', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                //call the function that was passed
                scope.$apply(attrs.onImgLoad);
            });
        }
    };
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
directive("animEnter", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animEnter', function() {
                console.log('checking..');
                if (attr.animEnter) {
                  console.log('triggering animation for animEnter', element.id);
                }
           });
        }
      };
}).
directive("animEnterDown", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animEnterDown', function() {
                console.log('checking..');
                if (attr.animEnterDown) {
                  console.log('triggering animation for animEnterDown', element);
                }
           });
        }
      };
}).
directive("animFirstEnterDown", ["AnimationService", function (AnimationService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animFirstEnterDown', function() {
                console.log('checking..');
                if (attr.animFirstEnterDown && "animFirstEnterDownParent" in attr) {
                  var children = element[0].querySelectorAll("[anim-first-enter-down-child]");
                  if (children.length) {
                    for (var i = 0; i < children.length; i++) {
                      var indexChild = children[i];
                      var animationClassToInject = indexChild.getAttribute('anim-first-enter-down-class');
                      var animationDelay = indexChild.getAttribute('anim-first-enter-down-delay');
                      var animationOnCompleteExpr = indexChild.getAttribute('anim-first-enter-down-on-complete');
                      AnimationService.animateIn(indexChild, animationClassToInject, animationDelay);
                    }
                  }
                }

                // if (attr.animFirstEnterDown && "animFirstEnterDownChild" in attr) {
                //   console.log('Child animate element with class', element.class, 'and args', attr.animFirstEnterDownClass, attr.animFirstEnterDownDelay);
                // }
           });
        }
      };
}]).
directive("animExit", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animExit', function() {
                console.log('checking..');
                if (attr.animExit) {
                  console.log('triggering animation for animExit', element);
                }
           });
        }
      };
}).
directive("animExitUp", ["AnimationService", function (AnimationService) {
      return {
          restrict: 'A',
          scope: {value: "=animExitUp"},
          link: function(scope, element, attr) {
            console.log('this was called', scope.value);
            scope.$watch('value', function(value) {
                // scope.value = !value;

                // console.log('set animExitUp from', scope.value, 'to value');
                if (value) {
                  console.log('animExitUp was recently set to', value, scope.$$watchers.length);
                  scope.value = false;
                  var children = element[0].querySelectorAll("[anim-exit-up-child]");
                  if (children.length) {
                    for (var i = 0; i < children.length; i++) {
                      var indexChild = children[i];
                      var animationClassToInject = indexChild.getAttribute('anim-exit-up-child-class');
                      var animationDelay = indexChild.getAttribute('anim-exit-up-child-delay');
                      var animationOnCompleteExpr = indexChild.getAttribute('anim-exit-up-complete');
                      AnimationService.animateIn(indexChild, animationClassToInject, animationDelay);
                    }
                  }
                } else {
                  console.log('animExitUp was recently set to', value);
                }
            })

          }
      };
}]).
directive("animExitDown", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animExitDown', function() {
                console.log('checking..', scope.$$watchers.length);
                if (attr.animExitDown) {
                  console.log('triggering animation for animExitDown', element);
                }
           });
        }
      };
})

