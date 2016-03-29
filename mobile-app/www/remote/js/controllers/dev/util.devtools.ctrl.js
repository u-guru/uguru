
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
  function($scope, $state, $timeout, $localstorage, LoadingService, Restangular, $compile) {

    $scope.elements = [];
    $scope.page = {dropdowns:{}, toggles:{}};
    $scope.page.toggles = {add_component: false};
    $scope.page.compiledTemplates = {};
    $scope.page.dropdowns.screenSizeOptions = {onOptionClick: resizeStage, options: [], size:'small', key:'name', selectedIndex: 4};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};
    LoadingService.showAmbig('Loading all dependencies...', 2500);

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
      stageTemplateDiv.className += 'absolute full-xy top-0 left-0';
      stageTemplateParentContainer = document.querySelector('.build-player');
      stageTemplateParentContainer.classList.add('relative')

      stageTemplateParentContainer.appendChild(stageTemplateDiv);
      $compile(stageTemplateDiv)($scope);
      var templateName = template_url.split('.html')[0];
      $scope.page.compiledTemplates[templateName] = {pre: stageTemplateDiv};
      $timeout(function() {
        var elem = document.querySelector('#stage-template-container')
        $scope.page.compiledTemplates[templateName].post = elem;
        processAllChildComponents(elem);
      }, 5000)
    }

    function processAllChildComponents(template) {
      var elements = template.querySelectorAll('*')
      var smallerElements = [];
      var nestedElementDict = {};
      var elementBlackList = ['g', 'path', 'tspan', 'circle', 'circle', 'rect', 'text', 'comment'];
      for (var i = 0; i < elements.length; i++) {
        var elementIndex = elements[i];
        if (elementIndex.getBoundingClientRect && elementBlackList.indexOf(elementIndex.nodeName.toLowerCase()) === -1 ) {
          var elemRectInfo = elementIndex.getBoundingClientRect()

          if (elemRectInfo.height && elemRectInfo.height > 50 && elemRectInfo.height < 700 && elemRectInfo.width && elemRectInfo.width < 700 && elemRectInfo.width > 50) {
            if (elementNotAChildOf(elementIndex, smallerElements)) {
              smallerElements.push(elementIndex);
              // console.log('HEIGHT:' + elemRectInfo.height, 'WIDTH:' + elemRectInfo.width, '\n\n', elementIndex, '\n\n');
            }
          }
        }
      }

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

    function evalSizeDropdownDefaultSelected() {

      var selectedIndex = $scope.page.dropdowns.screenSizeOptions.selectedIndex;
      var option = $scope.page.dropdowns.screenSizeOptions.options[selectedIndex]

      $scope.page.dropdowns.screenSizeOptions.onOptionClick(option, selectedIndex)
    }


    function onDomContentLoad() {
        function closeLoaderCallback() {
            LoadingService.hide();
        }
        getRecentElementComponents(onDomContentLoad);

    }

    onDomContentLoad();


  }
])