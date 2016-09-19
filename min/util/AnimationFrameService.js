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
    var animShortcuts = getAnimShortcuts(RootService);

    return {
      init:init,
      getDebugFormat: getDebugFormat,
      getPlayer: getRAFPlayer,
      animShortcuts:animShortcuts
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

        if (value === 'i' || value === '-1') {
          return 'inf'
        } else {
          return value
        }
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
          console.log(player.tick.current)
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
            // player.applyArgs(player.schedule.streams, player.debug);
            player.time = {start: window.performance.now(), delta: window.performance.now()};

          }
          if (player.tick.current <= 0) {
            player.reset(player);
          }
          // player.tick = 0;

          player.rAF_id = player.rAF.request(player.animFunc);
        }

      player.scheduleStream = function(player, state_obj, offset, debug) {
        console.log('scheduling streams')
        var streams = state_obj.events;
        player.tick = {start: 0, end:0, current:0};
        if (debug && state_obj.playerProps) {
          player.playerProps = state_obj.playerProps
          player.playerProps.iter.count.current = player.playerProps.iter.count.current + 0;
        }
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
          var newStream = {applyProp:streams[i].applyAtT, iter:streams[i].iter, name:streams[i].property || streams[i].name, direction: streams[i].direction, time: {total: streams[i].duration, elapsed: 0}, offset: streams[i].offset, tick:tick, values:streams[i].values.slice()}
          shallowCopyStreams.push(newStream);
        }
        // player.applyArgs(player.schedule.streams, player.debug);
        shallowCopyStreams.forEach(function(stream, i) {
          console.log(stream.name, stream.direction, stream.tick, player.tick)
          // if (['r', 'ra'].indexOf(stream.direction.value) > -1) {

          //   stream.values.reverse();
          //   stream.tick.current = -1 * (player.tick.current + stream.tick.current);
          // }
        })
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
          count: document.querySelector('[inspector-count]'),
          direction: document.querySelector('[inspector-direction]'),
          time: {duration: state.duration, offset: state.offset, elapsed:0}
        }
        player.debug.states.forEach(function(state, i) {
            var props = state.props;
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
        $timeout(function() {
          updatePlayerArgs(player, true);
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

      function updatePlayerArgs(player, skip_first) {
        if (!skip_first && player.playerProps) {

          if (!player.playerProps.iter.infinite) {
            console.log('decremented', player.playerProps.iter.count.current + "")
            player.playerProps.iter.count.current = player.playerProps.iter.count.current - 1;
          } else {
            player.playerProps.iter.count.current = player.playerProps.iter.count.current + 1;
          }

        }
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
            if (player.debug.elemPlayer.count) {
              var iterVal;
              if (!player.playerProps) {
                iterVal = player.schedule.streams[0].iter.count.current;
              } else {
                if (player.playerProps.iter.infinite) {
                  iterVal = getDebugFormat('iter', 'i') + '&nbsp;&nbsp;|&nbsp;&nbsp;' + player.playerProps.iter.count.current;
                } else {
                  iterVal = player.playerProps.iter.count.current;
                }
              }
              player.debug.elemPlayer.count.innerHTML = iterVal;
            }
            if (player.debug.elemPlayer.direction) {
              var direction;
              if (!player.playerProps) {
                direction = player.schedule.streams[0].direction.current;
              } else {
                direction = player.playerProps.direction.current;
              }

              player.debug.elemPlayer.direction.innerHTML = getDebugFormat('direction',  (direction + ''));
            }
            if (!skip_first && player.playerProps) {
              if (['ra', 'a'].indexOf(player.playerProps.direction.value) > -1) {
                if (player.playerProps.direction.current === 'f') {
                  player.playerProps.direction.current = 'r';
                } else {
                  player.playerProps.direction.current = 'f';
                }
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

      player.applyArgs = function(streams) {
        var propStreams = {};
        streams.forEach(function(stream, index) {
          console.log(stream)
          if (['ra', 'r'].indexOf(stream.direction.current) > -1) {
            stream.values.reverse();
          }
        });
      }

      player.updateArgs = function(player) {
        var playerPropCount = {};
        var minPlayerOffset = 0;
        var streamCache = [];
        player.schedule.streams.slice().forEach(function(stream, i) {
          var streamPopped = player.schedule.streams.shift();
          var streamDelay = 0;
          if (!stream.iter.infinite) {
            streamPopped.iter.count.current--;
          }
          if (streamPopped.iter.count.current >= 1) {



            // streamPopped.tick.current = streamPopped.tick.start;
            streamPopped.time.elapsed = 0;

            if (stream.iter.btwn > 0) {

              var tickLengthMS = 1000/60;
              var currentBefore = streamPopped.tick.current;
              var btwnChange = Math.ceil(streamPopped.iter.btwn/tickLengthMS);
              if (Math.abs(btwnChange) > minPlayerOffset) {
                minPlayerOffset =   Math.abs(btwnChange);
              }
              // streamPopped.tick.current -= btwnChange;
            }
            if (['ra', 'a'].indexOf(streamPopped.direction.value) > -1) {
              console.log(streamPopped.direction)
              if (streamPopped.direction.current === 'f') {
                streamPopped.direction.current = 'r';

              } else {
                streamPopped.direction.current = 'f';
              }
              streamPopped.values.reverse();

            }

            if (!(stream.name in playerPropCount)) {
              playerPropCount[stream.name] = [];
            }

            playerPropCount[stream.name].push(streamPopped);
          } else {
            streamCache.push(streamPopped);
          }
        });

        // if (minPlayerOffset && player.debug) {
        //     player.tick.current = player.tick.start + minPlayerOffset;
        //   }
        player.tick.current = player.tick.start + minPlayerOffset;

        for (key in playerPropCount) {
          playerPropCount[key].forEach(function(stream, i) {
            if (['ra', 'a'].indexOf(stream.direction.value) > -1) {

              if (stream.direction.current === 'r') {
                stream.tick.current = -1 * (player.tick.current + stream.tick.start);
              } else {
                stream.tick.current = stream.tick.start;
              }
            }

            player.schedule.streams.push(stream);
          })
        }

        updatePlayerArgs(player);
        if (player.schedule.streams.length) {

          player.time = {start: window.performance.now(), delta: window.performance.now()};
          player.active = true;

        } else {
          player.pause();
          player.schedule.streams = streamCache
          if (player.debug) {
            var elem = document.querySelector('#pause-element')
            angular.element(elem).triggerHandler('click');
          }
        }

      }

      player.reset = function(player, and_play) {
        var schedule = player.schedule;
        player.tick.current = player.tick.start;
        if (player.playerProps) {
          player.playerProps.iter.count.current = player.playerProps.iter.count.total + 1;

        }

        player.schedule.streams.forEach(function(stream, i) {

            stream.time.elapsed = 0;

            // set back to original
            stream.tick.current = stream.tick.start;

            stream.iter.count.current = stream.iter.count.total + 1;
            if (['ra', 'r'].indexOf(stream.direction.value) > -1) {
              stream.direction.current = 'r';
            } else {
              stream.direction.current = 'f';
            }
        })
        // if (player)
        player.animFunc = exec_anim_func(player, player.rAF);
        // if (player.playerProps && ['ra', 'a'].indexOf(player.playerProps.direction.value) > -1) {
        //   if (player.playerProps.direction.current === 'ra') {
        //     player.playerProps.direction.current = 'r';
        //   }
        // }
        player.updateArgs(player)
        updatePlayerArgs(player, true)


        // player.stepForward(player.schedule)
        player.active = false;
      }


      function applyTickDeltaToStreams(player, schedule, time_delta, tick_delta, scale_delta) {
        if (!player.tick.current) {
          // player.pause();
          player.active = false;


          player.updateArgs(player)

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
      var firstPortion = '';
      var checkForSinglePropStr = str.split(':');
      if (checkForSinglePropStr.length > 5) {
        firstPortion = checkForSinglePropStr.splice(0,3);
        str = checkForSinglePropStr.join(':')
      }
      var strSplit = str.split('(');
      if (strSplit.length > 1) {

        firstPortion = firstPortion.join(':') + ':' + strSplit.splice(0, 1).join(":").trim();

        var parsedParenPortion = processParentheticals(strSplit).trim();
        var result = UtilitiesService.replaceAll(firstPortion + parsedParenPortion, '::', ':');
        return result
      } else {
        str = firstPortion.join(':') + ':' +  str;
      }
      return str;

      function processParentheticals(arr_parentheticals) {

        var endTrimmings = arr_parentheticals.join('(').split(')') || [];
        if (endTrimmings.length) {
          endTrimmings = endTrimmings[endTrimmings.length - 1]
        } else {
          endTrimmings = '';
        }
        var parenArgs = [];
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

      function replaceShortcutSyntax(str) {
        var strSplit = str.split(':');
        if (strSplit.length <= 5) return str;

        var firstArgs = strSplit.splice(0,3);
        var formattedArgs = checkAndParseTransform(firstArgs[0], firstArgs[1], firstArgs[2]);
        var formattedArgs = checkAndParseShortcuts(formattedArgs[0], formattedArgs[1], formattedArgs[2]);
        var result = formattedArgs.join(':') + ':' + strSplit.join(':');

        return result;

        function checkAndParseTransform(prop, start, end) {
          return animShortcuts.func.transform(prop,start,end);
        }
        function checkAndParseShortcuts(prop, start, end) {
          var start = animShortcuts.func.valueStrMatch(start);
          var end = animShortcuts.func.valueStrMatch(end);
          console.log('checking', start, end)
          return [prop, start, end];
        }

      }

      function initStateObj(stateName, str, elem, kf, debug) {

        str = str && UtilitiesService.replaceAll(str, ', ', ',');
        str = str && filterParentheticals(str)
        str = str && replaceShortcutSyntax(str);
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
            timeline.playerProps = {
              direction: iPropObj.direction,
              iter: JSON.parse(JSON.stringify(iPropObj.iter))
            }
            var offset = iPropObj.delay;
            var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;

            if (!(iPropObj.property in timeline.props)) {
              timeline.props[iPropObj.property] = [];
            }

            // var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;

            var result = {
              duration: iPropObj.duration,
              id: timeline.events.length + 1,
              offset: iPropObj.delay,
              direction: iPropObj.direction,
              iter: iPropObj.iter,
              name: iPropObj.property,
              values: values,
              applyAtT: getApplyPropertyFunc(elem, iPropObj.property)
            }

            if (debug) {

              if (result.name === 'transform' && result.values[0].indexOf('matrix3d') === -1) {
                delete timeline.props['transform'];
                addIndependentTransformPropsToTimeline(result, timeline);

                // timeline.props[iPropObj.property].push(result);
              } else {
                timeline.props[iPropObj.property].push(result);
              }

              scaleTimelineValuesForPlot(timeline.props, result.direction.current);

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


      }

      function getApplyPropertyFunc(elem, prop) {
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

        var animArgs = anim_str.split(':');

        var animDict = {};
        animDict.duration = parseInt(animArgs[1]);
        animDict.delay = parseInt(animArgs[3]) || 0;
        animDict.easingFunc = animArgs[2] || 'linear'

        animDict.iter = parseIteration(animArgs[4]) || parseIteration("1");
        animDict.direction = parseDirection(animArgs[5]) || parseDirection("f");
        timeline.playerProps = {iter: animDict.iter, direction:animDict.direction};
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
          console.log(animDict.direction.current)
          scaleTimelineValuesForPlot(timeline.props, animDict.direction.current);
        }
      }

      function scaleTimelineValuesForPlot(props, direction) {
        for (var prop in props) {
          var propStreams = props[prop];
          if (['r', 'ra'].indexOf(direction) > -1) {
            propStreams.reverse();
          }
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
            if (['r', 'ra'].indexOf(direction) > -1) {
              stream.plot.values.reverse();
            }
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
            direction: anim_info.direction,
            iter:anim_info.iter,
            applyAtT: getApplyPropertyFunc(elem, prop_name),
            property: prop_name
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
        if (!('delay' in prop)) {
          prop.delay = parseMSValue(iArg) || 0;
          console.log(prop)
          continue
        }
        if (!prop.iter) {

          prop.iter = (iArg && parseIteration(iArg)) || parseIteration('1');

          continue
        }
        if (!prop.direction) {
          prop.direction = iArg && parseDirection(iArg) || parseDirection('f');
          continue
        }
      }
      return prop
    }

    function parseMSValue(str_ms) {
      return parseInt(str_ms);
    }

    function getAnimShortcuts(root_service) {
      return {
        func: {
          transform: mapTransformPropToStartEnd,
          valueStrMatch: mapPropValueAndReplace
        }
      }

      function mapPropValueAndReplace(val) {
        var defaultReplaceDict = getDefaultReplaceDict(val)

        for (var key in defaultReplaceDict) {
          var iMatch = (val + ':').indexOf(key);
          if (iMatch > -1) {
            var valWithoutMatch = (val + ':').split(key)
            val = valWithoutMatch[0] + defaultReplaceDict[key] + valWithoutMatch[1];

            if (val.length) {
              break;
            }

          }
        }
        return val.split(':').join('');
      }

      function mapTransformPropToStartEnd(prop, start, end) {
        var defaultTransformProps = ['translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'rotate', 'skewX', 'skewY', 'scaleZ', 'rotateX', 'rotateY', 'rotateZ', 'perspective', 'rotate3d'];
        var isTransformProp = defaultTransformProps.indexOf(prop);
        if (isTransformProp > -1) {
          return ['transform', prop + '(' + start + ')', prop + '(' + end + ')'];
        }
        return [prop, start, end];
      }
    }

    function getDefaultReplaceDict() {
      return {
        'p:': '%:',
        'p):': '%):'
      }
    }

    function parseIteration(iter) {
      var iObj = {infinite: false, count: {current: 1, total: 1}, btwn:0}
      iter = iter.replace('plus', '+');
      var inBetween = 0;
      var iterSplit = iter.split('+')
      var iterVal = iterSplit[0].trim();
      console.log(iterVal)
      if (iterVal === 'i') {
        iObj.infinite = true;
      }
      if (iter.indexOf('+') > -1 && iterSplit.length > 1) {
        iObj.btwn = parseFloat(iterSplit[1]);
      }
      if (!iObj.infinite) {
        iObj.count.total = parseFloat(iterVal);
        iObj.count.current = iObj.count.total;
      }
      return iObj
    }

    function parseDirection(direction) {
      var directionIndex = propOptions.direction.indexOf(direction);
      if (directionIndex === -1) {
        direction = 'f';
      };
      var dObj = {current: propOptions.firstDirection[directionIndex], value: direction}
      return dObj;
    }

    function getArrProperties(property, start, end, duration) {

    }

    function getPropOptions() {
      return {
        direction: ['f', 'a', 'r', 'ra'],
        firstDirection: ['f', 'f', 'r', 'r'],
        debug: {}
      }
    }

}
