angular.module('uguru.shared.controllers')
// angular.module('uguru.shared.controllers')
.controller('AnimationFrameController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$stateParams',
  'UtilitiesService',
  '$compile',
  'AnimationFrameService',
  'RootService',
  'ElementService',
  function($scope, $state, $timeout, $stateParams, UtilitiesService, $compile, AnimationFrameService, RootService, ElementService) {
    var afc = this;

    afc.service = AnimationFrameService;
    afc.args = {}
    afc.params = {formatted: '', raw: ''}
    afc.params.raw = constructStateStrFromParams($stateParams);

    // afc.params.template = afc.element.objUrl.split('/').splice(afc.element.objUrl.split('/').length - $stateParams.comp.split('.').length).join('/')
    afc.params.template = afc.element.objUrl;
    afc.params.defaults = {kf: getKFFromParams($stateParams), hidePlot: $stateParams.hidePlot === "true", stateName: $stateParams.state};
    afc.params.formatted = 'p:[' + afc.params.raw + ']';
    afc.getDebugFormat = AnimationFrameService.getDebugFormat;

    $timeout(function() {

        $scope.$apply();

        var stateName = $stateParams.state || 'on-init'
        if (!$stateParams.select) {
          $stateParams.select = '*'
        }

        var animContainer = document.querySelector('#anim-element');
        animContainer.classList.add('absolute', 'full-xy', 'bottom-0', 'flex-wrap-center')
        afc.element.dom = animContainer.querySelector($stateParams.select);
        // var domCoords = afc.element.dom.getBoundingClientRect();
        animContainer.innerHTML = ''
        appendParentWithComputedHeight(animContainer, afc.element.dom)
        // for (var i = 0; i < afc.element.dom.length; i++) {
          afc.stateObj = afc.service.init.state(stateName, afc.params.raw, afc.element.dom, afc.params.defaults);
          afc.player = AnimationFrameService.getPlayer();
          afc.player = afc.player.scheduleStream(afc.player, afc.stateObj, afc.stateObj.offset, afc.params.defaults);

    })


    function getKFFromParams(params) {
      return params.kf && parseInt(params.kf) || 60
    }

    function appendParentWithComputedHeight(container, element) {
      $timeout(function() {
        var _window = $scope.root.window;
        element = ElementService.scaleSvgCSS(element, _window, true, true).parentNode;
      })

      var hasBounds = true;
      var isSvg = ElementService.isSVGElement(element.nodeName.toLowerCase());
      if (isSvg) {
        element = ElementService.getSVGParent(element)
      }

      while (hasBounds) {
        container.appendChild(element);
        var style = window.getComputedStyle(element);
        if (style.height && style.width) {
          hasBounds = false;

          break;
        } else {
          container.innerHTML = '';
          element = element.parentNode;
        }

      }
      element.classList.add('full-xy', 'absolute', 'flex-vertical-center', 'bottom-0')
      return element
    }

    function constructStateStrFromParams(params) {
      var animationShortcuts = RootService.customShortcuts.animProps;
        var propArgs = params.property.split('+');
        var argNames = ['property', 'start', 'end', 'duration', 'easingFunc', 'delay', 'iter', 'direction']
        propArgs.forEach(function(prop_anim, i) {
          propArgs[i] = UtilitiesService.replaceAll(prop_anim, ',', ':');
          if (!i && propArgs[i].split(':').length > 5) {
              propArgs[i].split(':').forEach(function(arg, arg_index) {
                afc.args[argNames[arg_index]] = arg

                if (argNames[arg_index] in animationShortcuts && arg in animationShortcuts[argNames[arg_index]]) {
                    afc.args[argNames[arg_index]] = animationShortcuts[argNames[arg_index]][arg]
                }
              })
          }
        })

        var urlSplit = params.template.split(':');
        var dir = urlSplit[0];

        var isHtml = params.template.indexOf('.html') > -1
        var ext = isHtml && '.html' || '.tpl';
        urlString = dir + '/templates/' + urlSplit[1].split('.').join("/").replace('/html', '').replace('/tpl', '') + ext;
        afc.element = {objUrl:urlString};


        return propArgs.join(',');
    }

  }

]);

