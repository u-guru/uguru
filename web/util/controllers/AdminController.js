
angular.module('uguru.admin')
.controller('AdminController', [

    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$localstorage',
    '$interval',
    'FileService',
    'LoadingService',
    'KeyboardService',
    '$compile',
    'AnimationService',
    function($scope, $state, $stateParams, $timeout, $localstorage, $interval, FileService,
             LoadingService, KeyboardService, $compile, AnimationService) {
        // (!$scope.user || !$scope.user.id) && $state.go('^.desktop-login');

        $timeout(function() {
            $scope.layout = {index:3};
        })
        $scope.$on('$ionicView.enter', function() {
            if (!$scope.user) {
                $scope.user = {name: 'jason', profile_url: 'https://uguru.me/static/web/images/team/jason.png'}
            }
            $scope.adminUser = {name: '', profile_url:''};
            first_name = $scope.user.name.split(' ')[0].toLowerCase();
            profile_url = $scope.user.profile_url;
            $scope.adminUser.name = first_name;
            $scope.adminUser.profile_url = profile_url;
            $timeout(function() {
                if (!$scope.layout.index) {
                    // initAll();
                    //     importLastAnimation();
                    //     importLastStage();
                }
            }, 2000)
        })

        var defaults = {
            KF_COUNT: 100,
            DURATION: 1,
            KF_INTERVALS:100,
            SHAPE_DICT: getShapeDict()
        }

        //@gabrielle
        var ctrlShortcuts = [

            {   letter: 's',
                description: 'Saves animation + stage',
                keyCode: 83,
                func: saveAll
            },
            {   letter: 't',
                description:'Toggles sidebar tab forward',
                keyCode: 84,
                func: toggleTabForward
            },
            {
                letter: 'i',
                description:'Opens import window',
                keyCode: 73,
                func: function() { $scope.root.triggers.runSequence(['click:#import-button:0'], 100) }
            },
            {
                letter: 'd',
                description:'Imports codepen and opens child selector',
                keyCode: 68,
                func: function() { $scope.root.triggers.runSequence(['click:#import-codepen-button:0', 'click:#select-child-button:50'], 100) }
            },
            {
                letter: 'e',
                description:'Opens export window',
                keyCode: 69,
                func: function() { $scope.root.triggers.runSequence(['click:#export-button:0'], 100) }
            },
            {
                letter: 'space',
                description:'Plays stage',
                keyCode: 32,
                func: function() { $scope.root.triggers.runSequence(['click:#play-stage-button:0'], 100) }
            },
            {
                letter: 'p',
                description:'Plays keyframes',
                keyCode: 80,
                func: function() { $scope.root.triggers.runSequence(['click:#play-keyframes-button:0'], 100) }
            },
            {
                letter: 'n',
                description:'Adds new time state',
                keyCode: 78,
                func: function() { $scope.root.triggers.runSequence(['click:#add-time-state-button:0'], 100) }
            },
            {
                letter: '1',
                description:'switches tab on import focus',
                keyCode: 49,
                func: function() { $scope.root.triggers.runSequence(['click:#import-tab-bar a:nth-child(1)'], 100) }
            },
            {
                letter: '2',
                description:'switches tab on import focus',
                keyCode: 50,
                func: function() { $scope.root.triggers.runSequence(['click:#import-tab-bar a:nth-child(2)'], 100) }
            },
            {
                letter: '3',
                description:'switches tab on import focus',
                keyCode: 51,
                func: function() { $scope.root.triggers.runSequence(['click:#import-tab-bar a:nth-child(3)'], 100) }
            },
            {
                letter: '4',
                description:'switches tab on import focus',
                keyCode: 52,
                func: function() { $scope.root.triggers.runSequence(['click:#import-tab-bar a:nth-child(4)'], 100) }
            }
            // {
            //  letter: 'left-arrow',
            //  description: 'shifts keyframe one to the left (if possible)',
            //  keyCode: 188,
            //  func: toggleSelectedKFToLeft
            // },
            // {
            //  letter: 'right-arrow',
            //  description: 'shifts keyframe one to the right (if possible)',
            //  keyCode: 190,
            //  func: toggleSelectedKFToRight
            // }
        ]

        $scope.player = initAnimationPlayer();
        $scope.timer = initAnimationTimer()
        $scope.defaults = {};
        $scope.animationDropdown = {toggleActive:true, options:['No animation selected', 'Import Animation'], selectedIndex: 0, label:'Current Animation', size:'small', onOptionClick:function(option, index) {if (index === 1) {$scope.layout.index = 1; $scope.importLayoutIndex = 1; } else if (index === 2) { ($scope.saveAnimationClass($scope.animation))} $timeout(function() {$scope.animationDropdown.selectedIndex = 0}, 500)}}
        $scope.stageDropdown = {toggleActive: true,options:['No stage selected', 'Import Stage'], selectedIndex: 0, label:'Current Stage', size:'small', onOptionClick: onStageDropdownSelected};
        $scope.keyframeBar = {pointerVal: 0};
        $scope.animationDict = {importTextarea:'', importInput: ''};
        $scope.imports = {animations: [], stages:[]};
        $scope.layout = {index: 0};
        $scope.shapesDropdown = {options: Object.keys(defaults.SHAPE_DICT), label: "Inject Shape", size: "normal", selectedIndex:0, onOptionClick: addSVGPlaceholder}
        $scope.animationDirectionOptions = {options: ["normal", "reverse", "alternate", "alternate-reverse"], selectedIndex: 0, size: "small", onOptionClick: setAnimationDirectionFunc};
        $scope.animationTimingFunc = {options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "set-start", "step-end", "cubic"], selectedIndex: 0, size: "small", onOptionClick: setAnimationTimeFunc};
        $scope.animationFillMode = {options: ["none", "forwards", "backwards", "both"], selectedIndex: 0, size:'small', onOptionClick:setAnimationFillMode};
        // $scope.stage = $scope.imports.stages[0];

        function getHIWStage() {
            return {
                owner: 'samir',
                stageHtml: '<span class="initiator"> <svg id="stage-elem" on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Library Icon</tspan> </text> </g> </svg><svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Campus Stadium</tspan> </text> </g> </svg><svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Campus Tower</tspan> </text> </g> </svg> <svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="100" viewBox="0 0 200 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="197" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="55">Uguru Billboard</tspan> </text> </g> </svg></span>',
                stageName: 'HIW-Stage-1',
                animElemSelector: '#stage-elem',
                stageCss: '',
                time_states: [{time: 1000, actions:[]}]
            }
        }

        function onStageDropdownSelected(option, index) {
            if (index === 1) {
                $scope.layout.index = 1;
                $scope.importLayoutIndex = 2;
            } else
            if (index === 2) {
                $scope.saveStageHtml($scope.animation);
            } else
            if (index === 3) {
                clearStageTemplate($scope.stage);
            }

            $timeout(
                function()
                {
                    $scope.stageDropdown.selectedIndex = 0
                }, 500)
        }

        function initNewStage(stage_name, html, css, anim_selector) {
            var anim_selector = anim_selector || '#stage-elem';
            var firstName = $scope.user && $scope.user.name && $scope.user.name.split(' ')[0].toLowerCase();
            return {
                owner: firstName || 'samir',
                stageHtml: html,
                stageName: stage_name,
                animElemSelector: anim_selector,
                stageCss: css,
                time_states: [{time: 1000, actions: []}]
            }
        }

        var callbackKeyDownFunc;
        var parentViewContainer = document.querySelector('#keys');
        var cmdPressed;
        var ctrlPressed;
        function saveAll(e) {
            // console.log('ctrl', e.keyCode, 'pressed');
            $scope.saveStageHtml();  $scope.saveAnimationClass($scope.animation, $scope.user.name.split(' ')[0].toLowerCase())};
        function toggleTabForward(e) {
            // console.log('right-arrow', e.keyCode, 'pressed');
            $scope.asideTabIndex = Math.abs(($scope.asideTabIndex + 1) % 3)};

        $scope.asideTabIndex = 2;
        $scope.kfTools = {cloneConfirm: false};
        $scope.animationPreview = {collapsed: true};
        $scope.kf_visuals = {arr: [], show: true, cache:true, onChange: triggerGetCSSRulesArr};
        $scope.intervals = {arr: [], enabled: false, count: 5, onCheck: onIntervalCheckbox, onChange: onChangeIntervalState};
        $scope.animationSneakPreview = {show: false, content: ''};
        $scope.showKFBarPercentage = {show: false};
        $scope.keyShortcuts = {
                ctrl: ctrlShortcuts
        }



        function onChangeIntervalState(count) {

            $timeout(function() {
                if ($scope.intervals.enabled) {
                    $scope.intervals.arr = newArrSize($scope.intervals.count);
                }
            })
        }

        function onIntervalCheckbox(value) {
            $timeout(function() {
                if (value) {
                    onChangeIntervalState($scope.intervals.count);
                }
                $scope.$apply();
            }, 100)
        }

        function getCSSRulesArr(css_rules) {
            var resultArr = [];
            for (var i = 0; i < css_rules.length; i++) {
                var indexRule = resultArr[i];
                resultArr.push({
                    keyText: css_rules.item(i).keyText,
                    onNgClick: setKFToActive
                })
            }
            console.log(resultArr);
            return resultArr.slice();

            function setKFToActive(kf_keytext) {
                $scope.setActiveKeyFrame(kf_keytext.replace('%', ''))
            }
        }

        function triggerGetCSSRulesArr(value) {
            $timeout(function () {
                if (value) {
                    $scope.kf_visuals.arr = getCSSRulesArr($scope.animation.obj.cssRules);
                }
                $scope.$apply();
            }, 100)
        }

        function newArrSize(num) {
            var resultArr = [];
            for (var i = 0; i <= num; i++) {
                var indexValue = i * 1.0 * (100.0/num);
                resultArr.push({
                    left: parseFloat(indexValue, 2),
                    value: indexValue,
                    onClick: $scope.setClosestActiveKeyFrame
                })
            }
            return resultArr;
        }
        $scope.newArrSize = newArrSize;
        $scope.getCSSRulesArr = getCSSRulesArr;
        $scope.cssRulesArr = [];

        function initShortCuts() {
            KeyboardService.initOptionPressedAndReleasedFunction(on_pressed_cmd, on_released_cmd, 91, 'metaKey', null, 1000);
            KeyboardService.initOptionPressedAndReleasedFunction(on_pressed_ctrl, on_released_ctrl, 17, 'ctrlKey', null,  100);
            function on_pressed_ctrl(e) {
                ctrlPressed = true;
                for (var i = 0; i < $scope.keyShortcuts.ctrl.length; i++) {
                    var indexKeyshortcut = $scope.keyShortcuts.ctrl[i];
                    initKeyboardFunctionOnce(indexKeyshortcut.letter, indexKeyshortcut.keyCode, indexKeyshortcut.func);
                }
            }

            function on_released_ctrl(e) {
                ctrlPressed = false;
                console.log('ctrl', ctrlPressed)
            }

            function on_pressed_cmd(e) {
                //save all
                //view short cuts
                //import
                //left --> toggle aside
                console.log('cmd pressed');
                cmdPressed = true;
                $timeout(function() {
                    if (cmdPressed) {
                        console.log('should be showing shortcuts');
                        $scope.showShortcuts = true;
                    }
                }, 1000)

            }
            function on_released_cmd(e) {
                cmdPressed = false;
                $scope.showShortcuts = false;
                parentViewContainer.removeEventListener(callbackKeyDownFunc, function(e) {console.log(e, 'keydown event listener removed')});

            }
        }

        function initKeyboardFunctionOnce(key, code, cb_pressed) {
            console.log('initializing', key, code);
            var defaultOnRelease = function(e) {
                console.log(key, e.keyCode, 'released');
                $timeout(function() {
                    document.removeEventListener('keyup', cb_pressed);
                    document.removeEventListener('keydown', defaultOnRelease);
                }, 2500);
            }
            KeyboardService.initOptionPressedAndReleasedFunction(cb_pressed, defaultOnRelease, code, null, true, 100);
        }

        function findStageByName(stage_name) {
            if (!$scope.imports.stages || !$scope.imports.stages.length) {
                console.log('stages from amazon not yet loaded.. trying again in 2seconds')
                // $timeout(function() {
                //  initStageDropdown();
                // }, 2000)
                return;
            }
            for (var i = 0; i < $scope.imports.stages.length; i++) {
                var stageIndex = $scope.imports.stages[i];
                if (stageIndex.stageName === stage_name) {
                    return stageIndex;
                }
            }
        }

        function initStageDropdown() {
            var lastActiveStageName = $localstorage.getObject('last_stage_active');
            if (lastActiveStageName && lastActiveStageName.length) {
                // var lastUsedStage = findStageByName(lastActiveStageName);
                // if (lastUsedStage) {
                //  var stageOptions = [lastActiveStageName, 'save', 'save and import', 'save and clear'];
                //  var stageLabel = 'Active Stage'
                //  $scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:true, size:'small'};
                //  importPageDom(lastUsedStage);
                //  return;
                // }

            } else {
                var stageOptions = ['none', 'import stage', 'create new stage'];
                var stageLabel = "Current Stage"
                // $scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:false, size:'small'};
                return {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:false, size:'small'};
            }

            // if (lastActiveStage)
            // var stageInactiveOptions = ['import stage', 'init stage', 'clear stage'];
            //if init stage, ask for name right away
        }

        function onStageDropdownClick(option, index) {
                if ($scope.stageDropdown.stageActive) {
                    switch (index) {
                        case 1:
                            $scope.saveStageHtml();
                            $scope.stageDropdown.selectedIndex = 0;
                            break
                        case 2:
                            $scope.saveStageHtml();
                            $timeout(function() {
                                $scope.layout.index = 1;
                                $scope.importLayoutIndex = 3;
                                $scope.stageDropdown.selectedIndex = 0;
                            }, 1500);
                            break;
                        case 3:
                            $scope.saveStageHtml();
                            $timeout(function() {
                                $scope.stage = null;
                                $scope.resetStageDom();
                                $localstorage.setObject('last_stage_active', null);
                            }, 1500);
                            break;
                    }
                } else {
                    switch (index) {
                        case 1:
                            $scope.layout.index = 1;
                            $scope.importLayoutIndex = 3;
                            $scope.stageDropdown.selectedIndex = 0;
                            return;
                        case 2:
                            $scope.layout.index = 1;
                            $scope.importLayoutIndex = 3;
                            $scope.stageDropdown.selectedIndex = 0;
                            return;
                    }
                }
            }

        $scope.goToEditAnimationClass = function() {
            $scope.layout.index = 1;
            $scope.importLayoutIndex = 1;

            $timeout(function() {
                $scope.animationImportSearchText = $scope.animation.obj.name;
                $timeout(function() {
                    var elemAnimationInput = document.querySelector('#import-animation-input');
                    elemAnimationInput && elemAnimationInput.select();
                }, 500)
            }, 100)
        }
        function saveDropdownOnClick(option, index) {
            if (index === 1) {
                $scope.saveStageHtml()
            } else
            if (index === 2) {
                $scope.saveAnimationClass($scope.animation);
            } else
            if (index === 3) {
                $scope.saveAnimationClass();
                $timeout(function() {
                    $scope.saveStageHtml();
                }, 5000)
            }
        }

        $scope.onTimeStateBlur = function(time_state) {
            time_state.editMode = false;
            $scope.stage.time_states.sort(function(time_state_a, time_state_b) {
                return parseInt(time_state_b.time) - parseInt(time_state_a.time);
            }).reverse();
        }

        $scope.onTimeStateActionComponentInputFocused = function(time_state, action) {
            $scope.cancelTimeStateActionAnimationClassInputFocused();
            $scope.stage.selectComponentMode = true;
            $scope.stage.selectComponentModeTimeState = time_state;
            $scope.stage.selectComponentModeAction = action;
            var stageContainer = document.querySelector('#stage-container');
            var allDraggableElems = stageContainer.querySelectorAll('[draggable]');
            $scope.stage.components = [];
            for (var i = 0; i < allDraggableElems.length; i++) {
                $scope.stage.components.push({selector: '[draggable-clone-' + i + ']'});
            }
            $timeout(function() {
                $scope.$apply();
                $timeout(function() {
                    for (var i = 0; i < allDraggableElems.length; i++) {
                        var indexElem = allDraggableElems[i];
                        $scope.stage.components[i]._class = indexElem.getAttribute('class');
                        indexElem.setAttribute('draggable-' + i, null);
                        var clonedNode = indexElem.cloneNode(true);
                        clonedNode.removeAttribute('draggable');
                        clonedNode.setAttribute('draggable-clone', null);
                        clonedNode.setAttribute('draggable-clone-' + i, null);

                        var allContainers = document.querySelectorAll('.cloned-animatable-elem-container')
                        var indexContainer = allContainers[i];
                        var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
                        if (allShapes.indexOf(clonedNode.nodeName) > -1) {
                            var parentSVG = findParentSVG(indexElem);
                            var clonedParentSVG = parentSVG.cloneNode(true);
                            clonedParentSVG.innerHTML = "";
                            clonedParentSVG.appendChild(clonedNode);
                            clonedParentSVG.className += ' absolute';
                            clonedParentSVG.style.minWidth = "100px";
                            clonedParentSVG.style.minHeight = "100px";
                            clonedParentSVG.style.maxWidth = "200px";
                            clonedParentSVG.style.maxHeight = "200px";
                            indexContainer.appendChild(clonedParentSVG);
                            secondClonedParent = clonedParentSVG.cloneNode(true)
                            indexContainer.appendChild(secondClonedParent);
                        } else {
                            clonedNode.className += ' absolute';
                            clonedNode.style.minWidth = "100px";
                            clonedNode.style.minHeight = "100px";
                            clonedNode.style.maxWidth = "200px";
                            clonedNode.style.maxHeight = "200px";
                            indexContainer.appendChild(clonedNode);
                            secondClonedNode = clonedNode.cloneNode(true)
                            indexContainer.appendChild(secondClonedNode);
                        }
                    }
                })
            })
        }

        $scope.onTSActionComponentSelected = function(selector, $event) {
            $scope.stage.selectComponentModeAction.selector = selector;
            $scope.cancelTimeStateActionComponentInputFocused();
        }

        $scope.clearCache = function() {
            window.sessionStorage.clear();
            window.localStorage.clear();
            window.location.reload(true);
        }

        $scope.onTSActionAnimationClassSelected = function(animation) {
            var cssText = animation.cssText;
            var animName = animation.name;
            var animClassText = animation.classText;
            var js_anim_obj = importAnimationFromRawCssText(cssText, animName);
            var final_obj = initAnimationFromAnimObj(js_anim_obj);
            $scope.stage.selectComponentModeAction.animation = final_obj;
            console.log(final_obj);
            // var rawCSSText = indexCssRule.cssText;
            // var animationName = indexCssRule.name;
            // console.log('processing', animationName);
            // $scope.saveAnimationClass(final_obj, styleSheetName);
            // $scope.importFromCSSText(animation.cssText, animation.name, animation.classText);

            // $scope.stage.selectComponentModeAction.selector = selector;
            $scope.cancelTimeStateActionAnimationClassInputFocused();
        }

        $scope.onTimeStateActionAnimationClassInputFocused = function(time_state, action) {
            $scope.cancelTimeStateActionComponentInputFocused();
            $scope.stage.searchAnimationMode = true;
            $scope.stage.searchAnimationModeTimeState = time_state;
            $scope.stage.selectComponentModeAction = action;
        }

        $scope.cancelTimeStateActionAnimationClassInputFocused = function(time_state) {
            $scope.stage.searchAnimationMode = false;
            $scope.stage.searchAnimationModeTimeState = null;
            $scope.stage.selectComponentModeAction = null;
        }

        $scope.cancelTimeStateActionComponentInputFocused = function(time_state) {
            $scope.stage.selectComponentMode = false;
            $scope.selectComponentModeTimeState = null;
            $scope.stage.selectComponentModeAction = null;
        }

        $scope.removeTimeState = function(time_state, index) {
            $scope.stage.time_states.splice(index, 1);
        }

        $scope.initStageTimeState = function() {
            if (!$scope.stage.time_states) {
                $scope.stage.time_states = [];
            }
            for (var i = 0; i < $scope.stage.time_states.length; i++) {
                var indexTimeState = $scope.stage.time_states[i];
                if (!indexTimeState.time) {
                    LoadingService.show('There is already a time state without a time! Please remove or use that one');
                    return;
                }
            }
            $scope.stage.time_states.push({description:null, time:1000, editMode:true, actions:[]});
            $timeout(function() {
                $scope.$apply();
                var allActionInputs = document.querySelectorAll('input.time-input');
                if (allActionInputs && allActionInputs.length) {
                    var timeElem = allActionInputs[allActionInputs.length - 1]
                    timeElem.select();
                }
            })
        }

        $scope.playStageTimeStates = function() {
            var stageElem = document.querySelector('#stage-container');
            var time_states = $scope.stage.time_states;
            if (stageElem) {
                $scope.stage.cache_html = stageElem.innerHTML;
            }

            var maxTimeState = 0;
            for (var i = 0; i < time_states.length; i++) {
                var indexTimeDelay = time_states[i].time;
                playTimeState(time_states[i].time, time_states[i].actions)
                if (parseInt(indexTimeDelay) > maxTimeState) {
                    maxTimeState = indexTimeDelay;
                }
            }
            console.log('max time is', maxTimeState, 'ms');

            $timeout(function() {
                console.log('reinitializing in 5s');
                stageElem.innerHTML = $scope.stage.cache_html;
                $compile(stageElem)($scope);
            }, maxTimeState + 5000);
            $timeout(function() {
                LoadingService.showMsg('Reinitializing stage...', 2500, function() {
                    LoadingService.showSuccess('Stage successfully reset', 2000);
                });
            }, 2500)

            function playTimeState(time_delay, actions) {
                $timeout(function() {
                    for (var j = 0; j < actions.length; j++) {
                        var index_action = actions[j];
                        var indexAnimation = index_action.animation;
                        var indexStageSelector = index_action.selector.replace('-clone', '');
                        var actionElem = document.querySelector(indexStageSelector);

                        actionElem.style[browserPrefix + 'AnimationName'] = indexAnimation.obj.name;
                        actionElem.style['animationName'] = indexAnimation.obj.name;
                        actionElem.style[browserPrefix + 'AnimationDuration'] = indexAnimation.attr.duration;
                        actionElem.style['animationDuration'] = indexAnimation.attr.duration;
                        actionElem.style[browserPrefix + 'AnimationIterationCount'] = indexAnimation.attr.iteration_count;
                        actionElem.style['animationIterationCount'] = indexAnimation.attr.iteration_count;
                        actionElem.style[browserPrefix + 'AnimationTimingFunction'] = indexAnimation.attr.timing_function;
                        actionElem.style['animationTimingFunction'] = indexAnimation.attr.timing_function;
                        actionElem.style[browserPrefix + 'AnimationFillMode'] = indexAnimation.attr.fill_mode;
                        actionElem.style['animationFillMode'] = indexAnimation.attr.fill_mode;
                        actionElem.style[browserPrefix + 'AnimationDirection'] = indexAnimation.attr.direction;
                        actionElem.style['animationDirection'] = indexAnimation.attr.direction;
                        actionElem.style[browserPrefix + 'AnimationDelay'] = indexAnimation.attr.delay;
                        actionElem.style['animationDelay'] = indexAnimation.attr.delay;

                    }
                }, parseInt(time_delay))
            }
        }

        $scope.addActionToTimeState = function(time_state) {
            time_state.actions.push({selector: 'replace with selector', animation: {attr:{name:'replace w/ animation'}}});
            $timeout(function() {
                $scope.$apply();
                var allActionInputs = document.querySelectorAll('input.action-input');
                if (allActionInputs && allActionInputs.length) {
                    var classElem = allActionInputs[allActionInputs.length - 1]
                    var selectorElem = allActionInputs[allActionInputs.length - 2];
                    selectorElem.select();
                }
            })
        }

        $scope.remoteStateTimeStates = function(time_state, index) {
            if (time_state.time_confirmed && time_state.time_approved) {
                $scope.stage.time_state.splice(index, 1);
            }
        }

        function getShapeDict() {
            var shapeDict = {
                circle: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"><g fill="none"><circle stroke="rgba(255,255,255,0.8)" stroke-width="3" cx="50" cy="50" r="48.5"></circle><text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"><tspan x="50" y="54">circle</tspan></text></g></svg>',
                square: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="97" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="54">square</tspan> </text> </g> </svg>',
                rect: '<svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="100" viewBox="0 0 200 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="197" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="55">rectangle</tspan> </text> </g> </svg>',
                hexagon: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">hexagon</tspan> </text> </g> </svg>',
                octagon: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">octagon</tspan> </text> <path d="M70.0893578,1.5 L98.5,29.9106422 L98.5,70.0893578 L70.0893578,98.5 L29.9106422,98.5 L1.5,70.0893578 L1.5,29.9106422 L29.9106422,1.5 L70.0893578,1.5 L70.0893578,1.5 Z" stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>',
                parallelogram: '<svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="50" viewBox="0 0 200 50"> <g fill="none"> <path d="M23.2259184,5.95340971 C24.481859,3.49385944 27.7347336,1.5 30.4909811,1.5 L188.498497,1.5 C194.022175,1.5 196.747033,5.61947272 194.58442,10.7016135 L180.454099,43.9078668 C179.37488,46.4440319 176.262066,48.5 173.499572,48.5 L11.4913933,48.5 C5.97329914,48.5 3.53587345,44.5130812 6.04949493,39.5905724 L23.2259184,5.95340971 Z" stroke="rgba(255,255,255,0.8)" stroke-width="3"></path> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="30">parallelogram</tspan> </text> </g> </svg>',
                custom: null,
            }
            return shapeDict;
        }

        $scope.pageDom = {stageHtml: "", animElemSelector: "stage-elem", stageCss: ""};
        $scope.goToEditPageDom = function() {
            $scope.pageDom.stageHtml = document.querySelector('#stage-container').innerHTML;
        }

        function addSVGPlaceholder(svg_shape)  {


            if (svg_shape in defaults.SHAPE_DICT) {
                var newDiv = $scope.appendToPageDom(defaults.SHAPE_DICT[svg_shape]);
            }

            var stageElem = document.querySelector('#stage-container');
            var actorElem = stageElem.querySelector('#stage-elem') || stageElem.querySelector('#' + $scope.pageDom.animElemSelector);
            if (!actorElem) {
                $scope.setAnimatableElement({target: newDiv});
            }

        }

        $scope.addSVGPlaceholder = addSVGPlaceholder;

        $scope.resetStageDom = function() {
            var resetHtml = '<span class="initiator"> Html Successfully Reset! <br> Add some svg placeholder elements ! </span>'
            $scope.pageDom.stageHtml = resetHtml;
            $scope.pageDom.stageName = null;
            $scope.pageDom.stageCss = null;
            $scope.pageDom.animElemSelector = null;
            $scope.stageDropdown.options[0] = 'No stage selected';

            LoadingService.showMsg('Resetting', 3000, function() {
                LoadingService.showSuccess('Success!', 2000);
                $scope.updatePageDom();
            })
        }

        $scope.appendToPageDom = function(html_node) {
            var tempWrapper= document.createElement('div');
            tempWrapper.innerHTML= html_node;
            var div= tempWrapper.firstChild;
            $compile(div)($scope);
            var stageElem = document.querySelector('#stage-container');
            var stageContainsInitiator = stageElem.querySelector('.initiator');
            if (stageContainsInitiator) {
                stageElem.removeChild(stageContainsInitiator);
            }
            stageElem.appendChild(div);
            return div;
        }

        $scope.selectComponentElement = function(component, $index, $event) {
            if (!$scope.asideTabIndex) {
                $scope.onTSActionComponentSelected(component.selector)
            } else {
                $scope.addAnimatableElement(component);

            }
        }

        $scope.addAnimatableElement = function(component) {
            if (!$scope.stage.anim_elements) {
                $scope.stage.anim_elements = [{selector: '#stage-elem', type:$scope.actor.nodeName}];
            }
            var stageContainer = document.querySelector('#stage-container');
            var numDraggable = stageContainer.querySelectorAll('[draggable]').length;
            if (component.orig_elem) {
                component.orig_elem.setAttribute("draggable", null);
                component.orig_elem.setAttribute("draggable-" + numDraggable, null);
                component.selector = "[draggable-" + numDraggable + ']';
                $timeout(function() {
                    $compile(component.orig_elem)($scope);
                    $scope.$apply();
                    component.orig_elem = null;
                })
            }
            $scope.stage.anim_elements.push(component);
            $timeout(function() {
                renderAsideAnimatableElems();
                $scope.$apply();
            }, 100)
        }

        $scope.swapFocusedAnimatedElem = function(anim_elem) {
            $scope.actor.id = null;
            $scope.actor = null;
            // $scope.actor.setAttribute(anim_elem.replace('[','').replace(']', ''), null);
            // $scope.actor.setAttribute('draggable', null);
            var newStageElem = document.querySelector(anim_elem.selector);
            $scope.setAnimatableElement({target:newStageElem});
            $timeout(function() {
                updateStageElemCloneAside();
                renderAsideAnimatableElems();
            })

        }

        $scope.setAnimatableElement = function($event) {



            var elem = $event.target;

            var allCurrentStageElems = document.querySelectorAll('#stage-elem');
            for (var i = 0; i < allCurrentStageElems.length; i++) {
                var indexCurrentStageElem = allCurrentStageElems[i];
                console.log('removing id stage-elem for elem', indexCurrentStageElem);
                indexCurrentStageElem.id = null;
            }

            elem.id = $scope.pageDom.animElemSelector || '#stage-elem';
            $scope.actor = elem;
            LoadingService.showMsg('updating...', 1000, function() {
                LoadingService.showSuccess('Complete!', 1000);
            })
            var stageElem = document.querySelector('#stage-container');
            // elem.style.stroke = 'white';
            // if (elem.nodeName === 'svg') {
            //  var allInnerElements = elem.querySelectorAll('polgyon, rect, circle, path, text');
            //  for (var i = 0; i < allInnerElements.length; i++) {
            //      var indexElem = allInnerElements[i];
            //      if (indexElem.nodeName === 'text') {
            //          indexElem.style.fill = 'white';
            //      } else {
            //          indexElem.style.stroke = 'white';
            //      }

            //  }
            // }
            $compile(stageElem)($scope);
            elem.classList.add('animated', 'pulse');
            $timeout(function() {
                elem.classList.remove('animated', 'pulse', 'infinite');
            }, 1000)
        }

        function importPageDom(stage_template) {

            $scope.stage = stage_template;
            $scope.stageDropdown.options[0] = stage_template.stageName;
            if (!$scope.stage.time_states || !$scope.stage.time_states.length) {
                $scope.stage.time_states = [];
            }
            for (var i = 0; i < $scope.stage.time_states.length; i++) {
                var indexTimeState = $scope.stage.time_states[i];
                for (var j = 0; j < indexTimeState.actions.length; j++) {
                    var indexAction = indexTimeState.actions[j];
                    if (indexAction.animation && indexAction.animation.attr && indexAction.animation.attr.name) {
                        var animationObj = findAnimationByName(indexAction.animation.attr.name, $scope.imports.animations)
                        var cssText = animationObj.cssText;
                        var animName = animationObj.name;
                        var animClassText = animationObj.classText;

                        indexAction.animation = importAndProcessAnimationCSSTextByKF(cssText, animName);
                    }
                }
            }
            $localstorage.setObject('last_stage_active', $scope.stage.stageName);

            $scope.updatePageDom(stage_template.stageName, stage_template.stageHtml, stage_template.stageCss, stage_template.animElemSelector.replace('#', ''));
        }
        $scope.importPageDom = importPageDom;

        function findAnimationByName(name, animation_arr) {
            for (var i = 0; i < animation_arr.length; i++) {
                var indexAnimation = animation_arr[i];
                if (indexAnimation.name === name) {
                    return indexAnimation
                }
            }
        }
        function updateStageElemCloneAside(stage_elem) {
            var stageElem = stage_elem || document.querySelector('#stage-elem');
            if (!stageElem) {
                var stageContainer = document.querySelector('#stage-container');
                stageElem = stageContainer.firstChild;
            }


            var allStageElemNodes = document.querySelectorAll('.stage-elem-clone-container')
            for (var i = 0; i < allStageElemNodes.length; i++) {
                var clonedNode = stageElem.cloneNode(true);
                var asideElementContainer = allStageElemNodes[i];

                if (asideElementContainer) {
                    asideElementContainer.innerHTML = '';
                    var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
                    if (allShapes.indexOf(clonedNode.nodeName) > -1) {
                        var parentSVG = findParentSVG(stageElem);
                        var clonedParentSVG = parentSVG.cloneNode(true);
                        clonedParentSVG.innerHTML = "";
                        clonedParentSVG.appendChild(clonedNode);
                        clonedParentSVG.id = 'stage-elem-clone-' + i;
                        clonedParentSVG.className += ' absolute';
                        clonedParentSVG.style.minWidth = "150px";
                        clonedParentSVG.style.minHeight = "150px";
                        clonedParentSVG.style.maxWidth = "200px";
                        clonedParentSVG.style.maxHeight = "200px";
                        asideElementContainer.appendChild(clonedParentSVG);
                    }
                    else {
                        clonedNode.id = 'stage-elem-clone-' + i;
                        clonedNode.style.minWidth = "150px";
                        clonedNode.style.minHeight = "150px";
                        clonedNode.className += ' absolute';
                        clonedNode.style.maxWidth = "200px";
                        clonedNode.style.maxHeight = "200px";
                        asideElementContainer.appendChild(clonedNode);
                    }
                }
            }
            $timeout(function() {
                $scope.$apply();
            })
        }

        $scope.updatePageDom = function(stage_name, stage_html, stage_css, anim_selector) {
            $scope.pageDom.stageHtml = stage_html || $scope.pageDom.stageHtml;
            $scope.pageDom.stageCss = stage_css || $scope.pageDom.stageCss;
            $scope.pageDom.stageName = stage_name || $scope.pageDom.stageName;
            $scope.pageDom.animElemSelector = anim_selector || $scope.pageDom.animElemSelector;

            LoadingService.showAmbig(null, 1000);
            if ($scope.pageDom.stageHtml && $scope.pageDom.stageHtml.length) {
                if (!$scope.stage) {
                    $scope.stage = $scope.pageDom;
                }
                var stageContainer = document.querySelector('#stage-container');
                stageContainer.innerHTML = $scope.pageDom.stageHtml;
                if (stageContainer.firstChild) {
                    var stageElem = document.querySelector('#stage-elem');
                    if (stageElem) {
                        $scope.actor = stageElem;
                        stageElem.setAttribute("draggable", true);
                        updateStageElemCloneAside();
                    } else {
                        if (stageContainer && stageContainer.firstChild) {
                            $scope.actor = stageContainer.firstChild;
                            if (stageContainer.firstChild.setAttribute) {
                                stageContainer.firstChild.setAttribute("draggable", true);
                                updateStageElemCloneAside();
                            }
                        } else {
                            $timeout(function() {
                                $scope.updatePageDom(stage_name, stage_html, stage_css, anim_selector);
                            }, 1000)
                        }
                    }
                    if (stageContainer.children && stageContainer.children.length === 1) {
                        var firstChild = stageContainer.children[0];
                        var firstChildDimensions = firstChild.getBoundingClientRect();

                        if (!firstChildDimensions.height || !firstChildDimensions.width) {

                                firstChild.style.height = "50%";
                                firstChild.style.width = "50%";
                                firstChild.style.left = "0";
                                firstChild.style.top = "0";
                        }
                    }
                }
                $compile(stageContainer)($scope);
                // $scope.asideTabIndex = 1;
                if ($scope.pageDom.stageName && $scope.pageDom.stageName.length && $scope.pageDom.stageHtml && $scope.pageDom.stageHtml.length) {
                    $localstorage.setObject('last_stage', $scope.pageDom);
                    $scope.stageDropdown.options[0] = $scope.pageDom.stageName
                    if ($scope.stageDropdown.options.length <= 2 && $scope.pageDom.stageName && $scope.pageDom.stageName.length) {
                        $scope.stageDropdown.options.push('Save');
                        $scope.stageDropdown.options.push('Clear');
                    }
                }
                // var clonedNode = stageElem.cloneNode(true);
                // clonedNode.id = 'stage-elem-clone';
                // clonedNode.style.minWidth = "200px";
                // clonedNode.style.minHeight = "200px";
                // var asideElementContainer = document.querySelector('#stage-elem-clone-container')
                // if (asideElementContainer) {
                //  asideElementContainer.innerHTML = '';
                //  asideElementContainer.appendChild(clonedNode);
                // }
                // $timeout(function() {
                //  $scope.$apply();
                // })
            }

            if ($scope.pageDom.animElemSelector && $scope.pageDom.animElemSelector.length && $scope.pageDom.animElemSelector !== $scope.actor.id) {
                var newAnimationElem = document.querySelector('#' + $scope.pageDom.animElemSelector);
                if (newAnimationElem) {
                    $scope.actor = newAnimationElem;
                }
            }

            if ($scope.pageDom.stageCss && $scope.pageDom.stageCss.length) {
                var previousStyle = document.querySelector('#stage-css');
                var stageElem = document.querySelector('#stage-container');
                if (previousStyle) {
                    previousStyle.parentNode.removeChild(previousStyle);
                }
                var style = document.createElement("style");
                style.setAttribute('id', 'stage-css');
                style.innerHTML = $scope.pageDom.stageCss;
                document.getElementsByTagName("head")[0].appendChild(style);
                $compile(stageElem)($scope);
            } else {
                var previousStyle = document.querySelector('#stage-css');
                if (previousStyle) {
                    previousStyle.parentNode.removeChild(previousStyle);
                }
            }
            // $scope.layout.index = 0;
        }

        function setAnimationFillMode(option, index) {
            $scope.animation.attr.fill_mode = option;
        }

        $scope.updateNumIntervals = function(num_intervals) {
            if (num_keyframes === 'auto') {
                var firstKeyText = Object.keys($scope.animation.properties)[0];
                $scope.setActiveKeyFrame(firstKeyText)
                return;
            }
            defaults.KF_INTERVALS = num_intervals;
            $scope.setActiveKeyFrame(0 + '%');
            $scope.asideTabIndex = 2;
        }

        function setAnimationDirectionFunc(option, index) {
            $scope.animation.attr.direction = option;
        }

        function setAnimationTimeFunc(option, index) {
            if (index === $scope.animationTimingFunc.options.length - 1) {
                option = "cubic-bezier(0.1, 0.7, 1.0, 0.1)";
            }
            $scope.animation.attr.timing_function = option;

        }


        function toggleSelectedKFToRight() {
            var animPropertyPercentages = Object.keys($scope.animation.properties);
            var currentKFIndex = animPropertyPercentages.indexOf($scope.animation.selected_percent);
            if (currentKFIndex > -1) {
                var desiredPercentage =  animPropertyPercentages[(currentKFIndex + 1) % animPropertyPercentages.length];
                var percentValue = desiredPercentage.replace('%', '');
                console.log('current percent', desiredPercentage);
                $scope.setActiveKeyFrame(percentValue, currentKFIndex);
                $scope.asideTabIndex = 2;
            }
            $scope.showKFBarPercentage.show = true;
            $timeout(function() {
                $scope.showKFBarPercentage.show = false;
            }, 5000)
        }

        function toggleSelectedKFToLeft() {
            var animPropertyPercentages = Object.keys($scope.animation.properties);
            var currentKFIndex = animPropertyPercentages.indexOf($scope.animation.selected_percent);
            if (currentKFIndex > -1 && currentKFIndex < animPropertyPercentages.length) {
                if (currentKFIndex === 0) {
                    var desiredPercentage = animPropertyPercentages[animPropertyPercentages.length - 1];
                } else {


                    var desiredPercentage =  animPropertyPercentages[currentKFIndex - 1];
                }
                var percentValue = desiredPercentage.replace('%', '');
                $scope.setActiveKeyFrame(percentValue, currentKFIndex);
                $scope.asideTabIndex = 2;
            }
            $scope.showKFBarPercentage.show = true;
            $timeout(function() {
                $scope.showKFBarPercentage.show = false;
            }, 5000)
        }
        $scope.toggleLeftKFPlayBar = toggleSelectedKFToLeft
        $scope.toggleRightKFPlayBar = toggleSelectedKFToRight;

        $scope.setClosestActiveKeyFrame = function(new_index) {
            var animationPercentages = Object.keys($scope.animation.properties);
            animationPercentages.sort(function(val_a, val_b) {return parseFloat(val_b.replace('%', '')) - parseFloat(val_a.replace('%', ''))}).reverse();
            console.log(new_index, animationPercentages);
            var dMin = 101;
            var resultIndex = 0;
            for (var i = 0 ; i < animationPercentages.length; i++) {
                var indexPercentage = parseFloat(animationPercentages[i].replace('%', ''));
                var dX = Math.abs(new_index - indexPercentage);
                if (dX <= dMin) {
                    dMin = dX;
                    resultIndex = i;
                }
            }
            var closestPercentage = animationPercentages[resultIndex];
            $scope.animation.selected_kf_index = parseFloat(closestPercentage.replace('%', ''));
            $scope.setActiveKeyFrame(closestPercentage.replace('%', ''), resultIndex);
        }


        $scope.setActiveKeyFrame = function(value, index_value) {

            if (!index_value) {
                index_value = Object.keys($scope.animation.properties).indexOf(value + '%');
            }
            var intervalLength = parseInt(100/$scope.animation.attr.kf_intervals);
            var propertyDictCssMap = {'translateX': 'translateX', 'translateY': 'translateY', 'translateZ': 'translateZ', 'scale3DX': 'scaleX', 'scale3DY': 'scaleY', 'skewX':'skewX', 'skewY': 'skewY', 'rotate3DZ':'rotateZ', 'rotate3DY': 'rotateY', 'rotate3DX': 'rotateX', 'rotate3DAngle': 'rotate'};
            var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': 'px', 'scale3DX': '', 'scale3DY': '', 'skewX':'rad', 'skewY': 'rad', 'rotate3DZ':'rad', 'rotate3DY': 'rad', 'rotate3DX': 'rad', 'rotate3DAngle': 'rad'};



            var oldValue = $scope.animation.selected_index;
            var newPercentValue = value;
            $scope.animation.selected_kf_index = parseInt(value);
            $scope.animation.selected_index = index_value;
            $scope.animation.selected_percent = value + '%';
            $scope.animation.flex_selected_index = value;
            var newValue = value;
            $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
            var propertiesSorted = Object.keys($scope.animation.properties).sort(function(a, b) {
                return parseFloat(b.replace('%', '')) - parseFloat(a.replace('%', ''))
            }).reverse();
            var valueIndex = propertiesSorted.indexOf(value);


            //going backwards
            //for each property, check the last one it was edited, apply it to that
            //

            var currentPropertiesModified = Object.keys($scope.animation.properties[$scope.animation.selected_percent].modified);
            console.log($scope.animation.selected_percent, $scope.animation.properties[$scope.animation.selected_percent], currentPropertiesModified);
            var cssToChange;
            if (true) {
                var transformProperties = Object.keys(propertyDictCssMap);
                var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'transformOrigin', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
                var cssToChange = {transform: {}, etc: {}};
                for (var i = 0; i < currentPropertiesModified.length - 1; i++) {
                    var indexPropertyName = currentPropertiesModified[i]
                    for (var j = 0; j < valueIndex - 1; j++) {
                        console.log('checking t=', j, 'for traces of', indexPropertyName);
                        var previousIndexPercentValue = propertiesSorted[j];
                        if (!previousIndexPercentValue) {
                            continue;
                        }
                        var previousIndexProperty = $scope.animation.properties[previousIndexPercentValue];

                        var previousPropertyModifiedKeys = Object.keys(previousIndexProperty.modified);
                        if (previousPropertyModifiedKeys.indexOf(indexPropertyName) > -1) {
                            if (indexPropertyName in propertyDictCssMap) {
                                var cssVar = propertyDictCssMap[indexPropertyName];
                                var cssUnit = propertyDictCssUnit[indexPropertyName];
                                cssToChange.transform[propertyDictCssMap[indexPropertyName]] = '(' + previousIndexProperty[indexPropertyName] + cssUnit + ')';
                            } else {
                                cssVar = indexPropertyName;
                                cssValue = previousIndexProperty[indexPropertyName];
                                var cssUnit = '';
                                cssToChange.etc[cssVar] = cssValue;
                            }

                            console.log('setting', cssVar, 'at t=', j, 'from', $scope.animation.selected_keyframe[indexPropertyName] + cssUnit, 'to', previousIndexProperty[indexPropertyName] + cssUnit);
                        }
                    }

                }
                if (cssToChange && Object.keys(cssToChange.transform).length) {
                    // var transformCSStoChange = cssToChange.transform.join(" ");
                    var transformProperties = Object.keys(cssToChange.transform);
                    var transformCSStoChange ="";
                    for (var i = 0; i < transformProperties.length; i++) {
                        var indexTransformProperty = transformProperties[i];
                        var indexTransformValue = cssToChange.transform[indexTransformProperty];
                        transformCSStoChange += indexTransformProperty  + indexTransformValue;
                    }
                    $scope.actor.style['transform'] = transformCSStoChange;
                    $scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
                }
                if (cssToChange && Object.keys(cssToChange.etc).length) {
                    var nonTransformProperties = Object.keys(cssToChange.etc);
                    for (var i = 0 ; i < nonTransformProperties.length; i++) {
                        var indexProperty = nonTransformProperties[i];
                        var indexValue = cssToChange.etc[indexProperty];
                        $scope.actor.style[indexProperty] = indexValue;
                    }
                }
            }

            //leave it & override all the new ones
            //for each property, check the last one it was edited, apply it to that

            //clear all values;
            // var percentValue = getNthSortedKeyText($scope.animation.obj, newValue);
            var proposedKeyframe = $scope.animation.properties[(value) + '%'];
            $scope.animation.selected_keyframe = proposedKeyframe;


            if (true) {
                var transformProperties = Object.keys(propertyDictCssMap);
                var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
                var cssToChange = {transform: [], etc: {}};
                var newPropertiesToModify = Object.keys($scope.animation.selected_keyframe.modified);
                // console.log(newPropertiesToModify);
                for(var i = 0; i < newPropertiesToModify.length; i++) {
                    var indexPropertyName = newPropertiesToModify[i];
                    var propertyValue = $scope.animation.selected_keyframe[indexPropertyName]

                    if (indexPropertyName in propertyDictCssMap) {
                        var cssVar = propertyDictCssMap[indexPropertyName];
                        var cssUnit = propertyDictCssUnit[indexPropertyName];
                        cssToChange.transform.push(propertyDictCssMap[indexPropertyName] + '(' + propertyValue + cssUnit + ')');
                    } else {
                        cssVar = indexPropertyName;
                        cssValue = newPropertiesToModify[indexPropertyName];
                        var cssUnit = '';
                        cssToChange.etc[cssVar] = cssValue;
                    }
                }

                if (cssToChange && cssToChange.transform.length) {
                        var transformCSStoChange = cssToChange.transform.join(" ");
                        $scope.actor.style['transform'] = transformCSStoChange;
                        $scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
                    }
                if (cssToChange && Object.keys(cssToChange.etc).length) {
                    var nonTransformProperties = Object.keys(cssToChange.etc);
                    for (var i = 0 ; i < nonTransformProperties.length; i++) {
                        var indexProperty = nonTransformProperties[i];
                        var indexValue = cssToChange.etc[indexProperty];
                        $scope.actor.style[indexProperty] = indexValue;
                    }
                }

            }

            $timeout(function() {
                $scope.$apply();
            })
        }

        $scope.movePropertiesToKeyframeIndex = function(index) {
            console.log('proposing to move to keyframe index', index);
        }

        function initAnimationTimer() {


            function timerSetDuration(timer, time) {
                timer.duration = time;
            }

            function startTimer(timer, duration) {
                if (duration && duration.split('s').length) {
                    duration = parseInt(duration.replace('s', ''));
                }
                timer.time = 1;
                timer.duration = duration || 5;
                $scope.player.currentFrame = 0;
                console.log('time', timer.time, 'duration', timer.duration);
                timer.promise = $interval(function() {
                    if (!timer.time) {
                        return;
                    }
                    if (timer.time <= timer.duration) {
                        timer.time += 1
                    }
                }, 1000);
            }

            function resumeTimer(timer) {
                $interval.cancel(timer.promise);
                timer.promise = $interval(function() {
                    console.log('current time into animation is', timer.time);
                    if (timer.time < timer.duration) {
                        timer.time += 1
                        updateFramesIfNecessary(timer.time);
                    } else {
                        resetTimer(timer);
                    }
                }, 1000);
            }

            function updateFramesIfNecessary(time_s, duration, num_keyframes) {
                return;
            }

            function pauseTimer(timer) {

                $interval.cancel(timer.promise);
                timer.paused = true;

            }

            function resetTimer(timer) {
                $timeout(function() {
                    timer.time = 0;
                    timer.paused = null;
                    if (timer.promise) {
                        $interval.cancel(timer.promise);
                        timer.promise = null;

                    }
                }, 2000)
            }

            return {
                setDuration: timerSetDuration,
                promise: null,
                start: startTimer,
                resume: resumeTimer,
                pause: pauseTimer,
                reset: resetTimer,
                time: null,
                duration: 5,
            }

        }

        function initAnimationPlayer() {
            return {
                play: playElemAnimation,
                set: setAnimProperty,
                status: 0,
                settings: false,
                toggleSettings: toggleSettings,
                pause: pauseDanceMoveElem,
                reset: resetDanceMoveElem,
                resume: resumeDanceMoveElem,
                replay: resetDanceMoveElem,
                currentFrame: 0,
                setMode: {
                    options: [{name: "fast", speed: 250}, {name: "medium", speed:1000}, {name: "slow", "speed": 2000}],
                    selectedIndex: 0
                }
            }

            function toggleSettings() {
                $scope.player.settings = !$scope.player.settings;
            }
            function constructAnimationString(animation) {
                var attr = animation.attr;
                if (!attr) {
                    $scope.showStatusMsgForXSec('Current animation with name ' + animation.obj.name||'no_name' + ' does not have any default animation attributes')
                    return;
                }
                var name, duration, time_f, delay, iter, direc, f_mode;
                name = attr.name || 'temp-anim';
                duration = attr.duration || DEFAULTS.duration + 's';
                time_f = attr.timing_function || 'ease';
                delay = attr.delay || '0s';
                iter = attr.iteration_count || 1;
                direc = attr.direction || 'normal';
                f_mode = attr.fill_mode || 'none';

                var full_animation_string = name + " " + duration + " " + time_f + " " + delay + " " + iter + " " + direc + " " + f_mode;

                return full_animation_string
            }

            function numActiveSubAnimations() {
                if (!$scope.animations) {
                    $scope.animations = [];
                }
                var count = 0;
                for (var i = 0; i < $scope.animations.length; i++) {
                    var indexAnimation = $scope.animations[i];
                    if (indexAnimation.active) {
                        count += 1
                    }
                }
                return count;
            }


            function constructAllAnimationStrings(main_anim, anim_arr) {
                var resultString = '';
                for (var i = 0; i < anim_arr.length; i++) {
                    if (i === anim_arr.length - 1) {
                        resultString += (constructAnimationString(anim_arr[i]));
                    } else {
                        resultString += (constructAnimationString(anim_arr[i]) + ', ')
                    }
                }

                return resultString;
            }

            function isElemPaused(elem) {
                return elem.style.animationPlayState === "paused" || elem.style[browserPrefix + "AnimationPlayState"] === 'paused';
            }

            function playElemAnimation(player, elem, anim_name) {



                elem = elem || $scope.actor;
                $scope.actor.cachedStyle = elem.style.cssText;
                player = player || $scope.player;
                anim_name = $scope.animation.attr.name;

                if (isElemPaused(elem)) {
                    elem.style.animationPlayState = "running";
                    elem.style[browserPrefix + "AnimationPlayState"] = "running";
                    player.status = 1;
                    $scope.timer.resume($scope.timer);
                    return;
                }

                $scope.player.reset();
                $scope.animation.selected_keyframe = $scope.animation.properties['0%'];
                $scope.animation.selected_index = 0;
                $scope.animation.flex_selected_index = 0;


                var isMoreThanOneAnimationActive = numActiveSubAnimations();
                var animationString = constructAnimationString($scope.animation);
                if (isMoreThanOneAnimationActive) {
                    animationString += (',' + constructAllAnimationStrings($scope.animation, $scope.animations));
                }

                // $scope.animation.obj.name = $scope.animation.obj.animation = animationString;
                $scope.animation.obj.name = $scope.animation.attr.name;

                elem.style.animation = animationString;
                elem.style[browserPrefix + "Animation"] = animationString;


                console.log('actor', $scope.actor);
                $timeout(function() {
                    console.log('playing this animation string', animationString);
                }, 1000)
                if (!$scope.actor) {
                    var elem = document.querySelector('#stage-elem');
                    if (elem) {
                        $scope.actor = elem;
                    }
                }
                $scope.timer = initAnimationTimer()
                if (!$scope.initAnimationListener)  {
                    initAnimationListener($scope.actor);
                }
                // if (browserPrefix === 'webkit') {
                //  elem.addEventListener( 'webkitAnimationEnd', initAnimationEndListener)
                // } else {
                //  elem.addEventListener( 'animationend', initAnimationEndListener)
                // }


                if (!$scope.timer.paused) {
                    $scope.timer.start($scope.timer, $scope.animation.attr.duration);
                }

                if (!player.status) {
                    player.status = 1;
                }
                else if (player.status === 1) {
                    return
                }
                else if (player.status === 2) {
                    resumeDanceMoveElem(player, elem, browserPrefix);
                }
            }


                // function initAnimationEndListener( event ) {
                //  $timeout(function() {
                //      $scope.player.reset();
                //  }, 2500);
                //  // alert('animation ended')
                // }
            //      // $scope.player.reset();
            //      // var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);
            //      $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
            //      $scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
            //      $scope.setActiveKeyFrame($scope.animation.selected_percent)
            //      console.log($scope.animation.selected_index);

            //      // $scope.animation.selected_percent = keyPercent + '%';
            //      $timeout(function(){$scope.$apply();})
            //  }, false );
            // } else {
            //  elem.addEventListener( 'animationend',
            //  function( event ) {
            //      $scope.player.reset();
            //      // var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);
            //      $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
            //      $scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
            //      $scope.setActiveKeyFrame($scope.animation.selected_percent);
            //      alert('animation ended');
            //      // $scope.setActiveKeyFrame($scope.animation.selected_index)
            //      // $scope.animation.selected_keyframe = $scope.animation.properties[keyPercent + '%'];
            //      // $scope.animation.selected_percent = keyPercent + '%';
            //      $timeout(function(){$scope.$apply();})
            //  }, false );

            function pauseDanceMoveElem(player, elem) {
                elem = elem || $scope.actor;
                player = player || $scope.player;
                $scope.timer.pause($scope.timer);
                player.status = 2;
                player.state = 'paused';
                anim_name = $scope.animation.attr.name;
                elem.style.animationPlayState = "paused";
                elem.style[browserPrefix + "AnimationPlayState"]="paused";
            }


            function resumeDanceMoveElem(player, elem) {
                elem = elem || $scope.actor;
                player.status = 1;
                $scope.timer.resume($scope.timer);
                elem.style[browserPrefix + "AnimationPlayState"] ="running";
            }

            function resetDanceMoveElem(player, elem, replay) {
                elem = elem || $scope.actor;
                player = player || $scope.player;
                player.status = 0;
                anim_name = $scope.animation.attr.name;
                elem.style[browserPrefix + "AnimationName"] = null;
                elem.offsetWidth = elem.offsetWidth;
                $scope.timer.reset($scope.timer);

            }
        }

        function playDanceMoves(elem, dance_moves) {
            for (var i = 0; i < dance_moves.length; i++) {
                console.log('playing dance move #', i + 1);
                var indexDanceMove = dance_moves[i]
                execDanceMove(elem, indexDanceMove);
            }
        }

        function setAnimProperty(elem, property, val) {

        }

        function execDanceMove(elem, dance_obj) {
            var animKeys = Object.keys(dance_obj);
            for (var i = 0; i < animKeys.length; i++) {
                var indexProperty = animKeys[i];
                if (browserPrefix && browserPrefix.length) {
                    indexProperty = indexProperty[0].toUpperCase() + indexProperty.slice(1);
                }
                var elemStyleProperty = browserPrefix + indexProperty;
                var perspective = "perspective("+dance_obj.transformPerspective +"%) ";
                var translate = "translate3d("+dance_obj.translateX+"%, "+dance_obj.translateY+"%, "+dance_obj.translateZ+"%) ";
                var scale = "scale3d("+dance_obj.scale3DX+", "+dance_obj.scale3DY+", "+dance_obj.scale3DZ+") ";
                var rotate = "rotate3d("+dance_obj.rotate3DX+", "+dance_obj.rotate3DY+", "+dance_obj.rotate3DZ+", "+dance_obj.rotate3DAngle+"deg)";
                var origin = dance_obj.originX+"% "+dance_obj.originY+"%"+" "+dance_obj.originZ+"%";
                var csstext = browserPrefix + "transform: "+perspective+translate +scale + rotate + "; "
                    + browserPrefix + "transform-origin: " + origin + "; "
                    + browserPrefix + "transform-style: " + dance_obj.transformStyle+";"
                    + "transform: "+perspective+translate +scale + rotate + "; "
                    + "transform-origin: " + origin + "; ";
                    + "transform-style: " + dance_obj.transformStyle+";";

                elem.style.cssText = elem.style.cssText + csstext;
            }
        }

        $scope.swapAnimationWithActive = function(animation, index) {
                var newActiveAnimation = $scope.animations.splice(index, 1);
                $scope.animation.active = false;
                var newSubAnimation = $scope.animation;
                $scope.animation = null;
                $timeout(function() {
                    $scope.animation = newActiveAnimation[0];
                    $scope.animation.active = true;
                    $scope.animations.unshift(newSubAnimation);
                }, 1000)

            }

        var transformObjToCssText = function(dance_obj, property) {
            var unit ='%';
            var perspective = "perspective("+dance_obj.transformPerspective +"%) ";
            var translate = "translate3d("+dance_obj.translateX+"%, "+dance_obj.translateY+"%, "+dance_obj.translateZ+"%) ";
            var scale = "scale3d("+dance_obj.scale3DX+", "+dance_obj.scale3DY+", "+dance_obj.scale3DZ+") ";
            var rotate = "rotate3d("+dance_obj.rotate3DX+", "+dance_obj.rotate3DY+", "+dance_obj.rotate3DZ+", "+dance_obj.rotate3DAngle+"deg)";
            var origin = dance_obj.originX+"% "+dance_obj.originY+"%"+" "+dance_obj.originZ+"%";

            var backgroundColor = dance_obj.backgroundColor || '#ffffff';
            var color = dance_obj.color || "#ffffff";
            var fill = dance_obj.fill || '#ffffff';
            var opacity = dance_obj.opacity || 1.0;
            var strokeOpacity = dance_obj.strokeOpacity || 1.0;
            var strokeWidth = dance_obj.strokeWidth || 1.0;
            var strokeDashArray = dance_obj.strokeDashArray || 1.0;
            var strokeDashOffset = dance_obj.strokeDashOffset || 1.0;

            // property = "skewY";
            // dance_obj.skewY = 10;
            if (property) {
                dance_obj.modified[property] = dance_obj[property];
            }

            // var _csstext =  'transform: skew(' + (dance_obj.skewX || 0)+ 'rad, ' + (dance_obj.skewY || 0) +'rad) rotate3d(' + dance_obj.rotate3DX +', ' + dance_obj.rotate3DY + ', ' + dance_obj.rotate3DZ + ', ' + (dance_obj.rotate3DAngle || 30) + 'rad) scale(' + (dance_obj.scale3DX || 1.0 )  + ', ' + (dance_obj.scale3DY || 1.0) + ')  translate3d(' + (dance_obj.translateX || 0) + unit + ', ' + (dance_obj.translateY || 0) +unit + ', ' + (dance_obj.translateZ || 0) + 'px);'
            csstext ="";
            // console.log(Object.keys(dance_obj.modified));
            var modifiedPropertyKeys = Object.keys(dance_obj.modified);
            for (var i = 0; i < modifiedPropertyKeys.length; i++) {

                var indexProperty = modifiedPropertyKeys[i];
                var transformProperties = ["translateX", "translateY", "translateZ", "scale3DX", "scale3DY", "scale3DZ", "rotate3DAngle", "rotate3DX", "rotate3DY", "rotate3DZ", "skewX",  "rotate", "skewY"]
                if (transformProperties.indexOf(indexProperty) > -1) {
                    switch(indexProperty) {
                        case "translateX":
                            csstext += 'translateX(' + dance_obj.translateX  + unit + ') '
                            break;
                        case "translateY":
                            csstext += 'translateY(' + dance_obj.translateY  + unit + ') '
                            break;
                        case "translateZ":
                            csstext += 'translateZ(' + dance_obj.translateZ  + 'px' + ') '
                            break;
                        case "scale3DX":
                            csstext += 'scaleX(' + dance_obj.scale3DX  + ') '
                            break
                        case "scale3DY":
                            csstext += 'scaleY(' + dance_obj.scale3DY  + ') '
                            break
                        case "scale3DZ":
                            csstext += 'scaleZ(' + dance_obj.scale3DZ   + ') '
                            break;
                        case "skewX":
                            csstext += 'skewX(' + dance_obj.skewX   + 'rad) '
                            break;
                        case "skewY":
                            csstext += 'skewX(' + dance_obj.skewY   + 'rad) '
                            break;
                        case "rotate3DX":
                            csstext += 'rotateX(' + dance_obj.rotate3DX  + 'rad) '
                            break;
                        case "rotate3DY":
                            csstext += 'rotateY(' + dance_obj.rotate3DY  + 'rad) '
                            break;
                        case "rotate":
                            csstext += 'rotateZ(' + dance_obj.rotate  + 'rad) '
                            break;
                        case "rotate3DZ":
                            csstext += 'rotateZ(' + dance_obj.rotate3DZ  + 'rad) '
                            break;
                        case "rotate3DAngle":
                            csstext += 'rotate3d(' +(dance_obj.rotate3DX || 0) + ", "+ (dance_obj.rotate3DY||0)+", "+(dance_obj.rotate3DZ ||0)+", "+dance_obj.rotate3DAngle+"deg) "
                            break;
                    }
                }

            }
            if (csstext.length) {
                csstext = "transform: " + csstext + ';'
            }

            var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'transformOriginX', 'transformOrigin', 'transformOriginY', 'transformOriginZ', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color']
            for (var i = 0; i < modifiedPropertyKeys.length; i++) {
                var indexProperty = modifiedPropertyKeys[i];
                // var indexProperty = nonTransformProperties[i];
                if (nonTransformProperties.indexOf(indexProperty) > -1) {
                    if (['transformOriginX', 'transformOriginY', 'transformOriginZ'].indexOf(indexProperty) > -1) {
                        csstext += ('transform-origin:' + (dance_obj.transformOriginX || '50%') + ' ' + (dance_obj.transformOriginY || '50%') + ' ' + (dance_obj.transformOriginZ || '0px') + ';');
                        csstext += ('-' + browserPrefix + '-transform-origin:') + (dance_obj.transformOriginX || '50%') + ' ' + (dance_obj.transformOriginY || '50%') + ' ' + (dance_obj.transformOriginZ || '0px') + ';';
                    }
                    if (indexProperty === 'opacity' && typeof(dance_obj.opacity) === "number") {
                        csstext += ('opacity:' + dance_obj.opacity + ';')
                    }
                    if (indexProperty === 'fill') {
                        csstext += ('fill:' + dance_obj.fill + ';');
                    }
                    if (indexProperty === 'backgroundColor') {
                        csstext += ('background-color:' + dance_obj.backgroundColor + ';');
                    }
                    if (indexProperty === 'strokeDashOffset') {
                        csstext += ('stroke-dashoffset:' + dance_obj.strokeDashOffset + ';');
                    }
                    if (indexProperty === 'strokeDashArray') {
                        csstext += ('stroke-dasharray:' + dance_obj.strokeDashArray + ';');
                    }
                    if (indexProperty === 'strokeWidth') {
                        csstext += ('stroke-width:' + dance_obj.strokeWidth + ';');
                    }
                    if (indexProperty === 'strokeOpacity') {
                        csstext += ('stroke-opacity:' + dance_obj.strokeOpacity + ';');
                    }
                    if (indexProperty === 'color') {
                        csstext += ('color:' + dance_obj.color + ';');
                    }
                    if (indexProperty === 'stroke') {
                        csstext += ('stroke:' + dance_obj.stroke + ';');
                    }
                    if (indexProperty === 'fillOpacity') {
                        csstext += ('fill-opacity:' + dance_obj.fillOpacity + ';');
                    }
                }
            }

            //@gabrielle-note
            // csstext = 'color:' + (color) + '; fill: ' + (fill) + '; stroke-width: ' + (strokeWidth) + ';stroke-dasharray:' + (strokeDashArray) + '; stroke-opacity:' + (strokeOpacity)+ '; stroke-dashoffset:' + (strokeDashOffset) + ';background-color:' + (backgroundColor) + ';' + csstext;
            // var csstext = browserPrefix + "-transform: "+perspective+translate +scale + rotate + "; "
            //  + browserPrefix + "-transform-origin: " + origin + "; "
            //  + browserPrefix + "-transform-style: " + dance_obj.transformStyle+";"
            //  + "transform: "+perspective+translate +scale + rotate + "; "
            //  + "transform-origin: " + origin + "; ";
            //  + "transform-style: " + dance_obj.transformStyle+";";
            return csstext
        }

        //key spec
        //space - play
        //ctrl + left, go back a time state
        //ctrl + right arrow
        // NOTE: The change to red signifies the start of

        //todo apply a matrix transform

        function injectStyleSheet() {
            var link = document.createElement("link");
            link.href = "https://s3.amazonaws.com/uguru-admin/master/animate.css";
            link.type = "text/css";
            link.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        //TODO import all webkit related animation results
        //TODO -->
        function findKeyframesRule(rule) {
            var ss = document.styleSheets;
            for (var i = 0; i < ss.length; ++i) {
                for (var j = 0; j < ss[i].cssRules.length; ++j) {
                    if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
                }
            }
            return null;
        }

        function exportExternalCSSKeyFrameFiles(css_file_names, external_css) {
            var ss = document.styleSheets;

            var allRuleObjs = [];
            var allRuleDict = {};
            var count = 0;
            for (var i = 0; i < ss.length; ++i) {
                var styleSheetName;
                if (ss[i].href) {
                    var styleSheetName = ss[i].href.split('/').reverse()[0].replace('.css', '');
                    console.log('adding to css rule dict', styleSheetName);
                    if ((css_file_names.length && css_file_names.indexOf(styleSheetName) > -1)) {
                        allRuleDict[styleSheetName] = [];
                    }
                }
                if (ss[i].cssRules && ss[i].cssRules.length) {
                    for (var j = 0; j < ss[i].cssRules.length; ++j) {
                        if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {
                            allRuleObjs.push(ss[i].cssRules[j]);
                            if (styleSheetName in allRuleDict) {
                                var indexCssRule = ss[i].cssRules[j];
                                var rawCSSText = indexCssRule.cssText;
                                var animationName = indexCssRule.name;
                                console.log('processing', animationName);
                                var js_anim_obj = importAnimationFromRawCssText(rawCSSText, animationName);
                                var final_obj = initAnimationFromAnimObj(js_anim_obj);
                                $scope.saveAnimationClass(final_obj, styleSheetName);
                                console.log(final_obj.attr.name, 'processed');
              //                var js_anim_obj = importAnimationFromRawCssText(indexCssRule.css_text, name);


                            }
                        }
                    }
                }
            }
            $timeout(function() {
                $scope.$apply()
            })
            return allRuleObjs
        }

        $scope.confirmStatusMsgAction = function(bool) {
            $scope.showStatusMsg = null;
            $scope.showStatusMsgConfirmAction = null;
            $timeout(function() {
                $scope.showStatusMsgConfirmActionCb(bool);
            }, 250);
        }

        $scope.showStatusMsgForXSec = function(message, time_ms, action_type, cb) {
            time_ms = time_ms || 2500;
            $scope.showStatusMsg = message;
            if (action_type && action_type === 'confirm') {
                $scope.showStatusMsgConfirmAction = true;
                $timeout(function() {$scope.$apply()});
                if (cb) {
                    $scope.showStatusMsgConfirmActionCb = cb;
                }
            } else {
                $timeout(function() {
                    $scope.showStatusMsg = null;
                }, time_ms)
                // $scope.animation.edit = false;
            }
        }

        $scope.updateAnimationName = function(animation) {
            animation.obj.name = animation.attr.name;
            $scope.animationDropdown.options[0] = $scope.animation.obj.name;
            $scope.animationDropdown.options.push('Save');
            $scope.showStatusMsgForXSec('Updated Animation Name!', 2500);
            $timeout(function() {
                $scope.$apply();
            })
            $timeout(function() {
                $scope.animation.edit = false;
            }, 500);
        }

        $scope.switchLayoutTabToImportAnimation = function() {
            $scope.importLayoutIndex = 0;
        }

        function initAnimationFromCSSText(anim_name, browserPrefix, css_text) {
            var lastSheet = document.styleSheets[document.styleSheets.length - 1];
            var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
            var anim = lastSheet.cssRules[indexOfRuleInSheet];

            anim.cssText = css_text;
            return anim
        }

        function initAnimationFromAnimObj(anim_obj, options) {
            options = options || {};
            var properties = initDictWithXProperties(anim_obj);
            var attr = {
                name: options.name || anim_obj.name,
                play_state: "running",
                delay: options.delay || '0s',
                delayVal: 0,
                direction: options.direction || "normal",
                iteration_count: options.iteration_count || 1,
                timing_function: options.timing_function || "ease",
                duration: options.duration || defaults.DURATION + 's',
                durationVal: defaults.DURATION,
                fill_mode: options.fill_mode ||  "none",
                kf_intervals: defaults.KF_INTERVALS
            }
            return {obj: anim_obj, active:options.active, selected_keyframe:properties['0%'], selected_kf_index:0, selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: properties, kf_count: defaults.KF_COUNT, attr:attr};
        }

        function initAnimation(anim_name, browserPrefix, num_keyframes, duration, active) {
            active = active || false;
            num_keyframes = num_keyframes || 100;
            duration = (duration || 5) + 's';

            var lastSheet = document.styleSheets[document.styleSheets.length - 1];
            if (!lastSheet.cssRules) {
                var lastSheet = document.styleSheets[document.styleSheets.length - 2];
            }
            var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ", 0);
            var anim = lastSheet.cssRules[indexOfRuleInSheet];
            initKFWithXInterval(anim, num_keyframes);
            var properties = initDictWithXProperties(anim)
            var attr = {
                name: anim_name,
                play_state: "running",
                delay: '0s',
                delayVal: 0,
                direction: "normal",
                iteration_count: 1,
                timing_function: "ease",
                duration: duration,
                durationVal: parseInt(duration.replace('s')),
                fill_mode: "none",
                kf_intervals: defaults.KF_INTERVALS
            }
            return {obj: anim, active: active, selected_keyframe:properties['0%'], selected_kf_index:0, selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: properties, kf_count: num_keyframes, attr:attr};
        }



        function initArrWithXProperties(num_frames) {
            var result_arr = [];
            for (var i = 0; i < num_frames; i++) {
                result_arr.push(transformPropertiesObj())
            }
            return result_arr
        }

        function initDictWithXProperties(anim) {
            var resultDict = {};
            var keyTextPercentArray = [];
            for (var i = 0; i < anim.cssRules.length; i++) {
                var indexRule = anim.cssRules.item(i);
                if (indexRule && indexRule.keyText) {
                    keyTextPercentArray.push(indexRule.keyText);
                }
            }
            for (var i = 0; i < keyTextPercentArray.length; i++) {
                var currentFramePercent = keyTextPercentArray[i];
                resultDict[currentFramePercent]  =  transformPropertiesObj()
            }
            return resultDict
        }

        function initKFWithXInterval(anim, max_bound) {
            var scaling_value = 100.0 / max_bound;
            for (var i = 0; i < max_bound + 1; i++) {
                addKFRule(anim,  (i*1.0 * scaling_value), {}, browserPrefix, i);
            }
        }

        function insertPropertiesAtXKF(anim, property_dict, browserPrefix) {
            return;
        }

        function getNthSortedKeyText(anim, index) {
                console.log(anim, index);
                var position;
                var keyTexts = [];
                for (var i = 0; i < anim.cssRules.length; i++) {
                    var cssIndexKFRule = anim.cssRules.item(i);

                    if (cssIndexKFRule) {
                        if (index === cssIndexKFRule.keyText) {
                            position = i;
                        }
                        var keyText = cssIndexKFRule.keyText;
                        keyTexts.push(parseFloat(keyText.replace('%', '')));
                    }
                }
                console.log(position, 'is the nth selected keyframe');
                keyTexts.sort(function(a, b) {
                    return b - a;
                }).reverse();
                // console.log(keyTexts.slice(), index, keyTexts.reverse(), keyTexts.reverse())
                return keyTexts[keyTexts.indexOf(index)];
                // anim.cssRules.item(index)
            }


        function reconstructAnimationFromProperties(attr, properties, kf_count, callback) {
            var lastSheet = document.styleSheets[document.styleSheets.length - 1];
            var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + attr.name + " { } ");
            var anim = lastSheet.cssRules[indexOfRuleInSheet];
            // initKFWithXInterval(anim, kf_count);
            $timeout(function() {
                var propertyKeys = Object.keys(properties);
                for (var j = 0; j < propertyKeys.length; j++) {
                    var propertyPercent = parseFloat(propertyKeys[j].replace('%', ''));
                    console.log('adding', propertyPercent);
                    // appendRule(percentage + '{' + css_text +  '}', keyframe_percent);
                    anim.appendRule(propertyKeys[j] + ' {}', j)
                }

                var attributes = {
                    name: attr.name,
                    play_state: attr.play_state,
                    delay: attr.delay + 's',
                    delayVal: attr.delay,
                    direction: attr.direction,
                    iteration_count: attr.iteration_count,
                    timing_function: attr.timing_function,
                    duration: attr.duration,
                    durationVal: parseInt(attr.duration.replace('s')),
                    fill_mode: attr.fill_mode,
                    kf_intervals: defaults.KF_INTERVALS
                }

                var propertyKeys = Object.keys(properties);


                $scope.animation = {obj: anim, selected_index:0, flex_selected_index:0, selected_kf_index:0,   properties: properties, kf_count: kf_count, attr:attributes, kf_intervals: defaults.KF_INTERVALS};

                $scope.animation.selected_percent = propertyKeys[0];
                $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent]
                console.log($scope.animation);
                for (var i = 0; i < propertyKeys.length; i++) {
                    var indexPropertyKeyPercent = propertyKeys[i];
                    var modifiedDict = properties[indexPropertyKeyPercent].modified;
                    var modifiedDictKeys = Object.keys(modifiedDict);

                    if (modifiedDictKeys.length) {
                        for (var j = 0; j < modifiedDictKeys.length; j++) {
                            var indexModifiedKey = modifiedDictKeys[j];
                            var indexModifiedValue = modifiedDict[indexModifiedKey];
                            console.log($scope.animation.obj, indexModifiedKey, indexModifiedValue);
                            editKeyframeAtX($scope.animation, indexPropertyKeyPercent.replace('%',''), indexModifiedKey, indexModifiedValue);
                        }
                    }
                }
                // $scope.animation = animation;
                callback && callback();
                console.log($scope.animation);
            })



            return;
        }

        function addKFRule(anim, percentage, property_dict, browserPrefix, index) {
            var property_keys = Object.keys(property_dict);
            var result_property_str = '';
            for (var i = 0; i < property_keys.length; i++) {
                var indexProperty = property_keys[i];
                var indexValue = property_dict[indexProperty];
                result_property_str += indexProperty + ":" + indexValue + ";";

            }

            anim.appendRule(percentage + "% {" + result_property_str + " }", index);
        }

        function getS3Animations() {

            var first_name = $scope.user.name.split(' ')[0].toLowerCase();
            if (first_name === 'asif') {
                first_name = 'samir';
            }
            var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
            getS3JsonFile(first_name, animation_url, s3_callback);

            function s3_callback(first_name, _dict) {
                $scope.animationDict = _dict;
                $scope.my_animations = $scope.animationDict[first_name];
                if ($scope.my_animations.last_edited) {
                    var serverAnimation = $scope.my_animations.last_edited;
                    $scope.animation = reconstructAnimationFromProperties(serverAnimation.attr, serverAnimation.properties, serverAnimation.kf_count);
                    $scope.animation.selected_keyframe = $scope.animation.properties['0%'];
                    $scope.animation.selected_index = 0;
                    $scope.animation.flex_selected_index = 0;
                    $timeout(function() {
                        $scope.$apply();
                    })
                }

                $scope.myAnimationDropdown = initMyAnimationDropdown($scope.my_animations);
                LoadingService.hide();
                // saveS3Animations();
            }

            function initMyAnimationDropdown(my_animations) {

                var animationNameArr = Object.keys(my_animations.animations);
                if (!animationNameArr.length) {
                    animationNameArr.push($scope.my_animations.last_edited.attr.name);
                }
                animationNameArr.push('+');
                return {
                    options: animationNameArr,
                    onOptionClick: savePreviousAndSelectAnimation,
                    size: 'small',
                    label: 'my animations',
                    selectedIndex: 0
                }

                function savePreviousAndSelectAnimation(option, index) {
                    $scope.saveAnimationsToServer($scope.animation);;
                    if (option === '+') {
                        $scope.animation = initAnimation('new', browserPrefix, 100, 5);
                        $scope.animation.selected_keyframe = $scope.animation.properties['0%'];
                        $scope.animation.selected_index = 0;
                        $scope.animation.flex_selected_index = 0;
                        $scope.myAnimationDropdown.options.push('new');
                        $scope.myAnimationDropdown.selectedIndex = $scope.myAnimationDropdown.options.length - 1;
                        $scope.player.toggleSettings();
                    } else {
                        var serverAnimation = $scope.my_animations.animations[option];
                        $scope.animation = reconstructAnimationFromProperties(serverAnimation.attr, serverAnimation.properties, serverAnimation.kf_count);
                        $scope.animation.selected_keyframe = $scope.animation.properties['0%'];
                        $scope.animation.selected_index = 0;
                        $scope.animation.flex_selected_index = 0;
                    }
                    $timeout(function() {
                        $scope.$apply();
                    })
                }

            }

            function getS3JsonFile(first_name, url, cb) {
                var xhr = new XMLHttpRequest();
                xhr.open( 'GET', url, true );

                xhr.onload = function () {
                    console.log(xhr);
                    var resp = JSON.parse( xhr.responseText );
                    cb && cb(first_name, resp);
                };
                xhr.send();
            }
        }



        $scope.saveAnimationsToServer = function(animation) {
            $scope.my_animations.last_edited = animation;
            var animationName = $scope.animation.attr.name;
            LoadingService.showMsg('Saving....');
            if ($scope.my_animations.last_edited) {
                $scope.my_animations.animations[animationName] = animation;
            }


            var first_name = $scope.user.name.split(' ')[0].toLowerCase();
            if (first_name === 'asif') {
                first_name = 'samir';
            }
            console.log($scope.animationDict);
            // $scope.animationDict[first_name]['animations'][fileName] = $scope.animation;

            saveS3Animations();
        }


        function saveS3Animations() {

            var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
            var first_name = $scope.user.name.split(' ')[0].toLowerCase();
            if (first_name === 'asif') {
                first_name = 'samir';
            }
            function post_callback(first_name, resp) {
                console.log('file successfully saved', resp);
                LoadingService.hide();
                $timeout(function() {
                    LoadingService.showSuccess('Saved!', 1000);
                })
            }
            FileService.postS3JsonFile(JSON.stringify($scope.animationDict), first_name, animation_url, post_callback);
        }

        $scope.rad2degree = function(rad) {
            return rad * (180/Math.PI);
        }



        $scope.applyPropertyChange = function(value, property) {
            //set
            // $timeout(function() {
            deg2radProperties = ['skewXdeg', 'skewYdeg', 'rotate3DXdeg', 'rotate3DYdeg', 'rotate3DZdeg'];


            if (property.indexOf('transformOrigin') > -1) {
                $scope.showStatusMsgForXSec('updating ' + property + ' to ' + value);
            }

            if (deg2radProperties.indexOf(property) > -1) {
                radians = value * (Math.PI/180);
                $scope.animation.selected_keyframe[property] = value;
                value = parseFloat(radians, 10);
                property = property.replace('deg', '');
            }
            var convertToIntProperties = ['opacity'];

            if (convertToIntProperties.indexOf(property) > -1) {
                value = parseFloat(value);
            }




            var desiredIndex = $scope.animation.selected_percent;
            console.log('about to apply property change', property, 'to', value, 'in kf', desiredIndex);

            editKeyframeAtX($scope.animation, desiredIndex.replace('%', ''), property, value);

            $timeout(function() {
                console.log($scope.animation.selected_keyframe);
                $scope.renderAnimationCSSText($scope.animation, true);
            })
            // console.log($scope.animation.obj.cssText);
            // }, 500)
            // var cssRuleAtKeyFrameX = findCSSRuleByIndex($scope.animation.obj, value);
            // var transformObjAtX = $scope.animation.selected_keyframe;
            // console.log('value of ' + property, 'set to', parseInt(value));
            // transformObjAtX[property] = value;

            // cssRuleAtKeyFrameX.style[browserPrefix + 'Transform'] = transformObjToCssText(transformObjAtX);
            // cssRuleAtKeyFrameX.style['transform'] = transformObjToCssText(transformObjAtX);


            // $scope.animation.obj.deleteRule(parseInt(value) + '%');
            // $scope.animation.obj.appendRule(parseInt(value) + '% {' + transformObjToCssText(transformObjAtX) + '}');
            // console.log($scope.animation.obj.cssRules);
            // console.log('exact rule', $scope.animation.obj.findRule(value), value, property);

        }

        function findCSSRuleByIndex(anim, index) {
            console.log('attempt 1', anim.cssRules.item(index));
            return anim.cssRules[index];
        }

        function readAndInjectKeyFrames(anim, keyframe_rules) {

        }

        function getBaseTransformDict() {
            return {

            }
        }

        function sampleStrobeKFObj() {
            var anim = initAnimation("strobe", browserPrefix, $scope.animationKeyFrames);
            var property_dict_1 = transformPropertiesObj();
            var property_dict_2 = transformPropertiesObj();


            //dictionary 1
            property_dict_1.opacity = 0;


            //dictionary 2
            property_dict_2.opacity = 1;
            property_dict_1["background-color"] = '#ffffff'
            property_dict_2["background-color"] = '#FF0000'



            var rulesLength = anim.cssRules.length;
            var properties = [];


            for (var i = 0 ; i < rulesLength + 1; i++) {
                var indexProperty = (i % 2)  ? property_dict_1 : property_dict_2 ;



                if (i === 50) {
                    property_dict_2["transform"] = 'translateX(100px)'
                }


                addKFRule(anim, i, indexProperty, browserPrefix, i);

                properties.push(indexProperty);
            }

            return {obj: anim, properties: properties};
        }


        //guis to create
        // slider - num animation keyframes
        $scope.animationCache = $localstorage.getObject('saved_animations') || [];

        $scope.animDurationChange = function(value) {
            $scope.animation.attr.duration = value + 's';
        }

        $scope.selectAnimation = function(animation) {
            $scope.animation.obj = findKeyframesRule(animation);
            console.log($scope.animation.obj.cssText);
        }

        function getDefaultValue(property) {
            if (['translateX', 'translateY', 'translateZ', 'rotate', 'rotate3DX', 'rotate3DZ', 'rotate3DAngle' ,'skewX', 'skewY', 'rotate3DY'].indexOf(property) > -1) {
                return 0;
            } else {
                return 1;
            }
        }

        $scope.clearAllFrames = function() {
            var propertiesDict = $scope.animation.properties;
            var propertiesDictKeys = Object.keys(propertiesDict);
            LoadingService.showMsg('Clearing all animations....', 2500);
            for (var i = 0; i < propertiesDictKeys.length; i++) {
                var indexPropertyPercentage = propertiesDictKeys[i];
                var kfProperty = propertiesDict[indexPropertyPercentage];
                $scope.clearAllProperties(kfProperty, true);
            }
            $timeout(function() {

                var firstPercentage = getNthSortedKeyText($scope.animation.obj, 0);
                $scope.animation.selected_keyframe = $scope.animation.properties[firstPercentage + '%'];
                $scope.animation.selected_percent = firstPercentage + '%';
                $scope.animation.selected_index = 0;
                $timeout(function() {
                    LoadingService.showSuccess('All properties across all keyframes cleared!', 2000);
                }, 500)
                $scope.$apply()
            });
        }

        $scope.clearAllProperties = function(kf_obj, skip_confirm) {
            if (skip_confirm) {
                kf_obj.confirmed = true;
            } else if (!skip_confirm && !kf_obj.confirmed) {
                kf_obj.confirmed = true;
            } else {
                kf_obj.confirmed = false;
            }
            if (kf_obj.confirmed) {
                kf_obj.confirmed = false;
                kf_obj = kf_obj || $scope.animation.selected_keyframe;
                selected_kf_properties = Object.keys(kf_obj.modified);
                for (var i = 0; i < selected_kf_properties.length; i++) {
                    var indexProperty = selected_kf_properties[i];

                    $scope.clearProperty(kf_obj, indexProperty);
                }
            }
        }

        $scope.clearProperty = function(kf, property) {
            // percent_value = $scope.animation
            // var percent_value =
            var percent_value = $scope.animation.selected_percent;
            console.log(kf, property, percent_value);
            console.log('modified dict', kf.modified);
            if (property in kf.modified) {
                kf.modified[property] = 0;
            }
            var defaultValue = getDefaultValue(property);
            editKeyframeAtX($scope.animation, percent_value.replace('%', ''), property, defaultValue);

            editKeyframeAtX($scope.animation, percent_value.replace('%', ''), property, null);
            kf[property] = defaultValue;




            $timeout(function() {
                $scope.setActiveKeyFrame($scope.animation.selected_percent)
                $scope.$apply();
            }, 500);
        }


        function editKeyframeAtX(anim, keyframe_percent, property, value, clear_css_text) {
            // console.log(keyframe_percent);
            // console.log(keyframe_percent, property, value)
            var percentage = keyframe_percent;
            anim.obj.deleteRule(percentage + '%');

            // console.log('properties', anim.properties, keyframe_percent);
            transformObj = anim.properties[percentage + '%'];
            transformObj.edited = true;
            transformObj[property] = value;



            console.log('setting', property, value);

            if (!clear_css_text) {
                var css_text = transformObjToCssText(transformObj, property);
                console.log('transforming...', css_text, percentage);
                anim.obj.appendRule(percentage + '% ' + '{' +  css_text + '}', keyframe_percent);

            } else {
                var css_text = transformObjToCssText(transformObj, property);
                var css_text = " ";
                anim.obj.appendRule(percentage + '% ' + '{' + css_text +  '}', keyframe_percent);
            }

            // css_text = css_text.replace('transform:', '').replace(';', '');
            // $scope.actor.style[browserPrefix + 'Transform'] = css_text;
            // $scope.actor.style['transform'] = css_text;
            // $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
            // $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
            var propertyDictCssMap = {'translateX': 'translateX', 'translateY': 'translateY', 'rotate':'rotateZ', 'translateZ': 'translateZ', 'scale3DX': 'scaleX', 'scale3DY': 'scaleY', 'skewX':'skewX', 'skewY': 'skewY', 'rotate3DZ':'rotateZ', 'rotate3DY': 'rotateY', 'rotate3DX': 'rotateX'};
            var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': 'px', 'scale3DX': '', 'scale3DY': '', 'skewX':'rad', 'skewY': 'rad', 'rotate': 'rad', 'rotate3DZ':'rad', 'rotate3DY': 'rad', 'rotate3DX': 'rad', 'rotate3DAngle': 'rad'};
            var transformProperties = Object.keys(propertyDictCssMap);
            var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'transformOrigin', 'transformOrigin', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
            var cssToChange = {transform: {}, etc: {}};
            var newPropertiesToModify = Object.keys(anim.selected_keyframe.modified);

            for(var i = 0; i < newPropertiesToModify.length; i++) {
                var indexPropertyName = newPropertiesToModify[i];


                var propertyValue = anim.selected_keyframe[indexPropertyName]

                if (indexPropertyName in propertyDictCssMap) {
                    var cssVar = propertyDictCssMap[indexPropertyName];
                    var cssUnit = propertyDictCssUnit[indexPropertyName];
                    cssToChange.transform[propertyDictCssMap[indexPropertyName]] = '(' + propertyValue + cssUnit + ')';
                } else {
                    cssVar = indexPropertyName;
                    cssValue = propertyValue
                    console.log(cssVar, cssValue);
                    var cssUnit = '';
                    cssToChange.etc[cssVar] = cssValue;
                }
            }
            if (cssToChange && Object.keys(cssToChange.transform).length) {
                // var transformCSStoChange = cssToChange.transform.join(" ");
                var transformProperties = Object.keys(cssToChange.transform);
                var transformCSStoChange ="";
                for (var i = 0; i < transformProperties.length; i++) {
                    var indexTransformProperty = transformProperties[i];
                    var indexTransformValue = cssToChange.transform[indexTransformProperty];
                    transformCSStoChange += indexTransformProperty  + indexTransformValue;
                }
                $scope.actor.style['transform'] = transformCSStoChange;
                $scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
            }
            // if (cssToChange && cssToChange.transform.length) {
            //      var transformCSStoChange = cssToChange.transform.join(" ");
            //      console.log('transform css to change', transformCSStoChange);
            //      $scope.actor.style['transform'] = transformCSStoChange;
            //      $scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
            //  }
            if (cssToChange && Object.keys(cssToChange.etc).length) {
                var nonTransformProperties = Object.keys(cssToChange.etc);
                for (var i = 0 ; i < nonTransformProperties.length; i++) {
                    var indexProperty = nonTransformProperties[i];
                    var indexValue = cssToChange.etc[indexProperty];
                    console.log('setting', indexProperty, 'to', indexValue);
                    $scope.actor.style[indexProperty] = indexValue;
                }
            }

            return;
        }


        $scope.actor = document.querySelector('#stage-elem');

        //todo find all keyframes
        // var keyFrameRule = findKeyframesRule('bounceInUp');




        function getBrowserPrefix() {
            var browserPrefix;
            navigator.sayswho= (function(){
              var N = navigator.appName, ua = navigator.userAgent, tem;
              var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
              if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
              M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
              M = M[0];
              if(M == "Chrome") { browserPrefix = "webkit"; }
              if(M == "Firefox") { browserPrefix = "moz"; }
              if(M == "Safari") { browserPrefix = "webkit"; }
              if(M == "MSIE") { browserPrefix = "ms"; }
            })();
            return browserPrefix;


            }

        function cloneTransformPropertiesObj(anim_obj) {
            var emptyTransformObj = transformPropertiesObj();
            var transformObjCloneKeys = Object.keys(anim_obj);
            for (var i = 0; i < transformObjCloneKeys.length; i++) {
                var propertyIndex = transformObjCloneKeys[i];
                emptyTransformObj[propertyIndex] = anim_obj[propertyIndex];
                console.log('copying', propertyIndex);
            }
            return emptyTransformObj;
        }




        function transformPropertiesObj(actor) {
            var transformObj = function()
            {
                this.propertyMappings = {
                    'scaleX': 'scale3DX',
                    'scaleY': 'scale3DY',
                    'scaleZ': 'scale3DZ',
                    'rotateX': 'rotate3DX',
                    'rotateY': 'rotate3DY',
                    'rotateZ': 'rotate3DZ',
                    'rotate': 'rotate3DZ',
                    'translateX': 'translateX',
                    'translateY': 'translateY',
                    'translateZ': 'translateZ',
                    'skewX': 'skewX',
                    'skewY': 'skewY',
                    'background-color': 'backgroundColor',
                    'fill-opacity': 'fillOpacity',
                    'transform-origin': 'transformOrigin',
                    'transform-style': 'transformStyle',
                    'stroke-dasharray': 'strokeDashArray',
                    'stroke-dashoffset': 'strokeDashOffset',
                    'stroke-opacity': 'strokeOpacity',
                    'stroke-width': 'strokeWidth',
                    'transform-perspective': 'transformPerspective',
                    'animation-timing-function': 'animationTimingFunction',
                    '-webkit-animation-timing-function': 'animationTimingFunction'
                }
                this.transformPerspective = 0;
                this.transformOrigin = "50% 50% 0px";
                this.transformOriginX = "50%";
                this.transformOriginY = "50%";
                this.transformOriginZ = "0px";
                this.translateX = 0;
                this.translateY = 0;
                this.translateZ = 0;
                this.scale3DX = 1;
                this.scale3DY = 1;
                this.scale3DZ = 1;
                this.skewXdeg = 0;
                this.skewYdeg = 0;
                this.rotate3DXdeg = 0;
                this.rotate3DYdeg = 0;
                this.rotate3DZdeg = 0;

                this.skewX = 0;
                this.skewY = 0;
                this.rotate3DX = 0;
                this.rotate3DY = 0;
                this.rotate3DZ = 0;
                this.rotate3DAngle = 0;
                this.originX = 50;
                this.originY = 50;
                this.originZ = 50;
                this.visibility = "initial";
                this.animationTimingFunction = "ease";
                this.opacity = 1;
                this.edited = false;
                this.modified = {};
                this.backgroundColor = '#FFFFFF';
                this.color = '#FFFFFF';
                this.fill = '#FFFFFF';
                this.fillOpacity = 1;
                this.stroke = 1;
                this.strokeWidth = 1;
                this.strokeDashArray = "5";
                this.strokeDashOffset = 1;
                this.strokeOpacity = 1;
                this.transformStyle = "preserve-3d";

            };
            return new transformObj();
        }





        $scope.resetKFByIndex = function(kf_index, show_confirm) {
            if (show_confirm || confirm('are you sure? all current properties will be wiped out')) {
                var newTransformObj = transformPropertiesObj();
                var percentIndex = getNthSortedKeyText($scope.animation.obj, parseInt(kf_index));

                var propertiesModified = $scope.animation.selected_keyframe.modified;
                $scope.animation.selected_keyframe = newTransformObj;
                $scope.animation.properties[percentIndex + '%'] = $scope.animation.selected_keyframe;


                var propertiesInitiallyModified = Object.keys(propertiesModified);

                for(var i = 0; i < propertiesInitiallyModified.length; i++) {
                    var indexProperty = propertiesInitiallyModified[i];
                    editKeyframeAtX($scope.animation, percentIndex, indexProperty, $scope.animation.selected_keyframe[indexProperty]);
                }
                $scope.animation.selected_keyframe.modified = {};

            }
        }

        $scope.applyCurrentKFtoAnother = function(kf_index) {
            if (parseInt(kf_index) !== $scope.animation.selected_index) {
                if (confirm('are you sure? any properties @ T = ' + kf_index + ' will be overridden')) {
                    var clonedTransformObj = cloneTransformPropertiesObj($scope.animation.selected_keyframe);
                    var percentIndex = getNthSortedKeyText($scope.animation.obj, parseInt(kf_index));
                    $scope.animation.properties[percentIndex + '%'] = clonedTransformObj;
                    var propertiesModified = $scope.animation.properties[percentIndex + '%'].modified;
                    var propertiesModifiedList = Object.keys(propertiesModified);
                    if (propertiesModifiedList && propertiesModifiedList.length) {
                        console.log('applying properties from t=', $scope.animation.selected_index, 'to kf percentage:', percentIndex, propertiesModifiedList)
                        for(var i = 0; i < propertiesModifiedList.length; i++) {
                            var indexProperty = propertiesModifiedList[i];
                            editKeyframeAtX($scope.animation, percentIndex, indexProperty, propertiesModified[indexProperty]);
                        }
                    }
                }
            }
        }

        function initDanceMove(actor) {
            var defaultDanceMove = function()
            {
                this.domElem = actor || "";
                this.transformPerspective = 0;
                this.translateX = 0;
                this.translateY = 0;
                this.translateZ = 0;
                this.transformOriginX = '50%';
                this.transformOriginY = '50%';
                this.transformOriginZ = 0;
                this.scale3DX = 1;
                this.scale3DY = 1;
                this.scale3DZ = 1;
                this.rotate3DX = 0;
                this.rotate3DY = 0;
                this.rotate3DZ = 0;
                this.rotate3DAngle = 0;
                this.originX = 50;
                this.originY = 50;
                this.originZ = 50;
                this.transformStyle = "preserve-3d";
                this.kf_obj = null;
                this.kf_rules = [];
                this.kf_rule_cache = {};
            };
            return new defaultDanceMove();
        }

        function initKeyboardListeners() {
            document.addEventListener('keydown', danceShortCutKeys);

            function danceShortCutKeys(e) {
                if (e.keyCode === 32)  {
                    playDanceMoves($scope.actor, $scope.danceMoves);
                }

                if (e.keyCode === 82)  {
                    $scope.actor.style[browserPrefix + 'Transform'] = '';
                }
            }
        }

        //TODO
        // - previous transform state should be detected

        // - show the 50px
        // - when it goes to the next move, how do I see
        // - i cant see where i'm at

        function initAll() {

            initView()
            initKeyboardListeners();
        }

        function initAnimationListener(elem) {
            $scope.initListenerAnimation = true;
            if (browserPrefix === 'webkit') {

                elem.addEventListener( 'webkitAnimationEnd',
                function( event ) {
                    $scope.showStatusMsgForXSec('Resetting....')
                    $timeout(function() {
                    $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
                    $scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
                    $scope.setActiveKeyFrame($scope.animation.selected_percent.replace('%', ''));
                    console.log($scope.animation.selected_index);
                    if ($scope.actor.cachedStyle) {
                            $scope.actor.style.cssText = $scope.actor.cachedStyle;
                        }
                    // $scope.animation.selected_percent = keyPercent + '%';
                    $timeout(function(){$scope.$apply();})
                    $scope.player.reset();
                    }, 750)
                    // var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);
                }, false );
            } else {
                elem.addEventListener( 'animationend',
                function( event ) {
                    $scope.showStatusMsgForXSec('Resetting....')
                    $timeout(function() {
                        $scope.player.pause();
                        $scope.player.reset();
                        $scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
                        $scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
                        $scope.setActiveKeyFrame($scope.animation.selected_percent.replace('%', ''));
                        $timeout(function(){$scope.$apply();})
                        if ($scope.actor.cachedStyle) {
                            $scope.actor.style.cssText = $scope.actor.cachedStyle;
                        }
                    }, 750);
                    // var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);

                    // $scope.setActiveKeyFrame($scope.animation.selected_index)
                    // $scope.animation.selected_keyframe = $scope.animation.properties[keyPercent + '%'];
                    // $scope.animation.selected_percent = keyPercent + '%';
                }, false );
            }
        }

        function loadAllS3Files() {

            $timeout(function(){
                getS3Animations()
            },1000);
        }

        $scope.updateDefaults = function(value, property) {

            if (property in $scope.defaults.properties && property in $scope.defaults.units) {
                $scope.defaults.properties[property] = parseInt(value);
                $localstorage.setObject('defaults', $scope.defaults);
                LoadingService.showSuccess(property + ' with value of ' + value + $scope.defaults.units[property].default + ' saved as default & cached', 2500);
                console.log($localstorage.getObject('defaults'));
            }
        }

        function getDefaults () {

            var defaults =  {
                units: {
                    translateX: { options: ['px', '%'], selected: '%', default: '%'},
                    translateY: { options: ['px', '%'], selected: '%', default: '%'},
                    translateZ: { options: ['px', '%'], selected: '%', default: '%'},
                    transformOriginX: { options: ['px', '%'], selected: '%', default: '%'},
                    transformOriginY: { options: ['px', '%'], selected: '%', default: '%'},
                    transformOriginZ: { options: ['px'], selected: 'px', default: 'px'},
                },
                properties: {
                    transformOriginX: 50,
                    transformOriginY: 50,
                    transformOriginZ: 0,
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    scaleX: 1,
                    scaleY: 1,
                    rotate: '0deg',
                    rotateX: '0deg',
                    rotateY: '0deg',
                    rotateZ: '0deg',
                    skewX: '0deg',
                    skewY: '0deg',
                    opacity: 1,
                    backgroundColor: '#FFFFFF',
                    color: '#FFFFFF',
                    fill: '#FFFFFF',
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeDasharray: 5,
                    strokeDashoffset: 1
                }
            }
            if (!$localstorage.getObject('defaults') || ($localstorage.getObject('defaults') === [] && !$localstorage.getObject('defaults').length)) {

                $localstorage.setObject('defaults', defaults)
                defaults = $localstorage.getObject('defaults');
                return defaults;

            } else {
                defaults = $localstorage.getObject('defaults');
                return defaults;
            }
            $timeout(function() {
                $scope.$apply();
            })

        }

        function applyDefaultProperties(defaults) {
            var properties = defaults.properties;
            var units = defaults.units;
            if (units && properties) {
                var propertyNames = Object.keys(properties);
                var currentlySupported = ['transformOriginX', 'transformOriginY', 'transformOriginZ'];
                for (var i = 0; i < propertyNames.length; i++) {
                    var indexProperty = propertyNames[i];
                    if (currentlySupported.indexOf(indexProperty) > -1 && indexProperty.indexOf("transformOrigin") > -1) {
                        var transformOriginValue = properties['transformOriginX'] + units['transformOriginX'].default + " " + properties['transformOriginY'] + units['transformOriginY'].default + " " + properties['transformOriginZ'] + units['transformOriginZ'].default;
                        console.log('transform origin set to', transformOriginValue);
                        $scope.actor.style.transformOrigin = transformOriginValue;
                        $scope.actor.style[browserPrefix + 'TransformOrigin'] = transformOriginValue;
                    }
                }
            }
        }

        function hardCodeStageDimensions() {
            $timeout(function() {
                var stageContainer = document.querySelector('#stage-container');
                var stageDimensions = stageContainer.getBoundingClientRect();
                console.log(stageDimensions);
                var height = stageDimensions.height;
                var width = stageDimensions.width;
                stageContainer.style.height = height + 'px;'
                stageContainer.style.width = width + 'px;'
                console.log(stageContainer);
            }, 3000)

        }

        function convertDecomposeToDistinctProps(js_obj) {
            resultTransformObj = new transformPropertiesObj();
            resultTransformObj.skewX = js_obj.skew[0];
            resultTransformObj.skewY = js_obj.skew[1];
            resultTransformObj.skewXdeg = $scope.rad2degree(js_obj.skew[0]);
            resultTransformObj.skewYdeg = $scope.rad2degree(js_obj.skew[1]);
            resultTransformObj.scale3DX = js_obj.scale[0]; //m11
            resultTransformObj.scale3DY = js_obj.scale[1]; //m22
            resultTransformObj.scale3DZ = js_obj.scale[2]; //m33
            resultTransformObj.translateX = js_obj.translate[0]; //m21
            resultTransformObj.translateY = js_obj.translate[1]; //
            resultTransformObj.translateZ = js_obj.translate[2];
            resultTransformObj.rotate3DX = js_obj.rotate[0];
            resultTransformObj.rotate3DY = js_obj.rotate[1];
            resultTransformObj.rotate3DZ = js_obj.rotate[2];
            resultTransformObj.rotate3DXdeg = $scope.rad2degree(js_obj.rotate[0]);
            resultTransformObj.rotate3DYdeg = $scope.rad2degree(js_obj.rotate[1]);
            resultTransformObj.rotate3DZdeg = $scope.rad2degree(js_obj.rotate[2]);

            if (resultTransformObj.skewX) {
                resultTransformObj.modified['skewX'] = true;
            }
            if (resultTransformObj.skewY) {
                resultTransformObj.modified['skewY'] = true;
            }
            if (resultTransformObj.scale3DX) {
                resultTransformObj.modified['scale3DX'] = true;
            }
            if (resultTransformObj.scale3DY) {
                resultTransformObj.modified['scale3DY'] = true;
            }
            if (resultTransformObj.scale3DZ) {
                resultTransformObj.modified['scale3DZ'] = true;
            }
            if (resultTransformObj.translateX) {
                resultTransformObj.modified['translateX'] = true;
            }
            if (resultTransformObj.translateY) {
                resultTransformObj.modified['translateY'] = true;
            }
            if (resultTransformObj.translateZ) {
                resultTransformObj.modified['translateZ'] = true;
            }
            if (resultTransformObj.translateZ) {
                resultTransformObj.modified['translateZ'] = true;
            }

            return resultTransformObj;
        }


        function convertMatrixIntoTransformProperties(js_obj) {
            console.log('processing', js_obj.cssRules.length, 'items');
            for (var i = 0; i < js_obj.cssRules.length; i++) {
                var indexRule = js_obj.cssRules[i];
                var matrixTransform = indexRule.style.transform || indexRule.style.WebkitTransform || indexRule.style.MozTransform || indexRule.style.msTransform || indexRule.style.OTransform;
                if (matrixTransform) {
                    dMatrix = dynamics.initMatrixFromTransform(matrixTransform)
                    // var originalMatrix = new WebKitCSSMatrix(matrixTransform);
                    // // console.log(matrixTransform, '--->', decomposedMatrix.format(), '\n');
                    // var transformDict = convertDecomposeToDistinctProps(decomposedMatrix);

                }
            }
        }

        function getDMatrixString(d_matrix, transform_str, perspective) {
            transform_str = transform_str + " ";
            var result = "";

            var defaults = {"scaleX": 1, "scaleY": 1, "scaleZ": 1};
            var count =0;

            if (d_matrix.skew[0] || transform_str.split('skewX').length > 1) {
                result += "skewX(" + parseFloat(d_matrix.skew[0], 10) + 'rad) '
                count++;
            }
            if (d_matrix.skew[1] || transform_str.split('skewY').length > 1) {
                result += "skewY(" + parseFloat(d_matrix.skew[1], 10) + 'rad) ';
                count++;
            }
            if (d_matrix.rotate[0] || transform_str.split('rotateX').length > 1) {
                result += "rotateX(" + parseFloat(d_matrix.rotate[0], 10) + 'rad) ';
                count++;
            }

            if (d_matrix.rotate[1] || transform_str.split('rotateY').length > 1) {
                result += "rotateY(" + parseFloat(d_matrix.rotate[1], 10) + "rad) ";
                count++;
            }
            if (d_matrix.rotate[2] || transform_str.split('rotateZ').length > 1) {
                result += "rotateZ(" + parseFloat(d_matrix.rotate[2], 10) + "rad) ";
                count++;
            }
            if (d_matrix.translate[0] || transform_str.split('translateX').length > 1) {
                result += "translateX(" + parseFloat(d_matrix.translate[0], 10) + "%) ";
                count++;
            }
            if (d_matrix.translate[1] || transform_str.split('translateY').length > 1) {
                result += "translateY(" + parseFloat(d_matrix.translate[1], 10) + "%) ";
                count++;
            }
            if (d_matrix.translate[2] || transform_str.split('translateZ').length > 1) {
                result += "translateZ(" + parseFloat(d_matrix.translate[2], 10) + "px) ";
                count++;
            }
            if (d_matrix.scale[0] !== 1 && transform_str.split('scaleX').length > 1) {
                result += "scaleX(" + parseFloat(d_matrix.scale[0], 10) + ") ";
                count++;
            }
            if (d_matrix.scale[1] !== 1 && transform_str.split('scaleY').length > 1) {
                result += "scaleY(" + parseFloat(d_matrix.scale[1], 10) + ") ";
                count++;
            }
            if (d_matrix.scale[2] !== 1 &&  transform_str.split('scaleZ').length > 1) {
                result += "scaleZ(" + parseFloat(d_matrix.scale[1], 10) + ") ";
                count++;
            }
            if (transform_str.split('scale(').length > 1) {
                result += "scaleX(" + parseFloat(d_matrix.scale[0], 10) + ") scaleY(" + parseFloat(d_matrix.scale[1], 10) + ") ";
                count++;
            }
            if (transform_str.split('scale3d(').length > 1) {
                result += "scale3d(" + parseFloat(d_matrix.scale[0], 10) + ", " + parseFloat(d_matrix.scale[1], 10) + ", " + parseFloat(d_matrix.scale[1], 10) +  ") ";
                count++;
            }
            if (perspective && perspective.length) {
                result += "perspective(" + perspective + ') '
                count++;
            }
            if (transform_str.split('rotate(').length > 1) {
                var rotateValue = transform_str.split('rotate(')[1].split(')')[0];
                console.log('rotateValue discovered... hacking..');
                result += "rotate(" + rotateValue +") ";
                count++;
            }
            if (count) {
                result = "transform:" + result + ";" //+ '-' + browserPrefix + "Transform:" + result;
                return result
            }

        }

        function doesPropertyExistInsideTransformString(prop, transform_value) {
            return (transform_value.split(prop).length > 1) || (transform_value === prop && transform_value.length === prop.length);
        }

        function updateDropdown(uguru_anim_obj) {


            // var elem = document.querySelector('#animation-name-dropdown');
            uguru_anim_obj.selected_keyframe = uguru_anim_obj.obj.cssRules.item(0);
            uguru_anim_obj.selected_kf_index = 0;
            uguru_anim_obj.selected_percent = uguru_anim_obj.selected_keyframe.keyText;
            uguru_anim_obj.selected_index = 0;
            uguru_anim_obj.num_keyframes = uguru_anim_obj.obj.cssRules.length;
            // $scope.setActiveKeyFrame
            // $compile(elem)($scope);
            $scope.asideTabIndex = 1;
            $scope.actor = document.querySelector('#stage-elem');
        }

        function importLastAnimation() {
            var lastAnimation = $localstorage.getObject('last_animation');

            // lastAnimation.attr.name.replace('-edit-edit', '-edit');
            if (lastAnimation && (!lastAnimation.attr || !lastAnimation.attr.name || !lastAnimation.attr.name.length)) {

                $scope.animation = initAnimation('base-animation', browserPrefix, defaults.KF_COUNT, defaults.DURATION, true);
                if ($scope.animation.obj.name.indexOf('-edit') === -1) {
                    $scope.animation.obj.name = $scope.animation.obj.name + '-edit';
                    $scope.animation.attr.name = $scope.animation.obj.name + '-edit';
                    $timeout(function() {
                        $scope.kf_visuals.show = true;
                        $scope.kf_visuals.onChange(true);
                        $scope.$apply();
                    }, 500)
                }
                $scope.animationDropdown.options[0] = $scope.animation.obj.name;
                $scope.animationDropdown.options.push('Save');
                if ($scope.stage && $scope.stage.stageName) {
                    $scope.updatePageDom($scope.stage.stageName, $scope.stage.stageHtml, $scope.stage.stageCss);
                }
            } else {
                // reconstructAnimationFromProperties(serverAnimation.attr, serverAnimation.properties, serverAnimation.kf_count);

                var callback = function() {
                    if ($scope.animation.obj.name.indexOf('-edit') === -1) {
                        $scope.animation.obj.name = $scope.animation.obj.name + '-edit';
                        $scope.animation.attr.name = $scope.animation.obj.name + '-edit';
                    }
                    $scope.animationDropdown.options[0] = $scope.animation.obj.name;
                    $scope.animationDropdown.options.push('Save');
                    if ($scope.stage && $scope.stage.stageName) {
                        $scope.updatePageDom($scope.stage.stageName, $scope.stage.stageHtml, $scope.stage.stageCss);
                    }
                }
                reconstructAnimationFromProperties(lastAnimation.attr, lastAnimation.properties, lastAnimation.kf_count, callback)
            }

            return;
        }

        function clearStageTemplate() {
            $scope.stageDropdown.options = $scope.stageDropdown.options.slice(0, $scope.stageDropdown.options.length - 2);
            $scope.saveStageHtml(true, true);
            $localstorage.removeObject('last_stage');
            $timeout(function() {
                $scope.resetStageDom();
                $localstorage.removeObject('last_stage');
                $scope.stageDropdown = {toggleActive: true,options:['No stage selected', 'Import Stage'], selectedIndex: 0, label:'Current Stage', size:'small', onOptionClick: onStageDropdownSelected};
            }, 1500)
        }


        function importLastStage() {
            var lastStage = $localstorage.getObject('last_stage');

            if (lastStage  && !lastStage.length && !lastStage.stageHtml) {
                console.log('no stage', lastStage);
                lastStage = {stageName: 'defaultGuru', stageCss:'height:100px !important;width:100px !important;', stageHtml:'<svg viewBox="0 0 150 150" id="stage-elem" draggable="true" class="size-150 radius-4" style="cursor: pointer; position: relative; min-width: 100px; min-height: 100px; animation-duration: 0.25s; animation-iteration-count: 4; animation-timing-function: ease; animation-fill-mode: forwards; animation-direction: normal; animation-delay: 0s; height: 100%; width: 100%; left: 0px; top: 0px;">                     <g fill="none" fill-rule="evenodd">                         <path id="svg-path-line" d="M36,89 C36,89 32,89 30,93 C28,97 28.9750979,103.312012 32.970215,105.79248 C36.9653322,108.272949 40.0000002,105 40,105 C43.9716799,112.0625 51.4101584,131.488446 84.5060264,129.99722 C110.625974,128.820313 122.641113,110.905274 122,95 C122,95 126.995605,97.3076173 129.519043,93.7084962 C132.04248,90.1093751 133,85.9999999 131,82.0000002 C129,78.0000005 126,77 122,79 C125,66.0000006 107,53 107,53 C95,57 83,49 72,49 C61,49 32,55 36,89" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#F9ECE5"></path>                         <path d="M86,115 C91,116 101,114 101,108" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>                         <path d="M30,71 C19.8095703,72.2685547 11.9628907,58 21.0712891,47.8300781 C21.0712892,53 25.0009767,58 30.9999994,58 C18.9804688,50.9570312 24.8095704,23.3339844 42.3525396,19.9365234 C38.5996099,27.453125 49.4423812,31 53,31 C53,31 54,23 61,21 C55,37 97,22 109,42 C109,42 110,49 107,53 C95,57 83,49 72,49 C61,49 32,55 36,89 C36,89 26,85 30,71 Z M107,53 C107,53 125,66.0000006 122,79 C138,61.9999994 115.78,39 109,42 C109,42 110,49 107,53 Z" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#69B3A5"></path>                         <path d="M78.5746668,76.3474511 C74.5891604,76.700595 73.2136606,78.9335687 73.3857487,79.1764552 C74.4389701,80.6560625 75.2624913,82.3360577 75.7916306,84.1810433 C78.2951471,92.9132364 73.2459966,102.022376 64.5138811,104.526779 C55.7808023,107.030373 46.6716623,101.981222 44.1672601,93.2491065 C42.5744394,87.6932015 37.199641,88.0099196 37.199641,88.0099196 L37.0757398,84.6451964 C37.0757398,84.6451964 39.3423669,84.0488221 41.9589013,82.3204481 C44.7727831,80.4605641 47.9707958,77.4415877 48.5525427,76.878377 C50.4279684,75.0648959 52.7624199,73.6726953 55.4458954,72.9032938 C61.1323387,71.2722764 66.978569,72.8448642 71.0568783,76.5517651 C71.234315,76.7129631 72.5871447,74.2208686 78.3445462,73.7171612 C83.6590708,73.2522005 85.4240955,75.4715182 85.5708448,75.2819576 C88.9434989,70.9231818 94.4278349,68.359298 100.311111,68.978096 C103.087424,69.2698279 105.628163,70.2355046 107.790005,71.6957706 C108.460714,72.1494056 112.134381,74.5671879 115.228479,75.9101906 C118.105392,77.1579503 120.441143,77.3516687 120.441143,77.3516687 L120.903402,80.6867894 C120.903402,80.6867894 115.555262,81.3082069 114.951412,87.0562956 C114.001374,96.0906356 105.907398,102.644864 96.8722494,101.695788 C87.8379094,100.745749 81.2836814,92.6517735 82.2328344,83.617511 C82.4335564,81.7086708 82.9528384,79.9111955 83.7331279,78.2711769 C83.8604248,78.0020975 82.1180701,76.0419007 78.1317897,76.3861978 L78.5746668,76.3474511 Z M61.70313,102.841647 C69.0409571,102.19967 74.4690164,95.7307611 73.8270397,88.392934 C73.185063,81.0551069 66.7161539,75.6270476 59.3783268,76.2690243 C52.0404997,76.911001 46.6124404,83.3799101 47.2544171,90.7177372 C47.8963938,98.0555643 54.3653029,103.483624 61.70313,102.841647 Z M99.3476788,99.5481757 C92.0098516,100.190152 85.5409425,94.7620931 84.8989658,87.424266 C84.2569891,80.0864388 89.6850484,73.6175297 97.0228755,72.975553 C104.360703,72.3335763 110.829612,77.7616356 111.471588,85.0994627 C112.113565,92.4372898 106.685506,98.906199 99.3476788,99.5481757 Z" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round" fill="#33534D"></path>                         <path d="M65.5288326,95.1640534 C67.7258698,94.9331355 69.3197243,92.9648891 69.0888064,90.767852 C68.8578885,88.5708149 66.7417349,86.6882461 64.5880769,86.2133563 C61.4999827,85.5324198 59.5109385,85.7414768 56.6319013,87.0495841 C53.7528641,88.3576913 51.1874123,92.6493644 51.1874123,92.6493644 L53.2593359,93.2288569 C57.7309517,87.9395775 60.9235743,89.6150359 61.1326312,91.6040797 C61.3635491,93.8011168 63.3317955,95.3949713 65.5288326,95.1640534 L65.5288326,95.1640534 Z M103.289054,90.8388129 C105.486092,90.607895 107.079946,88.6396486 106.849028,86.4426115 C106.61811,84.2455744 104.501957,82.3630056 102.348299,81.8881158 C99.2602046,81.2071793 97.2711603,81.4162363 94.3921231,82.7243435 C91.5130859,84.0324508 88.9476341,88.3241239 88.9476341,88.3241239 L91.0195577,88.9036164 C95.4911735,83.614337 98.6837961,85.2897954 98.892853,87.2788392 C99.123771,89.4758763 101.092017,91.0697308 103.289054,90.8388129 L103.289054,90.8388129 Z" fill="#33534D"></path>                         <path d="M45,70 L67,71 L67,68 L47,64 L45,70 L45,70 Z M109.752203,65.6040853 L87.9230753,68.5177063 L87.6616081,65.5291222 L107.236879,59.8012286 L109.752203,65.6040853 L109.752203,65.6040853 Z" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#69B3A5"></path>                         <path d="M35.5,105 C36.3284271,105 37,104.328427 37,103.5 C37,102.671573 36.3284271,102 35.5,102 C34.6715729,102 34,102.671573 34,103.5 C34,104.328427 34.6715729,105 35.5,105 L35.5,105 Z M126.223145,93.7663574 C127.051572,93.7663574 127.723145,93.0947845 127.723145,92.2663574 C127.723145,91.4379303 127.051572,90.7663574 126.223145,90.7663574 C125.394717,90.7663574 124.723145,91.4379303 124.723145,92.2663574 C124.723145,93.0947845 125.394717,93.7663574 126.223145,93.7663574 L126.223145,93.7663574 Z" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round" fill="#33534D"></path><path d="M29.8920408,92.4285792 C28.8157813,92.1801051 27.7418726,92.8511578 27.4933985,93.9274172 C27.2449245,95.0036767 27.9159771,96.0775854 28.9922366,96.3260595 C30.068496,96.5745335 31.1424047,95.9034809 31.3908788,94.8272214 M129.716513,89.0236025 C129.449293,90.0953616 130.101502,91.1808182 131.173261,91.4480377 C132.24502,91.7152573 133.330476,91.0630491 133.597696,89.9912901 C133.864915,88.919531 133.212707,87.8340744 132.140948,87.5668548" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>'}
                $scope.stage = lastStage;
                $scope.updatePageDom(lastStage.stageName, lastStage.stageHtml, lastStage.stageCss, 'stage-elem');
            } else {

                $timeout(function() {
                    lastStage = {stageName: 'defaultGuru', stageCss:'height:100px !important;width:100px !important;', stageHtml:'<svg viewBox="0 0 150 150" id="stage-elem" draggable="true" class="size-150 radius-4" style="cursor: pointer; position: relative; min-width: 100px; min-height: 100px; animation-duration: 0.25s; animation-iteration-count: 4; animation-timing-function: ease; animation-fill-mode: forwards; animation-direction: normal; animation-delay: 0s; height: 100%; width: 100%; left: 0px; top: 0px;">                     <g fill="none" fill-rule="evenodd">                         <path id="svg-path-line" d="M36,89 C36,89 32,89 30,93 C28,97 28.9750979,103.312012 32.970215,105.79248 C36.9653322,108.272949 40.0000002,105 40,105 C43.9716799,112.0625 51.4101584,131.488446 84.5060264,129.99722 C110.625974,128.820313 122.641113,110.905274 122,95 C122,95 126.995605,97.3076173 129.519043,93.7084962 C132.04248,90.1093751 133,85.9999999 131,82.0000002 C129,78.0000005 126,77 122,79 C125,66.0000006 107,53 107,53 C95,57 83,49 72,49 C61,49 32,55 36,89" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#F9ECE5"></path>                         <path d="M86,115 C91,116 101,114 101,108" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>                         <path d="M30,71 C19.8095703,72.2685547 11.9628907,58 21.0712891,47.8300781 C21.0712892,53 25.0009767,58 30.9999994,58 C18.9804688,50.9570312 24.8095704,23.3339844 42.3525396,19.9365234 C38.5996099,27.453125 49.4423812,31 53,31 C53,31 54,23 61,21 C55,37 97,22 109,42 C109,42 110,49 107,53 C95,57 83,49 72,49 C61,49 32,55 36,89 C36,89 26,85 30,71 Z M107,53 C107,53 125,66.0000006 122,79 C138,61.9999994 115.78,39 109,42 C109,42 110,49 107,53 Z" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#69B3A5"></path>                         <path d="M78.5746668,76.3474511 C74.5891604,76.700595 73.2136606,78.9335687 73.3857487,79.1764552 C74.4389701,80.6560625 75.2624913,82.3360577 75.7916306,84.1810433 C78.2951471,92.9132364 73.2459966,102.022376 64.5138811,104.526779 C55.7808023,107.030373 46.6716623,101.981222 44.1672601,93.2491065 C42.5744394,87.6932015 37.199641,88.0099196 37.199641,88.0099196 L37.0757398,84.6451964 C37.0757398,84.6451964 39.3423669,84.0488221 41.9589013,82.3204481 C44.7727831,80.4605641 47.9707958,77.4415877 48.5525427,76.878377 C50.4279684,75.0648959 52.7624199,73.6726953 55.4458954,72.9032938 C61.1323387,71.2722764 66.978569,72.8448642 71.0568783,76.5517651 C71.234315,76.7129631 72.5871447,74.2208686 78.3445462,73.7171612 C83.6590708,73.2522005 85.4240955,75.4715182 85.5708448,75.2819576 C88.9434989,70.9231818 94.4278349,68.359298 100.311111,68.978096 C103.087424,69.2698279 105.628163,70.2355046 107.790005,71.6957706 C108.460714,72.1494056 112.134381,74.5671879 115.228479,75.9101906 C118.105392,77.1579503 120.441143,77.3516687 120.441143,77.3516687 L120.903402,80.6867894 C120.903402,80.6867894 115.555262,81.3082069 114.951412,87.0562956 C114.001374,96.0906356 105.907398,102.644864 96.8722494,101.695788 C87.8379094,100.745749 81.2836814,92.6517735 82.2328344,83.617511 C82.4335564,81.7086708 82.9528384,79.9111955 83.7331279,78.2711769 C83.8604248,78.0020975 82.1180701,76.0419007 78.1317897,76.3861978 L78.5746668,76.3474511 Z M61.70313,102.841647 C69.0409571,102.19967 74.4690164,95.7307611 73.8270397,88.392934 C73.185063,81.0551069 66.7161539,75.6270476 59.3783268,76.2690243 C52.0404997,76.911001 46.6124404,83.3799101 47.2544171,90.7177372 C47.8963938,98.0555643 54.3653029,103.483624 61.70313,102.841647 Z M99.3476788,99.5481757 C92.0098516,100.190152 85.5409425,94.7620931 84.8989658,87.424266 C84.2569891,80.0864388 89.6850484,73.6175297 97.0228755,72.975553 C104.360703,72.3335763 110.829612,77.7616356 111.471588,85.0994627 C112.113565,92.4372898 106.685506,98.906199 99.3476788,99.5481757 Z" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round" fill="#33534D"></path>                         <path d="M65.5288326,95.1640534 C67.7258698,94.9331355 69.3197243,92.9648891 69.0888064,90.767852 C68.8578885,88.5708149 66.7417349,86.6882461 64.5880769,86.2133563 C61.4999827,85.5324198 59.5109385,85.7414768 56.6319013,87.0495841 C53.7528641,88.3576913 51.1874123,92.6493644 51.1874123,92.6493644 L53.2593359,93.2288569 C57.7309517,87.9395775 60.9235743,89.6150359 61.1326312,91.6040797 C61.3635491,93.8011168 63.3317955,95.3949713 65.5288326,95.1640534 L65.5288326,95.1640534 Z M103.289054,90.8388129 C105.486092,90.607895 107.079946,88.6396486 106.849028,86.4426115 C106.61811,84.2455744 104.501957,82.3630056 102.348299,81.8881158 C99.2602046,81.2071793 97.2711603,81.4162363 94.3921231,82.7243435 C91.5130859,84.0324508 88.9476341,88.3241239 88.9476341,88.3241239 L91.0195577,88.9036164 C95.4911735,83.614337 98.6837961,85.2897954 98.892853,87.2788392 C99.123771,89.4758763 101.092017,91.0697308 103.289054,90.8388129 L103.289054,90.8388129 Z" fill="#33534D"></path>                         <path d="M45,70 L67,71 L67,68 L47,64 L45,70 L45,70 Z M109.752203,65.6040853 L87.9230753,68.5177063 L87.6616081,65.5291222 L107.236879,59.8012286 L109.752203,65.6040853 L109.752203,65.6040853 Z" stroke="#33534D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#69B3A5"></path>                         <path d="M35.5,105 C36.3284271,105 37,104.328427 37,103.5 C37,102.671573 36.3284271,102 35.5,102 C34.6715729,102 34,102.671573 34,103.5 C34,104.328427 34.6715729,105 35.5,105 L35.5,105 Z M126.223145,93.7663574 C127.051572,93.7663574 127.723145,93.0947845 127.723145,92.2663574 C127.723145,91.4379303 127.051572,90.7663574 126.223145,90.7663574 C125.394717,90.7663574 124.723145,91.4379303 124.723145,92.2663574 C124.723145,93.0947845 125.394717,93.7663574 126.223145,93.7663574 L126.223145,93.7663574 Z" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round" fill="#33534D"></path><path d="M29.8920408,92.4285792 C28.8157813,92.1801051 27.7418726,92.8511578 27.4933985,93.9274172 C27.2449245,95.0036767 27.9159771,96.0775854 28.9922366,96.3260595 C30.068496,96.5745335 31.1424047,95.9034809 31.3908788,94.8272214 M129.716513,89.0236025 C129.449293,90.0953616 130.101502,91.1808182 131.173261,91.4480377 C132.24502,91.7152573 133.330476,91.0630491 133.597696,89.9912901 C133.864915,88.919531 133.212707,87.8340744 132.140948,87.5668548" stroke="#33534D" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>'}
                    $scope.stage = lastStage;
                    $scope.updatePageDom(lastStage.stageName, lastStage.stageHtml, lastStage.stageCss, 'stage-elem');
                })
            }
            return;
        }

        function initView() {
            browserPrefix = getBrowserPrefix();


                // var bounceJS = "@-webkit-keyframes animation { 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); }0.22% { -webkit-transform: matrix3d(3.676, 0.337, 0, 0, -1.316, 0.942, 0, 0, 0, 0, 1, 0, -237.02, 0, 0, 1); transform: matrix3d(3.676, 0.337, 0, 0, -1.316, 0.942, 0, 0, 0, 0, 1, 0, -237.02, 0, 0, 1); }0.43% { -webkit-transform: matrix3d(3.527, 0.633, 0, 0, -2.881, 0.774, 0, 0, 0, 0, 1, 0, -182.798, 0, 0, 1); transform: matrix3d(3.527, 0.633, 0, 0, -2.881, 0.774, 0, 0, 0, 0, 1, 0, -182.798, 0, 0, 1); }0.68% { -webkit-transform: matrix3d(1.816, 0.892, 0, 0, -3.592, 0.451, 0, 0, 0, 0, 1, 0, -125.912, 0, 0, 1); transform: matrix3d(1.816, 0.892, 0, 0, -3.592, 0.451, 0, 0, 0, 0, 1, 0, -125.912, 0, 0, 1); }0.72% { -webkit-transform: matrix3d(1.578, 0.915, 0, 0, -3.577, 0.404, 0, 0, 0, 0, 1, 0, -119.441, 0, 0, 1); transform: matrix3d(1.578, 0.915, 0, 0, -3.577, 0.404, 0, 0, 0, 0, 1, 0, -119.441, 0, 0, 1); }0.95% { -webkit-transform: matrix3d(0.183, 0.998, 0, 0, -3.034, 0.06, 0, 0, 0, 0, 1, 0, -79.596, 0, 0, 1); transform: matrix3d(0.183, 0.998, 0, 0, -3.034, 0.06, 0, 0, 0, 0, 1, 0, -79.596, 0, 0, 1); }1.35% { -webkit-transform: matrix3d(-0.843, 0.886, 0, 0, -1.613, -0.463, 0, 0, 0, 0, 1, 0, -31.647, 0, 0, 1); transform: matrix3d(-0.843, 0.886, 0, 0, -1.613, -0.463, 0, 0, 0, 0, 1, 0, -31.647, 0, 0, 1); }1.43% { -webkit-transform: matrix3d(-0.904, 0.835, 0, 0, -1.373, -0.55, 0, 0, 0, 0, 1, 0, -24.472, 0, 0, 1); transform: matrix3d(-0.904, 0.835, 0, 0, -1.373, -0.55, 0, 0, 0, 0, 1, 0, -24.472, 0, 0, 1); }1.47% { -webkit-transform: matrix3d(-0.92, 0.813, 0, 0, -1.285, -0.582, 0, 0, 0, 0, 1, 0, -21.84, 0, 0, 1); transform: matrix3d(-0.92, 0.813, 0, 0, -1.285, -0.582, 0, 0, 0, 0, 1, 0, -21.84, 0, 0, 1); }1.99% { -webkit-transform: matrix3d(-0.942, 0.412, 0, 0, -0.426, -0.911, 0, 0, 0, 0, 1, 0, 4.825, 0, 0, 1); transform: matrix3d(-0.942, 0.412, 0, 0, -0.426, -0.911, 0, 0, 0, 0, 1, 0, 4.825, 0, 0, 1); }2.02% { -webkit-transform: matrix3d(-0.941, 0.393, 0, 0, -0.402, -0.92, 0, 0, 0, 0, 1, 0, 5.53, 0, 0, 1); transform: matrix3d(-0.941, 0.393, 0, 0, -0.402, -0.92, 0, 0, 0, 0, 1, 0, 5.53, 0, 0, 1); }2.15% { -webkit-transform: matrix3d(-0.938, 0.294, 0, 0, -0.288, -0.956, 0, 0, 0, 0, 1, 0, 8.637, 0, 0, 1); transform: matrix3d(-0.938, 0.294, 0, 0, -0.288, -0.956, 0, 0, 0, 0, 1, 0, 8.637, 0, 0, 1); }2.51% { -webkit-transform: matrix3d(-0.945, 0.061, 0, 0, -0.058, -0.998, 0, 0, 0, 0, 1, 0, 12.662, 0, 0, 1); transform: matrix3d(-0.945, 0.061, 0, 0, -0.058, -0.998, 0, 0, 0, 0, 1, 0, 12.662, 0, 0, 1); }2.55% { -webkit-transform: matrix3d(-0.946, 0.038, 0, 0, -0.036, -0.999, 0, 0, 0, 0, 1, 0, 12.819, 0, 0, 1); transform: matrix3d(-0.946, 0.038, 0, 0, -0.036, -0.999, 0, 0, 0, 0, 1, 0, 12.819, 0, 0, 1); }2.69% { -webkit-transform: matrix3d(-0.95, -0.032, 0, 0, 0.031, -0.999, 0, 0, 0, 0, 1, 0, 13.007, 0, 0, 1); transform: matrix3d(-0.95, -0.032, 0, 0, 0.031, -0.999, 0, 0, 0, 0, 1, 0, 13.007, 0, 0, 1); }2.87% { -webkit-transform: matrix3d(-0.954, -0.116, 0, 0, 0.112, -0.993, 0, 0, 0, 0, 1, 0, 12.639, 0, 0, 1); transform: matrix3d(-0.954, -0.116, 0, 0, 0.112, -0.993, 0, 0, 0, 0, 1, 0, 12.639, 0, 0, 1); }3.85% { -webkit-transform: matrix3d(-0.926, -0.372, 0, 0, 0.371, -0.928, 0, 0, 0, 0, 1, 0, 6.116, 0, 0, 1); transform: matrix3d(-0.926, -0.372, 0, 0, 0.371, -0.928, 0, 0, 0, 0, 1, 0, 6.116, 0, 0, 1); }4.54% { -webkit-transform: matrix3d(-0.908, -0.421, 0, 0, 0.422, -0.907, 0, 0, 0, 0, 1, 0, 2.352, 0, 0, 1); transform: matrix3d(-0.908, -0.421, 0, 0, 0.422, -0.907, 0, 0, 0, 0, 1, 0, 2.352, 0, 0, 1); }4.6% { -webkit-transform: matrix3d(-0.907, -0.422, 0, 0, 0.423, -0.906, 0, 0, 0, 0, 1, 0, 2.121, 0, 0, 1); transform: matrix3d(-0.907, -0.422, 0, 0, 0.423, -0.906, 0, 0, 0, 0, 1, 0, 2.121, 0, 0, 1); }4.72% { -webkit-transform: matrix3d(-0.907, -0.423, 0, 0, 0.424, -0.906, 0, 0, 0, 0, 1, 0, 1.672, 0, 0, 1); transform: matrix3d(-0.907, -0.423, 0, 0, 0.424, -0.906, 0, 0, 0, 0, 1, 0, 1.672, 0, 0, 1); }5.11% { -webkit-transform: matrix3d(-0.91, -0.416, 0, 0, 0.416, -0.91, 0, 0, 0, 0, 1, 0, 0.651, 0, 0, 1); transform: matrix3d(-0.91, -0.416, 0, 0, 0.416, -0.91, 0, 0, 0, 0, 1, 0, 0.651, 0, 0, 1); }6.39% { -webkit-transform: matrix3d(-0.952, -0.305, 0, 0, 0.305, -0.952, 0, 0, 0, 0, 1, 0, -0.311, 0, 0, 1); transform: matrix3d(-0.952, -0.305, 0, 0, 0.305, -0.952, 0, 0, 0, 0, 1, 0, -0.311, 0, 0, 1); }6.57% { -webkit-transform: matrix3d(-0.959, -0.282, 0, 0, 0.282, -0.959, 0, 0, 0, 0, 1, 0, -0.302, 0, 0, 1); transform: matrix3d(-0.959, -0.282, 0, 0, 0.282, -0.959, 0, 0, 0, 0, 1, 0, -0.302, 0, 0, 1); }6.61% { -webkit-transform: matrix3d(-0.961, -0.277, 0, 0, 0.277, -0.961, 0, 0, 0, 0, 1, 0, -0.299, 0, 0, 1); transform: matrix3d(-0.961, -0.277, 0, 0, 0.277, -0.961, 0, 0, 0, 0, 1, 0, -0.299, 0, 0, 1); }6.68% { -webkit-transform: matrix3d(-0.963, -0.268, 0, 0, 0.268, -0.963, 0, 0, 0, 0, 1, 0, -0.291, 0, 0, 1); transform: matrix3d(-0.963, -0.268, 0, 0, 0.268, -0.963, 0, 0, 0, 0, 1, 0, -0.291, 0, 0, 1); }8.06% { -webkit-transform: matrix3d(-0.996, -0.084, 0, 0, 0.084, -0.996, 0, 0, 0, 0, 1, 0, -0.076, 0, 0, 1); transform: matrix3d(-0.996, -0.084, 0, 0, 0.084, -0.996, 0, 0, 0, 0, 1, 0, -0.076, 0, 0, 1); }8.33% { -webkit-transform: matrix3d(-0.999, -0.051, 0, 0, 0.051, -0.999, 0, 0, 0, 0, 1, 0, -0.048, 0, 0, 1); transform: matrix3d(-0.999, -0.051, 0, 0, 0.051, -0.999, 0, 0, 0, 0, 1, 0, -0.048, 0, 0, 1); }9.51% { -webkit-transform: matrix3d(-0.998, 0.055, 0, 0, -0.055, -0.998, 0, 0, 0, 0, 1, 0, 0.004, 0, 0, 1); transform: matrix3d(-0.998, 0.055, 0, 0, -0.055, -0.998, 0, 0, 0, 0, 1, 0, 0.004, 0, 0, 1); }10.09% { -webkit-transform: matrix3d(-0.997, 0.084, 0, 0, -0.084, -0.997, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); transform: matrix3d(-0.997, 0.084, 0, 0, -0.084, -0.997, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); }10.28% { -webkit-transform: matrix3d(-0.996, 0.089, 0, 0, -0.089, -0.996, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); transform: matrix3d(-0.996, 0.089, 0, 0, -0.089, -0.996, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); }10.96% { -webkit-transform: matrix3d(-0.995, 0.098, 0, 0, -0.098, -0.995, 0, 0, 0, 0, 1, 0, 0.005, 0, 0, 1); transform: matrix3d(-0.995, 0.098, 0, 0, -0.098, -0.995, 0, 0, 0, 0, 1, 0, 0.005, 0, 0, 1); }13.8% { -webkit-transform: matrix3d(-1, 0.025, 0, 0, -0.025, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.025, 0, 0, -0.025, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }14% { -webkit-transform: matrix3d(-1, 0.019, 0, 0, -0.019, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.019, 0, 0, -0.019, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.57% { -webkit-transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.67% { -webkit-transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.87% { -webkit-transform: matrix3d(-1, -0.024, 0, 0, 0.013, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.024, 0, 0, 0.013, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }20.92% { -webkit-transform: matrix3d(-1, 0.002, 0, 0, -0.323, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.002, 0, 0, -0.323, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }22.77% { -webkit-transform: matrix3d(-1, 0.006, 0, 0, -0.432, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.006, 0, 0, -0.432, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }23.09% { -webkit-transform: matrix3d(-1, 0.006, 0, 0, -0.444, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.006, 0, 0, -0.444, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }25.18% { -webkit-transform: matrix3d(-1, 0.002, 0, 0, -0.474, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.002, 0, 0, -0.474, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }27.68% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.438, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.438, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }28.63% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.417, -1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.417, -1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }30.1% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.385, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.385, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }32.52% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.35, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.35, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }34.53% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }34.93% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }40.44% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.361, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.361, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }44.78% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.37, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.37, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }46.3% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.369, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.369, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }50% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.365, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.365, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }54.62% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.363, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.363, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }64.38% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }74.22% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }84.07% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }93.83% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }100% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }";
                // bounceJS += "@keyframes animation { 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); }0.22% { -webkit-transform: matrix3d(3.676, 0.337, 0, 0, -1.316, 0.942, 0, 0, 0, 0, 1, 0, -237.02, 0, 0, 1); transform: matrix3d(3.676, 0.337, 0, 0, -1.316, 0.942, 0, 0, 0, 0, 1, 0, -237.02, 0, 0, 1); }0.43% { -webkit-transform: matrix3d(3.527, 0.633, 0, 0, -2.881, 0.774, 0, 0, 0, 0, 1, 0, -182.798, 0, 0, 1); transform: matrix3d(3.527, 0.633, 0, 0, -2.881, 0.774, 0, 0, 0, 0, 1, 0, -182.798, 0, 0, 1); }0.68% { -webkit-transform: matrix3d(1.816, 0.892, 0, 0, -3.592, 0.451, 0, 0, 0, 0, 1, 0, -125.912, 0, 0, 1); transform: matrix3d(1.816, 0.892, 0, 0, -3.592, 0.451, 0, 0, 0, 0, 1, 0, -125.912, 0, 0, 1); }0.72% { -webkit-transform: matrix3d(1.578, 0.915, 0, 0, -3.577, 0.404, 0, 0, 0, 0, 1, 0, -119.441, 0, 0, 1); transform: matrix3d(1.578, 0.915, 0, 0, -3.577, 0.404, 0, 0, 0, 0, 1, 0, -119.441, 0, 0, 1); }0.95% { -webkit-transform: matrix3d(0.183, 0.998, 0, 0, -3.034, 0.06, 0, 0, 0, 0, 1, 0, -79.596, 0, 0, 1); transform: matrix3d(0.183, 0.998, 0, 0, -3.034, 0.06, 0, 0, 0, 0, 1, 0, -79.596, 0, 0, 1); }1.35% { -webkit-transform: matrix3d(-0.843, 0.886, 0, 0, -1.613, -0.463, 0, 0, 0, 0, 1, 0, -31.647, 0, 0, 1); transform: matrix3d(-0.843, 0.886, 0, 0, -1.613, -0.463, 0, 0, 0, 0, 1, 0, -31.647, 0, 0, 1); }1.43% { -webkit-transform: matrix3d(-0.904, 0.835, 0, 0, -1.373, -0.55, 0, 0, 0, 0, 1, 0, -24.472, 0, 0, 1); transform: matrix3d(-0.904, 0.835, 0, 0, -1.373, -0.55, 0, 0, 0, 0, 1, 0, -24.472, 0, 0, 1); }1.47% { -webkit-transform: matrix3d(-0.92, 0.813, 0, 0, -1.285, -0.582, 0, 0, 0, 0, 1, 0, -21.84, 0, 0, 1); transform: matrix3d(-0.92, 0.813, 0, 0, -1.285, -0.582, 0, 0, 0, 0, 1, 0, -21.84, 0, 0, 1); }1.99% { -webkit-transform: matrix3d(-0.942, 0.412, 0, 0, -0.426, -0.911, 0, 0, 0, 0, 1, 0, 4.825, 0, 0, 1); transform: matrix3d(-0.942, 0.412, 0, 0, -0.426, -0.911, 0, 0, 0, 0, 1, 0, 4.825, 0, 0, 1); }2.02% { -webkit-transform: matrix3d(-0.941, 0.393, 0, 0, -0.402, -0.92, 0, 0, 0, 0, 1, 0, 5.53, 0, 0, 1); transform: matrix3d(-0.941, 0.393, 0, 0, -0.402, -0.92, 0, 0, 0, 0, 1, 0, 5.53, 0, 0, 1); }2.15% { -webkit-transform: matrix3d(-0.938, 0.294, 0, 0, -0.288, -0.956, 0, 0, 0, 0, 1, 0, 8.637, 0, 0, 1); transform: matrix3d(-0.938, 0.294, 0, 0, -0.288, -0.956, 0, 0, 0, 0, 1, 0, 8.637, 0, 0, 1); }2.51% { -webkit-transform: matrix3d(-0.945, 0.061, 0, 0, -0.058, -0.998, 0, 0, 0, 0, 1, 0, 12.662, 0, 0, 1); transform: matrix3d(-0.945, 0.061, 0, 0, -0.058, -0.998, 0, 0, 0, 0, 1, 0, 12.662, 0, 0, 1); }2.55% { -webkit-transform: matrix3d(-0.946, 0.038, 0, 0, -0.036, -0.999, 0, 0, 0, 0, 1, 0, 12.819, 0, 0, 1); transform: matrix3d(-0.946, 0.038, 0, 0, -0.036, -0.999, 0, 0, 0, 0, 1, 0, 12.819, 0, 0, 1); }2.69% { -webkit-transform: matrix3d(-0.95, -0.032, 0, 0, 0.031, -0.999, 0, 0, 0, 0, 1, 0, 13.007, 0, 0, 1); transform: matrix3d(-0.95, -0.032, 0, 0, 0.031, -0.999, 0, 0, 0, 0, 1, 0, 13.007, 0, 0, 1); }2.87% { -webkit-transform: matrix3d(-0.954, -0.116, 0, 0, 0.112, -0.993, 0, 0, 0, 0, 1, 0, 12.639, 0, 0, 1); transform: matrix3d(-0.954, -0.116, 0, 0, 0.112, -0.993, 0, 0, 0, 0, 1, 0, 12.639, 0, 0, 1); }3.85% { -webkit-transform: matrix3d(-0.926, -0.372, 0, 0, 0.371, -0.928, 0, 0, 0, 0, 1, 0, 6.116, 0, 0, 1); transform: matrix3d(-0.926, -0.372, 0, 0, 0.371, -0.928, 0, 0, 0, 0, 1, 0, 6.116, 0, 0, 1); }4.54% { -webkit-transform: matrix3d(-0.908, -0.421, 0, 0, 0.422, -0.907, 0, 0, 0, 0, 1, 0, 2.352, 0, 0, 1); transform: matrix3d(-0.908, -0.421, 0, 0, 0.422, -0.907, 0, 0, 0, 0, 1, 0, 2.352, 0, 0, 1); }4.6% { -webkit-transform: matrix3d(-0.907, -0.422, 0, 0, 0.423, -0.906, 0, 0, 0, 0, 1, 0, 2.121, 0, 0, 1); transform: matrix3d(-0.907, -0.422, 0, 0, 0.423, -0.906, 0, 0, 0, 0, 1, 0, 2.121, 0, 0, 1); }4.72% { -webkit-transform: matrix3d(-0.907, -0.423, 0, 0, 0.424, -0.906, 0, 0, 0, 0, 1, 0, 1.672, 0, 0, 1); transform: matrix3d(-0.907, -0.423, 0, 0, 0.424, -0.906, 0, 0, 0, 0, 1, 0, 1.672, 0, 0, 1); }5.11% { -webkit-transform: matrix3d(-0.91, -0.416, 0, 0, 0.416, -0.91, 0, 0, 0, 0, 1, 0, 0.651, 0, 0, 1); transform: matrix3d(-0.91, -0.416, 0, 0, 0.416, -0.91, 0, 0, 0, 0, 1, 0, 0.651, 0, 0, 1); }6.39% { -webkit-transform: matrix3d(-0.952, -0.305, 0, 0, 0.305, -0.952, 0, 0, 0, 0, 1, 0, -0.311, 0, 0, 1); transform: matrix3d(-0.952, -0.305, 0, 0, 0.305, -0.952, 0, 0, 0, 0, 1, 0, -0.311, 0, 0, 1); }6.57% { -webkit-transform: matrix3d(-0.959, -0.282, 0, 0, 0.282, -0.959, 0, 0, 0, 0, 1, 0, -0.302, 0, 0, 1); transform: matrix3d(-0.959, -0.282, 0, 0, 0.282, -0.959, 0, 0, 0, 0, 1, 0, -0.302, 0, 0, 1); }6.61% { -webkit-transform: matrix3d(-0.961, -0.277, 0, 0, 0.277, -0.961, 0, 0, 0, 0, 1, 0, -0.299, 0, 0, 1); transform: matrix3d(-0.961, -0.277, 0, 0, 0.277, -0.961, 0, 0, 0, 0, 1, 0, -0.299, 0, 0, 1); }6.68% { -webkit-transform: matrix3d(-0.963, -0.268, 0, 0, 0.268, -0.963, 0, 0, 0, 0, 1, 0, -0.291, 0, 0, 1); transform: matrix3d(-0.963, -0.268, 0, 0, 0.268, -0.963, 0, 0, 0, 0, 1, 0, -0.291, 0, 0, 1); }8.06% { -webkit-transform: matrix3d(-0.996, -0.084, 0, 0, 0.084, -0.996, 0, 0, 0, 0, 1, 0, -0.076, 0, 0, 1); transform: matrix3d(-0.996, -0.084, 0, 0, 0.084, -0.996, 0, 0, 0, 0, 1, 0, -0.076, 0, 0, 1); }8.33% { -webkit-transform: matrix3d(-0.999, -0.051, 0, 0, 0.051, -0.999, 0, 0, 0, 0, 1, 0, -0.048, 0, 0, 1); transform: matrix3d(-0.999, -0.051, 0, 0, 0.051, -0.999, 0, 0, 0, 0, 1, 0, -0.048, 0, 0, 1); }9.51% { -webkit-transform: matrix3d(-0.998, 0.055, 0, 0, -0.055, -0.998, 0, 0, 0, 0, 1, 0, 0.004, 0, 0, 1); transform: matrix3d(-0.998, 0.055, 0, 0, -0.055, -0.998, 0, 0, 0, 0, 1, 0, 0.004, 0, 0, 1); }10.09% { -webkit-transform: matrix3d(-0.997, 0.084, 0, 0, -0.084, -0.997, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); transform: matrix3d(-0.997, 0.084, 0, 0, -0.084, -0.997, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); }10.28% { -webkit-transform: matrix3d(-0.996, 0.089, 0, 0, -0.089, -0.996, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); transform: matrix3d(-0.996, 0.089, 0, 0, -0.089, -0.996, 0, 0, 0, 0, 1, 0, 0.007, 0, 0, 1); }10.96% { -webkit-transform: matrix3d(-0.995, 0.098, 0, 0, -0.098, -0.995, 0, 0, 0, 0, 1, 0, 0.005, 0, 0, 1); transform: matrix3d(-0.995, 0.098, 0, 0, -0.098, -0.995, 0, 0, 0, 0, 1, 0, 0.005, 0, 0, 1); }13.8% { -webkit-transform: matrix3d(-1, 0.025, 0, 0, -0.025, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.025, 0, 0, -0.025, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }14% { -webkit-transform: matrix3d(-1, 0.019, 0, 0, -0.019, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.019, 0, 0, -0.019, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.57% { -webkit-transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.67% { -webkit-transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.023, 0, 0, 0.023, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }16.87% { -webkit-transform: matrix3d(-1, -0.024, 0, 0, 0.013, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.024, 0, 0, 0.013, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }20.92% { -webkit-transform: matrix3d(-1, 0.002, 0, 0, -0.323, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.002, 0, 0, -0.323, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }22.77% { -webkit-transform: matrix3d(-1, 0.006, 0, 0, -0.432, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.006, 0, 0, -0.432, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }23.09% { -webkit-transform: matrix3d(-1, 0.006, 0, 0, -0.444, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.006, 0, 0, -0.444, -0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }25.18% { -webkit-transform: matrix3d(-1, 0.002, 0, 0, -0.474, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0.002, 0, 0, -0.474, -0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }27.68% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.438, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.438, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }28.63% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.417, -1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.417, -1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }30.1% { -webkit-transform: matrix3d(-1, -0.001, 0, 0, -0.385, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, -0.001, 0, 0, -0.385, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }32.52% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.35, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.35, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }34.53% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }34.93% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.34, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }40.44% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.361, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.361, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }44.78% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.37, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.37, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }46.3% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.369, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.369, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }50% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.365, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.365, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }54.62% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.363, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.363, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }64.38% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }74.22% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }84.07% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }93.83% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }100% { -webkit-transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(-1, 0, 0, 0, -0.364, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }";
                // var animationName = 'bounce-js-complex';
                // $scope.animation = importAndProcessAnimationCSSTextByKF(bounceJS, animationName, updateDropdown);

            // console.log($scope.animation.properties);
            // var tempKeyFrame = $scope.animation.obj.cssRules.item(2);
            // console.log('setting to ', tempKeyFrame.keyText)
            // $scope.setActiveKeyFrame(tempKeyFrame.keyText);
            // console.log($scope.animation.selected_keyframe);
            // $scope.animation = matrix3DKeyframesToDecomposedKF(bounceJS, 'bounce-js', updateDropdown);
            // importAndProcessAnimationCSSTextByKF(bounceJS, 'bounce-js');



            //turn off for now
            false && loadAllS3Files();
            importAnimations();
            importStageHtml();
            initShortCuts();
            hardCodeStageDimensions();

            $scope.defaults = getDefaults();
            applyDefaultProperties($scope.defaults);
            $scope.actor = document.querySelector('#stage-elem');



            // $scope.resetStageDom();
            // $scope.addSVGPlaceholder('circle');
            // $scope.addSVGPlaceholder('square');
            // $scope.addSVGPlaceholder('octagon');
            // $scope.addSVGPlaceholder('hexagon');
            // $scope.addSVGPlaceholder('rect');
            // $scope.addSVGPlaceholder('parallelogram');
            // editKeyframeAtX($scope.animation, 0, 'translateX', 10)


        }



        $scope.setActiveKeyFrameFromPointer = function($event) {
            var kfBarContainerElem = document.querySelector('#keyframe-bar')
            var barLeftPx = kfBarContainerElem.getBoundingClientRect().left;
            var totalBarWidth = kfBarContainerElem.getBoundingClientRect().width;
            var percentFromBeginning = Math.abs($event.offsetX)/(totalBarWidth*1.0) * 100
            var propertyKeys = Object.keys($scope.animation.properties);
            var min = 101;
            var closedIndex = -1;
            for (var i = 0; i < propertyKeys.length; i++) {
                var indexKey = parseFloat(propertyKeys[i].replace('%'));
                var dx = Math.abs(indexKey - percentFromBeginning);
                if (dx < min) {
                    min = dx;
                    closedIndex = i;
                }
            }
            $scope.setActiveKeyFrame(propertyKeys[closedIndex]);

            // console.log(kfBarContainerElemWidth, kfBarContainerElemLeft);
            // console.log($event);
        }


        $scope.stageElemDefaults = {
            draggable:true
        }

        $scope.toggleStageElemDraggable = function() {
            var elem = document.querySelector('#stage-container [draggable]');
            if (elem && elem.id && elem.hasAttribute('draggable')) {
                console.log($scope.actor, 'has attribute');
                    elem.removeAttribute('draggable');
                    elem.setAttribute('no-draggable', '');
                    $compile(elem)($scope);
                    $timeout(function() {
                        $scope.$apply();
                    })
            }
            else {
                var elem = document.querySelector('#stage-container [no-draggable]');
                elem.removeAttribute('no-draggable');
                elem.setAttribute('draggable', '');
                $compile(elem)($scope);
                    $timeout(function() {
                        $scope.$apply();
                    })
            }
            $scope.stageElemDefaults.draggable = !$scope.stageElemDefaults.draggable;
        }

        function cleanupAnimation(animation, is_orig_css) {
            if (is_orig_css) {
                var tempAnim = initAnimationFromCSSText(animation.obj.name, browserPrefix, animation.obj.origCSSText);
            } else {
                var tempAnim = initAnimationFromCSSText(animation.obj.name, browserPrefix, animation.obj.cssText);
            }
            var cssRulesLength = animation.obj.cssRules.length;
            var animDictToSort = {};
            for (var i = 0; i < cssRulesLength; i++) {
                var indexKFRule = animation.obj.cssRules.item(i);
                var indexKeyText = indexKFRule.keyText;
                var indexKeyStyle = indexKFRule.cssText;
                if (!(indexKeyStyle.indexOf('{ }') > -1)) {
                    animDictToSort[indexKeyText] = indexKeyStyle;
                    tempAnim.deleteRule(indexKeyStyle, i);
                }
            }

            var animDictKeysSorted = Object.keys(animDictToSort).sort(function(val_a, val_b) {return parseFloat(val_b.replace('%', '')) - parseFloat(val_a.replace('%', ''))}).reverse();
            for (var i = 0; i < animDictKeysSorted.length; i++) {
                var indexKey = animDictKeysSorted[i];
                var cssValueText = animDictToSort[indexKey];
                tempAnim.appendRule(cssValueText, i);
            }
            return tempAnim;
        }

        $scope.renderAnimationCSSText = function(animation, skip_tab_switch) {
            if (!skip_tab_switch) {
                $scope.layout.index = 2;
            }

            // var tempOGAnim = cleanupAnimation(animation, true);
            var tempAnim = cleanupAnimation(animation);
            // $scope.animation.obj.origCSSText = tempOGAnim.cssText;


            var animClassText = generateClassText(animation);
            animation.exportable_kf = {obj: tempAnim, className: tempAnim.name, classText: animClassText, fullText: animClassText + tempAnim.cssText, cssText: tempAnim.cssText};

            $timeout(function() {
                // angular.element(document.querySelector('#export-textarea')).select()
                document.querySelector('#export-textarea').select();
                // window.prompt("Copy to clipboard: Ctrl+C, Enter", $scope.animation.exportable_kf.fullText);
                document.execCommand('copy')
            }, 1000)
            function generateClassText(anim) {
                 return "." + anim.obj.name + "\n{\n   " + ' animation:  ' + anim.obj.name + ' ' + anim.attr.duration  + ' ' + anim.attr.timing_function + ' ' + anim.attr.delay + ' ' + anim.attr.iteration_count + ' ' + anim.attr.direction + ';\n    ' + '-' + browserPrefix + '-' + 'animation:  ' + anim.obj.name + ' ' + anim.attr.duration  + ' ' + anim.attr.timing_function + ' ' + anim.attr.delay + ' ' + anim.attr.iteration_count + ' ' + anim.attr.direction + ';\n}\n\n'
            }
        }

        $scope.editAnimationName = false;
        $scope.exports = {animations: []};

        $scope.addNewAnimation = function(animation) {
            if (!$scope.animation || !$scope.animation.obj || !$scope.animation.obj.name) {
                initNewAnimation();
            }
            $scope.showStatusMsgForXSec('Save ' + animation.obj.name + '?', 5000 , 'confirm', callback);
            function callback(bool) {
                if (bool) {
                    $scope.saveAnimationClass($scope.animation);
                    $scope.showStatusMsgForXSec('Saving ' + $scope.animation.obj.name + '...', 2000);
                    $timeout(function() {
                        initNewAnimation();
                    }, 2000);
                } else {
                    $scope.showStatusMsgForXSec('Canceling...', 2000);
                }

            }

            function initNewAnimation() {
                $scope.animation = initAnimation('nameless-anim', browserPrefix, defaults.KF_COUNT, defaults.DURATION, true);
                $timeout(function() {
                    $scope.animation.edit = true;
                }, 500)
                $timeout(function() {
                    var elem = document.querySelector('#anim-name-input');
                    elem && elem.select();
                    $scope.animationDropdown.options[0] = $scope.animation.obj.name;
                    $scope.animationDropdown.options.push('Save');
                }, 1000);

                return;
            }

        }

        $scope.saveAnimationClass = function(animation, owner) {
            console.log('rendering', animation);
            if (!animation.exportable_kf) {
                $scope.renderAnimationCSSText(animation, true);
            }
            if (animation.exportable_kf.className.length && animation.exportable_kf.classText.length) {
                var payloadDict = {
                    name: animation.exportable_kf.className,
                    owner: owner || $scope.user.name.split(' ')[0].toLowerCase(),
                    lastUpdated: (new Date()).getTime(),
                    classText: animation.exportable_kf.classText,
                    cssText: animation.exportable_kf.cssText
                }

                var animationIndex = checkIfAnimationAlreadyExists(payloadDict, $scope.imports.animations)

                if (animationIndex < 0) {
                    $scope.showStatusMsgForXSec('Adding ' + payloadDict.name + ' animation to server', 2500);
                    $scope.imports.animations.push(payloadDict);
                } else {
                    $scope.showStatusMsgForXSec('Updating ' + payloadDict.name + ' animation to server', 2500);
                    var removedElem = $scope.imports.animations.splice(animationIndex, 1);
                    console.log('removed', removedElem && removedElem.name);
                    $scope.imports.animations.push(payloadDict);
                    console.log('re added', payloadDict.name);
                }
                $localstorage.setObject('imports', $scope.imports);

                $timeout(function() {
                    var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/';
                    saveToMasterS3('animations.json', animation_url, $scope.imports.animations);
                })

                $localstorage.setObject('last_animation', $scope.animation);
                return payloadDict;
            }

            function checkIfAnimationAlreadyExists(obj, arr_obj) {
                for (var i = 0; i < arr_obj.length; i++) {
                    var indexAnimObj = arr_obj[i];
                    if (indexAnimObj.name === obj.name) {
                        return i;
                    }
                }
                return -1;
            }
        }
        $scope.saveStageHtml = function(ignore_loader, is_clear) {

            if ($scope.stage && $scope.stage.stageName) {
                $scope.stage.stageHtml = document.querySelector('#stage-container').innerHTML;
                var stageIndex = checkIfStageAlreadyExists($scope.stage, $scope.imports.stages)

                if (stageIndex < 0) {
                    $scope.showStatusMsgForXSec('adding ' + $scope.stage.stageName + ' animation to server', 2500);
                    $scope.imports.stages.push($scope.stage);
                } else {
                    $scope.showStatusMsgForXSec('Updating ' + $scope.stage.stageName + ' animation to server', 2500);
                    var removedElem = $scope.imports.stages.splice(stageIndex, 1);

                    console.log('removed', removedElem && removedElem.stageName);
                    $scope.imports.stages.push($scope.stage);
                    console.log('re added', $scope.stage.stageName);
                }
            }

            $localstorage.setObject('imports', $scope.imports);

            $timeout(function() {
                var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/';
                saveToMasterS3('stages.json', animation_url, $scope.imports.stages);
            })
            if (!is_clear && $scope.stage && $scope.stageDropdown.options.length > 2) {
                $localstorage.setObject('last_stage', $scope.stage);
            }
            return $scope.stage;

            function checkIfStageAlreadyExists(obj, arr_obj) {
                for (var i = 0; i < arr_obj.length; i++) {
                    var indexStageObj = arr_obj[i];
                    if (indexStageObj.stageName === obj.stageName) {
                        return i;
                    }
                }
                return -1;
            }
            $scope.layout.index = 0;
        }

        function chooseXRandomAnimations(x, animations_arr) {
            var randAnimations = [];
            for (var i = 0; i < x; i++) {
                var indexRandomInteger = Math.floor(Math.random() * (animations_arr.length - 1) + 1);
                var indexAnimation = animations_arr[indexRandomInteger];
                var processedIndexAnimation = $scope.importFromCSSText(indexAnimation.cssText, indexAnimation.name, indexAnimation.classText, {skip_local:true});
                processedIndexAnimation.attr.name.replace('-edit', '');
                processedIndexAnimation.obj.name.replace('-edit', '');
                randAnimations.push(processedIndexAnimation);
            }
            return randAnimations;
        }

        function processAnimations(animation_arr) {

            for (var i = 0; i < animation_arr.length; i++) {
                var indexAnimation = animation_arr[i];
                if (indexAnimation.owner === 'asif') {
                    indexAnimation.owner = 'samir';
                }
            }
            // $scope.animations = chooseXRandomAnimations(5, animation_arr);

            // $timeout(function() {
            //  console.log('random 5 animations', $scope.animations);
            // }, 1000);
            for (var i = 0; i < animation_arr.length; i++) {
                if (animation_arr[i].name === 'magic') {
                    // importAnimation(animation_arr[i], i * 50);
                }
            }

            function importAnimation(animation, delay) {
                $timeout(function() {
                    var lastAnimation = animation;

                    $scope.importFromCSSText(lastAnimation.cssText, lastAnimation.name, lastAnimation.classText, {skip_local:true});

                    $timeout(function() {
                        console.log('recently imported nim', $scope.animation);
                        $scope.renderAnimationCSSText($scope.animation);
                    }, 1500)

                }, delay || 0)
            }

            return animation_arr
        }
        var tempStage = {};
        $scope.importCodepenTemplate = function(url, name) {
            tempState = {};
            if (!url || !name) {
                LoadingService.showMsg('Please add a name to the template so we can save it!', 2000);
                return;
            }


            $timeout(function() {
                FileService.getCodepenAssets('html', url + '.html', htmlCallback);
            })
            $timeout(function() {
                FileService.getCodepenAssets('css', url + '.css', cssCallback);
            })

            $timeout(function() {
                LoadingService.hide();
                tempStage.name = name;
                $scope.stage = initNewStage(tempStage.name, tempStage.html, tempStage.css);

                $scope.pageDom.stageName = $scope.stage.stageName;
                $scope.pageDom.stageCss = $scope.stage.stageCss;
                $scope.pageDom.stageHtml = $scope.stage.stageHtml;
                $scope.updatePageDom($scope.stage.stageName, $scope.stage.stageHtml, $scope.stage.stageCss);

                $scope.saveStageHtml();

            }, 3000);
            function cssCallback(resp) {
                tempStage.css = resp;
            }
            function htmlCallback(resp) {
                tempStage.html = resp;
            }
        }

        function saveToMasterS3(filename, url, obj, cb) {
            console.log('about to save to master with url', url + filename, obj);
            FileService.postS3JsonFile(JSON.stringify(obj), null, url + filename, function(name, resp) { cb && cb()});
        }

        function importAnimations() {
            $scope.imports = $localstorage.getObject('imports');
            var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
            FileService.getS3JsonFile(null, animation_url, function(name, resp) {$scope.imports.animations = processAnimations(resp); });
        }

        function defaultStates() {
            var preAppStates = {

                'templates/splash.html':'SplashController',
                'templates/elements/layouts/powerups.html': 'PowerupController',
                'templates/maps.html': 'GMapController',
                'templates/splash/swiper/splash.hiw.container.html': 'HowItWorksController',
                'templates/splash/swiper/splash.account.container.html': 'SignupController',
                'templates/splash/swiper/splash.demographics.container.html': 'DemographicController',
                'templates/splash/swiper/splash.courses.container.html': 'CoursesController',
                'templates/splash/swiper/splash.access.container.html': 'AccessController',
                'templates/splash/layout/university.search.html': 'UniversitySearchController',
                'templates/splash/layout/splash.sidebar.html': 'SidebarController',
            }
            allTemplates = Object.keys(preAppStates);
            for (var i = 0; i < allTemplates.length; i++) {
                var html = '<div ng-include="root.base_url + ' + "'" + allTemplates[i] + "'" + '" ng-controller="' + preAppStates[allTemplates[i]] + '"> </div>'
                preAppStates[allTemplates[i]] = {controller: preAppStates[allTemplates[i]], owner: 'samir', url: allTemplates[i] + "", html:html};
            }
            preAppStates[allTemplates[0]].name = 'Splash';
            preAppStates[allTemplates[1]].name = 'Splash Powerups';
            preAppStates[allTemplates[2]].name = 'Splash Maps';
            preAppStates[allTemplates[3]].name = 'Splash Hiw';
            preAppStates[allTemplates[4]].name = 'Splash Account';
            preAppStates[allTemplates[5]].name = 'Splash Demographics';
            preAppStates[allTemplates[6]].name = 'Splash Courses';
            preAppStates[allTemplates[7]].name = 'Splash Access';
            preAppStates[allTemplates[8]].name = 'Splash Search University';
            preAppStates[allTemplates[9]].name = 'Splash Sidebar';
            for (var i = 0; i < allTemplates.length; i++) {
                var template = preAppStates[allTemplates[i]];
                $scope.imports.stages.push(initNewStage(template.name, template.html, ''));
            }
            // $scope.saveStageHtml();
        }

        function processStages(stages) {
            for (var i = 0; i < stages.length; i++) {
                var indexStage = stages[i];
                indexStage.owner = 'samir';
            }
            return stages;
        }

        function importStageHtml() {

            $scope.imports = $localstorage.getObject('imports');
            if (!$scope.imports.stages) {
                $scope.imports.stages = [];
                $localstorage.setObject('imports', $scope.imports);
            }
            var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/stages.json';
            FileService.getS3JsonFile(null, animation_url, function(name, resp) { $scope.imports.stages = resp; processStages($scope.imports.stages);});
        }


        var browserPrefix;
        $timeout(function() {
            injectStyleSheet();
        })

        // $localstorage.removeObject('last_animation');
        //start core functions
        //core #1
        function importAnimationFromRawCssText(css_text, name) {
            var style = document.createElement("style");
            style.setAttribute('id', name);
            style.innerHTML = css_text;
            var newAnim;
            document.getElementsByTagName("head")[0].appendChild(style);
            for (var i = 0; i < document.styleSheets.length; i++) {
                var indexStyleSheet = document.styleSheets[i];
                if (indexStyleSheet.ownerNode && indexStyleSheet.ownerNode.id === name) {

                    var animToClone = indexStyleSheet.cssRules[0];
                    var lastSheet = document.styleSheets[document.styleSheets.length - 1];
                    var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + animToClone.name + " { } ");
                    var newAnim = lastSheet.cssRules[indexOfRuleInSheet];
                    var cssRulesToClone = animToClone.cssRules;
                    for (var j = 0;j < cssRulesToClone.length; j++) {
                        var indexKeyFrame = cssRulesToClone.item(j);
                        newAnim.appendRule(indexKeyFrame.cssText, j);
                    }
                }
            }
            if (name) {
                newAnim.name = name;
            }
            return newAnim;
        }

        //core 2
        function importAndProcessAnimationCSSTextByKF(css_text, name, cb, is_active) {
            var jsAnimCssObj = importAnimationFromRawCssText(css_text, name);
            var uguruAnimObj = initAnimationFromAnimObj(jsAnimCssObj, {name: jsAnimCssObj.name, active:is_active || false});

            var all_properties = Object.keys(uguruAnimObj);
            var transformPropertyVariants = ['transform', 'WebkitTransform', 'MozTransform',  'msTransform' , 'OTransform'];
            var mod_arr = [];
            var multiKFStyle = {};
            // console.log('\n\n\n\n\nKeyframes before\n-----\n\n', css_text);
            for (var i = 0; i < all_properties.length; i++) {
                var propertyKey = all_properties[i];
                // console.log(css_text);
                for (var j = 0; j < uguruAnimObj.obj.cssRules.length; j++) {
                    var indexRule = uguruAnimObj.obj.cssRules.item(j);
                    var keyText = indexRule.keyText;
                    var cssText = indexRule.cssText;
                    var processedCSSText = "";
                    multiKFStyle[keyText] = indexRule.style;
                    //case: keytext
                    console.log(multiKFStyle);
                    for (var i = 0; i < indexRule.style.length; i++)  {
                        var indexStyleProperty = indexRule.style.item(i);
                        var dMatrix;
                        if (transformPropertyVariants.indexOf(indexStyleProperty) > -1) {

                            var transformString = indexRule.style[indexStyleProperty];

                            var matrixTransform = transformString;
                                if (matrixTransform === 'matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)') {
                                    continue;
                                }
                                matrixTransform = replaceAll(matrixTransform, '%', 'px');

                            // if (indexStyleProperty.indexOf('matrix') > -1) {
                                var m = new WebKitCSSMatrix(replaceAll(matrixTransform, '%', 'px'));
                                matrixTransform = "matrix3d(" + [m.m11, m.m12, m.m13, m.m14, m.m21, m.m22, m.m23, m.m24, m.m31, m.m32, m.m33, m.m34, m.m41, m.m42, m.m43, m.m44].join(", ") + ")";
                                dMatrix = dynamics.initMatrixFromTransform(matrixTransform);
                                var perspective = null;
                                if (m.m34 && m.m34 !== 1) {
                                    perspective = Math.abs(parseFloat(1/m.m34, 5) * -1) + 'px';
                                }
                                console.log('toparse:' + matrixTransform, m.m34, perspective, dMatrix);
                                var decomposedCSSText = getDMatrixString(dMatrix, transformString, perspective);

                            // } else {
                            //  var decomposedCSSText = matrixTransform;
                            // }


                            if (decomposedCSSText) {
                                processedCSSText += decomposedCSSText;
                            }
                            console.log(indexStyleProperty, indexRule.style[indexStyleProperty], decomposedCSSText);
                        } else {
                            processedCSSText += (indexStyleProperty + ":" + indexRule.style[indexStyleProperty] + ";");
                        }
                    }

                    console.log('pushing', keyText, processedCSSText, dMatrix);
                    mod_arr.push({key: keyText, css: processedCSSText, d_matrix: dMatrix});
                    uguruAnimObj.obj.deleteRule(keyText);
                }
            }
            mod_arr.sort(function(val_a, val_b) {
                if (val_a.key.split('%,').length > 1) {
                    return 1000
                }
                val_a_int = parseInt(val_a.key.replace('%', ''))
                val_b_int = parseInt(val_b.key.replace('%', ''))
                return val_b_int - val_a_int;
            }).reverse();
            console.log('precleanup', uguruAnimObj);
            for (var i = 0; i < mod_arr.length; i++) {
                console.log('appending...', mod_arr[i].key, mod_arr[i].css);
                uguruAnimObj.obj.appendRule(mod_arr[i].key + " {" + mod_arr[i].css + " }", i);
            }
            console.log(uguruAnimObj.obj.cssText);
            var styleKeys = Object.keys(multiKFStyle);

            //replace all previous style keys with updated transform value

            // for (var i = 0; i < styleKeys.length; i++) {
            //  var styleKeyPercent = styleKeys[i];
            //  var styleKeyValue = multiKFStyle[styleKeyPercent];

            // }

            var originalMultiKFTextsToRemove = [];
            for (var i = 0; i < styleKeys.length; i++) {
                var indexKFStyle = styleKeys[i];
                var indexKFValue = multiKFStyle[indexKFStyle];
                var numPercentages = indexKFStyle.split('%,');
                console.log(numPercentages, indexKFStyle);
                if (numPercentages.length> 1) {
                    var parsedPercentages = indexKFStyle.split(',');
                    for (var j = 0; j < parsedPercentages.length; j++) {
                        var indexPercent = parsedPercentages[j].trim();
                        console.log(indexPercent);
                        var intOfIndexPercent = parseInt(indexPercent.replace('%', ''));
                        var kfIndex = findKFByPercentage(uguruAnimObj.obj.cssRules, intOfIndexPercent);
                        var kf = uguruAnimObj.obj.cssRules.item(kfIndex);
                        console.log('cssRules #', kfIndex, kf, intOfIndexPercent);
                        if (kf) {
                            var resultAddOnCSS = "";
                            for (var k = 0; k < kf.style.length; k++) {
                                var indexStyle = kf.style[k];
                                var indexValue = kf.style[indexStyle];
                                resultAddOnCSS += indexStyle + ":" +  indexValue + '; ';
                                if (indexStyle.indexOf('animation') > -1) {
                                    console.log(browserPrefix)
                                    resultAddOnCSS += ('-' +browserPrefix + '-' + indexStyle + ":" +  indexValue + '; ');
                                }
                            }

                            for (var k = 0; k < indexKFValue.length; k++) {
                                var indexStyle = indexKFValue[k];
                                var indexValue = indexKFValue[indexStyle];
                                if (indexStyle.indexOf('transform') > -1) {
                                    for (var l = 0; l < uguruAnimObj.obj.cssRules.length; l++) {
                                        var indexRule = uguruAnimObj.obj.cssRules.item(l);
                                        if (indexRule.keyText.indexOf(indexPercent) > -1) {
                                            if (indexRule.style['transform'] !== indexValue)  {
                                                indexValue = indexRule.style['transform'];
                                            }
                                        }
                                    }
                                }
                                resultAddOnCSS += indexStyle + ":" +  indexValue + '; ';
                                if (indexStyle.indexOf('animation') > -1) {
                                    resultAddOnCSS += ('-' +browserPrefix + '-' + indexStyle + ":" +  indexValue + '; ');
                                }
                            }
                            uguruAnimObj.obj.deleteRule(indexPercent);
                            uguruAnimObj.obj.appendRule(indexPercent + " { " + resultAddOnCSS  + " }"  ,kfIndex);
                            var originalKF = uguruAnimObj.obj.cssRules.item(i);
                            var originalKFKeyText = originalKF.keyText;
                            if (originalKFKeyText.split(',').length >= 2) {
                                originalMultiKFTextsToRemove.push(originalKFKeyText);
                            }
                        } else {
                            console.log('error!');
                        }
                    }
                }

            }
            console.log('multi-kfs to remove', originalMultiKFTextsToRemove, uguruAnimObj.obj.cssText)


            for (var i = 0; i < originalMultiKFTextsToRemove.length; i++) {
                var kfTextToRemove = originalMultiKFTextsToRemove[i];
                uguruAnimObj.obj.deleteRule(kfTextToRemove);
                delete uguruAnimObj.properties[kfTextToRemove];
            }
            console.log('should be removed', originalMultiKFTextsToRemove);

            function findKFByPercentage(css_rules, percent_val) {
                var percentValStr = percent_val + '%';
                for (var i = 0; i < css_rules.length; i++) {
                    var indexCSSRule = css_rules.item(i);
                    if (indexCSSRule && indexCSSRule.keyText === percentValStr) {
                        return i;
                    }
                }
            }

            uguruAnimObj.obj = cleanupAnimation(uguruAnimObj);

            refreshTransformPropertyObjFromAnim(uguruAnimObj);
            // console.log('\n\n\n\n\nKeyframes after\n-----\n\n', uguruAnimObj.obj.cssText);
            cb && cb(uguruAnimObj);
            var percentageKeys = Object.keys(uguruAnimObj.properties);
            percentageKeys.sort(function(val_a, val_b) {

                val_a_int = parseInt(val_a.replace('%', ''))
                val_b_int = parseInt(val_b.replace('%', ''))
                return val_b_int - val_a_int;

            }).reverse();
            console.log('percentage keys', percentageKeys);
            uguruAnimObj.selected_percent = percentageKeys[0];
            uguruAnimObj.selected_keyframe = uguruAnimObj.properties[uguruAnimObj.selected_percent]
            uguruAnimObj.selected_kf_index = 0;
            uguruAnimObj.flex_selected_index = 0;
            uguruAnimObj.selected_index = 0;
            uguruAnimObj.kf_count = percentageKeys.length;

            // , selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: properties, kf_count: num_keyframes, attr:attr}
            console.log(uguruAnimObj);
            return uguruAnimObj;

        }
        $localstorage.removeObject('last_animation');

        function refreshTransformPropertyObjFromAnim(anim) {
            console.log(anim.properties)
            anim.properties = {}
            for (var i = 0; i < anim.obj.cssRules.length; i++) {
                var indexKFRule = anim.obj.cssRules.item(i);
                var keyText = indexKFRule.keyText;
                var transformKFObj = initTransformObjFromKF(indexKFRule);
                console.log(transformKFObj, indexKFRule);
                anim.properties[keyText] = transformKFObj;
            }
        }

        function replaceAll(str, find, replace) {
          return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

          function escapeRegExp(str) {
                return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
          }

        }

        function processAllTransformValues(transform_str) {
            transform_str = replaceAll(transform_str, ', ', ',').split(' ');
            return transform_str;
        }

        function initTransformObjFromKF(kf) {
            var transformObj = new transformPropertiesObj();
            for (var i = 0; i < kf.style.length; i++) {
                var indexStyle = kf.style[i];
                var indexValue = kf.style[indexStyle];
                if (indexStyle.indexOf('transform') > -1 && indexStyle.indexOf('transform-origin') === -1) {

                    var separateTransformValues = processAllTransformValues(indexValue);

                    for (var j = 0; j < separateTransformValues.length; j++) {
                        var indexTransformPropSplit = separateTransformValues[j].replace(')', '').split('(');
                        var transformPropertyName = indexTransformPropSplit[0];
                        var transformPropertyValue = indexTransformPropSplit[1];
                        if (!(transformPropertyName in transformObj)) {
                            var mappedIndexStyle = transformObj.propertyMappings[transformPropertyName];
                            console.log(mappedIndexStyle, transformPropertyValue);
                            transformObj[mappedIndexStyle] = transformPropertyValue.replace('%', '').replace('rad', '');
                            console.log('checking for', transformPropertyName, mappedIndexStyle);
                            if (['skewX', 'skewY', 'rotateX', 'rotateY', 'rotateZ'].indexOf(mappedIndexStyle) > -1) {
                                transformObj[mappedIndexStyle + 'deg'] = $scope.rad2degree(parseFloat(transformPropertyValue.replace('%', '').replace('rad', '')));
                            }
                            transformObj['modified'][mappedIndexStyle] = transformPropertyValue.replace('%', '').replace('rad', '');
                            if (!mappedIndexStyle) {
                                console.log('could not find', transformPropertyName, 'in transform obj');
                            }
                        } else {
                            console.log('checking for', transformPropertyName);
                            if (['skewX', 'skewY', 'rotateX', 'rotateY', 'rotateZ'].indexOf(transformPropertyName) > -1) {
                                transformObj[transformPropertyName + 'deg'] = parseInt($scope.rad2degree(parseFloat(transformPropertyValue.replace('%', '').replace('rad', ''))));
                            }
                            transformObj[transformPropertyName] = transformPropertyValue.replace('%', '').replace('rad', '');
                            transformObj['modified'][transformPropertyName] = transformPropertyValue.replace('%', '').replace('rad', '');
                        }
                    }
                } else {
                    if (!(indexStyle in transformObj)) {
                        var mappedIndexStyle = transformObj.propertyMappings[indexStyle];
                        transformObj[mappedIndexStyle] = indexValue;
                        transformObj['modified'][mappedIndexStyle] = indexValue;
                        if (!mappedIndexStyle) {
                            console.log('could not find', indexStyle, 'in transform obj');
                        }
                    } else {
                        transformObj[transformPropertyName] = transformPropertyValue;
                        transformObj['modified'][transformPropertyName] = transformPropertyValue;
                    }
                }
            }
            // console.log(transformObj);
            return transformObj;
        }

        function matrix3DKeyframesToDecomposedKF(css_text, name, cb) {
            var jsAnimCssObj = importAnimationFromRawCssText(css_text, name);
            var uguruAnimObj = initAnimationFromAnimObj(jsAnimCssObj, {name: jsAnimCssObj.name});
            // var decomposedUguruAnimObj =
            var decomposedUguruAnimObj = decomposeMatrix3DKeyFrameArr(uguruAnimObj);
            cb && cb(decomposedUguruAnimObj);
            return uguruAnimObj;


            function decomposeMatrix3DKeyFrameArr(uguru_anim_obj) {
                var all_properties = Object.keys(uguru_anim_obj);
                var mod_arr = [];
                for (var i = 0; i < all_properties.length; i++) {
                    var propertyKey = all_properties[i];
                    for (var j = 0; j < uguru_anim_obj.obj.cssRules.length; j++) {
                        var indexRule = uguru_anim_obj.obj.cssRules.item(j);
                        var keyText = indexRule.keyText;
                        if (indexRule.keyText === propertyKey) {
                            var matrixTransform = indexRule.style.transform || indexRule.style.WebkitTransform || indexRule.style.MozTransform || indexRule.style.msTransform || indexRule.style.OTransform;
                            if (matrixTransform) {
                                dMatrix = dynamics.initMatrixFromTransform(matrixTransform);
                                var decomposedCSSText = getDMatrixString(dMatrix);
                                uguru_anim_obj.obj.deleteRule(keyText);
                                mod_arr.push({key: keyText, css: decomposedCSSText});
                            }
                        }
                    }
                }
                for (var i = 0; i < mod_arr.length; i++) {
                    uguru_anim_obj.obj.appendRule(mod_arr[i].key + " {" + mod_arr[i].css + " }", 0);
                }
                return uguru_anim_obj;
            }

        }


        $scope.asideTabIndex = 2;
        $scope.importLayoutIndex = 3;
        $scope.showChildrenOfParentElemOnClick = function() {
            $scope.stage.selectComponentMode = true;
            var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
            allChildActorElems = $scope.actor.querySelectorAll('*');
            $scope.stage.components = [];
            for (var i = 0; i < allChildActorElems.length; i++) {
                $scope.stage.components.push({selector: '[draggable-clone-' + i + ']'});
            }
            $timeout(function() {
                var allContainers = document.querySelectorAll('.cloned-animatable-elem-container')
                for (var i = 0; i < allChildActorElems.length; i++) {
                    var indexElem = allChildActorElems[i];
                    var clonedNode = indexElem.cloneNode(true);
                    // clonedNode.setAttribute('draggable-clone', null);
                    // clonedNode.setAttribute('draggable-clone-' + i, null);
                    var indexContainer = allContainers[i];
                    $scope.stage.components[i].type = indexElem.nodeName;
                    $scope.stage.components[i].orig_elem = indexElem;
                    $scope.stage.components[i]._class = indexElem.getAttribute('class');
                    if (allShapes.indexOf(clonedNode.nodeName) > - 1) {
                        var parentSVG = findParentSVG(indexElem);
                        var clonedParentSVG = parentSVG.cloneNode(true);
                        clonedParentSVG.innerHTML = "";
                        clonedParentSVG.style.minWidth = '100px';
                        clonedParentSVG.style.minHeight = '100px';
                        clonedParentSVG.className += " absolute flex-wrap-center full-xy"
                        clonedParentSVG.appendChild(clonedNode);
                        indexContainer.appendChild(clonedParentSVG);
                        secondClonedParent = clonedParentSVG.cloneNode(true);
                        indexContainer.appendChild(secondClonedParent);
                    } else {
                        clonedNode.style.minWidth = '100px';
                        clonedNode.style.minHeight = '100px';
                        clonedNode.className += " absolute flex-wrap-center full-xy"
                        indexContainer.appendChild(clonedNode);
                        secondClonedNode = clonedNode.cloneNode(true);
                        indexContainer.appendChild(secondClonedNode);

                    }
                }
            }, 100)

            $timeout(function() {
                $scope.$apply();
            })
        }

        function findParentSVG(elem) {
            return (elem.nodeName === 'svg' && elem) || findParentSVG(elem.parentNode);
        }

        $scope.asideTabIndexwatcher = $scope.$watch('asideTabIndex', function(new_val, old_val) {
            switch (new_val) {

            case 2:
              //init map
                updateStageElemCloneAside();
                renderAsideAnimatableElems();


         }
        });

        function renderAsideAnimatableElems() {
            if (!$scope.stage) {
                return;
            }
            if (!$scope.stage.anim_elements) {
                $scope.stage.anim_elements = [];
            }
            var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
            var allAnimElemItemContainers = document.querySelectorAll('.aside-anim-element-item');
            for (var i = 0; i < $scope.stage.anim_elements.length; i++) {
                var indexAnimElem = $scope.stage.anim_elements[i];
                if(indexAnimElem.selector) {
                    console.log('searching for...', indexAnimElem.selector);
                    var stageContainer = document.querySelector('#stage-container');
                    var dragAttribute = indexAnimElem.selector.replace('[', '').replace('', ']') + "";
                    var elem = stageContainer.querySelector(indexAnimElem.selector)
                    if (elem) {
                        var clonedElem = elem.cloneNode(true);
                        clonedElem.removeAttribute('draggable');
                        clonedElem.removeAttribute(dragAttribute);
                        clonedElem.style.maxHeight = "50px;"
                        clonedElem.style.maxWidth = "50px;"
                        clonedElem.style.minHeight = "50px;"
                        clonedElem.style.minWidth = "50px;"
                        clonedElem.className += ""
                        allAnimElemItemContainers[i].innerHTML = "";
                        if (allShapes.indexOf(clonedElem.nodeName) > -1) {
                            var parentSVG = findParentSVG(elem);
                            var clonedParentSVG = parentSVG.cloneNode(true);
                            clonedParentSVG.innerHTML = "";
                            clonedParentSVG.appendChild(clonedElem);
                            allAnimElemItemContainers[i].appendChild(clonedParentSVG);
                        } else {
                            allAnimElemItemContainers[i].appendChild(clonedElem);
                        }





                    }
                }

            }
        }



        $scope.importFromCSSText = function(css_text, name, class_text, options) {

            options = options || {active:false};
            if (!$scope.animations || !$scope.animations.length) {
                options.active = false;
            }
            if (!options.callback) {
                options.callback = null;
            }
            // var css_text = "@keyframes animation { 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); } 2.92% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); } 3.37% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); } 3.47% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); } 4.58% { -webkit-transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); } 5.69% { -webkit-transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); } 5.76% { -webkit-transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); } 7.41% { -webkit-transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); } 7.51% { -webkit-transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); } 7.88% { -webkit-transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); } 8.68% { -webkit-transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); } 10.03% { -webkit-transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); } 10.85% { -webkit-transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); } 11.53% { -webkit-transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); } 12.22% { -webkit-transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); } 14.18% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); } 14.37% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); } 19.23% { -webkit-transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); } 20.01% { -webkit-transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); } 23.05% { -webkit-transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); } 25.75% { -webkit-transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); } 26.94% { -webkit-transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); } 31.58% { -webkit-transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); } 31.73% { -webkit-transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); } 37.32% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); } 38.15% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); } 42.35% { -webkit-transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); } 48.9% { -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); } 57.77% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 60.47% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 69.36% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 83.61% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } ";
            // var js_anim_obj = importAnimationFromRawCssText(css_text, name);

            // var final_obj = initAnimationFromAnimObj(js_anim_obj);
            $scope.kf_visuals.cache = $scope.kf_visuals.show;
            $scope.kf_visuals.show = false;
            var originAnimCSSText = css_text;
            $scope.animationDropdown.options[0] = name;
            $scope.showStatusMsgForXSec('Importing ' + name + ' ....', 2500);
            $scope.animation = importAndProcessAnimationCSSTextByKF(css_text, name, options.callback, options.active);
            if ($scope.animation.attr.name.indexOf('-edit') === -1 || $scope.animation.obj.name.indexOf('-edit') > -1)   {
                $scope.animation.attr.name += '-edit';
                $scope.animation.obj.name += '-edit';
            }

            $scope.animationDict.importClassText = class_text;
            $scope.animationDict.importTextarea = css_text;
            $scope.animationDict.importInput = $scope.animation.attr.name;
            $scope.animation.attr.kf_intervals = 100;




            var kfIntervalInput = document.querySelector('#kt-intervals-input');
            $timeout(function() {
                kfIntervalInput && kfIntervalInput.classList.remove('animated', 'wobble');
            }, 1000)
            kfIntervalInput && kfIntervalInput.classList.add('animated', 'wobble');
            if (!options.skip_local) {
                $localstorage.setObject('last_animation',$scope.animation);
            }
            // $scope.layout.index = 0;
            $scope.animation.obj.origCSSText = originAnimCSSText;
            $timeout(function(){
                if ($scope.kf_visuals.cache) {
                    $scope.kf_visuals.onChange($scope.kf_visuals.cache);
                }
                $scope.kf_visuals.show = $scope.kf_visuals.cache;
                $scope.kf_visuals.cache = null;
                $scope.$apply();
            }, 100)
            return $scope.animation;
        }


         function tadaToolElement(selector) {
            var focusedElement = document.querySelector(selector);
            focusedElement.classList.add('animated', 'tada');
            $timeout(function() {
                focusedElement.classList.add('animated', 'tada');
            }, 1000)
        }


    }

]);
