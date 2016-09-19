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
  function($scope, $state, $timeout, $stateParams, UtilitiesService, $compile, AnimationFrameService) {
    var afc = this;

    afc.service = AnimationFrameService;
    afc.args = {}
    afc.params = {formatted: '', raw: ''}
    afc.params.raw = constructStateStrFromParams($stateParams);
    console.log(afc.params.raw)
    afc.params.comp = afc.element.objUrl.split('/').splice(afc.element.objUrl.split('/').length - $stateParams.comp.split('.').length).join('/')
    afc.params.kf = $stateParams.kf && parseInt($stateParams.kf) || 60
    afc.params.formatted = 'p:[' + afc.params.raw + ']';
    afc.getDebugFormat = AnimationFrameService.getDebugFormat

    $timeout(function() {
        $scope.$apply();

        var stateName = 'on-init'
        afc.element.dom = document.querySelectorAll('#anim-element')[0];
        // for (var i = 0; i < afc.element.dom.length; i++) {
          afc.stateObj = afc.service.init.state(stateName, afc.params.raw, afc.element.dom, afc.params.kf, true);
          afc.player = AnimationFrameService.getPlayer();
          afc.player.scheduleStream(afc.player, afc.stateObj, afc.stateObj.offset, true);
          afc.player.schedule.streams.forEach(function(stream, i) {
            stream.applyProp(stream.values[0]);
          })

        // };
        // afc.player.enableDebugMode();
        // console.log(afc.player.tick)
        // afc.player.play();
        // console.log(afc.player.tick)
        // player.play(player, afc.stateObj.events);

        // $compile(afc.element.dom)($scope)
    })

    function constructStateStrFromParams(params) {
        var resultStr = "";
        var paramValues = params.v.split(',')
        paramValues.unshift(params.property)
        afc.element = {objUrl: UtilitiesService.constructImportUrlFromObj(params.comp)};
        var argNames = ['property', 'start', 'end', 'duration', 'easingFunc', 'delay', 'iter', 'direction']
        if (params.type !== 'prop') {
          argNames = ['property', 'duration', 'easing', 'delay', 'iter', 'direction']
        }

        paramValues.forEach(function(p, i) {

            resultStr += p + (i < paramValues.length - 1 && ':' || '')
            afc.args[argNames[i]] = p;
        })
        return resultStr;
    }

  }

]);

