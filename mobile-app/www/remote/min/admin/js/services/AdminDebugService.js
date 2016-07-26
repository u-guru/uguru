angular
.module('uguru.admin')
.factory("AdminDebugService", [
  '$state',
  '$timeout',
  '$localstorage',
  'RootService',
  'UtilitiesService',
  '$compile',
  'AnimToolService',
  AdminDebugService
  ]);

function AdminDebugService($state, $timeout, $localstorage, RootService, UtilitiesService, $compile, AnimToolService) {
    var debug_options = ['highlight', 'pause-at', 'autoplay', 'show'];
    var debug_elem_options = ['trigger', 'inspect', 'select'];
    var debug_global_css_options = ['duration'];
    var settingsDict = {}

    return {
        applyHighlight: applyHighlight,
        getAllDebugElems: getAllDebugElems,
        getParentScope: getParentScope,
        playState: playState,
        playAllStates: playAllStates,
        processOptions: processOptions,
        initAnimToolPlayer: initAnimToolPlayer,
        getAllOptions: getAllOptions,
        getAllCustomStates: getAllCustomStates,
        getTestStateObj: getTestStateObj
    }

    //@jason
    function getTestStateObj(test_id, state_obj) {
        console.log(test_id, state_obj);
        var testStateObj;
        //place your stuff here

        // 1. get test_obj
        // --- if you can get it immediately, return it
        // --- if you cant .. call this callback

        $timeout(function() {
            state_obj.testObj = yourFunctionThatWillReturnTestObjWithID(test_id, state_obj)
        })

        function yourFunctionThatWillReturnTestObjWithID(test_id, state_obj) {
            var testObj;
            //add code here
            return testObj;
        }
        // 2. set state_obj



        return testStateObj;
    }

    function getAllCustomStates(elem) {

    }

    function initAnimToolPlayer(scope, elem) {
        AnimToolService.setStage(scope.stage);
        console.log('setting stage', scope.stage)
        scope.stage.recorder = AnimToolService.initRecorder(scope.stage, scope);
        console.log('recorder initialized', scope.stage.recorder)
        scope.stage.player = AnimToolService.initPlayer(scope.stage);
        scope.stage.recorder.start(scope.stage.recorder);
        console.log('starting..')

        scope.stage = {parentElem: element.parentNode, active: false, toggle: toggleAnimToolPlayer};

        function toggleAnimToolPlayer() {
            var newValue = !scope.parent.stage.active;
            //being hidden
            if (!newValue) {
                document.querySelector('#admin-anim-tools');
                animRecorderContainer.classList.remove('slideInDown');
                $timeout(function() {
                    animRecorderContainer.classList.add('fadeOutUp');
                })
                $timeout(function() {
                    scope.parent.stage.active = newValue;
                }, 1250)
            } else {
                scope.parent.stage.active = newValue;
                $timeout(function() {
                    scope.$apply();
                });
            }
        }
    }

    function getAllOptions() {
        return debug_options
    }

    function processOptions(attr) {
        return {
            readOnly: {
                highlight: 'highlight'in attr,
                showToolbar: 'hide' in attr,
                speed: ('speed' in attr && attr['speed']) || '1x',
                autoplay: 'autoplay' in attr,
                delayBetweenState: ('delayBtwn' in attr && parseInt(attr['delayBtwn'])) || 0,
                autorecord: 'autorecord' in attr,
                pauseAt:'pauseAt' in attr && parseInt(attr['pauseAt']) || 'TBA'
            },
            toggles: {settings: false, play: false, record: false}
        }
    }

    function playState (state, scope, delay) {
        delay = delay || 0;
        options = scope.debug.options;


        var supportedTriggers = ['click', 'hover', 'mouseover', 'mouseleave', 'mouseenter'];
        var specialTriggers = ['hover', 'mouseover', 'mouseenter', 'mouseleave']
        $timeout(function() {
            if ('trigger' in state && supportedTriggers.indexOf(state.trigger) > -1) {
                var elemToTrigger = state.elem;
                if ('select' in state) {

                    elemToTrigger = state.elem.querySelector(state.select);
                    specialTriggerIndex = specialTriggers.indexOf(state.trigger);
                    if (specialTriggerIndex > -1) {

                        var tempNgClick = elemToTrigger.getAttribute('ng-click');
                        if (tempNgClick) {
                            var getSpecialAttr = elemToTrigger.getAttribute('ng-' + specialTriggers[specialTriggerIndex]);
                            elemToTrigger.setAttribute('ng-click',  getSpecialAttr);
                            state.trigger = 'click';
                        }


                    }
                }
                $timeout(function() {
                    angular.element(elemToTrigger).triggerHandler(state.trigger);
                    scope.$apply();
                    state.played = true;
                })
            }
            return;
        }, delay);
    }

    function playAllStates(all_states, options, scope) {
        scope.debug.options.toggles.play = !scope.debug.options.toggles.play;
        var stoppingPoint = options.readOnly.pauseAt;
        console.log(stoppingPoint);
        if (options.readOnly.speed === 'fast') {
            options.readOnly.delayBetweenState = 100;
        }
        for (var i = 0; i < all_states.length; i ++ ) {
            var indexState = all_states[i];
            var indexDelay = options.readOnly.delayBetweenState*i;
            playState(indexState, scope, indexDelay);
            if (stoppingPoint && ((i + 1) === stoppingPoint)) {
                break;
            }

        }
        return;
    }

    function applyHighlight() {

    };

    function getParentScope(elem) {
        var controllerInfo = elem.getAttribute('ng-controller');
        var controllerInfoSplit = controllerInfo.split(' as ');
        if (controllerInfoSplit.length > 1) {
            return controllerInfoSplit[controllerInfoSplit.length - 1]
        }
    }

    function getAllDebugElems(parent_elem) {
        var debugElems = parent_elem.querySelectorAll('[debug-id]');
        var resultArr =[];
        for (var i = 0; i < debugElems.length; i++) {
            var elemIndexArrStates = processDebugElem(debugElems[i]);
            if (elemIndexArrStates.length) {
                for (var j =0 ; j < elemIndexArrStates.length; j++) {
                    resultArr.push(elemIndexArrStates[j]);
                }
            }

        }

        resultArr.sort(function(state_a, state_b) {
            return state_b - state_a;
        })
        return resultArr;
    }

    function processDebugElem(elem, states) {
        var debugInfo = elem.getAttribute('debug-id');
        var elemStates = [];
        var debugStatesElem = debugInfo.split('|');
        for (var i = 0; i < debugStatesElem.length; i++) {
            var indexDebugDetails = debugStatesElem[i];
            var indexDebugDetailsSplit = debugStatesElem[i].split(':');
            if (indexDebugDetailsSplit.length > 1) {
                var debugId = parseInt(indexDebugDetailsSplit[0]);
                var indexState = getStateFromElem(debugId, elem, indexDebugDetailsSplit.splice(1).join(':'));
                if (indexState && indexState.id) {
                    elemStates.push(indexState);
                }
            }
        }
            // var state = getStateFromElem(elem, debugDetails)
        return elemStates;
    }

    function getStateFromElem(id, elem, debug_info) {
        debug_info = UtilitiesService.removeAllOccurrancesArr(debug_info, ['[', ']'])
        debugInfoSplit = debug_info.split(',');
        var supportedPropNames = debug_elem_options;
        var resultDict = {};
        for (var i = 0; i < debugInfoSplit.length; i++) {
            var indexDebugProp = debugInfoSplit[i];
            indexDebugPropSplit = indexDebugProp.split(':');
            if (indexDebugProp.length > 1) {
                var indexName = indexDebugPropSplit[0];
                var indexValue = indexDebugPropSplit[1];
                if (supportedPropNames.indexOf(indexName) > -1) {
                    resultDict['id'] = id;
                    resultDict[indexName] = indexValue;
                    resultDict.elem = elem;
                }
            }
        }

        return resultDict;
    }

}
