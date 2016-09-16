
angular.module('uguru.admin')
.controller('AdminAnimationController', [

    '$scope',
    '$state',
    '$stateParams',
    'RootService',
    '$window',
    'TweenService',
    function($scope, $state, $stateParams, RootService, $window, TweenService) {
        var aa = this;
        aa.customAnimations = processCustomAnimations(RootService.getCustomAnimations()).customNameOnly;
        aa.customAnimations.sort()
        aa.easingFunctions = TweenService.getAllEasing();
        aa.animatableProps = TweenService.animatableProps;
        aa.clickableKeys = ['custom easing', 'animatable properties']
        aa.launchWindow = function(param) {
            if (aa.customAnimations.indexOf(param) > -1) {
                $window.open('#/admin/api/animations/custom/'  + param + '?kf=60&v=1000,linear,250,-1,f&comp=svg.logo.guru-head');
            }
            if (aa.animatableProps.indexOf(param) > -1) {
                $window.open('#/admin/api/animations/prop/'  + param + '?v=0,1,1000,elastic,250,i,f&comp=svg.logo.guru-head');
            }
        }

        function processCustomAnimations(animations) {
            return animations
            animations.custom.forEach(
            function(c, i) {
                console.log(c.cssText)
                if (c.cssText && c.cssText.indexOf('from') > -1) {
                    console.log(c.cssText);
                }
            })
            return animations;
        }
    }

]);
