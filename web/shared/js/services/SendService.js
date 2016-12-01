angular.module('uguru.shared.services')
.factory("SendService", [
    '$timeout',
    '$parse',
    'RootService',
    'TweenService',
    SendService
        ]);

function SendService($timeout, $parse, RootService, TweenService) {
  var sendTree = {};
  var sendScopeShortcuts = getSendScopeShortcuts();
  return {
    sendMsgToSelf: sendMsgToSelf,
    prepareToSendMessage: prepareToSendMessage,
    parseDepth: parseDepth,
    applySendArgs: execSendArgs,
    precompileSendActionArgs: precompileSend,
    sendTree: sendTree
  }
  function parseMessageAndStoreToExecuteLater(scope, state, expected_depth, element, attr) {
    var stateName = state.nameCamel;
    // console.log('incoming message', stateName, state.actions, '\npublic scope:',scope.public.customStates.when)

    //copy over all from parent that are greater than 0 and subtract them by negative one
    var futureExecDict = {
      actions: state.actions,
      func: getExecFunction(state, {depth: -1}, element, attr),
      name: state.name,
      camel:state.nameCamel
    }

    if (expected_depth - Math.floor(expected_depth) === 0.5) {
      futureExecDict.elem = element[0];
    }

    if (stateName in scope.public.customStates.when && scope.public.customStates.when[stateName].elements) {
      futureExecDict.depth = expected_depth || scope.public.customStates.when[stateName].depth;
      scope.public.customStates.when[stateName].elements.push(futureExecDict)
    }

    else if (scope.root && state.nameCamel in scope.root.scope.public.customStates.when) {

      scope.root.scope.public.customStates.when[state.nameCamel].elements.push(futureExecDict)
    } else if (scope.root) {
      scope.root.scope.public.customStates.when[state.nameCamel] = {elements: [], depth: -1}
      scope.root.scope.public.customStates.when[state.nameCamel].elements.push(futureExecDict);
    }



    // {actions: state.actions, func: whenCallback(currentDepth), name:state.name};
    // console.log(state, scope.outgoing_parsed.join(" "))
  }

  function getSendScopeShortcuts() {
    return {
      'siblings': 'depth(-0)',
      'self': 'depth(-)',
      'public': 'depth(*)',
      'c': 'depth(1)',
      'grandchildren': 'depth(2)',
      'gp': 'depth(-2)',
      'p': 'depth(-1)',
      'grandparent': 'depth(-2)',
      'children': 'depth(1)',
      'gc': 'depth(2)',
      'ggc': 'depth(3)',
      'gggc': 'depth(4)',
      'ggggc': 'depth(4)',
      '5g': 'depth(5)',
    }
  }

  function getExecFunction(state, msg_options, element, attr) {


      return function(actions, scope, delay, depth) {

        actions = actions || state.actions;

        var options = msg_options
        var current_depth = msg_options.depth
        if (delay) {
          $timeout(function() {
            state.exec(element, scope, attr, actions);
          }, delay)
          // return;
        } else {
          state.exec(element, scope, attr, actions);
        }

      }
    }

  function parseStateMsgContents(state) {
    var msgResultArr = [];
    var msgArr = state.parsed.split(',');
    msgArr.forEach(function(msg, i) {
      msgObj = {raw: msg.trim()}
      msgSplit = msgObj.raw.split(':');
      msgObj.name = msgSplit[0];
      msgObj.nameCamel = RootService.camelCase(msgObj.name)
      msgObj.type = getMsgType(msgSplit[0]);
      msgObj.delay = calcTotalDelay(state, msgObj.name);
      msgObj.greaterThan = msgSplit[1].indexOf('>') > -1 && true;
      msgObj.lessThan = msgSplit[1].indexOf('<') > -1 && true;
      msgObj.sendScope = getSendScope(msgSplit[1].replace('>', '').replace('<', ''));
      msgResultArr.push(msgObj)
    })
    // console.log(state.nameCamel, state.actions)
    // msgObj.delayTotal = state
    // console.log(state)

    return msgResultArr;

    function calcTotalDelay(send_obj, msg) {
      if (!send_obj.delays.internal) send_obj.delays.internal = {};
      return send_obj.delays.external + (msg in send_obj.delays.internal && send_obj.delays.internal[msg] ||0)
    }

    function getSendScope(msg_scope) {

      if (msg_scope in sendScopeShortcuts) return sendScopeShortcuts[msg_scope]
      return msg_scope;
    }

    function getMsgType(msg_arg) {
      msg_arg = msg_arg.split('-')[0]
      if (['init', 'on', 'as'].indexOf(msg_arg.trim().toLowerCase()) > -1) {
        return msg_arg.trim()
      }
      return 'when'
    }

  }

  function parseMsgString() {

  }

  function registerFutureMessageToScope(msg_obj, scope, depth) {

    if (msg_obj.sendScope === 'depth(*)') {
      depth = -1;
    }
    else if (msg_obj.sendScope === 'depth(-0)' || msg_obj.sendScope === 'depth(0)') {
      depth = 0.5;
    }
     else {
      depth = 0;
    }


    if (depth === 0.5) {
      if (!(msg_obj.nameCamel in scope.$parent.public.customStates.when)) {
        scope.public.customStates.when[msg_obj.nameCamel] = {elements:[], depth: depth, siblings:true}
        scope.$parent.public.customStates.when[msg_obj.nameCamel] = scope.public.customStates.when[msg_obj.nameCamel]
      } else {
        scope.$parent.public.customStates.when[msg_obj.nameCamel].siblings = true;
      }
      // console.log(scope.public.customStates.when)

    }
    else if ('root' in scope && (msg_obj.nameCamel) in scope.root.scope.public.customStates.when) {


      if (!scope.root.scope.public.customStates.when[msg_obj.nameCamel].options) {
        scope.root.scope.public.customStates.when[msg_obj.nameCamel].options = msg_obj;
      }

      return;
    } else if (!(msg_obj.nameCamel in scope.public.customStates.when)) {
      if (depth === -1) {
        scope.root.scope.public.customStates.when[msg_obj.nameCamel] = {elements:[], depth: depth}
      }
      else {
        console.log(msg_obj)
        scope.public.customStates.when[msg_obj.nameCamel] = {elements:[], depth: depth}
        scope.$parent.public.customStates.when[msg_obj.nameCamel] = scope.public.customStates.when[msg_obj.nameCamel]
      }
      // console.log('registered', msg_obj.nameCamel, depth);
    }

  }

  function registerFutureMessageUpwards(msg_obj, scope, elem, attr, int_depth) {
    // console.log('registering upwards', int_depth)
    var depthScope = scope;

    for (var i = parseInt(int_depth); i < 0; i++) {
      depthScope = depthScope.$parent;
    }
    var msgName = msg_obj.type;

    if (msg_obj.type in depthScope.states) {
      var typeStates = depthScope.states[msg_obj.type];
      if (typeStates.length) {
        typeStates.forEach(function(state) {
          if (state.nameCamel === msg_obj.nameCamel) {
            parseMessageAndStoreToExecuteLater(depthScope, state, int_depth, depthScope.elem, attr)
            $timeout(function() {
              depthScope.$apply();
            })
          }
          return;
        })
      }
    }
  }

  function registerFutureMessageToSelf(msg_obj, scope, elem, attr) {
    var msgName = msg_obj.type;
    if (msg_obj.type in scope.states) {
      var typeStates = scope.states[msg_obj.type];
      if (typeStates.length) {
        typeStates.forEach(function(state) {
          if (state.nameCamel === msg_obj.nameCamel) {
            parseMessageAndStoreToExecuteLater(scope, state, null, elem, attr)
          }
          return;
        })
      }
    }
    // if (!(msg_obj.camelName in scope.public.customStates.when)) {
    //   scope.public.customStates.when[msg_obj.camelName] = {elements: [], depth: 0};
    // } else {
    //   scope.public.customStates.when[msg_obj.camelName].elements.push({})
    // }
  }

  function registerOutgoingMessageToScope(msg_obj, scope, elem, attr) {
    //outgoing step #2

      var depth = parseDepthString(msg_obj.sendScope.replace('d(', 'depth(')) + '';

      if (['public', 'self', 'siblings'].indexOf(depth) === -1) {
        var intDepth = parseInt(depth);
        if (typeof intDepth === 'number' && intDepth > 0) {
          depth = 'positive';
        } else if (typeof intDepth ==='number' && intDepth < 0) {
          depth = 'negative'
        }
      }



        switch (depth) {
          case('negative'):
            // console.log('case upwards');
            registerFutureMessageUpwards(msg_obj, scope, elem, attr, intDepth)

            break;
          case('siblings'):

            registerFutureMessageToScope(msg_obj, scope)
            break;
          case('self'):

            registerFutureMessageToSelf(msg_obj, scope, elem, attr)
            // registerFutureMessageToScope(msg_obj, scope, 'self')
            break;
          case('public'):

            registerFutureMessageToScope(msg_obj, scope)
            break;
          case('positive'):

            registerFutureMessageToScope(msg_obj, scope, intDepth)
            // registerFutureMessageToScope(msg_obj, scope.public.customStates.when, intDepth)
            break
        }



      function isPublicDepth(depth) {
        return depth === 'public'
      }

  }

  function parseDepthString(depth_str) {


    var specialDepthMappings = {'-':'self', '*':'public', '0': 'siblings', '-0':'siblings', 'parent': -1, 'p': -1, 'grandparent': -2, 'gp': -2}


    if (depth_str in specialDepthMappings) {
      return specialDepthMappings[depth_str]
    } else if (depth_str.indexOf('depth' > -1)) {
      depth_str = depth_str.replace('depth(', '').replace(')', '');
      if (depth_str in specialDepthMappings) {
        return specialDepthMappings[depth_str]
      }
    } else {
      depth_str = '0'
    }
    depthResult = parseInt(depth_str);

    return depth_str
  }

  function precompileSend(states_dict, scope, element, elem_attr) {

      scope.public = {customStates: {when: {}}};
    // }
    if (scope.$parent && scope.$parent.public && scope.$parent.public.customStates.when ) {


      scope.parentInherited = true;
      var keys = Object.keys(scope.$parent.public.customStates.when);
      for (key in scope.$parent.public.customStates.when) {
        if (scope.$parent.public.customStates.when[key].depth >= 0) {
          scope.public.customStates.when[key] = {elements: scope.$parent.public.customStates.when[key].elements};
          scope.public.customStates.when[key].depth = scope.$parent.public.customStates.when[key].depth + 1
        }

      }
    }

    var msgStates = parseStatesForSending(states_dict, scope);
    scope.outgoing_parsed = [];
    //outgoing step #1
    msgStates.outgoing.forEach(function(o_state) {
      o_state.parsedMsgArr = parseStateMsgContents(o_state.actions.send);
      o_state.parsedMsgArr.forEach(function(msg_obj, i) {
        scope.outgoing_parsed.push(msg_obj.nameCamel)
        // console.log('registering message contents', msg_obj.nameCamel, 'from', o_state.nameCamel)
        registerOutgoingMessageToScope(msg_obj, scope, element, elem_attr);

      });
    })


    msgStates.incoming.forEach(function(i_state) {
      // console.log(i_state)
      if (i_state.actions.send && !i_state.parsedObj) {
        i_state.parsedObj = parseStateMsgContents(i_state.actions.send)
      }
      var expectedDepth;
      if (i_state.parsedObj) {
        expectedDepth = parseDepthString(i_state.parsedObj[0].sendScope);
      }
      if (i_state.nameCamel in scope.$parent.public.customStates.when && scope.$parent.public.customStates.when[i_state.nameCamel].siblings) {
        parseMessageAndStoreToExecuteLater(scope, i_state, scope.$parent.public.customStates.when[i_state.nameCamel].depth - 0.5, element, elem_attr)
      }
      parseMessageAndStoreToExecuteLater(scope, i_state, expectedDepth, element, elem_attr)


    })
    return

  }

  function parseStatesForSending(states, scope) {
    var resultDict = {outgoing:[], incoming: []};
    for (state_type in states) {
      states[state_type].forEach(function(state) {
        if (typeof state.name === 'object') {
          state.name = [state.type, state.name].join('-');
          state.nameCamel = RootService.camelCase(state.name)
        }

        if (state_type === 'when') {
          resultDict.incoming.push(state);
        }
        if (state.actions && state.actions.send) {

          if (state.actions.send.parsed.indexOf('}}') > -1) {
            repairSendStateName(scope, state, state.actions.send.parsed)
          }
          resultDict.outgoing.push(state);

        }
      })
      // parseOutgoing();
    }


    function repairSendStateName(scope, state, name) {
      state.actions.send.parsed = $parse('"' + name.replace('{{', '"+').replace('}}', '+"') + '"')(scope)
      state.actions.send.raw = $parse('"' + name.replace('{{', '"+').replace('}}', '+"') + '"')(scope);
      if (state.actions.send.delays.internal) {
        for (key in state.actions.send.delays.internal) {
          if (key.indexOf('{{') > -1) {
            var value = state.actions.send.delays.internal[key];
            var tempKey = key + '';
            key = '"' + key.replace('{{', '"+').replace('}}', '+"') + '"'
            var newKeyName = $parse(key)(scope);
            state.actions.send.delays.internal[newKeyName] = value;
            delete state.actions.send.delays.internal[tempKey];

          }
        }
      }
    }
    return resultDict;
  }

  function execSingleMsgArg(scope, element_arr, options, depth) {

    var depthMappings = {'depth(*)': -1}
    var total_delay = options.delay || 0
    var stagger_delay = 0;
    var final_depth = options.sendScope in depthMappings && depthMappings[options.sendScope] || 0;

    element_arr.forEach(function(state_ref, i) {
      if (options.stagger && options.stagger.delays.length) {
        stagger_delay = options.stagger.delays[i]
      }

      state_ref.func(state_ref.actions, scope, total_delay + stagger_delay, final_depth);
    })

  }

  function processStaggerDelayedMessages(stagger_info, item_count) {
    // console.log('processing', stagger_info, item_count)
    var tempDuration = item_count * (1000/60.0);
    var duration = stagger_info.duration

    var values = TweenService.preComputeValues("send", tempDuration, {send: 0}, {send:1}, stagger_info.ease, stagger_info.delays, 60).cache;

    stagger_info.delays = values.slice(0, values.length - 2);
    stagger_info.delays.forEach(function(delay_val, i) {
      stagger_info.delays[i] = stagger_info.delays[i] * duration;
    })
    return stagger_info
  }

  function execSendArgs(element, scope, messages, delay_dict, shortcuts, context) {


        var msgArr = parseStateMsgContents({parsed:messages, delays:delay_dict}) || [];

        msgArr.forEach(function(msg_info, i) {
          var staggerExists = false;



          // console.log(msg_info.name, msg_info.nameCamel, msg_info)



          var statesToExecute = [];

          //public scope
          if (scope.root && msg_info.nameCamel in scope.root.scope.public.customStates.when && msg_info.sendScope === 'depth(*)') {

              var currentMsgContext = scope.root.scope.public.customStates.when[msg_info.nameCamel];


              var numChildren = currentMsgContext.elements.length;
              if ('stagger' in delay_dict.internal &&  msg_info.name in delay_dict.internal.stagger) {
                var staggerDetails = delay_dict.internal.stagger[msg_info.name];
                staggerExists = true;
                delay_dict.internal.stagger[msg_info.name] = processStaggerDelayedMessages(staggerDetails,numChildren)
                msg_info.stagger = delay_dict.internal.stagger[msg_info.name]
              }

              if (currentMsgContext.elements.length) {

                execSingleMsgArg(scope, currentMsgContext.elements, msg_info)
              }
          } else {

              var currentMsgContext = scope.public.customStates.when[msg_info.nameCamel] || scope.$parent.public.customStates.when[msg_info.nameCamel];
              // console.log('entering local scope', currentMsgContext)
              //if elements exists
              if (currentMsgContext && currentMsgContext.elements) {
                  var numChildren = currentMsgContext.elements.length;



                  var depthParsed = parseDepthString(msg_info.sendScope)
                  var depthNum = parseInt(depthParsed);
                  // console.log(msg_info.name, depthParsed, depthNum, 'depthNumType:', typeof depthNum)


                  //self
                  if (depthParsed === 'self') {
                    if (currentMsgContext.elements && currentMsgContext.elements.length) {
                      currentMsgContext.depth = 'self';
                      execSingleMsgArg(scope, currentMsgContext.elements, msg_info)
                    }
                  }

                  //siblings
                  else if (depthParsed === 'siblings') {
                    var elements = [];

                    var intendedDepth = scope.$parent.public.customStates.when[msg_info.nameCamel].depth + 0.5;

                    currentMsgContext.elements.forEach(function(elem_info) {
                      if (elem_info.depth === intendedDepth && element[0].parentNode === elem_info.elem.parentNode) {

                        if (msg_info.sendScope === 'depth(0)' || element[0] !== elem_info.elem) {
                          elements.push(elem_info)
                        }
                      }
                    })

                    if (elements.length !== currentMsgContext.elements.length) {
                      currentMsgContext = {elements: elements, depth: currentMsgContext.depth, options: currentMsgContext.options};
                    }
                    var numChildren = currentMsgContext.elements.length;
                    if ('stagger' in delay_dict.internal && msg_info.name in delay_dict.internal.stagger) {

                      var staggerDetails = delay_dict.internal.stagger[msg_info.name];

                      staggerExists = true;
                      if (msg_info.name) {
                        delay_dict.internal.stagger[msg_info.name] = processStaggerDelayedMessages(staggerDetails,numChildren)

                        msg_info.stagger = delay_dict.internal.stagger[msg_info.name]
                      }
                    }
                    execSingleMsgArg(scope, currentMsgContext.elements, msg_info)
                  }

                //depthNum > 0
              else
                if (typeof depthNum === "number" && depthNum > 0) {

                  var elements = [];
                  currentMsgContext.elements.forEach(function(elem_info) {

                    if (elem_info.depth && !msg_info.greaterThan && !msg_info.lessThan && elem_info.depth === depthNum) {
                      elements.push(elem_info);
                    } else if (msg_info.greaterThan && elem_info.depth >= depthNum) {
                      // console.log(elem_info, depthNum, elem_info.depth, msg_info.greaterThan)
                      elements.push(elem_info);
                    } else if (msg_info.lessThan && elem_info.depth <= depthNum) {
                      elements.push(elem_info);
                    }

                  })


                  if (elements.length !== currentMsgContext.elements.length) {
                    currentMsgContext = {elements: elements, depth: currentMsgContext.depth, options: currentMsgContext.options};
                  }
                  // console.log(elements.length, currentMsgContext)
                  var numChildren = currentMsgContext.elements.length
                  if ('stagger' in delay_dict.internal && msg_info.name in delay_dict.internal.stagger) {

                    var staggerDetails = delay_dict.internal.stagger[msg_info.name];
                    staggerExists = true;
                    if (msg_info.name && msg_info.name.length) {
                      delay_dict.internal.stagger[msg_info.name] = processStaggerDelayedMessages(staggerDetails,numChildren)
                      msg_info.stagger = delay_dict.internal.stagger[msg_info.name]
                    }



                  }

                  execSingleMsgArg(scope, currentMsgContext.elements, msg_info)
              } else if (typeof depthNum === "number" && depthNum < 0) {
                var depthScope = scope;
                for (var i = depthNum; i < 0; i++) {
                  depthScope = depthScope.$parent;
                }
                if (msg_info.nameCamel in depthScope.public.customStates.when) {
                  var depthScopeElems = depthScope.public.customStates.when[msg_info.nameCamel].elements;
                  var elements = [];
                  depthScopeElems.forEach(function(state_ref) {

                    if (state_ref.depth === depthNum) {
                      elements.push(state_ref);
                    }
                  })
                  if (elements.length) {
                    currentMsgContext = {elements: elements, depth: depthNum, options:currentMsgContext.options};
                  }

                  execSingleMsgArg(depthScope, currentMsgContext.elements, msg_info)
                  // console.log(dept)
                }

                // console.log(scope.$parent.public.customStates.when)
                // if (msg_info.type in depthScope.states) {
                //   var typeStates = depthScope.states[msg_info.type];
                //   if (typeStates.length) {
                //     typeStates.forEach(function(state) {
                //       if (state.nameCamel === msg_info.nameCamel) {
                //         console.log(state)
                //       }
                //     })
                //   }
                // }

                // execSingleMsgArg(scope, currentMsgContext.elements, msg_info)
              }

            }
          }

        })
        return;
        messages = messages.trim();
        delay_dict = delay_dict || {internal: {}, external:0}

        if (messages.indexOf('{{') > -1) {
          var messagesParsed = [];
          messages.split(',').slice().forEach(function(msg) {
            messagesParsed.push( $parse('"' + messages.replace('{{', '"+').replace('}}', '+"') + '"')(scope))
          })
          messages = messagesParsed.join(",")
        }
        console.log('sending', messages)
        messages.split(',').forEach(function(msg, i) {
          if (!shortcuts.cmds) {
            shortcuts.cmds = RootService.animations.customShortcuts.cmds;
          }

          if (msg in shortcuts.cmds) {
            msg = shortcuts.cmds[msg];
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

          var camelName = RootService.camelCase(fullMsgName.replace('when-', ''));
          if (msgScope === 'parent') {
            msgScope = 'depth(-1)'
          }
          if (msgScope === 'self') {

            if (['on', 'init', 'when'].indexOf(msgType) > -1) {
              console.log('waiting total', totalMsgDelay, delay_dict)
              $timeout(function() {
                console.log('activating', camelName, fullMsgName, scope.public.customStates.when)
                fullMsgName = fullMsgName.replace('when-', '');

                SendService.sendMsgToSelf(element, scope, fullMsgName.split('-').slice(1)[0], msgType, RootService.camelCase(fullMsgName))
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
          else if (['children', 'grandchildren', 'siblings'].indexOf(msgScope) > -1 || msgScope.indexOf('depth') > -1) {
            var depthLevel;
            var depthScope = scope;
            var isInclusive = msgScope.indexOf('>') > -1 || msgScope.indexOf('<') > -1 || false;

            if (isInclusive) {
              msgScope = msgScope.replace('>', '').replace('<', '')
            }
            //also make sure it gets sent to self
            if (msgScope === 'depth(0)') {
              applySendArgsAndCallback(element, scope, msg.replace('depth(0)', 'self'), delay_dict);
              msgScope = 'siblings'
            }
            if (msgScope === 'depth(-0)') {
              msgScope = 'siblings'
            }
            var depthShortcutDict = {children: 1, grandchildren:2, siblings:0.5, parent: -1, "depth(-0)": 0.5, "depth(0)": 0.5, "depth(>0)": 1};
            if (msgScope in depthShortcutDict) {
              depthLevel = {num: depthShortcutDict[msgScope], inclusive: false};
            }
            else if (msgScope.indexOf('depth') > -1) {
              var depthNum = msgScope.split('(')[1].replace(')', '') || '0';
              if (depthNum) {
                depthNum = parseInt(depthNum)
              }
              depthLevel = {num: depthNum, inclusive: isInclusive}
            }


            if (!depthLevel) {
               depthLevel = {num: 0, inclusive:false};
            }

            if (depthLevel.num < 0) {
              for (var i = depthLevel.num; i < 0; i++) {
                depthScope = depthScope.$parent;
              }
              depthLevel.num = 0;
            }

            var stateRefs = depthScope.public.customStates.when[camelName];
            console.log(stateRefs, camelName, depthLevel, depthScope.public.customStates, element)
            if (msgScope === 'siblings' && (!stateRefs || !stateRefs.length)) {
              stateRefs = scope.$parent.public.customStates.when[camelName];
            } else if (!stateRefs || !camelName in depthScope.public.customStates.when) {
              if (msgType === 'when') {

                var dashedName = [msgType, msgName].join('-')
                stateRefs = {elements: depthScope.public.customStates[dashedName]}
              }
            }

            if (delay_dict.internal && delay_dict.internal.stagger) {

              var duration = delay_dict.internal.stagger.duration;
              var easeFunc = delay_dict.internal.stagger.ease;
              var numChildren = stateRefs.elements.length;

              var tempDuration = numChildren * (1000/60.0);

              var values = TweenService.preComputeValues("send", tempDuration, {send: 0}, {send:1}, easeFunc, delay_dict.internal.stagger.delays, 60).cache;

              delay_dict.internal.stagger.delays = values.slice(0, values.length - 2);
              delay_dict.internal.stagger.delays.forEach(function(delay_val, i) {
                delay_dict.internal.stagger.delays[i] = delay_dict.internal.stagger.delays[i] * duration;
              })
            }


            if (!stateRefs.length && msgType === 'when' && msgName.length) {
              // console.log(UtilitiesService[msgType, msgName].join('-'))
              // console.log(depthScope.public.customStates.when, camelName)
              console.log(depthScope.public, scope.public)
            }
            // depthLevel.num += 1
            // console.log(depthLevel.num)
            stateRefs.elements.forEach(function(stateRef, i) {

              var stagger_delay = 0;
              if (delay_dict.internal && delay_dict.internal.stagger && delay_dict.internal.stagger.delays) {
                stagger_delay = delay_dict.internal.stagger.delays[i];
              }
              // if (stateRef.actions.send) {
              //                 stateRef.actions.send.parsed.split(',').forEach(function(message_str, i) {
              //                   var msgNameCamel = UtilitiesService.camelCase(message_str.split(':')[0]);
              //                   SendService.prepareToSendMessage(msgNameCamel, message_str, depthScope);
              //                 })
              //           }
              if (stateRef.actions && Object.keys(stateRef.actions).length) {
                $timeout(function() {

                      stateRef.func && stateRef.func(stateRef.actions, depthScope || scope, stagger_delay, depthLevel);
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
                    // if (stateRef.actions.send) {
                    //           stateRef.actions.send.parsed.split(',').forEach(function(message_str, i) {
                    //             var msgNameCamel = UtilitiesService.camelCase(message_str.split(':')[0]);
                    //             SendService.prepareToSendMessage(msgNameCamel, message_str, scope);
                    //           })
                    //     }

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
                    // if (stateRef.actions.send) {
                    //           stateRef.actions.send.parsed.split(',').forEach(function(message_str, i) {
                    //             var msgNameCamel = UtilitiesService.camelCase(message_str.split(':')[0]);
                    //             SendService.prepareToSendMessage(msgNameCamel, message_str, scope);
                    //           })
                    //     }

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
            if (!stateRefs) {
              stateRefs = scope.root.scope.public.customStates['when-' + msgName]
              // console.log(scope.root.scope.public.customStates, msgName)
            }
            stateRefs.forEach(function(stateRef, i) {
              if (stateRef.actions && Object.keys(stateRef.actions).length) {

                if (stateRef.actions.send) {
                      console.log('detected', stateRef.actions.send.parsed)
                       // if (stateRef.actions.send) {
                       //        stateRef.actions.send.parsed.split(',').forEach(function(message_str, i) {
                       //          var msgNameCamel = UtilitiesService.camelCase(message_str.split(':')[0]);
                       //          // var options = ;
                       //          // console.log(options)
                       //          SendService.prepareToSendMessage(msgNameCamel, message_str, scope, options);
                       //        })
                       //  }
                  }

                $timeout(function() {
                  console.log(stateRef)
                      stateRef.func && stateRef.func(stateRef.actions, scope);
                }, totalMsgDelay);


              }
            })
          }
        })
      }

  function parseDepth(depth_str) {
    var depth_str = depth_str && depth_str.replace('depth(', '').replace(')', '') || 'depth(1)';
    var inclusive = (depth_str.indexOf('>') > -1) || (depth_str.indexOf('<') > -1)
    if (inclusive) {
      depth_str = depth_str.replace('<', '').replace('>', '')
    }
    var result = {num: 0, inclusive: false};
    console.log(depth_str, parseInt(depth_str))
    result.num = parseFloat(depth_str);
    result.inclusive = inclusive || false;
    return result
  }

  function prepareToSendMessage(msg_name, msg_str, scope, options) {
    if (msg_str.indexOf('{{') > -1) {
      var messagesParsed = [];
      msg_str.split(',').slice().forEach(function(msg) {
        messagesParsed.push( $parse('"' + msg_str.replace('{{', '"+').replace('}}', '+"') + '"')(scope))
      })
      msg_str = messagesParsed.join(",");
      msg_name = msg_str.split(':')[0]
    }
    // console.log('attempting to pre-compile message', msg_name, msg_str)
    scope.public.customStates.when[msg_name] = {elements: [], depth: 0};
    var msg_scope = msg_str.split(':')[1];

    // console.log('attempting to precompile',msg_name, msg_scope, msg_str, scope.public.customStates.when)
    if (msg_scope === 'siblings' || msg_scope ==='depth(-0)' || msg_scope === 'depth(0)') {
      if (!scope.$parent.public) {
        scope.$parent.public = {customStates: {when: {}}};
      }
      scope.public.customStates.when[msg_name].depth = -0.5;
      scope.$parent.public.customStates.when[msg_name] = {elements: [], depth: -0.5};
      $timeout(function() {
        scope.$apply();
      })
    } else if (msg_scope !== 'self'){
      if (scope.public.customStates && scope.public.customStates.when) {
        // console.log(msg_name, msg_scope, scope.public.customStates.when.startCounter)
        if (!(msg_name in scope.public.customStates.when)) {
          scope.public.customStates.when[msg_name] = {depth: 0, elements: []}
        }
        // if (!scope.public.customStates.when.elements.length) {
        //   scope.public.customStates.when = {depth: 0, elements: []}
        //   // scope.public.customStates.when.elements.push(options.metadata)
        // }
        // console.log(options)

      }
    }

  }

  function sendMsgToSelf(element, scope, state_ref, msg_type, full_msg) {
    msg_type = msg_type.trim();
    state_ref = state_ref.trim();
    console.log(state_ref, msg_type)
    if (['with', 'init', 'as'].indexOf(state_ref) > -1 || msg_type === 'when') {

      // if (state_ref && state_ref.length && typeof) {``

      //   internal_name = state_ref[0];
      // }
      var internal_name = state_ref;
      console.log(scope.states[msg_type])
      if (scope.states[msg_type] && scope.states[msg_type].length) {
        scope.states[msg_type].forEach(function(state, i) {

          if (state.name.indexOf(state_ref) > -1 || msg_type === 'when') {
            state.exec(element, scope, null);
          }
          // if (on_state.name && on_state.name.indexOf())
        })
      } else if (scope.public.customStates.when && full_msg in scope.public.customStates.when) {
        var stateRef = scope.public.customStates.when[full_msg];
        // stateRef.elements && stateRef.elements.forEach(function(state, elem) {

        // })
        stateRef.elements.forEach(function(state, i) {
          if (state.func) {
            console.log(state)
            state.func(state.actions.send, scope.$parent)
          }
        })
        console.log()
        // console.log('attempting to activate message to self', scope.public.customStates.when, state_ref)
      }
    }
  }
}
