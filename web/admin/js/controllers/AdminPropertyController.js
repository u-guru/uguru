angular.module('uguru.admin')

.controller('AdminPropertyController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  'AnimationService',
  'UtilitiesService',
  function($scope, $state, $timeout, $interval, $localstorage, AnimationService, UtilitiesService) {
    var apc = this;

    apc.animationArr = getAllAnimationNames();
    apc.property = {name: 'opacity', start: 0, end: 100, range:{}}

    apc.playBar = document.querySelector('#property-playbar');
    // apc.playBarRect = apc.playBar.getBoundingClientRect();
    apc.element = document.querySelector('#svg-square-rect');
    apc.animation = initializeAnimation(apc.property.name, apc.property.start, apc.property.end);
    apc.property.playbar = [getDefaultAnimationProperties(apc.animation.name, window.getComputedStyle(apc.element))]
    apc.export = false;
    apc.play = playAnimation

    apc.animationArr.filter(function(a, i) {
      return a.cssRules.length;
    });


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
      var numAnimations = apc.property.playbar.length;
      var numCompleted = 0;
      for (var i = 0; i < apc.property.playbar.length; i++) {
        var iAnim = apc.property.playbar[i];
        var iAnimStr = convertAnimPropObjToString(iAnim);
        iAnimStrArr.push(iAnimStr);
      };
      apc.element.addEventListener('webkitAnimationStart', function(e) {
        console.log(e);
      })
      apc.element.addEventListener('webkitAnimationEnd', function(e) {
        numCompleted += 1;
        if (numCompleted === numAnimations && numCompleted > 0) {
          var style = window.getComputedStyle(apc.element)['webkitAnimation'];
          var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
          apc.element.style['webkitAnimation'] = newPausedStyle;
          console.log(window.getComputedStyle(apc.element)['webkitAnimation'])
          apc.element.style['webkitAnimation'] = '';
          apc.element.style['offsetWidth'] = apc.element.style['offsetWidth'];
          // apc.element.style['webkitAnimation'] = newPausedStyle;
          apc.element.style['webkitAnimation'] = window.getComputedStyle(apc.element)['webkitAnimation'];
        }


      })
      apc.element.style['webkitAnimation'] = iAnimStrArr.join(', ');
    }
    $timeout(function() {
      playAnimation();
      // apc.addKF(apc.property.animation, 50, 'opacity', 0.5);
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

    function getAllAnimationNames(anim_name) {
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

    function removeAnimationRule() {

    }



    this.getAnimations = function () {

    }

    this.export = function() {

    }

  }

])

