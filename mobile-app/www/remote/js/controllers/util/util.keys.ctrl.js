angular.module('uguru.util.controllers')

.controller('KeyToolController', [

	'$scope',
	'$state',
	'$stateParams',
	'$timeout',
	function($scope, $state, $stateParams, $timeout) {

		var keyboardSpec = {
			//toggle properties
		}

		$scope.player = initAnimationPlayer();
		$scope.sampleAnimations = {options: ["strobe", "bounceInUp"], selectedIndex: 0, size: "small"};


		$scope.setActiveKeyFrame = function(value) {
			$scope.animation.selected_keyframe = $scope.animation.properties[value];
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
				anim_name = $scope.sampleAnimations.options[$scope.sampleAnimations.selectedIndex];


				elem.style.webkitAnimationDuration = $scope.animationDuration;
				if (!player.status) {
					player.status = 1;
					elem.style[browserPrefix + "AnimationName"] = anim_name
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
				elem.style[browserPrefix + "AnimationName"] = anim_name;

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
				var perspective = "perspective("+dance_obj.transformPerspective +"px) ";
				var translate = "translate3d("+dance_obj.translateX+"px, "+dance_obj.translateY+"px, "+dance_obj.translateZ+"px) ";
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
			num_keyframes = num_keyframes || 200;
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
			var anim = lastSheet.cssRules[indexOfRuleInSheet];
			initKFWithXInterval(anim, 200);
			return anim;
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

		function readAndInjectKeyFrames(anim, keyframe_rules) {

		}

		function getBaseTransformDict() {
			return {

			}
		}

		function sampleStrobeKFObj() {
			var anim = initAnimation("strobe", browserPrefix);
			var property_dict_1 = transformPropertiesObj();
			var property_dict_2 = transformPropertiesObj();
			property_dict_1.opacity = 0;
			property_dict_2.opacity = 1;
			var rulesLength = anim.cssRules.length;
			var properties = [];
			for (var i = 0 ; i < rulesLength + 1; i++) {
				var indexProperty = (i % 2)  ? property_dict_1 : property_dict_2 ;
				console.log('adding opacity value', indexProperty.opacity, 'at keyframe', i + '%');
				addKFRule(anim, i, indexProperty, browserPrefix, i);
				properties.push(indexProperty);
			}

			return {obj: anim, properties: properties};
		}


		//guis to create
		// slider - num animation keyframes
		$scope.animationDuration = "5s";
		$scope.animationDurationVal = "5";
		$scope.animationKeyFrames = 100;

		$scope.animDurationChange = function(value) {
			$scope.animationDuration = value + 's';
		}

		$timeout(function() {
			var keyFrameRule = findKeyframesRule('bounceInUp');
			$scope.actor.classList.add('animated');



			var anim = $scope.selectedDanceMove.kf_obj;
			var actor = $scope.actor;
			var player = $scope.player;

			$scope.animation = sampleStrobeKFObj();
			$scope.animation.selected_keyframe = $scope.animation.properties[0];
			console.log($scope.animation.selected_keyframe);

			player.play($scope.player, actor, "strobe", browserPrefix)
			// player.play(actor, sampleStrobeKFObj();

			// $timeout(function() {
			// 	$scope.player.play($scope.actor, "samir", browserPrefix);
			// }, 7500)



			// $scope.actor.style.webkitAnimationDuration = "5s";
			// $timeout(function() {
			// 	$scope.player.play($scope.actor, "bounceInUp", browserPrefix);
			// 	$timeout(function() {
			// 		$scope.player.pause($scope.actor, browserPrefix);
			// 	}, 2500)

			// 	$timeout(function() {
			// 		$scope.player.resume($scope.actor, browserPrefix);
			// 	}, 5000)

			// }, 1000)

		}, 1000);

		function initView() {
			$scope.actor = document.querySelector('#rect-svg');
			$scope.danceMoves = [];
			$scope.selectedDanceMove = initDanceMove($scope.actor);
			$scope.danceMoves.push($scope.selectedDanceMove);
			browserPrefix = getBrowserPrefix();
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

		var browserPrefix;
		initAll();

	}

]);