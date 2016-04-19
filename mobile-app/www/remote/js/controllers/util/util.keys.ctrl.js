angular.module('uguru.util.controllers')

.controller('KeyToolController', [

	'$scope',
	'$state',
	'$stateParams',
	'$timeout',
	'$localstorage',
	function($scope, $state, $stateParams, $timeout, $localstorage) {

		var keyboardSpec = {
			//toggle properties
		}

		$scope.player = initAnimationPlayer();
		$scope.layout = {index: 0};
		$scope.sampleAnimations = {options: ["strobe", "bounceInUp"], selectedIndex: 0, size: "small"};


		$scope.setActiveKeyFrame = function(value) {
			$scope.animation.selected_keyframe = $scope.animation.properties[value + '%'];
		}

		function initAnimationPlayer() {
			return {
				play: playElemAnimation,
				set: setAnimProperty,
				status: 0,
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



			function playElemAnimation(player, elem, anim_name) {



				elem = elem || $scope.actor;
				player = player || $scope.player;
				anim_name = $scope.animationNames;


				elem.style.webkitAnimationDuration = $scope.animationDuration;
				elem.style[browserPrefix + "AnimationName"] = "strobe"
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
				player.status = 2;
				anim_name = $scope.sampleAnimations.options[$scope.sampleAnimations.selectedIndex];
				elem.style[browserPrefix + "AnimationPlayState"]="paused";
			}


			function resumeDanceMoveElem(player, elem) {
				elem = elem || $scope.actor;
				player.status = 1;
				elem.style[browserPrefix + "AnimationPlayState"] ="running";
			}

			function resetDanceMoveElem(player, elem, replay) {
				elem = elem || $scope.actor;
				player = player || $scope.player;
				anim_name = $scope.sampleAnimations.options[$scope.sampleAnimations.selectedIndex];
				elem.style[browserPrefix + "AnimationName"] = null;
				elem.offsetWidth = elem.offsetWidth;
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

		var transformObjToCssText = function(dance_obj) {
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

			var csstext =  'transform: skew(' + (dance_obj.skewX || 0)+ 'deg, ' + (dance_obj.skewY || 0) +'deg) rotate3d(' + dance_obj.rotate3DX +', ' + dance_obj.rotate3DY + ', ' + dance_obj.rotate3DZ + ', ' + (dance_obj.rotate3DAngle || 30) + 'deg) scale(' + (dance_obj.scale3DX || 1.0 )  + ', ' + (dance_obj.scale3DY || 1.0) + ') translate3d(' + (dance_obj.translateX || 0) + unit + ', ' + (dance_obj.translateY || 0) +unit + ', ' + (dance_obj.translateZ || 0) + 'px);'

			//@gabrielle-note
			csstext = csstext;
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

		function initAnimation(anim_name, browserPrefix, num_keyframes) {
			num_keyframes = num_keyframes || 100;
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
			var anim = lastSheet.cssRules[indexOfRuleInSheet];
			initKFWithXInterval(anim, num_keyframes);
			var properties = initDictWithXProperties(num_keyframes)
			return {obj: anim,  properties: properties};
		}

		function initArrWithXProperties(num_frames) {
			var result_arr = [];
			for (var i = 0; i < num_frames; i++) {
				result_arr.push(transformPropertiesObj())
			}
			return result_arr
		}

		function initDictWithXProperties(num_frames) {
			var resultDict = {};
			for (var i = 0; i < num_frames; i++) {
				resultDict[i + "%"]  =  transformPropertiesObj()
			}
			return resultDict
		}

		function initKFWithXInterval(anim, max_bound) {
			for (var i = 0; i < max_bound; i++) {
				addKFRule(anim, i, {}, browserPrefix, i);
			}
		}

		function insertPropertiesAtXKF(anim, property_dict, browserPrefix) {
			return;
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
			editKeyframeAtX($scope.animation, $scope.player.currentFrame, property, value);
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
		$scope.animationDuration = "5s";
		$scope.animationDurationVal = "5";
		$scope.animationKeyFrames = 10;
		$scope.animationCache = $localstorage.getObject('saved_animations') || [];
		console.log($scope.animationCache);

		$scope.animDurationChange = function(value) {
			$scope.animationDuration = value + 's';
		}

		$scope.selectAnimation = function(animation) {
			$scope.animation.obj = findKeyframesRule(animation);
			console.log($scope.animation.obj.cssText);
		}

		function editKeyframeAtX(anim, keyframe_percent, property, value) {
			var percentage = keyframe_percent + '%'
			anim.obj.deleteRule(percentage);

			transformObj = anim.properties[percentage];

			transformObj[property] = value;
			var css_text = transformObjToCssText(transformObj);
			anim.obj.appendRule(percentage + '{' +  css_text + '}', keyframe_percent);

			css_text = css_text.replace('transform:', '').replace(';', '');
			$scope.actor.style[browserPrefix + 'Transform'] = css_text;
			$scope.actor.style['transform'] = css_text;
			// $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
			// $scope.animation.obj.appendRule('0% {transform: translate(10px, 10px);}', 1);
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
				this.backgroundColor = null;
				this.color = null;
				this.fill = null;
				this.fillOpacity = null;
				this.stroke = null;
				this.strokeWidth = null;
				this.strokeDashArray = null;
				this.strokeDashOffset = null;
				this.strokeOpacity = null;
				this.transformStyle = "preserve-3d";

			};
			return new transformObj();
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

			var actor = $scope.actor;
			var player = $scope.player;
			if ($scope.user) {
				$scope.animationName = $scope.user.name.split(' ')[0].toLowerCase() + '-sample';
			} else {
				$scope.animationName = 'animation-name'
			}

			$scope.animation = initAnimation($scope.animationName, browserPrefix, $scope.animationKeyFrames);

			//sets translateX of keyframe
			console.log('initializd animation', $scope.animation);
			editKeyframeAtX($scope.animation, 0, 'translateX', 10)


			// $scope.animation.obj.deleteRule('0%');
			// $scope.animation.obj.deleteRule('5%');
			console.log('modified animation', $scope.animation.obj.cssRules.length, $scope.animation.obj.cssText);
			// $localstorage.setObject('saved_animations', [$scope.animation]);

			$scope.animation.selected_keyframe = $scope.animation.properties['0%'];
			$scope.animation.selected_index = 0;
			$scope.animationKeyFrames = 10;

		}

		var browserPrefix;
		$timeout(function() {
			initAll();
		}, 2000)

	}

]);