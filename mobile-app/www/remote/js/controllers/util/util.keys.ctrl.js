angular.module('uguru.util.controllers')

.controller('KeyToolController', [

	'$scope',
	'$state',
	'$stateParams',
	'$timeout',
	'$localstorage',
	'$interval',
	function($scope, $state, $stateParams, $timeout, $localstorage, $interval) {

		var keyboardSpec = {
			//toggle properties
		}

		$scope.player = initAnimationPlayer();
		$scope.timer = initAnimationTimer()
		$scope.layout = {index: 0};
		$scope.animationDirectionOptions = {options: ["normal", "reverse", "alternate", "alternate-reverse"], selectedIndex: 0, size: "small", onOptionClick: setAnimationDirectionFunc};
		$scope.animationTimingFunc = {options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "set-start", "step-end", "cubic"], selectedIndex: 0, size: "small", onOptionClick: setAnimationTimeFunc};
		$scope.animationFillMode = {options: ["forwards","none", "backwards", "both"], selectedIndex: 0, size:'small', onOptionClick:setAnimationFillMode};

		function setAnimationFillMode(option, index) {
			$scope.animation.attr.fill_mode = option;
		}

		function setAnimationDirectionFunc(option, index) {
			if (index === $scope.animationTimingFunc.options.length - 1) {
				option = "cubic-bezier(0.1, 0.7, 1.0, 0.1)";
			}
			$scope.animation.attr.timing_function = option;
		}

		function setAnimationTimeFunc(option, index) {
			$scope.animation.attr.direction = option;
		}


		$scope.setActiveKeyFrame = function(value) {
			var propertyDictCssMap = {'translateX': 'translateX', 'translateY': 'translateY', 'translateZ': 'translateZ', 'scale3DX': 'scaleX', 'scale3DY': 'scaleY', 'skewX':'skewX', 'skewY': 'skewY', 'rotate3DZ':'rotateZ', 'rotate3DY': 'rotateY', 'rotate3DX': 'rotateX', 'rotate3DAngle': 'rotate'};
			var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': '%', 'scale3DX': '', 'scale3DY': '', 'skewX':'deg', 'skewY': 'deg', 'rotate3DZ':'deg', 'rotate3DY': 'deg', 'rotate3DX': 'deg', 'rotate3DAngle': 'deg'};
			var oldValue = $scope.animation.selected_index;
			var newValue = parseInt(value);
			console.log('going from', oldValue, 'to', newValue);
			$scope.animation.selected_index = parseInt(value);
			$scope.animation.flex_selected_index = parseInt(value);

			//going backwards
			//for each property, check the last one it was edited, apply it to that
			//
			var currentPropertiesModified = Object.keys($scope.animation.selected_keyframe.modified);
			var cssToChange;
			if (true) {
				var transformProperties = Object.keys(propertyDictCssMap);
				var nonTransformProperties = ['opacity'];
				var cssToChange = {transform: {}, etc: {}};
				for (var i = 0; i < currentPropertiesModified.length; i++) {
					var indexPropertyName = currentPropertiesModified[i]
					console.log('traversing all keyframes from t=0 to t=', newValue - 1, 'to search for the last ', indexPropertyName, 'edit, if it exists');
					for (var j = 0; j < newValue + 1; j++) {
						console.log('checking t=', j, 'for traces of', indexPropertyName);
						var previousIndexPercentValue = getNthSortedKeyText($scope.animation.obj, j);
						var previousIndexProperty = $scope.animation.properties[previousIndexPercentValue + '%'];
						var previousPropertyModifiedKeys = Object.keys(previousIndexProperty.modified);
						if (previousPropertyModifiedKeys.indexOf(indexPropertyName) > -1) {
							if (indexPropertyName in propertyDictCssMap) {
								var cssVar = propertyDictCssMap[indexPropertyName];
								var cssUnit = propertyDictCssUnit[indexPropertyName];
								cssToChange.transform[propertyDictCssMap[indexPropertyName]] = '(' + previousIndexProperty[indexPropertyName] + cssUnit + ')';
							} else {
								cssVar = indexPropertyName;
								cssValue = previousIndexProperty[indexPropertyName];
								var cssUnit = '';
								cssToChange.etc[cssVar] = cssValue;
							}

							console.log('setting', cssVar, 'at t=', j, 'from', $scope.animation.selected_keyframe[indexPropertyName] + cssUnit, 'to', previousIndexProperty[indexPropertyName] + cssUnit);
						}
					}

				}
				if (cssToChange && Object.keys(cssToChange.transform).length) {
					// var transformCSStoChange = cssToChange.transform.join(" ");
					var transformProperties = Object.keys(cssToChange.transform);
					var transformCSStoChange ="";
					for (var i = 0; i < transformProperties.length; i++) {
						var indexTransformProperty = transformProperties[i];
						var indexTransformValue = cssToChange.transform[indexTransformProperty];
						transformCSStoChange += indexTransformProperty  + indexTransformValue;
					}
					console.log(transformCSStoChange)
					$scope.actor.style['transform'] = transformCSStoChange;
					$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
				}
				if (cssToChange && Object.keys(cssToChange.etc).length) {
					var nonTransformProperties = Object.keys(cssToChange.etc);
					for (var i = 0 ; i < nonTransformProperties.length; i++) {
						var indexProperty = nonTransformProperties[i];
						var indexValue = cssToChange.etc[indexProperty];
						console.log('setting', indexProperty, 'to', indexValue);
						$scope.actor.style[indexProperty] = indexValue;
					}
				}
			}

			//leave it & override all the new ones
			//for each property, check the last one it was edited, apply it to that

			//clear all values;
			var percentValue = getNthSortedKeyText($scope.animation.obj, value);
			var proposedKeyframe = $scope.animation.properties[percentValue + '%'];
			$scope.animation.selected_keyframe = proposedKeyframe;

			console.log('keyframe', proposedKeyframe.modified);

			if (false) {
				var transformProperties = Object.keys(propertyDictCssMap);
				var nonTransformProperties = ['opacity'];
				var cssToChange = {transform: [], etc: {}};
				var newPropertiesToModify = Object.keys($scope.animation.selected_keyframe.modified);

				for(var i = 0; i < newPropertiesToModify.length; i++) {
					var indexPropertyName = newPropertiesToModify[i];

					var propertyValue = $scope.animation.selected_keyframe[indexPropertyName]

					if (indexPropertyName in propertyDictCssMap) {
						var cssVar = propertyDictCssMap[indexPropertyName];
						var cssUnit = propertyDictCssUnit[indexPropertyName];
						cssToChange.transform.push(propertyDictCssMap[indexPropertyName] + '(' + propertyValue + cssUnit + ')');
					} else {
						cssVar = indexPropertyName;
						cssValue = newPropertiesToModify[indexPropertyName];
						var cssUnit = '';
						cssToChange.etc[cssVar] = cssValue;
					}
				}

				if (cssToChange && cssToChange.transform.length) {
						var transformCSStoChange = cssToChange.transform.join(" ");
						console.log('transform css to change', transformCSStoChange);
						$scope.actor.style['transform'] = transformCSStoChange;
						$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
					}
				if (cssToChange && Object.keys(cssToChange.etc).length) {
					var nonTransformProperties = Object.keys(cssToChange.etc);
					for (var i = 0 ; i < nonTransformProperties.length; i++) {
						var indexProperty = nonTransformProperties[i];
						var indexValue = cssToChange.etc[indexProperty];
						console.log('setting', indexProperty, 'to', indexValue);
						$scope.actor.style[indexProperty] = indexValue;
					}
				}

			}

			$timeout(function() {
				$scope.$apply();
			})
		}

		$scope.movePropertiesToKeyframeIndex = function(index) {
			console.log('proposing to move to keyframe index', index);
		}

		function initAnimationTimer() {


			function timerSetDuration(timer, time) {
				timer.duration = time;
			}

			function startTimer(timer, duration) {
				if (duration && duration.indexOf('s') > -1) {
					duration = parseInt(duration.replace('s', ''));
				}
				timer.time = 0;
				timer.duration = duration || 5;
				$scope.player.currentFrame = 0;
				timer.promise = $interval(function() {
					if (timer.time < timer.duration) {
						timer.time += 1
						console.log('current time into animation is', timer.time);
						updateFramesIfNecessary(timer.time);
					} else {
						resetTimer(timer);
					}
				}, 1000);
			}

			function resumeTimer(timer) {
				$interval.cancel(timer.promise);
				timer.promise = $interval(function() {
					if (timer.time < timer.duration) {
						timer.time += 1
						console.log('current time into animation is', timer.time);
						updateFramesIfNecessary(timer.time);
					} else {
						resetTimer(timer);
					}
				}, 1000);
			}

			function updateFramesIfNecessary(time_s, duration, num_keyframes) {
				return;
			}

			function pauseTimer(timer) {

				$interval.cancel(timer.promise);
				timer.paused = true;

			}

			function resetTimer(timer) {
				timer.time = null;
				timer.paused = null;
				if (timer.promise) {
					$interval.cancel(timer.promise);
					timer.promise = null;

				}
			}

			return {
				setDuration: timerSetDuration,
				promise: null,
				start: startTimer,
				resume: resumeTimer,
				pause: pauseTimer,
				reset: resetTimer,
				time: null,
				duration: 5,
			}

		}

		function initAnimationPlayer() {
			return {
				play: playElemAnimation,
				set: setAnimProperty,
				status: 0,
				settings: false,
				toggleSettings: toggleSettings,
				pause: pauseDanceMoveElem,
				reset: resetDanceMoveElem,
				resume: resumeDanceMoveElem,
				replay: resetDanceMoveElem,
				currentFrame: 0,
				setMode: {
					options: [{name: "fast", speed: 250}, {name: "medium", speed:1000}, {name: "slow", "speed": 2000}],
					selectedIndex: 0
				}
			}

			function toggleSettings() {
				$scope.player.settings = !$scope.player.settings;
			}

			function playElemAnimation(player, elem, anim_name) {



				elem = elem || $scope.actor;
				player = player || $scope.player;
				anim_name = $scope.animationNames;


				elem.style.webkitAnimationDuration = $scope.animation.attr.duration;

				elem.style[browserPrefix + "AnimationName"] = $scope.animationName

				if (!$scope.timer.paused) {
					$scope.timer.start($scope.timer, $scope.animation.attr.duration);
				}

				if (!player.status) {
					player.status = 1;

				}
				else if (player.status === 1) {
					return
				}
				else if (player.status === 2) {
					resumeDanceMoveElem(player, elem, browserPrefix);
				}
			}

			function pauseDanceMoveElem(player, elem) {
				elem = elem || $scope.actor;
				player = player || $scope.player;
				$scope.timer.pause($scope.timer);
				player.status = 2;
				anim_name = $scope.animation.attr.name;
				elem.style[browserPrefix + "AnimationPlayState"]="paused";
			}


			function resumeDanceMoveElem(player, elem) {
				elem = elem || $scope.actor;
				player.status = 1;
				$scope.timer.resume($scope.timer);
				elem.style[browserPrefix + "AnimationPlayState"] ="running";
			}

			function resetDanceMoveElem(player, elem, replay) {
				elem = elem || $scope.actor;
				player = player || $scope.player;
				anim_name = $scope.animation.attr.name;
				elem.style[browserPrefix + "AnimationName"] = null;
				elem.offsetWidth = elem.offsetWidth;
				$scope.timer.reset($scope.timer);
			}
		}

		function playDanceMoves(elem, dance_moves) {
			for (var i = 0; i < dance_moves.length; i++) {
				console.log('playing dance move #', i + 1);
				var indexDanceMove = dance_moves[i]
				execDanceMove(elem, indexDanceMove);
			}
		}

		function setAnimProperty(elem, property, val) {

		}

		function execDanceMove(elem, dance_obj) {
			console.log(dance_obj);
			var animKeys = Object.keys(dance_obj);
			for (var i = 0; i < animKeys.length; i++) {
				var indexProperty = animKeys[i];
				if (browserPrefix && browserPrefix.length) {
					indexProperty = indexProperty[0].toUpperCase() + indexProperty.slice(1);
				}
				var elemStyleProperty = browserPrefix + indexProperty;
				var perspective = "perspective("+dance_obj.transformPerspective +"%) ";
				var translate = "translate3d("+dance_obj.translateX+"%, "+dance_obj.translateY+"%, "+dance_obj.translateZ+"%) ";
				var scale = "scale3d("+dance_obj.scale3DX+", "+dance_obj.scale3DY+", "+dance_obj.scale3DZ+") ";
				var rotate = "rotate3d("+dance_obj.rotate3DX+", "+dance_obj.rotate3DY+", "+dance_obj.rotate3DZ+", "+dance_obj.rotate3DAngle+"deg)";
				var origin = dance_obj.originX+"% "+dance_obj.originY+"%"+" "+dance_obj.originZ+"%";
				var csstext = browserPrefix + "transform: "+perspective+translate +scale + rotate + "; "
					+ browserPrefix + "transform-origin: " + origin + "; "
					+ browserPrefix + "transform-style: " + dance_obj.transformStyle+";"
					+ "transform: "+perspective+translate +scale + rotate + "; "
					+ "transform-origin: " + origin + "; ";
					+ "transform-style: " + dance_obj.transformStyle+";";

				elem.style.cssText = elem.style.cssText + csstext;
			}
		}

		var transformObjToCssText = function(dance_obj, property) {
			var unit ='%';
			var perspective = "perspective("+dance_obj.transformPerspective +"%) ";
			var translate = "translate3d("+dance_obj.translateX+"%, "+dance_obj.translateY+"%, "+dance_obj.translateZ+"%) ";
			var scale = "scale3d("+dance_obj.scale3DX+", "+dance_obj.scale3DY+", "+dance_obj.scale3DZ+") ";
			var rotate = "rotate3d("+dance_obj.rotate3DX+", "+dance_obj.rotate3DY+", "+dance_obj.rotate3DZ+", "+dance_obj.rotate3DAngle+"deg)";
			var origin = dance_obj.originX+"% "+dance_obj.originY+"%"+" "+dance_obj.originZ+"%";

			var backgroundColor = dance_obj.backgroundColor || '#ffffff';
			var color = dance_obj.color || "#ffffff";
			var fill = dance_obj.fill || '#ffffff';
			var opacity = dance_obj.opacity || 1.0;
			var strokeOpacity = dance_obj.strokeOpacity || 1.0;
			var strokeWidth = dance_obj.strokeWidth || 1.0;
			var strokeDashArray = dance_obj.strokeDashArray || 1.0;
			var strokeDashOffset = dance_obj.strokeDashOffset || 1.0;

			// property = "skewY";
			// dance_obj.skewY = 10;
			if (property) {
				dance_obj.modified[property] = dance_obj[property];
			}

			// var _csstext =  'transform: skew(' + (dance_obj.skewX || 0)+ 'deg, ' + (dance_obj.skewY || 0) +'deg) rotate3d(' + dance_obj.rotate3DX +', ' + dance_obj.rotate3DY + ', ' + dance_obj.rotate3DZ + ', ' + (dance_obj.rotate3DAngle || 30) + 'deg) scale(' + (dance_obj.scale3DX || 1.0 )  + ', ' + (dance_obj.scale3DY || 1.0) + ')  translate3d(' + (dance_obj.translateX || 0) + unit + ', ' + (dance_obj.translateY || 0) +unit + ', ' + (dance_obj.translateZ || 0) + 'px);'
			csstext ="";
			// console.log(Object.keys(dance_obj.modified));
			var modifiedPropertyKeys = Object.keys(dance_obj.modified);
			for (var i = 0; i < modifiedPropertyKeys.length; i++) {

				var indexProperty = modifiedPropertyKeys[i];
				var transformProperties = ["translateX", "translateY", "translateZ", "scale3DX", "scale3DY", "scale3DZ", "rotate3DAngle", "rotate3DX", "rotate3DY", "rotate3DZ", "skewX", "skewY"]
				if (transformProperties.indexOf(indexProperty) > -1) {
					switch(indexProperty) {
						case "translateX":
							csstext += 'translateX(' + dance_obj.translateX  + unit + ') '
							break;
						case "translateY":
							csstext += 'translateY(' + dance_obj.translateY  + unit + ') '
							break;
						case "translateZ":
							csstext += 'translateZ(' + dance_obj.translateZ  + unit + ') '
							break;
						case "scale3DX":
							csstext += 'scaleX(' + dance_obj.scale3DX  + ') '
							break
						case "scale3DY":
							csstext += 'scaleY(' + dance_obj.scale3DY  + ') '
							break
						case "scale3DZ":
							csstext += 'scaleZ(' + dance_obj.scale3DZ   + ') '
							break;
						case "skewX":
							csstext += 'skewX(' + dance_obj.skewX   + 'deg) '
							break;
						case "skewY":
							csstext += 'skewX(' + dance_obj.skewY   + 'deg) '
							break;
						case "rotate3DX":
							csstext += 'rotateX(' + dance_obj.rotate3DX  + 'deg) '
							break;
						case "rotate3DY":
							csstext += 'rotateY(' + dance_obj.rotate3DY  + 'deg) '
							break;
						case "rotate3DZ":
							csstext += 'rotateZ(' + dance_obj.rotate3DZ  + 'deg) '
							break;
						case "rotate3DAngle":
							csstext += 'rotate3d(' +(dance_obj.rotate3DX || 0) + ", "+ (dance_obj.rotate3DY||0)+", "+(dance_obj.rotate3DZ ||0)+", "+dance_obj.rotate3DAngle+"deg) "
							break;
					}
				}

			}
			if (csstext.length) {
				csstext = "transform: " + csstext + ';'
			}
			console.log(csstext);

			var nonTransformProperties = ['opacity']
			for (var i = 0; i < nonTransformProperties.length; i++) {
				var indexProperty = nonTransformProperties[i];
				if (indexProperty === 'opacity' && typeof(dance_obj.opacity) === "number") {
					csstext += ('opacity:' + dance_obj.opacity + ';')
				}
			}

			//@gabrielle-note
			// csstext = 'color:' + (color) + '; fill: ' + (fill) + '; stroke-width: ' + (strokeWidth) + ';stroke-dasharray:' + (strokeDashArray) + '; stroke-opacity:' + (strokeOpacity)+ '; stroke-dashoffset:' + (strokeDashOffset) + ';background-color:' + (backgroundColor) + ';' + csstext;
			// var csstext = browserPrefix + "-transform: "+perspective+translate +scale + rotate + "; "
			// 	+ browserPrefix + "-transform-origin: " + origin + "; "
			// 	+ browserPrefix + "-transform-style: " + dance_obj.transformStyle+";"
			// 	+ "transform: "+perspective+translate +scale + rotate + "; "
			// 	+ "transform-origin: " + origin + "; ";
			// 	+ "transform-style: " + dance_obj.transformStyle+";";
			return csstext
		}

		//key spec
		//space - play
		//ctrl + left, go back a time state
		//ctrl + right arrow
		// NOTE: The change to red signifies the start of

		//todo apply a matrix transform


		//TODO import all webkit related animation results
		//TODO -->
		function findKeyframesRule(rule) {
		    var ss = document.styleSheets;
		    for (var i = 0; i < ss.length; ++i) {
		        for (var j = 0; j < ss[i].cssRules.length; ++j) {
		            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
		        }
		    }
		    return null;
		}

		function initAnimation(anim_name, browserPrefix, num_keyframes, duration) {
			num_keyframes = num_keyframes || 100;
			duration = (duration || 5) + 's';
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
			var anim = lastSheet.cssRules[indexOfRuleInSheet];
			initKFWithXInterval(anim, num_keyframes);
			var properties = initDictWithXProperties(anim)
			var attr = {
				name: anim_name,
				play_state: "running",
				delay: 0,
				direction: "normal",
				iteration_count: 1,
				timing_function: "ease",
				duration: duration,
				durationVal: parseInt(duration.replace('s')),
				fill_mode: null
			}
			return {obj: anim,  properties: properties, kf_count: num_keyframes, attr:attr};
		}



		function initArrWithXProperties(num_frames) {
			var result_arr = [];
			for (var i = 0; i < num_frames; i++) {
				result_arr.push(transformPropertiesObj())
			}
			return result_arr
		}

		function initDictWithXProperties(anim) {
			var resultDict = {};
			var keyTextPercentArray = [];
			for (var i = 0; i < anim.cssRules.length; i++) {
				var indexRule = anim.cssRules.item(i);
				if (indexRule && indexRule.keyText) {
					keyTextPercentArray.push(indexRule.keyText);
				}
			}
			for (var i = 0; i < keyTextPercentArray.length; i++) {
				var currentFramePercent = keyTextPercentArray[i];
				resultDict[currentFramePercent]  =  transformPropertiesObj()
			}
			console.log(resultDict);
			return resultDict
		}

		function initKFWithXInterval(anim, max_bound) {
			var scaling_value = 100.0 / max_bound;
			for (var i = 0; i < max_bound + 1; i++) {
				addKFRule(anim,  (i*1.0 * scaling_value), {}, browserPrefix, i);
			}
		}

		function insertPropertiesAtXKF(anim, property_dict, browserPrefix) {
			return;
		}

		function getNthSortedKeyText(anim, index) {
				var keyTexts = [];
				for (var i = 0; i < anim.cssRules.length; i++) {
					var cssIndexKFRule = anim.cssRules.item(i);
					if (cssIndexKFRule) {
						var keyText = cssIndexKFRule.keyText;
						keyTexts.push(parseFloat(keyText.replace('%')));
					}
				}
				keyTexts.sort(function(a, b) {
					return b - a;
				});
				return keyTexts.reverse()[index]
				// anim.cssRules.item(index)
			}


		function addKFRule(anim, percentage, property_dict, browserPrefix, index) {
			var property_keys = Object.keys(property_dict);
			var result_property_str = '';
			for (var i = 0; i < property_keys.length; i++) {
				var indexProperty = property_keys[i];
				var indexValue = property_dict[indexProperty];
				result_property_str += indexProperty + ":" + indexValue + ";";

			}

			anim.appendRule(percentage + "% {" + result_property_str + " }", index);
		}

		$scope.applyPropertyChange = function(value, property) {
			//set
			// $timeout(function() {

			var convertToIntProperties = ['opacity'];

			if (convertToIntProperties.indexOf(property) > -1) {
				value = parseFloat(value);
			}




			var desiredIndex = getNthSortedKeyText($scope.animation.obj, $scope.animation.selected_index);
			console.log('about to apply property change', value, property, desiredIndex);
			editKeyframeAtX($scope.animation, desiredIndex, property, value);
			console.log($scope.animation.obj.cssRules);
			// }, 500)
			// var cssRuleAtKeyFrameX = findCSSRuleByIndex($scope.animation.obj, value);
			// var transformObjAtX = $scope.animation.selected_keyframe;
			// console.log('value of ' + property, 'set to', parseInt(value));
			// transformObjAtX[property] = value;

			// cssRuleAtKeyFrameX.style[browserPrefix + 'Transform'] = transformObjToCssText(transformObjAtX);
			// cssRuleAtKeyFrameX.style['transform'] = transformObjToCssText(transformObjAtX);


			// $scope.animation.obj.deleteRule(parseInt(value) + '%');
			// $scope.animation.obj.appendRule(parseInt(value) + '% {' + transformObjToCssText(transformObjAtX) + '}');
			// console.log($scope.animation.obj.cssRules);
			// console.log('exact rule', $scope.animation.obj.findRule(value), value, property);

		}

		function findCSSRuleByIndex(anim, index) {
			console.log('attempt 1', anim.cssRules.item(index));
			return anim.cssRules[index];
		}

		function readAndInjectKeyFrames(anim, keyframe_rules) {

		}

		function getBaseTransformDict() {
			return {

			}
		}

		function sampleStrobeKFObj() {
			var anim = initAnimation("strobe", browserPrefix, $scope.animationKeyFrames);
			var property_dict_1 = transformPropertiesObj();
			var property_dict_2 = transformPropertiesObj();


			//dictionary 1
			property_dict_1.opacity = 0;


			//dictionary 2
			property_dict_2.opacity = 1;
			property_dict_1["background-color"] = '#ffffff'
			property_dict_2["background-color"] = '#FF0000'



			var rulesLength = anim.cssRules.length;
			var properties = [];


			for (var i = 0 ; i < rulesLength + 1; i++) {
				var indexProperty = (i % 2)  ? property_dict_1 : property_dict_2 ;



				if (i === 50) {
					property_dict_2["transform"] = 'translateX(100px)'
				}


				addKFRule(anim, i, indexProperty, browserPrefix, i);

				properties.push(indexProperty);
			}

			return {obj: anim, properties: properties};
		}


		//guis to create
		// slider - num animation keyframes
		$scope.animationCache = $localstorage.getObject('saved_animations') || [];

		$scope.animDurationChange = function(value) {
			$scope.animation.attr.duration = value + 's';
		}

		$scope.selectAnimation = function(animation) {
			$scope.animation.obj = findKeyframesRule(animation);
			console.log($scope.animation.obj.cssText);
		}

		function editKeyframeAtX(anim, keyframe_percent, property, value, clear_css_text) {

			var percentage = keyframe_percent + '%'
			anim.obj.deleteRule(percentage);
			transformObj = anim.properties[percentage];
			transformObj.edited = true;
			transformObj[property] = value;




			if (!clear_css_text) {
				var css_text = transformObjToCssText(transformObj, property);
				anim.obj.appendRule(percentage + '{' +  css_text + '}', keyframe_percent);
			} else {
				var css_text = transformObjToCssText(transformObj, property);
				var css_text = " ";
				anim.obj.appendRule(percentage + '{' + css_text +  '}', keyframe_percent);
			}

			// css_text = css_text.replace('transform:', '').replace(';', '');
			// $scope.actor.style[browserPrefix + 'Transform'] = css_text;
			// $scope.actor.style['transform'] = css_text;
			// $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
			// $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
			var propertyDictCssMap = {'translateX': 'translateX', 'translateY': 'translateY', 'translateZ': 'translateZ', 'scale3DX': 'scaleX', 'scale3DY': 'scaleY', 'skewX':'skewX', 'skewY': 'skewY', 'rotate3DZ':'rotateZ', 'rotate3DY': 'rotateY', 'rotate3DX': 'rotateX', 'rotate3DAngle': 'rotate'};
			var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': '%', 'scale3DX': '', 'scale3DY': '', 'skewX':'deg', 'skewY': 'deg', 'rotate3DZ':'deg', 'rotate3DY': 'deg', 'rotate3DX': 'deg', 'rotate3DAngle': 'deg'};
			var transformProperties = Object.keys(propertyDictCssMap);
			var nonTransformProperties = ['opacity'];
			var cssToChange = {transform: {}, etc: {}};
			var newPropertiesToModify = Object.keys($scope.animation.selected_keyframe.modified);

			for(var i = 0; i < newPropertiesToModify.length; i++) {
				var indexPropertyName = newPropertiesToModify[i];

				var propertyValue = $scope.animation.selected_keyframe[indexPropertyName]

				if (indexPropertyName in propertyDictCssMap) {
					var cssVar = propertyDictCssMap[indexPropertyName];
					var cssUnit = propertyDictCssUnit[indexPropertyName];
					cssToChange.transform[propertyDictCssMap[indexPropertyName]] = '(' + propertyValue + cssUnit + ')';
				} else {
					cssVar = indexPropertyName;
					cssValue = newPropertiesToModify[indexPropertyName];
					var cssUnit = '';
					cssToChange.etc[cssVar] = cssValue;
				}
			}
			if (cssToChange && Object.keys(cssToChange.transform).length) {
				// var transformCSStoChange = cssToChange.transform.join(" ");
				var transformProperties = Object.keys(cssToChange.transform);
				var transformCSStoChange ="";
				for (var i = 0; i < transformProperties.length; i++) {
					var indexTransformProperty = transformProperties[i];
					var indexTransformValue = cssToChange.transform[indexTransformProperty];
					transformCSStoChange += indexTransformProperty  + indexTransformValue;
				}
				console.log(transformCSStoChange)
				$scope.actor.style['transform'] = transformCSStoChange;
				$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
			}
			// if (cssToChange && cssToChange.transform.length) {
			// 		var transformCSStoChange = cssToChange.transform.join(" ");
			// 		console.log('transform css to change', transformCSStoChange);
			// 		$scope.actor.style['transform'] = transformCSStoChange;
			// 		$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
			// 	}
			if (cssToChange && Object.keys(cssToChange.etc).length) {
				var nonTransformProperties = Object.keys(cssToChange.etc);
				for (var i = 0 ; i < nonTransformProperties.length; i++) {
					var indexProperty = nonTransformProperties[i];
					var indexValue = cssToChange.etc[indexProperty];
					console.log('setting', indexProperty, 'to', indexValue);
					$scope.actor.style[indexProperty] = indexValue;
				}
			}

			return;
		}


		$scope.actor = document.querySelector('#rect-svg');

		//todo find all keyframes
		// var keyFrameRule = findKeyframesRule('bounceInUp');




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

		function cloneTransformPropertiesObj(anim_obj) {
			var emptyTransformObj = transformPropertiesObj();
			var transformObjCloneKeys = Object.keys(anim_obj);
			for (var i = 0; i < transformObjCloneKeys.length; i++) {
				var propertyIndex = transformObjCloneKeys[i];
				emptyTransformObj[propertyIndex] = anim_obj[propertyIndex];
				console.log('copying', propertyIndex);
			}
			return emptyTransformObj;
		}


		function transformPropertiesObj(actor) {
			var transformObj = function()
			{
				this.transformPerspective = 0;
				this.translateX = 0;
				this.translateY = 0;
				this.translateZ = 0;
				this.scale3DX = 1;
				this.scale3DY = 1;
				this.scale3DZ = 1;
				this.skewX = 0;
				this.skewY = 0;
				this.rotate3DX = 0;
				this.rotate3DY = 0;
				this.rotate3DZ = 0;
				this.rotate3DAngle = 0;
				this.originX = 50;
				this.originY = 50;
				this.originZ = 50;
				this.opacity = 1;
				this.edited = false;
				this.modified = {};
				// this.backgroundColor = null;
				// this.color = null;
				// this.fill = null;
				// this.fillOpacity = null;
				// this.stroke = null;
				// this.strokeWidth = null;
				// this.strokeDashArray = null;
				// this.strokeDashOffset = null;
				// this.strokeOpacity = null;
				this.transformStyle = "preserve-3d";

			};
			return new transformObj();
		}

		$scope.resetKFByIndex = function(kf_index) {
			if (confirm('are you sure? all current properties will be wiped out')) {
				var newTransformObj = transformPropertiesObj();
				var percentIndex = getNthSortedKeyText($scope.animation.obj, parseInt(kf_index));

				var propertiesModified = $scope.animation.selected_keyframe.modified;
				$scope.animation.selected_keyframe = newTransformObj;
				$scope.animation.properties[percentIndex + '%'] = $scope.animation.selected_keyframe;


				var propertiesInitiallyModified = Object.keys(propertiesModified);

				for(var i = 0; i < propertiesInitiallyModified.length; i++) {
					var indexProperty = propertiesInitiallyModified[i];
					editKeyframeAtX($scope.animation, percentIndex, indexProperty, $scope.animation.selected_keyframe[indexProperty]);
				}
				$scope.animation.selected_keyframe.modified = {};


				console.log($scope.animation.obj.cssRules)

			}
		}

		$scope.applyCurrentKFtoAnother = function(kf_index) {
			if (parseInt(kf_index) !== $scope.animation.selected_index) {
				if (confirm('are you sure? any properties @ T = ' + kf_index + ' will be overridden')) {
					var clonedTransformObj = cloneTransformPropertiesObj($scope.animation.selected_keyframe);
					var percentIndex = getNthSortedKeyText($scope.animation.obj, parseInt(kf_index));
					$scope.animation.properties[percentIndex + '%'] = clonedTransformObj;
					var propertiesModified = $scope.animation.properties[percentIndex + '%'].modified;
					var propertiesModifiedList = Object.keys(propertiesModified);
					if (propertiesModifiedList && propertiesModifiedList.length) {
						console.log('applying properties from t=', $scope.animation.selected_index, 'to kf percentage:', percentIndex, propertiesModifiedList)
						for(var i = 0; i < propertiesModifiedList.length; i++) {
							var indexProperty = propertiesModifiedList[i];
							editKeyframeAtX($scope.animation, percentIndex, indexProperty, propertiesModified[indexProperty]);
						}
					}
				}
			}
		}

		function initDanceMove(actor) {
			var defaultDanceMove = function()
			{
				this.domElem = actor || "";
				this.transformPerspective = 0;
				this.translateX = 0;
				this.translateY = 0;
				this.translateZ = 0;
				this.scale3DX = 1;
				this.scale3DY = 1;
				this.scale3DZ = 1;
				this.rotate3DX = 0;
				this.rotate3DY = 0;
				this.rotate3DZ = 0;
				this.rotate3DAngle = 0;
				this.originX = 50;
				this.originY = 50;
				this.originZ = 50;
				this.transformStyle = "preserve-3d";
				this.kf_obj = null;
				this.kf_rules = [];
				this.kf_rule_cache = {};
			};
			return new defaultDanceMove();
		}

		function initKeyboardListeners() {
			document.addEventListener('keydown', danceShortCutKeys);

			function danceShortCutKeys(e) {
				if (e.keyCode === 32)  {
					playDanceMoves($scope.actor, $scope.danceMoves);
				}

				if (e.keyCode === 82)  {
					$scope.actor.style[browserPrefix + 'Transform'] = '';
				}
			}
		}

		//TODO
		// - previous transform state should be detected

		// - show the 50px
		// - when it goes to the next move, how do I see
		// - i cant see where i'm at

		function initAll() {
			initView()
			initKeyboardListeners();
		}

		function initView() {
			browserPrefix = getBrowserPrefix();

			$scope.actor = document.querySelector('#rect-svg');
			$scope.actor.classList.add('animated');
			$scope.animationKeyFrames = 100;

			var actor = $scope.actor;
			var player = $scope.player;
			if ($scope.user) {
				$scope.animationName = $scope.user.name.split(' ')[0].toLowerCase() + '-sample';
			} else {
				$scope.animationName = 'animation-name'
			}

			$scope.animation = initAnimation($scope.animationName, browserPrefix, 100, 5);

			//sets translateX of keyframe



			// $scope.animation.obj.deleteRule('0%');
			// $scope.animation.obj.deleteRule('5%');
			console.log('modified animation', $scope.animation.obj.cssRules.length, $scope.animation.obj.cssText);
			// $localstorage.setObject('saved_animations', [$scope.animation]);

			$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
			$scope.animation.selected_index = 0;
			$scope.animation.flex_selected_index = 0;

			console.log('initializd animation', $scope.animation);
			editKeyframeAtX($scope.animation, 0, 'translateX', 10)


		}

		var browserPrefix;
		$timeout(function() {
			initAll();
		}, 2000)

	}

]);