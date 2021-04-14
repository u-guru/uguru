angular.module('uguru.shared.directives.components', []);
angular.module('uguru.shared.directives.components')
    // .directive("tag", ['$compile', '$timeout', 'RootService', function($compile, $timeout, RootService) {
    //     function getTemplateURL(elem, attr) {
    //         if (attr.type && attr.type === 'splash') {
    //             return RootService.getBaseUrl() + 'preapp/templates/components/splash.tag.tpl'
    //         } else
    //         if (attr.type && attr.type === 'input') {
    //             return RootService.getBaseUrl() + 'templates/elements/components/inputs/text/tag.tpl'
    //         } else {
    //             return RootService.getBaseUrl() + 'templates/elements/components/inputs/tags/base.tpl'
    //         }

    //     }
    //     return {
    //         templateUrl: getTemplateURL,
    //         args:'abc',
    //         scope: {
    //             innerText: '=',
    //             category: '=',
    //             blankNum: '=',
    //             animArgs: '=',
    //             placeholder: '@',
    //             desktopMode: '=desktop',
    //         },
    //         restrict: 'E',
    //         replace: true,
    //         link: {pre: function(scope, element, attr) {
    //             // scope.innerText == attr.innerText;
    //             scope.root = scope.$parent.root;

    //             // scope.watch()
    //             scope.$parent.$watch(function() {
    //               return element.attr('class');
    //             }, function(new_classes, old_classes) {
    //               if (new_classes && new_classes.indexOf('on-exit') > -1 || new_classes && new_classes.indexOf('on-enter') > -1 || new_classes && new_classes.indexOf('on-change') > -1) {
    //                 element[0].classList.remove('on-exit', 'on-change', 'on-enter');
    //                 // $compile(element)(scope.$parent);
    //               }
    //             })


    //             if (attr.type && attr.type.toLowerCase() === 'splash') {
    //                 scope.type = 'splash';
    //             }

    //             if (scope.blankNum && scope.blankNum.length) {
    //                 scope.blankNum = 1
    //             }

    //             scope.click = function($event) {
    //                 var childElemLink = element[0].querySelector('a');
    //                 var splashAdlibContainerLink = document.querySelector('.splash-adlib');
    //                 if (childElemLink && childElemLink.className.indexOf('recently-active') > -1) {
    //                     return;
    //                 }
    //                 if (childElemLink && childElemLink.className.indexOf('translate-blank-1') > -1) {
    //                     childElemLink.classList.remove('translate-blank-1', 'active');
    //                     splashAdlibContainerLink.classList.remove('blank-1-filled');
    //                     $timeout(function() {
    //                         splashAdlibContainerLink.classList.remove('blank-1-filled');
    //                     }, 100)
    //                 }
    //                 if (childElemLink && childElemLink.className.indexOf('translate-blank-2') > -1) {
    //                     childElemLink.classList.remove('translate-blank-2', 'active');
    //                     $timeout(function() {
    //                         splashAdlibContainerLink.classList.remove('blank-2-filled');
    //                     }, 100)
    //                 }
    //                 childElemLink.style.webkitTransform = null;
    //                 childElemLink.style.MozTransform = null;
    //                 childElemLink.style.msTransform = null;
    //                 childElemLink.style.OTransform = null;
    //                 childElemLink.style.transform = null;
    //             }

    //         }
    //         }
    //     }
    // }])
    .directive("dropdown", ['$timeout', 'RootService', 'UtilitiesService', 'DirectiveService', function($timeout, RootService, UtilitiesService, DirectiveService) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'color') {
                return RootService.getBaseUrl() + 'shared/templates/components/templates/nav/color.tpl'
            } else {
                return RootService.getBaseUrl() + 'shared/templates/components/dropdown.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            scope: {
                dropdown: '=ngModel',
                prefix: '@prefix',
                states: '@states'
                    // tests:'=testArr',
            },
            replace: true,
            restrict: 'E',
            link: {pre: function(scope, element, attr) {
                if (scope.states && attr.states.length) {
                    scope.states = UtilitiesService.removeAllOccurrancesArr(scope.states, ['[', ']', ' '])
                    scope.states = scope.states && scope.states.split(',')
                }
                // scope.mouse = {over: false, enter: false, leave: false};
                // scope.mouseDelays = {over: 250, enter: 250, leave: 250};
                // if (attr.mouseOverDelay) scope.mouseDelays.over = parseInt(attr.mouseOverDelay);
                // if (attr.mouseEnterDelay) scope.mouseDelays.enter = parseInt(attr.mouseEnterDelay);
                // if (attr.mouseLeaveDelay) scope.mouseDelays.leave = parseInt(attr.mouseLeaveDelay);

                // if (attr.mouseEnterData && attr.mouseEnterData.length) {
                //     var enterData = attr.mouseEnterData + '';
                //     enterData = UtilitiesService.replaceAll(enterData ,', ', ',');
                //     enterDataSplit = enterData.split(',');
                //     var resultDict = {};
                //     for (var i = 0; i < enterDataSplit.length; i++) {

                //     }
                //     scope.dropdown.data.mouseEnter = resultDict;
                // }
                for (var i = 0; i < scope.dropdown.options.length; i++) {
                    if ('mouseEnterData' in attr) {
                        scope.dropdown.options[i].mouseEnterData = UtilitiesService.replaceAll(attr['mouseEnterData'], ', ', ',').split(',').join('#');
                    }
                    if ('mouseOverData' in attr) {
                        scope.dropdown.options[i].mouseOverData = UtilitiesService.replaceAll(attr['mouseOverData'], ', ', ',').split(',').join('#');
                    }
                    if ('mouseLeaveData' in attr) {
                        scope.dropdown.options[i].mouseLeaveData = UtilitiesService.replaceAll(attr['mouseLeaveData'], ', ', ',').split(',').join('#');
                    }
                }

                scope.dropdown.active = false;
                attr.$set('initWith', attr.initWith);
                // attr.$set('onMouseEnter', attr.onMouseEnter);
                scope.dropdown.selectedRecentlyChanged = false;
                scope.root = scope.$parent.root;

                if (!scope.size) {
                    scope.size = 'small';
                }
                if (attr.type && attr.type.toLowerCase() === 'color') {
                    scope.type = 'color';
                } else {
                    scope.type = '';
                }
                if ('colorKey' in attr && attr.colorKey.length) {
                    var stripCharArr = ['[', ']', "'", '"', " "];
                    var strippedColorKeys = UtilitiesService.removeAllOccurrancesArr(attr.colorKey, stripCharArr)
                    if (strippedColorKeys && strippedColorKeys.length) {
                        strippedColorKeys = strippedColorKeys.split(',');
                    }
                    if (strippedColorKeys) {
                        scope.colorKey = strippedColorKeys;
                    }
                }
                scope.click = function(option, index) {


                    if (index !== scope.dropdown.selectedIndex) {
                        scope.dropdown.selectedRecentlyChanged = true;
                        scope.toggle();
                        $timeout(function() {
                            scope.dropdown.selectedRecentlyChanged = false;
                        }, 1000)
                    }

                    if (!option.skip) {
                        scope.dropdown.selectedIndex = index;
                    }

                    $timeout(function() {
                        scope.$apply();
                    })

                    if (scope.dropdown.onOptionClick) {
                        scope.dropdown.onOptionClick(option, index);
                    }

                    if (scope.states && scope.states.indexOf('click') > -1) {
                        console.log('sending click message', element)
                        DirectiveService.sendMessage(scope, 'send', 'click', attr, scope.prefix + '-dropdown-click', scope.dropdown.selectedIndex);
                    }

                }

                if (scope.states && scope.states.indexOf('hover') > -1) {
                    scope.hover = function($event, arg_type, message, index) {
                        DirectiveService.sendMessage(scope, arg_type, 'hover', attr, message, index);
                    }
                }

                if (scope.states && scope.states.indexOf('mouse-enter') > -1) {
                    scope.mouseEnter = function($event, index) {
                        scope.mouse.enter = true;
                        scope.mouse.leave = false;
                        console.log('checking mouse enter is still true after', scope.mouseDelays.enter, 'ms')
                        $timeout(function() {
                            if (scope.mouse.enter) {
                                console.log('firing event', scope.prefix + '-dropdown-mouse-enter');
                                arg_type =  'send'
                                message = scope.prefix + '-dropdown-mouse-enter';
                                index = index || 0;
                                DirectiveService.sendMessage(scope, arg_type, 'mouse-enter', attr, message, index);
                            }
                        }, scope.mouseDelays.enter);
                    }
                }

                if (scope.states && scope.states.indexOf('mouse-leave') > -1) {
                    scope.mouseLeave = function($event, index) {
                        scope.mouse.enter = false;
                        scope.mouse.leave = true;
                        console.log('checking mouse leave is still true after', scope.mouseDelays.leave, 'ms');
                        $timeout(function() {
                            if (scope.mouse.leave) {
                                console.log('firing event', scope.prefix + '-dropdown-mouse-leave');
                                arg_type =  'send'
                                message =  scope.prefix + '-dropdown-mouse-leave';
                                index = index || 0;
                                DirectiveService.sendMessage(scope, arg_type, 'mouse-leave', attr, message, index);
                            }
                        }, scope.mouseDelays.leave)
                    }
                }

                if (scope.states && scope.states.indexOf('mouse-leave') > -1) {
                    scope.mouseOver = function($event, index) {
                        console.log('waiting', scope.mouseDelays.over + 'ms');
                        $timeout(function() {
                            if (scope.mouse.enter) {
                                scope.mouse.over = true;
                                arg_type =  'send'
                                message =  scope.prefix + '-dropdown-mouse-over';
                                index = index || 0;
                                DirectiveService.sendMessage(scope, arg_type, 'mouse-over', attr, message, index);
                            }
                        }, scope.mouseDelays.over)
                    }
                }

                scope.toggle = function($event, index) {
                    // $timeout(function() {
                        scope.dropdown.active = !scope.dropdown.active;

                        if (scope.dropdown.selectedRecentlyChanged) {
                            DirectiveService.sendMessage(scope, 'send', 'toggle-off', attr, scope.prefix + '-dropdown-toggle-off', scope.dropdown.selectedIndex);
                            return false;
                        }

                        if (scope.dropdown.active) {
                            DirectiveService.sendMessage(scope, 'send', 'toggle-on', attr, scope.prefix + '-dropdown-toggle-on', scope.dropdown.selectedIndex);
                        } else {
                            DirectiveService.sendMessage(scope, 'send', 'toggle-off', attr, scope.prefix + '-dropdown-toggle-off', scope.dropdown.selectedIndex);
                        }
                        if (scope.dropdown.onToggle) {
                            scope.dropdown.onToggle(scope.dropdown.active);
                        }
                    // })
                }
            }
            }
        };
    }])
    .directive("checkbox", ['RootService', function(RootService) {
        return {
            templateUrl: 'shared/templates/components/checkbox.tpl',
            scope: {
                onChecked: '=onChange',
                label: '=label',
                value: '=value',
                checked: "=checked"
            },
            restrict: 'E',
            link: function(scope, element, attr) {
                scope.label = attr.label || scope.label;

                scope.onValueChanged = function(value) {
                        scope.onChecked && scope.onChecked(value);
                    }
                    // scope.value = scope.value || attr.value;
                    // if (scope.onPropChange) {
                    //   // scope.onPropChange(scope, )
                    // }
            }
        }
}])
.directive('square', ['SVGService', function(SVGService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<svg width="100" height="100" viewBox="0, 0, 100, 100"> <rect stroke="#637074" stroke-width="3" x="1.5" y="1.5" width="97" height="97" rx="10"></rect> </svg>',
    link: {
      pre: function(scope, element, attr) {

      }
    }
  }
}])
.directive('animationGroup', ['RootService', 'AnimationService', '$timeout', '$compile', function(RootService, AnimationService, $timeout, $compile) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'admin/templates/components/animation.group.player.tpl',
        scope: {
            animations: '=animations'
        },
        link: function(scope, element, attr) {
            scope.animInfoDict = {stagger: 100};
            scope.$watch('animations',  function(new_animations) {
                scope.animations = new_animations;
                for (var i = 0; i < scope.animations.length; i++) {

                }

            })
            scope.mappings = {
                'func': 'Timing Function',
                'direction': 'Direction',
                'delay': 'Delay',
                'playState': 'Play State',
                'iter': 'Iterations',
                'name': 'Anim Name',
                'duration': 'Duration'
            }
            scope.playAll = function() {
                for (var i = 0; i < scope.animations.length; i++) {
                    var animationIndex = scope.animations[i];
                    scope.play(animationIndex, i);
                }
            }

            scope.play = function(anim, index) {

                anim.element.css('-webkit-animation-name', '');
                anim.playState = 'running';
                if (scope.animInfoDict.stagger) {
                    anim.delay = scope.animInfoDict.stagger * i;
                }

                $timeout(function() {
                    anim.element.css('-webkit-animation-name', anim.name);
                    scope.$apply();
                })
            }
        }

    }
}])
.directive('projector', [function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'shared/templates/components/containers/projector.tpl'
    }
}])
.directive('slides', [function() {
    return {
        retrict: 'E',
        replace: true,
        transclude: true,
        template: '<ion-slides  options="options" slider="data.slider"><ion-slide-page><div class="box blue"><h1>BLUE</h1></div></ion-slide-page><ion-slide-page>',
        controller: 'SwiperController',
        scope: {
            slides: '=slides'
        },
        link: {
            pre: function(scope, element, attr) {

            }
        }
    }
}])
.directive('animation', ['RootService', 'AnimationService', '$timeout', '$compile', function(RootService, AnimationService, $timeout, $compile) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: AnimationService.getAnimatableTemplateFunc,
    scope: {
        name: '@name',
        template: '@template',
        obj: '@import',
        stroke: '@stroke'
    },
    link: {
      pre: function(scope, element, attr) {
        $compile(element)(scope);
        var anim = AnimationService.initAnimationObj();
        scope.anim = anim;
        scope.anim.element = element;

        //if attr.template
        anim.template = RootService.getBaseUrl() + attr.template;


        //if attr.import
        anim.obj = AnimationService.getAnimationObjFromAnimationName(attr.import);
        // for (key in anim.obj.cssRules) console.log(anim.obj.cssRules[key]);

        anim.duration = attr.duration && parseFloat(attr.duration) || 3000;
        anim.direction = attr.direction;
        anim.func = attr.func.replace('cb', 'cubic-bezier');
        anim.delay = attr.delay|| 0;
        anim.css = anim.obj.cssText;
        anim.playState = (((attr.play === 'true') && "running") || "paused");
        anim.iter = attr.iter;
        anim.fillMode = attr.fillMode;
        anim.listeners = {start: AnimationService.getStartListener(scope.anim, element[0]), end: AnimationService.getEndListener(scope.anim, element[0])}
        anim.name = attr.import;
        var cb = function(element) {
            $compile(element)(scope);
            $timeout(function() {
                scope.$apply();
            })
        }
        scope.$parent.root.inspectAnimations.push(anim);
        AnimationService.injectAnimationWithPlayer(scope.anim, element, cb);
      }
    }
  }
}])
// .directive("userIcon", ['$compile', function($compile) {
//         return {
//             templateUrl: BASE + 'templates/elements/components/info/user.icon.tpl',
//             scope: {
//                 url: '=url',
//                 size: '=size'
//             },
//             replace: true,
//             restrict: 'E',
//             link: function(scope, element, attr) {
//                 scope.size =  scope.size || attr.size || 'small';
//                 scope.url =  scope.url || attr.url || 'https://uguru.me/static/remote/img/avatar.svg';
//                 if (scope.size && scope.size === 'small') {
//                     scope.size = '32'
//                 } else if (scope.size && scope.size === 'medium') {
//                     scope.size = '64'
//                 }
//                 if (!scope.url || !scope.url.length) {
//                     scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
//                 }
//                 var request = new XMLHttpRequest();
//                 request.open('GET', scope.url, true);
//                 request.onreadystatechange = function() {
//                     if (request.readyState === 4) {
//                         if (request.status === 404) {
//                             scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
//                             // element.attr('url',scope.url);
//                             // $compile(element.contents())(scope);
//                             // scope.$apply();
//                             // console.log('Check',scope.url, typeof(scope.url))

//                         }
//                     }
//                 };
//                 // request.send()

//             }
//         };
//     }])
