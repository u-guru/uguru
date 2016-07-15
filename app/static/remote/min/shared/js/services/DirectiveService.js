angular.module('uguru.shared.services')
.factory("DirectiveService", [
    '$ionicViewSwitcher',
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    'RootService',
    DirectiveService
        ]);

function DirectiveService($ionicViewSwitcher, $timeout, $state, UtilitiesService, AnimationService, RootService) {
    var argNames = ['prop', 'anim', 'send', 'tween', 'class', 'trigger'];
    var argShortNames = ['p', 'a', 's', 't', 'c', 't'];
    var shortcuts;
    var cssPropertyMappings = {
      'o': 'opacity',
    }
    var defaultArgProps = ['delay', 'send', 'post', 'trigger'];
    var defaults = {
      activate: {hover: 250}
    }
    var defaultSecondaryArgs = {
      _class: ['add', 'remove', 'set']
    }
    return {
        // slide: slide,
        parseArgs: parseArgs,
        activateArg: activateArg,
        supportedCommands: argNames,
        sendMessage: sendMessage,
        setShortcutDict: setShortcutDict,
        getShortcuts: getShortcuts,
        getSupportedOnStates: getSupportedOnStates,
        getSupportedAsStates: getSupportedAsStates,
        parseCustomStateAttr: parseCustomStateAttr,
        detectExternalStates: detectExternalStates,
        initCustomStateWatcher: initCustomStateWatcher,
        defaults: defaults
    }

    function setShortcutDict(_shortcuts) {
      shortcuts = _shortcuts
    }

    function sendMessage(scope, arg_type, event_name, attr, message, index) {
      if (!arg_type) arg_type = 'send';
      if (arg_type !== 'send') return;
      if (!arg_type || !arg_type.length || !message || !message.length) return;

      var camelMsg = UtilitiesService.camelCase('when-' + message);
      var dataAttrName = UtilitiesService.camelCase(event_name.toLowerCase() + '-data');
      if (dataAttrName in attr) {
          var sendVars = UtilitiesService.replaceAll(attr[dataAttrName], ' ', '').split(',')
          if (sendVars.length > 1) {
            console.log('send vars', sendVars)
          }
          scope.root.public.customStates['when'][camelMsg] = {};
          for (var i = 0; i < sendVars.length; i++) {
            UtilitiesService.replaceAll(attr[dataAttrName] + "", '_', '-');
            var indexKeyFormatted =  UtilitiesService.camelCase(sendVars[i]);
            scope.root.public.customStates['when'][camelMsg][indexKeyFormatted] = scope.dropdown.options[index][sendVars[i]];
          }
      } else {
          scope.root.public.customStates['when'][camelMsg] =scope.dropdown.options[index][attr[dataAttrName]];
      }
      console.log('sending message', dataAttrName, message, 'with data format', scope.root.public.customStates['when'][camelMsg])
    }

    function getShortcuts() {
      return shortcuts;
    }

    function getSupportedOnStates() {
      return ['on-init', 'on-enter', 'on-exit', 'init-with', 'init-later', 'on-click', 'on-mouse-enter', 'on-mouse-leave']
    }
    function getSupportedAsStates() {
      return ['as-init', 'as-enter', 'as-exit', 'as-init-later', 'as-click', 'as-mouse-enter', 'as-mouse-leave'];
    }

    function getDefaultSecondaryArgs(arg_type) {
      switch (arg_type) {
        case("class"):
          return defaultSecondaryArgs['_class'];
          break
      }
    }

    function initCustomStateWatcher(scope, element, type, args, attr_value) {
      if (!(type in scope.root.public.customStates)) {
              scope.root.public.customStates[type] = {};
      }
      var watchState = 'root.public.customStates.' + type + '.' + args.camel;
      scope.$watch(watchState, function(new_value, old_value) {
        if (new_value) {
          $timeout(function() {
            scope.root.public.customStates[type][args.camel] = false;
          })
          var formattedAttrValue = attr_value + "";
          if (typeof(new_value) === "object") {
            for (objKey in new_value) {
              var formattedObjKey = '^' + objKey;
              if (formattedAttrValue.indexOf(formattedObjKey) > -1) {
                formattedAttrValue = formattedAttrValue.replace(formattedObjKey, new_value[objKey])
              }

            }
          }

          var elemArgs = parseArgs(formattedAttrValue);
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
        var whenAttr = attr.when && attr.when.replace(', ', ',');
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
        processedArgResults[secondary_arg] = processSecondaryArgsByType(_type, _value, processedArgResults[secondary_arg]);
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

          return formatAndProcessArgs(type, string_args, {classes:[]}, 'classes', processClassSecondaryArgs, ['add', 'remove', 'set']);
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

      function processAnimSecondaryArgs(msg_name, arg, prop_dict, orig_str, i) {

        if (!arg || arg.indexOf('set') > -1 || arg.indexOf('delay-') > -1 || arg.indexOf('before') > -1 || arg.indexOf('after') > -1) {
          arg = 'obj';

            prop_dict.custom = orig_str[i].replace(msg_name + ':', '');

        }
        return arg
      }

      function processTriggerSecondaryArgs(trigger_name, arg) {
        if (!arg) {
          arg = 'self'
        }
        return arg.trim();
      }

      function processSendSecondaryArgs(msg_name, arg, prop_dict, orig_str) {
        if (!arg || !arg.length) {
          arg = 'public'
        }
        if (arg.indexOf('delay-') > -1) {
          arg = 'public'
          console.log(prop_dict, orig_str)
        }
        return arg.trim();
      }

      function processClassSecondaryArgs(class_name, arg) {
        class_name = class_name.trim();
        arg = arg.trim();
        return arg;
      }
    }

    function processCSSPropValue(name, value, prop_dict, orig_str) {
      //2nd arg of if --> fill:#;
      if (value && value.indexOf('#') > -1 && value.indexOf('#') > 0) {
        value = value && UtilitiesService.replaceAll(value, '#', ',');
      }
      name = (name && name.trim()) || '';
      value = (value && value.trim()) || '';
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

          parsedPropDict[key] = custom_func(key, value, parsedPropDict, stringPropArgs, i);


          if (kvPairSplit.length > 2) {
            parsedPropDict = processGeneralArgsArray(type, kvPairSplit.splice(2), parsedPropDict, custom_args);
            processCustomArgsArray(type, parsedPropDict, custom_args);
          }
          propDict[base_dict_key].push(parsedPropDict);
        }
      }
      //parseGeneralArgs
      processGeneralArgs(type, string_args, propDict, custom_args);
      return propDict

    }

    function processCustomArgsArray(type, arg_dict, d_custom_args) {
      return arg_dict;
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
      var notProcessed = [];
      for (var i = 0; i < arg_arr.length; i++) {
        var indexArg = arg_arr[i];
        if (indexArg && indexArg.length) {
          indexArg.trim();
          if (indexArg.indexOf('delay-') > -1) {
            indexArg = indexArg.replace('delay-', '');
            resultDict.delay = parseInt(indexArg);
          }
          else {
            notProcessed.push(indexArg);
          }
        }
      }
      if (notProcessed && notProcessed.length && !resultDict.custom) {
        resultDict.custom = notProcessed.join(":");
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
            // elem[0].classList.add(trig_name);
            triggerActionOnElem(trig_name, elem[0]);
          } else if (trigger_scope === 'parent') {
            triggerActionOnElem(trig_name, elem[0].parentNode);
            // elem[0].parentNode.classList.add(trig_name);
          } else if (trigger_scope === 'children') {
            var children = elem[0].children;
            for (var i = 0; i < children.length; i++) {
              var indexChild = children[i];
              indexChild && triggerActionOnElem(trig_name, indexChild)
            }
          } else if (trigger_scope === 'siblings') {

            var siblings = elem[0].parentNode.children;
            for (var i = 0; i < siblings.length; i++) {
              var indexSibling = siblings[i];
              if (indexSibling !== elem[0]) {
                indexSibling && triggerActionOnElem(trig_name, indexSibling);
              }
            }
          }

          function triggerActionOnElem(trig_name, elem) {
            var implementedTriggers = ['on-click', 'on-hover', 'on-mouse-leave', 'on-mouse-enter'];
            if (implementedTriggers.indexOf(trig_name) > -1) {
              angular.element(elem).triggerHandler(trig_name);
            } else {
              elem.classList.add(trig_name);
            }
          }
        }
     }
  }

    function evalSendArgs(arg_dict, scope, elem) {
      if (arg_dict.delay) {
        $timeout(function() {
          console.log('sending w/ delay', arg_dict);
          processMessageArr(arg_dict.messages, scope, elem);
        }, arg_dict.delay)
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
    }

    function processAnimArr(anim_arr, scope, elem) {
      for (var i = 0; i < anim_arr.length; i++) {
        var indexAnimObj = anim_arr[i];
        var delay = indexAnimObj.delay || 0;
        delete indexAnimObj['delay'];

        var custom = indexAnimObj.custom;
        var customDict = {};
        delete indexAnimObj['custom'];
        if (custom) {
          processAnimCustomArgs(custom, customDict);
        }

        var animName = Object.keys(indexAnimObj)[0];
        var animType = indexAnimObj[animName];
        runOneAnimation(animName, animType, delay, scope, elem, customDict);

        if (delay) {
          indexAnimObj['delay'] = delay;
        }
        if (custom) {
          indexAnimObj['custom'] = customDict;
        }

        function processAnimCustomArgs(custom_str, custom_dict) {
          if (typeof custom_str === 'object') {
            return;
          }
          if (custom_str && custom_str.indexOf('set:') > -1) {
            var setString = custom_str + "";
            setString = setString.split('set:(')[1];
            var endParenthesis = setString.indexOf('):') || setString.indexOf('),');
            setString = setString.substring(0, endParenthesis);
            custom_dict.set = processSetExtraArgs(setString);

          }
          if (custom_str &&  custom_str.indexOf(':before') > -1) {
            custom_dict.before = true;
          }
          if (custom_str && custom_str.indexOf(':after') > -1) {
            custom_dict.after = true;
          }
          if (custom_str && custom_str.indexOf(':in') > -1) {
            custom_dict.in = true;
          }
          if (custom_str && custom_str.indexOf(':out') > -1) {
            custom_dict.out = true;
          }
        }
      }

      function runOneAnimation(anim_name, anim_type, delay, scope, elem, custom_args) {
        var animStartCb;
        var animEndCb;
        if (animType === 'obj') {
          var animObj = AnimationService.getAnimationObjFromAnimationName(anim_name);
          if (animObj) {
            if (custom_args.in) {
              animStartCb = function() {
                $timeout(function() {
                  elem[0].style.opacity = 1;
                })
              }
            }
            if (custom_args.out) {
              animStartCb = function() {
                $timeout(function() {
                  elem[0].style.opacity = 0;
                })
              }
            }
            if (custom_args.after) {

              animEndCb = function() {
                var propDict = {properties:custom_args.set};
                evalPropertyArgs(propDict, scope, elem);
                console.log(propDict);
              }
            }

            if (delay) {
              $timeout(function() {
                if (custom_args && custom_args.set && (!custom_args.after || custom_args.before)) {
                  var propDict = {properties:custom_args.set};
                  evalPropertyArgs(propDict, scope, elem);
                }
                execAnimation(elem, anim_name, animObj, delay, animStartCb, animEndCb )
              }, delay)
              return;
            }
            if (custom_args && custom_args.set && (!custom_args.after || custom_args.before)) {
              var propDict = {properties:custom_args.set};
              evalPropertyArgs(propDict, scope, elem);
            }
            execAnimation(elem, anim_name, animObj, delay, animStartCb, animEndCb)
            // AnimationService.animate(elem[0], anim_name, animObj, delay, animStartCb, animEndCb);
          }
          return;
        }
      }

      function execAnimation(elem, anim_name, anim_obj, delay, start_cb, end_cb) {
        var browser_prefix = RootService.getBrowserPrefix();
        if (start_cb) {
          initAndTriggerAndRemoveAnimStartFunc(elem, browser_prefix, start_cb);
        }
        var end_cb = function() {};
        if (end_cb) {
          initAndTriggerAndRemoveAnimEndFunc(elem, browser_prefix, end_cb)
        }
        elem.css('animation-name', anim_name);

      }

      function getAnimEventName(prefix, _type) {
        if (['ms', 'moz', 'webkit', 'o'].indexOf(prefix.toLowerCase()) > -1) {
            return prefix + 'Animation' + _type
        }
        return "animation" + _type.toLowerCase();
      }

      function initAndTriggerAndRemoveAnimStartFunc(elem, browser_prefix, start_cb) {
        var animStartEventName = getAnimEventName(browser_prefix, 'Start');
          var animStartFunc = function(e) {
            start_cb();
            elem[0].removeEventListener(animStartEventName, animStartFunc);
          }
          elem[0].addEventListener(animStartEventName, animStartFunc);
      }

      function initAndTriggerAndRemoveAnimEndFunc(elem, browser_prefix, end_cb) {
        var animEndEventName = getAnimEventName(browser_prefix, 'End');
          var animEndFunc = function(e) {

            end_cb();
            elem[0].removeEventListener(animEndEventName, animEndFunc);
          }
          elem[0].addEventListener(animEndEventName, animEndFunc);
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

        var custom = indexClassObj.custom;
        var customDict = {};
        delete indexClassObj['custom'];
        if (custom) {
          processClassCustomArgs(custom, customDict);
        }

        var className = Object.keys(indexClassObj)[0];
        var actionName = indexClassObj[className]
        applyClassActionWithValue(className, actionName, delay, scope, elem, customDict);
        if (delay) {
          indexClassObj['delay'] = delay;
        }
        if (custom) {
          indexClassObj['custom'] = custom;
        }
      }



      function applyClassActionWithValue(className, actionName, delay, scope, elem, customArgs) {
        var defaultClassArgs = getDefaultSecondaryArgs('class');
        if (defaultClassArgs.indexOf(actionName) > -1) {
          if (delay) {
            // console.log(actionName + 'ing class', className, 'after', typeof delay);
            $timeout(function() {
              // console.log(elem[0].classList, className, delay);
              execClassAction(className, actionName, scope, elem, customArgs);
              scope.$apply();
            }, delay)
          } else {
            execClassAction(className, actionName, scope, elem, customArgs);
            $timeout(function() {
              scope.$apply();
            })
          }
        }

        function execClassAction(class_name, action_name, scope, elem, custom_args) {
          if (custom_args && custom_args.set) {
            var propDict = {properties:custom_args.set};
            evalPropertyArgs(propDict, scope, elem);
          }
          if (action_name === 'add') {
            elem[0].classList.add(class_name);
          } else if (action_name === 'remove') {
            elem[0].classList.remove(class_name);
          }
        }

      }

      function processClassCustomArgs(custom_str, custom_dict) {
        //todo refactor
        if (custom_str.indexOf('set:') > -1) {
          var setString = custom_str + "";
          setString = setString.split('set:(')[1];
          var endParenthesis = setString.indexOf('):') || setString.indexOf('),');
          setString = setString.substring(0, endParenthesis);
          custom_dict.set = processSetExtraArgs(setString);
        }
      }
    }

    function processSetExtraArgs(set_str) {
      if (!(set_str.split('(').length > 1)) {
          set_str = UtilitiesService.removeAllOccurrancesArr(set_str, ['(', ')'])
      }
      set_str = UtilitiesService.replaceAll(set_str, ', ', '');
      set_str = UtilitiesService.replaceAll(set_str, '##', ',');
      var setPropertyArr = set_str.split('#');
      var resultArr = [];
      for (var i = 0; i < setPropertyArr.length; i++)  {
        var setPropIndex = setPropertyArr[i];
        var propDict = {};
        if (setPropIndex.indexOf(':impt') > -1) {
          setPropIndex = setPropIndex.replace(':impt', '');
          propDict.important = true;
        }
        setPropIndexSplit = setPropIndex.split(':');
        if (setPropIndexSplit.length === 2) {
          var name = setPropIndexSplit[0];
          var value = setPropIndexSplit[1]
          propDict[name] = processCSSPropValue(name, value);
        }
        resultArr.push(propDict);
      }
      return resultArr;
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
        if (indexPropDict.custom) {
          processCSSCustomArgs(indexPropDict.custom, indexPropDict);
          delete indexPropDict['custom'];
        }
        var delay = indexPropDict.delay;
        var important = indexPropDict.important || false;
        delete indexPropDict['delay'];
        delete indexPropDict['important'];
        var propName = Object.keys(indexPropDict)[0];
        var propValue = indexPropDict[propName];
        if ((propName && propValue) || (propName && propValue === 0)) {
          setCSSProperty(propName, propValue, delay, important, scope, elem)
        } else {
          console.log('ERROR: css propValue or css propName not defined', propName, propValue, '\nelem:', elem)
        }
        if (delay)  {
          indexPropDict['delay'] = delay;
        }
        if (important) {
          indexPropDict['important'] = important;
        }
      }

      function processCSSCustomArgs(custom_str, indexPropDict) {
        if (custom_str.indexOf('impt') > -1) {
          indexPropDict.important = true;
        }
        console.log(indexPropDict);
      }

      function setCSSProperty(prop, value, delay, impt, scope, elem) {
        if (prop in shortcuts.cssProps) {
          prop = shortcuts.cssProps[prop];
        }
        var priority;
        if (impt) {
          priority = 'important';
        }
        if (delay) {
          $timeout(function() {
            elem.css(prop, value, priority);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          if (!prop && !value) {
            console.log(prop, value, delay, impt, scope, elem);
          }
          // console.log(prop, value);
          elem.css(prop, value, priority);
          $timeout(function() {
              scope.$apply();
          })
        }
      }
    }


    function getSupportedArg(indexArg) {
      if (indexArg && typeof(indexArg) === 'string') {
        indexArg = indexArg.trim();
        if (indexArg in shortcuts.cmds) {
          indexArg = shortcuts.cmds[indexArg]
        }
      }

      var indexArgSplit = indexArg.split(':');
      if (indexArgSplit.length > 1) {
        var argName = indexArgSplit[0];
        var argValues = indexArgSplit.splice(1);
        if (argName.length) {
          if (argName in shortcuts.args) {
            argName = shortcuts.args[argName];
          }
          var supportedArgIndex = argNames.indexOf(argName);
          var supportedShorthandArgIndex = argShortNames.indexOf(argName);
          if (supportedArgIndex > -1) {
            return {type: argName, value: argValues.join(":")}
          }

        }
      }
    }

}
