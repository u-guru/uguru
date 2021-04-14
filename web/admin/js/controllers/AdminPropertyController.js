angular.module('uguru.admin')

.controller('AdminPropertyController', [
'$scope',
'$state',
'$timeout',
'$localstorage',
'$compile',
'AnimationService',
'UtilitiesService',
'TweenService',
'RootService',
'DirectiveService',
function($scope, $state, $timeout, $localstorage, $compile, AnimationService, UtilitiesService, TweenService, RootService, DirectiveService) {
  var apc = this;

  function parsePropertiesAndPlay(properties, i_elem) {
	properties.forEach(function(property, i) {
	  var transformProp = {start: '', end: '', ease: ''};
	  var transformProperties = ['scale', 'translateX', 'translateY', 'scale', 'rotate', 'perspective'];
	  if (typeof(property.start) === 'string' && transformProperties.indexOf(property.start.split('(')[0]) > -1) {
		transformProp.start += property.start + ' ';
		transformProp.end += property.end + ' ';
	  }
	  properties[i].element = i_elem;
	  if (i === 0 && properties[i].element) {
		apc.gPlayer.element = i_elem;
	  }

	  properties[i].animation = initAnimationWithEase(property, i);
	  properties[i].player = {offset:0, play: playOne, resetAnim: resetOne, resume: playOne, stepBack: stepOne, step: stepForward(apc.gPlayer.element, properties[i]), pause: pauseOne};

	  properties[i].player.element = document.querySelector('.property-playbar-' + i);


	  properties[i].keyframes = convertAnimObjToKF(property.animation.obj);
	  properties[i].player.update = getUpdatePropertyAnimationFunc(i);
	  properties[i].defaults = {stepTime: 100};
	  properties[i].settings = initSettingsWithCurrentAnimationValues(properties[i]);
	  properties[i].player.timer = getTimer(property);

	  //player specific
	  if (properties[i].player.element) {
		var playballDict = initPlayerBallAnimation(property);
		properties[i].player.animation = initAnimationWithEase(playballDict, 'Player');
		properties[i].player.playElement = document.querySelector('.property-playball-' + i);
		properties[i].player.playKeyframes = convertAnimObjToKF(property.player.animation.obj);
	  }
	})
  }

  apc.player = {};

  function stepForward(elem, properties) {
	return function() {
	  for (var i = 0 ; i < properties.length; i++) {
		ball = properties[i].player.playElement;
		var iProp= apc.properties[0];
		var options = iProp.settings;
		var tween = new Tweenable();
		var s_dict = {};
		s_dict[iProp.propName] = iProp.start
		e_dict[iProp.propName] = iProp.end;
		tween.setConfig({
		  from: s_dict,
		  end: e_dict,
		  duration: iProp.duration,
		  easing: iProp.ease
		})
		tween.tween();
		tween.pause();
		tween.seek(iProp.timer.value - 250);
		tween.resume();
		$timeout(function() {
		  tween.pause();
		}, 250)

	  }
	}
  }

  // function stepBackwards(elem, properties) {
  //   for (var i = 0 ; i < properties.length; i++) {

  //   }
  // }

  // $timeout(function() {

  //   var inspectElemId = '#svg-square-rect';



  //   var property = apc.properties[0]
  // // parsePropertiesAndPlay(apc.properties, elem);
  //   var startDict = {};
  //   var endDict = {};
  //   startDict[apc.properties[0].propName] = apc.properties[0].start;

  //   var property = apc.properties[0];
  //   var tweenable = new Tweenable();
  //   $timeout(function() {


  //     endDict[apc.properties[0].animation.propName]  = property.end;
  //     tweenable.setConfig({
  //       from: startDict,
  //       to:   endDict,
  //       duration: property.duration,
  //       easing: property.ease,
  //       start: function() {tweenable.pause()},
  //       step: function () {
  //         elem.style[property.animation.propName] = tweenable.get()[property.animation.propName]
  //       },
  //       finish: function() {console.log('finished')}
  //     });
  //   }, 250)
  // });

  function initPlayerBallAnimation(property, reverse) {

	var width = property.player.element.getBoundingClientRect().width;
	if (!reverse) {
	  return {name: 'transform',  start: 'translateX(0px)',  end: 'translateX(' +  (width * 0.11) + 'px)',  duration:property.duration,  timingFunction:property.timingFunction, ease: 'linear',  unit: 0}
	} else {

	  // property.player.playElement.parentNode.style['transform'] = 'translateX(' +  (width * 0.11) + 'px)';

	  // property.player.playElement.setAttribute('x', '95%');
	  return {name: 'transform',  start: 'translateX(0px)',  end: 'translateX(' +  (width * 0.11) + 'px)',  duration:property.duration,  timingFunction:property.timingFunction, fillMode:'forwards', direction:'reverse', ease: 'linear',  unit: 0}
	}
  }

  function getTimer(property, precision) {
	if (!precision) precision = 1
	var intervalLength = 100;//ms
	var timer = {
	  value: 0,
	  startRef: null,
	  interval: null,
	  display: {s: 0, ms: 0},
	  duration: property.settings.duration.val
	};
	timer.start = startTimer(timer);
	timer.pause = pauseTimer(timer);
	timer.resume = resumeTimer(timer);
	timer.reset = resetTimer(timer);
	timer.durationDisplay = {s: (timer.duration/1000).toFixed(precision) + 's', ms: (timer.duration) + 'ms'};
	return timer;
	function resumeTimer(timer) {
	  return function() {
		// timer.start();
		// var current = new Date().getTime();
		// timer.startRef = current;
		// timer.interval = setInterval(function() {
		//   timer.value += intervalLength;
		//   timer.startRef = new Date().getTime();
		//   timer.display.ms = timer.value;
		//   timer.display.s = (parseFloat(timer.value)/1000).toFixed(1);
		//   $timeout(function() {$scope.$apply()});
		// }, intervalLength)
	  }
	}
	function startTimer(timer) {
	  return function() {
		timer.startRef = new Date().getTime();

		clearInterval(timer.interval);
		timer.interval = null;
		timer.interval = setInterval(function() {
		  timer.value += intervalLength;
		  timer.startRef = new Date().getTime();
		  timer.display.ms = timer.value;
		  timer.display.s = (parseFloat(timer.value)/1000).toFixed(precision);
		  $timeout(function() {$scope.$apply()});
		}, intervalLength)
	  }
	}
	function resetTimer(timer) {
	  return function() {
		timer.pause();
		clearInterval(timer.interval);
		timer.interval = null;
		timer.startRef = null;
		timer.value = 0;
		timer.interval = null;
		timer.display.s = 0;
		timer.display.ms = 0
		timer.durationDisplay = {s: (timer.duration/1000).toFixed(precision) + 's', ms: (timer.duration) + 'ms'};
	  }

	}
	function pauseTimer(timer) {
	  return function() {
		clearInterval(timer.interval);
		timer.interval = null;
		var current = new Date().getTime();
		timer.value +=  current - timer.startRef;
		timer.startRef = new Date().getTime();
		timer.display.ms = timer.value;
		timer.display.s = (parseFloat(timer.value)/1000).toFixed(1);

	  }
	}
  }

  function getUpdatePropertyAnimationFunc(index) {
	return function(property, prop_name) {

	  if (prop_name in property.animation)  {
		console.log('changing', prop_name, property.animation[prop_name]);

		// property.animation = initAnimationWithEase(property);
		if (prop_name in property) {
		  property.animation = initAnimationWithEase(property, index);
		} else {
		  property.animation = initAnimationWithEase(property, index);
		}
		property.keyframes = convertAnimObjToKF(property.animation.obj);
		property.settings = initSettingsWithCurrentAnimationValues(property);
		property.player.timer = getTimer(property);

		var playballDict = initPlayerBallAnimation(property, property.animation.direction === 'reverse');
		property.player.animation = initAnimationWithEase(playballDict, 'Player');
		// console.log(property.player.animation)
		// property.player.playElement = document.querySelector('.property-playball-' + i);
		property.player.playKeyframes = convertAnimObjToKF(property.player.animation.obj);

	  }
	}
  }

  function initSettingsWithCurrentAnimationValues(property) {
	var animation = property.animation;
	var durationVal =  parseFloat(property.animation.duration.replace('ms', ''))
	var delayVal =  parseFloat(property.animation.delay.replace('ms', ''))
	var settingsDict = {
	  duration : {
				range: {max: durationVal + durationVal * 1.5, min:(durationVal - (durationVal * 1.5)), step: 100 },
				val:durationVal , display: animation.duration + ''},
	  delay : {
		  range: {max: 3000, min:0, step: 100 },
			val:delayVal , display: animation.delay + ''
	  },
	  resetAtEnd: true,
	  stepSpeed: {
		fast: 250,
		slow:50,
		slowRange: {
		  max: 250,
		  min:16
		},
		fastRange: {
		  min: 250,
		  max: durationVal/2
		}
	  },
	  iterationCount: {val: property.animation.duration || 1, str: animation.iterationCount + ''},
	  update: onSettingChange(property),
	};


	return settingsDict;

	function onSettingChange(property) {
	  return function (prop_name, value) {
		console.log('updating', prop_name, value)
		// property[prop_name] = parseFloat(value.replace('ms', ''));
		property.player.update(property, prop_name)
		$timeout(function() {
		  $scope.$apply();
		})
	  }
	}
  }

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
	var timeStart = new Date().getTime();
	function animate() {
	  var currentTime = new Date().getTime();
	  if (currentTime - timeStart < 1000) {
		apc.count += 1
		requestAnimFrame( animate );
	  } else {
		$timeout(function() {
		  $scope.$apply();
		  console.log(apc.count);
		})
	  }
	}
	animate();

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
	  direction: options.direction || 'normal',
	  fillMode:  options.fillMode || 'forwards',
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
	  console.log()
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

  function initAndSetPlayerAnimation(property, element) {

  }

  function getDefaultAnimationProperties(name, element) {
	var prefix = 'webkitAnimation';
	var animPropStr = element[prefix]

	var animPropObj = convertAnimStringToObj(animPropStr);
	animPropObj[prefix + 'Name'] = name;
	if (animPropObj[prefix + 'Duration'] === '0s') {
	  animPropObj[prefix + 'Duration'] = '1s';
	}

	if (name.toLowerCase.indexOf('player') > -1) {
	  animPropObj[prefix + 'TimingFunction'] = 'linear';
	}

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

  function pauseAll() {
	try {
	  var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	  apc.gPlayer.element.style['webkitAnimation'] = UtilitiesService.replaceAll(style, 'running', 'paused');
	  apc.gPlayer.paused = true;
	  apc.gPlayer.reset = true;
	  apc.gPlayer.active = false;

	} catch(e) {
	  console.log('BS Ionic error - please tell samir if the pause is funky')
	  $timeout(function() {
		pauseAll();
		$scope.$apply();
		console.log('If you see this multiple times in the console.log -- tell Samir')
	  })
	}

  }

  function resetAll() {
	var tempoOffsetWidth = apc.gPlayer.element.style['offsetWidth']
	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
	apc.gPlayer.element.style['webkitAnimation'] = newPausedStyle;
	apc.gPlayer.element.style['webkitAnimation'] = '';
	apc.gPlayer.element.style['offsetWidth'] = null;
	apc.gPlayer.reset = false;
	apc.gPlayer.active = false;
	apc.gPlayer.paused = false;
	apc.gPlayer.timer.reset;
	apc.gPlayer.element.style['webkitAnimation'] = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];

	// var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	//pause.
	//set direction to reverse
	//pause
	//set fillMode to backwards
	//pause
	//set duration to 0.01; store currentDuration in Arr;
	//fire timeout
	//fire start listener
	//play
	//onEndListener --> ste back to original
	// apc.gPlayer.element.style['webkitAnimation'] = UtilitiesService.replaceAll(style, 'paused', 'running');
	// apc.gPlayer.element.style['webkitAnimation'] = UtilitiesService.replaceAll(style, 'running', 'paused');
	// apc.gPlayer.pause = true;
	// apc.gPlayer.reset = true;
  }



  function resumeAll() {
	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	apc.gPlayer.element.style['webkitAnimation'] = UtilitiesService.replaceAll(style, 'paused', 'running');
	apc.gPlayer.paused = false;
	apc.gPlayer.reset = false;
  }

  function playAll(property_arr, start_cb, end_cb) {
	apc.gPlayer.active = true;
	if (apc.gPlayer.paused) {
	  apc.gPlayer.paused = false;
	  apc.gPlayer.resume();
	  return;
	}

	if (apc.settings.showFPS) {
	  apc.showFPS;
	}
	var animStr = ''
	var maxDuration = 0;
	var maxDurationProp = null;
	for (var i = 0; i < property_arr.length; i++) {
	  if (property_arr[i].duration > maxDuration) {
		maxDuration = property_arr[i].duration;
		maxDurationProp = property_arr[i];
	  }
	}

	for (var i = 0; i < property_arr.length; i++) {

	  property_arr[i].animation.str = convertAnimPropObjToString(property_arr[i].animation);
	  animStr += property_arr[i].animation.str;
	  if (i === property_arr.length-1) {
		var endCallback = function(player) {
		  return function(e) {
			console.log('animation has ended');
			apc.gPlayer.element.removeEventListener('webkitAnimationEnd', endCallback);
			player.paused = false;
			player.reset = false;
			player.active = false;
			$timeout(function() {
			  $scope.$apply();
			})
		  }
		}
		maxDurationProp.animation.listeners && maxDurationProp.animation.listeners.start && maxDurationProp.element.removeEventListener('webkitAnimationStart', maxDurationProp.animation.listeners.start);
		maxDurationProp.animation.listeners && maxDurationProp.animation.listeners.end && maxDurationProp.element.removeEventListener('webkitAnimationEnd', maxDurationProp.animation.listeners.end);
		maxDurationProp.animation.listeners = {
		  start: getStartListener(maxDurationProp.element),
		  end: getEndListener(maxDurationProp.element, endCallback(apc.gPlayer), property_arr[i])
		}
		property_arr[i].element.style['webkitAnimation'] =  animStr;

	  } else {
		animStr += ', '
	  }
	}
  }

  function insertElementsInPlayer(elements, main_elem) {
	elements.sort(function(e1, e2) { return e2.attrs.length - e1.attrs.length});
	var elementContainers = document.querySelectorAll('.element-wrapper');
	if (!elementContainers) {
	  return;
	}
	var elemContainerIds = [];
	elementContainers.forEach(
	  function(e, i) {
		if (!elements[i]) return;
		if (elements[i].element === main_elem) return;
		console.log(elements[i].element);
		var clonedNode = elements[i].element.cloneNode(true);

		$compile(clonedNode)($scope);
		clonedNode.id = elements[i].element.id;
		clonedNode.setAttribute('style', '');
		clonedNode.style.transform += " scale(0.4)";
	  //   clonedNode.classList.add('absolute', 'full-xy');
		clonedNode.style['webkitAnimation'] = '';

		clonedNode.style.opacity = 1;
		e.appendChild(clonedNode);

		console.log(elements[i])
		for (key in elements[i].parsedArgs) {
		  if (key.indexOf('init') > -1) {
			activateArg(key, elements[i].parsedArgs[key], $scope, clonedNode);
		  }
		}
	  }
	)
  }

  apc.getAnimatableElements = function(elem) {
	var browserPrefix = RootService.getBrowserPrefix();
	var parentContainer = elem.cloneNode(true);
	// parentContainer = parentContainer.childNodes[0]
	var prefix = 'animation';
	if (browserPrefix && browserPrefix.length)  {
	  prefix = browserPrefix + 'Animation'
	}
	var stateFilters = [];
	var supportedStates = DirectiveService.getSupportedOnStates();
	supportedStates = '[' + supportedStates.join(' [').split(' ').join('] ') + ']';
	var elements = parentContainer.querySelectorAll('*');
	var arrElems = [];
	for (var i = 0; i < elements.length; i++) {
	  arrElems.push(elements[i]);
	}
	var filteredElements = [];
	apc.elements = [];
	arrElems.forEach(function(e, i) {
	  var cmdAttrArr = [];
	  for (var j = 0; j < e.attributes.length; j++) {
		var indexAttr = e.attributes[j];
		if (supportedStates.indexOf('[' + indexAttr.name) > -1 || indexAttr.name.indexOf('when-') > -1) {
		  cmdAttrArr.push({name: indexAttr.name, value: indexAttr.value, parsedArgs: DirectiveService.parseArgs(indexAttr.value)})
		  e.setAttribute(indexAttr.name, '')
		}
	  }
	  if (cmdAttrArr.length) {
		  eStyle = window.getComputedStyle(e);
		  var animStr = eStyle['webkitAnimation'].replace('running', 'paused');
		  e.style['webkitAnimation'] = animStr;
		  apc.elements.push({id: apc.elements.length + 1, element: e, attrs: cmdAttrArr, animStr: eStyle['webkitAnimation']})
	  }
	})

	$timeout(function() {
	  insertElementsInPlayer(apc.elements, parentContainer);
	}, 500)
	apc.activeElement = apc.elem;
	apc.gPlayer.states = [];
	for (var j = 0; j < elem.attributes.length; j++) {
		var indexAttr = elem.attributes[j];
		if (supportedStates.indexOf('[' + indexAttr.name) > -1 || indexAttr.name.indexOf('when-') > -1) {
		  apc.gPlayer.states.push({name: indexAttr.name, value: indexAttr.value, parsedArgs: DirectiveService.parseArgs(indexAttr.value)})
		  elem.setAttribute(indexAttr.name, '')
		}
	  }
	if (!apc.gPlayer.states.length) {
	  apc.gPlayer.states = apc.elements[0].attrs;
	}

	// apc.gPlayer.states = apc.activeElement.attrs;
	return apc.elements;

	// var timelineDict = {transitions: [], animations:[]};
	// var classDict = {};
	// var animations = [];
	// var elementsWithAnimations = [];
	// var count = 0;
	// var maxDict = {duration: 0, delay:0, animation: null};;
	// for (var i = -1; i < allElements.length; i++) {
	//   var indexChild = ((i >= 0) && allElements[i]) ||element[0];
	//   var indexChildClass = indexChild.classList;
	//   var animationProps = getAnimationObj(browserPrefix, indexChild);
	//   if (animationProps) {
	//     elementsWithAnimations.push(indexChild);
	//     var firstKey = Object.keys(animationProps)[0];
	//     var animationSplit = UtilitiesService.replaceAll(animationProps[firstKey], ', ', ',').split(',');
	//     for (var j = 0; j < animationSplit.length; j++) {
	//       var animDict = [];
	//       for (key in animationProps) {
	//         animDict[key] = UtilitiesService.replaceAll(animationProps[key], ', ', ',').split(',')[j];
	//         var animObj = initAnimationObj(animDict, indexChild, browserPrefix)
	//         if (animObj.duration && animObj.name && animObj.delay) {
	//           var durationParsed = parseFloat(parseDuration(animObj.duration));
	//           var delayParsed = parseFloat(parseDuration(animObj.delay));
	//           if ((delayParsed + durationParsed) > (maxDict.delay + maxDict.duration)) {
	//             maxDict.delay = delayParsed;
	//             maxDict.duration = durationParsed;
	//             maxDict.animation = animObj;
	//           }
	//           if (!(animObj.name in scope.animLookupDict) || scope.animLookupDict[animObj.name].indexOf(indexChild) === -1) {
	//               if (!(animObj.name in scope.animLookupDict)) {
	//                 scope.animLookupDict[animObj.name] = [indexChild];
	//               } else {
	//                 scope.animLookupDict[animObj.name].push(indexChild);
	//               }

	//               animations.push(animObj)
	//           }
	//         }
	//       }
	//     }
	//   }
	// }
  }

  var propertyOne = {name: 'transform', start: 'translateX(-1000%) rotate(-360deg) scale(0.1)', end: 'translateX(10%) rotate(720deg) scale(1.25)', duration:1000, timingFunction:'linear', ease: 'easeOutQuad', playbar:null, unit: 0}
  var propertyTwo = {name: 'fill', start: 'rgb(0,0,0)', end: 'rgb(101,21,255)', duration:2000, timingFunction:'linear', ease: 'easeInOutExpo', playbar:null, unit: 0}

//   var propertyOne = {name: 'font-size', start: '16px', end: '12px', duration:1000, timingFunction:'linear', ease: 'easeOutExpo', playbar:null, unit: 0}
   // var propertyTwo = {name: 'transform', start: 'translate3d(0px,0px,0px)', end: 'translate3d(0px,-36px,0px)', duration:1000, timingFunction:'linear', ease: 'easeOutBounce', playbar:null, unit: 0}
  // var propertyTwo = {name: 'opacity', start: '0.5', end: '1', duration:200, timingFunction:'ease-out', ease: 'easeInExpo', playbar:null, unit: 0}
  // var propertyThree = {name: 'fill', start: 'rgb(0,0,0)', end: 'rgb(101,21,255)', duration:2000, timingFunction:'linear', ease: 'easeInOutExpo', playbar:null, unit: 0}

  apc.properties = [propertyOne, propertyTwo];
  apc.showAllComponents = true;

  function endAnimationAndReverse(elem, post_style, callback) {

	  var endAnimCallback = function(e) {
		elem.style['webkitAnimation'] = post_style;
		if (callback) {
		  console.log('playing callback')
		  callback(window.getComputedStyle(elem)['webkitAnimation']);
		}
		elem.removeEventListener('webkitAnimationEnd', endAnimCallback);
	  }

	  elem.addEventListener('webkitAnimationEnd', endAnimCallback);

	  endAnimationAbrupt(elem, post_style)
  }

  function endAnimationAbrupt(elem, post_style) {
	var style = window.getComputedStyle(elem)['webkitAnimation'];
	var animationStr = style.split(', ');
	console.log(animationStr);
	animationStr.forEach(function(anim_str, i) {
	  var animStrSplit = anim_str.split(' ');
	  animStrSplit[3] = '-' + animStrSplit[1];
	  animationStr[i] = animStrSplit;
	})
	console.log(animationStr);
	if (animationStr.length === 8) {
	  elem.style['webkitAnimation'] = animationStr
	} else {
	  elem.style['webkitAnimation'] = animationStr.join(", ")
	}

	return style;
  }


  function pauseOne(property, cb) {
	property.player.timer.pause();
	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var playerStyle =window.getComputedStyle(property.player.playElement)['webkitAnimation'];
	apc.gPlayer.element.style['webkitAnimation'] = style.replace('running', 'paused');
	property.player.playElement.style['webkitAnimation'] = playerStyle.replace('running', 'paused');
	property.player.paused = true;
	property.player.reset = true;
	property.player.active = false;
  }


  function changeDirectionOne(property, direction) {
	var style = window.getComputedStyle(property.element)['webkitAnimation'];
	var playerStyle =window.getComputedStyle(property.player.playElement)['webkitAnimation'];
	var direction = direction || property.animation.direction;
	if (direction === 'normal') {
	  direction = 'reverse'
	} else {
	  direction = 'normal';
	}

	// var duration = durationMS * scale_by;
	// property.duration = duration;
	property.animation.direction = direction;
	if (! ('direction' in property)) {
	  property.direction = direction;
	}




	property.player.update(property, 'direction');
	var newAnimStr = recomputeGPlayerAnimation([property]);
	newAnimStr = UtilitiesService.replaceAll(newAnimStr, 'running', 'paused');
	property.element.style['webkitAnimation'] = newAnimStr;
	property.player.animation.str = UtilitiesService.replaceAll(property.player.animation.str, 'running', 'paused');
	property.player.playElement.style['webkitAnimation'] = property.player.animation.str;
	// console.log(recomputeGPlayerAnimation([property.player]))

  }

  function stepBackOne(property) {
  }

  function setSpeedAll(properties, scale_by) {
	properties.forEach(function(prop, i) {
	  setSpeedOne(prop, scale_by);
	})


	$timeout(function() {
	  var newAnimStr = recomputeGPlayerAnimation(apc.properties);
	  console.log(newAnimStr)
	  newAnimStr = UtilitiesService.replaceAll(newAnimStr, 'running', 'paused');

	  // pauseAll();
	  // resetAll();
	  var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation']
	  apc.gPlayer.element.style['webkitAnimation'] = style;

	})

  }


  function recomputeGPlayerAnimation(properties) {
	var animStrArr = [];
	for (var i = 0; i < properties.length; i++) {
	  var iProp = properties[i];
	  properties[i].animation.str = convertAnimPropObjToString(properties[i].animation);
	  properties[i].player.animation.str = convertAnimPropObjToString(properties[i].player.animation);
	  animStrArr.push(properties[i].animation.str)
	}
	return animStrArr.join(', ');

  }

  function setSpeedOne(property, scale_by) {

	var style = window.getComputedStyle(property.element)['webkitAnimation'];
	var playerStyle =window.getComputedStyle(property.player.playElement)['webkitAnimation'];
	var durationMS = property.duration;


	var duration = durationMS * scale_by;
	property.duration = duration;
	property.animation.duration = duration + 'ms';
	property.player.update(property, 'duration');


	apc.gPlayer.element.style['webkitAnimation'] = style.replace('paused', 'running');
	property.player.playElement.style['webkitAnimation'] = playerStyle.replace('paused', 'running');
	property.player.timer.resume()

  }

  function resetOne(property, cb) {
	// var tempoOffsetWidth = apc.gPlayer.element.style['offsetWidth']
	// var playerTempOffsetWidth = property.player.playElement.style['offsetWidth'];
	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var playerStyle = window.getComputedStyle(property.player.element)['webkitAnimation'];
	property.player.timer.reset();

	var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
	var newPausedPlayerStyle = UtilitiesService.replaceAll(playerStyle, 'running', 'paused');
	console.log('current:', style, 'reset:', newPausedStyle);

	apc.gPlayer.element.style['webkitAnimation'] = '';
	property.player.playElement.style['webkitAnimation'] = '';

	apc.gPlayer.element.style['offsetWidth'] = null;
	property.player.playElement.style['offsetWidth'] = null;

	property.player.element.style['webkitAnimation'] = newPausedStyle;
	property.player.playElement.style['webkitAnimation'] = newPausedPlayerStyle;


	cb && cb();
  }

  function resumeOne(property, cb) {
	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var playerStyle =window.getComputedStyle(property.player.playElement)['webkitAnimation'];
	apc.gPlayer.element.style['webkitAnimation'] = style.replace('paused', 'running');
	property.player.playElement.style['webkitAnimation'] = playerStyle.replace('paused', 'running');
	property.player.timer.resume();
  }



  function stepAll(properties, direction, cb) {
	var time = apc.gPlayer.defaults.stepTime;
	if (!direction) direction = '+';
	if (direction === '+') {
	  apc.gPlayer.play(properties);


	  // apc.gPlayer.element.style['webkitAnimation'] = style;
	  // property.player.playElement.style['webkitAnimation'] = animPlayerStr;
	  $timeout(function() {
		apc.gPlayer.pause(properties);
	  }, time)
	}

  }

  function stepOne(property, time, direction, cb) {
	if (!time) {
	  time = property.defaults.stepTime;
	} else {
	  time = parseInt(time);
	}
	if (!direction) direction = '+';
	var animationName = property.animation.name;

	var style = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var playerStyle = window.getComputedStyle(apc.gPlayer.element)['webkitAnimation'];
	var isAnimationInStyle = style.indexOf(animationName);
	var animStr;


	// its starting
	animPlayerStr = convertAnimPropObjToString(property.player.animation);
	if (isAnimationInStyle === -1) {
	  style = convertAnimPropObjToString(property.animation);
	}

	if (direction === '-') {
	  // apc.gPlayer.element.style['webkitAnimation'] = style.replace('normal', 'reverse');
	  // var originalTimer = property.player.timer.value;
	  // var delay = (property.duration - property.player.timer.value) * -1/1000

	  // var styleSplit = style.split('0s');
	  // var newStyle = styleSplit[0] + delay + 'ms' + styleSplit[1];
	  // newStyle = newStyle.replace('normal', 'reverse').replace('paused', 'running');
	  // console.log(apc.gPlayer.element.style['transform'])

	  var tweenable = new Tweenable();
	  var startDict = {};
	  var endDict = {};
	  startDict[property.animation.propName] = property.start;
	  endDict[property.animation.propName]  = property.end;
	  tweenable.tween({
		from: startDict,
		to:   endDict,
		duration: property.duration,
		easing: property.ease,
	  })

	  var tweenable = new Tweenable();
	  startDict[property.animation.propName] = property.start;
	  endDict[property.animation.propName]  = property.end;
	  tweenable.tween({
		from: startDict,
		to:   endDict,
		duration: property.duration,
		easing: property.ease,
		step: function () {property.element.style['webkitAnimation'] = '';property.element.style[property.animation.propName] = tweenable.get()[property.animation.propName] }
	  });

	  $timeout(function() {
		Tweenable.prototype.pause();
	  }, time);

	  // tweenable.resume()
	  // tweenable.seek(100);
	  // property.element.style['webkitAnimation'] = '';

	  // tweenable.resume()
	  // property.element.style.webkitTransition = 'transform 250ms linear'
	  // property.element.style.transform = tweenable.get().transform;
	  // apc.gPlayer.element.style['webkitAnimation'] = newStyle;
	  // $timeout(function() {
	  //   property.player.pause(property);
	  //   property.player.resetAnim(property, function() {

	  //     console.log('after resetting... setting animation to', style.replace('0s', '-' + (originalTimer - 100) + 'ms'))
	  //     $timeout(function() {
	  //       $scope.$apply();

	  //       apc.gPlayer.element.style['webkitAnimation'] = style.replace('0s', '-' + (originalTimer - 100) + 'ms').replace('running', 'paused');;
	  //     })
	  //   });

	  //   // var newStyle = styleSplit[0] + + updated_delay + 'ms' + styleSplit[1];
	  //   // console.log(newStyle);
	  //   // apc.gPlayer.element.style['webkitAnimation'] = newStyle.replace('running', 'paused').replace('reverse', 'normal')
	  // }, time);
	  // console.log(newStyle);


	  // property.
	  // changeDirectionOne(property, 'normal');
	  // $timeout(function() {
	  //   changeDirectionOne(property, 'normal');
	  // }, 100)


	} else {

	  UtilitiesService.replaceAll(style, 'paused', 'running');
	  UtilitiesService.replaceAll(animPlayerStr, 'paused', 'running');
	  property.player.play(property);
	  // apc.gPlayer.element.style['webkitAnimation'] = style;
	  // property.player.playElement.style['webkitAnimation'] = animPlayerStr;
	  $timeout(function() {
		property.player.pause(property);
	  }, time)

	}

  }

  function jumpAll() {

	// console.log(animStr);

	var styleSplit = style.split(animationName)
	var previousAnim = styleSplit[0] || '';
	var thisAnimSplit = styleSplit[1].split(', ');
	var remainingAnim = thisAnimSplit[1] && thisAnimSplit[1].join(", ") || '';
	console.log('previous:', previousAnim, '\n' + 'targetted:', thisAnimSplit, '\n' + 'remaining:', remainingAnim);
  }

  function changeDirection(property, direction) {
	var cb = function(current_str) {
	  current_str = current_str.split(property.direction).join(direction);
	  current_str.replace('paused', 'running');
	}
	return pauseOne(property, cb);
  }

  function jumpToForOne(property) {
	property.element['webkitAnimation'];
	var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
	var animStr = convertAnimPropObjToString(property.animation);
  }

  function playOne(property, cb_start, cb_end) {
	// property.player.startTime();
	property.player.timer.start();
	property.player.active = true;
	if (property.player.paused) {
	  property.player.paused = false;
	  property.player.reset = false;
	  resumeOne(property, cb_start);
	}
	var properties = ['Name', 'Duration',  'TimingFunction', 'Delay', 'IterationCount',  'Direction', 'FillMode', 'PlayState'];
	var animStrArr = [];
	var animStr = convertAnimPropObjToString(property.animation);
	var animPlayerStr = convertAnimPropObjToString(property.player.animation);


	if (!property.animation.listeners) property.animation.listeners = {};
	if (!property.animation.listeners.start) property.animation.listeners.start = getStartListener(property.element,cb_start);
	if (!property.animation.listeners.end) property.animation.listeners.end = getEndListener(property.element,cb_end, property);
	var endCallback = function(property) {
	  return function(e) {
		property.player.paused = false;
		property.player.reset = false;
		property.player.active = false;
		property.player.timer.reset();
		clearInterval(property.player.timer.interval);
		$timeout(function() {
		  $scope.$apply();
		})
	  }
	}

	property.animation.listeners = {
	  start: getStartListener(property.element),
	  end: getEndListener(property.element, endCallback(property), property)
	}

	property.player.animation.listeners = {
	  start: getStartListener(property.player.playElement, cb_end),
	  end: getEndListener(property.player.playElement, cb_end,property)
	}
	property.element.style['webkitAnimation'] =  animStr;

	property.player.playElement.style['webkitAnimation'] = animPlayerStr;

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
		  if (animation.listeners && animation.listeners.start) element.removeEventListener('webkitAnimationStart', animation.listeners.start)
		  if (animation.listeners && animation.listeners.end) element.removeEventListener('webkitAnimationEnd', animation.listeners.end)
		  animation.listeners = {
			start: getStartListener(element),
			end: getEndListener(element, cb_end, property)
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
	return function(property) {
	  var style = window.getComputedStyle(element)['webkitAnimation'];
	  var newPausedStyle = UtilitiesService.replaceAll(style, 'running', 'paused');
	  var tempoOffsetWidth = element.style['offsetWidth'] = null;
	  element.style['webkitAnimation'] = newPausedStyle;
	  element.style['webkitAnimation'] = '';
	  element.style['offsetWidth'] = null;
	  element.style['webkitAnimation'] = window.getComputedStyle(element)['webkitAnimation'];
	}
  }

   function getEndListener(element, cb, property) {
		  return element.addEventListener('webkitAnimationEnd', function(e) {
			cb && cb(e)
			if (property.fillMode === 'backwards') {
			  resetAnimation(element)();
			}
		  })
	}
	function getStartListener(element, cb) {
		return element.addEventListener('webkitAnimationStart', function(e) {
		  cb && cb(e)
		})
	}


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
  // $timeout(function() {
  //   playAnimation();
  //   apc.property.keyframes = convertAnimObjToKF(apc.property.animation);
  // })

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
	return {
	  dict: resultDict,
	  total: animation_arr.length,
	  sorted: resultArr
	}

  }

  function flattenResponseDict(_dict) {
	var result_arr = [];
	for (key in _dict.dir) {
	  for (childKey in _dict.dir[key]) {
		result_arr.push({url:
		  _dict.base_url + '/' + key  + '/' + _dict.dir[key][childKey].filename,
		  name: UtilitiesService.camelCase(childKey),
		  active: false
		});
	  }
	}
	return result_arr;
  }

  $timeout(function() {
	if ($state.current.name === 'root.dev.inspector') {



	  apc.components = flattenResponseDict($scope.templates.components);

	  $timeout(function() {


		$timeout(function() {
		  var elem = document.querySelector('.component-container');
		  if (elem && elem.children && elem.children.length) {
			for (var i = 0; i < elem.children.length; i++) {
			  var iElem = elem.children[i];
			  var eRect = iElem.getBoundingClientRect();
			  var scaleX = 150/eRect.width
			  var scaleY = scaleX * (75/eRect.height)
			  iElem.children[iElem.children.length - 1].style.transform = 'scale(' + scaleX + ',' + scaleY + ')';

			}
		  }

		}, 500);
		$timeout(function() {
		  initInspector();
		}, 1000)
	  })
	}

  }, 750)


  function initGlobalPlayer() {
	var gPlayerDefaults = {stepTime: 100};
	return {play: playAll, stepBack: stepAll, stepForward: stepAll, defaults: gPlayerDefaults,  pause: pauseAll, paused: false, resetAll: resetAll, element: null, resume: resumeAll};
  }



  function parseInspectorArgs(inspector) {
	var selector = inspector.select// || '[inspector-elem]'
	var preLoadElem = inspector.load;
	var activeIndex = 0;
	var loadType = 'components'
	if (preLoadElem) {
	  loadType = preLoadElem.split('|')[0];
	  elemName = preLoadElem.split('|')[1];
	} else {
	  elemName = ''
	}
	return {
	  selector: selector,
	  name: elemName,
	  nameCamel: elemName && UtilitiesService.camelCase(elemName)
	}
  }

  apc.switchComponent = function(index, comp) {
	apc.activeComponent.parentContainer.appendChild(apc.gPlayer.element);
	apc.inspector.name = comp.name
	 var className = apc.inspector.name + '-component';
	elem = document.querySelector('.'  + apc.inspector.name + '-component').firstChild;
	$compile(elem)($scope);
	var index = elem.className.split(className + '-').length > 1 &&  parseFloat(elem.className.split(className + '-')[1]);
	apc.components[index].active = true;
	apc.activeComponent = apc.components[index];
	apc.components[index].parentContainer = elem.parentNode
	var stage = document.querySelector('#player-stage')
	  stage.appendChild(elem);


	  apc.gPlayer.element = elem;

	  apc.showAllElems = true;
	  apc.showAllChildren = true;
	  apc.children = apc.getAnimatableElements(elem);
	  parsePropertiesAndPlay(apc.properties, elem);
	  apc.properties.forEach(function(p, i) {
		p.element = elem
	  })
	$timeout(function() {
	  $scope.$apply();

	})
  }


  apc.activeIndex = 0;
  function initInspector() {
	  apc.playAll = playAll;
	  apc.pauseAll = pauseAll;
	  apc.addProp = {searchText: '', propName: '', start: '', end: '', ease: '', duration: ''};
	  apc.gPlayer = initGlobalPlayer()
	  apc.settings = {showFPS:apc.fps, showKFBar: true}
	  apc.animationArr = getAllCSSAnimation();
	  apc.animProperties = TweenService.getAllAnimatable()
	  apc.stats = getCSSAnimationMetrics(apc.animationArr);


	  apc.inspector = parseInspectorArgs($scope.root.inspector)
	  if (apc.inspector.name && apc.inspector.name.length) {
		var className = apc.inspector.name + '-component';

		elem = document.querySelector('.'  + apc.inspector.name + '-component');
		var index = elem.className.split(className + '-').length > 1 &&  parseFloat(elem.className.split(className + '-')[1]);
		apc.components[index].active = true;
		apc.activeComponent = apc.components[index];
		apc.components[index].parentContainer = elem.parentNode
	  } else {
		elem = initElement(apc.inspector.selector || '[inspector-elem]');
	  }
	  // var selectedElem =

	  clonedElem = elem.cloneNode(true);
	  var stage = document.querySelector('#player-stage')
	  var globalElemContainer = document.querySelector('#global-player-elem-container');



	  stage && stage.appendChild(elem)
	  globalElemContainer && globalElemContainer.appendChild(clonedElem)
	  // elem.style.transform = '';
	  apc.gPlayer.element = elem;
	  apc.showAllElems = true;
	  apc.showAllChildren = true;
	  apc.children = apc.getAnimatableElements(elem);

	  if (apc.gPlayer.states && apc.gPlayer.states.length) {

		apc.gPlayer.activeState = apc.gPlayer.states[0];
		apc.activateState(apc.gPlayer.activeState, apc.gPlayer.element);
	  }


  }

  apc.activateState  = function(state, elem) {
	// if (!elem) {
	//   elem = apc.gPlayer.element;
	// }
	// apc.properties = [];
	// apc.gPlayer.activeState = state;

	// var propArr = [];

	// for (key in state.parsedArgs) {
	//   var iArg = key;

	//   if (iArg === 'prop' && state.parsedArgs[iArg].properties) {


	// 	for (key in state.parsedArgs[iArg].properties) {
	// 	  var propDict = {timingFunction:'linear', ease: 'easeOutQuad'};
	// 	  var obj = state.parsedArgs[iArg].properties[key];
	// 	  var extraArgs = obj.custom + ''
	// 	  // if ('custom' in obj) {
	// 	  //   delete obj['custom']
	// 	  // }

	// 	  var firstKey = Object.keys(obj)[0];
	// 	  var firstValue = obj[firstKey];

	// 	  if (firstKey.length && (firstValue + "").length && extraArgs.split(':').length > 0) {

	// 		// var iargPropSplit = state.parsedArgs[iArg].properties[key].split(':')
	// 		propDict['name'] = firstKey;
	// 		propDict['start'] = firstValue + "";
	// 		propDict['end'] = extraArgs.split(':')[0] + ""

	// 		propDict['duration'] = parseFloat(extraArgs.split(':')[1].replace('ms', ''));
	// 		if (extraArgs.length > 2) {
	// 		  propDict['ease'] = extraArgs.split(':')[2]
	// 		}
	// 		if (extraArgs.length > 3) {
	// 		  propDict['delay'] = extraArgs.split(':')[3];
	// 		}
	// 	  }
	// 	  propArr.push(propDict);
	// 	}

	//   }
	// }
	// apc.properties = propArr;
	// apc.properties.forEach(function(p, i) {
	// 	p.element = elem
	// })
	// $timeout(function() {

	//   parsePropertiesAndPlay(apc.properties, elem);
	// }, 750)

	// return apc.properties
  }

  function initElement(selector) {
	var elem = document.querySelector(selector);
	return elem
  }

  $timeout(function() {

	// initInspector()

  }, 1000)


}

])
