
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
  function($scope, $state, $timeout, $localstorage, LoadingService, Restangular, $compile, $sce) {



    $scope.states = {
      'mad-lib': ['on-load', 'on-first-tag-click', 'on-second-tag-click', 'on-category-swap', 'on-university-swap', 'on-university-search', '']
    }

    $scope.gestureStates = {
      'mad-lib': {
        'on-load': [],
        'on-first-tag-click': [{selector: '.adlib-tag a', gesture:'click', delay:1500}],
        'on-second-tag-click': [{selector: 'a.adlib-2', gesture:'click', delay: 500}],
      }
    }

    var mostUsedCSSProperties = ["transform", "-webkit-transform", "opacity", "-webkit-animation-name", "animation-name", "-webkit-animation-timing-function", "animation-timing-function", "-webkit-transform-origin", "transform-origin", "backface-visibility", "-webkit-backface-visibility", "animation-duration", "-webkit-animation-duration", "-webkit-animation-fill-mode", "-webkit-animation-iteration-count", "animation-iteration-count", "animation-fill-mode", "z-index", "width", "visibility", "top", "float", "position", "margin", "left", "height", "background", "background-color", "display", "border", "color", "padding"];
    var supportedAnimationStyles = [];
    var masterAnimationClasses = [];
    $scope.properties = {
      common_css_styles: mostUsedCSSProperties,
      supported_animations: getAnimationClasses(['animate', 'animation', 'magic']),
      supported_classes: getAnimationClasses(['utility'])
    }

    var classes = getAnimationClasses(['animate', 'animation', 'magic']);
    var utilityClasses = getAnimationClasses(['utility'])

    function getAnimationClasses(arr_animation_css_files) {
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
      console.log(masterAnimationClasses.length, 'classes exported from', arr_animation_css_files.join(" "), 'css files');
      return masterAnimationClasses;
    }


    $scope.elements = [];
    $scope.current_states =[];
    $scope.page = {dropdowns:{}, toggles:{}};
    $scope.page.toggles = {add_component: false};
    $scope.page.compiledTemplates = {};
    $scope.page.dropdowns.screenSizeOptions = {label:'autoscale @ 1.5x', onOptionClick: resizeStage, options: [], size:'small', key:'name', selectedIndex: 4};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};

    function generateTimeStateProperty(option, index) {
      var css_class = option._class;

      option.component.confirmPropertyField(option.component, option.component.empty_time_state, {name: css_class}, 'css_class', '--');
    }



    $scope.saveCurrentStatesToLocalStorage = function(template_ref) {
      var adminBuildToolsCacheExists = $localstorage.getObject('admin_build')
      $localstorage.removeObject('admin_build');
      if (!adminBuildToolsCacheExists || !adminBuildToolsCacheExists.length) {
        adminBuildToolsCacheExists = {'admin_build': {}};
      }
      adminBuildToolsCacheExists['admin_build'][$scope.current_states.template_ref] = $scope.current_states;
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
      $localstorage.setObject('admin_build', adminBuildToolsCacheExists['admin_build']);
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
      if (option.template_url) {
        injectTemplateIntoStage(option.template_url, option.controller);

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
              {name: 'opacity', value:0, onChange: onOpacityChange},
              {name: 'visibility', value:"visible"},
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
          // if (time_state.time && time_state.properties && time_state.properties.length) {
            component.time_states.push(JSON.parse(JSON.stringify(time_state)));
            time_state.time = null;
            time_state.properties = [];
          // }
      }
      component_obj.addPropertyField = function(component, time_state) {
          $scope.selectPropertyActivated = true;
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
        }
      component_obj.confirmPropertyField = function(component, time_state, property, _type, value) {
          if (time_state.properties) {
            time_state.properties.push({name: property.name, type: _type ||'css_text', value: value || 'absolute'})
          }
          $scope.selectPropertyActivated = false;
          $scope.component_selected = null;
        }
      component_obj.removePropertyField = function(time_state, property_index) {
        time_state.properties.splice(property_index, 1);
      }

      if (!component_obj.empty_time_state) {
         component_obj.empty_time_state = {time:null, properties:[]};
      }
    }

    function initComponentObj(cloned_elem, elem, selector) {
      var initProperties = processComputedStyle(window.getComputedStyle(elem));
      cloned_elem.removeAttribute('anim');
      return {
        name: cloned_elem.nodeName,
        selector: selector,
        active:false,
        collapsed: true,
        expand: false,
        template: cloned_elem,
        properties: mostUsedCSSProperties,
        init_time_state: {
            time: -1,
            properties:[
              {name: 'opacity', value:0},
              {name: 'visibility', value:"visible"},
              {name:'display', value:'inherit'}
            ]
        },
        time_states: [],
        addTimeState: function(component, time_state, c) {
          // if (time_state.time && time_state.properties && time_state.properties.length) {
            component.time_states.push(JSON.parse(JSON.stringify(time_state)));
            time_state.time = null;
            time_state.properties = [];
          // }
        },
        addPropertyField: function(component, time_state) {
          $scope.selectPropertyActivated = true;
          $scope.component_selected = component;
          $scope.time_state_selected = time_state;
        },
        removePropertyField: function(time_state, property_index) {
          time_state.properties.splice(property_index, 1);
        },
        confirmPropertyField:confirmPropertyField,
        empty_time_state: {time:null, properties:[]}
      }
    }

    function removePropertyField(component, time_state, property, _type, value) {
          if (time_state.properties) {
            time_state.properties.push({name: property.name, type: _type ||'css_text', value: value || 'absolute'})
          }
          $scope.selectPropertyActivated = false;
          $scope.component_selected = null;
    }

    $scope.playOneComponent = function(component) {
      var elemComponent = document.querySelectorAll('[anim].' + component.selector)[0];
      for (var j = 0; j < component.time_states.length; j++) {
        applyComponentPropertiesAtTime(component.time_states[j], elemComponent);
      }
    }

    $scope.playStateComponents = function(state_components) {

      for (var i = 0; i < $scope.state_components.length; i++) {
        var indexComponent = $scope.state_components[i];
        var elemComponent = document.querySelectorAll('[anim].' + indexComponent.selector)[0];

        for (var j = 0; j < indexComponent.time_states.length; j++) {
          var indexTimeState = indexComponent.time_states[j];
          applyComponentPropertiesAtTime(indexTimeState, elemComponent);
        }
      }

    }

    function applyComponentPropertiesAtTime(time_state, component) {
        $timeout(function() {
          for (var i = 0; i < time_state.properties.length; i++) {
            if (time_state.properties[i].type === 'css_text') {
              component.style[time_state.properties[i].name] = time_state.properties[i].value;
            } else if (time_state.properties[i].type === 'css_class') {
              component.classList.add(time_state.properties[i].name);
            }
          }
        }, parseFloat(time_state.time))
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