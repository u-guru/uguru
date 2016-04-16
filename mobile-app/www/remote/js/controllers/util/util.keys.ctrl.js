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


		function initAnimationPlayer() {
			return {
				play: playElemAnimation,
				pause: pauseDanceMoveElem,
				reset: resetDanceMoveElem,
				resume: resumeDanceMoveElem,
				replay: resetDanceMoveElem,
				setMode: {
					options: [{name: "fast", speed: 250}, {name: "medium", speed:1000}, {name: "slow", "speed": 2000}],
					selectedIndex: 0
				}
			}

			function playElemAnimation(elem, anim_name, browserPrefix) {
				elem.style[browserPrefix + "AnimationName"] = anim_name
			}

			function pauseDanceMoveElem(elem, browserPrefix) {
				elem.style[browserPrefix + "AnimationPlayState"]="paused";
			}


			function resumeDanceMoveElem(elem, browserPrefix) {
				elem.style[browserPrefix + "AnimationPlayState"] ="running";
			}

			function resetDanceMoveElem(elem, browserPrefix, replay) {
				var elemCacheAnim = elem.animation;
				elem[browserPrefix + animation] = null;
				elem.offsetWidth = elem.offsetWidth;
				elem[browserPrefix + animation] = elemCacheAnim;
				!replay && pauseDanceScript(elem, browserPrefix)
			}
		}

		function playDanceMoves(elem, dance_moves) {
			for (var i = 0; i < dance_moves.length; i++) {
				console.log('playing dance move #', i + 1);
				var indexDanceMove = dance_moves[i]
				execDanceMove(elem, indexDanceMove);
			}
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

		function initAnimation(anim_name, browserPrefix) {
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var indexOfRuleInSheet = lastSheet.insertRule("@-" + browserPrefix + "-keyframes " + anim_name + " { } ");
			return lastSheet.cssRules[indexOfRuleInSheet];
		}

		$timeout(function() {
			var keyFrameRule = findKeyframesRule('bounceInUp');
			$scope.page.actor.classList.add('animated');

			$scope.selectedDanceMove.keyframeAnimation = initAnimation("samir", browserPrefix);



			$scope.page.actor.style.webkitAnimationDuration = "5s";
			$timeout(function() {
				$scope.player.play($scope.page.actor, "bounceInUp", browserPrefix);
				$timeout(function() {
					$scope.player.pause($scope.page.actor, browserPrefix);
				}, 2500)

				$timeout(function() {
					$scope.player.resume($scope.page.actor, browserPrefix);
				}, 5000)

			}, 1000)

		}, 1000);

		function initView() {
			$scope.page = {actor: null}
			$scope.page.actor = document.querySelector('#rect-svg');
			$scope.danceMoves = [];
			$scope.selectedDanceMove = initDanceMove($scope.page.actor);
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
				this.keyframeAnimation = null;
			};
			return new defaultDanceMove();
		}

		function initKeyboardListeners() {
			document.addEventListener('keydown', danceShortCutKeys);

			function danceShortCutKeys(e) {
				if (e.keyCode === 32)  {
					playDanceMoves($scope.page.actor, $scope.danceMoves);
				}

				if (e.keyCode === 82)  {
					$scope.page.actor.style[browserPrefix + 'Transform'] = '';
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