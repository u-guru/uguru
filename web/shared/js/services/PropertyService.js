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
  var playerControlElems= {ball: null, bar: null};
  return {
    initPropertyObj: initPropertyObj,
    getBlacklistStates: getBlacklistStates,
    getFrameAnimationFunc: getFrameAnimationFunc,
    getDefaultAnimProp: getDefaultAnimProp,
    detectAndInitAnimationProperty: detectAndInitAnimationProperty,
    defaultPropAnimations: defaultPropAnimations,
    detectPlaybarControlElem: detectPlaybarControlElem
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
    return playerControlElems
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
      if (preferences[key].length || typeof(preferences[key]) === 'boolean') {
        filledPreferences[key] = preferences[key];
      }
    }
    player.prefs = filledPreferences
  }

  function initPlayerFromArgs(elem, args, previous_player) {
    // args.player = getPlayerObj();







    var playerObj = {state: {time: 0, active: false, paused: false}};

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
      playerObj.tween = new Tweenable();
      playerObj.elem = elem;
    } else {
      playerObj = combinePreviousWithNewProp(args, previous_player);
    }


    if (elem.hasAttribute('inspector-elem')) {
      RootService.addElemToInspector(playerObj);
    }

    $timeout(function() {
      playerObj.control = detectPlaybarControlElem();
      if (playerObj.control && playerObj.control.ball && playerObj.control.ball.elem) {
        playerObj.tweenConfig.from['ballControl'] = 'translateX(0px)';
        playerObj.tweenConfig.to['ballControl'] = 'translateX(' + playerObj.control.bar.width + 'px)';
        playerObj.tweenConfig.easing['ballControl'] = playerObj.tweenConfig.easing[Object.keys(playerObj.tweenConfig.easing)[0]];
        !playerObj.prefs && applyInspectorGadgetPreferences(playerObj);
      }
    })
    // detectPlaybarControlElem();





    //transform playerObj based on gadget preferences


    function applyPropToElem(state, args, time) {
      if (args.control && args.control.ball.elem) {
        args.control.ball.elem.style.transform =  state['ballControl'];
      }
      args.state.time = time;
      for (prop in state) {
        args.elem.style[prop] = state[prop];
      }
    }

    function startTween(state, args) {
      // console.log(args)
      // console.log('starting...', state, args);
    }

    function finishTween(state, player) {
        player.state.active = false;
        player.state.time = 0;
        player.state.active = false;
        player.state.paused = false;
        player.tween.dispose();
        $timeout(function() {
          player.state.active = false;
        })
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
      return function(ms) {

        var ms = parseFloat(ms);

        var seekTotal = player.state.time + ms;
        console.log('stepping', ms, 'to', seekTotal);
        player.tween.seek(seekTotal);
      }
    }

     function getResetFunc() {
      return function(player, play_after) {
        player.tween.seek(player.tweenConfig.duration);
        player.tween.stop(true);
        player.state.time = 0;
        player.state.active = false;
        player.state.paused = false;
        player.tween.dispose();
        player = player.init(player);
        $timeout(function() {
          playerObj.prefs.autoPlay && playerObj.play()
        })
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


    playerObj.init = function(playerObj) {
      playerObj.state.time = 0
      playerObj.state.active = false;
      playerObj.state.paused = false;
      playerObj.state.percent= 0;
      playerObj.tween = new Tweenable();
      playerObj.tweenConfig.attachment = playerObj
      playerObj.play = getPlayFunction(playerObj);
      playerObj.pause = getPauseFunction(playerObj);
      playerObj.stepTo = getStepToFunction(playerObj);
      playerObj.reset = getResetFunc();
      playerObj.set = getSetFunction(playerObj);
      // playerObj.reverse = function(value) {tween.seek(value)};
      $timeout(function() {
        playerObj.prefs.playInfinite && playerObj.play();
      })

      return playerObj
    }
    playerObj = playerObj.init(playerObj);
    $timeout(function() {
      if (playerObj.prefs && playerObj.prefs.autoPlay) {
        console.log('detected auto play')
          playerObj.play();
      }
    })

    return playerObj;
  }

  // function getPlayFunc(tween) {
  //   return function(state, args, timer) {
  //     console.log('playing...')
  //     tween.seek(0);
  //     // if (tween.isPlaying) return;
  //     $timeout(function() {
  //       tween.resume();
  //     })
  //   }
  // }

  // function getPauseFunc(tween) {
  //   return function() {
  //     tween.pause();
  //   }
  // }

  // function getResetFunc(tween) {
  //   return function() {
  //     console.log('reseting...');
  //     tween.seek(0);
  //     $timeout(function() {
  //       tween.resume();
  //     })
  //   }
  // }

  // function getPlayFunc(tween) {
  //   return function(state) {
  //     if (tween.isPlaying) return;
  //     tween.resume();
  //   }
  // }

  // function initPlayerObj() {
  //   return function() {
  //     play: getElemPlayFunction,
  //     pause: getElemPauseFunction,
  //     stepFront: getElemStepFunction,
  //     stepBack: getElemBackFunction,
  //     reset: getElemResetFunction,
  //   }
  // }

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
          continue;
        case (4):
          pObj.delay = processDuration(arg_arr[i], property, apply_default);
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
    if (arg_str.indexOf(' ') > -1 && prop in obj.start && obj.start[prop].indexOf(' ') > -1) {

      var startProps = obj.start[prop].split(' ');
      var easeDict = {};
      startProps.forEach(function(prop, i) {easeDict[prop.split('(')[0]] = arg_str.split(' ')[i].split('(')[0]})
      return easeDict;
    } else {
      easing_arr = easing_arr.slice();
      easing_arr.forEach(function(e, i) {easing_arr[i] = e.toLowerCase()});
      if (arg_str.indexOf('*') > -1 && apply_default) {
        return defaultPropAnimations[prop]["ease"];
      } else
      if (easing_arr.indexOf(arg_str.toLowerCase()) > -1) {
        return arg_str.trim()
      }
    }
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
