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
    chart.element = ElementService.initElement($attrs.src)

    chart.context = context;

    $scope.renderAnimationStr = function(elem, scope, animations, context) {
      return ElementService.renderAnimationStr(elem, scope, animations, context)
    }


  }

])