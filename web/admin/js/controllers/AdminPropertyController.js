angular.module('uguru.admin')

.controller('AdminPropertyController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  'AnimationService',
  'UtilitiesService',
  'TweenService',
  function($scope, $state, $timeout, $interval, $localstorage, AnimationService, UtilitiesService, TweenService) {
    var apc = this;

    var tween = TweenService.getKeyframeValues({transform:'translateX(10%)'}, {transform:'translateX(-10%)'}, 1000, 'easeOutQuad');

    apc.animationArr = getAllCSSAnimation();
    var results = getCSSAnimationMetrics(apc.animationArr);
    console.log(results);

    apc.property = [{name: 'opacity', start: 0.5, end: 1.0}];
    apc.activeIndex = 0;

    //todo #1
    apc.addProperty = function(property_name) {
      apc.properties.push(prop_obj)
    }
    apc.settings = {showFPS:apc.fps}

    apc.playBar = document.querySelector('#property-playbar');
    apc.element = document.querySelector('#svg-square-rect');
    apc.animation = initializeAnimation(apc.property.name, apc.property.start, apc.property.end);


    //demo
    apc.properties = [];
    apc.properties.push({name: 'transform', start: 'scale(0)', end: 'scale(1)', duration:1000, timingFunction:'linear', ease: 'easeInExpo', playbar:null, element:null, unit: 0})
    apc.properties.push({name: 'transform', start: 'translateX(-1000%)', end: 'translateX(10%)', duration:1500, timingFunction:'linear', ease: 'bouncePast', playbar:null, element:null, unit: 0})
    apc.properties.push({name: 'transform', start: 'rotate(0deg)', end: 'rotate(1080deg)', duration:1500, timingFunction:'linear', ease: 'easeInOutQuint', playbar:null, element:null, unit: 0})
    apc.properties.push({name: 'fill', start: 'rgb(255,255,255)', end: 'rgb(255,0,255)', duration:1500, timingFunction:'linear', ease: 'easeOutSine', playbar:null, element:null, unit: 0})

    // apc.properties[0].element = document.querySelector('#svg-square-rect');
    function parsePropertiesAndPlay(properties) {
      var transformProp = {start: '', end: '', ease: ''};
      properties.forEach(function(property, index) {
        var transformProperties = ['scale', 'translateX', 'translateY', 'scale', 'rotate', 'perspective'];
        if (transformProperties.indexOf(property.start.split('(')[0]) > -1) {
          transformProp.start += property.start + ' ';
          transformProp.end += property.end + ' ';
        }
        property.animation = initAnimationWithEase(property, index);
        property.element = apc.element;
        property.player = {element: document.querySelector('.property-player-' + index), play: playOne, reset: resetAnimation(property.element)}
        property.keyframes = convertAnimObjToKF(property.animation.obj);
      })
      transformProp.start.length && transformProp.end.length && properties.push(transformProp);
    }

    parsePropertiesAndPlay(apc.properties);

    function calculateFPS() {

      window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
      })();

      var requestAnimFram = window.requestAnimationFrame;
      apc.count = 0;
      var timeStart
      function animate() {
        var currentTime = new Date().getTime();
        if (currentTime - timeStart < 1000) {
          apc.count += 1
          requestAnimFrame( animate );
        } else {
          $timeout(function() {
            $scope.$apply();
          })
        }
      }

    }

    function initAnimationWithEase(options, index) {
      options.easeName = options.ease[0].toUpperCase() + options.ease.substring(1);
      var anim =  {
        name: (options.name) + options.easeName + index,
        propName: (options.name) || 'opacity',
        ease: options.ease || 'bounce',
        start: options.start || 0,
        end: options.end || 100,
        duration: options.duration || 1000,
        timingFunction: options.tf || 'linear',
        delay: formatDelay(options.delay || 0),
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'forwards',
        cb: [],
        playState: 'running',
      }

      var anim_obj = AnimationService.initCSSAnimation(anim.name);
      var startDict = {};
      var endDict = {};
      startDict[anim.propName] = options.start;
      endDict[anim.propName]  = options.end;
      anim.keyframes = [];
      kf_arr = TweenService.getKeyframeValues(startDict, endDict, anim.duration, anim.ease, anim.keyframes);
      anim.duration = formatDuration(anim.duration);
      for (var i = 0; i < kf_arr.length; i++) {
        createFrameWithPropValue(anim_obj, options.name, kf_arr[i][options.name], kf_arr[i].percentage);
      }
      function createFrameWithPropValue(anim_obj, prop, value, percent) {
        anim_obj.appendRule(percent + '% ' + '{' + prop + ':' + value + ';' + '}', percent);
      }
      anim.keyframes = convertAnimObjToKF(anim_obj);
      anim.obj = anim_obj;
      return anim

      function formatDelay(num) {
        return num + 's';
      }

      function formatDuration(num) {
        return num + 'ms';
      }
    }

    function initializeAnimation(property_name, start, end) {
      var anim_obj = AnimationService.initCSSAnimation(property_name + 'Animation');
      anim_obj.appendRule(start + '% ' + '{' + property_name + ':' + start + ';' + '}', 0);
      anim_obj.appendRule(end + '% ' + '{' + property_name + ':' + end + ';' + '}', 1);
      apc.property.animation = anim_obj;
      apc.property.keyframes = convertAnimObjToKF(anim_obj);
      return anim_obj
    }

    function getDefaultAnimationProperties(name, element) {
      var prefix = 'webkitAnimation';
      var animPropStr = element[prefix]

      var animPropObj = convertAnimStringToObj(animPropStr);
      animPropObj[prefix + 'Name'] = name;
      if (animPropObj[prefix + 'Duration'] === '0s') {
        animPropObj[prefix + 'Duration'] = '1s';
      }
      animPropObj[prefix + 'TimingFunction'] = 'linear';
      return animPropObj
    }

    function convertAnimStringToObj(str) {
      var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
      var strProperties = str.split(' ')
      var resultDict = {};
      for (var i = 0; i < properties.length; i++) {
        resultDict['webkitAnimation' + properties[i]] = strProperties[i];
      }
      return resultDict;
    }

    function convertAnimObjToKF(anim_obj) {
      var resultKF = [];
      console.log(anim_obj);
      for (var i = 0; i < anim_obj.cssRules.length; i++) {
        var iRule = anim_obj.cssRules[i];
        resultKF.push({
          percent: {str: iRule.keyText, value: parseFloat(iRule.keyText.replace('%'))},
          properties: parseKFCSSText(iRule.style, iRule.cssText)
        })
      }
      return resultKF;
    }

    function parseKFCSSText(styleDict, cssText) {
      var resultArr = [];
      for (var i = 0; i < styleDict.length; i++) {
        var propName = styleDict[i];
        var value = cssText.split(propName + ':')[1].split(';')[0];
        resultArr.push({name: propName, value: value.trim()});
      }
      return resultArr;
    }

    apc.addKF = function(animation, percent, property, value) {
        animation.appendRule(percent + '% ' + '{' + property + ':' + value + ';' + '}');
    }

    apc.removeKF = function(property, kf_rule) {
      property.animation.deleteRule(kf_rule);
      property.keyframes = convertAnimObjToKF(property.animation);
    }
    function updateKeyFrameArr() {

    }

    function playAll(property_arr) {
      if (apc.settings.showFPS) {
        apc.showFPS;
      }
      var animStr = ''
      for (var i = 0; i < property_arr.length; i++) {
        animStr += convertAnimPropObjToString(property_arr[i].animation);
        if (i === property_arr.length-1) {

          console.log(animStr);
          property_arr[i].element.style['webkitAnimation'] =  animStr;
        } else {
          animStr += ', '
        }
      }
    }
    // $timeout(function() {
    //   playAll(apc.properties)
    // }, 1000)

    function playOne(property, cb_start, cb_end) {
      var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
      var animStrArr = [];
      var animStr = convertAnimPropObjToString(property.animation);

      if (!property.animation.listeners) property.animation.listeners = {};
      if (!property.animation.listeners.start) property.animation.listeners.start = getStartListener(property.element,cb_start);
      if (!property.animation.listeners.end) property.animation.listeners.start = getEndListener(property.element,cb_end);
      property.animation.listeners = {
        start: getStartListener(property.element),
        end: getEndListener(property.element)
      }
      property.element.style['webkitAnimation'] =  animStr;
    }

    function play(property, cb_start, cb_end, override) {
      animation = property.animation;
      element = property.element;
      if (!animation || !element) {
        console.log('ERROR', 'missing animation or element for property', property.name);
        return;
      }
      return function(cb_start, cb_end) {

          var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
            var animStrArr = [];
            var animStr = convertAnimPropObjToString(animation);

            if (!animation.listeners) animation.listeners = {};
            if (!animation.listeners.start) animation.listeners.start = getStartListener(element,cb_start);
            if (!animation.listeners.end) animation.listeners.start = getEndListener(element,cb_end);
            animation.listeners = {
              start: getStartListener(element),
              end: getEndListener(element)
            }
            console.log(animation, animStr);
            if (override) {
              element.style['webkitAnimation'] =  animStr;
            } else {
              var currentStyle = window.getComputedStyle(element)['webkitAnimation'];
              if (currentStyle.split(' ').length === 8 && currentStyle.split(' ')[1] === '0s') {
                element.style['webkitAnimation'] =  animStr;
              } else if (currentStyle.split(' ').length >= 8){
                element.style['webkitAnimation'] +=  ', ' + animStr;
              }
            }

          };



    }

    function resetAnimation(element) {
      return function() {
        var style = window.getComputedStyle(element)['webkitAnimation'];
        var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
        apc.element.style['webkitAnimation'] = newPausedStyle;
        apc.element.style['webkitAnimation'] = '';
        apc.element.style['offsetWidth'] = element.style['offsetWidth'];
        apc.element.style['webkitAnimation'] = window.getComputedStyle(element)['webkitAnimation'];
      }
    }

     function getEndListener(element, cb) {
            return element.addEventListener('webkitAnimationEnd', function(e) {
              console.log(e.animationName, 'has ended');
              cb && cb(e)
              resetAnimation(element)();
            })
      }
      function getStartListener(element, cb) {
          return element.addEventListener('webkitAnimationStart', function(e) {
            console.log(e.animationName, 'has started')
            cb && cb(e)
          })
      }

    function playAnimation() {};

    function playAllElementAnimations(animation) {
      // var defaultAnimation = ['webkitAnimation'];
      var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
      var iAnimStrArr = [];
      var numAnimations = apc.property.playbar.animations.length;
      var numCompleted = 0;
      for (var i = 0; i < apc.property.playbar.animations.length; i++) {
        var iAnim = apc.property.playbar.animations[i];
        var iAnimStr = convertAnimPropObjToString(iAnim);
        iAnimStrArr.push(iAnimStr);
      };
      apc.element.addEventListener('webkitAnimationStart', function(e) {

      })
      apc.element.addEventListener('webkitAnimationEnd', function(e) {
        numCompleted += 1;
        if (numCompleted === numAnimations && numCompleted > 0) {
          var style = window.getComputedStyle(apc.element)['webkitAnimation'];
          var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
          apc.element.style['webkitAnimation'] = newPausedStyle;
          apc.element.style['webkitAnimation'] = '';
          apc.element.style['offsetWidth'] = apc.element.style['offsetWidth'];
          apc.element.style['webkitAnimation'] = window.getComputedStyle(apc.element)['webkitAnimation'];
        }

      })
      apc.element.style['webkitAnimation'] = iAnimStrArr.join(', ');
    }
    $timeout(function() {
      playAnimation();
      apc.property.keyframes = convertAnimObjToKF(apc.property.animation);
    })

    function convertAnimPropObjToString(anim) {
      var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
      properties.forEach(function(p, i) {properties[i] = p.toLowerCase()})
      allAnimPropertyStr = properties.join('|')
      var anim_properties = [];
      for (key in anim) {
        if (allAnimPropertyStr.toLowerCase().indexOf(key.toLowerCase()) > -1)  {
          anim_properties.push(key);
        }
      }

      var resultStr = ''

      for (key in anim_properties) {

        var animValue = anim[anim_properties[key]]
        if (!anim_properties[key]) continue;

        if (typeof(animValue) === 'object' || (typeof animValue === 'string' && animValue.indexOf('object:') > -1)) {
          continue
        }

        resultStr += animValue + ' ';
      }
      return resultStr.trim();
    }

    function getAllCSSAnimation(anim_name) {
      var resultArr = [];
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
        if (!ss[i] || !ss[i].cssRules) {
          continue;
        }
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {
              resultArr.push(ss[i].cssRules[j]);
            }
          }
      }
      return resultArr;
    }

    function getCSSAnimationMetrics(animation_arr) {
      var resultDict = {};
      animation_arr.forEach(function(a, i) {
        rules = a.cssRules;
        for (var j = 0; j < rules.length; j++) {
          // if (rules[j].cssText.split('{')[1].indexOf(';') === -1) continue;
          rules[j].cssText.split('{')[1].split(';').forEach(
            function(prop_str, k) {

              if (prop_str.split(':').length > 1) {
                var prop = prop_str.split(':')[0].trim();
                if (!(prop in resultDict)) {
                  resultDict[UtilitiesService.camelCase(prop)] = 0;
                }
                resultDict[UtilitiesService.camelCase(prop)] += 1;
              }
            }
          );
        }
      })
      resultArr = [];
      for (key in resultDict) {
        resultArr.push({prop: key, value: resultDict[key]})
      }
      resultArr.sort(function(p, p2) {return p2.value - p.value})
      console.log(resultArr);
      return {
        dict: resultDict,
        total: animation_arr.length,
        sorted: resultArr
      }

    }

    function removeAnimationRule() {

    }



    this.getAnimations = function () {

    }

    this.export = function() {

    }

    // apc.propertyInputStart = 'scale(0)|easeInOutQuint rotate(0deg)|easeInOutQuint translateX(500%)|easeInOutQuint translateY(500%)|easeInOutQuint opacity:0.3|easeInOutQuint'
    // apc.propertyInputEnd = 'scale(1) rotate(0deg) translateX(500%) translateY(500%) opacity:0.3 fill:rgb(0,0,0) fill:rgba(255,0,255)'
    // var transformStr = '';
    // $scope.$watch('apc.propertyInputStart', function(new_value) {
    //   if (!new_value || !new_value.length) {
    //     return;
    //   }
    //   var values = new_value.split(' ')
    //   var propertyArr = [];
    //   var transformStr = '';
    //   values.forEach(function(val, i) {
    //     var ease = val.split('|')[1];
    //     var propDict = {};
    //     propDict.duration = 1500
    //     propDict.name = val.split('|')[0].split(':')[0];
    //     propDict.start =val.split('|')[0].split(':')[1];
    //     propDict.ease = ease || 'easeInOutQuint';
    //     propDict.end = apc.propertyInputEnd.split(' ')[i];
    //     propDict.timingFunction = 'linear'
    //     if (val.indexOf('(') > -1 && val.indexOf('fill') === -1) {
    //       propDict.name = val.split('|')[0].split('(')[0]
    //       transformStr += val + ' ';
    //     }
    //     apc.properties.push(propDict);
    //   })
    //   apc.properties.push({name: 'transform', start: transformStr, end: transformStr});
    //   parsePropertiesAndPlay(apc.properties)
    //   $timeout(function() {
    //     playAll(apc.properties);
    //   })
    //   // apc.properties.push({name: 'fill', start: 'rgb(255,255,255)', end: 'rgb(255,0,255)', duration:1500, timingFunction:'linear', ease: 'easeOutSine', playbar:null, element:null, unit: 0})
    // })

  }

])

