angular
.module('sharedServices')
.factory("DevToolService", [
  '$state',
  '$timeout',
  '$localstorage',
  'Restangular',
  DevToolService
  ]);

function DevToolService($state, $timeout, $localstorage, Restangular) {

    return {
        getBuildToolModes: getBuildToolModes,
        setupUserSession: setupUserSession,
        initCurrentFile: initCurrentFile,
        getFileMethods: getFileMethods
    }

    function setupUserSession() {return;};

    function initCurrentFile(_scope, file, skip_first_time)  {

        var returnIndex = getLatestVariationIndex(file)
        _scope.current_file.selected_variation = file.variations[returnIndex];
        _scope.current_file.variations = file.variations;
        _scope.current_file.ref = file.ref;
        _scope.current_file.name = file.name;
        _scope.current_file.full_template_url = file.full_template_url;
        _scope.current_file.controller = file.controller;
        _scope.current_file.id = file.id;
        _scope.current_file.selectedVariationIndex = returnIndex;
        _scope.current_file.selected_variation.selectedSceneIndex = 0;
        _scope.current_file.selected_variation.selected_scene_state = _scope.current_file.selected_variation.scene_states[_scope.current_file.selected_variation.selectedSceneIndex];
        _scope.current_file.template_url = file.template_url;
        _scope.current_file.methods = getFileMethods(_scope)


        if (!_scope.current_file.selected_variation.last_updated) {
            _scope.current_file.selected_variation.last_updated = new Date().getTime();
        }

        if (!skip_first_time) {
            _scope.page.dropdowns.templates = {
            options: formatVariationsWithLastUpdated(_scope.current_file.variations),
            key: 'name',
            size: 'small',
            selectedIndex: returnIndex,
            label: formatLastUpdated(_scope.current_file.selected_variation.last_updated)
            }
            _scope.injectTemplateIntoStage(_scope.current_file.template_url.replace('templates/', ''), _scope.current_file.controller, _scope.current_file.ref);
        }
        return _scope.current_file;
    }

    function formatVariationsWithLastUpdated(variation_arr) {
        var resultArr =[];
        for (var i = 0; i < variation_arr.length; i++) {
            var indexVariation = variation_arr[i];
            resultArr.push({
                name: indexVariation.name + '<br/>' + formatLastUpdated(indexVariation.last_updated)
            })
        }
        return resultArr;
    }

    function formatLastUpdated(utc_ms) {
        var date = new Date(utc_ms);

        return "<span><span class='opacity-50'>updated:&nbsp;</span>" + (date.getMonth() + 1) + "/" + date.getUTCDate() + " @ " + date.getUTCHours() % 12 + ":" + date.getUTCMinutes(); + "</span>"
    }

    function getLatestVariationIndex(file) {
        var latestFileEdit = 0;
        var returnIndex = 0;
        for (var i = 0; i < file.variations.length; i++) {
            var indexVariation = file.variations[i];
            if (indexVariation.last_updated > latestFileEdit) {
                latestFileEdit = indexVariation.last_updated;
                returnIndex = i;
            }
        }
        return returnIndex;
    }

    function forkVariation(_scope) {
        return function (file)
        {


            _scope.status.show = true;
            _scope.status.msg = "Forking..."

            _scope.current_file.selected_variation.last_updated = (new Date()).getTime();
            var clonedVariation = cloneDictionary(_scope.current_file.selected_variation);
            clonedVariation.cloned_from = _scope.current_file.selected_variation.ref;
            clonedVariation.ref = file.ref + '-' + (_scope.current_file.variations.length + 1);
            clonedVariation.name = null;

            $timeout(function() {
                _scope.current_file.selectedVariationIndex = _scope.current_file.variations.length; //only because offset = 1
                _scope.current_file.selected_variation = clonedVariation;
                _scope.current_file.variations.push(clonedVariation);

                _scope.status.msg = "Please add a name";
                _scope.page.dropdowns.templates.options = _scope.current_file.variations;
                _scope.page.dropdowns.templates.selectedIndex = _scope.current_file.selectedVariationIndex;
                $timeout(function() {
                    _scope.status.show = false;

                }, 2000)
            }, 2000)


        }
    }

    function cloneDictionary(_dict) {
        var newDict = {};
        for (var i = 0; i < Object.keys(_dict).length; i++) {
            indexKey = Object.keys(_dict)[i]
            newDict[indexKey] = _dict[indexKey]
        }
        return newDict;
    }

    function getFileMethods(_scope) {
        return {
            variation: {
                fork: forkVariation(_scope),
                archive: archiveVariation(_scope),
                promote: promoteVariation(_scope),
                editName: editVariationName(_scope),
                cancelName: cancelEditName(_scope)
            },
            save: saveFileWithServer(_scope)

        }
    }

    function editVariationName(_scope) {
        return function(file) {
            file.selected_variation.edit_mode = true;
            file.selected_variation.name_cache = file.selected_variation.name;
        }
    }

    function cancelEditName(_scope) {
        return function(file) {
            console.log('canceling edit name');
            file.selected_variation.name = file.selected_variation.name_cache;
            file.selected_variation.name_cache = null;
            file.selected_variation.edit_mode = false;
        }
    }

    function saveFileWithServer(_scope) {
        return function(file, user) {
            var tempSelected
            var user_first_name = _scope.user.name.split(' ')[0].toLowerCase();
            var temp_current_file = cloneDictionary(file);
            var tempSelected = {};
            var tempSelectedVariation = null;
            _scope.showStatusMsg(["Syncing " + user_first_name + "'s remote folder"]);
            if (file.selectedVariationIndex > -1) {
                file.variations[file.selectedVariationIndex] = cloneDictionary(file.selected_variation);
                tempSelected = {variation: file.selected_variation};
                file.selected_variation = null
                tempSelectedVariation = file.variations[file.selectedVariationIndex];
                console.log('old selected variation', tempSelectedVariation);
            }

            if (tempSelectedVariation.selected_time_state && tempSelectedVariation.selectedTimeIndex > -1 && tempSelectedVariation.selectedSceneIndex > -1) {
                var currentTimeStates = tempSelectedVariation.scene_states[tempSelectedVariation.selectedSceneIndex].time_states
                if (currentTimeStates && currentTimeStates.length && tempSelectedVariation.selectedTimeIndex > -1) {
                    currentTimeStates[tempSelectedVariation.selectedTimeIndex] = cloneDictionary(tempSelectedVariation.selected_time_state);
                }
                tempSelected.time_state = cloneDictionary(tempSelectedVariation.selected_time_state);
                tempSelectedVariation.selected_time_state = null;
                tempSelectedVariation.selectedTimeIndex = null;
            }

            if (tempSelectedVariation.selected_scene_state || tempSelectedVariation.selectedSceneIndex > -1) {
                tempSelectedVariation.scene_states[tempSelectedVariation.selectedSceneIndex] = cloneDictionary(tempSelectedVariation.selected_scene_state);

                tempSelected.scene_state = cloneDictionary(tempSelectedVariation.selected_scene_state);
                tempSelectedVariation.selected_scene_state = null;
                tempSelectedVariation.selectedSceneIndex = null;
            }

            _scope.current_file.methods = null;
            _scope.current_file = temp_current_file;
            $timeout(function() {
                _scope.current_file.selected_variation.selected_scene_state = tempSelected.scene_state;
                _scope.current_file.selected_variation.selected_time_state = tempSelected.time_state;
                _scope.$apply();
                console.log(_scope.current_file);
            })
            Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('files').
            customPOST(JSON.stringify({file: file})).then(
                function (response) {

                    var current_file = initCurrentFile(_scope, JSON.parse(response), true);
                    $timeout(function() {
                        _scope.current_file.selected_variation.selected_scene_state = tempSelected.scene_state;
                        _scope.current_file.selected_variation.selected_time_state = tempSelected.time_state;
                        _scope.$apply();
                        console.log(_scope.current_file);
                    })

                },
                function(error) {
                    console.log('error', error);
                }

            )
        }
    }

    function receiveFileFromServe(_scope) {
        return
    }

    function archiveVariation(_scope) {
        return function(file) {
            _scope.showStatusMsg(["Archiving..."]);
            // console.log(file, variation_index);
        }
    }

    function promoteVariation(_scope) {
        return function(file) {
            for (var i = 0; i < file.variations.length; i++) {
                var variationIndex = file.variations[i];
                variationIndex.master = false;
            }
            _scope.showStatusMsg(["Promoting......"]);
        }
    }

    function clearSceneState(_scope) {
        return function(variation) {
            variation.selected_scene_state = null;
            variation.selectedSceneIndex = null;
            variation.selected_time_state = null;
            variation.selectedTimeIndex = null;
        }
    }

    function clearTimeState(_scope) {
        return function(variation) {
            variation.selected_time_state = null;
            variation.selectedTimeIndex = null;
        }
    }

    function getBuildToolModes(_scope) {
        var modeFuncDict = {
            scene: {
                switchTo: switchToScene(_scope),
                play: playScene(_scope),
                playAll: playAllScenes,
                initKeys: initSceneKeys,
                destroyKeys: destroySceneKeys,
                forwardTo: forwardToScene,
                getComponents: getAllSceneComponents,
                clearSelectedScene: clearSceneState(_scope)
            },
            time_state: {
                init: getTimeBaseObj,
                getFocused: getFocusedTimeState(_scope),
                add: addTimeState,
                edit: editTimeState,
                remove: removeTimeState,
                focus: focusTimeState,
                initKeys: initTimeStateModeKeys,
                destroyKeys: destroyTimeStateModeKeys,
                play: playTimeState,
                forwardTo: playTimeStatesUntil,
                switchTo: switchToTimeState(_scope),
                clearTimeState: clearTimeState(_scope)
            },
            component: {
                initMode: switchToComponentMode(_scope),
                init: getComponentObj,
                add: addComponent,
                remove: removeComponent,
                focus: focusComponent,
                play: applyComponentProperties,
            },
            properties: {
                initType: initPropertyType,
                add: addProperty

            }
        };

        return modeFuncDict

        function isFunction(arg) {
            return (arg instanceof Function);
        };


    }

    function switchToComponentMode(_scope) {
        var componentModeListener;
        return function(scene_state, time_state) {
            scene_state.component_mode = true;
            componentModeListener = window.addEventListener("keydown", addEscapeListener(_scope))
            function addEscapeListener(_scope) {
                function updateScope() {
                    $timeout(function() {
                        _scope.$apply();
                    })
                }
                return function(e) {
                    evt = (e) ? e : window.event
                    if (evt.keyCode === 27) {
                        scene_state.component_mode = false;
                        window.removeEventListener("keydown", componentModeListener);
                        updateScope();
                    }

                }
            }
        }

    }

    function getFocusedTimeState(_scope) {
        return function(selected_scene) {
            for (var i = 0; i < selected_scene.time_states.length; i++) {
                var indexTimeState = selected_scene.time_states[i];
                if (indexTimeState && indexTimeState.focused) {
                    return indexTimeState;
                }
            }
        }
    }

    //mode function
    function switchToMode() {return};
    function getCurrentMode() {return};

    //scene functions
    function switchToScene(_scope) {
        return function(variation, index) {
            for (var i = 0; i < variation.scene_states.length; i++) {
                variation.scene_states[i].active = false;
                variation.scene_states[i].component_mode = false;
            }
            variation.selected_scene_state = variation.scene_states[index];
            variation.selectedSceneIndex = index;
            variation.selected_scene_state.active = true;
        }
    };


    function switchToTimeState(_scope) {
        return function(variation, index) {
            variation.selected_time_state = variation.selected_scene_state.time_states[index];
            variation.selectedTimeIndex = index;
        }
    }

    function playScene(_scope) {
        return function(scene) {
            if (!scene.components || !scene.components.length) {
                _scope.showStatusMsg(['Please add components & properties first']);
            }
        }
    };
    function playAllScenes() {return};
    function initSceneKeys() {return};
    function destroySceneKeys() {return};
    function forwardToScene() {return};
    function getAllSceneComponents() {return};

    //time_state functions
    function getTimeBaseObj(scene_state) {
        return {time: null, components: [], is_focused: true};
    }
    function addTimeState() {return;}
    function editTimeState() {return;}
    function removeTimeState() {return;}
    function focusTimeState() {return;}
    function initTimeStateModeKeys() {return;}
    function destroyTimeStateModeKeys() {return;}
    function playTimeState() {return};
    function playTimeStatesUntil() {return};

    function getComponentObj() {return;}
    function addComponent() {return;}
    function removeComponent() {return;}
    function focusComponent() {return;}
    function applyComponentProperties() {return;}

    function initPropertyType() {return;}
    function addProperty() {return;}


    // function addTimeState() {return};
    // function getComponents () {return;}
    // function editTimeState () {return;}
    // function removeTimeState () {return;}
    // function sortTimeStates () {return;}
    // function enterTimeStateShortcut () {return;}
    // function exitTimeStateMode () {return;}
    // function saveTimeStateLocal () {return;}
    // function saveTimeStateRemote () {return;}
    // function playOneTimeState () {return;}
    // function getAllTimeStateComponents () {return;}



}