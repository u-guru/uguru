angular.module('uguru.shared.services')
.factory("DirectiveService", [
    '$ionicViewSwitcher',
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    'RootService',
    'TransformService',
    'PropertyService',
    'TweenService',
    DirectiveService
        ]);

function DirectiveService($ionicViewSwitcher, $timeout, $state, UtilitiesService, AnimationService, RootService, TransformService, PropertyService, TweenService) {
    var argNames = ['prop', 'anim', 'send', 'tween', 'class', 'trigger', 'eval', 'transform', 'ttt'];
    var argShortNames = ['p', 'a', 's', 't', 'c', 't', 'ttt'];
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
        activateArgDelay: activateArgDelay,
        supportedCommands: argNames,
        sendMessage: sendMessageViaDropdown,
        setShortcutDict: setShortcutDict,
        getShortcuts: getShortcuts,
        getSupportedOnStates: getSupportedOnStates,
        getSupportedAsStates: getSupportedAsStates,
        parseCustomStateAttr: parseCustomStateAttr,
        detectExternalStates: detectExternalStates,
        initCustomStateWatcher: initCustomStateWatcher,
        defaults: defaults,
        parseSwitchesAttr: parseSwitchesAttr,
        parseSwitchAttr: parseSwitchAttr,
        processAnimArr: processAnimArr,
        parseAfterArgs: parseAfterArgs,
        processSetExtraArgs: processSetExtraArgs,
        processStaggerArgs: processStaggerArgs,
        verifyStaggerChildSelector: verifyStaggerChildSelector,
        applyMappingDelayFuncToFutureChildren: applyMappingDelayFuncToFutureChildren
    }

    function verifyStaggerChildSelector(constraints, elem) {
      var result = true;
      if (constraints.all) {
        return true;
      } else
      if (constraints.classes && constraints.classes.length) {
        var className = elem.classList.value || elem.className

        constraints.classes.forEach(function(_class, i) {
          if (className.indexOf(_class) === -1) {
            result = false;
          }
        })
      }
      return result;
    }

    function processStaggerArgs(attr_arr) {
      var resultDict = {};
      var attrKeys = Object.keys(attr_arr).filter(function(attr, i) {return attr.indexOf('$') === -1})

      for (var i = 0; i < attrKeys.length; i++) {
        var stateName = attrKeys[i];
        var stateValue = attr_arr[stateName];

        var staggerArgsDict = processStaggerString(stateName, stateValue.split(':'))

        resultDict[stateName] = staggerArgsDict
      }
      // processSelectors(attr_arr)
      return resultDict
    }


    function processStaggerString(state_name, arg_arr) {
      var resultDict = {};
      if (arg_arr.length < 2) {
        if (arg_arr.length === 1 && (arg_arr[0].indexOf('[') > -1 || arg_arr[0].indexOf('+') > -1 || arg_arr[0].indexOf('-') > -1)) {
          arg_arr.unshift('*')
        } else {
          return {}
        }
      }
      resultDict.selector = processSelectors(arg_arr.shift());
      // resultDict.selector =
      // there's a start and end
      resultDict.time = {};
      resultDict.time = processTime(arg_arr.shift(), arg_arr, resultDict, state_name);

      if (arg_arr.length) {
        console.log('easing');
      } else {
        // if (resultDict.time && resultDict.time.values) {
        //   resultDict.easing = 'custom'
        // }
      }
      return resultDict //resultDict
    }
    function applyMappingDelayFuncToFutureChildren(state_name, options) {
      return function(children_arr, time_dict, selector) {
        var childCount = 0;
        for (var i = 0; i < children_arr.length; i++) {
          var iChild = children_arr[i]

          if (iChild.attributes
            && iChild.hasAttribute(UtilitiesService.camelToDash(state_name))
            && verifyStaggerChildSelector(selector || (options && options.selector && options.selector[0]), iChild)) {
            childCount += 1;
          }
        }
        if (!time_dict.delay && time_dict.delay !== 0) {
          time_dict.delay = 0;
        }
        if (time_dict.linearConst && childCount && !time_dict.values.length) {
          for (var i = 0; i < childCount; i++) {
            time_dict.values.push(i*Math.abs(time_dict.linearConst))
          }
        }
        else if (options.easing && options.duration) {
          var resultArr = TweenService.preComputeValues('time', childCount * 16, {'time':0}, {'time': 1},time_dict.options.easing, {}).cache;
          //@jeselle un-comment the line below
          // resultArr = resultArr.slice(1)

          resultArr.forEach(function(val, i) {
            if (val && val >= 0) {
              var value = val * time_dict.options.duration;

              time_dict.values.push(value);
            }
          })
        }


        //ordering
        if (time_dict.order === 'reverse') {
          time_dict.values = time_dict.values.reverse();
        }
        // if (time_dict.)
        // console.log(state_name, order, options)
        // console.log(elem)
      }
    }

    function processTime(arg1, arg_arr, result_dict, state_name) {
      var timeDict = {values:[], formattedValues:[]};
      //
        if (arg1.indexOf('[') > -1) {
          time = UtilitiesService.removeAllOccurrancesArr(arg1, ['[', ']', ' '])
          var time_arr = time.split(', ');
          timeDict.values = time_arr;
        } else
        //easing or there is a delay w/o easing
        if (arg_arr.length === 1) {
           result_dict.duration = arg1;
           var lastArg = arg_arr.shift();
           result_dict.easing = lastArg.replace('-', '').replace('+', '')
           if (TweenService.getAllEasing().indexOf(result_dict.easing) > -1) {

            // result_dict.easing = lastArg;
            result_dict.delay = 0;
            timeDict.values = [];
            if (lastArg.indexOf('-') > -1) {
                timeDict.order = 'reverse';
            }
            else if (lastArg.indexOf('+') > -1) {
                timeDict.order = 'normal';
            }
            else if (lastArg.indexOf('+') === -1 || ((lastArg.indexOf('+') + lastArg.indexOf('-')) === -2)) {
              timeDict.order = 'normal';
            }
            timeDict.options = {
              easing: result_dict.easing,
              duration: result_dict.duration,
              order: timeDict.order,
              selector: result_dict.selector
            }
            timeDict.valueFunc = applyMappingDelayFuncToFutureChildren(state_name, timeDict.options);
          }
        }
        //linear
        else if (!arg_arr.length) {
          result_dict.easing = 'linear';
          result_dict.delay = 0;
          timeDict.linearConst = arg1;
          timeDict.values = [];
          timeDict.valueFunc;
          if (arg1.indexOf('-') > -1) {
            var directionIndex = arg1.indexOf('-');
            if (directionIndex === 0) {
              timeDict.order = 'reverse';
            } else {
              timeDict.order = 'custom';
            }
          } else
          if (arg1.indexOf('+') > -1 || ((arg1.indexOf('+') + arg1.indexOf('-')) === -2)) {
            timeDict.order = 'normal';
          }
          timeDict.options = {
            easing: 'linear',
            order: timeDict.order,
            selector: result_dict.selector
          }
          timeDict.valueFunc = applyMappingDelayFuncToFutureChildren(state_name, timeDict.options);
        }
        // timeDict.formattedValues = [];
        // console.log(timeDict.values);
        // if (timeDict.values && timeDict.values.length) {
        //   timeDict.values.forEach(function(val, i) {

        //     timeDict.values[i] = val
        //     console.log(val)
        //   })
        // }

      return timeDict
    }

    function processSelectors(selector) {
      var resultArr = []
      selectors = selector.split(', ');
      for (var i = 0; i < selectors.length; i++) {

        resultArr.push(processOneSelector(selectors[i]))


      }
      return resultArr

      function processOneSelector(str) {
        resultDict = {};
        if (str === '*') {
          resultDict.all = true;
          resultDict.str = str;
          return resultDict
        }
        if (str.indexOf('.') > -1) {
          classSplit = str.split('.').filter(function(str, i) {return str && str.length});
          var classArr = [];
          classSplit.forEach(function(c, i) {
            if (c[0] === '[') {
              c = c.split(']')[1];
            }
            if (c.indexOf('[') > -1) {
              c = c.split('[')[0]
            }
            c && c.length && classArr.push(c.trim())
          })
          if (classArr.length) {
            resultDict.classes = classArr
          }
        }
        if (str.indexOf('[') > -1) {
          attrSplit = str.split('[').filter(function(_str,i) {return str && _str.indexOf(']') > -1})
          var attrArr = [];
          attrSplit.forEach(function(attr, i) {
            if (attr.indexOf(']') > -1) {
              attr = attr.split(']')[0]
              attrArr.push(attr.trim())
            }
          })
          if (attrArr.length) {
            resultDict.attrs = attrArr
          }
          // console.log(attrSplit)
        }
        return resultDict
      }
    }
    function parseSwitchAttr(scope, element, attr) {
      if (attr && attr.switch) {
        console.log(attr.switch);
        var switch_arr_str = attr.switch.split('|');
        var switchObj = {};
        for (var i = 0; i < switch_arr_str.length; i++) {
          var indexSwitchStr = switch_arr_str[0];
          var indexSwitchSplit = indexSwitchStr.split(':')

          var switchName = indexSwitchSplit[0];
          switchObj.name = switchName;
          switchObj.active = false;
          if (indexSwitchSplit.length > 1) {
            var switchValue = indexSwitchSplit.splice(1);
          }
        }
        return switchObj;
      }
    }
    function parseSwitchesAttr(scope, element, attr) {
      if (!('switches' in attr)) return;
      var switches_str = attr.switches
      var switches_arr_str = attr.switches.split('|')
      var switch_objs = [];
      if (switches_arr_str.length >= 1) {
        for (var i = 0; i < switches_arr_str.length; i++) {
          var indexSwitchStr = switches_arr_str[i];
          var indexSwitchObj = parseSwitchStrToObj(indexSwitchStr)
          if (indexSwitchObj) {
            switch_objs.push(indexSwitchObj)
          }
        }
      }
      return switch_objs;
      function parseSwitchStrToObj(switch_str) {
        resultObj = {};
        var switch_str_split = switch_str.split(':');
        if (switch_str_split.length > 1) {
          var name = switch_str_split[0];
          var value = switch_str_split.splice(1).join(":")
          if (value.indexOf(']') > -1 && value.indexOf('[') > -1) {
            value = UtilitiesService.removeAllOccurrancesArr(value, ['[', ']']);
            if (value.indexOf(', ') > -1) UtilitiesService.replaceAll(value, ', ', ',');
            value = value.split(',')
            for (var i = 0; i < value.length; i++) {
              var indexVal = value[i];
              var indexValSplit = indexVal.split(':');
              if (indexVal && indexVal.length && indexValSplit.length > 1) {
                var argName = indexValSplit[0].trim();
                var argValue = indexValSplit[1].trim();
                var argResult = parseSwitchValueArg(scope, element, argName, argValue);
                if (argResult && argResult.key && argResult.value) {
                  resultObj[argResult.key] = argResult.value;
                }
              }
            }
            if (Object.keys(resultObj) && Object.keys(resultObj).length) {
              resultObj.name = name;
              resultObj.switches = [];
              resultObj.activeSwitches = [];
              return resultObj;
            }
          }
        }
        return
      }

      function parseSwitchValueArg(scope, element, arg, value) {
        switch(arg) {
          case ("change-delay"):
            return {key: 'changeDelay', value: parseInt(value)};
            break;
          case ("active-limit"):
            return {key: 'activeLimit', value: parseInt(value)};
            break;
          case ("data"):
            return {key: 'data', value: value};
            break;
        }
      }
    }

    function setShortcutDict(_shortcuts) {
      shortcuts = _shortcuts
    }

    function sendMessageViaDropdown(scope, arg_type, event_name, attr, message, index) {
      if (!arg_type) arg_type = 'send';
      if (arg_type !== 'send') return;
      if (!arg_type || !arg_type.length || !message || !message.length) return;

      var camelMsg = UtilitiesService.camelCase('when-' + message);
      var dataAttrName = UtilitiesService.camelCase(event_name.toLowerCase() + '-data');
      if (dataAttrName in attr) {
          var sendVars = UtilitiesService.replaceAll(attr[dataAttrName] + "", ' ', '').split(',')
          scope.root.public.customStates['when'][camelMsg] = {};
          for (var i = 0; i < sendVars.length; i++) {
            UtilitiesService.replaceAll(attr[dataAttrName] + "", '_', '-');
            var indexKeyFormatted =  UtilitiesService.camelCase(sendVars[i]);
            scope.root.public.customStates['when'][camelMsg][indexKeyFormatted] = scope.dropdown.options[index][sendVars[i]];
          }
      } else {
          scope.root.public.customStates['when'][camelMsg] =scope.dropdown.options[index][attr[dataAttrName]];
      }
      // console.log('sending message', dataAttrName, message, 'with data format', scope.root.public.customStates['when'][camelMsg])
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
      if (element[0].hasAttribute('u') && !element[0].hasAttribute('stagger-children')) return;
      if (scope.root && scope.root.public && !(type in scope.root.public.customStates)) {
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
          var elemArgs = parseArgs(formattedAttrValue, args && args.dashed || type, element);

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

    function parseArgs(string_args, state_name, elem) {
      if (window.location.href.indexOf('/admin/api/animations/prop/') > -1 && !elem[0].hasAttribute('player-control')) {
        return {};
      }
      string_args = UtilitiesService.replaceAll(string_args, ', ',  ',');
      string_args = UtilitiesService.replaceAll(string_args, '| ',  '| ');
      string_args = UtilitiesService.replaceAll(string_args, ' | ',  ' | ');
      var argArr = string_args.split('|');

      var processedArgResults = argArr && processArgArr(argArr);

      var className = (elem && elem[0].className && typeof(elem[0].className) === 'string' && elem[0].className.replace(' ', '-')) || '';
      var processedArgDict = {};
      for (secondary_arg in processedArgResults) {
        var _type = processedArgResults[secondary_arg].type;
        var _value = processedArgResults[secondary_arg].value;

        processedArgResults[secondary_arg] = processSecondaryArgsByType(_type, _value, processedArgResults[secondary_arg], state_name, elem);
        processedArgDict[_type] = processedArgResults[secondary_arg];
      }

      return processedArgDict;
    }

    function setAnimationWithPreviousStyle(new_anim, index, style, value, state_name) {
      var resultStr = '';
      var newAnimStyle = '';

      if (style.split(' ')[1] === '0s' && style.split(',').length === 1) {
        style=''
      }
      if (new_anim && new_anim.Animation[index] && new_anim.Animation[index].length) {
        newAnimStyle = new_anim.Animation[index];
      }
      if (new_anim.Duration[index] && new_anim.Duration[index].length) {
        newAnimStyle += (' ' + new_anim.Duration[index])
      }
      if (new_anim.TimingFunction[index] && new_anim.TimingFunction[index].length) {
        newAnimStyle += (' ' + new_anim.TimingFunction[index])
      }
      if (new_anim.Delay[index] && new_anim.Delay[index].length) {
        newAnimStyle += (' ' + new_anim.Delay[index])
      }

      if (new_anim.IterationCount[index] && new_anim.IterationCount[index].length) {
        newAnimStyle += (' ' + new_anim.IterationCount[index])
      }

      if (new_anim.Direction[index] && new_anim.Direction[index].length) {
        newAnimStyle += (' ' + new_anim.Direction[index])
      }


      if (new_anim.FillMode[index] && new_anim.FillMode[index].length) {
        newAnimStyle += (' ' + new_anim.FillMode[index])
      }

      if (newAnimStyle.split(' ').length === 7) {
        newAnimStyle += ' paused'
      }
      if (style && style.length) {
          style += ', ' + newAnimStyle
      } else {
        style = newAnimStyle.replace('running', 'paused');
      }
      console.log(style);
      return style;
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

    function activateArgDelay(arg_type, arg_dict, scope, elem, delay, cb) {
      $timeout(function() {
        console.log('triggering after', delay, 'delay', typeof delay);
        activateArg(arg_type, arg_dict, scope, elem)
        cb && cb();
        $timeout(function() {

          console.log('current switches active', scope.$parent.switchDict[scope.switch.name].activeSwitches);
        }, 1000)
      }, delay)
    }



    function activateArg(arg_type, arg_dict, scope, elem) {
      switch(arg_type) {
        case("prop"):
          if (arg_dict.ttt) {
            return;
          }
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
        case("eval"):
          evalArgsWithScope(arg_dict, scope, elem);
          break
        case("transform"):
          var response = evalTransformArgs(arg_dict, scope, elem);
          if (!response || !response.length) {
            $timeout(function() {
                evalTransformArgs(arg_dict, scope, elem);
                scope.$apply();
            })
          }
      }
    }


    function evalArgsWithScope(arg_dict, scope, elem) {
      console.log(arg_dict, scope, elem)
    }

    function evalTransformArgs(arg_dict, scope, elem) {
      var transformArr = arg_dict.transforms;
      var resultArr = [];
      for (var i = 0; i < transformArr.length; i++) {
        var indexTransform = transformArr[i];
        var extensions = [];
        var resultPropDict = {properties:[], type:'prop'};
        var transformPrefix = formatBrowserCSSProperty('transform');
        var transitionObj = {duration: 0, properties:[], timingFunction: 'ease'};
        var transformPropDict = TransformService.parseTransformArgs(indexTransform, elem);
        if (transformPropDict.ext) {
          for (key in transformPropDict['ext']) {
            var propDict = {};
            propDict[key] = transformPropDict['ext'][key];
            extensions.push(propDict);
          }
          delete transformPropDict['ext']
        }
        if (transformPropDict.delay || transformPropDict.delay === 0) {
          resultPropDict.delay = transformPropDict.delay;
          delete transformPropDict['delay']
        }


        if (!transformPropDict) return;
        if (transformPropDict.duration) {
          transitionObj.duration = transformPropDict.duration;
          delete transformPropDict['duration'];
        }
        if (transformPropDict.timingFunction) {
          transitionObj.timingFunction = transformPropDict.timingFunction;
          delete transformPropDict['timingFunction'];
        }



        //break if none exist;

        if (Object.keys(transformPropDict).length) {
          var transformValueStr = '';
          for (key in transformPropDict) {
            if (transformPropDict[key] && (transformPropDict[key].length) || typeof(transformPropDict[key]) === 'number' ) {
              transformValueStr += key + '(' + transformPropDict[key] + ') ';
            }

          }

          var browserProperty = formatBrowserCSSProperty('transform');
          var transformDict = {};
          transformDict[browserProperty] = transformValueStr;
          resultPropDict.properties.push(transformDict);
        }
        if (extensions && extensions.length) {
          for (var i = 0; i < extensions.length; i++) {
            var key = Object.keys(extensions[i])[0];
            var value = extensions[i][key];
            var keyBrowserFormatted = RootService.formatBrowserCSSProperty(key);
            var propDict = {};
            propDict[keyBrowserFormatted] = value;
            resultPropDict.properties.push(propDict);
          }
        }


        if (transitionObj.duration || transitionObj.timingFunction) {
          var transitionDict = formatTransitionString(transitionObj, elem);
          resultPropDict.properties.push(transitionDict);
        }
        if (resultPropDict.properties && resultPropDict.properties.length) {
          evalPropertyArgs(resultPropDict, scope, elem);
          resultArr.push(resultPropDict);
        }
      }

      return resultArr;
    }

    function formatBrowserCSSProperty(property) {
      var dashedPrefixedProps = ['transition', 'transform']
      var browserPrefix = RootService.getBrowserPrefix();
      if (browserPrefix && browserPrefix.length && dashedPrefixedProps.indexOf(property.toLowerCase()) > -1) {
        property = '-' + browserPrefix + '-' + property
      }
      return property
    }
    function formatTransitionString(obj, elem) {
      var elemTransitionDurationStyle = elem[0].style['transitionDuration'] || elem[0].style['webkitTransitionDuration'];
      var properties = obj.properties.join(" ") || 'all';
      var propName = formatBrowserCSSProperty('transition');
      var propDelay = obj.delay && (obj.delay + 'ms');
      var propDuration = (obj.duration && (obj.duration + 'ms')) || elemTransitionDurationStyle || '1000ms';
      var propTimingFunc = obj.timingFunction || 'ease'

      var valueString = [properties, propDuration, propTimingFunc, propDelay].join(" ").trim()
      var resultDict = {};
      resultDict[propName] = valueString
      return resultDict;
    }

    function findReplaceParens(string_args) {
      var resultDict = {}
      var parentheticalArr = string_args.match(/\((.*?)\)/g);
      parentheticalArr.forEach(function(value, index) {resultDict[index + ""] = UtilitiesService.removeAllOccurrancesArr(value, ['(', ')']); string_args = UtilitiesService.replaceAll(string_args, value, '<<>>')});
      return resultDict
    }

    function processTransformArgs(string_args) {
      var resultDict = {};
      var parentheticalArr = string_args.match(/\((.*?)\)/g);
      var supportedKeys = TransformService.getSupported();
      var hasParens = parentheticalArr;
      var parenthesisDict = hasParens && findReplaceParens(string_args);

      string_args = UtilitiesService.removeAllOccurrancesArr(string_args, ['[', ']']);
      string_args = UtilitiesService.replaceAll(string_args, ', ', ',');
      var kvPairs = string_args.split(',');

      for (var i = 0; i < kvPairs.length; i++) {
        var kvIndexSplit = kvPairs[i].split(':')
        if (hasParens) {
          var paramString =  ((i + '') in parenthesisDict && parenthesisDict[i + '']) || ''
          var kvIndexSplit = UtilitiesService.replaceAll(kvPairs[i], '<<>>', paramString ).split(':');
        }
        var indexKey = kvIndexSplit[0];

        var indexValue;
        if (kvIndexSplit.length > 1) {
          indexValue = kvIndexSplit[1];


          indexValue = UtilitiesService.removeAllOccurrancesArr(indexValue, ['(', ')']);
          if (supportedKeys.indexOf(indexKey.toLowerCase()) > -1) {
            if (indexKey === 'delay' || indexKey === 'duration') {
              indexValue = parseInt(indexValue);
            }
            resultDict[indexKey] = indexValue;

          }
        }
      }
      for (key in resultDict) {
        if (['rotate', 'scale', 'translate', 'to', 'timingFunc', 'tf'].indexOf(key) > -1) {
          if (key === 'timingFunc' || key === 'tf') {
            resultDict[key] = resultDict[key].replace('cb', 'cubic-bezier').replace('cubic-bezier', 'cubic-bezier ').split(' ')[0] + hasParens[0];
          } else {
            resultDict[key] = UtilitiesService.removeAllOccurrancesArr(hasParens[0], ['(', ')']);
          }

        }
      }
      return {type: 'transform', transforms: [resultDict]}
    }

    function processSecondaryArgsByType(type, string_args, processed_args, state_name, elem) {
      switch(type) {
        case ("transform"):
          return processTransformArgs(string_args)
          break;
        case ("prop"):

          return formatAndProcessArgs(type, string_args, {properties:[]}, 'properties', processCSSPropValue, ['transition'], state_name, elem);
          break;

        case ("class"):

          return formatAndProcessArgs(type, string_args, {classes:[]}, 'classes', processClassSecondaryArgs, ['add', 'remove', 'set']);
          break;

        case ("send"):
          var sendArgs = formatAndProcessArgs(type, string_args, {messages:[]}, 'messages', processSendSecondaryArgs, ['public', 'children']);

          return sendArgs
          break;

        case ("anim"):
          return formatAndProcessArgs(type, string_args, {animations:[]}, 'animations', processAnimSecondaryArgs, ['type', 'force']);
          break;

        case ("ttt"):
          return formatTTTArgs(type, string_args)

        case ("eval"):
          return formatAndProcessArgs(type, string_args, {functions: []}, 'functions',processEvalSecondaryArgs, [])
          break;

        case ("tween"):
          return formatTweenArgs(string_args);
          break;

        case ("trigger"):
          return formatAndProcessArgs(type, string_args, {states:[]}, 'states', processTriggerSecondaryArgs, ['state'])
      }

      function formatTTTArgs(type, string_args) {
        string_args = string_args.replace('[', '').replace(']', '');
        var animationProperties = ['Property', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'Animation'];
        var prefixes = ['p','dur','tf', 'del', 'i', 'dir', 'fm', 'a'];
        var argSplit = string_args.split(' ');
        var validPrefixArr = argSplit.filter(function(pre, i) {return  pre.split(':').length > 1 && prefixes.indexOf(pre.split(':')[0]) > -1});
        var animArr = [];
        var animDict = {};
        animationProperties.forEach(function(a, i) {animDict[a] = []});
        validPrefixArr.forEach(function(pre, i) {
          var preSplit = validPrefixArr[i].split(':');

          var prefixName = preSplit[0].trim()
          var iValue = UtilitiesService.removeAllOccurrancesArr(preSplit[1].trim(), ["(", ')']);
          var formalPrefixName = animationProperties[prefixes.indexOf(prefixName)];
          var values = iValue.split(',');
          values.forEach(function(val, j) {
            var parsedValue = parsePrefix(formalPrefixName, val);
            animDict[formalPrefixName].push(parsedValue);
          });
        })
        var numUniqueAnimations = animDict['Property'].length;
        for (var i = 0; i < numUniqueAnimations; i++) {

          for (key in animDict) {
            if (animDict[key].length > 1) {
              continue;
            } else
            if (animDict[key].length === 1) {
              animDict[key].push(getDefaultAnimationPropertyValue(key));
            } else
            if (!animDict[key].length || animDict[key] === 0) {
              animDict[key].push(getDefaultAnimationPropertyValue(key))
            } else
            if (animDict[key].length && animDict[key].length <= numUniqueAnimations) {
              animDict[key].push(animDict[key][i- 1])
            }
            else if (!animDict[key]) {
                // animDict[key].push(previousKey);
              console.log('else', key)
            }
          }
        }

        console.log(animDict);
        return animDict;

      }

      function getDefaultAnimationPropertyValue(prop) {
        prop = prop.toLowerCase();
        switch (prop) {
          case ("delay"):
            return "0s"
            break;
          case ("iterationcount"):
            return "1"
            break;
          case ("direction"):
            return "normal"
            break;
          case ("fillmode"):
            return "none";
            break
          case ("timingfunction"):
            return "ease"
            break;
          case ("duration"):
            return "1000ms"
            break;
        }
      }

      function parsePrefix(pre, val, animationProperties) {
        if (pre === 'TimingFunction' && val.split('cb').length > 1) {
          val = UtilitiesService.replaceAll(val.replace('cb','cubic-bezier('), '#', ',') + ')';
          return val;
        }
        return val;
        // if (pre === '') {
        //   console.log
        // }
      }

      function initAnimationObjWithProperty(prop, tf, anim_name) {
        return function(state_name, from, to) {
            var anim;
            var name;
            var state_name = state_name && ('-' + state_name) || ''
            if (!anim_name) {
              anim = AnimationService.initCSSAnimation(name);
              name = UtilitiesService.camelCase('anim-' + prop + state_name);
              anim.appendRule(0 + "% {" + prop + ':' + from + ";}", 0);
              anim.appendRule(100 + "% {" + prop + ':' + to + " }", 1);
            } else {
              var name = UtilitiesService.camelCase('anim-' + '-' + anim_name + state_name);
              anim = AnimationService.getAnimationObjFromAnimationName(anim_name)
            }
            anim.name = name;
            return anim
        }
      }


      function processAnimSecondaryArgs(msg_name, arg, prop_dict, orig_str, i) {

        if (!arg || arg.indexOf('set') > -1 || arg.indexOf('delay-') > -1 || arg.indexOf('before') > -1 || arg.indexOf('after') > -1) {
          arg = 'obj';

            prop_dict.custom = orig_str[i].replace(msg_name + ':', '');


        }
        return arg
      }

      function processEvalSecondaryArgs(trigger_name, arg, prop_dict, orig_str, i) {
        if (!arg) {
          arg = 'self'
        }
        prop_dict.custom = orig_str.join(",");
        return null
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
      var propertiesToConvertInt = [];
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
    function formatAndProcessArgs(type, string_args, base_dict, base_dict_key, custom_func, custom_args, state_name, elem) {
      var customAnimations = RootService.getCustomAnimations();
      var customAnimNameOnly = customAnimations.customNameOnly;
      var propDict = base_dict
      propDict.type = type;
      var generalArgs = '';
      if (isFirstArgAnArr(string_args)) {
        //array case
        var stringPropArgs = processStrArrToObj(string_args);
        var hasPlayer = false;

        for (var i = 0; i < stringPropArgs.length; i++) {
          var parsedPropDict = {};

          var kvPairSplit = stringPropArgs[i].split(':');

          var key = kvPairSplit[0];
          var value = kvPairSplit[1];


          parsedPropDict[key] = custom_func(key, value, parsedPropDict, stringPropArgs, i);


          if (kvPairSplit.length > 2) {


            parsedPropDict = processGeneralArgsArray(type, kvPairSplit.splice(2), parsedPropDict, custom_args);

            // if (key in PropertyService.defaultPropAnimations) {

            //   if (!('custom' in parsedPropDict)) {
            //     parsedPropDict['custom'] = '';
            //   }
            //   parsedPropDict['default'] = true;
            // }

            // if (type === 'prop' &&  customAnimNameOnly.indexOf(key) > -1) {
            //   var animObjIndex = customAnimNameOnly.indexOf(key);
            //   var animObj = customAnimations.custom[animObjIndex];
            //   var propFrames = PropertyService.parseAnimObjToPropArr(animObj.cssRules);
            //   console.log('\n-----------------------\n**', animObj.name, '**\n');
            //   for (key in propFrames.props) {
            //     var frames = propFrames.props[key];
            //     console.log(key, '-' , frames.length, 'frames')
            //     for (var i = 0; i < propFrames.props[key].length; i++) {
            //       var propObj = propFrames.props[key][i];
            //       console.log('|' , propObj.percent + '%', propObj.prop, '==>' ,propObj.value)
            //     }
            //     console.log('\n------------------------\n')
            //   }
            //   console.log(parsedPropDict);
            // }

            processCustomArgsArray(type, key, value, string_args, parsedPropDict, custom_args, state_name, elem, hasPlayer);
            // if (type === 'prop' &&  customAnimNameOnly.indexOf(key) > -1) {
            //   var animPropCopy = parsedPropDict.animProp
            //   var animObjIndex = customAnimNameOnly.indexOf(key);
            //   var animObj = customAnimations.custom[animObjIndex];
            //   var propFrames = PropertyService.parseAnimObjToPropArr(animObj.cssRules);
            //   var stringsToAdd = [];
            //   for (key in propFrames.props) {
            //     var valArr = propFrames.props[key];
            //     for (var j = 0; j < valArr.length - 1; j++) {
            //       var duration = animPropCopy.duration * (valArr[j + 1].percent - valArr[j].percent)/100;
            //       var delay = duration * j
            //       var resultStr = key.replace('rgb', 'rgba') + ':' + valArr[j].value + ':' + valArr[j + 1].value + ':' + duration + ':' + animPropCopy.ease + ':' + delay;
            //       console.log(resultStr)
            //       stringsToAdd.push(resultStr);
            //     }
            //   }
            //   stringsToAdd.forEach(function(prop, i) {
            //       stringPropArgs.push(prop);
            //     // stringPropArgs
            //   })
            //   continue;
            // }

          }

          if (parsedPropDict.animProp) {



              hasPlayer = parsedPropDict.animProp.player;
              var baseDelay = base_dict.delay || 0;
              var animPropDelay = parsedPropDict.animProp.delay;
              if (!parsedPropDict.animProp.delay) {
                var finalCheckDelay = string_args.split(']:');
                if (finalCheckDelay.length > 1 && finalCheckDelay[1].indexOf('delay-') > -1) {
                  var delayStr = parseInt(finalCheckDelay[1].replace('delay-', ''));
                  parsedPropDict.animProp.delay = delayStr;
                  // if ()
                }
              }


            // if (base_dict.delay > 0 && parsedPropDict.animProp.delay === NaN) {
            //   console.log('resolve the delay')
            // }
            // console.log(base_dict, string_args, base_dict, base_dict_key)
          }



          propDict[base_dict_key].push(parsedPropDict);
        }
      }
      //parseGeneralArgs

      processGeneralArgs(type, string_args, propDict, custom_args);

      return propDict

    }

    function processCustomArgsArray(type, split_key, split_value, orig_str, arg_dict, d_custom_args, state_name, elem, hasPlayer) {
      var hasDefault = 'default' in arg_dict;

      if (areCustomArgsPropertyAnimation(type, arg_dict)) {

        var startArgs = arg_dict[split_key];
        var customArgs = arg_dict['custom'];
        var endArgs = split_value;


        delete arg_dict['default'];
        delete arg_dict['custom'];
        delete arg_dict['group']


        if ((orig_str.indexOf('rgba') > -1 || orig_str.indexOf(':#') > -1) && ('background' in arg_dict || 'background-color' in arg_dict ))  {
          var endArgsReconstruct = customArgs.split('):')
          var customArgs = endArgsReconstruct[1].trim();
          var endArgs = UtilitiesService.replaceAll(endArgsReconstruct[0] + ')', '#', ',').trim();
          console.log(startArgs, customArgs, endArgs)
        }

        if (((orig_str.indexOf('text-shadow') > -1 || orig_str.indexOf('box-shadow') > -1)) &&
              orig_str.indexOf(' #') > -1) {
          startArgs = startArgs.replace(',', '#').trim();
          endArgs = customArgs.split(':')[0].trim();
          customArgs = customArgs.split(':').splice(1).join(":");
          console.log(startArgs, endArgs);
        }


        var arg_arr = [];
        var propName = split_key;

        startArgs && arg_arr.push(startArgs);
        endArgs && !(endArgs === startArgs) && arg_arr.push(endArgs);

        customArgs && customArgs.split(':').filter(function(a) {return a.length}).forEach(function(a) {arg_arr.push(a)})

        arg_dict.animProp = PropertyService.getFrameAnimationFunc(elem, propName, arg_arr, state_name, hasDefault, hasPlayer);
      }


      function areCustomArgsPropertyAnimation(type, arg_dict) {
        return type === 'prop' && 'custom' in arg_dict && arg_dict.custom.length && arg_dict.custom.split(':').length > 1
      }

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
        // if (stateName.indexOf('when-') > -1) {
        //   console.log()
        // }
        if (delay) {

          $timeout(function() {
            dispatchTrigger(stateName, stateScope, elem, scope);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          dispatchTrigger(stateName, stateScope, elem, scope);

          $timeout(function() {
              scope.$apply();
          })
        }

        function dispatchTrigger(trig_name, trigger_scope, elem, reg_scope) {
          if (trigger_scope === 'self' && trig_name.indexOf('when-') > -1) {
            trigger_type = 'when';
            // trigger_msg = trig_name.replace('when-', '');
            var triggerCamel = UtilitiesService.camelCase(trig_name);
            console.log(elem[0].getAttribute(trig_name))
            var elemArgs = parseArgs(elem[0].getAttribute(trig_name), trig_name, elem);

            for (key in elemArgs) {

              if ((argNames || supportedCommands).indexOf(key) > -1) {
                activateArg(key, elemArgs[key], scope, elem);
              }
            }
          } else
          if (trigger_scope === 'self') {
            triggerActionOnElem(trig_name, elem[0]);
          } else if (trigger_scope === 'parent') {
            triggerActionOnElem(trig_name, elem[0].parentNode);
            // elem[0].parentNode.classList.add(trig_name);
          } else if (trig_name === 'switch' && trigger_scope && trigger_scope.length) {
            var className = UtilitiesService.camelToDash(trigger_scope.toLowerCase());
            triggerActionOnElem('switch' + '-' + className, elem[0]);
          }
          else if (trigger_scope === 'children') {
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
            } else if (trig_name === 'switch') {
              elem.classList.add('switch-toggle');
            }
            else {
              elem.classList.add(trig_name);
            }
          }
        }
     }
  }

    function evalSendArgs(arg_dict, scope, elem) {
      // var toDashed = UtilitiesService.camelToDash(msg_name).toLowerCase();

      if (arg_dict.delay) {
        $timeout(function() {
          processMessageArr(arg_dict.messages, scope, elem);

        }, arg_dict.delay)
      } else {

        processMessageArr(arg_dict.messages, scope, elem);
      }
    }

    function processMessageArr(message_arr, scope, elem) {
      for (var i = 0; i < message_arr.length; i++) {
        var indexMessageObj = message_arr[i];
        var dataDict;
        if (indexMessageObj.custom && indexMessageObj.custom.indexOf('data:') === 0) {
          var dataVar = UtilitiesService.removeAllOccurrancesArr(indexMessageObj.custom.split('data:')[1], ['(', ')']);
          var dataVarArgs = dataVar.split('#');
          for (var j = 0; j < dataVarArgs.length; j++) {
            var dataVarArr = dataVarArgs[j].split('.')
            var resultDict = {};
            if (dataVarArr.length > 1 && dataVarArr[0] in scope) {
              var nextDict = scope[dataVarArr.splice(0, 1)];

              for (var k = 0; k < dataVarArr.length; k++) {
                indexVar = dataVarArr[k];
                if (indexVar in nextDict) {
                  nextDict = nextDict[indexVar];
                } else {
                  break;
                }
              }
              if (nextDict && typeof nextDict === 'string') {
                // scope.root.public.customStates['when'][camelMsg][indexKeyFormatted]
                // console.log(scope.root.public.customStates)
                if (!dataDict) dataDict = {};
                dataDict[dataVarArgs[j]] = nextDict
              }

            }
          }
          delete indexMessageObj['custom']
        }

        var delay = indexMessageObj.delay || 0;
        delete indexMessageObj['delay'];
        var messageName = Object.keys(indexMessageObj)[0];
        var messageScope = indexMessageObj[messageName];
        var messageDashedName = 'when-' + messageName;

        // console.log(elem)
        sendMessageWithinScope(formatMessage(messageName), messageScope, dataDict, delay, scope, elem)
      }

      function formatMessage(message_name) {
        return UtilitiesService.camelCase('when-' + message_name);
      }

      function sendMessageWithinScope(msg_name, msg_scope, msg_data, delay, scope, elem) {

        // console.log('sending..', , 'with scope', msg_scope, delay, scope.root.public.customStates);

        if (delay) {
          $timeout(function() {
            activateScopedMessageState(msg_name, msg_data,msg_scope, scope);
            $timeout(function() {
              scope.$apply();
            })
          }, delay)
        } else {
          activateScopedMessageState(msg_name, msg_data, msg_scope, scope);
          $timeout(function() {
              scope.$apply();
          })
        }
        function activateScopedMessageState(msg_name, msg_data, env, scope) {
          var msgType = UtilitiesService.camelToDash(msg_name).toLowerCase().split('-')[0];
          if (!(msgType in scope.root.public.customStates)) {
            scope.root.public.customStates[msgType] = {};
          }
          scope.root.public.customStates[msgType][msg_name] = msg_data ||true;
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


    function parseAfterArgs(arg_string, scope, elem) {
        var argSplit = arg_string.split(':');

        if (argSplit.length > 1) {
          var argName = argSplit[0].toLowerCase();
          var argValue = '[' + argSplit.splice(1).join(":") + ']'
          var processedValueDict = parseArgs(argName + ':' + argValue);
          return function() {
            for (key in processedValueDict) {
              activateArg(key, processedValueDict[key], scope, elem);
            }
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
            var endParenthesis = setString.indexOf('):') || setString.indexOf('),') || setString.indexOf(')');
            setString = setString.substring(0, endParenthesis);
            custom_dict.set = processSetExtraArgs(setString);

          }
          if (custom_str &&  custom_str.indexOf(':before') > -1) {
            custom_dict.before = true;
          }
          if (custom_str && custom_str.indexOf(':after') > -1) {
            var afterArgs = custom_str.split(':after:')
            if (afterArgs.length > 1 && afterArgs[1].length && afterArgs[1].indexOf('(') > -1 && afterArgs[1].indexOf(')') > -1) {
              afterArgs = UtilitiesService.removeAllOccurrancesArr(afterArgs[1], ['(', ')']);
              var afterArgsType = afterArgs.split(':')[0];
              custom_dict.after = {value: true, type: afterArgsType, func: parseAfterArgs(afterArgs, scope, elem)}
            } else {
              custom_dict.after = {value: true, type: 'set' in custom_dict};
            }
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
            if (custom_args.out) {

              animStartCb = function() {
                // $timeout(function() {
                  elem[0].style.opacity = 0;
                // })
              }
            }
            if (custom_args.after && custom_args.after.value) {
              animEndCb = function() {
                if (custom_args.after.func) {
                  custom_args.after.func();
                }
                var propDict = {properties:custom_args.set};
                evalPropertyArgs(propDict, scope, elem);
              }
            }
            var start_cb = animStartCb(elem, custom_args)
            if (delay) {
              $timeout(function() {
                if (custom_args && custom_args.set && (!custom_args.after || !custom_args.after.value || custom_args.before)) {
                  var propDict = {properties:custom_args.set};
                  evalPropertyArgs(propDict, scope, elem);
                }

                execAnimation(elem, anim_name, animObj, delay, start_cb, animEndCb)
              }, delay)
              return;
            }
            if (custom_args && custom_args.set && (!custom_args.after || custom_args.before)) {
              var propDict = {properties:custom_args.set};
              evalPropertyArgs(propDict, scope, elem);
            }
            execAnimation(elem, anim_name, animObj, delay, start_cb, animEndCb)
            // AnimationService.animate(elem[0], anim_name, animObj, delay, animStartCb, animEndCb);
          }
          return;
        }
        function animStartCb(elem, custom_args) {

            return function() {
              if (custom_args.in) {
                elem[0].style.opacity = 1;
              }
              if (custom_args.out){
                elem[0].style.opacity = 0;
              }
            }
        }
      }

      function execAnimation(elem, anim_name, anim_obj, delay, start_cb, end_cb) {
        var browser_prefix = RootService.getBrowserPrefix();
          initAndTriggerAndRemoveAnimStartFunc(elem, browser_prefix, start_cb);
          initAndTriggerAndRemoveAnimEndFunc(elem, browser_prefix, end_cb)
        if (browser_prefix === 'webkit') {
          browser_prefix = '-' + browser_prefix + '-'
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
            start_cb && start_cb();
            elem[0].removeEventListener(animStartEventName, animStartFunc);
          }
          elem[0].addEventListener(animStartEventName, animStartFunc);
      }

      function initAndTriggerAndRemoveAnimEndFunc(elem, browser_prefix, end_cb) {

        var animEndEventName = getAnimEventName(browser_prefix, 'End');
          var animEndFunc = function(e) {

            end_cb && end_cb();
            elem[0].removeEventListener(animEndEventName, animEndFunc);
            elem[0].offsetWidth = elem[0].offsetWidth;
            if (!browser_prefix) {
              elem[0].style.animationName = null;
            } else {
               var animationNameFormatted = UtilitiesService.camelCase(browser_prefix + '-animation-name')
               elem[0].style[animationNameFormatted] = null;
            }
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
          var endParenthesis = setString.indexOf('):') || setString.indexOf('),') || setString.indexOf(')');
          setString = setString.substring(0, endParenthesis);
          custom_dict.set = processSetExtraArgs(setString);
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
        if (indexPropDict.animProp && indexPropDict.animProp.player) {
          if (elem[0].getAttribute('inspector-elem') === indexPropDict.animProp.stateName) {
            $timeout(function() {
              if (indexPropDict.animProp.player.prefs && indexPropDict.animProp.player.prefs.autoPlay) {
                indexPropDict.animProp.player.play()
              }
            }, 100)
          }
          else {


            indexPropDict.animProp && indexPropDict.animProp.player && indexPropDict.animProp.player.play &&  indexPropDict.animProp.player.play();
          }
          return;
        }
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

        var propValShortcut;
        if (propName in shortcuts.cssPropValues) {

          propValShortcut = shortcuts.cssPropValues[propName];
          if (propValShortcut.split(':').length > 1) {
            propName = propValShortcut.split(':')[0]
            propValue = propValShortcut.split(':')[1]
          }
        }
        if ((propName && propValue) || (propName && propValue === 0)) {

          setCSSProperty(propName, propValue, delay, important, scope, elem)
        } else {
          // console.log('ERROR: css propValue or css propName not defined', propName, propValue, '\nelem:', elem)
          continue;
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
      }

      function setCSSProperty(prop, value, delay, impt, scope, elem) {

        if (prop in shortcuts.cssProps) {
          prop = shortcuts.cssProps[prop];
        }
        if (prop === 'transition') {
          if (prop === 'transition' || prop.indexOf('transition') > -1) {
            scope.root.transitionCounter += 1;
          }
        }

        var priority;
        if (impt) {
          priority = 'important';
        }
        if (delay) {
          $timeout(function() {
            elem.css(prop, value, priority);
            $timeout(function() {
              scope && scope.$apply();
            })
          }, delay)
        } else {
          if (!prop && !value) {
            console.log(prop, value, delay, impt, scope, elem);
          }
          // console.log(prop, value);
          elem.css(prop, value, priority);
          $timeout(function() {
              scope && scope.$apply();
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
