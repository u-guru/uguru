
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
        aa.animShortcuts = [];
        aa.animatableProps = TweenService.animatableProps;
        aa.clickableKeys = ['custom easing', 'animatable properties'];
        aa.hiddenKeys = ['defaults']
        aa.launchWindow = function(key, param, type) {

            var propParsed = formatAnimShortcuts(key, param, type).trim().split('%').join('p');

            if (aa.customAnimations.indexOf(propParsed.split(':')[0]) > -1) {
                $window.open('#/admin/api/animations/custom/'  + param + '?template=shared:components.svg.logo.guru-head.html&select=svg&hidePlot=true');
            } else {
                if (!param) {
                    param = key
                }
                if (!type) {
                    type = 'name'
                }


                var url = '#/admin/api/animations/prop/' + propParsed + '?template=shared:components.svg.logo.guru-head.html&select=svg';

                $window.open(url);
            }
        }

        function formatAnimShortcuts(key, param, type) {
            console.log(key, param, type)
            var animArgs = ['name', 'start', 'end', 'duration', 'easingFunc', 'delay', 'iter', 'direction'];
            var defaults = ['opacity', '0', '1', 1000, 'easeOutCirc', 0, 1, 'f'];
            var animArgIndex = animArgs.indexOf(type);
            if (animArgIndex > -1 && type === 'name' && key in aa.animShortcutsDict[type]) {
                type = 'default';
                key = param;
                animArgIndex = -1;
            }
            if (animArgIndex > -1) {
                var startSlice = defaults.slice(0, animArgIndex);
                var endSlice = defaults.slice(animArgIndex + 1, defaults.length);
                var resultStr = '';
                if (startSlice.length) {
                    resultStr += startSlice.join(":");
                }
                resultStr += ':' + param + ':';

                if (endSlice.length) {
                    resultStr += endSlice.join(":");
                }
                console.log(resultStr)
                if ([':', ','].indexOf(resultStr.charAt(0)) > -1) {
                    resultStr = resultStr.substring(1)
                }
                resultStr = resultStr.split(':').join(',').replace(',', ':');
                return resultStr
            }
            else if (type === 'stream') {
                var resultArr = [];
                var paramSplit = param.split(',');
                paramSplit.forEach(function(_param, i) {
                    var strSplit = _param.split(':');
                     resultArr.push(strSplit.slice(0,1) + ':' + strSplit.slice(1).join(','));
                });
                return resultArr.join('+');

            }
            else if (type === 'default') {
                return key + ':' + aa.animShortcutsDict[type][key].split(':').join(',');
            }
        }

        function constructAnimUrlPortion(dict) {
            return dict.name + ':' + dict.start +
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
            aa.animShortcutsDict = $scope.root.public.customShortcuts.animProps
            var animShortcuts = [];
            animShortcuts.push({name: 'stream', values:aa.animShortcutsDict.stream});

            for (shct_type in aa.animShortcutsDict) {
                if (shct_type !== 'stream') {
                    animShortcuts.push({
                        name: shct_type,
                        values: aa.animShortcutsDict[shct_type]
                    })
                }
            }


            if (Object.keys(aa.dataAnim) && aa.dataAnim.sections.shortcuts) {
                aa.animShortcuts = parseShortcuts(aa.dataAnim.sections.shortcuts);
                delete aa.dataAnim.sections.shortcuts
            }
            aa.animShortcuts = animShortcuts
            $timeout(function() {$scope.$apply()});
        }, 500)

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
