angular.module('uguru.shared.services')
.factory("AnimationFrameService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'TweenService',
    'PropertyService',
    'RootService',
    AnimationFrameService
        ]);

function AnimationFrameService($timeout, $state, UtilitiesService, TweenService, PropertyService, RootService) {
    // https://developer.chrome.com/devtools/docs/demos/too-much-layout/index
    var player = initRAFPlayer();
    // var statePlayer = initStatePlayer();
    var state = getStateObj();
    var init = {state: state.init}
    var propOptions = getPropOptions();
    var cache = {states: [], elements: [], properties: []};

    return {
      init:init,
      getDebugFormat: getDebugFormat,
      getPlayer: getRAFPlayer
    };


    function getDebugFormat(arg_name, value) {
      value = value + ''
      if (arg_name === 'direction') {
        return {
          'f': 'forward',
          'r': 'reverse',
          'a': 'alternate',
          'ra': 'reverse alternate'
        }[value]
      }
      if (arg_name === 'iter') {
        return {
          'i': 'infinite',
          '-1': 'infinite'
        }[value]
      }
      if (arg_name === 'easingFunc' && value.indexOf('(') > -1) {
        return 'cb(' +  value + ')';
      }
      if (arg_name === 'duration' || arg_name === 'delay') {
        return value + 'ms'
      }
    }

    // function initStatePlayer() {


    // }
    function getRAFPlayer() {
      return player;
    }

    function initRAFPlayer()  {
      window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
      })();
      // return window.requestAnimationFrame
      var animationFrame = new AnimationFrame();

      return getPlayActiveAnimationsFunc(animationFrame, executeActiveStreams);


      // return animationFrame;
    }

    function executeActiveStreams(player, frame) {
      return function(time) {
        if (player.tick.current > -1 && player.active) {
          player.schedule.lastTimeDelta = time - player.time.delta;
          player.stepForward(player.schedule);
          player.time.delta = time;

          player.rAF_id = player.rAF.request(player.animFunc);


          // player.debug.status.update(player.tick.current);
          // player.active = false;
        } else {
          player.pause();
        }
      }
    }

    function getPlayActiveAnimationsFunc(frame, exec_anim_func) {
      var player = {rAF: frame, schedule:{upcoming:[], streams:[], status:{direction: 'f', iter:1, fps:60}, queued:[]}, tick:0, activeStreamIDs:[]};
      player.pause = function(player) {
        return function() {
          console.log('pausing...')
          player.rAF.cancel(player.rAF_id);
          player.rAF_id  = 0;
        };
      }(player)
      player.play = function() {

          if (!player.animFunc) {
            player.animFunc = exec_anim_func(player, player.rAF);
          }

          player.active = true;

          //starting
          if (player.tick.current === player.tick.start) {
            player.time = {start: window.performance.now(), delta: window.performance.now()};
          }
          if (player.tick.current <= 0) {
            player.reset(player.schedule);
          }
          // player.tick = 0;

          player.rAF_id = player.rAF.request(player.animFunc);
        }

      player.scheduleStream = function(player, state_obj, offset, debug) {
        var streams = state_obj.events;
        player.tick = {start: 0, end:0, current:0};
        var shallowCopyStreams = [];
        for (var i = 0; i < streams.length; i++) {
          var tick = {start:0, end: 0, current:0};
          var globalOffsetTicks = calculateStreamTickLength({duration: 0, offset:offset});
          var totalDurationAndDelayTicks = calculateStreamTickLength(streams[i]);
          var durationOnlyTicks = calculateStreamTickLength(streams[i], 0, 60, true);
          var delayOnlyTicks = calculateStreamTickLength({duration:0, offset:streams[i].offset})
          tick.end = durationOnlyTicks;
          tick.start = Math.round(0 - globalOffsetTicks - delayOnlyTicks);
          tick.current = Math.round(tick.start);
          player.tick.start = Math.max(Math.round(totalDurationAndDelayTicks + globalOffsetTicks), player.tick.start);
          player.tick.current = player.tick.start;
          shallowCopyStreams.push({applyProp:streams[i].applyAtT, time: {total: streams[i].duration, elapsed: 0}, offset: streams[i].offset, tick:tick, values:streams[i].values.slice()});
        }
        player.schedule.streams.push.apply(player.schedule.streams, shallowCopyStreams);


        if (debug) {
          enablePlayerDebugMode(player, state_obj)
        }
      }
      player.getSchedule = function() {
        return player.schedule;
      }


      function enablePlayerDebugMode(player, state) {
        if (!player.debug) {
          player.debug = {states: [], props:{}}
        }

        player.debug.states.push(state);

        player.debug.selectedState = state;
        player.debug.totalStreams = 0;
        player.debug.elemPlayer = {
          update: getElemPlayerElemFunc(player),
          ball: document.querySelector('[inspector-ball]'),
          bar: document.querySelector('[inspector-bar]'),
          duration: document.querySelector('[inspector-duration]'),
          time: {duration: state.duration, offset: state.offset, elapsed:0}
        }
        player.debug.states.forEach(function(state, i) {
            var props = state.props;
            console.log(state.props)
              for (prop in props) {
                player.debug.totalStreams += props[prop].length;
                if (! (prop in player.debug.props)){
                  player.debug.props[prop] = {values:[], name:prop, stateOffset: state.offset, stateDuration:state.duration};
                }
                if (!('easingFunc' in player.debug.props[prop])) {
                  player.debug.props[prop].easingFunc = 'linear'
                }
                if (!('iter' in player.debug.props[prop])) {
                  player.debug.props[prop].iter = 1
                }
                if (!('direction' in player.debug.props[prop])) {
                  player.debug.props[prop].direction = 'forwards';
                }
                var arraySections = props[prop];
                for (var j = 0; j < arraySections.length; j++) {
                  player.debug.props[prop].values.push(getSectionObj(arraySections[j], state.duration, state.offset));
                }
                // for (stream in props[prop]) {
                //   console.log(stream)
                //   // player.debug.props[prop].push(props[prop])
                // }
                // // player.debug.props[prop].push.apply(player.debug.props[prop], prop[props]);

              }
        })
        function getSectionObj(section, duration, offset) {
          section.html = {width: 0, left: 0}
          var totalAnimLength = duration;
          section.html.width = parseInt((section.duration)/(totalAnimLength *1.0) * 10000)/100
          section.html.left = 10 + (parseInt((section.offset)/(totalAnimLength) * 10000)/100);
          return section;
        }
        function getElemPlayerElemFunc(player) {
          return function(tick, time_delta) {

            player.debug.elemPlayer.time.elapsed += time_delta;
            var percent = parseInt((100 -  100 * tick.current/(tick.start)) * 100) / 100;
            player.debug.elemPlayer.bar.style.width = percent + '%';
            player.debug.elemPlayer.ball.style.left = percent + '%';
            player.debug.elemPlayer.duration.innerHTML = parseInt((player.debug.elemPlayer.time.duration + player.debug.elemPlayer.time.offset) * percent/100.0) + 'ms';

          }
        }

      }

      player.stepForward = function(schedule) {
        time_delta = schedule.lastTimeDelta;

        applyTickDeltaToStreams(player, schedule, time_delta, 1);
      }

      player.stepBack = function(schedule) {
        time_delta = schedule.lastTimeDelta;
        applyTickDeltaToStreams(player, schedule, time_delta * -1, -1);
      }

      player.jump = function(schedule, amount, is_reverse) {
        applyTickDeltaToStreams(player, amount);
      }

      player.reset = function(schedule) {

        player.tick.current = player.tick.start;
        schedule.streams.forEach(function(stream, i) {
          stream.tick.current = stream.tick.start;
          stream.time.elapsed = 0;
        })
        if (player.debug) {
          player.debug.elemPlayer.time.elapsed = 0;
          if (player.debug.elemPlayer.duration) {
            player.debug.elemPlayer.duration.innerHTML = 0 + 'ms';
          }
          if (player.debug.elemPlayer.bar) {
            player.debug.elemPlayer.bar.style.width = '0%';
          }
          if (player.debug.elemPlayer.ball) {
            player.debug.elemPlayer.ball.style.left = '0%';
          }
        }
      }


      function applyTickDeltaToStreams(player, schedule, time_delta, tick_delta, scale_delta) {
        if (!player.tick.current) {
          player.pause();
          player.active = false;
          var elem = document.querySelector('#pause-element')
          angular.element(elem).triggerHandler('click');
          // player.reset(schedule);
          return;
        }
        schedule.streams.forEach(function(stream, i) {
          if (stream.tick.current >= 0 && stream.tick.current <= stream.values.length) {
            stream.applyProp && stream.applyProp(stream.values[stream.tick.current]);
          }

          stream.tick.current += tick_delta;
          stream.time.elapsed += time_delta;

          if (stream.time.elapsed > stream.time.total) {
            return;
          }

        })


        if (player.debug) {
          player.debug.elemPlayer.update(player.tick, schedule.lastTimeDelta)
        }
        player.tick.current -= (tick_delta);
      }

      return player;

    }

    function calculateStreamTickLength(stream, g_offset, max_fps, ignore_offset) {
      max_fps = max_fps || 60;
      var tickLengthMS = 1000/max_fps;
      return Math.ceil(((stream.duration || 0)+ ((!ignore_offset && stream.offset) || 0) + (g_offset || 0)))/tickLengthMS;
    }


    function getStateObj() {
      return {
        init: initStateObj
      }
    }

    function filterParentheticals(str) {
      // console.log(filterParentheticals(str));
      var strSplit = str.split('(');
      if (strSplit.length > 1) {
        var firstPortion  = strSplit.splice(0, 1).join(":").trim();
        var parsedParenPortion = processParentheticals(strSplit).trim();
        return firstPortion + parsedParenPortion

      }
      return str;

      function processParentheticals(arr_parentheticals) {

        var endTrimmings = arr_parentheticals.join('(').split(')') || [];
        if (endTrimmings.length) {
          endTrimmings = endTrimmings[endTrimmings.length - 1]
        } else {
          endTrimmings = '';
        }
        console.log(arr_parentheticals, endTrimmings)
        var parenArgs = [];
        console.log(arr_parentheticals)
        arr_parentheticals.forEach(function(p_arg, i) {
          var innerArg = p_arg.split(')')[0];
          var innerArg = UtilitiesService.replaceAll(innerArg, ':', '|');
          parenArgs.push(innerArg);
        })
        if (endTrimmings.length) {
          parenArgs.push(endTrimmings);
        }
        // arr_parentheticals.join()
        return parenArgs.join(':');
      }

    }

      function initStateObj(stateName, str, elem, kf, debug) {

        str = str && UtilitiesService.replaceAll(str, ', ', ',');
        str = str && filterParentheticals(str)
        var stateArgs = str.split(',');
        var resultState = {duration: 0};
        var timeline = {events:[], props:{}, stateName: stateName};
        for (var i = 0; i < stateArgs.length; i++) {
          var iAnim = stateArgs[i];
          var isCustomAnim = isCustomAnimation(iAnim);

          if (isCustomAnim) {

            addCustomAnimPropsToTimeline(elem, iAnim, isCustomAnim, timeline, debug)


          } else {
            var iPropObj = initPropObj(iAnim);

            var offset = iPropObj.delay;
            var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;

            if (!(iPropObj.property in timeline.props)) {
              timeline.props[iPropObj.property] = [];
            }

            var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;
            var result = {
              duration: iPropObj.duration,
              id: timeline.events.length + 1,
              offset: iPropObj.delay,
              name: iPropObj.property,
              values: values,
              applyAtT: getApplyPropertyFunc(elem, iPropObj.property)
            }

            if (debug) {

              if (result.name === 'transform' && result.values[0].indexOf('matrix3d') === -1) {
                delete timeline.props['transform']
                addIndependentTransformPropsToTimeline(result, timeline);
                timeline.props[iPropObj.property].push(result);
              } else {
                timeline.props[iPropObj.property].push(result);
              }

              scaleTimelineValuesForPlot(timeline.props);

            }
            timeline.events.push(result);
          }
        }
        normalizeStateDurationAndDelay(timeline);
        if (debug) {
          cache.states.push(timeline);
          timeline.debug = true;
          timeline.id = cache.states.length;
        }

        return timeline;
        // timeline.events.forEach(function(e, i) {
        //   console.log(e.offset, e.duration, e.values.length)
        // })


        // #2, for each property get propertyObj
        // #3, getPropertyName

      }

      function getApplyPropertyFunc(elem, prop) {
        console.log(elem, prop)
        return function(value) {
          elem.style[prop] = value;
        }
      }



      function normalizeStateDurationAndDelay(timeline) {
        var delays = [];
        var maxLength = 0;
        var maxSpanEvent;
        for (var i = 0; i < timeline.events.length; i++) {
          delays.push(timeline.events[i].offset);
          var eventSum = timeline.events[i].offset + timeline.events[i].duration;
          if (eventSum > maxLength) {
            maxLength = eventSum;
            maxSpanEvent = timeline.events[i];
          }
        }

        timeline.duration = maxLength;
        timeline.offset = Math.min.apply(Math, delays);

        if (timeline.offset  > 0) {
          timeline.events.forEach(function(e, i) {timeline.events[i].offset -= timeline.offset});
          timeline.duration -= timeline.offset;
        }


      }

      function isCustomAnimation(anim_str) {
        var animStrArgs = anim_str.split(':');

        if (animStrArgs.length <= 3) {
          return false;
        }
        var animName = animStrArgs[0].trim();
        var allCustomAnimations = RootService.getCustomAnimations();
        var customAnimationNames = allCustomAnimations.customNameOnly;
        var customAnimIndex = customAnimationNames.indexOf(animName);
        if (customAnimIndex >= 0) {
          var customAnimObj = allCustomAnimations.custom[customAnimIndex];
          return PropertyService.parseAnimObjToPropArr(customAnimObj.cssRules).props;
        }
        return;
      }

      function addCustomAnimPropsToTimeline(elem, anim_str, custom_props, timeline, debug) {
        console.log()
        var animArgs = anim_str.split(':');
        var animDict = {};
        animDict.duration = parseInt(animArgs[1]);
        animDict.delay = parseInt(animArgs[3]) || 0;
        animDict.easingFunc = animArgs[2] || 'linear'
        animDict.iter = animArgs[4] || 1;
        animDict.direction = parseDirection(animArgs[5]) || 'f';

        for (var prop in custom_props) {
          var propValues = [];

          var propBreakpoints = custom_props[prop].sort(function(bp1, bp2) {return bp1.percent - bp2.percent });
          for (var i = 0; i < propBreakpoints.length - 1; i++) {
            if (!(prop in timeline.props)) {
              timeline.props[prop] = [];
            }
            var result = constructPropObjFromCustomBP(elem, prop, animDict, propBreakpoints[i], propBreakpoints[i + 1])

            if (debug) {

              if (result.name === 'transform' && result.values[0].indexOf('matrix3d') === -1) {
                delete timeline.props['transform']
                addIndependentTransformPropsToTimeline(result, timeline);
              } else {
                timeline.props[prop].push(result);
              }

            }
            timeline.events.push(result);
          }
        }
        if (debug) {
          scaleTimelineValuesForPlot(timeline.props);
        }
      }

      function scaleTimelineValuesForPlot(props) {
        for (var prop in props) {
          var propStreams = props[prop];
          var plotStats = {max: 0, min: 100000000000};
          propStreams.forEach(function(stream, i) {
            stream.plot = {max: 0, min: 100000000000, duration: 0, values:[]};
            stream.values.forEach(function(s_value, j) {
              var scaled_value = parseFloat(getArrayOfDecimals(s_value)[0]);
              if (scaled_value >= plotStats.max) {
                plotStats.max = scaled_value
              }
              if (scaled_value <= plotStats.min) {
                plotStats.min = scaled_value;
              }
              stream.plot.values.push(scaled_value);
            })
          })
          propStreams.forEach(function(stream, i) {
            stream.plot.max = plotStats.max;
            stream.plot.min = plotStats.min;
          })
        }
      }

      function getArrayOfDecimals(value) {
          var r = /[\d*\.?\d-*]+/g;
          var m;
          var resultArr = [];
          while ((m = r.exec(value)) != null) {
            resultArr.push(m[0]);
          }
          return resultArr
        }


      function addIndependentTransformPropsToTimeline(result, timeline) {
        // console.log('split timeline props for', result, timeline.events.length);
        var propNames = detectTransformProps(result.values[0])
        var detectAllNumbers = getArrayOfDecimals(result.values[0]);

        propNames.forEach(function(prop, i) {
            var values = [];
            var transformSingleProp = {};
            result.values.forEach(function(value, j) {
              if (!value) return;
              valueArr = result.values[j].split(' ');
              oneTransformPropValue = valueArr[i];
              values.push(oneTransformPropValue);
            })
            values.length && values.push(null);
            for (key in result) {
              transformSingleProp[key] = result[key];
            }
            transformSingleProp['values'] = values;
            console.log(result)
            transformSingleProp.name = propNames[i]
            transformSingleProp.applyAtT = null;
            transformSingleProp.skipPlot = false;
            if (!(prop in timeline.props)) {
              timeline.props[prop] = [];
            }
            timeline.props[propNames[i]].push(transformSingleProp);
        })
        // for (prop in result[props])
        // console.log(timeline.events)


        // for (var i = 0; result.values.length; i++) {

        // }



        function detectTransformProps(trans_value) {
          var propNames = (trans_value + "").split(' ')
          propNames.forEach(function(prop, i) {
            propNames[i] = prop.split('(')[0].trim();
          })
          return propNames
        }

      }

        function constructPropObjFromCustomBP(elem, prop_name, anim_info, bp_start, bp_end) {
          var bpDeltaDuration = ((bp_end.percent - bp_start.percent)/100.0) * anim_info.duration;
          var bpDeltaDelay = (bp_start.percent/100.0) * anim_info.duration + anim_info.delay;

          var values = TweenService.preComputeValues(prop_name, bpDeltaDuration, bp_start.value, bp_end.value, 'linear', {cache:[]}).cache;
          var result = {
            offset: bpDeltaDelay,
            duration: bpDeltaDuration,
            name: prop_name,
            easingFunc: anim_info.easingFunc,
            values: values,
            applyAtT: getApplyPropertyFunc(elem, prop_name)
          }

          return result;
          // var values =

        }



    /*** Init Obj functions
    ****
    */

    function initPropObj(str) {
      var strArgs = str.split(':');
      var strArgLength = strArgs.length;
      if (strArgLength < 8) {
        for (var i = 0; i < 8 - strArgLength; i++) {
          strArgs.push(null);
        }
        strArgLength = 8;
      }
      var prop = {};
      for (var i = 0; i < strArgLength; i++)  {
        var iArg = strArgs.shift();
        if (!prop.property)  {
          prop.property = iArg || 'transform'

          continue;
        }
        if (!prop.start) {
          prop.start = iArg || 0;
          continue
        }
        if (!prop.end) {
          prop.end = iArg || 1;
          continue
        }
        if (!prop.duration) {
          prop.duration = parseMSValue(iArg) || 1000;
          continue
        }
        if (!prop.easingFunc) {
          prop.easingFunc = iArg || 1000;
          continue
        }
        if (!prop.delay) {
          prop.delay = parseMSValue(iArg) || 0;
          continue
        }
        if (!prop.iter) {
          prop.iter = (iArg && parseInt(iArg)) || 1;
          continue
        }
        if (!prop.direction) {
          prop.direction = iArg && parseDirection(iArg) || 'f';
          continue
        }
      }
      return prop
    }

    function parseMSValue(str_ms) {
      return parseInt(str_ms);
    }

    function parseDirection(direction) {

      if (!(direction in propOptions.direction)) return 'f';
      return direction;
    }

    function getArrProperties(property, start, end, duration) {

    }

    function getPropOptions() {
      return {
        direction: ['f', 'a', 'r', 'ra'],
        debug: {}
      }
    }

}
