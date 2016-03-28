
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
    $scope.page.dropdowns.screenSizeOptions = {options: ['Desktop 1280x800', 'Desktop 1920x1280', 'iPhone 6 375x689', 'iPhone 6+ 414x736'], size:'small', selectedIndex: 0};
    $scope.page.dropdowns.templates = {options:[], key:'ref', selectedIndex:0, size:'small', onOptionClick: injectTemplateDropdown};
    LoadingService.showAmbig('Loading all dependencies...', 2500);

    function getRecentElementComponents(callback) {
        Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').get().then(
          function(response) {
            response = JSON.parse(response)
            $timeout(function() {
              $scope.$apply(function() {
                $scope.page.dropdowns.templates.options = response.layouts;
              })
            });
            injectTemplateIntoStage(response.layouts[0].template_url, 'SplashController');

            console.log($scope.page.dropdowns.templates.options);
          },

          function(error) {})


    }

    function makeAllElementsDraggable() {

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
      // $compile(stageTemplateDiv)($scope);
      stageTemplateParentContainer.appendChild(stageTemplateDiv);
      $compile(stageTemplateDiv)($scope);
    }

    function stageResizer(dimensions, platform) {

    };

    function onDomContentLoad() {
        function closeLoaderCallback() {
            LoadingService.hide();
        }
        getRecentElementComponents(onDomContentLoad);

        $timeout(function() {


        }, 1000)
    }

    onDomContentLoad();


  }
])