angular.module('uguru.shared.services')
.factory("PropertyService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'TweenService',
    'RootService',
    'XHRService',
    '$compile',
    '$rootScope',
    'SVGService',
    PropertyService
        ]);

function PropertyService($timeout, $state, UtilitiesService, TweenService, RootService, XHRService, $compile, $rootScope, SVGService) {
  var blacklistStates = ['init-with', 'init-later'];
  var defaultPropAnimations = {};
  var rFrameEasingCache = {};
  var defaults = {};
  defaults.FPS_SIXTY = 1000/16;
  var playerControlElems= {ball: null, bar: null, time:null};
  return {
    initPropertyObj: initPropertyObj,
    getFrameAnimationFunc: getFrameAnimationFunc,
    defaultPropAnimations: defaultPropAnimations,
    detectPlaybarControlElem: detectPlaybarControlElem,
    getPropJson: getPropJson,
    parseAnimObjToPropArr: parseAnimObjToPropArr,
    getDMatrixString: getDMatrixString
  }

  function getDMatrixString(d_matrix, transform_str, perspective) {
            transform_str = transform_str + " ";
            var result = "";

            var defaults = {"scaleX": 1, "scaleY": 1, "scaleZ": 1};
            var count =0;

            if (d_matrix.skew[0] || transform_str.split('skewX').length > 1) {
                result += "skewX(" + parseFloat(d_matrix.skew[0], 10).toFixed(4) + 'deg) '
                count++;
            }
            if (d_matrix.skew[1] || transform_str.split('skewY').length > 1) {
                result += "skewY(" + parseFloat(d_matrix.skew[1], 10).toFixed(4) + 'deg) ';
                count++;
            }
            if (d_matrix.rotate[0] || transform_str.split('rotateX').length > 1) {
                result += "rotateX(" + parseFloat(d_matrix.rotate[0], 10).toFixed(4) + 'deg) ';
                count++;
            }

            if (d_matrix.rotate[1] || transform_str.split('rotateY').length > 1) {
                result += "rotateY(" + parseFloat(d_matrix.rotate[1], 10).toFixed(4) + "deg) ";
                count++;
            }
            if (d_matrix.rotate[2] || transform_str.split('rotateZ').length > 1) {
                result += "rotateZ(" + parseFloat(d_matrix.rotate[2], 10).toFixed(4) + "deg) ";
                count++;
            }
            if (d_matrix.translate[0] || transform_str.split('translateX').length > 1) {
                result += "translateX(" + parseFloat(d_matrix.translate[0], 10).toFixed(4) + "%) ";
                count++;
            }
            if (d_matrix.translate[1] || transform_str.split('translateY').length > 1) {
                result += "translateY(" + parseFloat(d_matrix.translate[1], 10).toFixed(4) + "%) ";
                count++;
            }
            if (d_matrix.translate[2] || transform_str.split('translateZ').length > 1) {
                result += "translateZ(" + parseFloat(d_matrix.translate[2], 10).toFixed(4) + "px) ";
                count++;
            }
            if (d_matrix.scale[0] !== 1 && transform_str.split('scaleX').length > 1) {
                result += "scaleX(" + parseFloat(d_matrix.scale[0], 10).toFixed(4) + ") ";
                count++;
            }
            if (d_matrix.scale[1] !== 1 && transform_str.split('scaleY').length > 1) {
                result += "scaleY(" + parseFloat(d_matrix.scale[1], 10).toFixed(4) + ") ";
                count++;
            }
            if (d_matrix.scale[2] !== 1 &&  transform_str.split('scaleZ').length > 1) {
                result += "scaleZ(" + parseFloat(d_matrix.scale[1], 10).toFixed(4) + ") ";
                count++;
            }
            if (transform_str.split('scale(').length > 1) {
                result += "scaleX(" + parseFloat(d_matrix.scale[0], 10).toFixed(4) + ") scaleY(" + parseFloat(d_matrix.scale[1], 10).toFixed(4) + ") ";
                count++;
            }
            if (transform_str.split('scale3d(').length > 1) {
                result += "scale3d(" + parseFloat(d_matrix.scale[0], 10).toFixed(4) + ", " + parseFloat(d_matrix.scale[1], 10).toFixed(4) + ", " + parseFloat(d_matrix.scale[1], 10).toFixed(4) +  ") ";
                count++;
            }
            if (perspective && perspective.length) {
                result += "perspective(" + perspective + ') '
                count++;
            }
            if (transform_str.split('rotate(').length > 1) {
                var rotateValue = transform_str.split('rotate(')[1].split(')')[0];
                console.log('rotateValue discovered... hacking..');
                result += "rotate(" + rotateValue +") ";
                count++;
            }
            if (count) {
                return result
            }

        }

  function parseKeyframeCSS(css_str) {
    var resultDict = {}
    var removedBracketStr = css_str.split('{')[1].split('}')[0].trim();
    var kvProps = removedBracketStr.split(';')
    kvProps.forEach(function(kv, i) {kvProps[i] = kvProps[i].replace(': ', ':').replace(' :', ':').replace(' : ', ':').trim()})
    kvProps = kvProps.filter(function(prop, i) {return prop && prop.length})
    kvProps.forEach(function(kv, i) {
      // resultDict[kv]
      var kvSplit = kv.split(':');
      resultDict[kvSplit[0].trim() + ""] = kvSplit[1].trim()
    })
    return resultDict;
  }

  function parseAnimObjToPropArr(css_rules, debug) {
    var keyFrames = [];
    var propDictFrames = {};
    for (var i = 0; i < css_rules.length; i++) {

      var iRule = css_rules[i];
      if (iRule.type !== 8) {
        continue;
      }
      var percentInt = parseFloat(iRule.keyText.replace('%', ''))
      var cssText = iRule.cssText;
      var propArr = parseKeyframeCSS(iRule.cssText)
      for (key in propArr) {
        if (!(key in propDictFrames)) {
          propDictFrames[key] = []
        }
        propDictFrames[key].push({prop: key, value: propArr[key], percent:percentInt});
      }
      keyFrames.unshift({percent: percentInt, props:propArr})
    }

    for (key in keyFrames) {
      var frames = keyFrames[key];
      debug && console.log(key, '-' , frames.length, 'frames')
      for (var i = 0; i < keyFrames[key].length; i++) {
        var propObj = keyFrames[key][i];
        debug && console.log('|' , propObj.percent + '%', propObj.prop, '==>' ,propObj.value)
      }
      debug && console.log('\n------------------------\n')
    }

    // for (property in css_rules) {
    //   if ((property || property === 0) && css_rules[property].type === window.CSSRule.WEBKIT_KEYFRAME_RULE) {
    //     keyFrames.push(css_rules[property]);
    //   }
    // }
    // keyFrames.sort(function(kf_a, kf_b) {
    //   return parseFloat(kf_b.keyText.replace("%", "")) - parseFloat(kf_b.keyText.replace("%", ""))
    // }).reverse()
    // keyFrames.forEach(function(kf, i) {
    //   console.log(kf.keyText)
    // })
    // var resultDict =
    return {orig: {rules: css_rules, kf: keyFrames}, props: propDictFrames};
  }

  function detectPlaybarControlElem() {
    if (!playerControlElems.ball) {
      playerControlElems.ball = {elem: document.querySelector('[inspector-ball]'), width: null, height: null};
      if (playerControlElems.ball.elem) {
        var ballRect = playerControlElems.ball.elem.getBoundingClientRect();
        playerControlElems.ball.width = ballRect.width;
        playerControlElems.ball.height = ballRect.height;
      }
    }
    if (!playerControlElems.bar) {
      playerControlElems.bar = {elem: document.querySelector('[inspector-bar]'), width: null, height: null};
      if (playerControlElems.bar.elem) {
        var barRect = playerControlElems.bar.elem.getBoundingClientRect();
        playerControlElems.bar.width = barRect.width;
        playerControlElems.bar.height = barRect.height;
      }
    }
    if (!playerControlElems.time) {
      playerControlElems.time = {elem: document.querySelector('[inspector-time]'), width: null, height: null};
      if (playerControlElems.time.elem) {
        var timeRect = playerControlElems.time.elem.getBoundingClientRect();
        playerControlElems.time.width = timeRect.width;
        playerControlElems.time.height = timeRect.height;
      }
    }

    return playerControlElems
  }

  function getPropJson(struct, cb) {
    if (!struct) return;
      var request_type = 'GET';
      var url = '/admin/spec/property.json';
      XHRService.getJSONFile(request_type, url, cb, struct)
  }

  function getDefaultAnimProp(struct) {
    if (!struct) struct = defaultPropAnimations;
      var callback = function(response) {
        if (response && 'defaultsDict' in response) {
          for (key in response.defaultsDict) {
            struct[key] = response.defaultsDict[key];
          }
        }
      }
      var request_type = 'GET';
      var url = '/admin/spec/property.json';
      XHRService.getJSONFile(request_type, url, callback, {})
  }

  function getFrameAnimationFunc(elem, property, arg_arr, state_name, apply_default, player) {
    var previous_player = player || null;
    if (!property) console.log('ERROR: Missing property');

    var args = processPropertyArgs(elem, property, arg_arr, state_name, apply_default);
    args.stateNameCamel = UtilitiesService.camelCase(state_name);
    args.stateName = state_name;
    if (args.direction.current === 'r' && (args.direction.value === 'ar' || args.direction.current === 'r')) {
      var tempEnd = {};
      for (key in args.start) {
        tempEnd[key] = args.start[key];
      }
      args.start = args.end;
      args.end = tempEnd;
      if (args.direction.value === 'ar') {
        args.direction.value = 'a';
      }

    }
    args.player = initPlayerFromArgs(elem[0], args, previous_player);


    return args;

    // console.log(property, arg_arr, state_name, apply_default);
  }

  function combinePreviousWithNewProp(prop_args, previous_player) {
    var resultDict = {};
    var supportedMappings = ['property', 'start', 'end', 'ease', 'duration'];
    previousPlayerProp = previous_player.tweenConfig.attachment.property;
    if (typeof(previous_player.tweenConfig.easing) === 'string') {
      var previousStrValue = previous_player.tweenConfig.easing;
      previous_player.tweenConfig.easing = {};
      previous_player.tweenConfig.easing[previousPlayerProp] = previousStrValue;
      previous_player.tweenConfig.easing[prop_args.property] = prop_args.ease;
    } else {
      previous_player.tweenConfig.easing[prop_args.property] = prop_args.ease;
    }
    previous_player.control.iter[prop_args.property] = prop_args.iter;
    console.log()
    if (prop_args.property in previous_player.tweenConfig.to && prop_args.property in previous_player.tweenConfig.from) {
      // previous_player.tweenConfig.to[prop_args.property] = prop_args.end[prop_args.property];
      // if (!prop_args.pr)
      if (!previous_player.tweenConfig.inBetween) {
        previous_player.tweenConfig.inBetween = {};
        previous_player.tweenConfig.inBetween[prop_args.property] = [];
      }
      if (previous_player.tweenConfig.inBetween[prop_args.property]) {
        previous_player.tweenConfig.inBetween[prop_args.property].push(prop_args);
        previous_player.tweenConfig.to[prop_args.property] = prop_args.end[prop_args.property];
      }
    } else {
      previous_player.tweenConfig.from[prop_args.property] = prop_args.start[prop_args.property];
      previous_player.tweenConfig.to[prop_args.property] = prop_args.end[prop_args.property];
    }
    return previous_player;
  }

  function applyInspectorGadgetPreferences(player) {
    var resultDict = {};
    var preferences = RootService.getInspectorPreferences();
    var filledPreferences = {};
    for (key in preferences) {

      if (preferences[key].length || preferences[key] > 0 || typeof(preferences[key]) === 'boolean') {
        filledPreferences[key] = preferences[key];
      }
    }



    if (preferences.speed) {
      player.tweenConfig.duration = 1/preferences.speed * player.tweenConfig.duration;
      if (player.propDelays) {
        for (key in player.propDelays) {
          player.propDelays[key].duration = 1/preferences.speed * player.propDelays[key].duration;
          player.propDelays[key].offset = 1/preferences.speed * player.propDelays[key].offset;
          TweenService.preComputeValues(player.propDelays[key].property, player.propDelays[key].duration, player.propDelays[key].start, player.propDelays[key].end, player.propDelays[key].ease, player.propDelays[key])
        }
      }
      player.control.time.duration = player.tweenConfig.duration;
      if (player.tweenConfig.duration > 1000 && (player.tweenConfig.duration/1000 % 100) > 10) {
        player.control.time.sigfig = (player.tweenConfig.duration/1000 + "").split('.')[1].length
      }
      filledPreferences.speed = preferences.speed;
    }

    if (preferences.startAt) {
      var startOption = preferences.startAt.split(':')[0];
      var startValue = preferences.startAt.split(':')[1];
      if (startValue.indexOf('%') > -1) {
        startValue = parseFloat(startValue.replace('%', ''))/100 * player.tweenConfig.duration;
      }
      console.log(startValue)
      switch (startOption) {
        case ("t") :
          // var seekMS = player.tweenConfig.duration
          filledPreferences.startAt = {seek: startValue};
          player.control.ball = {elem: document.querySelector('[inspector-ball]')}
          player.control.time.elem = document.querySelector('[inspector-time]');
      }
    }

    if (preferences.showProps && preferences.showProps.length) {
      filledPreferences.hideProp = {};
    // if (player.pref && player.pref.showProps && player.pref.showProps.length) {
      var formatShowPropsArr = UtilitiesService.replaceAll(preferences.showProps, ', ', ',').split(',');


      formatShowPropsArr.forEach(function(prop, i) {
        if (prop.indexOf('!') > -1) {
          prop = prop.replace('!', '')
          filledPreferences.hideProp[prop] = true;
        }
      })
    }


    filledPreferences.showStates = getPlayerPropertyAnimations(player.elem)
    filledPreferences.switchStateTo = recompileElement(player.elem);
    player.prefs = filledPreferences
  }

  function recompileElement(elem) {
    return function(player, state) {
      var state_name = state.name;
      var state_value = state.value;

      var elemChild = elem;
      var elemParent = elemChild.parentNode;
      elemChild.parentNode.removeChild(elem);
      elem.setAttribute('inspector-elem', state_name);
      elemParent.appendChild(elem);

      // $timeout(function() {
      //   $compile(elemParent)($rootScope);
      // })
      $timeout(function() {



        $compile(angular.element(document.querySelector('#gadget-player')))($rootScope);
        var argsDict = {};

      }, 100)
    }
  }

  function getPlayerPropertyAnimations(elem) {
    return function(player) {
      var searchValues = ['inspector-elem', 'p:['];
      var currentlyActive;
      var resultAttr = [];
      for (var i = 0; i < elem.attributes.length; i++) {
        var attrName = elem.attributes[i].name;
        var attrValue = elem.attributes[i].value;
        if (attrName.indexOf(searchValues[0]) > -1) {
          currentlyActive = attrValue.split('-').join(' ').toUpperCase();
          continue
        }
        if (attrValue.indexOf(searchValues[1]) > -1) {
          resultAttr.push(elem.attributes[i])
        }
      }

      player.prefs.elemAnimStates = resultAttr;
      player.prefs.activeState = currentlyActive
      return resultAttr
    }
  }

  function applyShowOptionPropertySpecificPlayerToTweenConfig(playerObj) {
    if (!playerObj.tweenConfig.from.propControl && playerObj.state.properties.length) {
            playerObj.tweenConfig.from.propControl = '';
            playerObj.tweenConfig.to.propControl = '';

            playerObj.tweenConfig.easing.propControl = '';
      }



      playerObj.state.properties.forEach(function(prop, i) {
          if (prop.active) {

            playerObj.tweenConfig.from.propControl += 'translateX(0px) ';
            playerObj.tweenConfig.to.propControl += 'translateX(' + prop.control.barWidth + 'px) ';

            if (prop.type === 'transform' && prop.easing.split(' ').length > 1) {
              prop.easing = prop.easing.split(' ')[prop.state.splitIndex]
              console.log(prop.easing = prop.easing.split(' '))
              playerObj.tweenConfig.easing.propControl += prop.easing + ' '

            }
            //transform
            else if (prop.type && playerObj.tweenConfig.easing && prop.type in playerObj.tweenConfig.easing)  {
              prop.easing = playerObj.tweenConfig.easing[prop.type]
              playerObj.tweenConfig.easing.propControl += prop.easing + ' ';
            }

            //standard
            else if (playerObj.tweenConfig.easing && typeof playerObj.tweenConfig.easing === 'string') {
              var initialEasing = playerObj.tweenConfig.easing + '';
              playerObj.tweenConfig.easing = {ballControl: 'linear'};
              playerObj.tweenConfig.easing[prop.name] = initialEasing || prop.easing || 'linear';
              if (!playerObj.tweenConfig.easing.propControl) {
                playerObj.tweenConfig.easing.propControl = prop.easing;
              }
            }
            else if (!prop.name){
              prop.easing = 'linear';
              playerObj.tweenConfig.easing = {ballControl: 'linear'};
              playerObj.tweenConfig.easing.name = prop.easing || 'linear'
              playerObj.tweenConfig.easing.propControl = playerObj.tweenConfig.easing.name
            } else if (prop.name && !playerObj.tweenConfig.easing) {
              prop.easing = prop.name
              playerObj.tweenConfig.easing = {}
              playerObj.tweenConfig.easing.name = prop.name || prop.type;
              playerObj.tweenConfig.easing.propControl = playerObj.tweenConfig.easing.name
            }


          }
          playerObj.state.propertyControls.push(prop.control);

          console.log(playerObj.tweenConfig, prop.name)
      })


      if (typeof playerObj.tweenConfig.easing === 'string') {
        var originalEasing = playerObj.tweenConfig.easing;
        playerObj.tweenConfig.easing = {ballControl: 'linear'}
        for (key in playerObj.tweenConfig.from) {
          if (key !== 'ballControl') {
            playerObj.tweenConfig.easing[key] = originalEasing;
          }
        }
      }

      if (playerObj.tweenConfig.easing.propControl) {
        playerObj.tweenConfig.easing.propControl = playerObj.tweenConfig.easing.propControl.trim()
      }
      playerObj.tweenConfig.easing && delete playerObj.tweenConfig.easing['undefined']
      // if (playerObj.tweenConfig.easing) {
      //   playerObj.tweenConfig.easing.ballControl = 'linear'
      // }
      playerObj.tweenConfig.to.propControl = playerObj.tweenConfig.to.propControl.trim();
      playerObj.tweenConfig.from.propControl = playerObj.tweenConfig.from.propControl.trim();

      console.log(playerObj.tweenConfig.from.propControl)
      console.log(playerObj.tweenConfig.to.propControl)
      if (playerObj.tweenConfig.easing.propControl && playerObj.tweenConfig.easing.propControl.split(' ').length > playerObj.tweenConfig.from.propControl.split(' ').length) {
        playerObj.tweenConfig.easing.propControl = playerObj.tweenConfig.easing.propControl.split(' ').slice(0, playerObj.tweenConfig.to.propControl.split(' ').length).join(' ')
      }
      // playerObj.tweenConfig.easing.propControl =
      return playerObj;
  }

  function parseActiveProperties(playerObj, start, end, easing) {
    var resultArr = [];
    var resultDict = {};
    var easing = easing;
    for (key in start) {
      if (key.toLowerCase().indexOf('control') > -1) continue;
      var pDict = {};
      pDict.name = key;
      pDict.start = start[key];
      pDict.end = end[key];
      pDict.active = !playerObj.prefs.hideProp || ((pDict.name in playerObj.prefs.hideProp) === false)


      if (key.toLowerCase().indexOf('transform') > -1) {
        pDict.type = 'transform';
        start[key].split(' ').forEach(function(prop, i) {
          pDict.name = prop.split('(')[0].replace('%', '').replace('px', '').replace('deg','');
          pDict.active = !playerObj.prefs.hideProp || ((pDict.name in playerObj.prefs.hideProp) === false)
          pDict.start = UtilitiesService.removeAllOccurrancesArr(prop.split(pDict.name)[1], ['(', ')']).trim()

          pDict.end = UtilitiesService.removeAllOccurrancesArr(end[key].split(' ')[i].split(pDict.name)[1], ['(', ')']).trim()

          pDict.easing = easing;
          pDict.state = {splitIndex: i,  time: 0,  delay: 0, ignore:true, breakpoints:[], startAt: [], stepSize: 25, speed:1};
          resultArr.push(JSON.parse(JSON.stringify(pDict)));

        })
      } else {
        pDict.easing = easing || 'linear';
        resultArr.push(JSON.parse(JSON.stringify(pDict)));
      }

    }
    resultArr = removeInactivePropertiesFromResultArr(playerObj, resultArr)


    $timeout(function() {
      if (!playerObj.state.properties) {
        playerObj.state.properties = resultArr;
        $timeout(function() {
          playerObj.state.properties.length && playerObj.state.properties.forEach(function(pDict, i) {

            var ballElem = document.querySelector('#property-ball-' + i);
            var valueElem = document.querySelector('#property-value-' + i);
            var barElem = document.querySelector('#property-bar-' + i);
            var barElemWidth = null || playerObj.control.bar.width;
            if (barElem) {
              barElemWidth = barElem.getBoundingClientRect().width || playerObj.control.bar.width
            }
            pDict.control = {time: 0, active: pDict.active , ball: {elem: ballElem}, valueElem: valueElem, name: pDict.type || pDict.name, barWidth: barElemWidth};



          })

          playerObj.state.propertyControls = [];
          playerObj = applyShowOptionPropertySpecificPlayerToTweenConfig(playerObj)
        },100)
      }


      },10);
      return resultArr;
  }

  function removeInactivePropertiesFromResultArr(playerObj, resultArr) {
    var indicesToRemove = [];
    resultArr.forEach(function(pDict, i) {
      if (!pDict.active) {
        playerObj.prefs.hideProp[pDict.name] = pDict;
        if (!pDict.type || pDict.type !== 'transform') {
          playerObj.prefs.hideProp[pDict.name].tweenConfig = {from: playerObj.tweenConfig.from[pDict.name]}
          delete playerObj.tweenConfig.from[pDict.name];
        } else {
          playerObj.prefs.hideProp[pDict.name].tweenConfig = {from: playerObj.tweenConfig.from[pDict.name], to: playerObj.tweenConfig.from[pDict.name]}
          var fromSplit = playerObj.tweenConfig.from[pDict.type].split(' ')
          var toSplit = playerObj.tweenConfig.to[pDict.type].split(' ')
          fromSplit[pDict.state.splitIndex] = '';
          toSplit[pDict.state.splitIndex] = '';
          playerObj.tweenConfig.from[pDict.type] = fromSplit.join(' ')
          playerObj.tweenConfig.to[pDict.type] = toSplit.join(' ')

        }
        indicesToRemove.push(i)
        return false
      }
      return true
    })
    var tempArr = [];
    resultArr.forEach(function(prop, i) {
      if (prop.active) {
        tempArr.push(prop)
      }
    })
    return tempArr;
  }


  function initPlayerFromArgs(elem, args, previous_player) {
    var playerObj = {state: { time: 0, active: false, paused: false}, control: {iter: {}, time: {duration: args.duration || previous_player.duration, sigfig: 1}}};
    playerObj.control.iter[args.property] = args.iter;
    playerObj.control.iter[args.property].direction = args.direction;
    if (!previous_player) {
      playerObj.elem = elem;
      playerObj.tweenConfig = {
        from: args.start,
        to: args.end,
        duration: args.duration,
        easing: args.ease,
        attachment: playerObj,
        start: startTween,
        step: applyPropToElem,
        finish: finishTween
      }
        playerObj.elem = elem;
    } else {

        playerObj = combinePreviousWithNewProp(args, previous_player);

    }

    if (args.duration !== playerObj.tweenConfig.duration) {

      args.delay = 0;
      playerObj.tweenConfig.duration = Math.max(playerObj.tweenConfig.duration, args.duration + args.delay || 0)
    }

    // playerObj.tween = new Tweenable();
    if (args.delay || args.delay === 0) {

      if (!('propDelays' in playerObj)) {
        playerObj.propDelays = {};
      }
      playerObj.propDelays[args.property] = {property: args.property, offset: args.delay, duration: args.duration, start: args.start, end: args.end, ease:args.ease, cache:[]};

      cacheResponse = TweenService.preComputeValues(args.property, args.duration, args.start, args.end, args.ease, playerObj.propDelays[args.property])
      // console.log(playerObj.tweenConfig.inBetween)
    }

    if (playerObj.tweenConfig.inBetween && playerObj.tweenConfig.inBetween.length) {

    }


    if (elem.hasAttribute('inspector-elem')) {
      playerObj.inspect = true;
      !previous_player && RootService.addElemToInspector(playerObj);

      $timeout(function() {
        var newControl = detectPlaybarControlElem();
        newControl.time.duration = playerObj.control.time.duration;
        newControl.time.sigfig = playerObj.control.time.sigfig;
        playerObj.control = newControl;
        if (playerObj.control && playerObj.control.ball && playerObj.control.ball.elem) {
          playerObj.tweenConfig.from.ballControl = 'translateX(0px)';
          playerObj.tweenConfig.to['ballControl'] = 'translateX(' + playerObj.control.bar.width + 'px)';
          !playerObj.prefs && applyInspectorGadgetPreferences(playerObj);


          if (playerObj.prefs && playerObj.prefs.showProps) {
            parseActiveProperties(playerObj, args.start, args.end, args.ease);
          }
        }
      })
    }




    function formatTime (time, time_control, sigfig) {
      if (!sigfig) sigfig = 2;
      if (!time) time = 0;
      if (time_control && time_control.reverse) time = time_control.duration - time;
      if (time > 1000) {
        return (time/1000).toFixed(sigfig) + 's';
      }
      return parseInt(time) + 'ms';
    }


    function applyPropToElem(state, args, time) {
      if (!time) return;

      var skipArgs;
      if (args.control && args.control.ball && args.control.ball.elem) {
        args.control.ball.elem.setAttribute('style', 'transform:' + state['ballControl'] + ';');
        args.control.time.elem.innerHTML = formatTime(time, args.control.time)
      }

      if (args.prefs && args.prefs.showProps && time > 0) {

        args.state.propertyControls.forEach(function(prop, i) {
          if (Math.abs(prop.time - time) > 2 * defaults.FPS_SIXTY) return;
          if (!prop.active) return;
          var ballValue = state['propControl'].split(' ')[i];
          var propName = args.state.propertyControls[i].name;
          var propValue = state[propName];
          prop.ball.elem.style.transform = ballValue;
          prop.time = time;
          prop.valueElem.innerHTML = (propValue.split(' ').length >= 1 && propName.toLowerCase() !== 'transform') || propValue.split(' ')[i].split('(')[1].replace(')', '');
          if (args.skip && args.skip.length && prop.active) {
            console.log('skipProp', args.skip, propValue)
            skipArgs = {value:propValue, name: propName}
          }
        })
      }
      if (skipArgs) {
        args.elem.style[skipArgs.name] = skipArgs.value
        return;
      }

      args.state.time = time;

      args.inspect && args.prefs.showLog && args.state.active && console.log('\n@ T = ' + time +'ms\n-----------');

      for (prop in state) {
        if (time > 0 && args.inspect && args.skipProp && args.skipProp.indexOf(prop) > -1) {
          console.log('skipping', prop);
          continue
        };
        if (state[prop].indexOf('rgba') > -1) {
          var firstSplit = state[prop].split('(')
          var secondSplit = firstSplit[1].split(',');
          var value = firstSplit[0] + '(' + parseInt(secondSplit[0]) + ',' +  parseInt(secondSplit[1]) + ',' +  parseInt(secondSplit[2]) + ',' + secondSplit[3];
          args.elem.style[prop] = value;
          continue;
        }
        if (args.propDelays && prop in args.propDelays) {
          var delta = args.propDelays[prop].offset - time;
          // args.propDelays[prop].cache.push(state[prop])

          if (delta < 0) {
            var val = args.propDelays[prop].cache.shift();
            if (val !== null) {

              args.propDelays[prop].cache.push(val);
              args.elem.style[prop] = val
              // console.log(delta, args.propDelays[prop].cache)
            } else {
              args.propDelays[prop].cache.unshift(null);
            }

          }
        } else {
          args.elem.style[prop] = state[prop];
        }
        args.inspect && args.prefs.showLog && args.state.active && prop.indexOf('Control') === -1 && time >= 0 && time <= args.tweenConfig.duration && console.log(prop + ':' + state[prop])
      }
      args.inspect && args.prefs.showLog && args.state.active && console.log('\n')
    }

    function startTween(state, args) {
      // console.log(args)
      // console.log('starting...', state, args);
      // console.log(state, args)
      args.prefs && args.prefs.showLog && console.log('-----Animation starting ---')
      // $timeout(function() {

      //   args.control.ball = {elem: document.querySelector('[inspector-ball]')}
      //   args.control.time.elem = document.querySelector('[inspector-time]');

      // }, 250)
      args.inspect && args.prefs.showLog && args.state.active && console.log('\n@ T = ' +'0ms\n-----------');
      for (prop in state) {

        args.inspect && args.prefs.showLog && args.state.active && prop.indexOf('Control') === -1  && console.log(prop + ':' + state[prop])
      }



    }

    function finishTween(state, player) {
        if (player.tweenConfig.finishCallback) {
          player = player.tweenConfig.finishCallback(player);
        }
        player.state.active = false;
        player.state.time = 0;
        player.state.active = false;
        player.state.paused = false;
        player.tween.dispose();
        $timeout(function() {
          player.state.active = false;
        })
        if (player.propDelays) {
          for (key in player.propDelays) {
            if (player.propDelays[key].cache && player.propDelays[key].cache.length && player.propDelays[key].cache[0] === null) {
              player.propDelays[key].cache.push(player.propDelays[key].cache.shift());
            }
          }
        }
        player.inspect && player.prefs.showLog && console.log('-----Animation successfully finished---')
        // playerObj.propDelays[args.property] = {offset: args.delay, duration: args.duration, start: args.start, end: args.end, ease:args.ease, cache:[]};
        for (key in player.control.iter) {
          var direction = player.control.iter[key].direction;
          var count = player.control.iter[key].count;

          if (direction.value === 'a' && count && count >= 1) {
            if (direction.current === 'f') {
              player.control.iter[key].direction.current = 'r';
              var tempStart = player.tweenConfig.to;
              player.tweenConfig.to = player.tweenConfig.from;
              player.tweenConfig.from = tempStart;
              // player.tween = new Tweenable(player.tweenConfig).pause();
            }

            else if (direction.current === 'r') {
              player.control.iter[key].direction.current = 'f';
              var tempStart = player.tweenConfig.to;
              player.tweenConfig.to = player.tweenConfig.from;
              player.tweenConfig.from = tempStart;
              // player.tween = new Tweenable(player.tweenConfig).pause();

              console.log(player.tweenConfig.to, player.tweenConfig.from)
            }
          }
        }


        player = player.init(player);

        var count = 0;
        var maxDelay = -1;
        for (key in playerObj.control.iter) {
          playerObj.control.iter[key].count -= 1;
          count += playerObj.control.iter[key].count;

          if (playerObj.control.iter[key].delay && playerObj.control.iter[key].delay > maxDelay) {
            maxDelay = playerObj.control.iter[key].delay;
          }
        }
        if (count > 0) {
          if (maxDelay > 0) {
            $timeout(function() {
              player.play(player);
            }, maxDelay)
          } else {
            player.play();
          }
        }
        // if (player.control.iter)

      }


    function getPlayFunction(player) {

      playerObj.tween.setConfig(playerObj.tweenConfig)
      if (playerObj.control.iter) {
        for (key in playerObj.control.iter) {
          if (playerObj.control.iter[key].count <= 0) {
            console.log('out of counts', key)
            return;
          }
        }
      }

      return function() {
        if (!player.state.time) {
          player.state.active = true;
          player.state.paused = false;
          player.tween = player.tween.tween();
        } else {
          player.state.active = true;
          player.tween = player.tween.resume();
        }
      };
    }

    function getPauseFunction(player) {
      return function() {
        console.log('pausing..')
        player.state.active = false;
        player.tween.pause();
      }
    }

    function getStepToFunction(player) {
      return function(direction) {
        var ms = parseFloat(player.prefs && player.prefs.stepSize || 100);
        var seekTotal;
        if (direction === 'forwards') {
          player.direction = 'normal';
          seekTotal = player.state.time + ms;
        } else if (direction === 'reverse'){
          ms = ms * -1;
            if (player.state.time < Math.abs(ms) && player.state.time > 0) {
              seekTotal = 0;
            }
            else if (player.state.time === 0){
              seekTotal = player.tweenConfig.duration + ms;
            } else {
              seekTotal = player.state.time + ms
            }
        }
        player.tween.seek(seekTotal);
      }
    }

    function getJumpToFunction(player) {
      return function($event) {
        console.log(player.tweenConfig)
        var initialTo = player.tweenConfig.to;
        var initialFrom = player.tweenConfig.from;
        var initialDuration = player.tweenConfig.duration;

        parentRect = player.control.bar.elem.parentNode.getBoundingClientRect()
        console.log(parentRect)
        ballRectLeft = player.control.ball.elem.getBoundingClientRect().left;
        var parentWidth = parentRect.width;
        var jumpToCoordX = $event.clientX - parentRect.left;
        jumpToCoordX
        var reverse = ballRectLeft > jumpToCoordX;

        var jumpDict = {start: {}, end: {}};

        if (player.state.time > 0) {
          jumpDict.start.state =  player.state.time && player.tween.get();
          jumpDict.start.time = player.state.time;
          console.log('jumping with time already > 0 && reverse', reverse);
        } else if (reverse && !player.state.time) {
          jumpDict.start.state =  player.tweenConfig.to;
          jumpDict.start.time = player.tweenConfig.duration;
          console.log('jumping with animation complete && reverse', reverse);
        } else if (!reverse && !player.state.time) {
          jumpDict.start.time = 0;
          jumpDict.start.state = player.tween.get();
          console.log('jumping with time = 0')
        }



        jumpDict.end.time = parseInt(player.tweenConfig.duration * (jumpToCoordX/parentWidth));
        jumpDict.end.state = player.tween.pause().seek(jumpDict.end.time).get()

        player.control.time.reverse = jumpDict.end.time < jumpDict.start.time;


        player.tweenConfig.finishCallback = function(player, $state) {
          player.tweenConfig.to = initialTo;
          player.tweenConfig.from = initialFrom;
          player.tweenConfig.finishCallback = null;
          player.control.time.reverse = false;
          return player;
        }

        player.tweenConfig.duration = player.tweenConfig.duration
        player = player.init(player, true);
        player.tween.tween()
        if (player.tween.isPlaying()) {
          player.tween.pause();
        }
        player.tween.seek(jumpDict.end.time)
      }
    }

    function getResetFunc() {
      return function(player, play_after) {
        player.tween.seek(player.tweenConfig.duration);
        player.tween.dispose();
        var from = player.tweenConfig.from;
        var multiplier = player.prefs.reverseSpeed || 10;
        player.tweenConfig.from = player.tweenConfig.to;
        player.tweenConfig.to = from;
        player.tweenConfig.duration /= multiplier;
        player.control.time.duration /= multiplier;
        player.control.time.reverse = true;
        player.tweenConfig.finishCallback = function(player) {
          player.tweenConfig.to = player.tweenConfig.from;
          player.tweenConfig.from = from;
          player.tweenConfig.finishCallback = null;
          player.control.time.reverse = false;
          player.control.time.duration *= multiplier;
          player.tweenConfig.duration *= multiplier;
          return player;
        }
        player = player.init(player, true);
        player.tween.tween();
      }
    }

    function getSetFunction(player) {
      return function(property, value) {
        if (property in player.tweenConfig) {
          player.tweenConfig[property] = value;
          player.init(player, true);

        }
      }
    }



    function setPropPlayerFunctions(player) {
      player.state.propertyControls.forEach(function(prop, i) {
        player.state.propertyControls[i].player = {};
        player.state.propertyControls[i].player.play = playFunc(player.state.propertyControls[i], player);
        player.state.properties[i].player = {};
        player.state.properties[i].player.play = playFunc(player.state.propertyControls[i], player);
        player.state.properties[i].player.pause = pauseFunc(player.state.propertyControls[i], player);
        player.state.properties[i].player.reset = resetFunc(player.state.propertyControls[i], player);
        player.state.properties[i].player.stepTo = stepToFunc(player.state.propertyControls[i], player);

      })
      return player.state.propertyControls;

      function resetFunc(property, playerObj) {


        return function() {
            setAllInactive(property, player);
            property.active = true;
            playerObj = playerObj.reset(playerObj);
        }
      }

      function pauseFunc(property, playerObj) {
        return function() {
          // if (!property.active) {
              setAllInactive(property, playerObj);
              property.active = true;
            // }
            player.skip = '';

            playerObj.pause();
          }
        }

        function stepToFunc(property, playerObj) {
          return function(direction) {
            setAllInactive(property, player);
            if (!property.active) {
              property.player = true;
            }
            player.skip = '';
            property.time = playerObj.state.time
            playerObj.stepTo(direction);

          }
        }

      function playFunc(property, playerObj) {
        return function() {
          setAllInactive(property, playerObj);
          property.active = true;
          player.skip = '';
          // property.time = playerObj.state.time || property.time;
          // playerObj.play();
          // setPropPlayerFunctions();
        }
      }


      function setAllInactive(property, player) {
          player.skip = '';
          player.state.propertyControls.forEach(function(prop, i) {
            if (prop !== property) {

              if (prop.active) {
                prop.time = player.state.time;
                console.log('last time recordered before switch', prop.time)
              }
              prop.active = false;
              player.skip += prop.name + ' ';
            }
          })
      }


    }


    playerObj.init = function(playerObj, skip) {

      playerObj.state.time = 0
      playerObj.state.active = false;
      playerObj.state.paused = false;
      playerObj.state.percent= 0;
      playerObj.tween = new Tweenable();
      playerObj.tweenConfig.attachment = playerObj;
      playerObj.tweenConfig.durationFormatted = formatTime(playerObj.tweenConfig.duration, playerObj.control.time, playerObj.control.time.sigfig || 1);
      playerObj.play = getPlayFunction(playerObj);
      playerObj.pause = getPauseFunction(playerObj);
      playerObj.start = startTween;
      playerObj.stepTo = getStepToFunction(playerObj);
      playerObj.jumpTo = getJumpToFunction(playerObj);
      playerObj.reset = getResetFunc();
      playerObj.set = getSetFunction(playerObj);
      playerObj.state.propertyControls =  playerObj.state.propertyControls && setPropPlayerFunctions(playerObj);
      // playerObj.start =
      // playerObj.reverse = function(value) {tween.seek(value)};


      playerObj.inspect && $timeout(function() {
        !skip && playerObj.prefs && playerObj.prefs.playInfinite && playerObj.play();
      })
      playerObj.prefs && playerObj.prefs.startAt && playerObj.tween.seek(0).seek(playerObj.prefs.startAt.seek);
      if (playerObj.prefs) {
        elemAnimStates = playerObj.prefs.showStates(playerObj);
        playerObj.prefs.elemAnimStates = elemAnimStates
      }
      return playerObj
    }




    if (playerObj.inspect && !playerObj.inspectorInitialized) {
      playerObj.inspectorInitialized = true;
      playerObj.showProps && parseActiveProperties(playerObj, args.start, args.end, args.ease);
      $timeout(function() {

        // if (playerObj.inspectorInitialized) {
          playerObj = playerObj.init(playerObj);
          playerObj.inspectorInitialized = false;

           if (playerObj.inspect && playerObj.state.properties && playerObj.state.properties.length && playerObj.state.properties[0].control && (
              !playerObj.state.properties[0].control.ball.elem)) {

              playerObj.state.properties.forEach(function(pDict, i) {
                var ballElem = document.querySelector('#property-ball-' + i);
                var valueElem = document.querySelector('#property-value-' + i);
                var barElem = document.querySelector('#property-bar-' + i);
                var barElemWidth = barElem && barElem.getBoundingClientRect().width || playerObj.control.bar.width * .6;
                pDict.control = {ball: {elem: ballElem}, valueElem: valueElem, barWidth: barElemWidth};
                playerObj.state.propertyControls[i] = pDict.control;
              });
              // applyShowOptionPropertySpecificPlayerToTweenConfig(playerObj)
              playerObj = playerObj.init(playerObj);


            }

      }, 250)

    } else {
      playerObj = playerObj.init(playerObj);
      // console.log(playerObj.tweenConfig.easing)
    }

    return playerObj;
  }

  function getElemPlayFunction(elem, tweener) {
    return function() {
      tweener
    }
  }

  function processPropertyArgs(elem, property, arg_arr, state_name, apply_default) {
    var allTweens = TweenService.getAllEasing();
    var missing_args = [];
    var pObj = initPropertyObj();

    pObj.state_name = state_name;
    pObj.property = property;
    pObj.timingFunction = 'linear';
    if (pObj.property === 'draw') {

      // option 2
      // var pathLength = SVGService.svgShapeToPath(elem[0])[0].getTotalLength();


      var pathLength = SVGService.getTotalPathLength(elem[0])
      console.log('computing path length',  pathLength, '\n', elem[0])
      if (parseInt(arg_arr[0]) > 0) {
        arg_arr[0] = parseInt(pathLength) + ""
      }
      if (parseInt(arg_arr[1]) > 0) {
        // console.log(pathLength)
        // // var path = SVGService.svgShapeToPath(elem[0]);

        console.log(arg_arr[1])
        arg_arr[1] = parseInt(pathLength) + ""
      }
      var property = "stroke-dashoffset"
      pObj.property = property;
      console.log(pObj.property, arg_arr)
    }


    for (var i = 0; i < arg_arr.length; i++) {
      switch(i) {
        //potential start
        case (0):

          pObj.start[property] = processStartArg(arg_arr[i], property, apply_default);
          continue
        case (1):
          pObj.end[property] = processEndArg(arg_arr[i], property, apply_default) + "";
          continue
        case (2):
          pObj.duration = processDuration(arg_arr[i], property, apply_default);
          continue;
        case (3):

          pObj.ease = verifyAndProcessEaseArg(pObj, arg_arr[i], property, apply_default, allTweens.slice());
          continue;
        case (4):
            pObj.delay = processDuration(arg_arr[i], property, apply_default);
          continue;
        case (5):
            pObj.iter = processIterations(arg_arr[i], property, apply_default);
          continue;
        case (6):

            pObj.direction = processDirection(arg_arr[i], property, apply_default);

          continue;
      }
    }
    pObj.iter = pObj.iter || processIterations();
    pObj.direction = pObj.direction || processDirection();

    // pObj.iter.direction = pObj.direction
    return pObj;
  }

  function processDirection(str) {
    if (!str || !str.length) {
      str = 'f';
      return {value: str, current: 'f'};
    } else
    if (str === 'f') {
      return {value: 'f', current: 'f'};
    } else
    if (str === 'r') {
      return {value: 'r', current: 'r'};
    }
    else if (str === 'a') {
      return {value: 'a', current: 'f'};
    }
    else if (str === 'ar') {
      return {value: 'ar', current: 'r'};
    }
  }

  function processIterations(str, property, apply_default) {
    if (!str || !str.length)  return {count: 1, delay:0};
    var iterSplit = str.split('+').filter(function(s, i) {return s && s.length });
    iterSplit.forEach(function(s, i) {iterSplit[i] = parseInt(s)})
    if (!iterSplit.length) {
      iterSplit = [1, 0];
    }
    if (iterSplit.length === 1) {
      iterSplit.push(0)
    }
    return {
      count: iterSplit[0],
      delay: iterSplit[1]
    }

  }

  function processDuration(dur_str, prop, apply_default) {
    dur_str = dur_str.replace('d', '');
    if (dur_str.indexOf('ms') > -1) {
      return Math.round((parseFloat(dur_str.replace('ms', ''))/1000), 2)
    }
    else
      if (dur_str.indexOf('s') > -1) {
      return Math.round((parseFloat(dur_str.replace('', ''))*1000), 2)
    }
    else if (dur_str && dur_str.length && !apply_default) {
      return parseFloat(dur_str)
    } else if (apply_default && prop){
      return defaultPropAnimations[prop]["duration"];
    }
  }

  function verifyAndProcessEaseArg(obj, arg_str, prop, apply_default, easing_arr) {
    return arg_str
    // if (prop === 'transform') {
    //   var ease_dict = {ballControl: 'linear'};
    //   ease_dict[prop] = arg_str;
    //   return ease_dict
    // } else {
    //   return arg_str
    // }
  }

  function processEndArg(arg_str, prop, apply_default) {
    if (arg_str.trim() === '*' && apply_default) {
      return defaultPropAnimations[prop]["end"];
    } else if (arg_str && arg_str.length) {
      return arg_str;
    }
  }

  function processStartArg(arg_str, prop, apply_default) {
    arg_str = arg_str + '';
    if (arg_str && arg_str.trim() === '@') {
      return function(elem, prop) {
        return ele.style[prop];
      }
    } else if (arg_str.trim() === '*' && apply_default) {
      return defaultPropAnimations[prop]["start"];
    } else if (arg_str && arg_str.length) {
      return arg_str;
    }
  }

  function initPropertyObj() {
    return {
      property: null,
      start: {},
      end: {},
      ease: null,
      duration: 0
    }
  }

  function applyAnimationDefaultsToPropObj(p_obj) {
    if (!p_obj.fillMode) p_obj.fillMode = 'forwards';
    if (!p_obj.direction) p_obj.direction = 'normal';
    if (!p_obj.iterationCount) p_obj.iterationCount = 0;
    if (!p_obj.timingFunction) p_obj.timingFunction = 0;
    return p_obj;
  }

}
