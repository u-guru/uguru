
angular.module('uguru.dev.controllers')

.controller('DevToolsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'LoadingService',
  'Restangular',
  '$compile',
  '$sce',
  'AnimationService',
  'KeyboardService',
  '$interval',
  'FileService',
  'DevToolService',
  function($scope, $state, $timeout, $localstorage, LoadingService, Restangular, $compile, $sce, AnimationService, KeyboardService, $interval, FileService, DevToolService) {

    // KeyboardService.preventDefaultCutPaste();
    // KeyboardService.initCopyPasteFunctionCallbacks();
    var commandPressed = false;
    var buildPlayerMouseOutListenerFunc, buildPlayerKeyboardShortCutsFunc,
    buildPlayerDblClickListenerFunc, buildPlayerMouseOverListenerFunc, buildPlayerMouseDownListenerFunc,
    buildPlayerMouseOutListenerFunc, buildPlayerMouseUpListenerFunc;
    var buildPlayerDisplayHideArr = []

    $scope.current_file = {selected_variation:{components:[]}};


    var onCmdPressed = function(e) {
      if(e.metaKey) {
        console.log('command key pressed');
        commandPressed = true;
        initAllListeners()
      }
      if (e.ctrlKey) {
       console.log('ctrl key pressed');
       document.addEventListener('keydown', buildPlayerKeyboardShortCutsFunc);
      }
      //component mode
      if ($scope.page.dropdowns.filterOptions.selectedIndex) {

      }
    }

    var onCmdReleased = function(e) {

      if(e.metaKey || e.keyCode === 91) {
        console.log('command key released');
        commandPressed = false;
      }
      if (e.ctrlKey || e.keyCode == 17) {
       console.log('ctrl key released');
      }

      destroyAllBuildPlayerListeners();
    }

    KeyboardService.initOptionPressedAndReleasedFunction(onCmdPressed, onCmdReleased);

    $scope.selected = {
      property: null,
      component: null
    }
    $scope.player = {hide: false, status_message: null};

    $scope.status = {
      show: true,
      msg: 'loading..'
    }

    if (!$scope.user || !$scope.user.id) {
      $scope.player.hide = true;
      $scope.player.status_message = 'Please login first!';
    }

    $timeout(function() {
      $scope.fileUtility = FileService.initUserAdminTool();
      $scope.fileUtility.get($scope);
    })

    var keyCodeDict = {
      'ctrl': 17,
      'enter': 13,
      'shift': 16,
      's': 83,
      'p': 80,
      'f': 70,
      'k': 75,
      '\\': 220,
      '/': 191,
      'space': 32

    }


    $scope.shortcuts = [
      // {
      //   name: "settings", keys:"shift + s", codes: [17, 83]
      // },
      {
        name: "view shortcuts", keys:"ctrl + z", codes: [17,191]
      },
      {
        name: "view files", keys:"ctrl + f", codes: [17,70]
      },
      {
        name: "stage edit mode", keys:"hold CMD + ___"
      },
      {
        name: "temporarily remove component", keys:"hold CMD + double click"
      },
      {
        name: "play scene/element", keys:"space"
      },
      {
        name: "save", keys:"ctrl + s"
      }
    ]

    var buildPlayerKeyboardShortCutsFunc = function(e) {

        if (e.keyCode === 191 || e.keyCode === 90) {
          console.log('slash clicked');
          if ($scope.settings.key_shortcuts) {
            $scope.settings.key_shortcuts = false;
            $scope.settings.activated = false;
          } else {
            $scope.settings.activated = true;
            $scope.settings.key_shortcuts = true;
          }
        }
        if (e.keyCode === 70) {
          if ($scope.settings.view_files) {
            $scope.settings.activated = false;
            $scope.settings.view_files = false;
          } else {
            $scope.settings.activated = true;
            $scope.settings.view_files = true;
          }
        }
        if (e.keyCode === 83) {
          // $scope.saveCurrentStatesToLocalStorage()
          $scope.current_file.methods.save($scope.current_file, $scope.user);
        }
        if (e.keyCode === 80) {
          //timeline mode
          if (!$scope.page.dropdowns.modes.selectedIndex) {
            console.log('playing..');
            $scope.playStates($scope.current_file.selected_variation.scene_states)
          }
        }
        if (e.keyCode === 32) {
          $scope.playStates(current_states.states[current_states.selectedIndex].components)
        }
      }

    function initAllListeners() {
      var elemBuildPlayer = document.querySelector('.build-player');
      var onMouseOverPromise;
      var onMouseOverElem;
      var onMouseDown;
      var onMouseDownElem;
      var onMouseDownPromise
      var onMouseUpAddComponent;



      buildPlayerMouseOverListenerFunc = function(e) {

        onMouseOverElem = e.target;
        onMouseOverPromise = $timeout(function() {
          if (onMouseOverElem === e.target && !onMouseDown) {
            e.target.classList.add('bg-cerise', 'animated', 'pulse', 'infinite');
          }
          $timeout(function() {
           e.target.classList.remove('bg-cerise', 'animated', 'pulse', 'infinite');
          }, 250)
        }, 500);
        //fail safe
        $timeout(function() {
          e.target.classList.remove('bg-cerise');
        }, 1500)
      }

      buildPlayerMouseOutListenerFunc = function(e) {
        e.target.classList.remove('animated', 'pulse', 'bg-cerise');
        $timeout.cancel(onMouseOverPromise);
        var onMouseOverPromise = null;
        var onMouseOverElem = null;
      }

      buildPlayerMouseUpListenerFunc = function(e) {
        onMouseDown = false;
        e.target.classList.remove('animated', 'animate-select');
        if (onMouseUpAddComponent) {
          onMouseUpAddComponent = false;
          console.log(onMouseDownElem);

          $timeout(function() {
            onMouseDownElem = false;
            $timeout.cancel(onMouseDownPromise);
          }, 1000);
        }
      }

      buildPlayerMouseDownListenerFunc = function(e) {
        if (!onMouseDown) {
          onMouseDown = true;
          e.target.classList.add('animated', 'infinite', 'pulse', 'animate-select');
          onMouseDownPromise = $timeout(function() {
            if (onMouseDown && onMouseOverElem === e.target) {

              $timeout(function() {

                onMouseUpAddComponent = true;
                onMouseDownElem = e.target;
                onMouseDownElem.setAttribute('anim', null);
                $timeout(function() {
                  $scope.$apply(function() {
                    // addOneComponentFromShortCut(onMouseDownElem);
                    var time_state = $scope.page.mode.time_state.getFocused($scope.current_file.selected_variation.selected_scene_state);
                    console.log('yo');
                    addComponentToTimeState(time_state, onMouseDownElem);
                  })
                })
              }, 200);
              $timeout(function() {
                e.target.classList.remove('animated', 'tada', 'infinite', 'bg-azure');
                var onMouseDown = false;
              }, 500)
            }
          }, 1000);
        }
      }

      buildPlayerDblClickListenerFunc = function(e) {
        var currentDisplayValue = e.target.style.display;
        e.target.style.display = "none";
        buildPlayerDisplayHideArr.push({previous_val: currentDisplayValue, element: e.target});
      }

      buildPlayerClickListenerFunc = function(e) {

        var parentChildDepth = 5;
        if (e.target.getBoundingClientRect) {
          var targetRect = e.target.getBoundingClientRect();
          var thresHeight = targetRect.height;
          var thresWidth = targetRect.width;
          var parent, grandparent, greatGrandparent, siblings;
          var nearbyElems = [];

          if (e.target.parentNode) {
            parent = e.target.parentNode;
            if (parent.childNodes) {
              nearbyElems = addElemSiblingsToArr(parent.childNodes, nearbyElems);
              nearbyElems.push(parent);
            }
            if (parent.parentNode) {
              grandparent = parent.parentNode;
              nearbyElems.push(grandparent);
              if (grandparent) {
                greatGrandparent = grandparent.parentNode;
                nearbyElems.push(greatGrandparent);
              }
            }
          }
          if (e.target.childNodes && e.target.childNodes.length) {
            for ( var i = 0; i < e.target.childNodes; i++) {
              var indexChild = e.target.childNodes[i];
              nearbyElems.push(indexChild);
              if (indexChild.childNodes) {
                for (var j = 0; j < indexChild.childNodes.length; j++) {
                  if (indexChild.childNodes[j]) {
                    nearbyElems.push(indexChild.childNodes[j]);
                  }
                }
              }
            }
          }
          console.log(nearbyElems.length, 'similar components found');
          var widthDeviant = thresWidth;
          var resultArr = [];
          var heightDeviant = thresHeight;
          var resultComponentDict = {};
          for (var i = 0; i < nearbyElems.length; i++) {
            var indexElem = nearbyElems[i];
            if (indexElem.getBoundingClientRect) {
              var indexElemRect = indexElem.getBoundingClientRect();
              if (indexElemRect.height && indexElemRect.width) {
                console.log(indexElemRect.height, indexElemRect.width);
                var tempWidthDeviant = Math.abs(thresWidth - widthDeviant) < (widthDeviant * 0.1)
                var tempHeightDeviant = Math.abs(thresHeight - heightDeviant) < (heightDeviant * 0.1)
                if (tempWidthDeviant && tempHeightDeviant) {
                  resultDict = {component: indexElem, widthDeviant: tempWidthDeviant, heightDeviant:  tempHeightDeviant, height: thresHeight, width: thresWidth};
                  resultArr.push(resultDict);
                  //is child of
                }
              }
            }
          }


        }

      }

      if (elemBuildPlayer) {
        elemBuildPlayer.addEventListener('mouseout', buildPlayerMouseOutListenerFunc);
        elemBuildPlayer.addEventListener('mousedown', buildPlayerMouseDownListenerFunc);
        elemBuildPlayer.addEventListener('mouseup', buildPlayerMouseUpListenerFunc);
        elemBuildPlayer.addEventListener('dblclick', buildPlayerDblClickListenerFunc);
        elemBuildPlayer.addEventListener('mouseover', buildPlayerMouseOverListenerFunc);
      }
    }

    function addElemSiblingsToArr(elemChildren, result) {
      for (var i = 0; i < elemChildren.length; i++) {
          var indexChildNode = elemChildren[i];
          if (indexChildNode) {
            result.push(indexChildNode);
          }
      }
      return result;
    }

    function destroyBuildPlayerClickListener() {
      var elemBuildPlayer = document.querySelector('.build-player');
      if (elemBuildPlayer) {
        elemBuildPlayer.removeEventListener('click', buildPlayerClickListenerFunc);
      }
    }

    function destroyBuildPlayerDblClickListener() {
      var elemBuildPlayer = document.querySelector('.build-player');
      if (elemBuildPlayer) {
        elemBuildPlayer.removeEventListener('dblclick', buildPlayerClickListenerFunc);
        if (buildPlayerDisplayHideArr && buildPlayerDisplayHideArr.length) {
          for (var i = 0; i < buildPlayerDisplayHideArr.length; i++) {
            var indexElementDict = buildPlayerDisplayHideArr[i];
            indexElementDict.element.style.display = indexElementDict.previous_val;
          }

        }
      }
    }

    function destroyAllBuildPlayerListeners() {
      var elemBuildPlayer = document.querySelector('.build-player');
      if (elemBuildPlayer) {
        elemBuildPlayer.removeEventListener('mousedown', buildPlayerMouseDownListenerFunc);
        elemBuildPlayer.removeEventListener('mouseup', buildPlayerMouseUpListenerFunc);
        elemBuildPlayer.removeEventListener('mouseover', buildPlayerMouseOverListenerFunc);
        elemBuildPlayer.removeEventListener('mouseout', buildPlayerMouseOutListenerFunc);
        elemBuildPlayer.removeEventListener('dblclick', buildPlayerDblClickListenerFunc);
        if (buildPlayerDisplayHideArr && buildPlayerDisplayHideArr.length) {
          for (var i = 0; i < buildPlayerDisplayHideArr.length; i++) {
            var indexElementDict = buildPlayerDisplayHideArr[i];
            indexElementDict.element.style.display = indexElementDict.previous_val;
          }

        }
      }
    }


    $scope.states = {
      'mad-lib': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-1': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-2': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-3': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-4': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-5': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-6': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-7': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', ''],
      'projector-screen-8': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', '']
    }
    $scope.settings = {activated: false};
    $scope.gestureStates = {
      'mad-lib': {
        'on-load': [],
        'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}],
        'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}],
      },
      'projector-screen-1': {
        'on-load': [],
        'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}],
        'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}],
      },
      'projector-screen-2': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-3': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-4': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-5': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-6': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-7': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},
      'projector-screen-8': { 'on-load': [], 'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}], 'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}]},

    }

    var mostUsedCSSProperties = ["transform", "-webkit-transform", "opacity", "-webkit-animation-name", "animation-name", "-webkit-animation-timing-function", "animation-timing-function", "-webkit-transform-origin", "transform-origin", "backface-visibility", "-webkit-backface-visibility", "animation-duration", "-webkit-animation-duration", "-webkit-animation-fill-mode", "-webkit-animation-iteration-count", "animation-iteration-count", "animation-fill-mode", "z-index", "width", "visibility", "top", "float", "position", "margin", "left", "height", "background", "background-color", "display", "border", "color", "padding"];
    var supportedAnimationStyles = [];
    $scope.properties = {
      common_css_styles: mostUsedCSSProperties,
      supported_animations: getAnimationClasses(['animate', 'animation', 'magic']),
      supported_classes: getAnimationClasses(['utility'])
    }

    var classes = getAnimationClasses(['animate', 'animation', 'magic']);
    var utilityClasses = getAnimationClasses(['utility'])

    function getAnimationClasses(arr_animation_css_files) {
      var masterAnimationClasses = [];
      for (var i = 0; i < document.styleSheets.length; i++) {
        var indexStyleSheet = document.styleSheets[i];
        if ('href' in indexStyleSheet && indexStyleSheet.href) {
          var cssFileName = indexStyleSheet.href.split('/').reverse()[0].replace('.css', '');
          if (arr_animation_css_files.indexOf(cssFileName) > -1) {
            var cssRulesObjArr = indexStyleSheet.cssRules;
            for (var j = 0; j < cssRulesObjArr.length; j++) {
              var indexRule = cssRulesObjArr[j];

              if (indexRule && indexRule.selectorText && indexRule.selectorText.indexOf('[') === -1 && indexRule.selectorText.indexOf(',') === -1 && indexRule.selectorText.indexOf('*') === -1 && indexRule.selectorText.indexOf('>') === -1 && indexRule.selectorText.indexOf(':') === -1  ) {
                indexRule.selectorText.replace('.animated.','');
                if (masterAnimationClasses.indexOf(indexRule.selectorText) === -1 && indexRule.selectorText.indexOf('.animated.') === -1) {
                  masterAnimationClasses.push(indexRule.selectorText.replace('.', ''));
                }
              }
            }
          }
        }
      }
      return masterAnimationClasses;
    }


    $scope.clearCache = function() {
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.location.reload(true);
    }

    $scope.onWidthRangeSliderChange = function(value) {

    }

    var userSettings = $localstorage.getObject('user_settings') || getDefaultUserSettings();

    function getDefaultUserSettings() {
      return {
        defaultFilter: 1
      }
    }

    $scope.elements = [];
    $scope.current_states =[];
    $scope.page = {dropdowns:{}, toggles:{}};

    $scope.page.toggles = {add_component: false};
    $scope.page.compiledTemplates = {};
    $scope.page.mode = DevToolService.getBuildToolModes($scope);
    $scope.page.dropdowns.fileOptions = {label:'Current Storage', onOptionClick: onFileOptionSelect, options: generateFileOptions(), size:'small', key:'name', selectedIndex: 0};
    $scope.page.dropdowns.screenSizeOptions = {label:'autoscale @ 1.5x', onOptionClick: resizeStage, options: [], size:'small', key:'name', selectedIndex: 4};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};
    $scope.page.dropdowns.filterOptions = {label: "sort by", options: ['Time', "Component"], selectedIndex: userSettings.defaultFilter || 1, size:"small", onOptionClick: toggleComponentGUIMode}
    $scope.page.dropdowns.user_settings = {options:['Prioritized', 'History', 'Docs', 'Components'], selectedIndex: 0};
    $scope.page.dropdowns.modes = {options:[{name: "States"}, {name: "T = X"}, {name: "Components"}], key: "name", selectedIndex: 0};
    $scope.page.status = {show: false}


    $scope.showStatus = function(msg) {
      var footerBar = document.querySelector('#bottom-nav-status-bar');
      $scope.page.status.show = true;
      $scope.page.status.msg = msg;
      $timeout(function() {
        footerBar.style.opacity = 1;
      }, 500)
      AnimationService.animateIn(footerBar, 'bounceInUp')

      $timeout(function() {
        footerBar.classList.remove('animated', 'bounceInDown')
        AnimationService.animateOut(footerBar, 'bounceOutDown');
        $timeout(function() {
          footerBar.style.opacity = 0;
        }, 500)
      }, 3500)

    }

    function toggleComponentGUIMode(option, index)  {
      //component mode
      if (!index) {
        var time_dict = {};
        var current_state = $scope.current_states.states[$scope.current_states.selectedIndex];
        if (!current_state.components.length) {
          LoadingService.showMsg('Add some time states in component mode before we can sort by time states!', 2500);
          return;
        }
        var state_components = current_state.components;

        time_dict["-1"] = [];

        for (var i = 0; i < state_components.length; i++) {
          var indexComponent = state_components[i];
          if (indexComponent.init_time_state) {
            time_dict["-1"].push(indexComponent);
          }
          for (var j = 0; j < indexComponent.time_states.length; j++) {
            var indexTimeState = indexComponent.time_states[j];
            var time_string = indexTimeState.time + "";
            if (!(time_string in time_dict)) {
              time_dict[time_string] = [];

            }
            time_dict[time_string].push(indexComponent);

          }
        }

        var time_arr = [];
        for (var i = 0; i < Object.keys(time_dict).length; i++) {
          var indexKey = Object.keys(time_dict)[i];
          if (time_dict[indexKey] && time_dict[indexKey].length) {
            if (time_dict[indexKey][0].time_states.length) {
              var componentDict = {
                components: time_dict[indexKey],
                time: time_dict[indexKey][0].time_states[0].time
              };
              componentDict.components[0].selected = true;
              time_arr.push(componentDict);
            }
          }
        }



        time_arr.sort(function(a, b) {
          return b.time - a.time
        })

        if ('-1' in time_dict) {
          time_arr.push({
            components: time_dict["-1"],
            time: "init"
          })
        }


        current_state.timeline = time_arr.reverse();
        for (var i = 0; i < current_state.timeline.length; i++) {
          var indexTime = current_state.timeline[i];
          indexTime.component_selected = indexTime.components[0];
        }
        $timeout(function() {
          renderTimeStateComponents(current_state.timeline);
        }, 2000)
      }
    }

    function renderTimeStateComponents(time_arr) {
      var allTimeStateComponentContainers = document.querySelectorAll('.time-state-component-bar');


      for (var i = 0; i < time_arr.length; i ++) {
          var indexTimeState = time_arr[i];
          if (indexTimeState.components && indexTimeState.components.length) {



            var indexContainer = allTimeStateComponentContainers[i];
            var allTimeStateComponentList = indexContainer.querySelectorAll('.time-state-component-item');

            for (var j = 0; j < indexTimeState.components.length; j++) {
              var indexComponent = indexTimeState.components[j];
              var indexComponentElement = document.querySelector('.' + indexComponent.selector);
              var clonedComponentElem = recursiveClone(indexComponentElement);

              var listItemElement = allTimeStateComponentList[j];
              clonedComponentElem.className = clonedComponentElem.className + ' full-xy absolute';

              var playButtonElement = document.createElement("a");
              playButtonElement.className = "high-z-index m05xy right-0 bottom-0 absolute";
              playButtonElement.innerHTML = "&rtrif;"

              var listItemChild = listItemElement.querySelector('div');

              if (clonedComponentElem) {
                var clonedComponentElemRect = indexComponentElement.getBoundingClientRect();
                if (clonedComponentElemRect.height > 50 || clonedComponentElemRect.width > 100) {
                  var scaleX = 100 / clonedComponentElemRect.width;
                  var scaleY = 50 / clonedComponentElemRect.height;
                  var scaleString = " scale(" + 0.50 + ',' + 0.50 + ')'
                  listItemChild.style.webkitTransform = scaleString;
                  listItemChild.style.MozTransform = scaleString;
                  listItemChild.style.msTransform = scaleString;
                  listItemChild.style.OTransform = scaleString;
                  listItemChild.style.transform = scaleString;
                }
              }

              listItemElement.appendChild(playButtonElement);
              listItemChild.appendChild(clonedComponentElem);

            }
          }
        }
        // for (var i = 0; i < allTimeStateComponentContainers.length; i++) {
        //   $compile(angular.element(allTimeStateComponentContainers[i]))($scope);
        // }

    }

    function addNewTimeState() {
      var currentSceneState = $scope.current_file.selected_variation.selected_scene_state;
      if (!currentSceneState.time_states.length) {
        currentSceneState.time_states = [];
      }
      for (var i = 0 ; i < currentSceneState.time_states.length; i++) {
        var timeIndexState = currentSceneState.time_states[i];
        if (timeIndexState.focused) {
          timeIndexState.focused = false;
        }
        if (timeIndexState.time === 'new') {
          LoadingService.showMsg('Please set a time (in ms) of the recent newly added time state'), 2500;
        }
      }
      currentSceneState.time_states.push({
        time: 'new',
        components: [],
        focused: true,
        edit_mode: true
      })
    }


    $scope.onReleasePropertyDemo;
    $scope.selectTimeStateComponent = function(time_state, component, $event) {
      time_state.component_selected = component;
    }

    $scope.showTestsForScene = function(scene_state) {
      console.log(scene_state);
      $scope.selected_test_scene = scene_state;
      $scope.selected_test_scene.showTestsScreen = true;
      $timeout(function() {
        $scope.$apply();
      })
      // $scope.showTestsScreen = true;
    }

    $scope.injectPropertyIntoDemo = function(property, property_type) {
      var demoElem = document.querySelector('#hold-for-demo-text');
      if (!demoElem) {
        alert('error - please tell samir')
        return;
      }


      var cancelTimeoutIfRelease = $timeout(function(){
        $scope.onReleasePropertyDemo = null;
        $timeout(function() {
          if (property_type=== 'css_class') {
            demoElem.classList.add(property);
          } else if (property_type === 'css_animation') {

            if (property.toLowerCase().indexOf('out') > -1) {
              AnimationService.animateOut(demoElem, property);
            } else {
              demoElem.style.opacity = 0;
              $timeout(function() {
                AnimationService.animateIn(demoElem, property);
              }, 500)
            }
          }
          $interval.cancel(clearInterval);
          $timeout(function() {
            demoElem.style.opacity = 1;
            demoElem.classList.remove('animated', property);
            demoElem.innerHTML = 'Tap & Hold for Demo';
          }, 2000)

        }, 333)
        $timeout.cancel(cancelTimeoutIfRelease);

      }, 1000);

      var counterIndex = 0;

      var clearInterval = $interval(function() {
        if (counterIndex === 3) {
          $interval.cancel(clearInterval)
        }
        counterIndex += 1;
        demoElem.innerHTML = 'Demo in ' + (4 - counterIndex) + '....'
      }, 333);
      function generateReleasePropertyDemo(timeout_promise) {
        return function() {
          $timeout.cancel(timeout_promise)
          $interval.cancel(timeout_promise);
          $scope.onReleasePropertyDemo = null;
          demoElem.innerHTML = 'Tap & Hold for Demo';
        }
      }

      $scope.onReleasePropertyDemo = generateReleasePropertyDemo(cancelTimeoutIfRelease);
    }

    // function removeTimeState(index) {
    //   var currentState = $scope.current_states.states[$scope.current_states.selectedIndex];
    //   if (currentState && currentState.timeline && currentState.timeline.length) {
    //     var result;
    //     if (currentState.timeline[index].components.length > 1 && confirm("Are you sure? All components and properties will be removed from this state")) {
    //       result = true;
    //     } else if (currentState.timeline[index].components.length === 1) {
    //       result = true;
    //     }
    //     if (result) {
    //       var tempTimeIndex = currentState.time;
    //       currentState.timeline.splice(index, 1);
    //       LoadingService.showSuccess('time t = ' + tempTimeIndex + ' succesfully deleted');
    //     }
    //   }
    // }
    // $scope.removeTimeState = removeTimeState;
    $scope.addNewTimeState = addNewTimeState;


    $scope.cancelTimeState = function(selected_scene_state, index) {
      $scope.showStatusMsg(['Canceling...', 'Canceled! Plz make another']);
      $timeout(function() {
        selected_scene_state.time_states.splice(index, 1);
        $scope.current_file.methods.save($scope.current_file, $scope.user);
      }, 1500);
    }

    $scope.removeTimeState = function(selected_variation, index) {
      console.log('removing time state', selected_variation, index);
      var time_state = selected_variation.selected_scene_state.time_states[index];
      if (!time_state) {
        return;
      }
      if (time_state.components && time_state.components.length && !confirm('Are you sure you will lose all components tied with this time state?')) {
        return;
      }

      //resume original plan of attack
      $scope.showStatusMsg(['Removing time T = ' + time_state.time, 'Syncing to server....']);
      $timeout(function() {
        $scope.current_file.selected_variation.selected_scene_state.time_states.splice(index, 1);
      }, 750)
      $timeout(function() {
        $scope.current_file.methods.save($scope.current_file, $scope.user);
      }, 1500)

    }


    $scope.addElementState = function() {
      if (!$scope.current_file.selected_variation.selected_scene_state) {
        $scope.showStatusMsg(['Sorry - you cant add custom states yet!']);
        return
      }

      if ($scope.current_file.selected_variation.selected_scene_state && !$scope.current_file.selected_variation.selected_time_state) {
        $scope.addNewTimeState();
        return;
      }

      if ($scope.current_file.selected_variation.selected_scene_state && $scope.current_file.selected_variation.selected_time_state && !$scope.current_file.selected_variation.selected_component) {
        // $scope.current_file
        return;
      }

    }



    $scope.onStateKeyboardSwitch = function($event) {

          var kc = $event.keyCode;
          //enter pressed
          if (kc === 13) {
            $scope.showStatusMsg(['Displaying Time States for ' + scene_state.name + '...']) && $scope.page.mode.time_state.switchTo($scope.current_file.selected_variation, $index)
            return;
          }
          //tab pressed
          if (kc === 9) {
            $scope.showStatusMsg(['Applying ' + scene_state])
            return;
          }

          //escape pressed

          if (kc === 69) {
             return;
          }

          //p pressed
          if (kc === 82) {
            return;
          }
          //r refreshed
          if (kc === 82) {
            return;
          }

          //h pressed
          if (kc === 72) {
            $scope.showStatusMsg(['Shortcuts: r=refresh, h=help, p=play', '[continued]tab="focus next", enter="select and see times"'], 1000, 2500)
          }
          //s pressed
          if (kc === 83) {
            $scope.current_file.methods.save($scope.current_file, $scope.user);
          }

    }

    $scope.onTimeStateKeyboardSwitch = function($event, variation, scene_state, time_state, mode_name) {

    };

    $scope.onComponentKeyboardSwitch = function($event, variation, scene_state, time_state, mode_name) {

    };

    $scope.onAddComponentModeKeyboardSwitch = function($event, time_state) {
      if ($event.keyCode === 27) {
        time_state.add_component = false;
      }
    };

    $scope.saveTimeState = function(selected_variation, time_state)  {
      if (time_state && time_state.time) {
        $scope.current_file.selected_variation.selected_time_state = time_state;
        $scope.current_file.selected_variation.selected_time_state.edit_mode = false;
        $scope.showStatusMsg(['Time state T = ' + time_state.time + ' successfully saved!']);
        $scope.current_file.methods.save($scope.current_file, $scope.user);
        time_state.edit_mode = false;
      }
    }

    $scope.selectAndSaveTimeState = function(selected_variation, time_state)  {
      if (time_state && time_state.time) {
        $scope.current_file.selected_variation.selected_time_state = time_state;
        $scope.current_file.selected_variation.selected_time_state.edit_mode = false;
        time_state.edit_mode = false;
        $scope.current_file.methods.save($scope.current_file, $scope.user);

      }
    }

    $scope.editTimeStateTime = function(timeline, time_state, $event, arg) {
      time_state.edit_mode = !time_state.edit_mode;
      if (time_state.edit_mode) {
        time_state.previous_time = time_state.time;
        var inputElement = $event.target;
        var parentElement = inputElement && inputElement.parentNode;
        var grandparent = parentElement && parentElement.parentNode;
        if (inputElement && parentElement && grandparent) {
          var input = grandparent.querySelector('input');
          if (input) {
            $timeout(function() {
              input.select()
            }, 500)
          }
        }
      } else {
        if (arg === 'cancel') {
          time_state.time = time_state.previous_time || time_state.time;
          $scope.showStatus('Canceled saving time state t = ' + time_state.time);
        } else if (arg === 'sort') {
          timeline.sort(function(a, b) {
            return b.time - a.time
          })
          timeline = timeline.reverse();
          $scope.showStatus('Editing to t = ' + time_state.time + '... And then re-sorting by time = 0.');
        }
      }
      // var response = prompt("Please enter a time state & confirm", time_state.time);
      // if (response) {
      //   time_state.time = response;
      // }
    };

    function onFileOptionSelect(option, index) {

    }

    function addComponentToTimeState(time_state, element) {
      var clonedNode = recursiveClone(element);



      var template = document.querySelector('#stage-template-container');
      if (template && template.firstChild) {
        template = template.firstChild;
      }
      var ref = 'time-state-' + (time_state.time || 'null') + '-' + (time_state.components.length + 1);

      var componentObj = initComponentObj(clonedNode, element, ref);
      // $scope.current_file.selected_variation.components.push(componentObj);
      time_state.components.push(componentObj);

      // $scope.saveCurrentStatesToLocalStorage();
    }

    function addOneComponentFromShortCut(element) {
      var clonedNode = recursiveClone(element)
      console.log(element, clonedNode);

      var template = document.querySelector('#stage-template-container')
      allAnimElem = template.querySelectorAll('[anim]');

      var ref = 'anim-elem-' + (allAnimElem.length + 1);
      element.classList.add(ref);
      element.setAttribute('anim', null);
      var componentObj = initComponentObj(clonedNode, element, ref);
      $scope.current_file.selected_variation.components.push(componentObj);
      console.log($scope.current_file.selected_variation);
      var componentListView = document.querySelector('#file-component-list');
      $scope.saveCurrentStatesToLocalStorage();
      // $timeout(function() {
      //   $scope.swapInteractiveState(0);
      // }, 2000);
      // componentObj.css_class_dropdown = {label:'animation', key:'_class', options:generateCSSClassOptions(classes, componentObj), onOptionClick:generateTimeStateProperty, size:'small', selectedIndex:0},
      // $scope.current_states.states[0].components.push(componentObj);
      // $timeout(function() {
      //   $scope.$apply();
      // })
    }

    function generateFileOptions() {
      var dropdownArr = [{name: 'Local storage', _class:'bg-charcoal'}, {name: 'create', _class:'bg-charcoal'}, {name: 'browse', _class:'bg-charcoal'}];
      var files = getRecentFilesEdited();
      for (var i = 0; i < files.length; i++) {
        indexFile = files[i];
        dropdownArr.push(indexFile);
      }
      return dropdownArr;
    }

    function getRecentFilesEdited() {
      return [];
    }

    function saveFile() {

    }

    function getFiles() {

    }

    function generateTimeStateProperty(option, index) {
      var css_class = option._class;

      option.component.confirmPropertyField(option.component, option.component.empty_time_state, {name: css_class}, 'css_class', '--');
    }



    $scope.saveCurrentStatesToLocalStorage = function(template_ref, show_loader) {
      $scope.current_file.selected_variation.lasted_updated = (new Date()).getTime();
      var adminBuildToolsCacheExists = $localstorage.getObject('admin_build')
      if (!adminBuildToolsCacheExists || adminBuildToolsCacheExists.constructor == Array) {
        adminBuildToolsCacheExists = {};
      }
      adminBuildToolsCacheExists[$scope.current_file.ref] = $scope.current_file;

      for (var i = 0; i < $scope.current_file.selected_variation.components.length; i++) {
        var indexComponent = $scope.current_file.selected_variation.components[i];
        indexComponent.addPropertyField = null;
        indexComponent.confirmPropertyField = null;
        indexComponent.css_class_dropdown = null;
        indexComponent.properties = null;
        indexComponent.template = null;
      }

      $localstorage.setObject('admin_build', adminBuildToolsCacheExists);
      if (show_loader) {
        LoadingService.showAmbig(null, 2500);
        $timeout(function() {
          LoadingService.showSuccess('Saved!', 1000);
        }, 2000)
      }
    }

    function generateCSSClassOptions(classes_arr, component) {
      var resultOptionsArr = [];
      for (var i = 0; i < classes_arr.length; i++) {
        var indexClass = classes_arr[i];
        resultOptionsArr.push({
          _class: indexClass,
          component: component
        });
      }
      return resultOptionsArr
    }

    function processInteractiveStates(arr_str, ref) {
      var resultDict = {states: [], selectedIndex: 0, template_ref:ref};
      for (var i = 0; i < arr_str.length; i++) {
        resultDict.states.push({name: arr_str[i], components: []});
      }
      return resultDict;
    }

    function getRecentElementComponents(callback) {
        Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').get().then(
          function(response) {
            response = JSON.parse(response)
            // for (var i = 0; i < response.layouts.length; i++) {
            //   console.log(i, response.layouts[i].name, response.layouts[i].template_url)
            // }
            $timeout(function() {
              $scope.$apply(function() {
                $scope.page.dropdowns.templates.options = response.layouts;
                $scope.page.dropdowns.screenSizeOptions.options = getScreenOptions();
              })
            });

            response.layouts.sort(function(val_a, val_b) {
              return val_b.id - val_a.id;
            }).reverse()

            // injectTemplateIntoStage(response.layouts[0].template_url, 'SplashController', response.layouts[0].ref);

          },

          function(error) {

            alert('error! \n' + JSON.stringify(error))

          })


    }

    function getScreenOptions() {
      return[
          {name:'Mobile S 320x480', ref: 'mobile-s', dimensions: {'width': 320, 'height': 480 }},
          {name:'Mobile M 320x568', ref: 'mobile-m', dimensions: {'width': 320, 'height': 568 }},
          {name:'Mobile L 375x667', ref: 'mobile-l', dimensions: { 'width': 375, 'height': 667 }},
          {name:'Mobile XL 414x736', ref:'mobile-xl', dimensions: { 'width': 414, 'height': 736}},
          {name: 'Desktop S 1024x768', ref: 'desktop-s', dimensions: {'width': 1024, 'height': 768}},
          {name: 'Desktop M 1366x768', ref:'desktop-m',dimensions: {'width': 1366, 'height':768}},
          {name: 'Desktop L 1920x1080', ref:'desktop-l', dimensions: {'width': 1920, 'height':1080}}
      ]
    }
    $scope.clonedVariationInputName  = null;
    $scope.saveVariationName = function(variation) {

      var selectedIndex = $scope.page.dropdowns.templates.selectedIndex;
      if (selectedIndex || selectedIndex > -1) {
        var selectedOption = $scope.page.dropdowns.templates.options[selectedIndex]

        if (selectedOption && $scope.current_file.selected_variation.name && $scope.current_file.selected_variation.name.length) {
          selectedOption.name = $scope.current_file.selected_variation.name
          $scope.showStatusMsg(["Saving .. " + selectedOption.name]);
          variation.edit_mode = false;
          variation.name_cache = null;
        }
      }
    }

    $scope.showStatusMsg = function(chained_msg_arr, duration, offset) {
      duration = duration || 2500;
      offset = offset || 2500;
      for (var i = 0; i < chained_msg_arr.length; i++) {
        var indexMsg = chained_msg_arr[i];
        showMsgForXMilliseconds(indexMsg, offset * i, duration, i === (chained_msg_arr.length - 1));
      }
      function showMsgForXMilliseconds(msg, offset, duration, hide_after) {
        $timeout(function() {
          $scope.status.msg = msg;
          $scope.status.show = true;
          if (hide_after) {
            $timeout(function() {
              $scope.status.show = false;
            }, duration)
          }
        }, offset);
      }
    }

    $scope.saveClonedVariationName = function(variation) {
      console.log(variation, $scope.page.dropdowns.templates);
      var selectedIndex = $scope.page.dropdowns.templates.selectedIndex;
      if (selectedIndex || selectedIndex > -1) {
        var selectedOption = $scope.page.dropdowns.templates.options[selectedIndex]
        if (selectedOption && $scope.clonedVariationInputName && $scope.clonedVariationInputName.length) {
          selectedOption.name = $scope.clonedVariationInputName;
          $scope.clonedVariationInputName = null;
        } else if (selectedOption && (!$scope.clonedVariationInputName || !$scope.clonedVariationInputName.length)) {
          $scope.status.msg = 'Please enter a valid name';
          $scope.status.show = true;
          $timeout(function() {
            $scope.status.show = false;
          }, 2500);
        }
      }
    }

    function resizeStage(option, index) {
      var template_url = $scope.current_file.template_url.replace('templates/', '');
      var current_controller = $scope.current_file.controller;
      var current_ref = $scope.current_file.ref;
      $scope.desktopMode = false;
      $scope.injectTemplateIntoStage(template_url, current_controller, current_ref, option.ref);


      // var stageWrapper = document.querySelectorAll('#stage-template-container');
      // if (stageWrapper.length > 1) {
      //   for (var i = 0 ; i < (stageWrapper.length -1); i++) {
      //     var indexStageWrapper = stageWrapper[i];
      //     indexStageWrapper.parentNode.removeChild(indexStageWrapper);
      //   }
      // }
      // stageWrapper = stageWrapper[0];

      // stageWrapper.setAttribute("style", "height:" + option.dimensions.height +"px !important; width: " + option.dimensions.width + "px !important;");
      // // stageWrapper.style.width = option.dimensions.width + 'px !important;';
      // $timeout(function() {
      //   $compile(stageWrapper)($scope);
      // }, 1000)
    }

    function injectTemplateDropdown(option, index) {
      if (option.template_url) {
        injectTemplateIntoStage(option.template_url, option.controller, option.ref);

      }
    }

    function deletePreviousTemplateIfExists(selector) {
      var allTemplates = document.querySelectorAll(selector)
      for (var i = 0; i < allTemplates.length; i++ ) {
        var indexTemplate = allTemplates[i];
        indexTemplate.parentNode.removeChild(indexTemplate);
      }
    }

    function injectTemplateIntoStage(template_url, controller, ref, screen_size_class) {
      screen_size_class = screen_size_class || '';
      if (!$scope.user || !$scope.user.id) return;
      deletePreviousTemplateIfExists('#stage-template-container');

      var stageTemplateDiv = document.createElement('div');
      stageTemplateDiv.id = 'stage-template-container'

      stageTemplateDiv.setAttribute('ng-include', 'img_base + BASE + "templates/' + template_url + '"');
      if (controller) {
        stageTemplateDiv.setAttribute('ng-controller', controller);
      }
      stageTemplateDiv.className += 'build-player-container';
      if (screen_size_class) {
        console.log('making this a', screen_size_class)
        stageTemplateDiv.className = stageTemplateDiv.className + ' '  + screen_size_class;
      }
      stageTemplateParentContainer = document.querySelector('.build-player');
      stageTemplateParentContainer.classList.add('relative')

      if (screen_size_class.indexOf('mobile') === -1) {
        stageTemplateParentContainer.appendChild(stageTemplateDiv);
        $compile(stageTemplateDiv)($scope);
      } else if (screen_size_class.indexOf('mobile') > -1) {
        console.log('is a mobile');
        var iFrameWrapperElem = document.createElement('iframe');
        $compile(stageTemplateDiv)($scope);
        // iFrameWrapperElem.setAttribute('ng-include', 'img_base + BASE + "templates/' + template_url + '"');
        // iFrameWrapperElem.setAttribute('ng-controller', controller);
        iFrameWrapperElem.src = 'data:text/html;charset=utf-8,' + encodeURI(stageTemplateDiv.innerHTML);
        stageTemplateDiv.innerHTML = null;
        stageTemplateDiv.appendChild(iFrameWrapperElem);
        stageTemplateParentContainer.appendChild(stageTemplateDiv);

      }

      // storeTemplateToCache(template_url, stageTemplateDiv, ref);
    }

    $scope.injectTemplateIntoStage = injectTemplateIntoStage;

    function initFileObj(properties) {
      var template_url = ''
    }

    function updateScreenSize(elem_selector) {
      var elem = document.querySelector(elem_selector);
      var selectedDropdownIndex = $scope.page.dropdowns.screenSizeOptions.selectedIndex;
      var selectedCoords = $scope.page.dropdowns.screenSizeOptions.options[selectedDropdownIndex].dimensions;
      var stageCoords = {width: elem.getBoundingClientRect().width, height: elem.getBoundingClientRect().height};

      var scaleXRatio = selectedCoords.width / stageCoords.width;
      var scaleYRatio = selectedCoords.height / stageCoords.height;

      var scaleString = " scale(" + scaleXRatio + ',' + scaleYRatio + ')'
      elem.style.webkitTransform = scaleString;
      elem.style.MozTransform = scaleString;
      elem.style.msTransform = scaleString;
      elem.style.OTransform = scaleString;
      elem.style.transform = scaleString;

    }

    function initializeAllStates(ref) {
      return processInteractiveStates($scope.states[ref], ref);
    }

    $scope.swapInteractiveState = function($index) {
      LoadingService.showAmbig(null, 2500);
      $scope.current_file.selectedVariationIndex = $index;
      injectAllAllChildComponentsForOneState($scope.current_file.selected_variation.components, null, null, function() {
        LoadingService.hide()
      });

      // if ($scope.current_file.variations[$index].gestures)  {
      //   var stateGestures = $scope.current_states.states[$index].gestures;
      //   for (var i = 0; i < stateGestures.length; i++) {
      //     var indexGesture = stateGestures[i];
      //     var elem = document.querySelector(indexGesture.selector);
      //     var delay = indexGesture.delay || 0
      //     var gesture = indexGesture.gesture;
      //     if (elem && gesture) {
      //       $timeout(function() {
      //         angular.element(elem).triggerHandler(gesture);
      //       }, delay + 1000);
      //     }

      //   }
      // }
      // $scope.current_states.selectedIndex = $index;
      // // $scope.current_states = $scope.current_states.states[$index].components;
      // var allElems = document.querySelectorAll('.component-inject');
      // for (var i = 0; i < $scope.current_states.length; i++) {
      //   var componentInjectDiv = allElems[i];
      //   componentInjectDiv.innerHTML = '';
      // }
    }

    function storeTemplateToCache(template_url, elem, ref) {
      var templateName = template_url.split('.html')[0];
      $scope.page.compiledTemplates[templateName] = {pre: elem};
      var hasCurrentStatesForRef = $localstorage.getObject('admin_build');
      $timeout(function() {
        var elem = document.querySelector('#stage-template-container')
        $scope.page.compiledTemplates[templateName].post = elem;

        if (hasCurrentStatesForRef && hasCurrentStatesForRef[ref]) {
          $scope.current_states = hasCurrentStatesForRef[ref];
        } else {
          $scope.current_states = initializeAllStates(ref);
        }

        $timeout(function() {
          applyInitPropertiesForState($scope.current_states.states[0]);
          if (!$scope.page.dropdowns.filterOptions.selectedIndex) {
            toggleComponentGUIMode('Time', 0);
          }
        }, 2500)


          currentTemplate = elem;
          currentRef = ref;
          injectAllAllChildComponentsForOneState($scope.current_states.states[0].components, elem, ref, function() {
          LoadingService.hide();
          for (var i = 0; i < $scope.current_states.states.length; i++) {
            var indexCurrentState = $scope.current_states.states[i];
            if (ref in $scope.gestureStates && indexCurrentState.name in $scope.gestureStates[ref]) {
              indexCurrentState.gestures = $scope.gestureStates[ref][indexCurrentState.name];
            }
          }
        })
      }, 2000)
    }

    function applyInitPropertiesForState(state) {
      if (!state.components) {
        return;
      }
      for (var i = 0; i < state.components.length; i++) {
        var indexComponent = state.components[i];

        if (indexComponent.init_time_state) {

          var indexComponentInitTimeState = indexComponent.init_time_state;
          if (indexComponentInitTimeState.properties && indexComponentInitTimeState.properties.length) {
            var elemComponent = document.querySelectorAll('[anim].' + indexComponent.selector)[0];

            applyComponentPropertiesAtTime(indexComponent, indexComponentInitTimeState, elemComponent);
          }
        }
      }
    }



    $scope.refreshAllComponents = function() {
      LoadingService.showMsg('Reinitializing all components', 3000);
      var current_state = $scope.current_states.states[$scope.current_states.selectedIndex];
      applyInitPropertiesForState(current_state);
      for (var i = 0; i < current_state.components.length; i++) {
        var componentIndex = current_state.components[i];
        var elementIndex = document.querySelector(componentIndex.selector);
        if (!elementIndex) {
          continue;
        }
        for (var j = 0; j < componentIndex.time_states; j++) {
          var componentTimeStateIndex = componentIndex.time_states[j];
          for (var k = 0; k < componentTimeStateIndex.properties; k++) {
            var propertyIndex = componentTimeStateIndex.properties[k];
            if (propertyIndex.type === 'css_class') {
              elementIndex.classList.remove(propertyIndex.name);
            }
          }
        }
      }
    }

    $scope.updateTimeStateCollapses = function(timeline, time_state) {
      for (var i = 0; i < timeline.length; i++)  {
        if (timeline[i] !== time_state) {
          timeline[i].collapsed = true;
        }
      }
      time_state.collapsed = !time_state.collapsed;
    }

    $scope.updateComponentCollapsed = function(current_state, component) {
      for (var i = 0; i < current_state.components.length; i++)  {
        if (current_state.components[i] !== component) {
          current_state.components[i].collapsed = true;
        }
      }
      component.collapsed = !component.collapsed;
    }

    function recursiveClone(elem) {
      var clonedNode = elem.cloneNode(true);
      clonedNode.removeAttribute('anim');
      var originalElemChildren = elem.querySelectorAll('*');
      // var clonedNodeChildren = clonedNode.querySelectorAll('*');
      // for (var i =0; i < originalElemChildren.length; i++) {
      //   var clonedNodeChildIndex = clonedNodeChildren[i];
      //   var elemNodeChildIndex = originalElemChildren[i];
      //   clonedNodeChildIndex.style.cssText = window.getComputedStyle(elemNodeChildIndex,null).cssText;
      // }
      // clonedNode.style.cssText = window.getComputedStyle(elem, null).cssText;
      // for (var i = 0; i < )
      return clonedNode;
    }
    var currentTemplate;
    var currentRef;
    function injectAllAllChildComponentsForOneState(components_arr, template, ref_link, callback) {
      if (!template) {
        template = currentTemplate;
      }
      if (!ref_link) {
        ref_link = currentRef
      }
      if (!template) {
        template = document.querySelector('#stage-template-container');
      }
      allAnimElem = template.querySelectorAll('[anim]');
      if (!components_arr.length) {
        for (var i = 0; i < allAnimElem.length; i++) {
          ref = 'anim-elem-' + i;
          allAnimElem[i].classList.add(ref);
          var clonedNode = recursiveClone(allAnimElem[i])
          var componentObj = initComponentObj(clonedNode, allAnimElem[i], ref);

          componentObj.css_class_dropdown = {label:'animation', key:'_class', options:generateCSSClassOptions(classes, componentObj), onOptionClick:generateTimeStateProperty, size:'small', selectedIndex:0},
          components_arr.push(componentObj);
        }
      } else {
        for (var i = 0; i < allAnimElem.length; i++) {
          ref = 'anim-elem-' + i;
          allAnimElem[i].classList.add(ref);
          var clonedNode = recursiveClone(allAnimElem[i])
          partialComponentObj(components_arr[i], clonedNode, allAnimElem[i], ref);
          components_arr[i].css_class_dropdown = {label:'animation', key:'_class', options:generateCSSClassOptions(classes, components_arr[i]), onOptionClick:generateTimeStateProperty, size:'small', selectedIndex:0}
        }
      }

      $timeout(function() {
        var allElems = document.querySelectorAll('.component-inject');
        for (var i = 0; i < components_arr.length; i++) {
          var componentIndex = components_arr[i];
          var componentInjectDiv = allElems[i];
          if (!componentInjectDiv) {
            continue;
          }
          componentIndex.template.style.opacity = 1;
          componentIndex.template.style.maxHeight = componentInjectDiv.getBoundingClientRect().height + 'px;'
          componentIndex.template.style.maxWidth = componentInjectDiv.getBoundingClientRect().width + 'px;'
          if (componentInjectDiv.children.length === 0) {
            componentInjectDiv.appendChild(componentIndex.template);
          }
        }

      }, 5000)
      callback & callback();

      function elementNotAChildOf(elem, arr_selected) {
        for (var i = 0; i < arr_selected.length; i++) {
          var indexElement = arr_selected[i];
          var allIndexElementChildren = indexElement.querySelectorAll('*');
          for (var j = 0; j < allIndexElementChildren.length; j++) {
            if (elem === allIndexElementChildren[j]) {
              return false;
            }
          }
        }
        return true;
      }
    }

    function partialComponentObj(component_obj, cloned_elem, elem, selector) {
      var initProperties = processComputedStyle(window.getComputedStyle(elem));
      cloned_elem.removeAttribute('anim');
      if (!component_obj.name) {
          component_obj.name = cloned_elem.nodeName
      }
      if (!component_obj.selector) {
          component_obj.selector = selector
      }
      if (!component_obj.active) {
          component_obj.active = false
      }

      if (!component_obj.template) {
          component_obj.template = cloned_elem;
      }
      if (!component_obj.time_states) {
          component_obj.time_states = [];
      }
      if (!component_obj.time_states) {
          component_obj.properties = mostUsedCSSProperties;
      }
      if (!component_obj.init_time_state) {
        component_obj.init_time_state = {
            time: -1,
            properties:[
              {name: 'opacity', value:"1", onPropChange: onOpacityChange, type:'css_text'},
              {name: 'visibility', value:"visible", type: 'css_text'},
            ]
        }
      }

      function onOpacityChange(property) {
        return function(scope, value) {
          if (!value) {
            scope.value = 0;
            property.value = 0;
          }
          else {
            scope.value = 1;
            property.value = 1;
          }
        }
      }



      component_obj.addTimeState = function(component, time_state, c) {
          if (timeStateAlreadyExists(component, time_state.time)) {
            var preExistingTimeState = timeStateAlreadyExists(component, time_state.time);
            for (var i = 0; i < time_state.properties.length; i++) {
              preExistingTimeState.properties.push(time_state.properties[i]);
            }
            LoadingService.showMsg('Time state ' + time_state.time + ' already exists - so just adding to original one', 3000);
            time_state.time = null;
            time_state.properties = [];
          }
          else if (time_state.time && time_state.properties && time_state.properties.length) {
            component.time_states.push(JSON.parse(JSON.stringify(time_state)));
            time_state.time = null;
            time_state.properties = [];
          } else {
            LoadingService.showMsg('Please fill the time state and/or add at least one property');
          }

      }
      component_obj.addPropertyField = function(component, time_state, previous_property) {
          $scope.toggleClassProperties()
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
          $timeout(function() {
            var elem = document.querySelector('#property-search-input');
            elem.focus();
            if (previous_property) {
              elem.value = previous_property
              $scope.propertySearchText = previous_property
              $timeout(function() {
                elem.select()
              }, 500)
            }
          }, 1000)
        }
      component_obj.confirmPropertyField = confirmPropertyField
      component_obj.removePropertyField = removePropertyField

      if (!component_obj.empty_time_state) {
         component_obj.empty_time_state = {time:null, properties:[]};
      }
    }


    function confirmPropertyField(component, time_state, property, _type, value) {
      if (_type === 'css_animation') {
        value = {options:['Animate In', 'Animate Out'], selectedIndex:0, size:'small'};
      }
      if (_type === 'css_text') {
          if ($scope.component_selected || component) {
            var elem_component = document.querySelector('.' + component.selector);
            if (elem_component) {
              var componentStyles = window.getComputedStyle(elem_component)
              if (property in componentStyles) {
                var value = componentStyles[property];
              }
            }
          }

          $timeout(function() {
            var value = 'some value';
            var selected_elements = document.querySelectorAll('.' + component.selector + '-empty-input');
            if (selected_elements && selected_elements.length) {
              var mostRecentInput = selected_elements[selected_elements.length - 1];

              // mostRecentInput.focus();
                mostRecentInput.select();

            }
          }, 100);
      }
      if (time_state.properties) {
        time_state.properties.push({name: property, type: _type ||'css_text', value: value || ''})

      }
      $scope.selectPropertyActivated = false;
      $scope.component_selected = null;

      if (!$scope.page.dropdowns.filterOptions.selectedIndex) {
        if (!component.empty_time_state.time && component.time_states.length) {
          component.empty_time_state.time =  parseFloat(component.time_states[0].time);
        }
        if (component.empty_time_state.time) {
          component.addTimeState(component, component.empty_time_state);
          toggleComponentGUIMode('Time', 0);
        }
      }

    }

    function timeStateAlreadyExists(component, time) {
      for (var i =0; i < component.time_states.length; i++) {
        var indexTimeState = component.time_states[i];
        if (indexTimeState.time === time) {
          return indexTimeState
        }
      }
      return;
    }

    $scope.toggleClassProperties = function() {
      $scope.selectPropertyActivated = !$scope.selectPropertyActivated;
    }

    function initComponentObj(cloned_elem, elem, selector) {
      var initProperties = processComputedStyle(window.getComputedStyle(elem));
      cloned_elem.removeAttribute('anim');
      return {
        name: cloned_elem.nodeName,
        _id: cloned_elem.id,
        _class: cloned_elem.classList["0"],
        selector: selector,
        active:false,
        collapsed: true,
        expand: false,
        template: cloned_elem,
        properties: mostUsedCSSProperties,
        init_time_state: {
            time: -1,
            properties:[
              {name: 'opacity', value:1, type: 'css_text'},
              {name: 'visibility', value:"visible", type: 'css_text'}
            ]
        },
        time_states: [],
        addTimeState: function(component, time_state, c) {
          if (time_state.time === -1) {
            LoadingService.showMsg('Adding to initial time state..', 1000);
            for (var i = 0; i < time_state.properties.length; i++) {
              component.init_time_state.properties.push(time_state.properties[i]);
            }
          }
          else if (timeStateAlreadyExists(component, time_state.time)) {
            var preExistingTimeState = timeStateAlreadyExists(component, time_state.time);
            for (var i = 0; i < time_state.properties.length; i++) {
              preExistingTimeState.properties.push(time_state.properties[i]);
            }
            LoadingService.showMsg('Time state ' + time_state.time + ' already exists - so just adding to original one', 3000);
            time_state.time = null;
            time_state.properties = [];
          }
          else if (time_state.time && time_state.properties && time_state.properties.length) {
            component.time_states.push(JSON.parse(JSON.stringify(time_state)));
            time_state.time = null;
            time_state.properties = [];
          } else {
            LoadingService.showMsg('Please fill the time state and/or add at least one property');
          }
        },
        addPropertyField: function(component, time_state, previous_property) {
          $scope.toggleClassProperties();
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
          $timeout(function() {
            var elem = document.querySelector('#property-search-input');
            elem.focus();
            if (previous_property) {
              elem.value = previous_property
              $scope.propertySearchText = previous_property
              $timeout(function() {
                elem.select()
              }, 500)
            }
          }, 1000)
        },
        removePropertyField: removePropertyField,
        confirmPropertyField:confirmPropertyField,
        empty_time_state: {time:null, properties:[]}
      }
    }

    $scope.focusFirstTabbableInput = function() {
      var elems = document.querySelectorAll('.properties-list .property-item');

      if (elems && elems.length) {
        elems[0].setAttribute('tabindex', 0);
        elems[0].focus();
      }
    }

    function removePropertyField(component, time_state, property_index, time_index, is_init_time_state) {
          if (is_init_time_state) {
            time_state.properties.splice(property_index, 1);
            if (!time_state.properties.length) {
              time_state.time = null;
            }
            return;
          }
          time_state.properties.splice(property_index, 1);
          if (!time_state.properties.length) {
            if (confirm('Also delete time state t=' + time_state.time + '?')) {
              component.time_states.splice(time_index, 1);
            }
          }
      }

    $scope.playOneComponent = function(component) {
      var elemComponent = document.querySelectorAll('[anim].' + component.selector)[0];
      for (var j = 0; j < component.time_states.length; j++) {
        applyComponentPropertiesAtTime(component, component.time_states[j], elemComponent);
      }
    }

    $scope.inputAddSaveProperty = function(keycode, component) {
      if (keycode === 9) {
        component.addPropertyField(component, component.empty_time_state);
        return
      }
      if (keycode === 13) {
        component.addTimeState(component, component.empty_time_state);
      }

    }

    $scope.playStates = function(states) {
      if ($scope.page.dropdowns.modes.selectedIndex === 1) {
        $scope.playStateComponents(states);
      } else if ($scope.page.dropdowns.modes.selectedIndex === 0) {
        console.log('playing chronologically');
        $scope.playTimeStatesChronologically(states);
      }
    }

    $scope.playTimeStatesChronologically = function(timeline) {
      var timeline = $scope.current_file.selected_variation.selected_scene_state.time_states;
      for (var i = 0; i < timeline.length; i++) {
        var timeIndex = timeline[i]

        var delaySeconds;
        if (!timeIndex.time|| timeIndex.time === "-1" || timeIndex.time === "init") {
          delaySeconds = 0
        } else {
          var delaySeconds = parseFloat(timeIndex.time);
        }
        applyTimeStateAtFutureTime(timeIndex, delaySeconds)

      }

      function applyTimeStateAtFutureTime(time_state, delay) {
        $scope.showStatusMsg(['Starting t = '  + delay])
        if (!time_state.components) {
          return;
        }
        $timeout(function() {
          for (var i = 0; i < time_state.components.length; i++) {
              var indexComponent = time_state.components[i];

              var elemComponent = document.querySelector('[anim].' + indexComponent.selector);
              var nested_time_state;
              if (!indexComponent.time_states || !indexComponent.time_states.length) {
                continue;
              }
              for (var j = 0; j < indexComponent.time_states.length; j++) {
                indexComponentTimeState = indexComponent.time_states[j];
                var delayStr = delay + "";
                if (delayStr === indexComponentTimeState.time) {
                  var nested_time_state = indexComponentTimeState;
                  nested_time_state.time = delay;
                }
              }
              if (indexComponent && nested_time_state && elemComponent) {
                applyComponentPropertiesAtTime(indexComponent, nested_time_state, elemComponent);
              }
          }
        }, delay || 0)
      }
    }

    $scope.playStateComponents = function(state_components) {
      applyInitPropertiesForState($scope.current_states.states[$scope.current_states.selectedIndex]);
      $scope.showStatus('Initializing all components to their original states');

      $timeout(function() {
        var max_time_state = 0;
        for (var i = 0; i < state_components.length; i++) {
          var indexComponent = state_components[i];
          var elemComponent = document.querySelectorAll('[anim].' + indexComponent.selector)[0];

          for (var j = 0; j < indexComponent.time_states.length; j++) {
            var indexTimeState = indexComponent.time_states[j];
            if (indexTimeState.time > max_time_state) {
              max_time_state = indexTimeState.time;
            }
            applyComponentPropertiesAtTime(indexComponent, indexTimeState, elemComponent);
          }
        }
      }, 2000)

      $timeout(function() {
        LoadingService.showMsg('Re-initializing components...', 3000);
        applyInitPropertiesForState($scope.current_states.states[$scope.current_states.selectedIndex]);
      }, (parseInt(max_time_state) + 2000));

    }



    function applyComponentPropertiesAtTime(component, time_state, element) {
        if (!time_state.properties || !time_state.properties.length)  {
          return;
        }
        var delay = 0;
        if (time_state.time === -1) {
          var delay = 0;
        } else {
          delay = parseFloat(time_state.time)
        }
        $timeout(function() {
          for (var i = 0; i < time_state.properties.length; i++) {
            if (time_state.properties[i].type === 'css_text') {
              element.style[time_state.properties[i].name] = time_state.properties[i].value;
            } else if (time_state.properties[i].type === 'css_class') {
              element.classList.add(time_state.properties[i].name);
            } else if (time_state.properties[i].type === 'css_animation') {
              var animationPropertyDropdown = time_state.properties[i].value;
              var animationPropertyDropdownValue = animationPropertyDropdown.options[animationPropertyDropdown.selectedIndex];
              if (animationPropertyDropdownValue === "Animate Out") {
                AnimationService.animateOut(element, time_state.properties[i].name);
              } else {
                AnimationService.animateIn(element, time_state.properties[i].name);
              }
            }
          }
        }, delay)
      }

    function processComputedStyle(_dict) {
      _dictKeys = Object.keys(_dict);
      _filteredArrProps = [];
      for (var i = 0; i < _dictKeys.length; i++) {
        var indexKey = _dictKeys[i];
        if (!isDigit(indexKey) && _dict[indexKey] && _dict[indexKey].toString().length) {
          _filteredArrProps.push({name:indexKey, value:_dict[indexKey]})
        }

      }
      _filteredArrProps.sort(function(prop1, prop2) {
          return mostUsedCSSProperties.indexOf(prop1.name) - mostUsedCSSProperties.indexOf(prop2.name);
      });
      return _filteredArrProps.reverse();

      function isDigit(str) {
        /^\d+$/.test(str);
      }
    }

    function evalSizeDropdownDefaultSelected() {

      var selectedIndex = $scope.page.dropdowns.screenSizeOptions.selectedIndex;
      var option = $scope.page.dropdowns.screenSizeOptions.options[selectedIndex]

      $scope.page.dropdowns.screenSizeOptions.onOptionClick(option, selectedIndex)
    }


    function onDomContentLoad() {

        getRecentElementComponents(onDomContentLoad);

    }

    onDomContentLoad();


  }
])