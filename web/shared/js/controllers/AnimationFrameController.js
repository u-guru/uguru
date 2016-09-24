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


    afc.params.template = afc.element.objUrl;
    afc.params.defaults = {kf: getKFFromParams($stateParams),  toolbar:{}, hidePlot: $stateParams.hidePlot === "true", stateName: $stateParams.state};
    afc.params.formatted = 'p:[' + afc.params.raw + ']';
    afc.getDebugFormat = AnimationFrameService.getDebugFormat;

    $timeout(function() {

        $scope.$apply();

        var stateName = $stateParams.state || 'on-init'


        var animContainer = document.querySelector('#anim-element');

        animContainer.classList.add('absolute', 'full-xy', 'bottom-0', 'flex-wrap-center')
        afc.element.dom = animContainer.querySelector($stateParams.select);

        if (ElementService.isSVGElement(afc.element.dom.nodeName)) {


          // var parentSVG = ElementService.getSVGParent(afc.element.dom);
          var parentSVG = afc.element.dom.nearestViewportElement;
          parentSVG.style.height = $scope.root.window.height/2 + 'px';
          parentSVG.style.width = $scope.root.window.width/2 + 'px';
          animContainer.innerHTML = '';
          animContainer.appendChild(parentSVG)
          console.log(animContainer)
        }





        animContainer.innerHTML = ''
        animContainer.appendChild(afc.element.dom)
        // appendParentWithComputedHeight(animContainer, afc.element.dom);



        afc.stateObj = afc.service.init.state(stateName, afc.params.raw, afc.element.dom, afc.params.defaults);
        afc.player = AnimationFrameService.getPlayer();
        afc.player = afc.player.scheduleStream(afc.player, afc.stateObj, afc.stateObj.offset, afc.params.defaults);
    }, 100)


    function getKFFromParams(params) {
      return params.kf && parseInt(params.kf) || 60
    }

    function appendParentWithComputedHeight(container, element) {

        var _window = $scope.root.window;




      var hasBounds = true;
      var isSvg = ElementService.isSVGElement(element.nodeName.toLowerCase());
      console.log(element)
      if (isSvg) {
        element = ElementService.getSVGParent(element)
        element = ElementService.scaleSvgCSS(element, _window, true, true);
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



              var isSvg = ElementService.isSVGElement(afc.element.dom.nodeName.toLowerCase());
              if (isSvg) {
                // console.log(clonedElem.paren)
                clonedElem = ElementService.getSVGParent(afc.element.dom);
                var clonedElem = clonedElem.cloneNode(true);
              }
              cloneElemContainer.appendChild(clonedElem);
        }
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

  }

]);

