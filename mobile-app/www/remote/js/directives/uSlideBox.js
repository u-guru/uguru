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
      // autoPlay: '=',
      doesContinue: '@',
      // slideInterval: '@',
      showPager: '@',
      pagerClick: '&',
      disableScroll: '@',
      onSlideChanged: '&',
      activeSlide: '=?'
    },
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs, Utilities) {
      var _this = this;

      var continuous = $scope.$eval($scope.doesContinue) === true;
      //WTF IS THIS, CODE BREAKS IF WE USE ISDEFINED() WITHOUT ANGULAR
      // var shouldAutoPlay = angular.isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
      // var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;

      var slider = new ionic.views.Slider({
        el: $element[0],
        // auto: slideInterval,
        continuous: continuous,
        startSlide: $scope.activeSlide,
        slidesChanged: function() {
          $scope.currentSlide = slider.currentIndex();

          // Try to trigger a digest
          $timeout(function() {});
        },
        callback: function(slideIndex) {
    		console.log("callback slideIndex: " + slideIndex);
    		var slide = document.querySelectorAll('u-slide')[slideIndex];
    		console.log('slide: ' + slide);
    		
    		var BeforeEnterEvent = new CustomEvent("beforeEnter");
    		console.log('BeforeEnterEvent' + BeforeEnterEvent);
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
      	//again need to have angular.isDefined()
        if (angular.isDefined(nv)) {
          slider.slide(nv);
        }
      });

      $scope.$on('slideBox.nextSlide', function() {
      	console.log("NEXTTT");
        slider.next();
      });

      $scope.$on('slideBox.prevSlide', function() {
        slider.prev();
      });

      $scope.$on('slideBox.setSlide', function(e, index) {
        slider.slide(index);
      });

      //Exposed for testing
      this.__slider = slider;

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

      this.onPagerClick = function(index) {
        console.log('pagerClick', index);
        $scope.pagerClick({index: index});
      };

      $timeout(function() {
        slider.load();
      });
    }],
    template: 	'<div class="slider">' +
				      '<div class="slider-slides" ng-transclude>' +
				      '</div>' +
    			'</div>',

    // link: function($scope, $element, $attr) {
    //   // if showPager is undefined, show the pager
    //   if (!isDefined($attr.showPager)) {
    //     $scope.showPager = true;
    //     getPager().toggleClass('hide', !true);
    //   }

    //   $attr.$observe('showPager', function(show) {
    //     if (show === undefined) return;
    //     show = $scope.$eval(show);
    //     getPager().toggleClass('hide', !show);
    //   });

    //   var pager;
    //   function getPager() {
    //     if (!pager) {
    //       var childScope = $scope.$new();
    //       pager = jqLite('<ion-pager></ion-pager>');
    //       $element.append(pager);
    //       pager = $compile(pager)(childScope);
    //     }
    //     return pager;
    //   }
    // }
  };
}])
.directive('uSlide', function() {
  return {
    restrict: 'E',
    require: '^ionSlideBox',
    compile: function(element) {
      element.addClass('slider-slide');
    }
  };
})
// .directive('uPager', function() {
//   return {
//     restrict: 'E',
//     replace: true,
//     require: '^ionSlideBox',
//     template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
//     link: function($scope, $element, $attr, slideBox) {
//       var selectPage = function(index) {
//         var children = $element[0].children;
//         var length = children.length;
//         for (var i = 0; i < length; i++) {
//           if (i == index) {
//             children[i].classList.add('active');
//           } else {
//             children[i].classList.remove('active');
//           }
//         }
//       };

//       $scope.pagerClick = function(index) {
//         slideBox.onPagerClick(index);
//       };

//       $scope.numSlides = function() {
//         return new Array(slideBox.slidesCount());
//       };

//       $scope.$watch('currentSlide', function(v) {
//         selectPage(v);
//       });
//     }
//   };

// })
;



