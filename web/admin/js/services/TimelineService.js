angular
.module('uguru.admin')
.factory('TimelineService', [
    '$timeout',
    'RootService',
    'AnimationService',
    'UtilitiesService',
    '$interval',
     TimelineService
]);
function TimelineService($timeout, RootService, AnimationService, UtilitiesService, $interval) {
  var browserPrefix = RootService.getBrowserPrefix();
  var func = getAnimationFunctions();
  var animationFunc;
  return {
    injectAnimationWithPlayer: injectAnimationWithPlayer,
    getAnimationStartListener: getAnimationStartListener,
    getAnimationEndListener: getAnimationEndListener,
    getAnimatableTemplateFunc: getAnimatableTemplateFunc,
    getAnimationObjFromName: getAnimationObjFromName,
    initGlobalPlayer: initGlobalPlayer,
    processStyleAnimations: processStyleAnimations,
    processAnimations: processAnimations,
    changeStateAll:changeStateAll,
    func: func,
    jumpTo:jumpTo,
    initAnimations: initAnimations
  }



  function initAnimations(animations) {
      var prefix = 'animation';
      var browserPrefix = RootService.getBrowserPrefix();
      if (browserPrefix && browserPrefix.length)  {
          prefix = browserPrefix + 'Animation';
      }



    animations.forEach(function(a, i) {
        var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState']
        var animationCSS = window.getComputedStyle(a.element)[prefix];
        if (animationCSS && animationCSS.split(' ').length >= 8) {
            a.css = {};
            a.css = {orig: {}, cache: {}};
            var elemAnims = animationCSS.split(', ');
            properties.forEach(function(prop, j) {
                propArr = [];
                elemAnims.forEach(function(str, k) {propArr.push(str.split(' ')[j]) });
                a.css.orig[prefix+prop] = propArr.join(', ');
                a.css.cache[prefix+prop] = propArr.join(', ');
            })
        }
    });
    console.log(animations);
    return animations;
  }

  function initGlobalPlayer(attr, env, animations) {
    var duration = env && env.duration;
    var resultDict = {
      duration: duration,
      play: attr.play === "true" || false,
      speed:  formatSpeedFromAttr(parseFloat(attr.speed && attr.speed.replace('x', ''))),
      offset: 0,
      template: attr.import,
      import: attr.template,
      fillMode: 'forwards',
      direction: 'normal',
      timer: {reset: resetTimer},
      iterCount :1,
      jumpToScale:5,
      scaleOffset: 1,
      timeInterval: 100,
      complete: false,
      animStats: {
        total: animations.length,
        active: 0
      }
    }
    resultDict.fDuration = formatDurationAllTypes(resultDict.duration)


    // applyPlayerDefaultSettings(animations);
    initAnimationDefaults(animations, resultDict);
    if (resultDict.play) {
      var prefix = (browserPrefix && browserPrefix + 'Animation') || 'animation' ;
      $timeout(function() {
        // resultDict.play = true;
        // changeStateAll(prefix+'PlayState', animations, 'running');
      })
    }
    return resultDict;


    // var latestAnimation = animations.sort(function(a1, a2) {a2.timeStamp - a1.timeStamp}).reverse()[0];
  }



  function initAnimationDefaults(animations, state) {

    var startAnimationEvent = browserPrefix + 'animationStart';
      if (browserPrefix && browserPrefix.length) {
        startAnimationEvent = browserPrefix + 'AnimationStart';
      }

    var prefix = 'animation';
      if (browserPrefix && browserPrefix.length)  {
        prefix = browserPrefix + 'Animation'
      }
    var elements = [];
    animations.forEach(function(a, i) {if (elements.indexOf(a.element) === -1) {elements.push(a.element)}})

    elements.forEach(function(e, j){
      var eAnimationStyle = window.getComputedStyle(e)[prefix];
      var eAnimations = [];
      animations.forEach(function(anim, k) {if (anim.element === e) eAnimations.push(anim)});
      eAnimations.forEach(function(anim, k) {
        anim.events = {
          start: getStartListener(anim, e),
          end: getEndListener(anim, e),
          listeners: {}
        };

        console.log('starting listener', window.getComputedStyle(e)['webkitAnimation']);
        eAnimationStyleNames = UtilitiesService.replaceAll(eAnimationStyle, 'paused, ', 'paused ');
        eAnimationStyleNames = UtilitiesService.replaceAll(eAnimationStyleNames, 'running, ', 'running ');
        eAnimationStyleNames = UtilitiesService.replaceAll(eAnimationStyleNames, 'running ', 'paused ');
        var animStyleArrIndex = eAnimationStyleNames.split(' ').indexOf(anim.name);
        var remainingForward = eAnimationStyleNames.split(anim.name + ' ')[1];
        var remainingStyle = anim.name + ' ' + remainingForward.split(' paused')[0] + ' paused';
        var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState']
        var styleAnimArr = UtilitiesService.replaceAll(remainingStyle, ', ', ',').split(' ');
        styleAnimArr.forEach(function(animProp, ai) {
          var property = prefix + properties[ai];
          value = ai;
          anim.css[property] = animProp;
        })
      })
    })
    console.log(elements);
    // console.log(animations);


    function getStartListener(anim, elem) {
      var startAnimationEvent = browserPrefix + 'animationStart';
      if (browserPrefix && browserPrefix.length) {
        startAnimationEvent = browserPrefix + 'AnimationStart';
      }
      console.log(startAnimationEvent)
      return function() {

        anim.events.listeners.startFunc =  function(e) {
          console.log(e.animationName, 'has started', anim.css);

          anim.active = true;
          elem.removeEventListener(startAnimationEvent, anim.events.listeners.startFunc);
        }
        elem.addEventListener(startAnimationEvent, anim.events.listeners.startFunc);
      }

    }
    function getEndListener(anim, elem) {
      var startAnimationEvent = browserPrefix + 'animationEnd';
      if (browserPrefix && browserPrefix.length) {
        startAnimationEvent = browserPrefix + 'AnimationEnd';
      }
      return function() {
        anim.events.listeners.endFunc = elem.addEventListener(startAnimationEvent, function(e) {
          // console.log(e.animationName, 'has ended', anim.css);
          // changeState(anim.prefix + "PlayState", anim, "paused");
          // changeState(anim.prefix + "Name", anim, "");
          // changeState(anim.prefix + "Name", anim, anim.css.name);
          state.complete = true;
          var prefix = 'animation';
          if (browserPrefix && browserPrefix.length)  {
            prefix = browserPrefix + 'Animation'
          }

          // changeState(anim, 'Name', '');

          if (anim.resetAfter && !anim.midReset) {

            // $timeout(function() {
            //   anim.reset();
            // }, 100)

            if (anim.isLast) {

              state.play = false;
            }
          }
          elem.removeEventListener(startAnimationEvent, anim.events.listeners.endFunc);

        });
        elem.addEventListener(startAnimationEvent, anim.events.listeners.endFunc);
      }

    }
  }

  // function applyPlayerDefaultSettings(state, animation) {
  //   state.offset = 1;
  //   if (state.offset) {

  //   }
  // }

  function jumpTo(state, progress_elem, bg_elem_coords) {
    return function($event)  {
      var e = $event;
      var newWidth = $event.clientX - 20;
      var percentPlaybarOffset = parseFloat(((($event.clientX - 20) / bg_elem_coords.width)).toFixed(4));

      //calculate percent of bar changed
      currentWidth = progress_elem.getBoundingClientRect().width;
      progressTranslateXChange = Math.abs((newWidth - currentWidth)/bg_elem_coords.width);



      scaledTransitionTime = parseFloat((progressTranslateXChange * state.duration).toFixed(4));

      // state.offset = (newWidth/bg_elem_coords.width).toFixed(4) * state.duration;


      var timerDuration = scaledTransitionTime/state.jumpToScale;
      angular.element(progress_elem).css('transition', 'width ' + timerDuration + 'ms linear' );

      progress_elem.setAttribute('width', percentPlaybarOffset * 100 + '%');




      var interval = state.timeInterval / state.jumpToScale;
      state.scaleOffset =  state.jumpToScale;
      state.jumpOffset = timerDuration;


      // state.play = true;
      state.jumpDirection = 'normal';
      if (currentWidth > newWidth) {
        state.jumpDirection = "reverse";
        console.log(state.jumpDirection);
      }

      console.log(state, state.offset, state.jumpDirection, interval)
      startTimer(state, state.offset, state.jumpDirection, interval);

      $timeout(function() {
        state.scaleOffset = 1;
        state.jumpOffset = null;
        state.jumpDirection = null;
        pauseTimer(state, interval);
        var timerDuration = scaledTransitionTime/state.jumpToScale;
        initialTransitionSet = false;
      }, timerDuration)

      // console.log('new width', percentPlaybarOffset)
      // console.log('percent change', progressTranslateXChange);
      // console.log('direction', state.jump);

      // console.log(durationRemaining);
      // angular.element(progressElem).css('transition', 'width ' + durationRemaining + 'ms linear' );

    }
  }

  function formatSpeedFromAttr(speed) {
    if (!speed || !speed.length) {
      return '1x';
    } else {
      return parseFloat(speed.replace('x', '')).toFixed(1);
    }
  }

  function formatDurationAllTypes(duration) {
    sDuration = (duration/1000).toFixed(1);
    return {
      ms: {
        number: duration,
        str: duration + 'ms'
      },
      s: {
        number: parseFloat(sDuration),
        str: sDuration + 's'
      }
    }
  }

  function parseStartAt(str_start) {
    if (str_start && str_start.split('ms').length === 1) {
      return str_start + 'ms';
    }
    return str_start;
  }

  function parseDuration(str_duration) {
    if (str_duration && str_duration.split('ms').length === 1) {
      return str_duration + 'ms';
    } else if (str_duration && str_duration.split('s').length > 1) {
      var strValue = parseFloat(str_duration.split('s')[0]) + '000ms';
      return strValue;
    }
    return str_duration;
  }

  function changeStateAll(property, animations, value, state) {
    animations.forEach(function(a, i) {changeState(property, animations[i], value, state)});
  }

  function changeStateJumpAll(property, animations, state) {
    console.log(state.jumpDirection);
      var deltaOffset = state.jumpOffset * state.scaleOffset;

      // animations = animations.splice(0, 1);
      // $timeout(function() {

      //   console.log(animations[0].name, isJumpValid);
      // }, 1000)

      // console.log(animations);
      // console.log('jumping', animations.length, 'animations')
      // console.log('jump offset', state.jumpOffset)
      // console.log('jump direction', state.jumpDirection);
    // $timeout(function() {

      // var isJumpValid = isJumpValidForAnimation(state, animations[0]);
      var validAnimations = animations.filter(function(a, i) {return isJumpValidForAnimation(state, a)})
    // }, 500)
      var jumpObj = {scale: state.scaleOffset, direction:state.jumpDirection, duration: state.jumpOffset * state.scaleOffset, start: state.offset, end: state.offset + (state.jumpOffset * state.scaleOffset)}
      // if (state.offset < state.lastOffset) {
      //   jumpObj.end = state.offset - (state.jumpOffset * state.scaleOffset);
      // }
      console.log(validAnimations);
      validAnimations.forEach(function(a, i) {changeStateJump(validAnimations[i], jumpObj)});
  }

  function isJumpValidForAnimation(state, animation) {

    // var offsetDiff = state.offset - state.lastOffset;
    animTLObj = getAnimationTimelineObj(animation);
    var TLObj = getPlayerTimelineObj(state)
    // console.log(state.lastOffset, state.offset);
    // console.log('\n');
    // console.log(animation)
    // console.log(animTLObj.start, animTLObj.end);
    // console.log(TLObj.start, TLObj.end);
    // console.log('\n');
    // forward direction

    if (Math.abs(TLObj.end - TLObj.start) <= Math.abs(animTLObj.end - animTLObj.start) && ((animTLObj.start <= TLObj.start && animTLObj.end <= animTLObj.start))) {
      return true;
    }
    if ( (TLObj.end - TLObj.start) >= 0 && ((TLObj.start <= animTLObj.start && animTLObj.start <= TLObj.end) || (TLObj.start <= animTLObj.end && animTLObj.end <= TLObj.end))) {

      return true;
    }
    if ( (TLObj.end - TLObj.start) < 0 && ((TLObj.start >= animTLObj.start && animTLObj.start >= TLObj.end) || (TLObj.start >= animTLObj.end && animTLObj.end >= TLObj.end))) {
      return true;
    }


    return false;
  }

  function getPlayerTimelineObj(state) {
    var deltaOffset = state.jumpOffset * state.scaleOffset;
    if (state.jumpDirection === 'reverse') {
      deltaOffset *= -1;
    }

    var resultDict = {start: state.offset, end: state.offset + deltaOffset, direction: 'normal'};
    // console.log(resultDict);

    if (resultDict.end - resultDict.start < 0) {
      resultDict.direction = 'reverse'
    }
    return resultDict;
  }

  function getAnimationTimelineObj(animation) {
    var animStartMS = durationToMS(animation.delay);
    var animEndMS = durationToMS(animation.duration) + animStartMS;
    return {
      start: animStartMS,
      end: animEndMS,
      direction: animation.direction
    }
  }


  function getAnimationFunctions(state) {
    var prefix = 'animation';
    if (browserPrefix && browserPrefix.length)  {
      prefix = browserPrefix + 'Animation'
    }
    return {
      play: function(animation) {return changeState(prefix + "PlayState", animation, "running")},
      pause: function(animation) {return changeState(prefix + "PlayState", animation, "paused")},
      reset: function(animation) {return changeState(prefix+"Reset", animations)},
      jump: function(animation, state) {return changeStateJump(prefix+"Reset", animations)},
      playAll: function(state) {return function(animations) {startTimer(state); return changeStateAll(prefix + "PlayState", animations, "running")}},
      pauseAll: function(state) {return function(animations) {pauseTimer(state); return changeStateAll(prefix + "PlayState", animations, "paused")}},
      jumpAll: function(state) {return function(animations) {return changeStateJumpAll(prefix + "Jump", animations, state)}},
      resetAll: function(animations, state) {return changeStateAll(prefix+"Reset", animations, "paused", state)}
    }
  }

  function resetTimer(state) {
    startTimer(state, state.duration, 'reverse', 10)
  }

  function startTimer(state, start_point, direction, interval, cb) {
    state.lastOffset = state.offset;
    start_point = start_point || state.lastOffset || 0;
    state.offset = start_point;
    if (direction && direction === 'reverse') {
      state.increment = false;
    } else {
      state.increment = true;
    }
    interval = interval || state.timeInterval;
    state.startIntervalPromise = $interval(
      function(){
        if (state.increment) {
          state.offset += (interval *state.scaleOffset);
        } else {
          state.offset -= (interval *state.scaleOffset);
        }
        state.offsetStr = (state.offset/1000).toFixed(1) + '';
        if ((state.offset + interval) > state.duration || state.offset < 0) {
          $timeout(function() {
            pauseTimer(state);
            if (state.offset > 0) {
              state.offset = state.duration;
            }
            if (state.offset <= 0) {
              state.offset = 0;
            }

            state.offsetStr = (state.offset/1000).toFixed(1) + '';


            // state.play = false;
            // state.reset = true;
            // $timeout(function() {
            //   state.reset = false;
            // })
          }, (state.offset + interval - state.duration))
        }
      }, interval
    )
  }

  function pauseTimer(state) {

    $interval.cancel(state.startIntervalPromise);
  }

  function processAnimations(scope,element) {
    var prefix = 'animation';
    if (browserPrefix && browserPrefix.length)  {
      prefix = browserPrefix + 'Animation'
    }
    var allElements = element[0].querySelectorAll("*");

    var timelineDict = {transitions: [], animations:[]};
    var classDict = {};
    var animations = [];
    var elementsWithAnimations = [];
    var count = 0;
    var maxDict = {duration: 0, delay:0, animation: null};;
    for (var i = -1; i < allElements.length; i++) {
      var indexChild = ((i >= 0) && allElements[i]) ||element[0];
      var indexChildClass = indexChild.classList;
      var animationProps = getAnimationObj(browserPrefix, indexChild);
      if (animationProps) {
        elementsWithAnimations.push(indexChild);
        var firstKey = Object.keys(animationProps)[0];
        var animationSplit = UtilitiesService.replaceAll(animationProps[firstKey], ', ', ',').split(',');
        for (var j = 0; j < animationSplit.length; j++) {
          var animDict = [];
          for (key in animationProps) {
            animDict[key] = UtilitiesService.replaceAll(animationProps[key], ', ', ',').split(',')[j];
            var animObj = initAnimationObj(animDict, indexChild, browserPrefix)
            if (animObj.duration && animObj.name && animObj.delay) {
              var durationParsed = parseFloat(parseDuration(animObj.duration));
              var delayParsed = parseFloat(parseDuration(animObj.delay));
              if ((delayParsed + durationParsed) > (maxDict.delay + maxDict.duration)) {
                maxDict.delay = delayParsed;
                maxDict.duration = durationParsed;
                maxDict.animation = animObj;
              }
              if (!(animObj.name in scope.animLookupDict) || scope.animLookupDict[animObj.name].indexOf(indexChild) === -1) {
                  if (!(animObj.name in scope.animLookupDict)) {
                    scope.animLookupDict[animObj.name] = [indexChild];
                  } else {
                    scope.animLookupDict[animObj.name].push(indexChild);
                  }

                  animations.push(animObj)
              }
            }
          }
        }
      }
    }
    var totalLengthMS = durationToMS(maxDict.delay + maxDict.duration + 's');
    // maxDict.animation.isLast = true;
    animations = animations.filter(function(a, i) { return window.getComputedStyle(a.element)['webkitAnimation'].split(' ')[1] !== '0s' })

    animations.forEach(
      function(anim, index) {
        var durationMS = durationToMS(anim.duration);
        var delayMS = durationToMS(anim.delay);
        anim.prefix = prefix;
        anim.css = {};
        anim.set = getAnimationSetFunc(anim);
        anim.env = {
          id: index + 1,
          duration: totalLengthMS,
          xLeft: parseFloat((delayMS/totalLengthMS * 100 ).toFixed(4)),
          width: parseFloat(((durationMS/totalLengthMS) * 100).toFixed(4)),
          collapsed: false,
          active: true,
          tabIndex:0,
          startAt:'50ms',
          endAt: '1s',
          fillModeOptions: ['forwards', 'none', 'backwards', 'both'],
          directionOptions: ['forwards', 'none', 'backwards', 'both'],
        }
        anim.bp = {points: null, add: null, remove:null};
        anim.bp.points = [{time:0, name:'@start'}, {time:0, name:'@end'}];
        anim.bp.add = addAnimationBreakpoint;
        anim.bp.remove = removeAnimationBreakpoint;

        anim.keys = {};
        anim.keys.templates = []
        anim.keys.frames = [{percent: '%0', properties:[]}];
        anim.keys.addFrame = addAnimationKeyframe,
        anim.keys.removeFrame = removeAnimationKeyframe;

        anim.easings = {};
        anim.reset = resetAnimationFunc(anim);
        anim.easings.options = [];
        anim.easings.createTemplate = function () {};
      }
    )
    return animations;

  }

  function getAnimationSetFunc(animation) {
    return function(property, value) {

      setAnimationFunc(animation, property, value)

    }
  }
  function setAnimationFunc(animation, property, value) {
    changeState(animation.prefix + property, animation, value)
  }

  function removeAnimationKeyframe() {
    return function() {

    }
  }

  function addAnimationKeyframe() {
    return function() {

    }
  }

  function removeAnimationBreakpoint() {
    return function() {

    }
  }

  function addAnimationBreakpoint(anim) {
    return function() {

    }
  }

  function durationToMS(str_duration) {
    if (str_duration.indexOf('ms') > -1) {
      return parseFloat(str_duration.replace('ms', ''));
    } else if (str_duration.indexOf('s') > -1) {
      return parseFloat(str_duration.replace('ms', '')) * 1000;
    }
  }

  function getAnimationCssCache(animation, property) {
    if (property in animation.css) {
      return animation.css[property]
    }
  }

  function changeStateJump(animation, jump_info) {
    var prefix = 'animation';
    if (browserPrefix && browserPrefix.length)  {
      prefix = browserPrefix + 'Animation'
    }
    var ji = jump_info;

    ji.pauseIn = ji.duration/ji.scale;

    var msDuration = durationToMS(animation.duration);
    var msDelay = durationToMS(getAnimationCssCache(animation, prefix+'Delay') || animation.delay)
    var msScaledDuration = msDuration/ji.scale + 'ms';
    var msScaledDelay = msDelay/ji.scale + 'ms';
    // console.log('jump animation', animation.name, 'start:' + msScaledDelay, 'end:' + msScaledDuration + msScaledDelay, 'will stop at', ji.pauseIn);

    changeState(prefix + "PlayState", animation, "paused");




    if (ji.direction === 'reverse') {
        changeState(prefix + "Delay", animation, Math.abs((msDuration - msDelay)/ji.scale) * -1);
        changeState(prefix + "Direction", animation, "reverse");
        changeState(prefix + "Duration", animation, msScaledDuration);
    } else {
        changeState(prefix + "Delay", animation, msScaledDelay);
        changeState(prefix + "Direction", animation, "normal");
        changeState(prefix + "Duration", animation, msScaledDuration);
    }



    // console.log('setting delay to...', msScaledDelay);



    changeState(prefix + "PlayState", animation, "running");

    $timeout(function() {
      //

    // console.log(getAnimationProperty(animation, prefix+"Direction"));


      changeState(prefix + "PlayState", animation, "paused");
        if (ji.direction === 'reverse') {
          changeState(prefix + "Direction", animation, "normal");
        }


      changeState(prefix + "Duration", animation, msDuration + 'ms');



      var elapsedDelay = parseFloat((ji.end - msDelay).toFixed(1));


      // if (elapsedDelay > msDuration) {
      //   console.log(animation.name, 'has completed');
      //   //TODO --> set everything back to initial once complete

      //   changeState(prefix + "Delay", animation,  animation.delay);
      //   console.log('Restored delay', animation.name, window.getComputedStyle(animation.element)[prefix + 'Delay']);
      // } else

      if (elapsedDelay < msDuration && msDelay > ji.start) {
        elapsedDelay = '-' + elapsedDelay + 'ms';
        changeState(prefix + "Delay", animation, elapsedDelay);
      } //else {
        //changeState(prefix + "Delay", animation, animation.delay);
      //}

      console.log(animation.name, animation.duration, animation.delay, elapsedDelay, animation);
      }, ji.pauseIn)

  }

  function getAnimationFillMode(animation, fill_prop) {
    if (animation.fillMode !== animation.css[fill_prop] && fill_prop in animation.css && animation.css[fill_prop].length) {
      return animation.css[fill_prop]
    } else {
      return animation.fillMode
    }
  }

  function changeState(property, animation, value, state) {

    parsedProperty = (property +"").toLowerCase().replace('webkit', '').replace(browserPrefix, '').replace('animation', '')
    switch(parsedProperty) {
      case ("direction"):
        applyAnimationProperty(animation, property, value);
        break;
      case ("delay"):
        applyAnimationProperty(animation, property, value);
        break
      case ("fillmode"):
        applyAnimationProperty(animation, property, value);
        break
      case ("timingfunction"):
        applyAnimationProperty(animation, property, value);
        break
      case ("duration"):
        applyAnimationProperty(animation, property, value);
        break
      case ("playstate"):
          console.log('it gets here', animation, property, value)
          applyAnimationProperty(animation, property, value);
        break;
      case ("name"):
        applyAnimationProperty(animation, property, value);
        break;
      case ("reset"):
        animation.reset();
        break;

    }
  }

  function applyAnimationProperty(animation, property, value) {
    console.log(animation, property)
    var currentValue = getAnimationProperty(animation, property);
    if (currentValue && currentValue.split(',').length > 1) {
      console.log('\nattempting to apply', animation.name, property, 'from', currentValue, 'to', value);
      console.log('value before:' + currentValue);
      value = getIndexValue(animation, property, currentValue, value);
      console.log('value proposed:' + value);
    }
    // console.log(value);
    console.log('before', window.getComputedStyle(animation.element)['webkitAnimation']);
    $timeout(function() {
      animation.element.style[property] = value;
      console.log(animation);
      console.log('after', window.getComputedStyle(animation.element)['webkitAnimation']);
    })


    // animation.css[property] = value;

    return value
    // if (currentValue) {
    //   var currentValue = getAnimationProperty(animation, property);
    //   // console.log('value after:' + currentValue, '\n');
    // }
  }

  function getIndexValue(animation, property, current, future) {
    var prefix = 'animation';
    if (browserPrefix && browserPrefix.length)  {
      prefix = browserPrefix + 'Animation'
    }
    var currentValueName = getAnimationProperty(animation, prefix + 'Name');
    var cvSplitName = currentValueName.split(', ');
    var indexName = cvSplitName.indexOf(animation.name);


    var valueSplit = current.split(', ');
    valueSplit[indexName] = future;

    return valueSplit.join(', ');
  }

  function getAnimationProperty(animation, property) {
    parsedProperty = (property +"").toLowerCase().replace('webkit', '').replace(browserPrefix, '').replace('animation', '');
    value = animation.element.style[property];
    if (!value) {
      return window.getComputedStyle(animation.element)[property];
    }
    return value;
  }

  function getStyleWithCSSSelector(cssSelector) {
      var styleSheets = window.document.styleSheets;
      var styleSheetsLength = styleSheets.length;
      var arStylesWithCSSSelector = [];

      //in order to not find class which has the current name as prefix
      var arValidCharsAfterCssSelector = [" ", ".", ",", "#",">","+",":","["];

      //loop through all the stylessheets in the bor
      for(var i = 0; i < styleSheetsLength; i++){
          var classes = styleSheets[i].rules || styleSheets[i].cssRules;
          var classesLength = classes.length;
          for (var x = 0; x < classesLength; x++) {
              //check for any reference to the class in the selector string
              if(typeof classes[x].selectorText != "undefined"){
                  var matchClass = false;

                  if(classes[x].selectorText === cssSelector){//exact match
                      matchClass=true;
                  }else {//check for it as part of the selector string
                      //TODO: Optimize with regexp
                      for (var j=0;j<arValidCharsAfterCssSelector.length; j++){
                          var cssSelectorWithNextChar = cssSelector+ arValidCharsAfterCssSelector[j];

                          if(classes[x].selectorText.indexOf(cssSelectorWithNextChar)!=-1){
                              matchClass=true;
                              //break out of for-loop
                              break;
                          }
                      }
                  }

                  if(matchClass === true){
                      //console.log("Found "+ cssSelectorWithNextChar + " in css class definition " + classes[x].selectorText);
                      var styleDefinition;
                      if(classes[x].cssText){
                          styleDefinition = classes[x].cssText;
                      } else {
                          styleDefinition = classes[x].style.cssText;
                      }
                      if(styleDefinition.indexOf(classes[x].selectorText) == -1){
                          styleDefinition = classes[x].selectorText + "{" + styleDefinition + "}";
                      }
                      arStylesWithCSSSelector.push({"selectorText":classes[x].selectorText, "styleDefinition":styleDefinition});
                  }
              }
          }
      }
      if(arStylesWithCSSSelector.length==0) {
          return null;
      }else {
          return arStylesWithCSSSelector;
      }
  }

  function initAnimationObj(css_dict, element, browser) {
      var mappingDict = {timingfunction:'timingFunc', fillmode: 'fill', iterationcount: 'iterCount'}
      browser = browser || ''

     var cssColumns = Object.keys(css_dict)
     var animation = {
        element: element,
        css: css_dict,
        resetAfter: true,
        isLast: false,
        reset: null,
        resetParentTimeline: null
      }
      // animation.reset = resetAnimationFunc(animation)
      // animation.play = playAnimationFunc(animation);
      // animation.pause = pauseAnimationFunc(animation);
      // animation.set = setAnimationFunc(animation);
      for (key in css_dict) {
        var shortKey = (key + "").replace(browser, '').replace('Animation', '').replace('animation', '');
        shortKey = shortKey.toLowerCase().trim();
        if (shortKey in mappingDict) {
          shortKey = mappingDict[shortKey]
        };
        animation[shortKey] = css_dict[key].trim();
      }
      return animation;
  }



  function resetAnimationFunc(animation) {
    var prefix = 'animation';
    if (browserPrefix && browserPrefix.length)  {
      prefix = browserPrefix + 'Animation'
    }
    return function() {
      animation.midReset = true;
      changeState(prefix+'Delay', animation, '-' + animation.css.orig[prefix+'Duration']);
      changeState(prefix+"PlayState", animation, "paused");
      changeState(prefix+"PlayState", animation, "running");
      // changeState(prefix+'FillMode', animation, "backwards");


      // changeState(prefix+'Duration', animation, '10ms');

      $timeout(function() {
        changeState(prefix+"Name", animation, '');
        changeState(prefix+"PlayState", animation, "paused");
        changeState(prefix+'Delay', animation, animation.css.orig[prefix+'Delay']);
        changeState(prefix+"Name", animation, animation.name);
      }, 100)



      // $timeout(function() {
      //   animation.midReset = false
      //   changeState(prefix+"PlayState", animation, "paused");



      //   changeState(prefix+'Duration', animation, animation.css.orig[prefix+'Duration']);



      // }, 500)
      console.log('reseting...')


      // changeState(prefix+"FillMode", animation, "backwards");



      // animation.events.start();
      // animation.events.end();
    }
  }

  function playAnimationFunc(animation) {
    var prefix = 'animation';

  }

  function pauseAnimationFunc(animation) {
    var prefix = 'animation';

  }





  function processStyleAnimations(styles) {
    var resultDict = {animations: {}, transitions: {}};
    var ss = document.styleSheets;
    for (var i = 0; i <ss.length; i++) {
          if (ss[i].cssRules && ss[i].cssRules.length) {

          }
    }
    return resultDict;
  }

  function getAnimationObj(browser, element) {
    var animationProperties = ['animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationFillMode',  'animationIterationCount', 'animationDelay'];
    var defaultPropertyArr = ["none", "0s", "ease", "none", "1", "0s"];
    var animResultDict = {};
    if (browser && browser.length) {
      animationProperties.forEach(function(prop, i) {animationProperties.push(browser + prop[0].toUpperCase() + prop.substring(1))});
    }
    var computedStyle = window.getComputedStyle(element);
    var sum = 0;
    for (var i = 0; i < animationProperties.length; i++) {
      var iProperty = animationProperties[i];
      if (computedStyle[iProperty] && computedStyle[iProperty].length) {
        if ([browserPrefix + 'Animation', 'animation'].indexOf(iProperty) > -1 && computedStyle[iProperty] !== 'none 0s ease 0s 1 normal none running') {
          animResultDict = processComputedPropertyDefaultFormat(animResultDict, computedStyle[iProperty], browser)
        } else {
          animResultDict[iProperty] = computedStyle[iProperty];
        }
      }
    }

    return Object.keys(animResultDict).length && animResultDict;
  }

  function processComputedPropertyDefaultFormat(_dict, anim_str, browser) {
    var properties =     ['animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay',  'animationIterationCount', 'animationDirection', 'animationFillMode', 'animationPlayState']
    var animStrSplit = UtilitiesService.replaceAll(anim_str, ', ', ',').split(',');
    if (browser && browser.length) {
      properties.forEach(function(prop, i) {properties[i] = browser + prop[0].toUpperCase() + prop.substring(1)});
    }
    for (var i = 0; i < properties.length; i++) {
      var resultStr = '';
      for (var j = 0; j < animStrSplit.length; j++) {
        if (j !== ( animStrSplit.length - 1)) {
          resultStr +=  animStrSplit[j].split(' ')[i] + ', '
        } else {
          resultStr +=  animStrSplit[j].split(' ')[i]
        }
      }
      if (resultStr.length) {
        _dict[properties[i]] = resultStr;
      }
    }
    return _dict
  }

  function playAll(animations) {
    return;
  }

  function getAnimationObjFromName(name) {
    return AnimationService.getAnimationObjFromAnimationName(name);
  }

  function getAnimatableTemplateFunc(element, attr) {
      var styleStr = '';
      if (attr.size) {
          styleStr += 'width:' + attr.size + 'px;'
          styleStr += 'height:' + attr.size + 'px;'
      }
      if (attr.stroke) {
          styleStr += 'stroke:' + attr.stroke + 'px;'
          element.children().css('stroke', attr.stroke);
      }
      styleStr += RootService.formatBrowserCSSProperty('animation-name') +':{{anim.name}};'
      styleStr += RootService.formatBrowserCSSProperty('animation-iteration-count') +':{{anim.iter}} !important;'
      styleStr += RootService.formatBrowserCSSProperty('animation-fill-mode') +':{{anim.fill}} !important;'
      styleStr += RootService.formatBrowserCSSProperty('animation-duration') +':{{anim.duration}}ms !important;'
      styleStr += RootService.formatBrowserCSSProperty('animation-timing-function') +':{{anim.func}} !important;'
      styleStr += RootService.formatBrowserCSSProperty('animation-delay') +':{{anim.delay}}ms !important;'
      styleStr += RootService.formatBrowserCSSProperty('animation-play-state') +':{{anim.playState}}'
      attr.$set('style', styleStr);
      return attr.template
    }

  function injectAnimationWithPlayer(animations, elem, cb, _window) {
        var elemCoords = elem[0].getBoundingClientRect();
        elemCoords.height = elemCoords.height/10.0;
        elemCoords.width =  elemCoords.width/10.0;
        var dx = Math.abs(elemCoords.width - _window.width);
        var dy = Math.abs(elemCoords.height - _window.height);

        div = document.createElement('div');
        div.innerHTML = '<timeline-player animations=animations></timeline-player>'
        div.style.zIndex = 100000;

        if (dx/_window.width < 0.1) {
          div.classList.add('bottom-0', 'left-0', 'full-x', 'fixed');
          var elem = document.querySelector('ui-view');
          elem.appendChild(div);
        } else {
          div.classList.add('relative', 'animated', 'slideInUp');
          elem[0].parentNode.appendChild(div);
        }
        cb && cb(div);
    }


function getAnimationStartListener(scope, browser, element) {
      return function(cb) {

        var startAnimationEvent = browser + 'animationStart';

        if (browser && browser.length) {
          startAnimationEvent = browser + 'AnimationStart';
        }
        return element.addEventListener(startAnimationEvent, function(e) {
            var animation = {
                target: e.target,
                timeStamp: e.timeStamp,
                type: e.type,
                name: e.animationName,
                obj: getAnimationObjFromName(e.animationName)}
            console.log(animation)

            e.target.style[browser.toLowerCase() + 'AnimationPlayState'] = 'paused';
            animation.duration = window.getComputedStyle(e.target)[browser.toLowerCase() + 'AnimationDuration'];
            var duration = (e.target.style[browser.toLowerCase() + 'AnimationDuration'].split('ms')[0] / 10) + 'ms';
            e.target.style[browser.toLowerCase() + 'AnimationDuration'] = duration;
            e.target.style[browser.toLowerCase() + 'AnimationPlayState'] = 'pause';
            // scope.animations.push(animation)
            cb && cb(e);
        })
      }
    }

function getAnimationEndListener(scope, browser, element) {

    return function(cb) {
    var startAnimationEvent = 'animationEnd';
    if (browser && browser.length) {
      startAnimationEvent = browser + 'AnimationEnd';
    }
    return element.addEventListener(startAnimationEvent, function(e) {
        cb && cb();

        if (browser) {
          console.log('pausing');
          e.target.style[browser + 'AnimationPlayState'] = 'paused';
        } else {
          e.target.style['animationPlayState'] = 'paused';
        }
        e.target.style.offsetWidth = e.target.style.offsetWidth;
        console.log('animation ending', e.target);
       })
    }
}

}
