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

    apc.property = [{name: 'opacity', start: 0.5, end: 1.0}];


    //todo #1
    apc.addProperty = function(property_name) {
      apc.properties.push(prop_obj)
    }

    apc.playBar = document.querySelector('#property-playbar');
    apc.element = document.querySelector('#svg-square-rect');
    apc.animation = initializeAnimation(apc.property.name, apc.property.start, apc.property.end);


    //demo
    apc.properties = [{name: 'opacity', start: 0.5, end: 1.0, ease: null, playbar:null, element:null, unit: 0}];
    apc.properties[0].element = document.querySelector('#svg-square-rect');
    apc.properties[0].player  = {element: document.querySelector('#property-playbar')}
    apc.properties[0].animation = initAnimationWithEase(apc.properties[0])

    apc.property.playbar = initPlaybarObj();
    apc.property.playbar.animations = [getDefaultAnimationProperties(apc.animation.name, window.getComputedStyle(apc.element))]
    apc.export = false;
    apc.play = playAnimation;

    apc.animationArr.filter(function(a, i) {
      return a.cssRules.length;
    });


    function initPlaybarObj() {
      return {
        animations: [],
        element: null
      }
    }

    function initAnimationWithEase(options) {
      var anim =  {
        propName: (options.name + options.name + 'Animation') || 'opacity',
        ease: options.ease || 'easeInOutExpo',
        start: options.start || 0,
        end: options.end || 100,
        duration: options.duration || 1000
      }

      var anim_obj = AnimationService.initCSSAnimation(anim.propName + 'Animation');
      var startDict = {};
      var endDict = {};
      startDict[anim.propName] = options.start + options.unit || 'px';
      endDict[anim.propName]  = options.end + options.unit || 'px'
      anim.keyframes = [];
      kf_arr = TweenService.getKeyframeValues(startDict, endDict, anim.duration, anim.ease, anim.keyframes);
      for (var i = 0; i < kf_arr.length; i++) {
        console.log(kf_arr[i]);
        createFrameWithPropValue(anim_obj, anim.propName, kf_arr[i][anim.propName], kf_arr[i].percentage);
      }
      function createFrameWithPropValue(anim_obj, prop, value, percent) {
        anim_obj.appendRule(percent + '% ' + '{' + prop + ':' + value + ';' + '}', percent);
      }

      anim.keyframes = convertAnimObjToKF(anim_obj);
      return anim_obj
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
      console.log(strProperties);
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

    function playAnimation() {
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

    function convertAnimPropObjToString(iAnim) {
      var resultStr = ''
      for (key in iAnim) {
        if (iAnim[key].indexOf('object:') > -1 ) {
          continue
        }
        resultStr += iAnim[key] + ' ';
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

  }

])

