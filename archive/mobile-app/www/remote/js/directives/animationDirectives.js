angular.module('uguru.directives')
.directive("moJs", ["$timeout", 'AnimationService', function ($timeout, AnimationService) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        // element.on("click", function() {
            new Animocon(element[0], {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: element[0],
                    duration: 1200,
                    delay: 200,
                    shape : 'circle',
                    fill: '#F6C64E',
                    x: '-120px',
                    y: '50%',
                    opacity: 0.8,
                    childOptions: { radius: {'rand(20,5)':0} },
                    radius: {90:150},
                    count: 18,
                    isSwirl: true,
                    swirlSize: 15,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: element[0],
                    duration: 1500,
                    type: 'circle',
                    radius: {30: 100},
                    fill: 'transparent',
                    stroke: '#F6C64E',
                    strokeWidth: {30:0},
                    opacity: 0.8,
                    x: '-83px',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                new mojs.Transit({
                    parent: element[0],
                    duration: 1600,
                    delay: 320,
                    type: 'circle',
                    radius: {30: 80},
                    fill: 'transparent',
                    stroke: '#F6C64E',
                    strokeWidth: {20:0},
                    opacity: 0.4,
                    x: '-53px',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1000,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            element[0].querySelector('[mo-js-child]').style.WebkitTransform = element[0].querySelector('[mo-js-child]').style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            element[0].querySelector('[mo-js-child]').style.WebkitTransform = element[0].querySelector('[mo-js-child]').style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            // onCheck : function() {
            //     element[0].style.color = '#F1F1F1';
            // },
            // onUnCheck : function() {
            //     element[0].style.color = '#C0C1C3';
            // }
        });
      }
  }
}])