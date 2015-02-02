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
    })
    .directive('disableTap', function($timeout) {
      return {
        link: function() {
          $timeout(function() {
            container = document.getElementsByClassName('pac-container');
            console.log(container)
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function(){
                document.getElementById('type-selector').blur();
            });

          },500);

        }
      };
    });;
