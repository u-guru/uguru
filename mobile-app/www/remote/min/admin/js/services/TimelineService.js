angular
.module('uguru.admin')
.factory('TimelineService', [
    '$timeout',
    'RootService',
    'AnimationService',
    'UtilitiesService',
     TimelineService
]);
function TimelineService($timeout, RootService, AnimationService, UtilitiesService) {
  var browserPrefix = RootService.getBrowserPrefix();
  var func = getAnimationFunctions();
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
    func: func
  }





  function initGlobalPlayer(attr, env) {
    var duration = env && env.duration;
    var resultDict = {
      duration: duration || parseDuration(attr.duration),
      direction: attr.direction || 'forwards',
      play: attr.play === "true" || false,
      speed:  parseFloat(attr.speed && attr.speed.replace('x', '')),
      offset: attr.startAt && parseStartAt(attr.startAt) || 0,
      template: attr.import,
      import: attr.template
    }
    return resultDict;
    // var latestAnimation = animations.sort(function(a1, a2) {a2.timeStamp - a1.timeStamp}).reverse()[0];
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

  function changeStateAll(property, animations, value) {
    animations.forEach(function(a, i) {changeState(property, animations[i], value)});
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
      playAll: function(state) {return function(animations) {state.play = true; return changeStateAll(prefix + "PlayState", animations, "running")}},
      pauseAll: function(state) {return function(animations) {state.play = false; return changeStateAll(prefix + "PlayState", animations, "paused")}},
      resetAll: function(animations) {return changeStateAll(prefix+"Reset", animations, "paused")}
    }
  }

  function processAnimations(scope,element) {
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
    animations.forEach(
      function(anim, index) {
        var durationMS = durationToMS(anim.duration);
        var delayMS = durationToMS(anim.delay);

        anim.env = {
          duration: totalLengthMS,
          xLeft: (delayMS/totalLengthMS * 100 ).toFixed(2),
          width: ((durationMS/totalLengthMS) * 100).toFixed(2),
        }
      }
        // anim.env.durationRatio = (parseDuration(anim.duration)/anim.env.duration) * 1000
    )
    return animations;
  }

  function durationToMS(str_duration) {
    if (str_duration.indexOf('ms') > -1) {
      return parseFloat(str_duration.replace('ms', ''));
    } else if (str_duration.indexOf('s') > -1) {
      return parseFloat(str_duration.replace('ms', '')) * 1000;
    }
  }

  function changeState(property, animation, value) {
    parsedProperty = (property +"").toLowerCase().replace('webkit', '').replace('animation', '')
    switch(parsedProperty) {
      case ("playstate"):
        applyAnimationProperty(animation, property, value);
        break;
      case ("reset"):
        var durationProp = (property+ "").replace("Reset", "Duration");
        var delayProp = (property+ "").replace("Reset", "Delay");
        var fillModeProp = (property+ "").replace("Reset", "FillMode");
        var playStateProp = (property+ "").replace("Reset", "PlayState");
        var endAnimationProp = (property+ "").replace("Reset", "End");

        applyAnimationProperty(animation, delayProp, '-' + animation.duration);
        applyAnimationProperty(animation, durationProp, '0.01s')

        applyAnimationProperty(animation, fillModeProp, 'backwards')
        applyAnimationProperty(animation, playStateProp, 'running');
        var offsetWidth = animation.element.style['offsetWidth'];
        animation.element.style['offsetWidth'] = null;
        animation.element.style['offsetWidth'] = offsetWidth;

        applyAnimationProperty(animation, playStateProp, 'paused');
        animation.element.addEventListener(endAnimationProp, function(e) {
          console.log(e.animationName, e.target.className || e.target);
        })

        for (key in animation.css) {
          console.log(key);
          applyAnimationProperty(animation, key, animation.css[key]);
        }

        $timeout(function(){console.log(animation.element)}, 1000);

        // applyAnimationProperty(animation, "webkitAnimationDuration", animation.duration);
        // applyAnimationProperty(animation, "webkitAnimationDelay",  animation.delay);
    }
  }

  function applyAnimationProperty(animation, property, value) {
    animation.element.style[property] = value;
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
        css: css_dict
      }
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

