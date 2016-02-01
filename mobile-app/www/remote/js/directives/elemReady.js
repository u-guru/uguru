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
directive("animateOnEnter", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnEnter', function() {
                console.log('checking..');
                if (attr.animateOnEnter) {
                  console.log('triggering animation for animateOnEnter', element.id);
                }
           });
        }
      };
}).
directive("animateOnEnterDown", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnEnterDown', function() {
                console.log('checking..');
                if (attr.animateOnEnterDown) {
                  console.log('triggering animation for animateOnEnterDown', element);
                }
           });
        }
      };
}).
directive("animateOnFirstEnterDown", ["AnimationService", function (AnimationService) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnFirstEnterDown', function() {
                console.log('checking..');
                if (attr.animateOnFirstEnterDown && "animateOnFirstEnterDownParent" in attr) {
                  var children = element[0].querySelectorAll("[animate-on-first-enter-down-child]");
                  if (children.length) {
                    for (var i = 0; i < children.length; i++) {
                      var indexChild = children[i];
                      var animationClassToInject = indexChild.getAttribute('animate-on-first-enter-down-class');
                      var animationDelay = indexChild.getAttribute('animate-on-first-enter-down-delay');
                      var animationOnCompleteExpr = indexChild.getAttribute('animate-on-first-enter-down-on-complete');
                      AnimationService.animateIn(indexChild, animationClassToInject, animationDelay);
                    }
                  }
                }

                // if (attr.animateOnFirstEnterDown && "animateOnFirstEnterDownChild" in attr) {
                //   console.log('Child animate element with class', element.class, 'and args', attr.animateOnFirstEnterDownClass, attr.animateOnFirstEnterDownDelay);
                // }
           });
        }
      };
}]).
directive("animateOnExit", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnExit', function() {
                console.log('checking..');
                if (attr.animateOnExit) {
                  console.log('triggering animation for animateOnExit', element);
                }
           });
        }
      };
}).
directive("animateOnExitUp", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnExitUp', function() {
                console.log('checking..');
                if (attr.animateOnExitUp) {
                  console.log('triggering animation for animateOnExitUp', element);
                }
           });
        }
      };
}).
directive("animateOnExitDown", function () {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              attr.$observe('animateOnExitDown', function() {
                console.log('checking..');
                if (attr.animateOnExitDown) {
                  console.log('triggering animation for animateOnExitDown', element);
                }
           });
        }
      };
})

