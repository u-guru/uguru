angular.module('uguru.shared.services')
.factory("ElementService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'DirectiveService',
    'AnimationFrameService',
    '$window',
    'RootService',
    'SVGService',
    '$parse',
    'SendService',
    'TweenService',
    ElementService
        ]);

function ElementService($timeout, $state, UtilitiesService, DirectiveService, AnimationFrameService, $window, RootService, SVGService, $parse, SendService, TweenService) {
      var rShortcuts = {special: getSpecialAnimShortcuts(), animations:null, propValues: {}, props: {}, values:{}};
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
        launchExternalWindow: launchExternalWindow,
        toCamelCaseBridge: UtilitiesService.camelCase
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

      function loadAnimations() {
        if (!RootService.animations.customShortcuts) {
          return false;
        }
        if (!rShortcuts.animations || !rShortcuts.animations.customShortcuts || !RootService.animations) {
          rAnimations = RootService.animations;
          rShortcuts.cssPropValues = RootService.animations.customShortcuts.cssPropValues;
          rShortcuts.cssProps = RootService.animations.customShortcuts.cssProps;
          rShortcuts.cmds = RootService.animations.customShortcuts.cmds;
          rShortcuts.args = RootService.animations.customShortcuts.args;
        }
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

      }

      function getInternalDelay(key, int_str, delay_match_strs) {
          //to refactor
          if (!rShortcuts || !rShortcuts.cmds) {
            var animStatus = loadAnimations();
            if (!rShortcuts || !rShortcuts.cmds || !animStatus) {
              $timeout(function() {
                getInternalDelay(key, int_str, delay_match_strs)
              })
              return;
            }
          }
          if (int_str in rShortcuts.cmds) {
            int_str = rShortcuts.cmds[int_str]
          }
          int_str = UtilitiesService.replaceAll(int_str, ', ', ',');
          int_str = int_str.split('[')[1];
          int_str = int_str.split(']')[0];
          var result = {};
          var argTypeStr = {'a': 'anim', 's': 'send', 'p': 'prop'};
          if (key.length === 1) {
            key = argTypeStr[key]
          }
          if (key === 'send' || argTypeStr[key] === 'send') {

            var msgArr = int_str.split(',');
            msgArr.forEach(function(msg, i) {
              if (msg.split(':').length > 2) {
                var msgSplit =msg.split(':')
                var msgName = msgSplit[0];
                var delay = msgSplit[2];
                result[msgName] = parseInt(delay);
                if (!result[msgName] && delay.indexOf('-') > -1) {
                  result[msgName] = 0;
                  var staggerSplit = delay.split('-');
                  var easeFunc = staggerSplit[0];
                  var duration = parseInt(staggerSplit[1]);

                  if (easeFunc.length > -1 && duration) {
                    var staggerDelays = [];

                    result.stagger = {ease: easeFunc, duration: duration, delays:[]}

                  }
                }
              }
            })
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

          return result || 0;
        }

      function applyOnToElement(scope, element, attr, actions, context) {
        var name = context.name;
        if (name === 'init' || typeof(name) === 'object' && name.indexOf('init') > -1) {
          // registerAnimationListeners(scope, element, attr, actions, context)

          element.ready(function(e) {

            applySendAnimProp(scope, element, actions, context);
          })
        }

        else if (typeof(name) === 'object' && name.indexOf('key') > -1) {
          if (name.length > 1 && name[1] === 'press') {
            name[1] = 'down'
          }
          scope.validKeys = attr.acceptKeys || 'abcdefghijklmnopqrstuvwxyz';
          var specialKeys = {'space': 32}
          //keyboardservice
          scope.$on('key' + name[1], function(onEvent, keypressEvent) {

            var charPressed = RootService.keyMap.toChar[keypressEvent.which];
            charPressed = charPressed && charPressed.toLowerCase() || '';
            console.log(charPressed)
            if (scope.validKeys.indexOf(charPressed) > -1 ) {

              applySendAnimProp(scope, element, actions, context);
            }
          });
        }

        else {
          // registerAnimationListeners(scope, element, attr, actions, context)

          element.on(name,function(e) {
            // delete actions['send']
              applySendAnimProp(scope, element, actions, context)
          })
        }
      }

      function applySendAnimProp(scope, element, actions, context, cb) {

          if (actions.prop) {
            if ('prop' in actions.prop.delays) {
              $timeout(function() {
                applyPropsToElement(element, actions.prop.parsed, actions.prop.delays);
              }, actions.prop.delays.external)
            } else {
              applyPropsToElement(element, actions.prop.parsed);
            }
          };
          if (actions.anim) {
            actions.anim.parsed = condenseAnimationsAndShortcuts(scope, actions.anim.parsed.replace(':delay-0', ''));

            if ('anim' in actions.anim.delays && actions.anim.delays > 0) {
                var animStrSplit = (actions.anim.parsed + "").split(',');
                var animArr = [];
                animStrSplit.forEach(function(single_anim, j) {
                  var singleAnimSplit = single_anim.split(':');
                  if (singleAnimSplit.length < 8) {
                    singleAnimSplit[3] = parseFloat(singleAnimSplit[3]) + actions.anim.delays.external;
                  } else {
                    singleAnimSplit[5] = parseFloat(singleAnimSplit[5]) + actions.anim.delays.external;
                  }
                  animArr.push(singleAnimSplit.join(':'));
                })
                actions.anim.parsed = animArr.join(",")
            }
            $timeout(function() {
              applyAnimArgs(element, scope, actions.anim.parsed, context);
            })
          }

          if (actions.send) {

            applySendArgsAndCallback(element, scope, actions.send.parsed, actions.send.delays)
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

          finalAnim = checkAndReplaceSpecialArgs(element, finalAnim);
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
        messages = messages.trim();
        if (!delay_dict) {
          delay_dict = {internal: {}, external:0}
        };
        global_delay = delay_dict || 0;

        messages.split(',').forEach(function(msg, i) {
          if (!rShortcuts.cmds) {
            rShortcuts.cmds = RootService.animations.customShortcuts.cmds;
          }

          if (msg in rShortcuts.cmds) {
            msg = rShortcuts.cmds[msg];
          }
          var msgSplit = msg.split(':')
          var iMsg = msgSplit[0].trim();
          var msgName = iMsg;
          var msgScope = msgSplit[1].trim();

          msgDelay = delay_dict;
          var totalMsgDelay = msgDelay.external || 0;

          if (msgSplit.length > 2) {
            if (!msgDelay.internal && msgDelay.internal !== 0) {
              msgDelay.internal = 0;
            }
            totalMsgDelay = (msgDelay.external || 0) + (msgDelay.internal[msgName] || 0);
          }

          var fullMsgName = msgName;
          var msgType = msgName.split('-')[0];
          if (['as', 'init', 'on'].indexOf(msgType) === -1) {
             fullMsgName = ['when',msgName].join('-');
             var msgType = 'when'
          }

          var camelName = UtilitiesService.camelCase(fullMsgName.replace('when-', ''));
          console.log('sending', fullMsgName, camelName, 'with scope', msgScope, msgType, msg)
          if (msgScope === 'self') {

            if (['on', 'init', 'when'].indexOf(msgType) > -1) {
              console.log('waiting total', totalMsgDelay, delay_dict)
              $timeout(function() {
                console.log('activating', camelName, fullMsgName)
                SendService.sendMsgToSelf(element, scope, fullMsgName.split('-').slice(1)[0], msgType)
              }, totalMsgDelay)
              return;

            }
            if (camelName in scope.public.customStates.when) {
              var stateRef = scope.public.customStates.when[camelName];

              if (stateRef.actions) {
                for (key in stateRef.actions) {

                  var splitSendObj = {};
                  splitSendObj[key] = stateRef.actions[key];

                  //warning: send to self loop;
                  if (key === 'send') {
                    var extDelay = stateRef.actions.send.delays.external + totalMsgDelay;

                      splitSendObj[key].delays.external = 0;
                      $timeout(function() {
                        stateRef.func && stateRef.func(splitSendObj, scope);
                      }, extDelay);
                  } else {

                    splitSendObj[key].delays.external += totalMsgDelay;

                    console.log('send level', key, msgScope, splitSendObj[key].delays);
                    stateRef.func && stateRef.func(splitSendObj, scope);
                  }
                }
              }

            }
          }
          else if (['children', 'grandchildren', 'siblings'].indexOf(msgScope) > -1) {
            var depthLevel = 0;
            var depthShortcutDict = {children: 1, grandchildren:2, siblings:0.5};
            if (msgScope in depthShortcutDict) {
              depthLevel = depthShortcutDict[msgScope];
            }

            var stateRefs = scope.public.customStates.when[camelName] || [];

            if (msgScope === 'siblings' && (!stateRefs || !stateRefs.length)) {
              stateRefs = scope.$parent.public.customStates.when[camelName];
              console.log(stateRefs, scope.$parent.public.customStates.when)
            }

            if (delay_dict.internal && delay_dict.internal.stagger) {

              var duration = delay_dict.internal.stagger.duration;
              var easeFunc = delay_dict.internal.stagger.ease;
              var numChildren = stateRefs.elements.length;

              var tempDuration = numChildren * (1000/60.0);

              var values = TweenService.preComputeValues("send", tempDuration, {send: 0}, {send:1}, easeFunc, delay_dict.internal.stagger.delays, 60).cache;

              delay_dict.internal.stagger.delays = values.slice(0, values.length - 2);
              console.log(delay_dict.internal.stagger, delay_dict.internal.stagger.delays[i], values, tempDuration)
              delay_dict.internal.stagger.delays.forEach(function(delay_val, i) {
                delay_dict.internal.stagger.delays[i] = delay_dict.internal.stagger.delays[i] * duration;

              })
            }


            console.log(stateRefs)
            stateRefs.elements.forEach(function(stateRef, i) {
              var stagger_delay = 0;
              if (delay_dict.internal && delay_dict.internal.stagger && delay_dict.internal.stagger.delays) {
                stagger_delay = delay_dict.internal.stagger.delays[i];
              }
              if (stateRef.actions && Object.keys(stateRef.actions).length) {
                $timeout(function() {
                      stateRef.func && stateRef.func(stateRef.actions, scope, stagger_delay, depthLevel);
                }, totalMsgDelay);
              }
            })
          }
          else if (msgScope === 'grandparent') {
            var stateRef;
            var depthScope = scope.$parent.$parent;

            if (camelName in depthScope.public.customStates.when) {

              stateRef = depthScope.public.customStates.when[camelName];
              console.log(stateRef)
              if ('name' in stateRef) {
                stateRef.func && stateRef.func(stateRef.actions, scope);
              } else {
                var stateRefs = stateRef;
                stateRefs.elements.forEach(function(stateRef, i) {
                  if (stateRef.actions && Object.keys(stateRef.actions).length) {


                    $timeout(function() {
                          stateRef.func && stateRef.func(stateRef.actions, scope);
                    }, totalMsgDelay);
                  }
                })
              }
            }
          }
          else if (msgScope === 'parent') {
            var stateRef;
            if (camelName in scope.$parent.public.customStates.when) {

              stateRef = scope.$parent.public.customStates.when[camelName];
              if ('name' in stateRef) {
                stateRef.func && stateRef.func(stateRef.actions, scope);
              } else {
                var stateRefs = stateRef;
                stateRefs.elements.forEach(function(stateRef, i) {
                  if (stateRef.actions && Object.keys(stateRef.actions).length) {


                    $timeout(function() {
                          stateRef.func && stateRef.func(stateRef.actions, scope);
                    }, totalMsgDelay);
                  }
                })
              }
            }

            // var elementFound = false;
            //   scope.$parent.public.customStates.whenElements.forEach(function(elem, i) {
            //     if (!elementFound && elem.contains(element[0])) {
            //       elementFound = elem;
            //       return;
            //     }
            //   })
            //   var camelName = UtilitiesService.camelCase(fullMsgName);
            //   if (elementFound && !scope.$parent.public.customStates.when[camelName]) {

            //     scope.$parent.public.customStates.when[camelName] = true;

            //     $timeout(function() {
            //       scope.$parent.public.customStates.when[camelName] = false;
            //     })
            //     var stateRef = scope.$parent.states[fullMsgName];
            //     if (stateRef.actions) {
            //       for (key in stateRef.actions) {

            //           stateRef.actions[key].delays.external += totalMsgDelay;
            //       }
            //       stateRef.func && stateRef.func(stateRef.actions, scope);
            //     }
            //     // scope.$parent.public.customStates.when[camelName] = elementFound;
            //   }
          }
          else if(msgScope === 'public' ) {
            // if (camelName in scope.root.scope.public.customStates) {
            //   fullMsgName = camelName
            // }
            // var  = UtilitiesService.camelCase(msg.split(':')[0]);
            var stateRefs = scope.root.scope.public.customStates[fullMsgName];

            stateRefs.forEach(function(stateRef, i) {
              if (stateRef.actions && Object.keys(stateRef.actions).length) {


                $timeout(function() {
                      stateRef.func && stateRef.func(stateRef.actions, scope);
                }, totalMsgDelay);

                // for (key in stateRef.actions) {

                  // if (!stateRef.actions[key]) {
                  //   continue
                  // }
                  // var splitSendObj = {};
                  // splitSendObj[key] = stateRef.actions[key];

                  // //warning: send to self loop;
                  // if (key === 'send') {
                  //   console.log('ending', splitSendObj[key])
                  //   var extDelay = stateRef.actions.send.delays.external + totalMsgDelay;


                  //     splitSendObj[key].delays.external = 0;


                  // } else {


                  //   // splitSendObj[key].delays.external += ;


                  //   $timeout(function() {
                  //     stateRef.func && stateRef.func(splitSendObj, scope);
                  //   }, totalMsgDelay)
                  // }
              }
            })
          }
           else {

            var _attr = {dashed: msgName, camel: UtilitiesService.camelCase('when-' + msgName)};
            _attr.camel = _attr.camel.replace(' ', '-')
            if (!scope.root.public.customStates.when) {
              scope.root.public.customStates.when = {};
            }
            if (!scope.root.public.customStates.after) {
              scope.root.public.customStates.after = {};
            }
            scope.root.public.customStates.when[_attr.camel] = true;
            scope.root.public.customStates.after[_attr.camel] = true;
            scope.root.scope.public.customStates[camelName] = [];
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

          prop = checkAndReplaceSpecialPropArgs(elem, prop);
          if (!prop || !prop.length) return;

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

          if (iPropSplit.length >= 2) {
            var propKey = iPropSplit[0].trim();
            var propValue = iPropSplit[1].trim();
            if (propKey.toLowerCase() in rShortcuts.cssProps) {
              propKey = rShortcuts.cssProps[propKey];
            }
            propertyArr.push({key: propKey, value: propValue});
          }
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
          argDict.fullNameCamel = UtilitiesService.camelCase(argDict[state_type]);

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

          // resultDict.delays.external = getExternalDelay(arg_value + '') || 0;


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

        var joinedSends = [];
        full_value = UtilitiesService.replaceAll(full_value, ': ', ':');
        full_value = UtilitiesService.replaceAll(full_value, ', ', ',');

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
              full_value = full_value.replace('t:[', 'send:[').replace('trigger:[', 'send:[').trim();
            }
          }
        })

        //
        var resultDict = {};


        state_args.forEach(function(arg_dict, i) {

          // var extDelay = arg_dict.delays.external || 0;
          //to elimiate
          var arg = arg_dict.argName.split(':')[0];
          resultDict[arg] = {};

          if (arg in actionDict) {
            resultDict[arg].parsed = actionDict[arg];
          } else {
            resultDict[arg].parsed = extractRelevantValueFromArg(arg, full_value);
            resultDict[arg].raw = extractRelevantValueFromArg(arg, full_value);
          }
          resultDict[arg].raw = extractRelevantValueFromArg(arg, full_value, true);

          resultDict[arg].delays = {internal: getInternalDelay(arg, resultDict[arg].raw, delayMatchStr), external: getExternalDelay(resultDict[arg].parsed)};


        })

        return resultDict;

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

      function getSpecialAnimShortcuts() {
        return {draw: drawFunc, move: moveToFunc}
      }

      // function getWindowObj() {
      //   console.log(RootService._window)
      // }

      function moveToFunc(elem, shortcut, formatted) {
        var argSplit = formatted.split(':');
        var elemCurrentPosition = elem[0].getBoundingClientRect();
        var moveToArgs = [argSplit[1], argSplit[2]];
        var vp_info = RootService._window.elemInfo(elem[0])
        // var currentStyle = window.getComputedStyle()
        moveToArgs.forEach(function(pos, i)  {


          // function(pos, i) {


            var shortcutReplace = isShortcutMoveTo(pos, elemCurrentPosition, vp_info);
            console.log(shortcutReplace);
            if (shortcutReplace) {
              moveToArgs[i] = shortcutReplace + 'px';
            }
          // }
        });

        // return 'translateX:' + ''


        function isShortcutMoveTo(arg, coords, vp_info) {
          var resultValue = 0;
          var values = [];
          var resultExpr = '';
          var shortcuts = { left:0, right: 1, bottom:0, bottom: 1};
          var vp = vp_info;
          var replaceDict = {'x': 'left', 'y': 'top'};


          // if (arg.indexOf('vp.') > -1) {

          //   var hasDirection = arg.split('.')[1];
          //   if (hasDirection in shortcuts) {
          //     resultExpr += shortcuts[hasDirection] + '-'
          //   }
          // }
          var arg = arg;
          while (arg.indexOf('vp.') > -1 || arg.indexOf('#') > -1) {

            if (arg.indexOf('#') > -1) {
              var idIndex = arg.indexOf('#');
              var idNamePlusSplit = arg.substring(idIndex + 1, arg.length).split('.');
              var idName = idNamePlusSplit[0];
              var idDirection = idNamePlusSplit[1];
              if (idDirection in replaceDict) {
                idDirection = replaceDict[idDirection]
              }

              if (!(idName in RootService.elemIdCache)) {
                var elem = document.querySelector('#' + idName);
                if (elem) {
                  RootService.elemIdCache[idName] = elem.getBoundingClientRect();
                }
              }
              var toElemRect = RootService.elemIdCache[idName]
              var toReplaceStr = '#' + idName + '.' + idDirection;

              if (arg.indexOf(toReplaceStr) > -1)  {
                arg = arg.replace(toReplaceStr, toElemRect[idDirection] || '0')
              }
              if (('.' + idDirection).indexOf(arg) > -1) {
                    arg = arg.replace('.' + idDirection, '')
                }
              // arg = arg.replace('#', '');

              // ['right', 'left', 'top', 'bottom'].forEach(function(dir, i) {
              //   if (remainderString.indexOf(dir) === 0) {

              //   }
              // })
            }
            if (arg.indexOf('vp.') > -1) {
              console.log(arg)
              // var direction = arg.split('vp.')[0]
              var vpIndex = arg.indexOf('vp.');
              if (vpIndex || parseInt(vpIndex) === 0)  {

                remainderString = arg.substring(vpIndex + arg.substring(vpIndex, 3).length, arg.length);
                ['right', 'left', 'top', 'bottom'].forEach(function(dir, i) {
                  if (remainderString.indexOf(dir) >= 0) {


                    if (('.' + dir).indexOf(arg) > -1) {
                      arg = arg.replace('.' + dir, '')
                    }
                    arg = arg.replace('vp.' + dir, vp[dir] || '0')
                  }
                })
              }

              // console.log(arg.split('vp.')[0])
              // var numReplaced = vp[direction];

              // if (hasDirection in shortcuts) {
              // console.log(toReplace, numReplaced)
              // resultExpr += arg;

            }
          }
          // resultArg = arg;
          ['.left', '.right', '.top', '.bottom'].forEach(function(direct, i) {
            if (arg.indexOf(direct) > -1) {
              arg = arg.replace(direct, i);
            }
          });
          // var resultExpr = arg + coords[hasDirection];
          return $parse(arg)();
        }


        if (formatted) {
          var argSplit = (formatted + "").split(':')
          var translateX = ['translateX', '0px', moveToArgs[0], argSplit[3], argSplit[4], argSplit[5], argSplit[6], argSplit[7]].join(":");
          var translateY = ['translateY', '0px', moveToArgs[1], argSplit[3], argSplit[4], argSplit[5], argSplit[6], argSplit[7]].join(":");
          console.log(translateX, translateY)
          return [translateX, translateY].join(',')
        }
        return 'strokeDashoffset:' + (elem[0].getTotalLength() * percentDraw).toFixed(4);
      }

      function getSpecialPropShortcuts() {
        return {draw: initDrawFunc, move: identityFunc}

        function identityFunc(elem, prop_str) {
          return prop_str
        }

        function initDrawFunc(elem, attr) {
          var pathLength = SVGService.getTotalPathLength(elem[0]);

          elem[0].setAttribute('stroke-dashoffset', pathLength + "")
          return "stroke-dasharray:" + pathLength + ';stroke-dashoffset:' + pathLength;
        }

      }

      function checkAndReplaceSpecialPropArgs(elem, prop_str) {
        var firstArg = prop_str.split(':')[0];
        var specialPropDict = getSpecialPropShortcuts();
        if (firstArg in specialPropDict) {
          var result = specialPropDict[firstArg](elem, null, prop_str);

          return result;
        }
        return prop_str;
      }

      function checkAndReplaceSpecialArgs(elem, anim_str) {

        var firstArg = (anim_str + '').split(':')[0];
        var specialFuncDict = getSpecialAnimShortcuts();
        var func = specialFuncDict[firstArg];

        if (func) {

          var result = func(elem, null, anim_str);
          console.log(result)
          return result;
        }

        return result || anim_str
      }

      function drawFunc(elem, shortcut, formatted) {
        var shortcut = shortcut || "draw:100%";

        var parsedShortcut = shortcut.split('draw:')[1];
        var percentDraw = parseInt(parsedShortcut)/100;
        var isNegative = shortcut.indexOf('-') > -1;
        if (shortcut.indexOf('-1') > -1) {
          percentDraw *= isNegative
        }

        if (formatted) {
          var pathLength = SVGService.getTotalPathLength(elem[0]);
          var percentStart = parseInt(formatted.split(':')[1].replace('%', ''))/100.0;
          var percentEnd = parseInt(formatted.split(':')[2].replace('%', ''))/100.0;
          var pathLengthStart = percentStart * pathLength;
          var pathLengthEnd = percentEnd * pathLength;
          console.log(pathLengthStart, pathLengthEnd)
          elem.css('stroke-dasharray', pathLength);
          var remainderAnim = formatted.split(':').slice(3).join(":");
          // if (pathLengthEnd !== pathLength) {
            result = "stroke-dashoffset:" + (pathLength - pathLengthStart) + ':' + (pathLength - pathLengthEnd) + ':' + remainderAnim;
          // } else {
          //   result = "stroke-dashoffset:" + pathLengthStart + ':' + pathLength + ':' + remainderAnim;
          // }
          console.log(result)
          return result;
        }
        return 'strokeDashoffset:' + (elem[0].getTotalLength() * percentDraw).toFixed(4);
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


