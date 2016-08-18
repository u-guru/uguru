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
  var rFrameEasingCache = {}
  return {
    initPropertyObj: initPropertyObj,
    getBlacklistStates: getBlacklistStates,
    getFrameAnimationFunc: getFrameAnimationFunc,
    getDefaultAnimProp: getDefaultAnimProp,
    detectAndInitAnimationProperty: detectAndInitAnimationProperty,
    defaultPropAnimations: defaultPropAnimations
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

    console.log(args, player);
    args.player = initPlayerFromArgs(elem[0], args, previous_player);

    return args;

    // console.log(property, arg_arr, state_name, apply_default);
  }

  function initPlayerFromArgs(elem, args, previous_player) {
    // args.player = getPlayerObj();

    var playerObj = {};
    if (!previous_player) {
      playerObj.elem = elem;
    } else {
      playerObj = previous_player;
    }


    args.elem = elem;
    playerObj.tween = new Tweenable();
    playerObj.tweenConfig = {
      from: args.start,
      to: args.end,
      duration: args.duration,
      easing: args.ease,
      attachment: args,
      startTween: startTween,
      step: applyPropToElem,
      finish: finishTween
    }

    // playerObj.tween.setConfig(playerObj.tweenConfig);

    function applyPropToElem(state, args, time) {
      for (prop in state) {
        // console.log(time + 'ms', (time/args.duration * 100).toFixed(2) + '%', prop, state[prop])
        elem.style[prop] = state[prop];
      }
    }

    function startTween(state, args) {
      console.log('starting...', state, args);
    }

    function finishTween(state, args) {
        playerObj = playerObj.reset(playerObj)

    }

    function getPlayFunction(tween, config) {
      return function() {
        tween.setConfig(config); tween.tween()
      };
    }

    function getPauseFunction(tween, config) {
      return function() {
        tween.pause();
      }
    }

    function getStepToFunction(tween, config) {
      return function(ms) {
        tween.seek();
      }
    }

    playerObj.reset = function(playerObj) {
      playerObj.tween.dispose();
      playerObj.tween = new Tweenable();
      playerObj.play = getPlayFunction(playerObj.tween, playerObj.tweenConfig);
      playerObj.pause = getPauseFunction(playerObj.tween);
      playerObj.stepTo = getStepToFunction(playerObj.tween);
      // playerObj.reverse = function(value) {tween.seek(value)};
      return playerObj
    }
    playerObj = playerObj.reset(playerObj)
    if (elem.hasAttribute('inspector-elem')) {
        RootService.addElemToInspector(playerObj);
      }

    // tween.setConfig({
    //   from: args.start,
    //   to: args.end,
    //   duration: args.duration,
    //   easing: args.ease,
    //   attachment: args,
    //   step: function(state, args, time) {
    //     args.time = time;
    //     for (property in state) {
    //       // console.log(property, state[property], time)
    //       if (property === 'opacity') {
    //         elem.setAttribute('style', 'opacity:' + state[property]);
    //       } else {
    //         elem.style[property] = state[property];
    //         // console.log(property, state[property])
    //       }

    //     }
    //   },
    //   finish: function(state, args, time) {
    //     console.log('disposing..');
    //     // tween.dispose();
    //     tween.tween();
    //     tween.seek(100);
    //     $timeout(function() {
    //       tween.resume();
    //     })
    //     // tween.resume();
    //   }
    // })

    // playerObj.play = getPlayFunc(tween);
    // playerObj.tween = tween
    // playerObj.reset = getResetFunc(tween);
    // playerObj.pause = getPauseFunc(tween);
    // playerObj.info = args.time;

    return playerObj;
    // playerObj.state =  {offset: 0, state: 'idle', speed: '1x'};
    // player.pause = getPauseFunc(elem, tween);
    // player.jump = getJumpFunction(elem, tween);
    // player.stepTo = getStepFunction(elem, tween);
    // player.reverse = getReverseFunction(elem, tween);
    // player.reset = getResetFunction(elem, tween);
    // player.playWithSpeed = getPlayWithSpeedFunction(elem, tween, player.state);

  }

  function getPlayFunc(tween) {
    return function(state, args, timer) {
      console.log('playing...')
      tween.seek(0);
      // if (tween.isPlaying) return;
      $timeout(function() {
        tween.resume();
      })
    }
  }

  function getPauseFunc(tween) {
    return function() {
      tween.pause();
    }
  }

  function getResetFunc(tween) {
    return function() {
      console.log('reseting...');
      tween.seek(0);
      $timeout(function() {
        tween.resume();
      })
    }
  }

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
    console.log(arg_str, obj.start)
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
    if (arg_str.trim() === '@') {
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
