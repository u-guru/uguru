angular.module('uguru')
.directive('uAfterEnter', function($parse, Utilities) {
	return {
		link: function($scope, element, attrs) {
			
      var transitionEnd = Utilities.transitionEndEventName();
      var handler = $parse(attrs.uAfterEnter);

			angular.element(element).bind(transitionEnd, function(){

        if(Utilities.isElementInViewport(element)) {
          console.log("afterEnter complete!");
          $scope.$apply(function() {
            handler($scope);
          });
        }
        
      });
		}
	}
})


//create a customevent, probably in utilities or something
//ubeforeenter directive will bind said event
//have slidebox handle the dispatching in their callback to animate, which will fire the event



.directive('uBeforeEnter', function($parse, Utilities) {
  return {
    link: function($scope, element, attr) {
          
          var handler = $parse(attr.uBeforeEnter);

          angular.element(element).bind("beforeEnter", function() {
              $scope.$apply(function() {
                handler($scope);
              });
          });

      }
    }
  })



