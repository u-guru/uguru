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
    var animUrlShortcuts = getanimUrlShortcuts(RootService);
    var animPropShortcuts
    $timeout(function() {
      animPropShortcuts = RootService.getAnimShortcuts('animProps');
    })

    return {
      init:init,
      getDebugFormat: getDebugFormat,
      getPlayer: getRAFPlayer,
      animUrlShortcuts:animUrlShortcuts
    };


    function getDebugFormat(arg_name, value) {
      value = value + ''
      if (arg_name === 'direction') {
        return {
          'f': 'forward',
          'r': 'reverse',
          'a': 'alternate',
          'ar': 'reverse alternate'
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
          player.pause();
        }
      }
    }

    function initStreamTick(stream, defaults) {

        var tick = {
          infinite: false,
          start:Math.ceil(calcTickLength(stream.offset) * -1),
          end: 0,
          cycleIndex: 0
        };
        tick.reset= resetCycleFunc(tick);
        tick.init = getTickInitFunc(tick)
        tick.current = tick.start;

        return initTickFromStream(stream, tick);

        function getTickInitFunc(tick) {
          return function(stream) {

            tick.direction.current = getTickDirection(tick.cycleIndex, tick.direction);
            console.log(tick.cycleIndex, tick.direction.current)
            tick.direction.current === 'r' && stream.values.reverse();
          }
        }

        function initTickFromStream(stream, tick) {
          tick.infinite = stream.iter.infinite;
          if (tick.infinite) {
            stream.iter.count.total = 10;
          }
          tick.cycle = {
            repeats: stream.iter.count.total,
            increment: incrementCycleFunc(stream, tick),
            decrement: decrementCycleFunc(stream, tick),
            isComplete: isCurrentCycleCompleteFunc(tick),
            reset: resetCycleFunc(tick),
            btwn: stream.iter.btwn,
            c_duration: stream.iter.btwn + stream.duration
          }


          tick.duration = {ms: (tick.cycle.c_duration * tick.cycle.repeats)}
          tick.duration.cycles = calcTickLength(tick.duration.ms)
          tick.direction = stream.direction;
          tick.offset = stream.offset;

          tick.end = Math.ceil(calcTickLength(tick.cycle.c_duration));
          return tick;
        }

        function incrementCycleFunc(stream, tick) {
          return function() {

            if (tick.cycleIndex < tick.cycle.repeats || tick.infinite) {
              tick.cycleIndex += 1;
              tick.current = 0;
              tick.direction.current = getTickDirection(tick.cycleIndex, tick.direction);
              ['ar', 'a'].indexOf(tick.direction.value) > -1 && stream.values.reverse()
            }
          }
        }

        function getTickDirection(cycle_index, direction) {

          if (['r', 'f'].indexOf(direction.value) > -1) {
            return direction.value
          }
          var directionValIndex = ['a', 'ar'].indexOf(direction.value);

          //best line of code ever!! SM 9/21/2016
          return ['f', 'r'][(directionValIndex + cycle_index) % 2]

        }

        function resetCycleFunc(tick) {
          return function() {
            tick.cycleIndex = 0;
            tick.current = tick.start;
          }
        }

        function isCurrentCycleCompleteFunc(tick) {
          return function() {
            return tick.current === tick.end;
          }
        }

        function decrementCycleFunc(stream, tick) {
          return function() {

            if (tick.cycleIndex > -1 && tick.cycleIndex < tick.cycle.repeats || tick.infinite) {
              tick.cycleIndex -= 1;
              tick.current = tick.end -1;
              tick.direction.current = getTickDirection(tick.cycleIndex, tick.direction);
            }
          }
        }

      }

    function getPlayActiveAnimationsFunc(frame, exec_anim_func) {
      var player = {rAF: frame, schedule:{upcoming:[], streams:[], status:{direction: 'f', iter:1, fps:60}, queued:[]}, tick:0, activeStreamIDs:[]};
      player.pause = function(player) {
        return function() {
          player.rAF.cancel(player.rAF_id);
          player.rAF_id  = 0;
        };
      }(player)
      player.play = function() {

          if (!player.animFunc) {
            player.animFunc = exec_anim_func(player, player.rAF);
          }
          if (player.needsReset) {
            player.needsReset = false;
            player.reset(player);
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
        var streams = state_obj.events;
        player.tick = {start: 0, end:0, current:0};
        if (debug && state_obj.playerProps) {


          player.playerProps = state_obj.playerProps
          player.playerProps.iter.count.current = player.playerProps.iter.count.current + 0;
        }
        var shallowCopyStreams = [];
        for (var i = 0; i < streams.length; i++) {

          var globalOffsetTicks = calculateStreamTickLength({duration: 0, offset:offset});
          var totalDurationAndDelayTicks = calculateStreamTickLength(streams[i]);
          var durationOnlyTicks = calculateStreamTickLength(streams[i], 0, 60, true);
          var delayOnlyTicks = calculateStreamTickLength({duration:0, offset:streams[i].offset})

          var newStream = {applyProp:streams[i].applyAtT, duration:streams[i].duration, iter:streams[i].iter, name:streams[i].property || streams[i].name, direction: streams[i].direction, time: {total: streams[i].duration, elapsed: 0}, offset: streams[i].offset,  values:streams[i].values.splice(0,streams[i].values.length -1)}
          newStream.tick = initStreamTick(newStream);

          newStream.time.total = newStream.tick.duration.ms + newStream.offset;

          newStream.tick.init(newStream);

          shallowCopyStreams.push(newStream);
          player.playerProps.duration = Math.max(Math.round(newStream.time.total), player.playerProps.duration)

        }
        player.tick.start = calcTickLength(player.playerProps.duration)
        state_obj.duration = player.playerProps.duration;
        player.tick.current = player.tick.start;
        player.schedule.streams.push.apply(player.schedule.streams, shallowCopyStreams);



        if (debug) {

          enablePlayerDebugMode(player, state_obj, debug)
        }
        return player;
      }
      player.getSchedule = function() {
        return player.schedule;
      }


      function enablePlayerDebugMode(player, state, defaults) {


        if (!player.debug) {
          player.debug = {states: [], props:{}, defaults: defaults}
        }

        player.debug.stateName = defaults.stateName;
        player.debug.defaults.showAll = !defaults.hidePlot;
        delete player.debug.defaults['hidePlot'];



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
        player.debug.propArr = [];

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
              }
              for (prop in props) {
                player.debug.propArr.push({name: props[prop][0].name, streams: props[prop], show:player.debug.defaults.showAll});
              }
        })
          player.debug.toggleAllPlots = toggleAllPlots(player.debug.propArr);
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

        function toggleAllPlots(plot_arr) {
          return function() {
            var val = plot_arr[0].show;
            console.log(val);
            plot_arr.forEach(function(p_dict, i) {
              plot_arr[i].show = !val;
            })
          }
        }

      }



      function updatePlayerArgs(player, skip_first) {
        if (!skip_first && player.playerProps) {

          if (!player.playerProps.iter.infinite) {
            player.playerProps.iter.count.current = player.playerProps.iter.count.current - 1;
          } else {
            player.playerProps.iter.count.current = player.playerProps.iter.count.current + 1;
          }

        }
            player.debug.elemPlayer.time.elapsed = 0;
            if (player.debug.elemPlayer.duration) {

              player.debug.elemPlayer.duration.innerHTML = 0 + '';
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
              if (['ar', 'a'].indexOf(player.playerProps.direction.value) > -1) {
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

      player.onStreamsComplete = onStreamsComplete;

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
          if (['ar', 'r'].indexOf(stream.direction.current) > -1) {
            stream.values.reverse();
          }
        });
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
            // stream.tick.current = stream.tick.start;
            stream.tick.reset();

            stream.iter.count.current = stream.iter.count.total + 1;
            if (['ar', 'r'].indexOf(stream.direction.value) > -1) {
              stream.direction.current = 'r';
            } else {
              stream.direction.current = 'f';
            }
        })

        player.animFunc = exec_anim_func(player, player.rAF);
        // player.updateArgs(player)
        updatePlayerArgs(player, true)
        player.active = false;
      }

      // player.updateArgs = function(player) {
      //   var playerPropCount = {};
      //   var minPlayerOffset = 0;
      //   var streamCache = [];
      //   player.schedule.streams.slice().forEach(function(stream, i) {
      //     var streamPopped = player.schedule.streams.shift();
      //     var streamDelay = 0;
      //     if (!stream.iter.infinite) {
      //       streamPopped.iter.count.current--;
      //     }
      //     if (streamPopped.iter.count.current >= 1) {

      //       streamPopped.time.elapsed = 0;

      //       if (stream.iter.btwn > 0) {

      //         var tickLengthMS = 1000/60;
      //         var currentBefore = streamPopped.tick.current;
      //         var btwnChange = Math.ceil(streamPopped.iter.btwn/tickLengthMS);
      //         if (Math.abs(btwnChange) > minPlayerOffset) {
      //           minPlayerOffset =   Math.abs(btwnChange);
      //         }
      //         // streamPopped.tick.current -= btwnChange;
      //       }
      //       if (['ar', 'a'].indexOf(streamPopped.direction.value) > -1) {

      //         if (streamPopped.direction.current === 'f') {
      //           streamPopped.direction.current = 'r';

      //         } else {
      //           streamPopped.direction.current = 'f';
      //         }


      //       }

      //       if (!(stream.name in playerPropCount)) {
      //         playerPropCount[stream.name] = [];
      //       }

      //       playerPropCount[stream.name].push(streamPopped);
      //     } else {
      //       streamCache.push(streamPopped);
      //     }
      //   });


      //   // player.tick.current = player.tick.start + minPlayerOffset;
      //   console.log('player tick', playerPropCount)
      //   for (key in playerPropCount) {
      //     playerPropCount[key].forEach(function(stream, i) {
      //       if (['ar', 'a'].indexOf(stream.direction.value) > -1) {
      //         if (stream.direction.value === 'ar') {
      //           if (stream.direction.current === 'r') {
      //             stream.tick.current = -1 * (player.tick.current + stream.tick.start);

      //           } else {
      //             stream.tick.current = stream.tick.start;
      //             stream.values.reverse();
      //           }

      //         }
      //         if (stream.direction.value === 'a') {
      //           if (stream.direction.current === 'f') {
      //             stream.tick.current = -1 * (player.tick.current + stream.tick.start);
      //           } else {
      //             stream.tick.current = stream.tick.start;
      //             stream.values.reverse();
      //           }
      //         }
      //       } else {
      //         stream.tick.current = stream.tick.start;
      //       }


      //       player.schedule.streams.push(stream);
      //     })
      //   }

      //   updatePlayerArgs(player);
      //   if (player.schedule.streams.length) {

      //     player.time = {start: window.performance.now(), delta: window.performance.now()};
      //     player.active = true;

      //   } else {
      //     player.schedule.streams = streamCache
      //     player.onStreamsComplete(player);

      //   }

      // }

      function onStreamsComplete(player) {
          console.log('streams are complete')
          player.pause();
          player.active = false;
          if (player.debug) {
            var elem = document.querySelector('#pause-element')
            angular.element(elem).triggerHandler('click');
            player.needsReset = true;
          }
      }

      function applyTickDeltaToStreams(player, schedule, time_delta, tick_delta, scale_delta) {

        schedule.streams.forEach(function(stream, i) {

          if (stream.tick.current <= stream.tick.end) {
            if (stream.tick.current < stream.values.length && stream.tick.current >= 0) {
              stream.applyProp && stream.applyProp(stream.values[stream.tick.current]);
            }
            stream.tick.current += tick_delta;
            stream.time.elapsed += time_delta;
          }

          if (stream.tick.current === stream.tick.end) {

            if (tick_delta > 0) {
              stream.tick.cycle.increment();
            } else {
              stream.tick.cycle.decrement();
            }
          }

          if (stream.time.elapsed > stream.time.total) {
            return;
          }

        })



        player.tick.current -= (tick_delta);
        if (player.debug) {
          player.debug.elemPlayer.update(player.tick, schedule.lastTimeDelta)
        }
        if (player.tick.current === 0) {
            player.active = false;
            if (player.debug) {
              var elem = document.querySelector('#pause-element')
              angular.element(elem).triggerHandler('click');
              player.needsReset = true;
            }
            player.pause();
            return;
        }


      }

      return player;

    }



    function calcTickLength(num_ms, max_fps) {
        max_fps = max_fps || 60;
        tickLengthMS = 1000/max_fps;
        return Math.ceil(num_ms*1.0)/(tickLengthMS);
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

      if (checkForSinglePropStr.length > 6) {
        firstPortion = checkForSinglePropStr.splice(0,3);
        str = checkForSinglePropStr.join(':')
      } else {
        firstPortion = checkForSinglePropStr.splice(0,1);
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
          return animUrlShortcuts.func.transform(prop,start,end);
        }
        function checkAndParseShortcuts(prop, start, end) {
          var start = animUrlShortcuts.func.valueStrMatch(start);
          var end = animUrlShortcuts.func.valueStrMatch(end);
          return [prop, start, end];
        }
      }

      function initStateObj(stateName, str, elem, debug) {

        kf = debug && debug.kf || 60
        str = str && UtilitiesService.replaceAll(str, ', ', ',') || '';

        if (debug.stateName) {
          var stateNameStr = elem.getAttribute(stateName);
          console.log(stateNameStr)
          var stateNameStr = stateNameStr.split('[')[1].split('|')[0].split(']')[0].trim()
          var stateNameStrSplit = [];
          stateNameStr.split(',').forEach(function(stream, i) {
            var iStreamSplit = stream.split(':');
            if (iStreamSplit.length === 5) {
              stream += ':0:1:f';
              stateNameStrSplit.push(stream);
            }
          })

        } else {
          var stateNameStr = str
          var stateNameStrSplit = str.split(',');
        }



        var stateArgs = filterTransformAndShortcutStr(stateNameStrSplit);

        // var stateNameArgs =  filterTransformAndShortcutStr()
        // stateNameStr.forEach(function(stream, i) {
        //   var sSplit = stream.split(':');

        //   if (sSplit.length === '5') {
        //     stateArgs.push(stream + ':0:1:f')
        //   }
        // })
        // stateNameArgs.forEach(function(stream, i) {
        //   console.log(stream);
        //   stateArgs.push(stream + ':0:1:f')
        // })


        var resultState = {duration: 0};
        var timeline = {events:[], props:{}, stateName: stateName};
        for (var i = 0; i < stateArgs.length; i++) {
          var iAnim = stateArgs[i];


          // iAnim = iAnim && filterParentheticals(iAnim)

          var isCustomAnim = isCustomAnimation(iAnim);

          if (isCustomAnim) {

            // iAnim = iAnim && filterParentheticals(iAnim)
            iAnim = iAnim && replaceShortcutSyntax(iAnim);
            addCustomAnimPropsToTimeline(elem, iAnim, isCustomAnim, timeline, debug)


          } else {
            iAnim = iAnim && filterParentheticals(iAnim)
            iAnim = iAnim && replaceShortcutSyntax(iAnim);

            var iPropObj = initPropObj(iAnim);

            timeline.playerProps = {
              direction: iPropObj.direction,
              iter: iPropObj.iter,
              duration: iPropObj.duration
            }
            var offset = iPropObj.delay;
            console.log(iPropObj)
            var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;

            if (!(iPropObj.property in timeline.props)) {
              timeline.props[iPropObj.property] = [];
              if (iPropObj.property === 'transform') {
                transformExists = true;
              }
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

              scaleTimelineValuesForPlot(timeline.props, result.direction);

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

          var eventSum = timeline.events[i].duration * timeline.events[i].iter.count.total;
          if (eventSum > maxLength) {
            maxLength = eventSum;
            maxSpanEvent = timeline.events[i];
          }
        }
        timeline.duration = maxLength;
        timeline.offset = 0;
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
        timeline.playerProps = {iter: animDict.iter, direction:animDict.direction, duration: animDict.duration};
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
          scaleTimelineValuesForPlot(timeline.props, animDict.direction);
        }
      }

      function scaleTimelineValuesForPlot(props, direction) {
        for (var prop in props) {

          var propStreams = props[prop];

          var plotStats = {max: 0, min: 100000000000};

          propStreams.forEach(function(stream, i) {

            stream.plot = {max: 0, min: 100000000000, duration: 0, values:[], sections:[]};
            var streamTick = initStreamTick(stream)
            stream.values = stream.values.slice(0, stream.values.length - 1);
            streamDuration = streamTick.cycle.c_duration * streamTick.cycle.repeats + stream.offset;
            streamAllValues = [];
            var maxVal = 0;
            var streamSections = [];
            if (stream.offset) {
              stream.plot.sections.push({transition: stream.offset, html:{}, values:[], offset: stream.offset, duration: stream.offset})
            }
            for (var i = 0; i < streamTick.cycle.repeats; i++) {
              var directionDict = {'f': 'forward', 'r':'reverse'};
              var section = {html:{}, scaledValues:[], values: [], cycleIndex:i + 1, direction: directionDict[streamTick.direction.current], start: stream.values[0], end: stream.values[stream.values.length - 1], duration:stream.duration + stream.iter.btwn, transition:stream.iter.btwn};


              var sectionMax = 0;
              var sectionMin = stream.values[0];
              stream.values.forEach(function(value, j) {
                var scaled_value = parseFloat(getArrayOfDecimals(value)[0]);


                maxVal = Math.max(maxVal, scaled_value);
                sectionMax = Math.max(sectionMax, scaled_value);
                section.values.push({value: scaled_value});
              });
              section.max = sectionMax;
              stream.plot.sections.push(section);
              streamTick.cycle.increment();
            }
            stream.plot.sections.forEach(function(section, k) {
              var ratioWidthDuration = parseInt(10000*(section.duration/streamDuration))/100;
              section.html.total = {width: {percent: ratioWidthDuration}};
              if (!section.values.length) {
                section.delayOnly = true;
                return
              }

              section.values.forEach(function(value_dict, j) {
                  value_dict.left = (j/section.values.length) * 100 + '%';
                  value_dict.bottom = (value_dict.value)/section.max*100 + '%';
              })
            });
            // for (i = 0; i < stream.plot.sections.length; i++) {


            //   // iSection.html.total = {width: {percent: ratioWidthDuration}};
            //   iSection.scaledValues = [];
            //   iSection.values && iSection.values.forEach(function(s_value, j) {
            //     var scaled_value = parseFloat(getArrayOfDecimals(s_value)[0]);
            //   });
            //   iSection.values && iSection.values.forEach(function(s_value, j) {

            //     maxVal = Math.max(maxVal, scaled_value);
            //     var leftPercent = (j/iSection.values.length) * 100;
            //     iSection.scaledValues.push({val: scaled_value, left: leftPercent});
            //   });
            //   iSection.max = maxVal;
            // }


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

      function filterTransformAndShortcutStr(state_args) {
        var defaultTransformProps = ['translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'rotate', 'skewX', 'skewY', 'scaleZ', 'rotateX', 'rotateY', 'rotateZ', 'perspective', 'rotate3d'];
        var transform_state_arg = [];
        var state_args_final = [];
        state_args.slice().forEach(function(state_prop, i) {
          state_prop = UtilitiesService.replaceAll(state_prop, 'p:', '%:');
          var propName = state_prop.split(':')[0].trim();
          if (defaultTransformProps.indexOf(propName) > -1) {
            transform_state_arg.push(state_prop)
          } else {
            state_args_final.push(state_prop)
          }
        })
        if (transform_state_arg.length) {
          var single_transform_str = "transform:"
          var resultTransformDict = {name: [], start: [], end: [], duration: [], easingFunc: [], delay:[], iter: [], direction:[] };
          transform_state_arg.forEach(function(transform_prop, i) {

            var splitArgs = transform_prop.split(':');
            resultTransformDict.name.push(splitArgs[0])
            resultTransformDict.start.push(splitArgs[1]);
            resultTransformDict.end.push(splitArgs[2]);
            resultTransformDict.duration.push(splitArgs[3]);
            resultTransformDict.easingFunc.push(splitArgs[4]);
            resultTransformDict.delay.push(splitArgs[5]);
            resultTransformDict.iter.push(splitArgs[6]);
            resultTransformDict.direction.push(splitArgs[7]);
          })

          single_transform_str = formatTransformStrFromTransformProps(resultTransformDict);
          state_args_final.unshift(single_transform_str);
        }

        return state_args_final
      }

      function formatTransformStrFromTransformProps(_dict) {
        var resultStr = 'transform:';
        _dict.name.forEach(function(prop_name, i) {
          resultStr += prop_name + '(' + _dict.start[i] + ') ';
        })
        resultStr = resultStr.trim() + ':';
        _dict.name.forEach(function(prop_name, i) {
          resultStr += prop_name + '(' + _dict.end[i] + ') ';
        })
        resultStr = resultStr.trim() + ':';
        var maxDuration = 0;
        _dict.duration.forEach(function(duration, i) {
          if (parseFloat(duration) > maxDuration) {
            maxDuration = duration;
          }
        })
        resultStr = resultStr.trim() + maxDuration + ':';
        _dict.easingFunc.forEach(function(ease, i) {
          resultStr = resultStr + ease + ' ';
        })
        resultStr = resultStr.trim() + ':';
        var maxDelay = 0;
        _dict.delay.forEach(function(delay, i) {
          if (parseFloat(delay) > maxDelay) {
            maxDelay = delay;
          }
        })
        resultStr += maxDelay + ':';
        var minIter = 1000000;
        _dict.iter.forEach(function(iter, i) {
          if (iter === 'i') {
            minIter = 'i';
            return;
          } else {
            if (minIter > parseFloat(iter)) {
              minIter = iter;
            }
          }
        })
        resultStr += minIter + ':' + _dict.direction[0];
        return resultStr
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


    function checkAndReplaceShortcuts(str, type) {
      if (str in animPropShortcuts[type]) {
        str = animPropShortcuts[type][str];
      }
      return str;
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
          prop.property = checkAndReplaceShortcuts(iArg, 'name') || 'transform'

          continue;
        }
        if (!('start' in prop)) {
          prop.start = checkAndReplaceShortcuts(iArg, 'start') || 0;
          if (prop.property === 'opacity') {
            prop.start = parseFloat(prop.start);
          }
          continue
        }
        if (!('end' in prop)) {
          prop.end = checkAndReplaceShortcuts(iArg, 'end') || 1;
          if (prop.property === 'opacity') {
            prop.end = parseFloat(prop.end);
          }
          continue
        }
        if (!prop.duration) {
          prop.duration = parseMSValue(checkAndReplaceShortcuts(iArg, 'duration')) || 1000;
          continue
        }
        if (!prop.easingFunc) {
          prop.easingFunc = checkAndReplaceShortcuts(iArg, 'easingFunc') || 1000;
          continue
        }
        if (!('delay' in prop)) {
          prop.delay = parseMSValue(checkAndReplaceShortcuts(iArg, 'delay')) || 0;
          continue
        }
        if (!prop.iter) {

          prop.iter = iArg && parseIteration(checkAndReplaceShortcuts(iArg, 'iter')) || parseIteration('1');

          continue
        }
        if (!prop.direction) {
          prop.direction = iArg && parseDirection(checkAndReplaceShortcuts(iArg, 'direction')) || parseDirection('f');
          continue
        }
      }
      return prop
    }

    function parseMSValue(str_ms) {
      return parseInt(str_ms);
    }

    function getanimUrlShortcuts(root_service) {
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
        direction: ['f', 'a', 'r', 'ar'],
        firstDirection: ['f', 'f', 'r', 'r'],
        debug: {}
      }
    }

}
