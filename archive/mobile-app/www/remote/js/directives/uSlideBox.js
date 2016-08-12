angular.module('ionic')
.directive('uSlideBox', [
	'$parse',
  '$timeout',
  '$compile',
  '$ionicSlideBoxDelegate',
  '$ionicHistory',
  '$ionicScrollDelegate',
function($parse, $timeout, $compile, $ionicSlideBoxDelegate, $ionicHistory, $ionicScrollDelegate, Utilities) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      showPager: '@',
      disableScroll: '@',
      onSlideChanged: '&',
      activeSlide: '=?'
    },
    link: function() {
    },

    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs, Utilities) {
      var _this = this;

      var continuous = $scope.$eval($scope.doesContinue) === true;

      // //var slidesArray = document.querySelectorAll('u-slide');
      // var slidesArray = document.getElementsByTagName('u-slide');
      var slider = new ionic.views.Slider({
        el: $element[0],
        continuous: continuous,
        startSlide: $scope.activeSlide,
        slidesChanged: function() {
          $scope.currentSlide = slider.currentIndex();

          // Try to trigger a digest
          $timeout(function() {});
        },

        // TODO: implement querySelectorAll on the first slide load, that way we already
        // have the references for each slide index (in an array) and don't need to query everytime 
        // the callback runs

        // http://codepen.io/32bitkid/blog/understanding-delegated-javascript-events
        // holy grail in that link above
        callback: function(slideIndex) {

        var slidesArray = document.querySelectorAll('u-slide');
    		var slide = slidesArray[slideIndex];
     		var BeforeEnterEvent = new CustomEvent("beforeEnter");
    		slide.dispatchEvent(BeforeEnterEvent);
    				
          $scope.currentSlide = slideIndex;
          $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
          $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
          $scope.activeSlide = slideIndex;
          // Try to trigger a digest
          $timeout(function() {});
        },
        onDrag: function() {
          freezeAllScrolls(true);
        },
        onDragEnd: function() {
          freezeAllScrolls(false);
        }
      });

      function freezeAllScrolls(shouldFreeze) {
        if (shouldFreeze && !_this.isScrollFreeze) {
          $ionicScrollDelegate.freezeAllScrolls(shouldFreeze);

        } else if (!shouldFreeze && _this.isScrollFreeze) {
          $ionicScrollDelegate.freezeAllScrolls(false);
        }
        _this.isScrollFreeze = shouldFreeze;
      }

      slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

      $scope.$watch('activeSlide', function(nv) {

        if (angular.isDefined(nv)) {
          slider.slide(nv);
        }
      });

      $scope.$on('slideBox.nextSlide', function() {
        slider.next();
      });

      $scope.$on('slideBox.prevSlide', function() {
        slider.prev();
      });

      $scope.$on('slideBox.setSlide', function(e, index) {
        slider.slide(index);
      });

      var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(
        slider, $attrs.delegateHandle, function() {
          return $ionicHistory.isActiveScope($scope);
        }
      );
      $scope.$on('$destroy', function() {
        deregisterInstance();
        slider.kill();
      });

      this.slidesCount = function() {
        return slider.slidesCount();
      };

      $timeout(function() {
        slider.load();
      });
    }],
    template: 	'<div class="slider">' +
    				      '<div class="slider-slides" ng-transclude>' +
    				      '</div>' +
    			       '</div>',

  };
}])
.directive('uSlide', function() {
  return {
    restrict: 'E',
    require: '^uSlideBox',
    compile: function(element) {
      element.addClass('slider-slide');
    }
  };
})
.directive('uAfterEnter', function($parse, Utilities, $timeout) {
  return {
    link: function($scope, element, attrs) {
      
      var transitionEnd = Utilities.transitionEndEventName();
      var handler = $parse(attrs.uAfterEnter);

      angular.element(element).bind(transitionEnd, function(){

        if(Utilities.isElementInViewport(element)) {
          $timeout(function() {
            handler($scope);
          }, 0);
          // $scope.$apply(function() {
          //   handler($scope);
          // });
        }
        
      });
    }
  }
})
.directive('uBeforeEnter', function($parse, Utilities, $timeout) {
  return {
    link: function($scope, element, attr) {
          
      var handler = $parse(attr.uBeforeEnter);

      angular.element(element).bind("beforeEnter", function() {
        $timeout(function() {
          handler($scope);
        }, 0);
        // $scope.$apply(function() {
        //   handler($scope);
        // });
      });
    } 
  }
})

;



