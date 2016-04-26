angular.module('uguru.util.controllers')

.controller('KeyToolController', [

	'$scope',
	'$state',
	'$stateParams',
	'$timeout',
	'$localstorage',
	'$interval',
	'FileService',
	'LoadingService',
	'KeyboardService',
	'$compile',
	function($scope, $state, $stateParams, $timeout, $localstorage, $interval, FileService, LoadingService, KeyboardService, $compile) {

		var defaults = {
			KF_COUNT: 100,
			DURATION: 5,
			KF_INTERVALS:5
		}

		$scope.player = initAnimationPlayer();
		$scope.timer = initAnimationTimer()
		$scope.animationDict = {importTextarea:'', importInput: ''};
		$scope.layout = {index: 0};
		$scope.animationDirectionOptions = {options: ["normal", "reverse", "alternate", "alternate-reverse"], selectedIndex: 0, size: "small", onOptionClick: setAnimationDirectionFunc};
		$scope.animationTimingFunc = {options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "set-start", "step-end", "cubic"], selectedIndex: 0, size: "small", onOptionClick: setAnimationTimeFunc};
		$scope.animationFillMode = {options: ["forwards","none", "backwards", "both"], selectedIndex: 0, size:'small', onOptionClick:setAnimationFillMode};

		function initShortCuts() {
			KeyboardService.initOptionPressedAndReleasedFunction(on_pressed, on_released);
			function on_pressed(e) {
				// console.log('ctrl key pressed');
			}
			function on_released(e) {
				// console.log('ctrl key released');
			}
		}

		$scope.pageDom = {stageHtml: "", animElemSelector: "stage-elem", stageCss: ""};
		$scope.goToEditPageDom = function() {
			$scope.layout.index = 3;
			$scope.pageDom.stageHtml = document.querySelector('#stage-container').innerHTML;
		}

		$scope.updatePageDom = function() {

			LoadingService.showAmbig('Updating..', 1000, function() {
				LoadingService.showSuccess('Saved!', 1500);
				$scope.layout.index = 0;
			});

			if ($scope.pageDom.stageHtml && $scope.pageDom.stageHtml.length) {
				var stageElem = document.querySelector('#stage-container');
				stageElem.innerHTML = $scope.pageDom.stageHtml;
				$compile(stageElem)($scope);
				$timeout(function() {
					$scope.$apply();
				})
			}

			if ($scope.pageDom.animElemSelector && $scope.pageDom.animElemSelector.length && $scope.pageDom.animElemSelector !== $scope.actor.id) {
				var newAnimationElem = document.querySelector('#' + $scope.pageDom.animElemSelector);
				if (newAnimationElem) {
					$scope.actor = newAnimationElem;
				}
			}

			if ($scope.pageDom.stageCss && $scope.pageDom.stageCss.length) {
				var previousStyle = document.querySelector('#stage-css');
				var stageElem = document.querySelector('#stage-container');
				if (previousStyle) {
					previousStyle.parentNode.removeChild(previousStyle);
				}
				var style = document.createElement("style");
				style.setAttribute('id', 'stage-css');
				style.innerHTML = $scope.pageDom.stageCss;
				document.getElementsByTagName("head")[0].appendChild(style);
				$compile(stageElem)($scope);
			} else {
				var previousStyle = document.querySelector('#stage-css');
				if (previousStyle) {
					previousStyle.parentNode.removeChild(previousStyle);
				}
			}
		}

		function setAnimationFillMode(option, index) {
			$scope.animation.attr.fill_mode = option;
		}

		$scope.updateNumIntervals = function(num_intervals) {
			defaults.KF_INTERVALS = num_intervals;
			$scope.setActiveKeyFrame(0);
		}

		function setAnimationDirectionFunc(option, index) {
			$scope.animation.attr.direction = option;
		}

		function setAnimationTimeFunc(option, index) {
			if (index === $scope.animationTimingFunc.options.length - 1) {
				option = "cubic-bezier(0.1, 0.7, 1.0, 0.1)";
			}
			$scope.animation.attr.timing_function = option;
		}


		$scope.setActiveKeyFrame = function(value) {
			var propertyDictCssMap = {'translateX': 'translateX', 'translateY': 'translateY', 'translateZ': 'translateZ', 'scale3DX': 'scaleX', 'scale3DY': 'scaleY', 'skewX':'skewX', 'skewY': 'skewY', 'rotate3DZ':'rotateZ', 'rotate3DY': 'rotateY', 'rotate3DX': 'rotateX', 'rotate3DAngle': 'rotate'};
			var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': 'px', 'scale3DX': '', 'scale3DY': '', 'skewX':'deg', 'skewY': 'deg', 'rotate3DZ':'deg', 'rotate3DY': 'deg', 'rotate3DX': 'deg', 'rotate3DAngle': 'deg'};

			var oldValue = $scope.animation.selected_index;

			var newValue = Math.floor(parseInt(value) * (100/defaults.KF_INTERVALS));
			var newPercentValue = getNthSortedKeyText($scope.animation.obj, newValue);
			$scope.animation.selected_kf_index = value;
			$scope.animation.selected_index = newValue;
			$scope.animation.selected_percent = newPercentValue + '%';
			$scope.animation.flex_selected_index = newValue;

			//going backwards
			//for each property, check the last one it was edited, apply it to that
			//
			var currentPropertiesModified = Object.keys($scope.animation.selected_keyframe.modified);
			var cssToChange;
			if (true) {
				var transformProperties = Object.keys(propertyDictCssMap);
				var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
				var cssToChange = {transform: {}, etc: {}};
				for (var i = 0; i < currentPropertiesModified.length - 1; i++) {
					var indexPropertyName = currentPropertiesModified[i]
					console.log('traversing all keyframes from t=0 to t=', newValue - 1, 'to search for the last ', indexPropertyName, 'edit, if it exists');
					for (var j = 0; j < newValue - 1; j++) {
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
					$scope.actor.style['transform'] = transformCSStoChange;
					$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
				}
				if (cssToChange && Object.keys(cssToChange.etc).length) {
					var nonTransformProperties = Object.keys(cssToChange.etc);
					for (var i = 0 ; i < nonTransformProperties.length; i++) {
						var indexProperty = nonTransformProperties[i];
						var indexValue = cssToChange.etc[indexProperty];
						$scope.actor.style[indexProperty] = indexValue;
					}
				}
			}

			//leave it & override all the new ones
			//for each property, check the last one it was edited, apply it to that

			//clear all values;
			var percentValue = getNthSortedKeyText($scope.animation.obj, newValue);
			var proposedKeyframe = $scope.animation.properties[percentValue + '%'];
			$scope.animation.selected_keyframe = proposedKeyframe;



			if (true) {
				var transformProperties = Object.keys(propertyDictCssMap);
				var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
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
						$scope.actor.style['transform'] = transformCSStoChange;
						$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
					}
				if (cssToChange && Object.keys(cssToChange.etc).length) {
					var nonTransformProperties = Object.keys(cssToChange.etc);
					for (var i = 0 ; i < nonTransformProperties.length; i++) {
						var indexProperty = nonTransformProperties[i];
						console.log(indexProperty);
						var indexValue = cssToChange.etc[indexProperty];
						console.log('setting', indexProperty, 'to', indexValue);
						$scope.actor.style[indexProperty] = indexValue;
					}
				}

			}
			console.log($scope.animation.obj.cssText);

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
				timer.time = 1;
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
				anim_name = $scope.animation.attr.name;


				elem.style[browserPrefix + 'AnimationDuration'] = $scope.animation.attr.duration;
				elem.style['animationDuration'] = $scope.animation.attr.duration;
				elem.style[browserPrefix + 'AnimationIterationCount'] = $scope.animation.attr.iteration_count;
				elem.style['animationIterationCount'] = $scope.animation.attr.iteration_count;
				elem.style[browserPrefix + 'AnimationTimingFunction'] = $scope.animation.attr.timing_function;
				elem.style['animationTimingFunction'] = $scope.animation.attr.timing_function;
				elem.style[browserPrefix + 'AnimationFillMode'] = $scope.animation.attr.fill_mode;
				elem.style['animationFillMode'] = $scope.animation.attr.fill_mode;
				elem.style[browserPrefix + 'AnimationDirection'] = $scope.animation.attr.direction;
				elem.style['animationDirection'] = $scope.animation.attr.direction;
				elem.style[browserPrefix + 'AnimationDelay'] = $scope.animation.attr.delay;
				elem.style['animationDelay'] = $scope.animation.attr.delay;

				console.log($scope.animation.attr.delay, $scope.animation.attr.iteration_count, $scope.animation.attr.direction, $scope.animation.attr.duration, $scope.animation.attr.fill_mode, $scope.animation.attr.timing_function);
				$scope.player.reset();
				$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
				$scope.animation.selected_index = 0;
				$scope.animation.flex_selected_index = 0;



				elem.style[browserPrefix + "AnimationName"] = $scope.animation.attr.name;




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
				player.status = 0;
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
							csstext += 'translateZ(' + dance_obj.translateZ  + 'px' + ') '
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

			var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color']
			for (var i = 0; i < modifiedPropertyKeys.length; i++) {
				var indexProperty = modifiedPropertyKeys[i];
				// var indexProperty = nonTransformProperties[i];
				if (nonTransformProperties.indexOf(indexProperty) > -1) {

					if (indexProperty === 'opacity' && typeof(dance_obj.opacity) === "number") {
						csstext += ('opacity:' + dance_obj.opacity + ';')
					}
					if (indexProperty === 'fill') {
						csstext += ('fill:' + dance_obj.fill + ';');
					}
					if (indexProperty === 'backgroundColor') {
						csstext += ('background-color:' + dance_obj.backgroundColor + ';');
					}
					if (indexProperty === 'strokeDashOffset') {
						csstext += ('stroke-dashoffset:' + dance_obj.strokeDashOffset + ';');
					}
					if (indexProperty === 'strokeDashArray') {
						csstext += ('stroke-dasharray:' + dance_obj.strokeDashArray + ';');
					}
					if (indexProperty === 'strokeWidth') {
						csstext += ('stroke-width:' + dance_obj.strokeWidth + ';');
					}
					if (indexProperty === 'strokeOpacity') {
						csstext += ('stroke-opacity:' + dance_obj.strokeOpacity + ';');
					}
					if (indexProperty === 'color') {
						csstext += ('color:' + dance_obj.color + ';');
					}
					if (indexProperty === 'stroke') {
						csstext += ('stroke:' + dance_obj.stroke + ';');
					}
					if (indexProperty === 'fillOpacity') {
						csstext += ('fill-opacity:' + dance_obj.fillOpacity + ';');
					}
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

		function injectStyleSheet() {
			var link = document.createElement("link");
			link.href = "https://s3.amazonaws.com/uguru-admin/master/animate.css";
			link.type = "text/css";
			link.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(link);
		}

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

		function getAllKeyFrameAnimations() {
			var ss = document.styleSheets;
			var allRuleObjs = [];
		    for (var i = 0; i < ss.length; ++i) {
		    	if (ss[i].cssRules && ss[i].cssRules.length) {
		    		for (var j = 0; j < ss[i].cssRules.length; ++j) {
		            	if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {allRuleObjs.push(ss[i].cssRules[j]) }
		        	}
		    	}
		    }
		    return allRuleObjs
		}

		$scope.updateAnimationName = function(animation) {
			animation.obj.name = animation.attr.name;
			console.log(animation.obj);
		}

		function initAnimationFromCSSText(anim_name, browserPrefix, css_text) {
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
			var anim = lastSheet.cssRules[indexOfRuleInSheet];

			anim.cssText = css_text;
			return anim
		}

		function initAnimationFromImportedAnimObj(anim_obj, kf_count) {
			var kf_count = kf_count || 100;
			var base_properties = initDictWithXProperties(anim_obj);
			console.log(Object.keys(base_properties).length, 'base keyframes created');
			console.log(Object.keys(anim_obj).length, 'custom keyframes to parse');
			var attr = {
				name: anim_obj.name,
				play_state: "running",
				delay: '0s',
				delayVal: 0,
				direction: "normal",
				iteration_count: 1,
				timing_function: "ease",
				duration: defaults.DURATION + 's',
				durationVal: defaults.DURATION,
				fill_mode: "forwards",
				kf_intervals: 100
			}
			var newAnimObjIntegerPercentages = [];
			var newAnimObjCssRulesKeys = Object.keys(anim_obj.cssRules);
			for (var i = 0; i < newAnimObjCssRulesKeys.length; i++) {
				var indexNewAnimKFObj = anim_obj.cssRules.item(i);
				var indexNewAnimKeyText = indexNewAnimKFObj.keyText;
				var indexNewAnimKeyTextInt = parseInt(indexNewAnimKFObj.keyText.replace('%', ''));
				newAnimObjIntegerPercentages.push(indexNewAnimKeyTextInt);
			}
			var newAnimObjIntegerPercentages = newAnimObjIntegerPercentages.sort(function(a,b) {return parseInt(b) - parseInt(a) }).reverse();
			var duplicatePercentIndices = [];
			for (var i = 0; i < kf_count + 1; i++) {
				if (newAnimObjIntegerPercentages.indexOf(i) > -1) {
					matchPercentIndex = newAnimObjIntegerPercentages.indexOf(i);
					var temp = JSON.parse(JSON.stringify(newAnimObjIntegerPercentages))
					matchOptimalPercentIndex =  newAnimObjIntegerPercentages.length - temp.reverse().indexOf(i) - 1;
					if (matchOptimalPercentIndex > matchPercentIndex) {
						for (var j = matchPercentIndex; j < matchOptimalPercentIndex; j++) {
							duplicatePercentIndices.push(j);
							// console.log(matchOptimalPercentIndex + '%', 'original:', newAnimObjIntegerPercentages[j]);
							anim_obj.deleteRule(newAnimObjIntegerPercentages[j] + '%');
						}
					} else {
						var item = anim_obj.cssRules.item(newAnimObjIntegerPercentages[matchOptimalPercentIndex]);
						console.log(item);
					}

				} else {
					anim_obj.appendRule(i + '% { }', i);
					base_properties[i + '%'] = transformPropertiesObj()
				}
			}
			console.log(Object.keys(base_properties).length, anim_obj.cssRules.length, duplicatePercentIndices.length);
			var newAnimObjIntegerPercentagesWithTransform = [];
			var newAnimObjCssRulesKeys = Object.keys(anim_obj.cssRules);
			for (var i = 0; i < newAnimObjCssRulesKeys.length; i++) {
				var indexNewAnimKFObj = anim_obj.cssRules.item(i);
				var indexNewAnimKeyText = indexNewAnimKFObj.keyText;
				var indexNewAnimKeyTextInt = parseInt(indexNewAnimKFObj.keyText.replace('%', ''));
				newAnimObjIntegerPercentagesWithTransform.push(indexNewAnimKeyTextInt);
			}
			var newAnimObjIntegerPercentagesWithTransform = newAnimObjIntegerPercentages.sort(function(a,b) {return parseInt(b) - parseInt(a) }).reverse();
			var count = 0;
			for (var i = 0; i < newAnimObjIntegerPercentagesWithTransform.length; i++) {
				var animObjKF = anim_obj.cssRules.item(i);
				if (animObjKF.cssText.indexOf('{ }') > -1) {
					continue;
				} else {
					count += 1
					copyTransformMatrixToTransformObj(animObjKF.cssText, base_properties[animObjKF.keyText]);
				}
			}
			console.log(count, 'filled kf values')
			return {obj: anim_obj, selected_keyframe:base_properties['0%'], selected_kf_index:0, selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: base_properties, kf_count: defaults.KF_COUNT, attr:attr};
		}

		function copyTransformMatrixToTransformObj(css_text, transformObj) {
			console.log(css_text);
		}

		function initAnimationFromAnimObj(anim_obj) {

			var properties = initDictWithXProperties(anim_obj);
			var attr = {
				name: anim_obj.name,
				play_state: "running",
				delay: '0s',
				delayVal: 0,
				direction: "normal",
				iteration_count: 1,
				timing_function: "ease",
				duration: defaults.DURATION + 's',
				durationVal: defaults.DURATION,
				fill_mode: "forwards",
				kf_intervals: defaults.KF_INTERVALS
			}


			return {obj: anim_obj, selected_keyframe:properties['0%'], selected_kf_index:0, selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: properties, kf_count: defaults.KF_COUNT, attr:attr};
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
				delay: '0s',
				delayVal: 0,
				direction: "normal",
				iteration_count: 1,
				timing_function: "ease",
				duration: duration,
				durationVal: parseInt(duration.replace('s')),
				fill_mode: "forwards",
				kf_intervals: defaults.KF_INTERVALS
			}
			return {obj: anim, selected_keyframe:properties['0%'], selected_kf_index:0, selected_percent:'0%', selected_index: 0, flex_selected_index:0, properties: properties, kf_count: num_keyframes, attr:attr};
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


		function reconstructAnimationFromProperties(attr, properties, kf_count) {
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + attr.name + " { } ");
			var anim = lastSheet.cssRules[indexOfRuleInSheet];
			initKFWithXInterval(anim, kf_count);
			var attr = {
				name: attr.name,
				play_state: attr.play_state,
				delay: attr.delay + 's',
				delayVal: attr.delay,
				direction: attr.direction,
				iteration_count: attr.iteration_count,
				timing_function: attr.timing_function,
				duration: attr.duration,
				durationVal: parseInt(attr.duration.replace('s')),
				fill_mode: attr.fill_mode,
				kf_intervals: defaults.KF_INTERVALS
			}

			var propertyKeys = Object.keys(properties);
			var animation = {obj: anim,  properties: properties, kf_count: kf_count, attr:attr, kf_intervals: defaults.KF_INTERVALS};
			for (var i = 0; i < propertyKeys.length; i++) {
				var indexPropertyKeyPercent = propertyKeys[i];
				var modifiedDict = properties[indexPropertyKeyPercent].modified;
				var modifiedDictKeys = Object.keys(modifiedDict);

				if (modifiedDictKeys.length) {
					for (var j = 0; j < modifiedDictKeys.length; j++) {
						var indexModifiedKey = modifiedDictKeys[j];
						var indexModifiedValue = modifiedDict[indexModifiedKey];
						editKeyframeAtX(animation, indexPropertyKeyPercent.replace('%',''), indexModifiedKey, indexModifiedValue);
					}
				}
			}

			return animation
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

		function getS3Animations() {

			var first_name = $scope.user.name.split(' ')[0].toLowerCase();
			if (first_name === 'asif') {
				first_name = 'samir';
			}
			var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
			getS3JsonFile(first_name, animation_url, s3_callback);

			function s3_callback(first_name, _dict) {
				$scope.animationDict = _dict;
				$scope.my_animations = $scope.animationDict[first_name];
				if ($scope.my_animations.last_edited) {
					var serverAnimation = $scope.my_animations.last_edited;
					$scope.animation = reconstructAnimationFromProperties(serverAnimation.attr, serverAnimation.properties, serverAnimation.kf_count);
					$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
					$scope.animation.selected_index = 0;
					$scope.animation.flex_selected_index = 0;
					$timeout(function() {
						$scope.$apply();
					})
				}

				$scope.myAnimationDropdown = initMyAnimationDropdown($scope.my_animations);
				LoadingService.hide();
				// saveS3Animations();
			}

			function initMyAnimationDropdown(my_animations) {

				var animationNameArr = Object.keys(my_animations.animations);
				if (!animationNameArr.length) {
					animationNameArr.push($scope.my_animations.last_edited.attr.name);
				}
				animationNameArr.push('+');
				return {
					options: animationNameArr,
					onOptionClick: savePreviousAndSelectAnimation,
					size: 'small',
					label: 'my animations',
					selectedIndex: 0
				}

				function savePreviousAndSelectAnimation(option, index) {
					$scope.saveAnimationsToServer($scope.animation);;
					if (option === '+') {
						$scope.animation = initAnimation('new', browserPrefix, 100, 5);
						$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
						$scope.animation.selected_index = 0;
						$scope.animation.flex_selected_index = 0;
						$scope.myAnimationDropdown.options.push('new');
						$scope.myAnimationDropdown.selectedIndex = $scope.myAnimationDropdown.options.length - 1;
						$scope.player.toggleSettings();
					} else {
						var serverAnimation = $scope.my_animations.animations[option];
						$scope.animation = reconstructAnimationFromProperties(serverAnimation.attr, serverAnimation.properties, serverAnimation.kf_count);
						$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
						$scope.animation.selected_index = 0;
						$scope.animation.flex_selected_index = 0;
					}
					$timeout(function() {
						$scope.$apply();
					})
				}

			}

			function getS3JsonFile(first_name, url, cb) {
		        var xhr = new XMLHttpRequest();
		        xhr.open( 'GET', url, true );

		        xhr.onload = function () {
		            console.log(xhr);
		            var resp = JSON.parse( xhr.responseText );
		            cb && cb(first_name, resp);
		        };
		        xhr.send();
		    }
		}

		$scope.saveAnimationsToServer = function(animation) {
			$scope.my_animations.last_edited = animation;
			var animationName = $scope.animation.attr.name;
			LoadingService.showMsg('Saving....');
			if ($scope.my_animations.last_edited) {
				$scope.my_animations.animations[animationName] = animation;
			}


			var first_name = $scope.user.name.split(' ')[0].toLowerCase();
			if (first_name === 'asif') {
				first_name = 'samir';
			}
			console.log($scope.animationDict);
			// $scope.animationDict[first_name]['animations'][fileName] = $scope.animation;

			saveS3Animations();
    	}

		function saveS3Animations() {

			var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
			var first_name = $scope.user.name.split(' ')[0].toLowerCase();
			if (first_name === 'asif') {
				first_name = 'samir';
			}
			function post_callback(first_name, resp) {
				console.log('file successfully saved', resp);
				LoadingService.hide();
				$timeout(function() {
					LoadingService.showSuccess('Saved!', 1000);
				})
			}
			FileService.postS3JsonFile(JSON.stringify($scope.animationDict), first_name, animation_url, post_callback);
		}

		$scope.applyPropertyChange = function(value, property) {
			//set
			// $timeout(function() {

			var convertToIntProperties = ['opacity'];

			if (convertToIntProperties.indexOf(property) > -1) {
				value = parseFloat(value);
			}




			var desiredIndex = getNthSortedKeyText($scope.animation.obj, $scope.animation.selected_index);
			// console.log('about to apply property change', value, property, desiredIndex);
			editKeyframeAtX($scope.animation, desiredIndex, property, value);
			// console.log($scope.animation.obj.cssText);
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

		function getDefaultValue(property) {
			if (['translateX', 'translateY', 'translateZ', 'rotate', 'rotate3DX', 'rotate3DZ', 'rotate3DAngle' ,'skewX', 'skewY', 'rotate3DY'].indexOf(property) > -1) {
				return 0;
			} else {
				return 1;
			}
		}

		$scope.clearAllFrames = function() {
			var propertiesDict = $scope.animation.properties;
			var propertiesDictKeys = Object.keys(propertiesDict);
			LoadingService.showMsg('Clearing all animations....', 2500);
			for (var i = 0; i < propertiesDictKeys.length; i++) {
				var indexPropertyPercentage = propertiesDictKeys[i];
				var kfProperty = propertiesDict[indexPropertyPercentage];
				$scope.clearAllProperties(kfProperty, true);
			}
			$timeout(function() {

				var firstPercentage = getNthSortedKeyText($scope.animation.obj, 0);
				$scope.animation.selected_keyframe = $scope.animation.properties[firstPercentage + '%'];
				$scope.animation.selected_percent = firstPercentage + '%';
				$scope.animation.selected_index = 0;
				$timeout(function() {
					LoadingService.showSuccess('All properties across all keyframes cleared!', 2000);
				}, 500)
				$scope.$apply()
			});
		}

		$scope.clearAllProperties = function(kf_obj, skip_confirm) {
			if (skip_confirm) {
				kf_obj.confirmed = true;
			} else if (!skip_confirm && !kf_obj.confirmed) {
				kf_obj.confirmed = true;
				return;
			}
			if (kf_obj.confirmed) {
				kf_obj.confirmed = false;
				kf_obj = kf_obj || $scope.animation.selected_keyframe;
				selected_kf_properties = Object.keys(kf_obj.modified);
				for (var i = 0; i < selected_kf_properties.length; i++) {
					var indexProperty = selected_kf_properties[i];

					$scope.clearProperty(kf_obj, indexProperty);
				}
			}
		}

		$scope.clearProperty = function(kf, property) {
			var percent_value = getNthSortedKeyText($scope.animation.obj, $scope.animation.selected_index);
			console.log('modified dict', kf.modified);
			if (property in kf.modified) {
				kf.modified[property] = 0;
			}
			var defaultValue = getDefaultValue(property);
			editKeyframeAtX($scope.animation, percent_value, property, defaultValue);
			editKeyframeAtX($scope.animation, percent_value, property, null);
			kf[property] = defaultValue;




			$timeout(function() {
				$scope.setActiveKeyFrame($scope.animation.selected_index)
				$scope.$apply();
			}, 500);
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
			var propertyDictCssUnit = {'translateX': '%', 'translateY': '%', 'translateZ': 'px', 'scale3DX': '', 'scale3DY': '', 'skewX':'deg', 'skewY': 'deg', 'rotate3DZ':'deg', 'rotate3DY': 'deg', 'rotate3DX': 'deg', 'rotate3DAngle': 'deg'};
			var transformProperties = Object.keys(propertyDictCssMap);
			var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
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
					cssValue = propertyValue
					console.log(cssVar, cssValue);
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
				$scope.actor.style['transform'] = transformCSStoChange;
				$scope.actor.style[browserPrefix + '-transform'] = transformCSStoChange;
				console.log(window.getComputedStyle($scope.actor, null).transform)
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


		$scope.actor = document.querySelector('#stage-elem');

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
				this.backgroundColor = '#FFFFFF';
				this.color = '#FFFFFF';
				this.fill = '#FFFFFF';
				this.fillOpacity = 1;
				this.stroke = 1;
				this.strokeWidth = 1;
				this.strokeDashArray = "5";
				this.strokeDashOffset = 1;
				this.strokeOpacity = 1;
				this.transformStyle = "preserve-3d";

			};
			return new transformObj();
		}





		$scope.resetKFByIndex = function(kf_index, show_confirm) {
			if (show_confirm || confirm('are you sure? all current properties will be wiped out')) {
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

		function initAnimationListener(elem) {
			if (browserPrefix === 'webkit') {

				elem.addEventListener( 'webkitAnimationEnd',
				function( event ) {
					$scope.player.reset();
					// var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);
					$scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
					$scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
					$scope.setActiveKeyFrame($scope.animation.selected_index)
					console.log($scope.animation.selected_index);

					// $scope.animation.selected_percent = keyPercent + '%';
					$timeout(function(){$scope.$apply();})
				}, false );
			} else {
				elem.addEventListener( 'animationend',
				function( event ) {
					$scope.player.reset();
					// var keyPercent = getNthSortedKeyText($scope.animation.obj, 0);
					$scope.animation.selected_keyframe = $scope.animation.properties[$scope.animation.selected_percent];
					$scope.animation.selected_index = Object.keys($scope.animation.properties).indexOf($scope.animation.selected_percent);
					$scope.setActiveKeyFrame($scope.animation.selected_index)
					// $scope.setActiveKeyFrame($scope.animation.selected_index)
					// $scope.animation.selected_keyframe = $scope.animation.properties[keyPercent + '%'];
					// $scope.animation.selected_percent = keyPercent + '%';
					$timeout(function(){$scope.$apply();})
				}, false );
			}
		}

		function loadAllS3Files() {
			LoadingService.showAmbig(null, 10000);
			$timeout(function(){
				getS3Animations()
			},1000);
		}


		function initView() {
			browserPrefix = getBrowserPrefix();


			//turn off for now
			false && loadAllS3Files();


			$scope.actor = document.querySelector('#stage-elem');
			initAnimationListener($scope.actor);

			// $scope.animation = initAnimation('sample-animation', browserPrefix, defaults.KF_COUNT, defaults.DURATION);
			// $scope.animationDropdown = {options:[$scope.animation.attr.name, '+'], selectedIndex: 0, label:'temp-animation', size:'small'};



			// editKeyframeAtX($scope.animation, 0, 'translateX', 10)


		}
		$scope.renderAnimationCSSText = function() {
			$scope.layout.index = 1;

			var tempAnim = initAnimationFromCSSText($scope.animation.obj.name, browserPrefix, $scope.animation.obj.cssText);
			var cssRulesLength = $scope.animation.obj.cssRules.length;
			for (var i = 0; i < cssRulesLength; i++) {
				var indexKFRule = $scope.animation.obj.cssRules.item(i);
				var indexKeyText = indexKFRule.keyText;
				var indexKeyStyle = indexKFRule.cssText;
				if (!(indexKeyStyle.indexOf('{ }') > -1)) {
					tempAnim.appendRule(indexKeyStyle, 0)
				}
			}
			var animClassText = generateClassText($scope.animation);
			$scope.animation.exportable_kf = {obj: tempAnim, className: tempAnim.name, classText: animClassText, fullText: animClassText + tempAnim.cssText };

			$timeout(function() {
				// angular.element(document.querySelector('#export-textarea')).select()
				document.querySelector('#export-textarea').select();
				// window.prompt("Copy to clipboard: Ctrl+C, Enter", $scope.animation.exportable_kf.fullText);
				document.execCommand('copy')
			}, 1000)
			function generateClassText(anim) {
				 return "." + anim.obj.name + "\n{\n   " + ' animation:  ' + anim.obj.name + '  ' + anim.attr.duration  + '  ' + anim.attr.timing_function + '  ' + anim.attr.delay + '  ' + anim.attr.iteration_count + '  ' + anim.attr.direction + ';\n    ' + browserPrefix + '-' + ' animation:  ' + anim.obj.name + '  ' + anim.attr.duration  + '  ' + anim.attr.timing_function + '  ' + anim.attr.delay + '  ' + anim.attr.iteration_count + '  ' + anim.attr.direction + ';\n}\n\n'
			}
		}

		var browserPrefix;

		injectStyleSheet();

		function importAnimationFromRawCssText(css_text, name) {
			var style = document.createElement("style");
			style.setAttribute('id', name);
			style.innerHTML = css_text;
			var newAnim;
			document.getElementsByTagName("head")[0].appendChild(style);
			for (var i = 0; i < document.styleSheets.length; i++) {
				var indexStyleSheet = document.styleSheets[i];
				if (indexStyleSheet.ownerNode && indexStyleSheet.ownerNode.id === name) {

					var animToClone = indexStyleSheet.cssRules[0];
					var lastSheet = document.styleSheets[document.styleSheets.length - 1];
					var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + animToClone.name + " { } ");
					var newAnim = lastSheet.cssRules[indexOfRuleInSheet];
					var cssRulesToClone = animToClone.cssRules;
					for (var j = 0;j < cssRulesToClone.length; j++) {
						var indexKeyFrame = cssRulesToClone.item(j);
						var percentageIndexInteger = Math.round(indexKeyFrame.keyText.replace('%', ''))
						var newKeyFrameCssText = percentageIndexInteger + '% ' + indexKeyFrame.cssText.split(' ').splice(1).join(' ');

						newAnim.appendRule(newKeyFrameCssText, j);
					}

				}
			}
			return newAnim;
		}

		$scope.importFromCSSText = function(css_text, name) {
			var css_text = "@keyframes animation { 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); } 2.92% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); } 3.37% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); } 3.47% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); } 4.58% { -webkit-transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); } 5.69% { -webkit-transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); } 5.76% { -webkit-transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); } 7.41% { -webkit-transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); } 7.51% { -webkit-transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); } 7.88% { -webkit-transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); } 8.68% { -webkit-transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); } 10.03% { -webkit-transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); } 10.85% { -webkit-transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); } 11.53% { -webkit-transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); } 12.22% { -webkit-transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); } 14.18% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); } 14.37% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); } 19.23% { -webkit-transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); } 20.01% { -webkit-transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); } 23.05% { -webkit-transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); } 25.75% { -webkit-transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); } 26.94% { -webkit-transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); } 31.58% { -webkit-transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); } 31.73% { -webkit-transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); } 37.32% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); } 38.15% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); } 42.35% { -webkit-transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); } 48.9% { -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); } 57.77% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 60.47% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 69.36% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 83.61% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } ";
			var js_anim_obj = importAnimationFromRawCssText(css_text, name, 'round');

			var final_obj = initAnimationFromImportedAnimObj(js_anim_obj);
			if ($scope.animationDropdown) {
				$scope.animationDropdown.options[0] = name;
			}
			$scope.animation = final_obj;
			console.log(final_obj.obj);
			return final_obj;

		}

		$timeout(function() {


			$timeout(function() {
				$scope.animation = $scope.importFromCSSText(null, 'bounce-js');
				$scope.animationDropdown = {options:[$scope.animation.attr.name, '+'], selectedIndex: 0, label:'temp-animation', size:'small'};
				// $scope.animation = $scope.importFromCSSText($scope.animationDict.importTextarea, $scope.animationDict.importInput);
				// importAnimationFromRawCssText(initAnimationFromAnimObj, css_text);
				// var arr = getAllKeyFrameAnimations();
				// for (var i = 0; i < arr.length ; i++) {
				// 	console.log(arr[i].name);
				// }
				// var tempAnim = arr[0]
				// $scope.importFromCSSText(tempAnim.cssText, tempAnim.name);
				// console.log(arr.length);
				// var randomKeyFrameAnimation = arr[0];
				// randomKeyFrameAnimation.name = "samir"

				// var style = document.createElement("style");
				// style.setAttribute('id', 'testtesttest');

				// style.innerHTML = randomKeyFrameAnimation.cssText + '\n\n' + arr[1].cssText + '\n\n' + arr[2].cssText;
				// document.getElementsByTagName("head")[0].appendChild(style);
				// for (var i = 0; i < document.styleSheets.length; i++) {
				// 	var indexStyleSheet = document.styleSheets[i];
				// 	if (indexStyleSheet.ownerNode && indexStyleSheet.ownerNode.id === "testtesttest") {
				// 		console.log(indexStyleSheet)
				// 		var animToClone = indexStyleSheet.cssRules[0];
				// 		var lastSheet = document.styleSheets[document.styleSheets.length - 1];
				// 		var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + animToClone.name + " { } ");
				// 		var newAnim = lastSheet.cssRules[indexOfRuleInSheet];
				// 		var cssRulesToClone = animToClone.cssRules;
				// 		for (var j = 0;j < cssRulesToClone.length; j++) {
				// 			var indexKeyFrame = cssRulesToClone.item(j);
				// 			newAnim.appendRule(indexKeyFrame.cssText, j);
				// 		}
				// 		console.log(newAnim);
				// 		// console.log(animToClone, Object.keys(cssRulesToClone));

				// 	}
				// }

			}, 2000);
			initAll();

		}, 2000)

	}

]);