angular.module('uguru.shared.services')
.factory("AnimationFrameService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'TweenService',
    'PropertyService',
    'RootService',
    '$interval',
    AnimationFrameService
        ]);

function AnimationFrameService($timeout, $state, UtilitiesService, TweenService, PropertyService, RootService, $interval) {
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
      // console.log(player.schedule.streams)
      return function(time) {

        if (player.tick.current > -2 && player.active) {
          player.schedule.lastTimeDelta = time - player.time.delta;
          player.stepForward(player.schedule);
          player.time.delta = time;
          player.rAF_id = player.rAF.request(player.animFunc);
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
            tick.direction.current === 'r' && stream.values.reverse();
          }
        }

        function initTickFromStream(stream, tick) {

          tick.infinite = stream.iter.infinite;
          if (tick.infinite) {
            // @jeselle-infinite, @gabrielle-infinite
            stream.iter.count.total = 10;
          }
          tick.cycle = {
            repeats: stream.iter.count.total,
            increment: incrementCycleFunc(stream, tick),
            decrement: decrementCycleFunc(stream, tick),
            isComplete: isCurrentCycleCompleteFunc(tick),
            reset: resetCycleFunc(tick),
            btwn: stream.iter.btwn,
            c_duration: stream.duration + stream.iter.btwn
          }


          tick.duration = {ms: (tick.cycle.c_duration * tick.cycle.repeats)}

          tick.duration.cycles = calcTickLength(tick.duration.ms)
          tick.direction = stream.direction;
          tick.offset = stream.offset;

          tick.end = Math.ceil(calcTickLength(tick.cycle.c_duration));
          // if (tick.direction.current === 'r') {

          //   tick.start = (tick.end - Math.abs(tick.start) - Math.ceil(calcTickLength(stream.duration))) * -1;
          //   // tick.start = tick.current;
          //   // console.log(tick.start, tick.end, calcTickLength(stream.duration))
          // }
          return tick;
        }

        function incrementCycleFunc(stream, tick) {
          return function() {

            if (tick.cycleIndex < tick.cycle.repeats || tick.infinite) {
              tick.cycleIndex += 1;


              tick.direction.current = getTickDirection(tick.cycleIndex, tick.direction);
              ['ar', 'a'].indexOf(tick.direction.value) > -1 && reverseStreamValues(stream, tick)
              tick.current = tick.start;
              // if (['ar', 'a'].indexOf(tick.direction.value) > -1) {

              //   // tick.current = calcTickLength(stream.offset) * -1;
              //   tick.start = (tick.end - Math.abs(tick.start) - Math.ceil(calcTickLength(stream.duration))) * -1;
              // } else {
              //   tick.current = tick.start;
              // }
            }
          }
        }

        function reverseStreamValues(stream, tick) {
          // if (tick.cycle.btwn && tick.direction.current === 'r') {
          //   // tick.current = (tick.end + tick.start)
          //   // (tick.end + tick.start) * -1
          //   var duration = tick.end - tick.start
          //   var frameLength = stream.values.length;
          //   // tick.current, tick.start, tick.end, Math.ceil(calcTickLength(stream.offset) * -1)
          //   // tick.current =
          //   console.log(stream.name, frameLength, tick.start, tick.end)
          // }
          stream.values.reverse();
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
      var player = {rAF: frame, schedule:{upcoming:[], streams:[], streamCache:[], status:{direction: 'f', iter:1, fps:60}, queued:[]}, tick:0, activeStreamIDs:[]};
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

          player.rAF_id = player.rAF.request(player.animFunc);
        }


      player.focusStream = function(_player, _stream) {
        player.activeStreamID = _stream.id;

        player.schedule.streams.forEach(function(stream, id) {
          if (stream.id === player.activeStreamID)  {
            player.schedule.streams[id].active = true;
          } else {
            player.schedule.streams[id].active = false;
          }
        })
      }

      player.unFocusStream = function(_player, stream) {
        player.activeStreamID = null;
        player.schedule.streams.forEach(function(stream, id) {
          player.schedule.streams[id].active = false;
        })
        // player.reset(player)
      }

      player.scheduleStream = function(player, state_obj, offset, debug) {
        var streams = state_obj.events;


        if (!player.tick) {
          player.tick = {start: 0, end:0, current:0};
        }


        // if (debug && state_obj.playerProps) {


          if (state_obj.playerProps && debug) {
            player.playerProps = state_obj.playerProps
            player.playerProps.iter.count.current = player.playerProps.iter.count.current + 0;
          }
        // }
        if (!player.playerProps) {
          player.playerProps = state_obj.playerProps;
          player.playerProps.duration = 0;
        }

        var shallowCopyStreams = [];
        var currentMax = 0;
        for (var i = 0; i < streams.length; i++) {
          // console.log(streams[i].values)
          var globalOffsetTicks = calculateStreamTickLength({duration: 0, offset:offset});
          var totalDurationAndDelayTicks = calculateStreamTickLength(streams[i]);
          var durationOnlyTicks = calculateStreamTickLength(streams[i], 0, 60, true);
          var delayOnlyTicks = calculateStreamTickLength({duration:0, offset:streams[i].offset})

          values = streams[i].values

          if (values[values.length - 1] === null) {

            values = values.slice(0, values.length - 1);
          }


          var newStream = {applyProp:streams[i].applyAtT, active:true, childProps:streams[i].childProps, easing:streams[i].ease, duration:streams[i].duration, iter:streams[i].iter, name:streams[i].property || streams[i].name, direction: streams[i].direction, time: {total: streams[i].duration, elapsed: 0}, offset: streams[i].offset, values:values}

          newStream.tick = initStreamTick(newStream);


          newStream.time.total = newStream.tick.duration.ms + newStream.offset;


          newStream.tick.init(newStream);
          newStream.easing = streams[i].easing;
          shallowCopyStreams.push(newStream);

          // var maxStreamDuration =   Math.max(Math.round(newStream.time.total), player.playerProps.duration);
          var currentMax = Math.max(Math.ceil(newStream.time.total), currentMax);
        }

        var allStreamsTickDurationTicks = Math.ceil(calcTickLength(currentMax) * 62/60.0);
        if (!player.playerProps.duration && currentMax) {
          player.playerProps.duration = currentMax;
          player.tick.start = allStreamsTickDurationTicks;
          player.tick.current = player.tick.start;
        }


        // if (allStreamsTickDurationTicks > player.tick.current)  {
        //   player.tick.start = player.tick.current + allStreamsTickDurationTicks;
        // }

        var alreadyPassed = player.tick.start - player.tick.current;
        var remaining = player.tick.start - alreadyPassed;
        if (allStreamsTickDurationTicks > remaining) {
          player.tick.current += allStreamsTickDurationTicks - remaining;
          if (player.tick.current > player.tick.start) {
            player.tick.start = player.tick.current;
          }
        }



        // player.tick.current =  Math.ceil(player.tick.current * 1.016);
        // if (!player.tick.start) {

        //   state_obj.duration = player.playerProps.duration;
        //   player.tick.current = player.tick.start;
        // }

        // )
        player.schedule.streams.push.apply(player.schedule.streams, shallowCopyStreams);

        if (debug) {

          enablePlayerDebugMode(player, state_obj, debug)
        }
        return player;
      }
      player.getSchedule = function() {
        return player.schedule;
      }

      player.togglePropStreams = function(player, prop_name) {
        player.schedule.streams.forEach(function(stream, i) {
          console.log(stream.name, stream)
        });
        if (player.debug) {
          player.debug.propArr.forEach(function(prop) {
            console.log(prop)
          })
        }
      }


      function enablePlayerDebugMode(player, state, defaults) {


        if (!player.debug) {
          player.debug = {states: [], props:{}, defaults: defaults}
        }

        player.debug.stateName = defaults.stateName;
        player.debug.defaults.showAll = !defaults.hidePlot;
        player.debug.defaults.autoPlay = defaults.autoPlay;

        player.debug.defaults.startAt = defaults.startAt && parseStartAt(defaults.startAt, state.duration);
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
                var totalDuration = 0;
                for (stream in props[prop]) {
                  totalDuration += props[prop][stream].duration;
                };
                player.debug.propArr.push({name: props[prop][0].name, duration:totalDuration, streams: props[prop], show:player.debug.defaults.showAll});
              }
        })



        player.debug.toggleAllPlots = toggleAllPlots(player.debug.propArr);
        $timeout(function() {
          updatePlayerArgs(player, true);
          var delay = 500;
          if (player.debug.defaults.startAt) {
            delay += (player.debug.defaults.startAt.percent * state.duration)/player.debug.defaults.startAt.speed
            player.play(player.schedule)
            player.pause();
            $timeout(function() {
              player.jump(player, player.debug.defaults.startAt.percent, player.debug.defaults.startAt.speed)
            }, 250)
            console.log(delay)
          }

          $timeout(function() {
              if (player.debug.defaults.startAt) {
                player.active = false;
              }

              $timeout(function() {
                if (player.debug.defaults.autoPlay) {
                  player.play(player.schedule);
                }
              }, 500)
          }, 1000 + delay);
          player.debug.propStreamValueUpdate = {};
          $timeout(function() {
            var elem_arr = [];
            player.debug.propArr.forEach(function(propDict, i) {
              var name = propDict.name;
              var propStreamValue = document.querySelector('#' + name + '-value');
              var propStreamPlotCircle = document.querySelectorAll('.' + name + '-plot-ball');
              propStreamValue && elem_arr.push(propStreamValue);
              if (propStreamPlotCircle && propStreamPlotCircle.length) {
                propStreamPlotCircle.forEach(function(elem, i) {elem_arr.push(elem)});
              }
              var isTransform = false;
              ['rotate', 'scale', 'translate', 'skew'].forEach(function(t_type, i) {
                if (name.indexOf(t_type) > -1) {
                  isTransform = true;
                  name = 'transform'
                }
              })
              player.debug.propStreamValueUpdate[name] =  updatePropStreamPlotValue(player, elem_arr);
            });
          }, 1000)
        })

        function updatePropStreamPlotValue(player, elem_arr) {
          return function(prop_name, value, tick, cycle_index) {
            cycle_index = cycle_index || 0
            elem_arr.forEach(function(elem) {

              if (elem.nodeName.toLowerCase() !== 'circle') {

                elem.innerHTML = value;
              } else {
                player.debug.propArr.forEach(function(prop_dict, i) {
                  // if (prop_dict.name === 'scaleX' || prop_dict.name === 'scaleY') {

                    elem.setAttribute('cx', (prop_dict.streams[0].plot.values.length *cycle_index) +  tick * prop_dict.streams[0].duration/prop_dict.streams[0].plot.values.length);
                    elem.setAttribute('cy', normalizeValue(prop_dict.streams[0].plot.values[tick] , prop_dict.streams[0].plot.range , 150));
                  //
                })



              }

            })
            function normalizeValue(val, range, height, padding) {
              if (!padding) padding = 10;
              return ((height) - (val/range) * (height)).toFixed(1)
            }
          }
        }

        function getSectionObj(section, duration, offset) {
          section.html = {width: 0, left: 0}
          var totalAnimLength = duration;
          section.html.width = parseInt((section.duration)/(totalAnimLength *1.0) * 10000)/100
          section.html.left = 10 + (parseInt((section.offset)/(totalAnimLength) * 10000)/100);
          return section;
        }


        function parseStartAt(start_str, duration) {
          duration = duration || 1000;
          var percent = 0.5;
          var speed = 20;
          var skip = start_str.indexOf(':skip') > -1;
          var hasMilli = start_str.indexOf('ms') > -1;
          var hasPercent = start_str.indexOf('%') > -1;

          if (hasMilli || !hasPercent) {
            percent =  parseInt(start_str.split('ms').join(""))/duration
          } else {
            percent = parseInt(start_str)/100;
          }
          var resultDict = {
            speed: speed,
            percent: percent
          }
          return resultDict;
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

      player.jump = function(player, percent, speed) {
        var intervalLength = (1000/60)/speed;
        var playerTickDelta = player.tick.current + Math.round(player.tick.start*percent) - player.tick.start;
        var playerStepFunc;
        //stepping forward
        if (playerTickDelta > 0) {
          playerStepFunc = player.stepForward;
        }
        else {
          playerStepFunc = player.stepBack;
        }
        var count = Math.abs(playerTickDelta);
        player.jumpInterval = $interval(function() {
          count--;
          playerStepFunc(player.schedule);
          if (count < 0) {
            $interval.cancel(player.jumpInterval);
          }
        }, intervalLength)
      }

      player.jumpFromClick = function(player, $event) {


        var playerBarElem = getHrParent($event.target);
        var playerBarCoords = playerBarElem.getBoundingClientRect();
        var delta = Math.abs($event.layerX - $event.offsetX);
        var xOffset = $event.offsetX - delta;
        var percentPlayer = xOffset/playerBarCoords.width;

        player.jump(player, percentPlayer, (player.debug && player.debug.defaults.speed) || 5);
        // -1 * (playerTickDelta - player.tick.current)
        // console.log(player.tick.current, )

        function getHrParent(elem) {
          if (['hr'].indexOf(elem.nodeName.toLowerCase()) > -1) {
            elem = elem.parentNode;
          }
          return elem;
        }
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
        player.activeStreamID = false;
        player.schedule.streams.forEach(function(stream, i) {

            stream.time.elapsed = 0;
            stream.active = true;

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
        updatePlayerArgs(player, true)
        player.active = false;
      }



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


      //dont touch
      function applyTickDeltaToStreams(player, schedule, time_delta, tick_delta, scale_delta) {

        schedule.streams.forEach(function(stream, i) {
          if (!stream.active) return;
          if (stream.tick.current <= stream.tick.end && stream.active) {

            if (stream.tick.current <= stream.values.length && stream.tick.current >= 0) {
              // console.log(stream.values[stream.tick.current])
              stream.applyProp  && stream.applyProp(stream.values[stream.tick.current]);
              // player.debug && player.debug.propStreamValueUpdate[stream.name](stream.name, stream.values[stream.tick.current], stream.tick.current, stream.tick.cycleIndex)
            }
            stream.tick.current += tick_delta;

            stream.time.elapsed += time_delta;
          }
          if (stream.tick.current > stream.tick.end && stream.tick.cycle.repeats > (stream.tick.cycleIndex + 1)) {

            if (tick_delta > 0) {
              stream.tick.cycle.increment();
            } else {
              stream.tick.cycle.decrement();
            }
          }
          // if (stream.time.elapsed > stream.time.total) {
          //   stream.active = false;
          //   console.log('time lapsed')
          //   return;
          // }

        })



        // console.log(player.tick.current)

        if (player.debug) {
          player.debug.elemPlayer.update(player.tick, schedule.lastTimeDelta);
        }
        if (player.tick.current < 0) {
            player.active = false;
            if (player.debug) {
              var elem = document.querySelector('#pause-element')
              angular.element(elem).triggerHandler('click');
              player.needsReset = true;
            }
            player.pause();
            return;
        }
        player.tick.current -= (tick_delta);


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

      function decomposeMatrixStr(str) {
        var dMatrix = dynamics.initMatrixFromTransform(str);
        var args = ['rotate', 'translate', 'scale', 'skew'];
        var defaults = [['0deg'], ['0px', '0%'], '', 'deg' ];
        var results = [];
        results.push(parseTranslate(dMatrix.translate))
        results.push(parseScale(dMatrix.scale));
        var dMatrix = dynamics.initMatrixFromTransform(str, true);
        results.push(parseRotate(dMatrix.rotate))


        // console.log(dMatrix.quaternion[3]*(180/Math.PI), dMatrix.quaternion[2]*(180/Math.PI))
        function parseTranslate(arr) {
          var values = ['X', 'Y', 'Z'];
          var results = [];
          arr.forEach(function(val, i) {
            if (val) {
              results.push('translate' + values[i] + '(' + val +  'px)');
            }
          })
          if (results.length) {
            return results.join(" ");
          }
        }



        function parseSkew(arr) {
          var values = ['X', 'Y', 'Z'];
          var results = [];
          arr.forEach(function(val, i) {
            if (val) {
              results.push('skew' + values[i] + '(' + val*(180/Math.PI) +  'deg)');
            }
          })
          if (results.length) {
            return results.join(" ");
          }
        }

        function parseRotate(arr) {
          var values = ['', '', ''];
          var results = [];
          if (arr[2]) {
            results.push('rotate(' + arr[2] * (180/Math.PI) + 'deg)');
            return results.join(" ")
          } else {
            arr.forEach(function(val, i) {
              if (val > 0 || (val + "").length) {
                results.push('rotate' + values[i] + '(' + (val*(180/Math.PI)).toFixed(4) +  'deg)');
              }
            })
            if (results.length) {
              return results.slice(1,2).join(" ").trim();
            }
          }


        }

        function parseScale(arr) {
          var values = ['X', 'Y', 'Z'];
          var results = [];
          arr.forEach(function(val, i) {
            if (val || (val + "").length) {
              // if (values[i] === 'Z' && val === 1) return;
              results.push('scale' + values[i] + '(' + val.toFixed(4) +  ')');
            }
          })
          if (results.length) {
            return results.join(" ");
          }
        }
        if (results.length) return results.join(" ")
        return str;
      }

      function condenseStartEndValues(prop) {

        var count = 0;
        if (prop.property === 'transform') {
          var startSplit = prop.start.trim().split(' ')
          var endSplit = prop.end.trim().split(' ')
          startSplit.forEach(function(start_arg, i) {
            if (startSplit[i] === endSplit[i]) {

              startSplit[i] = "";
              endSplit[i] = "";
            } else {
              count += 1;
            }
          });
          startSplit = startSplit.filter(function(start_arg, i) {return start_arg && start_arg.length})
          endSplit = endSplit.filter(function(end_arg, i) {return end_arg && end_arg.length})
          if (count && (startSplit.length && endSplit.length)) {
            prop.start = startSplit.join(" ").trim();
            prop.end = endSplit.join(" ").trim()
            prop.start = UtilitiesService.replaceAll(UtilitiesService.replaceAll(prop.start, ') ', ')').split(')').join(') '), '  ', ' ');
            prop.end = UtilitiesService.replaceAll(UtilitiesService.replaceAll(prop.end, ') ', ')').split(')').join(') '), '  ', ' ')
            prop.start = prop.start.trim();
            prop.end = prop.end.trim();

            if (startSplit.length !== endSplit.length) {
              var transformDict = {};
              prop.start.split(' ').forEach(function(prop_val, i) {prop_val = prop_val.split('(')[0].trim(); if (!(prop_val in transformDict)) {transformDict[prop_val] = 0};transformDict[prop_val] += 1;})
              prop.end.split(' ').forEach(function(prop_val, i) {prop_val = prop_val.split('(')[0].trim(); if (!(prop_val in transformDict)) {transformDict[prop_val] = 0};transformDict[prop_val] += 1;})
              var unevenProps = [];
              for (key in transformDict) {
                if (transformDict[key] === 1) {
                  unevenProps.push(key);
                }
              }
              unevenProps.forEach(function(uneven_prop, i) {
                var defaultPropDict = {'translateX': '0px', 'translateY': '0px', 'translateZ':'0px', 'scaleX': 1, 'scaleY': 1, 'skewX': '0deg', 'skewY': '0deg', 'scaleZ': 1, 'rotate': '0deg', 'scale': 1, 'skew': '0deg'};
                var extension = (uneven_prop + '(' + defaultPropDict[uneven_prop] + ')');

                if (prop.start.indexOf(uneven_prop) === -1) {
                  prop.start += ' ' + extension;
                } else if (prop.end.indexOf(uneven_prop) === -1) {

                  prop.end += ' ' + extension;
                }
              })
            }

          }
          prop.start = prop.start.split(' ').sort().join(' ').trim();
          prop.end = prop.end.split(' ').sort().join(' ').trim();
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
          if (start.indexOf('matrix3d') > -1) {
            start = decomposeMatrixStr(start);
            start = start.split(' ').filter(function(tr_arg, i) {return tr_arg.length} ).join(" ");
          }
          if (end.indexOf('matrix3d') > -1) {
            end = decomposeMatrixStr(end);
            end = end.split(' ').filter(function(tr_arg, i) {return tr_arg.length} ).join(" ");
          }
          if (start.split(' ').length !== end.split(' ').length) {
            var endSplit = end.split(' ');
            var newEnd = [];
            start.split(' ').slice().forEach(function(tr_arg, i) {
              var origStart = tr_arg;
              var tr_arg = (tr_arg + "").split('(')[0];

              if (end.indexOf(tr_arg) === -1) {
                var tr_arg_units = (origStart).split('(')[1];
                if (tr_arg_units.indexOf('px') > -1) {
                  tr_arg_units = 'px';
                }
                else if (tr_arg_units.indexOf('%') > -1) {
                  tr_arg_units = '%';
                }
                else if (tr_arg_units.indexOf('deg') > -1) {
                  tr_arg_units = 'deg';
                }
                end = endSplit.slice(0, i).join(" ") + tr_arg.split('(')[0] + '(0' + tr_arg_units + ') ' +  endSplit.slice(i, endSplit.length).join(' ');

              }
            })
          }
          return animUrlShortcuts.func.transform(prop,start,end);
        }
        function checkAndParseShortcuts(prop, start, end) {
          var start = animUrlShortcuts.func.valueStrMatch(start);
          var end = animUrlShortcuts.func.valueStrMatch(end);

          return [prop, start, end];
        }
      }

      function initStateObj(stateName, str, elem, debug) {
        if (elem.nodeName === '#comment') {
          console.log('is comment')
        }
        kf = debug && debug.kf || 60
        str = str && UtilitiesService.replaceAll(str, ', ', ',') || '';
        var cbArr = [];
        if (debug && debug.stateName) {
          var stateNameStr = elem.getAttribute(stateName);
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
          var strSplit = str.split(':');
          strSplit.forEach(function(str, i) {
            var arrDecimals = UtilitiesService.getArrayOfDecimals(str);
            if (arrDecimals.length === 4) {
              strSplit[i] = "cb-" + cbArr.length;
              cbArr.push(arrDecimals)
            }
          })
          str = strSplit.join(":");
          var stateNameStrSplit = str.split(',');

        }




        var stateArgs = filterTransformAndShortcutStr(stateNameStrSplit);

        stateArgs = splitCustomAnimationsIntoStreams(stateArgs);



        var resultState = {duration: 0};
        var timeline = {events:[], props:{}, stateName: stateName};
        for (var i = 0; i < stateArgs.length; i++) {
          var iAnim = stateArgs[i];

          cbArr.forEach(function(cb_vals, i) {
            if (iAnim.indexOf('cb-' + i) > -1) {
              iAnim = iAnim.replace('cb-' + i, cbArr[i].join("|"));
            }
          })



            iAnim = iAnim && filterParentheticals(iAnim);

            iAnim = iAnim && replaceShortcutSyntax(iAnim);

            var iPropObj = initPropObj(iAnim);

            if (iAnim.split(':')[0] === 'transform') {
                condenseStartEndValues(iPropObj);
            }
            //
            // console.log(iPropObj.property, iPropObj.start, iPropObj.end)
            if (iPropObj.start === iPropObj.end) {
              continue;
            }

            timeline.playerProps = {
              direction: iPropObj.direction,
              iter: iPropObj.iter,
              duration: iPropObj.duration
            }
            var offset = iPropObj.delay;
            var values = TweenService.preComputeValues(iPropObj.property, iPropObj.duration, iPropObj.start, iPropObj.end, iPropObj.easingFunc, {cache:[]}, kf).cache;


            if (!(iPropObj.property in timeline.props)) {
              timeline.props[iPropObj.property] = [];
              if (iPropObj.property === 'transform') {
                transformExists = true;
              }
            }


            var result = {
              duration: iPropObj.duration,
              id: timeline.events.length + 1,
              offset: iPropObj.delay,
              direction: iPropObj.direction,
              iter: iPropObj.iter,
              name: iPropObj.property,
              values: values,
              easing: iPropObj.easingFunc,
              applyAtT: getApplyPropertyFunc(elem, iPropObj.property)
            }

            if (result.name === 'counter') {
              convertStreamEventIntoCounter(elem, result);
            }


            timeline.events.push(result);
          // }
        }


        // timeline.events.slice(1).forEach(function(_event, i) {
        timeline = compareAndMergeWithPrevious(timeline);
        // if (debug) {
        //   timeline.events.forEach(function(result, i) {

        //       if (result.name === 'transform' && result.values[0].indexOf('matrix3d') === -1) {


        //         delete timeline.props['transform'];
        //         addIndependentTransformPropsToTimeline(result, timeline);

        //         // timeline.props[iPropObj.property].push(result);
        //       } else {
        //         timeline.props[iPropObj.property].push(result);
        //       }


        //   })
        // }

        // })
        // if (streams.length) {
        //   timeline.events = streams;
        // }

        debug &&scaleTimelineValuesForPlot(player, timeline.props, null,  debug, timeline);
        normalizeStateDurationAndDelay(timeline);
        if (debug) {
          cache.states.push(timeline);
          timeline.debug = true;
          timeline.id = cache.states.length;
        }
        return timeline;
      }

      function compareAndMergeWithPrevious(timeline) {
        // if (!timeline.events || !timeline.events.length) {
        //   timeline.events.push(result);
        //   return;
        // }
        streamDict = {};
        // var prevFirst = prev_result.values[prev_result.values.length - 2];
        // var currentFirst = result.values[0];
        timeline.events.forEach(function(_event, i) {

          if (!(_event.name in streamDict)) {
            streamDict[_event.name] = [_event];
            return;
          }

          var propArr = streamDict[_event.name];
          // if (propArr.length < 2) {
          //   streamDict[_event.name].push(_event)
          // }

          var numEventsOfType = propArr.length;
          if (numEventsOfType >= 1) {
            var prev = propArr[numEventsOfType - 1];
            var current = _event;
            if (Math.abs((prev.offset + prev.duration) - current.offset) < 5 && prev.direction.value === current.direction.value && prev.easing === current.easing) {
              prev.duration += current.duration;
              prev.values.push.apply(prev.values, current.values);
              prev.iter.btwn = current.iter.btwn;
              streamDict[_event.name] = propArr.splice(0, propArr.length);
            }
          } else {
            streamDict[_event.name].push(_event)
          }
        });
        timeline.events = [];
        for (key in streamDict) {

          var streamArr = streamDict[key];
          streamArr.forEach(function(stream, i) {
            // var filteredValues = [];
            stream.values = stream.values.filter(function(val, j) {
              if (!val && val !== 0) return;
              if ( j > 1 && val === stream.values[j - 2] && stream.values[j - 1] === null) {
                  return false;
              }
              return true;
            })
            stream.values.push(null);
            stream.iter.btwn = 0;
            stream.duration = 1000.00/60 * stream.values.length;
            timeline.events.push(stream);
          })
        }
        return timeline
      }

      function convertStreamEventIntoCounter(elem, result) {
        var options = {prefix: '', suffix:''};

              result.values.forEach(function(val, i) {

                  if (!val) return;
                  var decimalValues = UtilitiesService.getArrayOfDecimals(val)[0];
                  var nonDecimal = val.split(decimalValues).filter(function(val) {return val.length})

                  if (nonDecimal.length === 1 && val.indexOf(nonDecimal) === 0) {
                    options.prefix = nonDecimal
                  } else if (nonDecimal.length === 1) {
                    options.suffix = nonDecimal;
                  }
                  if (nonDecimal.length === 2) {
                    options.prefix = nonDecimal[0];
                    options.suffix = nonDecimal[1];
                  }
                  if (decimalValues.length) {
                    result.values[i] = Math.round(decimalValues);
                  }
              })
              result.applyAtT = getApplyInnerHTMLFunc(elem, options)
      }

      function getApplyInnerHTMLFunc(elem, options, debug) {
        options = options || {};
        options.prefix = options.prefix || '';
        options.suffix = options.suffix || '';

        return function(value) {
          if (!value && value !== 0) return;
          elem.innerHTML = options.prefix + value + options.suffix;
        }
      }

      function getApplyPropertyFunc(elem, prop, debug) {

        return function(value) {

          if (value === null) return;
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

      // function addCustomAnimPropsToTimeline(elem, anim_str, custom_props, timeline, debug) {

      //   var animArgs = anim_str.split(':');

      //   var animDict = {};

      //   animDict.duration = parseInt(animArgs[1]);
      //   animDict.delay = parseInt(animArgs[3]) || 0;
      //   animDict.easingFunc = animArgs[2] || 'linear'

      //   animDict.iter = parseIteration(animArgs[4]) || parseIteration("1");
      //   animDict.direction = parseDirection(animArgs[5]) || parseDirection("f");
      //   timeline.playerProps = {iter: animDict.iter, direction:animDict.direction, duration: animDict.duration};

      //   for (var prop in custom_props) {

      //     var propValues = [];

      //     var propBreakpoints = custom_props[prop].sort(function(bp1, bp2) {return bp1.percent - bp2.percent });
      //     for (var i = 0; i < propBreakpoints.length - 1; i++) {
      //       if (!(prop in timeline.props)) {
      //         timeline.props[prop] = [];
      //       }
      //       var result = constructPropObjFromCustomBP(elem, prop, animDict, propBreakpoints[i], propBreakpoints[i + 1])

      //       if (debug) {

      //         if (result.name === 'transform' && result.values[0].indexOf('matrix3d') === -1) {
      //           delete timeline.props['transform']
      //           addIndependentTransformPropsToTimeline(result, timeline);
      //         } else {
      //           timeline.props[prop].push(result);
      //         }

      //       }
      //       timeline.events.push(result);
      //     }
      //   }
      //   if (debug) {
      //     console.log(animDict)
      //     scaleTimelineValuesForPlot(timeline.props, animDict.direction);
      //   }
      // }

      function scaleTimelineValuesForPlot(player, props, direction, debug) {

        for (var prop in props) {
          var propStreams = props[prop];
          var plotStats = {max: 0, min: 100000000000};
          var totalDuration = 0;
          propStreams.forEach(function(stream, i) {totalDuration += stream.duration});
          propStreams.forEach(function(stream, i) {

            stream.plot = {max: 0, min: 100000000000, duration: 0, values:[], sections:[]};
            var streamTick = initStreamTick(stream)
            stream.values = stream.values.slice(0, stream.values.length - 1);
            streamDuration = (streamTick.cycle.c_duration * streamTick.cycle.repeats) + stream.offset;
            streamAllValues = [];
            var maxVal = 0;
            var streamSections = [];
            var ratioWidthDuration = stream.duration/2000;


            stream.plot.html = {width: (ratioWidthDuration*RootService.viewPortSize.width).toFixed(2) + 'px'};

            for (var i = 0; i < streamTick.cycle.repeats; i++) {
              var directionDict = {'f': 'forward', 'r':'reverse'};
              var section = {html:{}, pathValues:[], scaledValues:[], values: [], cycleIndex:i + 1, direction: directionDict[streamTick.direction.current], start: stream.values[0], end: stream.values[stream.values.length - 1], duration:stream.duration, btwn:stream.iter.btwn};


              var sectionMax = 0;
              var sectionMin = stream.values[0];
              stream.values.forEach(function(value, j) {
                var scaled_value = parseFloat(UtilitiesService.getArrayOfDecimals(value)[0]);
                maxVal = Math.max(maxVal, scaled_value);
                plotStats.max = Math.max(plotStats.max, scaled_value);
                plotStats.min = Math.min(plotStats.min, scaled_value);
                stream.plot.values.push(scaled_value);

                section.values.push({value: scaled_value});
                section.pathValues.push(scaled_value)
              });
              streamTick.cycle.increment();
            }
          })
          propStreams.forEach(function(stream, i) {
            if (!debug.chartOptions) {
              debug.chartOptions = {buffer: 10, height:150};
              debug.chartOptions.height -= debug.chartOptions.buffer;
            }
            stream.plot.height = debug.chartOptions.height;
            stream.plot.max = plotStats.max;
            stream.plot.min = plotStats.min;
            stream.plot.range = Math.abs(stream.plot.max - stream.plot.min);
            var vbMax = stream.plot.max/stream.plot.range * debug.chartOptions.height;
            var vbMin = stream.plot.min/stream.plot.range * debug.chartOptions.height;
            stream.plot.vb = {y1: debug.chartOptions.height-vbMax, y2: debug.chartOptions.height-vbMin, x1: 0,x2: stream.duration};


            stream.plot.path = constructBezierStream(stream, null, debug );
          })
        }
      }


      function constructBezierStream(stream, start, debug) {

        var options = debug && debug.chartOptions || {height:150, width:stream.duration};
        values = stream.plot.values
        var max = stream.plot.max;
        var min = stream.plot.min;
        var range = Math.abs(max - min);
        var scaleXFactor = stream.duration/values.length;
        var bzStreams = []
        var bzPointArr = [];
        var startIndex = 0;
        var startStr = start;
        if (!startStr) {
          startIndex = 1;
          var firstValue = normalizeValue(values.slice(0,1), range, options.height)
          startStr = "M0 " + firstValue + ", "
          bzPointArr.push([{x:0, y:firstValue}]);
          bzStreams.push(startStr)
        }
        values.slice(1, values.length-2).forEach(function(y1, x1) {
          var x1 = x1 + 1;

          var bzPoints = [ {x: x1, y: normalizeValue(y1, range, options.height)}, {x: x1 + 1, y: normalizeValue(values[x1 + 1], range, options.height)}, {x: x1 + 2, y: normalizeValue(values[x1 + 2], range, options.height)} ];
          bzPoints.forEach(function(point, i) {
            point.x = (point.x * scaleXFactor).toFixed(2);
          })
          var bzString = formatBZCurve(bzPoints[0], bzPoints[1], bzPoints[2], ",");
          bzPointArr.push(bzPoints)
          bzStreams.push(bzString);
        })

        bzPath = bzStreams.join(" ");
        return {points: bzPointArr, path: bzPath}

        function formatBZCurve(p1, p2, p3, delimiter) {
          delimiter = delimiter || ','
          return "C" + p1.x + " " + p1.y + delimiter + p2.x + " " + p2.y + delimiter + p3.x + " " + p3.y
        }
        function normalizeValue(val, range, height, padding) {
          if (!padding) padding = 10;
          return ((height) - (val/range) * (height)).toFixed(1)
        }
      }



      function splitCustomAnimationsIntoStreams(state_args) {
        var customArgs = [];
        var stateArgsCopy = state_args.slice();
        stateArgsCopy.forEach(function(state_str, i) {
          result = isCustomAnimation(state_str)

          if (result) {
            state_args.splice(i, 1)
            var argSplit = state_str.split(':').splice(1);
            argSplit.forEach(function(arg, i) {var hasInt = parseInt(argSplit[i]); if (hasInt || hasInt > -1) {argSplit[i] = hasInt } });
            customArgs.push({propDict: result, args: argSplit});
          }
        })
        if (customArgs.length) {
          var uniquePropStreams = [];
          customArgs.forEach(function(c_anim_dict, index) {
            var genDuration = c_anim_dict.args[0];
            var genDelay = c_anim_dict.args[2];

            for (prop in c_anim_dict.propDict) {
              var propStreams = c_anim_dict.propDict[prop];
              if (propStreams.length) {
                var accumulatedDelay =
                propStreams.forEach(function(_prop, stream_index) {
                  if (stream_index === 0 || stream_index === propStreams.length) return;
                  var genArgsCopy = c_anim_dict.args.slice();
                  // console.log(genArgsCopy);
                  var duration = genArgsCopy[0]
                  var deltaPercent = (propStreams[stream_index].percent - propStreams[stream_index - 1].percent)
                  var delay = (_prop.percent/100.0) * genDuration;
                  var startVal = propStreams[stream_index - 1].value;
                  var endVal = _prop.value;
                  deltaPercent = deltaPercent/100;
                  genArgsCopy[0] = (deltaPercent*duration) + "";
                  genArgsCopy[2] = (delay + genDelay - genArgsCopy[0]) + "";

                  // if ((genArgsCopy[2] + genArgsCopy[0]) < duration) {
                    genArgsCopy[3] = (genArgsCopy[3] + '+' + (duration - genArgsCopy[0])) + "";
                    // console.log(genArgsCopy)
                  // }

                  // console.log(_prop.prop + ':' + startVal + ':' + endVal + ':' + genArgsCopy.join(":"));
                  uniquePropStreams.push(_prop.prop + ':' + startVal + ':' + endVal + ':' + genArgsCopy.join(":"));
                })
              }
            }
          })

          uniquePropStreams.forEach(function(stream, i) {

            state_args.push(stream)
          })
        }
        function calculateDelayForPropStreamsBefore(prop_arr, duration, percent) {
          if (!prop_arr || !prop_arr.length) {
            return 0;
          }
          if (prop_arr && prop_arr.length) {
            var sumPercent = 0;
            prop_arr.forEach(function(prop, i) {
              sumPercent += prop.percent
            })
            console.log(sumPercent)
          }
          return 0;
        }
        return state_args;
      }

      function filterTransformAndShortcutStr(state_args) {
        var defaultTransformProps = ['translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'rotate', 'skewX', 'skewY', 'scaleZ', 'rotateX', 'rotateY', 'rotateZ', 'perspective', 'rotate3d'];
        var transform_state_arg = [];
        var state_args_final = [];
        state_args.slice().forEach(function(state_prop, i) {
          var statePropSplit = state_prop.split('p:');
          statePropSplit.forEach(function(str, i) {
            if (parseInt(str.charAt(str.length - 1))) {
              statePropSplit[i] = state_prop + '%:'
            }
          })
          state_prop = statePropSplit.join("p:");
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
        var detectAllNumbers = UtilitiesService.getArrayOfDecimals(result.values[0]);
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
          // var values = TweenService.preComputeValues(prop_name, bpDeltaDuration, bp_start.value, bp_end.value, 'linear', {cache:[]}).cache;

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
      if (animPropShortcuts && str in animPropShortcuts[type]) {
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
