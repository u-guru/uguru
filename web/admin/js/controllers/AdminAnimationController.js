
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
        aa.customAnimations = RootService.getCustomAnimations().customNameOnly;
        aa.customAnimations.sort()
        aa.easingFunctions = TweenService.getAllEasing();
        aa.animatableProps = TweenService.animatableProps;
        aa.clickableKeys = ['custom easing', 'animatable properties']
        aa.launchWindow = function(param) {
            if (aa.customAnimations.indexOf(param) > -1) {
                $window.open('#/admin/api/animations/custom/'  + param + '?kf=60&v=1000,linear,250,-1,f&comp=svg.logo.guru-head');
            }
            if (aa.animatableProps.indexOf(param) > -1) {

            }
        }
    }

]);
