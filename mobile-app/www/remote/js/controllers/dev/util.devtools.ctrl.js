
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
  function($scope, $state, $timeout, $localstorage, LoadingService, Restangular, $compile, $sce, AnimationService, KeyboardService) {

    // KeyboardService.preventDefaultCutPaste();
    KeyboardService.initCopyPasteFunctionCallbacks();

    $scope.selected = {
      property: null,
      component: null
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

    $scope.elements = [];
    $scope.current_states =[];
    $scope.page = {dropdowns:{}, toggles:{}};
    $scope.page.toggles = {add_component: false};
    $scope.page.compiledTemplates = {};
    $scope.page.dropdowns.fileOptions = {label:'Current Storage', onOptionClick: onFileOptionSelect, options: generateFileOptions(), size:'small', key:'name', selectedIndex: 0};
    $scope.page.dropdowns.screenSizeOptions = {label:'autoscale @ 1.5x', onOptionClick: resizeStage, options: [], size:'small', key:'name', selectedIndex: 4};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};
    $scope.page.dropdowns.filterOptions = {label: "sort by", options: ['Time', "Component"], selectedIndex: 0, size:"small", onOptionClick: toggleComponentGUIMode}

    if (!$scope.page.dropdowns.filterOptions.selectedIndex) {
      $timeout(function() {
        toggleComponentGUIMode('Time', 0);
      }, 5000)
    }

    function toggleComponentGUIMode(option, index)  {
      //component mode
      console.log(option, index);
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
            console.log(time_string);
            if (!(time_string in time_dict)) {
              time_dict[time_string] = [];

            }
            time_dict[time_string].push(indexComponent);

          }
        }

        var time_arr = [];
        for (var i = 0; i < Object.keys(time_dict).length; i++) {
          var indexKey = Object.keys(time_dict)[i];
          console.log('processing', indexKey, time_dict[indexKey])
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
          console.log(indexTime.component_selected);
        }
        $timeout(function() {
          renderTimeStateComponents(current_state.timeline);
        }, 2000)
      }

    }

    function renderTimeStateComponents(time_arr) {
      var allTimeStateComponentContainers = document.querySelectorAll('.time-state-component-bar');
      console.log(allTimeStateComponentContainers, 'containers')
      for (var i = 0; i < time_arr.length; i ++) {
          var indexTimeState = time_arr[i];
          console.log('processing time state', indexTimeState)
          if (indexTimeState.components && indexTimeState.components.length && allTimeStateComponentContainers.length) {

            var indexContainer = allTimeStateComponentContainers[i];
            console.log('processing index container', indexContainer)
            for (var j = 0; j < indexTimeState.components.length; j++) {
              var indexComponent = indexTimeState.components[j];
              var indexComponentElement = document.querySelector('.' + indexComponent.selector);
              var clonedComponentElem = recursiveClone(indexComponentElement);
              clonedComponentElem.className = clonedComponentElem.className + ' full-xy absolute';
              var playButtonElement = document.createElement("a");
              playButtonElement.className = "class='high-z-index m05xy right-0 bottom-0 absolute";
              playButtonElement.innerHTML = "&rtrif;"
              var divItemElement = document.createElement("div");
              divItemElement.appendChild(clonedComponentElem);
              var listItemElement = document.createElement("li");
              listItemElement.setAttribute("ng-click", "time_state.component_selected = component")
              listItemElement.setAttribute("ng-class", "{'opacity-50': time_state.component_selected != component}");
              listItemElement.appendChild(playButtonElement);
              listItemElement.appendChild(divItemElement);
              //@gabrielle-note --> add your custom class here
              listItemElement.className = "padding-20xy bg-charcoal p20xy";
              listItemElement.style.cssText = 'max-width:75px; max-height:75px;'
              // listItemElement.
              indexContainer.appendChild(listItemElement);

              $compile(listItemElement)($scope);
            }
          }
        }
    }

    function addNewTimeState() {
      var currentState = $scope.current_states.states[$scope.current_states.selectedIndex];
      if (!currentState.timeline) {
        current_state.timeline = [];
      }
      for (var i = 0 ; i < currentState.timeline.length; i++) {
        var timeIndexState = currentState.timeline[i];
        if (timeIndexState.time === 'new') {
          LoadingService.showMsg('Please set a time (in ms) of the recent newly added time state'), 2500;
        }
      }
      currentState.timeline.push({
        time: 'new',
        components: []
      })
    }



    function removeTimeState(index) {
      var currentState = $scope.current_states.states[$scope.current_states.selectedIndex];
      console.log('removing time state', index, currentState);
      if (currentState && currentState.timeline && currentState.timeline.length) {
        console.log('removing time state 2', (currentState.timeline[index].components));
        var result;
        if (currentState.timeline[index].components.length > 1 && confirm("Are you sure? All components and properties will be removed from this state")) {
          result = true;
        } else if (currentState.timeline[index].components.length === 1) {
          result = true;
        }
        if (result) {
          console.log('removing..');
          var tempTimeIndex = currentState.time;
          currentState.timeline.splice(index, 1);
          LoadingService.showSuccess('time t = ' + tempTimeIndex + ' succesfully deleted');
        }
      }
    }
    $scope.removeTimeState = removeTimeState;
    $scope.addNewTimeState = addNewTimeState;


    $scope.editTimeStateTime = function(time_state) {
      var response = prompt("Please enter a time state & confirm", time_state.time);
      console.log(time_state.time, typeof(time_state.time));
      if (response) {
        time_state.time = response;
      }
    };

    function onFileOptionSelect(option, index) {

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



    $scope.saveCurrentStatesToLocalStorage = function(template_ref) {
      var adminBuildToolsCacheExists = $localstorage.getObject('admin_build')
      console.log('current local storage', adminBuildToolsCacheExists);
      if (!adminBuildToolsCacheExists || adminBuildToolsCacheExists.constructor == Array) {
        adminBuildToolsCacheExists = {};
      }
      console.log($scope.current_states.template_ref, adminBuildToolsCacheExists);
      adminBuildToolsCacheExists[$scope.current_states.template_ref] = $scope.current_states;

      for (var i = 0; i < $scope.current_states.states.length; i++) {
        var indexState = $scope.current_states.states[i];
        if (indexState.components) {
          for (var j = 0; j < indexState.components.length; j++) {
            var indexComponent = indexState.components[j];
            indexComponent.addPropertyField = null;
            indexComponent.confirmPropertyField = null;
            indexComponent.css_class_dropdown = null;
            indexComponent.properties = null;
            indexComponent.template = null;
          }
        }
      }
      $localstorage.setObject('admin_build', adminBuildToolsCacheExists);
      console.log(adminBuildToolsCacheExists);
      LoadingService.showAmbig(null, 2500);
      $timeout(function() {
        LoadingService.showSuccess('Saved!', 1000);
      }, 2000)



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
            $timeout(function() {
              $scope.$apply(function() {
                $scope.page.dropdowns.templates.options = response.layouts;
                $scope.page.dropdowns.screenSizeOptions.options = getScreenOptions();
              })
            });

            response.layouts.sort(function(val_a, val_b) {
              return val_b.id - val_a.id;
            }).reverse()
            injectTemplateIntoStage(response.layouts[0].template_url, 'SplashController', response.layouts[0].ref);
            $timeout(function() {

              // evalSizeDropdownDefaultSelected();
            }, 5000)
          },

          function(error) {

            alert('error! \n' + JSON.stringify(error))

          })


    }

    function getScreenOptions() {
      return[
          {name:'Mobile S 320x480', ref: 'mobile-s', dimensions: {'width': 320, 'height': 480 }},
          {name:'Mobile M 320x568', ref: 'mobile-m', dimensions: {'width': 320, 'height': 568 }},
          {name:'Mobile L 375x667', ref: 'mobile-lg', dimensions: { 'width': 375, 'height': 667 }},
          {name:'Mobile XL 414x736', ref:'mobile-xl', dimensions: { 'width': 414, 'height': 736}},
          {name: 'Desktop S 1024x768', ref: 'desktop-s', dimensions: {'width': 1024, 'height': 768}},
          {name: 'Desktop M 1366x768', ref:'desktop-m',dimensions: {'width': 1366, 'height':768}},
          {name: 'Desktop L 1920x1080', ref:'desktop-lg', dimensions: {'width': 1920, 'height':1080}}
      ]
    }

    function resizeStage(option, index) {
      var stageWrapper = document.querySelectorAll('#stage-template-container');
      if (stageWrapper.length > 1) {
        for (var i = 0 ; i < (stageWrapper.length -1); i++) {
          var indexStageWrapper = stageWrapper[i];
          indexStageWrapper.parentNode.removeChild(indexStageWrapper);
        }
      }
      stageWrapper = stageWrapper[0];

      stageWrapper.setAttribute("style", "height:" + option.dimensions.height +"px !important; width: " + option.dimensions.width + "px !important;");
      // stageWrapper.style.width = option.dimensions.width + 'px !important;';
      $timeout(function() {
        $compile(stageWrapper)($scope);
      }, 1000)
    }

    function injectTemplateDropdown(option, index) {
      console.log(option, index);
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

    function injectTemplateIntoStage(template_url, controller, ref) {
      deletePreviousTemplateIfExists('#stage-template-container');

      var stageTemplateDiv = document.createElement('div');
      stageTemplateDiv.id = 'stage-template-container'
      stageTemplateDiv.setAttribute('ng-include', 'img_base + BASE + "templates/' + template_url + '"');
      if (controller) {
        stageTemplateDiv.setAttribute('ng-controller', controller);
      }
      stageTemplateDiv.className += 'build-player-container';
      stageTemplateParentContainer = document.querySelector('.build-player');
      stageTemplateParentContainer.classList.add('relative')

      stageTemplateParentContainer.appendChild(stageTemplateDiv);
      $compile(stageTemplateDiv)($scope);
      storeTemplateToCache(template_url, stageTemplateDiv, ref);
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
      $scope.current_states.selectedIndex = $index;
      injectAllAllChildComponentsForOneState($scope.current_states.states[$index].components, null, null, function() {
        LoadingService.hide()
      });

      if ($scope.current_states.states[$index].gestures)  {
        var stateGestures = $scope.current_states.states[$index].gestures;
        for (var i = 0; i < stateGestures.length; i++) {
          var indexGesture = stateGestures[i];
          var elem = document.querySelector(indexGesture.selector);
          var delay = indexGesture.delay || 0
          var gesture = indexGesture.gesture;
          if (elem && gesture) {
            $timeout(function() {
              angular.element(elem).triggerHandler(gesture);
            }, delay + 1000);
          }

        }
      }
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
          console.log('continuging because couldnt find index');
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

    function recursiveClone(elem) {
      var clonedNode = elem.cloneNode(true);
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
      component_obj.addPropertyField = function(component, time_state) {
          $scope.toggleClassProperties()
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
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
                console.log('default value is ', componentStyles[property]);
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


      if (!$scope.page.dropdowns.filterOptions) {
        toggleComponentGUIMode('Time', 0);
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
        addPropertyField: function(component, time_state) {

          $scope.toggleClassProperties();
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
        },
        removePropertyField: removePropertyField,
        confirmPropertyField:confirmPropertyField,
        empty_time_state: {time:null, properties:[]}
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

    $scope.playStateComponents = function(state_components) {
      console.log(state_components);
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

      $timeout(function() {
        LoadingService.showMsg('Re-initializing components...', 3000);
        applyInitPropertiesForState($scope.current_states.states[$scope.current_states.selectedIndex]);
      }, (parseInt(max_time_state) + 2000));

    }



    function applyComponentPropertiesAtTime(component, time_state, element) {
        var delay = 0;
        if (time_state.time === -1) {
          var delay = 0;
        } else {
          delay = parseFloat(time_state.time)
        }
        $timeout(function() {
          for (var i = 0; i < time_state.properties.length; i++) {
            if (!component.active) {
              continue;
            }
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