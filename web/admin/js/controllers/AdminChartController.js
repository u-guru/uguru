angular.module('uguru.admin')

.controller('AdminChartController', [
  '$scope',
  '$element',
  '$attrs',
  '$transclude',
  '$compile',
  '$timeout',
  'ElementService',
  'ChartService',
  function($scope, $element, $attrs, $transclude, $compile, $timeout, ElementService, ChartService) {
    var attr = $attrs;
    var context = {type: 'on', name: 'init'};



    // $compile(animElem)($scope);


    var chart = this;


    $transclude($scope, function(clone, innerScope) {
      chart.elemDir = ElementService.initGraphicElement($attrs.src)
      chart.elemDir.attr('id', 'chart-elem')
      chart.elemDir.attr('chart', 'chart')
      $element.append(clone)
      $element.append(chart.elemDir)
      $compile($element)(innerScope)

    })

    $scope.$watch('chart.elem', function(element) {
        if (element) {
          chart.anim = $scope.renderAnimationStr(chart.elem, null, attr.state, chart.context, true);
          $scope.chart.player = chart.anim.player;
          $scope.chart.player.play($scope.chart.player);
          $scope.chart.player.pause();
        }
    })



    chart.context = context;

    $scope.renderAnimationStr = function(elem, scope, animations, context, debug) {
      return ElementService.renderAnimationStr(elem, scope, animations, context, debug)
    }


  }

])