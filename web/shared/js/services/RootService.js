angular.module('uguru.shared.services')
.factory("RootService", [
    '$timeout',
    '$state',
    RootService
        ]);

function RootService($timeout, $state) {
    var base_url = '';
    var docItems = [];
    var pauseElement;
    var viewportSize;
    var setInspectableElem;
    var animations = {custom: [], customNameOnly: []};
    var addElemToInspector;
    var _window;
    var elemIdCache = {};
    var customShortcuts = {animProps: {}};
    var getInspectorPreferences = function() {};
    initBaseUrlByEnv();
    return {
        // slide: slide,
        flip: flip,
        animateIn: animateIn,
        animate: animate,
        animateOut: animateOut,
        applyAnimateInDirective: applyAnimateInDirective,
        applyAnimateOutDirective: applyAnimateOutDirective,
        initCSSAnimation: initCSSAnimation,
        getBaseUrl: getBaseUrl,
        getDocItems: getDocItems,
        getCSSAnimationFromClassName: getCSSAnimationFromClassName,
        getBrowserPrefix:getBrowserPrefix,
        appendDocItem: appendDocItem,
        formatBrowserCSSProperty: formatBrowserCSSProperty,
        setPauseElementFunc: setPauseElementFunc,
        pauseElement: pauseElement,
        setInspectableElem: setInspectableElem,
        setInspectableElements: setInspectableElements,
        addElemToInspector: addElemToInspector,
        setGetInspector: setGetInspector,
        getInspectorPreferences: returnInspectorPreferences,
        getCustomEasingAnimations: getCustomEasingAnimations,
        getCustomAnimations: getCustomAnimations,
        getAnimShortcuts: getAnimShortcuts,
        customShortcuts: customShortcuts,
        animations: animations,
        elemIdCache: elemIdCache,
        activeElem: activeElem,
        camelCase: camelCase
    }

    function camelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function getAnimShortcuts(prop) {
      var rootShortcuts = customShortcuts.getAnimProps();
      return rootShortcuts[prop];
    }

    function activeElem() {
      return document.activeElement;
    }

    function setActiveElem(elem) {
      document.activeElement = elem;
    }

    function getCustomAnimations() {
      return animations;
    }

    function getCustomEasingAnimations(scope) {

      scope.animations = animations;
      return function() {
        var ss = document.styleSheets;

        for (var i = 0; i < ss.length; ++i) {
          for (var j = 0; j < ss[i].cssRules.length; ++j) {
              if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {

                if (ss[i].cssRules[j].cssRules.length >= 2) {

                  scope.animations.custom.push(ss[i].cssRules[j])
                  scope.animations.customNameOnly.push(ss[i].cssRules[j].name)
                }
              }
            }
        }
      }
    }

    function setInspectableElements(func) {
      setInspectableElem = func;
    }


    function setGetInspector(func) {
      getInspectorPreferences = func;
    }

    function appendDocItem(item) {
      docItems.push(item);
    }

    function setPauseElementFunc(func) {
      pauseElement = func;
    }

    function returnInspectorPreferences() {
      return getInspectorPreferences();
    }

    function addElemToInspector(elem) {

      setInspectableElem(elem);
      // inspectableElements.push(elem);
    }


    function formatBrowserCSSProperty(property) {
      var dashedPrefixedProps = ['transition', 'transform', 'backface-visibility', 'perspective', 'perspective-origin', 'animation-start', 'transform-style', 'transform-origin', 'animation-timing-function', 'animation-duration', 'animation-name', 'animation-play-state', 'animation-fill-mode', 'animation-iteration-count', 'animation-direction', 'animation-delay', 'transition-delay', 'transition-timing-function']
      var browserPrefix = getBrowserPrefix();
      if (browserPrefix && browserPrefix.length && dashedPrefixedProps.indexOf(property.toLowerCase()) > -1) {
        property = '-' + browserPrefix + '-' + property
      }
      return property
    }

    function getDocItems() {
      return docItems;
    }


    function getBrowserPrefix() {
        var browserPrefix;
        navigator.sayswho= (function(){
          var N = navigator.appName, ua = navigator.userAgent, tem;
          var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
          if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
          M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
          M = M[0];
          if(M == "Chrome") { browserPrefix = "webkit"; }
          if(M == "Firefox") { browserPrefix = "moz"; }
          if(M == "Safari") { browserPrefix = "webkit"; }
          if(M == "MSIE") { browserPrefix = "ms"; }
        })();
        return browserPrefix;
    }

    function initBaseUrlByEnv() {
      if (window.location.href.split(':5000').length > 1 || window.location.href.split('uguru').length > 1) {
        base_url = '/static/remote/min/'
      }
      else  {
        base_url = '';
      }
    }

    function getBaseUrl() {
      return base_url
    }

    function getCSSAnimationFromClassName(anim_class) {
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
          if (ss[i].cssRules && ss[i].cssRules.length) {

              var animationName;
              for (var j = 0; j < ss[i].cssRules.length; ++j) {
                if (ss[i].cssRules[j].type == window.CSSRule.STYLE_RULE) {
                  if (ss[i].cssRules[j].selectorText === '.' + anim_class) {
                    if (ss[i].cssRules[j].style && (ss[i].cssRules[j].style.animation || ss[i].cssRules[j].style.webkitAnimation)) {
                      console.log(ss[i].cssRules[j].style.animation);
                      var animationString = ss[i].cssRules[j].style.animation || ss[i].cssRules[j].style.webkitAnimation

                      if (animationString.split(' ').length >= 2) {
                        animationName = animationString.split(' ')[0];
                        animationObj = getAnimationObjFromAnimationName(animationName)
                        if (animationObj) {
                          return animationObj;
                        }
                      }
                    }
                  }
                }
              }
              // if (!animationName) return;
              // console.log('found', animationName);
          }
      }
    }

    function getAnimationObjFromAnimationName(anim_name) {

      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {
              if (ss[i].cssRules[j].name === anim_name) {
                return ss[i].cssRules[j];
              }
            }
          }
      }
    }

    function initCSSAnimation(anim_name, options) {
        var browserPrefix = getBrowserPrefix();
        var lastSheet = document.styleSheets[document.styleSheets.length - 1];
        var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
        return lastSheet.cssRules[indexOfRuleInSheet];
    }

    function prefixedEventListener(element, type, callback) {
      var pfx = ["webkit", "moz", "MS", "o", ""];
      for (var p = 0; p < pfx.length; p++) {
          if (!pfx[p]) type = type.toLowerCase();
          element.addEventListener(pfx[p]+type, callback, false);
      }
    }

    // function initSlide() {
    //  if(DeviceService.isMobile() && window.plugins.nativepagetransitions) {
    //      window.plugins.nativepagetransitions.slide({
    //          "direction": "right",
    //          "duration" : 10,
    //          "slowdownfactor": 1,
    //          "iosdelay": 10,
    //          "androiddelay": 10
    //      }, successMsg, errorMsg);
    //  }

    // }

     function activateSectionAnimations(elements, css_arr, delay_arr) {
        if (!elements || !elements.length) {
            return;
        }
        for (var i = 0; i < elements.length; i ++) {
          animateIn(elements[i], css_arr[i], delay_arr[i]);
        }
      }

    function initializeSectionComponents(section_var, selector_arr, css_arr, delay_arr) {
        for (var i = 0; i < selector_arr.length; i++) {
          var indexSelector = selector_arr[i];
          var elem = document.querySelector(indexSelector);
          if (!elem) {
            continue
          }
          if (!section_var.elements) {
            section_var.elements = [elem];
          } else {
            section_var.elements.push(elem);
          }
        }
     }

    function applyAnimateOutDirective(element, type) {
        var children = element.querySelectorAll("[anim-" + type + "-child]");
        if (children.length) {
            for (var i = 0; i < children.length; i++) {
                var indexChild = children[i];
                var animationClassesToInject = indexChild.getAttribute('anim-' + type +'-class') && indexChild.getAttribute('anim-' + type +'-class').split(', ');
                var animationDelaysToInject = indexChild.getAttribute('anim-' + type +'-delay') && indexChild.getAttribute('anim-' + type +'-delay').split(', ');
                if (!animationClassesToInject) {
                    continue;
                }
                if (!animationDelaysToInject) {
                    animationDelaysToInject = [0,0,0,0,0];
                }
                for (var j = 0; j < animationClassesToInject.length; j++) {
                    var indexClassOfChild = animationClassesToInject[j] || '';
                    var indexOffsetOfChild = animationDelaysToInject[j] || 0;
                    if (indexClassOfChild && indexClassOfChild.length) {
                        animateOut(indexChild, indexClassOfChild, indexOffsetOfChild || 0 );
                    }
                }
                // var animationOnCompleteExpr = indexChild.getAttribute('anim-exit-up-complete');
            }
        } else {
              var animationClassToInject = element.attributes['anim-' + type +'-class'] && element.getAttribute('anim-' + type + '-class').split(', ');
              var animationDelaysToInject = element.attributes['anim-' + type + '-delay'] && element.getAttribute('anim-' + type + '-delay').split(', ');
              if (!animationClassToInject || !animationClassToInject.length) {
                return;
              }
              if (!animationDelaysToInject) {
                    animationDelaysToInject = [0,0,0,0,0];
                }
              for (var i = 0; i < animationClassToInject.length; i++) {
                var indexClassOfParent= animationClassToInject[i] || '';
                var indexOffsetOfParent = animationDelaysToInject[i] || 0;
                if (indexClassOfParent && indexClassOfParent.length) {
                    animateOut(element, indexClassOfParent, indexOffsetOfParent || 0 );
                }
              }
        }
    }

    function applyAnimateInDirective(element, type) {
        var children = element.querySelectorAll("[anim-" + type + "-child]");
        if (children.length) {
            for (var i = 0; i < children.length; i++) {
                var indexChild = children[i];
                var animationClassesToInject = indexChild.getAttribute('anim-' + type +'-class') && indexChild.getAttribute('anim-' + type +'-class').split(', ');
                var animationDelaysToInject = indexChild.getAttribute('anim-' + type +'-delay') && indexChild.getAttribute('anim-' + type +'-delay').split(', ');
                if (!animationClassesToInject) {
                    continue;
                }
                if (!animationDelaysToInject) {
                    animationDelaysToInject = [0,0,0,0,0];
                }
                for (var j = 0; j < animationClassesToInject.length; j++) {
                    var indexClassOfChild = animationClassesToInject[j] || '';
                    var indexOffsetOfChild = animationDelaysToInject[j] || 0;
                    if (indexClassOfChild && indexClassOfChild.length) {
                        animateIn(indexChild, indexClassOfChild, indexOffsetOfChild || 0 );
                    }
                }
                // var animationOnCompleteExpr = indexChild.getAttribute('anim-exit-up-complete');
            }
        } else {
              var animationClassToInject = element.attributes['anim-' + type +'-class'] && element.getAttribute('anim-' + type + '-class').split(', ')
              var animationDelaysToInject = element.attributes['anim-' + type + '-delay'] && element.getAttribute('anim-' + type + '-delay').split(', ')

              if (!animationClassToInject || !animationClassToInject.length) {
                return;
              }
              if (!animationDelaysToInject) {
                    animationDelaysToInject = [0,0,0,0,0];
                }
              for (var i = 0; i < animationClassToInject.length; i++) {
                var indexClassOfParent= animationClassToInject[i] || '';
                var indexOffsetOfParent = animationDelaysToInject[i] || 0;
                if (indexClassOfParent && indexClassOfParent.length) {
                    animateIn(element, indexClassOfParent, indexOffsetOfParent || 0 );
                }
              }
        }
    }

    function animate(elem, css_class, anim_obj, delay) {
      if (delay) {
        $timeout(function() {
          elem.classList.add('animated', css_class);
        }, delay)
      } else {
        elem.classList.add('animated', css_class);
      }
      prefixedEventListener(elem,"AnimationStart", animationStartListener);
      prefixedEventListener(elem,"AnimationEnd", animationEndListener);
      function animationStartListener(e)
      {
        console.log('animation has began');
        var lastKFSorted = getLastKFsorted(anim_obj.cssRules)
        var formattedKFCssText = lastKFSorted.cssText.split('{')[1].replace('}', '').trim();
        elem.style.cssText +=formattedKFCssText;
        elem.removeEventListener( e.type, animationStartListener);
      }
      function animationEndListener(e)
      {

        elem.classList.remove(css_class, "animated");
        elem.removeEventListener( e.type, animationEndListener);
      }
    }

    function getLastKFsorted(css_rules) {
      var keyFrames = [];

      for (property in css_rules) {
        if ((property || property === 0) && css_rules[property].type === window.CSSRule.WEBKIT_KEYFRAME_RULE) {
          keyFrames.push(css_rules[property]);
        }
      }
      keyFrames.sort(function(kf_a, kf_b) {
        return parseFloat(kf_b.keyText.replace("%")) - parseFloat(kf_b.keyText.replace("%"))
      }).reverse()
      if (keyFrames.length) {
        console.log('last keyframe', keyFrames[0]);
        return keyFrames[0]
      }
    }

    function animateIn(elem, css_class, delay) {
        if (!elem || !css_class) {
            return;
        }
        var cssClassArgs = getCSSArgs(css_class)
        elem.classList.remove('animated');
        if (delay) {
          $timeout(function() {
              elem.classList.add('animated', cssClassArgs.class);
              prefixedEventListener(elem,"AnimationStart",function(e){
                elem.style.opacity = 1;
                e.target.removeEventListener(e.type, false);
              });
              prefixedEventListener(elem,"AnimationEnd",function(e){
                  if (cssClassArgs.keep) {
                      elem.classList.remove("animated");
                  } else {
                      elem.classList.remove(cssClassArgs.class, "animated");
                  }
                  e.target.removeEventListener(e.type, false);
              });
          }, delay || 0);
        }
      }

    function animateIn(elem, css_class, delay) {
        if (!elem || !css_class) {
            return;
        }
        var cssClassArgs = getCSSArgs(css_class)
        elem.classList.remove('animated');
        if (delay) {
          $timeout(function() {
              elem.classList.add('animated', cssClassArgs.class);
              prefixedEventListener(elem,"AnimationStart",function(e){
                elem.style.opacity = 1;
                e.target.removeEventListener(e.type, false);
              });
              prefixedEventListener(elem,"AnimationEnd",function(e){
                  if (cssClassArgs.keep) {
                      elem.classList.remove("animated");
                  } else {
                      elem.classList.remove(cssClassArgs.class, "animated");
                  }
                  e.target.removeEventListener(e.type, false);
              });
          }, delay || 0);
        } else {
            elem.classList.add('animated', cssClassArgs.class);
            prefixedEventListener(elem,"AnimationStart",function(e){
              elem.style.opacity = 1;
              e.target.removeEventListener(e.type, false);
            });
            prefixedEventListener(elem,"AnimationEnd",function(e){
                if (cssClassArgs.keep) {
                    elem.classList.remove("animated");
                } else {
                    elem.classList.remove(cssClassArgs.class, "animated");
                }
                e.target.removeEventListener(e.type, false);
            });
        }
    }

    function animateOut(elem, css_class, delay) {

        if (!elem || !css_class) {
            return;
        }
        var cssClassArgs = getCSSArgs(css_class)

        if (delay) {
          $timeout(function() {
              elem.classList.add('animated', cssClassArgs.class);
              prefixedEventListener(elem,"AnimationStart",function(e){
                  elem.style.opacity = 0;
                  e.target.removeEventListener(e.type, false);
              });

              prefixedEventListener(elem,"AnimationEnd",function(e){
                  if (cssClassArgs.keep) {
                          elem.classList.remove("animated");
                  } else {
                      elem.classList.remove(cssClassArgs.class, "animated");
                  }
                  e.target.removeEventListener(e.type, false);
              })

          }, delay || 0);
        } else {
            elem.classList.add('animated', cssClassArgs.class);
            prefixedEventListener(elem,"AnimationStart",function(e){
                elem.style.opacity = 0;
                e.target.removeEventListener(e.type, false);
            });

            prefixedEventListener(elem,"AnimationEnd",function(e){
                if (cssClassArgs.keep) {
                        elem.classList.remove("animated");
                } else {
                    elem.classList.remove(cssClassArgs.class, "animated");
                }
                e.target.removeEventListener(e.type, false);
            })
        }
    }

    function getCSSArgs(class_name) {
        var class_split = class_name.split(':');
        class_name = class_split[0];
        var css_args_dict = {}
        if (class_split.length > 1) {
            css_args_dict.class = class_name;
            class_args = class_split.splice(1);
            for (var i = 0; i < class_args.length; i++) {
                var indexArg  = class_args[i];
                css_args_dict[indexArg] = true;
            }
            return css_args_dict;
        } else {
            return {class: class_name};
        }
    }




    function shakeElem(elem, duration, callback) {

        Velocity(elem, "transition.expandIn", {duration:duration});
        callback && callback();
    }

    function fadeOutElem(elem, duration) {
        Velocity(elem, "fadeOut", {duration:duration});
    }



    //customOptions is optional, if none are set then default options will be used
    function flip(target, customOptions, params, cb) {

        var pane = document.querySelectorAll('body')[0];

        pane.style.transition = '.400s';
        pane.style.transform = 'rotateY(90deg)';
        pane.style.webkitkitTransition = '.400s';
        pane.style.webkitTransform = 'rotateY(90deg)';

        $timeout(function() {
            pane.style.transition = '0.00s';
            pane.style.transform = 'rotateY(-90deg)';
            pane.style.webkitTtransition = '0.00s';
            pane.style.webkitTransform = 'rotateY(-90deg)';
            $ionicViewSwitcher.nextDirection('none');
            if (!params) {
                $state.go(target);
            } else {
                $state.go(target, params);
            }
            $timeout(function() {

                pane.style.transition = '.400s';
                pane.style.transform = 'rotateY(0deg)';
                pane.style.webkitTransition = '.400s';
                pane.style.webkitTransform = 'rotateY(0deg)';
            }, 40);
        }, 440);
        $timeout(function() {
            cb && cb();
        }, 500)

    }

    function successMsg() {
    }

    function errorMsg(error) {
        console.error("Error with RootService: " + error);
    }

}


