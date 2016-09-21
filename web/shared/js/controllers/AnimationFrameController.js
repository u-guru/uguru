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
  function($scope, $state, $timeout, $stateParams, UtilitiesService, $compile, AnimationFrameService, RootService) {
    var afc = this;

    afc.service = AnimationFrameService;
    afc.args = {}
    afc.params = {formatted: '', raw: ''}
    afc.params.raw = constructStateStrFromParams($stateParams);

    // afc.params.template = afc.element.objUrl.split('/').splice(afc.element.objUrl.split('/').length - $stateParams.comp.split('.').length).join('/')
    afc.params.template = afc.element.objUrl;
    afc.params.kf = $stateParams.kf && parseInt($stateParams.kf) || 60
    afc.params.formatted = 'p:[' + afc.params.raw + ']';
    afc.getDebugFormat = AnimationFrameService.getDebugFormat;
    console.log('ay', $stateParams.temp)


    $timeout(function() {

        $scope.$apply();

        var stateName = 'on-init'
        if (!$stateParams.select) {
          $stateParams.select = '*'
        }

        var animContainer = document.querySelector('#anim-element');
        afc.element.dom = animContainer.querySelector($stateParams.select);
        var domCoords = afc.element.dom.getBoundingClientRect();




        var width = Math.max(domCoords.width, 50) + 'px';
        var height = Math.max(domCoords.height, 50) + 'px';

        afc.element.dom.style.width = width;
        afc.element.dom.style.height = height;
        animContainer.innerHTML = ''
        animContainer.appendChild(afc.element.dom);
        // for (var i = 0; i < afc.element.dom.length; i++) {
          afc.stateObj = afc.service.init.state(stateName, afc.params.raw, afc.element.dom, afc.params.kf, $scope);
          afc.player = AnimationFrameService.getPlayer();
          afc.player = afc.player.scheduleStream(afc.player, afc.stateObj, afc.stateObj.offset, $scope);


        // };
        // afc.player.enableDebugMode();
        // console.log(afc.player.tick)
        // afc.player.play();
        // console.log(afc.player.tick)
        // player.play(player, afc.stateObj.events);

        // $compile(afc.element.dom)($scope)
    })

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

