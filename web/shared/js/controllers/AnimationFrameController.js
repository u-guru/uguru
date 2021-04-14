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
  'AdminElementService',
  function($scope, $state, $timeout, $stateParams, UtilitiesService, $compile, AnimationFrameService, RootService, AdminElementService) {
    var afc = this;

    afc.service = AnimationFrameService;
    afc.args = {}
    afc.params = {formatted: '', raw: ''}
    afc.params.raw = constructStateStrFromParams($stateParams);


    afc.params.template = afc.element.objUrl;
    afc.params.defaults = {kf: getKFFromParams($stateParams), startAt:$stateParams.startAt && $stateParams.startAt.replace('p', '%'), autoPlay:$stateParams.autoPlay === 'true',  toolbar:{}, hidePlot: $stateParams.hidePlot === "true", stateName: $stateParams.state};
    afc.params.formatted = 'p:[' + afc.params.raw + ']';
    afc.getDebugFormat = AnimationFrameService.getDebugFormat;

    $timeout(function() {
        $scope.$apply();

        var stateName = $stateParams.state || ''
        var animContainer = document.querySelector('#anim-element');
        var navBarElemContainer = document.querySelector('#focused-element');
        animContainer.classList.add('absolute', 'full-xy', 'bottom-0', 'flex-wrap-center')

        afc.element.dom = getDomElementWithBounds(animContainer, $stateParams)


        afc.element.dom = AdminElementService.formatElement(afc.element.dom, 'player', $scope.root.window);

        var domRef = afc.element.dom
        animContainer.innerHTML = '';

        animContainer.appendChild(afc.element.dom);


        if (!$stateParams.state) {
          afc.params.raw =constructStateStrFromParams($stateParams);
        }


        // addBlindToElem(afc.element.dom);

        // append to element container
        // var clonedElem = afc.element.dom.cloneNode(true);
        // clonedElem.classList.add('absolute', 'full-xy');
        // navBarElemContainer.appendChild(clonedElem);
        // clonedElem.style.height = 'calc(100%)';
        // clonedElem.style.width = 'calc(100%)';

        afc.element.dom = domRef;

        afc.stateObj = afc.service.init.state(stateName, afc.params.raw, afc.element.dom, afc.params.defaults);
        afc.player = AnimationFrameService.getPlayer();
        afc.player = afc.player.scheduleStream(afc.player, afc.stateObj, afc.stateObj.offset, afc.params.defaults);

    }, 100)


    function addBlindToElem(elem) {
      AdminElementService.createBlind(elem);

      // animContainer.appendChild()
    }
    function getKFFromParams(params) {
      return params.kf && parseInt(params.kf) || 60
    }

    function appendParentWithComputedHeight(container, element) {

        var _window = $scope.root.window;




      var hasBounds = true;
      var isSvg = AdminElementService.isSVGElement(element.nodeName.toLowerCase());
      if (isSvg) {
        element = AdminElementService.getSVGParent(element)
        element = AdminElementService.scaleSvgCSS(element, _window, true, true);
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
      console.log(element)

      element.classList.add('full-xy', 'absolute', 'flex-vertical-center', 'bottom-0')
      var cloneElemContainer = document.querySelector('#focused-element')
      if (cloneElemContainer) {



              var isSvg = AdminElementService.isSVGElement(afc.element.dom.nodeName.toLowerCase());
              if (isSvg) {
                // console.log(clonedElem.paren)
                clonedElem = AdminElementService.getSVGParent(afc.element.dom);
                var clonedElem = clonedElem.cloneNode(true);
              }
              cloneElemContainer.appendChild(clonedElem);
        }
      return element
    }



    function constructStateStrFromParams(params) {
      var animationShortcuts = RootService.customShortcuts.animProps;
        if (params.property) {
          var propArgs = params.property.split('+');
        } else {
          var propArgs = ['transformX:-50p,50p,1000,bouncePast,0,1,f', 'transformY:-50p,50p,1000,bouncePast,0,1,f'];
        }
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

        if (params.template) {
          var urlSplit = params.template.split(':');
          var dir = urlSplit[0];

          var isHtml = params.template.indexOf('.html') > -1
          var ext = isHtml && '.html' || '.tpl';
          urlString = dir + '/templates/' + urlSplit[1].split('.').join("/").replace('/html', '').replace('/tpl', '') + ext;
          afc.element = {objUrl:urlString};
        }



        return propArgs.join(',');
    }

    function getDomElementWithBounds(elem, params) {
        var bounds = (params.bounds || '');
        var selector = params.select || ''
        console.log(bounds, selector, elem)
        if (selector.length && bounds.length) {
          elem = elem.querySelector(bounds + ' ' + selector);

        } else if (selector) {
          elem = elem.querySelector(selector);
        } else {
          elem = animContainer.firstChild;
        }
        return elem
      }

  }

]);

