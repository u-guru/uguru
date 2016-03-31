
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

    var classes = ['animated', 'bounceInUp', 'bounceInDown'];

    $scope.elements = [];
    $scope.page = {dropdowns:{}, toggles:{}};
    $scope.page.toggles = {add_component: false};
    $scope.page.compiledTemplates = {};
    $scope.page.components = [];
    $scope.page.dropdowns.screenSizeOptions = {label:'autoscale @ 1.5x', onOptionClick: resizeStage, options: [], size:'small', key:'name', selectedIndex: 4};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};
    var mostUsedCSSProperties = ["transform", "-webkit-transform", "opacity", "-webkit-animation-name", "animation-name", "-webkit-animation-timing-function", "animation-timing-function", "-webkit-transform-origin", "transform-origin", "visibility", "backface-visibility", "-webkit-backface-visibility", "animation-duration", "-webkit-animation-duration", "-webkit-animation-fill-mode", "-webkit-animation-iteration-count", "animation-iteration-count", "animation-fill-mode", "z-index", "width", "visibility", "top", "float", "position", "margin", "left", "height", "background", "background-color", "display", "border", "color", "padding", "float"];

    function generateTimeStateProperty(option, index) {
      var css_class = option._class;

      option.component.confirmPropertyField(option.component, option.component.empty_time_state, {name: css_class}, 'css_class', '--');
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
            injectTemplateIntoStage(response.layouts[0].template_url, 'SplashController');
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

    function injectTemplateIntoStage(template_url, controller) {
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
      storeTemplateToCache(template_url, stageTemplateDiv);
    }

    function updateScreenSize(elem_selector) {
      var elem = document.querySelector(elem_selector);
      console.log(elem);
      var selectedDropdownIndex = $scope.page.dropdowns.screenSizeOptions.selectedIndex;
      var selectedCoords = $scope.page.dropdowns.screenSizeOptions.options[selectedDropdownIndex].dimensions;
      var stageCoords = {width: elem.getBoundingClientRect().width, height: elem.getBoundingClientRect().height};

      var scaleXRatio = selectedCoords.width / stageCoords.width;
      var scaleYRatio = selectedCoords.height / stageCoords.height;

      var scaleString = " scale(" + scaleXRatio + ',' + scaleYRatio + ')'
      console.log(scaleString);
      elem.style.webkitTransform = scaleString;
      elem.style.MozTransform = scaleString;
      elem.style.msTransform = scaleString;
      elem.style.OTransform = scaleString;
      elem.style.transform = scaleString;

    }


    function storeTemplateToCache(template_url, elem) {
      var templateName = template_url.split('.html')[0];
      $scope.page.compiledTemplates[templateName] = {pre: elem};
      $timeout(function() {
        var elem = document.querySelector('#stage-template-container')
        $scope.page.compiledTemplates[templateName].post = elem;
        processAllChildComponents(elem);
      }, 2000)
    }

    function processAllChildComponents(template) {
      $scope.page.components = [];
      allAnimElem = template.querySelectorAll('[anim]');
      for (var i = 0; i < allAnimElem.length; i++) {
        ref = 'anim-elem-' + i;
        allAnimElem[i].classList.add(ref);
        var clonedNode = allAnimElem[i].cloneNode(true)
        var componentObj = initComponentObj(clonedNode, allAnimElem[i], ref);
        componentObj.css_class_dropdown = {label:'', key:'_class', options:generateCSSClassOptions(classes, componentObj), onOptionClick:generateTimeStateProperty, size:'small', selectedIndex:0},
        $scope.page.components.push(componentObj);
      }

      $timeout(function() {
        var allElems = document.querySelectorAll('.component-inject');
        for (var i = 0; i < $scope.page.components.length; i++) {
          var componentIndex = $scope.page.components[i];
          var componentInjectDiv = allElems[i];
          componentIndex.template.style.opacity = 1;
          componentIndex.template.style.maxHeight = componentInjectDiv.getBoundingClientRect().height + 'px;'
          componentIndex.template.style.maxWidth = componentInjectDiv.getBoundingClientRect().width + 'px;'
          componentInjectDiv.appendChild(componentIndex.template);
        }
      }, 1000)

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

    function initComponentObj(cloned_elem, elem, selector) {
      var initProperties = processComputedStyle(window.getComputedStyle(elem));
      cloned_elem.removeAttribute('anim');
      return {
        name: cloned_elem.nodeName,
        selector: selector,
        template: cloned_elem,
        properties: initProperties,
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
          console.log($scope.component_selected);
          $scope.time_state_selected = time_state;
        },
        confirmPropertyField:function(component, time_state, property, _type, value) {
          if (time_state.properties) {
            time_state.properties.push({name: property.name, type: _type ||'css_text', value: value || 'absolute'})
          }
          $scope.selectPropertyActivated = false;
          $scope.component_selected = null;
        },
        empty_time_state: {time:null, properties:[]}
      }
    }

    $scope.playPageComponents = function() {

      for (var i = 0; i < $scope.page.components.length; i++) {
        var indexComponent = $scope.page.components[i];
        var elemComponent = document.querySelectorAll('[anim].' + indexComponent.selector)[0];

        for (var j = 0; j < indexComponent.time_states.length; j++) {
          var indexTimeState = indexComponent.time_states[j];
          applyComponentPropertiesAtTime(indexTimeState, elemComponent);
        }
      }

      function applyComponentPropertiesAtTime(time_state, component) {
        $timeout(function() {
          for (var i = 0; i < time_state.properties.length; i++) {
            if (time_state.properties[i].type === 'css_text') {
              console.log('applying css text', time_state.properties[i].name, time_state.properties[i].value);
              component.style[time_state.properties[i].name] = time_state.properties[i].value;
            } else if (time_state.properties[i].type === 'css_class') {
              console.log('adding css class', time_state.properties[i].name);
              component.classList.add(time_state.properties[i].name);
            }
          }
        }, parseFloat(time_state.time))
      }

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