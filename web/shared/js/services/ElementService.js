angular.module('uguru.shared.services')
.factory("ElementService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'DirectiveService',
    'AnimationFrameService',
    '$window',
    'RootService',
    ElementService
        ]);

function ElementService($timeout, $state, UtilitiesService, DirectiveService, AnimationFrameService, $window, RootService) {
      var rShortcuts = {special: getSpecialShortcuts(), animations:null, propValues: {}, props: {}, values:{}};
      var stateShortcuts = {};
      var rAnimations;
      var stateTypes = ['on', 'when', 'init'];
      var delayMatchStr =  ['delay-', 'd-', 'd', '+'];
      var onStateMappings = {
        'init': 'ready'
      }
      var player;

      return {
        renderElementStates: renderElementStates,
        renderState: renderState,
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
        var state = {type: null, nameCamel: '', name: {camel: name_camel, dash:name}};
        state.type = detectStateType(name, name_camel);

        if (!isValidState(state.type)) return;
        console.log('rendering', name, value)
        var parsedArgs = getParsedArgsByType(elem, state.type, name.split('-').splice(1), value)

        state.name = parsedArgs[state.type];
        state.actions = parsedArgs.actions;
        state.nameCamel = parsedArgs.fullNameCamel;
        state.exec = getStateFunc(state.type, state.name, parsedArgs.actions);
        return state;
      }

      function isValidState(type) {
        return stateTypes.indexOf(type) > -1;
      }

      function getStateFunc(type, name, actions) {
        var context = {name: name, type: type}

          if (type === 'init' && name == 'with') {
            return function(element, scope, attr, shortcuts) {
              shortcuts = shortcuts || RootService.animations;
              rShortcuts.animations = shortcuts;
              if (!rShortcuts.animations && rShortcuts.animations.customShortcuts) {
                rAnimations = RootService.animations;
                rShortcuts.cssPropValues = RootService.animations.customShortcuts.cssPropValues;
                rShortcuts.cssProps = RootService.animations.customShortcuts.cssProps;
                rShortcuts.cmds = RootService.animations.customShortcuts.cmds;
                rShortcuts.args = RootService.animations.customShortcuts.args;
              } else if (!rShortcuts.animations.customShortcuts) {
                $timeout(function() {

                  getStateFunc(type, name, actions);
                  // scope.$apply();
                });
              }
              // registerAnimationListeners(scope, element, attr, actions, context);
              applySendAnimProp(scope, element, actions, context);
              // applyPropsToElement(element, actions.prop, rShortcuts);
            }
          }
          if (type === 'on') {

            return function(element, scope, attr) {


              applyOnToElement(scope, element, attr, actions, context);
            }
          }
          if (type === 'when') {

            return function(element, scope, attr, updated_actions) {
              $timeout(function() {
                if (name.indexOf('-debug') > -1) {
                  name = name.replace('-debug', '');
                }
                registerAnimationListeners(scope, element, attr, actions, context);
              })

              // if (delays) {
              //   actions.delays = delays;
              // }
              console.log('updated', actions)
              if (actions && actions.send && actions.delays&& actions.delays.send.indexOf('[object') > -1|| (updated_actions && updated_actions.send && updated_actions.delays.send.indexOf('[object') > -1)) {
                return;
              }
              applySendAnimProp(scope, element, updated_actions || actions, context);
            }
          }
      }

      function parseDelayFromState(key, action_dict) {
        var delayDict = action_dict && action_dict.delays;
        if (!action_dict) return;
        var extStrToParseSplit = action_dict['raw'] && key in action_dict['raw'] && action_dict['raw'][key].split(']:');
        if (!delayDict) {
          delayDict = {external: 0, internal: 0};
        }
        if (extStrToParseSplit && extStrToParseSplit.length > 1) {
          delayDict.external = getExternalDelay(':' + extStrToParseSplit[1], delayMatchStr);
        }
        var intStrToParseSplit = action_dict['raw'] && key in action_dict['raw'] && action_dict['raw'][key].split(']')[0].split('[')[1];
        delayDict.internal = getInternalDelay(key, intStrToParseSplit, delayMatchStr)

        if (key === 'send') {
          action_dict.delays[key] = delayDict;

        }
        // console.log(action_dict)
        // var extDelay =
        // action_dict[key] = parsedSend;


      }

      function getInternalDelay(key, int_str, delay_match_strs) {
          result = {};
          var argTypeStr = {'a': 'anim', 's': 'send', 'p': 'prop'};
          if (key.length === 1) {
            key = argTypeStr[key]
          }
          if (key === 'send') {
            int_str = UtilitiesService.replaceAll(int_str, ', ', ',')
            var msgArr = int_str.split(',');
            msgArr.forEach(function(msg, i) {
              if (msg.split(':').length > 2) {
                var msgSplit =msg.split(':')
                var msgName = msgSplit[0];
                var delay = msgSplit[2];
                result[msgName] = parseInt(delay);
              }
            })
          }

          if (!Object.keys(result).length) {
            result = null;
          }
          return result;
        }

        function getExternalDelay(ext_str, delay_match_strs) {
          if (!delay_match_strs) {
            delay_match_strs = ['delay-', 'd-', 'd', '+'];
          }
          var result = 0;
          var extArgs = ext_str.split(':').filter(function(arg, i) {return arg && arg.length});

          extArgs.forEach(function(e_arg, i) {

            delay_match_strs.forEach(function(d, j) {
              if (e_arg.indexOf(d) > -1 && !result) {

                var strDelay = e_arg.replace(d, '');
                result = parseInt(strDelay);
              }
            })
          })

          return result;
        }

      function registerAnimationListeners(scope, element, attr, actions, context) {
        console.log
        // for (var key in actions) {
        //   var hasDelay = parseDelayFromState(actions[key]);
        //   console.log(actions)
        // }



        console.log(actions)
        // if (context.name && (context.name.toLowerCase() === 'init' || context.name.toLowerCase() === '') return;
        // var name = context.name
        // var baseName = 'when-' + name;
        // var classWatcher = [];
        // for (key in actions) {
        //   var listenFor = baseName;
        //   var scopeNameSplit=  UtilitiesService.camelCase(listenFor).split(':');
        //   var scopeName = 'root.public.customStates.when.' + scopeNameSplit[0];
        //   classWatcher.push(scopeNameSplit[0])
        //   var scopeTitle = UtilitiesService.camelCase(listenFor);
        //   var scopeTitle = scopeTitle.split(':')[0]
        //     if (!('when' in scope.root.public.customStates)) {
        //       scope.root.public.customStates['when'] = {};
        //       scope.root.public.customStates['when'][scopeTitle] = false;
        //     }
        //     if (!('after' in scope.root.public.customStates)) {
        //       scope.root.public.customStates['after'] = {};
        //       scope.root.public.customStates['after'][scopeTitle] = false;
        //     }
        //     var hasDelay = parseFloat(scopeNameSplit[1])
        //     if (scope.root.public.customStates['when'][scopeTitle]) {
        //       if (hasDelay) {
        //         $timeout(function() {applySendAnimProp(scope, element, actions, context, registerWatchFunctionCallback)}, hasDelay);
        //       } else {
        //         applySendAnimProp(scope, element, actions, context, registerWatchFunctionCallback);
        //       }
        //     } else if (['wheninit', 'whenwith'].indexOf(scopeTitle.toLowerCase()) === -1) {
        //       scopeName = scopeName.replace('.when.', '.after.');
        //       registerWatchFunction(scopeName, parseInt(hasDelay));
        //     }
        // }

        function registerWatchFunctionCallback(scope_name) {
          return function() {
            return registerWatchFunction(scope_name);
          }
        }

        function registerWatchFunction(scope_name, hasDelay) {
          return scope.$parent.$watch(scopeName, function(_new, _old) {
            if (_new && parseInt(_new) && hasDelay) {
              hasDelay = hasDelay + _new;
            };
            if (hasDelay) {
              $timeout(function() {
                console.log('applying', scope, element, actions, context, hasDelay);
                applySendAnimProp(scope, element, actions, context)
              }, hasDelay)
            } else {
              if (_new) {
                console.log('applying', scope, element, actions, context, hasDelay);
                applySendAnimProp(scope, element, actions, context)
              }
            }
          })
        }

      }

      function applyOnToElement(scope, element, attr, actions, context) {
        var name = context.name;
        console.log('applying on', actions, name)
        if (name === 'init' || typeof(name) === 'object' && name.indexOf('init') > -1) {
          // registerAnimationListeners(scope, element, attr, actions, context)

          element.ready(function(e) {

            applySendAnimProp(scope, element, actions, context);
          })
        } else {
          // registerAnimationListeners(scope, element, attr, actions, context)

          element.on(name,function(e) {
            // delete actions['send']
              applySendAnimProp(scope, element, actions, context)
          })
        }
      }

      function applySendAnimProp(scope, element, actions, context, cb) {
        console.log(actions)
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
            actions.anim = condenseAnimationsAndShortcuts(scope, actions.anim.replace(':delay-0', ''));
            console.log(actions.delays.anim, actions.anim)
            // embeddedAnimDelayArr = [];
            if ('anim' in actions.delays && actions.delays.anim > 0) {

              // actions.anim.split('|').forEach(function(anim_str, i) {
                var animStrSplit = (actions.anim + "").split(',');
                var animArr = [];
                animStrSplit.forEach(function(single_anim, j) {
                  var singleAnimSplit = single_anim.split(':');

                  if (singleAnimSplit.length < 8) {
                    singleAnimSplit[3] = parseFloat(singleAnimSplit[3]) + actions.delays['anim'];
                  } else {
                    singleAnimSplit[5] = parseFloat(singleAnimSplit[5]) + actions.delays['anim'];
                  }
                  animArr.push(singleAnimSplit.join(':'));
                })
                actions.anim = animArr.join(",")
                // embeddedAnimDelayArr.push(animArr)
              // })
              // if (embeddedAnimDelayArr && embeddedAnimDelayArr.length) {
              //   actions.anim = embeddedAnimDelayArr.join(",");
              // }
            }

            applyAnimArgs(element, scope, actions.anim, context);
          }

          if (actions.send) {

            applySendArgsAndCallback(element, scope, actions.send, actions.delays.send)
            // if ('send' in actions.delays) {

            //   // console.log(actions.delays.send)
            //   // $timeout(function() {
            //   //   console.log('sending', element, scope, actions.send)
            //   //   ;
            //   // }, actions.delays.send)
            // } else {
            //   applySendArgsAndCallback(element, scope, actions.send);
            // }
          }
          cb && cb();
      }

      function condenseAnimationsAndShortcuts(scope, animations) {

        var cAnimations = [];
        var defaultAnimMappings = {'scale:': ['scaleX', 'scaleY']};
        var extraDelay = '';
        animations.split(',').forEach(function(anim, index) {
          extraDelay = anim.split(':delay-')[1] || '';
          if (extraDelay) {
            extraDelay = ':delay-' + extraDelay
            anim = anim.replace(extraDelay, '');
          }

          for (key in defaultAnimMappings) {
            if (anim.indexOf(key) > -1) {
              var mappingArr = [];
              defaultAnimMappings[key].forEach(function(map1, index) {
                cAnimations.push(anim.replace(key, map1 + ':') + extraDelay);
              })
            } else {
              cAnimations.push(anim+extraDelay);
            }
          }
        })

        if (cAnimations.length) {

          animations = cAnimations.join(",")
        }
        // if (cAnimations.indexOf('[') === -1) {
        //   animations = '[' + animations + ']';
        // }
        return animations
      }

      function applyAnimArgs(element, scope, animations, context) {
        console.log(animations)
        var stateName = context.type + '-' + context.name;
        var defaults = {"kf":60,"autoPlay":false,"toolbar":{},"hidePlot":false}
        var animDelay = 0;
        // var animationSplitIndex = animations.indexOf(':delay-');
        var animArr = [];
        //resolve delays
        animations.split(',').forEach(function(animation, i) {
          var finalAnim = animation;
          finalAnimDelaySplit = finalAnim.split('delay-');
          if (finalAnimDelaySplit.length > 1) {
            var pureAnim = finalAnimDelaySplit[0];
            var delayVal = parseInt(finalAnimDelaySplit[1]);
            var pureAnimSplit = pureAnim.split(':').filter(function(arg) {return arg.length});
            if (pureAnimSplit.length > 7) {
              pureAnimSplit[5] = (parseInt(pureAnimSplit[5]) + delayVal) + "";
              finalAnim = pureAnimSplit.join(":")
            } else {
              pureAnimSplit[3] = (parseInt(pureAnimSplit[3]) + delayVal) + "";
              finalAnim = pureAnimSplit.join(":")
            }
          }
          animArr.push(finalAnim);
        })

        animations = animArr.join(",");
        // animations = '[' + animations + ']'
        // console.log('pre condense', animations)
        // animations = condenseAnimationsAndShortcuts(scope, animations);
        var state = AnimationFrameService.init.state('', animations, element[0], defaults);
        // console.log(state.props.counter[0])

        if (!player) {

          player = AnimationFrameService.getPlayer();
        }

        animDelay = animDelay || 0;
        player.scheduleStream(player, state, animDelay);
        //TODO, inject global offset here
        // if (animDelay && animDelay>0) {
        //   $timeout(function() {
        //     if (!player.active) {
        //       player.play(player);
        //     }
        //  }, animDelay)
        // }
        // else {

          if (!player.active) {
              player.play(player);
          }
      }

      function applySendArgsAndCallback(element, scope, messages, delay_dict) {
        if (!delay_dict) {
          delay_dict = {internal: {}, external:0}
        };
        global_delay = delay_dict || 0;

        messages.split(',').forEach(function(msg, i) {
          if (!rShortcuts.cmds) {
            rShortcuts.cmds = RootService.animations.customShortcuts.cmds;;
          }

          if (msg in rShortcuts.cmds) {
            msg = rShortcuts.cmds[msg];
          }
          var msgSplit = msg.split(':')
          var iMsg = msgSplit[0].trim();
          var msgName = iMsg;
          var msgScope = msgSplit[1].trim();



          var internalDelay = msgName in delay_dict.internal && delay_dict.internal[msgName] || 0;
          var msgDelay = delay_dict.external +internalDelay;
          var fullMsgName = ['when',msgName].join('-')


          if (msgScope === 'self') {

            if (fullMsgName in scope.states) {
              var stateRef = scope.states[fullMsgName];
              if (stateRef.actions) {
                var infoStates = ['raw', 'delays'];
                for (key in stateRef.actions) {
                  if (infoStates.indexOf(key) === -1) {
                    if (!(key in stateRef.actions.delays)) {
                      stateRef.actions.delays[key] = 0;
                    }

                    stateRef.actions.delays[key] += msgDelay
                  }
                }
                stateRef.func && stateRef.func(stateRef.actions, scope);
              }
            }
          }
          else if (msgScope === 'parent') {
            var elementFound = false;
              scope.$parent.public.customStates.whenElements.forEach(function(elem, i) {
                if (!elementFound && elem.contains(element[0])) {
                  elementFound = elem;
                  return;
                }
              })
              var camelName = UtilitiesService.camelCase(fullMsgName);
              if (elementFound && !scope.$parent.public.customStates.when[camelName]) {
                console.log('editing parent scope', scope.$parent.public.customStates.when, camelName)
                scope.$parent.public.customStates.when[camelName] = true;

                $timeout(function() {
                  scope.$parent.public.customStates.when[camelName] = false;
                })
                var stateRef = scope.$parent.states[fullMsgName];
                if (stateRef.actions) {
                var infoStates = ['raw', 'delays'];
                for (key in stateRef.actions) {
                  if (infoStates.indexOf(key) === -1) {
                    if (!(key in stateRef.actions.delays)) {
                      stateRef.actions.delays[key] = 0;
                    }

                    stateRef.actions.delays[key] += msgDelay
                  }
                }
                stateRef.func && stateRef.func(stateRef.actions, scope);
              }
                // scope.$parent.public.customStates.when[camelName] = elementFound;
              }
          }
          else if(msgScope === 'public' && fullMsgName in scope.root.scope.public.customStates) {
            console.log(element)
            var stateRefs = scope.root.scope.public.customStates[fullMsgName];
            stateRefs.forEach(function(stateRef, i) {
              console.log('public', fullMsgName, scope.root.scope.public.customStates)
              console.log(stateRef)
              if (stateRef.actions) {
                var infoStates = ['raw', 'delays'];
                for (key in stateRef.actions) {
                  if (infoStates.indexOf(key) === -1) {
                    if (!(key in stateRef.actions.delays)) {
                      stateRef.actions.delays[key] = 0;
                    }

                    stateRef.actions.delays[key] += msgDelay
                  }
                }
                stateRef.func && stateRef.func(stateRef.actions, scope);
              }
            })
          }
          // if (stateRef.)

          //todo :finishSelf --> remove listener
          //todo :public set $rootScope
          //todo :children --> set scope
          //todo :siblings --> set parent scope
          //todo :nth --> set





          // else if(msgDelay) {
          //   var _attr = {dashed: msgName, camel: UtilitiesService.camelCase('when-' + msgName)};
          //   _attr.camel = _attr.camel.replace(' ', '-')

          //   $timeout(function() {
          //     if (!scope.root.public.customStates.when) {
          //       scope.root.public.customStates.when = {};
          //       scope.root.public.customStates.after = {};
          //     }
          //     scope.root.public.customStates.when[_attr.camel] = msgDelay || true;
          //     scope.root.public.customStates.after[_attr.camel] = msgDelay || true;

          //     $timeout(function() {
          //       // scope.$apply();
          //       scope.root.public.customStates.when[_attr.camel] = false;
          //       scope.root.public.customStates.after[_attr.camel] = msgDelay || false;
          //     })
          //   }, msgDelay)
           else {
            var _attr = {dashed: msgName, camel: UtilitiesService.camelCase('when-' + msgName)};
            _attr.camel = _attr.camel.replace(' ', '-')
            if (!scope.root.public.customStates.when) {
              scope.root.public.customStates.when = {};
              scope.root.public.customStates.after = {};
            }
            scope.root.public.customStates.when[_attr.camel] = true;
            scope.root.public.customStates.after[_attr.camel] = true;
            $timeout(function() {
              scope.$apply();
              scope.root.public.customStates.when[_attr.camel] = false;
              scope.root.public.customStates.after[_attr.camel] = false;
            })

            // console.log(_attr.camel)
          }


          // $timeout(function() {

          // }, 100)
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


      function applyPropsToElement(elem, properties, shortcuts) {

        // properties.split(',').forEach(function() )
        var propertyArr = [];

        properties = UtilitiesService.replaceAll(properties, ', ', ',');
        var propertySplit = properties.split(',');
        if (!rShortcuts.cssPropValues && RootService.animations.customShortcuts) {
          rShortcuts.cssPropValues = RootService.animations.customShortcuts.cssPropValues;
          rShortcuts.cssProps = RootService.animations.customShortcuts.cssProps;
          rShortcuts.cmds = RootService.animations.customShortcuts.cmds;
          rShortcuts.args = RootService.animations.customShortcuts.args;
        }
        properties.split(',').forEach(function(prop, i) {
          if (!rShortcuts || !rShortcuts.cssPropValues) {

          }
          var prop = prop.trim();
          if (rShortcuts && rShortcuts.cssPropValues && prop.toLowerCase() in rShortcuts.cssPropValues) {
            prop = rShortcuts.props[prop] + "";
          }
          if (!rShortcuts.cssPropValues) {
            $timeout(function() {
              applyPropsToElement(elem, properties, shortcuts);
            })
            return;
          }
          var iPropSplit = prop.split(':');

          var propKey = iPropSplit[0].trim();
          var propValue = iPropSplit[1].trim();
          if (propKey.toLowerCase() in rShortcuts.cssProps) {
            propKey = rShortcuts.cssProps[propKey];
          }
          propertyArr.push({key: propKey, value: propValue});
        })

        // properties = parsePropertiesWithShortcuts(elem, properties);


        propertyArr.forEach(function(kv, i) {
          elem.css(kv.key, kv.value);
        })
      }

      function getParsedArgsByType(elem, state_type, state_args, arg_value) {
        var argDict = {};


        remainderStateName = state_args;
        state_args = getStateArgsFromValue(state_args, arg_value);


        if (state_type === 'when') {
          argDict[state_type] = remainderStateName.join('-');
          argDict.fullNameCamel = UtilitiesService.camelCase(state_type +'-' +argDict[state_type]);
        } else {
          argDict[state_type] = remainderStateName;
        }



          // var shortCutDict = getShortcutDict(elem, arg_value);

        argDict.actions = getArgActions(state_args, arg_value);
        return argDict;
      }

      function getStateArgsFromValue(state_args, arg_value) {
        //SHORTCUTS GO HERE for FULL anim/send/trigger states;
        arg_value = UtilitiesService.replaceAll(arg_value, ' | ', '|');
        var resultArr = [];
        arg_value.split('|').forEach(function(param_value, i) {
          resultDict = {argName: '', delays: {internal: 0, external: 0}};

          resultDict.delays.external = getExternalDelay(arg_value + '') || 0;


          param_value = param_value.trim();

          if (param_value.indexOf('s:[') > -1 || param_value.indexOf('send:[') > -1 || param_value.indexOf('trigger:[') > -1 || param_value.indexOf('t:[') > -1) {

            resultDict.argName = 'send';
          }
          if (param_value.indexOf('p:[') > -1 || param_value.indexOf('prop:[') > -1) {
            resultDict.argName = 'prop';
          }
          if (param_value.indexOf('a:[') > -1 || param_value.indexOf('anim:[') > -1) {
            resultDict.argName = 'anim';
          }
          resultArr.push(resultDict)
        })

        return resultArr;
      }

      function getArgActions(state_args, full_value, shortcuts) {

        var actionDict = {};
        var delayDict = {};
        var rawDict = {};
        var state_args_base = [];
        state_args.forEach(function(arg_dict, i) {state_args_base.push(arg_dict.argName.split(':')[0].trim())});
        // var detectAndAddStrArgValues = detectAndAddStrArgValues(state_args);
        var joinedSends = [];


        //trigger
        full_value.split('|').forEach(function(stream) {
          if (!rShortcuts.cmds && !RootService.animations.customShortcuts) {
            $timeout(function() {
              getArgActions(state_args, full_value, shortcuts);
            })
            return;
          }

          if (RootService.animations && RootService.animations.customShortcuts) {
            rAnimations = RootService.animations;
            rShortcuts.cssPropValues = RootService.animations.customShortcuts.cssPropValues;
            rShortcuts.cssProps = RootService.animations.customShortcuts.cssProps;
            rShortcuts.cmds = RootService.animations.customShortcuts.cmds;
            rShortcuts.args = RootService.animations.customShortcuts.args;
          }

          if (stream && stream.length && stream in rShortcuts.cmds) {
            stream = rShortcuts.cmds[stream];
          }
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

        //
        state_args.forEach(function(arg_dict, i) {

          var extDelay = arg_dict.delays.external || 0;

          var arg = arg_dict.argName.split(':')[0];

          if (!arg_dict.delays) {
            delays = {internal: 0, external: extDelay};
          }

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
          if (extDelay && extDelay > 0) {
            delayDict[arg] = extDelay
          }
          rawDict[arg] = extractRelevantValueFromArg(arg, full_value, true)
        })
        actionDict.raw = rawDict;
        actionDict.delays = delayDict;

        if (actionDict.delays && Object.keys(actionDict.delays).length) {
          for (key in actionDict) {
            if (['anim', 'send', 'prop'].indexOf(key) > -1) {

              parseDelayFromState(key, actionDict);
              if (!actionDict.delays.internal) {
                actionDict.delays.internal = {};
              }
            }
          }
        }

        return actionDict

        function detectAndAddStrArgValues(state_args) {
          return [];
        }

        function extractRelevantValueFromArg(arg, full_value, remove_external) {
          remove_external = remove_external || false;
          arg = arg.trim();
          var returnValue = full_value;
          full_value.split('|').forEach(function(value, i) {
            if (value.indexOf(arg + ':[') > -1 || value.indexOf(arg[0] + ':[') > -1) {
              returnValue = value;
              if (!remove_external) {
                returnValue = UtilitiesService.replaceAll(returnValue, arg+':[', '');
                returnValue = UtilitiesService.replaceAll(returnValue, arg[0]+':[', '');
                returnValue = UtilitiesService.replaceAll(returnValue, ']', '');
              }
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


