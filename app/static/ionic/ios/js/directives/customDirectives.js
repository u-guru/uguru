angular.module('uguru.directives', []);

    angular.module('uguru.directives')

    .directive('focusMe', function ($timeout) {
     return {
        link: function(scope, element, attrs) {
          $timeout(function() {
            element[0].focus();
          }, 500);
            }
        };
    })
    
    .directive('isFocused', function($timeout) {
      return {
        scope: { trigger: '@isFocused' },
        link: function(scope, element) {
          scope.$watch('trigger', function(value) {
            if(value === "true") {
              $timeout(function() {
                element[0].focus();

                element.on('blur', function() {
                  element[0].focus();
                });
              });
            }

          });
        }
      };
    });
