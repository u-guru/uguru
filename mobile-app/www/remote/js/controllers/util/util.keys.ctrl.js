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
			DURATION: 1,
			KF_INTERVALS:5,
			SHAPE_DICT: getShapeDict()
		}
		//@gabrielle
		var ctrlShortcuts = [

			{	letter: 's',
				description: 'Saves animation + stage',
				keyCode: 83,
				func: saveAll
			},
			{	letter: 't',
				description:'Toggles sidebar tab forward',
				keyCode: 84,
				func: toggleTabForward
			}
		]

		$scope.player = initAnimationPlayer();
		$scope.timer = initAnimationTimer()
		$scope.defaults = {};
		$scope.animationDict = {importTextarea:'', importInput: ''};
		$scope.imports = {animations: [], stages:[]};
		$scope.layout = {index: 0};
		$scope.shapesDropdown = {options: Object.keys(defaults.SHAPE_DICT), label: "Inject Shape", size: "normal", selectedIndex:0, onOptionClick: addSVGPlaceholder}
		$scope.stageDropdown = initStageDropdown()
		$scope.animationDirectionOptions = {options: ["normal", "reverse", "alternate", "alternate-reverse"], selectedIndex: 0, size: "small", onOptionClick: setAnimationDirectionFunc};
		$scope.animationTimingFunc = {options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "set-start", "step-end", "cubic"], selectedIndex: 0, size: "small", onOptionClick: setAnimationTimeFunc};
		$scope.animationFillMode = {options: ["forwards","none", "backwards", "both"], selectedIndex: 0, size:'small', onOptionClick:setAnimationFillMode};
		// $scope.stage = $scope.imports.stages[0];

		function getHIWStage() {
			return {
				owner: 'samir',
				stageHtml: '<span class="initiator"> <svg id="stage-elem" on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Library Icon</tspan> </text> </g> </svg><svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Campus Stadium</tspan> </text> </g> </svg><svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">Campus Tower</tspan> </text> </g> </svg> <svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="100" viewBox="0 0 200 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="197" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="55">Uguru Billboard</tspan> </text> </g> </svg></span>',
				stageName: 'HIW-Stage-1',
				animElemSelector: '#stage-elem',
				stageCss: '',
				time_states: [{time: 1000, actions:[]}]
			}
		}

		function initNewStage(stage_name, html, css, anim_selector) {
			var anim_selector = anim_selector || '#stage-elem';
			var firstName = $scope.user && $scope.user.name && $scope.user.name.split(' ')[0].toLowerCase();
			return {
				owner: firstName || 'samir',
				stageHtml: html,
				stageName: stage_name,
				animElemSelector: anim_selector,
				stageCss: css,
				time_states: [{time: 1000, actions: []}]
			}
		}

		var callbackKeyDownFunc;
		var parentViewContainer = document.querySelector('#keys');
		var cmdPressed;
		var ctrlPressed;
		function saveAll(e) {console.log('ctrl', e.keyCode, 'pressed');$scope.saveStageHtml();  $scope.saveAnimationClass($scope.animation, $scope.user.name.split(' ')[0].toLowerCase())};
		function toggleTabForward(e) {console.log('right-arrow', e.keyCode, 'pressed'); $scope.asideTabIndex = Math.abs(($scope.asideTabIndex + 1) % 3)};


		$scope.keyShortcuts = {
				ctrl: ctrlShortcuts
		}
		function initShortCuts() {
			KeyboardService.initOptionPressedAndReleasedFunction(on_pressed_cmd, on_released_cmd, 91, 'metaKey', null, 1000);
			KeyboardService.initOptionPressedAndReleasedFunction(on_pressed_ctrl, on_released_ctrl, 17, 'ctrlKey', null,  100);
			function on_pressed_ctrl(e) {
				ctrlPressed = true;
				for (var i = 0; i < $scope.keyShortcuts.ctrl.length; i++) {
					var indexKeyshortcut = $scope.keyShortcuts.ctrl[i];
					initKeyboardFunctionOnce(indexKeyshortcut.letter, indexKeyshortcut.keyCode, indexKeyshortcut.func);
				}
			}

			function on_released_ctrl(e) {
				ctrlPressed = false;
				console.log('ctrl', ctrlPressed)
			}

			function on_pressed_cmd(e) {
				//save all
				//view short cuts
				//import
				//left --> toggle aside
				console.log('cmd pressed');
				cmdPressed = true;
				$timeout(function() {
					if (cmdPressed) {
						console.log('should be showing shortcuts');
						$scope.showShortcuts = true;
					}
				}, 1000)

			}
			function on_released_cmd(e) {
				cmdPressed = false;
				$scope.showShortcuts = false;
				parentViewContainer.removeEventListener(callbackKeyDownFunc, function(e) {console.log(e, 'keydown event listener removed')});

			}
		}

		function initKeyboardFunctionOnce(key, code, cb_pressed) {
			console.log('initializing', key, code);
			var defaultOnRelease = function(e) {
				console.log(key, e.keyCode, 'released');
				$timeout(function() {
					document.removeEventListener('keyup', cb_pressed);
					document.removeEventListener('keydown', defaultOnRelease);
				}, 2500);
			}
			KeyboardService.initOptionPressedAndReleasedFunction(cb_pressed, defaultOnRelease, code, null, true, 100);
		}

		function findStageByName(stage_name) {
			if (!$scope.imports.stages || !$scope.imports.stages.length) {
				console.log('stages from amazon not yet loaded.. trying again in 2seconds')
				$timeout(function() {
					initStageDropdown();
				}, 2000)
				return;
			}
			for (var i = 0; i < $scope.imports.stages.length; i++) {
				var stageIndex = $scope.imports.stages[i];
				if (stageIndex.stageName === stage_name) {
					return stageIndex;
				}
			}
		}

		function initStageDropdown() {
			var lastActiveStageName = $localstorage.getObject('last_stage_active');
			if (lastActiveStageName && lastActiveStageName.length) {
				LoadingService.showAmbig('Loading..' + lastActiveStageName, 2500);
				var lastUsedStage = findStageByName(lastActiveStageName);
				if (lastUsedStage) {
					var stageOptions = [lastActiveStageName, 'save', 'save and import', 'save and clear'];
					var stageLabel = 'Active Stage'
					$scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:true, size:'small'};
					importPageDom(lastUsedStage);
					return;
				}

			} else {
				var stageOptions = ['none', 'import stage', 'create new stage'];
				var stageLabel = "Current Stage"
				$scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:false, size:'small'};
				return {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:false, size:'small'};
			}

			// if (lastActiveStage)
			// var stageInactiveOptions = ['import stage', 'init stage', 'clear stage'];
			//if init stage, ask for name right away
		}

		function onStageDropdownClick(option, index) {
				if ($scope.stageDropdown.stageActive) {
					switch (index) {
						case 1:
							$scope.saveStageHtml();
							$scope.stageDropdown.selectedIndex = 0;
							break
						case 2:
							$scope.saveStageHtml();
							$timeout(function() {
								$scope.layout.index = 1;
								$scope.importLayoutIndex = 3;
								$scope.stageDropdown.selectedIndex = 0;
							}, 1500);
							break;
						case 3:
							$scope.saveStageHtml();
							$timeout(function() {
								$scope.stage = null;
								$scope.resetStageDom();
								$localstorage.setObject('last_stage_active', null);
								$scope.stageDropdown.selectedIndex = 0;
								var stageOptions = ['none', 'import stage', 'create new stage'];
								var stageLabel = "Current Stage"
								$scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:false, size:'small'};
							}, 1500);
							break;
					}
				} else {
					switch (index) {
						case 1:
							$scope.layout.index = 1;
							$scope.importLayoutIndex = 3;
							$scope.stageDropdown.selectedIndex = 0;
							return;
						case 2:
							$scope.layout.index = 1;
							$scope.importLayoutIndex = 3;
							$scope.stageDropdown.selectedIndex = 0;
							return;
					}
				}
			}

		function saveDropdownOnClick(option, index) {
			if (index === 1) {
				$scope.saveStageHtml()
			} else
			if (index === 2) {
				$scope.saveAnimationClass($scope.animation);
			} else
			if (index === 3) {
				$scope.saveAnimationClass();
				$timeout(function() {
					$scope.saveStageHtml();
				}, 5000)
			}
		}

		$scope.onTimeStateBlur = function(time_state) {
			time_state.editMode = false;
			$scope.stage.time_states.sort(function(time_state_a, time_state_b) {
				return parseInt(time_state_b.time) - parseInt(time_state_a.time);
			}).reverse();
		}

		$scope.onTimeStateActionComponentInputFocused = function(time_state, action) {
			$scope.cancelTimeStateActionAnimationClassInputFocused();
			$scope.stage.selectComponentMode = true;
			$scope.stage.selectComponentModeTimeState = time_state;
			$scope.stage.selectComponentModeAction = action;
			var stageContainer = document.querySelector('#stage-container');
			var allDraggableElems = stageContainer.querySelectorAll('[draggable]');
			$scope.stage.components = [];
			for (var i = 0; i < allDraggableElems.length; i++) {
				$scope.stage.components.push({selector: '[draggable-clone-' + i + ']'});
			}
			$timeout(function() {
				$scope.$apply();
				$timeout(function() {
					for (var i = 0; i < allDraggableElems.length; i++) {
						var indexElem = allDraggableElems[i];
						$scope.stage.components[i]._class = indexElem.getAttribute('class');
						indexElem.setAttribute('draggable-' + i, null);
						var clonedNode = indexElem.cloneNode(true);
						clonedNode.removeAttribute('draggable');
						clonedNode.setAttribute('draggable-clone', null);
						clonedNode.setAttribute('draggable-clone-' + i, null);

						var allContainers = document.querySelectorAll('.cloned-animatable-elem-container')
						var indexContainer = allContainers[i];
						var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
						if (allShapes.indexOf(clonedNode.nodeName) > -1) {
							var parentSVG = findParentSVG(indexElem);
							var clonedParentSVG = parentSVG.cloneNode(true);
							clonedParentSVG.innerHTML = "";
							clonedParentSVG.appendChild(clonedNode);
							clonedParentSVG.className += ' absolute';
							clonedParentSVG.style.minWidth = "150px";
							clonedParentSVG.style.minHeight = "150px";
							clonedParentSVG.style.maxWidth = "200px";
							clonedParentSVG.style.maxHeight = "200px";
							indexContainer.appendChild(clonedParentSVG);
							secondClonedParent = clonedParentSVG.cloneNode(true)
							indexContainer.appendChild(secondClonedParent);
						} else {
							clonedNode.className += ' absolute';
							clonedNode.style.minWidth = "150px";
							clonedNode.style.minHeight = "150px";
							clonedNode.style.maxWidth = "200px";
							clonedNode.style.maxHeight = "200px";
							indexContainer.appendChild(clonedNode);
							secondClonedNode = clonedNode.cloneNode(true)
							indexContainer.appendChild(secondClonedNode);
						}
					}
				})
			})
		}

		$scope.onTSActionComponentSelected = function(selector, $event) {
			$scope.stage.selectComponentModeAction.selector = selector;
			$scope.cancelTimeStateActionComponentInputFocused();
		}

		$scope.onTSActionAnimationClassSelected = function(animation) {
			var cssText = animation.cssText;
			var animName = animation.name;
			var animClassText = animation.classText;
			var js_anim_obj = importAnimationFromRawCssText(cssText, animName);
			var final_obj = initAnimationFromAnimObj(js_anim_obj);
			$scope.stage.selectComponentModeAction.animation = final_obj;
			console.log(final_obj);
			// var rawCSSText = indexCssRule.cssText;
			// var animationName = indexCssRule.name;
			// console.log('processing', animationName);
			// $scope.saveAnimationClass(final_obj, styleSheetName);
			// $scope.importFromCSSText(animation.cssText, animation.name, animation.classText);

			// $scope.stage.selectComponentModeAction.selector = selector;
			$scope.cancelTimeStateActionAnimationClassInputFocused();
		}

		$scope.onTimeStateActionAnimationClassInputFocused = function(time_state, action) {
			$scope.cancelTimeStateActionComponentInputFocused();
			$scope.stage.searchAnimationMode = true;
			$scope.stage.searchAnimationModeTimeState = time_state;
			$scope.stage.selectComponentModeAction = action;
		}

		$scope.cancelTimeStateActionAnimationClassInputFocused = function(time_state) {
			$scope.stage.searchAnimationMode = false;
			$scope.stage.searchAnimationModeTimeState = null;
			$scope.stage.selectComponentModeAction = null;
		}

		$scope.cancelTimeStateActionComponentInputFocused = function(time_state) {
			$scope.stage.selectComponentMode = false;
			$scope.selectComponentModeTimeState = null;
			$scope.stage.selectComponentModeAction = null;
		}

		$scope.removeTimeState = function(time_state, index) {
			$scope.stage.time_states.splice(index, 1);
		}

		$scope.initStageTimeState = function() {
			for (var i = 0; i < $scope.stage.time_states.length; i++) {
				var indexTimeState = $scope.stage.time_states[i];
				if (!indexTimeState.time) {
					LoadingService.show('There is already a time state without a time! Please remove or use that one');
					return;
				}
			}
			$scope.stage.time_states.push({description:null, time:10000, editMode:true, actions:[]});
			$timeout(function() {
				$scope.$apply();
				var allActionInputs = document.querySelectorAll('input.time-input');
				if (allActionInputs && allActionInputs.length) {
					var timeElem = allActionInputs[allActionInputs.length - 1]
					timeElem.select();
				}
			})
		}

		$scope.playStageTimeStates = function() {
			var stageElem = document.querySelector('#stage-container');
			var time_states = $scope.stage.time_states;
			if (stageElem) {
				$scope.stage.cache_html = stageElem.innerHTML;
			}

			var maxTimeState = 0;
			for (var i = 0; i < time_states.length; i++) {
				var indexTimeDelay = time_states[i].time;
				playTimeState(time_states[i].time, time_states[i].actions)
				if (parseInt(indexTimeDelay) > maxTimeState) {
					maxTimeState = indexTimeDelay;
				}
			}
			console.log('max time is', maxTimeState, 'ms');

			$timeout(function() {
				console.log('reinitializing in 5s');
				stageElem.innerHTML = $scope.stage.cache_html;
				$compile(stageElem)($scope);
			}, maxTimeState + 5000);
			$timeout(function() {
				LoadingService.showMsg('Reinitializing stage...', 2500, function() {
					LoadingService.showSuccess('Stage successfully reset', 2000);
				});
			}, 2500)

			function playTimeState(time_delay, actions) {
				$timeout(function() {
					for (var j = 0; j < actions.length; j++) {
						var index_action = actions[j];
						var indexAnimation = index_action.animation;
						var indexStageSelector = index_action.selector.replace('-clone', '');
						var actionElem = document.querySelector(indexStageSelector);

						actionElem.style[browserPrefix + 'AnimationName'] = indexAnimation.obj.name;
						actionElem.style['animationName'] = indexAnimation.obj.name;
						actionElem.style[browserPrefix + 'AnimationDuration'] = indexAnimation.attr.duration;
						actionElem.style['animationDuration'] = indexAnimation.attr.duration;
						actionElem.style[browserPrefix + 'AnimationIterationCount'] = indexAnimation.attr.iteration_count;
						actionElem.style['animationIterationCount'] = indexAnimation.attr.iteration_count;
						actionElem.style[browserPrefix + 'AnimationTimingFunction'] = indexAnimation.attr.timing_function;
						actionElem.style['animationTimingFunction'] = indexAnimation.attr.timing_function;
						actionElem.style[browserPrefix + 'AnimationFillMode'] = indexAnimation.attr.fill_mode;
						actionElem.style['animationFillMode'] = indexAnimation.attr.fill_mode;
						actionElem.style[browserPrefix + 'AnimationDirection'] = indexAnimation.attr.direction;
						actionElem.style['animationDirection'] = indexAnimation.attr.direction;
						actionElem.style[browserPrefix + 'AnimationDelay'] = indexAnimation.attr.delay;
						actionElem.style['animationDelay'] = indexAnimation.attr.delay;

					}
				}, parseInt(time_delay))
			}
		}

		$scope.addActionToTimeState = function(time_state) {
			time_state.actions.push({selector: 'replace with selector', animation: {attr:{name:'replace w/ animation'}}});
			$timeout(function() {
				$scope.$apply();
				var allActionInputs = document.querySelectorAll('input.action-input');
				if (allActionInputs && allActionInputs.length) {
					var classElem = allActionInputs[allActionInputs.length - 1]
					var selectorElem = allActionInputs[allActionInputs.length - 2];
					selectorElem.select();
				}
			})
		}

		$scope.remoteStateTimeStates = function(time_state, index) {
			if (time_state.time_confirmed && time_state.time_approved) {
				$scope.stage.time_state.splice(index, 1);
			}
		}

		function getShapeDict() {
			var shapeDict = {
				circle: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"><g fill="none"><circle stroke="rgba(255,255,255,0.8)" stroke-width="3" cx="50" cy="50" r="48.5"></circle><text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"><tspan x="50" y="54">circle</tspan></text></g></svg>',
				square: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="97" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="54">square</tspan> </text> </g> </svg>',
				rect: '<svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="100" viewBox="0 0 200 100"> <g fill="none"> <rect stroke="rgba(255,255,255,0.8)" stroke-width="3" x="1.5" y="1.5" width="197" height="97" rx="10"></rect> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="55">rectangle</tspan> </text> </g> </svg>',
				hexagon: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <polygon stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="50 1.5 98.5 25.75 98.5 74.25 50 98.5 1.5 74.25 1.5 25.75 "></polygon> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">hexagon</tspan> </text> </g> </svg>',
				octagon: '<svg on-double-tap="setAnimatableElement($event)" draggable width="100" height="100" viewBox="0 0 100 100"> <g fill="none"> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="50" y="55">octagon</tspan> </text> <path d="M70.0893578,1.5 L98.5,29.9106422 L98.5,70.0893578 L70.0893578,98.5 L29.9106422,98.5 L1.5,70.0893578 L1.5,29.9106422 L29.9106422,1.5 L70.0893578,1.5 L70.0893578,1.5 Z" stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>',
				parallelogram: '<svg on-double-tap="setAnimatableElement($event)" draggable width="200" height="50" viewBox="0 0 200 50"> <g fill="none"> <path d="M23.2259184,5.95340971 C24.481859,3.49385944 27.7347336,1.5 30.4909811,1.5 L188.498497,1.5 C194.022175,1.5 196.747033,5.61947272 194.58442,10.7016135 L180.454099,43.9078668 C179.37488,46.4440319 176.262066,48.5 173.499572,48.5 L11.4913933,48.5 C5.97329914,48.5 3.53587345,44.5130812 6.04949493,39.5905724 L23.2259184,5.95340971 Z" stroke="rgba(255,255,255,0.8)" stroke-width="3"></path> <text font-size="18" font-weight="600" fill="rgba(255,255,255,0.8)" text-anchor="middle"> <tspan x="100" y="30">parallelogram</tspan> </text> </g> </svg>',
				custom: null,
			}
			return shapeDict;
		}

		$scope.pageDom = {stageHtml: "", animElemSelector: "stage-elem", stageCss: ""};
		$scope.goToEditPageDom = function() {
			$scope.pageDom.stageHtml = document.querySelector('#stage-container').innerHTML;
		}

		function addSVGPlaceholder(svg_shape)  {


			if (svg_shape in defaults.SHAPE_DICT) {
				var newDiv = $scope.appendToPageDom(defaults.SHAPE_DICT[svg_shape]);
			}

			var stageElem = document.querySelector('#stage-container');
			var actorElem = stageElem.querySelector('#stage-elem') || stageElem.querySelector('#' + $scope.pageDom.animElemSelector);
			if (!actorElem) {
				$scope.setAnimatableElement({target: newDiv});
			}

		}

		$scope.addSVGPlaceholder = addSVGPlaceholder;

		$scope.resetStageDom = function() {
			var resetHtml = '<span class="initiator"> Html Successfully Reset! <br> Add some svg placeholder elements ! </span>'
			$scope.pageDom.stageHtml = resetHtml;

			LoadingService.showMsg('Resetting', 3000, function() {
				LoadingService.showSuccess('Success!', 2000);
				$scope.updatePageDom();
			})
		}

		$scope.appendToPageDom = function(html_node) {
			var tempWrapper= document.createElement('div');
			tempWrapper.innerHTML= html_node;
			var div= tempWrapper.firstChild;
			$compile(div)($scope);
			var stageElem = document.querySelector('#stage-container');
			var stageContainsInitiator = stageElem.querySelector('.initiator');
			if (stageContainsInitiator) {
				stageElem.removeChild(stageContainsInitiator);
			}
			stageElem.appendChild(div);
			return div;
		}

		$scope.selectComponentElement = function(component, $index, $event) {
			if (!$scope.asideTabIndex) {
				$scope.onTSActionComponentSelected(component.selector)
			} else {
				$scope.addAnimatableElement(component);

			}
		}

		$scope.addAnimatableElement = function(component) {
			if (!$scope.stage.anim_elements) {
				$scope.stage.anim_elements = [{selector: '#stage-elem', type:$scope.actor.nodeName}];
			}
			var stageContainer = document.querySelector('#stage-container');
			var numDraggable = stageContainer.querySelectorAll('[draggable]').length;
			if (component.orig_elem) {
				component.orig_elem.setAttribute("draggable", null);
				component.orig_elem.setAttribute("draggable-" + numDraggable, null);
				component.selector = "[draggable-" + numDraggable + ']';
				$timeout(function() {
					$compile(component.orig_elem)($scope);
					$scope.$apply();
					component.orig_elem = null;
				})
			}
			$scope.stage.anim_elements.push(component);
			$timeout(function() {
				renderAsideAnimatableElems();
				$scope.$apply();
			}, 100)
		}

		$scope.swapFocusedAnimatedElem = function(anim_elem) {
			$scope.actor.id = null;
			$scope.actor = null;
			// $scope.actor.setAttribute(anim_elem.replace('[','').replace(']', ''), null);
			// $scope.actor.setAttribute('draggable', null);
			var newStageElem = document.querySelector(anim_elem.selector);
			$scope.setAnimatableElement({target:newStageElem});
			$timeout(function() {
				updateStageElemCloneAside();
            	renderAsideAnimatableElems();
			})

		}

		$scope.setAnimatableElement = function($event) {



			var elem = $event.target;

			var allCurrentStageElems = document.querySelectorAll('#stage-elem');
			for (var i = 0; i < allCurrentStageElems.length; i++) {
				var indexCurrentStageElem = allCurrentStageElems[i];
				console.log('removing id stage-elem for elem', indexCurrentStageElem);
				indexCurrentStageElem.id = null;
			}

			elem.id = $scope.pageDom.animElemSelector || '#stage-elem';
			$scope.actor = elem;
			LoadingService.showMsg('updating...', 1000, function() {
				LoadingService.showSuccess('Complete!', 1000);
			})
			var stageElem = document.querySelector('#stage-container');
			// elem.style.stroke = 'white';
			// if (elem.nodeName === 'svg') {
			// 	var allInnerElements = elem.querySelectorAll('polgyon, rect, circle, path, text');
			// 	for (var i = 0; i < allInnerElements.length; i++) {
			// 		var indexElem = allInnerElements[i];
			// 		if (indexElem.nodeName === 'text') {
			// 			indexElem.style.fill = 'white';
			// 		} else {
			// 			indexElem.style.stroke = 'white';
			// 		}

			// 	}
			// }
			$compile(stageElem)($scope);
			elem.classList.add('animated', 'pulse');
			$timeout(function() {
				elem.classList.remove('animated', 'pulse', 'infinite');
			}, 1000)
		}

		function importPageDom(stage_template) {

			$scope.stage = stage_template;
			for (var i = 0; i < $scope.stage.time_states.length; i++) {
				var indexTimeState = $scope.stage.time_states[i];
				for (var j = 0; j < indexTimeState.actions.length; j++) {
					var indexAction = indexTimeState.actions[j];
					if (indexAction.animation && indexAction.animation.attr && indexAction.animation.attr.name) {
						var animationObj = findAnimationByName(indexAction.animation.attr.name, $scope.imports.animations)
						var cssText = animationObj.cssText;
						var animName = animationObj.name;
						var animClassText = animationObj.classText;
						var js_anim_obj = importAnimationFromRawCssText(cssText, animName);
						var final_obj = initAnimationFromAnimObj(js_anim_obj);
						indexAction.animation = final_obj;
					}
				}
			}
			$localstorage.setObject('last_stage_active', $scope.stage.stageName);
			if (!$scope.stageDropdown.stageActive) {
				$timeout(function() {
					initStageDropdown();
				})
			}
			$scope.updatePageDom(stage_template.stageName, stage_template.stageHtml, stage_template.stageCss, stage_template.animElemSelector.replace('#', ''));
		}
		$scope.importPageDom = importPageDom;

		function findAnimationByName(name, animation_arr) {
			for (var i = 0; i < animation_arr.length; i++) {
				var indexAnimation = animation_arr[i];
				if (indexAnimation.name === name) {
					return indexAnimation
				}
			}
		}
		function updateStageElemCloneAside(stage_elem) {
			var stageElem = stage_elem || document.querySelector('#stage-elem');
			if (!stageElem) {
				var stageContainer = document.querySelector('#stage-container');
				stageElem = stageContainer.firstChild;
			}
			var clonedNode = stageElem.cloneNode(true);
			var asideElementContainer = document.querySelector('#stage-elem-clone-container')

			if (asideElementContainer) {
				asideElementContainer.innerHTML = '';
				var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
				if (allShapes.indexOf(clonedNode.nodeName) > -1) {
					var parentSVG = findParentSVG(stageElem);
					var clonedParentSVG = parentSVG.cloneNode(true);
					clonedParentSVG.innerHTML = "";
					clonedParentSVG.appendChild(clonedNode);
					clonedParentSVG.id = 'stage-elem-clone';
					clonedParentSVG.className += ' absolute';
					clonedParentSVG.style.minWidth = "150px";
					clonedParentSVG.style.minHeight = "150px";
					clonedParentSVG.style.maxWidth = "200px";
					clonedParentSVG.style.maxHeight = "200px";
					asideElementContainer.appendChild(clonedParentSVG);
				}
				else {
					clonedNode.id = 'stage-elem-clone';
					clonedNode.style.minWidth = "150px";
					clonedNode.style.minHeight = "150px";
					clonedNode.className += ' absolute';
					clonedNode.style.maxWidth = "200px";
					clonedNode.style.maxHeight = "200px";
					asideElementContainer.appendChild(clonedNode);
				}
			}
			$timeout(function() {
				$scope.$apply();
			})
		}

		$scope.updatePageDom = function(stage_name, stage_html, stage_css, anim_selector) {
			$scope.pageDom.stageHtml = stage_html || $scope.pageDom.stageHtml;
			$scope.pageDom.stageCss = stage_css || $scope.pageDom.stageCss;
			$scope.pageDom.stageName = stage_name || $scope.pageDom.stageName;
			$scope.pageDom.animElemSelector = anim_selector || $scope.pageDom.animElemSelector;

			LoadingService.showAmbig(null, 1000);
			if ($scope.pageDom.stageHtml && $scope.pageDom.stageHtml.length) {
				var stageContainer = document.querySelector('#stage-container');
				stageContainer.innerHTML = $scope.pageDom.stageHtml;
				if (stageContainer.firstChild) {
					var stageElem = document.querySelector('#stage-elem');
					if (stageElem) {
						$scope.actor = stageElem;
						stageElem.setAttribute("draggable", true);
						updateStageElemCloneAside();
					} else {
						if (stageContainer && stageContainer.firstChild) {
							$scope.actor = stageContainer.firstChild;
							if (stageContainer.firstChild.setAttribute) {
								stageContainer.firstChild.setAttribute("draggable", true);
								updateStageElemCloneAside();
							}
						} else {
							$timeout(function() {
								$scope.updatePageDom(stage_name, stage_html, stage_css, anim_selector);
							}, 1000)
						}
					}
					if (stageContainer.children && stageContainer.children.length === 1) {
						var firstChild = stageContainer.children[0];
						var firstChildDimensions = firstChild.getBoundingClientRect();
						console.log(firstChild);
						if (!firstChildDimensions.height || !firstChildDimensions.width) {
							firstChild.className += ' absolute';
							firstChild.style.height = "75%";
							firstChild.style.width = "75%";
							firstChild.style.right = "12.5%";
							firstChild.style.top = "12.5%";
						}
					}
				}
				$compile(stageContainer)($scope);
				$scope.asideTabIndex = 0;
				// var clonedNode = stageElem.cloneNode(true);
				// clonedNode.id = 'stage-elem-clone';
				// clonedNode.style.minWidth = "200px";
				// clonedNode.style.minHeight = "200px";
				// var asideElementContainer = document.querySelector('#stage-elem-clone-container')
				// if (asideElementContainer) {
				// 	asideElementContainer.innerHTML = '';
				// 	asideElementContainer.appendChild(clonedNode);
				// }
				// $timeout(function() {
				// 	$scope.$apply();
				// })
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
				style.innerHTML = $scope.stage.stageCss;
				document.getElementsByTagName("head")[0].appendChild(style);
				$compile(stageElem)($scope);
			} else {
				var previousStyle = document.querySelector('#stage-css');
				if (previousStyle) {
					previousStyle.parentNode.removeChild(previousStyle);
				}
			}
			$scope.layout.index = 0;
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
			console.log(newPercentValue);
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
				var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'transformOrigin', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
				var cssToChange = {transform: {}, etc: {}};
				for (var i = 0; i < currentPropertiesModified.length - 1; i++) {
					var indexPropertyName = currentPropertiesModified[i]
					console.log('traversing all keyframes from t=0 to t=', newValue - 1, 'to search for the last ', indexPropertyName, 'edit, if it exists');
					for (var j = 0; j < newValue - 1; j++) {
						console.log('checking t=', j, 'for traces of', indexPropertyName);
						var previousIndexPercentValue = getNthSortedKeyText($scope.animation.obj, j);
						if (!previousIndexPercentValue) {
							continue;
						}
						var previousIndexProperty = $scope.animation.properties[previousIndexPercentValue + '%'];
						console.log(previousIndexProperty)
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


				$scope.animation.obj.name = $scope.animation.obj.name + '-edit';
				elem.style[browserPrefix + "AnimationName"] = $scope.animation.obj.name;




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

		function exportExternalCSSKeyFrameFiles(css_file_names) {
			var ss = document.styleSheets;
			var allRuleObjs = [];
			var allRuleDict = {};
			var count = 0;
		    for (var i = 0; i < ss.length; ++i) {
		    	var styleSheetName;
		    	if (ss[i].href) {
		    		var styleSheetName = ss[i].href.split('/').reverse()[0].replace('.css', '');
		    		if (css_file_names.indexOf(styleSheetName) > -1) {
		    			allRuleDict[styleSheetName] = [];
		    		}
		    	}
		    	if (ss[i].cssRules && ss[i].cssRules.length) {
		    		for (var j = 0; j < ss[i].cssRules.length; ++j) {
		            	if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE) {
		            		allRuleObjs.push(ss[i].cssRules[j]);
		            		if (styleSheetName in allRuleDict) {
		            			var indexCssRule = ss[i].cssRules[j];
		            			var rawCSSText = indexCssRule.cssText;
		            			var animationName = indexCssRule.name;
		            			// console.log('processing', animationName);
		            			var js_anim_obj = importAnimationFromRawCssText(rawCSSText, animationName);
		            			var final_obj = initAnimationFromAnimObj(js_anim_obj);
		            			$scope.saveAnimationClass(final_obj, styleSheetName);
		            			console.log(final_obj);
		      //       			var js_anim_obj = importAnimationFromRawCssText(indexCssRule.css_text, name);


		            		}
		            	}
		        	}
		    	}
		    }
		    console.log($scope.imports.animations.length);
		    $timeout(function() {
		    	$scope.$apply()
		    })
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
				console.log(anim, index);
				var keyTexts = [];
				for (var i = 0; i < anim.cssRules.length; i++) {
					var cssIndexKFRule = anim.cssRules.item(i);
					console.log(cssIndexKFRule)
					if (cssIndexKFRule) {
						var keyText = cssIndexKFRule.keyText;
						keyTexts.push(parseFloat(keyText.replace('%', '')));
					}
				}
				console.log('before sort', keyTexts.slice())
				keyTexts.sort(function(a, b) {
					return b - a;
				}).reverse();
				console.log('after sort', keyTexts.slice())
				// console.log(keyTexts.slice(), index, keyTexts.reverse(), keyTexts.reverse())
				return keyTexts[keyTexts.indexOf(index)];
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
			console.log('about to apply property change', value, property, desiredIndex);
			editKeyframeAtX($scope.animation, desiredIndex, property, value);
			console.log($scope.animation.obj.cssText);
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
			console.log('properties', anim.properties, keyframe_percent);
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
			var nonTransformProperties = ['opacity', 'fill', 'backgroundColor', 'strokeDashArray', 'strokeOpacity', 'transformOrigin', 'transformOrigin', 'strokeWidth', 'strokeDashOffset','stroke', 'fillOpacity', 'color'];
			var cssToChange = {transform: {}, etc: {}};
			var newPropertiesToModify = Object.keys($scope.animation.selected_keyframe.modified);

			for(var i = 0; i < newPropertiesToModify.length; i++) {
				var indexPropertyName = newPropertiesToModify[i];

				console.log(indexPropertyName);
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
				this.transformOriginX = '50%';
				this.transformOriginY = '50%';
				this.transformOriginZ = 0;
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

		$scope.updateDefaults = function(value, property) {

			if (property in $scope.defaults.properties && property in $scope.defaults.units) {
				$scope.defaults.properties[property] = parseInt(value);
				$localstorage.setObject('defaults', $scope.defaults);
				LoadingService.showSuccess(property + ' with value of ' + value + $scope.defaults.units[property].default + ' saved as default & cached', 2500);
				console.log($localstorage.getObject('defaults'));
			}
		}

		function getDefaults () {

			var defaults =  {
				units: {
					translateX: { options: ['px', '%'], selected: '%', default: '%'},
					translateY: { options: ['px', '%'], selected: '%', default: '%'},
					translateZ: { options: ['px', '%'], selected: '%', default: '%'},
					transformOriginX: { options: ['px', '%'], selected: '%', default: '%'},
					transformOriginY: { options: ['px', '%'], selected: '%', default: '%'},
					transformOriginZ: { options: ['px'], selected: 'px', default: 'px'},
				},
				properties: {
					transformOriginX: 50,
					transformOriginY: 50,
					transformOriginZ: 0,
					translateX: 0,
					translateY: 0,
					translateZ: 0,
					scaleX: 1,
					scaleY: 1,
					rotate: '0deg',
					rotateX: '0deg',
					rotateY: '0deg',
					rotateZ: '0deg',
					skewX: '0deg',
					skewY: '0deg',
					opacity: 1,
					backgroundColor: '#FFFFFF',
					color: '#FFFFFF',
					fill: '#FFFFFF',
					fillOpacity: 1,
					strokeWidth: 1,
					strokeDasharray: 5,
					strokeDashoffset: 1
				}
			}
			console.log($localstorage.getObject('defaults'));
			if (!$localstorage.getObject('defaults') || ($localstorage.getObject('defaults') === [] && !$localstorage.getObject('defaults').length)) {

				$localstorage.setObject('defaults', defaults)
				defaults = $localstorage.getObject('defaults');
				return defaults;

			} else {
				defaults = $localstorage.getObject('defaults');
				console.log(defaults);
				return defaults;
			}
			$timeout(function() {
				$scope.$apply();
			})

		}

		function applyDefaultProperties(defaults) {
			var properties = defaults.properties;
			var units = defaults.units;
			if (units && properties) {
				var propertyNames = Object.keys(properties);
				var currentlySupported = ['transformOriginX', 'transformOriginY', 'transformOriginZ'];
				for (var i = 0; i < propertyNames.length; i++) {
					var indexProperty = propertyNames[i];
					if (currentlySupported.indexOf(indexProperty) > -1 && indexProperty.indexOf("transformOrigin") > -1) {
						var transformOriginValue = properties['transformOriginX'] + units['transformOriginX'].default + " " + properties['transformOriginY'] + units['transformOriginY'].default + " " + properties['transformOriginZ'] + units['transformOriginZ'].default;
						console.log('transform origin set to', transformOriginValue);
						$scope.actor.style.transformOrigin = transformOriginValue;
						$scope.actor.style[browserPrefix + 'TransformOrigin'] = transformOriginValue;
					}
				}
			}
		}

		function hardCodeStageDimensions() {
			$timeout(function() {
				var stageContainer = document.querySelector('#stage-container');
				var stageDimensions = stageContainer.getBoundingClientRect();
				console.log(stageDimensions);
				var height = stageDimensions.height;
				var width = stageDimensions.width;
				stageContainer.style.height = height + 'px;'
				stageContainer.style.width = width + 'px;'
				console.log(stageContainer);
			}, 3000)

		}


		function initView() {
			browserPrefix = getBrowserPrefix();
			// $scope.importFromCSSText()

			//turn off for now
			false && loadAllS3Files();
			importAnimations();
			importStageHtml();
			initShortCuts();
			hardCodeStageDimensions();

			$scope.defaults = getDefaults();
			applyDefaultProperties($scope.defaults);
			$scope.actor = document.querySelector('#stage-elem');
			initAnimationListener($scope.actor);

			$scope.animation = initAnimation('sample-animation-2', browserPrefix, defaults.KF_COUNT, defaults.DURATION);
			$scope.animationDropdown = {options:[$scope.animation.attr.name, '+'], selectedIndex: 0, label:'temp-animation', size:'small'};
			// $scope.resetStageDom();
			// $scope.addSVGPlaceholder('circle');
			// $scope.addSVGPlaceholder('square');
			// $scope.addSVGPlaceholder('octagon');
			// $scope.addSVGPlaceholder('hexagon');
			// $scope.addSVGPlaceholder('rect');
			// $scope.addSVGPlaceholder('parallelogram');
			// editKeyframeAtX($scope.animation, 0, 'translateX', 10)


		}
		$scope.renderAnimationCSSText = function(animation) {
			// $scope.layout.index = 2;

			var tempAnim = initAnimationFromCSSText(animation.obj.name, browserPrefix, animation.obj.cssText);
			var cssRulesLength = animation.obj.cssRules.length;
			for (var i = 0; i < cssRulesLength; i++) {
				var indexKFRule = animation.obj.cssRules.item(i);
				var indexKeyText = indexKFRule.keyText;
				var indexKeyStyle = indexKFRule.cssText;
				if (!(indexKeyStyle.indexOf('{ }') > -1)) {
					tempAnim.appendRule(indexKeyStyle, 0)
				}
			}
			var animClassText = generateClassText(animation);
			animation.exportable_kf = {obj: tempAnim, className: tempAnim.name, classText: animClassText, fullText: animClassText + tempAnim.cssText, cssText: tempAnim.cssText};

			$timeout(function() {
				// angular.element(document.querySelector('#export-textarea')).select()
				document.querySelector('#export-textarea').select();
				// window.prompt("Copy to clipboard: Ctrl+C, Enter", $scope.animation.exportable_kf.fullText);
				document.execCommand('copy')
			}, 1000)
			function generateClassText(anim) {
				 return "." + anim.obj.name + "\n{\n   " + ' animation:  ' + anim.obj.name + '  ' + anim.attr.duration  + '  ' + anim.attr.timing_function + ' ' + anim.attr.delay + ' ' + anim.attr.iteration_count + ' ' + anim.attr.direction + ';\n    ' + browserPrefix + '-' + 'animation:  ' + anim.obj.name + ' ' + anim.attr.duration  + ' ' + anim.attr.timing_function + ' ' + anim.attr.delay + ' ' + anim.attr.iteration_count + ' ' + anim.attr.direction + ';\n}\n\n'
			}
		}


		$scope.exports = {animations: []};
		$scope.saveAnimationClass = function(animation, owner) {
			if (!animation.exportable_kf) {
				$scope.renderAnimationCSSText(animation);
			}
			if (animation.exportable_kf.className.length && animation.exportable_kf.classText.length) {
				var payloadDict = {
					name: animation.exportable_kf.className,
					owner: owner || $scope.user.name.split(' ')[0].toLowerCase(),
					lastUpdated: (new Date()).getTime(),
					classText: animation.exportable_kf.classText,
					cssText: animation.exportable_kf.cssText
				}

				var animationIndex = checkIfAnimationAlreadyExists(payloadDict, $scope.imports.animations)

				if (animationIndex < 0) {
					LoadingService.showMsg('Adding ' + payloadDict.name + ' animation to server', 2500);
					$scope.imports.animations.push(payloadDict);
				} else {
					LoadingService.showMsg('Updating ' + payloadDict.name + ' animation to server', 2500);
					var removedElem = $scope.imports.animations.splice(animationIndex, 1);
					console.log('removed', removedElem && removedElem.name);
					$scope.imports.animations.push(payloadDict);
					console.log('re added', payloadDict.name);
				}
				$localstorage.setObject('imports', $scope.imports);

				$timeout(function() {
					var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/';
					saveToMasterS3('animations.json', animation_url, $scope.imports.animations);
				})

				return payloadDict;
			}

			function checkIfAnimationAlreadyExists(obj, arr_obj) {
				for (var i = 0; i < arr_obj.length; i++) {
					var indexAnimObj = arr_obj[i];
					if (indexAnimObj.name === obj.name) {
						return i;
					}
				}
				return -1;
			}
		}

		$scope.saveStageHtml = function(ignore_loader) {

			console.log($scope.imports);
			if ($scope.stage && $scope.stage.stageName) {
				$scope.stage.stageHtml = document.querySelector('#stage-container').innerHTML;
				var stageIndex = checkIfStageAlreadyExists($scope.stage, $scope.imports.stages)

				if (stageIndex < 0) {
					!ignore_loader && LoadingService.showMsg('Adding ' + $scope.stage.stageName + ' stage to server', 2500);
					$scope.imports.stages.push($scope.stage);
				} else {
					!ignore_loader &&  LoadingService.showMsg('Updating ' + $scope.stage.stageName + ' animation to server', 2500);
					var removedElem = $scope.imports.stages.splice(stageIndex, 1);
					console.log('removed', removedElem && removedElem.stageName);
					$scope.imports.stages.push($scope.stage);
					console.log('re added', $scope.stage.stageName);
				}
			}

			$localstorage.setObject('imports', $scope.imports);

			$timeout(function() {
				var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/';
				saveToMasterS3('stages.json', animation_url, $scope.imports.stages);
			})

			return $scope.stage;

			function checkIfStageAlreadyExists(obj, arr_obj) {
				for (var i = 0; i < arr_obj.length; i++) {
					var indexStageObj = arr_obj[i];
					if (indexStageObj.stageName === obj.stageName) {
						return i;
					}
				}
				return -1;
			}
		}

		function processAnimations(animation_arr) {
			for (var i = 0; i < animation_arr.length; i++) {
				var indexAnimation = animation_arr[i];
				if (indexAnimation.owner === 'asif') {
					indexAnimation.owner = 'samir';
				}
			}
			return animation_arr
		}
		var tempStage = {};
		$scope.importCodepenTemplate = function(url, name) {
			tempState = {};
			if (!url || !name) {
				LoadingService.showMsg('Please add a name to the template so we can save it!', 2000);
				return;
			}


			$timeout(function() {
				FileService.getCodepenAssets('html', url + '.html', htmlCallback);
			})
			$timeout(function() {
				FileService.getCodepenAssets('css', url + '.css', cssCallback);
			})

			$timeout(function() {
				LoadingService.hide();
				tempStage.name = name;
				$scope.stage = initNewStage(tempStage.name, tempStage.html, tempStage.css);


				$scope.updatePageDom($scope.stage.stageName, $scope.stage.stageHtml, $scope.stage.stageCss);
				var stageOptions = [tempStage.name, 'save', 'save and import', 'save and clear'];
				var stageLabel = 'Active Stage'
				$scope.stageDropdown = {options: stageOptions, selectedIndex:0, label: stageLabel, onOptionClick:onStageDropdownClick, stageActive:true, size:'small'};
				// $scope.saveStageHtml(true);

			}, 3000);
			LoadingService.showAmbig('Importing...', 2500);
			function cssCallback(resp) {
				tempStage.css = resp;
			}
			function htmlCallback(resp) {
				tempStage.html = resp;
			}
		}

		function saveToMasterS3(filename, url, obj) {
			console.log('about to save to master with url', url + filename, obj);
			FileService.postS3JsonFile(JSON.stringify(obj), null, url + filename, function(name, resp) {});
		}

		function importAnimations() {
			$scope.imports = $localstorage.getObject('imports');
			var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/animations.json';
			FileService.getS3JsonFile(null, animation_url, function(name, resp) {$scope.imports.animations = processAnimations(resp);});
		}

		function defaultStates() {
			var preAppStates = {

				'templates/splash.html':'SplashController',
				'templates/elements/layouts/powerups.html': 'PowerupController',
				'templates/maps.html': 'GMapController',
				'templates/splash/swiper/splash.hiw.container.html': 'HowItWorksController',
				'templates/splash/swiper/splash.account.container.html': 'SignupController',
				'templates/splash/swiper/splash.demographics.container.html': 'DemographicController',
				'templates/splash/swiper/splash.courses.container.html': 'CoursesController',
				'templates/splash/swiper/splash.access.container.html': 'AccessController',
				'templates/splash/layout/university.search.html': 'UniversitySearchController',
				'templates/splash/layout/splash.sidebar.html': 'SidebarController',
			}
			allTemplates = Object.keys(preAppStates);
			for (var i = 0; i < allTemplates.length; i++) {
				var html = '<div ng-include="img_base + ' + "'" + allTemplates[i] + "'" + '" ng-controller="' + preAppStates[allTemplates[i]] + '"> </div>'
				preAppStates[allTemplates[i]] = {controller: preAppStates[allTemplates[i]], owner: 'samir', url: allTemplates[i] + "", html:html};
			}
			preAppStates[allTemplates[0]].name = 'Splash';
			preAppStates[allTemplates[1]].name = 'Splash Powerups';
			preAppStates[allTemplates[2]].name = 'Splash Maps';
			preAppStates[allTemplates[3]].name = 'Splash Hiw';
			preAppStates[allTemplates[4]].name = 'Splash Account';
			preAppStates[allTemplates[5]].name = 'Splash Demographics';
			preAppStates[allTemplates[6]].name = 'Splash Courses';
			preAppStates[allTemplates[7]].name = 'Splash Access';
			preAppStates[allTemplates[8]].name = 'Splash Search University';
			preAppStates[allTemplates[9]].name = 'Splash Sidebar';
			for (var i = 0; i < allTemplates.length; i++) {
				var template = preAppStates[allTemplates[i]];
				$scope.imports.stages.push(initNewStage(template.name, template.html, ''));
			}
			// $scope.saveStageHtml();
		}

		function processStages(stages) {
			for (var i = 0; i < stages.length; i++) {
				var indexStage = stages[i];
				indexStage.owner = 'samir';
			}

		}

		function importStageHtml() {
			$scope.imports = $localstorage.getObject('imports');
			if (!$scope.imports.stages) {
				$scope.imports.stages = [];
				$localstorage.setObject('imports', $scope.imports);
			}
			var animation_url = 'https://s3.amazonaws.com/uguru-admin/master/stages.json';
			FileService.getS3JsonFile(null, animation_url, function(name, resp) { $scope.imports.stages = resp; processStages($scope.imports.stages);});
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
						newAnim.appendRule(indexKeyFrame.cssText, j);
					}
					// console.log(animToClone, Object.keys(cssRulesToClone));
				}
			}
			return newAnim;
		}




		$scope.asideTabIndex = 2;
		$scope.importLayoutIndex = 3;
		$scope.showChildrenOfParentElemOnClick = function() {
			$scope.stage.selectComponentMode = true;
			var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
			allChildActorElems = $scope.actor.querySelectorAll('*');
			$scope.stage.components = [];
			for (var i = 0; i < allChildActorElems.length; i++) {
				$scope.stage.components.push({selector: '[draggable-clone-' + i + ']'});
			}
			$timeout(function() {
				var allContainers = document.querySelectorAll('.cloned-animatable-elem-container')
				for (var i = 0; i < allChildActorElems.length; i++) {
					var indexElem = allChildActorElems[i];
					var clonedNode = indexElem.cloneNode(true);
					// clonedNode.setAttribute('draggable-clone', null);
					// clonedNode.setAttribute('draggable-clone-' + i, null);
					var indexContainer = allContainers[i];
					$scope.stage.components[i].type = indexElem.nodeName;
					$scope.stage.components[i].orig_elem = indexElem;
					$scope.stage.components[i]._class = indexElem.getAttribute('class');
					if (allShapes.indexOf(clonedNode.nodeName) > - 1) {
						var parentSVG = findParentSVG(indexElem);
						var clonedParentSVG = parentSVG.cloneNode(true);
						clonedParentSVG.innerHTML = "";
						clonedParentSVG.style.minWidth = '100px';
						clonedParentSVG.style.minHeight = '100px';
						clonedParentSVG.className += " absolute flex-wrap-center full-xy"
						clonedParentSVG.appendChild(clonedNode);
						indexContainer.appendChild(clonedParentSVG);
						secondClonedParent = clonedParentSVG.cloneNode(true);
						indexContainer.appendChild(secondClonedParent);
					} else {
						clonedNode.style.minWidth = '100px';
						clonedNode.style.minHeight = '100px';
						clonedNode.className += " absolute flex-wrap-center full-xy"
						indexContainer.appendChild(clonedNode);
						secondClonedNode = clonedNode.cloneNode(true);
						indexContainer.appendChild(secondClonedNode);

					}
				}
			}, 100)

			$timeout(function() {
				$scope.$apply();
			})
		}

		function findParentSVG(elem) {
			return (elem.nodeName === 'svg' && elem) || findParentSVG(elem.parentNode);
		}

		$scope.asideTabIndexwatcher = $scope.$watch('asideTabIndex', function(new_val, old_val) {
			switch (new_val) {

            case 2:
              //init map
             	updateStageElemCloneAside();
             	renderAsideAnimatableElems();


         }
		});

		function renderAsideAnimatableElems() {
			if (!$scope.stage) {
				return;
			}
			if (!$scope.stage.anim_elements) {
				$scope.stage.anim_elements = [];
			}
			var allShapes = ['path', 'line', 'polygon', 'polyline', 'g', 'rect', 'ellipse', 'circle', 'tspan', 'text'];
			var allAnimElemItemContainers = document.querySelectorAll('.aside-anim-element-item');
			for (var i = 0; i < $scope.stage.anim_elements.length; i++) {
				var indexAnimElem = $scope.stage.anim_elements[i];
				if(indexAnimElem.selector) {
					console.log('searching for...', indexAnimElem.selector);
					var stageContainer = document.querySelector('#stage-container');
					var dragAttribute = indexAnimElem.selector.replace('[', '').replace('', ']') + "";
					var elem = stageContainer.querySelector(indexAnimElem.selector)
					if (elem) {
						var clonedElem = elem.cloneNode(true);
						clonedElem.removeAttribute('draggable');
						clonedElem.removeAttribute(dragAttribute);
						clonedElem.style.maxHeight = "50px;"
						clonedElem.style.maxWidth = "50px;"
						clonedElem.style.minHeight = "50px;"
						clonedElem.style.minWidth = "50px;"
						clonedElem.className += ""
						allAnimElemItemContainers[i].innerHTML = "";
						if (allShapes.indexOf(clonedElem.nodeName) > -1) {
							var parentSVG = findParentSVG(elem);
							var clonedParentSVG = parentSVG.cloneNode(true);
							clonedParentSVG.innerHTML = "";
							clonedParentSVG.appendChild(clonedElem);
							allAnimElemItemContainers[i].appendChild(clonedParentSVG);
						} else {
							allAnimElemItemContainers[i].appendChild(clonedElem);
						}





					}
				}

			}
		}

		$scope.importFromCSSText = function(css_text, name, class_text) {
			// var css_text = "@keyframes animation { 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -300, 0, 0, 1); } 2.92% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -135.218, 0, 0, 1); } 3.37% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -114.871, 0, 0, 1); } 3.47% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -110.596, 0, 0, 1); } 4.58% { -webkit-transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); transform: matrix3d(2.061, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -68.65, 0, 0, 1); } 5.69% { -webkit-transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); transform: matrix3d(2.321, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -36.551, 0, 0, 1); } 5.76% { -webkit-transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); transform: matrix3d(2.32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -34.768, 0, 0, 1); } 7.41% { -webkit-transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); transform: matrix3d(1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.804, 0, 0, 1); } 7.51% { -webkit-transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); transform: matrix3d(1.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.454, 0, 0, 1); } 7.88% { -webkit-transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); transform: matrix3d(1.771, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 2.008, 0, 0, 1); } 8.68% { -webkit-transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); transform: matrix3d(1.408, 0, 0, 0, 0, 1.181, 0, 0, 0, 0, 1, 0, 9.646, 0, 0, 1); } 10.03% { -webkit-transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); transform: matrix3d(0.982, 0, 0, 0, 0, 1.333, 0, 0, 0, 0, 1, 0, 16.853, 0, 0, 1); } 10.85% { -webkit-transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); transform: matrix3d(0.822, 0, 0, 0, 0, 1.398, 0, 0, 0, 0, 1, 0, 18.613, 0, 0, 1); } 11.53% { -webkit-transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); transform: matrix3d(0.732, 0, 0, 0, 0, 1.439, 0, 0, 0, 0, 1, 0, 18.992, 0, 0, 1); } 12.22% { -webkit-transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); transform: matrix3d(0.672, 0, 0, 0, 0, 1.469, 0, 0, 0, 0, 1, 0, 18.618, 0, 0, 1); } 14.18% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 15.054, 0, 0, 1); } 14.37% { -webkit-transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); transform: matrix3d(0.612, 0, 0, 0, 0, 1.501, 0, 0, 0, 0, 1, 0, 14.604, 0, 0, 1); } 19.23% { -webkit-transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); transform: matrix3d(0.737, 0, 0, 0, 0, 1.371, 0, 0, 0, 0, 1, 0, 3.855, 0, 0, 1); } 20.01% { -webkit-transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); transform: matrix3d(0.763, 0, 0, 0, 0, 1.338, 0, 0, 0, 0, 1, 0, 2.724, 0, 0, 1); } 23.05% { -webkit-transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); transform: matrix3d(0.856, 0, 0, 0, 0, 1.211, 0, 0, 0, 0, 1, 0, 0.036, 0, 0, 1); } 25.75% { -webkit-transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); transform: matrix3d(0.923, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, -0.709, 0, 0, 1); } 26.94% { -webkit-transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); transform: matrix3d(0.947, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, -0.76, 0, 0, 1); } 31.58% { -webkit-transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); transform: matrix3d(1.009, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, -0.406, 0, 0, 1); } 31.73% { -webkit-transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); transform: matrix3d(1.01, 0, 0, 0, 0, 0.986, 0, 0, 0, 0, 1, 0, -0.392, 0, 0, 1); } 37.32% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.03, 0, 0, 1); } 38.15% { -webkit-transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); transform: matrix3d(1.029, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -0.008, 0, 0, 1); } 42.35% { -webkit-transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); transform: matrix3d(1.022, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0.03, 0, 0, 1); } 48.9% { -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); transform: matrix3d(1.007, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.009, 0, 0, 1); } 57.77% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 60.47% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); } 69.36% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 83.61% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } ";
			var js_anim_obj = importAnimationFromRawCssText(css_text, name);
			var final_obj = initAnimationFromAnimObj(js_anim_obj);
			$scope.animationDict.importClassText = class_text;
			$scope.animationDict.importTextarea = css_text;
			$scope.animationDict.importInput = name;
			$scope.animationDropdown.options[0] = name;
			$scope.animation = final_obj;
			return final_obj;
		}



		$timeout(function() {

			initAll();
			$timeout(function() {
				// exportExternalCSSKeyFrameFiles(['animation'])
				// angular.element(document.querySelector('#import-button')).triggerHandler('click');
				// $scope.importCodepenTemplate('http://codepen.io/teamuguru/pen/29ce58caa079980bb9375afa30efcb57');
			}, 5000)

		}, 500)

	}

]);