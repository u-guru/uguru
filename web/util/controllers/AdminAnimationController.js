
angular.module('uguru.admin')
.controller('AdminAnimationController', [
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'RootService',
    '$window',
    'TweenService',
    function($scope, $state, $stateParams, $timeout, RootService, $window, TweenService) {
        var aa = this;
        aa.customAnimations = processCustomAnimations(RootService.getCustomAnimations()).customNameOnly;
        aa.customAnimations.sort()
        aa.easingFunctions = TweenService.getAllEasing();
        aa.animatableProps = TweenService.animatableProps;
        aa.clickableKeys = ['custom easing', 'animatable properties'];
        aa.hiddenKeys = ['defaults', 'property options']
        aa.launchWindow = function(param) {
            if (aa.customAnimations.indexOf(param) > -1) {
                $window.open('#/admin/api/animations/custom/'  + param + '?kf=60&v=1000,linear,250,-1,f&comp=svg.logo.guru-head');
            }
            if (aa.animatableProps.indexOf(param) > -1) {
                var paramDict = getShortcuts(param);

                $window.open('#/admin/api/animations/prop/'  + constructAnimUrlPortion(paramDict) + '&comp=svg.logo.guru-head');
            }
        }

        function constructAnimUrlPortion(dict) {
            return dict.name + '?v=' + dict.start +
                    ',' + dict.end + ',' + dict.duration + ',' + dict.easingFunc + ',' +
                    dict.delay + ',' + dict.iter + ',' + dict.direction;
        }


        function getShortcuts(param) {
            var paramDict = {name:param};
            var requiredArgs = Object.keys(aa.animShortcuts.defaults);

            if (param in aa.animShortcuts) {
                for (arg_type in aa.animShortcuts[param]) {
                    paramDict[arg_type] = aa.animShortcuts[param][arg_type];
                }

            }
            requiredArgs.forEach(function(arg_name, i) {
                if (!(arg_name in paramDict)) {
                    paramDict[arg_name] = aa.animShortcuts.defaults[arg_name]

                }
            })


            return paramDict
        }

        function parseShortcuts(shct_dict) {
            var result_dict = {defaults:{}};
            for (type in shct_dict.types) {
                for (arg_shortcut in shct_dict.types[type]) {
                    var argShortcutVals = shct_dict.types[type][arg_shortcut];
                    for (supported_arg in argShortcutVals) {
                        if (supported_arg === 'default') {
                            result_dict.defaults[arg_shortcut] = argShortcutVals[supported_arg];
                            continue;
                        }
                        var propNames = argShortcutVals[supported_arg]

                        for (var i = 0; i < propNames.length; i++) {
                            var iPropName = propNames[i];
                            if (!(iPropName in result_dict)) {
                                result_dict[iPropName] = {};
                            }
                            result_dict[iPropName][arg_shortcut] = supported_arg;
                        }
                    }
                }
            }

            return result_dict;
        }

        $timeout(function() {
            aa.dataAnim = $scope.$parent.animations;
            if (Object.keys(aa.dataAnim) && aa.dataAnim.sections.shortcuts) {
                aa.animShortcuts = parseShortcuts(aa.dataAnim.sections.shortcuts);
                delete aa.dataAnim.sections.shortcuts
            }
            console.log('#/admin/api/animations/prop/'  + constructAnimUrlPortion(getShortcuts('opacity')) + '&comp=svg.logo.guru-head')



        })

        function processCustomAnimations(animations) {
            return animations
            anitmations.custom.forEach(
            function(c, i) {
                if (c.cssText && c.cssText.indexOf('from') > -1) {
                    console.log(c.cssText);
                }
            })
            return animations;
        }
    }

]);