// Generated by CoffeeScript 1.7.1
(function() {
  var Color, DecomposedMatrix, DecomposedMatrix2D, InterpolableArray, InterpolableColor, InterpolableNumber, InterpolableObject, InterpolableString, Matrix, Matrix2D, Set, Vector, addTimeout, animationTick, animations, animationsTimeouts, applyDefaults, applyFrame, applyProperties, baseSVG, cacheFn, cancelTimeout, clone, createInterpolable, defaultValueForKey, degProperties, dynamics, getCurrentProperties, interpolate, isDocumentVisible, isSVGElement, lastTime, leftDelayForTimeout, makeArrayFn, observeVisibilityChange, parseProperties, prefixFor, propertyWithPrefix, pxProperties, rAF, roundf, runLoopPaused, runLoopRunning, runLoopTick, setRealTimeout, slow, slowRatio, startAnimation, startRunLoop, svgProperties, timeBeforeVisibilityChange, timeoutLastId, timeouts, toDashed, transformProperties, transformValueForProperty, unitForProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  isDocumentVisible = function() {
    return document.visibilityState === "visible" || (dynamics.tests != null);
  };

  observeVisibilityChange = (function() {
    var fns;
    fns = [];
    if (typeof document !== "undefined" && document !== null) {
      document.addEventListener("visibilitychange", function() {
        var fn, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = fns.length; _i < _len; _i++) {
          fn = fns[_i];
          _results.push(fn(isDocumentVisible()));
        }
        return _results;
      });
    }
    return function(fn) {
      return fns.push(fn);
    };
  })();

  clone = function(o) {
    var k, newO, v;
    newO = {};
    for (k in o) {
      v = o[k];
      newO[k] = v;
    }
    return newO;
  };

  cacheFn = function(func) {
    var data;
    data = {};
    return function() {
      var k, key, result, _i, _len;
      key = "";
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        k = arguments[_i];
        key += k.toString() + ",";
      }
      result = data[key];
      if (!result) {
        data[key] = result = func.apply(this, arguments);
      }
      return result;
    };
  };

  makeArrayFn = function(fn) {
    return function(el) {
      var args, i, res;
      if (el instanceof Array || el instanceof NodeList || el instanceof HTMLCollection) {
        res = (function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = el.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            args = Array.prototype.slice.call(arguments, 1);
            args.splice(0, 0, el[i]);
            _results.push(fn.apply(this, args));
          }
          return _results;
        }).apply(this, arguments);
        return res;
      }
      return fn.apply(this, arguments);
    };
  };

  applyDefaults = function(options, defaults) {
    var k, v, _results;
    _results = [];
    for (k in defaults) {
      v = defaults[k];
      _results.push(options[k] != null ? options[k] : options[k] = v);
    }
    return _results;
  };

  applyFrame = function(el, properties) {
    var k, v, _results;
    if ((el.style != null)) {
      return applyProperties(el, properties);
    } else {
      _results = [];
      for (k in properties) {
        v = properties[k];
        _results.push(el[k] = v.format());
      }
      return _results;
    }
  };

  applyProperties = function(el, properties) {
    var isSVG, k, matrix, transforms, v;
    properties = parseProperties(properties);
    transforms = [];
    isSVG = isSVGElement(el);
    for (k in properties) {
      v = properties[k];
      if (transformProperties.contains(k)) {
        transforms.push([k, v]);
      } else {
        if (v.format != null) {
          v = v.format();
        }
        if (typeof v === 'number') {
          v = "" + v + (unitForProperty(k, v));
        }
        if (isSVG && svgProperties.contains(k)) {
          el.setAttribute(k, v);
        } else {
          el.style[propertyWithPrefix(k)] = v;
        }
      }
    }
    if (transforms.length > 0) {
      if (isSVG) {
        matrix = new Matrix2D();
        matrix.applyProperties(transforms);
        return el.setAttribute("transform", matrix.decompose().format());
      } else {
        v = (transforms.map(function(transform) {
          return transformValueForProperty(transform[0], transform[1]);
        })).join(" ");
        return el.style[propertyWithPrefix("transform")] = v;
      }
    }
  };

  isSVGElement = function(el) {
    var _ref, _ref1;
    if ((typeof SVGElement !== "undefined" && SVGElement !== null) && (typeof SVGSVGElement !== "undefined" && SVGSVGElement !== null)) {
      return el instanceof SVGElement && !(el instanceof SVGSVGElement);
    } else {
      return (_ref = (_ref1 = dynamics.tests) != null ? typeof _ref1.isSVG === "function" ? _ref1.isSVG(el) : void 0 : void 0) != null ? _ref : false;
    }
  };

  roundf = function(v, decimal) {
    var d;
    d = Math.pow(10, decimal);
    return Math.round(v * d) / d;
  };

  Set = (function() {
    function Set(array) {
      var v, _i, _len;
      this.obj = {};
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        v = array[_i];
        this.obj[v] = 1;
      }
    }

    Set.prototype.contains = function(v) {
      return this.obj[v] === 1;
    };

    return Set;

  })();

  toDashed = function(str) {
    return str.replace(/([A-Z])/g, function($1) {
      return "-" + $1.toLowerCase();
    });
  };

  pxProperties = new Set('marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius'.split(','));

  degProperties = new Set('rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ'.split(','));

  transformProperties = new Set('translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective'.split(','));

  svgProperties = new Set('accent-height,ascent,azimuth,baseFrequency,baseline-shift,bias,cx,cy,d,diffuseConstant,divisor,dx,dy,elevation,filterRes,fx,fy,gradientTransform,height,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,letter-spacing,limitingConeAngle,markerHeight,markerWidth,numOctaves,order,overline-position,overline-thickness,pathLength,points,pointsAtX,pointsAtY,pointsAtZ,r,radius,rx,ry,seed,specularConstant,specularExponent,stdDeviation,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,surfaceScale,target,targetX,targetY,transform,underline-position,underline-thickness,viewBox,width,x,x1,x2,y,y1,y2,z'.split(','));

  unitForProperty = function(k, v) {
    if (typeof v !== 'number') {
      return '';
    }
    if (pxProperties.contains(k)) {
      return 'px';
    } else if (degProperties.contains(k)) {
      return 'deg';
    }
    return '';
  };

  transformValueForProperty = function(k, v) {
    var match, unit;
    match = ("" + v).match(/^([0-9.-]*)([^0-9]*)$/);
    if (match != null) {
      v = match[1];
      unit = match[2];
    } else {
      v = parseFloat(v);
    }
    v = roundf(parseFloat(v), 10);
    if ((unit == null) || unit === "") {
      unit = unitForProperty(k, v);
    }
    return "" + k + "(" + v + unit + ")";
  };

  parseProperties = function(properties) {
    var axis, match, parsed, property, value, _i, _len, _ref;
    parsed = {};
    for (property in properties) {
      value = properties[property];
      if (transformProperties.contains(property)) {
        match = property.match(/(translate|rotateC|rotate|skew|scale|perspective)(X|Y|Z|)/);
        if (match && match[2].length > 0) {
          parsed[property] = value;
        } else {
          _ref = ['X', 'Y', 'Z'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            axis = _ref[_i];
            parsed[match[1] + axis] = value;
          }
        }
      } else {
        parsed[property] = value;
      }
    }
    return parsed;
  };

  defaultValueForKey = function(key) {
    var v;
    v = key === 'opacity' ? 1 : 0;
    return "" + v + (unitForProperty(key, v));
  };

  getCurrentProperties = function(el, keys) {
    var isSVG, key, matrix, properties, style, v, _i, _j, _len, _len1, _ref;
    properties = {};
    isSVG = isSVGElement(el);
    if (el.style != null) {
      style = window.getComputedStyle(el, null);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        if (transformProperties.contains(key)) {
          if (properties['transform'] == null) {
            if (isSVG) {
              matrix = new Matrix2D((_ref = el.transform.baseVal.consolidate()) != null ? _ref.matrix : void 0);
            } else {
              matrix = Matrix.fromTransform(style[propertyWithPrefix('transform')]);
            }
            properties['transform'] = matrix.decompose();
          }
        } else {
          v = style[key];
          if ((v == null) && svgProperties.contains(key)) {
            v = el.getAttribute(key);
          }
          if (v === "" || (v == null)) {
            v = defaultValueForKey(key);
          }
          properties[key] = createInterpolable(v);
        }
      }
    } else {
      for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
        key = keys[_j];
        properties[key] = createInterpolable(el[key]);
      }
    }
    return pxProperties;
  };

  createInterpolable = function(value) {
    var interpolable, klass, klasses, _i, _len;
    klasses = [InterpolableArray, InterpolableObject, InterpolableNumber, InterpolableString];
    for (_i = 0, _len = klasses.length; _i < _len; _i++) {
      klass = klasses[_i];
      interpolable = klass.create(value);
      if (interpolable != null) {
        return interpolable;
      }
    }
    return null;
  };

  InterpolableString = (function() {
    function InterpolableString(parts) {
      this.parts = parts;
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
    }

    InterpolableString.prototype.interpolate = function(endInterpolable, t) {
      var end, i, newParts, start, _i, _ref;
      start = this.parts;
      end = endInterpolable.parts;
      newParts = [];
      for (i = _i = 0, _ref = Math.min(start.length, end.length); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (start[i].interpolate != null) {
          newParts.push(start[i].interpolate(end[i], t));
        } else {
          newParts.push(start[i]);
        }
      }
      return new InterpolableString(newParts);
    };

    InterpolableString.prototype.format = function() {
      var parts;
      parts = this.parts.map(function(val) {
        if (val.format != null) {
          return val.format();
        } else {
          return val;
        }
      });
      return parts.join('');
    };

    InterpolableString.create = function(value) {
      var index, match, matches, parts, re, type, types, _i, _j, _len, _len1;
      value = "" + value;
      matches = [];
      types = [
        {
          re: /(#[a-f\d]{3,6})/ig,
          klass: InterpolableColor,
          parse: function(v) {
            return v;
          }
        }, {
          re: /(rgba?\([0-9.]*, ?[0-9.]*, ?[0-9.]*(?:, ?[0-9.]*)?\))/ig,
          klass: InterpolableColor,
          parse: function(v) {
            return v;
          }
        }, {
          re: /([-+]?[\d.]+)/ig,
          klass: InterpolableNumber,
          parse: parseFloat
        }
      ];
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        type = types[_i];
        re = type.re;
        while (match = re.exec(value)) {
          matches.push({
            index: match.index,
            length: match[1].length,
            interpolable: type.klass.create(type.parse(match[1]))
          });
        }
      }
      matches = matches.sort(function(a, b) {
        return a.index > b.index;
      });
      parts = [];
      index = 0;
      for (_j = 0, _len1 = matches.length; _j < _len1; _j++) {
        match = matches[_j];
        if (match.index < index) {
          continue;
        }
        if (match.index > index) {
          parts.push(value.substring(index, match.index));
        }
        parts.push(match.interpolable);
        index = match.index + match.length;
      }
      if (index < value.length) {
        parts.push(value.substring(index));
      }
      return new InterpolableString(parts);
    };

    return InterpolableString;

  })();

  InterpolableObject = (function() {
    function InterpolableObject(obj) {
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
      this.obj = obj;
    }

    InterpolableObject.prototype.interpolate = function(endInterpolable, t) {
      var end, k, newObj, start, v;
      start = this.obj;
      end = endInterpolable.obj;
      newObj = {};
      for (k in start) {
        v = start[k];
        if (v.interpolate != null) {
          newObj[k] = v.interpolate(end[k], t);
        } else {
          newObj[k] = v;
        }
      }
      return new InterpolableObject(newObj);
    };

    InterpolableObject.prototype.format = function() {
      return this.obj;
    };

    InterpolableObject.create = function(value) {
      var k, obj, v;
      if (value instanceof Object) {
        obj = {};
        for (k in value) {
          v = value[k];
          obj[k] = createInterpolable(v);
        }
        return new InterpolableObject(obj);
      }
      return null;
    };

    return InterpolableObject;

  })();

  InterpolableNumber = (function() {
    function InterpolableNumber(value) {
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
      this.value = parseFloat(value);
    }

    InterpolableNumber.prototype.interpolate = function(endInterpolable, t) {
      var end, start;
      start = this.value;
      end = endInterpolable.value;
      return new InterpolableNumber((end - start) * t + start);
    };

    InterpolableNumber.prototype.format = function() {
      return roundf(this.value, 5);
    };

    InterpolableNumber.create = function(value) {
      if (typeof value === 'number') {
        return new InterpolableNumber(value);
      }
      return null;
    };

    return InterpolableNumber;

  })();

  InterpolableArray = (function() {
    function InterpolableArray(values) {
      this.values = values;
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
    }

    InterpolableArray.prototype.interpolate = function(endInterpolable, t) {
      var end, i, newValues, start, _i, _ref;
      start = this.values;
      end = endInterpolable.values;
      newValues = [];
      for (i = _i = 0, _ref = Math.min(start.length, end.length); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (start[i].interpolate != null) {
          newValues.push(start[i].interpolate(end[i], t));
        } else {
          newValues.push(start[i]);
        }
      }
      return new InterpolableArray(newValues);
    };

    InterpolableArray.prototype.format = function() {
      return this.values.map(function(val) {
        if (val.format != null) {
          return val.format();
        } else {
          return val;
        }
      });
    };

    InterpolableArray.createFromArray = function(arr) {
      var values;
      values = arr.map(function(val) {
        return createInterpolable(val) || val;
      });
      values = values.filter(function(val) {
        return val != null;
      });
      return new InterpolableArray(values);
    };

    InterpolableArray.create = function(value) {
      if (value instanceof Array) {
        return InterpolableArray.createFromArray(value);
      }
      return null;
    };

    return InterpolableArray;

  })();

  Color = (function() {
    function Color(rgb, format) {
      this.rgb = rgb != null ? rgb : {};
      this.format = format;
      this.toRgba = __bind(this.toRgba, this);
      this.toRgb = __bind(this.toRgb, this);
      this.toHex = __bind(this.toHex, this);
    }

    Color.fromHex = function(hex) {
      var hex3, result;
      hex3 = hex.match(/^#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i);
      if (hex3 != null) {
        hex = "#" + hex3[1] + hex3[1] + hex3[2] + hex3[2] + hex3[3] + hex3[3];
      }
      result = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (result != null) {
        return new Color({
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1
        }, "hex");
      }
      return null;
    };

    Color.fromRgb = function(rgb) {
      var match, _ref;
      match = rgb.match(/^rgba?\(([0-9.]*), ?([0-9.]*), ?([0-9.]*)(?:, ?([0-9.]*))?\)$/);
      if (match != null) {
        return new Color({
          r: parseFloat(match[1]),
          g: parseFloat(match[2]),
          b: parseFloat(match[3]),
          a: parseFloat((_ref = match[4]) != null ? _ref : 1)
        }, match[4] != null ? "rgba" : "rgb");
      }
      return null;
    };

    Color.componentToHex = function(c) {
      var hex;
      hex = c.toString(16);
      if (hex.length === 1) {
        return "0" + hex;
      } else {
        return hex;
      }
    };

    Color.prototype.toHex = function() {
      return "#" + Color.componentToHex(this.rgb.r) + Color.componentToHex(this.rgb.g) + Color.componentToHex(this.rgb.b);
    };

    Color.prototype.toRgb = function() {
      return "rgb(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ")";
    };

    Color.prototype.toRgba = function() {
      return "rgba(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ", " + this.rgb.a + ")";
    };

    return Color;

  })();

  InterpolableColor = (function() {
    function InterpolableColor(color) {
      this.color = color;
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
    }

    InterpolableColor.prototype.interpolate = function(endInterpolable, t) {
      var end, k, rgb, start, v, _i, _len, _ref;
      start = this.color;
      end = endInterpolable.color;
      rgb = {};
      _ref = ['r', 'g', 'b'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        v = Math.round((end.rgb[k] - start.rgb[k]) * t + start.rgb[k]);
        rgb[k] = Math.min(255, Math.max(0, v));
      }
      k = "a";
      v = roundf((end.rgb[k] - start.rgb[k]) * t + start.rgb[k], 5);
      rgb[k] = Math.min(1, Math.max(0, v));
      return new InterpolableColor(new Color(rgb, end.format));
    };

    InterpolableColor.prototype.format = function() {
      if (this.color.format === "hex") {
        return this.color.toHex();
      } else if (this.color.format === "rgb") {
        return this.color.toRgb();
      } else if (this.color.format === "rgba") {
        return this.color.toRgba();
      }
    };

    InterpolableColor.create = function(value) {
      var color;
      if (typeof value !== "string") {
        return;
      }
      color = Color.fromHex(value) || Color.fromRgb(value);
      if (color != null) {
        return new InterpolableColor(color);
      }
      return null;
    };

    return InterpolableColor;

  })();

  DecomposedMatrix2D = (function() {
    function DecomposedMatrix2D(props) {
      this.props = props;
      this.applyRotateCenter = __bind(this.applyRotateCenter, this);
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
    }

    DecomposedMatrix2D.prototype.interpolate = function(endMatrix, t) {
      var i, k, newProps, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _ref2;
      newProps = {};
      _ref = ['translate', 'scale', 'rotate'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        newProps[k] = [];
        for (i = _j = 0, _ref1 = this.props[k].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          newProps[k][i] = (endMatrix.props[k][i] - this.props[k][i]) * t + this.props[k][i];
        }
      }
      for (i = _k = 1; _k <= 2; i = ++_k) {
        newProps['rotate'][i] = endMatrix.props['rotate'][i];
      }
      _ref2 = ['skew'];
      for (_l = 0, _len1 = _ref2.length; _l < _len1; _l++) {
        k = _ref2[_l];
        newProps[k] = (endMatrix.props[k] - this.props[k]) * t + this.props[k];
      }
      return new DecomposedMatrix2D(newProps);
    };

    DecomposedMatrix2D.prototype.format = function() {
      return "translate(" + (this.props.translate.join(',')) + ") rotate(" + (this.props.rotate.join(',')) + ") skewX(" + this.props.skew + ") scale(" + (this.props.scale.join(',')) + ")";
    };

    DecomposedMatrix2D.prototype.applyRotateCenter = function(rotateC) {
      var i, m, m2d, negativeTranslate, _i, _results;
      m = baseSVG.createSVGMatrix();
      m = m.translate(rotateC[0], rotateC[1]);
      m = m.rotate(this.props.rotate[0]);
      m = m.translate(-rotateC[0], -rotateC[1]);
      m2d = new Matrix2D(m);
      negativeTranslate = m2d.decompose().props.translate;
      _results = [];
      for (i = _i = 0; _i <= 1; i = ++_i) {
        _results.push(this.props.translate[i] -= negativeTranslate[i]);
      }
      return _results;
    };

    return DecomposedMatrix2D;

  })();

  baseSVG = typeof document !== "undefined" && document !== null ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : void 0;

  Matrix2D = (function() {
    function Matrix2D(m) {
      this.m = m;
      this.applyProperties = __bind(this.applyProperties, this);
      this.decompose = __bind(this.decompose, this);
      if (!this.m) {
        this.m = baseSVG.createSVGMatrix();
      }
    }

    Matrix2D.prototype.decompose = function() {
      var kx, ky, kz, r0, r1;
      r0 = new Vector([this.m.a, this.m.b]);
      r1 = new Vector([this.m.c, this.m.d]);
      kx = r0.length();
      kz = r0.dot(r1);
      r0 = r0.normalize();
      ky = r1.combine(r0, 1, -kz).length();
      return new DecomposedMatrix2D({
        translate: [this.m.e, this.m.f],
        rotate: [Math.atan2(this.m.b, this.m.a) * 180 / Math.PI, this.rotateCX, this.rotateCY],
        scale: [kx, ky],
        skew: kz / ky * 180 / Math.PI
      });
    };

    Matrix2D.prototype.applyProperties = function(properties) {
      var hash, k, props, v, _i, _len, _ref, _ref1;
      hash = {};
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        props = properties[_i];
        hash[props[0]] = props[1];
      }
      for (k in hash) {
        v = hash[k];
        if (k === "translateX") {
          this.m = this.m.translate(v, 0);
        } else if (k === "translateY") {
          this.m = this.m.translate(0, v);
        } else if (k === "scaleX") {
          this.m = this.m.scale(v, 1);
        } else if (k === "scaleY") {
          this.m = this.m.scale(1, v);
        } else if (k === "rotateZ") {
          this.m = this.m.rotate(v);
        } else if (k === "skewX") {
          this.m = this.m.skewX(v);
        } else if (k === "skewY") {
          this.m = this.m.skewY(v);
        }
      }
      this.rotateCX = (_ref = hash.rotateCX) != null ? _ref : 0;
      return this.rotateCY = (_ref1 = hash.rotateCY) != null ? _ref1 : 0;
    };

    return Matrix2D;

  })();

  Vector = (function() {
    function Vector(els) {
      this.els = els;
      this.combine = __bind(this.combine, this);
      this.normalize = __bind(this.normalize, this);
      this.length = __bind(this.length, this);
      this.cross = __bind(this.cross, this);
      this.dot = __bind(this.dot, this);
      this.e = __bind(this.e, this);
    }

    Vector.prototype.e = function(i) {
      if (i < 1 || i > this.els.length) {
        return null;
      } else {
        return this.els[i - 1];
      }
    };

    Vector.prototype.dot = function(vector) {
      var V, n, product;
      V = vector.els || vector;
      product = 0;
      n = this.els.length;
      if (n !== V.length) {
        return null;
      }
      n += 1;
      while (--n) {
        product += this.els[n - 1] * V[n - 1];
      }
      return product;
    };

    Vector.prototype.cross = function(vector) {
      var A, B;
      B = vector.els || vector;
      if (this.els.length !== 3 || B.length !== 3) {
        return null;
      }
      A = this.els;
      return new Vector([(A[1] * B[2]) - (A[2] * B[1]), (A[2] * B[0]) - (A[0] * B[2]), (A[0] * B[1]) - (A[1] * B[0])]);
    };

    Vector.prototype.length = function() {
      var a, e, _i, _len, _ref;
      a = 0;
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        a += Math.pow(e, 2);
      }
      return Math.sqrt(a);
    };

    Vector.prototype.normalize = function() {
      var e, i, length, newElements, _ref;
      length = this.length();
      newElements = [];
      _ref = this.els;
      for (i in _ref) {
        e = _ref[i];
        newElements[i] = e / length;
      }
      return new Vector(newElements);
    };

    Vector.prototype.combine = function(b, ascl, bscl) {
      var i, result, _i, _ref;
      result = [];
      for (i = _i = 0, _ref = this.els.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        result[i] = (ascl * this.els[i]) + (bscl * b.els[i]);
      }
      return new Vector(result);
    };

    return Vector;

  })();

  DecomposedMatrix = (function() {
    function DecomposedMatrix() {
      this.toMatrix = __bind(this.toMatrix, this);
      this.format = __bind(this.format, this);
      this.interpolate = __bind(this.interpolate, this);
    }

    DecomposedMatrix.prototype.interpolate = function(decomposedB, t, only) {
      var angle, decomposed, decomposedA, i, invscale, invth, k, qa, qb, scale, th, _i, _j, _k, _l, _len, _ref, _ref1;
      if (only == null) {
        only = null;
      }
      decomposedA = this;
      decomposed = new DecomposedMatrix;
      _ref = ['translate', 'scale', 'skew', 'perspective'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        decomposed[k] = [];
        for (i = _j = 0, _ref1 = decomposedA[k].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          if ((only == null) || only.indexOf(k) > -1 || only.indexOf("" + k + ['x', 'y', 'z'][i]) > -1) {
            decomposed[k][i] = (decomposedB[k][i] - decomposedA[k][i]) * t + decomposedA[k][i];
          } else {
            decomposed[k][i] = decomposedA[k][i];
          }
        }
      }
      if ((only == null) || only.indexOf('rotate') !== -1) {
        qa = decomposedA.quaternion;
        qb = decomposedB.quaternion;
        angle = qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2] + qa[3] * qb[3];
        if (angle < 0.0) {
          for (i = _k = 0; _k <= 3; i = ++_k) {
            qa[i] = -qa[i];
          }
          angle = -angle;
        }
        if (angle + 1.0 > .05) {
          if (1.0 - angle >= .05) {
            th = Math.acos(angle);
            invth = 1.0 / Math.sin(th);
            scale = Math.sin(th * (1.0 - t)) * invth;
            invscale = Math.sin(th * t) * invth;
          } else {
            scale = 1.0 - t;
            invscale = t;
          }
        } else {
          qb[0] = -qa[1];
          qb[1] = qa[0];
          qb[2] = -qa[3];
          qb[3] = qa[2];
          scale = Math.sin(piDouble * (.5 - t));
          invscale = Math.sin(piDouble * t);
        }
        decomposed.quaternion = [];
        for (i = _l = 0; _l <= 3; i = ++_l) {
          decomposed.quaternion[i] = qa[i] * scale + qb[i] * invscale;
        }
      } else {
        decomposed.quaternion = decomposedA.quaternion;
      }
      return decomposed;
    };

    DecomposedMatrix.prototype.format = function() {
      return this.toMatrix().toString();
    };

    DecomposedMatrix.prototype.toMatrix = function() {
      var decomposedMatrix, i, j, match, matrix, quaternion, skew, temp, w, x, y, z, _i, _j, _k, _l;
      decomposedMatrix = this;
      matrix = Matrix.I(4);
      for (i = _i = 0; _i <= 3; i = ++_i) {
        matrix.els[i][3] = decomposedMatrix.perspective[i];
      }
      quaternion = decomposedMatrix.quaternion;
      x = quaternion[0];
      y = quaternion[1];
      z = quaternion[2];
      w = quaternion[3];
      skew = decomposedMatrix.skew;
      match = [[1, 0], [2, 0], [2, 1]];
      for (i = _j = 2; _j >= 0; i = --_j) {
        if (skew[i]) {
          temp = Matrix.I(4);
          temp.els[match[i][0]][match[i][1]] = skew[i];
          matrix = matrix.multiply(temp);
        }
      }
      matrix = matrix.multiply(new Matrix([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w), 0], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w), 0], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y), 0], [0, 0, 0, 1]]));
      for (i = _k = 0; _k <= 2; i = ++_k) {
        for (j = _l = 0; _l <= 2; j = ++_l) {
          matrix.els[i][j] *= decomposedMatrix.scale[i];
        }
        matrix.els[3][i] = decomposedMatrix.translate[i];
      }
      return matrix;
    };

    return DecomposedMatrix;

  })();

  Matrix = (function() {
    function Matrix(els) {
      this.els = els;
      this.toString = __bind(this.toString, this);
      this.decompose = __bind(this.decompose, this);
      this.inverse = __bind(this.inverse, this);
      this.augment = __bind(this.augment, this);
      this.toRightTriangular = __bind(this.toRightTriangular, this);
      this.transpose = __bind(this.transpose, this);
      this.multiply = __bind(this.multiply, this);
      this.dup = __bind(this.dup, this);
      this.e = __bind(this.e, this);
    }

    Matrix.prototype.e = function(i, j) {
      if (i < 1 || i > this.els.length || j < 1 || j > this.els[0].length) {
        return null;
      }
      return this.els[i - 1][j - 1];
    };

    Matrix.prototype.dup = function() {
      return new Matrix(this.els);
    };

    Matrix.prototype.multiply = function(matrix) {
      var M, c, cols, elements, i, j, ki, kj, nc, ni, nj, returnVector, sum;
      returnVector = matrix.modulus ? true : false;
      M = matrix.els || matrix;
      if (typeof M[0][0] === 'undefined') {
        M = new Matrix(M).els;
      }
      ni = this.els.length;
      ki = ni;
      kj = M[0].length;
      cols = this.els[0].length;
      elements = [];
      ni += 1;
      while (--ni) {
        i = ki - ni;
        elements[i] = [];
        nj = kj;
        nj += 1;
        while (--nj) {
          j = kj - nj;
          sum = 0;
          nc = cols;
          nc += 1;
          while (--nc) {
            c = cols - nc;
            sum += this.els[i][c] * M[c][j];
          }
          elements[i][j] = sum;
        }
      }
      M = new Matrix(elements);
      if (returnVector) {
        return M.col(1);
      } else {
        return M;
      }
    };

    Matrix.prototype.transpose = function() {
      var cols, elements, i, j, ni, nj, rows;
      rows = this.els.length;
      cols = this.els[0].length;
      elements = [];
      ni = cols;
      ni += 1;
      while (--ni) {
        i = cols - ni;
        elements[i] = [];
        nj = rows;
        nj += 1;
        while (--nj) {
          j = rows - nj;
          elements[i][j] = this.els[j][i];
        }
      }
      return new Matrix(elements);
    };

    Matrix.prototype.toRightTriangular = function() {
      var M, els, i, j, k, kp, multiplier, n, np, p, _i, _j, _ref, _ref1;
      M = this.dup();
      n = this.els.length;
      k = n;
      kp = this.els[0].length;
      while (--n) {
        i = k - n;
        if (M.els[i][i] === 0) {
          for (j = _i = _ref = i + 1; _ref <= k ? _i < k : _i > k; j = _ref <= k ? ++_i : --_i) {
            if (M.els[j][i] !== 0) {
              els = [];
              np = kp;
              np += 1;
              while (--np) {
                p = kp - np;
                els.push(M.els[i][p] + M.els[j][p]);
              }
              M.els[i] = els;
              break;
            }
          }
        }
        if (M.els[i][i] !== 0) {
          for (j = _j = _ref1 = i + 1; _ref1 <= k ? _j < k : _j > k; j = _ref1 <= k ? ++_j : --_j) {
            multiplier = M.els[j][i] / M.els[i][i];
            els = [];
            np = kp;
            np += 1;
            while (--np) {
              p = kp - np;
              els.push(p <= i ? 0 : M.els[j][p] - M.els[i][p] * multiplier);
            }
            M.els[j] = els;
          }
        }
      }
      return M;
    };

    Matrix.prototype.augment = function(matrix) {
      var M, T, cols, i, j, ki, kj, ni, nj;
      M = matrix.els || matrix;
      if (typeof M[0][0] === 'undefined') {
        M = new Matrix(M).els;
      }
      T = this.dup();
      cols = T.els[0].length;
      ni = T.els.length;
      ki = ni;
      kj = M[0].length;
      if (ni !== M.length) {
        return null;
      }
      ni += 1;
      while (--ni) {
        i = ki - ni;
        nj = kj;
        nj += 1;
        while (--nj) {
          j = kj - nj;
          T.els[i][cols + j] = M[i][j];
        }
      }
      return T;
    };

    Matrix.prototype.inverse = function() {
      var M, divisor, els, i, inverse_elements, j, ki, kp, new_element, ni, np, p, _i;
      ni = this.els.length;
      ki = ni;
      M = this.augment(Matrix.I(ni)).toRightTriangular();
      kp = M.els[0].length;
      inverse_elements = [];
      ni += 1;
      while (--ni) {
        i = ni - 1;
        els = [];
        np = kp;
        inverse_elements[i] = [];
        divisor = M.els[i][i];
        np += 1;
        while (--np) {
          p = kp - np;
          new_element = M.els[i][p] / divisor;
          els.push(new_element);
          if (p >= ki) {
            inverse_elements[i].push(new_element);
          }
        }
        M.els[i] = els;
        for (j = _i = 0; 0 <= i ? _i < i : _i > i; j = 0 <= i ? ++_i : --_i) {
          els = [];
          np = kp;
          np += 1;
          while (--np) {
            p = kp - np;
            els.push(M.els[j][p] - M.els[i][p] * M.els[j][i]);
          }
          M.els[j] = els;
        }
      }
      return new Matrix(inverse_elements);
    };

    Matrix.I = function(n) {
      var els, i, j, k, nj;
      els = [];
      k = n;
      n += 1;
      while (--n) {
        i = k - n;
        els[i] = [];
        nj = k;
        nj += 1;
        while (--nj) {
          j = k - nj;
          els[i][j] = i === j ? 1 : 0;
        }
      }
      return new Matrix(els);
    };

    Matrix.prototype.decompose = function() {
      var els, i, inversePerspectiveMatrix, j, k, matrix, pdum3, perspective, perspectiveMatrix, quaternion, result, rightHandSide, rotate, row, rowElement, s, scale, skew, t, translate, transposedInversePerspectiveMatrix, type, typeKey, v, w, x, y, z, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      matrix = this;
      translate = [];
      scale = [];
      skew = [];
      quaternion = [];
      perspective = [];
      els = [];
      for (i = _i = 0; _i <= 3; i = ++_i) {
        els[i] = [];
        for (j = _j = 0; _j <= 3; j = ++_j) {
          els[i][j] = matrix.els[i][j];
        }
      }
      if (els[3][3] === 0) {
        return false;
      }
      for (i = _k = 0; _k <= 3; i = ++_k) {
        for (j = _l = 0; _l <= 3; j = ++_l) {
          els[i][j] /= els[3][3];
        }
      }
      perspectiveMatrix = matrix.dup();
      for (i = _m = 0; _m <= 2; i = ++_m) {
        perspectiveMatrix.els[i][3] = 0;
      }
      perspectiveMatrix.els[3][3] = 1;
      if (els[0][3] !== 0 || els[1][3] !== 0 || els[2][3] !== 0) {
        rightHandSide = new Vector(els.slice(0, 4)[3]);
        inversePerspectiveMatrix = perspectiveMatrix.inverse();
        transposedInversePerspectiveMatrix = inversePerspectiveMatrix.transpose();
        perspective = transposedInversePerspectiveMatrix.multiply(rightHandSide).els;
        for (i = _n = 0; _n <= 2; i = ++_n) {
          els[i][3] = 0;
        }
        els[3][3] = 1;
      } else {
        perspective = [0, 0, 0, 1];
      }
      for (i = _o = 0; _o <= 2; i = ++_o) {
        translate[i] = els[3][i];
        els[3][i] = 0;
      }
      row = [];
      for (i = _p = 0; _p <= 2; i = ++_p) {
        row[i] = new Vector(els[i].slice(0, 3));
      }
      scale[0] = row[0].length();
      row[0] = row[0].normalize();
      skew[0] = row[0].dot(row[1]);
      row[1] = row[1].combine(row[0], 1.0, -skew[0]);
      scale[1] = row[1].length();
      row[1] = row[1].normalize();
      skew[0] /= scale[1];
      skew[1] = row[0].dot(row[2]);
      row[2] = row[2].combine(row[0], 1.0, -skew[1]);
      skew[2] = row[1].dot(row[2]);
      row[2] = row[2].combine(row[1], 1.0, -skew[2]);
      scale[2] = row[2].length();
      row[2] = row[2].normalize();
      skew[1] /= scale[2];
      skew[2] /= scale[2];
      pdum3 = row[1].cross(row[2]);
      if (row[0].dot(pdum3) < 0) {
        for (i = _q = 0; _q <= 2; i = ++_q) {
          scale[i] *= -1;
          for (j = _r = 0; _r <= 2; j = ++_r) {
            row[i].els[j] *= -1;
          }
        }
      }
      rowElement = function(index, elementIndex) {
        return row[index].els[elementIndex];
      };
      rotate = [];
      rotate[1] = Math.asin(-rowElement(0, 2));
      if (Math.cos(rotate[1]) !== 0) {
        rotate[0] = Math.atan2(rowElement(1, 2), rowElement(2, 2));
        rotate[2] = Math.atan2(rowElement(0, 1), rowElement(0, 0));
      } else {
        rotate[0] = Math.atan2(-rowElement(2, 0), rowElement(1, 1));
        rotate[1] = 0;
      }
      t = rowElement(0, 0) + rowElement(1, 1) + rowElement(2, 2) + 1.0;
      if (t > 1e-4) {
        s = 0.5 / Math.sqrt(t);
        w = 0.25 / s;
        x = (rowElement(2, 1) - rowElement(1, 2)) * s;
        y = (rowElement(0, 2) - rowElement(2, 0)) * s;
        z = (rowElement(1, 0) - rowElement(0, 1)) * s;
      } else if ((rowElement(0, 0) > rowElement(1, 1)) && (rowElement(0, 0) > rowElement(2, 2))) {
        s = Math.sqrt(1.0 + rowElement(0, 0) - rowElement(1, 1) - rowElement(2, 2)) * 2.0;
        x = 0.25 * s;
        y = (rowElement(0, 1) + rowElement(1, 0)) / s;
        z = (rowElement(0, 2) + rowElement(2, 0)) / s;
        w = (rowElement(2, 1) - rowElement(1, 2)) / s;
      } else if (rowElement(1, 1) > rowElement(2, 2)) {
        s = Math.sqrt(1.0 + rowElement(1, 1) - rowElement(0, 0) - rowElement(2, 2)) * 2.0;
        x = (rowElement(0, 1) + rowElement(1, 0)) / s;
        y = 0.25 * s;
        z = (rowElement(1, 2) + rowElement(2, 1)) / s;
        w = (rowElement(0, 2) - rowElement(2, 0)) / s;
      } else {
        s = Math.sqrt(1.0 + rowElement(2, 2) - rowElement(0, 0) - rowElement(1, 1)) * 2.0;
        x = (rowElement(0, 2) + rowElement(2, 0)) / s;
        y = (rowElement(1, 2) + rowElement(2, 1)) / s;
        z = 0.25 * s;
        w = (rowElement(1, 0) - rowElement(0, 1)) / s;
      }
      quaternion = [x, y, z, w];
      result = new DecomposedMatrix;
      result.translate = translate;
      result.scale = scale;
      result.skew = skew;
      result.quaternion = quaternion;
      result.perspective = perspective;
      result.rotate = rotate;
      for (typeKey in result) {
        type = result[typeKey];
        for (k in type) {
          v = type[k];
          if (isNaN(v)) {
            type[k] = 0;
          }
        }
      }
      return result;
    };

    Matrix.prototype.toString = function() {
      var i, j, str, _i, _j;
      str = 'matrix3d(';
      for (i = _i = 0; _i <= 3; i = ++_i) {
        for (j = _j = 0; _j <= 3; j = ++_j) {
          str += roundf(this.els[i][j], 10);
          if (!(i === 3 && j === 3)) {
            str += ',';
          }
        }
      }
      str += ')';
      return str;
    };

    Matrix.matrixForTransform = cacheFn(function(transform) {
      var matrixEl, result, style, _ref, _ref1, _ref2;
      matrixEl = document.createElement('div');
      matrixEl.style.position = 'absolute';
      matrixEl.style.visibility = 'hidden';
      matrixEl.style[propertyWithPrefix("transform")] = transform;
      document.body.appendChild(matrixEl);
      style = window.getComputedStyle(matrixEl, null);
      result = (_ref = (_ref1 = style.transform) != null ? _ref1 : style[propertyWithPrefix("transform")]) != null ? _ref : (_ref2 = dynamics.tests) != null ? _ref2.matrixForTransform(transform) : void 0;
      document.body.removeChild(matrixEl);
      return result;
    });

    Matrix.fromTransform = function(transform) {
      var digits, elements, i, match, matrixElements, _i;
      match = transform != null ? transform.match(/matrix3?d?\(([-0-9,e \.]*)\)/) : void 0;
      if (match) {
        digits = match[1].split(',');
        digits = digits.map(parseFloat);
        if (digits.length === 6) {
          elements = [digits[0], digits[1], 0, 0, digits[2], digits[3], 0, 0, 0, 0, 1, 0, digits[4], digits[5], 0, 1];
        } else {
          elements = digits;
        }
      } else {
        elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      }
      matrixElements = [];
      for (i = _i = 0; _i <= 3; i = ++_i) {
        matrixElements.push(elements.slice(i * 4, i * 4 + 4));
      }
      return new Matrix(matrixElements);
    };

    return Matrix;

  })();

  prefixFor = cacheFn(function(property) {
    var k, prefix, prop, propArray, propertyName, _i, _j, _len, _len1, _ref;
    if (document.body.style[property] !== void 0) {
      return '';
    }
    propArray = property.split('-');
    propertyName = "";
    for (_i = 0, _len = propArray.length; _i < _len; _i++) {
      prop = propArray[_i];
      propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1);
    }
    _ref = ["Webkit", "Moz", "ms"];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      prefix = _ref[_j];
      k = prefix + propertyName;
      if (document.body.style[k] !== void 0) {
        return prefix;
      }
    }
    return '';
  });

  propertyWithPrefix = cacheFn(function(property) {
    var prefix;
    prefix = prefixFor(property);
    if (prefix === 'Moz') {
      return "" + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
    }
    if (prefix !== '') {
      return "-" + (prefix.toLowerCase()) + "-" + (toDashed(property));
    }
    return toDashed(property);
  });

  rAF = typeof window !== "undefined" && window !== null ? window.requestAnimationFrame : void 0;

  animations = [];

  animationsTimeouts = [];

  slow = false;

  slowRatio = 1;

  if (typeof window !== "undefined" && window !== null) {
    window.addEventListener('keyup', function(e) {
      if (e.keyCode === 68 && e.shiftKey && e.ctrlKey) {
        return dynamics.toggleSlow();
      }
    });
  }

  if (rAF == null) {
    lastTime = 0;
    rAF = function(callback) {
      var currTime, id, timeToCall;
      currTime = Date.now();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function() {
        return callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  runLoopRunning = false;

  runLoopPaused = false;

  startRunLoop = function() {
    if (!runLoopRunning) {
      runLoopRunning = true;
      return rAF(runLoopTick);
    }
  };

  runLoopTick = function(t) {
    var animation, toRemoveAnimations, _i, _len;
    if (runLoopPaused) {
      rAF(runLoopTick);
      return;
    }
    toRemoveAnimations = [];
    for (_i = 0, _len = animations.length; _i < _len; _i++) {
      animation = animations[_i];
      if (!animationTick(t, animation)) {
        toRemoveAnimations.push(animation);
      }
    }
    animations = animations.filter(function(animation) {
      return toRemoveAnimations.indexOf(animation) === -1;
    });
    if (animations.length === 0) {
      return runLoopRunning = false;
    } else {
      return rAF(runLoopTick);
    }
  };

  animationTick = function(t, animation) {
    var key, properties, property, tt, y, _base, _base1, _ref;
    if (animation.tStart == null) {
      animation.tStart = t;
    }
    tt = (t - animation.tStart) / animation.options.duration;
    y = animation.curve(tt);
    properties = {};
    if (tt >= 1) {
      if (animation.curve.returnsToSelf) {
        properties = animation.properties.start;
      } else {
        properties = animation.properties.end;
      }
    } else {
      _ref = animation.properties.start;
      for (key in _ref) {
        property = _ref[key];
        properties[key] = interpolate(property, animation.properties.end[key], y);
      }
    }
    applyFrame(animation.el, properties);
    if (typeof (_base = animation.options).change === "function") {
      _base.change(animation.el);
    }
    if (tt >= 1) {
      if (typeof (_base1 = animation.options).complete === "function") {
        _base1.complete(animation.el);
      }
    }
    return tt < 1;
  };

  interpolate = function(start, end, y) {
    if ((start != null) && (start.interpolate != null)) {
      return start.interpolate(end, y);
    }
    return null;
  };

  startAnimation = function(el, properties, options, timeoutId) {
    var endProperties, interpolable, isSVG, k, matrix, startProperties, transforms, v;
    if (timeoutId != null) {
      animationsTimeouts = animationsTimeouts.filter(function(timeout) {
        return timeout.id !== timeoutId;
      });
    }
    dynamics.stop(el, {
      timeout: false
    });
    if (!options.animated) {
      dynamics.css(el, properties);
      if (typeof options.complete === "function") {
        options.complete(this);
      }
      return;
    }
    properties = parseProperties(properties);
    startProperties = getCurrentProperties(el, Object.keys(properties));
    endProperties = {};
    transforms = [];
    for (k in properties) {
      v = properties[k];
      if ((el.style != null) && transformProperties.contains(k)) {
        transforms.push([k, v]);
      } else {
        interpolable = createInterpolable(v);
        if (interpolable instanceof InterpolableNumber && (el.style != null)) {
          interpolable = new InterpolableString([interpolable, unitForProperty(k, 0)]);
        }
        endProperties[k] = interpolable;
      }
    }
    if (transforms.length > 0) {
      isSVG = isSVGElement(el);
      if (isSVG) {
        matrix = new Matrix2D();
        matrix.applyProperties(transforms);
      } else {
        v = (transforms.map(function(transform) {
          return transformValueForProperty(transform[0], transform[1]);
        })).join(" ");
        matrix = Matrix.fromTransform(Matrix.matrixForTransform(v));
      }
      endProperties['transform'] = matrix.decompose();
      if (isSVG) {
        startProperties.transform.applyRotateCenter([endProperties.transform.props.rotate[1], endProperties.transform.props.rotate[2]]);
      }
    }
    animations.push({
      el: el,
      properties: {
        start: startProperties,
        end: endProperties
      },
      options: options,
      curve: options.type.call(options.type, options)
    });
    return startRunLoop();
  };

  timeouts = [];

  timeoutLastId = 0;

  setRealTimeout = function(timeout) {
    if (!isDocumentVisible()) {
      return;
    }
    return timeout.realTimeoutId = setTimeout(function() {
      timeout.fn();
      return cancelTimeout(timeout.id);
    }, timeout.delay);
  };

  addTimeout = function(fn, delay) {
    var timeout;
    timeoutLastId += 1;
    timeout = {
      id: timeoutLastId,
      tStart: Date.now(),
      fn: fn,
      delay: delay,
      originalDelay: delay
    };
    setRealTimeout(timeout);
    timeouts.push(timeout);
    return timeoutLastId;
  };

  cancelTimeout = function(id) {
    return timeouts = timeouts.filter(function(timeout) {
      if (timeout.id === id) {
        clearTimeout(timeout.realTimeoutId);
      }
      return timeout.id !== id;
    });
  };

  leftDelayForTimeout = function(time, timeout) {
    var consumedDelay;
    if (time != null) {
      consumedDelay = time - timeout.tStart;
      return timeout.originalDelay - consumedDelay;
    } else {
      return timeout.originalDelay;
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.addEventListener('unload', function() {});
  }

  timeBeforeVisibilityChange = null;

  observeVisibilityChange(function(visible) {
    var animation, difference, timeout, _i, _j, _k, _len, _len1, _len2, _results;
    runLoopPaused = !visible;
    if (!visible) {
      timeBeforeVisibilityChange = Date.now();
      _results = [];
      for (_i = 0, _len = timeouts.length; _i < _len; _i++) {
        timeout = timeouts[_i];
        _results.push(clearTimeout(timeout.realTimeoutId));
      }
      return _results;
    } else {
      if (runLoopRunning) {
        difference = Date.now() - timeBeforeVisibilityChange;
        for (_j = 0, _len1 = animations.length; _j < _len1; _j++) {
          animation = animations[_j];
          if (animation.tStart != null) {
            animation.tStart += difference;
          }
        }
      }
      for (_k = 0, _len2 = timeouts.length; _k < _len2; _k++) {
        timeout = timeouts[_k];
        timeout.delay = leftDelayForTimeout(timeBeforeVisibilityChange, timeout);
        setRealTimeout(timeout);
      }
      return timeBeforeVisibilityChange = null;
    }
  });

  dynamics = {};

  dynamics.linear = function() {
    return function(t) {
      return t;
    };
  };

  dynamics.spring = function(options) {
    var A1, A2, decal, frequency, friction, s;
    if (options == null) {
      options = {};
    }
    applyDefaults(options, dynamics.spring.defaults);
    frequency = Math.max(1, options.frequency / 20);
    friction = Math.pow(20, options.friction / 100);
    s = options.anticipationSize / 1000;
    decal = Math.max(0, s);
    A1 = function(t) {
      var M, a, b, x0, x1;
      M = 0.8;
      x0 = s / (1 - s);
      x1 = 0;
      b = (x0 - (M * x1)) / (x0 - x1);
      a = (M - b) / x0;
      return (a * t * options.anticipationStrength / 100) + b;
    };
    A2 = function(t) {
      return Math.pow(friction / 10, -t) * (1 - t);
    };
    return function(t) {
      var A, At, a, angle, b, frictionT, y0, yS;
      frictionT = (t / (1 - s)) - (s / (1 - s));
      if (t < s) {
        yS = (s / (1 - s)) - (s / (1 - s));
        y0 = (0 / (1 - s)) - (s / (1 - s));
        b = Math.acos(1 / A1(yS));
        a = (Math.acos(1 / A1(y0)) - b) / (frequency * (-s));
        A = A1;
      } else {
        A = A2;
        b = 0;
        a = 1;
      }
      At = A(frictionT);
      angle = frequency * (t - s) * a + b;
      return 1 - (At * Math.cos(angle));
    };
  };

  dynamics.bounce = function(options) {
    var A, fn, frequency, friction;
    if (options == null) {
      options = {};
    }
    applyDefaults(options, dynamics.bounce.defaults);
    frequency = Math.max(1, options.frequency / 20);
    friction = Math.pow(20, options.friction / 100);
    A = function(t) {
      return Math.pow(friction / 10, -t) * (1 - t);
    };
    fn = function(t) {
      var At, a, angle, b;
      b = -3.14 / 2;
      a = 1;
      At = A(t);
      angle = frequency * t * a + b;
      return At * Math.cos(angle);
    };
    fn.returnsToSelf = true;
    return fn;
  };

  dynamics.gravity = function(options) {
    var L, bounciness, curves, elasticity, fn, getPointInCurve, gravity;
    if (options == null) {
      options = {};
    }
    applyDefaults(options, dynamics.gravity.defaults);
    bounciness = Math.min(options.bounciness / 1250, 0.8);
    elasticity = options.elasticity / 1000;
    gravity = 100;
    curves = [];
    L = (function() {
      var b, curve;
      b = Math.sqrt(2 / gravity);
      curve = {
        a: -b,
        b: b,
        H: 1
      };
      if (options.returnsToSelf) {
        curve.a = 0;
        curve.b = curve.b * 2;
      }
      while (curve.H > 0.001) {
        L = curve.b - curve.a;
        curve = {
          a: curve.b,
          b: curve.b + L * bounciness,
          H: curve.H * bounciness * bounciness
        };
      }
      return curve.b;
    })();
    getPointInCurve = function(a, b, H, t) {
      var c, t2;
      L = b - a;
      t2 = (2 / L) * t - 1 - (a * 2 / L);
      c = t2 * t2 * H - H + 1;
      if (options.returnsToSelf) {
        c = 1 - c;
      }
      return c;
    };
    (function() {
      var L2, b, curve, _results;
      b = Math.sqrt(2 / (gravity * L * L));
      curve = {
        a: -b,
        b: b,
        H: 1
      };
      if (options.returnsToSelf) {
        curve.a = 0;
        curve.b = curve.b * 2;
      }
      curves.push(curve);
      L2 = L;
      _results = [];
      while (curve.b < 1 && curve.H > 0.001) {
        L2 = curve.b - curve.a;
        curve = {
          a: curve.b,
          b: curve.b + L2 * bounciness,
          H: curve.H * elasticity
        };
        _results.push(curves.push(curve));
      }
      return _results;
    })();
    fn = function(t) {
      var curve, i, v;
      i = 0;
      curve = curves[i];
      while (!(t >= curve.a && t <= curve.b)) {
        i += 1;
        curve = curves[i];
        if (!curve) {
          break;
        }
      }
      if (!curve) {
        v = options.returnsToSelf ? 0 : 1;
      } else {
        v = getPointInCurve(curve.a, curve.b, curve.H, t);
      }
      return v;
    };
    fn.returnsToSelf = options.returnsToSelf;
    return fn;
  };

  dynamics.forceWithGravity = function(options) {
    if (options == null) {
      options = {};
    }
    applyDefaults(options, dynamics.forceWithGravity.defaults);
    options.returnsToSelf = true;
    return dynamics.gravity(options);
  };

  dynamics.bezier = (function() {
    var Bezier, Bezier_, yForX;
    Bezier_ = function(t, p0, p1, p2, p3) {
      return (Math.pow(1 - t, 3) * p0) + (3 * Math.pow(1 - t, 2) * t * p1) + (3 * (1 - t) * Math.pow(t, 2) * p2) + Math.pow(t, 3) * p3;
    };
    Bezier = function(t, p0, p1, p2, p3) {
      return {
        x: Bezier_(t, p0.x, p1.x, p2.x, p3.x),
        y: Bezier_(t, p0.y, p1.y, p2.y, p3.y)
      };
    };
    yForX = function(xTarget, Bs, returnsToSelf) {
      var B, aB, i, lower, percent, upper, x, xTolerance, _i, _len;
      B = null;
      for (_i = 0, _len = Bs.length; _i < _len; _i++) {
        aB = Bs[_i];
        if (xTarget >= aB(0).x && xTarget <= aB(1).x) {
          B = aB;
        }
        if (B !== null) {
          break;
        }
      }
      if (!B) {
        if (returnsToSelf) {
          return 0;
        } else {
          return 1;
        }
      }
      xTolerance = 0.0001;
      lower = 0;
      upper = 1;
      percent = (upper + lower) / 2;
      x = B(percent).x;
      i = 0;
      while (Math.abs(xTarget - x) > xTolerance && i < 100) {
        if (xTarget > x) {
          lower = percent;
        } else {
          upper = percent;
        }
        percent = (upper + lower) / 2;
        x = B(percent).x;
        i += 1;
      }
      return B(percent).y;
    };
    return function(options) {
      var Bs, fn, points;
      if (options == null) {
        options = {};
      }
      points = options.points;
      Bs = (function() {
        var i, k, _fn;
        Bs = [];
        _fn = function(pointA, pointB) {
          var B2;
          B2 = function(t) {
            return Bezier(t, pointA, pointA.cp[pointA.cp.length - 1], pointB.cp[0], pointB);
          };
          return Bs.push(B2);
        };
        for (i in points) {
          k = parseInt(i);
          if (k >= points.length - 1) {
            break;
          }
          _fn(points[k], points[k + 1]);
        }
        return Bs;
      })();
      fn = function(t) {
        if (t === 0) {
          return 0;
        } else if (t === 1) {
          return 1;
        } else {
          return yForX(t, Bs, this.returnsToSelf);
        }
      };
      fn.returnsToSelf = points[points.length - 1].y === 0;
      return fn;
    };
  })();

  dynamics.easeInOut = function(options) {
    var friction, _ref;
    if (options == null) {
      options = {};
    }
    friction = (_ref = options.friction) != null ? _ref : dynamics.easeInOut.defaults.friction;
    return dynamics.bezier({
      points: [
        {
          x: 0,
          y: 0,
          cp: [
            {
              x: 0.92 - (friction / 1000),
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          cp: [
            {
              x: 0.08 + (friction / 1000),
              y: 1
            }
          ]
        }
      ]
    });
  };

  dynamics.easeIn = function(options) {
    var friction, _ref;
    if (options == null) {
      options = {};
    }
    friction = (_ref = options.friction) != null ? _ref : dynamics.easeIn.defaults.friction;
    return dynamics.bezier({
      points: [
        {
          x: 0,
          y: 0,
          cp: [
            {
              x: 0.92 - (friction / 1000),
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          cp: [
            {
              x: 1,
              y: 1
            }
          ]
        }
      ]
    });
  };

  dynamics.easeOut = function(options) {
    var friction, _ref;
    if (options == null) {
      options = {};
    }
    friction = (_ref = options.friction) != null ? _ref : dynamics.easeOut.defaults.friction;
    return dynamics.bezier({
      points: [
        {
          x: 0,
          y: 0,
          cp: [
            {
              x: 0,
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          cp: [
            {
              x: 0.08 + (friction / 1000),
              y: 1
            }
          ]
        }
      ]
    });
  };

  dynamics.spring.defaults = {
    frequency: 300,
    friction: 200,
    anticipationSize: 0,
    anticipationStrength: 0
  };

  dynamics.bounce.defaults = {
    frequency: 300,
    friction: 200
  };

  dynamics.forceWithGravity.defaults = dynamics.gravity.defaults = {
    bounciness: 400,
    elasticity: 200
  };

  dynamics.easeInOut.defaults = dynamics.easeIn.defaults = dynamics.easeOut.defaults = {
    friction: 500
  };

  dynamics.css = makeArrayFn(function(el, properties) {
    return applyProperties(el, properties, true);
  });

  dynamics.animate = makeArrayFn(function(el, properties, options) {
    var id;
    if (options == null) {
      options = {};
    }
    options = clone(options);
    applyDefaults(options, {
      type: dynamics.easeInOut,
      duration: 1000,
      delay: 0,
      animated: true
    });
    options.duration = Math.max(0, options.duration * slowRatio);
    options.delay = Math.max(0, options.delay);
    if (options.delay === 0) {
      return startAnimation(el, properties, options);
    } else {
      id = dynamics.setTimeout(function() {
        return startAnimation(el, properties, options, id);
      }, options.delay);
      return animationsTimeouts.push({
        id: id,
        el: el
      });
    }
  });

  dynamics.stop = makeArrayFn(function(el, options) {
    if (options == null) {
      options = {};
    }
    if (options.timeout == null) {
      options.timeout = true;
    }
    if (options.timeout) {
      animationsTimeouts = animationsTimeouts.filter(function(timeout) {
        if (timeout.el === el && ((options.filter == null) || options.filter(timeout))) {
          dynamics.clearTimeout(timeout.id);
          return false;
        }
        return true;
      });
    }
    return animations = animations.filter(function(animation) {
      return animation.el !== el;
    });
  });

  dynamics.setTimeout = function(fn, delay) {
    return addTimeout(fn, delay * slowRatio);
  };

  dynamics.initMatrixFromTransform = function(transform, inverse) {
    if (!inverse) {
      var matrix = Matrix.fromTransform(Matrix.matrixForTransform(transform)).decompose();
    } else {
      var matrix = Matrix.fromTransform(Matrix.matrixForTransform(transform)).inverse().decompose();
    }
    // setTimeout(function() {
    //         cb && cb(matrix);
    // }, 250)
    return matrix;
  }

  dynamics.clearTimeout = function(id) {
    return cancelTimeout(id);
  };

  dynamics.toggleSlow = function() {
    slow = !slow;
    if (slow) {
      slowRatio = 3;
    } else {
      slowRatio = 1;
    }
    return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log("dynamics.js: slow animations " + (slow ? "enabled" : "disabled")) : void 0 : void 0;
  };

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = dynamics;
  } else if (typeof define === "function") {
    define('dynamics', function() {
      return dynamics;
    });
  } else {
    window.dynamics = dynamics;
  }

}).call(this);


