angular.module('uguru.shared.services')
.factory("ElementService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'DirectiveService',
    'AnimationFrameService',
    '$window',
    ElementService
        ]);

function ElementService($timeout, $state, UtilitiesService, DirectiveService, AnimationFrameService, $window) {
      var rShortcuts = {special: getSpecialShortcuts(), propValues: {}, props: {}, values:{}};
      var stateShortcuts = {};
      var stateTypes = ['on', 'when', 'init'];
      var onStateMappings = {
        'init': 'ready'
      }
      var player;

      return {
        renderElementStates: renderElementStates,
        getShortcutDict: getShortcutDict,
        addShortcuts: addShortcuts,
        launchExternalWindow: launchExternalWindow
      }

      function launchExternalWindow(params, element) {
        var anim_string = params;
        if (anim_string.indexOf('[') > -1) {
          anim_string = params.split('[')[1].split(']')[0];
        }

        var base_url = '/#/admin/api/animations/prop/';
        var anim_strings = [];
        anim_string.split(',').forEach(function(a, i) {
          anim_strings.push(a.split(':')[0] + ':' + a.split(':').splice(1).join(","))
        });
        base_url = base_url + anim_strings.join('+');

        var elemNodeName = element[0].nodeName.toLowerCase();
        base_url += '?template=shared:components.svg.logo.guru-head.html&autoPlay=true&select=svg'
        $window.open(base_url, '_blank');

      }

      function addShortcuts(prefix, shortcuts, attr) {

        var shortCutArr = [];
        shortcuts.forEach(function(child, i) {
          child.nodeName !== '#text' && parseShortcut(prefix, child.attributes);

        });

      }

      function parseShortcut(prefix, attr) {
        var terms =['replace', 'with']
        // var resultDict = {};
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
              switch (iAttr.name) {
                case ("prop-value"):
                  resultDict[attr[i-2].name] = iAttr.value;
                  rShortcuts.propValues[attr[i-2].name] = iAttr.value;
                  break;
                case ("props"):
                  resultDict[attr[i-2].name]  = iAttr.value;
                  rShortcuts.props[attr[i-2].name] = iAttr.value;
                  break;
                case ("values"):
                  resultDict[attr[i-2].name]  = iAttr.value;
                  rShortcuts.values[attr[i-2].name] = iAttr.value;
                  break;
              }

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
        var context = {name: name, type: type}

          if (type === 'init' && name == 'with') {
            return function(element) {


              applyPropsToElement(element, actions.prop);
            }
          }
          if (type === 'on') {

            return function(element, scope) {


              applyOnToElement(scope, element, actions, context);
            }
          }
          if (type === 'when') {
            return function(element, scope) {
              $timeout(function() {
                if (name.indexOf('-debug') > -1) {
                  name = name.replace('-debug', '');
                }
                registerAnimationListeners(scope, element, actions, context);
              })
            }
          }
      }



      function registerAnimationListeners(scope, element, actions, context) {
        var name = context.name
        var baseName = 'when-' + name;
        if (context.type === 'on' && context.name === 'init') {
          console.log(actions)
        }
        for (key in actions) {
          var listenFor = baseName;
          var scopeName = 'root.public.customStates.when.' + UtilitiesService.camelCase(listenFor);
            if (!('when' in scope.$parent.root.public.customStates)) {
              scope.$parent.root.public.customStates['when'] = {};
            scope.$parent.root.public.customStates['when'][UtilitiesService.camelCase(listenFor)] = false;

            scope.$parent.$watch(scopeName, function(_new, _old) {
              if (_new && _old === false) {
                applySendAnimProp(scope, element, actions, context)
              }
              // if (_new && _new !== _old) {
              //   console.log('oh shit')

              // } else if (!_old || !_new) {
              //   console.log('registering', baseName, actions)
              // }
            })


        }
      }
    }

      function applyOnToElement(scope, element, actions, context) {
        var name = context.name;
        if (name === 'init') {
          registerAnimationListeners(scope, element, actions, context)
          element.ready(function(e) {

            applySendAnimProp(scope, element, actions, context);
          })
        } else {

          element.on(name,function(e) {

            // delete actions['send']
              applySendAnimProp(scope, element, actions, context)
          })
        }
      }

      function applySendAnimProp(scope, element, actions, context) {

        if (actions.prop) {
          if ('prop' in actions.delays) {
              $timeout(function() {
                applyPropsToElement(element, actions.prop);
              }, actions.delays.prop)
            } else {
              applyPropsToElement(element, actions.prop);
            }
          };
          if (actions.anim) {
            actions.anim = condenseAnimationsAndShortcuts(scope, actions.anim);

            if ('anim' in actions.delays) {
              embeddedAnimDelayArr = [];
              actions.anim.split('|').forEach(function(anim_str, i) {
                var animStrSplit = anim_str.split(',');
                var animArr = [];
                animStrSplit.forEach(function(single_anim, j) {
                  var singleAnimSplit = single_anim.split(':');
                  if (singleAnimSplit.length < 7) {
                    singleAnimSplit[2] = parseFloat(singleAnimSplit[2]) + actions.delays['anim'];
                  } else {
                    singleAnimSplit[5] = parseFloat(singleAnimSplit[5]) + actions.delays['anim'];
                  }
                  animArr.push(singleAnimSplit.join(':'));
                })

                embeddedAnimDelayArr.push(anim_str)
              })
              // $timeout(function() {

                applyAnimArgs(element, scope, actions.anim, context);
              // }, actions.delays.anim)
            } else {
              applyAnimArgs(element, scope, actions.anim, context);
            }
          }

          if (actions.send) {

            if ('send' in actions.delays) {

              $timeout(function() {
                applySendArgsAndCallback(element, scope, actions.send);
              }, actions.delays.send)
            } else {
              applySendArgsAndCallback(element, scope, actions.send);
            }
          }
      }

      function condenseAnimationsAndShortcuts(scope, animations) {
        var cAnimations = [];
        var defaultAnimMappings = {'scale:': ['scaleX', 'scaleY']};
        animations.split(',').forEach(function(anim, index) {
          for (key in defaultAnimMappings) {
            if (anim.indexOf(key) > -1) {
              var mappingArr = [];
              defaultAnimMappings[key].forEach(function(map1, index) {
                cAnimations.push(anim.replace(key, map1 + ':'));
              })
            }
          }
        })
        if (cAnimations.length) {
          animations = cAnimations.join(",")
        }
        return animations
      }

      function applyAnimArgs(element, scope, animations, context) {
        var stateName = context.type + '-' + context.name;
        var defaults = {"kf":60,"autoPlay":false,"toolbar":{},"hidePlot":false}

        var state = AnimationFrameService.init.state('', animations, element[0], defaults);



        if (!player) {

          player = AnimationFrameService.getPlayer();
        }
        // player.scheduleStream(player, state, state.offset, null);

        // player.play();
        // if (!player) {
        //   player = AnimationFrameService.getPlayer();
        // }

        //TODO, inject global offset here
        player = player.scheduleStream(player, state, 0);
        if (!player.active) {
          player.play(player);
        }
        // player.play();
      }

      function applySendArgsAndCallback(element, scope, messages) {

        messages.split(',').forEach(function(msg, i) {
          var msgSplit = msg.split(':')
          var iMsg = msgSplit[0].trim();
          var msgScope = msgSplit[1].trim();
          var msgDelay = 0;

          if (msgSplit.length > 2) {
            msgDelay = parseInt(msgSplit[2].replace('delay-', ''));
          }
          var _attr = {dashed: iMsg, camel: UtilitiesService.camelCase('when-' + iMsg)};
          _attr.camel = _attr.camel.replace(' ', '-')
          if (msgDelay) {
            $timeout(function() {
              scope.$parent.root.public.customStates.when[_attr.camel] = true;

              $timeout(function() {
                scope.$parent.root.public.customStates.when[_attr.camel] = false;
              })
              console.log(msgDelay, _attr.camel, scope.$parent.root.public.customStates)
            }, msgDelay)
          } else {
            $timeout(function() {scope.$parent.root.public.customStates.when[_attr.camel] = true; scope.$apply()});
          }


          $timeout(function() {
            scope.$parent.root.public.customStates.when[_attr.camel] = false;
          }, 100)
          // DirectiveService.initCustomStateWatcher(scope, element,  'when', _attr, _attr[_attr.camel]);
        })
      }

      function checkShortcuts(str, arg) {

        if (arg in rShortcuts && str in rShortcuts[arg]) {
          return rShortcuts[arg][str]
        }
        return str;
      }

      function parsePropertiesWithShortcuts(elem, properties) {

          var elemProps = properties.split(',');
          var shortcuts = {special:Object.keys(rShortcuts.special), propValues:Object.keys(rShortcuts.propValues), props: Object.keys(rShortcuts.props), values: Object.keys(rShortcuts.values)};
          var propObjArr = [];
          elemProps.forEach(function(kv, kv_index) {
            shortcuts.special.forEach(function(special, i) {
              if (kv.indexOf(special) > -1) {
                kv = rShortcuts.special[special](elem, kv);
              }
            })

            var propValueShortcutIndex = shortcuts.propValues.indexOf(kv);
            if (propValueShortcutIndex > -1) {
              kv = rShortcuts.propValues[shortcuts.propValues[propValueShortcutIndex]]
            }

            var kvSplit = kv.split(':');
            var key = kvSplit[0];
            var value = kvSplit[1];
            if (key in rShortcuts.props) {
              key = rShortcuts.props[key];
            }
            if (value in rShortcuts.values) {
              value = rShortcuts.values[value]
            }
            propObjArr.push({key: key, value:value});
          })

          return propObjArr
      }


      function applyPropsToElement(elem, properties) {


        properties = parsePropertiesWithShortcuts(elem, properties);

        properties.forEach(function(kv, i) {

          elem.css(kv.key, kv.value);
        })
      }

      function getParsedArgsByType(elem, state_type, state_args, arg_value) {
        var argDict = {};


        state_args = getStateArgsFromValue(state_args, arg_value);

        argDict[state_type] = configureNameFromArgs(state_type, state_args)

          // var shortCutDict = getShortcutDict(elem, arg_value);

        argDict.actions = getArgActions(state_args, arg_value);

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
        //SHORTCUTS GO HERE for FULL anim/send/trigger states;
        arg_value = UtilitiesService.replaceAll(arg_value, ' | ', '|');

        arg_value.split('|').forEach(function(param_value, i) {

          var hasDelay = (param_value + '').split(']')[1];
          var delay = '';
          if (hasDelay) {
            delay = ':' + parseFloat(hasDelay.replace(':delay-', '')).toFixed(4);
          }
          param_value = param_value.trim();

          if (param_value.indexOf('s:[') > -1 || param_value.indexOf('send:[') > -1 || param_value.indexOf('trigger:[') > -1 || param_value.indexOf('t:[') > -1) {

            state_args.push('send' + delay);
          }
          if (param_value.indexOf('p:[') > -1 || param_value.indexOf('prop:[') > -1) {
            state_args.push('prop' + delay);
          }
          if (param_value.indexOf('a:[') > -1 || param_value.indexOf('anim:[') > -1) {
            state_args.push('anim' + delay);

          }
        })
        return state_args
      }

      function getArgActions(state_args, full_value, shortcuts) {
        var actionDict = {};
        var delayDict = {};
        var state_args_base = [];
        state_args.forEach(function(arg, i) {state_args_base.push(arg.split(':')[0].trim())});
        // var detectAndAddStrArgValues = detectAndAddStrArgValues(state_args);
        var joinedSends = [];

        full_value.split('|').forEach(function(stream) {
          if (stream.indexOf('t:[') > -1 || stream.indexOf('trigger:[') > -1) {
            param_value = stream.trim();
            var hasDelay = (param_value + '').split(']')[1];
            var delay = '';
            if (hasDelay) {
              delay = ':' + parseFloat(hasDelay.replace(':delay-', '')).toFixed(4);
            }
            param_value = param_value.trim();

            if (state_args_base.indexOf('send') === -1) {
              full_value = full_value.replace('t:[', 'send:[').replace('trigger:[', 'send:[').trim();
              state_args.push('send' + delay);
            } else {
              // var sendIndex = full_value.split('send:[');
              // var sendIndexStream = sendIndex[1];
              full_value = full_value.replace('t:[', 'send:[').replace('trigger:[', 'send:[').trim();

              // state_args.push('send' + delay);
            }
          }
        })

        state_args.forEach(function(arg, i) {

          var delay = arg.split(':')[1] || 0;
          var arg = arg.split(':')[0];
          var delay = parseFloat(delay);
          full_value = UtilitiesService.replaceAll(full_value, ': ', ':');
          full_value = UtilitiesService.replaceAll(full_value, ', ', ',');
          if (arg in actionDict) {
            actionDict[arg] = actionDict[arg].trim() +  '|' + extractRelevantValueFromArg(arg, full_value).trim();
          } else {
            actionDict[arg] = extractRelevantValueFromArg(arg, full_value);
          }
          if (actionDict[arg]) {
            actionDict[arg] = actionDict[arg].trim();
          }
          if (delay) {
            delayDict[arg] = delay;
          }
        })

        actionDict.delays = delayDict;
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
        var parsedParams = [];
        for (key in rShortcuts) {

          sortedShortcuts = Object.keys(rShortcuts[key]).sort();;
          // full shortcuts
          sortedShortcuts.forEach(function(shortcut,i) {
            var strParams = str.split(',');
            strParams.forEach(function(param, i) {

              if (parsedParams.indexOf(param) > -1) return;

              var shortIndex = param.indexOf(shortcut);

              if (key === 'special' && shortIndex > -1) {
                var response = rShortcuts[key][shortcut](elem, param);
                matchDict[shortcut + param.split(shortcut)[1]] = response;
                parsedParams.push(param)
              }
              else if (key !== 'special' && shortIndex > -1) {
                matchDict[shortcut] = rShortcuts[key][shortcut];
                parsedParams.push(param)
              }
            });
          })
        }

        return matchDict
      }
}


