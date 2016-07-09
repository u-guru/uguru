angular.module('uguru.shared.services')
.factory("DirectiveService", [
    '$ionicViewSwitcher',
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    DirectiveService
        ]);

function DirectiveService($ionicViewSwitcher, $timeout, $state, UtilitiesService, AnimationService) {
    var argNames = ['prop', 'anim', 'send', 'tween', 'class', 'trigger'];
    var argShortNames = ['p', 'a', 's', 't', 'c', 't'];
    var cssPropertyMappings = {
      'o': 'opacity',
    }
    var defaultArgProps = ['delay', 'send', 'post', 'trigger'];
    var defaults = {
      activate: {hover: 250}
    }
    return {
        // slide: slide,
        parseArgs: parseArgs,
        activateArg: activateArg,
        supportedCommands: argNames,
        parseCustomStateAttr: parseCustomStateAttr,
        detectExternalStates: detectExternalStates,
        initCustomStateWatcher: initCustomStateWatcher,
        defaults: defaults
    }

    function initCustomStateWatcher(scope, element, type, args, attr_value) {
      if (!(type in scope.root.public.customStates)) {
              scope.root.public.customStates[type] = {};
      }
      var watchState = 'root.public.customStates.' + type + '.' + args.camel;

      scope.$watch(watchState, function(new_value, old_value) {
        if (new_value) {
          // console.log(type, args, attr_value, 'activated');
          var elemArgs = parseArgs(attr_value);
          for (key in elemArgs) {
            if ((argNames || supportedCommands).indexOf(key) > -1) {
              activateArg(key, elemArgs[key], scope, element);
            }
          }
        }
      })
    }

    function detectExternalStates(attr_dict) {
      var resultArr = [];
      var supportedExternalStates = ['when', 'as'];
      for (attr in attr_dict) {
        for (var i = 0; i < supportedExternalStates.length; i++) {
          var indexSupportState = supportedExternalStates[i] + '-';
          var dashedAttr = UtilitiesService.camelToDash(attr).toLowerCase();
          if (dashedAttr.indexOf(indexSupportState) > -1) {
            resultArr.push({type: indexSupportState.replace('-', ''), attr: {camel: attr, dashed: dashedAttr}})
          }
        }
      }
      return resultArr
    }

    function parseCustomStateAttr(attr) {
      var customStateDict = {}
      if ('when' in attr) {
        customStateDict.when = [];
        var whenAttr = attr.when;
        var whenAttrArr = whenAttr.split(',');
        for (var i = 0; i < whenAttrArr.length; i++) {
          var indexWhenAttr = whenAttrArr[i];
          customStateDict.when.push('when-' + indexWhenAttr);
        }
      }
      return customStateDict;
    }

    function parseArgs(string_args) {
      string_args = UtilitiesService.replaceAll(string_args, ', ',  ',');
      string_args = UtilitiesService.replaceAll(string_args, '| ',  '| ');
      string_args = UtilitiesService.replaceAll(string_args, ' | ',  ' | ');
      var argArr = string_args.split('|');
      var processedArgResults = argArr && processArgArr(argArr);
      var processedArgDict = {};
      for (secondary_arg in processedArgResults) {
        var _type = processedArgResults[secondary_arg].type;
        var _value = processedArgResults[secondary_arg].value;
        processedArgResults[secondary_arg] = processSecondaryArgsByType(_type, _value);
        processedArgDict[_type] = processedArgResults[secondary_arg];
      }
      return processedArgDict;

    }

    function processArgArr(arg_arr) {
      //trim extra space
      var resultArr = [];
      arg_arr.forEach(function(item) {item.trim()});
      for (var i = 0; i < arg_arr.length; i++) {
        var indexArg = arg_arr[i];
        var indexSupportedArg = getSupportedArg(indexArg);
        if (indexSupportedArg) {
          resultArr.push(indexSupportedArg);
        }
      }
      return resultArr;
    }

    function activateArg(arg_type, arg_dict, scope, elem) {
      switch(arg_type) {
        case("prop"):
          evalPropertyArgs(arg_dict, scope, elem);
          break;
        case("class"):
          evalClassArgs(arg_dict, scope, elem);
          break
        case("send"):
          evalSendArgs(arg_dict, scope, elem);
          break;
        case("anim"):
          evalAnimArgs(arg_dict, scope, elem);
          break;
        case("trigger"):
          evalTriggerArgs(arg_dict, scope, elem);
          break
      }
    }

    function processSecondaryArgsByType(type, string_args) {
      switch(type) {

        case ("prop"):
          return formatAndProcessArgs(type, string_args, {properties:[]}, 'properties', processCSSPropValue, ['transition']);
          break;

        case ("class"):
          return formatAndProcessArgs(type, string_args, {classes:[]}, 'classes', processClassSecondaryArgs, ['add', 'remove']);
          break;

        case ("send"):
          return formatAndProcessArgs(type, string_args, {messages:[]}, 'messages', processSendSecondaryArgs, ['public', 'children']);
          break;

        case ("anim"):
          return formatAndProcessArgs(type, string_args, {animations:[]}, 'animations', processAnimSecondaryArgs, ['type', 'force']);
          break;

        case ("tween"):
          return formatTweenArgs(string_args);
          break;

        case ("trigger"):
          return formatAndProcessArgs(type, string_args, {states:[]}, 'states', processTriggerSecondaryArgs, ['state'])
      }

      function processAnimSecondaryArgs(msg_name, arg) {
        if (!arg) {
          arg = 'obj';
        }
        return arg
      }

      function processTriggerSecondaryArgs(trigger_name, arg) {
        if (!arg) {
          arg = 'self'
        }
        return arg.trim();
      }

      function processSendSecondaryArgs(msg_name, arg) {

        return arg.trim();
      }

      function processClassSecondaryArgs(class_name, arg) {
        class_name = class_name.trim();
        arg = arg.trim();
        console.log(class_name, arg)
        return arg;
      }

      function processCSSPropValue(name, value) {
        name = name.trim();
        value = value.trim();
        var propertiesToConvertInt = ['opacity', 'z-index'];
        if (propertiesToConvertInt.indexOf(name) > -1 && typeof(name) === 'string') {
          if (value.indexOf('.') > -1) {
            return parseFloat(value);
          } else {
            return parseInt(value);
          }
        }
        return value
      }

    }




    //todo modularize
    function formatAndProcessArgs(type, string_args, base_dict, base_dict_key, custom_func, custom_args) {
      var propDict = base_dict
      propDict.type = type;
      var generalArgs = '';
      if (isFirstArgAnArr(string_args)) {
        //array case
        var stringPropArgs = processStrArrToObj(string_args);

        for (var i = 0; i < stringPropArgs.length; i++) {
          var parsedPropDict = {};

          var kvPairSplit = stringPropArgs[i].split(':');
          var key = kvPairSplit[0];
          var value = kvPairSplit[1];

          parsedPropDict[key] = custom_func(key, value);

          (kvPairSplit.length > 2) && processGeneralArgsArray(type, kvPairSplit.splice(2), parsedPropDict, custom_args);

          propDict[base_dict_key].push(parsedPropDict);
        }
      }
      //parseGeneralArgs
      processGeneralArgs(type, string_args, propDict, custom_args);
      return propDict

    }

    function processGeneralArgs(type,string_args, prop_dict, custom_args) {
      var propDict = prop_dict;//lazy cutnpaste
      var generalArgs = string_args.substring(string_args.indexOf(']') + 1).split(':').filter(function(a) {return a.length});
      if (generalArgs && generalArgs.length) {
        var processedGeneralArgs = processGeneralArgsArray(type, generalArgs, prop_dict, custom_args);
        if (processedGeneralArgs) {
          for (g_arg in processedGeneralArgs) {
            propDict[g_arg] = processedGeneralArgs[g_arg];
          }
        }
      }
    }

    function isFirstArgAnArr(string_args) {
      return string_args[0] === '['
    }

    function processStrArrToObj(string_args) {
      var propArrEndIndex = string_args.indexOf(']');
      var stringPropArgs = string_args.substring(1, propArrEndIndex).split(',');
      return stringPropArgs;
    }

    function processGeneralArgsArray(type, arg_arr, result_dict, custom_args) {
      var resultDict = result_dict || {};
      for (var i = 0; i < arg_arr.length; i++) {
        var indexArg = arg_arr[i];
        if (indexArg && indexArg.length) {
          indexArg.trim();
          if (indexArg.indexOf('delay-') > -1) {
            indexArg = indexArg.replace('delay-', '');
            resultDict.delay = parseInt(indexArg);
          }
        }
      }
      if (Object.keys(resultDict).length) {
        return resultDict;
      }
      return
    }


    function formatSendArgs(string_args, support_args) {

    }

    function formatAnimArgs(string_args, support_args) {

    }

    function formatTweenArgs(string_args, support_args) {

    }

    function evalTriggerArgs(arg_dict, scope, elem) {
      // console.log('should be evaluating trigger', arg_dict, scope, elem);
      if (arg_dict.delay) {
        $timeout(function() {
          processTriggerArr(arg_dict.states, scope, elem);
        })
      } else {
          processTriggerArr(arg_dict.states, scope, elem);
      }
    }

    function processTriggerArr(state_arr, scope, elem) {
      for (var i = 0; i < state_arr.length; i++) {
        var indexStateObj = state_arr[i];
        var delay = indexStateObj.delay || 0;
        delete indexStateObj['delay'];
        var stateName = Object.keys(indexStateObj)[0];
        var stateScope = indexStateObj[stateName];
        triggerStateWithinScope(stateName, stateScope, delay, scope, elem);
        // sendMessageWithinScope(formatMessage(messageName), messageScope, delay, scope, elem)
      }

      function triggerStateWithinScope(stateName, stateScope, delay, scope, elem) {
        if (delay) {
          $timeout(function() {
            dispatchTrigger(stateName, stateScope, elem);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          dispatchTrigger(stateName, stateScope, elem);

          $timeout(function() {
              scope.$apply();
          })
        }

        function dispatchTrigger(trig_name, trigger_scope, elem) {
          if (trigger_scope === 'self') {
            // console.log('dispatching', trig_name, 'on self');
            elem[0].classList.add(trig_name);
          }
        }
     }
  }

    function evalSendArgs(arg_dict, scope, elem) {
      if (arg_dict.delay) {
        $timeout(function() {
          processMessagesArr(arg_dict.messages, scope, elem);
        })
      } else {
        processMessageArr(arg_dict.messages, scope, elem);
      }
    }

    function processMessageArr(message_arr, scope, elem) {
      for (var i = 0; i < message_arr.length; i++) {
        var indexMessageObj = message_arr[i];
        var delay = indexMessageObj.delay || 0;
        delete indexMessageObj['delay'];
        var messageName = Object.keys(indexMessageObj)[0];
        var messageScope = indexMessageObj[messageName];
        sendMessageWithinScope(formatMessage(messageName), messageScope, delay, scope, elem)
      }

      function formatMessage(message_name) {
        return UtilitiesService.camelCase('when-' + message_name);
      }

      function sendMessageWithinScope(msg_name, msg_scope, delay, scope, elem) {
        // console.log('sending..', msg_name, 'with scope', msg_scope, delay, scope.root.public.customStates);
        if (delay) {
          $timeout(function() {
            activateScopedMessageState(msg_name, msg_scope, scope);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          activateScopedMessageState(msg_name, msg_scope, scope);
          $timeout(function() {
              scope.$apply();
          })
        }
        function activateScopedMessageState(msg_name, env, scope) {
          var msgType = UtilitiesService.camelToDash(msg_name).toLowerCase().split('-')[0];
          if (!(msgType in scope.root.public.customStates)) {
            scope.root.public.customStates[msgType] = {};
          }
          scope.root.public.customStates[msgType][msg_name] = true;
        }
      }

    }

    function evalAnimArgs(arg_dict, scope, elem) {
      if (arg_dict.delay) {
        $timeout(function() {
          processAnimArr(arg_dict.animations, scope, elem);
        })
      } else {
        processAnimArr(arg_dict.animations, scope, elem);
      }

      console.log('supposed to be animating', arg_dict.type, 'with', arg_dict.animations.length, 'animation')
    }

    function processAnimArr(anim_arr, scope, elem) {
      for (var i = 0; i < anim_arr.length; i++) {
        var indexAnimObj = anim_arr[i];
        var delay = indexAnimObj.delay || 0;
        delete indexAnimObj['delay'];
        var animName = Object.keys(indexAnimObj)[0];
        var animType = indexAnimObj[animName];
        runOneAnimation(animName, animType, delay, scope, elem);
      }

      function runOneAnimation(anim_name, anim_type, delay, scope, elem) {
        if (animType === 'obj') {
          var animObj = AnimationService.getAnimationObjFromAnimationName(anim_name);
          if (animObj) {
            console.log(animObj, anim_name, anim_type);
            $timeout(function() {
              elem[0].style.opacity = 1;
            })
            AnimationService.animate(elem[0], anim_name, animObj, delay);
          }
          return;
        }
        // if (animType === 'class') {
        //   var animClass = AnimationService.
        // }
      }
    }

    function evalClassArgs(arg_dict, scope, elem) {
      if (arg_dict.delay) {
        $timeout(function() {
          processClassArr(arg_dict.classes, scope, elem);
        })
      } else {
        processClassArr(arg_dict.classes, scope, elem);
      }
    }

    function processClassArr(class_arr, scope, elem) {
      for (var i = 0; i < class_arr.length; i++) {
        var indexClassObj = class_arr[i];
        var delay = indexClassObj.delay || 0;
        delete indexClassObj['delay']
        var actionName = Object.keys(indexClassObj)[0];
        var className = indexClassObj[actionName]
        applyClassActionWithValue(actionName, className, delay, scope, elem);
      }
      function applyClassActionWithValue(actionName, className, delay, scope, elem) {
        if (['add', 'remove'].indexOf(actionName) > -1) {
          if (delay) {
            // console.log(actionName + 'ing class', className, 'after', typeof delay);
            $timeout(function() {
              // console.log(elem[0].classList, className, delay);
              elem[0].classList.add(className);
              scope.$apply();
            }, delay)
          } else {
            elem[0].classList[actionName](className);
            $timeout(function() {
              scope.$apply();
            })
          }
        }
      }
    }

    function evalPropertyArgs(arg_dict, scope, elem) {
      if (arg_dict.delay) {
        $timeout(function() {
          processCSSPropArr(arg_dict.properties, scope, elem);
        }, arg_dict.delay)
      } else {
          processCSSPropArr(arg_dict.properties, scope, elem);
      }
    }

    function processCSSPropArr(prop_arr, scope, elem)  {
      for (var i = 0; i < prop_arr.length; i++) {
        var indexPropDict = prop_arr[i];
        var delay = indexPropDict.delay;
        delete indexPropDict['delay'];
        var propName = Object.keys(indexPropDict)[0];
        var propValue = indexPropDict[propName];
        setCSSProperty(propName, propValue, delay, scope, elem)
      }

      function setCSSProperty(prop, value, delay, scope, elem) {
        if (delay) {
          $timeout(function() {
            elem.css(prop, value);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          elem.css(prop, value);
          $timeout(function() {
              scope.$apply();
          })
        }
      }
    }


    function getSupportedArg(indexArg) {
      if (indexArg && typeof(indexArg) === 'string') {
        indexArg = indexArg.trim();
      }

      var indexArgSplit = indexArg.split(':');
      if (indexArgSplit.length > 1) {
        var argName = indexArgSplit[0];
        var argValues = indexArgSplit.splice(1);
        if (argName.length) {
          var supportedArgIndex = argNames.indexOf(argName);
          var supportedShorthandArgIndex = argShortNames.indexOf(argName);
          if (supportedShorthandArgIndex > -1) {
            argName = argNames[supportedShorthandArgIndex];
            supportedArgIndex = argNames.indexOf(argName);
          }
          if (supportedArgIndex > -1) {
            return {type: argName, value: argValues.join(":")}
          }

        }
      }
    }

}
