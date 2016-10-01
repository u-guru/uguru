angular.module('uguru.shared.services')
.factory("ElementService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'DirectiveService',
    ElementService
        ]);

function ElementService($timeout, $state, UtilitiesService, DirectiveService) {
      var rShortcuts = {special: getSpecialShortcuts()};
      var stateTypes = ['on', 'when', 'init'];
      var onStateMappings = {
        'init': 'ready'
      }
      var player;

      return {
        renderElementStates: renderElementStates,
        getShortcutDict: getShortcutDict,
        addShortcuts: addShortcuts
      }

      function addShortcuts(prefix, shortcuts, attr) {

        var shortCutArr = [];

        shortcuts.forEach(function(child, i) {

          child.nodeName !== '#text' && parseShortcut(prefix, child.attributes);
        });
      }

      function parseShortcut(prefix, attr) {
        var terms =['replace', 'with']
        var resultDict = {};
        if (! (prefix in rShortcuts)) {
          rShortcuts[prefix] = {};
        }
        resultDict = rShortcuts[prefix];

        if (!prefix || !prefix.length) prefix = 'root';

        var withIndices = [];
        for (var i = 0; i < attr.length; i++) {
          var iAttr = attr[i];

          if (iAttr.name === 'with') {
            withIndices.push(i);
            continue;
          }
          if (terms.indexOf(iAttr.name) === -1 && withIndices.length) {
            if (iAttr.value.length) {
              resultDict[attr[i-2].name] = iAttr.value;

            } else {
              resultDict[iAttr.name] = attr[i-2].name;
            }
          }
        }
      }

      function renderElementStates(element, attr) {
        var states = {}
        for (var key in attr.$attr) {
          var stateObj = renderState(element, attr.$attr[key], attr[key], key)
          if (!stateObj) continue;
          if (!(stateObj.type in states)) states[stateObj.type] = [];
          states[stateObj.type].push(stateObj);
        }
        console.log(states)
        return states
      }

      function renderState(elem, name, value, name_camel) {
        var state = {type: null, name: {camel: name_camel, dash:name}};
        state.type = detectStateType(name, name_camel);
        if (!isValidState(state.type)) return;
        var parsedArgs = getParsedArgsByType(elem, state.type, name.split('-').splice(1), value)
        state.name = parsedArgs[state.type];
        state.actions = parsedArgs.actions;
        state.exec = getStateFunc(state.type, state.name, parsedArgs.actions);
        return state;
      }

      function isValidState(type) {
        return stateTypes.indexOf(type) > -1;
      }

      function getStateFunc(type, name, actions) {


          if (type === 'init' && name == 'with') {
            return function(element) {
              applyPropsToElement(element, actions.prop);
            }
          }
          if (type === 'on') {
            return function(element, scope) {
              applyOnToElement(scope, element, name, actions);
            }
          }
          if (type === 'when') {
            return function(element, scope) {
              registerAnimationListeners(scope, element, name, actions);
            }
          }
      }



      function registerAnimationListeners(scope, element, name, actions) {
        var baseName = 'when-' + name;
        for (key in actions) {
          var listenFor = baseName;
          var scopeName = 'root.public.customStates.when.' + UtilitiesService.camelCase(listenFor);
          console.log(scopeName)
          $timeout(function() {
            scope.$watch(scopeName, function(old, _new) {
              applySendAnimProp(scope, element, actions)
            })
          })

        }
      }

      function applyOnToElement(scope, element, name, actions) {
        if (name === 'init') {
          element.ready(function(e) {
            applySendAnimProp(scope, element, actions);
          })
        } else {
          element.on(name,function(e) {
              if (actions.prop) {
                applyPropsToElement(element, actions.prop);
              };
              if (actions.send) {
                console.log('should be sending..', actions);
              }
            })
        }
      }

      function applySendAnimProp(scope, element, actions) {
        if (actions.prop) {
            applyPropsToElement(element, actions.prop);
          };
          if (actions.anim) {
            console.log('should be animating..', actions);
            applySendArgsAndCallback(element, scope, actions.anim);
          }
          if (actions.send) {
            applySendArgsAndCallback(element, scope, actions.send);
            console.log('should be sending..', actions.send);
          }
      }

      function applySendArgsAndCallback(element, scope, messages) {
        messages.split(',').forEach(function(msg, i) {
          var iMsg = msg.split(':')[0];
          var _attr = {dashed: iMsg, camel: UtilitiesService.camelCase(iMsg)};
          // DirectiveService.initCustomStateWatcher(scope, element,  'when', _attr, attr[_attr.camel]);
        })
      }

      function applyAnimArgs(element, scope) {

      }

      function applyPropsToElement(elem, properties) {

        var elemProps = properties.split(',');
        elemProps.forEach(function(kv, i) {
          var kvSplit = kv.split(':');
          elem.css(kvSplit[0], kvSplit[1]);
        })
      }

      function getParsedArgsByType(elem, state_type, state_args, arg_value) {
        var argDict = {};


        state_args = getStateArgsFromValue(state_args, arg_value);
        argDict[state_type] = configureNameFromArgs(state_type, state_args)
          var shortCutDict = getShortcutDict(elem, arg_value);

          argDict.actions = getArgActions(state_args, arg_value, shortCutDict);
        return argDict;
      }

      function configureNameFromArgs(state_type, state_args) {
        if (state_type === 'when') {
          var nameArr = [];
          state_args.forEach(function(arg, i ) {

            if (['send', 'anim', 'prop'].indexOf(arg) === -1) {
              nameArr.push(arg);
            }
          })
          state_args.splice(0, nameArr.length);
          return nameArr.join('-').replace('prop', '').replace('anim', '').replace('send', '')
        }
        return state_args.splice(0,1)[0]
      }

      function getStateArgsFromValue(state_args, arg_value) {
        UtilitiesService.replaceAll(arg_value, ' | ', '|');
        arg_value.split('|').forEach(function(param_value, i) {
          if (param_value.indexOf('s:[') > -1 || param_value.indexOf('send:[') > -1) {
            state_args.push('send');
          }
          if (param_value.indexOf('p:[') > -1 || param_value.indexOf('prop:[') > -1) {
            state_args.push('prop');
          }
          if (param_value.indexOf('a:[') > -1 || param_value.indexOf('anim:[') > -1) {
            state_args.push('anim');
          }
        })

        return state_args
      }

      function getArgActions(state_args, full_value, shortcuts) {
        var actionDict = {};
        var detectAndAddStrArgValues = detectAndAddStrArgValues(state_args);
        state_args.forEach(function(arg, i) {
          for (key in shortcuts) {
            full_value = UtilitiesService.replaceAll(full_value, key, shortcuts[key])
            full_value = UtilitiesService.replaceAll(full_value, ': ', ':');
            full_value = UtilitiesService.replaceAll(full_value, ', ', ',');
          }
          actionDict[arg] = extractRelevantValueFromArg(arg, full_value);
        })
        return actionDict

        function detectAndAddStrArgValues(state_args) {
          return [];
        }

        function extractRelevantValueFromArg(arg, full_value) {
          arg = arg.trim();
          var returnValue = full_value;
          full_value.split('|').forEach(function(value, i) {
            if (value.indexOf(arg + ':[') > -1 || value.indexOf(arg[0] + ':[') > -1) {
              returnValue = value;
              returnValue = UtilitiesService.replaceAll(returnValue, arg+':[', '');
              returnValue = UtilitiesService.replaceAll(returnValue, arg[0]+':[', '');
              returnValue = UtilitiesService.replaceAll(returnValue, ']', '');
            }
          })

          return returnValue
          // return full_value.split(arg + ':[');
        }

      }

      function detectStateType(name, camel) {
        return name.split('-')[0].toLowerCase();
      }

      function getSpecialShortcuts() {
        return {draw: drawFunc}
      }

      function drawFunc(elem, shortcut) {
        var shortcut = shortcut || "draw:100%";
        var parsedShortcut = shortcut.split('draw:')[1];
        var percentDraw = parseInt(parsedShortcut)/100;
        var isNegative = shortcut.indexOf('-') > -1;
        if (shortcut.indexOf('-1') > -1) {
          percentDraw *= isNegative
        }


        return 'stroke-dashoffset:' + (elem[0].getTotalLength() * percentDraw).toFixed(4);
      }

      function getShortcutDict(elem, str) {
        var matchDict = {};
        for (key in rShortcuts) {
          sortedShortcuts = Object.keys(rShortcuts[key]).sort();;
          sortedShortcuts.forEach(function(shortcut,i) {
            var strParams = str.split(',');
            strParams.forEach(function(param, i) {
              var shortIndex = param.indexOf(shortcut);

              if (key === 'special' && shortIndex > -1) {
                var response = rShortcuts[key][shortcut](elem, param);
                matchDict[shortcut + param.split(shortcut)[1]] = response;
              }
              else if (key !== 'special' && shortIndex > -1) {
                matchDict[shortcut] = rShortcuts[key][shortcut];
              }
            });

          })
        }
        return matchDict
      }
}


