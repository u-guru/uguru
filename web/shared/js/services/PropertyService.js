angular.module('uguru.shared.services')
.factory("PropertyService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'TweenService',
    'RootService',
    'XHRService',
    PropertyService
        ]);

function PropertyService($timeout, $state, UtilitiesService, TweenService, RootService, XHRService) {
  var blacklistStates = ['init-with', 'init-later'];
  var defaultPropAnimations = {};
  var rFrameEasingCache = {};
  var defaults = {};
  defaults.FPS_SIXTY = 1000/16;
  var playerControlElems= {ball: null, bar: null, time:null};
  return {
    initPropertyObj: initPropertyObj,
    getBlacklistStates: getBlacklistStates,
    getFrameAnimationFunc: getFrameAnimationFunc,
    getDefaultAnimProp: getDefaultAnimProp,
    detectAndInitAnimationProperty: detectAndInitAnimationProperty,
    defaultPropAnimations: defaultPropAnimations,
    detectPlaybarControlElem: detectPlaybarControlElem,
    getPropJson: getPropJson
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

    var args = processPropertyArgs(property, arg_arr, state_name, apply_default);
    args.stateNameCamel = UtilitiesService.camelCase(state_name);
    args.stateName = state_name;
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
    previous_player.tweenConfig.from[prop_args.property] = prop_args.start[prop_args.property];
    previous_player.tweenConfig.to[prop_args.property] = prop_args.end[prop_args.property];
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
      switch (startOption) {
        case ("t") :
          // var seekMS = player.tweenConfig.duration
          filledPreferences.startAt = {seek: startValue};
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
      console.log(filledPreferences.hideProp)

    // }

    }



    player.prefs = filledPreferences
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

            if (prop.type === 'transform') {
              console.log('transform');
            }
            playerObj.tweenConfig.easing.propControl += prop.easing + ' ';

            playerObj.state.propertyControls.push(prop.control);
          } else {

          }
      })
      playerObj.tweenConfig.easing.propControl = playerObj.tweenConfig.easing.propControl.trim()
      if ('undefined' in playerObj.tweenConfig.easing) {
        delete playerObj.tweenConfig.easing['undefined']
      }
      playerObj.tweenConfig.to.propControl = playerObj.tweenConfig.to.propControl.trim();
      playerObj.tweenConfig.from.propControl = playerObj.tweenConfig.from.propControl.trim();
      console.log(playerObj.tweenConfig.from.propControl)
      console.log(playerObj.tweenConfig.to.propControl)
      console.log(playerObj.tweenConfig.easing.propControl)
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

      // pDict.easing = key in easing && easing[key].trim() || 'linear';
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
        pDict.easing = easing[key];
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

    var playerObj = {state: { time: 0, active: false, paused: false}, control: {time: {duration: args.duration || previous_player.duration, sigfig: 1}}};
    console.log(args.ease)
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

    playerObj.tween = new Tweenable();



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
      var skipArgs;
      if (args.control && args.control.ball) {
        args.control.ball.elem.style.transform =  state['ballControl'];
        args.control.time.elem.innerHTML = formatTime(time, args.control.time)
      }

      if (args.prefs && args.prefs.showProps) {
        if (Math.abs(prop.time - time) > 2 * defaults.FPS_SIXTY) return;
        args.state.propertyControls.forEach(function(prop, i) {

          if (!prop.active) return;
          var ballValue = state['propControl'].split(' ')[i];
          var propName = args.state.propertyControls[i].name;
          var propValue = state[propName];
          prop.ball.elem.style.transform = ballValue;
          prop.time = time;
          prop.valueElem.innerHTML = propValue.split(' ').length === 1 && propValue || propValue.split(' ')[i].split('(')[1].replace(')', '');
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
        if (args.inspect && args.skipProp && args.skipProp.indexOf(prop) > -1) {
          console.log('skipping', prop);
          continue
        };
        args.elem.style[prop] = state[prop];
        args.inspect && args.prefs.showLog && args.state.active && prop.indexOf('Control') === -1 && time >= 0 && time <= args.tweenConfig.duration && console.log(prop + ':' + state[prop])
      }
      args.inspect && args.prefs.showLog && args.state.active && console.log('\n')
    }

    function startTween(state, args) {
      // console.log(args)
      // console.log('starting...', state, args);
      // console.log(state, args)
      args.prefs && args.prefs.showLog && console.log('-----Animation starting ---')
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
        player.inspect && player.prefs.showLog && console.log('-----Animation successfully finished---')
        player = player.init(player);
      }

    function getPlayFunction(player) {

      player.tween.setConfig(player.tweenConfig)

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
            console.log('new total', seekTotal)
        }
        player.tween.seek(seekTotal);
      }
    }

    function getJumpToFunction(player) {
      return function($event) {
        var initialTo = player.tweenConfig.to;
        var initialFrom = player.tweenConfig.from;
        var initialDuration = player.tweenConfig.duration;
        parentRect = player.control.bar.elem.parentNode.getBoundingClientRect()
        ballRectLeft = player.control.ball.elem.getBoundingClientRect().left;
        var parentWidth = parentRect.width;
        var jumpToCoordX = $event.clientX - parentRect.left;
        var reverse = ballRectLeft > jumpToCoordX;

        var jumpDict = {start: {}, end: {}};

        if (player.state.time > 0) {
          jumpDict.start.state =  player.state.time && player.tween.get();
          jumpDict.start.time = player.state.time;
          // console.log('jumping with time already > 0 && reverse', reverse);
        } else if (reverse && !player.state.time) {
          jumpDict.start.state =  player.tweenConfig.to;
          jumpDict.start.time = player.tweenConfig.duration;
          // console.log('jumping with animation complete && reverse', reverse);
        } else if (!reverse && !player.state.time) {
          jumpDict.start.time = 0;
          jumpDict.start.state = player.tween.get();
          // console.log('jumping with time = 0')
        }



        jumpDict.end.time = parseInt(player.tweenConfig.duration * (jumpToCoordX/parentWidth));
        jumpDict.end.state = player.tween.pause().seek(jumpDict.end.time).get()
        player.tween.seek(jumpDict.start.time)
        player.tween.dispose()

        player.tweenConfig.from = jumpDict.start.state;
        player.tweenConfig.to = jumpDict.end.state;
        player.tweenConfig.duration = Math.abs(jumpDict.end.time - jumpDict.start.time);
        player.control.time.duration = player.tweenConfig.duration
        player.control.time.reverse = reverse;
        player.tweenConfig.finishCallback = function(player) {
          player.tweenConfig.to = initialTo;
          player.tweenConfig.from = initialFrom;
          player.tweenConfig.finishCallback = null;
          player.control.time.reverse = false;
          player.control.time.duration = initialDuration;
          player.tweenConfig.duration = initialDuration;
          return player;
        }
        player = player.init(player, true);
        player.tween.tween();


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
          player.reset(player, true);

        }
      }
    }

    function setPropPlayerFunctions(player) {
      player.state.propertyControls.forEach(function(prop, i) {
        player.state.propertyControls[i].player = {};
        player.state.propertyControls[i].player.play = playFunc(player.state.propertyControls[i], player);
        player.state.properties[i].player = {};
        player.state.properties[i].player.play = playFunc(player.state.propertyControls[i], player);
        // prop.player = {
        //   play:
        // };

        console.log(player, prop.name, prop.splitIndex)
        // prop.play = playFunc;

      })
      console.log(player.state.propertyControls)
      return player.state.propertyControls;

      function stepFunc(property, playerObj) {

      }

      function pauseFunc(property, playerObj) {

      }

      function playFunc(property, player) {
        console.log('playing..', property);
        return function() {
          console.log('actual', property.splitIndex);
          player.skip = '';
          player.state.propertyControls.forEach(function(prop, i) {
            if (prop !== property) {
              prop.active = false;
              player.skip += prop.name + ' ';
            } else {
              console.log('still playing..', property.name);
            }
          })
          console.log(player.skip)
          playerObj.play();
        }
      }



      function coreFunc(property, playerObj) {

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
      // playerObj.jumpTo = getJumpToFunction(playerObj);
      playerObj.reset = getResetFunc();
      playerObj.set = getSetFunction(playerObj);
      playerObj.state.propertyControls =  playerObj.state.propertyControls && setPropPlayerFunctions(playerObj);
      // playerObj.start =
      // playerObj.reverse = function(value) {tween.seek(value)};
      playerObj.inspect && $timeout(function() {
        !skip && playerObj.prefs && playerObj.prefs.playInfinite && playerObj.play();
      })
      playerObj.prefs && playerObj.prefs.startAt && playerObj.tween.seek(0).seek(playerObj.prefs.startAt.seek);
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
              console.log(playerObj)
              playerObj = playerObj.init(playerObj);

              playerObj.tween
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

  function processPropertyArgs(property, arg_arr, state_name, apply_default) {
    var allTweens = TweenService.getAllEasing();
    var missing_args = [];
    var pObj = initPropertyObj();

    pObj.state_name = state_name;
    pObj.property = property;
    pObj.timingFunction = 'linear';



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
          console.log(pObj)
          continue;
        case (4):
          pObj.delay = processDuration(arg_arr[i], property, apply_default);
          continue;
      }
    }


    return pObj;

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

  function getBlacklistStates() {
    return blacklistStates;
  }

  function detectAndInitAnimationProperty(name, value, _dict) {
    if (!defaultPropAnimations || !Object.keys(defaultPropAnimations).length) {
      getDefaultAnimProp(defaultPropAnimations);
      $timeout(function() {
        detectAndInitAnimationProperty(name, value, _dict);
      }, 1000)
      return;
    }
    //check
    if (name in defaultPropAnimations || value.split(':').length > 2) {
      console.log('ayy animation', name, value)
    }
  }



}
